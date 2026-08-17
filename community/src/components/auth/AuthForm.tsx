"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./AuthForm.module.css";

/**
 * Le composant d'authentification réel, partagé entre /join et /login — la
 * différence entre les deux pages est la présentation et l'intention, pas
 * deux systèmes d'authentification séparés (voir docs/ARCHITECTURE.md).
 *
 * Deux méthodes seulement pour la V1 : Google OAuth, et un code à 6
 * chiffres envoyé par e-mail (OTP) — pas de mot de passe à gérer.
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
}: {
  intention: string;
  returnTo?: string;
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
    const { error } = await supabase.auth.signInWithOtp({ email });
    setChargement(false);
    // Message neutre volontaire : ne révèle jamais si l'adresse a un compte
    // ou non (protection contre l'énumération de comptes).
    if (error) setErreur("Impossible d'envoyer le code pour le moment. Réessayez.");
    else setEtape("code");
  }

  async function verifierCode(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setChargement(true);
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    setChargement(false);
    if (error) setErreur("Ce code n'est pas valide ou a expiré. Demandez-en un nouveau.");
    else window.location.href = safeReturn;
  }

  return (
    <div className={styles.carte}>
      <p className={styles.intention}>{intention}</p>

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
          <input
            id="code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required
            value={code} onChange={(e) => setCode(e.target.value)}
            placeholder="123456" autoFocus
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
