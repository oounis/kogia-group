import styles from "./Structure.module.css";

/**
 * Le schéma de la société.
 *
 * Il remplace la signature en vagues, qui décorait sans rien dire. Celui-ci
 * porte une information : la forme de Kogia, et ce que chaque domaine contient
 * réellement aujourd'hui.
 *
 * En SVG plutôt qu'en image : il suit les jetons de couleur du thème, reste net
 * à toute taille, ne coûte aucune requête, et un lecteur d'écran lit son titre
 * et sa description au lieu d'un fichier muet.
 *
 * Les domaines vides sont dessinés en trait interrompu. C'est la même règle que
 * partout ailleurs sur ce site : ce qui n'existe pas se voit.
 */

const DOMAINES = [
  { nom: "Education", produits: 3 },
  { nom: "Skills", produits: 0 },
  { nom: "Play", produits: 0 },
  { nom: "Business", produits: 0 },
  { nom: "Research", produits: 0 },
] as const;

const L = 168; // largeur d'une colonne
const G = 14; // gouttière
const X0 = 20;
const Y_GROUPE = 28;
const Y_DOM = 118;
const H_DOM = 78;
const Y_SOCLE = 232;
const LARGEUR = X0 * 2 + DOMAINES.length * L + (DOMAINES.length - 1) * G;

export default function Structure() {
  const xDe = (i: number) => X0 + i * (L + G);
  const centre = LARGEUR / 2;

  return (
    <figure className={styles.bloc}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${LARGEUR} 292`}
        role="img"
        aria-labelledby="structure-titre structure-desc"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="structure-titre">La structure de Kogia Group</title>
        <desc id="structure-desc">
          Kogia Group au sommet, cinq domaines en dessous (Education, Skills,
          Play, Business, Research), et une base technique commune. Seul
          Education contient des produits aujourd&apos;hui.
        </desc>

        {/* Le bandeau du groupe */}
        <rect
          x={X0}
          y={Y_GROUPE}
          width={LARGEUR - X0 * 2}
          height={46}
          rx={9}
          className={styles.groupe}
        />
        <text x={centre} y={Y_GROUPE + 28} className={styles.groupeTexte}>
          KOGIA GROUP
        </text>

        {/* Les liaisons : une barre horizontale, puis une descente par domaine */}
        <path
          d={`M ${centre} ${Y_GROUPE + 46} V ${Y_DOM - 26}`}
          className={styles.trait}
        />
        <path
          d={`M ${xDe(0) + L / 2} ${Y_DOM - 26} H ${xDe(DOMAINES.length - 1) + L / 2}`}
          className={styles.trait}
        />

        {DOMAINES.map((d, i) => {
          const x = xDe(i);
          const cx = x + L / 2;
          const vide = d.produits === 0;
          return (
            <g key={d.nom}>
              <path d={`M ${cx} ${Y_DOM - 26} V ${Y_DOM}`} className={styles.trait} />
              <rect
                x={x}
                y={Y_DOM}
                width={L}
                height={H_DOM}
                rx={9}
                className={vide ? styles.domaineVide : styles.domaine}
              />
              <text x={cx} y={Y_DOM + 30} className={styles.domaineNom}>
                {d.nom}
              </text>
              <text
                x={cx}
                y={Y_DOM + 54}
                className={vide ? styles.compteurVide : styles.compteur}
              >
                {vide ? "aucun produit" : `${d.produits} produits`}
              </text>
              <path
                d={`M ${cx} ${Y_DOM + H_DOM} V ${Y_SOCLE}`}
                className={styles.trait}
              />
            </g>
          );
        })}

        {/* Le socle technique commun */}
        <rect
          x={X0}
          y={Y_SOCLE}
          width={LARGEUR - X0 * 2}
          height={42}
          rx={9}
          className={styles.socle}
        />
        <text x={centre} y={Y_SOCLE + 26} className={styles.socleTexte}>
          Identité · Intelligence · Données · Design
        </text>
      </svg>

      <figcaption className={styles.legende}>
        Une base commune sous cinq domaines. Un produit change de place sans que
        la société change de forme.
      </figcaption>
    </figure>
  );
}
