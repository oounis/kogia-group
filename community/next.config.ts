import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Émet .next/standalone : un serveur autonome qui n'embarque que les
     node_modules réellement atteints. C'est ce que l'image Docker copie,
     et c'est la différence entre une image de ~200 Mo et une de ~1,5 Go. */
  output: "standalone",

  /* Anciennes URL, en deux couches.

     1. Le site statique d'avant le transfert de domaine (2026-08-16) :
        /idees/<slug>.html, partagées sur Facebook et Reddit.
     2. La plateforme communautaire retirée le 2026-09-13 : /articles,
        /explore, /journal, /realisations, /savoir-faire, /join, /login, et
        la démo Vite servie sous /suite/.

     Jusqu'au 2026-10-11, la première couche redirigeait vers la seconde
     (/idees/x.html → /articles/x, /idees → /explore), qui n'existait plus :
     un lien ancien faisait une redirection PUIS un 404. Chaque destination
     ci-dessous est une route réelle de src/app, et la fumée de production
     (smoke/production.spec.ts) suit chacune de ces redirections jusqu'à un
     200. Les contenus d'origine ne reviennent pas : on envoie la personne
     sur la page qui dit aujourd'hui ce que Kogia est, pas sur une page vide.

     `/suite/:path*` passe avant les fichiers de public/ (Next évalue les
     redirections avant le système de fichiers), ce qui rend public/suite/
     inatteignable : la démo Soldéo/Relio relevait du domaine Business. */
  async redirects() {
    const vers = (source: string, destination: string) => ({
      source,
      destination,
      permanent: true,
    });
    /* 2026-11-09 : le site passe à trois niveaux (société, secteurs,
       produits) et à trois langues. Les anciennes adresses en français
       renvoient vers leur équivalent sous /fr. */
    return [
      vers("/idees", "/fr/products"),
      vers("/idees/:slug.html", "/fr/products"),
      vers("/articles/:slug", "/fr/products"),
      vers("/explore", "/fr/products"),
      vers("/journal", "/fr/about"),
      vers("/realisations", "/fr/products"),
      vers("/realisations/:slug", "/fr/products"),
      vers("/savoir-faire", "/fr/capabilities"),
      vers("/suite", "/fr/industries/enterprise"),
      vers("/suite/:path*", "/fr/industries/enterprise"),
      vers("/join", "/fr/contact"),
      vers("/login", "/fr/contact"),
      vers("/ecosysteme", "/fr/industries"),
      vers("/education", "/fr/industries/education"),
      vers("/business", "/fr/industries/enterprise"),
      vers("/skills", "/fr/industries"),
      vers("/play", "/fr/industries"),
      vers("/research", "/fr/about"),
    ];
  },

  /* Retire `x-powered-by: Next.js` — annoncer sa pile et sa version ne sert
     qu'à celui qui cherche une faille connue. */
  poweredByHeader: false,

  /* En-têtes de sécurité. Cloudflare Web Analytics est le seul script tiers
     autorisé. Next utilise encore des scripts et styles inline ; une
     politique à nonce nécessite une migration dédiée. */
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://cloudflareinsights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
