import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { estimatePriceBand, clampBand } from "@/lib/pricing";
import { storeLeadPhotos } from "@/lib/storage";
import { slackNotify } from "@/lib/notifications";
import { resolve as resolveAddress } from "@/lib/address";
import { z } from "zod";
import { log } from "@/lib/log";
import { rateLimited } from "@/lib/rateLimit";

const LeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().min(4),
  consent: z.coerce.boolean(),
  runLength: z.coerce.number().int().min(0).max(200),
  exterior: z.coerce.boolean().default(false),
  drywall: z.coerce.boolean().default(false),
});

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0] || 'unknown';
  if (rateLimited(ip, { limit: 20, windowMs: 5 * 60_000 })) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  const form = await req.formData();
  const address = String(form.get("address") || "");
  const placeId = String(form.get("placeId") || "");
  const runLengthMeters = parseInt(String(form.get("runLengthMeters") || form.get("runLength") || "0"));
  const extrasJson = String(form.get("extrasJson") || "{}");
  const firstName = String(form.get("firstName") || "");
  const lastName = String(form.get("lastName") || "");
  const email = String(form.get("email") || "");
  const phone = String(form.get("phone") || "");
  const caslConsent = String(form.get("caslConsent") || form.get("consent") || "false") === "true";
  const exterior = JSON.parse(extrasJson || "{}")?.exteriorPenetration ?? false;
  const drywall = JSON.parse(extrasJson || "{}")?.finishedWalls ?? false;
  const files = form.getAll("photos");

  const uploadable: File[] = files.filter((f): f is File => typeof f !== "string").filter((f) => (f as File).type?.startsWith("image/") && (f as File).size <= 10 * 1024 * 1024) as File[];
  // Create a temporary lead id to namespace uploads after DB create (upload after lead create)

  const band = clampBand(estimatePriceBand(runLengthMeters, JSON.parse(extrasJson)));

  try {
    const parsed = LeadSchema.safeParse({ firstName, lastName, email, phone, address, consent: caslConsent, runLength: runLengthMeters, exterior, drywall });
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid_input", detail: parsed.error.flatten() }, { status: 400 });
    }
    // Resolve address using the pluggable provider (plain text in Launch Mode)
    const resolved = await resolveAddress(address);
    
    const lead = await prisma.lead.create({
      data: {
        firstName, lastName, email, phone,
        addressJson: {
          formatted: resolved.formatted,
          lat: resolved.lat,
          lng: resolved.lng,
          placeId: placeId || undefined
        } as any,
        runLengthMeters,
        chargerType: "Level-2",
        extrasJson: { exteriorPenetration: exterior, finishedWalls: drywall } as any,
        photos: [],
        priceBandMin: band.min,
        priceBandMax: band.max,
        status: "new",
        source: "website",
        caslConsent,
      }
    });
    // Upload photos if possible and update lead
    if (uploadable.length) {
      try {
        const stored = await storeLeadPhotos(uploadable, lead.id);
        if (stored.length) {
          await prisma.lead.update({ where: { id: lead.id }, data: { photos: stored.map((s) => s.url) } });
        }
      } catch {}
    }
    // Slack notify (best-effort; avoid PII)
    slackNotify("New website lead").catch(() => {});
    log.info("Lead created", { id: lead.id });
    return NextResponse.json({ id: lead.id, priceBand: band });
  } catch (e) {
    return NextResponse.json({ error: "db_error", detail: String(e) }, { status: 500 });
  }
}
