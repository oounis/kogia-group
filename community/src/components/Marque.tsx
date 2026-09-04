import Link from "next/link";
import styles from "./Marque.module.css";

/**
 * Le lockup horizontal officiel de Kogia Group.
 *
 * Repris trait pour trait de `brand/lockup-kogia-group.svg`, la source de
 * vérité de la marque. La version précédente approchait le lockup au lieu de
 * l'appliquer : elle dessinait le bon cachalot, puis écrivait « Kogia » dans
 * un `<span>` en Inter, avec une majuscule et sans la ligne GROUP. Trois
 * écarts avec la marque officielle, dans l'élément le plus visible du site.
 *
 * Le fichier officiel dit exactement ceci, et rien n'est réinterprété ici :
 *   cachalot   `#2547E8`, souffle à `opacity .85`
 *   « kogia »  minuscule, 30px, poids 800, `#0E2135`, interlettre -0.6
 *   « GROUP »  10px, poids 700, `#2547E8`, interlettre 4
 *   police     Sora
 *
 * Le mot est du `<text>` SVG et non un tracé vectorisé, comme dans le fichier
 * officiel. Il faut donc que Sora soit réellement chargée : sans elle le
 * navigateur retombe sur `system-ui` et le lockup est faux tout en paraissant
 * correct. Sora est chargée dans `app/layout.tsx` et exposée par la variable
 * `--font-sora`, à laquelle cette variable de police se rattache.
 *
 * `--marque-encre` permet à un fond sombre de repasser le mot en blanc sans
 * toucher au bleu de la marque, qui ne change jamais.
 */

const CACHALOT_CORPS =
  "M12 54 C12 34 28 22 52 22 C74 22 88 32 91 46 C94 38 99 30 107 25 C105 32 104 38 105 43 C110 41 117 41 124 44 C117 48 111 50 106 50 C102 62 92 70 76 73 C58 76 34 74 22 68 C14 64 12 60 12 54 Z M38.4 45 a4.4 4.4 0 1 1 -8.8 0 a4.4 4.4 0 1 1 8.8 0 Z";
const CACHALOT_SOUFFLE = "M42 12 q-1 -7 5 -9 M50 12 q4 -6 11 -6";

/** Le bleu de la marque. Constante nommée : il ne doit jamais devenir un jeton
 *  de thème, sinon un changement de palette repeindrait le logo. */
const BLEU_MARQUE = "#2547E8";

export default function Marque({ hauteur = 30 }: { hauteur?: number }) {
  return (
    <Link href="/" className={styles.marque} aria-label="Kogia Group, accueil">
      <svg
        className={styles.lockup}
        viewBox="0 0 300 72"
        height={hauteur}
        width={(hauteur * 300) / 72}
        role="img"
        aria-label="Kogia Group"
      >
        <g transform="translate(4,14) scale(.52)">
          <path d={CACHALOT_CORPS} fill={BLEU_MARQUE} fillRule="evenodd" />
          <path
            d={CACHALOT_SOUFFLE}
            fill="none"
            stroke={BLEU_MARQUE}
            strokeWidth="4"
            strokeLinecap="round"
            opacity=".85"
          />
        </g>
        <text
          x="76"
          y="40"
          fontSize="30"
          fontWeight="800"
          letterSpacing="-0.6"
          className={styles.mot}
        >
          kogia
        </text>
        <text
          x="78"
          y="58"
          fontSize="10"
          fontWeight="700"
          letterSpacing="4"
          fill={BLEU_MARQUE}
          className={styles.motSecondaire}
        >
          GROUP
        </text>
      </svg>
    </Link>
  );
}
