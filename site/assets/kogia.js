/* ═══════════════════════════════════════════════════════════════════════
   Kogia — script unique du site.
   Il était recopié dans chaque page, et les deux copies avaient déjà
   divergé (le fondu des compteurs n'existait que dans les articles).
   ═══════════════════════════════════════════════════════════════════════ */

/* Emoji de catégorie — purement décoratif : il double une information déjà
   écrite en toutes lettres à côté. Toujours aria-hidden, jamais seul porteur
   de sens, jamais plus d'un à la suite. */
const EMO = { 'Technologie':'\u2699\uFE0F', 'Business':'\uD83D\uDCC8', '\u00C9ducation':'\uD83C\uDF93',
              'Fintech':'\uD83D\uDCB3', 'Quotidien':'\uD83E\uDDED' };
const emo = c => EMO[c] || '\uD83D\uDCA1';


const API = 'https://kogia-site-api.onrender.com';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* Temps relatif — « il y a 3 h » se lit plus vite qu'une date complète, et
   c'est ce qui donne à un fil l'impression d'être vivant. La date exacte
   reste dans l'attribut title, pour qui veut la précision. */
function depuis(iso){
  const d = new Date(iso); if (isNaN(d)) return '';
  const s = (Date.now() - d.getTime()) / 1000;
  if (s < 60) return "à l'instant";
  if (s < 3600) return `il y a ${Math.floor(s/60)} min`;
  if (s < 86400) return `il y a ${Math.floor(s/3600)} h`;
  if (s < 2592000) return `il y a ${Math.floor(s/86400)} j`;
  return d.toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' });
}

const moinsDeMouvement = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Interpolation linéaire — la formule derrière presque toute animation :
   valeur = départ + (arrivée - départ) × progression.                        */
const lerp = (a, b, t) => a + (b - a) * t;
/* Amortissement : rapide au début, posé à la fin. Sans lui, un compteur qui
   monte a l'air mécanique. */
const adoucir = t => 1 - Math.pow(1 - t, 3);

/* Compteur : la valeur monte par interpolation, image par image.
   État → interpolation → rendu, à ~60 images par seconde, puis un résultat
   stable et exact. `tabular-nums` en CSS empêche la ligne de sauter. */
function poserCompteur(el, v){
  const fin = Number(v) || 0;
  const debut = Number(el.dataset.affiche || 0);
  if (debut === fin) { el.textContent = String(fin); return; }
  el.dataset.affiche = fin;
  if (moinsDeMouvement()) { el.textContent = String(fin); return; }

  const duree = 750, t0 = performance.now();
  cancelAnimationFrame(Number(el.dataset.raf || 0));
  const image = maintenant => {
    const p = Math.min(1, (maintenant - t0) / duree);
    el.textContent = String(Math.round(lerp(debut, fin, adoucir(p))));
    if (p < 1) el.dataset.raf = requestAnimationFrame(image);
  };
  el.dataset.raf = requestAnimationFrame(image);
}

/* Teintes de l'à-la-une, par catégorie : la même famille que les vignettes,
   pour que la page entière parle d'une seule voix. */
const TEINTES = {
  'Technologie': ['rgba(79,87,222,.62)',  'rgba(109,111,240,.45)'],
  'Business':    ['rgba(20,50,80,.70)',   'rgba(44,74,102,.45)'],
  'Éducation':   ['rgba(14,116,144,.62)', 'rgba(34,211,238,.42)'],
  'Fintech':     ['rgba(109,40,217,.62)', 'rgba(167,139,250,.42)'],
  'Quotidien':   ['rgba(194,65,12,.58)',  'rgba(249,115,22,.40)'],
};

/* Le plancton : le fond vivant de l'abysse. L'audit du 2026-08-13 l'avait
   fait retirer parce qu'il fuyait — un écouteur resize et un observer
   empilés à chaque navigation interne. Il revient en singleton : une seule
   instance, nettoyée avant chaque reconstruction. La vie, sans la fuite. */
