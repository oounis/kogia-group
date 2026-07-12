import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Search, Building2, KeyRound, Receipt } from 'lucide-react'
import { db, mutate, uid, nextSlot, mrrOfClient, productsOfClient, planById } from '../../db.js'
import { Card, PageHead, Btn, Badge, Avatar, Modal, Field, Input, Select, Table, EmptyState } from '../../ui.jsx'

export default function Clients() {
  const [, force] = useState(0)
  const refresh = () => force(x => x + 1)
  const d = db()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [add, setAdd] = useState(false)
  const [detail, setDetail] = useState(null)
  const [form, setForm] = useState({ name: '', type: 'École', country: 'Tunisie', city: '', contact: '', email: '', phone: '' })

  const list = d.clients.filter(c =>
    (filter === 'all' || c.status === filter) &&
    (c.name.toLowerCase().includes(q.toLowerCase()) || c.city.toLowerCase().includes(q.toLowerCase()))
  )

  function create() {
    if (!form.name.trim()) return toast.error('Le nom est requis')
    mutate(d => d.clients.unshift({
      id: uid('cl'), ...form, status: 'trial',
      since: new Date().toISOString().slice(0, 10),
      slot: nextSlot(d.clients.length),
    }))
    toast.success('Client ajouté (en essai)')
    setAdd(false); setForm({ name: '', type: 'École', country: 'Tunisie', city: '', contact: '', email: '', phone: '' }); refresh()
  }

  return (
    <div>
      <PageHead title="Clients" sub="Organisations ayant acheté un produit du groupe"
        action={<Btn onClick={() => setAdd(true)}><Plus size={16} /> Ajouter un client</Btn>} />

      <Card className="p-3 mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-canvas rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={16} className="text-muted" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un client…" className="bg-transparent text-sm outline-none w-full" />
        </div>
        <div className="flex gap-1">
          {[['all', 'Tous'], ['active', 'Actifs'], ['trial', 'Essai'], ['late', 'En retard']].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${filter === v ? 'accent-bg text-white' : 'text-muted hover:bg-canvas'}`}>{l}</button>
          ))}
        </div>
      </Card>

      {!list.length ? (
        <EmptyState
          title={q || filter !== 'all' ? 'Aucun client ne correspond à ce filtre' : 'La liste des clients est encore vide'}
          hint={q || filter !== 'all'
            ? 'Essayez un autre nom, une autre ville, ou revenez à la liste complète.'
            : 'Chaque organisation qui achète un produit du groupe apparaît ici, avec ses accès, ses factures et son MRR.'}
          action={q || filter !== 'all'
            ? <Btn variant="ghost" onClick={() => { setQ(''); setFilter('all') }}>Voir tous les clients</Btn>
            : <Btn onClick={() => setAdd(true)}><Plus size={16} /> Ajouter un client</Btn>}
        />
      ) : (
      <Table head={['Client', 'Type', 'Localisation', 'Produits', 'MRR', 'Statut', '']}>
        {list.map(c => {
          const prods = productsOfClient(d, c.id)
          return (
            <tr key={c.id} className="hover:bg-canvas cursor-pointer" onClick={() => setDetail(c)}>
              <td className="px-4 py-3"><div className="flex items-center gap-3"><Avatar name={c.name} slot={c.slot} /><div><div className="font-semibold">{c.name}</div><div className="text-xs text-muted">{c.contact}</div></div></div></td>
              <td className="px-4 py-3 text-muted">{c.type}</td>
              <td className="px-4 py-3 text-muted">{c.city}, {c.country}</td>
              <td className="px-4 py-3"><div className="flex gap-1 flex-wrap">{prods.length ? prods.map(p => <span key={p.id} className="text-[10px] font-bold px-2 py-0.5 rounded-full accent-soft accent-text">{p.name.split(' ')[0]}</span>) : <span className="text-xs text-muted">—</span>}</div></td>
              <td className="px-4 py-3 font-bold">{mrrOfClient(d, c.id)} TND</td>
              <td className="px-4 py-3"><Badge status={c.status} /></td>
              <td className="px-4 py-3 text-right"><span className="text-brand text-sm font-semibold">Détails →</span></td>
            </tr>
          )
        })}
      </Table>
      )}

      {/* add client */}
      <Modal open={add} onClose={() => setAdd(false)} title="Ajouter un client"
        footer={<><Btn variant="ghost" onClick={() => setAdd(false)}>Annuler</Btn><Btn onClick={create}>Créer</Btn></>}>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Nom de l'organisation"><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="École / Entreprise" /></Field>
          <Field label="Type"><Select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>École</option><option>Entreprise</option></Select></Field>
          <Field label="Pays"><Input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} /></Field>
          <Field label="Ville"><Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} /></Field>
          <Field label="Contact"><Input value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} /></Field>
          <Field label="Email"><Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Téléphone"><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></Field>
        </div>
      </Modal>

      {detail && <ClientDetail client={detail} onClose={() => setDetail(null)} />}
    </div>
  )
}

function ClientDetail({ client, onClose }) {
  const d = db()
  const accesses = d.accesses.filter(a => a.clientId === client.id)
  const invoices = d.invoices.filter(i => i.clientId === client.id)
  return (
    <Modal open onClose={onClose} size="2xl" title={client.name}>
      <div className="flex items-center gap-3 mb-4">
        <Avatar name={client.name} slot={client.slot} size={48} />
        <div className="flex-1">
          <div className="font-bold text-lg">{client.name}</div>
          <div className="text-sm text-muted">{client.type} · {client.city}, {client.country}</div>
        </div>
        <Badge status={client.status} />
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <Info label="Contact" value={client.contact} />
        <Info label="Email" value={client.email} />
        <Info label="Téléphone" value={client.phone} />
        <Info label="Client depuis" value={client.since} />
        <Info label="MRR" value={`${mrrOfClient(d, client.id)} TND`} />
        <Info label="Produits" value={productsOfClient(d, client.id).map(p => p.name).join(', ') || '—'} />
      </div>

      <div className="text-xs font-bold uppercase tracking-wide accent-text mb-2 flex items-center gap-1.5"><KeyRound size={13} /> Accès provisionnés</div>
      <div className="card divide-y divide-line mb-5">
        {accesses.length ? accesses.map(a => { const pl = planById(a.planId); return (
          <div key={a.id} className="px-4 py-3 flex items-center justify-between gap-3">
            <div className="min-w-0"><div className="font-semibold text-sm">{pl?.product.name} · {pl?.name}</div><div className="text-xs text-muted font-mono truncate">{a.username}</div></div>
            <Badge status={a.status} />
          </div>) }) : <div className="px-4 py-5 text-sm text-muted text-center">Ce client n'a encore aucun accès provisionné.</div>}
      </div>

      <div className="text-xs font-bold uppercase tracking-wide accent-text mb-2 flex items-center gap-1.5"><Receipt size={13} /> Factures</div>
      <div className="card divide-y divide-line">
        {invoices.length ? invoices.map(i => (
          <div key={i.id} className="px-4 py-3 flex items-center justify-between gap-3">
            <div><div className="font-semibold text-sm">{i.id}</div><div className="text-xs text-muted">Émise {i.issued} · échéance {i.due}</div></div>
            <div className="flex items-center gap-3"><span className="font-bold text-sm">{i.amount} TND</span><Badge status={i.status} /></div>
          </div>
        )) : <div className="px-4 py-5 text-sm text-muted text-center">Ce client n'a encore reçu aucune facture.</div>}
      </div>
    </Modal>
  )
}

function Info({ label, value }) {
  return <div className="rounded-xl bg-canvas px-3 py-2.5"><div className="text-[10px] uppercase tracking-wide text-muted font-bold">{label}</div><div className="text-sm font-semibold mt-0.5 break-words">{value}</div></div>
}
