const root = "..";
const manifest = await fetch(`${root}/manifests/assets.json`).then((response) => response.json());
const select = document.querySelector("#product");
for (const [id, product] of Object.entries(manifest.products)) select.add(new Option(product.name, id));
select.addEventListener("change", () => document.documentElement.dataset.kogiaProduct = select.value);

const rasterCard = (asset, className) => `<article class="card"><img class="art ${className}" src="${root}/${asset.path}" alt="${asset.name.replaceAll("-", " ")}"><span>${asset.name}</span></article>`;
document.querySelector("#avatars").innerHTML = manifest.avatars.map((asset) => rasterCard(asset, "avatar-art")).join("");
document.querySelector("#reactions").innerHTML = manifest.reactions.map((asset) => rasterCard(asset, "reaction-art")).join("");

async function vectorCards(items, loader = false) {
  return Promise.all(items.map(async (asset) => {
    const svg = await fetch(`${root}/${asset.path}`).then((response) => response.text());
    return `<article class="card"><div class="svg-art ${loader ? "loader-art" : ""}">${svg}</div><span>${asset.name}</span></article>`;
  }));
}
document.querySelector("#icons").innerHTML = (await vectorCards(manifest.icons)).join("");
document.querySelector("#loaders").innerHTML = (await vectorCards(manifest.loaders, true)).join("");
