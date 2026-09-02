import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import Icone from "@/components/icons/Icone";
import { TRAVAUX, CHIFFRES_MAISON, LIBELLE_ETAT, PREMIER_JOUR } from "@/lib/travaux";
import { dateLisible } from "@/lib/journal";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Kogia est une maison de logiciel indépendante, d'une personne, entre la Tunisie et Bahreïn : dix projets menés depuis juin 2026, dont un registre scolaire qui sert 323 élèves tous les jours.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  /* La liste des produits vient du catalogue, comme sur la page d'accueil et
     sur les réalisations. Elle était recopiée à la main ici, et les deux
     copies ne s'accordaient déjà plus : cette page donnait à Kharbga une
     adresse publique que la page d'accueil ne connaissait pas. */
  return (
    <>
      <EnTete actif="/about" compact />

      <main className={styles.main}>
        <h1 className={styles.titre}>Kogia</h1>
        <p className={styles.lede}>
          Une maison de logiciel indépendante, fondée par Othman Ounis, entre la
          Tunisie et Bahreïn. On explore des idées, on construit celles qui
          méritent d&apos;exister, et l&apos;une d&apos;elles sert de vrais
          utilisateurs tous les jours.
        </p>
        <p className={styles.para}>
          Autant le dire tout de suite, parce que c&apos;est ce qui compte le
          plus pour décider si vous voulez travailler avec nous : Kogia est une
          personne. Ce qui remplace une équipe, ce sont des règles écrites, des
          vérifications automatiques et un journal public de ce qui a cassé.
          Les huit règles et les pannes qui les ont produites sont écrites
          en entier dans <Link href="/savoir-faire">comment on travaille</Link>,
          avec la liste de ce qu&apos;on ne fait pas.
        </p>
        <p className={styles.para}>
          Une idée est explorée sérieusement : problème, marché, modèle,
          risques, et un verdict honnête, y compris quand le verdict est
          négatif. On publie quand une idée vaut la lecture, pas pour tenir un
          calendrier.
        </p>

        {/* Les chiffres de la maison, tirés du même fichier que les projets. */}
        <div className={styles.chiffres}>
          {CHIFFRES_MAISON.map((c) => (
            <div key={c.libelle} className={styles.chiffre}>
              <span className={styles.chiffreValeur}>{c.valeur}</span>
              <span className={styles.chiffreLibelle}>{c.libelle}</span>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          Comptés le 2 septembre 2026 sur les dépôts, depuis le premier commit
          du {dateLisible(PREMIER_JOUR)}. La méthode est détaillée sur la page
          des <Link href="/realisations">réalisations</Link>.
        </p>

        <h2 className={styles.sousTitre}>Ce qu&apos;on a construit</h2>
        <p className={styles.para}>
          Dix projets, chacun avec son état réel. Quatre sont en pause ou
          volontairement arrêtés, et c&apos;est écrit : « en préparation » dit
          la vérité, « bientôt » ne dit rien.
        </p>
        <ul className={styles.produits}>
          {TRAVAUX.map((p) => (
            <li key={p.slug} className={styles.produit}>
              <Link href={`/realisations/${p.slug}`} className={styles.produitLien}>
                <span className={styles.lettre} aria-hidden="true">
                  <Icone nom={p.icone} taille="nav" />
                </span>
                <span className={styles.produitTexte}>
                  <span className={styles.produitNom}>{p.nom}</span>
                  <span className={styles.produitDetail}>
                    {p.domaine} · {LIBELLE_ETAT[p.etat].toLowerCase()}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className={styles.sousTitre}>La preuve qu&apos;on met en avant</h2>
        <p className={styles.para}>
          Une école utilise un registre construit ici : 323 élèves, dix
          classes, la présence prise par période, au téléphone, en arabe, par
          les enseignants eux-mêmes. L&apos;école n&apos;est pas nommée et
          aucun nom d&apos;enfant n&apos;apparaît nulle part sur ce site.
          C&apos;est le seul projet dont se servent des gens qui ne travaillent
          pas ici, et il est écrit comme tel partout.
        </p>

        <h2 className={styles.sousTitre}>Ce qu&apos;on publie</h2>
        <p className={styles.para}>
          Deux choses. Des <Link href="/explore">idées explorées</Link> jusqu&apos;au
          verdict, et un <Link href="/journal">journal</Link> de ce qui
          s&apos;est réellement passé, à la date où c&apos;est arrivé. Le
          journal ne contient aucun communiqué : ce sont des faits datés, et
          une bonne partie raconte une panne et comment elle a été fermée. Le
          registre des pannes d&apos;une maison de logiciel en dit plus long
          sur elle que sa liste de succès.
        </p>

        <div className={styles.cta}>
          <h2 className={styles.sousTitre}>Un projet en tête ?</h2>
          <p className={styles.para}>
            Application, site, plateforme, ou une idée lue ici. Je réponds
            personnellement, et je dis non quand je pense que le projet
            n&apos;a pas besoin de moi.
          </p>
          <div className={styles.ctaActions}>
            <a href="mailto:contact@kogiagroup.com" className="bouton accent">Écrire à Kogia</a>
            <Link href="/realisations" className="bouton ligne">Voir les réalisations</Link>
          </div>
        </div>
      </main>

      <Pied />
    </>
  );
}
