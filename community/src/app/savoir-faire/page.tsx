import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import styles from "./savoir-faire.module.css";

export const metadata: Metadata = {
  title: "Comment on travaille",
  description:
    "Les règles internes de Kogia, chacune avec la panne qui l'a produite : la plateforme, ce qu'on vérifie avant de dire qu'une chose est faite, et la liste de ce qu'on ne fait pas.",
  alternates: { canonical: "/savoir-faire" },
};

/** Les règles de la maison. Chacune porte l'incident qui l'a produite, parce
 *  qu'une règle sans son incident se lit comme un slogan et se contourne
 *  aussi vite. Toutes viennent de pannes réelles, datées, racontées dans le
 *  journal. */
const REGLES: { titre: string; texte: string; origine: string }[] = [
  {
    titre: "Vert en développement n'est pas une preuve",
    texte:
      "Une chose n'est faite que quand elle a été vérifiée là où elle va servir, avec les données qu'elle va rencontrer. Tout le reste est une intention bien construite.",
    origine:
      "Un déploiement était vert, la base répondait, et personne ne pouvait se connecter : la base était vide, il n'y avait aucun compte. Un contrôle de santé qui interroge une base ne dit rien de ce qu'elle contient.",
  },
  {
    titre: "Une sauvegarde jamais restaurée n'est pas une sauvegarde",
    texte:
      "C'est une intention, et elle occupe de la place. Une sauvegarde n'existe qu'après avoir été rapatriée, déchiffrée, restaurée et comparée à la production.",
    origine:
      "L'exercice de restauration complet a trouvé ce qu'aucune relecture n'avait vu : le script de restauration portait sa propre copie d'un client réseau, et avait donc manqué le correctif posé la veille dans l'autre copie. L'envoi marchait, la restauration mourait.",
  },
  {
    titre: "Un chiffre sans sa méthode n'est qu'une affirmation",
    texte:
      "Chaque nombre publié sur ce site dit comment il a été obtenu, et à quelle date. Un chiffre qu'on ne sait pas reproduire n'a pas sa place sur la vitrine d'une société.",
    origine:
      "La page d'accueil affichait un temps de lecture écrit à la main, quatorze minutes, pendant que la page de l'article le calculait depuis le texte et en affichait quinze. Deux chiffres pour le même contenu, visibles par n'importe quel lecteur.",
  },
  {
    titre: "Une porte de qualité qu'un rendu correct ne peut pas franchir est pire que pas de porte",
    texte:
      "Un contrôle automatique qui se trompe apprend à l'équipe à le contourner, puis à le désactiver, puis il ne protège plus rien. Une porte se calibre sur des cas connus bons avant d'être branchée.",
    origine:
      "Le contrôle des fiches de Kogia Kids rejetait des rendus parfaitement corrects, à cause d'une tolérance écrite trop serrée. Refait sur des mesures réelles relevées sur le PDF.",
  },
  {
    titre: "Mesurer avant de régler",
    texte:
      "Un réglage fondé sur une impression déplace le problème. Et avant de croire une mesure, il faut vérifier l'instrument qui l'a produite.",
    origine:
      "Sur ClampWars, le générateur aléatoire donnait un premier tirage assez corrélé à sa graine pour que le même camp l'emporte douze fois sur douze. Aucune erreur, aucune alerte, et toutes les mesures d'équilibre prises avant cette découverte ne voulaient rien dire.",
  },
  {
    titre: "Une seule source de vérité, jamais deux copies",
    texte:
      "Deux copies d'une même information, c'est une information qui devient fausse. Les couleurs, les états des produits, les listes : elles sont déclarées une fois et générées partout ailleurs.",
    origine:
      "La liste des produits était recopiée à la main sur deux pages du site, avec des états qui ne concordaient déjà plus. Et les couleurs de la boutique de café étaient des copies à la main de celles de la maison, avec deux teintes presque identiques, jamais tout à fait les mêmes.",
  },
  {
    titre: "Un état honnête vaut mieux qu'un catalogue flatteur",
    texte:
      "« En préparation » dit la vérité, « bientôt » ne dit rien. Une page qui a l'air vide est plus honnête qu'une page remplie de rien, et un client qui découvre l'écart après avoir signé ne revient pas.",
    origine:
      "Le site portait cinq articles de remplissage pour ne pas paraître vide, et promettait une idée par semaine au-dessus d'un seul article réel. Les cinq ont été supprimés et la promesse retirée.",
  },
  {
    titre: "Écrire une chose qu'on croit savoir est la façon la moins chère d'en trouver les défauts",
    texte:
      "La documentation n'est pas une corvée d'après-coup : c'est un audit qui coûte une matinée et qui trouve des erreurs qu'aucun test n'atteint.",
    origine:
      "Mettre par écrit les recettes de Kogia Coffee a sorti trois erreurs qui étaient en vente, dont un produit vendu comme café qui n'en contient pas une trace. Aucune tasse n'a été goûtée pour les trouver.",
  },
];

