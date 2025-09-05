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
      <main className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">EV Charger Installation Services</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Professional Level-2 EV charger installation across the Greater Toronto Area. 
            Licensed contractors, ESA permits included, and 2-year workmanship warranty.
          </p>
        </div>

        {/* Service Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What we install</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Home Level-2 Chargers",
                description: "Perfect for driveways and garages. 240V charging that adds 25-40 miles of range per hour.",
                features: ["NEMA 14-50 or hardwired", "Indoor/outdoor rated", "Smart charging options", "Load management available"]
              },
              {
                title: "Condo & Apartment Installs", 
                description: "Board-approved installations with proper documentation and permits.",
                features: ["Board approval assistance", "Shared electrical planning", "Parking spot optimization", "Property management coordination"]
              },
              {
                title: "Panel & Service Upgrades",
                description: "Electrical service upgrades when your current panel can't support EV charging.",
                features: ["100A to 200A upgrades", "New panel installation", "Service entrance upgrades", "Load calculations included"]
              }
            ].map((service) => (
              <div key={service.title} className="bg-white rounded-2xl border border-black/10 p-8 shadow-soft">
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-16 bg-slate-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Our installation process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Instant Quote",
                description: "Upload panel photos and get your price band in minutes"
              },
              {
                step: "2",
                title: "Virtual Check", 
                description: "15-minute video call to confirm scope and timeline"
              },
              {
                step: "3",
                title: "ESA Permit",
                description: "We file the electrical permit before work begins"
              },
              {
                step: "4", 
                title: "Install Day",
                description: "Licensed contractor completes your installation"
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why choose ConnectEV</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Licensed & Insured",
                description: "All work performed by Licensed Electrical Contractors with WSIB coverage and liability insurance."
              },
              {
                title: "ESA Permits Included",
                description: "We handle all electrical permits and inspections. No surprise fees or paperwork for you."
              },
              {
                title: "2-Year Warranty",
                description: "Comprehensive workmanship warranty on all installations. We stand behind our work."
              },
              {
                title: "Fast Turnaround",
                description: "Most installations completed within 1-2 weeks of booking. Same-day quotes available."
              }
            ].map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-emerald-600 text-white rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Get your instant quote and book your EV charger installation today
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