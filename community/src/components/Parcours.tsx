import styles from "./Parcours.module.css";

/**
 * Le parcours d'une idée chez Kogia, en un schéma.
 *
 * C'était trois cartes côte à côte, avec une icône et un paragraphe chacune.
 * Le texte était juste, mais la mise en page ne disait pas l'essentiel : que
 * les trois étapes se suivent, et que la plupart des idées s'arrêtent en
 * route. Trois cartes alignées racontent trois choses parallèles, pas une
 * chaîne.
 *
 * Le schéma est en SVG inline et non en image : il se redessine à toutes les
 * largeurs, se lit par un lecteur d'écran grâce au `<title>`, hérite des
 * couleurs du thème, et une correction de texte est un caractère à changer.
 * Une image aurait imposé de régénérer le fichier pour une faute de frappe.
 *
 * Aucune couleur n'est écrite en dur ici sauf le bleu de marque, qui ne varie
 * pas. Le reste passe par `currentColor` et les jetons, donc le schéma suit
 * l'encre du texte sans variante de fichier.
 */
export default function Parcours() {
  return (
    <figure className={styles.cadre}>
      <svg
        className={styles.schema}
        viewBox="0 0 780 132"
        role="img"
        aria-labelledby="parcours-titre parcours-desc"
      >
        <title id="parcours-titre">Le parcours d&apos;une idée chez Kogia</title>
        <desc id="parcours-desc">
          Une idée est d&apos;abord explorée, puis discutée publiquement, et
          seules celles qui le méritent deviennent un produit. La plupart
          s&apos;arrêtent avant la fin, et c&apos;est le but du parcours.
        </desc>

        {/* La ligne de vie. Un seul trait continu, pour que les trois étapes
            se lisent comme une suite et non comme trois blocs. */}
        <line
          x1="110" y1="52" x2="670" y2="52"
          stroke="currentColor" strokeWidth="1.5" opacity=".18"
        />

        {[
          { x: 110, n: "1", t: "Explorer", s: "Problème, marché, risques" },
          { x: 390, n: "2", t: "Discuter", s: "Publiquement, avant de coder" },
          { x: 670, n: "3", t: "Construire", s: "Ce qui a survécu aux deux" },
        ].map((e, i) => (
          <g key={e.n}>
            {/* La dernière pastille est pleine : elle marque l'aboutissement,
                et distingue visuellement l'étape qui produit quelque chose. */}
            <circle
              cx={e.x} cy="52" r="21"
              fill={i === 2 ? "#2547E8" : "var(--surface)"}
              stroke={i === 2 ? "#2547E8" : "currentColor"}
              strokeWidth="1.5"
              strokeOpacity={i === 2 ? 1 : 0.32}
            />
            <text
              x={e.x} y="59" textAnchor="middle"
              fontSize="17" fontWeight="800"
              fill={i === 2 ? "#FFFFFF" : "currentColor"}
            >
              {e.n}
            </text>
            <text
              x={e.x} y="96" textAnchor="middle"
              fontSize="15" fontWeight="700" fill="currentColor"
            >
              {e.t}
            </text>
            <text
              x={e.x} y="116" textAnchor="middle"
              fontSize="12" fill="currentColor" opacity=".6"
            >
              {e.s}
            </text>
          </g>
        ))}

        {/* Les sorties. C'est la partie qui compte : une idée peut mourir à
            chaque étape, et le dire est plus honnête que de dessiner un tuyau
            où tout arrive au bout. */}
        {[250, 530].map((x) => (
          <g key={x} opacity=".45">
            <path
              d={`M${x} 52 L${x} 28`}
              stroke="currentColor" strokeWidth="1.5"
              strokeDasharray="3 3" fill="none"
            />
            <text x={x} y="20" textAnchor="middle" fontSize="11" fill="currentColor">
              abandon
            </text>
          </g>
        ))}
      </svg>
      <figcaption className={styles.legende}>
        La plupart des idées s&apos;arrêtent avant la troisième étape. Le
        parcours est fait pour ça.
      </figcaption>
    </figure>
  );
}
