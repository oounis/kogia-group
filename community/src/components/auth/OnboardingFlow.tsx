"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { VERSION_DOCUMENTS } from "@/lib/legal";
import styles from "./OnboardingFlow.module.css";

const HANDLE_RESERVES = ["admin", "support", "kogia", "moderator", "api", "root", "help", "kogiagroup"];

/** Combien de sujets on exige. Jamais plus qu'il n'en existe en base : sinon
 *  un catalogue plus petit que trois bloquerait l'écran pour de bon. */
const SOUHAITES = 3;

export type Sujet = { id: string; name: string };

export default function OnboardingFlow({
  userId,
  returnTo,
  sujets,
}: {
  userId: string;
  returnTo: string;
  sujets: Sujet[];
}) {
  const [etape, setEtape] = useState(1);
  const [handle, setHandle] = useState("");
  const [nom, setNom] = useState("");
  const [choisis, setChoisis] = useState<string[]>([]);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  const supabase = createClient();

  const minimum = Math.min(SOUHAITES, sujets.length);

  function handleValide(v: string) {
    return /^[a-z0-9_]{3,30}$/.test(v) && !HANDLE_RESERVES.includes(v);
  }

  /**
   * Enregistre l'acceptation des Conditions et de la Politique de
   * confidentialité. Le formulaire de /join et /login affirme
   * « en continuant, vous acceptez … » : jusqu'ici rien ne l'écrivait, la
   * table `user_consents` avait ses politiques et zéro ligne. Affirmer une
   * acceptation qu'on n'enregistre pas, c'est ne pas pouvoir la prouver.
   *
   * Impossible plus tôt dans le parcours : `user_consents.user_id` référence
   * `profiles(id)`, et la ligne de profil naît ici, à l'étape 1.
   *
   * Les consentements sont un historique, jamais réécrits — d'où la
   * vérification préalable, pour qu'un onboarding rejoué n'empile pas des
   * doublons de la même version.
   */
  async function enregistrerConsentements() {
    const types = ["terms", "privacy"] as const;
    const { data: deja } = await supabase
      .from("user_consents")
      .select("document_type")
      .eq("user_id", userId)
      .eq("document_version", VERSION_DOCUMENTS);
    const connus = new Set((deja ?? []).map((d) => d.document_type));
    const aEcrire = types.filter((t) => !connus.has(t));
    if (!aEcrire.length) return null;
    const { error } = await supabase.from("user_consents").insert(
      aEcrire.map((document_type) => ({
        user_id: userId,
        document_type,
        document_version: VERSION_DOCUMENTS,
        source: "onboarding",
      })));
    return error;
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
    if (error) {
      setEnCours(false);
      if (error.code === "23505") setErreur("Ce nom est déjà pris. Essayez-en un autre.");
      else setErreur("Une erreur est survenue. Réessayez.");
      return;
    }
    const erreurConsentement = await enregistrerConsentements();
    setEnCours(false);
    if (erreurConsentement) {
      setErreur("Votre profil est créé, mais l'enregistrement de votre accord a échoué. Réessayez.");
      return;
    }
    setEtape(2);
  }

  function basculerSujet(id: string) {
    setChoisis((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  /**
   * Écrit les sujets choisis PUIS marque l'onboarding terminé, dans cet
   * ordre. L'inverse laisserait un compte marqué complet avec des centres
   * d'intérêt perdus, ce qui est exactement le défaut corrigé ici : l'écran
   * exigeait trois sujets et n'en enregistrait aucun.
   */
  async function terminer() {
    setErreur(null);
    setEnCours(true);

    if (choisis.length) {
      const { error } = await supabase.from("profile_topics").upsert(
        choisis.map((topic_id) => ({ profile_id: userId, topic_id })),
        { onConflict: "profile_id,topic_id" });
      if (error) {
        setEnCours(false);
        setErreur("Vos sujets n'ont pas pu être enregistrés. Réessayez.");
        return;
      }
    }

    const { error } = await supabase
      .from("profiles")
      .update({ onboarding_completed_at: new Date().toISOString() })
      .eq("id", userId);
    setEnCours(false);
    if (error) {
      setErreur("Impossible de finaliser votre inscription. Réessayez.");
      return;
    }
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
            <p className={styles.aide}>
              {sujets.length
                ? `Choisissez au moins ${minimum} sujet${minimum > 1 ? "s" : ""}, ça aide à préparer votre premier fil.`
                : "Aucun sujet n'est encore disponible, vous pourrez les choisir plus tard."}
            </p>
            <div className={styles.sujets}>
              {sujets.map((s) => (
                <button
                  key={s.id} type="button"
                  aria-pressed={choisis.includes(s.id)}
                  className={`${styles.sujet} ${choisis.includes(s.id) ? styles.sujetActif : ""}`}
                  onClick={() => basculerSujet(s.id)}
                >
                  {s.name}
                </button>
              ))}
            </div>
            {erreur && <p role="alert" className={styles.erreur}>{erreur}</p>}
            <button
              type="button" className="bouton accent" disabled={choisis.length < minimum}
              onClick={() => setEtape(3)}
            >
              {minimum ? `Continuer (${choisis.length}/${minimum})` : "Continuer"}
            </button>
          </div>
        )}

        {etape === 3 && (
          <div className={styles.form}>
            <h1>Prêt à commencer</h1>
            <p className={styles.aide}>Bienvenue sur Kogia, @{handle}.</p>
            {erreur && <p role="alert" className={styles.erreur}>{erreur}</p>}
            <button type="button" className="bouton accent" onClick={terminer} disabled={enCours}>
              {enCours ? "Un instant…" : "Découvrir Kogia"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
