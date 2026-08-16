import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import WriteForm from "@/components/write/WriteForm";

export const metadata: Metadata = { title: "Écrire", robots: { index: false } };

export default async function WritePage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?returnTo=/write");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, handle, display_name")
    .eq("id", user.id)
    .single();

  if (!profile || (profile.role !== "moderator" && profile.role !== "admin")) {
    notFound();
  }

  const { slug } = await searchParams;
  let brouillon = null;
  if (slug) {
    const { data } = await supabase
      .from("articles")
      .select("id, slug, title, subtitle, source_text")
      .eq("author_id", user.id)
      .eq("slug", slug)
      .single();
    brouillon = data;
  }

  return <WriteForm brouillon={brouillon} />;
}
