const root = "..";
const brand = "../../brand";
const manifest = await fetch(`${root}/manifests/assets.json`).then((response) => response.json());
const select = document.querySelector("#product");
for (const [id, product] of Object.entries(manifest.products)) select.add(new Option(product.name, id));
const REVIEW = {
  current: { version: "Shared V1", categories: 7 },
  v2: { version: "Shared V2 candidate", categories: 7 },
  kharbga: { version: "Kharbga V3.2", categories: 21, product: "kharbga" },
  faz3a: { version: "Faz3a V1", categories: 18, product: "faz3a" },
  group: { version: "KogiaGroup V1", categories: 18, product: "group" },
};
const PRODUCT_REVIEW = { kharbga: "kharbga", faz3a: "faz3a", group: "group" };
const officialProduct = document.querySelector("#official-product");
const officialVersion = document.querySelector("#official-version");
const officialCategories = document.querySelector("#official-categories");
let activeMode = "current";

function applyProduct(product) {
  const safe = manifest.products[product] ? product : "group";
  select.value = safe;
  document.documentElement.dataset.kogiaProduct = safe;
  return safe;
}

function updateOfficialStatus(mode) {
  const review = REVIEW[mode];
  const product = select.value;
  officialProduct.textContent = manifest.products[product].name;
  officialVersion.textContent = review.version;
  officialCategories.textContent = `${review.categories} complete categories`;
  document.documentElement.dataset.kogiaReview = mode;
  const url = new URL(location.href);
  url.searchParams.set("product", product);
  url.searchParams.set("review", mode);
  history.replaceState(null, "", url);
}

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

  if (marque.loaders) {
    const loaders = await Promise.all(marque.loaders.map(async (l) =>
      `<article class="card tier"><div class="tier-art">${await texte(`${brand}/${l.path}`)}</div><strong>${l.name}</strong><span>${l.usage}</span></article>`));
    document.querySelector("#mark-loaders").innerHTML = loaders.join("");
  }
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

// ── Cinq vues, montées uniquement au premier passage ───────────────────────
// Actuel et Revue V2 documentent l'art partagé. Kharbga, Faz3a et KogiaGroup
// possèdent chacun une revue produit structurée selon leurs vrais usages.
const buttons = [...document.querySelectorAll(".kg-mode-switch button")];
const current = document.querySelector("#current-gallery");
const v2 = document.querySelector("#v2-review");
const kharbga = document.querySelector("#kharbga-review");
const faz3a = document.querySelector("#faz3a-review");
const group = document.querySelector("#group-review");
let v2Mounted = false;
let kharbgaMounted = false;
let faz3aMounted = false;
let groupMounted = false;

async function switchMode(mode) {
  if (!REVIEW[mode]) mode = "current";
  activeMode = mode;
  if (REVIEW[mode].product) applyProduct(REVIEW[mode].product);
  buttons.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.mode === mode)));
  current.hidden = mode !== "current";
  v2.hidden = mode !== "v2";
  kharbga.hidden = mode !== "kharbga";
  faz3a.hidden = mode !== "faz3a";
  group.hidden = mode !== "group";

  if (mode === "v2" && !v2Mounted) {
    v2Mounted = true;
    const { renderReviewV2 } = await import("../../visual-assets-v2/gallery/review.js");
    await renderReviewV2({ base: "../../visual-assets-v2", mount: v2 });
    v2.dispatchEvent(new CustomEvent("kg-v2-ready", { bubbles: true }));
  }
  if (mode === "kharbga" && !kharbgaMounted) {
    kharbgaMounted = true;
    const { renderKharbgaCatalogue } = await import("../../visual-assets-kharbga-v2/gallery/catalogue.js?v=20260822-refined");
    await renderKharbgaCatalogue({ base: "../../visual-assets-kharbga-v2", mount: kharbga });
    kharbga.dispatchEvent(new CustomEvent("kharbga-ready", { bubbles: true }));
  }
  if (mode === "faz3a" && !faz3aMounted) {
    faz3aMounted = true;
    const { renderFaz3aCatalogue } = await import("../../visual-assets-faz3a-v1/gallery/catalogue.js?v=20260822-product");
    await renderFaz3aCatalogue({ sharedBase: "../../visual-assets-v2", mount: faz3a });
    faz3a.dispatchEvent(new CustomEvent("faz3a-ready", { bubbles: true }));
  }
  if (mode === "group" && !groupMounted) {
    groupMounted = true;
    const { renderGroupCatalogue } = await import("../../visual-assets-group-v1/gallery/catalogue.js?v=20260822-product");
    await renderGroupCatalogue({ sharedBase: "../../visual-assets-v2", brandBase: "../../brand", mount: group });
    group.dispatchEvent(new CustomEvent("group-ready", { bubbles: true }));
  }
  updateOfficialStatus(mode);
}
buttons.forEach((button) => button.addEventListener("click", () => switchMode(button.dataset.mode)));
select.addEventListener("change", () => {
  const product = applyProduct(select.value);
  switchMode(PRODUCT_REVIEW[product] || "v2");
});

const initial = new URL(location.href).searchParams;
const initialProduct = applyProduct(initial.get("product") || "group");
const requestedMode = initial.get("review");
await switchMode(REVIEW[requestedMode] ? requestedMode : (initial.has("product") ? (PRODUCT_REVIEW[initialProduct] || "v2") : "current"));
