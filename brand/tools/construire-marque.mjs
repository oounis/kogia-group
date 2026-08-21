#!/usr/bin/env node
// LES DÉCLINAISONS DE LA MARQUE — générées, jamais redessinées.
//
// La règle de Kogia Harmony (§4) : UN cachalot, un seul tracé, et seule la
// couleur change. Ce script lit brand/kogia-mark.svg (la source) et produit
// dans brand/marque/ :
//   · mark/   la marque seule, dans la couleur de chaque couloir produit
//             (+ encre, + blanc pour fond sombre) ;
//   · tile/   la tuile d'application (carré arrondi du produit, cachalot blanc) ;
//   · tiers/  la marque « de compte » en trois niveaux — Amateur, Pro, Expert —
//             qui suit le couloir produit par variables CSS (repli : KogiaGroup),
//             plus une version figée par couloir approuvé pour le mobile.
// Le niveau se lit SANS la couleur : un anneau fin, puis un anneau plein et
// douze crans, puis deux anneaux et vingt-quatre crans (règle « jamais la
// couleur seule », Harmony §11).
//
//   node brand/tools/construire-marque.mjs
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ici = dirname(fileURLToPath(import.meta.url));
const BRAND = resolve(ici, "..");
const OUT = resolve(BRAND, "marque");
const source = await readFile(resolve(BRAND, "kogia-mark.svg"), "utf8");
const couleurs = JSON.parse(await readFile(resolve(BRAND, "../visual-assets/tokens/product-colors.json"), "utf8"));

// Les deux tracés de la source, tels quels.
const corps = source.match(/<path fill="currentColor" fill-rule="evenodd" d="([^"]+)"/)[1];
const souffle = source.match(/<path d="([^"]+)" fill="none" stroke="currentColor"/)[1];
const CACHALOT = (fill) =>
  `<path fill="${fill}" fill-rule="evenodd" d="${corps}"/>` +
  `<path d="${souffle}" fill="none" stroke="${fill}" stroke-width="4" stroke-linecap="round" opacity=".85"/>`;

const svg = (viewBox, label, interieur) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${label}">\n${interieur}\n</svg>\n`;

const lanes = Object.entries(couleurs.products).map(([id, p]) => ({
  id, name: p.name, accent: p.accent600, soft: p.surface50 ?? "#F4F7FA",
  statut: couleurs.status.approved.includes(id) ? "approuvé"
    : couleurs.status["existing-product-colors"].includes(id) ? "couleur existante" : "proposé",
}));
const NEUTRES = [{ id: "ink", name: "Encre", accent: "#0E2135", soft: "#F4F7FA", statut: "neutre" },
                 { id: "white", name: "Blanc (fond sombre)", accent: "#FFFFFF", soft: "#0E2135", statut: "neutre" }];

await mkdir(resolve(OUT, "mark"), { recursive: true });
await mkdir(resolve(OUT, "tile"), { recursive: true });
await mkdir(resolve(OUT, "tiers"), { recursive: true });

const manifest = { source: "brand/kogia-mark.svg", rule: "un seul tracé, seule la couleur change (Kogia Harmony §4)", marks: [], tiles: [], tiers: [], tiersParCouloir: [] };

for (const lane of [...lanes, ...NEUTRES]) {
  const f = `mark/kogia-mark-${lane.id}.svg`;
  await writeFile(resolve(OUT, f), svg("0 0 132 96", `Kogia · ${lane.name}`, CACHALOT(lane.accent)));
  manifest.marks.push({ lane: lane.id, name: lane.name, path: `marque/${f}`, color: lane.accent, status: lane.statut });
}
for (const lane of lanes) {
  const f = `tile/kogia-tile-${lane.id}.svg`;
  await writeFile(resolve(OUT, f), svg("0 0 96 96", `Kogia · ${lane.name}`,
    `<rect width="96" height="96" rx="24" fill="${lane.accent}"/>\n<g transform="translate(6,14) scale(.64)">${CACHALOT("#FFFFFF")}</g>`));
  manifest.tiles.push({ lane: lane.id, name: lane.name, path: `marque/${f}`, color: lane.accent, status: lane.statut });
}

// ── Les trois niveaux de compte ─────────────────────────────────────────────
const C = 70, R = 52;
const crans = (n, r1, r2, stroke, largeur) => Array.from({ length: n }, (_, i) => {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2;
  const [x1, y1, x2, y2] = [C + r1 * Math.cos(a), C + r1 * Math.sin(a), C + r2 * Math.cos(a), C + r2 * Math.sin(a)];
  return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${stroke}" stroke-width="${largeur}" stroke-linecap="round"/>`;
}).join("");
const cachalotCentre = (fill) => `<g transform="translate(${(C - 132 * 0.55 / 2).toFixed(2)},${(C - 96 * 0.55 / 2 + 3).toFixed(2)}) scale(.55)">${CACHALOT(fill)}</g>`;

