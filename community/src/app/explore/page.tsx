import type { Metadata } from "next";
import Link from "next/link";
import Marque from "@/components/Marque";
import { createClient } from "@/lib/supabase/server";
import styles from "./explore.module.css";

export const metadata: Metadata = {
  title: "Explorer",
  description: "Parcourez les articles Kogia par sujet.",
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
            <Link href="/about">Kogia</Link>
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
      </main>
    </>
  );
}
