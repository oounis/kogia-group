import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Marque from "@/components/Marque";
import { createClient } from "@/lib/supabase/server";
import styles from "../explore/explore.module.css";

export const metadata: Metadata = { title: "Brouillons", robots: { index: false } };

export default async function DraftsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/drafts");

  const { data: drafts } = await supabase
    .from("articles")
    .select("slug, title, subtitle, updated_at")
    .eq("author_id", user.id)
    .eq("status", "draft")
    .order("updated_at", { ascending: false });

  return (
    <>
      <header className={styles.top}>
        <div className={styles.topIn}>
          <Marque />
          <nav className={styles.nav} aria-label="Navigation principale">
            <Link href="/write">Écrire</Link>
            <Link href="/about">À propos</Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <h1 className={styles.titre}>Vos brouillons</h1>
        {!drafts || drafts.length === 0 ? (
          <p className={styles.vide}>Aucun brouillon pour l&apos;instant.</p>
        ) : (
          <ul className={styles.liste}>
            {drafts.map((d) => (
              <li key={d.slug} className={styles.poste}>
                <Link href={`/write?slug=${d.slug}`} className={styles.lien}>
                  <h2 className={styles.titreArticle}>{d.title || "Sans titre"}</h2>
                  {d.subtitle && <p className={styles.sousTitre}>{d.subtitle}</p>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
