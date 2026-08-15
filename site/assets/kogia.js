/* ═══════════════════════════════════════════════════════════════════════
   Kogia - script unique du site.
   Il était recopié dans chaque page, et les deux copies avaient déjà
   divergé (le fondu des compteurs n'existait que dans les articles).
   ═══════════════════════════════════════════════════════════════════════ */

/* Un seul langage d'icônes : SVG en ligne, grille 24, trait 1.8. L'emoji
   n'est plus une structure d'interface - il peut vivre DANS un article, en
   contenu, jamais comme icône de catégorie ou de vote. */
const IC = {
  avis: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11 12 6l5 5M12 6v12"/></svg>',
  comm: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
};


const API = 'https://kogia-site-api.onrender.com';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* Temps relatif - « il y a 3 h » se lit plus vite qu'une date complète, et
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

/* Interpolation linéaire - la formule derrière presque toute animation :
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
        <img class="vide-baleine" src="assets/whales/whale-vert-128.png" alt="" width="88" height="88">
        <p class="vide-t">La bibliothèque n'a pas pu être chargée.</p>
        <p class="vide-p">La connexion a échoué. Les idées sont bien là, c'est l'accès qui a manqué.</p>
        <button class="bouton clair" id="reessayer">Réessayer</button>
      </div>`;
    flux.querySelector('#reessayer').addEventListener('click', () => {
      flux.dataset.pret = ''; demarrerFlux();
    });
    return;
  }

  // Le poste : marqueur de catégorie · méta groupée · titre · prémisse ·
  // signal éditorial · barre d'actions. Chaque unité visuelle a un travail ;
  // ce qui n'aide pas à choisir n'existe pas (pays, badge, tuile, emoji).
  const carte = i => `<article class="poste" data-cat="${esc(i.categorie)}" data-slug="${esc(i.slug)}"
      data-date="${esc(i.date)}"
      data-q="${esc((i.titre + ' ' + (i.resume||'') + ' ' + (i.categorie||'') + ' ' + (i.pays||'')).toLowerCase())}">
    <a class="poste-lien" href="idees/${esc(i.slug)}.html">
      <p class="poste-meta"><span class="poste-cat">${esc(i.categorie || 'Idée')}</span>
        <span aria-hidden="true">·</span><span>${moisFr(i.date)}</span>
        <span aria-hidden="true">·</span><span>${i.lecture || 6} min</span></p>
      <h2 class="poste-titre">${esc(i.titre)}</h2>
      <p class="poste-resume">${esc(i.resume)}</p>
    </a>
    ${i.signal ? `<p class="poste-signal">${esc(i.signal)}</p>` : ''}
    <div class="poste-actions">
      <a class="chip" href="idees/${esc(i.slug)}.html#votes" title="Donner un avis">
        ${IC.avis}<b data-votes data-affiche="0">…</b><span>avis</span></a>
      <a class="chip" href="idees/${esc(i.slug)}.html#discussion" title="Lire la discussion">
        ${IC.comm}<b data-comms data-affiche="0">…</b><span>commentaires</span></a>
    </div>
  </article>`;

  const VIDE = `<div class="vide">
      <img class="vide-baleine" src="assets/whales/whale-vert-128.png" alt="" width="88" height="88">
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
    const cartes = [...flux.querySelectorAll('.poste')];
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

  // Le rail des sujets : les mêmes filtres, avec le compte d'idées. Rempli
  // ici, AVANT la pose des écouteurs, pour que .sujet soit déjà branché.
  const railSujets = document.querySelector('#rail-sujets .rail-sujets');
  if (railSujets && idees.length) {
    const parSujet = {};
    idees.forEach(i => { if (i.categorie) parSujet[i.categorie] = (parSujet[i.categorie] || 0) + 1; });
    railSujets.innerHTML = Object.entries(parSujet)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([cat, n]) => `<button class="sujet" data-f="${esc(cat)}" data-cat="${esc(cat)}">
        <span class="pt" aria-hidden="true"></span><span class="nom">${esc(cat)}</span><b>${n}</b></button>`)
      .join('');
    document.getElementById('rail-sujets').hidden = false;
  }

  const parDate = idees.slice().sort((a,b) => (b.date||'').localeCompare(a.date||''));
  flux.innerHTML = parDate.length ? parDate.map(carte).join('') : VIDE;
  const onglets = document.querySelector('.onglets');
  if (!idees.length && onglets) onglets.style.display = 'none';

  // ── Compteurs : une seule requête pour tout le flux. Tant qu'elle n'a pas
  //    répondu, les cartes affichent « - » et non « 0 » : zéro serait un
  //    mensonge, le tiret dit honnêtement « pas encore su ».
  if (idees.length) {
    fetch(`${API}/idees/compteurs`).then(r => r.ok ? r.json() : null).then(d => {
      if (!d) throw new Error('vide');
      document.querySelectorAll('.poste').forEach(c => {
        const s = d.compteurs?.[c.dataset.slug] || { votes: 0, commentaires: 0 };
        // « 0 avis · 0 commentaires » sur une idée neuve dit « personne ne
        // vient ici ». À zéro des deux côtés, la barre invite au lieu de compter.
        if (!s.votes && !s.commentaires) {
          c.querySelector('.poste-actions').innerHTML =
            `<a class="chip-invite" href="idees/${esc(c.dataset.slug)}.html#votes">Donnez le premier avis →</a>`;
          return;
        }
        const v = c.querySelector('[data-votes]'), m = c.querySelector('[data-comms]');
        v.dataset.n = s.votes; m.dataset.n = s.commentaires;
        poserCompteur(v, s.votes); poserCompteur(m, s.commentaires);
      });
      // Le rail « Plus discutées » : trois conversations réelles, jamais un
      // classement vide. Sans commentaire nulle part, le bloc n'apparaît pas.
      const railD = document.getElementById('rail-discutees');
      if (railD) {
        const avec = idees
          .map(i => ({ ...i, n: d.compteurs?.[i.slug]?.commentaires || 0 }))
          .filter(i => i.n > 0).sort((a, b) => b.n - a.n).slice(0, 3);
        if (avec.length) {
          railD.querySelector('.rail-liste').innerHTML = avec.map(i =>
            `<li><a href="idees/${esc(i.slug)}.html#discussion"><b>${esc(i.titre)}</b>
             <span>${i.n} commentaire${i.n > 1 ? 's' : ''}</span></a></li>`).join('');
          railD.hidden = false;
        }
      }
    }).catch(() => {
      // L'API dort ou refuse : on retire les compteurs plutôt que d'afficher
      // un tiret pour toujours. Le flux reste entièrement lisible.
      document.querySelectorAll('.signal').forEach(s => s.remove());
      document.querySelectorAll('.poste .chip b').forEach(b => b.remove());
      // Sans compteurs, « Plus discutées » n'a pas de sens : le contrôle part.
      document.querySelector('.tris')?.setAttribute('hidden', '');
    });
  }

  let filtre = 'tous', recherche = '';
  function appliquer() {
    let n = 0;
    flux.querySelectorAll('.poste').forEach(el => {
      const ok = (filtre === 'tous' || el.dataset.cat === filtre)
              && (!recherche || el.dataset.q.includes(recherche));
      el.hidden = !ok;
      if (ok) n++;
    });
    let msg = document.getElementById('rien');
    if (!n && idees.length) {
      if (!msg) { msg = document.createElement('div'); msg.id = 'rien'; msg.className = 'vide';
        msg.innerHTML = '<img class="vide-baleine" src="assets/whales/whale-vert-128.png" alt="" width="88" height="88">' +
          '<p class="vide-p">Aucune idée ne correspond. Essayez un autre sujet.</p>'; flux.appendChild(msg); }
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

  // Toute la carte est cliquable, comme sur Reddit - pas seulement le titre.
  // Un clic sur un lien ou un bouton interne garde son propre comportement,
  // et une sélection de texte n'est pas un clic.
  flux.addEventListener('click', e => {
    if (e.target.closest('a, button')) return;
    if (getSelection().toString()) return;
    const lien = e.target.closest('.poste')?.querySelector('.poste-lien');
    if (lien) location.href = lien.href;
  });
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
   rester après la dernière ligne - sinon l'article est un cul-de-sac. */
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
  const moi = document.querySelector('.idee-cat')?.textContent.trim();
  idees.sort((a, b) => (b.categorie === moi) - (a.categorie === moi)
                    || (b.date || '').localeCompare(a.date || ''));
  hote.innerHTML = `<h3>À lire ensuite</h3>
    ${idees.slice(0, 3).map(i => `
      <a class="connexe" href="${esc(i.slug)}.html" data-cat="${esc(i.categorie)}">
        <span class="connexe-cat">${esc(i.categorie)}</span>
        <span class="connexe-titre">${esc(i.titre)}</span>
        <span class="connexe-bas">${i.lecture || 6} min de lecture${i.signal ? ' · ' + esc(i.signal) : ''}</span>
      </a>`).join('')}`;
}

