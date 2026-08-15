import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = { title: "Brouillons", robots: { index: false } };

export default async function DraftsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/drafts");

  return (
    <PlaceholderPage
      titre="Vos brouillons"
      description="La liste de vos articles non publiés arrive avec l'éditeur. Voir docs/STATUS.md."
    />
  );
}
