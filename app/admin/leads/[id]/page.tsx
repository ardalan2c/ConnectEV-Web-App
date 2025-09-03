import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({ where: { id: params.id } }).catch(() => null);
  if (!lead) return notFound();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Lead</h1>
      <div className="rounded-2xl border border-black/10 p-4">
        <div className="text-sm"><span className="font-medium">Contact:</span> {lead.firstName} {lead.lastName} · {lead.email} · {lead.phone}</div>
        <div className="text-sm mt-2"><span className="font-medium">Address:</span> {(lead as any).addressJson?.formatted || "—"}</div>
        <div className="text-sm mt-2"><span className="font-medium">Run length:</span> {lead.runLengthMeters || "—"} m</div>
        <div className="text-sm mt-2"><span className="font-medium">Status:</span> {lead.status}</div>
      </div>
    </div>
  );
}

