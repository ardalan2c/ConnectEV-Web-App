import Link from "next/link";
import { CTAHotline } from "@/components/common/CTAHotline";

const CITIES = [
  { slug: "toronto", name: "Toronto" },
  { slug: "mississauga", name: "Mississauga" },
  { slug: "brampton", name: "Brampton" },
  { slug: "vaughan", name: "Vaughan" },
  { slug: "markham", name: "Markham" },
  { slug: "richmond-hill", name: "Richmond Hill" },
  { slug: "oakville", name: "Oakville" },
  { slug: "etobicoke", name: "Etobicoke" },
  { slug: "north-york", name: "North York" },
  { slug: "scarborough", name: "Scarborough" },
] as const;

export default function ServiceAreasHub() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "EV Charger Installation — Greater Toronto Area",
    url: `${site}/service-areas`,
    hasPart: CITIES.map((c) => ({
      "@type": "WebPage",
      url: `${site}/service-areas/${c.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <h1 className="text-2xl md:text-3xl font-bold">EV Charger Installation — Greater Toronto Area</h1>
      <p className="text-slate-600">
        Licensed Level-2 EV-charger installs for homes and condos across the GTA. ESA permit included, WSIB covered, and a clean, code-compliant installation.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
        {CITIES.map((c) => (
          <Link
            key={c.slug}
            href={`/service-areas/${c.slug}`}
            className="rounded-2xl border border-black/10 p-4 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <div className="font-medium">{c.name}</div>
            <div className="text-xs text-slate-500 mt-1">EV charger installation</div>
          </Link>
        ))}
      </div>
      <div className="rounded-2xl border border-black/10 p-4 flex flex-wrap gap-3 text-sm">
        <Link href="/quote" className="underline">Get an instant quote</Link>
        <span>·</span>
        <Link href="/services" className="underline">Services</Link>
        <span>·</span>
        <Link href="/pricing" className="underline">Pricing</Link>
      </div>
      <CTAHotline />
    </div>
  );
}
