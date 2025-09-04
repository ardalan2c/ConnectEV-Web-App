import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Instant Quote" };

export default function QuotePage() {
  return (
    <section id="quote" className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Get Your Instant Quote</h1>
          <p className="text-slate-600">Upload panel photos, get a price band in minutes, and book your install.</p>
          
          {/* Trust row */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {["ESA Permit Included","WSIB Covered","Licensed Contractors","2-Year Warranty"].map((t) => (
              <div key={t} className="rounded-xl border border-black/10 p-3 text-slate-600 bg-white text-center">{t}</div>
            ))}
          </div>
          
          <div className="rounded-2xl border border-black/10 p-4 text-sm bg-slate-50">
            <div className="font-medium mb-1">Price estimate</div>
            <div className="text-slate-600">$1,100–$2,200 + HST (typical range)</div>
          </div>
        </div>
        <QuoteWizard />
      </div>
    </section>
  );
}

