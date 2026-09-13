import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écrire à Kogia Group : une adresse, une personne au bout, et ce sur quoi on peut réellement aider aujourd'hui.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <>
      <EnTete compact />

      <main className={styles.page}>
        <header className={styles.chapeau}>
          <h1 className={styles.titre}>Contact</h1>
          <p className={styles.intro}>
            Une adresse, et une personne au bout. Pas de formulaire qui
            disparaît dans une boîte que personne ne relève.
          </p>
          <p className={styles.adresse}>
            <a href="mailto:contact@kogiagroup.com">contact@kogiagroup.com</a>
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>Ce sur quoi on peut aider aujourd'hui</h2>
          <ul className={styles.liste}>
            <li>
              <strong>Une école</strong> qui cherche à suivre ses présences, ses
              évaluations et sa communication avec les parents : Coreon EDU et
              EduPlus Connect existent et tournent.
            </li>
            <li>
              <strong>Un parent ou un enseignant</strong> qui veut des fiches
              imprimables pour le primaire : Kogia Kids est gratuit, sans compte.
            </li>
            <li>
              <strong>Un cabinet ou un office professionnel</strong> qui tourne
              encore sur papier : on cherche à comprendre ce métier avant d'écrire
              quoi que ce soit. Un entretien nous est plus utile qu'une commande.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Ce qu'on ne fait pas</h2>
          <p className={styles.texte}>
            On ne fabrique pas de sites sur commande, et on ne démarre pas un
            produit parce que l'idée est bonne. Un produit commence par une
            recherche, puis une page, puis dix personnes qui l'utilisent.{" "}
            <Link href="/ecosysteme">L'écosystème</Link> explique comment.
          </p>
        </section>
      </main>

      <Pied />
    </>
  );
}
