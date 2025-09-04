import { NextResponse } from "next/server";
import { analyzePanel } from "@/lib/vision";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const images: string[] = Array.isArray(body?.images) ? body.images : [];
  const leadId: string | undefined = body?.leadId;
  const result = await analyzePanel(images);
  if (leadId) {
    try { await prisma.lead.update({ where: { id: leadId }, data: { panelServiceAmps: result.serviceAmps || null } }); } catch {}
  }
  return NextResponse.json(result);
}

