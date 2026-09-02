import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import { JOURNAL, journalTrie, dateLisible, type Entree } from "@/lib/journal";
import styles from "./journal.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Ce qui s'est réellement passé chez Kogia, à la date où c'est arrivé. Pas de communiqué : des faits datés, dont beaucoup racontent une erreur et comment elle a été fermée.",
  alternates: { canonical: "/journal" },
};

const MOIS_LONG = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

/** Le titre d'un mois, depuis « 2026-08-30 ». Découpé à la main plutôt que
 *  passé à `Intl` sur un `new Date()`, qui lit une date nue en UTC et
 *  renverrait « juillet » pour le 1ᵉʳ août à un lecteur situé à l'ouest de
 *  Greenwich. */
function titreDuMois(iso: string): string {
  const [a, m] = iso.split("-");
  return `${MOIS_LONG[Number(m) - 1]} ${a}`;
}

/** Regroupe les entrées par mois en gardant l'ordre reçu, du plus récent au
 *  plus ancien. Un `Map` plutôt qu'un objet : il conserve l'ordre
 *  d'insertion, ce qu'un objet ne garantit pas pour des clés textuelles. */
function parMois(entrees: Entree[]): [string, Entree[]][] {
  const groupes = new Map<string, Entree[]>();
  for (const e of entrees) {
    const cle = e.date.slice(0, 7);
    const liste = groupes.get(cle);
    if (liste) liste.push(e);
    else groupes.set(cle, [e]);
  }
  return [...groupes.entries()];
}

export default function JournalPage() {
  const entrees = journalTrie();
  const groupes = parMois(entrees);
  const rubriques = new Set(JOURNAL.map((e) => e.rubrique)).size;
  const projets = new Set(JOURNAL.map((e) => e.projet).filter(Boolean)).size;

  return (
    <>
      <EnTete actif="/journal" />

      <main className={styles.main}>
        <div className={styles.entete}>
          <h1>Journal</h1>
          <p className={styles.lede}>
            Ce qui s&apos;est réellement passé, à la date où c&apos;est arrivé.
          </p>
          <p className={styles.sousLede}>
            Ce n&apos;est pas une rubrique d&apos;actualités. Il n&apos;y a
            aucun communiqué, aucune annonce de partenariat, aucun « nous
            sommes ravis de ». Chaque entrée est un fait daté, tiré d&apos;un
            changement de code, d&apos;un audit ou d&apos;une observation en
            production, et une bonne partie raconte une erreur et comment elle
            a été fermée. C&apos;est délibéré : le registre des pannes
            d&apos;une maison de logiciel en dit plus long sur elle que sa
            liste de succès.
          </p>
        </div>

        <div className={styles.compte}>
          <span><strong>{entrees.length}</strong> entrées</span>
          <span><strong>{projets}</strong> projets concernés</span>
          <span><strong>{rubriques}</strong> rubriques</span>
          <span>
            de {dateLisible(entrees[entrees.length - 1].date)} à{" "}
            {dateLisible(entrees[0].date)}
          </span>
        </div>

        {groupes.map(([cle, liste]) => (
          <section key={cle} className={styles.mois}>
            <h2 className={styles.moisT}>{titreDuMois(liste[0].date)}</h2>
            {liste.map((e) => (
              <article key={e.titre} className={styles.entree}>
                <div className={styles.entreeHaut}>
                  <time className={styles.date} dateTime={e.date}>
                    {dateLisible(e.date)}
                  </time>
                  <span className={styles.rubrique}>{e.rubrique}</span>
                  {e.projet && <span className={styles.projet}>{e.projet}</span>}
                </div>
                <h3>{e.titre}</h3>
                <p>{e.texte}</p>
                {e.chiffre && <p className={styles.chiffre}>{e.chiffre}</p>}
              </article>
            ))}
          </section>
        ))}

        <div className={styles.appel}>
          <h2>Le journal s&apos;arrête au premier commit</h2>
          <p>
            Il commence le 18 juin 2026 et il n&apos;y a rien avant, parce
            qu&apos;avant il n&apos;y avait rien. Les projets que ces entrées
            racontent sont détaillés un par un dans les réalisations, avec
            leurs chiffres et leur état réel.
          </p>
          <div className={styles.appelActions}>
            <Link href="/realisations" className="bouton accent">
              Voir les réalisations
            </Link>
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
