import { useState } from 'react'
import toast from 'react-hot-toast'
import { KeyRound, Plus, Copy, ShieldCheck, Pause, Ban, Play, Link as LinkIcon, Search } from 'lucide-react'
import { db, mutate, uid, PRODUCTS, planById, clientById, genKey, genPassword } from '../../db.js'
import { Card, PageHead, Btn, Badge, Modal, Field, Select, Table, Empty, Avatar } from '../../ui.jsx'

export default function Provisioning() {
  const [, force] = useState(0)
  const refresh = () => force(x => x + 1)
  const d = db()
  const [open, setOpen] = useState(false)
  const [credentials, setCredentials] = useState(null)
  const [q, setQ] = useState('')
  const [clientId, setClientId] = useState('')
  const [productId, setProductId] = useState('')
  const [planId, setPlanId] = useState('')

  const product = PRODUCTS.find(p => p.id === productId)
  const list = d.accesses
    .map(a => ({ ...a, client: clientById(a.clientId), plan: planById(a.planId) }))
    .filter(a => !q || a.client?.name.toLowerCase().includes(q.toLowerCase()) || a.plan?.product.name.toLowerCase().includes(q.toLowerCase()))

  function provision() {
    if (!clientId || !planId) return toast.error('Sélectionnez un client et un plan')
    const client = clientById(clientId)
    const pl = planById(planId)
    const slug = client.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8) || 'client'
    const acc = {
      id: uid('ac'), clientId, planId, status: 'active',
      at: new Date().toISOString().slice(0, 10),
      username: `admin@${slug}.${pl.product.id}`,
      key: genKey(), tempPassword: genPassword(),
      url: `https://${pl.product.id}.kogia.app/${slug}`,
    }
    mutate(d => {
      d.accesses.unshift(acc)
      if (client.status === 'trial') { const c = d.clients.find(x => x.id === clientId); if (c) c.status = 'active' }
    })
    setCredentials({ acc, client, pl })
    setOpen(false); setClientId(''); setProductId(''); setPlanId('')
    toast.success('Accès provisionné')
    refresh()
  }

  function setStatus(id, status) {
    mutate(d => { const a = d.accesses.find(x => x.id === id); if (a) a.status = status })
    toast.success(status === 'active' ? 'Accès réactivé' : status === 'suspended' ? 'Accès suspendu' : 'Accès révoqué')
    refresh()
  }

  const copy = (t) => { navigator.clipboard?.writeText(t); toast.success('Copié') }

  return (
    <div>
      <PageHead title="Provisioning / Accès" sub="Donnez l'accès à un client dès l'achat d'un produit"
        action={<Btn onClick={() => setOpen(true)}><Plus size={16} /> Provisionner un accès</Btn>} />

      <Card className="p-3 mb-4 flex items-center gap-2">
        <Search size={16} className="text-muted ml-1" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher par client ou produit…" className="bg-transparent text-sm outline-none w-full" />
      </Card>

      <Table head={['Client', 'Produit · Plan', 'Compte', 'Clé de licence', 'Statut', 'Actions']}>
        {list.map(a => (
          <tr key={a.id} className="hover:bg-canvas">
            <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar name={a.client?.name} color={a.client?.color} size={30} /><span className="font-semibold">{a.client?.name}</span></div></td>
            <td className="px-4 py-3"><div className="font-semibold text-sm">{a.plan?.product.name}</div><div className="text-xs text-muted">{a.plan?.name}</div></td>
            <td className="px-4 py-3 text-xs font-mono text-muted">{a.username}</td>
            <td className="px-4 py-3"><code className="text-xs bg-canvas px-2 py-1 rounded">{a.key}</code></td>
            <td className="px-4 py-3"><Badge status={a.status} /></td>
            <td className="px-4 py-3">
              <div className="flex gap-1">
                {a.status !== 'active' && <button title="Réactiver" onClick={() => setStatus(a.id, 'active')} className="p-1.5 rounded-lg hover:bg-canvas text-emerald-600"><Play size={15} /></button>}
                {a.status === 'active' && <button title="Suspendre" onClick={() => setStatus(a.id, 'suspended')} className="p-1.5 rounded-lg hover:bg-canvas text-amber-600"><Pause size={15} /></button>}
                {a.status !== 'revoked' && <button title="Révoquer" onClick={() => setStatus(a.id, 'revoked')} className="p-1.5 rounded-lg hover:bg-canvas text-coral"><Ban size={15} /></button>}
              </div>
            </td>
          </tr>
        ))}
        {!list.length && <tr><td colSpan={6}><Empty>Aucun accès provisionné</Empty></td></tr>}
      </Table>

      {/* provision modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Provisionner un accès"
        footer={<><Btn variant="ghost" onClick={() => setOpen(false)}>Annuler</Btn><Btn onClick={provision}><ShieldCheck size={16} /> Générer l'accès</Btn></>}>
        <p className="text-sm text-muted mb-4">Sélectionnez le client, le produit et le plan acheté. Le système génère un compte administrateur, une clé de licence, un mot de passe temporaire et une URL d'accès.</p>
        <div className="space-y-3">
          <Field label="Client">
            <Select value={clientId} onChange={e => setClientId(e.target.value)}>
              <option value="">— Choisir un client —</option>
              {d.clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.city})</option>)}
            </Select>
          </Field>
          <Field label="Produit">
            <Select value={productId} onChange={e => { setProductId(e.target.value); setPlanId('') }}>
              <option value="">— Choisir un produit —</option>
              {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Select>
          </Field>
          {product && (
            <Field label="Plan">
              <Select value={planId} onChange={e => setPlanId(e.target.value)}>
                <option value="">— Choisir un plan —</option>
                {product.plans.map(pl => <option key={pl.id} value={pl.id}>{pl.name} — {pl.price} TND ({pl.blurb})</option>)}
              </Select>
            </Field>
          )}
        </div>
      </Modal>

      {/* credentials reveal */}
      <Modal open={!!credentials} onClose={() => setCredentials(null)} title="Accès créé · identifiants à transmettre"
        footer={<Btn onClick={() => setCredentials(null)}>Terminé</Btn>}>
        {credentials && (
          <div>
            <div className="card p-4 mb-4" style={{ background: '#F2FBF6' }}>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm"><ShieldCheck size={16} /> Accès actif</div>
              <p className="text-sm text-muted mt-1">{credentials.client.name} · {credentials.pl.product.name} {credentials.pl.name}</p>
            </div>
            <div className="space-y-2">
              <CredRow label="URL d'accès" value={credentials.acc.url} icon={<LinkIcon size={14} />} onCopy={copy} mono />
              <CredRow label="Nom d'utilisateur admin" value={credentials.acc.username} onCopy={copy} mono />
              <CredRow label="Mot de passe temporaire" value={credentials.acc.tempPassword} onCopy={copy} mono />
              <CredRow label="Clé de licence / activation" value={credentials.acc.key} icon={<KeyRound size={14} />} onCopy={copy} mono />
            </div>
            <p className="text-xs text-muted mt-4">Le client doit changer le mot de passe à la première connexion. Conservez la clé de licence pour le support.</p>
          </div>
        )}
      </Modal>
    </div>
  )
}

function CredRow({ label, value, onCopy, icon, mono }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5">
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wide text-muted font-bold flex items-center gap-1">{icon}{label}</div>
        <div className={`text-sm font-semibold truncate ${mono ? 'font-mono' : ''}`}>{value}</div>
      </div>
      <button onClick={() => onCopy(value)} className="p-2 rounded-lg hover:bg-canvas text-muted hover:text-ink shrink-0"><Copy size={15} /></button>
    </div>
  )
}
