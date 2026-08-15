"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./OnboardingFlow.module.css";

const SUJETS = [
  "Technologie", "Intelligence artificielle", "Entrepreneuriat", "Idées de projet",
  "Opportunités d'affaires", "Design", "Éducation", "Durabilité", "Communauté", "Créativité",
];

const HANDLE_RESERVES = ["admin", "support", "kogia", "moderator", "api", "root", "help", "kogiagroup"];

export default function OnboardingFlow({ userId, returnTo }: { userId: string; returnTo: string }) {
  const [etape, setEtape] = useState(1);
  const [handle, setHandle] = useState("");
  const [nom, setNom] = useState("");
  const [sujets, setSujets] = useState<string[]>([]);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  const supabase = createClient();

  function handleValide(v: string) {
    return /^[a-z0-9_]{3,30}$/.test(v) && !HANDLE_RESERVES.includes(v);
  }

  async function validerIdentite(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    if (!handleValide(handle)) {
      setErreur("3 à 30 caractères : minuscules, chiffres, tiret bas uniquement. Ce nom est réservé si le message persiste.");
      return;
    }
    setEnCours(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: userId, handle, display_name: nom || handle }, { onConflict: "id" });
    setEnCours(false);
    if (error?.code === "23505") setErreur("Ce nom est déjà pris. Essayez-en un autre.");
    else if (error) setErreur("Une erreur est survenue. Réessayez.");
    else setEtape(2);
  }

  function basculerSujet(s: string) {
    setSujets((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  async function terminer() {
    setEnCours(true);
    await supabase.from("profiles").update({ onboarding_completed_at: new Date().toISOString() }).eq("id", userId);
    setEnCours(false);
    window.location.href = returnTo;
  }

  return (
    <main className={styles.page}>
      <div className={styles.carte}>
        {etape === 1 && (
          <form onSubmit={validerIdentite} className={styles.form}>
            <h1>Créez votre identité Kogia</h1>
            <p className={styles.aide}>Votre nom apparaîtra sur votre profil public.</p>
            <label htmlFor="handle">Nom d&apos;utilisateur</label>
            <div className={styles.champHandle}>
              <span>@</span>
              <input
                id="handle" required value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase())}
                placeholder="votre_nom"
              />
            </div>
            <label htmlFor="nom">Nom affiché</label>
            <input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Comment on vous appelle" />
            {erreur && <p role="alert" className={styles.erreur}>{erreur}</p>}
            <button type="submit" className="bouton accent" disabled={enCours}>
              {enCours ? "Vérification…" : "Continuer"}
            </button>
          </form>
        )}

        {etape === 2 && (
          <div className={styles.form}>
            <h1>Ce qui vous intéresse</h1>
            <p className={styles.aide}>Choisissez au moins trois sujets — ça aide à préparer votre premier fil.</p>
            <div className={styles.sujets}>
              {SUJETS.map((s) => (
                <button
                  key={s} type="button"
                  className={`${styles.sujet} ${sujets.includes(s) ? styles.sujetActif : ""}`}
                  onClick={() => basculerSujet(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="button" className="bouton accent" disabled={sujets.length < 3}
              onClick={() => setEtape(3)}
            >
              Continuer ({sujets.length}/3)
            </button>
          </div>
        )}

        {etape === 3 && (
          <div className={styles.form}>
            <h1>Prêt à commencer</h1>
            <p className={styles.aide}>Bienvenue sur Kogia, @{handle}.</p>
            <button type="button" className="bouton accent" onClick={terminer} disabled={enCours}>
              {enCours ? "Un instant…" : "Découvrir Kogia"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
