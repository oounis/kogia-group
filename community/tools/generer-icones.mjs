#!/usr/bin/env node
// Génère src/components/icons/chemins.ts depuis la SEULE source d'icônes
// partagées de Kogia : ../visual-assets/icons/svg (60 icônes, grille 24,
// trait 1.75). Avant le 2026-08-21 ce registre était tiré d'un ancien
// système concurrent (46 icônes, archivé) ; il ne doit plus jamais être
// maintenu à la main.
//
//   node tools/generer-icones.mjs          → réécrit chemins.ts
//   node tools/generer-icones.mjs --check  → échoue si chemins.ts est périmé
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ici = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(ici, "../../visual-assets/icons/svg");
const CIBLE = resolve(ici, "../src/components/icons/chemins.ts");

const fichiers = (await readdir(SOURCE)).filter((f) => f.endsWith(".svg")).sort();
const entrees = [];
for (const f of fichiers) {
  const nom = f.replace(/^kg-/, "").replace(/\.svg$/, "");
  const svg = await readFile(resolve(SOURCE, f), "utf8");
  // On ne garde que le CONTENU du <svg> : Icone.tsx pose lui-même viewBox,
  // taille, rôle et aria. Le <title> de la source sert à la galerie, pas ici
  // (l'accessibilité est portée par la prop `libelle`).
  const interieur = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<title[^>]*>[\s\S]*?<\/title>/g, "")
    // La seconde teinte suit la variable du composant, avec repli currentColor.
    .replace(/var\(--kg-icon-accent[^)]*\)/g, "var(--icone-accent, currentColor)")
    .replace(/\s+/g, " ")
    .trim();
  if (!/stroke="currentColor"|fill="currentColor"|var\(--icone-accent/.test(interieur)) {
    throw new Error(`${f} : aucune couleur héritée (currentColor) — l'icône ne suivrait pas le texte`);
  }
  if (/#[0-9a-fA-F]{3,8}\b/.test(interieur)) {
    throw new Error(`${f} : couleur codée en dur — interdit pour une icône fonctionnelle`);
  }
  entrees.push([nom, interieur]);
}

const sortie = `/* GÉNÉRÉ par tools/generer-icones.mjs depuis ../visual-assets/icons/svg
   (la seule source d'icônes partagées Kogia). NE PAS MODIFIER À LA MAIN :
   corriger le SVG source puis relancer le script. ${entrees.length} icônes. */

export const CHEMINS_ICONES = {
${entrees.map(([n, c]) => `  "${n}": ${JSON.stringify(c)},`).join("\n")}
} as const;

export type NomIcone = keyof typeof CHEMINS_ICONES;
export const NOMS_ICONES = Object.keys(CHEMINS_ICONES) as NomIcone[];
`;

if (process.argv.includes("--check")) {
  const actuel = await readFile(CIBLE, "utf8").catch(() => "");
  if (actuel !== sortie) {
    console.error("chemins.ts est périmé : lancez  node tools/generer-icones.mjs");
    process.exit(1);
  }
  console.log(`chemins.ts à jour (${entrees.length} icônes)`);
} else {
  await writeFile(CIBLE, sortie);
  console.log(`chemins.ts régénéré : ${entrees.length} icônes depuis visual-assets/icons/svg`);
}
