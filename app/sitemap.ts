import type { MetadataRoute } from "next";
import { gtaCities } from "@/config/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticPaths = [
    "/",
    "/quote",
    "/residential",
    "/condo",
    "/workplace",
    "/panel-upgrades",
    "/rebates-and-permits",
    "/about",
    "/contact",
    "/faq",
  ];
  const cityPaths = gtaCities.map((c) => `/service-areas/${c.toLowerCase().replace(/\s+/g, "-")}`);
  return [...staticPaths, ...cityPaths].map((p) => ({ url: base + p, changeFrequency: "weekly", priority: p === "/" ? 1 : 0.6 }));
}

