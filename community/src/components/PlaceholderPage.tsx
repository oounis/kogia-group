import Link from "next/link";
import Marque from "@/components/Marque";
import styles from "./PlaceholderPage.module.css";

/**
 * Gabarit honnête pour les routes déjà câblées mais pas encore construites.
 * Pas de fausse donnée, pas de faux compteur — juste ce qui est vrai : la
 * route existe, la fonctionnalité arrive. Voir docs/STATUS.md pour l'ordre.
 */
export default function PlaceholderPage({
  titre,
  description,
}: {
  titre: string;
  description: string;
}) {
  return (
    <main className={styles.page}>
      <Marque />
      <div className={styles.corps}>
        <h1>{titre}</h1>
        <p>{description}</p>
        <Link href="/" className="bouton ligne">Retour à l&apos;accueil</Link>
      </div>
    </main>
  );
}
