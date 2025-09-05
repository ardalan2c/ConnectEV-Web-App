import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residential EV charger installation",
  description: "Licensed Level‑2 home charger installs across the GTA. ESA permit included, WSIB covered, 2‑year workmanship warranty.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Residential EV charger installation</h1>
      <p className="text-slate-700">We install Level‑2 EV chargers for homes (garages, driveways) and condos/townhomes across the GTA. Clean, code‑compliant work by Licensed Electrical Contractors. ESA permit included.</p>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { t: "Fast scheduling", d: "Typical install completed in 2–4 hours." },
          { t: "Transparent pricing", d: "Upfront price band, confirmed after photo review." },
          { t: "Neat & compliant", d: "Proper routing, labeling, and ESA permit filing." },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl border border-black/10 p-4 bg-white">
            <div className="font-medium">{c.t}</div>
            <div className="text-sm text-slate-600">{c.d}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-black/10 p-4 text-sm text-slate-700">
        Most installs are straight runs from panel to charger. Variables include cable run length, panel capacity, and drywall/exterior penetrations. See <Link href="/pricing" className="underline">pricing</Link> for bands.
      </div>

      <div>
        <Link href="/quote" className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-emerald-600 text-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">Start your quote</Link>
      </div>
    </div>
  );
}
