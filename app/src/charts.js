/* ============================================================================
   Kogia Harmony — spécifications de data-visualisation de la Console.
   Source de vérité : brand/KOGIA_HARMONY.md §3.4 et brand/tokens/kogia.css.

   Règles tenues ici, une fois pour toutes :
   - la palette de séries est VALIDÉE, dans un ORDRE FIXE, et n'est JAMAIS cyclée ;
     une 7ᵉ série est repliée dans « Autre » — jamais une teinte générée ;
   - la couleur suit l'ENTITÉ, jamais son rang : un filtre qui change le nombre
     de séries ne doit pas repeindre les survivantes ;
   - une couleur d'état n'est jamais une série ni un accent de marque ;
   - jamais de graphique à double axe.
   Aucun hex ne doit être écrit ailleurs que dans ce fichier et dans index.css.
   ========================================================================= */

/* --- Séries : ordre fixe, validé (bande de clarté, chroma, DVC, contraste). */
export const SERIES = ['#4361D0', '#0FA396', '#D2603A', '#9061F0', '#B07414', '#2F8050']

/* La 7ᵉ entité et les suivantes tombent dans « Autre ». */
export const OTHER = { label: 'Autre', color: '#7C879B' }

/** Couleur d'une série par son emplacement (index), pas par son rang d'affichage. */
export const seriesColor = i =>
  (typeof i === 'number' && i >= 0 && i < SERIES.length) ? SERIES[i] : OTHER.color

/** Replie une liste d'entités (≥ 7) dans « Autre ». `slot` = emplacement de série. */
export function foldSeries(rows, valueKey = 'value') {
  const kept = rows.filter(r => r.slot < SERIES.length)
  const rest = rows.filter(r => r.slot >= SERIES.length)
  if (!rest.length) return kept.map(r => ({ ...r, color: seriesColor(r.slot) }))
  return [
    ...kept.map(r => ({ ...r, color: seriesColor(r.slot) })),
    { name: OTHER.label, [valueKey]: rest.reduce((t, r) => t + (r[valueKey] || 0), 0), color: OTHER.color },
  ]
}

/* --- Le décor : grille, axes, infobulle. ---------------------------------- */
export const GRID = '#EEF1F6'
// muted/slate — 5.46:1. Les axes utilisaient un gris démis depuis longtemps
// dans index.css pour cause d'illisibilité : le correctif n'était jamais arrivé
// jusqu'aux graphiques. Il y est.
export const AXIS = '#5B6B7D'
export const LINE = '#DCE3EB'
export const INK = '#0E2135'

/** Grille horizontale uniquement. */
export const gridProps = { strokeDasharray: '3 3', stroke: GRID, vertical: false }

/** Axes : pas de ligne d'axe, pas de tick, libellés en muted. */
export const axisProps = {
  tick: { fontSize: 12, fill: AXIS },
  axisLine: false,
  tickLine: false,
}
export const axisPropsSm = { ...axisProps, tick: { fontSize: 11, fill: AXIS } }

/** Infobulle : rayon de contrôle, bordure `line`, une seule ombre. */
export const tooltipProps = {
  cursor: { fill: 'rgb(79 87 222 / .06)' },
  contentStyle: {
    borderRadius: 12,
    border: `1px solid ${LINE}`,
    boxShadow: '0 10px 30px -12px rgb(14 33 53 / .12)',
    fontSize: 13,
    color: INK,
  },
  labelStyle: { color: INK, fontWeight: 700 },
}

/* --- Les marques : formes des tracés. ------------------------------------- */
export const BAR_RADIUS = [6, 6, 0, 0]        // colonnes
export const BAR_RADIUS_H = [0, 6, 6, 0]      // barres horizontales
export const LINE_WIDTH = 2
export const DOT_SIZE = 8

/* --- États : réservés. Jamais une série, jamais un accent. ---------------- */
export const STATUS = {
  ok: { fg: '#12946F', bg: '#E7F5F0' },
  warn: { fg: '#C97C1E', bg: '#FBF1E3' },
  danger: { fg: '#DC4B54', bg: '#FBEBEC' },
  info: { fg: '#0E7FB8', bg: '#E6F1F8' },
  neutral: { fg: '#7C879B', bg: '#F1F4F8' },
}
