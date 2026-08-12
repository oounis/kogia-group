// L'API du site Kogia : réactions, commentaires, messages de contact.
//
// Pourquoi elle existe : les visiteurs de Kogia n'ont pas de compte GitHub et
// n'en auront pas. Un système de commentaires qui exige un compte exclut
// justement les gens qu'on veut faire parler. Ici : rien à créer, on écrit son
// nom et on commente — comme sur un forum.
//
// Zéro dépendance hors le client Turso. Un seul processus Node.
import http from 'node:http'
import { createClient } from '@libsql/client'
import { randomUUID, createHash } from 'node:crypto'

const PORT = process.env.PORT || 8080
const ORIGINS = (process.env.KOGIA_ORIGINS || 'https://kogiagroup.com').split(',').map(s => s.trim())

const db = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN })

await db.batch([
  `CREATE TABLE IF NOT EXISTS commentaires (
     id TEXT PRIMARY KEY, slug TEXT NOT NULL, nom TEXT NOT NULL, message TEXT NOT NULL,
     cree_le TEXT NOT NULL, empreinte TEXT NOT NULL, masque INTEGER NOT NULL DEFAULT 0)`,
  `CREATE INDEX IF NOT EXISTS commentaires_slug ON commentaires (slug, cree_le)`,
  `CREATE TABLE IF NOT EXISTS reactions (
     id TEXT PRIMARY KEY, slug TEXT NOT NULL, choix TEXT NOT NULL,
     empreinte TEXT NOT NULL, cree_le TEXT NOT NULL,
     UNIQUE (slug, choix, empreinte))`,
  `CREATE TABLE IF NOT EXISTS messages (
     id TEXT PRIMARY KEY, nom TEXT NOT NULL, email TEXT NOT NULL, sujet TEXT,
     message TEXT NOT NULL, cree_le TEXT NOT NULL)`,
], 'write')

// Migration douce : la colonne des signalements n'existait pas au départ.
try { await db.execute('ALTER TABLE commentaires ADD COLUMN signalements INTEGER NOT NULL DEFAULT 0') } catch {}

// Empreinte = IP + navigateur, hachée. On ne stocke JAMAIS l'IP en clair : elle
// ne sert qu'à empêcher qu'une même personne vote cent fois, pas à l'identifier.
const empreinte = req => createHash('sha256')
  .update((req.headers['x-forwarded-for'] || '').split(',')[0].trim() + (req.headers['user-agent'] || '') + (process.env.EMPREINTE_SEL || 'kogia'))
  .digest('hex').slice(0, 32)

const seau = new Map()   // limite simple : 10 écritures / 10 min / empreinte
function tropRapide(emp) {
  const now = Date.now()
  const recent = (seau.get(emp) || []).filter(t => now - t < 600000)
  if (recent.length >= 10) return true
  recent.push(now); seau.set(emp, recent); return false
}

const propre = (s, max) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, max)

// ── Liste blanche des idées publiées ─────────────────────────────────────
// L'API acceptait des votes et commentaires pour n'importe quel slug bien
// formé : des lignes fantômes, une base qui gonfle, des chiffres faux. La
// liste vit dans site/idees.json, servie par le site lui-même ; on la met en
// cache 10 minutes. Si elle n'a JAMAIS pu être chargée on laisse passer
// (mieux vaut un vote de trop qu'un site muet) ; dès qu'on l'a, on refuse.
let slugsPublies = null, slugsMajA = 0
async function slugPublie(slug) {
  if (!slugsPublies || Date.now() - slugsMajA > 600000) {
    try {
      const r = await fetch('https://kogiagroup.com/idees.json', { signal: AbortSignal.timeout(5000) })
      if (r.ok) {
        const d = await r.json()
        slugsPublies = new Set((d.idees || []).filter(i => !i.brouillon).map(i => i.slug))
        slugsMajA = Date.now()
      }
    } catch { /* on garde la liste précédente */ }
  }
  return slugsPublies ? slugsPublies.has(slug) : true
}

function envoi(res, code, data, origin) {
  res.writeHead(code, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': origin,
    'access-control-allow-headers': 'content-type',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
  })
  res.end(JSON.stringify(data))
}
const corps = req => new Promise(r => {
  let b = ''
  req.on('data', c => { b += c; if (b.length > 20000) req.destroy() })
  req.on('end', () => { try { r(JSON.parse(b || '{}')) } catch { r({}) } })
})

