"use client";
import * as React from "react";
import { StatusPill } from "./StatusPill";

export function LeadTable({ leads, onOpen }: { leads: any[]; onOpen: (lead: any) => void }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2">Created</th>
          <th>Contact</th>
          <th>City</th>
          <th>Status</th>
          <th>Price band</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((l) => (
          <tr key={l.id} className="border-b hover:bg-black/[0.02] cursor-pointer" onClick={() => onOpen(l)}>
            <td className="py-2">{new Date(l.createdAt).toLocaleString()}</td>
            <td>{l.firstName} {l.lastName} · {l.phone}</td>
            <td>{l.city || ""}</td>
            <td><StatusPill status={l.status} /></td>
            <td>{l.priceBandMin && l.priceBandMax ? `$${Math.round(l.priceBandMin/100)}–$${Math.round(l.priceBandMax/100)}` : "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

