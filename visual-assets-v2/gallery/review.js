// Revue V2 — lit uniquement visual-assets-v2/manifest.json.
// Le mode « Actuel » charge la galerie de production dans une iframe, telle
// qu'elle est servie : aucun octet de visual-assets/ n'est modifié ici.
const root = "..";
const manifest = await fetch(`${root}/manifest.json`).then((response) => response.json());
const texte = async (path) => fetch(path).then((response) => response.text());
const libelle = (name) => name.replaceAll("-", " ");

// ── Contrôles d'en-tête ─────────────────────────────────────────────────────
const product = document.querySelector("#product");
for (const [id, item] of Object.entries(manifest.products)) product.add(new Option(item.name, id));
product.addEventListener("change", () => { document.documentElement.dataset.kogiaProduct = product.value; });

const background = document.querySelector("#background");
const appliquerFond = () => { document.body.dataset.bg = background.value; };
background.addEventListener("change", appliquerFond);
appliquerFond();

document.querySelector("#freeze-motion").addEventListener("change", (event) => {
  document.body.dataset.motion = event.target.checked ? "reduced" : "full";
});

// ── Bascule Actuel / Revue V2 ───────────────────────────────────────────────
const frame = document.querySelector("#current-frame");
const boutons = [...document.querySelectorAll(".mode-switch button")];
function basculer(mode) {
  for (const bouton of boutons) bouton.setAttribute("aria-selected", String(bouton.dataset.mode === mode));
  document.querySelector("#mode-current").hidden = mode !== "current";
  document.querySelector("#mode-v2").hidden = mode !== "v2";
  // Chargée à la demande : la production ne démarre que si Othman la demande.
  if (mode === "current" && !frame.src) frame.src = "../../visual-assets/gallery/index.html";
}
for (const bouton of boutons) bouton.addEventListener("click", () => basculer(bouton.dataset.mode));
basculer("v2");

// ── Verdicts : candidat / approuvé / rejeté, gardés localement ──────────────
const CLE = "kogia-v2-verdicts";
const verdicts = JSON.parse(localStorage.getItem(CLE) || "{}");
const ETATS = [["candidate", "candidat"], ["approved", "approuvé"], ["rejected", "rejeté"]];

const controlesStatut = (id) => {
  const actuel = verdicts[id] || "candidate";
  const choix = ETATS.map(([valeur, texte]) =>
    `<button type="button" data-status="${valeur}" aria-pressed="${valeur === actuel}">${texte}</button>`).join("");
  return `<div class="status" data-asset="${id}">${choix}</div>`;
};

function resumer() {
  const valeurs = Object.values(verdicts);
  const approuves = valeurs.filter((valeur) => valeur === "approved").length;
  const rejetes = valeurs.filter((valeur) => valeur === "rejected").length;
  const total = manifest.total;
  document.querySelector("#verdict-summary").textContent = approuves + rejetes === 0
    ? "Aucun verdict enregistré."
    : `${approuves} approuvés · ${rejetes} rejetés · ${total - approuves - rejetes} en attente sur ${total}.`;
}

document.addEventListener("click", (event) => {
  const bouton = event.target.closest(".status button");
  if (!bouton) return;
  const groupe = bouton.closest(".status");
  const id = groupe.dataset.asset;
  verdicts[id] = bouton.dataset.status;
  for (const frere of groupe.querySelectorAll("button")) {
    frere.setAttribute("aria-pressed", String(frere === bouton));
  }
  groupe.closest(".card").dataset.verdict = bouton.dataset.status;
  localStorage.setItem(CLE, JSON.stringify(verdicts));
  resumer();
});

document.querySelector("#export-verdicts").addEventListener("click", async () => {
  const charge = JSON.stringify({ package: "visual-assets-v2", version: manifest.version, verdicts }, null, 2);
  try {
    await navigator.clipboard.writeText(charge);
    document.querySelector("#verdict-summary").textContent = "Verdicts copiés dans le presse-papiers.";
  } catch {
    // Sans permission presse-papiers, la console reste un canal fiable.
    console.log(charge);
    document.querySelector("#verdict-summary").textContent = "Verdicts écrits dans la console.";
  }
});

document.querySelector("#reset-verdicts").addEventListener("click", () => {
  for (const cle of Object.keys(verdicts)) delete verdicts[cle];
  localStorage.removeItem(CLE);
  for (const groupe of document.querySelectorAll(".status")) {
    for (const bouton of groupe.querySelectorAll("button")) {
      bouton.setAttribute("aria-pressed", String(bouton.dataset.status === "candidate"));
    }
    groupe.closest(".card").dataset.verdict = "candidate";
  }
  resumer();
});

const carte = (id, corps) =>
  `<article class="card" data-verdict="${verdicts[id] || "candidate"}">${corps}${controlesStatut(id)}</article>`;

