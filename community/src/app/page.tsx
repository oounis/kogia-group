import Link from "next/link";
import Marque from "@/components/Marque";
import Icone from "@/components/icons/Icone";
import { createClient } from "@/lib/supabase/server";
import { dureeDeLecture } from "@/lib/site";
import styles from "./page.module.css";

/**
 * L'entrée de Kogia. Explique le monde Kogia en quelques secondes avant de
 * proposer le contenu, pas un article au hasard en premier écran.
 *
 * L'article vedette est réel (celui déjà publié sur kogiagroup.com) ; les
 * sections « tendances » et « recommandé » restent honnêtement absentes tant
 * qu'il n'y a pas assez d'articles réels pour les remplir sans inventer des
 * données, voir docs/STATUS.md.
 */
const SLUG_VEDETTE = "kharbga-from-sand-to-screen";

/**
 * Ce qui existe vraiment, avec l'état réel, pas la liste de trois produits
 * que cette page portait alors que cinq tournent ou sont prêts à tourner.
 * Un état honnête vaut mieux qu'un catalogue flatteur : « en préparation »
 * dit la vérité, « bientôt » ne dit rien.
 */
const PRODUITS: {
  nom: string;
  quoi: string;
  etat: string;
  ton: "vit" | "chantier" | "prepare";
  href: string | null;
}[] = [
  {
    nom: "Coreon EDU",
    quoi: "La gestion d'un établissement scolaire : élèves, classes, présence, notes.",
    etat: "En production",
    ton: "vit",
    href: "https://edu.kogiagroup.com",
  },
  {
    nom: "Kogia Kids",
    quoi: "Des fiches à imprimer pour les 3-12 ans. Gratuites, sans compte, en arabe et en français.",
    etat: "Bientôt",
    ton: "chantier",
    href: null,
  },
  {
    nom: "Faz3a",
    quoi: "L'action citoyenne : signaler, vérifier, suivre ce qui est réparé.",
    etat: "En construction",
    ton: "chantier",
    href: null,
  },
  {
    nom: "Kharbga",
    quoi: "Le jeu de stratégie nord-africain, reconstruit pour le mobile et le web.",
    etat: "En construction",
    ton: "chantier",
    href: null,
  },
  {
    nom: "Suite Kogia",
    quoi: "Le socle de gestion d'entreprise : finance d'abord, le reste s'y branche.",
    etat: "En préparation",
    ton: "prepare",
    href: null,
  },
];

/* Le temps de lecture était écrit en dur (« 14 min ») alors que la page
   d'article le calcule depuis le contenu et affiche 15 min : deux chiffres
   différents pour le même texte, visibles par n'importe quel lecteur.
   Une seule source de vérité désormais : le contenu. */
async function dureeVedette(): Promise<number | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles").select("body")
      .eq("slug", SLUG_VEDETTE).eq("status", "published").single();
    return data?.body ? dureeDeLecture(data.body) : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const minutes = await dureeVedette();
  return (
    <>
      <header className={styles.top}>
        <div className={styles.topIn}>
          <Marque />
          <nav className={styles.nav} aria-label="Navigation principale">
            <Link href="/explore">Explorer</Link>
            <Link href="/about">À propos</Link>
          </nav>
          <div className={styles.topActions}>
            <Link href="/login" className={styles.lienDiscret}>Se connecter</Link>
            <Link href="/join" className="bouton accent">Rejoindre Kogia</Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <h1>On construit des logiciels. Et on écrit ce qu&apos;on apprend.</h1>
          <p>
            Kogia explore une idée jusqu&apos;au bout : le problème, le marché,
            les risques, un verdict honnête. Puis construit celles qui le
            méritent. Certaines tournent déjà en production, chez de vrais
            utilisateurs.
          </p>
          <div className={styles.heroActions}>
            <Link href="#ce-qui-tourne" className="bouton accent">Ce qu&apos;on a construit</Link>
            <Link href="/explore" className="bouton ligne">Lire les idées</Link>
          </div>
        </section>

        {/* Ce qui tourne, avec un état honnête par ligne.
            Cette section existe parce que la page vendait une communauté à
            un seul article, alors que la seule preuve qui compte, du logiciel
            en service chez de vrais utilisateurs, n'était nulle part. */}
        <section id="ce-qui-tourne" className={styles.tourne}>
          <p className={styles.sectionT}>Ce qui tourne</p>
          <ul className={styles.produits}>
            {PRODUITS.map((p) => (
              <li key={p.nom} className={styles.produit}>
                <span className={`${styles.etat} ${styles[p.ton]}`}>{p.etat}</span>
                <div>
                  <h3>
                    {p.href ? (
                      <a href={p.href}>{p.nom}</a>
                    ) : (
                      p.nom
                    )}
                  </h3>
                  <p>{p.quoi}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.preuve}>
            Un registre scolaire construit ici sert aujourd&apos;hui une école
            de <strong>323 élèves</strong> : dix classes, l&apos;appel fait au
            téléphone par les enseignants, en arabe.
          </p>
        </section>

        <section className={styles.vedette}>
          <p className={styles.sectionT}>Article vedette</p>
          <Link
            className={styles.vedetteCarte}
            href="/articles/kharbga-from-sand-to-screen"
          >
            <span className={styles.vedetteCat}>
              Technologie{minutes ? ` · ${minutes} min de lecture` : ""}
            </span>
            <h2>Du sable à l&apos;écran : le Kharbga peut-il devenir le grand jeu de stratégie numérique d&apos;Afrique du Nord ?</h2>
            <p>
              Un concept de projet Kogia Group : préserver un jeu vivant,
              respecter ses variantes régionales, et le reconstruire pour le
              mobile, le web et la compétition.
            </p>
          </Link>
        </section>

        <section className={styles.comment}>
          <p className={styles.sectionT}>Comment Kogia fonctionne</p>
          <div className={styles.commentGrille}>
            {/* Icônes du système Kogia : « plonger » puis « discuter » puis
                « faire remonter » racontent la métaphore de la marque, là où
                trois pictogrammes génériques n'auraient rien dit. */}
            <div>
              <span className={styles.etapeIcone} aria-hidden="true">
                <Icone nom="deep-dive" taille="feature" />
              </span>
              <h3>Découvrir</h3>
              <p>Une idée explorée sérieusement : le problème, le marché, les risques, un verdict honnête.</p>
            </div>
            <div>
              <span className={styles.etapeIcone} aria-hidden="true">
                <Icone nom="comment" taille="feature" />
              </span>
              <h3>Discuter</h3>
              <p>Réagir, commenter, dire ce qui cloche ou ce qui manque, avec les gens qui ont vécu le problème.</p>
            </div>
            <div>
              <span className={styles.etapeIcone} aria-hidden="true">
                <Icone nom="surface" taille="feature" />
              </span>
              <h3>Développer</h3>
              <p>Les idées qui méritent d&apos;exister deviennent des projets, puis des produits.</p>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Une idée, un projet, ou juste une remarque ?</h2>
          {/* La question demandait un mot et le bouton ouvrait un compte.
              Le bouton fait maintenant ce que la phrase promet ; s'inscrire
              reste offert en haut de page, pour qui le cherche. */}
          <div className={styles.ctaActions}>
            <a href="mailto:contact@kogiagroup.com" className="bouton accent">Écrire à Kogia</a>
            <Link href="/join" className="bouton ligne">Créer un compte</Link>
          </div>
        </section>
      </main>

      <footer className={styles.pied}>
        <p>© 2026 Kogia Group · <a href="https://kogiagroup.com">kogiagroup.com</a></p>
      </footer>
    </>
  );
}
