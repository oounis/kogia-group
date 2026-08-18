/** L'origine publique du site. Sert à rendre absolues les URL destinées aux
 *  robots sociaux et aux liens canoniques, qui n'acceptent pas de chemin
 *  relatif. NEXT_PUBLIC_SITE_URL est posée sur Render ; la valeur de repli
 *  est le domaine réel, jamais localhost — c'est précisément ce défaut qui
 *  a fait publier `http://localhost:10000/...` dans les balises Open Graph
 *  en production. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kogiagroup.com"
).replace(/\/$/, "");

/** Temps de lecture calculé depuis le contenu réel, pas codé en dur.
 *  L'accueil affichait « 14 min » pendant que l'article en faisait ~16 à
 *  220 mots/minute. */
export function dureeDeLecture(html: string, motsParMinute = 220): number {
  const texte = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const mots = texte ? texte.split(" ").length : 0;
  return Math.max(1, Math.round(mots / motsParMinute));
}
