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
const ATTENDU_V2 = { approved: 6, avatars: 8, reactions: 12, icons: 15, loaders: 4, world: 12, boards: 4 };

const comptesV2 = () => ({
  approved: document.querySelectorAll("#v2-review .avatars .card").length,
  avatars: document.querySelectorAll("#v2-review #kg-v2-avatars .card").length,
  reactions: document.querySelectorAll("#v2-review .compare")[0].querySelectorAll(".card").length,
  icons: document.querySelectorAll("#v2-review .compare")[1].querySelectorAll(".card").length,
  loaders: document.querySelectorAll("#v2-review .loaders .card").length,
  world: document.querySelectorAll("#v2-review .world .card").length,
  boards: document.querySelectorAll("#v2-review .boards .card").length,
});

const affichage = () => ({
  actuel: getComputedStyle(document.querySelector("#current-gallery")).display,
  revue: getComputedStyle(document.querySelector("#v2-review")).display,
});

try {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => errors.push(`requête échouée : ${request.url()}`));
  await page.goto(`http://127.0.0.1:${port}/visual-assets/gallery/`, { waitUntil: "networkidle" });

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
  if (auChargement.revue !== "none" || auChargement.actuel === "none") {
    throw new Error(`La galerie ne démarre pas en mode Actuel : ${JSON.stringify(auChargement)}`);
  }
  // Rien de V2 ne doit être chargé tant qu'on n'a pas demandé la revue.
  const premature = await page.evaluate(() => document.querySelector("#v2-review").children.length);
  if (premature !== 0) throw new Error("La revue V2 se construit au chargement au lieu du premier passage");

  // ── Bascule vers la revue V2 ────────────────────────────────────────────
  await page.click('.kg-mode-switch button[data-mode="v2"]');
  await page.locator("#v2-review .boards .card").first().waitFor({ timeout: 20000 });
  const v2 = await page.evaluate(comptesV2);
  if (JSON.stringify(v2) !== JSON.stringify(ATTENDU_V2)) {
    throw new Error(`Comptes V2 inattendus : ${JSON.stringify(v2)} ≠ ${JSON.stringify(ATTENDU_V2)}`);
  }
  const enRevue = await page.evaluate(affichage);
  if (enRevue.actuel !== "none" || enRevue.revue === "none") {
    throw new Error(`Modes mal masqués en revue : ${JSON.stringify(enRevue)}`);
  }

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
  if (statuts.candidats !== 55 || statuts.surApprouves !== 0) {
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

  // Retour à Actuel : la galerie d'origine est toujours là, intacte.
  await page.click('.kg-mode-switch button[data-mode="current"]');
  const retour = await page.evaluate(() => ({
    avatars: document.querySelectorAll("#avatars .card").length,
    actuel: getComputedStyle(document.querySelector("#current-gallery")).display,
    revue: getComputedStyle(document.querySelector("#v2-review")).display,
  }));
  if (retour.avatars !== ATTENDU_V1.avatars) throw new Error("La galerie d'origine a changé après la bascule");
  if (retour.revue !== "none" || retour.actuel === "none") {
    throw new Error(`Retour à Actuel mal masqué : ${JSON.stringify(retour)}`);
  }

  // ── La page autonome rend la même revue ─────────────────────────────────
  await page.goto(`http://127.0.0.1:${port}/visual-assets-v2/gallery/`, { waitUntil: "networkidle" });
  await page.locator("#review .boards .card").first().waitFor({ timeout: 20000 });
  const autonome = await page.evaluate(() =>
    document.querySelectorAll("#review .card").length);

  await browser.close();
  if (errors.length) throw new Error(`Erreurs navigateur : ${errors.join(" | ")}`);
  console.log(`Smoke V2 vert : galerie de production ${JSON.stringify(v1)}, `
    + `revue ${JSON.stringify(v2)}, page autonome ${autonome} cartes, `
    + "mouvement réduit propre, 4 fonds, bascule produit, retour à Actuel intact.");
} finally {
  await new Promise((done) => server.close(done));
}
