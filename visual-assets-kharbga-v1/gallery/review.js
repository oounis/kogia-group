const pretty = (name) => name.replaceAll("-", " ");

export async function renderKharbgaV1({ base, mount }) {
  const manifest = await fetch(`${base}/manifest.json`).then((response) => response.json());
  const asset = (path) => `${base}/${path}`;
  const pieces = Object.fromEntries(manifest.pieces.map((piece) => [piece.name, piece]));
  mount.classList.add("kh2");
  mount.innerHTML = `
    <section class="kh2-benchmark"><span>Visual candidate · V1</span><h2>The board is the product.</h2><p>This first direction established competitive-game hierarchy, opponent, board, player and action panel. Its ranked pieces remain a historical candidate, not authentic Classic Kharbga.</p><div><b>60%</b> Kharbga war-council styling <i></i><b>40%</b> Kogia personality</div></section>
    <section class="kh2-game" data-board-theme="oasis">
      <nav class="kh2-rail" aria-label="Game navigation"><strong><i></i>KHARBGA</strong><button class="is-active">⚔ <span>Play</span></button><button>◇ <span>Puzzles</span></button><button>◉ <span>Learn</span></button><button>☰ <span>Community</span></button><small>War Council · V1</small></nav>
      <main class="kh2-stage">
        <div class="kh2-player"><img src="${asset("profiles/png/tarek.png")}" alt=""><div><strong>Tarek</strong><span>Chain Hunter · 1950</span></div><time>10:00</time></div>
        <div id="kh2-board" class="kh2-board" role="grid" aria-label="Kharbga board"></div>
        <div class="kh2-player"><img src="${asset("profiles/png/lila.png")}" alt=""><div><strong>Lila</strong><span>Kogia Inventor · 1100</span></div><time>10:00</time></div>
      </main>
      <aside class="kh2-panel"><div class="kh2-tabs"><button class="is-active">New battle</button><button>Games</button><button>Council</button></div><div class="kh2-panel-body"><span>Game direction</span><div class="kh2-segment"><button data-kh2-mode="war" aria-pressed="true">War Council 8×8</button><button data-kh2-mode="classic">Heritage 7×7</button></div><label>Time control<button class="kh2-select">◷ 10 min · Rapid <b>⌄</b></button></label><button class="kh2-start">Start Battle</button><button class="kh2-secondary">✦ Custom challenge</button><button class="kh2-secondary">◌ Play a friend</button><button class="kh2-secondary">◆ Tournament</button><p id="kh2-rule-note">Six roles, two war councils, chess-like strategic hierarchy. A new Kharbga variant—not the traditional rules.</p></div><footer><b>2,406</b> playing now · <b>18,820</b> battles today</footer></aside>
    </section>
    <section class="kh2-review-section"><header><span>01 · silhouette system</span><h3>Six roles, two councils</h3><p>Each role survives at actual board size. Sand and Night differ first by value, then by material.</p></header><div class="kh2-piece-grid">${manifest.pieces.map((piece) => `<article><div><img src="${asset(piece.sand)}" alt="Sand ${piece.name}"><img src="${asset(piece.night)}" alt="Night ${piece.name}"></div><strong>${pretty(piece.name)}</strong><p>${piece.character}</p></article>`).join("")}</div></section>
    <section class="kh2-review-section"><header><span>02 · opponents</span><h3>People worth remembering</h3><p>Different ages, moods and play styles. Human warmth replaces the rejected stone robots.</p></header><div class="kh2-profile-grid">${manifest.profiles.map((profile) => `<article><img src="${asset(profile.path)}" alt="${profile.name}"><div><strong>${profile.name}</strong><span>${profile.title}</span><b>${profile.rating}</b></div></article>`).join("")}</div></section>
    <section class="kh2-review-section"><header><span>03 · table talk</span><h3>Reactions with faces</h3><p>No borrowed emoji language. Every response belongs to the same war council.</p></header><div class="kh2-reaction-grid">${manifest.reactions.map((name) => `<article><img src="${asset(`reactions/png/${name}.png`)}" alt="${pretty(name)}"><strong>${pretty(name)}</strong><img class="is-actual" src="${asset(`reactions/png/${name}.png`)}" alt=""><small>32 px</small></article>`).join("")}</div></section>
    <section class="kh2-review-section"><header><span>04 · loading language</span><h3>Motion from play</h3><p>Three CSS loaders use the new pieces and board geometry; nothing decorative spins without meaning.</p></header><div class="kh2-loaders"><article><div class="kh2-loader piece"><img src="${asset(pieces.footguard.sand)}" alt=""></div><strong>Finding opponent</strong></article><article><div class="kh2-loader citadel"><i></i><i></i><i></i></div><strong>Preparing board</strong></article><article><div class="kh2-loader route"><i></i><i></i><i></i></div><strong>Calculating lines</strong></article></div></section>
    <section class="kh2-review-section"><header><span>05 · source boards</span><h3>Full art direction</h3><p>Preserved before extraction so consistency can be reviewed honestly.</p></header><div class="kh2-direction-grid">${manifest.directionBoards.map((board) => `<article><img src="${asset(board.path)}" alt="${board.name}"><strong>${board.name}</strong></article>`).join("")}</div></section>`;

  const board = mount.querySelector("#kh2-board");
  const renderBoard = (mode) => {
    if (mode === "classic") renderClassic(board, pieces, asset);
    else renderWar(board, pieces, asset);
    mount.querySelector("#kh2-rule-note").textContent = mode === "classic"
      ? "Authentic 7×7 visual guardrail: 24 equal stones per side and one central Citadel. No role hierarchy."
      : "Six roles, two war councils, chess-like strategic hierarchy. A new Kharbga variant—not the traditional rules.";
  };
  mount.addEventListener("click", (event) => {
    const button = event.target.closest("[data-kh2-mode]");
    if (!button) return;
    mount.querySelectorAll("[data-kh2-mode]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    renderBoard(button.dataset.kh2Mode);
  });
  renderBoard("war");
  return manifest;
}

function cell(index, size, source, citadel = false) {
  return `<div class="kh2-cell${citadel ? " is-citadel" : ""}" role="gridcell" aria-label="cell ${index + 1}">${source ? `<img src="${source}" alt="">` : ""}</div>`;
}

function renderWar(board, pieces, asset) {
  const order = ["citadel-guard", "sand-rider", "oracle", "war-captain", "clan-elder", "oracle", "sand-rider", "citadel-guard"];
  const occupied = new Map();
  order.forEach((role, column) => { occupied.set(column, asset(pieces[role].night)); occupied.set(56 + column, asset(pieces[role].sand)); });
  for (let column = 0; column < 8; column++) { occupied.set(8 + column, asset(pieces.footguard.night)); occupied.set(48 + column, asset(pieces.footguard.sand)); }
  board.className = "kh2-board is-war";
  board.innerHTML = Array.from({ length: 64 }, (_, index) => cell(index, 8, occupied.get(index))).join("");
}

function renderClassic(board, pieces, asset) {
  const occupied = new Map();
  for (let index = 0; index < 49; index++) if (index !== 24) occupied.set(index, asset(index < 24 ? pieces.footguard.night : pieces.footguard.sand));
  board.className = "kh2-board is-classic";
  board.innerHTML = Array.from({ length: 49 }, (_, index) => cell(index, 7, occupied.get(index), index === 24)).join("");
}
