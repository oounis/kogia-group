#!/usr/bin/env node
// Rend film/licence.html en MP4, image par image : chaque animation CSS est
// mise en pause puis placée à l'instant voulu, donc le résultat est identique
// d'une machine à l'autre. Sorties dans public/video/.
//
//   node tools/rendre-film.mjs                 → toutes les langues, large et vertical
//   node tools/rendre-film.mjs en wide         → une seule
//   node tools/rendre-film.mjs en wide 14      → une seule image (PNG) à 14 s, pour vérifier
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const ici = dirname(fileURLToPath(import.meta.url));
// FILM=queue node tools/rendre-film.mjs  → le film des files d'attente (75 s).
const NOM = process.env.FILM || "licence";
const FILM = pathToFileURL(resolve(ici, `../film/${NOM}.html`)).href;
const SORTIE = resolve(ici, "../public/video");
const DUREE = { licence: 54, queue: 75 }[NOM], FPS = 25;
const TAILLES = { wide: { width: 1920, height: 1080 }, tall: { width: 1080, height: 1920 } };
const [langArg, formatArg, instant] = process.argv.slice(2);
const langues = langArg ? [langArg] : ["en", "fr", "ar"];
const formats = formatArg ? [formatArg] : ["wide", "tall"];

const nav = await chromium.launch({ args: ["--no-sandbox"] });
for (const lang of langues) for (const format of formats) {
  const page = await nav.newPage({ viewport: TAILLES[format] });
  await page.goto(`${FILM}?lang=${lang}&format=${format}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const aller = (ms) => page.evaluate((t) => { for (const a of document.getAnimations()) { a.pause(); a.currentTime = t; } }, ms);
  if (instant) {
    await aller(Number(instant) * 1000);
    await page.screenshot({ path: resolve(SORTIE, `apercu-${NOM}-${lang}-${format}-${instant}.png`) });
    await page.close();
    continue;
  }
  const cible = resolve(SORTIE, `${NOM}-${lang}${format === "tall" ? "-vertical" : ""}.mp4`);
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", cible], { stdio: ["pipe", "inherit", "inherit"] });
  const fini = new Promise((ok, ko) => ff.on("close", (c) => (c === 0 ? ok() : ko(new Error(`ffmpeg ${c}`)))));
  for (let i = 0; i < DUREE * FPS; i++) {
    await aller((i * 1000) / FPS);
    const img = await page.screenshot({ type: "jpeg", quality: 92 });
    if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once("drain", r));
  }
  ff.stdin.end();
  await fini;
  await aller(NOM === "queue" ? 63000 : 2600);
  if (format === "wide") await page.screenshot({ type: "jpeg", quality: 88, path: resolve(SORTIE, `${NOM}-${lang}.jpg`) });
  console.log("rendu", cible);
  await page.close();
}
await nav.close();
