"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./AuthForm.module.css";

/**
 * Le composant d'authentification réel, partagé entre /join et /login, la
 * différence entre les deux pages est la présentation et l'intention, pas
 * deux systèmes d'authentification séparés (voir docs/ARCHITECTURE.md).
 *
 * Deux méthodes seulement pour la V1 : Google OAuth, et un code à 6
 * chiffres envoyé par e-mail (OTP), pas de mot de passe à gérer.
 *
 * Le bouton Google ne s'affiche que si le fournisseur est réellement activé
 * côté Supabase (NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true). Vérifié le
 * 2026-08-17 : il ne l'est pas encore, et afficher un bouton qui échoue au
 * clic est pire que ne pas l'afficher. Une fois Google configuré dans le
 * tableau de bord Supabase, poser la variable sur Render suffit.
 */
const GOOGLE_ACTIF = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";

export default function AuthForm({
  intention,
  returnTo = "/",
  creerCompte = true,
}: {
  intention: string;
  returnTo?: string;
  /**
   * `true` sur /join, `false` sur /login. Les deux pages appelaient le même
   * `signInWithOtp` avec ses réglages par défaut, donc « Se connecter » avec
   * une adresse inconnue CRÉAIT un compte au lieu de dire qu'il n'y en a pas.
   */
  creerCompte?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [etape, setEtape] = useState<"e-mail" | "code" | "envoi">("e-mail");
  const [code, setCode] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  const supabase = createClient();
  const safeReturn = returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";

  async function continuerAvecGoogle() {
    setErreur(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(safeReturn)}`,
      },
    });
    if (error) setErreur("La connexion Google a échoué. Réessayez dans un instant.");
  }

  async function envoyerCode(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setChargement(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: creerCompte },
    });
    setChargement(false);
    if (!error) {
      setEtape("code");
      return;
    }
    // Sur /login, `shouldCreateUser: false` fait répondre Supabase par
    // `otp_disabled` quand l'adresse n'a pas de compte. On le dit, et on
    // propose la sortie utile, plutôt que de laisser attendre un code qui
    // n'arrivera jamais. Ce choix révèle l'existence d'un compte : c'est
    // celui retenu dans docs/STATUS.md, parce qu'une page de connexion qui
    // crée des comptes en silence était le défaut le plus coûteux.
    const inconnu = error.code === "otp_disabled"
      || /signups? not allowed/i.test(error.message);
    if (inconnu && !creerCompte) setErreur("Aucun compte Kogia sur cette adresse. Créez-en un juste en dessous.");
    else setErreur("Impossible d'envoyer le code pour le moment. Réessayez.");
  }

  async function verifierCode(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setChargement(true);
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    if (error) {
      setChargement(false);
      setErreur("Ce code n'est pas valide ou a expiré. Demandez-en un nouveau.");
      return;
    }
    // Même règle que le rappel Google (src/app/auth/callback/route.ts) : sans
    // ce contrôle, un compte tout neuf arrivé par code e-mail atterrissait
    // sur l'accueil sans pseudo ni profil, et l'onboarding ne se déclenchait
    // plus jamais. Seul le chemin OAuth le vérifiait.
    const { data: { user } } = await supabase.auth.getUser();
    let destination = safeReturn;
    if (user) {
      const { data: profil } = await supabase
        .from("profiles")
        .select("onboarding_completed_at")
        .eq("id", user.id)
        .maybeSingle();
      if (!profil?.onboarding_completed_at) {
        destination = `/onboarding?returnTo=${encodeURIComponent(safeReturn)}`;
      }
    }
    setChargement(false);
    // Rechargement complet volontaire, pas `router.push` : la session vient
    // d'être posée en cookie côté navigateur, et seules une nouvelle requête
    // document la fait voir aux composants serveur (/onboarding vérifie
    // `getUser()` et renverrait sur /login sinon). Même choix que le rappel
    // OAuth, qui redirige côté serveur.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = destination;
  }

  return (
    <div className={styles.carte}>
      {/* Vraie <h1> et non un <p> : /join et /login ne rendaient AUCUN titre
          de niveau 1 (vérifié le 2026-08-18). Un lecteur d'écran arrivait sur
          une page sans titre, et la structure du document était invalide.
          L'apparence ne change pas, seule la sémantique est corrigée. */}
      <h1 className={styles.intention}>{intention}</h1>

      {GOOGLE_ACTIF && (
        <>
          <button type="button" className={`bouton ligne ${styles.pleinLargeur}`} onClick={continuerAvecGoogle}>
            Continuer avec Google
          </button>
          <div className={styles.separateur}><span>ou</span></div>
        </>
      )}

      {etape === "e-mail" && (
        <form onSubmit={envoyerCode} className={styles.form}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email" type="email" required autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
          />
          <button type="submit" className="bouton accent" disabled={chargement}>
            {chargement ? "Envoi…" : "Continuer avec e-mail"}
          </button>
        </form>
      )}

      {etape === "code" && (
        <form onSubmit={verifierCode} className={styles.form}>
          <label htmlFor="code">Code reçu par e-mail</label>
          {/* La LONGUEUR du code est un réglage du projet Supabase, pas une
              constante de l'interface. Ce champ imposait `maxLength={6}` et
              `pattern="[0-9]{6}"` alors que le projet émet des codes de 8
              chiffres (mesuré le 2026-08-26, trois tirages) : le navigateur
              tronquait chaque code réel à six caractères et la connexion par
              e-mail échouait systématiquement. On accepte donc l'intervalle
              que GoTrue permet (6 à 10) plutôt qu'un chiffre en dur, et le
              gabarit ne suggère plus une longueur. */}
          <input
            id="code" inputMode="numeric" pattern="[0-9]{6,10}"
            minLength={6} maxLength={10} required
            autoComplete="one-time-code"
            value={code} onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
            autoFocus
          />
          <button type="submit" className="bouton accent" disabled={chargement}>
            {chargement ? "Vérification…" : "Confirmer"}
          </button>
          <button type="button" className={styles.lienDiscret} onClick={() => setEtape("e-mail")}>
            Changer d&apos;adresse
          </button>
        </form>
      )}

      {erreur && <p role="alert" className={styles.erreur}>{erreur}</p>}

      <p className={styles.mentions}>
        En continuant, vous acceptez les <a href="/terms">Conditions</a> et la{" "}
        <a href="/privacy">Politique de confidentialité</a>.
      </p>
    </div>
  );
}
