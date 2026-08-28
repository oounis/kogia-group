const title = (value) => value.replaceAll("-", " ");

export async function renderKharbgaV2({ base, mount }) {
  const manifest = await fetch(`${base}/manifest.json`).then((response) => response.json());
  const url = (path) => `${base}/${path}`;
  let state = "placement";
  let skin = manifest.defaultSkin;
  const getSkin = () => manifest.skins.find((item) => item.id === skin);

  mount.classList.add("kh3");
  mount.innerHTML = `
    <section class="kh3-hero"><div><span>Authentic candidate · V2</span><h2>Forty-nine houses.<br>One living table.</h2><p>Kogia shapes the interface. Kharbga shapes every rule, piece and interaction.</p></div><div class="kh3-hero-mark"><b>7×7</b><i></i><small>24 equal Soldiers<br>per side</small></div></section>
    <section class="kh3-game">
      <div class="kh3-topbar"><strong><i></i>KHARBGA</strong><nav><button class="is-active">Play</button><button>Learn</button><button>Stories</button><button>Community</button></nav><span>Classic · Southern table</span></div>
      <div class="kh3-phase-ribbon" role="group" aria-label="Review a game state"><button data-kh3-state="placement" aria-pressed="true"><b>1</b><span>Placement<small>Two Soldiers each turn</small></span></button><button data-kh3-state="ready"><b>2</b><span>Board ready<small>Middle house stays empty</small></span></button><button data-kh3-state="opening"><b>3</b><span>Open the board<small>Attacker enters the middle</small></span></button><button data-kh3-state="capture"><b>4</b><span>Enclosure<small>Orthogonal sandwich</small></span></button><button data-kh3-state="exchange"><b>5</b><span>Exchange<small>One protected for two</small></span></button></div>
      <div class="kh3-table">
        <aside class="kh3-player is-attacker"><img src="${url("profiles/png/hamma.png")}" alt="Hamma"><span>Attacker</span><strong>Hamma</strong><small>Board Builder</small><div><img id="kh3-attacker-token" alt=""><b id="kh3-attacker-count">24</b> Soldiers</div></aside>
        <div class="kh3-board-wrap"><div class="kh3-board-head"><span id="kh3-state-label">Placement · turn 6</span><strong id="kh3-turn">Place two Soldiers</strong></div><div id="kh3-board" class="kh3-board" role="grid" aria-label="7 by 7 Kharbga board"></div><div class="kh3-board-legend"><span><i class="house"></i> house</span><span><i class="middle"></i> salty middle house</span><span><i class="route"></i> legal orthogonal route</span></div></div>
        <aside class="kh3-player is-defender"><img src="${url("profiles/png/aliya.png")}" alt="Aliya"><span>Defender</span><strong>Aliya</strong><small>Café Champion</small><div><img id="kh3-defender-token" alt=""><b id="kh3-defender-count">24</b> Soldiers</div></aside>
      </div>
      <div class="kh3-action-dock"><div><span id="kh3-instruction-kicker">Placement phase</span><strong id="kh3-instruction">Choose any two empty houses except the salty middle.</strong></div><button id="kh3-primary">Place first Soldier</button><button class="kh3-quiet">Rules</button><button class="kh3-quiet">⋯</button></div>
      <div class="kh3-community"><span>At the table</span>${["meriem","salah","noura","ammar","rim","naji"].map((name) => `<img src="${url(`profiles/png/${name}.png`)}" alt="${name}">`).join("")}<p>Advice travels around the circle. The move still belongs to the player.</p></div>
    </section>
    <section class="kh3-section"><div class="kh3-section-title"><span>01 · history without mythology</span><h3>Old enough to carry memory.<br>Honest enough to admit uncertainty.</h3></div><div class="kh3-history">${manifest.history.map((fact, index) => `<article><b>0${index + 1}</b><strong>${fact.title}</strong><p>${fact.body}</p></article>`).join("")}</div></section>
    <section class="kh3-section"><div class="kh3-section-title"><span>02 · one Soldier, many materials</span><h3>Difference without hierarchy.</h3><p>Switch the physical memory of the table. Rules and footprint never change.</p></div><div class="kh3-skin-switch">${manifest.skins.map((item) => `<button data-kh3-skin="${item.id}" aria-pressed="${item.id === skin}"><span><img src="${url(item.attacker)}" alt=""><img src="${url(item.defender)}" alt=""></span><strong>${item.name}</strong><small>${item.source}</small></button>`).join("")}</div></section>
    <section class="kh3-section"><div class="kh3-section-title"><span>03 · rules become visual language</span><h3>No borrowed chess metaphors.</h3></div><div class="kh3-rule-cards"><article><b>2</b><strong>Place two</strong><p>Placement builds tomorrow’s enclosure before movement begins.</p></article><article><b>+</b><strong>Enter the middle</strong><p>The first movement opens the salty central house.</p></article><article><b>↔</b><strong>Close the sandwich</strong><p>Capture happens only when a move encloses orthogonally.</p></article><article><b>⋯</b><strong>Continue</strong><p>The capturing Soldier keeps moving while another capture exists.</p></article><article><b>1:2</b><strong>Exchange</strong><p>The Defender may trade one protected Soldier for two Attacker Soldiers.</p></article></div></section>
    <section class="kh3-section"><div class="kh3-section-title"><span>04 · the people around the board</span><h3>A community, not a royal court.</h3></div><div class="kh3-profiles">${manifest.profiles.map((profile) => `<article><img src="${url(profile.path)}" alt="${profile.name}"><div><strong>${profile.name}</strong><span>${profile.title}</span><p>${profile.meaning}</p></div></article>`).join("")}</div></section>
    <section class="kh3-section"><div class="kh3-section-title"><span>05 · table language</span><h3>Reactions born from the rules.</h3></div><div class="kh3-reactions">${manifest.reactions.map((reaction) => `<article><img src="${url(reaction.path)}" alt="${title(reaction.name)}"><strong>${title(reaction.name)}</strong><p>${reaction.meaning}</p><span><img src="${url(reaction.path)}" alt="">32 px</span></article>`).join("")}</div></section>
    <section class="kh3-section"><div class="kh3-section-title"><span>06 · direction boards</span><h3>From available objects to a living digital table.</h3></div><div class="kh3-directions">${manifest.directionBoards.map((board) => `<article><img src="${url(board.path)}" alt="${board.name}"><strong>${board.name}</strong>${board.name.includes("mood") ? "<small>Mood reference; code board is the rule-accuracy source.</small>" : ""}</article>`).join("")}</div></section>`;

  const board = mount.querySelector("#kh3-board");
  const render = () => {
    const current = getSkin();
    mount.querySelector("#kh3-attacker-token").src = url(current.attacker);
    mount.querySelector("#kh3-defender-token").src = url(current.defender);
    const data = boardState(state);
    board.innerHTML = data.cells.map((entry, index) => cell(entry, index, current, url)).join("");
    board.dataset.state = state;
    mount.querySelector("#kh3-state-label").textContent = data.label;
    mount.querySelector("#kh3-turn").textContent = data.turn;
    mount.querySelector("#kh3-instruction-kicker").textContent = data.kicker;
    mount.querySelector("#kh3-instruction").textContent = data.instruction;
    mount.querySelector("#kh3-primary").textContent = data.action;
    mount.querySelector("#kh3-attacker-count").textContent = data.attacker;
    mount.querySelector("#kh3-defender-count").textContent = data.defender;
  };
  mount.addEventListener("click", (event) => {
    const stateButton = event.target.closest("[data-kh3-state]");
    if (stateButton) {
      state = stateButton.dataset.kh3State;
      mount.querySelectorAll("[data-kh3-state]").forEach((button) => button.setAttribute("aria-pressed", String(button === stateButton)));
      render(); return;
    }
    const skinButton = event.target.closest("[data-kh3-skin]");
    if (skinButton) {
      skin = skinButton.dataset.kh3Skin;
      mount.querySelectorAll("[data-kh3-skin]").forEach((button) => button.setAttribute("aria-pressed", String(button === skinButton)));
      render();
    }
  });
  render();
  return manifest;
}

