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

const TEINTE: Record<Etat, string> = {
  production: "var(--k-ok, #1B7F4E)",
  demo: "#2547E8",
  chantier: "var(--k-terra-700, #A15C00)",
  pause: "var(--slate)",
  prepare: "var(--line-forte)",
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
