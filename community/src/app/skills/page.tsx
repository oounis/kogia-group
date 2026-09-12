import type { Metadata } from "next";
import { Domaine } from "@/components/Domaine";

export const metadata: Metadata = {
  title: "Kogia Skills",
  description:
    "Transformer une capacité humaine en opportunité. Un domaine qui n'existe encore que dans la structure : rien n'est construit, et cette page dit pourquoi.",
  alternates: { canonical: "/skills" },
};

export default function Page() {
  return (
    <Domaine
      nom="Kogia Skills"
      mandat="Transformer une capacité humaine en opportunité."
      intro="Volontairement beaucoup plus large qu'un site d'offres d'emploi. Un site d'offres publie des annonces. Kogia Skills tiendrait le relevé de ce qu'une personne sait faire, prouvé, et de ce que cela lui ouvre."
      champs={[
        { nom: "Identity", quoi: "Qui peux-tu devenir ?" },
        { nom: "Skills", quoi: "Que sais-tu faire ?" },
        { nom: "Development", quoi: "Que peux-tu apprendre ?" },
        { nom: "Certification", quoi: "Que peux-tu prouver ?" },
        { nom: "Opportunities", quoi: "Où tes compétences peuvent-elles te mener ?" },
        { nom: "Work", quoi: "Emploi, projets, contrats" },
        { nom: "Mobility", quoi: "Local et international" },
        { nom: "Organizations", quoi: "Trouver et développer les talents" },
      ]}
      produits={[]}
      notes={[
        {
          titre: "Les trois idées qui comptent",
          texte: [
            "Skill Passport — une identité professionnelle vérifiée. Un CV affirme « je suis excellent en électricité » et personne ne peut le vérifier. Un passeport porte les preuves.",
            "Opportunity Radar — au lieu que la personne cherche, elle se décrit une fois, et le système lui rapporte les opportunités qui correspondent, avec un score. C'est la réponse à « pourquoi quelqu'un reviendrait-il sur le site ? » : les opportunités changent tous les jours, pas la personne.",
            "Kogia Proof — la preuve qu'une compétence est réelle, tirée de plusieurs sources indépendantes : évaluations, certificats, vérification par un employeur, travaux réalisés, avis de clients.",
          ],
        },
        {
          avertit: true,
          titre: "Une contrainte qu'on s'impose d'avance",
          texte: [
            "Un score sur une personne doit être décomposable et contestable. Un nombre qu'on ne peut pas ouvrir, dont on ne peut pas discuter, et qui sort d'un modèle seul, n'est pas une preuve : c'est un risque, juridique et humain.",
            "Chaque composante doit être visible, et chaque composante doit pouvoir être contestée par la personne concernée.",
          ],
        },
        {
          titre: "La boucle qui rend Kogia Harmony réelle",
          texte: [
            "Le Radar trouve une correspondance à 72 %. Pourquoi pas 90 ? Parce qu'il manque une certification et un niveau de langue. La personne va l'apprendre dans Kogia Education, le prouve avec Kogia Proof, et la correspondance passe à 91 %.",
            "Education et Skills se rendent mutuellement plus utiles. C'est l'idée la plus solide de tout l'écosystème sur le long terme.",
          ],
        },
      ]}
      suite={[
        "Rien n'est construit : pas de dépôt de code, pas de domaine, pas de logo.",
        "Le premier produit serait volontairement petit : un profil, des préférences d'opportunité, et un Radar simple.",
        "Avant cela : vérifier que le problème existe pour de vraies personnes, et qu'elles reviendraient.",
        "Un domaine ne se crée pas parce qu'on a une idée. Il se crée quand il y a des utilisateurs, une valeur et un chemin vers le revenu.",
      ]}
    />
  );
}