/** Ce qu'on vérifie avant de dire qu'une chose est faite. */
const AVANT_DE_DIRE_FAIT: string[] = [
  "Le parcours joué en entier par un test automatique, jusqu'au résultat réel : un compte créé, pas un formulaire soumis.",
  "Une vérification en navigateur sur la version construite, pas sur le serveur de développement, parce qu'un cache de navigateur et un serveur chaud cachent la moitié des défauts.",
  "Les deux largeurs qui comptent : le grand écran et le téléphone à 390 pixels, où la barre du haut de ce site débordait de son écran pendant plusieurs jours sans que personne ne le voie.",
  "Le contrôle de production après la publication, et pas seulement avant : la mise en ligne casse des choses que la mise en scène ne casse pas.",
  "Une recherche explicite des béquilles de développement laissées dans la version publiée : comptes de démonstration, champs pré-remplis, pages de débogage.",
];

/** Ce qu'on ne fait pas. La section qui manque à la plupart des sites de
 *  société, et la plus utile : un client qui découvre ces limites après
 *  avoir signé ne revient jamais. */
const CE_QU_ON_NE_FAIT_PAS: string[] = [
  "Pas d'astreinte 24 heures sur 24. Une panne nocturne est traitée le matin. Un client qui a besoin d'une astreinte a besoin d'une équipe, et il faut le dire avant, pas après.",
  "Pas de bascule automatique en cas de panne de la machine : il n'y a qu'un serveur. C'est un choix de coût, assumé, et les sauvegardes sont là pour ça. Le deuxième serveur s'achètera quand un service le justifiera.",
  "Pas de logiciel de gestion multi-entreprises tout prêt. Douze produits d'une suite de gestion ont été écrits sur le papier, puis archivés, parce qu'aucun client ne les avait demandés. Ce sera un seul produit, quand un client le demandera et le paiera.",
  "Pas de tarif affiché. Un devis honnête demande de comprendre le besoin, et un tarif affiché sur un site est soit trop haut pour le petit projet, soit trop bas pour le vrai.",
  "Pas de faux avis, pas de logos de clients qu'on n'a pas, pas de chiffre arrondi vers le haut. Il y a une école en production, une seule, et elle n'est pas nommée.",
  "Pas encore d'arabe ni d'anglais sur ce site. Ce sera fait quand il y aura du contenu qui mérite d'être traduit, pas avant.",
];

