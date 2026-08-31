import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = { title: "Notifications · Paramètres", robots: { index: false } };

export default async function SettingsNotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/settings/notifications");

  return (
    <PlaceholderPage
      titre="Préférences de notification"
      description="Quels événements vous notifient et par quel canal, arrive avec la table notifications branchée. Voir docs/STATUS.md."
    />
  );
}
