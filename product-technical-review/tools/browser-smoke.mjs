import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { categories, screenshotInventory } from "../spec.js";

const reviewRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const kogiaRoot = resolve(reviewRoot, "..");
const require = createRequire(resolve(kogiaRoot, "community/package.json"));
const { chromium } = require("playwright");
const mime = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".md": "text/markdown" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://local").pathname);
    const relative = pathname === "/product-technical-review/" ? "index.html" : pathname.replace(/^\/product-technical-review\//, "");
    const path = resolve(reviewRoot, relative);
    if (!path.startsWith(`${reviewRoot}/`) && path !== resolve(reviewRoot, "index.html")) throw new Error("invalid path");
    const body = await readFile(path);
    response.writeHead(200, { "content-type": mime[extname(path)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404); response.end("not found");
  }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const port = server.address().port;
const requirementCount = categories.flatMap((category) => category.requirements).length;

try {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${port}/product-technical-review/`, { waitUntil: "networkidle" });
  const initial = await page.evaluate(() => ({
    cards: document.querySelectorAll(".requirement-card").length,
    categories: document.querySelectorAll(".category-section").length,
    evidence: document.querySelectorAll(".evidence-grid article").length,
    boardCells: document.querySelectorAll(".board-cell").length,
    pieces: document.querySelectorAll(".piece-card").length,
    surfaces: document.querySelectorAll(".surface-grid article").length,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  const expected = { cards: requirementCount, categories: categories.length, evidence: screenshotInventory.length, boardCells: 81, pieces: 4, surfaces: 7, overflow: false };
  if (JSON.stringify(initial) !== JSON.stringify(expected)) throw new Error(`Unexpected desktop render: ${JSON.stringify(initial)} expected ${JSON.stringify(expected)}`);
  await page.locator("#search").fill("siege");
  const searchCount = await page.locator(".requirement-card").count();
  if (searchCount < 4 || searchCount >= requirementCount) throw new Error(`Search did not narrow results: ${searchCount}`);
  await page.locator("#clear-filters").click();
  await page.locator('#category-nav button[data-category="sealed-siege"]').click();
  const categoryCount = await page.locator(".category-section").count();
  if (categoryCount !== 1) throw new Error(`Category filter returned ${categoryCount} sections`);
  await page.screenshot({ path: resolve(process.env.TMPDIR || "/tmp", "clamp-wars-technical-review-desktop.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#clear-filters").click();
  const mobile = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    boardCells: document.querySelectorAll(".board-cell").length,
    title: document.querySelector(".hero h1")?.textContent || "",
  }));
  if (mobile.overflow) throw new Error("Mobile layout has horizontal overflow");
  if (mobile.boardCells !== 81 || !mobile.title.includes("CLAMP WARS")) throw new Error(`Unexpected mobile render: ${JSON.stringify(mobile)}`);
  await page.screenshot({ path: resolve(process.env.TMPDIR || "/tmp", "clamp-wars-technical-review-mobile.png"), fullPage: false });
  await browser.close();
  if (errors.length) throw new Error(`Browser errors: ${errors.join(" | ")}`);
  console.log(`PASS browser · ${initial.cards} cards · ${initial.categories} categories · ${initial.evidence} observations · search=${searchCount}`);
} finally {
  await new Promise((done) => server.close(done));
}
