import Link from "next/link";
import Marque from "@/components/Marque";
import styles from "./page.module.css";

/**
 * L'entrée de Kogia. Explique le monde Kogia en quelques secondes avant de
 * proposer le contenu — pas un article au hasard en premier écran.
 *
 * L'article vedette est réel (celui déjà publié sur kogiagroup.com) ; les
 * sections « tendances » et « recommandé » restent honnêtement absentes tant
 * qu'il n'y a pas assez d'articles réels pour les remplir sans inventer des
 * données — voir docs/STATUS.md.
 */
export default function Home() {
  return (
    <>
      <header className={styles.top}>
        <div className={styles.topIn}>
          <Marque />
          <nav className={styles.nav} aria-label="Navigation principale">
            <Link href="/explore">Explorer</Link>
            <Link href="/topics">Sujets</Link>
            <Link href="/about">Kogia</Link>
          </nav>
          <div className={styles.topActions}>
            <Link href="/login" className={styles.lienDiscret}>Se connecter</Link>
            <Link href="/join" className="bouton accent">Rejoindre Kogia</Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <h1>Des idées qui méritent de remonter à la surface.</h1>
          <p>
            Kogia est une communauté pour découvrir, publier et développer des
            idées sérieuses. Des articles pratiques, des gens curieux, une
            discussion sur les opportunités, et des projets prometteurs qui
            deviennent réels.
          </p>
          <div className={styles.heroActions}>
            <Link href="/explore" className="bouton accent">Explorer les articles</Link>
            <Link href="/join" className="bouton ligne">Rejoindre Kogia</Link>
          </div>
          <p className={styles.heroSujets}>Technologie · Business · Projets · Créativité</p>
        </section>

        <section className={styles.vedette}>
          <p className={styles.sectionT}>Article vedette</p>
          <Link
            className={styles.vedetteCarte}
            href="/articles/kharbga-from-sand-to-screen"
          >
            <span className={styles.vedetteCat}>Technologie · 14 min de lecture</span>
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
            <div>
              <h3>Découvrir</h3>
              <p>Une idée explorée sérieusement : le problème, le marché, les risques, un verdict honnête.</p>
            </div>
            <div>
              <h3>Discuter</h3>
              <p>Réagir, commenter, dire ce qui cloche ou ce qui manque — avec les gens qui ont vécu le problème.</p>
            </div>
            <div>
              <h3>Développer</h3>
              <p>Les idées qui méritent d&apos;exister deviennent des projets, puis des produits.</p>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Rejoignez les gens qui font remonter des idées utiles à la surface.</h2>
          <Link href="/join" className="bouton accent">Créer votre compte</Link>
        </section>
      </main>

      <footer className={styles.pied}>
        <p>© 2026 Kogia Group · <a href="https://kogiagroup.com">kogiagroup.com</a></p>
      </footer>
    </>
  );
}
