import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = { title: "Sécurité · Paramètres", robots: { index: false } };

export default async function SettingsSecurityPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/settings/security");

  return (
    <PlaceholderPage
      titre="Sécurité du compte"
      description="Sessions actives, connexions récentes, révocation d'accès, arrive avec le reste des paramètres. Voir docs/STATUS.md."
    />
  );
}
