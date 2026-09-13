import type { MetadataRoute } from "next";

const SITE = "https://kogiagroup.com";

/**
 * Le sitemap.
 *
 * Il était auparavant dérivé du catalogue de projets, du journal et des
 * articles publiés en base, pour qu'ajouter un contenu suffise à le rendre
 * indexable. Le site n'a plus de contenu dynamique depuis la reconstruction du
 * 13 septembre 2026 : c'est une vitrine de structure, dont les pages changent
 * quand la société change. Une liste tenue à la main est ici la source la plus
 * honnête, et la seule.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["/", 1],
    ["/ecosysteme", 0.9],
    ["/education", 0.8],
    ["/skills", 0.7],
    ["/business", 0.7],
    ["/research", 0.7],
    ["/play", 0.6],
    ["/about", 0.6],
    ["/contact", 0.5],
    ["/terms", 0.3],
    ["/privacy", 0.3],
  ];

  return pages.map(([chemin, priority]) => ({
    url: `${SITE}${chemin}`,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
