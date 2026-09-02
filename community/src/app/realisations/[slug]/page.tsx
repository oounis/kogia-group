import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnTete, Pied } from "@/components/Chrome";
import Icone from "@/components/icons/Icone";
import { TRAVAUX, travailParSlug, LIBELLE_ETAT, type Etat } from "@/lib/travaux";
import { dateLisible } from "@/lib/journal";
import { IMAGE_PARTAGE } from "@/lib/site";
import styles from "./projet.module.css";

/** Les dix pages sont pré-rendues à la construction : le contenu vient d'un
 *  fichier, pas d'une base, donc rien ne justifie de les calculer à chaque
 *  visite. */
export function generateStaticParams() {
  return TRAVAUX.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const t = travailParSlug(slug);
  if (!t) return { title: "Projet introuvable" };
  return {
    title: t.nom,
    description: t.baseline,
    alternates: { canonical: `/realisations/${t.slug}` },
    /* `images` est répété ici volontairement : Next remplace le bloc
       `openGraph` du gabarit au lieu de le compléter, donc l'omettre revient
       à publier dix pages sans aperçu de partage. */
    openGraph: {
      title: `${t.nom} · Kogia`,
      description: t.baseline,
      url: `/realisations/${t.slug}`,
      images: [IMAGE_PARTAGE],
    },
  };
}

const CLASSES: Record<Etat, string> = {
  production: styles.production,
  demo: styles.demo,
  chantier: styles.chantier,
  pause: styles.pause,
  prepare: styles.prepare,
};

export default async function ProjetPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const t = travailParSlug(slug);
  if (!t) notFound();

  /* Les voisins dans l'ordre du catalogue, pour que la lecture puisse
     continuer sans repasser par l'index. Le calcul est fait ici plutôt que
     stocké dans les données : un projet inséré au milieu ne demande alors
     aucune mise à jour de ses voisins. */
  const i = TRAVAUX.findIndex((x) => x.slug === t.slug);
  const precedent = i > 0 ? TRAVAUX[i - 1] : null;
  const suivant = i < TRAVAUX.length - 1 ? TRAVAUX[i + 1] : null;

  return (
    <>
      <EnTete actif="/realisations" compact />

      <main className={styles.main}>
        <p className={styles.fil}>
          <Link href="/realisations">Réalisations</Link> · {t.domaine}
        </p>

        <div className={styles.entete}>
          <div className={styles.titreLigne}>
            <span className={styles.icone} aria-hidden="true">
              <Icone nom={t.icone} taille="feature" />
            </span>
            <h1>{t.nom}</h1>
          </div>

          <div className={styles.meta}>
            <span className={`${styles.etat} ${CLASSES[t.etat]}`}>
              {LIBELLE_ETAT[t.etat]}
            </span>
            <span className={styles.metaTexte}>
              Commencé le {dateLisible(t.depuis)}
            </span>
          </div>

          <p className={styles.baseline}>{t.baseline}</p>

          <div className={styles.actions}>
            {t.href && (
              <a href={t.href} className="bouton accent">
                {t.hrefLibelle ?? "Voir en ligne"}
              </a>
            )}
            <a href="mailto:contact@kogiagroup.com" className="bouton ligne">
              En parler
            </a>
          </div>
        </div>

        <div className={styles.chiffres}>
          {t.chiffres.map((c) => (
            <div key={c.libelle} className={styles.chiffre}>
              <span className={styles.chiffreValeur}>{c.valeur}</span>
              <span className={styles.chiffreLibelle}>{c.libelle}</span>
            </div>
          ))}
        </div>
        <p className={styles.preuve}>
          <strong>D&apos;où viennent ces chiffres.</strong> {t.preuve}
        </p>

        <section className={styles.bloc}>
          <h2>Le problème</h2>
          <p className={styles.para}>{t.probleme}</p>
        </section>

        <section className={styles.bloc}>
          <h2>Ce qui existe et fonctionne</h2>
          <ul className={styles.liste}>
            {t.construit.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        {t.comment.length > 0 && (
          <section className={styles.bloc}>
            <h2>Les décisions qui méritent d&apos;être racontées</h2>
            {t.comment.map((d) => (
              <div key={d.titre} className={styles.decision}>
                <h3>{d.titre}</h3>
                <p>{d.texte}</p>
              </div>
            ))}
          </section>
        )}

        <section className={styles.bloc}>
          <h2>Où ça en est, sans arrondir</h2>
          <p className={styles.encadre}>{t.ou}</p>
        </section>

        <section className={styles.bloc}>
          <h2>Ce que ça nous a appris</h2>
          <p className={styles.appris}>{t.appris}</p>
        </section>

        <section className={styles.bloc}>
          <h2>Avec quoi c&apos;est construit</h2>
          <div className={styles.pile}>
            {t.pile.map((p) => (
              <span key={p} className={styles.pileItem}>{p}</span>
            ))}
          </div>
        </section>

        <nav className={styles.suite} aria-label="Autres projets">
          <p className={styles.suiteT}>Continuer</p>
          <div className={styles.suiteGrille}>
            {precedent && (
              <Link href={`/realisations/${precedent.slug}`} className={styles.suiteCarte}>
                <span className={styles.suiteSens}>Précédent</span>
                <span className={styles.suiteNom}>{precedent.nom}</span>
                <span className={styles.suiteBaseline}>{precedent.baseline}</span>
              </Link>
            )}
            {suivant && (
              <Link href={`/realisations/${suivant.slug}`} className={styles.suiteCarte}>
                <span className={styles.suiteSens}>Suivant</span>
                <span className={styles.suiteNom}>{suivant.nom}</span>
                <span className={styles.suiteBaseline}>{suivant.baseline}</span>
              </Link>
            )}
          </div>
        </nav>
      </main>

      <Pied />
    </>
  );
}
