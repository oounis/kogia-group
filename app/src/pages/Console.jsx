import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Package, KeyRound, Receipt, RefreshCw, LifeBuoy, ChevronLeft, Bell } from 'lucide-react'
import { Mark, Avatar } from '../ui.jsx'
import Dashboard from './console/Dashboard.jsx'
import Clients from './console/Clients.jsx'
import Catalogue from './console/Catalogue.jsx'
import Provisioning from './console/Provisioning.jsx'
import Billing from './console/Billing.jsx'
import Subscriptions from './console/Subscriptions.jsx'
import ServicePoint from './console/ServicePoint.jsx'

const NAV = [
  { to: '/console', end: true, icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/console/clients', icon: Users, label: 'Clients' },
  { to: '/console/catalogue', icon: Package, label: 'Catalogue' },
  { to: '/console/provisioning', icon: KeyRound, label: 'Provisioning / Accès' },
  { to: '/console/facturation', icon: Receipt, label: 'Facturation & Paiements' },
  { to: '/console/abonnements', icon: RefreshCw, label: 'Abonnements' },
  { to: '/console/support', icon: LifeBuoy, label: 'Service Point' },
]

export default function Console() {
  const loc = useLocation()
  const current = NAV.find(n => n.end ? loc.pathname === n.to : loc.pathname.startsWith(n.to) && n.to !== '/console') || NAV[0]
  return (
    <div className="min-h-screen bg-canvas flex">
      {/* sidebar */}
      <aside className="w-64 shrink-0 bg-white border-r border-line hidden md:flex flex-col fixed h-screen">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-line">
          <Mark size={30} />
          <div className="leading-tight">
            <div className="font-display font-extrabold">Kogia Group</div>
            <div className="text-[10px] tracking-widest uppercase text-muted">Console</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scroll-thin">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${isActive ? 'accent-bg text-white' : 'text-muted hover:bg-canvas hover:text-ink'}`}>
              <n.icon size={18} /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-line">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted hover:text-ink hover:bg-canvas">
            <ChevronLeft size={16} /> Retour au site
          </Link>
          <div className="flex items-center gap-3 px-3 py-2 mt-1">
            <Avatar name="Othman Ounis" size={36} />
            <div className="min-w-0">
              <div className="text-sm font-bold truncate">Othman Ounis</div>
              <div className="text-[11px] text-muted">Propriétaire</div>
            </div>
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="flex-1 md:ml-64 min-w-0">
        <header className="h-16 bg-white border-b border-line sticky top-0 z-20 flex items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <current.icon size={18} className="text-brand" />
            <span className="font-bold">{current.label}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-muted hover:text-ink relative"><Bell size={18} /><span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-coral" /></button>
            <div className="flex items-center gap-2"><Avatar name="Othman Ounis" size={30} /><span className="text-sm font-semibold hidden sm:block">Othman</span></div>
          </div>
        </header>
        <main className="p-5 md:p-8 max-w-7xl mx-auto">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="catalogue" element={<Catalogue />} />
            <Route path="provisioning" element={<Provisioning />} />
            <Route path="facturation" element={<Billing />} />
            <Route path="abonnements" element={<Subscriptions />} />
            <Route path="support" element={<ServicePoint />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
