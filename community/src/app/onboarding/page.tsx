import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OnboardingFlow from "@/components/auth/OnboardingFlow";

export const metadata: Metadata = { title: "Créez votre identité", robots: { index: false } };

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Les sujets viennent de la base, plus d'une liste écrite en dur dans le
  // composant. L'ancienne liste proposait dix sujets quand `topics` n'en
  // contenait qu'un : les choix ne pouvaient pas être enregistrés, la clé
  // étrangère de `profile_topics` les aurait tous refusés sauf un.
  const { data: sujets } = await supabase
    .from("topics")
    .select("id, name")
    .order("name");

  const { returnTo } = await searchParams;
  return (
    <OnboardingFlow
      userId={user.id}
      returnTo={returnTo || "/"}
      sujets={sujets ?? []}
    />
  );
}
