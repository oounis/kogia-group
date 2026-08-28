#!/usr/bin/env node
// Ouvre la galerie de production dans un vrai navigateur et exerce la bascule
// Actuel / Revue V2 : comptes, décodage des rasters, verdicts, mouvement
// réduit, fonds. Vérifie aussi que le mode Actuel reste exactement la galerie
// d'origine et que la page autonome V2 rend la même revue.
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const require = createRequire(resolve(root, "community/package.json"));
const { chromium } = require("playwright");
const mime = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://local").pathname);
    const relative = pathname.endsWith("/") ? `${pathname}index.html`.replace(/^\//, "") : pathname.replace(/^\//, "");
    const path = resolve(root, relative);
    if (!path.startsWith(`${root}/`)) throw new Error("chemin invalide");
    const body = await readFile(path);
    response.writeHead(200, { "content-type": mime[extname(path)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404); response.end("not found");
  }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const port = server.address().port;

const ATTENDU_V1 = { avatars: 14, reactions: 12, icons: 60, loaders: 6 };
const ATTENDU_V2 = { levels: 3, marks: 17, markLoaders: 6, approved: 6, avatars: 8, reactions: 12, icons: 15, loaders: 4 };
const SECTIONS = ["Account levels", "The mark, per product", "Loading states, from the mark", "Character avatars", "Custom reactions", "Functional icons", "Loading states"];
const KHARBGA_SECTIONS = ["Layouts", "Navigation & play menu", "Boardgame states", "Pieces", "Player avatars", "Reactions & emojis", "Functional icons", "Game controls", "Analysis & move history", "Match results", "Advertising layouts", "Responsive layouts", "Player profile & social identity", "Ratings & performance", "Game history", "Streaks, leagues & progression", "Awards & achievements", "Regional passports", "Content, support & footer", "Community, chat & notifications", "Connection, empty & system states"];
const FAZ3A_SECTIONS = ["Product layouts", "Alert types & urgency", "Map & proximity", "Mission lifecycle", "Volunteer convergence", "Evidence before & after", "Independent verification", "Equipment coordination", "Operational chat", "Verified impact", "Lightweight profiles", "Civic confirmations", "Functional icons", "Loading states", "Empty, error & completion states", "Notifications & thresholds", "Institutional products", "Partners & sponsorship"];
const GROUP_SECTIONS = ["Corporate & product layouts", "Product marks", "Portfolio directory", "Idea analysis framework", "Idea-to-product pipeline", "Community experience", "Kogia personalities", "Community reactions", "Functional icons", "Loading & publishing states", "Owner console", "Clients & organizations", "Subscriptions & billing", "Provisioning", "Metrics & decision charts", "Empty, error & success states", "Responsive architecture", "Calls to action & footer"];

const comptesV2 = () => ({
  levels: document.querySelectorAll("#v2-review .tiers .card").length,
  marks: document.querySelectorAll("#v2-review .marks .card").length,
  markLoaders: document.querySelectorAll("#v2-review .mark-loaders .card").length,
  approved: document.querySelectorAll("#v2-review .avatars .card").length,
  avatars: document.querySelectorAll("#v2-review #kg-v2-avatars .card").length,
  reactions: document.querySelectorAll("#v2-review .compare")[0].querySelectorAll(".card").length,
  icons: document.querySelectorAll("#v2-review .compare")[1].querySelectorAll(".card").length,
  loaders: document.querySelectorAll("#v2-review .loaders .card").length,
});

const affichage = () => ({
  actuel: getComputedStyle(document.querySelector("#current-gallery")).display,
  revue: getComputedStyle(document.querySelector("#v2-review")).display,
  kharbga: getComputedStyle(document.querySelector("#kharbga-review")).display,
  faz3a: getComputedStyle(document.querySelector("#faz3a-review")).display,
  group: getComputedStyle(document.querySelector("#group-review")).display,
});

try {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.stack || error.message));
  page.on("requestfailed", (request) => errors.push(`requête échouée : ${request.url()}`));
  await page.goto(`http://127.0.0.1:${port}/visual-assets/gallery/`, { waitUntil: "networkidle" });

  const architecture = await page.evaluate(() => ({
    modes: [...document.querySelectorAll(".kg-mode-switch button")].map((button) => button.textContent.trim()),
    currentSections: [...document.querySelectorAll("#current-gallery h2")].map((heading) => heading.textContent.trim()),
    kharbgaMounts: document.querySelectorAll("#kharbga-review").length,
    obsoleteKharbgaMounts: document.querySelectorAll("#kharbga-v1-review, #kharbga-v2-review").length,
  }));
  if (JSON.stringify(architecture.modes) !== JSON.stringify(["Shared V1", "Shared V2", "Kharbga V3.2", "Faz3a V1", "KogiaGroup V1"])) {
    throw new Error(`Modes globaux inattendus : ${JSON.stringify(architecture.modes)}`);
  }
  if (JSON.stringify(architecture.currentSections) !== JSON.stringify(SECTIONS)) {
    throw new Error(`Ordre Actuel inattendu : ${JSON.stringify(architecture.currentSections)}`);
  }
  if (architecture.kharbgaMounts !== 1 || architecture.obsoleteKharbgaMounts !== 0) {
    throw new Error(`Montage Kharbga incorrect : ${JSON.stringify(architecture)}`);
  }
  const officialInitial = await page.evaluate(() => ({
    product: document.querySelector("#official-product").textContent.trim(),
    version: document.querySelector("#official-version").textContent.trim(),
    categories: document.querySelector("#official-categories").textContent.trim(),
  }));
  if (JSON.stringify(officialInitial) !== JSON.stringify({ product:"KogiaGroup", version:"Shared V1", categories:"7 complete categories" })) {
    throw new Error(`Statut officiel initial incorrect : ${JSON.stringify(officialInitial)}`);
  }

  // La galerie démarre en mode Actuel, exactement comme avant.
  const v1 = await page.evaluate(() => ({
    avatars: document.querySelectorAll("#avatars .card").length,
    reactions: document.querySelectorAll("#reactions .card").length,
    icons: document.querySelectorAll("#icons .card").length,
    loaders: document.querySelectorAll("#loaders .card").length,
  }));
  if (JSON.stringify(v1) !== JSON.stringify(ATTENDU_V1)) {
    throw new Error(`Comptes V1 inattendus : ${JSON.stringify(v1)}`);
  }
  const auChargement = await page.evaluate(affichage);
  if (auChargement.revue !== "none" || auChargement.kharbga !== "none" || auChargement.faz3a !== "none" || auChargement.group !== "none" || auChargement.actuel === "none") {
    throw new Error(`La galerie ne démarre pas en mode Actuel : ${JSON.stringify(auChargement)}`);
  }
  // Rien de V2 ne doit être chargé tant qu'on n'a pas demandé la revue.
  const premature = await page.evaluate(() => document.querySelector("#v2-review").children.length);
  if (premature !== 0) throw new Error("La revue V2 se construit au chargement au lieu du premier passage");

  // ── Bascule vers la revue V2 ────────────────────────────────────────────
  await page.click('.kg-mode-switch button[data-mode="v2"]');
  await page.locator("#v2-review .loaders .card").first().waitFor({ timeout: 20000 });
  const v2 = await page.evaluate(comptesV2);
  if (JSON.stringify(v2) !== JSON.stringify(ATTENDU_V2)) {
    throw new Error(`Comptes V2 inattendus : ${JSON.stringify(v2)} ≠ ${JSON.stringify(ATTENDU_V2)}`);
  }
  const enRevue = await page.evaluate(affichage);
  if (enRevue.actuel !== "none" || enRevue.revue === "none") {
    throw new Error(`Modes mal masqués en revue : ${JSON.stringify(enRevue)}`);
  }
  const sectionsV2 = await page.evaluate(() => [...document.querySelectorAll("#v2-review section h2")].map((heading) => heading.textContent.trim()));
  if (JSON.stringify(sectionsV2) !== JSON.stringify(SECTIONS)) {
    throw new Error(`Ordre Revue V2 inattendu : ${JSON.stringify(sectionsV2)}`);
  }
  const annexes = await page.evaluate(() => document.querySelectorAll("#v2-review .world, #v2-review .boards").length);
  if (annexes !== 0) throw new Error("Des planches ou objets annexes encombrent encore la revue principale");

  // Chaque raster doit vraiment être décodé, pas juste référencé. La revue est
  // montée d'un coup : on attend la fin du décodage avant de juger.
  await page.waitForFunction(
    () => [...document.querySelectorAll("#v2-review img")].every((image) => image.complete),
    null, { timeout: 30000 });
  const brisees = await page.evaluate(() => [...document.querySelectorAll("#v2-review img")]
    .filter((image) => image.naturalWidth === 0).map((image) => image.getAttribute("src")));
  if (brisees.length) throw new Error(`Images non décodées : ${brisees.slice(0, 5).join(", ")}`);

  // Aucune carte ne doit déborder de sa colonne (libellés de verdict coupés).
  const debordent = await page.evaluate(() => [...document.querySelectorAll("#v2-review .card")]
    .filter((card) => card.scrollWidth > card.clientWidth + 1).length);
  if (debordent) throw new Error(`${debordent} cartes débordent horizontalement`);

  // Contrôles de statut : un jeu par candidat, aucun sur les approuvés V1.
  const statuts = await page.evaluate(() => ({
    candidats: document.querySelectorAll("#v2-review .status").length,
    surApprouves: document.querySelectorAll("#v2-review .avatars .status").length,
  }));
  if (statuts.candidats !== 39 || statuts.surApprouves !== 0) {
    throw new Error(`Contrôles de statut inattendus : ${JSON.stringify(statuts)}`);
  }

  // Le verdict se pose et se relit.
  await page.click('#kg-v2-avatars .card:first-child .status button[data-status="approved"]');
  if (await page.getAttribute("#kg-v2-avatars .card:first-child", "data-verdict") !== "approved") {
    throw new Error("Le contrôle de statut n'a pas pris");
  }

  // Mouvement réduit : plus aucune animation ne tourne.
  await page.check("#kg-v2-motion");
  const anime = await page.evaluate(() => [...document.querySelectorAll("#v2-review .loader-art *")]
    .filter((node) => getComputedStyle(node).animationName !== "none").length);
  if (anime !== 0) throw new Error(`${anime} éléments encore animés sous mouvement réduit`);
  await page.uncheck("#kg-v2-motion");
  const enMouvement = await page.evaluate(() => [...document.querySelectorAll("#v2-review .loader-art *")]
    .filter((node) => getComputedStyle(node).animationName !== "none").length);
  if (enMouvement === 0) throw new Error("Aucune animation active hors mouvement réduit");

  // Fonds et couloir produit.
  for (const fond of ["abyss", "checker", "product", "light"]) {
    await page.selectOption("#kg-v2-bg", fond);
    if (await page.getAttribute("#v2-review", "data-bg") !== fond) throw new Error(`Fond ${fond} non appliqué`);
  }
  await page.selectOption("#product", "kharbga");
  if (await page.getAttribute("html", "data-kogia-product") !== "kharbga") {
    throw new Error("Bascule de couleur produit échouée");
  }

  // ── Kharbga : revue produit inspirée des captures de référence ───────────
  await page.click('.kg-mode-switch button[data-mode="kharbga"]');
  await page.locator("#kharbga-review .khp-ad-grid article").first().waitFor({ timeout: 20000 });
  const kharbga = await page.evaluate(() => ({
    sections: [...document.querySelectorAll("#kharbga-review section h2")].map((heading) => heading.textContent.trim()),
    counts: {
      layouts: document.querySelectorAll("#kharbga-review .khp-layout-stack .khp-layout").length,
      states: document.querySelectorAll("#kharbga-review .khp-state-card").length,
      pieces: document.querySelectorAll("#kharbga-review .khp-asset-card").length,
      profiles: document.querySelectorAll("#kharbga-review .khp-avatar-card").length,
      reactions: document.querySelectorAll("#kharbga-review .khp-reaction-card").length,
      icons: document.querySelectorAll("#kharbga-review .khp-icon-card").length,
      ads: document.querySelectorAll("#kharbga-review .khp-ad").length,
      responsive: document.querySelectorAll("#kharbga-review .khp-responsive-review article").length,
    },
    visible: getComputedStyle(document.querySelector("#kharbga-review")).display,
    current: getComputedStyle(document.querySelector("#current-gallery")).display,
    v2: getComputedStyle(document.querySelector("#v2-review")).display,
  }));
  const kharbgaCounts = { layouts:6, states:5, pieces:8, profiles:8, reactions:8, icons:36, ads:17, responsive:3 };
  if (JSON.stringify(kharbga.sections) !== JSON.stringify(KHARBGA_SECTIONS)) {
    throw new Error(`Ordre Kharbga inattendu : ${JSON.stringify(kharbga.sections)}`);
  }
  if (JSON.stringify(kharbga.counts) !== JSON.stringify(kharbgaCounts)) {
    throw new Error(`Comptes Kharbga inattendus : ${JSON.stringify(kharbga.counts)}`);
  }
  const boardSpec = await page.evaluate(() => ({
    boards: document.querySelectorAll("#kharbga-review .khp-board").length,
    houses: document.querySelectorAll("#kharbga-review .khp-cell").length,
    middle: document.querySelectorAll("#kharbga-review .khp-cell.is-middle").length,
  }));
  if (JSON.stringify(boardSpec) !== JSON.stringify({ boards:12, houses:588, middle:12 })) {
    throw new Error(`Structure du plateau Kharbga incorrecte : ${JSON.stringify(boardSpec)}`);
  }
  await page.waitForFunction(() => [...document.querySelectorAll("#kharbga-review svg")]
    .every((icon) => { const box = icon.getBBox(); return box.width > 0 && box.height > 0; }));
  if (kharbga.visible === "none" || kharbga.current !== "none" || kharbga.v2 !== "none") {
    throw new Error(`Modes mal masqués dans Kharbga : ${JSON.stringify(kharbga)}`);
  }
  await page.waitForFunction(() => [...document.querySelectorAll("#kharbga-review img")].every((image) => image.complete));
  const kharbgaBroken = await page.evaluate(() => [...document.querySelectorAll("#kharbga-review img")]
    .filter((image) => image.naturalWidth === 0).map((image) => image.src));
  if (kharbgaBroken.length) throw new Error(`Images Kharbga non décodées : ${kharbgaBroken.slice(0, 5).join(", ")}`);
  const kharbgaOverflow = await page.evaluate(() => [...document.querySelectorAll("#kharbga-review .khp-layout, #kharbga-review .khp-asset-card, #kharbga-review .khp-avatar-card, #kharbga-review .khp-reaction-card")]
    .filter((card) => card.scrollWidth > card.clientWidth + 1).length);
  if (kharbgaOverflow) throw new Error(`${kharbgaOverflow} cartes Kharbga débordent`);

  // ── Faz3a : action locale, proximité, preuve et impact ─────────────────
  await page.click('.kg-mode-switch button[data-mode="faz3a"]');
  await page.locator("#faz3a-review .fz-impact-layout").waitFor({ timeout: 20000 });
  await page.waitForFunction(() => [...document.querySelectorAll("#faz3a-review img")].every((image) => image.complete));
  const faz3a = await page.evaluate(() => ({
    sections:[...document.querySelectorAll("#faz3a-review section h2")].map(x=>x.textContent.trim()),
    phones:document.querySelectorAll("#faz3a-review .fz-device").length,
    lifecycle:document.querySelectorAll("#faz3a-review .fz-step").length,
    avatars:document.querySelectorAll("#faz3a-review .fz-avatar-card").length,
    reactions:document.querySelectorAll("#faz3a-review .fz-reaction").length,
    icons:document.querySelectorAll("#faz3a-review .fz-icon-card").length,
    loaders:document.querySelectorAll("#faz3a-review .fz-loader").length,
    sponsors:document.querySelectorAll("#faz3a-review .fz-sponsor").length,
    broken:[...document.querySelectorAll("#faz3a-review img")].filter(x=>x.naturalWidth===0).length,
  }));
  if (JSON.stringify(faz3a.sections)!==JSON.stringify(FAZ3A_SECTIONS)) throw new Error(`Ordre Faz3a inattendu : ${JSON.stringify(faz3a.sections)}`);
  if (JSON.stringify({...faz3a,sections:undefined})!==JSON.stringify({sections:undefined,phones:5,lifecycle:7,avatars:8,reactions:5,icons:16,loaders:4,sponsors:4,broken:0})) throw new Error(`Comptes Faz3a inattendus : ${JSON.stringify(faz3a)}`);
  if (await page.getAttribute("html","data-kogia-product")!=="faz3a") throw new Error("Couloir Faz3a non appliqué");

  // ── KogiaGroup : entreprise, communauté et console propriétaire ────────
  await page.click('.kg-mode-switch button[data-mode="group"]');
  try {
    await page.locator("#group-review .kgp-console").first().waitFor({ timeout: 20000 });
  } catch (error) {
    throw new Error(`KogiaGroup non monté : ${errors.join(" | ") || error.message}`);
  }
  await page.waitForFunction(() => [...document.querySelectorAll("#group-review img")].every((image) => image.complete));
  const group = await page.evaluate(() => ({
    sections:[...document.querySelectorAll("#group-review section h2")].map(x=>x.textContent.trim()),
    layouts:document.querySelectorAll("#group-review .kgp-layouts>div").length,
    marks:document.querySelectorAll("#group-review .kgp-mark").length,
    products:document.querySelectorAll("#group-review .kgp-product").length,
    avatars:document.querySelectorAll("#group-review .kgp-avatar").length,
    reactions:document.querySelectorAll("#group-review .kgp-reaction").length,
    icons:document.querySelectorAll("#group-review .kgp-icon").length,
    loaders:document.querySelectorAll("#group-review .kgp-loader").length,
    broken:[...document.querySelectorAll("#group-review img")].filter(x=>x.naturalWidth===0).length,
  }));
  if (JSON.stringify(group.sections)!==JSON.stringify(GROUP_SECTIONS)) throw new Error(`Ordre KogiaGroup inattendu : ${JSON.stringify(group.sections)}`);
  if (JSON.stringify({...group,sections:undefined})!==JSON.stringify({sections:undefined,layouts:4,marks:17,products:14,avatars:8,reactions:12,icons:15,loaders:4,broken:0})) throw new Error(`Comptes KogiaGroup inattendus : ${JSON.stringify(group)}`);
  if (await page.getAttribute("html","data-kogia-product")!=="group") throw new Error("Couloir KogiaGroup non appliqué");

  // Un produit sans revue dédiée ouvre Shared V2 avec son propre couloir.
  await page.selectOption("#product", "coreon");
  await page.locator('.kg-mode-switch button[data-mode="v2"][aria-selected="true"]').waitFor();
  const sharedProduct = await page.evaluate(() => ({
    lane: document.documentElement.dataset.kogiaProduct,
    product: document.querySelector("#official-product").textContent.trim(),
    version: document.querySelector("#official-version").textContent.trim(),
    categories: document.querySelector("#official-categories").textContent.trim(),
  }));
  if (JSON.stringify(sharedProduct) !== JSON.stringify({ lane:"coreon", product:"Coreon EDU", version:"Shared V2 candidate", categories:"7 complete categories" })) {
    throw new Error(`Synchronisation produit/revue incorrecte : ${JSON.stringify(sharedProduct)}`);
  }

  // Retour à Actuel : la galerie d'origine est toujours là, intacte.
  await page.click('.kg-mode-switch button[data-mode="current"]');
  const retour = await page.evaluate(() => ({
    avatars: document.querySelectorAll("#avatars .card").length,
    actuel: getComputedStyle(document.querySelector("#current-gallery")).display,
    revue: getComputedStyle(document.querySelector("#v2-review")).display,
    kharbga: getComputedStyle(document.querySelector("#kharbga-review")).display,
    faz3a: getComputedStyle(document.querySelector("#faz3a-review")).display,
    group: getComputedStyle(document.querySelector("#group-review")).display,
  }));
  if (retour.avatars !== ATTENDU_V1.avatars) throw new Error("La galerie d'origine a changé après la bascule");
  if (retour.revue !== "none" || retour.kharbga !== "none" || retour.faz3a !== "none" || retour.group !== "none" || retour.actuel === "none") {
    throw new Error(`Retour à Actuel mal masqué : ${JSON.stringify(retour)}`);
  }

  // ── La page autonome rend la même revue ─────────────────────────────────
  await page.goto(`http://127.0.0.1:${port}/visual-assets-v2/gallery/`, { waitUntil: "networkidle" });
  await page.locator("#review .loaders .card").first().waitFor({ timeout: 20000 });
  const autonome = await page.evaluate(() =>
    document.querySelectorAll("#review .card").length);

  await browser.close();
  if (errors.length) throw new Error(`Erreurs navigateur : ${errors.join(" | ")}`);
  console.log(`Smoke V2 vert : galerie de production ${JSON.stringify(v1)}, `
    + `revue ${JSON.stringify(v2)}, Kharbga ${JSON.stringify(kharbga.counts)}, Faz3a ${faz3a.sections.length} sections, KogiaGroup ${group.sections.length} sections, page autonome ${autonome} cartes, `
    + "cinq modes isolés, assets décodés, retour à Actuel intact.");
} finally {
  await new Promise((done) => server.close(done));
}
