import type { Metadata } from "next";
import { Domaine } from "@/components/Domaine";

export const metadata: Metadata = {
  title: "Kogia Education",
  description:
    "Développer le savoir humain. Le seul domaine de Kogia qui contient aujourd'hui des produits en ligne : Kogia Kids, Coreon EDU et EduPlus Connect.",
  alternates: { canonical: "/education" },
};

export default function Page() {
  return (
    <Domaine
      nom="Kogia Education"
      mandat="Développer le savoir humain."
      intro="Pas « des logiciels pour l'école ». Le cycle complet de l'apprentissage, quelle que soit sa forme : un logiciel, une plateforme, un contenu, un service, ou une méthode d'enseignement."
      champs={[
        { nom: "Early Learning", quoi: "Avant l'école, par le jeu" },
        { nom: "School Education", quoi: "De la maternelle au CM2 et au-delà" },
        { nom: "Learning Platforms", quoi: "Les logiciels sur lesquels on apprend" },
        { nom: "Educational Operations", quoi: "Comment une école tourne vraiment" },
        { nom: "Content", quoi: "Fiches, leçons, programmes" },
        { nom: "Assessment", quoi: "Mesurer ce qui a été appris" },
        { nom: "Teacher Enablement", quoi: "Les outils de celui qui enseigne" },
        { nom: "Lifelong Learning", quoi: "Adultes, reconversion, curiosité" },
      ]}
      produits={[
        {
          nom: "Kogia Kids",
          quoi: "Des fiches imprimables gratuites pour l'école primaire. Pas de compte, pas de limite, pas de paiement. C'est aussi l'entrée de tout le domaine : les fiches gratuites amènent les parents et les enseignants dont les produits payants ont besoin.",
          lien: "https://kogiakids.com",
          libelle: "kogiakids.com",
        },
        {
          nom: "Coreon EDU",
          quoi: "L'ERP scolaire : évaluer une classe en trente secondes, suivre la journée d'un enfant en direct, laisser parents et enseignants organiser la vie commune.",
          lien: "https://edu.kogiagroup.com",
          libelle: "edu.kogiagroup.com",
        },
        {
          nom: "EduPlus Connect",
          quoi: "La gestion d'école : deux registres de présence, observations, tâches, rapports exportables, droits d'accès par module. Arabe par défaut, de droite à gauche partout. C'est le seul produit du domaine en usage quotidien réel — donc la source la plus fiable sur ce dont une école a vraiment besoin.",
          libelle: "en usage réel dans une école",
        },
      ]}
      notes={[
        {
          titre: "Le lien avec le reste de Kogia",
          texte: [
            "Un enfant qui apprend ici devrait, des années plus tard, être la même personne dans Kogia Skills — pas un nouveau compte. C'est le rôle du Learning Passport : un relevé qui traverse les années au lieu de s'arrêter au trimestre.",
            "C'est aussi ce qui relie Education à Skills : ce qu'on a appris devient ce qu'on sait faire, et ce qu'on sait faire devient ce qu'on peut prouver.",
          ],
        },
      ]}
      suite={[
        "Transformer les produits existants en utilisateurs, puis en clients qui paient. Les trois produits existent ; le client qui paie, non.",
        "Learning Passport — le relevé d'un enfant sur plusieurs années, qui alimente Kogia Skills.",
        "Teacher Toolkit — générer fiches, leçons et activités. L'extension commerciale naturelle de Kogia Kids.",
        "Parent Companion et Micro Learning attendent dans la banque d'idées, jusqu'à ce qu'un utilisateur réel les demande.",
      ]}
    />
  );
}
