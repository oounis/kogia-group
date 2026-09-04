import { TRAVAUX, LIBELLE_ETAT_COURT, type Etat } from "@/lib/travaux";
import styles from "./EtatProjets.module.css";

/**
 * L'état réel du portefeuille, en un schéma.
 *
 * La page des réalisations annonçait dix projets et listait dix cartes. Il
 * fallait les compter à la main pour savoir combien tournent réellement, et
 * une carte « en pause » avait le même poids visuel qu'une carte en
 * production. Un visiteur venu jauger la société repartait sans le chiffre
 * qui compte.
 *
 * Le schéma est une barre proportionnelle, pas un camembert : comparer des
 * longueurs sur un axe commun est plus juste que comparer des angles, et une
 * part de 10 % dans un camembert est illisible.
 *
 * Aucun chiffre n'est écrit ici. Tout est compté depuis `lib/travaux`, la
 * source unique. Ajouter un projet met le schéma à jour tout seul, et il ne
 * peut donc pas mentir en se périmant.
 */

/* L'ordre raconte quelque chose : de ce qui sert des gens aujourd'hui vers ce
   qui n'a pas encore commencé. Ce n'est pas l'ordre alphabétique. */
const ORDRE: Etat[] = ["production", "demo", "chantier", "pause", "prepare"];

/* LA COULEUR ICI EST CALCULEE, PAS CHOISIE.
 *
 * Premiere version: j'avais pris quatre teintes de `--k-series-*` a l'oeil.
 * Le validateur de palette les a refusees, et il avait raison: series-5
 * (ambre #B07414) et series-3 (terre cuite #D2603A) sont a Delta E 2.4 en
 * deuteranopie et 8.5 en vision normale, tres au-dessous du plancher de 15.
 * Personne ne distinguait « en pause » de « en construction », y compris
 * avec une vision des couleurs complete. C'etait un defaut d'accessibilite
 * reel, mis en ligne.
 *
 * Mais le vrai probleme etait le CHOIX DE FORME, pas la palette. L'etat d'un
 * projet est ORDONNE: production, demo, chantier, pause, preparation est une
 * progression de maturite. Une donnee ordonnee prend une rampe SEQUENTIELLE
 * d'une seule teinte, du clair au fonce, pas quatre teintes categorielles
 * sans rapport. Une palette categorielle sur de l'ordinal jette l'ordre.
 *
 * La rampe est donc `--k-p-*`, la famille du produit, ce que le livre de
 * marque demande aux composants. Verifie: la rampe ocean est strictement
 * monotone en luminance, de 0.903 a 0.040, donc valide comme sequentielle.
 * Et elle passe par construction: une sequentielle demande la monotonie de
 * luminance, pas une separation categorielle.
 *
 * La couleur seule ne porte jamais l'information: chaque part est libellee
 * en clair dans la legende, et la barre a un ecart de 2px entre les parts. */
const TEINTE: Record<Etat, string> = {
  production: "var(--k-p-700)",
  demo:       "var(--k-p-500)",
  chantier:   "var(--k-p-400)",
  pause:      "var(--k-p-200)",
  prepare:    "var(--k-p-100)",
};

export default function EtatProjets() {
  const total = TRAVAUX.length;
  const parts = ORDRE.map((e) => ({
    etat: e,
    n: TRAVAUX.filter((t) => t.etat === e).length,
  })).filter((p) => p.n > 0);

  const enProduction = parts.find((p) => p.etat === "production")?.n ?? 0;

  return (
    <figure className={styles.cadre}>
      <div className={styles.entete}>
        <span className={styles.gros}>{enProduction}</span>
        <span className={styles.apres}>
          projet{enProduction > 1 ? "s" : ""} en production sur {total}
        </span>
      </div>

      {/* La barre. `role="img"` avec un libellé complet : un lecteur d'écran
          reçoit la phrase entière, pas une suite de pourcentages muets. */}
      <div
        className={styles.barre}
        role="img"
        aria-label={
          `Répartition des ${total} projets : ` +
          parts.map((p) => `${p.n} ${LIBELLE_ETAT_COURT[p.etat]}`).join(", ")
        }
      >
        {parts.map((p) => (
          <span
            key={p.etat}
            className={styles.part}
            style={{
              width: `${(p.n / total) * 100}%`,
              background: TEINTE[p.etat],
            }}
          />
        ))}
      </div>

      <ul className={styles.legende}>
        {parts.map((p) => (
          <li key={p.etat}>
            <span className={styles.puce} style={{ background: TEINTE[p.etat] }} />
            <b>{p.n}</b> {LIBELLE_ETAT_COURT[p.etat]}
          </li>
        ))}
      </ul>

      <figcaption className={styles.note}>
        Compté depuis la même source que les cartes ci-dessous, donc ce schéma
        ne peut pas se périmer. Un projet à l&apos;arrêt est écrit comme tel.
      </figcaption>
    </figure>
  );
}
