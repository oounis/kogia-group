import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const SITE = "https://kogiagroup.com";

/**
 * Sitemap réel : les articles publiés sont lus dans la base, pas codés en
 * dur, donc publier un article le met automatiquement dans le sitemap.
 * L'ancien site statique générait l'équivalent via tools/construire.py.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pagesFixes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/explore`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.6 },
  ];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select("slug, updated_at")
      .eq("status", "published")
      .eq("visibility", "public");

    const articles: MetadataRoute.Sitemap = (data ?? []).map((a) => ({
      url: `${SITE}/articles/${a.slug}`,
      lastModified: a.updated_at ? new Date(a.updated_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

    return [...pagesFixes, ...articles];
  } catch {
    // Base injoignable : mieux vaut un sitemap partiel qu'une page en erreur.
    return pagesFixes;
  }
}
