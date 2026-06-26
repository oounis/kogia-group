import { useMemo } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { TrendingUp, Wallet, Users, Package, FileWarning } from 'lucide-react'
import { db, kpis, revenueByProduct, clientsByProduct, REV_MONTHS, clientById, planById } from '../../db.js'
import { Card, StatCard, PageHead, Badge } from '../../ui.jsx'

export default function Dashboard() {
  const d = useMemo(() => db(), [])
  const k = useMemo(() => kpis(d), [d])
  const revProd = useMemo(() => revenueByProduct(d), [d])
  const cliProd = useMemo(() => clientsByProduct(d), [d])
  const revSeries = d.revenue.map(r => ({ month: r.month, total: r.coreon + r.kharbga + r.coffee, ...r }))

  const recent = [...d.invoices]
    .sort((a, b) => b.issued.localeCompare(a.issued)).slice(0, 6)
    .map(i => ({ ...i, client: clientById(i.clientId), product: planById(i.planId)?.product }))

  return (
    <div>
      <PageHead title="Tableau de bord" sub="Vue consolidée du groupe Kogia · Othman Ounis, Propriétaire" />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <StatCard label="Revenu mensuel récurrent" sub="MRR" tint="brand" icon={<TrendingUp size={22} />} value={`${k.mrr} TND`} />
        <StatCard label="Revenu total encaissé" tint="mint" icon={<Wallet size={22} />} value={`${k.revenueTotal} TND`} />
        <StatCard label="Clients actifs" tint="sky" icon={<Users size={22} />} value={k.activeClients} />
        <StatCard label="Produits vendus" tint="grape" icon={<Package size={22} />} value={k.productsSold} />
        <StatCard label="Factures en attente" sub={`${k.pendingAmount} TND`} tint="coral" icon={<FileWarning size={22} />} value={k.pendingInvoices} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <Card className="p-5 lg:col-span-2">
          <h3 className="font-bold mb-1">Revenu par mois</h3>
          <p className="text-xs text-muted mb-4">6 derniers mois · par marque (TND)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8A93A6' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#8A93A6' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E8EAF2', fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="coreon" name="Coreon Edu" stackId="a" fill="#6C5CE7" radius={[0, 0, 0, 0]} />
              <Bar dataKey="kharbga" name="Kharbga" stackId="a" fill="#E59A12" />
              <Bar dataKey="coffee" name="Kogia Coffee" stackId="a" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-bold mb-1">Revenu par produit</h3>
          <p className="text-xs text-muted mb-4">Part du chiffre encaissé</p>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={revProd} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {revProd.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E8EAF2', fontSize: 13 }} formatter={v => `${v} TND`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {revProd.map(p => (
              <div key={p.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />{p.name}</span>
                <span className="font-bold">{p.value} TND</span>
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
            <BarChart data={cliProd} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 12, fill: '#8A93A6' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11, fill: '#8A93A6' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E8EAF2', fontSize: 13 }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {cliProd.map((e, i) => <Cell key={i} fill={e.color} />)}
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
                  <div className="text-xs text-muted">{i.id} · {i.product?.name} · {i.issued}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-sm">{i.amount} TND</span>
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
