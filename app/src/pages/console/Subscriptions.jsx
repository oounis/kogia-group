import { useState } from 'react'
import toast from 'react-hot-toast'
import { RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { db, mutate, clientById, planById } from '../../db.js'
import { PageHead, Badge, Table, EmptyState, Avatar, Btn } from '../../ui.jsx'

export default function Subscriptions() {
  const [, force] = useState(0)
  const d = db()
  const list = d.subs.map(s => ({ ...s, client: clientById(s.clientId), plan: planById(s.planId) }))

  function toggleAuto(id) {
    mutate(d => { const s = d.subs.find(x => x.id === id); if (s) s.auto = !s.auto })
    toast.success('Renouvellement mis à jour'); force(x => x + 1)
  }

  return (
    <div>
      <PageHead title="Abonnements" sub="Abonnements actifs, sièges et prochaines échéances" />
      {!list.length ? (
        <EmptyState
          title="Aucun abonnement en cours"
          hint="Un abonnement naît d'un accès provisionné : il porte les sièges, le montant et la prochaine échéance."
          action={<Link to="/console/provisioning"><Btn>Provisionner un accès</Btn></Link>}
        />
      ) : (
      <Table head={['Client', 'Produit · Plan', 'Sièges', 'Prochaine échéance', 'Montant', 'Renouvellement', '']}>
        {list.map(s => (
          <tr key={s.id} className="hover:bg-canvas">
            <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar name={s.client?.name} slot={s.client?.slot} size={30} /><span className="font-semibold">{s.client?.name}</span></div></td>
            <td className="px-4 py-3"><div className="font-semibold text-sm">{s.plan?.product.name}</div><div className="text-xs text-muted">{s.plan?.name}</div></td>
            <td className="px-4 py-3 text-muted">{s.seats ? s.seats : '—'}</td>
            <td className="px-4 py-3 text-muted">{s.nextDue}</td>
            <td className="px-4 py-3 font-bold">{s.plan?.price} TND<span className="text-xs text-muted font-normal">/{s.plan?.period === 'mois' ? 'mois' : s.plan?.period === 'an' ? 'an' : 'u'}</span></td>
            <td className="px-4 py-3"><Badge status={s.auto ? 'auto' : 'manual'} /></td>
            <td className="px-4 py-3 text-right"><Btn variant="ghost" className="!px-3 !py-1.5" onClick={() => toggleAuto(s.id)}><RefreshCw size={14} /> {s.auto ? 'Désactiver' : 'Activer'} auto</Btn></td>
          </tr>
        ))}
      </Table>
      )}
    </div>
  )
}
