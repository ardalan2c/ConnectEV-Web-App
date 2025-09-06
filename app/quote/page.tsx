import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { CTAHotline } from "@/components/common/CTAHotline";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Instant Quote" };

export default function QuotePage() {
  return (
    <>
      <section id="quote" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Get Your Instant Quote</h1>
          <p className="text-gray-600">Upload panel photos, get a price band in minutes, and book your install with licensed contractors.</p>
          
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Photo Upload Helper</h3>
            <p className="text-sm text-blue-800">
              JPG/PNG/HEIC up to 5MB each. Photos are only used to provide an accurate quote.
            </p>
          </div>
          
          {/* Trust row */}
          <div className="grid grid-cols-2 gap-3">
            {["ESA Permit Included","WSIB Covered","Licensed Contractors","2-Year Warranty"].map((t) => (
              <div key={t} className="rounded-lg border border-gray-200 p-3 text-gray-700 bg-white text-center text-sm font-medium">{t}</div>
            ))}
          </div>
          
          <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
            <div className="font-semibold text-gray-900 mb-1">Typical Price Range</div>
            <div className="text-2xl font-bold text-emerald-600">$1,100–$2,200 + HST</div>
            <div className="text-sm text-gray-600 mt-1">Final price confirmed after photo review</div>
          </div>
        </div>
        <QuoteWizard />
      </div>
      </section>
      
      <CTAHotline />
    </>
  );
}

