import type { Metadata } from "next";
import Link from "next/link";
import Marque from "@/components/Marque";
import { createClient } from "@/lib/supabase/server";
import styles from "./explore.module.css";

export const metadata: Metadata = {
  title: "Explorer",
  description:
    "Toutes les idées publiées par Kogia : problème, marché, risques et un verdict honnête. Technologie, business, projets et créativité.",
};

async function getArticles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("slug, title, subtitle, published_at, author:profiles!articles_author_id_fkey(display_name)")
    .eq("status", "published")
    .eq("visibility", "public")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export default async function ExplorePage() {
  const articles = await getArticles();

  return (
    <>
      <header className={styles.top}>
        <div className={styles.topIn}>
          <Marque />
          <nav className={styles.nav} aria-label="Navigation principale">
            <Link href="/explore">Explorer</Link>
            <Link href="/about">À propos</Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.titre}>Toutes les idées</h1>

        {articles.length === 0 ? (
          <p className={styles.vide}>Rien de publié pour l&apos;instant.</p>
        ) : (
          <ul className={styles.liste}>
            {articles.map((a) => {
              const author = Array.isArray(a.author) ? a.author[0] : a.author;
              const date = a.published_at
                ? new Date(a.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
                : null;
              return (
                <li key={a.slug} className={styles.poste}>
                  <Link href={`/articles/${a.slug}`} className={styles.lien}>
                    <div className={styles.meta}>
                      {author && <span>{author.display_name}</span>}
                      {date && <span>{date}</span>}
                    </div>
                    <h2 className={styles.titreArticle}>{a.title}</h2>
                    {a.subtitle && <p className={styles.sousTitre}>{a.subtitle}</p>}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {/* Une bibliothèque qui contient un livre ne doit pas prétendre le
            contraire, ni laisser 70 % de page blanche sans rien dire. Ce bloc
            dit où en est le catalogue et donne quelque chose à faire ensuite —
            il disparaît de lui-même dès qu'il y a de quoi remplir la page. */}
        {articles.length > 0 && articles.length < 6 && (
          <aside className={styles.jeune}>
            <p className={styles.jeuneT}>
              {articles.length === 1
                ? "Une seule idée publiée pour l'instant."
                : `${articles.length} idées publiées pour l'instant.`}
            </p>
            <p>
              On publie quand une idée vaut la lecture, pas pour tenir un
              calendrier. En attendant, ce qui est déjà construit se regarde
              plutôt que se lit.
            </p>
            <div className={styles.jeuneActions}>
              <Link href="/#ce-qui-tourne" className="bouton accent">Ce qu&apos;on a construit</Link>
              <a href="mailto:contact@kogiagroup.com" className="bouton ligne">Proposer une idée</a>
            </div>
          </aside>
        )}
      </main>
    </>
  );
}
