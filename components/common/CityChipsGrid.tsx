"use client";
import { gtaCities } from "@/config/cities";

export function CityChipsGrid() {
  return (
    <div className="flex flex-wrap gap-2">
      {gtaCities.map((c) => (
        <span key={c} className="rounded-2xl border border-emerald-400/50 hover:border-accent transition px-3 py-1 text-sm">
          {c}
        </span>
      ))}
    </div>
  );
}

