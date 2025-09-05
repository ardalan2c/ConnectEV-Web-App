import { prisma } from "@/lib/prisma";
import { LeadDrawer } from "@/components/admin/LeadDrawer";
import { LeadTable } from "@/components/admin/LeadTable";
import { Button } from "@/components/ui/button";
import Client from "./table-client";
import Link from "next/link";

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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <Button asChild variant="outline">
          <Link href="/admin/leads/export?token=ADMIN_TOKEN_HERE" target="_blank">
            Download CSV
          </Link>
        </Button>
      </div>
      <Client leads={leads as any[]} />
    </div>
  );
}

