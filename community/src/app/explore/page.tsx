import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Explorer",
  description: "Parcourez les articles Kogia par sujet.",
};

export default function ExplorePage() {
  return (
    <PlaceholderPage
      titre="L'exploration arrive"
      description="Le fil d'articles filtrable par sujet arrive une fois qu'il y a assez d'articles réels à explorer. En attendant, l'article publié vit sur kogiagroup.com."
    />
  );
}
