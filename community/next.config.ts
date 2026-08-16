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
};

export default nextConfig;
