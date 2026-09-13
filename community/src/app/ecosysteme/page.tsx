import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import styles from "./ecosysteme.module.css";

export const metadata: Metadata = {
  title: "L'écosystème",
  description:
    "Kogia est organisée autour de cinq domaines humains (apprendre, savoir faire, jouer, travailler, chercher), et non autour des produits du moment. Voici la structure, et ce qu'elle contient vraiment aujourd'hui.",
  alternates: { canonical: "/ecosysteme" },
};

/** Les cinq domaines.
 *
 *  `produits` est le nombre de produits réellement en ligne, pas le nombre
 *  d'intentions. Trois domaines sur cinq sont à zéro et l'affichent : une page
 *  d'écosystème qui laisse croire que tout existe se démonte à la première
 *  visite, et on ne la lit plus jamais pareil ensuite. */
const DOMAINES = [
  {
    href: "/education",
    nom: "Kogia Education",
    role: "Développer le savoir humain",
    produits: 3,
  },
  {
    href: "/skills",
    nom: "Kogia Skills",
    role: "Transformer une capacité en opportunité",
    produits: 0,
  },
  {
    href: "/play",
    nom: "Kogia Play",
    role: "Défier, créer et relier par le jeu",
    produits: 0,
  },
  {
    href: "/business",
    nom: "Kogia Business",
    role: "Moderniser le travail qui tourne encore sur papier",
    produits: 0,
  },
  {
    href: "/research",
    nom: "Kogia Research",
    role: "Observer le monde avant de construire pour lui",
    produits: 0,
  },
] as const;

/** Les produits en ligne. Quatre, tous dans le même domaine. */
const PRODUITS = [
  {
    nom: "Kogia Kids",
    domaine: "Education",
    quoi: "Des fiches imprimables gratuites pour l'école primaire. Un parent trouve une fiche, la télécharge, l'imprime. Pas de compte, pas de limite.",
    lien: "https://kogiakids.com",
    libelle: "kogiakids.com",
  },
  {
    nom: "Coreon EDU",
    domaine: "Education",
    quoi: "L'ERP scolaire : évaluer une classe en trente secondes, suivre la journée d'un enfant, de la maternelle au CM2.",
    lien: "https://edu.kogiagroup.com",
    libelle: "edu.kogiagroup.com",
  },
  {
    nom: "EduPlus Connect",
    domaine: "Education",
    quoi: "La gestion d'école : présences quotidiennes et par créneau, observations, rapports, droits d'accès par module. Arabe par défaut.",
    lien: null,
    libelle: "en usage réel dans une école",
  },
  {
    nom: "kogiagroup.com",
    domaine: "Group",
    quoi: "La porte du monde Kogia : les réalisations, le journal, les règles de la maison, et cette page.",
    lien: "/realisations",
    libelle: "Voir les réalisations",
  },
] as const;

export default function Page() {
  return (
    <>
      <EnTete compact />

      <main className={styles.page}>
        <header className={styles.chapeau}>
          <h1 className={styles.titre}>L'écosystème</h1>
          <p className={styles.devise}>Technology for Human Progress.</p>
          <p className={styles.intro}>
            Kogia est organisée autour de cinq domaines humains (apprendre,
            savoir faire, jouer, travailler, chercher), et non autour des
            produits qui existent cette année. Un produit peut échouer sans
            laisser de trou dans la société.
          </p>
        </header>

        <section className={styles.schema} aria-label="Structure de Kogia">
          <div className={styles.schemaTete}>
            <strong>Kogia Group</strong>
            <span>La maison mère : stratégie, marque, technologie, finances, gouvernance</span>
          </div>

          <div className={styles.domaines}>
            {DOMAINES.map((d) => (
              <Link key={d.href} href={d.href} className={styles.domaine}>
                <span className={styles.domaineNom}>{d.nom}</span>
                <span className={styles.domaineRole}>{d.role}</span>
                <span
                  className={`${styles.compteur} ${d.produits > 0 ? styles.actif : styles.vide}`}
                >
                  {d.produits > 0
                    ? `${d.produits} produit${d.produits > 1 ? "s" : ""} en ligne`
                    : "aucun produit"}
                </span>
              </Link>
            ))}
          </div>

          <div className={styles.socle}>
            <strong>Kogia Platform</strong> : une identité, une intelligence, des
            données, un langage visuel, partagés par tous les domaines
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitre}>Ce qui est réellement en ligne</h2>
          <p className={styles.texte}>
            Quatre produits, tous dans le même domaine. Les quatre autres
            domaines existent dans la structure et ne contiennent rien. C'est la
            photographie exacte de la société aujourd'hui.
          </p>

          <ul className={styles.produits}>
            {PRODUITS.map((p) => (
              <li key={p.nom} className={styles.produit}>
                <span className={styles.produitDomaine}>{p.domaine}</span>
                <span className={styles.produitNom}>{p.nom}</span>
                <p className={styles.produitQuoi}>{p.quoi}</p>
                <span className={styles.produitLien}>
                  {p.lien ? (
                    p.lien.startsWith("http") ? (
                      <a href={p.lien}>{p.libelle}</a>
                    ) : (
                      <Link href={p.lien}>{p.libelle}</Link>
                    )
                  ) : (
                    p.libelle
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitre}>Pourquoi cette forme</h2>
          <p className={styles.texte}>
            Le 12 septembre 2026, Kogia est passée de trente-deux dépôts de code
            à sept. Quatorze de ceux qui ont disparu ne contenaient qu'un nom :
            une marque, une description, et pas une ligne de produit. La société
            grossissait par accumulation d'idées plutôt que par accumulation
            d'utilisateurs.
          </p>

          <div className={styles.regle}>
            <p>
              <strong>
                Un domaine ne se crée pas parce qu'on a une idée.
              </strong>{" "}
              Il se crée quand il existe un domaine d'activité autonome, avec des
              utilisateurs, une valeur, et un chemin vers le revenu.
            </p>
            <p>
              <strong>Un dépôt de code se crée quand on va écrire du code</strong>
              {" "}, pas quand on a trouvé un nom. Entre les deux il y a une
              recherche, une page qui décrit l'idée, et dix personnes qui
              disent la vouloir.
            </p>
          </div>

          <p className={styles.texte}>
            Les idées ne sont pas perdues pour autant : elles attendent dans une
            banque d'idées, avec l'épreuve que chacune doit passer. C'est aussi
            pour ça que trois domaines de cette page affichent « aucun produit »
            au lieu d'une promesse.
          </p>
          <p className={styles.texte}>
            <Link href="/about">À propos de Kogia</Link> ·{" "}
            <Link href="/contact">Nous écrire</Link>
          </p>
        </section>
      </main>

      <Pied />
    </>
  );
}
