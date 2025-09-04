import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const basePaths = ["/", "/services", "/process", "/faq", "/service-areas", "/quote"];
  const citySlugs = [
    "toronto",
    "mississauga",
    "brampton",
    "vaughan",
    "markham",
    "richmond-hill",
    "oakville",
    "etobicoke",
    "north-york",
    "scarborough",
  ];
  const cityPaths = citySlugs.map((s) => `/service-areas/${s}`);
  const all = [...basePaths, ...cityPaths];
  return all.map((p) => ({
    url: site + p,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.6,
  }));
}
