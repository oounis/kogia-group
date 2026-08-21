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

await writeFile(resolve(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`marque/ : ${manifest.marks.length} marques, ${manifest.tiles.length} tuiles, ${manifest.tiers.length} niveaux (suivent le couloir) + ${manifest.tiersParCouloir.length} figés`);
