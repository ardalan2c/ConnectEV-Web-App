export function OrgBadge({ name, type }: { name: string; type?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-2.5 py-1 text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {name}{type ? ` • ${type}` : ""}
    </span>
  );
}