const serveur = http.createServer(async (req, res) => {
  const origin = ORIGINS.includes(req.headers.origin) ? req.headers.origin : ORIGINS[0]
  if (req.method === 'OPTIONS') return envoi(res, 204, {}, origin)
  const url = new URL(req.url, 'http://x')
  const emp = empreinte(req)

  try {
    if (url.pathname === '/health') {
      await db.execute('SELECT 1')
      return envoi(res, 200, { ok: true }, origin)
    }

    // ── Compteurs de toutes les idées, en une seule requête ──
    // Le flux affiche les votes et les commentaires sur chaque carte : c'est ce
    // qui distingue une liste d'articles d'une vraie place publique. Une requête
    // par idée réveillerait l'instance gratuite autant de fois qu'il y a de
    // cartes — d'où ce point d'entrée unique, agrégé côté base.
    if (url.pathname === '/idees/compteurs' && req.method === 'GET') {
      const [votes, comms] = await db.batch([
        'SELECT slug, COUNT(*) n FROM reactions GROUP BY slug',
        'SELECT slug, COUNT(*) n FROM commentaires WHERE masque = 0 GROUP BY slug',
      ], 'read')
      const compteurs = {}
      const poser = (rows, cle) => { for (const r of rows) {
        compteurs[r.slug] ??= { votes: 0, commentaires: 0 }
        compteurs[r.slug][cle] = Number(r.n)
      } }
      poser(votes.rows, 'votes')
      poser(comms.rows, 'commentaires')
      return envoi(res, 200, { compteurs }, origin)
    }

    // ── Commentaires d'un article ──
    const mC = url.pathname.match(/^\/idees\/([a-z0-9-]{1,80})\/commentaires$/)
    if (mC && req.method === 'GET') {
      const r = await db.execute({
        sql: 'SELECT id, nom, message, cree_le FROM commentaires WHERE slug = ? AND masque = 0 ORDER BY cree_le ASC LIMIT 200',
        args: [mC[1]],
      })
      return envoi(res, 200, { commentaires: r.rows }, origin)
    }
    if (mC && req.method === 'POST') {
      if (!await slugPublie(mC[1])) return envoi(res, 404, { erreur: 'Idée inconnue.' }, origin)
      if (tropRapide(emp)) return envoi(res, 429, { erreur: 'Trop de messages d’un coup. Réessayez dans quelques minutes.' }, origin)
      const b = await corps(req)
      // Piège à robots : un champ caché qu'un humain ne remplit jamais.
      if (propre(b.site, 10)) return envoi(res, 200, { ok: true }, origin)
      const nom = propre(b.nom, 60), message = propre(b.message, 2000)
      if (nom.length < 2) return envoi(res, 400, { erreur: 'Indiquez un nom (2 caractères minimum).' }, origin)
      if (message.length < 3) return envoi(res, 400, { erreur: 'Écrivez un message.' }, origin)
      await db.execute({
        sql: 'INSERT INTO commentaires (id, slug, nom, message, cree_le, empreinte) VALUES (?,?,?,?,?,?)',
        args: [randomUUID(), mC[1], nom, message, new Date().toISOString(), emp],
      })
      return envoi(res, 201, { ok: true }, origin)
    }

    // ── Réactions (un vote par choix et par personne) ──
    const mR = url.pathname.match(/^\/idees\/([a-z0-9-]{1,80})\/reactions$/)
    if (mR && req.method === 'GET') {
      // `miens` = ce que CETTE personne a déjà répondu, retrouvé par empreinte.
      // Sans lui, on votait, on rechargeait, et la page faisait comme si de
      // rien n'était : le geste n'avait pas d'état, donc pas de réalité.
      const [tous, miens] = await db.batch([
        { sql: 'SELECT choix, COUNT(*) n FROM reactions WHERE slug = ? GROUP BY choix', args: [mR[1]] },
        { sql: 'SELECT choix FROM reactions WHERE slug = ? AND empreinte = ?', args: [mR[1], emp] },
      ], 'read')
      const total = {}
      for (const row of tous.rows) total[row.choix] = Number(row.n)
      return envoi(res, 200, { reactions: total, miens: miens.rows.map(r => r.choix) }, origin)
    }
    if (mR && req.method === 'POST') {
      if (!await slugPublie(mR[1])) return envoi(res, 404, { erreur: 'Idée inconnue.' }, origin)
      const b = await corps(req)
      const choix = propre(b.choix, 20)
      if (!['marcherait', 'marcherait_pas', 'utiliserais', 'investirais'].includes(choix)) {
        return envoi(res, 400, { erreur: 'Choix inconnu.' }, origin)
      }
      // L'unicité est en base : un second vote identique ne compte pas deux fois.
      try {
        await db.execute({
          sql: 'INSERT INTO reactions (id, slug, choix, empreinte, cree_le) VALUES (?,?,?,?,?)',
          args: [randomUUID(), mR[1], choix, emp, new Date().toISOString()],
        })
      } catch { /* déjà voté : on renvoie simplement le total */ }
      const [tous, miens] = await db.batch([
        { sql: 'SELECT choix, COUNT(*) n FROM reactions WHERE slug = ? GROUP BY choix', args: [mR[1]] },
        { sql: 'SELECT choix FROM reactions WHERE slug = ? AND empreinte = ?', args: [mR[1], emp] },
      ], 'read')
      const total = {}; for (const row of tous.rows) total[row.choix] = Number(row.n)
      return envoi(res, 200, { reactions: total, miens: miens.rows.map(r => r.choix) }, origin)
    }

    // ── Contact ──
    // ── Signalement : trois signalements masquent le commentaire en attendant
    //    la revue. Le seuil est bas parce que le site est petit ; il montera
    //    avec le trafic. Un commentaire masqué n'est jamais supprimé.
    const mS = url.pathname.match(/^\/idees\/([a-z0-9-]{1,80})\/commentaires\/([0-9a-f-]{36})\/signaler$/)
    if (mS && req.method === 'POST') {
      if (tropRapide(emp)) return envoi(res, 429, { erreur: 'Trop de signalements d’un coup.' }, origin)
      await db.execute({
        sql: 'UPDATE commentaires SET signalements = signalements + 1 WHERE id = ? AND slug = ?',
        args: [mS[2], mS[1]],
      })
      await db.execute({
        sql: 'UPDATE commentaires SET masque = 1 WHERE id = ? AND signalements >= 3',
        args: [mS[2]],
      })
      return envoi(res, 200, { ok: true }, origin)
    }

    // ── Modération : lecture de la file et masquage/rétablissement, protégés
    //    par un jeton (variable d'environnement ADMIN_JETON sur Render).
    //    Sans jeton configuré, ces routes n'existent pas.
    const JETON = process.env.ADMIN_JETON
    if (JETON && url.pathname === '/admin/commentaires') {
      const fourni = req.headers['x-jeton'] || url.searchParams.get('jeton') || ''
      if (fourni !== JETON) return envoi(res, 401, { erreur: 'Jeton invalide.' }, origin)
      if (req.method === 'GET') {
        const r = await db.execute(
          'SELECT id, slug, nom, message, cree_le, masque, signalements FROM commentaires ORDER BY cree_le DESC LIMIT 100')
        return envoi(res, 200, { commentaires: r.rows }, origin)
      }
      if (req.method === 'POST') {
        const b = await corps(req)
        if (typeof b.id !== 'string' || ![0, 1].includes(b.masque)) {
          return envoi(res, 400, { erreur: 'id et masque (0 ou 1) requis.' }, origin)
        }
        await db.execute({ sql: 'UPDATE commentaires SET masque = ? WHERE id = ?', args: [b.masque, b.id] })
        return envoi(res, 200, { ok: true }, origin)
      }
    }

    if (url.pathname === '/contact' && req.method === 'POST') {
      if (tropRapide(emp)) return envoi(res, 429, { erreur: 'Trop d’envois. Réessayez dans quelques minutes.' }, origin)
      const b = await corps(req)
      if (propre(b.site, 10)) return envoi(res, 200, { ok: true }, origin)
      const nom = propre(b.nom, 80), email = propre(b.email, 120), message = propre(b.message, 4000)
      if (nom.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length < 10) {
        return envoi(res, 400, { erreur: 'Nom, e-mail valide et message (10 caractères minimum) sont requis.' }, origin)
      }
      await db.execute({
        sql: 'INSERT INTO messages (id, nom, email, sujet, message, cree_le) VALUES (?,?,?,?,?,?)',
        args: [randomUUID(), nom, email, propre(b.sujet, 120), message, new Date().toISOString()],
      })
      return envoi(res, 201, { ok: true }, origin)
    }

    return envoi(res, 404, { erreur: 'Route inconnue.' }, origin)
  } catch (e) {
    console.error(e)
    return envoi(res, 500, { erreur: 'Erreur serveur.' }, origin)
  }
})

serveur.listen(PORT, () => console.log(`API Kogia · port ${PORT}`))
