import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, ShieldCheck } from 'lucide-react'
import { Mark } from '../ui.jsx'
import { PRODUCTS, db, kpis } from '../db.js'

const ICONS = { coreon: GraduationCap }

// Chiffres lus dans la base, jamais écrits en dur : le site du groupe promet
// « pas de faux chiffres », la console doit tenir la même promesse.
function stats() {
  const d = db(); const k = kpis(d)
  return [
    ['Clients', String(d.clients.length)],
    ['Produits', String(PRODUCTS.length)],
    ['MRR', `${k.mrr} TND`],
    ['Factures', String(d.invoices.length)],
  ]
}

export default function Landing() {
  const STATS = stats()
  return (
    <div className="min-h-screen bg-white">
      {/* nav */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Mark size={32} />
            <div className="leading-tight">
              <div className="font-display font-extrabold text-lg">Kogia Group</div>
              <div className="text-[10px] tracking-widest uppercase text-muted">Holding · Tunisie</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-muted">
            <a href="#marques" className="hover:text-ink">Nos marques</a>
            <a href="#groupe" className="hover:text-ink">Le groupe</a>
          </nav>
          <Link to="/console" className="inline-flex items-center gap-1.5 rounded-xl font-semibold text-sm px-4 py-2.5 text-white accent-bg hover:opacity-90">
            <ShieldCheck size={16} /> Console propriétaire
          </Link>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(70% 60% at 80% -10%, rgba(54,197,240,.18), transparent), radial-gradient(60% 60% at 0% 0%, rgba(108,92,231,.16), transparent)' }} />
        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <span className="inline-block text-xs font-bold tracking-widest uppercase accent-text">Groupe technologique</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-3 leading-[1.05]">
              Un groupe.<br />Une <span className="accent-text">marque</span> qui compte.
            </h1>
            <p className="text-muted mt-5 text-lg max-w-md">
              Kogia Group édite Coreon Edu, sa plateforme de gestion scolaire. Une holding, une vision, un pilotage centralisé par le propriétaire.
            </p>
            <div className="flex gap-3 mt-8">
              <Link to="/console" className="inline-flex items-center gap-2 rounded-xl font-semibold px-5 py-3 text-white accent-bg hover:opacity-90">
                Accéder à la console <ArrowRight size={18} />
              </Link>
              <a href="#marques" className="inline-flex items-center rounded-xl font-semibold px-5 py-3 bg-white border border-line hover:bg-canvas">
                Découvrir les marques
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5, delay: .1 }} className="relative">
            <div className="card p-8 grid place-items-center" style={{ background: 'linear-gradient(160deg,#fff, #F6F7FB)' }}>
              <Mark size={130} />
              <div className="font-display font-extrabold text-2xl mt-4">Kogia Group</div>
              <div className="grid grid-cols-3 gap-2 mt-6 w-full">
                {PRODUCTS.map(p => (
                  <div key={p.id} className="rounded-xl border border-line px-2 py-3 text-center">
                    <div className="text-[11px] font-bold" style={{ color: p.color }}>{p.name.split(':')[0].split(' ')[0]}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* marques */}
      <section id="marques" className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest uppercase accent-text">Notre marque commerciale</span>
          <h2 className="text-3xl font-extrabold mt-2">Un produit, porté par une division</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {PRODUCTS.map((p, i) => {
            const Icon = ICONS[p.id] || GraduationCap
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
                className="card p-6">
                <span className="w-12 h-12 rounded-2xl grid place-items-center" style={{ background: p.color + '22', color: p.color }}><Icon size={24} /></span>
                <h3 className="text-xl font-bold mt-4">{p.name}</h3>
                <div className="text-xs font-semibold" style={{ color: p.color }}>{p.tagline}</div>
                <p className="text-muted text-sm mt-2">{p.desc}</p>
                <div className="mt-4 pt-4 border-t border-line flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold">{p.plans[0].price}</span>
                  <span className="text-muted text-sm">TND · à partir de</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* groupe */}
      <section id="groupe" className="bg-canvas border-y border-line">
        <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-extrabold">Piloté comme un grand groupe</h2>
            <p className="text-muted mt-4">
              À l'image des grands groupes technologiques, Kogia Group s'appuie sur une console interne unique — la <strong className="text-ink">Console propriétaire</strong> — pour provisionner les accès clients, suivre la facturation et piloter chaque marque.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {['Provisioning d\'accès en un clic à l\'achat', 'Facturation & paiements centralisés', 'Abonnements et revenu récurrent (MRR)', 'Tableau de bord consolidé du groupe'].map(t => (
                <li key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full accent-bg" />{t}</li>
              ))}
            </ul>
            <Link to="/console" className="inline-flex items-center gap-2 mt-8 rounded-xl font-semibold px-5 py-3 text-white accent-bg hover:opacity-90">
              Ouvrir la console <ArrowRight size={18} />
            </Link>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <Mark size={30} /><div><div className="font-bold">Console propriétaire</div><div className="text-xs text-muted">Othman Ounis · Propriétaire</div></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {STATS.map(([l, v]) => (
                <div key={l} className="rounded-xl bg-canvas px-3 py-3"><div className="text-xl font-extrabold">{v}</div><div className="text-xs text-muted">{l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-5 py-10 flex items-center justify-between text-sm text-muted flex-wrap gap-3">
        <div className="flex items-center gap-2"><Mark size={22} /> © 2026 Kogia Group — Tunisie</div>
        <Link to="/console" className="font-semibold accent-text">Console propriétaire →</Link>
      </footer>
    </div>
  )
}