// ── 1. Avatars : les six approuvés, puis les huit candidats ─────────────────
document.querySelector("#avatars-approved").innerHTML = manifest.baseline.approvedAvatars.map((asset) =>
  `<article class="card"><img class="avatar-art" src="${root}/${asset.path}" alt="${libelle(asset.name)}">
   <strong>${asset.name}</strong>
   <div class="actual"><img class="avatar-40" src="${root}/${asset.path}" alt="">40 px</div>
   <span class="meaning">approuvé · référence V1</span></article>`).join("");

// Ces huit noms tournent déjà en production : on montre le prédécesseur à côté,
// sinon Othman compare un candidat à rien.
document.querySelector("#avatars-v2").innerHTML = manifest.avatars.map((asset) => carte(`avatar:${asset.name}`,
  asset.v1
    ? `<div class="pair">
         <figure><img class="avatar-art" src="${root}/${asset.v1}" alt=""><figcaption>en production</figcaption></figure>
         <figure class="v2-side"><img class="avatar-art" src="${root}/${asset.path}" alt="${libelle(asset.name)}"><figcaption>V2</figcaption></figure>
       </div>
       <strong>${asset.name}</strong>
       <div class="actual">
         <img class="avatar-40" src="${root}/${asset.v1}" alt="">
         <img class="avatar-40" src="${root}/${asset.path}" alt="">40 px réels
       </div>
       <p class="meaning">${asset.meaning}</p>`
    : `<img class="avatar-art" src="${root}/${asset.path}" alt="${libelle(asset.name)}">
       <strong>${asset.name}</strong>
       <div class="actual"><img class="avatar-40" src="${root}/${asset.path}" alt="">40 px</div>
       <p class="meaning">${asset.meaning}</p>`)).join("");

// ── 2. Réactions : V1 contre V2, à 92 px puis à 32 px réels ────────────────
document.querySelector("#reactions").innerHTML = manifest.reactions.map((asset) => carte(`reaction:${asset.name}`,
  `<div class="pair">
     <figure><img class="reaction-art" src="${root}/${asset.v1}" alt=""><figcaption>V1</figcaption></figure>
     <figure class="v2-side"><img class="reaction-art" src="${root}/${asset.path}" alt="${libelle(asset.name)}"><figcaption>V2</figcaption></figure>
   </div>
   <strong>${asset.meaning}</strong>
   <div class="actual">
     <img class="reaction-32" src="${root}/${asset.v1}" alt="">
     <img class="reaction-32" src="${root}/${asset.path}" alt="">32 px réels
   </div>`)).join("");

// ── 3. Icônes sémantiques : V1 contre V2, à 32 px puis à 20 px réels ───────
const icones = await Promise.all(manifest.icons.map(async (asset) => {
  const [v1, v2] = await Promise.all([texte(`${root}/${asset.v1}`), texte(`${root}/${asset.path}`)]);
  return carte(`icon:${asset.name}`,
    `<div class="pair">
       <figure><div class="svg-art">${v1}</div><figcaption>V1</figcaption></figure>
       <figure class="v2-side"><div class="svg-art">${v2}</div><figcaption>V2</figcaption></figure>
     </div>
     <strong>${asset.meaning}</strong>
     <div class="actual">
       <div class="svg-art svg-20">${v1}</div>
       <div class="svg-art svg-20">${v2}</div>20 px réels
     </div>`);
}));
document.querySelector("#icons").innerHTML = icones.join("");

// ── 4. Loaders : quatre rôles, mouvement appliqué par review.css ───────────
const loaders = await Promise.all(manifest.loaders.map(async (asset) =>
  carte(`loader:${asset.name}`,
    `<div class="loader-art">${await texte(`${root}/${asset.path}`)}</div>
     <strong>${asset.name}</strong><p class="meaning">${asset.usage}</p>`)));
document.querySelector("#loaders").innerHTML = loaders.join("");

// ── 5. Objets du monde : 128 / 64 / 40 ─────────────────────────────────────
document.querySelector("#world").innerHTML = manifest.worldElements.map((asset) => carte(`world:${asset.name}`,
  `<div class="world-sizes">
     ${asset.sizes.map((taille) => `<img class="w${taille}" src="${root}/${asset.path}" alt="${libelle(asset.name)}">`).join("")}
   </div>
   <strong>${libelle(asset.name)}</strong><p class="meaning">${asset.meaning}</p>`)).join("");

// ── 6. Planches de direction ───────────────────────────────────────────────
document.querySelector("#boards").innerHTML = manifest.directionBoards.map((asset) => carte(`board:${asset.name}`,
  `<img src="${root}/${asset.path}" alt="${libelle(asset.name)}">
   <strong>${libelle(asset.name)}</strong><p class="meaning">${asset.caption}</p>`)).join("");

resumer();
