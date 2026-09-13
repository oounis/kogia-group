import type { Metadata } from "next";
import { Domaine } from "@/components/Domaine";

export const metadata: Metadata = {
  title: "Kogia Play",
  description:
    "Défier, créer et relier par le jeu. Un domaine délibérément vide : deux jeux ont été retirés le 12 septembre 2026 parce qu'ils avaient été construits avant que quiconque les demande.",
  alternates: { canonical: "/play" },
};

export default function Page() {
  return (
    <Domaine
      nom="Kogia Play"
      mandat="On revient jouer sans qu'on vous le demande."
      intro="« Play » plutôt que « Games », volontairement : Games enfermerait le domaine dans le jeu vidéo pour vingt ans. Aujourd'hui ce domaine est vide, et c'est un choix."
      champs={[
        { nom: "Games", quoi: "Jeux numériques et de plateau" },
        { nom: "Interactive Experiences", quoi: "Expériences interactives" },
        { nom: "Learning Through Play", quoi: "Apprendre en jouant" },
        { nom: "Challenges", quoi: "Défis logiques et éducatifs" },
        { nom: "Competition", quoi: "Compétition et classements" },
        { nom: "Creativity", quoi: "Création par le joueur" },
        { nom: "Social Play", quoi: "Jouer ensemble" },
      ]}
      produits={[]}
      notes={[
        {
          titre: "Pourquoi ce domaine mérite d'exister quand même",
          texte: [
            "Le jeu n'est pas une décoration. Il fait trois choses qu'aucun autre domaine ne fait aussi bien : on y revient sans qu'on vous le demande, la manière de jouer révèle un raisonnement mieux qu'un test, et un bon jeu voyage plus loin qu'une bonne fiche.",
          ],
        },
        {
          avertit: true,
          titre: "Pourquoi il est vide, et pourquoi c'est un choix",
          texte: [
            "Kharbga et ClampWars ont tous les deux été retirés le 12 septembre 2026. C'était correct : les deux avaient été construits avant que quiconque les demande, et aucun n'a atteint d'utilisateur.",
            "Play ne contiendra rien tant que Education et Skills n'auront pas de clients qui paient. Le domaine existe dans la structure pour que le jour où un jeu mérite sa place, il ait une maison, et ne devienne pas une nouvelle société.",
          ],
        },
      ]}
      suite={[
        "La règle de ce domaine : toute proposition doit répondre à « qui a demandé ça ? ».",
        "Si la réponse est « ce serait amusant à construire », elle va dans la banque d'idées, pas dans du code.",
        "Une seule idée y attend aujourd'hui : une plateforme de défis, mentaux et éducatifs.",
      ]}
    />
  );
}
