import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "À propos",
  description: "L'histoire, la mission et les produits de Kogia.",
};

const PRODUITS = [
  {
    lettre: "C",
    nom: "Coreon EDU",
    detail: "Gestion scolaire",
    statut: "En production",
    href: "https://edu.kogiagroup.com",
  },
  {
    lettre: "F",
    nom: "Faz3a",
    detail: "Action citoyenne",
    statut: "En construction",
    href: null,
  },
  {
    lettre: "K",
    nom: "Suite Kogia",
    detail: "Finance, CRM, RH",
    statut: "En préparation",
    href: "https://kogiagroup.com/suite/",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className={styles.top}>
        <div className={styles.topIn}>
          <Link href="/" className={styles.marque}>Kogia</Link>
          <nav className={styles.nav} aria-label="Navigation principale">
            <Link href="/explore">Explorer</Link>
            <Link href="/about">Kogia</Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.titre}>Kogia</h1>
        <p className={styles.lede}>
          Une aventure technologique indépendante, menée par Othman Ounis
          depuis la Tunisie et Bahreïn. On explore des idées, et on construit
          celles qui méritent d&apos;exister.
        </p>
        <p className={styles.para}>
          Une idée par semaine, explorée sérieusement : problème, marché,
          modèle, risques, et un verdict honnête. On construit celles qui le
          méritent.
        </p>

        <h2 className={styles.sousTitre}>Ce qu&apos;on a construit</h2>
        <ul className={styles.produits}>
          {PRODUITS.map((p) => {
            const contenu = (
              <>
                <span className={styles.lettre}>{p.lettre}</span>
                <span className={styles.produitTexte}>
                  <span className={styles.produitNom}>{p.nom}</span>
                  <span className={styles.produitDetail}>{p.detail} · {p.statut.toLowerCase()}</span>
                </span>
              </>
            );
            return (
              <li key={p.nom} className={styles.produit}>
                {p.href ? (
                  <a href={p.href} className={styles.produitLien}>{contenu}</a>
                ) : (
                  <span className={styles.produitLien}>{contenu}</span>
                )}
              </li>
            );
          })}
        </ul>

        <div className={styles.cta}>
          <h2 className={styles.sousTitre}>Un projet en tête ?</h2>
          <p className={styles.para}>
            Application, site, plateforme, ou une idée lue ici. Je réponds
            personnellement.
          </p>
          <a href="mailto:contact@kogiagroup.com" className="bouton accent">Écrire à Kogia</a>
        </div>
      </main>

      <footer className={styles.pied}>
        <p>Les commentaires publiés sur ce site sont publics. Retrait ou question : contact@kogiagroup.com · © 2026 KogiaGroup</p>
      </footer>
    </>
  );
}
