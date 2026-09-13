import Link from "next/link";
import { EnTete, Pied } from "@/components/Chrome";
import styles from "./Domaine.module.css";

export type Champ = { nom: string; quoi: string };
export type ProduitDomaine = {
  nom: string;
  quoi: string;
  lien?: string;
  libelle: string;
};
export type Note = { titre?: string; texte: string[]; avertit?: boolean };

export type DomaineProps = {
  nom: string;
  mandat: string;
  intro: string;
  /** Les sous-domaines. Ce sont des champs d'activité, pas des produits. */
  champs: Champ[];
  /** Vide est une valeur valide, et elle s'affiche comme telle. */
  produits: ProduitDomaine[];
  /** Ce que ce domaine attend avant d'exister vraiment. */
  suite: string[];
  notes?: Note[];
};

/**
 * Le gabarit d'une page de domaine.
 *
 * Les cinq domaines partagent exactement la même mise en page, y compris ceux
 * qui ne contiennent aucun produit. Si un domaine vide avait un gabarit plus
 * pauvre, il se lirait comme une page inachevée plutôt que comme un choix.
 */
export function Domaine({
  nom,
  mandat,
  intro,
  champs,
  produits,
  suite,
  notes = [],
}: DomaineProps) {
  const actif = produits.length > 0;

  return (
    <>
      <EnTete compact />

      <main className={styles.page}>
        <p className={styles.fil}>
          <Link href="/ecosysteme">L'écosystème</Link> → {nom}
        </p>

        <header className={styles.chapeau}>
          <h1 className={styles.titre}>{nom}</h1>
          <p className={styles.mandat}>{mandat}</p>
          <p className={styles.intro}>{intro}</p>

          <span
            className={`${styles.etat} ${actif ? styles.etatActif : styles.etatVide}`}
          >
            {actif
              ? `${produits.length} produit${produits.length > 1 ? "s" : ""} en ligne`
              : "Aucun produit : ce domaine existe dans la structure, pas encore dans les faits"}
          </span>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitre}>Ce que couvre ce domaine</h2>
          <p className={styles.texte}>
            Ce sont des champs d'activité, pas des produits. Tout produit futur
            qui appartient à l'un d'eux trouve sa place ici, sans qu'on ait à
            créer un nouveau domaine.
          </p>
          <ul className={styles.champs}>
            {champs.map((c) => (
              <li key={c.nom} className={styles.champ}>
                <span className={styles.champNom}>{c.nom}</span>
                <span className={styles.champQuoi}>{c.quoi}</span>
              </li>
            ))}
          </ul>
        </section>

        {produits.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitre}>Les produits en ligne</h2>
            <ul className={styles.produits}>
              {produits.map((p) => (
                <li key={p.nom} className={styles.produit}>
                  <span className={styles.produitNom}>{p.nom}</span>
                  <p className={styles.produitQuoi}>{p.quoi}</p>
                  <span className={styles.produitLien}>
                    {p.lien ? (
                      p.lien.startsWith("http") ? (
                        <a href={p.lien}>{p.libelle}</a>
                      ) : (
                        <Link href={p.lien}>{p.libelle}</Link>
                      )
                    ) : (
                      p.libelle
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {notes.map((n, i) => (
          <div
            key={i}
            className={`${styles.note} ${n.avertit ? styles.noteAvertit : ""}`}
          >
            {n.titre && (
              <p>
                <strong>{n.titre}</strong>
              </p>
            )}
            {n.texte.map((t, j) => (
              <p key={j}>{t}</p>
            ))}
          </div>
        ))}

        <section className={styles.suite}>
          <h2 className={styles.sectionTitre}>
            {actif ? "Ce qui vient ensuite" : "Ce qui doit arriver avant qu'il existe"}
          </h2>
          <ul className={styles.suiteListe}>
            {suite.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      </main>

      <Pied />
    </>
  );
}
