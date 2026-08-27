/**
 * Applique la partie données de supabase/migrations/0005_sujets_onboarding.sql.
 *
 * Les migrations de ce dépôt ne sont pas jouées par un outil automatique : le
 * schéma est appliqué à la main dans le tableau de bord Supabase. Ce script
 * existe pour la seule migration qui soit purement des DONNÉES, afin que le
 * peuplement de `topics` soit reproductible et vérifiable plutôt que
 * recopié à la main dans un éditeur SQL.
 *
 *   node tools/semer-sujets.mjs            (liste, ne modifie rien)
 *   node tools/semer-sujets.mjs --appliquer
 *
 * Lit SUPABASE_SERVICE_ROLE_KEY depuis .env.local. La clé ne quitte jamais
 * ce script et n'est jamais affichée.
 */
import { readFileSync } from "node:fs";

const SUJETS = [
  ["technologie", "Technologie"],
  ["intelligence-artificielle", "Intelligence artificielle"],
  ["entrepreneuriat", "Entrepreneuriat"],
  ["idees-de-projet", "Idées de projet"],
  ["opportunites-affaires", "Opportunités d'affaires"],
  ["design", "Design"],
  ["education", "Éducation"],
  ["durabilite", "Durabilité"],
  ["communaute", "Communauté"],
  ["creativite", "Créativité"],
];

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trimStart().startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]));

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const cle = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !cle) throw new Error("NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY absent de .env.local");

const entetes = { apikey: cle, Authorization: `Bearer ${cle}`, "Content-Type": "application/json" };

const avant = await (await fetch(`${url}/rest/v1/topics?select=slug,name&order=slug`, { headers: entetes })).json();
console.log(`avant : ${avant.length} sujet(s) en base`);

if (!process.argv.includes("--appliquer")) {
  const manquants = SUJETS.filter(([s]) => !avant.some((t) => t.slug === s));
  console.log(`${manquants.length} manquant(s) : ${manquants.map(([s]) => s).join(", ") || "aucun"}`);
  console.log("relancer avec --appliquer pour écrire");
  process.exit(0);
}

// `resolution=ignore-duplicates` = ON CONFLICT DO NOTHING : rejouer le script
// ne duplique rien et ne renomme aucun sujet déjà présent.
const rep = await fetch(`${url}/rest/v1/topics`, {
  method: "POST",
  headers: { ...entetes, Prefer: "resolution=ignore-duplicates,return=representation" },
  body: JSON.stringify(SUJETS.map(([slug, name]) => ({ slug, name }))),
});
if (!rep.ok) {
  console.error(`échec HTTP ${rep.status} : ${(await rep.text()).slice(0, 400)}`);
  process.exit(1);
}
const inseres = await rep.json();
const apres = await (await fetch(`${url}/rest/v1/topics?select=slug&order=slug`, { headers: entetes })).json();
console.log(`inséré ${inseres.length}, total ${apres.length} : ${apres.map((t) => t.slug).join(", ")}`);
