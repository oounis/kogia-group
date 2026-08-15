import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = { title: "Votre fil", robots: { index: false } };

export default async function FeedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/feed");

  return (
    <PlaceholderPage
      titre="Votre fil personnalisé"
      description="Basé sur les sujets et les auteurs que vous suivez — arrive une fois qu'il y a assez de contenu réel pour le personnaliser."
    />
  );
}
