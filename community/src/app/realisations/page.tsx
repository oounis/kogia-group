import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import Icone from "@/components/icons/Icone";
import {
  TRAVAUX, CHIFFRES_MAISON, LIBELLE_ETAT, PREMIER_JOUR, type Etat,
} from "@/lib/travaux";
import { dateLisible } from "@/lib/journal";
import styles from "./realisations.module.css";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Dix projets menés depuis juin 2026 : un registre scolaire en production, une plateforme d'hébergement, des applications, des jeux et un atelier de café. Chaque projet avec son état réel et ses chiffres mesurés.",
  alternates: { canonical: "/realisations" },
};

/** L'ordre d'affichage : ce qui sert de vrais utilisateurs d'abord, ce qui
 *  n'est qu'écrit en dernier. Un visiteur qui ne lit que les trois premières
 *  cartes doit tomber sur ce qui existe le plus solidement. */
const ORDRE: Etat[] = ["production", "demo", "chantier", "pause", "prepare"];

export default function RealisationsPage() {
  const classes: Record<Etat, string> = {
    production: styles.production,
    demo: styles.demo,
    chantier: styles.chantier,
    pause: styles.pause,
    prepare: styles.prepare,
  };

  const travaux = [...TRAVAUX].sort(
    (a, b) => ORDRE.indexOf(a.etat) - ORDRE.indexOf(b.etat),
  );

  return (
    <>
      <EnTete actif="/realisations" />

      <main className={styles.main}>
        <div className={styles.entete}>
          <h1>Ce qu&apos;on a construit</h1>
          <p className={styles.lede}>
            Dix projets depuis le {dateLisible(PREMIER_JOUR)} : un registre
            scolaire qui sert une vraie école tous les jours, la plateforme qui
            l&apos;héberge, deux applications mobiles, deux jeux de stratégie,
            un atelier de café et le site que vous lisez.
          </p>
          <p className={styles.sousLede}>
            Chaque projet porte son état réel, et l&apos;état réel n&apos;est pas
            toujours flatteur : quatre de ces dix projets sont en pause ou
            volontairement arrêtés, et c&apos;est écrit. « En production » est
            réservé à du logiciel dont se servent des gens qui ne travaillent
            pas ici. Une démo publique n&apos;est pas une production.
          </p>
        </div>

        <div className={styles.bande}>
          {CHIFFRES_MAISON.map((c) => (
            <div key={c.libelle} className={styles.chiffre}>
              <span className={styles.chiffreValeur}>{c.valeur}</span>
              <span className={styles.chiffreLibelle}>{c.libelle}</span>
            </div>
          ))}
        </div>
        <p className={styles.methode}>
          Comment ces chiffres sont obtenus, parce qu&apos;un nombre sans sa
          méthode n&apos;est qu&apos;une affirmation : les changements et les
          lignes de code sont comptés le 2 septembre 2026 sur les neuf dépôts
          qui portent du code, fichiers de dépendances et fichiers générés
          exclus. Les 323 élèves sont relevés dans la base de production, et
          l&apos;école n&apos;est pas nommée.
        </p>

        <p className={styles.sectionT}>Les dix projets</p>
        <ul className={styles.grille}>
          {travaux.map((t) => (
            <li key={t.slug}>
              <Link href={`/realisations/${t.slug}`} className={styles.carte}>
                <div className={styles.carteHaut}>
                  <span className={styles.icone} aria-hidden="true">
                    <Icone nom={t.icone} taille="nav" />
                  </span>
                  <span className={styles.carteTitres}>
                    <h3>{t.nom}</h3>
                    <span className={styles.domaine}>{t.domaine}</span>
                  </span>
                </div>

                <p className={styles.baseline}>{t.baseline}</p>

                <div className={styles.mini}>
                  {t.chiffres.slice(0, 2).map((c) => (
                    <span key={c.libelle} className={styles.miniItem}>
                      <span className={styles.miniValeur}>{c.valeur}</span>
                      <span className={styles.miniLibelle}>{c.libelle}</span>
                    </span>
                  ))}
                </div>

                <div className={styles.carteBas}>
                  <span className={`${styles.etat} ${classes[t.etat]}`}>
                    {LIBELLE_ETAT[t.etat]}
                  </span>
                  <span className={styles.lire}>Lire le détail</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.appel}>
          <h2>Vous avez un projet, ou une école, ou un doute</h2>
          <p>
            Le travail se fait sur commande autant que par curiosité. Si vous
            avez un besoin qui ressemble à l&apos;un de ces projets, ou si vous
            pensez qu&apos;un de ces états est trop optimiste, dites-le : je
            réponds personnellement.
          </p>
          <div className={styles.appelActions}>
            <a href="mailto:contact@kogiagroup.com" className="bouton accent">
              Écrire à Kogia
            </a>
            <Link href="/savoir-faire" className="bouton ligne">
              Comment on travaille
            </Link>
          </div>
        </div>
      </main>

      <Pied />
    </>
  );
}
