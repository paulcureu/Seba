import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/menu";
import { site, legal } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/meniu", "/despre", "/rezervari", "/contact", ...legal.map((l) => l.href)];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...allProducts.map((p) => ({ url: `${site.url}/meniu/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
