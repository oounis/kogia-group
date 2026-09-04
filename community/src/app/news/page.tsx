import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import Icone, { type NomIcone } from "@/components/icons/Icone";
import { journalTrie, dateLisible, type Entree } from "@/lib/journal";
import styles from "./news.module.css";

/**
 * Les actualités de la société.
 *
 * `/news` renvoyait 404, relevé par l'audit du site en ligne. La tentation
 * était d'ouvrir une rubrique neuve. Elle aurait été vide, et une rubrique
 * vide sur la page d'accueil d'une société dit exactement le contraire de ce
 * qu'on veut dire.
 *
 * Il y a déjà vingt-huit faits datés dans le journal. Le problème n'était pas
 * l'absence de matière, c'était le cadrage : tout arrivait mélangé, du
 * déploiement d'une plateforme à un ajustement d'espacement. Cette page ne
 * crée donc aucun contenu. Elle sélectionne ce qui intéresse quelqu'un
 * d'extérieur, et laisse le reste au journal, qui reste le registre complet.
 *
 * Même raisonnement que pour les forums, dont l'étude a conclu qu'il ne
 * fallait pas les construire : mieux vaut une rubrique nourrie par ce qui
 * existe qu'une pièce vide.
 */

const RUBRIQUES_ACTU = new Set(["Société", "Produit", "Production", "Sécurité"]);

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Ce que Kogia Group a mis en service, livré ou corrigé, à la date où c'est arrivé. Chaque entrée est un fait daté, pas un communiqué.",
  alternates: { canonical: "/news" },
};

function actualites(): Entree[] {
  return journalTrie().filter((e) => RUBRIQUES_ACTU.has(e.rubrique));
}

/* Typé `NomIcone` et non `string` : le composant n'accepte qu'un nom du
   système, donc une faute de frappe échoue à la compilation plutôt qu'à
   l'affichage. */
const ICONE_RUBRIQUE: Record<string, NomIcone> = {
  "Société": "community",
  "Produit": "launch",
  "Production": "proof",
  "Sécurité": "verify",
};

export default function NewsPage() {
  const entrees = actualites();
  const avecChiffre = entrees.filter((e) => e.chiffre).length;
  const projets = new Set(entrees.map((e) => e.projet).filter(Boolean)).size;

  return (
    <>
      <EnTete actif="/news" />

      <main className={styles.main}>
        <div className={styles.entete}>
          <h1>Actualités</h1>
          <p className={styles.lede}>
            Ce qui a été mis en service, livré ou corrigé.
          </p>
          <p className={styles.sousLede}>
            Chaque ligne est un fait daté, avec son chiffre quand il y en a un.
            Aucune annonce de partenariat, aucune levée de fonds, aucun
            « nous sommes ravis ». Le registre complet, y compris les
            ajustements minuscules et les pannes, reste dans{" "}
            <Link href="/journal">le journal</Link>.
          </p>
          <ul className={styles.compte}>
            <li><strong>{entrees.length}</strong> actualités</li>
            <li><strong>{avecChiffre}</strong> avec un chiffre mesuré</li>
            <li><strong>{projets}</strong> projets concernés</li>
          </ul>
        </div>

        {entrees.length === 0 ? (
          /* Une rubrique vide se dit, elle ne se déguise pas en page qui
             charge. Ce cas ne devrait pas arriver, le journal est nourri. */
          <p className={styles.vide}>
            Aucune actualité pour l&apos;instant. Le journal complet est{" "}
            <Link href="/journal">ici</Link>.
          </p>
        ) : (
          <ol className={styles.liste}>
            {entrees.map((e) => (
              <li key={`${e.date}-${e.titre}`} className={styles.entree}>
                <div className={styles.entreeHaut}>
                  <time className={styles.date} dateTime={e.date}>
                    {dateLisible(e.date)}
                  </time>
                  <span className={styles.rubrique}>
                    <Icone
                      nom={ICONE_RUBRIQUE[e.rubrique] ?? "article"}
                      className={styles.rubriqueIcone}
                    />
                    {e.rubrique}
                  </span>
                  {e.projet && <span className={styles.projet}>{e.projet}</span>}
                </div>
                <h2 className={styles.titre}>{e.titre}</h2>
                <p className={styles.texte}>{e.texte}</p>
                {e.chiffre && (
                  <p className={styles.chiffre}>
                    <Icone nom="analytics" className={styles.chiffreIcone} />
                    {e.chiffre}
                  </p>
                )}
              </li>
            ))}
          </ol>
        )}

        <aside className={styles.appel}>
          <h2>Le reste du registre</h2>
          <p>
            Cette page ne montre que ce qui concerne quelqu&apos;un
            d&apos;extérieur. Le journal contient tout, dans l&apos;ordre où
            c&apos;est arrivé, y compris ce qui a cassé et comment ça a été
            refermé.
          </p>
          <div className={styles.appelActions}>
            <Link href="/journal" className="bouton accent">Le journal complet</Link>
            <Link href="/realisations" className="bouton ligne">Nos plateformes</Link>
          </div>
        </aside>
      </main>

      <Pied />
    </>
  );
}
