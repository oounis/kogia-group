import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = { title: "Profil · Paramètres", robots: { index: false } };

export default async function SettingsProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/settings/profile");

  return (
    <PlaceholderPage
      titre="Modifier votre profil"
      description="Photo, nom affiché, identifiant, bio, liens — la vraie édition arrive une fois la table profiles connectée à un projet Supabase actif."
    />
  );
}
