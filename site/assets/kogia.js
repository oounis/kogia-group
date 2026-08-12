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

/* Compteur : la valeur change par un fondu court, jamais par une roulette.
   `tabular-nums` en CSS empêche la ligne de sauter quand un chiffre grandit. */
function poserCompteur(el, v){
  const s = String(v);
  if (el.textContent === s) return;
  el.classList.add('maj');
  setTimeout(() => { el.textContent = s; el.classList.remove('maj'); }, 180);
}

async function demarrerFlux(){
  const flux = document.getElementById('flux');
  if (flux.dataset.pret) return;
  flux.dataset.pret = '1';

  const moisFr = d => new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

  // ── État de chargement : trois silhouettes de carte. Une page blanche
  //    laisse croire que le site est cassé ; une silhouette annonce la forme
  //    de ce qui arrive.
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
        ${i.pays ? `<span class="etiq">${esc(i.pays)}</span>` : ''}
        <span class="signal" title="Avis donnés sur cette idée">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11 12 6l5 5M12 6v12"/></svg>
          <b data-votes>—</b><span class="hors-ecran"> avis</span></span>
        <span class="signal" title="Commentaires">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>
          <b data-comms>—</b><span class="hors-ecran"> commentaires</span></span>
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

  flux.innerHTML = idees.length
    ? idees.slice().sort((a,b) => (b.date||'').localeCompare(a.date||'')).map(carte).join('')
    : VIDE;
  const onglets = document.querySelector('.onglets');
  if (!idees.length && onglets) onglets.style.display = 'none';

  // ── Compteurs : une seule requête pour tout le flux. Tant qu'elle n'a pas
  //    répondu, les cartes affichent « — » et non « 0 » : zéro serait un
  //    mensonge, le tiret dit honnêtement « pas encore su ».
  if (idees.length) {
    fetch(`${API}/idees/compteurs`).then(r => r.ok ? r.json() : null).then(d => {
      if (!d) throw new Error('vide');
      flux.querySelectorAll('.carte').forEach(c => {
        const s = d.compteurs?.[c.dataset.slug] || { votes: 0, commentaires: 0 };
        const v = c.querySelector('[data-votes]'), m = c.querySelector('[data-comms]');
        v.dataset.n = s.votes; m.dataset.n = s.commentaires;
        poserCompteur(v, s.votes); poserCompteur(m, s.commentaires);
      });
      document.querySelector('.tris')?.removeAttribute('hidden');
    }).catch(() => {
      // L'API dort ou refuse : on retire les compteurs plutôt que d'afficher
      // un tiret pour toujours. Le flux reste entièrement lisible.
      flux.querySelectorAll('.signal').forEach(s => s.remove());
    });
  }

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

  document.querySelectorAll('.onglet').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.onglet').forEach(x => { x.classList.remove('actif'); x.setAttribute('aria-selected','false'); });
    b.classList.add('actif'); b.setAttribute('aria-selected','true');
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

async function demarrerArticle(){
  const dateFr = s => { const d = new Date(s); return isNaN(d) ? '' :
    d.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}) + ' à ' +
    d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}); };

  const secV = document.querySelector('.votes');
  if (secV && !secV.dataset.pret) {
    secV.dataset.pret = '1';
    const slug = secV.dataset.slug;
    const peint = t => secV.querySelectorAll('[data-n]').forEach(el => {
      const v = String(t[el.dataset.n] ?? 0);
      if (el.textContent === v) return;
      el.classList.add('maj');                     // fondu sortant…
      setTimeout(() => { el.textContent = v; el.classList.remove('maj'); }, 180);
    });
    fetch(`${API}/idees/${slug}/reactions`).then(r=>r.json()).then(d=>peint(d.reactions||{})).catch(()=>{});
    secV.querySelectorAll('.vote').forEach(b => b.addEventListener('click', async () => {
      // Retour immédiat, avant l'aller-retour réseau : le clic est vu tout de suite.
      secV.querySelectorAll('.vote').forEach(x => x.classList.remove('choisi'));
      b.classList.add('choisi'); b.disabled = true;
      try {
        const r = await fetch(`${API}/idees/${slug}/reactions`, { method:'POST',
          headers:{'Content-Type':'application/json'}, body: JSON.stringify({ choix: b.dataset.choix }) });
        peint((await r.json()).reactions || {});
      } catch {} finally { b.disabled = false; }
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
              </article>`).join('')
          : '<p class="comm-vide">Personne n\'a encore réagi. Soyez le premier — même un désaccord est utile.</p>';
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
      etat.textContent = 'Envoi… (le serveur gratuit peut mettre quelques secondes à se réveiller)';
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

