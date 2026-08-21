#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repository = resolve(root, "..");
const source = await readFile(resolve(repository, "community/src/components/icons/chemins.ts"), "utf8");
const icons = {};
const entry = /\s+"([^"]+)":\s*"((?:\\.|[^"])*)",/g;
for (const match of source.matchAll(entry)) {
  if (match[1] === "whale-mark") continue; // Identity artwork is deliberately not part of this kit.
  icons[match[1]] = JSON.parse(`"${match[2]}"`).replaceAll("--icone-accent", "--kg-icon-accent");
}

Object.assign(icons, {
  home: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10M9.5 20v-6h5v6"/></g>',
  "map-pin": '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11z"/><circle cx="12" cy="10" r="2" fill="var(--kg-icon-accent,currentColor)"/></g>',
  camera: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h4l1.5-2h5L16 8h4v11H4z"/><circle cx="12" cy="13" r="3"/></g>',
  microphone: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/></g>',
  proof: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8 14 2.5 2.5L16 11M8 7h8"/></g>',
  verify: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2 2.1 2.8-.2.7 2.7 2.4 1.5-1 2.6 1 2.6-2.4 1.5-.7 2.7-2.8-.2L12 21l-2-2.1-2.8.2-.7-2.7-2.4-1.5 1-2.6-1-2.6 2.4-1.5.7-2.7 2.8.2z"/><path d="m8.5 12 2.2 2.2 4.8-4.8" stroke="var(--kg-icon-accent,currentColor)"/></g>',
  offline: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9a10 10 0 0 1 13.5-.5M8 12a6 6 0 0 1 7.5-.3M11 15a2.2 2.2 0 0 1 2 0M4 4l16 16"/></g>',
  upload: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4m-4 4 4-4 4 4M5 15v5h14v-5"/></g>',
  download: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12m-4-4 4 4 4-4M5 19h14"/></g>',
  menu: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></g>',
  close: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="m5 5 14 14M19 5 5 19"/></g>',
  back: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m10 5-7 7 7 7M3 12h18"/></g>',
  more: '<g fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></g>',
  phone: '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h3l1 5-2 1c1.3 2.7 3.3 4.7 6 6l1-2 5 1v3c0 2.2-1.8 4-4 4C9.3 21 3 14.7 3 7c0-2.2 1.8-4 4-4z"/></g>',
  "bottom-nav": '<g stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 15h18M7 18h.01M12 18h.01M17 18h.01"/></g>',
});

await mkdir(resolve(root, "icons/svg"), { recursive: true });
for (const [name, body] of Object.entries(icons).sort(([a], [b]) => a.localeCompare(b))) {
  const titleId = `kg-icon-${name}-title`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-labelledby="${titleId}">\n  <title id="${titleId}">${name.replaceAll("-", " ")} icon</title>\n  ${body}\n</svg>\n`;
  await writeFile(resolve(root, `icons/svg/kg-${name}.svg`), svg);
}

const loaderShell = (name, body, css) => `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" role="img" aria-labelledby="kg-loader-${name}-title">
  <title id="kg-loader-${name}-title">${name.replaceAll("-", " ")} loading</title>
  <style>${css}@media(prefers-reduced-motion:reduce){.moving{animation:none!important}}</style>
  ${body}
</svg>\n`;
const loaders = {
  "echo-scan": loaderShell("echo-scan", '<circle cx="24" cy="24" r="4" fill="var(--kg-accent,currentColor)"/><circle class="moving ring a" cx="24" cy="24" r="9" stroke="currentColor" stroke-width="3"/><circle class="moving ring b" cx="24" cy="24" r="9" stroke="currentColor" stroke-width="3"/>', '@keyframes echo{0%{r:7px;opacity:1}100%{r:20px;opacity:0}}.ring{animation:echo 1.4s ease-out infinite;transform-origin:24px 24px}.b{animation-delay:.7s}'),
  "deep-dive": loaderShell("deep-dive", '<path d="M8 13c6-4 10-4 16 0s10 4 16 0M8 24c6-4 10-4 16 0s10 4 16 0M8 35c6-4 10-4 16 0s10 4 16 0" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".28"/><circle class="moving dot" cx="24" cy="9" r="4" fill="var(--kg-accent,currentColor)"/>', '@keyframes dive{0%,100%{transform:translateY(0)}50%{transform:translateY(30px)}}.dot{animation:dive 1.6s cubic-bezier(.2,.8,.2,1) infinite}'),
  "surface-wave": loaderShell("surface-wave", '<path d="M8 13c6-4 10-4 16 0s10 4 16 0M8 24c6-4 10-4 16 0s10 4 16 0M8 35c6-4 10-4 16 0s10 4 16 0" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".28"/><circle class="moving dot" cx="24" cy="39" r="4" fill="var(--kg-accent,currentColor)"/>', '@keyframes rise{0%,100%{transform:translateY(0)}50%{transform:translateY(-30px)}}.dot{animation:rise 1.6s cubic-bezier(.2,.8,.2,1) infinite}'),
  "idea-pulse": loaderShell("idea-pulse", '<circle class="moving d1" cx="12" cy="24" r="4" fill="var(--kg-accent,currentColor)"/><circle class="moving d2" cx="24" cy="24" r="4" fill="var(--kg-accent,currentColor)"/><circle class="moving d3" cx="36" cy="24" r="4" fill="var(--kg-accent,currentColor)"/>', '@keyframes pulse{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}.moving{animation:pulse .9s ease-in-out infinite}.d2{animation-delay:.15s}.d3{animation-delay:.3s}'),
  "pearl-orbit": loaderShell("pearl-orbit", '<circle cx="24" cy="24" r="6" fill="currentColor"/><circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="3" opacity=".2"/><g class="moving orbit"><circle cx="24" cy="8" r="4" fill="var(--kg-accent,currentColor)"/></g>', '@keyframes orbit{to{transform:rotate(360deg)}}.orbit{animation:orbit 1.2s linear infinite;transform-origin:24px 24px}'),
  "current-pulse": loaderShell("current-pulse", '<path class="moving current" d="M7 18c6-4 11-4 17 0s11 4 17 0M7 30c6-4 11-4 17 0s11 4 17 0" stroke="var(--kg-accent,currentColor)" stroke-width="4" stroke-linecap="round"/>', '@keyframes current{0%,100%{opacity:.3;transform:translateX(-2px)}50%{opacity:1;transform:translateX(2px)}}.current{animation:current 1.2s ease-in-out infinite}'),
};
await mkdir(resolve(root, "loaders/svg"), { recursive: true });
for (const [name, svg] of Object.entries(loaders)) await writeFile(resolve(root, `loaders/svg/kg-loader-${name}.svg`), svg);

const vectorManifest = {
  icons: Object.keys(icons).sort().map((name) => ({ name, path: `icons/svg/kg-${name}.svg`, format: "svg", color: "currentColor", accent: "--kg-icon-accent" })),
  loaders: Object.keys(loaders).map((name) => ({ name, path: `loaders/svg/kg-loader-${name}.svg`, format: "animated-svg", reducedMotion: true })),
};
await mkdir(resolve(root, "manifests"), { recursive: true });
await writeFile(resolve(root, "manifests/vector-assets.json"), `${JSON.stringify(vectorManifest, null, 2)}\n`);
console.log(`Built ${vectorManifest.icons.length} icons and ${vectorManifest.loaders.length} loaders.`);
