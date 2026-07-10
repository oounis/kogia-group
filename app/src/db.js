// v2 : Kharbga et Kogia Coffee ne font plus partie du groupe. Le catalogue, les
// clients, les abonnements et les factures qui s'y rapportaient ont été retirés.
// La clé change pour que les anciennes données locales ne les ressuscitent pas.
const KEY = "kogia_group_db_v2"

// ---- Catalogue: les marques commerciales du groupe ----
export const PRODUCTS = [
  {
    id: "coreon", name: "Coreon Edu", tagline: "SaaS de gestion scolaire", color: "#6C5CE7",
    desc: "Plateforme de gestion d'établissement : élèves, notes, paiements, parents.", unit: "/mois",
    plans: [
      { id: "coreon_starter", name: "Starter", price: 120, period: "mois", seats: 150, blurb: "Jusqu'à 150 élèves" },
      { id: "coreon_pro", name: "Pro", price: 280, period: "mois", seats: 400, blurb: "Jusqu'à 400 élèves + parents" },
      { id: "coreon_ecole", name: "École+", price: 520, period: "mois", seats: 1000, blurb: "Multi-cycles, illimité" },
    ],
  },
]

export const productById = id => PRODUCTS.find(p => p.id === id)
export const planById = pid => { for (const p of PRODUCTS) { const pl = p.plans.find(x => x.id === pid); if (pl) return { ...pl, product: p } } return null }

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"]
export const REV_MONTHS = MONTHS

function seed() {
  const clients = [
    { id: "cl_alnour", name: "École Al-Nour", type: "École", country: "Tunisie", city: "Tunis", contact: "Lina Aderra", email: "direction@alnour.tn", phone: "+216 71 800 100", status: "active", since: "2025-09-01", color: "#6C5CE7" },
    { id: "cl_carthage", name: "École Carthage", type: "École", country: "Tunisie", city: "Carthage", contact: "Mehdi Bel Haj", email: "contact@carthage-edu.tn", phone: "+216 71 730 220", status: "trial", since: "2026-06-10", color: "#0BA5D8" },
    { id: "cl_khaldoun", name: "Lycée Khaldoun", type: "École", country: "Tunisie", city: "Sousse", contact: "Faouzi Trabelsi", email: "admin@khaldoun.tn", phone: "+216 73 220 440", status: "active", since: "2025-10-15", color: "#8B5CF6" },
    { id: "cl_lumiere", name: "Institut Lumière", type: "École", country: "France", city: "Lyon", contact: "Claire Dubois", email: "contact@institut-lumiere.fr", phone: "+33 4 72 00 11 22", status: "late", since: "2025-11-05", color: "#FF6B81" },
  ]

  // accès provisionnés (provisioning)
  const accesses = [
    mkAccess("ac_1", "cl_alnour", "coreon_pro", "active", "2025-09-02"),
    mkAccess("ac_2", "cl_khaldoun", "coreon_ecole", "active", "2025-10-16"),
    mkAccess("ac_3", "cl_carthage", "coreon_starter", "active", "2026-06-10"),
    mkAccess("ac_5", "cl_lumiere", "coreon_pro", "suspended", "2025-11-06"),
  ]

  // abonnements
  const subs = [
    { id: "sub_1", clientId: "cl_alnour", planId: "coreon_pro", seats: 320, nextDue: "2026-07-02", auto: true, start: "2025-09-02" },
    { id: "sub_2", clientId: "cl_khaldoun", planId: "coreon_ecole", seats: 780, nextDue: "2026-07-16", auto: true, start: "2025-10-16" },
    { id: "sub_3", clientId: "cl_carthage", planId: "coreon_starter", seats: 95, nextDue: "2026-07-10", auto: false, start: "2026-06-10" },
    { id: "sub_5", clientId: "cl_lumiere", planId: "coreon_pro", seats: 240, nextDue: "2026-06-05", auto: false, start: "2025-11-05" },
  ]

  // factures
  const invoices = [
    inv("INV-2026-014", "cl_alnour", "coreon_pro", 280, "2026-06-02", "2026-06-16", "paid"),
    inv("INV-2026-013", "cl_khaldoun", "coreon_ecole", 520, "2026-06-16", "2026-06-30", "pending"),
    inv("INV-2026-010", "cl_lumiere", "coreon_pro", 280, "2026-05-05", "2026-05-19", "overdue"),
    inv("INV-2026-009", "cl_lumiere", "coreon_pro", 280, "2026-04-05", "2026-04-19", "overdue"),
    inv("INV-2026-008", "cl_alnour", "coreon_pro", 280, "2026-05-02", "2026-05-16", "paid"),
    inv("INV-2026-006", "cl_carthage", "coreon_starter", 120, "2026-06-10", "2026-06-24", "pending"),
  ]

  // historique de revenu (mensuel) pour les graphiques — Coreon Edu uniquement
  const revenue = [
    { month: "Jan", coreon: 800 },
    { month: "Fév", coreon: 800 },
    { month: "Mar", coreon: 800 },
    { month: "Avr", coreon: 1080 },
    { month: "Mai", coreon: 1080 },
    { month: "Juin", coreon: 1200 },
  ]

  // tickets Service Point
  const tickets = [
    { id: "tk_1", clientId: "cl_alnour", subject: "Import des élèves bloqué", priority: "high", status: "open", at: Date.now() - 3 * 3600000 },
    { id: "tk_2", clientId: "cl_carthage", subject: "Réinitialiser le mot de passe d'un parent", priority: "low", status: "resolved", at: Date.now() - 2 * 86400000 },
    { id: "tk_3", clientId: "cl_khaldoun", subject: "Ajouter un compte enseignant", priority: "medium", status: "open", at: Date.now() - 26 * 3600000 },
  ]

  return { clients, accesses, subs, invoices, revenue, tickets }
}

