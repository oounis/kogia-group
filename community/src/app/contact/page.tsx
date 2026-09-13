import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une adresse, et une personne au bout. Ce sur quoi Kogia peut réellement aider aujourd'hui, et ce qu'elle ne fait pas.",
  alternates: { canonical: "/contact" },
};

const CAS = [
  {
    qui: "Une école",
    quoi: "Suivre les présences, les évaluations et la communication avec les parents. Coreon EDU et EduPlus Connect existent et tournent déjà.",
  },
  {
    qui: "Un parent, un enseignant",
    quoi: "Des fiches imprimables pour le primaire. Kogia Kids est gratuit, sans compte, sans limite.",
  },
  {
    qui: "Un cabinet professionnel",
    quoi: "Si votre métier tourne encore sur du papier, on cherche à le comprendre avant d'écrire quoi que ce soit. Un entretien nous est plus utile qu'une commande.",
  },
] as const;

export default function Page() {
  return (
    <>
      <EnTete actif="/contact" compact />

      <main className={styles.page}>
        <header className={styles.chapeau}>
          <h1 className={styles.titre}>Écrivez.</h1>
          <p className={styles.intro}>
            Une adresse, et une personne au bout. Pas de formulaire qui disparaît
            dans une boîte que personne ne relève.
          </p>
          <p className={styles.adresse}>
            <a href="mailto:contact@kogiagroup.com">contact@kogiagroup.com</a>
          </p>
        </header>

        <section className={styles.section}>
          <header className={styles.enTete}>
            <span className={styles.num}>01</span>
            <h2 className={styles.h2}>Ce sur quoi on peut aider</h2>
          </header>

          <ul className={styles.cas}>
            {CAS.map((c) => (
              <li key={c.qui} className={styles.casItem}>
                <span className={styles.casQui}>{c.qui}</span>
                <span className={styles.casQuoi}>{c.quoi}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${styles.section} ${styles.derniere}`}>
          <header className={styles.enTete}>
            <span className={styles.num}>02</span>
            <h2 className={styles.h2}>Ce qu&apos;on ne fait pas</h2>
          </header>
          <p className={styles.texte}>
            On ne fabrique pas de sites sur commande, et on ne démarre pas un
            produit parce que l&apos;idée est bonne. Un produit commence par une
            recherche, puis une page, puis dix personnes qui l&apos;utilisent.{" "}
            <Link href="/ecosysteme">L&apos;écosystème</Link> explique comment.
          </p>
        </section>
      </main>

      <Pied />
    </>
  );
}
