import { architecture, boardSpec, categories, interfaceSurfaces, pieceClasses, product, screenshotInventory, stages } from "./spec.js";

const allRequirements = categories.flatMap((category) => category.requirements.map((requirement) => ({ ...requirement, category })));
const state = { query: "", stage: "all", priority: "all", status: "all", category: "all" };
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function populateFilters() {
  Object.entries(stages).forEach(([value, label]) => $("#stage-filter").insertAdjacentHTML("beforeend", `<option value="${value}">${escapeHtml(label)}</option>`));
  [...new Set(allRequirements.map(({ status }) => status))].sort().forEach((status) => $("#status-filter").insertAdjacentHTML("beforeend", `<option>${escapeHtml(status)}</option>`));
}

function renderMetrics() {
  const metrics = [
    [boardSpec.size * boardSpec.size, "board squares"],
    [boardSpec.totalDeployedPieces, "pieces after founding"],
    [categories.length, "technical categories"],
    [allRequirements.length, "build requirements"],
  ];
  $("#metrics").innerHTML = metrics.map(([value, label]) => `<article><strong>${value}</strong><span>${label}</span></article>`).join("");
  $("#sidebar-count").textContent = `${categories.length} categories`;
}

function renderNavigation() {
  const grouped = categories.reduce((map, category) => map.set(category.group, [...(map.get(category.group) || []), category]), new Map());
  $("#category-nav").innerHTML = [...grouped].map(([group, entries]) => `<section><h3>${escapeHtml(group)}</h3>${entries.map((category) => `<button type="button" data-category="${category.id}"><span>${escapeHtml(category.title)}</span><b>${category.requirements.length}</b></button>`).join("")}</section>`).join("");
  $("#category-nav").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    state.category = state.category === button.dataset.category ? "all" : button.dataset.category;
    renderRequirements();
    $("#requirements").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function renderBoardPreview() {
  const samplePieces = new Map([
    ["e5", ["p1", "compass", "Compass"]],
    ["e2", ["p1", "rampart", "Rampart"]],
    ["b5", ["p1", "strider", "Strider"]],
    ["d5", ["p1", "guard", "Guard"]],
    ["f5", ["p1", "guard", "Guard"]],
    ["e7", ["p2", "rampart", "Rampart"]],
    ["g7", ["p2", "compass", "Compass"]],
    ["c3", ["p2", "strider", "Strider"]],
    ["h4", ["p2", "guard", "Guard"]],
  ]);
  const cells = [];
  for (let rank = boardSpec.size; rank >= 1; rank -= 1) {
    boardSpec.files.forEach((file, fileIndex) => {
      const coordinate = `${file}${rank}`;
      const yellow = (fileIndex + rank - 1) % 2 === 0;
      const piece = samplePieces.get(coordinate);
      cells.push(`<div class="board-cell ${yellow ? "sand" : "stone"} ${coordinate === boardSpec.center ? "center" : ""}" data-coordinate="${coordinate}" aria-label="${coordinate}${piece ? ` ${piece[2]}` : ""}">
        <span>${coordinate}</span>
        ${piece ? `<i class="cw-piece mini ${piece[0]} ${piece[1]}" title="${piece[2]}"></i>` : ""}
      </div>`);
    });
  }
  $("#board-preview").innerHTML = cells.join("");
  $("#board-facts").innerHTML = [
    ["Board", `${boardSpec.size} x ${boardSpec.size}`],
    ["Coordinates", `${boardSpec.files[0]}1-${boardSpec.files.at(-1)}${boardSpec.size}`],
    ["Center", boardSpec.center],
    ["After founding", `${boardSpec.totalDeployedPieces} pieces / ${boardSpec.emptySquaresAfterFounding} empty`],
    ["Siege threshold", `${boardSpec.siegeWinThreshold} enemy pieces`],
  ].map(([label, value]) => `<article><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></article>`).join("");
}

function renderPieceShowcase() {
  $("#piece-showcase").innerHTML = pieceClasses.map((piece) => `<article class="piece-card ${piece.id}">
    <div class="piece-card-art"><i class="cw-piece large ${piece.id}" aria-hidden="true"></i></div>
    <div class="piece-card-copy">
      <span class="eyebrow">${escapeHtml(piece.label)} · ${escapeHtml(piece.code)}</span>
      <h3>${escapeHtml(piece.name)}</h3>
      <p>${escapeHtml(piece.movement)}</p>
      <small>${piece.countPerPlayer} per player${piece.selectedLimit ? ` · ${escapeHtml(piece.selectedLimit)}` : ""}</small>
    </div>
  </article>`).join("");
}

function renderSurfaces() {
  $("#surface-grid").innerHTML = interfaceSurfaces.map(([name, type, scope]) => `<article>
    <span>${escapeHtml(type)}</span>
    <h3>${escapeHtml(name)}</h3>
    <p>${escapeHtml(scope)}</p>
  </article>`).join("");
}

function renderArchitecture() {
  const labels = { clients: "Clients", core: "Shared game core", backend: "Platform services", data: "Data & infrastructure" };
  $("#architecture-grid").innerHTML = Object.entries(architecture).map(([key, items], index) => `<article><span class="layer">Layer ${index + 1}</span><h3>${labels[key]}</h3><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`).join("");
}

function matches(item) {
  const haystack = [item.id, item.title, item.requirement, item.category.title, item.category.summary, ...item.acceptance, ...item.dependencies].join(" ").toLowerCase();
  return (!state.query || haystack.includes(state.query)) && (state.stage === "all" || item.stage === state.stage) && (state.priority === "all" || item.priority === state.priority) && (state.status === "all" || item.status === state.status) && (state.category === "all" || item.category.id === state.category);
}

function requirementCard(item) {
  return `<article class="requirement-card" id="${slug(item.id)}">
    <div class="requirement-meta"><code>${escapeHtml(item.id)}</code><span class="pill priority-${item.priority.toLowerCase()}">${item.priority}</span><span class="pill status-${item.status}">${escapeHtml(item.status)}</span><span class="pill">${escapeHtml(stages[item.stage])}</span></div>
    <h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.requirement)}</p>
    <details><summary>Acceptance criteria <span>${item.acceptance.length}</span></summary><ul>${item.acceptance.map((criterion) => `<li>${escapeHtml(criterion)}</li>`).join("")}</ul>${item.dependencies.length ? `<div class="dependencies"><b>Dependencies</b> ${item.dependencies.map(escapeHtml).join(" · ")}</div>` : ""}</details>
  </article>`;
}

function renderRequirements() {
  const matching = allRequirements.filter(matches);
  const sections = categories.map((category) => {
    const requirements = matching.filter((item) => item.category.id === category.id);
    if (!requirements.length) return "";
    return `<section class="category-section" id="category-${category.id}"><header><div><span>${escapeHtml(category.group)}</span><h3>${escapeHtml(category.title)}</h3><p>${escapeHtml(category.summary)}</p></div><aside><b>${requirements.length}</b><span>requirements</span></aside></header>${category.screenshots?.length ? `<div class="screenshot-refs">Evidence ${category.screenshots.map((id) => `<a href="#shot-${slug(id)}">#${escapeHtml(id)}</a>`).join("")}</div>` : ""}<div class="requirement-grid">${requirements.map(requirementCard).join("")}</div></section>`;
  }).join("");
  $("#category-sections").innerHTML = sections;
  $("#result-count").textContent = `${matching.length} of ${allRequirements.length} requirements`;
  const active = [state.stage !== "all" && stages[state.stage], state.priority !== "all" && state.priority, state.status !== "all" && state.status, state.category !== "all" && categories.find(({ id }) => id === state.category)?.title, state.query && `"${state.query}"`].filter(Boolean);
  $("#active-filter").textContent = active.length ? `Filtered by ${active.join(" · ")}` : "Showing the complete CLAMP WARS build contract";
  $("#empty").hidden = matching.length > 0;
  document.querySelectorAll("#category-nav button").forEach((button) => button.classList.toggle("active", button.dataset.category === state.category));
}

function renderScreenshots() {
  $("#screenshot-grid").innerHTML = screenshotInventory.map(([id, title, observation]) => `<article id="shot-${slug(id)}"><span>#${escapeHtml(id)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(observation)}</p></article>`).join("");
}

function buildBrief() {
  const pieces = pieceClasses.map((piece) => `- ${piece.name} (${piece.label}, ${piece.code}): ${piece.countPerPlayer} per player. Movement: ${piece.movement}`).join("\n");
  const surfaces = interfaceSurfaces.map(([name, type, scope]) => `- ${name} (${type}): ${scope}`).join("\n");
  const requirements = allRequirements.map((item) => `- [${item.id}] ${item.title} (${item.priority}, ${stages[item.stage]}, ${item.status})\n  Requirement: ${item.requirement}\n  Acceptance: ${item.acceptance.join("; ")}${item.dependencies.length ? `\n  Dependencies: ${item.dependencies.join(", ")}` : ""}`).join("\n");
  return `# ${product.name} — ${product.version}\n\n${product.tagline}\n\n## Repository\nCreate a new independent repository named ${product.repository}.\n\n## Mission\n${product.purpose}\n\n## Boundary\n${product.warning}\n\n## Board\n- ${boardSpec.size}x${boardSpec.size}, coordinates a1-i9, center ${boardSpec.center}.\n- ${boardSpec.yellowSquares}\n- ${boardSpec.totalDeployedPieces} pieces after founding and ${boardSpec.emptySquaresAfterFounding} empty squares.\n- siegeWinThreshold = ${boardSpec.siegeWinThreshold}.\n\n## Pieces\n${pieces}\n\n## Web interfaces\n${surfaces}\n\n## Build order\n- Repository foundation\n- Board, coordinates, state model\n- Piece selection and founding\n- Movement, capture, chains, clocks\n- Sealed siege, result, replay data\n- Responsive UI, accessibility, smoke tests\n\n## Requirements\n${requirements}`;
}

function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  window.setTimeout(() => $("#toast").classList.remove("visible"), 2400);
}

