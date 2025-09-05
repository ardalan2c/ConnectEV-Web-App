import Link from "next/link";
import type { Metadata } from "next";
import { CTAHotline } from "@/components/common/CTAHotline";

export const metadata: Metadata = {
  title: "Transparent pricing bands",
  description: "Price ranges based on run length, panel capacity, and drywall/exterior work. Final price confirmed after photo review.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Transparent pricing</h1>
      <p className="text-slate-700">Typical Level‑2 installs fall within these ranges. We confirm your exact price after panel photo review and a quick virtual check.</p>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { band: "Short run (≤10m)", price: "$900–$1,400 + HST" },
          { band: "Medium run (10–20m)", price: "$1,200–$1,900 + HST" },
          { band: "Long run (20–30m)", price: "$1,600–$2,400 + HST" },
        ].map((b) => (
          <div key={b.band} className="rounded-2xl border border-black/10 p-4 bg-white">
            <div className="font-medium">{b.band}</div>
            <div className="text-slate-700">{b.price}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-black/10 p-4 text-sm text-slate-700 space-y-2">
        <div className="font-medium">What affects price?</div>
        <ul className="list-disc list-inside">
          <li>Run length (panel to charger)</li>
          <li>Panel capacity (may need load management)</li>
          <li>Drywall repair and exterior penetrations</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <Link href="/quote" className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-emerald-600 text-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">Start your quote</Link>
        <a href="tel:+16476072739" className="inline-flex items-center justify-center h-11 px-5 rounded-xl border border-black/10 bg-white text-slate-900 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">Call</a>
      </div>

      <CTAHotline />
    </div>
  );
}
