import styles from "./Signature.module.css";

/**
 * La signature visuelle de Kogia : une sonde en eau profonde.
 *
 * Le premier écran n'avait aucune image, et le héros centré laissait les deux
 * côtés vides. Une photo d'agence ou une illustration générée aurait rempli
 * la place sans rien dire, et n'aurait pas été corrigeable.
 *
 * Ce dessin porte l'identité de la marque plutôt qu'un décor : le cachalot
 * Kogia est un plongeur, il descend chercher puis remonte. Les lignes sont
 * donc des paliers de profondeur, et les points marquent ce qui a été trouvé
 * en descendant. La logique du site, « explorer puis construire », est déjà
 * dans le nom de la société.
 *
 * En SVG et non en image : il suit l'encre du thème par `currentColor`, se
 * redessine à toute largeur sans deuxième fichier, ne coûte aucune requête, et
 * ne peut pas devenir flou. Aucune couleur en dur sauf le bleu de marque.
 */

const BLEU_MARQUE = "#2547E8";

/* Les paliers. Une profondeur croissante et une opacité décroissante : plus on
   descend, moins on voit, ce qui est vrai sous l'eau et vrai d'une idée. */
const PALIERS = [
  { y: 22, o: 0.82, d: "M0 22 C60 12 120 32 180 22 S300 12 360 22" },
  { y: 52, o: 0.62, d: "M0 52 C70 40 130 64 200 52 S320 40 360 52" },
  { y: 82, o: 0.46, d: "M0 82 C50 72 140 94 210 82 S310 70 360 82" },
  { y: 112, o: 0.33, d: "M0 112 C80 102 150 124 220 112 S330 102 360 112" },
  { y: 142, o: 0.22, d: "M0 142 C60 134 140 154 210 142 S320 132 360 142" },
  { y: 172, o: 0.13, d: "M0 172 C70 166 140 182 215 172 S320 164 360 172" },
];

/* Les trouvailles, une par palier sauf le dernier : tout ne remonte pas. */
const TROUVAILLES = [
  { x: 96, y: 22, r: 4.5 },
  { x: 262, y: 22, r: 3 },
  { x: 236, y: 52, r: 4 },
  { x: 74, y: 82, r: 3.5 },
  { x: 148, y: 82, r: 3 },
  { x: 292, y: 112, r: 3 },
  { x: 120, y: 142, r: 2.5 },
];

export default function Signature() {
  return (
    <div className={styles.cadre} aria-hidden="true">
      <svg
        className={styles.dessin}
        viewBox="0 0 360 200"
        fill="none"
        role="presentation"
      >
        {PALIERS.map((p) => (
          <path
            key={p.y}
            d={p.d}
            stroke="currentColor"
            strokeWidth="1.6"
            opacity={p.o}
            strokeLinecap="round"
          />
        ))}

        {/* La descente. Un seul trait qui traverse tous les paliers : c'est le
            trajet, et il est en pointillé parce qu'il n'est jamais droit. */}
        <path
          d="M182 6 C174 40 198 62 186 90 C176 118 202 140 190 168 C182 182 188 190 186 196"
          stroke={BLEU_MARQUE}
          strokeWidth="2.25"
          strokeDasharray="5 5"
          opacity=".9"
          strokeLinecap="round"
        />

        {TROUVAILLES.map((t) => (
          <circle key={`${t.x}-${t.y}`} cx={t.x} cy={t.y} r={t.r} fill="currentColor" opacity=".5" />
        ))}

        {/* Le point de départ, en surface, plein et en bleu de marque : c'est
            le seul élément appuyé du dessin, et il marque où l'on entre. */}
        <circle cx="182" cy="6" r="6.5" fill={BLEU_MARQUE} />
        <circle cx="186" cy="196" r="4" fill={BLEU_MARQUE} opacity=".45" />
      </svg>
    </div>
  );
}
