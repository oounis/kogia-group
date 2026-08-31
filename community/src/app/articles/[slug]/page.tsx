import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Marque from "@/components/Marque";
import { createClient } from "@/lib/supabase/server";
import { assainirHtmlArticle } from "@/lib/sanitize";
import { SITE_URL, dureeDeLecture } from "@/lib/site";
import styles from "./article.module.css";

/* `cache()` déduplique l'appel pour une même requête : generateMetadata() et
   le composant demandaient le même article, ce qui faisait deux allers-
   retours en base à chaque affichage de page. */
const getArticle = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("id, slug, title, subtitle, body, cover_url, published_at, updated_at, author:profiles!articles_author_id_fkey(handle, display_name, bio)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
});

/* Les URL stockées sont relatives à la racine (pour suivre le domaine).
   Les robots sociaux, eux, exigent une URL absolue : sans metadataBase,
   Next produisait `http://localhost:10000/...` en production et chaque
   partage Facebook/Reddit affichait un aperçu cassé. */
function urlAbsolue(chemin: string | null | undefined): string | undefined {
  if (!chemin) return undefined;
  return chemin.startsWith("http") ? chemin : `${SITE_URL}${chemin}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article introuvable" };

  const auteur = Array.isArray(article.author) ? article.author[0] : article.author;
  const image = urlAbsolue(article.cover_url);

  return {
    title: article.title,
    description: article.subtitle ?? undefined,
    alternates: { canonical: `${SITE_URL}/articles/${article.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/articles/${article.slug}`,
      title: article.title,
      description: article.subtitle ?? undefined,
      images: image ? [image] : undefined,
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at ?? undefined,
      authors: auteur?.display_name ? [auteur.display_name] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: article.title,
      description: article.subtitle ?? undefined,
      images: image ? [image] : undefined,
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

  /* Le corps est du HTML stocké : on ne le rend JAMAIS tel quel. Voir
     src/lib/sanitize.ts, deuxième barrière après l'autorisation en base. */
  const corpsSain = assainirHtmlArticle(article.body ?? "");
  const minutes = dureeDeLecture(corpsSain);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle ?? undefined,
    image: article.cover_url ? urlAbsolue(article.cover_url) : undefined,
    datePublished: article.published_at ?? undefined,
    dateModified: article.updated_at ?? article.published_at ?? undefined,
    author: author?.display_name
      ? { "@type": "Person", name: author.display_name }
      : undefined,
    publisher: { "@type": "Organization", name: "Kogia", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`,
  };

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
        <Link href="/explore" className={styles.retour}>← Toutes les idées</Link>
        <div className={styles.meta}>
          {author && <span className={styles.auteur}>{author.display_name}</span>}
          {date && article.published_at && (
            <time dateTime={new Date(article.published_at).toISOString()}>{date}</time>
          )}
          <span>{`${minutes} min de lecture`}</span>
        </div>
        <h1 className={styles.titre}>{article.title}</h1>
        {article.subtitle && <p className={styles.sousTitre}>{article.subtitle}</p>}
        <div
          className={styles.corps}
          dangerouslySetInnerHTML={{ __html: corpsSain }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>

      <footer className={styles.pied}>
        <p>© 2026 Kogia Group</p>
      </footer>
    </>
  );
}
