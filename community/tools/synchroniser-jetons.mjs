#!/usr/bin/env node
// Copie GÉNÉRÉE des jetons Kogia Harmony dans l'app : Turbopack refuse un
// `@import` qui sort de community/, et l'on refuse de maintenir deux fichiers
// à la main. La source est ../brand/tokens/kogia.css, la seule ; ce script
// la recopie avec un en-tête, et `--check` échoue en CI si la copie dérive.
//
//   node tools/synchroniser-jetons.mjs          → réécrit src/app/jetons-harmony.css
//   node tools/synchroniser-jetons.mjs --check  → échoue si la copie est périmée
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ici = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(ici, "../../brand/tokens/kogia.css");
const CIBLE = resolve(ici, "../src/app/jetons-harmony.css");

const source = await readFile(SOURCE, "utf8");
const sortie = `/* GÉNÉRÉ par tools/synchroniser-jetons.mjs depuis ../../brand/tokens/kogia.css
   (la seule source des jetons Kogia Harmony). NE PAS MODIFIER ICI : corriger
   brand/tokens/kogia.css puis relancer le script. */
${source}`;

if (process.argv.includes("--check")) {
  const actuel = await readFile(CIBLE, "utf8").catch(() => "");
  if (actuel !== sortie) {
    console.error("jetons-harmony.css est périmé : lancez  node tools/synchroniser-jetons.mjs");
    process.exit(1);
  }
  console.log("jetons-harmony.css à jour");
} else {
  await writeFile(CIBLE, sortie);
  console.log("jetons-harmony.css synchronisé depuis brand/tokens/kogia.css");
}
