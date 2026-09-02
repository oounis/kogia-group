/** L'origine publique du site. Sert à rendre absolues les URL destinées aux
 *  robots sociaux et aux liens canoniques, qui n'acceptent pas de chemin
 *  relatif. NEXT_PUBLIC_SITE_URL est posée sur Render ; la valeur de repli
 *  est le domaine réel, jamais localhost, c'est précisément ce défaut qui
 *  a fait publier `http://localhost:10000/...` dans les balises Open Graph
 *  en production. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kogiagroup.com"
).replace(/\/$/, "");

/** L'image de partage par défaut, 1200×630.
 *
 *  Elle est déclarée ici et pas seulement dans `layout.tsx` parce que Next
 *  ne fusionne pas `openGraph` : une page qui redéfinit ce bloc pour changer
 *  son titre REMPLACE celui du gabarit, images comprises. Les dix pages de
 *  projet livrées le 2026-09-02 l'ont appris de cette façon, en partant sans
 *  aucun visuel de partage, alors que ce sont précisément les pages qu'on
 *  envoie à un client. Le commentaire du gabarit décrivait déjà la même
 *  panne, survenue à la migration : c'est la deuxième fois.
 *
 *  Donc : toute page qui redéfinit `openGraph` reprend cette constante, sauf
 *  si elle a une meilleure image à proposer. */
export const IMAGE_PARTAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Kogia",
} as const;

/** Temps de lecture calculé depuis le contenu réel, pas codé en dur.
 *  L'accueil affichait « 14 min » pendant que l'article en faisait ~16 à
 *  220 mots/minute. */
export function dureeDeLecture(html: string, motsParMinute = 220): number {
  const texte = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const mots = texte ? texte.split(" ").length : 0;
  return Math.max(1, Math.round(mots / motsParMinute));
}
