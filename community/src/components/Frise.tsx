import { TRAVAUX, LIBELLE_ETAT_COURT, PREMIER_JOUR, type Etat } from "@/lib/travaux";
import styles from "./Frise.module.css";

/**
 * La frise des dix projets, du premier commit à aujourd'hui.
 *
 * La page « À propos » disait « dix projets menés depuis juin 2026 » et
 * s'arrêtait là. Le chiffre est vrai mais il ne dit ni le rythme, ni que
 * plusieurs projets ont démarré la même semaine, ni que ceux qui tournent
 * réellement sont les plus récents. Un visiteur qui jauge une maison d'une
 * personne veut voir la cadence, pas un total.
 *
 * Chaque projet est placé à sa date `depuis`, à l'échelle réelle du temps
 * écoulé. Les grappes sont donc vraies : trois projets se touchent fin août
 * parce qu'ils ont réellement démarré à trois jours d'intervalle. Un schéma
 * à intervalles réguliers aurait menti en lissant cela.
 *
 * Aucune date ni aucun nom n'est écrit ici. Tout vient de `lib/travaux`, donc
 * ajouter un projet met la frise à jour et elle ne peut pas se périmer.
 */

/* Meme rampe sequentielle que le schema de repartition, pour la meme raison:
 * l'etat d'un projet est ordonne. Voir EtatProjets.tsx pour le detail, y
 * compris le defaut d'accessibilite que le validateur a trouve dans ma
 * premiere version. Les deux schemas doivent parler la meme langue: un point
 * fonce veut dire la meme chose ici et la-bas. */
const TEINTE: Record<Etat, string> = {
  production: "var(--k-p-700)",
  demo:       "var(--k-p-500)",
  chantier:   "var(--k-p-400)",
  pause:      "var(--k-p-200)",
  prepare:    "var(--k-p-100)",
};

const MOIS = ["janv.", "févr.", "mars", "avril", "mai", "juin",
              "juil.", "août", "sept.", "oct.", "nov.", "déc."];

/** Découpé à la main plutôt que passé à `new Date()`, qui lit une date nue en
 *  UTC et renverrait le mois précédent pour un premier du mois à l'ouest de
 *  Greenwich. Le journal du site fait déjà ce choix pour la même raison. */
function jours(iso: string): number {
  const [a, m, j] = iso.split("-").map(Number);
  return Date.UTC(a, m - 1, j) / 86400000;
}

export default function Frise() {
  const projets = [...TRAVAUX]
    .filter((t) => t.depuis)
    .sort((a, b) => (a.depuis! < b.depuis! ? -1 : 1));

  if (projets.length === 0) return null;

  const debut = jours(PREMIER_JOUR);
  const fin = jours(projets[projets.length - 1].depuis!);
  /* Une marge de 6 % de chaque côté : sans elle, le premier et le dernier
     projet collent aux bords et leur point se coupe en deux. */
  const etendue = Math.max(fin - debut, 1);
  const place = (iso: string) => 6 + ((jours(iso) - debut) / etendue) * 88;

  /* Les repères de mois. Tirés des projets eux-mêmes, donc jamais un mois
     vide inventé pour faire une échelle régulière. */
  const repères = [...new Set(projets.map((p) => p.depuis!.slice(0, 7)))];

  return (
    <figure className={styles.cadre}>
      <div
        className={styles.piste}
        role="img"
        aria-label={
          `Frise de ${projets.length} projets, du ` +
          `${projets[0].depuis} au ${projets[projets.length - 1].depuis}. ` +
          projets.map((p) => `${p.nom}, ${LIBELLE_ETAT_COURT[p.etat]}`).join(". ")
        }
      >
        <span className={styles.ligne} aria-hidden="true" />
        {repères.map((m) => (
          <span
            key={m}
            className={styles.repere}
            style={{ left: `${place(`${m}-01`)}%` }}
            aria-hidden="true"
          >
            {MOIS[Number(m.slice(5, 7)) - 1]}
          </span>
        ))}
        {projets.map((p) => (
          <span
            key={p.slug}
            className={styles.point}
            style={{ left: `${place(p.depuis!)}%`, background: TEINTE[p.etat] }}
            title={`${p.nom} — ${LIBELLE_ETAT_COURT[p.etat]}`}
            aria-hidden="true"
          />
        ))}
      </div>

      <ol className={styles.noms}>
        {projets.map((p) => (
          <li key={p.slug}>
            <span className={styles.puce} style={{ background: TEINTE[p.etat] }} />
            <b>{p.nom}</b>
            <span className={styles.etat}>{LIBELLE_ETAT_COURT[p.etat]}</span>
          </li>
        ))}
      </ol>

      <figcaption className={styles.note}>
        À l&apos;échelle réelle du temps écoulé, donc les grappes sont vraies :
        trois projets se touchent parce qu&apos;ils ont démarré à quelques
        jours d&apos;intervalle. Compté depuis la même source que les cartes.
      </figcaption>
    </figure>
  );
}
