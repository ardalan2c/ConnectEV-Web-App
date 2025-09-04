import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { token, leadId, orgId } = body || {};
  if (!token || !leadId || !orgId) return NextResponse.json({ error: "invalid" }, { status: 400 });
  // Stub: accept token always valid in this scaffold
  try {
    await prisma.lead.update({ where: { id: leadId }, data: { assignedOrgId: orgId, status: "qualified" } });
  } catch (e) {
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

