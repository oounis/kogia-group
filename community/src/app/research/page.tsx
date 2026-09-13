import type { Metadata } from "next";
import { Domaine } from "@/components/Domaine";

export const metadata: Metadata = {
  title: "Kogia Research",
  description:
    "Observer le monde avant de construire pour lui. Une capacité du groupe, pas une activité commerciale : elle décide de ce qui mérite d'exister, et c'est la seule partie qui amène des inconnus.",
  alternates: { canonical: "/research" },
};

export default function Page() {
  return (
    <Domaine
      nom="Kogia Research"
      mandat="Observer le monde avant de construire pour lui."
      intro="Une capacité du groupe, pas une activité commerciale. Elle ne vend rien. Elle décide de ce qui mérite d'exister et, tout aussi important, de ce qui ne le mérite pas."
      champs={[
        { nom: "Education", quoi: "Ce que l'apprentissage devient" },
        { nom: "Future of Work", quoi: "Ce que le travail devient" },
        { nom: "Skills", quoi: "Ce que les marchés demandent" },
        { nom: "AI & Society", quoi: "Ce que l'automatisation déplace" },
        { nom: "Human Development", quoi: "Ce qui fait progresser une personne" },
        { nom: "Digital Behavior", quoi: "Ce que les gens font vraiment" },
      ]}
      produits={[]}
      notes={[
        {
          titre: "Elle a déjà servi une fois",
          texte: [
            "La recherche sur le marché tunisien a montré que les restaurants sont bien servis et que les places de marché d'artisans sont encombrées, pendant que les cabinets professionnels tournent encore sur papier.",
            "Ce seul constat a réorienté tout le domaine Business, avant qu'une ligne de code soit écrite.",
          ],
        },
        {
          titre: "C'est aussi la seule partie qui amène des inconnus",
          texte: [
            "Un logiciel ne se cite pas. Une donnée, si. Des indicateurs publics, gratuits, sourcés et régulièrement mis à jour se trouvent sur un moteur de recherche, se discutent, se partagent, et finissent par être repris.",
            "C'est le chemin : une recherche publiée amène un lecteur, le lecteur trouve le domaine, le domaine mène au produit.",
          ],
        },
        {
          avertit: true,
          titre: "À une condition",
          texte: [
            "Chaque indicateur doit dire ses sources et sa méthode. Un chiffre que personne ne peut vérifier n'est pas de la recherche, c'est de la publicité, et il sera lu comme tel.",
            "C'est la même règle que sur le reste de ce site : un chiffre sans sa méthode n'est qu'une affirmation.",
          ],
        },
      ]}
      suite={[
        "Rien n'est publié pour l'instant. Le premier geste est de publier, pas de construire.",
        "Un indicateur, un article, un constat réel, et vérifiable.",
        "Kogia Labs suivra : l'endroit où un problème vérifié devient une expérience, avec une page qui la décrit avant qu'on écrive du code.",
        "L'ordre est : idée, recherche, page, dix utilisateurs, puis du code. Pas l'inverse.",
      ]}
    />
  );
}
