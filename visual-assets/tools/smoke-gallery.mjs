#!/usr/bin/env node
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
    const relative = pathname === "/visual-assets/gallery/" ? "visual-assets/gallery/index.html" : pathname.replace(/^\//, "");
    const path = resolve(root, relative);
    if (!path.startsWith(`${root}/`)) throw new Error("invalid path");
    const body = await readFile(path);
    response.writeHead(200, { "content-type": mime[extname(path)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404); response.end("not found");
  }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const port = server.address().port;

try {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${port}/visual-assets/gallery/`, { waitUntil: "networkidle" });
  const counts = await page.evaluate(() => ({
    avatars: document.querySelectorAll("#avatars .card").length,
    reactions: document.querySelectorAll("#reactions .card").length,
    icons: document.querySelectorAll("#icons .card").length,
    loaders: document.querySelectorAll("#loaders .card").length,
  }));
  await page.selectOption("#product", "kharbga");
  const product = await page.getAttribute("html", "data-kogia-product");
  // La capture est une trace de revue, pas un actif : hors dépôt.
  await page.screenshot({ path: resolve(process.env.TMPDIR || "/tmp", "kogia-gallery-desktop.png"), fullPage: true });
  await browser.close();
  if (JSON.stringify(counts) !== JSON.stringify({ avatars: 6, reactions: 12, icons: 60, loaders: 6 })) throw new Error(`Unexpected gallery counts: ${JSON.stringify(counts)}`);
  if (product !== "kharbga") throw new Error("Product color switch failed");
  if (errors.length) throw new Error(`Browser errors: ${errors.join(" | ")}`);
  console.log(`Gallery smoke passed: ${JSON.stringify(counts)}, color switch=${product}.`);
} finally {
  await new Promise((done) => server.close(done));
}