async function copyBrief() {
  await navigator.clipboard.writeText(buildBrief());
  toast(`Claude brief copied · ${allRequirements.length} requirements`);
}

function exportJson() {
  const blob = new Blob([JSON.stringify({ product, boardSpec, pieceClasses, interfaceSurfaces, stages, architecture, categories, screenshotInventory }, null, 2)], { type: "application/json" });
  const link = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "clamp-wars-v0-1-contract.json" });
  link.click();
  URL.revokeObjectURL(link.href);
  toast("CLAMP WARS contract exported as JSON");
}

function bind() {
  $("#search").addEventListener("input", (event) => { state.query = event.target.value.trim().toLowerCase(); renderRequirements(); });
  [["#stage-filter", "stage"], ["#priority-filter", "priority"], ["#status-filter", "status"]].forEach(([selector, key]) => $(selector).addEventListener("change", (event) => { state[key] = event.target.value; renderRequirements(); }));
  $("#clear-filters").addEventListener("click", () => { Object.assign(state, { query: "", stage: "all", priority: "all", status: "all", category: "all" }); $("#search").value = ""; ["stage", "priority", "status"].forEach((key) => $(`#${key}-filter`).value = "all"); renderRequirements(); });
  ["#copy-brief", "#copy-brief-bottom"].forEach((selector) => $(selector).addEventListener("click", copyBrief));
  $("#export-json").addEventListener("click", exportJson);
}

populateFilters();
renderMetrics();
renderNavigation();
renderBoardPreview();
renderPieceShowcase();
renderSurfaces();
renderArchitecture();
renderRequirements();
renderScreenshots();
bind();
