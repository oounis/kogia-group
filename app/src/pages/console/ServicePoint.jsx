import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Check } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { db, mutate, uid, clientById } from '../../db.js'
import { Card, PageHead, Btn, Badge, Modal, Field, Select, Input, EmptyState, Avatar } from '../../ui.jsx'

export default function ServicePoint() {
  const [, force] = useState(0)
  const refresh = () => force(x => x + 1)
  const d = db()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ clientId: '', subject: '', priority: 'medium' })
  const list = [...d.tickets].sort((a, b) => b.at - a.at).map(t => ({ ...t, client: clientById(t.clientId) }))

  function resolve(id) {
    mutate(d => { const t = d.tickets.find(x => x.id === id); if (t) t.status = 'resolved' })
    toast.success('Ticket résolu'); refresh()
  }
  function create() {
    if (!form.clientId || !form.subject.trim()) return toast.error('Champs requis')
    mutate(d => d.tickets.unshift({ id: uid('tk'), ...form, status: 'open', at: Date.now() }))
    toast.success('Ticket créé')
    setOpen(false); setForm({ clientId: '', subject: '', priority: 'medium' }); refresh()
  }

  return (
    <div>
      <PageHead title="Service Point" sub="Demandes de support des clients du groupe"
        action={<Btn onClick={() => setOpen(true)}><Plus size={16} /> Nouveau ticket</Btn>} />

      <div className="space-y-3">
        {list.map(t => {
          return (
            <Card key={t.id} className="p-4 flex items-center gap-4">
              <Avatar name={t.client?.name} slot={t.client?.slot} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{t.subject}</div>
                <div className="text-xs text-muted">{t.client?.name} · {formatDistanceToNow(t.at, { addSuffix: true, locale: fr })}</div>
              </div>
              <Badge status={t.priority} />
              <Badge status={t.status} />
              {t.status === 'open' && <Btn variant="soft" className="!px-3 !py-1.5" onClick={() => resolve(t.id)}><Check size={14} /> Résoudre</Btn>}
            </Card>
          )
        })}
        {!list.length && (
          <EmptyState
            title="Aucune demande de support ouverte"
            hint="Les demandes des clients du groupe arrivent ici. Vous pouvez aussi en consigner une vous-même."
            action={<Btn onClick={() => setOpen(true)}><Plus size={16} /> Nouveau ticket</Btn>}
          />
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Nouveau ticket"
        footer={<><Btn variant="ghost" onClick={() => setOpen(false)}>Annuler</Btn><Btn onClick={create}>Créer</Btn></>}>
        <div className="space-y-3">
          <Field label="Client">
            <Select value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })}>
              <option value="">— Choisir —</option>
              {d.clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </Field>
          <Field label="Sujet"><Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Décrire la demande…" /></Field>
          <Field label="Priorité"><Select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}><option value="low">Basse</option><option value="medium">Moyenne</option><option value="high">Haute</option></Select></Field>
        </div>
      </Modal>
    </div>
  )
}
