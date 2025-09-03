"use client";
import * as React from "react";
import { StatusPill } from "./StatusPill";
import { OrgBadge } from "./OrgBadge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LeadDrawer({ lead, onClose }: { lead: any; onClose: () => void }) {
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [busy, setBusy] = useState(false);
  if (!lead) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30" role="dialog" aria-modal>
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white border-l border-black/10 p-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Lead</div>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center gap-2"><StatusPill status={lead.status} /><OrgBadge name={lead.org?.name || "ACDC"} type={lead.org?.type} /></div>
          <div><span className="font-medium">Contact:</span> {lead.firstName} {lead.lastName} · {lead.email} · {lead.phone}</div>
          <div><span className="font-medium">Address:</span> {lead.address}</div>
          <div><span className="font-medium">Run length:</span> {lead.runLengthMeters} m</div>
          <div><span className="font-medium">Charger:</span> {lead.chargerType}</div>
          <div><span className="font-medium">Photos:</span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(lead.photos || []).map((u: string, i: number) => (
                <img key={i} src={u} alt={`photo-${i}`} className="aspect-square object-cover rounded-xl border" />
              ))}
            </div>
          </div>
          {(analysis || lead.analysis) && (
            <div className="rounded-2xl border border-black/10 p-3">
              <div className="font-medium text-sm">Panel Photo Analyzer (AI)</div>
              <div className="text-xs text-slate-600">Main breaker: {(analysis || lead.analysis).serviceAmps || "—"}A · Free slots: {(analysis || lead.analysis).freeSlots || "—"} · Confidence: {Math.round(((analysis || lead.analysis).confidence || 0)*100)}%</div>
            </div>
          )}
          <div className="flex gap-2">
            <Button variant="outline">Override price band</Button>
            <Button>Route to Partner</Button>
            <Button variant="subtle" disabled={busy} onClick={async () => {
              try {
                setBusy(true);
                const res = await fetch("/api/analyze/panel", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ images: (lead.photos||[]), leadId: lead.id }) });
                const data = await res.json();
                setAnalysis(data);
              } finally {
                setBusy(false);
              }
            }}>{busy ? "Analyzing…" : "Analyze Panel (AI)"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
