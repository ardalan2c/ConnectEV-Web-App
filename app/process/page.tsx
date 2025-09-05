import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our process",
  description: "From instant quote to ESA permit and installation — typically 2–4 hours on site.",
};

export default function ProcessPage() {
  const steps = [
    { n: 1, t: "Request quote", d: "Share your address and details." },
    { n: 2, t: "Photo review", d: "Upload 3 panel photos for accurate pricing." },
    { n: 3, t: "Confirm price", d: "We text/email your confirmed price and dates." },
    { n: 4, t: "ESA permit", d: "We file your permit before work begins." },
    { n: 5, t: "Install day", d: "2–4 hours on site, neat and code‑compliant." },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Our process</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-black/10 p-4 bg-white">
            <div className="text-sm font-semibold text-emerald-700">Step {s.n}</div>
            <div className="font-medium">{s.t}</div>
            <div className="text-sm text-slate-600">{s.d}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-black/10 p-4 text-sm text-slate-700">
        ESA permits are included on every job. Installations are performed by Licensed Electrical Contractors and covered by WSIB, with a 2‑year workmanship warranty.
      </div>

      <div>
        <Link href="/quote" className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-emerald-600 text-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">Start your quote</Link>
      </div>
    </div>
  );
}

