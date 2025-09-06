import { Button } from "@/components/ui/button";
import { CTAHotline } from "@/components/common/CTAHotline";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EV Charger Installation Services — ConnectEV Inc.",
  description: "Professional Level-2 EV charger installation for homes, condos, and businesses across the GTA. Licensed contractors, ESA permits included.",
};

export default function ServicesPage() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">EV Charger Installation Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional Level-2 EV charger installation across the Greater Toronto Area. 
            Licensed contractors, ESA permits included, and 2-year workmanship warranty.
          </p>
        </div>

        {/* Residential Service */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Residential Level-2 Charger Installation</h2>
            <p className="text-lg text-gray-600 mb-6">
              Perfect for driveways and garages. 240V charging that adds 25-40 miles of range per hour.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
                <ul className="space-y-2">
                  {[
                    "Site assessment and load calculation",
                    "ESA electrical permit and filing",
                    "All materials and labor",
                    "Circuit breaker and disconnect switch",
                    "Conduit and wiring up to 50 feet",
                    "Wall mounting and weatherproofing",
                    "Final inspection and testing",
                    "2-year workmanship warranty"
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Add-Ons:</h3>
                <ul className="space-y-2">
                  {[
                    "Extended conduit runs (per foot)",
                    "Trenching for underground runs",
                    "Panel upgrades (60A to 100A/200A)",
                    "Load management devices",
                    "Smart home integration"
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Timeline:</span> 3-7 days from permit approval
              </div>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                <Link href="/quote">Get Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-emerald-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Get your instant quote and book your EV charger installation today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 min-h-[48px] px-8 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
              <Link href="/quote">Get Instant Quote</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white/10 min-h-[48px] px-8 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
              <a href="tel:+16476072739">Call 647-607-2739</a>
            </Button>
          </div>
        </section>
      </main>
      
      <CTAHotline />
    </>
  );
}