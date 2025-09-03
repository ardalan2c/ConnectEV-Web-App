import { Hero } from "@/components/common/Hero";
import { CityChipsGrid } from "@/components/common/CityChipsGrid";
import { FaqAccordion } from "@/components/common/FaqAccordion";
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
      <Hero />
      <section id="install" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-semibold">What we install</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {["Home Level-2 Chargers", "Condos & Apartments", "Panel & Service Upgrades"].map((t) => (
            <div key={t} className="rounded-2xl border border-black/10 p-4">{t}</div>
          ))}
        </div>
      </section>
      <section id="why" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="grid md:grid-cols-4 gap-4 mt-4 text-sm">
          {["1) Instant Quote", "2) Virtual Check", "3) ESA Permit", "4) Install Day"].map((t, i) => (
            <div key={t} className="rounded-2xl border border-black/10 p-4">
              <div className="font-medium">{t}</div>
              <div className="h-0.5 bg-black/10 mt-2" />
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-semibold">Smarter by design</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="rounded-2xl border border-black/10 p-4 relative overflow-hidden">
            <div className="font-medium mb-2">Panel Photo Analyzer (AI)</div>
            <div className="relative h-28 rounded-xl bg-slate-100 border border-black/10">
              <span className="absolute top-2 left-2 text-[10px] bg-emerald-400/20 text-emerald-900 border border-emerald-400/40 rounded-md px-2 py-0.5">Main breaker: 100A</span>
              <span className="absolute bottom-2 right-2 text-[10px] bg-emerald-400/20 text-emerald-900 border border-emerald-400/40 rounded-md px-2 py-0.5">Free slots: 2</span>
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 p-4">Condo Letter Generator</div>
          <div className="rounded-2xl border border-black/10 p-4">Lead Routing SLAs</div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-semibold">Serving the Greater Toronto Area</h2>
        <div className="mt-4"><CityChipsGrid /></div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-semibold">Frequently asked</h2>
        <div className="mt-4"><FaqAccordion /></div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="rounded-3xl border border-black/10 p-8 text-center bg-white">
          <h2 className="text-2xl font-semibold">Ready to charge at home?</h2>
          <p className="text-slate-600 mt-2">Start with a quick quote. We’ll confirm scope before booking.</p>
          <a className="inline-flex mt-4 rounded-2xl bg-accent text-slate-950 px-6 py-3 font-medium" href="/quote">Get Your Instant Quote</a>
        </div>
      </section>
    </>
  );
}