/** p = palette { accent, accent300, soft, ink, white } — valeurs ou var(). */
const TIERS = {
  amateur: (p) => `<circle cx="${C}" cy="${C}" r="${R}" fill="${p.soft}" stroke="${p.accent300}" stroke-width="2"/>${cachalotCentre(p.accent)}`,
  pro: (p) => `<circle cx="${C}" cy="${C}" r="${R}" fill="${p.accent}"/>${crans(12, 58, 63, p.accent, 3)}${cachalotCentre(p.white)}`,
  expert: (p) => `<circle cx="${C}" cy="${C}" r="${R}" fill="${p.ink}"/><circle cx="${C}" cy="${C}" r="57" fill="none" stroke="${p.accent}" stroke-width="2.5"/><circle cx="${C}" cy="${C}" r="66" fill="none" stroke="${p.accent300}" stroke-width="1.5"/>${crans(24, 59.5, 64, p.accent, 2)}${cachalotCentre(p.white)}`,
};
const NOMS = { amateur: "Amateur", pro: "Pro", expert: "Expert" };
const LECTURE = { amateur: "un anneau fin", pro: "un anneau plein et douze crans", expert: "deux anneaux et vingt-quatre crans sur l'abysse" };

// Version qui SUIT le couloir produit (variables du paquet visual-assets).
const VAR = { accent: "var(--kg-accent-600,#2547E8)", accent300: "var(--kg-accent-300,#93B4FD)", soft: "var(--kg-accent-50,#EFF4FF)", ink: "#0E2135", white: "#FFFFFF" };
for (const [id, dessin] of Object.entries(TIERS)) {
  const f = `tiers/kogia-tier-${id}.svg`;
  await writeFile(resolve(OUT, f), svg("0 0 140 140", `Kogia · compte ${NOMS[id]}`, dessin(VAR)));
  manifest.tiers.push({ tier: id, name: NOMS[id], reading: LECTURE[id], path: `marque/${f}`, followsLane: true });
}
// Versions figées par couloir approuvé ou existant (mobile, e-mail, export).
const fige = lanes.filter((l) => l.statut !== "proposé");
const eclaircir = (hex) => { const n = parseInt(hex.slice(1), 16); const m = (c) => Math.round(c + (255 - c) * 0.55); return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => m(c).toString(16).padStart(2, "0")).join("")}`; };
for (const lane of fige) {
  await mkdir(resolve(OUT, "tiers", lane.id), { recursive: true });
  const p = { accent: lane.accent, accent300: eclaircir(lane.accent), soft: lane.soft, ink: "#0E2135", white: "#FFFFFF" };
  for (const [id, dessin] of Object.entries(TIERS)) {
    const f = `tiers/${lane.id}/kogia-tier-${id}.svg`;
    await writeFile(resolve(OUT, f), svg("0 0 140 140", `Kogia ${lane.name} · compte ${NOMS[id]}`, dessin(p)));
    manifest.tiersParCouloir.push({ lane: lane.id, tier: id, path: `marque/${f}` });
  }
}

// ── Les états de chargement, tirés de la marque ─────────────────────────────
// Le cachalot ne bouge pas d'un point de tracé ; c'est ce qui l'entoure qui
// vit : le souffle, l'écho, le sillage, l'eau. Six sens, un par usage. Chaque
// loader suit le couloir produit (variables CSS, repli KogiaGroup) et
// s'immobilise sous `prefers-reduced-motion` en gardant un état lisible.
await mkdir(resolve(OUT, "loaders"), { recursive: true });
const A = "var(--kg-accent-600,#2547E8)", A3 = "var(--kg-accent-300,#93B4FD)", A5 = "var(--kg-accent-50,#EFF4FF)";
const corpsSeul = (fill) => `<path fill="${fill}" fill-rule="evenodd" d="${corps}"/>`;
const souffleSeul = (stroke, extra = "") => `<path d="${souffle}" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round" ${extra}/>`;
const W = (inner) => `<g transform="translate(${(C - 132 * 0.5 / 2).toFixed(2)},${(C - 96 * 0.5 / 2 + 4).toFixed(2)}) scale(.5)">${inner}</g>`;
const loaderSvg = (id, label, css, body) => svg("0 0 140 140", label,
  `<style>${css}@media (prefers-reduced-motion: reduce){.${id} *,.${id}{animation:none!important}}</style>\n<g class="${id}">${body}</g>`);

