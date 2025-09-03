"use client";
import * as React from "react";
import { LeadTable } from "@/components/admin/LeadTable";
import { LeadDrawer } from "@/components/admin/LeadDrawer";

export default function Client({ leads }: { leads: any[] }) {
  const [open, setOpen] = React.useState<any | null>(null);
  return (
    <>
      <LeadTable leads={leads} onOpen={setOpen} />
      {open && <LeadDrawer lead={open} onClose={() => setOpen(null)} />}
    </>
  );
}

