import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Kogia est bâtie sur cinq domaines humains plutôt que sur une liste de produits. Pourquoi cette forme, et où en est réellement la société.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <>
      <EnTete actif="/about" compact />

      <main className={styles.page}>
        <header className={styles.chapeau}>
          <h1 className={styles.titre}>
            Une forme
            <br />
            avant des produits.
          </h1>
          <p className={styles.intro}>
            Kogia Group est une société de technologie tunisienne, organisée
            autour de cinq domaines humains : apprendre, savoir faire, jouer,
            travailler, chercher.
          </p>
        </header>

        <section className={styles.section}>
          <header className={styles.enTete}>
            <span className={styles.num}>01</span>
            <h2 className={styles.h2}>Pourquoi cette forme</h2>
          </header>

          <p className={styles.texte}>
            Les produits changent, échouent, fusionnent. Une société construite
            sur la liste de ses produits du moment se réorganise à chaque échec.
            Une société construite sur des domaines humains, non : un produit
            peut disparaître sans laisser de trou.
          </p>
          <p className={styles.texte}>
            Le 12 septembre 2026, Kogia est passée de trente-deux dépôts de code
            à sept. Quatorze de ceux qui ont disparu ne contenaient qu&apos;un
            nom : une marque, une description, et pas une ligne de produit. La
            société grossissait par accumulation d&apos;idées plutôt que par
            accumulation d&apos;utilisateurs.
          </p>

          <blockquote className={styles.citation}>
            Un dépôt de code se crée quand on va écrire du code, pas quand on a
            trouvé un nom.
          </blockquote>

          <p className={styles.texte}>
            Entre les deux : une recherche, une page qui décrit l&apos;idée, et
            dix personnes qui disent la vouloir.{" "}
            <Link href="/ecosysteme">L&apos;écosystème</Link> montre la forme
            complète.
          </p>
        </section>

        <section className={styles.section}>
          <header className={styles.enTete}>
            <span className={styles.num}>02</span>
            <h2 className={styles.h2}>Où en est la société</h2>
          </header>

          <p className={styles.texte}>
            Trois produits en ligne, tous dans le même domaine. Quatre domaines
            sur cinq ne contiennent rien. C&apos;est écrit tel quel sur le site,
            compteurs à zéro compris.
          </p>

          <ul className={styles.jalons}>
            <li className={styles.jalon}>
              <span className={styles.jalonAn}>2026</span>
              <span className={styles.jalonQuoi}>
                Prouver que des inconnus utilisent Kogia.
              </span>
            </li>
            <li className={styles.jalon}>
              <span className={styles.jalonAn}>2027</span>
              <span className={styles.jalonQuoi}>
                Prouver qu&apos;ils paient.
              </span>
            </li>
          </ul>

          <p className={styles.texte} style={{ marginTop: "1.5rem" }}>
            Tant que ces deux choses ne sont pas vraies, Kogia est une société
            que son fondateur construit pour lui-même.
          </p>
        </section>

        <section className={`${styles.section} ${styles.derniere}`}>
          <header className={styles.enTete}>
            <span className={styles.num}>03</span>
            <h2 className={styles.h2}>Nous joindre</h2>
          </header>
          <p className={styles.texte}>
            <Link href="/contact">Écrire à Kogia</Link> : une adresse, et une
            personne au bout.
          </p>
        </section>
      </main>

      <Pied />
    </>
  );
}
