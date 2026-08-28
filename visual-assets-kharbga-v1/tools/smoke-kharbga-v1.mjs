#!/usr/bin/env node
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const require = createRequire(resolve(root, "community/package.json"));
const { chromium } = require("playwright");
const mime = { ".html":"text/html", ".css":"text/css", ".js":"text/javascript", ".json":"application/json", ".svg":"image/svg+xml", ".png":"image/png" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://local").pathname);
    const relative = (pathname.endsWith("/") ? `${pathname}index.html` : pathname).replace(/^\//, "");
    const path = resolve(root, relative);
    if (!path.startsWith(`${root}/`)) throw new Error("invalid path");
    const body = await readFile(path);
    response.writeHead(200, { "content-type": mime[extname(path)] || "application/octet-stream" }); response.end(body);
  } catch { response.writeHead(404); response.end("not found"); }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const port = server.address().port;

try {
  const browser = await chromium.launch({ headless:true });
  const page = await browser.newPage({ viewport:{ width:1440, height:1000 } });
  const errors = [];
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", error => errors.push(error.message));
  page.on("requestfailed", request => errors.push(`failed ${request.url()}`));
  await page.goto(`http://127.0.0.1:${port}/visual-assets/gallery/`, { waitUntil:"networkidle" });
  const lazy = await page.evaluate(() => document.querySelector("#kharbga-v1-review").children.length);
  if (lazy) throw new Error("V1 mounted before selection");
  await page.click('[data-mode="kharbga-v1"]');
  await page.locator("#kh2-board .kh2-cell").first().waitFor({ timeout:30000 });
  await page.waitForFunction(() => [...document.querySelectorAll("#kharbga-v1-review img")].every(image => image.complete), null, { timeout:30000 });
  const war = await page.evaluate(() => ({
    cells:document.querySelectorAll("#kh2-board .kh2-cell").length,
    pieces:document.querySelectorAll("#kh2-board .kh2-cell img").length,
    roles:document.querySelectorAll(".kh2-piece-grid article").length,
    profiles:document.querySelectorAll(".kh2-profile-grid article").length,
    reactions:document.querySelectorAll(".kh2-reaction-grid article").length,
    boards:document.querySelectorAll(".kh2-direction-grid article").length,
    broken:[...document.querySelectorAll("#kharbga-v1-review img")].filter(image => image.naturalWidth === 0).length,
    productHidden:getComputedStyle(document.querySelector("#product").closest("label")).display === "none",
    overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  }));
  const expected = { cells:64,pieces:32,roles:6,profiles:8,reactions:8,boards:3,broken:0,productHidden:true,overflow:false };
  if (JSON.stringify(war) !== JSON.stringify(expected)) throw new Error(`war mismatch ${JSON.stringify(war)}`);
  await page.screenshot({ path:"/tmp/kharbga-v1-desktop.png", fullPage:true });
  await page.click('[data-kh2-mode="classic"]');
  const classic = await page.evaluate(() => ({ cells:document.querySelectorAll("#kh2-board .kh2-cell").length,pieces:document.querySelectorAll("#kh2-board .kh2-cell img").length,citadel:document.querySelectorAll("#kh2-board .is-citadel").length }));
  if (classic.cells !== 49 || classic.pieces !== 48 || classic.citadel !== 1) throw new Error(`classic mismatch ${JSON.stringify(classic)}`);
  await page.setViewportSize({ width:390, height:844 });
  await page.reload({ waitUntil:"networkidle" });
  await page.click('[data-mode="kharbga-v1"]');
  await page.locator("#kh2-board .kh2-cell").first().waitFor();
  const mobile = await page.evaluate(() => ({ overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth + 1, board:Math.round(document.querySelector("#kh2-board").getBoundingClientRect().width), cells:document.querySelectorAll("#kh2-board .kh2-cell").length }));
  if (mobile.overflow || mobile.board > 358 || mobile.cells !== 64) throw new Error(`mobile mismatch ${JSON.stringify(mobile)}`);
  await page.screenshot({ path:"/tmp/kharbga-v1-mobile.png", fullPage:true });
  await browser.close();
  if (errors.length) throw new Error(errors.join(" | "));
  console.log(`Kharbga V1 smoke green: war ${JSON.stringify(war)}; classic ${JSON.stringify(classic)}; mobile ${JSON.stringify(mobile)}.`);
} finally { await new Promise((done) => server.close(done)); }