const LOADERS = {
  souffle: { name: "Souffle", usage: "une requête courte : la page respire",
    css: `.souffle .jet{stroke-dasharray:14;stroke-dashoffset:14;animation:souffle 1.4s var(--kg-ease,cubic-bezier(.2,.8,.2,1)) infinite}@keyframes souffle{0%{stroke-dashoffset:14;opacity:0}35%{stroke-dashoffset:0;opacity:.85}75%{opacity:.85}100%{stroke-dashoffset:-14;opacity:0}}`,
    body: () => W(corpsSeul(A) + souffleSeul(A, 'class="jet"')) },
  echo: { name: "Écho", usage: "recherche, synchronisation : on sonde",
    css: `.echo .onde{transform-origin:70px 70px;animation:echo 2.2s ease-out infinite}.echo .o2{animation-delay:.7s}.echo .o3{animation-delay:1.4s}@keyframes echo{0%{transform:scale(.55);opacity:.8}100%{transform:scale(1.25);opacity:0}}`,
    body: () => `<circle class="onde o1" cx="70" cy="70" r="52" fill="none" stroke="${A3}" stroke-width="2"/><circle class="onde o2" cx="70" cy="70" r="52" fill="none" stroke="${A3}" stroke-width="2"/><circle class="onde o3" cx="70" cy="70" r="52" fill="none" stroke="${A3}" stroke-width="2"/>` + W(CACHALOT(A)) },
  sillage: { name: "Sillage", usage: "chargement indéterminé classique, le cachalot au centre",
    css: `.sillage .anneau{transform-origin:70px 70px;stroke-dasharray:200 140;animation:sillage 1.6s linear infinite}@keyframes sillage{to{transform:rotate(360deg)}}`,
    body: () => `<circle cx="70" cy="70" r="56" fill="none" stroke="${A5}" stroke-width="5"/><circle class="anneau" cx="70" cy="70" r="56" fill="none" stroke="${A}" stroke-width="5" stroke-linecap="round"/>` + W(CACHALOT(A)) },
  plongee: { name: "Plongée", usage: "un calcul long : le cachalot plonge et remonte",
    css: `.plongee .baleine{animation:plongee 2.4s var(--kg-ease,cubic-bezier(.2,.8,.2,1)) infinite}.plongee .eau{animation:eau 2.4s ease-in-out infinite}@keyframes plongee{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(9px) rotate(5deg)}}@keyframes eau{0%,100%{transform:translateX(0)}50%{transform:translateX(-10px)}}`,
    body: () => `<g class="baleine" style="transform-origin:70px 70px">${W(CACHALOT(A))}</g><path class="eau" d="M8 96 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="${A3}" stroke-width="3" stroke-linecap="round"/>` },
  surface: { name: "Surface", usage: "contenu qui arrive : l'eau se retire, la marque apparaît",
    css: `.surface .masque rect{animation:surface 2s ease-in-out infinite}@keyframes surface{0%{transform:translateY(0)}60%,100%{transform:translateY(62px)}}`,
    body: () => `<defs><clipPath id="surface-clip"><rect x="0" y="0" width="140" height="140"/></clipPath><mask id="surface-eau" class="masque"><rect x="0" y="0" width="140" height="140" fill="#fff"/><rect x="0" y="40" width="140" height="100" fill="#000"/></mask></defs>` + `<g opacity=".25">${W(CACHALOT(A3))}</g><g mask="url(#surface-eau)">${W(CACHALOT(A))}</g>` },
  nage: { name: "Nage", usage: "envoi en cours : le cachalot avance",
    css: `.nage .baleine{animation:nage 2.6s ease-in-out infinite}@keyframes nage{0%{transform:translateX(-14px)}50%{transform:translateX(14px)}100%{transform:translateX(-14px)}}.nage .bulle{animation:bulle 2.6s ease-out infinite}.nage .b2{animation-delay:.9s}.nage .b3{animation-delay:1.8s}@keyframes bulle{0%{transform:translate(0,0);opacity:0}20%{opacity:.9}100%{transform:translate(-30px,-18px);opacity:0}}`,
    body: () => `<g class="baleine">${W(CACHALOT(A))}</g><circle class="bulle b1" cx="36" cy="62" r="3" fill="${A3}"/><circle class="bulle b2" cx="40" cy="70" r="2.2" fill="${A3}"/><circle class="bulle b3" cx="34" cy="78" r="2.6" fill="${A3}"/>` },
};
manifest.loaders = [];
for (const [id, l] of Object.entries(LOADERS)) {
  const f = `loaders/kogia-loader-${id}.svg`;
  await writeFile(resolve(OUT, f), loaderSvg(id, `Kogia · chargement · ${l.name}`, l.css, l.body()));
  manifest.loaders.push({ id, name: l.name, usage: l.usage, path: `marque/${f}`, followsLane: true, reducedMotion: "immobile, état lisible" });
}

await writeFile(resolve(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`loaders/ : ${manifest.loaders.length} états de chargement tirés de la marque`);
console.log(`marque/ : ${manifest.marks.length} marques, ${manifest.tiles.length} tuiles, ${manifest.tiers.length} niveaux (suivent le couloir) + ${manifest.tiersParCouloir.length} figés`);
