"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const phone = "+16476072739";
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8 items-stretch">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Fast EV-charger installs across GTA</h1>
            <p className="text-slate-600">Upload panel photos, get a price band in minutes, and book your install.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge>ESA Permit</Badge>
              <Badge>WSIB Covered</Badge>
              <Badge>Licensed Contractors</Badge>
              <Badge>2-Year Warranty</Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/quote">Get an Instant Quote</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={`tel:${phone}`}>Call +1 647-607-2739</a>
            </Button>
          </div>
          <TrustRow />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="relative">
          <div className="rounded-3xl overflow-hidden border border-black/10 shadow-soft">
            <div className="relative aspect-[16/10]">
              {/* Simple gradient placeholder — no autoplay video */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08)_0%,_rgba(248,250,252,1)_60%)]" />
              <div className="absolute inset-0 p-4 flex items-end justify-start">
                <span className="text-slate-600 text-sm">Charge ahead.</span>
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

// Removed autoplay video per perf constraints

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
