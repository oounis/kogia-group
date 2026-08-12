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


async function demarrerFlux(){
  const flux = document.getElementById('flux');
  let idees = [];
  try {
    const r = await fetch(new URL('idees.json', location.origin + '/'), { cache: 'no-cache' });
    if (r.ok) idees = ((await r.json()).idees || []).filter(i => !i.brouillon)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  } catch (e) {}

  const moisFr = d => new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  const carte = i => `<a class="carte" href="idees/${esc(i.slug)}.html" data-cat="${esc(i.categorie)}"
      data-q="${esc((i.titre + ' ' + (i.resume||'') + ' ' + (i.categorie||'') + ' ' + (i.pays||'')).toLowerCase())}">
    <div>
      <div class="carte-meta">
        <span class="pastille"><svg viewBox="0 0 132 96"><use href="#whale"/></svg></span>
        <span>Kogia</span><span>·</span><span>${moisFr(i.date)}</span>
      </div>
      <h2 class="carte-titre">${esc(i.titre)}</h2>
      <p class="carte-sous">${esc(i.resume)}</p>
      <div class="carte-bas">
        <span class="etiq"><span aria-hidden="true">${emo(i.categorie)}</span>${esc(i.categorie || 'Idée')}</span>
        ${i.pays ? `<span class="etiq">${esc(i.pays)}</span>` : ''}
        <span>${i.lecture || 6} min</span>
      </div>
    </div>
    <div class="vignette"><svg viewBox="0 0 132 96" aria-hidden="true"><use href="#whale" fill="#fff"/></svg><span class="emo" aria-hidden="true">${emo(i.categorie)}</span></div>
  </a>`;

  const VIDE = `<div class="vide">
      <p class="vide-t">La première idée arrive bientôt.</p>
      <p class="vide-p">Une idée sérieusement explorée vaut mieux que dix résumés. Revenez très vite.</p>
      <a class="bouton clair" href="mailto:contact@kogiagroup.com?subject=Une idée à explorer">Proposer un sujet</a>
    </div>`;

  flux.innerHTML = idees.length ? idees.map(carte).join('') : VIDE;
  if (!idees.length) document.querySelector('.onglets').style.display = 'none';

  let filtre = 'tous', recherche = '';
  function appliquer() {
    let n = 0;
    document.querySelectorAll('.carte').forEach(el => {
      const okCat = filtre === 'tous' || el.dataset.cat === filtre;
      const okQ = !recherche || el.dataset.q.includes(recherche);
      const ok = okCat && okQ;
      el.style.display = ok ? '' : 'none';
      if (ok) n++;
    });
    let msg = document.getElementById('rien');
    if (!n && idees.length) {
      if (!msg) { msg = document.createElement('div'); msg.id = 'rien'; msg.className = 'vide';
        msg.innerHTML = '<p class="vide-p">Aucune idée ne correspond. Essayez un autre sujet.</p>'; flux.appendChild(msg); }
    } else if (msg) msg.remove();
  }

  document.querySelectorAll('.onglet').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.onglet').forEach(x => x.classList.remove('actif'));
    b.classList.add('actif'); filtre = b.dataset.f; appliquer();
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
  const API = 'https://kogia-site-api.onrender.com';
  const dateFr = s => { const d = new Date(s); return isNaN(d) ? '' :
    d.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}) + ' à ' +
    d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}); };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

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
    async function charger(){
      try {
        const d = await (await fetch(`${API}/idees/${slug}/commentaires`)).json();
        const cs = d.commentaires || [];
        liste.innerHTML = cs.length
          ? cs.map(c => `<div class="comm-item"><div class="comm-tete"><span class="comm-nom">${esc(c.nom)}</span><span class="comm-date">${dateFr(c.cree_le)}</span></div><p class="comm-msg">${esc(c.message)}</p></div>`).join('')
          : '<p class="comm-vide">Personne n\'a encore réagi. Soyez le premier — même un désaccord est utile.</p>';
      } catch { liste.innerHTML = '<p class="comm-vide">Commentaires indisponibles pour le moment.</p>'; }
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

