import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "À propos",
  description: "L'histoire, la mission et les objectifs de Kogia.",
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      titre="L'histoire de Kogia"
      description="La page À propos (mission, valeurs, direction, contact) arrive avec la restructuration de contenu — pas encore écrite, pour ne pas publier un texte générique."
    />
  );
}
