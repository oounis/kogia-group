import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Marque from "@/components/Marque";
import { createClient } from "@/lib/supabase/server";
import styles from "./article.module.css";

async function getArticle(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("id, slug, title, subtitle, body, cover_url, published_at, author:profiles!articles_author_id_fkey(handle, display_name, bio)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.subtitle ?? undefined,
    openGraph: {
      title: article.title,
      description: article.subtitle ?? undefined,
      images: article.cover_url ? [article.cover_url] : undefined,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const author = Array.isArray(article.author) ? article.author[0] : article.author;
  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null;

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
        <Link href="/explore" className={styles.retour}>← Toutes les idées</Link>
        <div className={styles.meta}>
          {author && <span className={styles.auteur}>{author.display_name}</span>}
          {date && <span>{date}</span>}
        </div>
        <h1 className={styles.titre}>{article.title}</h1>
        {article.subtitle && <p className={styles.sousTitre}>{article.subtitle}</p>}
        <div
          className={styles.corps}
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </main>

      <footer className={styles.pied}>
        <p>© 2026 Kogia Group</p>
      </footer>
    </>
  );
}
