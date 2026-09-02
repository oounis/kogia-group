import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { TRAVAUX } from "@/lib/travaux";
import { journalTrie } from "@/lib/journal";

const SITE = "https://kogiagroup.com";

/**
 * Sitemap réel : les articles publiés sont lus dans la base, pas codés en
 * dur, donc publier un article le met automatiquement dans le sitemap.
 * L'ancien site statique générait l'équivalent via tools/construire.py.
 *
 * Les pages de vitrine sont dérivées du catalogue et du journal, pour la
 * même raison : ajouter un projet dans `lib/travaux` doit suffire à le
 * rendre indexable. Une liste de routes tenue à la main ici serait une
 * deuxième source de vérité, et donc une source qui se périme.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* Le journal a une date réelle : sa dernière entrée sert de date de
     dernière modification, plutôt que la date du jour, qui dirait aux robots
     que la page change quotidiennement alors qu'elle ne change pas. */
  const dernierJournal = journalTrie()[0]?.date;

  const pagesFixes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/realisations`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${SITE}/journal`,
      lastModified: dernierJournal ? new Date(dernierJournal) : undefined,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${SITE}/savoir-faire`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/explore`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const projets: MetadataRoute.Sitemap = TRAVAUX.map((t) => ({
    url: `${SITE}/realisations/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

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

    return [...pagesFixes, ...projets, ...articles];
  } catch {
    // Base injoignable : mieux vaut un sitemap partiel qu'une page en erreur.
    return [...pagesFixes, ...projets];
  }
}
