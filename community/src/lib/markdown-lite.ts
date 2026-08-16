function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s: string) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
}

/**
 * Convertisseur minimal texte vers HTML pour /write. Pas un éditeur riche :
 * paragraphes séparés par une ligne vide, ## et ### pour les titres,
 * gras/italique/lien en ligne (syntaxe façon Markdown). Suffisant pour un
 * seul auteur approuvé (voir docs/PRODUCT.md).
 */
export function texteVersHtml(source: string): string {
  const blocs = source.trim().split(/\n\s*\n/);
  return blocs
    .map((bloc) => {
      const ligne = bloc.trim();
      if (ligne.startsWith("### ")) return `<h3>${inline(ligne.slice(4))}</h3>`;
      if (ligne.startsWith("## ")) return `<h2>${inline(ligne.slice(3))}</h2>`;
      return `<p>${inline(ligne).replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
}
