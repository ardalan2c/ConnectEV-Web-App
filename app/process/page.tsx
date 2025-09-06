import { Button } from "@/components/ui/button";
import { CTAHotline } from "@/components/common/CTAHotline";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EV Charger Installation Process — ConnectEV Inc.",
  description: "Our 5-step installation process: Quote → Assessment → Permit → Install → Inspection. ESA permit included, typical 2-4 hour installation.",
};

export default function ProcessPage() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Installation Process</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From quote to completion in 5 simple steps. ESA permit included, 
            typical installation takes 2-4 hours with licensed contractors.
          </p>
        </div>

        {/* Process Steps */}
        <section className="mb-16">
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Instant Quote",
                description: "Upload panel photos and get your price band in minutes. Our system analyzes your electrical setup and provides an accurate estimate.",
                timeline: "5 minutes"
              },
              {
                step: "2",
                title: "Virtual Assessment",
                description: "15-minute video call to review your project, confirm scope, and answer any questions about the installation.",
                timeline: "15 minutes"
              },
              {
                step: "3",
                title: "ESA Permit Filing",
                description: "We handle all electrical permits and ESA filing before work begins. No paperwork hassle for you.",
                timeline: "3-5 business days"
              },
              {
                step: "4",
                title: "Professional Installation",
                description: "Licensed electrical contractor installs your charger with all materials, conduit runs, and proper mounting.",
                timeline: "2-4 hours"
              },
              {
                step: "5",
                title: "Final Inspection & Testing",
                description: "Complete testing, ESA inspection coordination, and walkthrough of your new charging system.",
                timeline: "30 minutes"
              }
            ].map((item, index) => (
              <div key={item.step} className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                      <span className="text-sm text-emerald-600 font-medium">{item.timeline}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Benefits */}
        <section className="mb-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "ESA electrical permit and filing",
              "Licensed electrical contractor",
              "All materials and hardware",
              "2-year workmanship warranty",
              "Load calculation and assessment",
              "Professional installation and testing",
              "Clean-up and site restoration",
              "Operating instructions and support"
            ].map((benefit) => (
              <div key={benefit} className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-emerald-600 text-white rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to start your installation?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Get your instant quote and begin the process today
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