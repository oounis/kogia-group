#!/usr/bin/env node
// SEPT PERSONNAGES DE PLUS — en vecteur, depuis UN buste commun.
//
// Les six premiers avatars (Kogi, Nara, Rasm, Mira, Bunyan, Sada) sont des
// illustrations raster générées par IA. Othman en veut d'autres : drôles,
// bizarres, sérieux. Plutôt que de dépendre à nouveau d'un générateur, on
// dessine ici le buste une fois (tête de cachalot, ventre crème à deux
// taches, œil minuscule, contour marin) et chaque personnage n'est qu'une
// palette + un accessoire + une expression. Même famille, source versionnée.
//
//   node visual-assets/tools/build-avatars-svg.mjs     → avatars/svg/kg-avatar-*.svg
//   puis tools/render-avatars.mjs pour les PNG 512×512 attendus par le paquet.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../avatars/svg");
await mkdir(OUT, { recursive: true });

const OUTLINE = "#1F3346", CREME = "#F1E8D2", TACHE = "#D9CDB2", OEIL = "#1F2430";
const SW = 7; // épaisseur du contour, comme les busts raster

/** Le buste commun. `p` = palette { peau, habit, col }, `expr` = "neutre" | "sourire" | "ferme" | "etonne" | "grave". */
function buste(p, expr = "neutre") {
  const contour = `stroke="${OUTLINE}" stroke-width="${SW}" stroke-linejoin="round" stroke-linecap="round"`;
  const corps = `<path d="M96 512 V400 C96 340 160 300 256 300 C352 300 416 340 416 400 V512 Z" fill="${p.habit}" ${contour}/>`;
  const col = `<path d="M186 306 C210 280 302 280 326 306 C300 322 212 322 186 306 Z" fill="${p.col}" ${contour}/>`;
  // La tête : dôme, museau à droite qui se termine en petite nageoire.
  const tete = `<path d="M132 236 C120 150 170 70 256 62 C336 56 386 118 392 176 C404 176 420 186 428 204 C416 214 402 218 390 218 C372 262 318 296 256 302 C196 306 150 288 132 236 Z" fill="${p.peau}" ${contour}/>`;
  // Le ventre crème, en larme, bas gauche du museau.
  const ventre = `<path d="M150 214 C170 196 214 190 246 212 C262 236 254 274 232 292 C198 300 168 286 150 250 Z" fill="${CREME}" stroke="${OUTLINE}" stroke-width="4"/>
    <circle cx="212" cy="244" r="8" fill="${TACHE}"/><circle cx="236" cy="268" r="6" fill="${TACHE}"/>`;
  const yeux = {
    neutre: `<circle cx="300" cy="154" r="9" fill="${OEIL}"/>`,
    sourire: `<path d="M290 154 q10 -10 20 0" fill="none" stroke="${OEIL}" stroke-width="7" stroke-linecap="round"/>`,
    ferme: `<path d="M290 158 q10 8 20 0" fill="none" stroke="${OEIL}" stroke-width="7" stroke-linecap="round"/>`,
    etonne: `<circle cx="300" cy="154" r="13" fill="#FFFFFF" stroke="${OEIL}" stroke-width="5"/><circle cx="302" cy="156" r="5" fill="${OEIL}"/>`,
    grave: `<circle cx="300" cy="156" r="9" fill="${OEIL}"/><path d="M282 136 l36 8" fill="none" stroke="${OUTLINE}" stroke-width="7" stroke-linecap="round"/>`,
  }[expr];
  const bouche = {
    neutre: "", grave: "",
    sourire: `<path d="M318 206 q18 12 36 -4" fill="none" stroke="${OEIL}" stroke-width="5" stroke-linecap="round"/>`,
    ferme: `<path d="M322 208 q14 6 28 0" fill="none" stroke="${OEIL}" stroke-width="5" stroke-linecap="round"/>`,
    etonne: `<ellipse cx="336" cy="208" rx="9" ry="12" fill="${OEIL}"/>`,
  }[expr];
  return { corps, col, tete, ventre, yeux, bouche };
}

