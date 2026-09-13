import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Ce qu'est Kogia Group, comment elle est organisée, et pourquoi elle est passée de trente-deux dépôts de code à sept en une journée.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <>
      <EnTete actif="/about" compact />

      <main className={styles.page}>
        <header className={styles.chapeau}>
          <h1 className={styles.titre}>À propos</h1>
          <p className={styles.intro}>
            Kogia Group est une société de technologie tunisienne. Elle est
            organisée autour de cinq domaines humains (apprendre, savoir faire,
            jouer, travailler, chercher), et non autour des produits qui existent
            cette année.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>Pourquoi cette forme</h2>
          <p className={styles.texte}>
            Les produits changent, échouent, fusionnent. Une société construite
            sur la liste de ses produits du moment se réorganise à chaque échec.
            Une société construite sur des domaines humains, non : un produit peut
            disparaître sans laisser de trou.
          </p>
          <p className={styles.texte}>
            Le 12 septembre 2026, Kogia est passée de trente-deux dépôts de code à
            sept. Quatorze de ceux qui ont disparu ne contenaient qu&apos;un nom :
            une marque, une description, et pas une ligne de produit. La société
            grossissait par accumulation d&apos;idées plutôt que par accumulation
            d&apos;utilisateurs.
          </p>
          <div className={styles.regle}>
            <p>
              <strong>Un domaine ne se crée pas parce qu&apos;on a une idée.</strong>{" "}
              Il se crée quand il existe une activité autonome, avec des
              utilisateurs, une valeur et un chemin vers le revenu.
            </p>
            <p>
              <strong>Un dépôt de code se crée quand on va écrire du code</strong>,
              pas quand on a trouvé un nom. Entre les deux : une recherche, une
              page, et dix personnes qui disent la vouloir.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Où en est la société</h2>
          <p className={styles.texte}>
            Trois produits en ligne, tous dans le même domaine. Quatre domaines
            sur cinq ne contiennent rien. C&apos;est écrit tel quel sur{" "}
            <Link href="/ecosysteme">la page de l&apos;écosystème</Link>, y compris
            les compteurs à zéro.
          </p>
          <p className={styles.texte}>
            L&apos;objectif commercial est volontairement court :{" "}
            <strong>
              en 2026, prouver que des inconnus utilisent Kogia ; en 2027, prouver
              qu&apos;ils paient.
            </strong>{" "}
            Tant que ces deux choses ne sont pas vraies, Kogia est une société que
            son fondateur construit pour lui-même.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Nous joindre</h2>
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
