import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = { title: "Modération", robots: { index: false } };

export default async function AdminModerationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/admin/moderation");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || (profile.role !== "moderator" && profile.role !== "admin")) {
    notFound();
  }

  return (
    <PlaceholderPage
      titre="File de modération"
      description="Signalements en attente, actions de modération, historique, arrive avec les tables reports et moderation_actions branchées. Voir docs/STATUS.md."
    />
  );
}