const PERSONNAGES = [
  { id: "zayd", nom: "Zayd", trait: "le sceptique", humeur: "sérieux", expr: "grave",
    p: { peau: "#6B7A8C", habit: "#3C4A5C", col: "#55657A" },
    accessoire: (c) => `<g fill="none" stroke="${OUTLINE}" stroke-width="${SW}"><rect x="266" y="132" width="60" height="44" rx="8" fill="#FFFFFF" fill-opacity=".35"/><rect x="334" y="136" width="52" height="40" rx="8" fill="#FFFFFF" fill-opacity=".35"/><path d="M326 152 h8"/></g>` },
  { id: "lulu", nom: "Lulu", trait: "la farceuse", humeur: "drôle", expr: "sourire",
    p: { peau: "#F2A65A", habit: "#E2574C", col: "#F6C86A" },
    accessoire: () => `<g stroke="${OUTLINE}" stroke-width="${SW}" stroke-linejoin="round"><path d="M218 110 L264 28 L310 110 Z" fill="#7C4DFF"/><path d="M236 78 h56" stroke="#FFFFFF" stroke-width="6"/><circle cx="264" cy="28" r="14" fill="#F6C86A"/></g>` },
  { id: "pixel", nom: "Pixel", trait: "le bizarre", humeur: "bizarre", expr: "etonne",
    p: { peau: "#8BD17C", habit: "#2E7D5B", col: "#B6E8A8" },
    accessoire: () => `<g stroke="${OUTLINE}" stroke-width="${SW}" stroke-linecap="round"><path d="M150 120 C150 60 230 50 250 40" fill="none"/><path d="M232 56 q-6 -22 18 -26" fill="none"/><circle cx="256" cy="24" r="16" fill="#FFD23F"/><circle cx="256" cy="24" r="6" fill="#FFFFFF" stroke="none"/></g><g stroke="${OUTLINE}" stroke-width="6"><path d="M110 420 h292 M104 456 h304" stroke="#1F3346" stroke-opacity=".35"/></g>` },
  { id: "hakim", nom: "Hakim", trait: "le sage", humeur: "sérieux", expr: "neutre",
    p: { peau: "#2F4F8A", habit: "#1E2F5C", col: "#EFE4C8" },
    accessoire: () => `<g fill="none" stroke="#C9A24A" stroke-width="6"><circle cx="300" cy="156" r="24"/><circle cx="352" cy="160" r="20"/><path d="M324 158 h8 M276 150 q-22 -8 -40 2"/></g><g stroke="${OUTLINE}" stroke-width="6" stroke-linejoin="round"><path d="M228 318 l28 12 l28 -12 l-8 26 l8 26 l-28 -12 l-28 12 l8 -26 Z" fill="#B83A3A"/></g>` },
  { id: "nour", nom: "Nour", trait: "la rêveuse", humeur: "douce", expr: "ferme",
    p: { peau: "#B49BE8", habit: "#6F5BB5", col: "#E5DCF7" },
    accessoire: () => `<g stroke="${OUTLINE}" stroke-width="${SW}" stroke-linecap="round"><path d="M150 176 C140 90 200 50 262 52 C330 54 382 100 386 170" fill="none"/><rect x="126" y="168" width="40" height="64" rx="16" fill="#F08A8A"/><rect x="372" y="160" width="40" height="64" rx="16" fill="#F08A8A"/></g><g fill="#FFD23F"><path d="M430 80 l6 14 l14 6 l-14 6 l-6 14 l-6 -14 l-14 -6 l14 -6 Z"/><path d="M70 120 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z"/></g>` },
  { id: "boubou", nom: "Boubou", trait: "le cuistot", humeur: "drôle", expr: "sourire",
    p: { peau: "#D96C4C", habit: "#F4F1EA", col: "#C93C37" },
    accessoire: () => `<g stroke="${OUTLINE}" stroke-width="${SW}" stroke-linejoin="round"><path d="M176 110 C150 44 230 10 262 40 C300 8 380 40 352 110 L340 112 L338 150 L190 150 L188 112 Z" fill="#FFFFFF"/><path d="M190 150 h148" fill="none"/></g><g stroke="${OUTLINE}" stroke-width="5"><path d="M292 336 v90" stroke-width="8"/><ellipse cx="292" cy="328" rx="16" ry="22" fill="#C9A24A"/></g>` },
  { id: "samir", nom: "Samir", trait: "le capitaine", humeur: "sérieux", expr: "neutre",
    p: { peau: "#3E6E9A", habit: "#1B2A4A", col: "#F1E8D2" },
    accessoire: () => `<g stroke="${OUTLINE}" stroke-width="${SW}" stroke-linejoin="round"><path d="M160 128 C190 60 330 50 370 124 L372 150 L158 150 Z" fill="#1B2A4A"/><path d="M140 150 h250 l-10 18 h-230 Z" fill="#0F1B33"/><circle cx="266" cy="112" r="16" fill="#C9A24A"/><path d="M266 100 v22 M256 116 q10 10 20 0" fill="none" stroke="#1B2A4A" stroke-width="4"/></g><g fill="#C9A24A" stroke="${OUTLINE}" stroke-width="4"><circle cx="228" cy="380" r="9"/><circle cx="284" cy="380" r="9"/><circle cx="228" cy="430" r="9"/><circle cx="284" cy="430" r="9"/></g>` },
];

for (const perso of PERSONNAGES) {
  const b = buste(perso.p, perso.expr);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-labelledby="kg-avatar-${perso.id}-title">
  <title id="kg-avatar-${perso.id}-title">${perso.nom}, ${perso.trait}</title>
  ${b.corps}
  ${b.col}
  ${b.tete}
  ${b.ventre}
  ${b.yeux}
  ${b.bouche}
  ${perso.accessoire(perso.p)}
</svg>
`;
  await writeFile(resolve(OUT, `kg-avatar-${perso.id}.svg`), svg);
}
await writeFile(resolve(OUT, "personnages.json"), JSON.stringify(PERSONNAGES.map(({ id, nom, trait, humeur }) => ({ id, nom, trait, humeur })), null, 2) + "\n");
console.log(`${PERSONNAGES.length} avatars vectoriels écrits dans avatars/svg/`);
