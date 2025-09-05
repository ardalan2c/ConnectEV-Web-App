import { Button } from "@/components/ui/button";
import { CTAHotline } from "@/components/common/CTAHotline";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EV Charger Installation Pricing — ConnectEV Inc.",
  description: "Transparent pricing for EV charger installation across the GTA. Most installs $1,100-$2,200 + HST. Get your instant quote today.",
};

export default function PricingPage() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">EV Charger Installation Pricing</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transparent, upfront pricing for professional EV charger installation. 
            Most installations fall between $1,100-$2,200 + HST depending on your specific setup.
          </p>
        </div>

        {/* Pricing Overview */}
        <section className="mb-16">
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">Typical Installation Range</h2>
            <div className="text-5xl font-bold text-emerald-600 mb-4">$1,100 - $2,200</div>
            <div className="text-xl text-emerald-800 mb-6">+ HST</div>
            <p className="text-emerald-700 max-w-2xl mx-auto">
              Final price confirmed after panel photos and virtual check. 
              Includes materials, labor, ESA permit, and 2-year warranty.
            </p>
          </div>
        </section>

        {/* What's Included */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What's included in every install</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Materials & Labor</h3>
              <ul className="space-y-3">
                {[
                  "Level-2 EV charger (hardwired or NEMA 14-50)",
                  "Dedicated 240V circuit installation", 
                  "Electrical conduit and wiring",
                  "Circuit breaker and disconnect",
                  "Wall mounting hardware",
                  "Professional installation labor"
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Permits & Warranty</h3>
              <ul className="space-y-3">
                {[
                  "ESA electrical permit and filing",
                  "Licensed Electrical Contractor",
                  "WSIB coverage and liability insurance",
                  "2-year workmanship warranty",
                  "Post-installation cleanup",
                  "Operating instructions and support"
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Factors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What affects your price</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cable Run Length",
                description: "Distance from your electrical panel to the charger location",
                details: ["Up to 10m included", "Additional runs $30-50/meter", "Conduit and wire included"]
              },
              {
                title: "Installation Complexity",
                description: "Mounting location and electrical requirements",
                details: ["Garage wall: Standard", "Exterior wall: +$90", "Pedestal mount: +$380", "Finished walls: +$180"]
              },
              {
                title: "Panel Capacity",
                description: "Your electrical panel's available capacity",
                details: ["Adequate capacity: Standard", "Load management: +$360-680", "Panel upgrade: Quote required"]
              }
            ].map((factor) => (
              <div key={factor.title} className="bg-white rounded-2xl border border-black/10 p-6 shadow-soft">
                <h3 className="text-xl font-semibold mb-3">{factor.title}</h3>
                <p className="text-slate-600 mb-4">{factor.description}</p>
                <ul className="space-y-2">
                  {factor.details.map((detail) => (
                    <li key={detail} className="text-sm text-slate-600">
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Financing */}
        <section className="mb-16 bg-slate-50 rounded-3xl p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Flexible payment options</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  $0
                </div>
                <h3 className="text-xl font-semibold mb-2">No Deposit</h3>
                <p className="text-slate-600">Pay after installation is complete and you're satisfied</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  💳
                </div>
                <h3 className="text-xl font-semibold mb-2">Multiple Payment Methods</h3>
                <p className="text-slate-600">Cash, cheque, credit card, or e-transfer accepted</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  📋
                </div>
                <h3 className="text-xl font-semibold mb-2">Detailed Invoice</h3>
                <p className="text-slate-600">Itemized breakdown for insurance or rebate claims</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-emerald-600 text-white rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Get your exact price in minutes</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Upload panel photos and get your personalized quote today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-slate-100 min-h-[48px] px-8">
              <Link href="/quote">Get Instant Quote</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white/10 min-h-[48px] px-8">
              <a href="tel:+16476072739">Call 647-607-2739</a>
            </Button>
          </div>
        </section>
      </main>
      
      <CTAHotline />
    </>
  );
}