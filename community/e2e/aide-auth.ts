/**
 * Outils de test pour le parcours d'inscription.
 *
 * Le parcours n'avait jamais été mené de bout en bout parce qu'il faut lire
 * un code à six chiffres dans une boîte mail. `generateLink` de l'API admin
 * renvoie ce code (`properties.email_otp`) SANS envoyer d'e-mail : le test
 * peut donc taper un vrai code dans la vraie interface.
 *
 * Ces fonctions n'utilisent la clé `service_role` que côté test, jamais dans
 * le code livré au navigateur.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Chemin résolu depuis le dossier de travail, pas depuis `import.meta.url` :
// cette dernière forme fait charger le fichier comme un module ES par
// Playwright alors qu'il est transpilé en CommonJS, et le test ne démarre
// même pas (« exports is not defined in ES module scope »).
const CHEMIN_ENV = resolve(process.cwd(), ".env.local");

export const env = Object.fromEntries(
  readFileSync(CHEMIN_ENV, "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trimStart().startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]));

const URL_BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE = env.SUPABASE_SERVICE_ROLE_KEY;

const enTetesAdmin = {
  apikey: SERVICE,
  Authorization: `Bearer ${SERVICE}`,
  "Content-Type": "application/json",
};

async function admin(chemin: string, init: RequestInit = {}) {
  const r = await fetch(`${URL_BASE}${chemin}`, { ...init, headers: enTetesAdmin });
  const texte = await r.text();
  if (!r.ok) throw new Error(`${init.method ?? "GET"} ${chemin} -> ${r.status} ${texte.slice(0, 300)}`);
  return texte ? JSON.parse(texte) : null;
}

/** Crée un compte confirmé, sans mot de passe et sans envoyer d'e-mail. */
export async function creerCompteTest(email: string): Promise<string> {
  const u = await admin("/auth/v1/admin/users", {
    method: "POST",
    body: JSON.stringify({ email, email_confirm: true }),
  });
  return u.id as string;
}

/** Renvoie un code à six chiffres valide pour cette adresse. */
export async function codeOtp(email: string): Promise<string> {
  const r = await admin("/auth/v1/admin/generate_link", {
    method: "POST",
    body: JSON.stringify({ type: "magiclink", email }),
  });
  const code = r?.email_otp ?? r?.properties?.email_otp;
  if (!code) throw new Error(`aucun email_otp dans la réponse : ${JSON.stringify(r).slice(0, 300)}`);
  return code as string;
}

export async function supprimerCompteTest(id: string) {
  await admin(`/auth/v1/admin/users/${id}`, { method: "DELETE" });
}

/** L'adresse a-t-elle un compte ? Sert à prouver que /login n'en crée pas. */
export async function compteExiste(email: string): Promise<boolean> {
  const r = await admin(`/auth/v1/admin/users?filter=${encodeURIComponent(email)}`);
  return (r?.users ?? []).some((u: { email?: string }) => u.email === email);
}

/** Lecture directe en base avec la clé service_role, pour vérifier les écritures. */
export async function lireTable(table: string, requete: string) {
  return admin(`/rest/v1/${table}?${requete}`);
}

/** Identifiant du compte pour cette adresse, ou null. Sert au nettoyage. */
export async function idDuCompte(email: string): Promise<string | null> {
  const r = await admin(`/auth/v1/admin/users?filter=${encodeURIComponent(email)}`);
  const u = (r?.users ?? []).find((x: { email?: string; id?: string }) => x.email === email);
  return u?.id ?? null;
}
