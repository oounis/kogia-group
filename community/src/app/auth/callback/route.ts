import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeReturnTo } from "@/lib/supabase/middleware";

/**
 * Point d'arrivée unique pour Google OAuth (PKCE). L'URL doit être ajoutée
 * en whitelist explicite dans le dashboard Supabase (Authentication -> URL
 * Configuration) — voir docs/STATUS.md.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const dest = safeReturnTo(searchParams.get("returnTo"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Première connexion : direction l'accueil d'identité, pas la page
      // d'origine — on choisit son pseudo avant de continuer.
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarding_completed_at")
          .eq("id", user.id)
          .maybeSingle();
        if (!profile?.onboarding_completed_at) {
          return NextResponse.redirect(`${origin}/onboarding?returnTo=${encodeURIComponent(dest)}`);
        }
      }
      return NextResponse.redirect(`${origin}${dest}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?erreur=auth`);
}
