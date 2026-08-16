"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { texteVersHtml } from "@/lib/markdown-lite";
import styles from "./WriteForm.module.css";

function slugify(titre: string) {
  return titre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

type Brouillon = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  source_text: string | null;
} | null;

export default function WriteForm({ brouillon = null }: { brouillon?: Brouillon }) {
  const router = useRouter();
  const [titre, setTitre] = useState(brouillon?.title ?? "");
  const [sousTitre, setSousTitre] = useState(brouillon?.subtitle ?? "");
  const [corps, setCorps] = useState(brouillon?.source_text ?? "");
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState<"brouillon" | "publication" | null>(null);

  async function enregistrer(status: "draft" | "published") {
    setErreur(null);
    if (!titre.trim() || !corps.trim()) {
      setErreur("Le titre et le contenu sont obligatoires.");
      return;
    }
    setEnCours(status === "published" ? "publication" : "brouillon");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setErreur("Session expirée, reconnectez-vous.");
      setEnCours(null);
      return;
    }

    const champs = {
      title: titre.trim(),
      subtitle: sousTitre.trim() || null,
      source_text: corps,
      body: texteVersHtml(corps),
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    };

    const slug = brouillon?.slug ?? slugify(titre);
    const { error } = brouillon
      ? await supabase.from("articles").update(champs).eq("id", brouillon.id)
      : await supabase.from("articles").insert({ ...champs, author_id: user.id, slug, visibility: "public" });

    setEnCours(null);
    if (error) {
      setErreur(error.code === "23505" ? "Un article avec ce titre existe déjà." : error.message);
      return;
    }
    router.push(status === "published" ? `/articles/${slug}` : "/drafts");
  }

  return (
    <>
      <header className={styles.top}>
        <div className={styles.topIn}>
          <Link href="/" className={styles.marque}>Kogia</Link>
          <span className={styles.mode}>Écrire</span>
        </div>
      </header>

      <main className={styles.main}>
        <input
          className={styles.champTitre}
          placeholder="Titre de l'article"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          maxLength={200}
        />
        <input
          className={styles.champSousTitre}
          placeholder="Sous-titre (une phrase, optionnel)"
          value={sousTitre}
          onChange={(e) => setSousTitre(e.target.value)}
          maxLength={280}
        />
        <textarea
          className={styles.champCorps}
          placeholder={"Écrivez ici. Ligne vide = nouveau paragraphe.\n## Titre de section\n**gras**, *italique*, [lien](https://...)"}
          value={corps}
          onChange={(e) => setCorps(e.target.value)}
          rows={20}
        />

        {erreur && <p className={styles.erreur}>{erreur}</p>}

        <div className={styles.actions}>
          <button
            type="button"
            className="bouton ligne"
            onClick={() => enregistrer("draft")}
            disabled={enCours !== null}
          >
            {enCours === "brouillon" ? "Enregistrement…" : "Enregistrer le brouillon"}
          </button>
          <button
            type="button"
            className="bouton accent"
            onClick={() => enregistrer("published")}
            disabled={enCours !== null}
          >
            {enCours === "publication" ? "Publication…" : "Publier"}
          </button>
        </div>
      </main>
    </>
  );
}
