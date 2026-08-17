import type { MetadataRoute } from "next";

/**
 * L'ancien site statique avait un robots.txt ; le nouveau n'en avait plus
 * après le transfert de domaine (2026-08-16). Les routes privées sont déjà
 * en noindex via leurs métadonnées, mais on les exclut aussi ici pour ne
 * pas gaspiller le budget d'exploration.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/feed",
        "/write",
        "/drafts",
        "/settings/",
        "/admin/",
        "/onboarding",
        "/auth/",
        "/join",
        "/login",
      ],
    },
    sitemap: "https://kogiagroup.com/sitemap.xml",
  };
}
