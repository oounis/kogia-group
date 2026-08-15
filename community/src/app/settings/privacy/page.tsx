import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = { title: "Confidentialité · Paramètres", robots: { index: false } };

export default async function SettingsPrivacyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/settings/privacy");

  return (
    <PlaceholderPage
      titre="Confidentialité"
      description="Blocages, mise en sourdine, visibilité du profil, export et suppression des données — arrive avec le reste des paramètres. Voir docs/STATUS.md."
    />
  );
}
