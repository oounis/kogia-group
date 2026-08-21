#!/usr/bin/env node
// Génère visual-assets-v2/manifest.json : le manifeste de revue V2.
// Il ne touche jamais visual-assets/manifests/assets.json : V2 est une couche
// candidate, pas une production. La référence V1 sert seulement à comparer.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const v1 = resolve(root, "../visual-assets");

const palettes = JSON.parse(await readFile(resolve(v1, "tokens/product-colors.json"), "utf8"));

const AVATARS = {
  salim: "Testeur d'écho sceptique ; sérieux, la preuve d'abord.",
  jojo: "Farceur du nuage d'idées ; devient drôle et inventif sous pression.",
  zeno: "Chasseur de prototypes étranges ; curieux des idées que les autres écartent.",
  amin: "Sage des eaux profondes ; écoute avant de parler.",
  nour: "Écouteuse de rêves ; entend les motifs dans le bruit.",
  rami: "Cuisinier d'idées ; transforme le concept brut en plan concret.",
  malik: "Capitaine de surface ; ramène les découvertes finies vers les gens.",
  tala: "Scientifique de l'écho ; cartographie les opportunités invisibles.",
};

const REACTIONS = {
  agree: "D'accord", celebrate: "Célébrer", concern: "Inquiétude", disagree: "Pas d'accord",
  "evidence-check": "Vérification des preuves", inspired: "Inspiré", laugh: "Rire",
  "offer-help": "Proposer de l'aide", question: "Question", surprised: "Surpris",
  thanks: "Merci", thoughtful: "Pensif",
};

const WORLD = {
  "community-shoal": "Petite communauté de confiance ; banc soudé.",
  "data-shrimp": "Donnée brute, minuscule mais nourrissante.",
  "depth-coffee": "Pause en profondeur ; conversation lente.",
  "echo-compass": "Orientation par écholocation ; trouver sans voir.",
  "hidden-opportunity": "Opportunité cachée sous la surface.",
  "idea-cloud": "Nuage d'idées sous pression créative.",
  "knowledge-pearl": "Savoir condensé, patiemment formé.",
  "project-plankton": "Projet naissant ; abondant, fragile.",
  "prototype-bubble": "Prototype ; léger, remonte vite, peut éclater.",
  "solution-coral": "Solution qui se construit par couches et dure.",
  "surface-beacon": "Balise de surface ; la découverte rendue visible.",
  "technology-meal": "Technologie consommée comme ressource, pas comme trophée.",
};

const ICONS = {
  "civic-action": "Action civique", "deep-dive": "Plongée profonde", echolocation: "Écholocation",
  "hidden-opportunity": "Opportunité cachée", "idea-cloud": "Nuage d'idées", launch: "Lancement",
  loading: "Chargement", partnership: "Partenariat", pearl: "Perle", platform: "Plateforme",
  revenue: "Revenu", service: "Service", solution: "Solution", surface: "Surface", topic: "Sujet",
};

const LOADERS = {
  "echo-ring": "Recherche en ligne, synchronisation, écoute ou scan.",
  "pearl-orbit": "Opération indéterminée compacte, dans un bouton.",
  "idea-pulse": "Messages, agents, génération ou réflexion.",
  "surface-progress": "Tâche longue qui progresse vers l'achèvement.",
};

const BOARDS = {
  "avatars-v2": "Huit personnalités candidates affinées, planche 4×2.",
  "reactions-v2": "Douze réactions universelles redessinées pour 32 px.",
  "world-elements-v2": "Douze objets et motifs réutilisables.",
  "story-scenes-v2": "Six scènes narratives sans mots pour articles et communauté.",
};

// Les six avatars approuvés restent la référence : V2 se juge à côté d'eux.
const APPROVED_V1_AVATARS = ["kogi", "nara", "rasm", "mira", "bunyan", "sada"];

const listing = async (folder, extension) =>
  (await readdir(resolve(root, folder))).filter((name) => name.endsWith(extension)).sort();

const expect = (found, dictionary, label) => {
  const names = found.map((file) => file.replace(/\.(png|svg)$/, ""));
  const missing = Object.keys(dictionary).filter((name) => !names.includes(name));
  const extra = names.filter((name) => !(name in dictionary));
  if (missing.length || extra.length) {
    throw new Error(`${label} : manquants=[${missing}] inattendus=[${extra}]`);
  }
  return names;
};

const rasters = async (folder, family, dictionary, label) => {
  const names = expect(await listing(folder, ".png"), dictionary, label);
  return names.map((name) => ({
    name, family, meaning: dictionary[name], path: `${folder}/${name}.png`,
    format: "png", width: 512, height: 512, alpha: true, status: "candidate",
  }));
};

// La vague 2 de ces huit noms est déjà en production (commit 7fc17c4) : chaque
// candidat V2 a donc un prédécesseur réel, pas seulement les six approuvés.
const shipped = new Set(await listing("../visual-assets/avatars/png", ".png"));
const avatars = (await rasters("avatars/png", "avatar", AVATARS, "avatars")).map((asset) => ({
  ...asset, checkAt: 40,
  ...(shipped.has(`${asset.name}.png`) ? { v1: `../visual-assets/avatars/png/${asset.name}.png` } : {}),
}));

const reactions = (await rasters("reactions/png", "reaction", REACTIONS, "réactions")).map((asset) => ({
  ...asset, checkAt: 32, v1: `../visual-assets/reactions/png/${asset.name}.png`,
}));

const worldElements = (await rasters("world-elements/png", "world-element", WORLD, "éléments du monde")).map((asset) => ({
  ...asset, sizes: [128, 64, 40],
}));

const icons = expect(await listing("icons/svg", ".svg"), ICONS, "icônes").map((name) => ({
  name, meaning: ICONS[name], path: `icons/svg/${name}.svg`, format: "svg",
  color: "currentColor", accent: "--kg-icon-accent", checkAt: 20, status: "candidate",
  v1: `../visual-assets/icons/svg/kg-${name}.svg`,
}));

const loaders = expect(await listing("loaders/svg", ".svg"), LOADERS, "loaders").map((name) => ({
  name, usage: LOADERS[name], path: `loaders/svg/${name}.svg`, format: "animated-svg",
  reducedMotion: true, status: "candidate",
}));

const boards = expect(await listing("direction-boards", ".png"), BOARDS, "planches").map((name) => ({
  name, caption: BOARDS[name], path: `direction-boards/${name}.png`, format: "png", status: "candidate",
}));

const manifest = {
  system: "Kogia visual assets — revue V2",
  version: "2026.08.21",
  status: "candidate",
  boundary: "Couche de revue. Ne remplace ni visual-assets/, ni brand/, ni le manifeste de production.",
  author: "Codex (art) · Claude (intégration) · Othman (approbation)",
  products: palettes.products,
  baseline: {
    approvedAvatars: APPROVED_V1_AVATARS.map((name) => ({
      name, path: `../visual-assets/avatars/png/${name}.png`, status: "approved",
    })),
  },
  avatars, reactions, worldElements, icons, loaders, directionBoards: boards,
};
manifest.total = avatars.length + reactions.length + worldElements.length
  + icons.length + loaders.length + boards.length;

await writeFile(resolve(root, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Manifeste V2 écrit : ${manifest.total} actifs candidats `
  + `(${avatars.length} avatars, ${reactions.length} réactions, ${worldElements.length} objets, `
  + `${icons.length} icônes, ${loaders.length} loaders, ${boards.length} planches).`);
