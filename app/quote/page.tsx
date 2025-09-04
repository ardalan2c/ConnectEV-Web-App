import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Instant Quote" };

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Instant Quote</h1>
          <p className="text-slate-600 text-sm">1) Address 2) Run length 3) Panel photos</p>
          <div className="rounded-2xl border border-black/10 p-4 text-sm">Estimated price: $1,100–$2,200 + HST</div>
        </div>
        <QuoteWizard />
      </div>
    </div>
  );
}

