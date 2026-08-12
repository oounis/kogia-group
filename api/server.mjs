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
        sql: 'SELECT nom, message, cree_le FROM commentaires WHERE slug = ? AND masque = 0 ORDER BY cree_le ASC LIMIT 200',
        args: [mC[1]],
      })
      return envoi(res, 200, { commentaires: r.rows }, origin)
    }
    if (mC && req.method === 'POST') {
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
      const r = await db.execute({
        sql: 'SELECT choix, COUNT(*) n FROM reactions WHERE slug = ? GROUP BY choix',
        args: [mR[1]],
      })
      const total = {}
      for (const row of r.rows) total[row.choix] = Number(row.n)
      return envoi(res, 200, { reactions: total }, origin)
    }
    if (mR && req.method === 'POST') {
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
      const r = await db.execute({ sql: 'SELECT choix, COUNT(*) n FROM reactions WHERE slug = ? GROUP BY choix', args: [mR[1]] })
      const total = {}; for (const row of r.rows) total[row.choix] = Number(row.n)
      return envoi(res, 200, { reactions: total }, origin)
    }

    // ── Contact ──
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