let oceanNettoie = null;
function demarrerOcean(lead){
  if (oceanNettoie) oceanNettoie();
  if (moinsDeMouvement()) return;
  const cv = document.createElement('canvas');
  cv.className = 'lead-fond'; cv.setAttribute('aria-hidden', 'true');
  lead.prepend(cv);
  const ctx = cv.getContext('2d');
  let parts = [], larg = 0, haut = 0, boucle = 0;
  const dim = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const r = lead.getBoundingClientRect(); if (!r.width) return;
    larg = r.width; haut = r.height;
    cv.width = Math.round(larg * dpr); cv.height = Math.round(haut * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts = Array.from({ length: Math.round(Math.min(70, larg * haut / 9000)) }, () => ({
      x: Math.random() * larg, y: Math.random() * haut,
      r: .7 + Math.random() * 2.1,
      vx: (Math.random() - .5) * .12, vy: -.08 - Math.random() * .22,
      a: .12 + Math.random() * .4,
    }));
  };
  const image = () => {
    ctx.clearRect(0, 0, larg, haut);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -6) { p.y = haut + 6; p.x = Math.random() * larg; }
      if (p.x < -6) p.x = larg + 6; else if (p.x > larg + 6) p.x = -6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(160,220,255,${p.a})`; ctx.fill();
    }
    boucle = requestAnimationFrame(image);
  };
  dim(); image();
  addEventListener('resize', dim, { passive: true });
  const obs = new IntersectionObserver(([e]) => {
    cancelAnimationFrame(boucle);
    if (e.isIntersecting) boucle = requestAnimationFrame(image);
  }, { threshold: 0 });
  obs.observe(lead);
  oceanNettoie = () => {
    cancelAnimationFrame(boucle); obs.disconnect();
    removeEventListener('resize', dim); cv.remove(); oceanNettoie = null;
  };
}

/* Le relief sous le curseur : la carte suit la souris sur deux axes.
   interaction → état (--rx/--ry) → interpolation CSS → retour visuel.
   Pointeur fin seulement — un pouce n'a pas de position de survol. */
function demarrerRelief(zone){
  if (moinsDeMouvement() || !matchMedia('(pointer:fine)').matches) return;
  zone.querySelectorAll('.carte, .connexe').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--rx', ((e.clientY - r.top) / r.height - .5) * -3.2 + 'deg');
      c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 3.6 + 'deg');
    }, { passive: true });
    c.addEventListener('mouseleave', () => {
      c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg');
    });
  });
}

/* ═══ À la une ═══════════════════════════════════════════════════════════
   La baleine se trace (`stroke-dasharray` = getTotalLength, même principe
   que le périmètre 2 × π × r) sur l'aurore de sa catégorie. */
function poserLead(idee){
  const hote = document.getElementById('lead');
  if (!hote || !idee) return;
  const [a, b] = TEINTES[idee.categorie] || TEINTES['Technologie'];

  hote.innerHTML = `<a class="lead" href="idees/${esc(idee.slug)}.html"
      data-slug="${esc(idee.slug)}" style="--teinte-a:${a};--teinte-b:${b}">
    <svg class="lead-baleine" viewBox="0 0 132 96" aria-hidden="true">
      <path class="trace" d="M12 54 C12 34 28 22 52 22 C74 22 88 32 91 46 C94 38 99 30 107 25 C105 32 104 38 105 43 C110 41 117 41 124 44 C117 48 111 50 106 50 C102 62 92 70 76 73 C58 76 34 74 22 68 C14 64 12 60 12 54 Z"/>
      <path class="trace jet" d="M42 12 q-1 -7 5 -9 M50 12 q4 -6 11 -6"/>
    </svg>
    <span class="lead-emo" aria-hidden="true">${emo(idee.categorie)}</span>
    <div class="lead-texte">
      <p class="lead-oeil">À la une</p>
      <h2 class="lead-titre">${esc(idee.titre)}</h2>
      <p class="lead-sous">${esc(idee.resume)}</p>
      <div class="lead-bas">
        <span class="etiq">${esc(idee.categorie)}</span>
        ${idee.pays ? `<span class="etiq">${esc(idee.pays)}</span>` : ''}
        <span>${idee.lecture || 6} min de lecture</span>
        <span class="signal"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11 12 6l5 5M12 6v12"/></svg>
          <b data-votes data-affiche="0">—</b><span class="hors-ecran"> avis</span></span>
        <span class="signal"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>
          <b data-comms data-affiche="0">—</b><span class="hors-ecran"> commentaires</span></span>
      </div>
    </div>
  </a>`;

  const lead = hote.firstElementChild;
  lead.querySelectorAll('.trace').forEach(chemin => {
    chemin.style.setProperty('--long', chemin.getTotalLength().toFixed(1));
  });
  demarrerOcean(lead);
}

async function demarrerFlux(){
  const flux = document.getElementById('flux');
  if (flux.dataset.pret) return;
  flux.dataset.pret = '1';

  const moisFr = d => new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

  // ── État de chargement : trois silhouettes de carte. Une page blanche
  //    laisse croire que le site est cassé ; une silhouette annonce la forme
  //    de ce qui arrive.
  // Le déploiement écrit une liste de liens statiques dans #flux pour les
  // moteurs et les navigateurs sans JavaScript : on ne l'écrase par des
  // silhouettes que si elle n'existe pas.
  if (!flux.children.length)
    flux.innerHTML = '<div class="squelettes" aria-hidden="true">' +
      '<div class="sq-carte"></div>'.repeat(3) + '</div>' +
      '<p class="hors-ecran" role="status">Chargement des idées…</p>';

  let idees = null;
  try {
    const r = await fetch(new URL('idees.json', location.origin + '/'), { cache: 'no-cache' });
    if (!r.ok) throw new Error(r.status);
    idees = ((await r.json()).idees || []).filter(i => !i.brouillon);
  } catch { idees = null; }

  // ── État d'erreur : dire ce qui s'est passé, et proposer l'action.
  if (idees === null) {
    flux.innerHTML = `<div class="vide" role="alert">
        <p class="vide-t">La bibliothèque n'a pas pu être chargée.</p>
        <p class="vide-p">La connexion a échoué. Les idées sont bien là — c'est l'accès qui a manqué.</p>
        <button class="bouton clair" id="reessayer">Réessayer</button>
      </div>`;
    flux.querySelector('#reessayer').addEventListener('click', () => {
      flux.dataset.pret = ''; demarrerFlux();
    });
    return;
  }

  const carte = i => `<a class="carte" href="idees/${esc(i.slug)}.html" data-cat="${esc(i.categorie)}"
      data-slug="${esc(i.slug)}" data-date="${esc(i.date)}"
      data-q="${esc((i.titre + ' ' + (i.resume||'') + ' ' + (i.categorie||'') + ' ' + (i.pays||'')).toLowerCase())}">
    <div>
      <div class="carte-meta">
        <span class="pastille"><svg viewBox="0 0 132 96"><use href="#whale"/></svg></span>
        <span>Kogia</span><span aria-hidden="true">·</span><span>${moisFr(i.date)}</span>
        <span aria-hidden="true">·</span><span>${i.lecture || 6} min de lecture</span>
      </div>
      <h2 class="carte-titre">${esc(i.titre)}</h2>
      <p class="carte-sous">${esc(i.resume)}</p>
      <div class="carte-bas">
        <span class="etiq"><span aria-hidden="true">${emo(i.categorie)}</span>${esc(i.categorie || 'Idée')}</span>
        ${(Date.now() - new Date(i.date + 'T00:00:00')) < 7 * 864e5 ? '<span class="etiq neuf">Nouvelle</span>' : ''}
        ${i.pays ? `<span class="etiq">${esc(i.pays)}</span>` : ''}
        <span class="signal" title="Avis donnés sur cette idée">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11 12 6l5 5M12 6v12"/></svg>
          <b data-votes data-affiche="0">—</b><span class="hors-ecran"> avis</span></span>
        <span class="signal" title="Commentaires">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>
          <b data-comms data-affiche="0">—</b><span class="hors-ecran"> commentaires</span></span>
      </div>
    </div>
    <div class="vignette"><span class="emo" aria-hidden="true">${emo(i.categorie)}</span></div>
  </a>`;

  const VIDE = `<div class="vide">
      <p class="vide-t">La première idée arrive bientôt.</p>
      <p class="vide-p">Une idée sérieusement explorée vaut mieux que dix résumés. Revenez très vite.</p>
      <a class="bouton clair" href="mailto:contact@kogiagroup.com?subject=Une idée à explorer">Proposer un sujet</a>
    </div>`;

  let tri = 'recentes';
  const ordonner = () => {
    // « Plus discutées » et non « populaires » : on classe par conversation,
    // jamais par score d'approbation. Un classement par popularité est
    // exactement le mécanisme que la charte refuse.
    const n = el => Number(el.querySelector('[data-comms]')?.dataset.n || 0);
    const cartes = [...flux.querySelectorAll('.carte')];
    cartes.sort((a, b) => tri === 'discutees'
      ? n(b) - n(a) || b.dataset.date.localeCompare(a.dataset.date)
      : b.dataset.date.localeCompare(a.dataset.date));
    cartes.forEach(c => flux.appendChild(c));
  };

  // Pas d'étagère vide : un sujet sans idée publiée n'est pas une navigation,
  // c'est une promesse non tenue. Il reviendra avec sa première idée.
  const sujetsOccupes = new Set(idees.map(i => i.categorie));
  document.querySelectorAll('.onglet, .sujet').forEach(b => {
    if (b.dataset.f !== 'tous' && !sujetsOccupes.has(b.dataset.f)) b.hidden = true;
  });

  const parDate = idees.slice().sort((a,b) => (b.date||'').localeCompare(a.date||''));
  poserLead(parDate[0]);
  // La première idée est déjà en grand au-dessus : la répéter dans la liste
  // ferait doublon dès la première ligne.
  flux.innerHTML = parDate.length ? parDate.slice(1).map(carte).join('') : VIDE;
  const onglets = document.querySelector('.onglets');
  if (!idees.length && onglets) onglets.style.display = 'none';

  // ── Compteurs : une seule requête pour tout le flux. Tant qu'elle n'a pas
  //    répondu, les cartes affichent « — » et non « 0 » : zéro serait un
  //    mensonge, le tiret dit honnêtement « pas encore su ».
  if (idees.length) {
    fetch(`${API}/idees/compteurs`).then(r => r.ok ? r.json() : null).then(d => {
      if (!d) throw new Error('vide');
      document.querySelectorAll('.carte, .lead').forEach(c => {
        const s = d.compteurs?.[c.dataset.slug] || { votes: 0, commentaires: 0 };
        const v = c.querySelector('[data-votes]'), m = c.querySelector('[data-comms]');
        v.dataset.n = s.votes; m.dataset.n = s.commentaires;
        poserCompteur(v, s.votes); poserCompteur(m, s.commentaires);
      });
    }).catch(() => {
      // L'API dort ou refuse : on retire les compteurs plutôt que d'afficher
      // un tiret pour toujours. Le flux reste entièrement lisible.
      document.querySelectorAll('.signal').forEach(s => s.remove());
      // Sans compteurs, « Plus discutées » n'a pas de sens : le contrôle part.
      document.querySelector('.tris')?.setAttribute('hidden', '');
    });
  }

  demarrerRelief(document);

  let filtre = 'tous', recherche = '';
  function appliquer() {
    let n = 0;
    flux.querySelectorAll('.carte').forEach(el => {
      const ok = (filtre === 'tous' || el.dataset.cat === filtre)
              && (!recherche || el.dataset.q.includes(recherche));
      el.hidden = !ok;
      if (ok) n++;
    });
    let msg = document.getElementById('rien');
    if (!n && idees.length) {
      if (!msg) { msg = document.createElement('div'); msg.id = 'rien'; msg.className = 'vide';
        msg.innerHTML = '<p class="vide-p">Aucune idée ne correspond. Essayez un autre sujet.</p>'; flux.appendChild(msg); }
    } else if (msg) msg.remove();
  }

  // Des boutons-filtres ordinaires : tous tabulables, état en aria-pressed.
  // Les rôles d'onglets ARIA promettaient des tabpanels que la page n'a pas.
  document.querySelectorAll('.onglet').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.onglet').forEach(x => { x.classList.remove('actif'); x.setAttribute('aria-pressed','false'); });
    b.classList.add('actif'); b.setAttribute('aria-pressed','true');
    filtre = b.dataset.f; appliquer();
  }));
  document.querySelectorAll('.tri').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.tri').forEach(x => x.classList.remove('actif'));
    b.classList.add('actif'); tri = b.dataset.tri; ordonner();
  }));
  document.querySelectorAll('.sujet').forEach(b => b.addEventListener('click', () => {
    const t = [...document.querySelectorAll('.onglet')].find(x => x.dataset.f === b.dataset.f);
    if (t) t.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }));
  const q = document.getElementById('q');
  if (q) q.addEventListener('input', e => { recherche = e.target.value.trim().toLowerCase(); appliquer(); });
}

/* Étincelles : six copies du glyphe qui montent et s'effacent, chacune avec
   son décalage et son retard. Créées, animées, puis retirées du document —
   rien ne s'accumule. Le mouvement ample (380 ms) est réservé à ça : une
   réponse donnée, c'est un résultat, pas une action ordinaire. */
function etincelles(bouton){
  if (moinsDeMouvement()) return;
  const glyphe = bouton.querySelector('.vote-emo')?.textContent || '\u2728';
  for (let i = 0; i < 6; i++) {
    const s = document.createElement('span');
    s.className = 'etincelle';
    s.textContent = glyphe;
    s.setAttribute('aria-hidden', 'true');
    s.style.setProperty('--dx', (Math.random() * 72 - 36).toFixed(0) + 'px');
    s.style.animationDelay = (i * 45) + 'ms';
    s.style.fontSize = (0.7 + Math.random() * 0.7).toFixed(2) + 'rem';
    bouton.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  }
}

/* Copier le lien : le retour doit être dans le bouton lui-même, sinon on ne
   sait pas si l'action a marché. Repli par sélection si le presse-papier est
   refusé (contexte non sécurisé, permission bloquée). */
function demarrerPartage(){
  const b = document.querySelector('[data-partager]');
  if (!b || b.dataset.pret) return;
  b.dataset.pret = '1';
  const libelle = b.querySelector('.partage-txt');
  const initial = libelle.textContent;
  b.addEventListener('click', async () => {
    const url = location.href;
    let ok = false;
    try { await navigator.clipboard.writeText(url); ok = true; }
    catch {
      try {
        const z = document.createElement('textarea');
        z.value = url; z.setAttribute('readonly',''); z.style.position = 'fixed'; z.style.opacity = '0';
        document.body.appendChild(z); z.select();
        ok = document.execCommand('copy'); z.remove();
      } catch { ok = false; }
    }
    b.classList.toggle('ok', ok); b.classList.toggle('ko', !ok);
    libelle.textContent = ok ? 'Lien copié' : 'Copie impossible';
    setTimeout(() => { libelle.textContent = initial; b.classList.remove('ok','ko'); }, 2000);
  });
}

/* Idées connexes : même sujet d'abord, puis les plus récentes. Une raison de
   rester après la dernière ligne — sinon l'article est un cul-de-sac. */
async function demarrerConnexes(){
  const hote = document.getElementById('connexes');
  if (!hote || hote.dataset.pret) return;
  hote.dataset.pret = '1';
  const ici = location.pathname.split('/').pop().replace('.html','');
  let idees = [];
  try {
    const r = await fetch(new URL('idees.json', location.origin + '/'), { cache: 'no-cache' });
    idees = ((await r.json()).idees || []).filter(i => !i.brouillon && i.slug !== ici);
  } catch { return; }
  if (!idees.length) return;                 // rien à proposer : pas de section vide
  const moi = document.querySelector('.idee-cat')?.textContent.replace(/[^\p{L} ]/gu,'').trim();
  idees.sort((a, b) => (b.categorie === moi) - (a.categorie === moi)
                    || (b.date || '').localeCompare(a.date || ''));
  hote.innerHTML = `<h3>À lire ensuite</h3>
    <div class="connexes-grille">${idees.slice(0, 3).map(i => `
      <a class="connexe" href="${esc(i.slug)}.html" data-cat="${esc(i.categorie)}">
        <span class="connexe-emo" aria-hidden="true">${emo(i.categorie)}</span>
        <span class="connexe-cat">${esc(i.categorie)}</span>
        <span class="connexe-titre">${esc(i.titre)}</span>
        <span class="connexe-bas">${i.lecture || 6} min de lecture</span>
      </a>`).join('')}</div>`;
}

async function demarrerArticle(){
  demarrerPartage();
  await demarrerConnexes();
  demarrerRelief(document);
  const dateFr = s => { const d = new Date(s); return isNaN(d) ? '' :
    d.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}) + ' à ' +
    d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}); };

  const secV = document.querySelector('.votes');
  if (secV && !secV.dataset.pret) {
    secV.dataset.pret = '1';
    const slug = secV.dataset.slug;
    const etat = secV.querySelector('.votes-etat');
    const peint = (d, force) => {
      secV.querySelectorAll('[data-n]').forEach(el => poserCompteur(el, d.reactions?.[el.dataset.n] ?? 0));
      // Mes propres réponses reviennent en surbrillance : le vote est un état,
      // pas un feu de paille qui disparaît au rechargement.
      const miens = new Set(d.miens || []);
      // L'empreinte est calculée sur l'IP : elle peut changer entre l'envoi et
      // la réponse (bascule réseau, sortie différente). Sans ce garde-fou, le
      // choix qu'on vient de faire se décochait tout seul, sans un mot.
      if (force) miens.add(force);
      secV.querySelectorAll('.vote').forEach(x => {
        const a = miens.has(x.dataset.choix);
        x.classList.toggle('choisi', a);
        x.setAttribute('aria-pressed', a ? 'true' : 'false');
      });
    };
    fetch(`${API}/idees/${slug}/reactions`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(peint)
      .catch(() => { secV.querySelectorAll('[data-n]').forEach(el => el.textContent = '—'); });

    secV.querySelectorAll('.vote').forEach(b => b.addEventListener('click', async () => {
      if (b.classList.contains('choisi')) return;          // déjà répondu : rien à refaire
      // Retour immédiat, avant l'aller-retour réseau : le clic est vu tout de suite.
      b.classList.add('choisi'); b.setAttribute('aria-pressed', 'true');
      etincelles(b); b.disabled = true;
      if (etat) { etat.textContent = ''; etat.className = 'votes-etat'; }
      try {
        const r = await fetch(`${API}/idees/${slug}/reactions`, { method:'POST',
          headers:{'Content-Type':'application/json'}, body: JSON.stringify({ choix: b.dataset.choix }) });
        if (!r.ok) throw new Error(r.status);
        peint(await r.json(), b.dataset.choix);
      } catch {
        // L'échec doit se voir : on retire l'état optimiste et on l'explique
        // sous la barre, à côté du geste, jamais dans une alerte.
        b.classList.remove('choisi'); b.setAttribute('aria-pressed', 'false');
        if (etat) { etat.className = 'votes-etat ko';
          etat.textContent = "Votre réponse n'a pas pu être enregistrée. Réessayez dans un instant."; }
      } finally { b.disabled = false; }
    }));
  }

  const secC = document.querySelector('.comm');
  if (secC && !secC.dataset.pret) {
    secC.dataset.pret = '1';
    const slug = secC.dataset.slug, liste = secC.querySelector('.comm-liste'),
          f = secC.querySelector('.comm-form'), etat = secC.querySelector('.comm-etat');
    const compteur = secC.querySelector('[data-comm-n]');
    async function charger(){
      // Silhouettes pendant l'attente : l'instance gratuite peut mettre
      // ~30 s à se réveiller, et un vide sans explication ressemble à une panne.
      liste.innerHTML = '<div class="sq-comm"></div><div class="sq-comm"></div>';
      try {
        const r = await fetch(`${API}/idees/${slug}/commentaires`);
        if (!r.ok) throw new Error(r.status);
        const cs = (await r.json()).commentaires || [];
        if (compteur) poserCompteur(compteur, cs.length);
        liste.innerHTML = cs.length
          ? cs.map(c => `<article class="comm-item">
                <div class="comm-tete">
                  <span class="comm-pastille" aria-hidden="true">${esc((c.nom||'?').trim()[0].toUpperCase())}</span>
                  <span class="comm-nom">${esc(c.nom)}</span>
                  <time class="comm-date" datetime="${esc(c.cree_le)}" title="${esc(dateFr(c.cree_le))}">${esc(depuis(c.cree_le))}</time>
                </div>
                <p class="comm-msg">${esc(c.message)}</p>
                ${c.id ? `<button class="comm-signaler" type="button" data-signaler="${esc(c.id)}">Signaler</button>` : ''}
              </article>`).join('')
          : '<p class="comm-vide">Personne n\'a encore réagi. Soyez le premier — même un désaccord est utile.</p>';
        // Signaler : trois signalements masquent le commentaire en attendant la
        // revue. Le retour est dans le bouton lui-même.
        liste.querySelectorAll('[data-signaler]').forEach(b => b.addEventListener('click', async () => {
          b.disabled = true;
          try {
            const r = await fetch(`${API}/idees/${slug}/commentaires/${b.dataset.signaler}/signaler`, { method: 'POST' });
            b.textContent = r.ok ? 'Signalé — merci' : 'Signalement impossible';
          } catch { b.textContent = 'Signalement impossible'; b.disabled = false; }
        }));
      } catch {
        if (compteur) compteur.textContent = '—';
        liste.innerHTML = `<p class="comm-vide">La discussion n'a pas pu être chargée.
          <button class="lien-texte" type="button" data-recharger>Réessayer</button></p>`;
        liste.querySelector('[data-recharger]')?.addEventListener('click', charger);
      }
    }
    charger();
    f.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = f.querySelector('button'), d = Object.fromEntries(new FormData(f).entries());
      if (!(d.nom||'').trim() || !(d.message||'').trim()) {
        etat.className='comm-etat ko'; etat.textContent='Un nom et un message, s\'il vous plaît.'; return; }
      btn.disabled = true; etat.className='comm-etat';
      etat.innerHTML = '<span class="attente"><svg class="chargeur" viewBox="0 0 24 24" aria-hidden="true">'
        + '<circle cx="12" cy="12" r="9"/></svg>Envoi… le serveur gratuit met parfois quelques secondes à se réveiller.</span>';
      try {
        const r = await fetch(`${API}/idees/${slug}/commentaires`, { method:'POST',
          headers:{'Content-Type':'application/json'}, body: JSON.stringify(d) });
        if (r.ok) { f.reset(); etat.className='comm-etat ok'; etat.textContent='Merci — votre commentaire est publié.'; charger(); }
        else { etat.className='comm-etat ko'; etat.textContent=(await r.json().catch(()=>({}))).erreur || 'Publication impossible.'; }
      } catch { etat.className='comm-etat ko'; etat.textContent='Connexion impossible.'; }
      finally { btn.disabled = false; }
    });
  }
}


// ═══ Navigation sans rechargement ═══
// Les rails ne bougent jamais : on ne remplace que la colonne centrale, comme
// le fait Medium. L'URL est mise à jour, donc le bouton « précédent », le
// partage et l'ouverture directe d'un article continuent de fonctionner.
(function(){
  const centre = document.getElementById('centre');
  if (!centre || !window.history?.pushState) return;

  async function aller(href, pousser = true) {
    centre.setAttribute('aria-busy', 'true');
    try {
      const r = await fetch(href, { headers: { 'X-Partiel': '1' } });
      if (!r.ok) throw new Error(r.status);
      const doc = new DOMParser().parseFromString(await r.text(), 'text/html');
      const neuf = doc.getElementById('centre');
      if (!neuf) { location.href = href; return; }
      // Le navigateur photographie l'ancienne colonne, échange, puis fond
      // vers la nouvelle. Sans support, l'échange se fait simplement d'un coup.
      const echanger = () => {
        centre.innerHTML = neuf.innerHTML;
        gabarit(doc.querySelector('.page')?.classList.contains('page--article'));
      };
      if (document.startViewTransition && !reduit()) await document.startViewTransition(echanger).updateCallbackDone;
      else echanger();
      document.title = doc.title;
      const desc = doc.querySelector('meta[name="description"]')?.content;
      if (desc) document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
      if (pousser) history.pushState({ href }, '', href);
      window.scrollTo({ top: 0, behavior: 'instant' });
      demarrer();                       // relancer flux OU votes/commentaires
    } catch {
      location.href = href;             // en cas d'échec, navigation classique
    } finally {
      centre.removeAttribute('aria-busy');
    }
  }

  const reduit = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  // La page d'article n'a pas de rail droit : la colonne de lecture prend sa
  // place et atteint enfin une ligne de ~68 caractères.
  const gabarit = estArticle => document.querySelector('.page')
    ?.classList.toggle('page--article', !!estArticle);

  // Un seul écouteur sur le document : il survit au remplacement du contenu.
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (!/\/(index\.html)?$|\/idees\/[^/]+\.html$/.test(url.pathname)) return;
    // Une ancre dans la même page (#contact, #solutions…) : on conduit le
    // défilement nous-mêmes. Le défilement doux natif est annulé par le
    // moindre décalage de mise en page — un compteur qui arrive suffisait à
    // tuer le trajet « Nous écrire ». Un filet vérifie l'arrivée : si le
    // défilement a été interrompu, on saute directement au bloc.
    if (url.hash && url.pathname === location.pathname) {
      const cible = document.getElementById(url.hash.slice(1));
      if (!cible) return;
      e.preventDefault();
      history.pushState(null, '', url.hash);
      cible.scrollIntoView({ behavior: reduit() ? 'auto' : 'smooth', block: 'start' });
      setTimeout(() => {
        const r = cible.getBoundingClientRect();
        if (r.top < -40 || r.top > innerHeight * 0.8) cible.scrollIntoView();
      }, 700);
      return;
    }
    e.preventDefault();
    if (url.pathname === location.pathname) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    aller(url.pathname + url.search);
  });

  window.addEventListener('popstate', () => aller(location.pathname, false));
  window.demarrer = demarrer;
})();

// ═══ Démarrage : selon ce que contient la colonne centrale ═══
function demarrer(){
  if (document.getElementById('flux')) demarrerFlux();
  if (document.querySelector('.votes')) demarrerArticle();
  // Une seule entrée active : « Accueil » et « Idées » pointent tous deux vers
  // la même vue, et les deux s'allumaient en même temps.
  const surAccueil = location.pathname === '/' || location.pathname.endsWith('index.html');
  let deja = false;
  document.querySelectorAll('.rail-lien').forEach(l => {
    const actif = !deja && surAccueil && l.getAttribute('href') === '/';
    l.classList.toggle('actif', actif);
    if (actif) deja = true;
  });
}
document.addEventListener('DOMContentLoaded', demarrer);

