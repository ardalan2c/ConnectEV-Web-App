import { cn } from "@/lib/utils";

export function StatusPill({ status }: { status: string }) {
  const color =
    status === "new" ? "bg-sky-100 text-sky-800" :
    status === "qualified" ? "bg-amber-100 text-amber-800" :
    status === "booked" ? "bg-emerald-100 text-emerald-800" :
    status === "completed" ? "bg-indigo-100 text-indigo-800" :
    status === "won" ? "bg-emerald-200 text-emerald-900" :
    status === "lost" ? "bg-rose-100 text-rose-800" :
    "bg-slate-100 text-slate-800";
  return <span className={cn("px-2 py-1 rounded-xl text-xs", color)}>{status}</span>;
}

