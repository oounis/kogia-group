import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import Signature from "@/components/Signature";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kogia Group, Technology for Human Progress",
  description:
    "Une société de technologie organisée autour de cinq domaines humains : apprendre, savoir faire, jouer, travailler, chercher. Quatre produits en ligne, et trois domaines qui n'en ont encore aucun.",
  alternates: { canonical: "/" },
};

/** Les cinq domaines, avec le nombre de produits réellement en ligne.
 *
 *  Le compteur n'est pas décoratif : trois domaines sur cinq sont à zéro et
 *  l'affichent. Une page d'accueil qui laisse croire que tout existe se
 *  démonte à la première visite, et on ne la lit plus jamais pareil ensuite. */
const DOMAINES = [
  { href: "/education", nom: "Education", role: "Développer le savoir humain", produits: 3 },
  { href: "/skills", nom: "Skills", role: "Transformer une capacité en opportunité", produits: 0 },
  { href: "/play", nom: "Play", role: "Défier, créer et relier par le jeu", produits: 0 },
  { href: "/business", nom: "Business", role: "Moderniser le travail resté sur papier", produits: 0 },
  { href: "/research", nom: "Research", role: "Observer le monde avant de construire", produits: 0 },
] as const;

const PRODUITS = [
  {
    nom: "Kogia Kids",
    domaine: "Education",
    quoi: "Des fiches imprimables gratuites pour l'école primaire. Pas de compte, pas de limite, pas de paiement.",
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
    quoi: "La gestion d'école : présences, observations, rapports, droits par module. Arabe par défaut, de droite à gauche partout.",
    lien: null,
    libelle: "en usage quotidien dans une école",
  },
] as const;

export default function Page() {
  return (
    <>
      <EnTete actif="/" compact />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroIn}>
            <p className={styles.devise}>Technology for Human Progress</p>
            <h1 className={styles.titre}>
              Une société construite autour de ce que font les gens,
              pas autour de ses produits du moment.
            </h1>
            <p className={styles.chapeau}>
              Apprendre, savoir faire, jouer, travailler, chercher. Cinq domaines
              humains qui ne changent pas. Les produits, eux, changent,
              et peuvent échouer sans laisser de trou dans la société.
            </p>
            <p className={styles.heroLiens}>
              <Link href="/ecosysteme" className="bouton accent">
                Voir l'écosystème
              </Link>
            </p>
          </div>
        </section>

        <section className={styles.bande}>
          <div className={styles.bandeIn}>
            <h2 className={styles.h2}>Les cinq domaines</h2>
            <ul className={styles.domaines}>
              {DOMAINES.map((d) => (
                <li key={d.href}>
                  <Link href={d.href} className={styles.domaine}>
                    <span className={styles.domaineNom}>Kogia {d.nom}</span>
                    <span className={styles.domaineRole}>{d.role}</span>
                    <span
                      className={`${styles.compteur} ${d.produits ? styles.actif : styles.vide}`}
                    >
                      {d.produits
                        ? `${d.produits} produits en ligne`
                        : "aucun produit"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className={styles.socle}>
              Tous s'appuient sur une base commune : une identité, une
              intelligence, des données, un langage visuel.
            </p>
          </div>
        </section>

        <section className={styles.bande}>
          <div className={styles.bandeIn}>
            <h2 className={styles.h2}>Ce qui est en ligne aujourd'hui</h2>
            <p className={styles.texte}>
              Trois produits, tous dans le même domaine. Les quatre autres
              domaines existent dans la structure et ne contiennent rien encore.
              C'est la photographie exacte de la société.
            </p>
            <ul className={styles.produits}>
              {PRODUITS.map((p) => (
                <li key={p.nom} className={styles.produit}>
                  <span className={styles.produitDomaine}>Kogia {p.domaine}</span>
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
            <h2 className={styles.h2}>Comment une idée devient un produit</h2>
            <ol className={styles.etapes}>
              <li><strong>Recherche</strong> : le problème existe-t-il vraiment ?</li>
              <li><strong>Une page</strong> : quelqu'un laisse-t-il son adresse ?</li>
              <li><strong>Un prototype</strong> : dix personnes l'utilisent-elles ?</li>
              <li><strong>Un client</strong> : une seule personne paie-t-elle ?</li>
              <li><strong>Un produit</strong> : revient-elle ?</li>
            </ol>
            <p className={styles.texte}>
              Le code s'écrit à la troisième étape, pas à la première. Un domaine
              ne se crée pas parce qu'on a une idée : il se crée quand il y a des
              utilisateurs, une valeur et un chemin vers le revenu.
            </p>
          </div>
        </section>

        <Signature />
      </main>

      <Pied />
    </>
  );
}