function cell(entry, index, skin, url) {
  const classes = ["kh3-cell", index === 24 ? "is-middle" : "", entry?.class || ""].filter(Boolean).join(" ");
  const source = entry?.side === "attacker" ? url(skin.attacker) : entry?.side === "defender" ? url(skin.defender) : "";
  return `<div class="${classes}" role="gridcell" aria-label="${index === 24 ? "salty middle house" : `house ${index + 1}`}"><i></i>${source ? `<img src="${source}" alt="">` : ""}${entry?.badge ? `<b>${entry.badge}</b>` : ""}</div>`;
}

function boardState(state) {
  const cells = Array(49).fill(null);
  const add = (indices, side, className = "", badge = "") => indices.forEach((index) => { cells[index] = { side, class:className, badge }; });
  if (state === "placement") {
    add([0,2,6,8,10,14,16,20,28,34], "attacker");
    add([1,5,7,9,12,15,19,29,33,35], "defender");
    return { cells,label:"Placement · turn 6",turn:"Attacker places two",kicker:"Placement phase",instruction:"Choose any two empty houses except the salty middle.",action:"Place first Soldier",attacker:14,defender:14 };
  }
  for (let index = 0; index < 49; index++) if (index !== 24) cells[index] = { side:index % 2 ? "attacker" : "defender", class:"", badge:"" };
  if (state === "ready") return { cells,label:"Placement complete",turn:"The salty middle remains empty",kicker:"Board ready",instruction:"All 48 Soldiers are placed. The Attacker must now open the middle house.",action:"Begin movement",attacker:24,defender:24 };
  if (state === "opening") {
    cells[23] = null; cells[24] = { side:"attacker",class:"is-selected",badge:"" }; cells[22].class = "is-captured";
    return { cells,label:"First movement",turn:"Attacker enters the middle",kicker:"Opening rule",instruction:"Move one adjacent Attacker Soldier into the salty middle. Any enclosure created now resolves.",action:"Confirm opening",attacker:24,defender:23 };
  }
  cells.fill(null); add([8,15,22,24,30,36,38],"attacker"); add([9,16,23,29,31,37],"defender"); cells[23].class="is-captured"; cells[24].class="is-selected"; cells[17]={side:null,class:"is-route",badge:"1"}; cells[10]={side:null,class:"is-route",badge:"2"};
  if (state === "capture") return { cells,label:"Custodial capture",turn:"Continue with the same Soldier",kicker:"Mandatory continuation",instruction:"The move closed an orthogonal sandwich. Continue because another capture remains available.",action:"Continue capture",attacker:18,defender:15 };
  cells.fill(null); add([2,8,12,18,30,38,43],"attacker"); add([5,10,20,27,34,41,46],"defender"); cells[41].class="is-exchange-source"; cells[8].class="is-exchange-offer"; cells[12].class="is-exchange-offer"; cells[41].badge="1"; cells[8].badge="1"; cells[12].badge="2";
  return { cells,label:"Defender’s exchange",turn:"One protected Soldier for two",kicker:"Exchange request",instruction:"Aliya offers one unreachable Soldier. Hamma may offer two Attacker Soldiers across the exchange sequence.",action:"Review exchange",attacker:11,defender:8 };
}
