import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { estimatePriceBand, clampBand } from "@/lib/pricing";
import { storeLeadPhotos } from "@/lib/storage";
import { slackNotify } from "@/lib/notifications";

export async function POST(req: Request) {
  const form = await req.formData();
  const address = String(form.get("address") || "");
  const placeId = String(form.get("placeId") || "");
  const runLengthMeters = parseInt(String(form.get("runLengthMeters") || "0"));
  const chargerType = String(form.get("chargerType") || "");
  const extrasJson = String(form.get("extrasJson") || "{}");
  const firstName = String(form.get("firstName") || "");
  const lastName = String(form.get("lastName") || "");
  const email = String(form.get("email") || "");
  const phone = String(form.get("phone") || "");
  const caslConsent = String(form.get("caslConsent") || "false") === "true";
  const files = form.getAll("photos");

  const uploadable: File[] = files.filter((f): f is File => typeof f !== "string").filter((f) => (f as File).type?.startsWith("image/") && (f as File).size <= 10 * 1024 * 1024) as File[];
  // Create a temporary lead id to namespace uploads after DB create (upload after lead create)

  const band = clampBand(estimatePriceBand(runLengthMeters, JSON.parse(extrasJson)));

  try {
    const lead = await prisma.lead.create({
      data: {
        firstName, lastName, email, phone,
        addressJson: { formatted: address, placeId } as any,
        runLengthMeters,
        chargerType,
        extrasJson: JSON.parse(extrasJson) as any,
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
    // Slack notify (best-effort)
    slackNotify(`New lead: ${firstName} ${lastName} — ${address}`).catch(() => {});
    return NextResponse.json({ id: lead.id, priceBand: band });
  } catch (e) {
    return NextResponse.json({ error: "db_error", detail: String(e) }, { status: 500 });
  }
}
