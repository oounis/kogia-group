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

  const { returnTo } = await searchParams;
  return <OnboardingFlow userId={user.id} returnTo={returnTo || "/"} />;
}
