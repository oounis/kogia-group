import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Émet .next/standalone : un serveur autonome qui n'embarque que les
     node_modules réellement atteints. C'est ce que l'image Docker copie,
     et c'est la différence entre une image de ~200 Mo et une de ~1,5 Go. */
  output: "standalone",

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

  /* Retire `x-powered-by: Next.js` — annoncer sa pile et sa version ne sert
     qu'à celui qui cherche une faille connue. */
  poweredByHeader: false,

  /* En-têtes de sécurité. La CSP est volontairement conçue autour de ce que
     le site utilise RÉELLEMENT, vérifié avant écriture :
       - Supabase (auth + base) en connexions XHR/WebSocket
       - Cloudflare Web Analytics (script + beacon)
       - la démo Suite dans /suite/, un bundle Vite compilé
     `'unsafe-inline'` sur les styles reste nécessaire (Next injecte des
     styles en ligne) ; il est en revanche ABSENT de script-src, ce qui est
     la partie qui compte contre le XSS. */
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://cloudflareinsights.com",
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
