import { Link } from 'react-router-dom'
import { GraduationCap, Check, KeyRound } from 'lucide-react'
import { PRODUCTS, db, clientsByProduct } from '../../db.js'
import { Card, PageHead, Btn } from '../../ui.jsx'

const ICONS = { coreon: GraduationCap }

export default function Catalogue() {
  const d = db()
  const cliProd = clientsByProduct(d)
  const countFor = name => cliProd.find(c => c.name === name)?.value || 0

  return (
    <div>
      <PageHead title="Catalogue" sub="Les produits commerciaux du groupe et leurs plans tarifaires" />
      <div className="space-y-5">
        {PRODUCTS.map(p => {
          const Icon = ICONS[p.id] || GraduationCap
          return (
            <Card key={p.id} className="p-6">
              <div className="flex items-start gap-4 flex-wrap">
                <span className="w-14 h-14 rounded-2xl grid place-items-center shrink-0 accent-soft accent-text"><Icon size={28} /></span>
                <div className="flex-1 min-w-[180px]">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <div className="text-xs font-semibold accent-text">{p.tagline}</div>
                  <p className="text-muted text-sm mt-1">{p.desc}</p>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-extrabold tabular-nums">{countFor(p.name)}</div>
                  <div className="text-xs text-muted">clients équipés</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mt-5">
                {p.plans.map(pl => (
                  <div key={pl.id} className="rounded-2xl border border-line p-4">
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold">{pl.name}</span>
                      <span className="text-xs text-muted">{pl.period === 'unique' ? 'paiement unique' : pl.period === 'an' ? '/ an' : '/ mois'}</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-display text-2xl font-extrabold accent-text">{pl.price}</span><span className="text-sm text-muted">TND</span>
                    </div>
                    <div className="text-sm text-muted mt-2 flex items-center gap-1.5"><Check size={14} className="accent-text shrink-0" /> {pl.blurb}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/console/provisioning"><Btn variant="soft"><KeyRound size={15} /> Provisionner ce produit</Btn></Link>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