// ---- générateurs ----
function rnd(n) { return Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, n) }
export function genKey() { return ["KGA", rnd(4), rnd(4), rnd(4)].join("-") }
export function genPassword() { return "Kg" + Math.random().toString(36).slice(2, 8) + "!" + Math.floor(Math.random() * 90 + 10) }

function mkAccess(id, clientId, planId, status, at) {
  const pl = planById(planId)
  const slug = (clientId.replace("cl_", "")).slice(0, 8)
  return {
    id, clientId, planId, status, at,
    username: "admin@" + slug + "." + pl.product.id,
    key: id === "ac_1" ? "KGA-7F2A-9QX4-1MZ8" : genKey(),
    tempPassword: genPassword(),
    url: "https://edu.kogiagroup.com/" + slug,
  }
}

function inv(id, clientId, planId, amount, issued, due, status) {
  return { id, clientId, planId, amount, issued, due, status, currency: "TND" }
}

// ---- store ----
export function db() {
  let d = null
  try { d = JSON.parse(localStorage.getItem(KEY)) } catch { /* ignore */ }
  if (!d) { d = seed(); localStorage.setItem(KEY, JSON.stringify(d)) }
  return d
}
export function save(d) { localStorage.setItem(KEY, JSON.stringify(d)) }
export function mutate(fn) { const d = db(); fn(d); save(d); return d }
export function resetDb() { localStorage.removeItem(KEY) }
export const uid = (p = "id") => p + "_" + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3)

export const clientById = id => db().clients.find(c => c.id === id)

// ---- dérivés (KPI) ----
export function mrrOfClient(d, clientId) {
  return d.subs.filter(s => s.clientId === clientId).reduce((t, s) => {
    const pl = planById(s.planId)
    if (!pl || pl.period === "unique" || pl.period === "an") return t
    return t + pl.price
  }, 0)
}

export function kpis(d) {
  const mrr = d.subs.reduce((t, s) => {
    const pl = planById(s.planId)
    if (!pl || pl.period !== "mois") return t
    return t + pl.price
  }, 0)
  const revenueTotal = d.invoices.filter(i => i.status === "paid").reduce((t, i) => t + i.amount, 0)
  const activeClients = d.clients.filter(c => c.status === "active" || c.status === "late").length
  const productsSold = d.accesses.length
  const pendingInvoices = d.invoices.filter(i => i.status === "pending" || i.status === "overdue").length
  const pendingAmount = d.invoices.filter(i => i.status === "pending" || i.status === "overdue").reduce((t, i) => t + i.amount, 0)
  return { mrr, arr: mrr * 12, revenueTotal, activeClients, productsSold, pendingInvoices, pendingAmount }
}

export function revenueByProduct(d) {
  const m = {}
  PRODUCTS.forEach(p => { m[p.id] = 0 })
  d.invoices.filter(i => i.status === "paid").forEach(i => {
    const pl = planById(i.planId); if (pl) m[pl.product.id] += i.amount
  })
  return PRODUCTS.map(p => ({ name: p.name, value: m[p.id], color: p.color }))
}

export function clientsByProduct(d) {
  const m = {}
  PRODUCTS.forEach(p => { m[p.id] = new Set() })
  d.accesses.forEach(a => { const pl = planById(a.planId); if (pl) m[pl.product.id].add(a.clientId) })
  return PRODUCTS.map(p => ({ name: p.name, value: m[p.id].size, color: p.color }))
}

export function productsOfClient(d, clientId) {
  const ids = new Set(d.accesses.filter(a => a.clientId === clientId).map(a => planById(a.planId)?.product.id))
  return [...ids].map(id => productById(id)).filter(Boolean)
}
