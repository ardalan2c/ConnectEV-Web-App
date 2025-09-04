"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8 items-stretch">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Fast, code-compliant EV-charger installs across the GTA</h1>
            <p className="text-slate-600">Upload panel photos, get a price band in minutes, and book your install.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge>ESA Permit Included</Badge>
              <Badge>Licensed Electrical Contractors</Badge>
              <Badge>2-Year Workmanship Warranty</Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/quote">Get an Instant Quote</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#why">Why ConnectEV</Link>
            </Button>
          </div>
          <TrustRow />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="relative">
          <div className="rounded-3xl overflow-hidden border border-black/10 shadow-soft">
            <div className="relative aspect-[16/10] bg-black">
              <HeroVideo />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-4 flex items-end justify-start">
                <span className="text-white/80 text-sm">Charge ahead.</span>
              </div>
            </div>
            <div className="p-4">
              <QuotePreview />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
      {[
        "Licensed Electrical Contractors",
        "ESA Permit Included",
        "WSIB",
        "2-Year Workmanship Warranty",
      ].map((t) => (
        <div key={t} className="rounded-2xl border border-black/10 p-3 text-xs text-slate-600 bg-white">{t}</div>
      ))}
    </div>
  );
}

function HeroVideo() {
  const heroVideo = "/hero.mp4";
  
  return (
    <>
      <video 
        className="absolute inset-0 h-full w-full object-cover opacity-10" 
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.svg"
        onError={(e) => {
          // Hide video on error, show fallback background
          e.currentTarget.style.display = 'none';
        }}
        style={{ zIndex: 1 }}
      />
      {/* Fallback background when video fails to load */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.05)_0%,_rgba(248,250,252,0.8)_100%)]"
        style={{ zIndex: 0 }}
      />
    </>
  );
}

function QuotePreview() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <div className="text-sm font-semibold mb-2">Instant Quote</div>
      <ol className="text-sm text-slate-600 list-disc list-inside space-y-1">
        <li>1) Address</li>
        <li>2) Run length</li>
        <li>3) Panel photos</li>
      </ol>
      <div className="mt-3 text-sm">Estimated price: $1,100–$2,200 + HST</div>
    </div>
  );
}
