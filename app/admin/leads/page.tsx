import { prisma } from "@/lib/prisma";
import { LeadDrawer } from "@/components/admin/LeadDrawer";
import { LeadTable } from "@/components/admin/LeadTable";
import Client from "./table-client";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  let leads: any[] = [];
  try {
    leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  } catch {
    leads = [];
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Leads</h1>
      <Client leads={leads as any[]} />
    </div>
  );
}

