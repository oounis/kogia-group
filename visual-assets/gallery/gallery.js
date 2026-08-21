const root = "..";
const brand = "../../brand";
const manifest = await fetch(`${root}/manifests/assets.json`).then((response) => response.json());
const select = document.querySelector("#product");
for (const [id, product] of Object.entries(manifest.products)) select.add(new Option(product.name, id));
select.addEventListener("change", () => document.documentElement.dataset.kogiaProduct = select.value);

const texte = async (path) => fetch(path).then((response) => response.text());

// ── Identité : la marque, depuis brand/ (jamais copiée ici) ─────────────────
const marque = await fetch(`${brand}/marque/manifest.json`).then((r) => r.json()).catch(() => null);
if (marque) {
  const tiers = await Promise.all(marque.tiers.map(async (t) =>
    `<article class="card tier"><div class="tier-art">${await texte(`${brand}/${t.path}`)}</div><strong>${t.name}</strong><span>${t.reading}</span></article>`));
  document.querySelector("#tiers").innerHTML = tiers.join("");

  const tuiles = new Map(marque.tiles.map((t) => [t.lane, t]));
  const marks = await Promise.all(marque.marks.filter((m) => tuiles.has(m.lane)).map(async (m) => {
    const tuile = tuiles.get(m.lane);
    return `<article class="card mark-card${m.status === "proposé" ? " proposed" : ""}">
      <div class="mark-art"><img src="${brand}/${tuile.path}" alt="" class="tile">${await texte(`${brand}/${m.path}`)}</div>
      <strong>${m.name}</strong><span>${m.color} · ${m.status}</span></article>`;
  }));
  document.querySelector("#marks").innerHTML = marks.join("");
}

// ── Art partagé ─────────────────────────────────────────────────────────────
const rasterCard = (asset, className) => `<article class="card"><img class="art ${className}" src="${root}/${asset.path}" alt="${asset.name.replaceAll("-", " ")}"><span>${asset.name}</span></article>`;
document.querySelector("#avatars").innerHTML = manifest.avatars.map((asset) => rasterCard(asset, "avatar-art")).join("");
document.querySelector("#reactions").innerHTML = manifest.reactions.map((asset) => rasterCard(asset, "reaction-art")).join("");

async function vectorCards(items, loader = false) {
  return Promise.all(items.map(async (asset) => {
    const svg = await texte(`${root}/${asset.path}`);
    return `<article class="card"><div class="svg-art ${loader ? "loader-art" : ""}">${svg}</div><span>${asset.name}</span></article>`;
  }));
}
document.querySelector("#icons").innerHTML = (await vectorCards(manifest.icons)).join("");
document.querySelector("#loaders").innerHTML = (await vectorCards(manifest.loaders, true)).join("");
