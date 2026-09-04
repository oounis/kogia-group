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
  { y: 26, o: 0.5, d: "M0 26 C60 18 120 34 180 26 S300 18 360 26" },
  { y: 62, o: 0.38, d: "M0 62 C70 52 130 72 200 62 S320 52 360 62" },
  { y: 98, o: 0.26, d: "M0 98 C50 90 140 108 210 98 S310 90 360 98" },
  { y: 134, o: 0.16, d: "M0 134 C80 126 150 144 220 134 S330 128 360 134" },
  { y: 170, o: 0.1, d: "M0 170 C60 164 140 178 210 170 S320 166 360 170" },
];

/* Les trouvailles, une par palier sauf le dernier : tout ne remonte pas. */
const TROUVAILLES = [
  { x: 96, y: 26, r: 3.5 },
  { x: 236, y: 62, r: 3 },
  { x: 148, y: 98, r: 2.5 },
  { x: 292, y: 134, r: 2 },
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
            strokeWidth="1.25"
            opacity={p.o}
            strokeLinecap="round"
          />
        ))}

        {/* La descente. Un seul trait qui traverse tous les paliers : c'est le
            trajet, et il est en pointillé parce qu'il n'est jamais droit. */}
        <path
          d="M182 8 C176 44 196 70 186 104 C178 138 200 158 190 192"
          stroke={BLEU_MARQUE}
          strokeWidth="1.5"
          strokeDasharray="4 5"
          opacity=".55"
          strokeLinecap="round"
        />

        {TROUVAILLES.map((t) => (
          <circle key={`${t.x}-${t.y}`} cx={t.x} cy={t.y} r={t.r} fill="currentColor" opacity=".32" />
        ))}

        {/* Le point de départ, en surface, plein et en bleu de marque : c'est
            le seul élément appuyé du dessin, et il marque où l'on entre. */}
        <circle cx="182" cy="8" r="5" fill={BLEU_MARQUE} />
      </svg>
    </div>
  );
}
