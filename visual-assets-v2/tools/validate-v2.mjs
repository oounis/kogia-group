#!/usr/bin/env node
// Même barre de qualité que visual-assets/tools/validate.mjs, appliquée au
// paquet candidat — plus les règles propres à V2 : le mouvement vit dans le CSS
// de la galerie, et chaque candidat comparé garde son homologue V1 lisible.
import { readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(resolve(root, "manifest.json"), "utf8"));
const failures = [];
const titles = new Set();

const rasters = [...manifest.avatars, ...manifest.reactions, ...manifest.worldElements, ...manifest.directionBoards];
const vectors = [...manifest.icons, ...manifest.loaders];

for (const asset of [...rasters, ...vectors, ...manifest.baseline.approvedAvatars]) {
  try { await stat(resolve(root, asset.path)); } catch { failures.push(`manquant : ${asset.path}`); }
}

// Les homologues V1 doivent exister, sinon la comparaison affiche un trou.
for (const asset of vectors.concat(manifest.reactions).filter((item) => item.v1)) {
  try { await stat(resolve(root, asset.v1)); } catch { failures.push(`homologue V1 manquant : ${asset.v1}`); }
}

for (const asset of vectors) {
  const text = await readFile(resolve(root, asset.path), "utf8");
  if (/<script\b/i.test(text)) failures.push(`script dans le SVG : ${asset.path}`);
  if (/https?:\/\//i.test(text.replaceAll("http://www.w3.org/2000/svg", ""))) failures.push(`URL externe dans le SVG : ${asset.path}`);
  const id = text.match(/<title id="([^"]+)"/)?.[1];
  if (!id) failures.push(`title id absent : ${asset.path}`);
  else if (titles.has(id)) failures.push(`title id dupliqué : ${id}`);
  else titles.add(id);
  if (/logo|whale-mark|wordmark|favicon/.test(asset.path)) failures.push(`actif d'identité hors frontière : ${asset.path}`);
}

// Les rasters candidats : 512×512 RGBA. Les planches de direction sont des
// documents de revue, donc seule leur nature PNG est vérifiée.
for (const asset of rasters) {
  const bytes = await readFile(resolve(root, asset.path));
  if (bytes.toString("ascii", 1, 4) !== "PNG") { failures.push(`pas un PNG : ${asset.path}`); continue; }
  if (asset.format === "png" && asset.width === 512) {
    if (bytes.readUInt32BE(16) !== 512 || bytes.readUInt32BE(20) !== 512) failures.push(`dimensions fausses : ${asset.path}`);
    if (bytes[25] !== 6) failures.push(`pas RGBA : ${asset.path}`);
  }
}

// V2 consolide le mouvement dans la galerie : le repli doit y être, pas dans le SVG.
const css = await readFile(resolve(root, "gallery/review.css"), "utf8");
if (!css.includes("prefers-reduced-motion")) failures.push("repli mouvement réduit absent de gallery/review.css");
for (const loader of manifest.loaders) {
  const text = await readFile(resolve(root, loader.path), "utf8");
  const hooks = [...text.matchAll(/class="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/));
  if (!hooks.length) failures.push(`aucun point d'accroche de classe : ${loader.path}`);
  for (const hook of hooks) {
    if (!css.includes(`.${hook}`)) failures.push(`accroche sans animation dans le CSS : ${hook} (${loader.path})`);
  }
}

// La frontière non négociable : V2 ne s'écrit jamais dans la production.
const production = resolve(root, "../visual-assets/manifests/assets.json");
const productionText = await readFile(production, "utf8");
if (productionText.includes("visual-assets-v2")) failures.push("le manifeste de production référence V2 : frontière franchie");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Revue V2 validée : ${manifest.total} candidats — chemins, sûreté SVG, titres uniques, `
  + "512×512 RGBA, homologues V1, accroches de mouvement, frontière de production.");
