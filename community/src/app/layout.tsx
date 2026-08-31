import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  /* Sans metadataBase, Next rendait les images Open Graph relatives en
     `http://localhost:10000/...` en production : chaque partage Facebook,
     Reddit, LinkedIn ou WhatsApp affichait un aperçu cassé. */
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Kogia",
    locale: "fr_FR",
    url: SITE_URL,
    /* L'ancien site statique avait cette image de partage (1200×630) ; la
       migration l'a perdue, donc tout partage d'une page autre qu'un
       article s'affichait sans visuel. Les articles gardent leur propre
       couverture, qui remplace celle-ci. */
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Kogia" }],
  },
  twitter: { card: "summary_large_image" },
  title: {
    /* « Kogia » seul faisait 5 caractères : dans un résultat Google ou un
       onglet, rien n'indiquait de quoi il s'agit. Le gabarit reste court
       pour les pages internes, seule la page d'accueil se décrit. */
    default: "Kogia, des idées explorées sérieusement",
    template: "%s · Kogia",
  },
  description:
    "Kogia est une communauté pour découvrir, publier et développer des idées sérieuses. Articles pratiques, gens curieux, projets qui deviennent réels.",
};

/* Cloudflare Web Analytics, RESTAURÉ le 2026-08-17. L'ancien site statique
   portait ce beacon (créé le 2026-08-13) ; le transfert de domaine du
   2026-08-16 l'a fait disparaître sans que personne ne le remarque, donc
   kogiagroup.com n'a plus mesuré aucune visite pendant une journée, au
   moment précis où le trafic Facebook/Reddit arrive. Le jeton est public
   par conception (il vit dans la source de la page), ce n'est pas un
   secret. Sans cookie, sans donnée personnelle. */
const CF_ANALYTICS_TOKEN = "0cb53abfe15a41e1baca72e3ff184e52";

/* Type explicite plutôt que le global `LayoutProps<"/">` généré par Next :
   celui-ci vit dans `.next/types/`, donc il n'existe qu'APRÈS un build, et
   `tsc --noEmit` échouait sur un dépôt propre (« Cannot find name
   LayoutProps »). Un layout racine n'a de toute façon pas de paramètre de
   route : les deux types sont équivalents ici, et celui-ci ne dépend pas de
   l'ordre des étapes en CI. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        {children}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={`{"token": "${CF_ANALYTICS_TOKEN}"}`}
        />
      </body>
    </html>
  );
}
