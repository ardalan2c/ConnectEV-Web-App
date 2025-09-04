import Link from "next/link";
import { notFound } from "next/navigation";
import { CTAHotline } from "@/components/common/CTAHotline";
import { CityGallery } from "@/components/city/CityGallery";
import { cityMedia, type CitySlug } from "@/content/media-manifest";

export const revalidate = 86400; // 24h ISR

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

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) return {};
  const title = `EV Charger Installation in ${city.name} | ConnectEV (ESA-Certified)`;
  const description = `Licensed EV-charger installers serving ${city.name}. ESA permit included, WSIB covered, 2-year workmanship warranty. Get an instant quote or call +1 647-607-2739.`;
  return { title, description };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) return notFound();

  const citySlug = slug as CitySlug;
  const photos = cityMedia[citySlug]?.gallery || [];

  const phone = "+16476072739";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const ld = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Service"],
    name: "ConnectEV Inc.",
    telephone: "+1 647-607-2739",
    areaServed: city.name,
    url: `${site}/service-areas/${city.slug}`,
    serviceType: "EV charger installation",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
        <ol className="inline-flex gap-1">
          <li><Link href="/" className="underline">Home</Link></li>
          <li>›</li>
          <li><Link href="/service-areas" className="underline">Service Areas</Link></li>
          <li>›</li>
          <li className="text-slate-800">{city.name}</li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold">EV Charger Installation in {city.name}</h1>

      <div className="grid sm:grid-cols-4 gap-3">
        {["ESA Permit Included","WSIB Covered","Licensed Contractors","2-Year Workmanship Warranty"].map((t) => (
          <div key={t} className="rounded-2xl border border-black/10 p-3 text-xs text-slate-600 bg-white">{t}</div>
        ))}
      </div>

      <p className="text-slate-700">
        ConnectEV installs Level-2 EV chargers for homes and condos across {city.name}. We handle ESA permits, materials, and a clean installation—typically completed in 2–4 hours.
      </p>

      <div className="space-y-2">
        <div className="font-medium">Typical scenarios</div>
        <ul className="list-disc list-inside text-slate-700">
          <li>Driveway parking with exterior wall penetration</li>
          <li>Garage parking with finished or unfinished walls</li>
          <li>Condo or townhouse installations (board/property approval required)</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-black/10 p-4 bg-white">
        <div className="text-sm text-slate-700">
          Most installs fall between $X–$Y depending on run length and panel capacity. See our{" "}
          <Link className="underline" href="/pricing">pricing</Link> for details.
        </div>
      </div>

      <CityGallery photos={photos} />

      <div className="flex flex-wrap gap-3">
        <Link href="/#quote" className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-emerald-600 text-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">Get Instant Quote</Link>
        <a href={`tel:${phone}`} className="inline-flex items-center justify-center h-11 px-5 rounded-xl border border-black/10 bg-white text-slate-900 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">Call</a>
        <a href={`sms:${phone}`} className="inline-flex items-center justify-center h-11 px-5 rounded-xl border border-black/10 bg-white text-slate-900 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">Text</a>
      </div>

      <CTAHotline />
    </div>
  );
}