import { Button } from "@/components/ui/button";
import { CTAHotline } from "@/components/common/CTAHotline";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — ConnectEV Inc.",
  description: "Get answers about EV charger installation permits, pricing, timeline, and process across the GTA.",
};

export default function FAQPage() {
  return (
    <>
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Get answers about permits, pricing, installation process, and more
          </p>
        </div>
        
        <div className="mb-16">
          <FaqAccordion />
        </div>

        {/* CTA */}
        <section className="text-center bg-emerald-600 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-emerald-100 mb-6">
            Get your instant quote or call us directly
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

