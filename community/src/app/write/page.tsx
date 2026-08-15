import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = { title: "Écrire", robots: { index: false } };

export default async function WritePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/write");

  return (
    <PlaceholderPage
      titre="L'éditeur arrive"
      description="La rédaction d'articles (titre, contenu, sujets, publication) arrive avec la table articles branchée à un vrai projet Supabase. Voir docs/STATUS.md."
    />
  );
}
