import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = { title: "Compte · Paramètres", robots: { index: false } };

export default async function SettingsAccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/settings/account");

  return (
    <PlaceholderPage
      titre="Paramètres du compte"
      description="Adresse e-mail, méthode de connexion, suppression du compte — arrive avec le reste des paramètres. Voir docs/STATUS.md."
    />
  );
}
