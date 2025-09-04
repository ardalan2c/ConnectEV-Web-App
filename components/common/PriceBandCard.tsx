import { currency } from "@/lib/utils";

export function PriceBandCard({ min, max }: { min: number; max: number }) {
  return (
    <div className="rounded-2xl border border-black/10 p-4 bg-white">
      <div className="text-sm font-medium">Estimated price: {currency(min)}–{currency(max)} + HST</div>
      <p className="text-xs text-slate-600 mt-1">Final scope confirmed before booking.</p>
    </div>
  );
}

