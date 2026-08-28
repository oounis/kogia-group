#!/usr/bin/env node
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const require = createRequire(resolve(root, "community/package.json"));
const { chromium } = require("playwright");
const mime = { ".html":"text/html", ".css":"text/css", ".js":"text/javascript", ".json":"application/json", ".png":"image/png", ".svg":"image/svg+xml" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://local").pathname);
    const relative = (pathname.endsWith("/") ? `${pathname}index.html` : pathname).replace(/^\//, "");
    const path = resolve(root, relative);
    if (!path.startsWith(`${root}/`)) throw new Error("invalid path");
    const body = await readFile(path);
    response.writeHead(200, { "content-type":mime[extname(path)] || "application/octet-stream" }); response.end(body);
  } catch { response.writeHead(404); response.end("not found"); }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const port = server.address().port;
const SECTIONS = ["Layouts", "Navigation & play menu", "Boardgame states", "Pieces", "Player avatars", "Reactions & emojis", "Functional icons", "Game controls", "Analysis & move history", "Match results", "Advertising layouts", "Responsive layouts", "Player profile & social identity", "Ratings & performance", "Game history", "Streaks, leagues & progression", "Awards & achievements", "Regional passports", "Content, support & footer", "Community, chat & notifications", "Connection, empty & system states"];

try {
  const browser = await chromium.launch({ headless:true });
  const page = await browser.newPage({ viewport:{ width:1440, height:1000 } });
  const errors = [];
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", error => errors.push(error.message));
  page.on("requestfailed", request => errors.push(`failed ${request.url()}`));
  await page.goto(`http://127.0.0.1:${port}/visual-assets/gallery/`, { waitUntil:"networkidle" });
  if (await page.evaluate(() => document.querySelector("#kharbga-review").children.length)) throw new Error("Kharbga mounted before selection");
  await page.click('[data-mode="kharbga"]');
  await page.locator(".khp-live-layout .khp-board").waitFor({ timeout:30000 });
  await page.waitForFunction(() => [...document.querySelectorAll("#kharbga-review img")].every(image => image.complete), null, { timeout:30000 });

  const desktop = await page.evaluate((sections) => ({
    sections:[...document.querySelectorAll("#kharbga-review section h2")].map(node => node.textContent.trim()),
    layouts:document.querySelectorAll(".khp-layout-stack .khp-layout").length,
    states:document.querySelectorAll(".khp-state-card").length,
    boards:document.querySelectorAll(".khp-board").length,
    houses:document.querySelectorAll(".khp-cell").length,
    pieces:document.querySelectorAll(".khp-asset-card").length,
    profiles:document.querySelectorAll(".khp-avatar-card").length,
    reactions:document.querySelectorAll(".khp-reaction-card").length,
    icons:document.querySelectorAll(".khp-icon-card").length,
    ads:document.querySelectorAll(".khp-ad").length,
    responsive:document.querySelectorAll(".khp-responsive-review article").length,
    leagues:document.querySelectorAll(".khp-league-card").length,
    awards:document.querySelectorAll(".khp-award-card").length,
    passports:document.querySelectorAll(".khp-passport-card").length,
    social:document.querySelectorAll(".khp-social-review").length,
    systemStates:document.querySelectorAll(".khp-system-grid article").length,
    broken:[...document.querySelectorAll("#kharbga-review img")].filter(image => image.naturalWidth === 0).length,
    svgVisible:[...document.querySelectorAll("#kharbga-review svg")].every(svg => svg.getBBox().width > 0 && svg.getBBox().height > 0),
    expectedSections:sections,
  }), SECTIONS);
  if (JSON.stringify(desktop.sections) !== JSON.stringify(SECTIONS)) throw new Error(`sections ${JSON.stringify(desktop.sections)}`);
  const expected = { layouts:6, states:5, boards:12, houses:588, pieces:8, profiles:8, reactions:8, icons:36, ads:17, responsive:3, leagues:4, awards:6, passports:4, social:1, systemStates:4, broken:0, svgVisible:true };
  for (const [key,value] of Object.entries(expected)) if (desktop[key] !== value) throw new Error(`${key}: ${desktop[key]} !== ${value}`);
  const malformedBoards = await page.evaluate(() => [...document.querySelectorAll(".khp-board")].filter(board => board.querySelectorAll(".khp-cell").length !== 49).length);
  if (malformedBoards) throw new Error(`${malformedBoards} malformed boards`);
  await page.locator(".khp-live-layout").screenshot({ path:"/tmp/kharbga-pro-desktop.png" });
  await page.locator(".khp-profile-layout").first().screenshot({ path:"/tmp/kharbga-pro-profile.png" });
  await page.locator(".khp-history-layout").first().screenshot({ path:"/tmp/kharbga-pro-history.png" });
  await page.locator(".khp-award-grid").screenshot({ path:"/tmp/kharbga-pro-awards.png" });
  await page.locator(".khp-dashboard-shell").screenshot({ path:"/tmp/kharbga-pro-quickplay.png" });
  await page.locator(".khp-nav-review").screenshot({ path:"/tmp/kharbga-pro-navigation.png" });
  await page.locator(".khp-league-grid").screenshot({ path:"/tmp/kharbga-pro-leagues.png" });
  await page.locator(".khp-passport-grid").screenshot({ path:"/tmp/kharbga-pro-passports.png" });
  await page.locator(".khp-social-review").screenshot({ path:"/tmp/kharbga-pro-social.png" });
  await page.locator(".khp-system-grid").screenshot({ path:"/tmp/kharbga-pro-system.png" });

  await page.setViewportSize({ width:390, height:844 });
  await page.reload({ waitUntil:"networkidle" });
  await page.click('[data-mode="kharbga"]');
  await page.locator(".khp-live-layout .khp-board").waitFor({ timeout:30000 });
  const mobile = await page.evaluate(() => ({
    board:Math.round(document.querySelector(".khp-live-layout .khp-board").getBoundingClientRect().width),
    overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    ads:document.querySelectorAll(".khp-ad-mobile").length,
  }));
  if (mobile.board > 350 || mobile.overflow || mobile.ads < 1) throw new Error(`mobile ${JSON.stringify(mobile)}`);
  await page.locator(".khp-phone").screenshot({ path:"/tmp/kharbga-pro-mobile.png" });

  await browser.close();
  if (errors.length) throw new Error(errors.join(" | "));
  console.log(`Kharbga refined UI smoke green: ${desktop.sections.length} categories, ${desktop.layouts} layouts, ${desktop.states} states, ${desktop.icons} icons, ${desktop.ads} ads, mobile ${JSON.stringify(mobile)}.`);
} finally { await new Promise((done) => server.close(done)); }
