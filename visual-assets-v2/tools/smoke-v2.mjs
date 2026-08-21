#!/usr/bin/env node
// Sert le dépôt et ouvre la revue V2 dans un vrai navigateur : compte les
// cartes, bascule les modes, vérifie que la galerie de production reste
// intacte dans l'iframe, et que le repli « mouvement réduit » coupe bien tout.
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
const attendu = { approved: 6, avatars: 8, reactions: 12, icons: 15, loaders: 4, world: 12, boards: 4 };

try {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => errors.push(`requête échouée : ${request.url()}`));
  await page.goto(`http://127.0.0.1:${port}/visual-assets-v2/gallery/`, { waitUntil: "networkidle" });

  const counts = await page.evaluate(() => ({
    approved: document.querySelectorAll("#avatars-approved .card").length,
    avatars: document.querySelectorAll("#avatars-v2 .card").length,
    reactions: document.querySelectorAll("#reactions .card").length,
    icons: document.querySelectorAll("#icons .card").length,
    loaders: document.querySelectorAll("#loaders .card").length,
    world: document.querySelectorAll("#world .card").length,
    boards: document.querySelectorAll("#boards .card").length,
  }));
  if (JSON.stringify(counts) !== JSON.stringify(attendu)) {
    throw new Error(`Comptes inattendus : ${JSON.stringify(counts)} ≠ ${JSON.stringify(attendu)}`);
  }

  // La bascule doit vraiment cacher : l'attribut [hidden] seul se fait battre
  // par une règle d'id, et la page affiche alors les deux modes à la fois.
  const visibles = await page.evaluate(() => ({
    v2: getComputedStyle(document.querySelector("#mode-v2")).display,
    actuel: getComputedStyle(document.querySelector("#mode-current")).display,
  }));
  if (visibles.actuel !== "none" || visibles.v2 === "none") {
    throw new Error(`Modes mal masqués en V2 : ${JSON.stringify(visibles)}`);
  }

  // Aucune carte ne doit déborder de sa colonne (libellés de verdict coupés).
  const debordent = await page.evaluate(() => [...document.querySelectorAll("#mode-v2 .card")]
    .filter((card) => card.scrollWidth > card.clientWidth + 1).length);
  if (debordent) throw new Error(`${debordent} cartes débordent horizontalement`);

  // Chaque raster doit vraiment être décodé, pas juste référencé.
  const brisees = await page.evaluate(() => [...document.querySelectorAll("#mode-v2 img")]
    .filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute("src")));
  if (brisees.length) throw new Error(`Images non décodées : ${brisees.slice(0, 5).join(", ")}`);

  // Contrôles de statut : un jeu par candidat, aucun sur les approuvés V1.
  const statuts = await page.evaluate(() => ({
    candidats: document.querySelectorAll("#mode-v2 .status").length,
    surApprouves: document.querySelectorAll("#avatars-approved .status").length,
  }));
  if (statuts.candidats !== 55 || statuts.surApprouves !== 0) {
    throw new Error(`Contrôles de statut inattendus : ${JSON.stringify(statuts)}`);
  }

  // Le verdict se pose et se relit.
  await page.click('#avatars-v2 .card:first-child .status button[data-status="approved"]');
  const verdict = await page.getAttribute("#avatars-v2 .card:first-child", "data-verdict");
  if (verdict !== "approved") throw new Error("Le contrôle de statut n'a pas pris");

  // Mouvement réduit : plus aucune animation ne tourne.
  await page.check("#freeze-motion");
  const anime = await page.evaluate(() => [...document.querySelectorAll(".loader-art *")]
    .filter((node) => getComputedStyle(node).animationName !== "none").length);
  if (anime !== 0) throw new Error(`${anime} éléments encore animés sous mouvement réduit`);
  await page.uncheck("#freeze-motion");
  const enMouvement = await page.evaluate(() => [...document.querySelectorAll(".loader-art *")]
    .filter((node) => getComputedStyle(node).animationName !== "none").length);
  if (enMouvement === 0) throw new Error("Aucune animation active hors mouvement réduit");

  // Fonds et couleur produit.
  for (const fond of ["abyss", "checker", "product", "light"]) {
    await page.selectOption("#background", fond);
    if (await page.getAttribute("body", "data-bg") !== fond) throw new Error(`Fond ${fond} non appliqué`);
  }
  await page.selectOption("#product", "kharbga");
  if (await page.getAttribute("html", "data-kogia-product") !== "kharbga") throw new Error("Bascule de couleur produit échouée");

  // Mode « Actuel » : la production s'affiche telle quelle, dans l'iframe.
  await page.click('.mode-switch button[data-mode="current"]');
  const basculees = await page.evaluate(() => ({
    v2: getComputedStyle(document.querySelector("#mode-v2")).display,
    actuel: getComputedStyle(document.querySelector("#mode-current")).display,
  }));
  if (basculees.v2 !== "none" || basculees.actuel === "none") {
    throw new Error(`Modes mal masqués en Actuel : ${JSON.stringify(basculees)}`);
  }
  const cadre = await page.frameLocator("#current-frame");
  await cadre.locator("#avatars .card").first().waitFor({ timeout: 15000 });
  const production = await page.evaluate(async () => {
    const frame = document.querySelector("#current-frame").contentDocument;
    return { avatars: frame.querySelectorAll("#avatars .card").length, titre: frame.title };
  });
  if (production.titre !== "Kogia visual asset review") throw new Error(`Galerie de production altérée : ${production.titre}`);

  await browser.close();
  if (errors.length) throw new Error(`Erreurs navigateur : ${errors.join(" | ")}`);
  console.log(`Smoke V2 vert : ${JSON.stringify(counts)}, `
    + `production intacte (${production.avatars} avatars), mouvement réduit propre, 4 fonds, bascule produit.`);
} finally {
  await new Promise((done) => server.close(done));
}
