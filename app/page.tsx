import { Button } from "@/components/ui/button";
import { CTAHotline } from "@/components/common/CTAHotline";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Fast EV-charger installs across GTA — ConnectEV Inc.",
  description: "Upload panel photos, get a price band in minutes, and book your install with licensed contractors across the GTA.",
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
    areaServed: ["Toronto","Mississauga","Brampton","Vaughan","Markham","Richmond Hill","Oakville","Etobicoke","North York","Scarborough"],
    slogan: "Charge ahead.",
    telephone: "+1 647-607-2739",
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
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Fast EV-charger installs across GTA
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload panel photos, get a price band in minutes, and book your install with licensed contractors.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 min-h-[48px] px-8 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                <Link href="/quote">Get Instant Quote</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="min-h-[48px] px-8 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                <a href="tel:+16476072739">Call 647-607-2739</a>
              </Button>
            </div>

            {/* Proof Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
              {[
                "ESA Permit Included",
                "WSIB Covered", 
                "Licensed Contractors",
                "2-Year Warranty"
              ].map((item) => (
                <div key={item} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <div className="text-sm font-medium text-gray-900">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Request Quote",
                  description: "Upload panel photos and get your price band instantly"
                },
                {
                  step: "2", 
                  title: "Photo Review & Price",
                  description: "We review photos and confirm your exact pricing"
                },
                {
                  step: "3",
                  title: "Install & Permit",
                  description: "Licensed installation with ESA permit included"
                }
              ].map((item) => (
                <div key={item.step} className="text-center bg-gray-50 rounded-lg p-6">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common questions</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get answers about permits, pricing, and installation process
            </p>
            <Button asChild variant="outline" size="lg" className="focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </section>

        {/* Service Areas Teaser */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Serving the Greater Toronto Area</h2>
            <p className="text-xl text-gray-600 mb-8">
              Licensed installations across Toronto, Mississauga, Brampton, Vaughan, and more
            </p>
            <Button asChild variant="outline" size="lg" className="focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              <Link href="/service-areas">View Service Areas</Link>
            </Button>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-emerald-600">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to charge at home?</h2>
            <p className="text-xl text-emerald-100 mb-8">
              Get your instant quote and book your installation today
            </p>
            <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 min-h-[48px] px-8 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
              <Link href="/quote">Get Your Quote</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <CTAHotline />
    </>
  );
}