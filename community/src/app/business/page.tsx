import type { Metadata } from "next";
import { Domaine } from "@/components/Domaine";

export const metadata: Metadata = {
  title: "Kogia Business",
  description:
    "Moderniser le travail qui tourne encore sur papier, téléphone, WhatsApp et Excel. Le domaine le plus proche du revenu, et celui où la recherche compte plus que le code.",
  alternates: { canonical: "/business" },
};

export default function Page() {
  return (
    <Domaine
      nom="Kogia Business"
      mandat="Des métiers entiers tournent encore sur du papier."
      intro="Pas une société de service qui fabrique des sites sur commande. Une méthode : trouver un métier resté au papier, vérifier que personne ne l'a déjà bien résolu, puis construire le logiciel d'un seul d'entre eux."
      champs={[
        { nom: "Professional Services", quoi: "Juridique, comptabilité, conseil, administratif" },
        { nom: "Field Services", quoi: "Maintenance, bâtiment, technique" },
        { nom: "Automotive", quoi: "Garages et ateliers" },
        { nom: "Property", quoi: "Gestion immobilière, locations, exploitation" },
        { nom: "Commerce", quoi: "Commerce de proximité, petites structures" },
        { nom: "Operations", quoi: "Agenda, documents, clients, facturation, flux de travail" },
      ]}
      produits={[]}
      notes={[
        {
          titre: "Pourquoi ce domaine peut rapporter en premier",
          texte: [
            "Son client a déjà une activité, ressent déjà le coût du problème en heures et en argent, et paie déjà pour des outils. Il n'y a pas d'audience à construire d'abord.",
            "Les autres domaines construisent de la valeur humaine sur le long terme, mais lentement. Celui-ci a la distance la plus courte jusqu'au premier client qui paie.",
          ],
        },
        {
          titre: "Ce que la recherche a déjà écarté",
          texte: [
            "Les restaurants sont déjà servis en Tunisie : Kessti, Wings, Al-Makhzan couvrent caisse, cuisine, stock, QR et fournisseurs. Arriver avec une caisse de plus serait une copie générique.",
            "Les places de marché d'artisans aussi : ServicePro, Service.tn, Guedli mettent déjà en relation plombiers et électriciens avec des clients. Mais elles mettent en relation, elles ne font pas tourner l'activité du professionnel. C'est un autre produit, et personne ne tient les deux bouts.",
            "Ce qui reste ouvert : les cabinets et offices professionnels. L'État numérise le tribunal ; personne ne numérise le cabinet : les clients, les dossiers, les rendez-vous, les documents, les rappels, la recherche, l'archivage, la facturation.",
          ],
        },
        {
          avertit: true,
          titre: "Une limite qui n'est pas négociable",
          texte: [
            "Pour les métiers juridiques, Kogia gère le flux de travail autour de la profession. Kogia ne remplace pas un registre officiel, un acte officiel, ni une signature légale sans examen juridique qualifié.",
            "Ce n'est pas une clause de style : c'est une contrainte de conception, et elle décide de ce que le produit a le droit d'être.",
          ],
        },
      ]}
      suite={[
        "Rien n'est construit, et la prochaine étape n'est pas du code.",
        "Parler à dix ou vingt professionnels réels : voir le flux de travail tel qu'il est, ce qui prend le plus de temps, ce pour quoi ils paient déjà, ce qu'ils refuseraient de changer, et là où la loi contraint la procédure.",
        "Les scores de priorité par secteur sont des hypothèses de recherche, pas des données de marché prouvées. Les entretiens les transforment en faits, ou les tuent à bas prix.",
        "Trois concepts attendent : Kogia Office (l'espace de travail d'un cabinet), Kogia Flow (transformer la paperasse en flux), Kogia Desk (le système d'exploitation d'une petite activité).",
      ]}
    />
  );
}
