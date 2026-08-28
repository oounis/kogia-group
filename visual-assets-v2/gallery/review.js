// Revue V2 — module montable. La galerie de production l'importe pour offrir la
// bascule Actuel / Revue V2 ; la page autonome de visual-assets-v2/ l'importe
// aussi. Une seule implémentation, deux hôtes.
//
// Tout est lu depuis visual-assets-v2/manifest.json : le manifeste de production
// ne référence jamais un candidat.

const libelle = (name) => name.replaceAll("-", " ");
const texte = async (path) => fetch(path).then((response) => response.text());

const ETATS = [["candidate", "candidat"], ["approved", "approuvé"], ["rejected", "rejeté"]];
const CLE = "kogia-v2-verdicts";

/**
 * @param {object} options
 * @param {string} options.base  chemin vers visual-assets-v2/ depuis la page hôte
 * @param {HTMLElement} options.mount  conteneur ; reçoit la classe .kg-v2
 */
export async function renderReviewV2({ base, mount }) {
  const [manifest, marque] = await Promise.all([
    fetch(`${base}/manifest.json`).then((response) => response.json()),
    fetch(`${base}/../brand/marque/manifest.json`).then((response) => response.json()),
  ]);
  const verdicts = JSON.parse(localStorage.getItem(CLE) || "{}");
  const url = (path) => `${base}/${path}`;
  const brandUrl = (path) => `${base}/../brand/${path}`;

  mount.classList.add("kg-v2");
  mount.dataset.bg = mount.dataset.bg || "light";
  mount.dataset.motion = "full";

  const controlesStatut = (id) => {
    const actuel = verdicts[id] || "candidate";
    const choix = ETATS.map(([valeur, mot]) =>
      `<button type="button" data-status="${valeur}" aria-pressed="${valeur === actuel}">${mot}</button>`).join("");
    return `<div class="status" data-asset="${id}">${choix}</div>`;
  };
  const carte = (id, corps) =>
    `<article class="card" data-verdict="${verdicts[id] || "candidate"}">${corps}${controlesStatut(id)}</article>`;

  // ── Sections ──────────────────────────────────────────────────────────────
  const niveaux = (await Promise.all(marque.tiers.map(async (asset) =>
    `<article class="card identity-card"><div class="identity-art">${await texte(brandUrl(asset.path))}</div>
     <strong>${asset.name}</strong><span class="meaning">${asset.reading}</span></article>`))).join("");

  const tuiles = new Map(marque.tiles.map((asset) => [asset.lane, asset]));
  const marques = (await Promise.all(marque.marks.filter((asset) => tuiles.has(asset.lane)).map(async (asset) => {
    const tuile = tuiles.get(asset.lane);
    return `<article class="card identity-card${asset.status === "proposé" ? " proposed" : ""}">
      <div class="mark-art"><img src="${brandUrl(tuile.path)}" alt="" class="tile">${await texte(brandUrl(asset.path))}</div>
      <strong>${asset.name}</strong><span class="meaning">${asset.color} · ${asset.status}</span></article>`;
  }))).join("");

  const loadersMarque = (await Promise.all(marque.loaders.map(async (asset) =>
    `<article class="card identity-card"><div class="identity-art mark-loader-art">${await texte(brandUrl(asset.path))}</div>
     <strong>${asset.name}</strong><span class="meaning">${asset.usage}</span></article>`))).join("");

  const approuves = manifest.baseline.approvedAvatars.map((asset) =>
    `<article class="card"><img class="avatar-art" src="${url(asset.path)}" alt="${libelle(asset.name)}">
     <strong>${asset.name}</strong>
     <div class="actual"><img class="avatar-40" src="${url(asset.path)}" alt="">40 px</div>
     <span class="meaning">approuvé · référence V1</span></article>`).join("");

  // Ces huit noms tournent déjà en production : on montre le prédécesseur à
  // côté, sinon Othman compare un candidat à rien.
  const candidats = manifest.avatars.map((asset) => carte(`avatar:${asset.name}`,
    asset.v1
      ? `<div class="pair">
           <figure><img class="avatar-art" src="${url(asset.v1)}" alt=""><figcaption>en production</figcaption></figure>
           <figure class="v2-side"><img class="avatar-art" src="${url(asset.path)}" alt="${libelle(asset.name)}"><figcaption>V2</figcaption></figure>
         </div>
         <strong>${asset.name}</strong>
         <div class="actual"><img class="avatar-40" src="${url(asset.v1)}" alt="">
           <img class="avatar-40" src="${url(asset.path)}" alt="">40 px réels</div>
         <p class="meaning">${asset.meaning}</p>`
      : `<img class="avatar-art" src="${url(asset.path)}" alt="${libelle(asset.name)}">
         <strong>${asset.name}</strong>
         <div class="actual"><img class="avatar-40" src="${url(asset.path)}" alt="">40 px</div>
         <p class="meaning">${asset.meaning}</p>`)).join("");

  const reactions = manifest.reactions.map((asset) => carte(`reaction:${asset.name}`,
    `<div class="pair">
       <figure><img class="reaction-art" src="${url(asset.v1)}" alt=""><figcaption>V1</figcaption></figure>
       <figure class="v2-side"><img class="reaction-art" src="${url(asset.path)}" alt="${libelle(asset.name)}"><figcaption>V2</figcaption></figure>
     </div>
     <strong>${asset.meaning}</strong>
     <div class="actual"><img class="reaction-32" src="${url(asset.v1)}" alt="">
       <img class="reaction-32" src="${url(asset.path)}" alt="">32 px réels</div>`)).join("");

  const icones = (await Promise.all(manifest.icons.map(async (asset) => {
    const [v1, v2] = await Promise.all([texte(url(asset.v1)), texte(url(asset.path))]);
    return carte(`icon:${asset.name}`,
      `<div class="pair">
         <figure><div class="svg-art">${v1}</div><figcaption>V1</figcaption></figure>
         <figure class="v2-side"><div class="svg-art">${v2}</div><figcaption>V2</figcaption></figure>
       </div>
       <strong>${asset.meaning}</strong>
       <div class="actual"><div class="svg-art svg-20">${v1}</div>
         <div class="svg-art svg-20">${v2}</div>20 px réels</div>`);
  }))).join("");

  const loaders = (await Promise.all(manifest.loaders.map(async (asset) =>
    carte(`loader:${asset.name}`,
      `<div class="loader-art">${await texte(url(asset.path))}</div>
       <strong>${asset.name}</strong><p class="meaning">${asset.usage}</p>`)))).join("");
  const reviewTotal = manifest.avatars.length + manifest.reactions.length + manifest.icons.length + manifest.loaders.length;

  mount.innerHTML = `
    <div class="review-bar">
      <label>Fond <select id="kg-v2-bg">
        <option value="light">Clair</option>
        <option value="abyss">Abysse (sombre)</option>
        <option value="checker">Damier (alpha)</option>
        <option value="product">Produit actif</option>
      </select></label>
      <label><input type="checkbox" id="kg-v2-motion"> Simuler « mouvement réduit »</label>
      <span id="kg-v2-summary"></span>
      <button type="button" id="kg-v2-export">Exporter les verdicts</button>
      <button type="button" id="kg-v2-reset">Tout remettre à « candidat »</button>
    </div>
    <section>
      <div class="section-title"><h2>Account levels</h2>
        <p>Socle identitaire partagé, inchangé en V2. La couleur suit le produit actif.</p></div>
      <div class="grid identity-grid tiers">${niveaux}</div>
    </section>
    <section>
      <div class="section-title"><h2>The mark, per product</h2>
        <p>Un seul tracé de marque ; seuls le couloir couleur et la tuile changent.</p></div>
      <div class="grid identity-grid marks">${marques}</div>
    </section>
    <section>
      <div class="section-title"><h2>Loading states, from the mark</h2>
        <p>Les six états identitaires officiels restent la première famille de chargement.</p></div>
      <div class="grid identity-grid mark-loaders">${loadersMarque}</div>
    </section>
    <section>
      <div class="section-title"><h2>Character avatars</h2>
        <p>Six références approuvées, puis huit candidats V2 comparés à la production à 40 px.</p></div>
      <h3>Approuvés (V1, référence)</h3>
      <div class="grid avatars">${approuves}</div>
      <h3>Candidats V2, à côté de la version déjà en production</h3>
      <div id="kg-v2-avatars" class="grid">${candidats}</div>
    </section>
    <section>
      <div class="section-title"><h2>Custom reactions</h2>
        <p>Vue de revue à 92 px, puis la taille réelle d'usage à 32 px.</p></div>
      <div class="grid compare">${reactions}</div>
    </section>
    <section>
      <div class="section-title"><h2>Functional icons</h2>
        <p>Seuls les concepts propres à Kogia sont remplacés. Usage réel à 20 px.</p></div>
      <div class="grid compare">${icones}</div>
    </section>
    <section>
      <div class="section-title"><h2>Loading states</h2>
        <p>Le mouvement vit dans le CSS de la galerie. Image fixe sous <code>prefers-reduced-motion</code>.</p></div>
      <div class="grid loaders">${loaders}</div>
    </section>`;

  // ── Contrôles ─────────────────────────────────────────────────────────────
  const resume = mount.querySelector("#kg-v2-summary");
  const resumer = () => {
    const valeurs = Object.values(verdicts);
    const oui = valeurs.filter((valeur) => valeur === "approved").length;
    const non = valeurs.filter((valeur) => valeur === "rejected").length;
    resume.textContent = oui + non === 0
      ? "Aucun verdict enregistré."
        : `${oui} approuvés · ${non} rejetés · ${reviewTotal - oui - non} en attente sur ${reviewTotal}.`;
  };

  mount.querySelector("#kg-v2-bg").addEventListener("change", (event) => {
    mount.dataset.bg = event.target.value;
  });
  mount.querySelector("#kg-v2-motion").addEventListener("change", (event) => {
    mount.dataset.motion = event.target.checked ? "reduced" : "full";
  });

  mount.addEventListener("click", (event) => {
    const bouton = event.target.closest(".status button");
    if (!bouton) return;
    const groupe = bouton.closest(".status");
    verdicts[groupe.dataset.asset] = bouton.dataset.status;
    for (const frere of groupe.querySelectorAll("button")) {
      frere.setAttribute("aria-pressed", String(frere === bouton));
    }
    groupe.closest(".card").dataset.verdict = bouton.dataset.status;
    localStorage.setItem(CLE, JSON.stringify(verdicts));
    resumer();
  });

  mount.querySelector("#kg-v2-export").addEventListener("click", async () => {
    const charge = JSON.stringify({ package: "visual-assets-v2", version: manifest.version, verdicts }, null, 2);
    try {
      await navigator.clipboard.writeText(charge);
      resume.textContent = "Verdicts copiés dans le presse-papiers.";
    } catch {
      // Sans permission presse-papiers, la console reste un canal fiable.
      console.log(charge);
      resume.textContent = "Verdicts écrits dans la console.";
    }
  });

  mount.querySelector("#kg-v2-reset").addEventListener("click", () => {
    for (const cle of Object.keys(verdicts)) delete verdicts[cle];
    localStorage.removeItem(CLE);
    for (const groupe of mount.querySelectorAll(".status")) {
      for (const bouton of groupe.querySelectorAll("button")) {
        bouton.setAttribute("aria-pressed", String(bouton.dataset.status === "candidate"));
      }
      groupe.closest(".card").dataset.verdict = "candidate";
    }
    resumer();
  });

  resumer();
  return manifest;
}

/**
 * Câble une bascule Actuel / Revue V2 entre deux conteneurs. La revue n'est
 * construite qu'au premier passage : la galerie de production démarre inchangée.
 */
export function wireModeSwitch({ buttons, current, review, base }) {
  let monte = false;
  const basculer = async (mode) => {
    for (const bouton of buttons) bouton.setAttribute("aria-selected", String(bouton.dataset.mode === mode));
    current.hidden = mode !== "current";
    review.hidden = mode !== "v2";
    if (mode === "v2" && !monte) {
      monte = true;
      await renderReviewV2({ base, mount: review });
      review.dispatchEvent(new CustomEvent("kg-v2-ready", { bubbles: true }));
    }
  };
  for (const bouton of buttons) bouton.addEventListener("click", () => basculer(bouton.dataset.mode));
  return basculer;
}
