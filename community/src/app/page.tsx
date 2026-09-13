import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import Structure from "@/components/Structure";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kogia Group, Technology for Human Progress",
  description:
    "Les produits passent, les besoins restent. Kogia est bâtie sur cinq domaines humains : apprendre, savoir faire, jouer, travailler, chercher.",
  alternates: { canonical: "/" },
};

const DOMAINES = [
  {
    href: "/education",
    nom: "Education",
    verbe: "Apprendre",
    role: "Développer le savoir humain, de la première lettre au métier.",
    produits: 3,
  },
  {
    href: "/skills",
    nom: "Skills",
    verbe: "Savoir faire",
    role: "Une compétence prouvée vaut mieux qu'une compétence affirmée.",
    produits: 0,
  },
  {
    href: "/play",
    nom: "Play",
    verbe: "Jouer",
    role: "On revient jouer sans qu'on vous le demande.",
    produits: 0,
  },
  {
    href: "/business",
    nom: "Business",
    verbe: "Travailler",
    role: "Des métiers entiers tournent encore sur du papier.",
    produits: 0,
  },
  {
    href: "/research",
    nom: "Research",
    verbe: "Chercher",
    role: "Regarder le monde avant de construire pour lui.",
    produits: 0,
  },
] as const;

const PRODUITS = [
  {
    nom: "Kogia Kids",
    tag: "Education",
    quoi: "Des fiches imprimables pour l'école primaire. Gratuites, sans compte, sans limite. On télécharge, on imprime, c'est tout.",
    lien: "https://kogiakids.com",
    libelle: "kogiakids.com",
  },
  {
    nom: "Coreon EDU",
    tag: "Education",
    quoi: "Évaluer une classe en trente secondes. Suivre la journée d'un enfant. De la maternelle au CM2.",
    lien: "https://edu.kogiagroup.com",
    libelle: "edu.kogiagroup.com",
  },
  {
    nom: "EduPlus Connect",
    tag: "Education",
    quoi: "Présences, observations, rapports, droits par module. Arabe par défaut, de droite à gauche partout.",
    lien: null,
    libelle: "en usage quotidien dans une école",
  },
] as const;

const PORTES = [
  ["Recherche", "Le problème existe-t-il ?"],
  ["Une page", "Quelqu'un laisse son adresse ?"],
  ["Un prototype", "Dix personnes l'utilisent ?"],
  ["Un client", "Une seule personne paie ?"],
  ["Un produit", "Revient-elle ?"],
] as const;

export default function Page() {
  return (
    <>
      <EnTete actif="/" compact />

      <main>
        {/* Le premier écran, sur fond d'encre. La phrase tient en deux lignes,
            et le schéma se retourne pour vivre dessus. */}
        <section className={styles.hero}>
          <div className={styles.heroIn}>
            <div className={styles.heroTexte}>
              <p className={styles.devise}>Technology for Human Progress</p>
              <h1 className={styles.titre}>
                Les produits passent.
                <br />
                <em className={styles.accent}>Les besoins restent.</em>
              </h1>
              <p className={styles.chapeau}>
                Kogia est bâtie sur cinq domaines humains. Un produit peut
                disparaître sans que la société vacille.
              </p>
              <p className={styles.heroLiens}>
                <Link href="/ecosysteme" className={styles.cta}>
                  Voir l&apos;écosystème
                </Link>
              </p>
            </div>

            <div className={styles.heroSchema}>
              <Structure />
            </div>
          </div>
        </section>

        {/* Les cinq verbes. Une bande typographique avant la grille. */}
        <section className={styles.verbes}>
          <div className={styles.bandeIn}>
            <p className={styles.verbesLigne}>
              {DOMAINES.map((d, i) => (
                <span key={d.nom}>
                  <span className={styles.verbe}>{d.verbe}</span>
                  {i < DOMAINES.length - 1 && (
                    <span className={styles.sep} aria-hidden="true">
                      /
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className={styles.bande}>
          <div className={styles.bandeIn}>
            <header className={styles.enTete}>
              <span className={styles.num}>01</span>
              <h2 className={styles.h2}>La charpente</h2>
              <p className={styles.sousTitre}>
                Trois domaines sur cinq ne contiennent rien, et le disent.
              </p>
            </header>

            <ul className={styles.domaines}>
              {DOMAINES.map((d) => (
                <li key={d.href}>
                  <Link href={d.href} className={styles.domaine}>
                    <span className={styles.domaineTete}>
                      <span className={styles.domaineNom}>{d.nom}</span>
                      <span
                        className={`${styles.pastille} ${d.produits ? styles.plein : styles.creux}`}
                        aria-hidden="true"
                      />
                    </span>
                    <span className={styles.domaineRole}>{d.role}</span>
                    <span
                      className={`${styles.puce} ${d.produits ? styles.puceActif : styles.puceVide}`}
                    >
                      {d.produits ? `${d.produits} produits` : "aucun produit"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.bande} ${styles.bandeDouce}`}>
          <div className={styles.bandeIn}>
            <header className={styles.enTete}>
              <span className={styles.num}>02</span>
              <h2 className={styles.h2}>Ce qui existe vraiment</h2>
              <p className={styles.sousTitre}>
                Trois produits en ligne. Tous dans le même domaine.
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
          </div>
        </section>

        <section className={styles.bande}>
          <div className={styles.bandeIn}>
            <header className={styles.enTete}>
              <span className={styles.num}>03</span>
              <h2 className={styles.h2}>Cinq portes</h2>
              <p className={styles.sousTitre}>
                Le code s&apos;écrit à la troisième. Pas à la première.
              </p>
            </header>

            <ol className={styles.portes}>
              {PORTES.map(([titre, question], i) => (
                <li key={titre} className={styles.porte}>
                  <span className={styles.porteNum}>{i + 1}</span>
                  <span className={styles.porteTitre}>{titre}</span>
                  <span className={styles.porteQ}>{question}</span>
                </li>
              ))}
            </ol>

            <blockquote className={styles.citation}>
              Un domaine ne se crée pas parce qu&apos;on a une idée. Il se crée
              quand il y a des utilisateurs, une valeur, et un chemin vers le
              revenu.
            </blockquote>
          </div>
        </section>
      </main>

      <Pied />
    </>
  );
}
