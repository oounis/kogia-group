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
  champs: Champ[];
  produits: ProduitDomaine[];
  suite: string[];
  notes?: Note[];
};

/**
 * Le gabarit d'une page de domaine.
 *
 * Même langage que l'accueil : filet noir sous le titre, sections numérotées,
 * chiffres pâles. Les cinq domaines partagent ce gabarit, y compris les trois
 * qui ne contiennent aucun produit. Un domaine vide avec une page plus pauvre
 * se lirait comme une page inachevée plutôt que comme un choix assumé.
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

  /* Les sections se numérotent dans l'ordre du rendu, donc le numéro reste
     juste quand un domaine n'a pas de produits. */
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      <EnTete compact />

      <main className={styles.page}>
        <p className={styles.fil}>
          <Link href="/ecosysteme">L&apos;écosystème</Link> / {nom}
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
              : "Aucun produit. Ce domaine existe dans la structure, pas encore dans les faits."}
          </span>
        </header>

        <section className={styles.section}>
          <header className={styles.enTete}>
            <span className={styles.num}>{num()}</span>
            <h2 className={styles.sectionTitre}>Le terrain</h2>
            <p className={styles.sousTitre}>
              Des champs d&apos;activité, pas des produits. Tout produit futur
              qui appartient à l&apos;un d&apos;eux trouve sa place ici, sans
              qu&apos;on crée un domaine de plus.
            </p>
          </header>

          <ul className={styles.champs}>
            {champs.map((c) => (
              <li key={c.nom} className={styles.champ}>
                <span className={styles.champNom}>{c.nom}</span>
                <span className={styles.champQuoi}>{c.quoi}</span>
              </li>
            ))}
          </ul>
        </section>

        {actif && (
          <section className={styles.section}>
            <header className={styles.enTete}>
              <span className={styles.num}>{num()}</span>
              <h2 className={styles.sectionTitre}>Ce qui tourne</h2>
              <p className={styles.sousTitre}>
                En ligne, utilisé, vérifiable.
              </p>
            </header>

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

        {notes.length > 0 && (
          <section className={styles.section}>
            <header className={styles.enTete}>
              <span className={styles.num}>{num()}</span>
              <h2 className={styles.sectionTitre}>Ce qu&apos;il faut savoir</h2>
            </header>

            {notes.map((nt, i) => (
              <div
                key={i}
                className={`${styles.note} ${nt.avertit ? styles.noteAvertit : ""}`}
              >
                {nt.titre && <strong className={styles.noteTitre}>{nt.titre}</strong>}
                {nt.texte.map((t, j) => (
                  <p key={j}>{t}</p>
                ))}
              </div>
            ))}
          </section>
        )}

        <section className={styles.suite}>
          <header className={styles.enTete}>
            <span className={styles.num}>{num()}</span>
            <h2 className={styles.sectionTitre}>
              {actif ? "La suite" : "Avant qu'il existe"}
            </h2>
          </header>

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
