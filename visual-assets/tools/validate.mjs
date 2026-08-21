#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(resolve(root, "manifests/assets.json"), "utf8"));
const failures = [];
const titles = new Set();

for (const asset of [...manifest.icons, ...manifest.loaders, ...manifest.avatars, ...manifest.reactions]) {
  try { await stat(resolve(root, asset.path)); } catch { failures.push(`missing: ${asset.path}`); }
}

for (const asset of [...manifest.icons, ...manifest.loaders]) {
  const text = await readFile(resolve(root, asset.path), "utf8");
  if (/<script\b/i.test(text)) failures.push(`script in SVG: ${asset.path}`);
  if (/https?:\/\//i.test(text.replace("http://www.w3.org/2000/svg", ""))) failures.push(`external URL in SVG: ${asset.path}`);
  const id = text.match(/<title id="([^"]+)"/)?.[1];
  if (!id) failures.push(`missing title id: ${asset.path}`);
  else if (titles.has(id)) failures.push(`duplicate title id: ${id}`);
  else titles.add(id);
  if (asset.path.includes("logo") || asset.path.includes("whale-mark") || asset.path.includes("favicon")) failures.push(`identity asset crossed boundary: ${asset.path}`);
}

const pngFiles = [
  ...(await readdir(resolve(root, "avatars/png"))).map((name) => `avatars/png/${name}`),
  ...(await readdir(resolve(root, "reactions/png"))).map((name) => `reactions/png/${name}`),
];
for (const path of pngFiles) {
  const bytes = await readFile(resolve(root, path));
  if (bytes.toString("ascii", 1, 4) !== "PNG") failures.push(`not PNG: ${path}`);
  if (bytes.readUInt32BE(16) !== 512 || bytes.readUInt32BE(20) !== 512) failures.push(`wrong dimensions: ${path}`);
  if (bytes[25] !== 6) failures.push(`not RGBA: ${path}`);
}

for (const loader of manifest.loaders) {
  const text = await readFile(resolve(root, loader.path), "utf8");
  if (!text.includes("prefers-reduced-motion")) failures.push(`missing reduced motion: ${loader.path}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Validated ${manifest.total} assets: paths, SVG safety, unique titles, 512×512 RGBA, identity boundary, and reduced motion.`);
