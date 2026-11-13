import type { MetadataRoute } from "next";
import { INDUSTRIES, PRODUCTS } from "@/lib/catalog";
import { INSIGHTS } from "@/lib/insights";
import { LANGS } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

/* Generated from the catalogue: a new product or industry appears here by
   being added to lib/catalog.ts. Every page exists in the three languages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: [string, number][] = [
    ["", 1],
    ["/industries", 0.9],
    ["/products", 0.9],
    ...INDUSTRIES.map((i) => [`/industries/${i.slug}`, 0.8] as [string, number]),
    ...PRODUCTS.map((p) => [`/products/${p.slug}`, 0.8] as [string, number]),
    ["/insights", 0.8],
    ...INSIGHTS.map((a) => [`/insights/${a.slug}`, 0.7] as [string, number]),
    ["/capabilities", 0.7],
    ["/how-we-work", 0.7],
    ["/presence", 0.6],
    ["/about", 0.6],
    ["/contact", 0.5],
    ["/privacy", 0.2],
    ["/terms", 0.2],
  ];
  return paths.flatMap(([p, priority]) =>
    LANGS.map((l) => ({
      url: `${SITE_URL}/${l}${p}`,
      priority,
      alternates: { languages: Object.fromEntries(LANGS.map((x) => [x, `${SITE_URL}/${x}${p}`])) },
    })),
  );
}
