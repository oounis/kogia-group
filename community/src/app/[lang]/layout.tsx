import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Cairo, Inter, Sora } from "next/font/google";
import { IMAGE_PARTAGE, SITE_URL } from "@/lib/site";
import { META } from "@/lib/copy";
import { LANGS, OG_LOCALE, dir, isLang, tr } from "@/lib/i18n";
import "../site.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
/* Sora: titles, and the brand lockup, whose word is SVG <text> in Sora. */
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["500", "600", "700", "800"], display: "swap" });
/* Cairo: Arabic text and titles, the same face Kogia Systems uses. */
const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], display: "swap" });

/* Cloudflare Web Analytics: no cookie, public token by design. */
const CF_ANALYTICS_TOKEN = "0cb53abfe15a41e1baca72e3ff184e52";

export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: tr(META.title, lang), template: "%s · KogiaGroup" },
    description: tr(META.description, lang),
    openGraph: { type: "website", siteName: "KogiaGroup", locale: OG_LOCALE[lang], images: [IMAGE_PARTAGE] },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} dir={dir(lang)} className={`${inter.variable} ${sora.variable} ${cairo.variable}`}>
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
