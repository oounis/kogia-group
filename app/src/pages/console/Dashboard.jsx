import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, Wallet, Users, Package, FileWarning, Plus } from 'lucide-react'
import { useDb, kpis, revenueByProduct, clientsByProduct, clientById, planById } from '../../db.js'
import { foldSeries, seriesColor, gridProps, axisProps, axisPropsSm, tooltipProps, BAR_RADIUS, BAR_RADIUS_H } from '../../charts.js'
import { Card, StatCard, PageHead, Badge, Btn, EmptyState, ErrorState, SkeletonStats, SkeletonChart, SkeletonRows } from '../../ui.jsx'

export default function Dashboard() {
  const { data: d, loading, error, reload } = useDb()

  const revProd = useMemo(() => d ? foldSeries(revenueByProduct(d)) : [], [d])
  const cliProd = useMemo(() => d ? foldSeries(clientsByProduct(d)) : [], [d])
  const k = useMemo(() => d ? kpis(d) : null, [d])

  if (loading) {
    return (
      <div>
        <PageHead title="Tableau de bord" sub="Vue consolidée du groupe Kogia · Othman Ounis, Propriétaire" />
        <SkeletonStats />
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          <SkeletonChart className="lg:col-span-2" height={260} />
          <SkeletonChart height={230} />
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <SkeletonChart height={220} />
          <div className="lg:col-span-2"><SkeletonRows n={6} /></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <PageHead title="Tableau de bord" />
        <ErrorState action={<Btn onClick={reload}>Réessayer</Btn>} />
      </div>
    )
  }

  // Rien encore vendu : on ne montre pas des graphiques vides, on dit quoi faire.
  if (!d.clients.length && !d.invoices.length) {
    return (
      <div>
        <PageHead title="Tableau de bord" sub="Vue consolidée du groupe Kogia · Othman Ounis, Propriétaire" />
        <EmptyState
          title="Le groupe n'a encore aucun client"
          hint="Le tableau de bord se remplit tout seul dès le premier client et la première facture. Commencez par ajouter un client."
          action={<Link to="/console/clients"><Btn><Plus size={16} /> Ajouter un client</Btn></Link>}
        />
      </div>
    )
  }

  const revSeries = d.revenue.map(r => ({ month: r.month, coreon: r.coreon }))
  const recent = [...d.invoices]
    .sort((a, b) => b.issued.localeCompare(a.issued)).slice(0, 6)
    .map(i => ({ ...i, client: clientById(i.clientId), product: planById(i.planId)?.product }))

  return (
    <div>
      <PageHead title="Tableau de bord" sub="Vue consolidée du groupe Kogia · Othman Ounis, Propriétaire" />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <StatCard label="Revenu mensuel récurrent" sub="MRR" tint="brand" icon={<TrendingUp size={22} />} value={`${k.mrr} TND`} />
        <StatCard label="Revenu total encaissé" tint="ok" icon={<Wallet size={22} />} value={`${k.revenueTotal} TND`} />
        <StatCard label="Clients actifs" tint="info" icon={<Users size={22} />} value={k.activeClients} />
        <StatCard label="Produits vendus" tint="violet" icon={<Package size={22} />} value={k.productsSold} />
        <StatCard label="Factures en attente" sub={`${k.pendingAmount} TND`} tint="warn" icon={<FileWarning size={22} />} value={k.pendingInvoices} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <Card className="p-5 lg:col-span-2">
          <h3 className="font-bold mb-1">Revenu par mois</h3>
          <p className="text-xs text-muted mb-4">6 derniers mois · par marque (TND)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revSeries} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" {...axisProps} />
              <YAxis {...axisProps} width={52} />
              <Tooltip {...tooltipProps} formatter={v => [`${v} TND`, 'Coreon Edu']} />
              <Bar dataKey="coreon" name="Coreon Edu" fill={seriesColor(0)} radius={BAR_RADIUS} maxBarSize={44} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-bold mb-1">Revenu par produit</h3>
          <p className="text-xs text-muted mb-4">Part du chiffre encaissé</p>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={revProd} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
                {revProd.map(e => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip {...tooltipProps} cursor={false} formatter={v => `${v} TND`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {revProd.map(p => (
              <div key={p.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.color }} />{p.name}</span>
                <span className="font-bold tabular-nums">{p.value} TND</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <h3 className="font-bold mb-1">Clients par produit</h3>
          <p className="text-xs text-muted mb-4">Nombre de clients équipés</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cliProd} layout="vertical" margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid {...gridProps} horizontal={false} vertical />
              <XAxis type="number" allowDecimals={false} {...axisProps} />
              <YAxis type="category" dataKey="name" width={92} {...axisPropsSm} />
              <Tooltip {...tooltipProps} formatter={v => [`${v}`, 'Clients équipés']} />
              <Bar dataKey="value" radius={BAR_RADIUS_H} maxBarSize={36}>
                {cliProd.map(e => <Cell key={e.name} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h3 className="font-bold mb-1">Activité récente</h3>
          <p className="text-xs text-muted mb-4">Dernières factures émises</p>
          <div className="divide-y divide-line">
            {recent.map(i => (
              <div key={i.id} className="flex items-center justify-between py-2.5 gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{i.client?.name}</div>
                  <div className="text-xs text-muted truncate">{i.id} · {i.product?.name} · {i.issued}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-sm tabular-nums">{i.amount} TND</span>
                  <Badge status={i.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
