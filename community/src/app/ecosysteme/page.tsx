import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import Structure from "@/components/Structure";
import styles from "./ecosysteme.module.css";

export const metadata: Metadata = {
  title: "L'écosystème",
  description:
    "Cinq domaines humains, une base commune, et trois produits en ligne. Voici la forme de Kogia, et ce qu'elle contient réellement aujourd'hui.",
  alternates: { canonical: "/ecosysteme" },
};

const DOMAINES = [
  { href: "/education", nom: "Kogia Education", role: "Développer le savoir humain, de la première lettre au métier.", produits: 3 },
  { href: "/skills", nom: "Kogia Skills", role: "Une compétence prouvée vaut mieux qu'une compétence affirmée.", produits: 0 },
  { href: "/play", nom: "Kogia Play", role: "On revient jouer sans qu'on vous le demande.", produits: 0 },
  { href: "/business", nom: "Kogia Business", role: "Des métiers entiers tournent encore sur du papier.", produits: 0 },
  { href: "/research", nom: "Kogia Research", role: "Regarder le monde avant de construire pour lui.", produits: 0 },
] as const;

const PRODUITS = [
  {
    nom: "Kogia Kids", tag: "Education",
    quoi: "Des fiches imprimables pour l'école primaire. Gratuites, sans compte, sans limite.",
    lien: "https://kogiakids.com", libelle: "kogiakids.com",
  },
  {
    nom: "Coreon EDU", tag: "Education",
    quoi: "Évaluer une classe en trente secondes. Suivre la journée d'un enfant. De la maternelle au CM2.",
    lien: "https://edu.kogiagroup.com", libelle: "edu.kogiagroup.com",
  },
  {
    nom: "EduPlus Connect", tag: "Education",
    quoi: "Présences, observations, rapports, droits par module. Arabe par défaut, de droite à gauche partout.",
    lien: null, libelle: "en usage quotidien dans une école",
  },
] as const;

export default function Page() {
  return (
    <>
      <EnTete actif="/ecosysteme" compact />

      <main className={styles.page}>
        <header className={styles.chapeau}>
          <p className={styles.devise}>Technology for Human Progress</p>
          <h1 className={styles.titre}>
            Cinq domaines.
            <br />
            Une seule base.
          </h1>
          <p className={styles.intro}>
            Apprendre, savoir faire, jouer, travailler, chercher. Ce que les gens
            font ne change pas. Ce qu&apos;on construit pour eux, si.
          </p>
        </header>

        <div className={styles.schemaBloc}>
          <Structure />
        </div>

        <section className={styles.section}>
          <header className={styles.enTete}>
            <span className={styles.num}>01</span>
            <h2 className={styles.sectionTitre}>Les domaines</h2>
            <p className={styles.sousTitre}>
              Trois sur cinq ne contiennent rien. La page le dit au lieu de le
              cacher.
            </p>
          </header>

          <ul className={styles.domaines}>
            {DOMAINES.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className={styles.rang}>
                  <span className={styles.rangNom}>{d.nom}</span>
                  <span className={styles.rangRole}>{d.role}</span>
                  <span className={`${styles.rangEtat} ${d.produits ? styles.actif : styles.vide}`}>
                    {d.produits ? `${d.produits} produits` : "aucun produit"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <header className={styles.enTete}>
            <span className={styles.num}>02</span>
            <h2 className={styles.sectionTitre}>Ce qui existe vraiment</h2>
            <p className={styles.sousTitre}>
              Trois produits, tous dans le même domaine.
            </p>
          </header>

          <ul className={styles.produits}>
            {PRODUITS.map((p) => (
              <li key={p.nom} className={styles.produit}>
                <span className={styles.produitTag}>{p.tag}</span>
                <span className={styles.produitNom}>{p.nom}</span>
                <p className={styles.produitQuoi}>{p.quoi}</p>
                <span className={styles.produitLien}>
                  {p.lien ? <a href={p.lien}>{p.libelle}</a> : p.libelle}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${styles.section} ${styles.derniere}`}>
          <header className={styles.enTete}>
            <span className={styles.num}>03</span>
            <h2 className={styles.sectionTitre}>Pourquoi cette forme</h2>
          </header>

          <p className={styles.texte}>
            Le 12 septembre 2026, Kogia est passée de trente-deux dépôts de code à
            sept. Quatorze de ceux qui ont disparu ne contenaient qu&apos;un nom :
            une marque, une description, et pas une ligne de produit. La société
            grossissait par accumulation d&apos;idées plutôt que par accumulation
            d&apos;utilisateurs.
          </p>

          <blockquote className={styles.citation}>
            Un domaine ne se crée pas parce qu&apos;on a une idée. Il se crée
            quand il y a des utilisateurs, une valeur, et un chemin vers le
            revenu.
          </blockquote>

          <p className={styles.texte}>
            Un dépôt de code se crée quand on va écrire du code, pas quand on a
            trouvé un nom. Entre les deux : une recherche, une page, et dix
            personnes qui disent la vouloir.
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
