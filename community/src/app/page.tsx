import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import Structure from "@/components/Structure";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kogia Group, Technology for Human Progress",
  description:
    "Une société de technologie organisée autour de cinq domaines humains : apprendre, savoir faire, jouer, travailler, chercher. Trois produits en ligne, et trois domaines qui n'en ont encore aucun.",
  alternates: { canonical: "/" },
};

const DOMAINES = [
  { href: "/education", nom: "Education", role: "Développer le savoir humain", produits: 3 },
  { href: "/skills", nom: "Skills", role: "Transformer une capacité en opportunité", produits: 0 },
  { href: "/play", nom: "Play", role: "Défier, créer et relier par le jeu", produits: 0 },
  { href: "/business", nom: "Business", role: "Moderniser le travail resté sur papier", produits: 0 },
  { href: "/research", nom: "Research", role: "Observer avant de construire", produits: 0 },
] as const;

const PRODUITS = [
  {
    nom: "Kogia Kids",
    quoi: "Des fiches imprimables gratuites pour l'école primaire. Pas de compte, pas de limite, pas de paiement.",
    lien: "https://kogiakids.com",
    libelle: "kogiakids.com",
  },
  {
    nom: "Coreon EDU",
    quoi: "L'ERP scolaire : évaluer une classe en trente secondes, suivre la journée d'un enfant, de la maternelle au CM2.",
    lien: "https://edu.kogiagroup.com",
    libelle: "edu.kogiagroup.com",
  },
  {
    nom: "EduPlus Connect",
    quoi: "La gestion d'école : présences, observations, rapports, droits par module. Arabe par défaut, de droite à gauche partout.",
    lien: null,
    libelle: "en usage quotidien dans une école",
  },
] as const;

const ETAPES = [
  ["Recherche", "le problème existe-t-il vraiment ?"],
  ["Une page", "quelqu'un laisse-t-il son adresse ?"],
  ["Un prototype", "dix personnes l'utilisent-elles ?"],
  ["Un client", "une seule personne paie-t-elle ?"],
  ["Un produit", "revient-elle ?"],
] as const;

export default function Page() {
  return (
    <>
      <EnTete actif="/" compact />

      <main>
        {/* Le premier écran : la phrase, puis immédiatement le schéma. On voit
            la forme de la société avant de lire quoi que ce soit d'autre. */}
        <section className={styles.hero}>
          <div className={styles.heroIn}>
            <div className={styles.heroTexte}>
              <p className={styles.devise}>Technology for Human Progress</p>
              <h1 className={styles.titre}>
                Une société construite autour de ce que font les gens.
              </h1>
              <p className={styles.chapeau}>
                Apprendre, savoir faire, jouer, travailler, chercher. Cinq
                domaines humains qui ne changent pas. Les produits, eux,
                changent, et peuvent échouer sans laisser de trou.
              </p>
              <p className={styles.heroLiens}>
                <Link href="/ecosysteme" className="bouton accent">
                  Voir l&apos;écosystème
                </Link>
              </p>
            </div>

            <div className={styles.heroSchema}>
              <Structure />
            </div>
          </div>
        </section>

        <section className={styles.bande}>
          <div className={styles.bandeIn}>
            <div className={styles.enTeteBande}>
              <h2 className={styles.h2}>Les cinq domaines</h2>
              <p className={styles.sousTitre}>
                Trois sur cinq ne contiennent encore rien, et le disent.
              </p>
            </div>
            <ul className={styles.domaines}>
              {DOMAINES.map((d) => (
                <li key={d.href}>
                  <Link href={d.href} className={styles.domaine}>
                    <span className={styles.domaineNom}>Kogia {d.nom}</span>
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
            <div className={styles.enTeteBande}>
              <h2 className={styles.h2}>Ce qui est en ligne aujourd&apos;hui</h2>
              <p className={styles.sousTitre}>
                Trois produits, tous dans le même domaine.
              </p>
            </div>
            <ul className={styles.produits}>
              {PRODUITS.map((p) => (
                <li key={p.nom} className={styles.produit}>
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
            <div className={styles.enTeteBande}>
              <h2 className={styles.h2}>Comment une idée devient un produit</h2>
              <p className={styles.sousTitre}>
                Le code s&apos;écrit à la troisième étape, pas à la première.
              </p>
            </div>
            <ol className={styles.etapes}>
              {ETAPES.map(([titre, question], i) => (
                <li key={titre} className={styles.etape}>
                  <span className={styles.etapeNum}>{i + 1}</span>
                  <span className={styles.etapeTitre}>{titre}</span>
                  <span className={styles.etapeQ}>{question}</span>
                </li>
              ))}
            </ol>
            <p className={styles.note}>
              Un domaine ne se crée pas parce qu&apos;on a une idée : il se crée
              quand il y a des utilisateurs, une valeur et un chemin vers le
              revenu.
            </p>
          </div>
        </section>
      </main>

      <Pied />
    </>
  );
}
