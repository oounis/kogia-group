import type { Metadata } from "next";
import { Fraunces, Source_Serif_4 } from "next/font/google";
import "./globals.css";

/**
 * Direction "Éditoriale" (2026-08-16) : Fraunces pour les titres, Source
 * Serif 4 pour le texte. Choisie par Othman après comparaison de trois
 * directions dans Figma. Remplace Inter partout.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Kogia",
    template: "%s · Kogia",
  },
  description:
    "Kogia est une communauté pour découvrir, publier et développer des idées sérieuses. Articles pratiques, gens curieux, projets qui deviennent réels.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
