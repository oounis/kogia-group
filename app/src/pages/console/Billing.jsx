import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Check, Search, Wallet, Clock, AlertTriangle } from 'lucide-react'
import { db, mutate, clientById, planById, PRODUCTS } from '../../db.js'
import { Card, PageHead, Btn, Badge, Modal, Field, Select, Input, Table, EmptyState, StatCard, Avatar } from '../../ui.jsx'

function nextInvNo(d) {
  const nums = d.invoices.map(i => parseInt(i.id.split('-')[2], 10)).filter(n => !isNaN(n))
  const n = (Math.max(0, ...nums) + 1).toString().padStart(3, '0')
  return `INV-2026-${n}`
}

export default function Billing() {
  const [, force] = useState(0)
  const refresh = () => force(x => x + 1)
  const d = db()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ clientId: '', planId: '', amount: '', due: '' })

  const paid = d.invoices.filter(i => i.status === 'paid').reduce((t, i) => t + i.amount, 0)
  const pending = d.invoices.filter(i => i.status === 'pending').reduce((t, i) => t + i.amount, 0)
  const overdue = d.invoices.filter(i => i.status === 'overdue').reduce((t, i) => t + i.amount, 0)

  const list = d.invoices
    .map(i => ({ ...i, client: clientById(i.clientId), product: planById(i.planId)?.product, plan: planById(i.planId) }))
    .filter(i => (filter === 'all' || i.status === filter) && (!q || i.client?.name.toLowerCase().includes(q.toLowerCase()) || i.id.toLowerCase().includes(q.toLowerCase())))

  function markPaid(id) {
    mutate(d => { const i = d.invoices.find(x => x.id === id); if (i) i.status = 'paid' })
    toast.success('Facture marquée payée'); refresh()
  }

  function allPlans() { return PRODUCTS.flatMap(p => p.plans.map(pl => ({ ...pl, product: p }))) }

  function create() {
    if (!form.clientId || !form.planId || !form.amount) return toast.error('Champs requis manquants')
    const today = new Date().toISOString().slice(0, 10)
    mutate(d => d.invoices.unshift({
      id: nextInvNo(d), clientId: form.clientId, planId: form.planId,
      amount: Number(form.amount), issued: today, due: form.due || today, status: 'pending', currency: 'TND',
    }))
    toast.success('Facture créée (en attente)')
    setOpen(false); setForm({ clientId: '', planId: '', amount: '', due: '' }); refresh()
  }

  return (
    <div>
      <PageHead title="Facturation & Paiements" sub="Factures, encaissements et revenu du groupe"
        action={<Btn onClick={() => setOpen(true)}><Plus size={16} /> Créer une facture</Btn>} />

      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <StatCard label="Encaissé" tint="ok" icon={<Wallet size={22} />} value={`${paid} TND`} />
        <StatCard label="En attente" tint="warn" icon={<Clock size={22} />} value={`${pending} TND`} />
        <StatCard label="En retard" tint="danger" icon={<AlertTriangle size={22} />} value={`${overdue} TND`} />
      </div>

      <Card className="p-3 mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-canvas rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={16} className="text-muted" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher (client, n° facture)…" className="bg-transparent text-sm outline-none w-full" />
        </div>
        <div className="flex gap-1">
          {[['all', 'Toutes'], ['paid', 'Payées'], ['pending', 'En attente'], ['overdue', 'En retard']].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${filter === v ? 'accent-bg text-white' : 'text-muted hover:bg-canvas'}`}>{l}</button>
          ))}
        </div>
      </Card>

      {!list.length ? (
        <EmptyState
          title={q || filter !== 'all' ? 'Aucune facture ne correspond à ce filtre' : 'Aucune facture n\'a encore été émise'}
          hint={q || filter !== 'all'
            ? 'Essayez un autre client, un autre numéro, ou revenez à la liste complète.'
            : 'Les factures du groupe s\'affichent ici : émission, échéance, encaissement.'}
          action={q || filter !== 'all'
            ? <Btn variant="ghost" onClick={() => { setQ(''); setFilter('all') }}>Voir toutes les factures</Btn>
            : <Btn onClick={() => setOpen(true)}><Plus size={16} /> Créer une facture</Btn>}
        />
      ) : (
      <Table head={['N° Facture', 'Client', 'Produit', 'Montant', 'Émission', 'Échéance', 'Statut', '']}>
        {list.map(i => (
          <tr key={i.id} className="hover:bg-canvas">
            <td className="px-4 py-3 font-semibold">{i.id}</td>
            <td className="px-4 py-3"><div className="flex items-center gap-2"><Avatar name={i.client?.name} slot={i.client?.slot} size={26} /><span>{i.client?.name}</span></div></td>
            <td className="px-4 py-3 text-muted">{i.product?.name}</td>
            <td className="px-4 py-3 font-bold">{i.amount} TND</td>
            <td className="px-4 py-3 text-muted">{i.issued}</td>
            <td className="px-4 py-3 text-muted">{i.due}</td>
            <td className="px-4 py-3"><Badge status={i.status} /></td>
            <td className="px-4 py-3 text-right">{i.status !== 'paid' && <Btn variant="soft" className="!px-3 !py-1.5" onClick={() => markPaid(i.id)}><Check size={14} /> Encaisser</Btn>}</td>
          </tr>
        ))}
      </Table>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Créer une facture"
        footer={<><Btn variant="ghost" onClick={() => setOpen(false)}>Annuler</Btn><Btn onClick={create}>Créer</Btn></>}>
        <div className="space-y-3">
          <Field label="Client">
            <Select value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })}>
              <option value="">— Choisir —</option>
              {d.clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </Field>
          <Field label="Produit · Plan">
            <Select value={form.planId} onChange={e => { const pl = allPlans().find(x => x.id === e.target.value); setForm({ ...form, planId: e.target.value, amount: pl ? String(pl.price) : form.amount }) }}>
              <option value="">— Choisir —</option>
              {allPlans().map(pl => <option key={pl.id} value={pl.id}>{pl.product.name} · {pl.name} ({pl.price} TND)</option>)}
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Montant (TND)"><Input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} /></Field>
            <Field label="Échéance"><Input type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} /></Field>
          </div>
        </div>
      </Modal>
    </div>
  )
}
