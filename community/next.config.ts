import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Le fichier public/ ne sert un dossier que si le chemin exact est demandé
     (/suite/index.html), pas /suite/ tout court comme le fait un serveur
     statique classique. La démo Soldéo/Relio vit dans public/suite/
     (copiée depuis site/suite/ lors du transfert du domaine) : ces deux
     réécritures reproduisent le comportement attendu. */
  async rewrites() {
    return [
      { source: "/suite", destination: "/suite/index.html" },
      { source: "/suite/", destination: "/suite/index.html" },
    ];
  },

  /* Anciennes URL du site statique (avant le transfert de domaine du
     2026-08-16). Elles ont été partagées sur Facebook et Reddit : sans
     redirection permanente, ces liens tombent en 404 et le référencement
     acquis est perdu. */
  async redirects() {
    return [
      {
        source: "/idees/:slug.html",
        destination: "/articles/:slug",
        permanent: true,
      },
      { source: "/idees", destination: "/explore", permanent: true },
      { source: "/idees/", destination: "/explore", permanent: true },
    ];
  },
};

export default nextConfig;