async function demarrerArticle(){
  demarrerPartage();
  await demarrerConnexes();
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
      .catch(() => { secV.querySelectorAll('[data-n]').forEach(el => el.textContent = '…'); });

    // Le nuage d'idées : la signature de l'animal (il libère un nuage sous
    // pression) devenue retour de vote. Sept bulles, 640 ms, une seule fois.
    const nuageIdees = b => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const r = b.getBoundingClientRect(), s = secV.getBoundingClientRect();
      // Famille resserrée sur l'unique accent (Magic Iris) + sa nuance
      // pressée + un ton plus clair + le vert de réussite du moment :
      // pas un feu d'artifice multicolore, une variation d'un seul thème.
      const teintes = ['#6C4DE6', '#5E40D8', '#9B86FF', '#15866B'];
      for (let i = 0; i < 7; i++) {
        const e = document.createElement('span');
        e.className = 'bulle';
        e.style.setProperty('--t', (8 + Math.random() * 10) + 'px');
        e.style.setProperty('--dx', (Math.random() * 72 - 36) + 'px');
        e.style.setProperty('--c', teintes[i % teintes.length]);
        e.style.left = (r.left - s.left + 12 + Math.random() * (r.width - 24)) + 'px';
        e.style.top = (r.top - s.top + 2) + 'px';
        e.style.animationDelay = (Math.random() * 90) + 'ms';
        secV.appendChild(e);
        setTimeout(() => e.remove(), 950);
      }
    };

    secV.querySelectorAll('.vote').forEach(b => b.addEventListener('click', async () => {
      if (b.classList.contains('choisi')) return;          // déjà répondu : rien à refaire
      // Retour immédiat, avant l'aller-retour réseau : le clic est vu tout de suite.
      b.classList.add('choisi'); b.setAttribute('aria-pressed', 'true');
      nuageIdees(b);
      b.disabled = true;
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
          : '<p class="comm-vide">Personne n\'a encore réagi. Soyez le premier, même un désaccord est utile.</p>';
        // Signaler : trois signalements masquent le commentaire en attendant la
        // revue. Le retour est dans le bouton lui-même.
        liste.querySelectorAll('[data-signaler]').forEach(b => b.addEventListener('click', async () => {
          b.disabled = true;
          try {
            const r = await fetch(`${API}/idees/${slug}/commentaires/${b.dataset.signaler}/signaler`, { method: 'POST' });
            b.textContent = r.ok ? 'Signalé, merci' : 'Signalement impossible';
          } catch { b.textContent = 'Signalement impossible'; b.disabled = false; }
        }));
      } catch {
        if (compteur) compteur.textContent = '…';
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
        if (r.ok) { f.reset(); etat.className='comm-etat ok'; etat.textContent='Merci, votre commentaire est publié.'; charger(); }
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
        // La couleur de sujet suit la page : sans elle, l'étiquette de
        // catégorie retomberait sur l'indigo par défaut après navigation.
        const cat = doc.querySelector('.page')?.dataset.cat || '';
        document.querySelector('.page')?.setAttribute('data-cat', cat);
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
    // moindre décalage de mise en page - un compteur qui arrive suffisait à
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
}
document.addEventListener('DOMContentLoaded', demarrer);