export default function SavoirFairePage() {
  return (
    <>
      <EnTete actif="/savoir-faire" />

      <main className={styles.main}>
        <div className={styles.entete}>
          <h1>Comment on travaille</h1>
          <p className={styles.lede}>
            Kogia est une maison de logiciel d&apos;une personne. Ce qui
            remplace une équipe, ce sont des règles écrites, et chacune de ces
            règles vient d&apos;une panne réelle.
          </p>
          <p className={styles.sousLede}>
            Cette page existe parce que la promesse de qualité ne se démontre
            pas en la déclarant. Ce qui suit est donc l&apos;inverse d&apos;une
            page de valeurs : huit règles, chacune accompagnée de l&apos;erreur
            qui l&apos;a produite, la liste de ce qu&apos;on vérifie avant de
            dire qu&apos;une chose est faite, et la liste de ce qu&apos;on ne
            fait pas.
          </p>
        </div>

        <section className={styles.bloc}>
          <h2>Les huit règles, et la panne derrière chacune</h2>
          {REGLES.map((r, i) => (
            <div key={r.titre} className={styles.regle}>
              <span className={styles.regleNum}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{r.titre}</h3>
              <p>{r.texte}</p>
              <span className={styles.origine}>
                <strong>D&apos;où elle vient.</strong> {r.origine}
              </span>
            </div>
          ))}
        </section>

        <section className={styles.bloc}>
          <h2>Où tourne ce que vous lisez</h2>
          <p className={styles.intro}>
            Un seul serveur, et une architecture faite pour en héberger
            beaucoup d&apos;applications plutôt qu&apos;une seule. Ajouter la
            prochaine application demande une commande, aucun fichier partagé
            n&apos;est modifié, et le certificat couvre déjà son nom.
          </p>

          {/* Le diagramme est écrit en HTML : il se sélectionne, s'imprime,
              suit la taille de police du lecteur, et un lecteur d'écran en
              énonce les étages dans l'ordre. Une image ne ferait rien de tout
              cela. */}
          <figure className={styles.schema}>
            <div className={styles.etage}>
              <p className={styles.etageT}>Internet</p>
              <p className={styles.etageD}>
                Deux ports ouverts, et pas un troisième.
              </p>
            </div>
            <span className={styles.fleche} aria-hidden="true">↓</span>
            <div className={styles.etage}>
              <p className={styles.etageT}>Le routeur d&apos;entrée</p>
              <p className={styles.etageD}>
                Un certificat générique pour tout le domaine, et un routage par
                nom d&apos;hôte que chaque application déclare elle-même.
              </p>
            </div>
            <span className={styles.fleche} aria-hidden="true">↓</span>
            <div className={styles.etage}>
              <p className={styles.etageT}>Les applications</p>
              <p className={styles.etageD}>
                Chacune dans son conteneur, en plusieurs exemplaires, sur un
                réseau qui ne parle qu&apos;au routeur.
              </p>
            </div>
            <span className={styles.fleche} aria-hidden="true">↓</span>
            <div className={styles.etage}>
              <p className={styles.etageT}>PostgreSQL</p>
              <p className={styles.etageD}>
                Une seule grappe, une base et un rôle par application, et aucun
                port ouvert sur l&apos;hôte : cette base n&apos;existe pas
                depuis l&apos;extérieur.
              </p>
            </div>
            <span className={styles.fleche} aria-hidden="true">↓</span>
            <div className={styles.etage}>
              <p className={styles.etageT}>La sauvegarde nocturne</p>
              <p className={styles.etageD}>
                Elle exporte, restaure son propre export dans une base jetable,
                compare le nombre de tables, et seulement alors chiffre
                l&apos;archive et l&apos;envoie hors du serveur. Si la
                comparaison échoue, elle échoue bruyamment.
              </p>
            </div>
            <figcaption className={styles.legende}>
              Deux applications tournent dessus aujourd&apos;hui, dont le
              registre scolaire qui sert 323 élèves. La sauvegarde s&apos;exécute
              à 03:15 UTC, et le dernier exercice de restauration complet a
              retrouvé 18 tables sur 18.
            </figcaption>
          </figure>
        </section>

        <section className={styles.bloc}>
          <h2>Ce qu&apos;on vérifie avant de dire que c&apos;est fait</h2>
          <ul className={styles.liste}>
            {AVANT_DE_DIRE_FAIT.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </section>

        <section className={styles.bloc}>
          <h2>Ce qu&apos;on ne fait pas</h2>
          <p className={styles.intro}>
            Cette section manque à la plupart des sites de société, et
            c&apos;est probablement la plus utile de cette page. Un client qui
            découvre ces limites après avoir signé ne revient pas.
          </p>
          <ul className={styles.limites}>
            {CE_QU_ON_NE_FAIT_PAS.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </section>

        <section className={styles.bloc}>
          <h2>Avec quoi on construit</h2>
          <p className={styles.intro}>
            Peu de technologies, choisies pour durer plutôt que pour être
            nouvelles, et les mêmes d&apos;un projet à l&apos;autre : une seule
            personne ne peut pas entretenir six écosystèmes.
          </p>
          <p className={styles.pileT}>Web</p>
          <div className={styles.pile}>
            {["Next 16", "React 19", "TypeScript", "Vite", "Tailwind", "CSS Modules"].map((p) => (
              <span key={p} className={styles.pileItem}>{p}</span>
            ))}
          </div>
          <p className={styles.pileT}>Mobile</p>
          <div className={styles.pile}>
            {["Expo", "React Native", "MapLibre", "Android"].map((p) => (
              <span key={p} className={styles.pileItem}>{p}</span>
            ))}
          </div>
          <p className={styles.pileT}>Données et serveurs</p>
          <div className={styles.pile}>
            {["PostgreSQL 16", "PostGIS", "Prisma", "Docker", "Traefik", "Debian", "Cloudflare"].map((p) => (
              <span key={p} className={styles.pileItem}>{p}</span>
            ))}
          </div>
          <p className={styles.pileT}>Vérification</p>
          <div className={styles.pile}>
            {["Playwright", "CodeQL", "Lighthouse", "Sentry", "Dependabot"].map((p) => (
              <span key={p} className={styles.pileItem}>{p}</span>
            ))}
          </div>
        </section>

        <div className={styles.appel}>
          <h2>Si cette page vous convient, le reste se discute</h2>
          <p>
            Application, site, plateforme, ou juste un avis sur une idée. Je
            réponds personnellement, et je dis non quand je pense que le projet
            n&apos;a pas besoin de moi.
          </p>
          <div className={styles.appelActions}>
            <a href="mailto:contact@kogiagroup.com" className="bouton accent">
              Écrire à Kogia
            </a>
            <Link href="/realisations" className="bouton ligne">
              Voir les réalisations
            </Link>
          </div>
        </div>
      </main>

      <Pied />
    </>
  );
}
