import Link from "next/link";
import styles from "./Marque.module.css";

/**
 * Le lockup horizontal officiel de Kogia Group, repris de
 * `brand/lockup-kogia-group.svg`, la source de vérité de la marque.
 *
 * Depuis le 2026-11-13 (décision du fondateur) l'identité du groupe quitte le
 * bleu : cachalot émeraude `#0F6B53`, mot « kogia » en encre `#0F1F1A`, ligne
 * GROUP en laiton `#8F6B1F`. Police Sora, mot en `<text>` SVG : il faut donc
 * que Sora soit réellement chargée (`app/layout.tsx`, variable `--font-sora`).
 *
 * Trois variables permettent à un fond sombre de repeindre le lockup sans le
 * redessiner : `--marque-encre`, `--marque-teinte`, `--marque-second`.
 */

const CACHALOT_CORPS =
  "M12 54 C12 34 28 22 52 22 C74 22 88 32 91 46 C94 38 99 30 107 25 C105 32 104 38 105 43 C110 41 117 41 124 44 C117 48 111 50 106 50 C102 62 92 70 76 73 C58 76 34 74 22 68 C14 64 12 60 12 54 Z M38.4 45 a4.4 4.4 0 1 1 -8.8 0 a4.4 4.4 0 1 1 8.8 0 Z";
const CACHALOT_SOUFFLE = "M42 12 q-1 -7 5 -9 M50 12 q4 -6 11 -6";

/* 30px etait trop petit: vu rendu, la ligne GROUP etait a peine lisible et le
   lockup disparaissait a cote des libelles de navigation. 38px place le mot
   « kogia » a la meme force optique que le titre de section le plus proche,
   sans depasser la hauteur d'en-tete de 72px. */
export default function Marque({ hauteur = 38, href = "/" }: { hauteur?: number; href?: string }) {
  return (
    <Link href={href} className={styles.marque} aria-label="Kogia Group">
      <svg
        className={styles.lockup}
        viewBox="0 0 300 72"
        height={hauteur}
        width={(hauteur * 300) / 72}
        role="img"
        aria-label="Kogia Group"
      >
        <g transform="translate(4,14) scale(.52)">
          <path d={CACHALOT_CORPS} className={styles.teinte} fillRule="evenodd" />
          <path
            d={CACHALOT_SOUFFLE}
            fill="none"
            className={styles.trait}
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
          className={styles.motSecondaire}
        >
          GROUP
        </text>
      </svg>
    </Link>
  );
}
