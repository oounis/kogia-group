import DOMPurify from "isomorphic-dompurify";

/**
 * Assainit le HTML d'un article AVANT de le rendre.
 *
 * Pourquoi c'est nécessaire même après la migration 0004 : celle-ci empêche
 * un membre de publier, mais le corps d'un article reste du HTML stocké,
 * rendu via dangerouslySetInnerHTML. Une seule couche d'autorisation ne
 * suffit pas, si un compte staff est compromis, ou si un import futur
 * insère du contenu, le rendu doit rester inoffensif. Défense en
 * profondeur, pas redondance inutile.
 *
 * Liste blanche explicite : tout ce qui n'est pas listé disparaît. On
 * n'essaie pas de deviner ce qui est dangereux, on énumère ce qui est
 * autorisé, c'est la seule approche qui résiste aux contournements.
 */
const BALISES_AUTORISEES = [
  "p", "br", "hr",
  "h2", "h3", "h4",
  "strong", "b", "em", "i", "u", "s", "sup", "sub",
  "ul", "ol", "li",
  "blockquote", "q", "cite",
  "a",
  "figure", "figcaption", "img", "picture", "source",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
  "code", "pre",
  "span", "div",
];

const ATTRIBUTS_AUTORISES = [
  "href", "title", "lang", "dir",
  "src", "srcset", "alt", "width", "height", "loading", "type", "media",
  "colspan", "rowspan", "scope",
  "class",
];

export function assainirHtmlArticle(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: BALISES_AUTORISEES,
    ALLOWED_ATTR: ATTRIBUTS_AUTORISES,
    // Seuls des schémas d'URL sûrs : bloque javascript:, data:, vbscript:
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|\/(?!\/)|#)/i,
    // `style` permet des attaques d'habillage (recouvrir la page, faux
    // écran de connexion) sans exécuter de script. Interdit.
    FORBID_ATTR: ["style", "onerror", "onload", "onclick"],
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input", "button"],
    // Empêche un contenu de sortir de son conteneur.
    KEEP_CONTENT: true,
  });
}
