import { Hero } from "@/components/common/Hero";
import { CityChipsGrid } from "@/components/common/CityChipsGrid";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

export default function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ConnectEV Inc.",
    url: baseUrl,
    image: `${baseUrl}/og.png`,
    areaServed: "Greater Toronto Area",
    slogan: "Charge ahead.",
    sameAs: [],
    openingHours: "Mo-Fr 09:00-18:00"
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "EV charger installation",
    provider: { "@type": "Organization", name: "ConnectEV Inc." },
    areaServed: "Greater Toronto Area"
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Do I need a permit?", acceptedAnswer: { "@type": "Answer", text: "Yes—ESA permit is included." } },
      { "@type": "Question", name: "Can you install in condos?", acceptedAnswer: { "@type": "Answer", text: "Yes—board approval required; we help with paperwork." } }
    ]
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      
      <main id="main-content">
        <Hero />
        
        {/* Services Section */}
        <section id="install" className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold mb-6">What we install</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Home Level-2 Chargers", "Condos & Apartments", "Panel & Service Upgrades"].map((t) => (
              <div key={t} className="rounded-2xl border border-black/10 p-6 bg-white shadow-soft hover:shadow-md transition-shadow">
                <h3 className="font-medium">{t}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section id="why" className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold mb-6">How it works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {["1) Instant Quote", "2) Virtual Check", "3) ESA Permit", "4) Install Day"].map((t) => (
              <div key={t} className="rounded-2xl border border-black/10 p-6 bg-white shadow-soft">
                <h3 className="font-medium text-sm">{t}</h3>
                <div className="h-0.5 bg-emerald-100 mt-4" />
              </div>
            ))}
          </div>
        </section>

        {/* Smarter Section */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold mb-6">Smarter by design</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-black/10 p-6 bg-white shadow-soft relative overflow-hidden">
              <h3 className="font-medium mb-4">Panel Photo Analyzer (AI)</h3>
              <div className="relative h-28 rounded-xl bg-slate-100 border border-black/10">
                <span className="absolute top-2 left-2 text-[10px] bg-emerald-400/20 text-emerald-900 border border-emerald-400/40 rounded-md px-2 py-0.5">Main breaker: 100A</span>
                <span className="absolute bottom-2 right-2 text-[10px] bg-emerald-400/20 text-emerald-900 border border-emerald-400/40 rounded-md px-2 py-0.5">Free slots: 2</span>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 p-6 bg-white shadow-soft">
              <h3 className="font-medium">Condo Letter Generator</h3>
            </div>
            <div className="rounded-2xl border border-black/10 p-6 bg-white shadow-soft">
              <h3 className="font-medium">Lead Routing SLAs</h3>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold mb-6">Serving the Greater Toronto Area</h2>
          <CityChipsGrid />
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold mb-6">Frequently asked</h2>
          <FaqAccordion />
        </section>

        {/* Final CTA Section */}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="rounded-3xl border border-black/10 p-8 text-center bg-white shadow-soft">
            <h2 className="text-3xl font-semibold mb-3">Ready to charge at home?</h2>
            <p className="text-slate-600 mb-6 text-lg">Start with a quick quote. We'll confirm scope before booking.</p>
            <Button asChild size="lg">
              <Link href="/quote">Get Your Instant Quote</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
