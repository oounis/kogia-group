#!/usr/bin/env node
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const vectors = JSON.parse(await readFile(resolve(root, "manifests/vector-assets.json"), "utf8"));
const palettes = JSON.parse(await readFile(resolve(root, "tokens/product-colors.json"), "utf8"));
const pngItems = async (folder, family) => (await readdir(resolve(root, folder)))
  .filter((name) => name.endsWith(".png")).sort()
  .map((file) => ({ name: file.replace(/\.png$/, ""), family, path: `${folder}/${file}`, format: "png", width: 512, height: 512, alpha: true }));
const assets = {
  system: "Kogia visual assets",
  version: "2026.08.21",
  boundary: "No logos, wordmarks, favicons, or identity replacements.",
  products: palettes.products,
  icons: vectors.icons,
  loaders: vectors.loaders,
  avatars: await pngItems("avatars/png", "avatar"),
  reactions: await pngItems("reactions/png", "reaction"),
};
assets.total = assets.icons.length + assets.loaders.length + assets.avatars.length + assets.reactions.length;
await writeFile(resolve(root, "manifests/assets.json"), `${JSON.stringify(assets, null, 2)}\n`);
console.log(`Manifest written: ${assets.total} production assets.`);
