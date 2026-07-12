import { X } from 'lucide-react'
import { useEffect } from 'react'
import { SERIES, STATUS, seriesColor } from './charts.js'

/* ============================================================================
   La marque — la baleine Kogia + le CROISSANT (la fausse fente branchiale).
   Remplace la feuille/étincelle de l'identité v1, retirée par le livre de marque :
   elle ne voulait rien dire et n'existait nulle part ailleurs dans le groupe.
   Géométrie : brand/kogia-mark.svg. Ratio 132×96.
   ========================================================================= */
const BODY = 'M12 54 C12 34 28 22 52 22 C74 22 88 32 91 46 C94 38 99 30 107 25 C105 32 104 38 105 43 C110 41 117 41 124 44 C117 48 111 50 106 50 C102 62 92 70 76 73 C58 76 34 74 22 68 C14 64 12 60 12 54 Z'
const CRESCENT = 'M44 42 q7 9 -1 17'

export function Mark({ size = 34, className = '' }) {
  return (
    <svg viewBox="0 0 132 96" width={size * 132 / 96} height={size} className={className} role="img" aria-label="Kogia">
      <defs>
        <linearGradient id="k-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F57DE" /><stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path fill="url(#k-mark)" d={BODY} />
      <circle cx="34" cy="45" r="4.2" fill="#0E2135" />
      <path d={CRESCENT} fill="none" stroke="#FDF6F0" strokeWidth="3.2" strokeLinecap="round" opacity=".75" />
    </svg>
  )
}

/* Le mascotte : états vides, accueil, succès. Jamais dans un tableau dense. */
export function Mascot({ size = 96, className = '' }) {
  return (
    <svg viewBox="0 0 132 96" width={size * 132 / 96} height={size} className={className} role="img" aria-label="Kogia">
      <defs>
        <linearGradient id="k-mascot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F57DE" /><stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path d="M42 12 q-1 -7 5 -9 M50 12 q4 -6 11 -6" fill="none" stroke="#22D3EE" strokeWidth="3.4" strokeLinecap="round" />
      <path fill="url(#k-mascot)" d={BODY} />
      <circle cx="34" cy="45" r="4.2" fill="#0E2135" />
      <path d={CRESCENT} fill="none" stroke="#FDF6F0" strokeWidth="3.2" strokeLinecap="round" opacity=".75" />
      <path d="M21 56 q8 6 17 6" fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" opacity=".9" />
      <path d="M56 62 q6 8 16 8 q-10 4 -20 -2 Z" fill="#4F57DE" opacity=".5" />
    </svg>
  )
}

/* Attente en ligne : le croissant tourne. Pas un anneau générique. */
export function Crescent({ size = 18, className = '' }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={`k-crescent ${className}`} role="status" aria-label="Chargement">
      <path d="M16 4 a12 12 0 0 1 0 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" opacity=".75" />
    </svg>
  )
}

/* ============================================================================
   Primitives
   ========================================================================= */
export function Card({ className = '', children }) { return <div className={`card ${className}`}>{children}</div> }

/* Les teintes suivent les jetons : marque, violet, ou un ÉTAT (avec son mot). */
const TINTS = {
  brand: ['rgb(79 87 222 / .10)', '#4F57DE'],
  violet: ['rgb(139 92 246 / .12)', '#8B5CF6'],
  ok: [STATUS.ok.bg, STATUS.ok.fg],
  warn: [STATUS.warn.bg, STATUS.warn.fg],
  danger: [STATUS.danger.bg, STATUS.danger.fg],
  info: [STATUS.info.bg, STATUS.info.fg],
  neutral: [STATUS.neutral.bg, STATUS.neutral.fg],
}

export function StatCard({ label, value, sub, tint = 'brand', icon }) {
  const [bg, fg] = TINTS[tint] || TINTS.brand
  return (
    <div className="card p-4 flex items-center gap-3">
      <span className="w-12 h-12 rounded-2xl grid place-items-center shrink-0" style={{ background: bg, color: fg }}>{icon}</span>
      <div className="min-w-0">
        <div className="font-display text-2xl font-extrabold leading-none tabular-nums">{value}</div>
        <div className="text-xs text-muted mt-1 truncate">{label}{sub && <span className="ml-1">· {sub}</span>}</div>
      </div>
    </div>
  )
}

/* Un état ne se lit jamais à la couleur seule : il porte toujours son mot. */
const BADGES = {
  paid: ['ok', 'Payé'], pending: ['warn', 'En attente'], overdue: ['danger', 'En retard'],
  active: ['ok', 'Actif'], trial: ['info', 'Essai'], late: ['danger', 'En retard'],
  suspended: ['warn', 'Suspendu'], revoked: ['danger', 'Révoqué'],
  open: ['warn', 'Ouvert'], resolved: ['ok', 'Résolu'],
  auto: ['ok', 'Auto'], manual: ['neutral', 'Manuel'],
  high: ['danger', 'Haute'], medium: ['warn', 'Moyenne'], low: ['neutral', 'Basse'],
}

export function Badge({ status }) {
  const [key, label] = BADGES[status] || ['neutral', status]
  const s = STATUS[key]
  return <span className="text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: s.bg, color: s.fg }}>{label}</span>
}

/* Initiales sur une teinte douce déterministe. Pas de visage, jamais. */
export function Avatar({ name, initials, slot = 0, size = 36 }) {
  const i = initials || (name ? name.split(' ').map(w => w[0]).slice(0, 2).join('') : '?')
  const c = seriesColor(typeof slot === 'number' ? slot % SERIES.length : 0)
  return (
    <span className="rounded-full grid place-items-center font-bold shrink-0 text-ink"
      style={{ width: size, height: size, fontSize: size * 0.36, background: `color-mix(in srgb, ${c} 16%, #fff)` }}>
      {i}
    </span>
  )
}

export function Btn({ children, variant = 'primary', loading = false, className = '', ...p }) {
  const base = 'inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold text-sm px-4 py-2.5 transition k-press disabled:opacity-50 cursor-pointer'
  const v = variant === 'primary' ? 'text-white accent-bg hover:opacity-90'
    : variant === 'soft' ? 'accent-soft accent-text hover:opacity-80'
      : variant === 'danger' ? 'bg-white border border-line text-danger hover:bg-danger-soft'
        : 'bg-white border border-line hover:bg-canvas'
  return (
    <button className={`${base} ${v} ${className}`} disabled={loading || p.disabled} {...p}>
      {loading ? <Crescent size={16} /> : null}{children}
    </button>
  )
}

export function Field({ label, children, hint }) {
  return <label className="block"><span className="text-xs font-semibold text-muted">{label}</span><div className="mt-1">{children}</div>{hint && <span className="text-[10px] text-muted">{hint}</span>}</label>
}
export function Input(p) { return <input {...p} className={`w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm accent-ring ${p.className || ''}`} /> }
export function Textarea(p) { return <textarea {...p} className={`w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm accent-ring ${p.className || ''}`} /> }
export function Select(p) { return <select {...p} className={`w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm accent-ring ${p.className || ''}`} /> }

export function Section({ title, children, cols = 2 }) {
  return <div className="mb-4"><div className="text-xs font-bold uppercase tracking-wide accent-text mb-2">{title}</div>
    <div className={`grid gap-3 ${cols === 2 ? 'sm:grid-cols-2' : cols === 3 ? 'sm:grid-cols-3' : ''}`}>{children}</div></div>
}

export function Modal({ open, onClose, title, children, footer, size = 'lg' }) {
  useEffect(() => { if (!open) return; const h = e => e.key === 'Escape' && onClose(); window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h) }, [open, onClose])
  if (!open) return null
  const w = { lg: 'max-w-lg', xl: 'max-w-2xl', '2xl': 'max-w-3xl' }[size]
  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-ink/30 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="fixed inset-0 grid place-items-center p-4">
        <div className={`card w-full ${w} pop flex flex-col max-h-[90vh]`}>
          <div className="flex items-center justify-between p-5 border-b border-line"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} aria-label="Fermer" className="text-muted hover:text-ink cursor-pointer"><X size={18} /></button></div>
          <div className="p-5 overflow-y-auto scroll-thin">{children}</div>
          {footer && <div className="p-4 border-t border-line flex justify-end gap-2">{footer}</div>}
        </div>
      </div>
    </div>
  )
}

export function Table({ head, children }) {
  return <div className="card overflow-hidden"><div className="overflow-x-auto scroll-thin"><table className="w-full text-sm">
    <thead><tr className="text-left text-[11px] uppercase tracking-wide text-muted bg-canvas">{head.map((h, i) => <th key={i} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
    <tbody className="divide-y divide-line">{children}</tbody></table></div></div>
}

export function PageHead({ title, sub, action }) {
  return <div className="flex items-end justify-between gap-3 mb-5 flex-wrap"><div><h1 className="text-2xl font-extrabold">{title}</h1>{sub && <p className="text-muted mt-0.5">{sub}</p>}</div>{action}</div>
}

/* ============================================================================
   Les cinq états (§8) — un écran n'est pas conçu tant qu'ils n'existent pas.
   ========================================================================= */

/* 1 — Vide : le mascotte, une phrase en français clair, une action. */
export function EmptyState({ title, hint, action, compact = false }) {
  return (
    <Card className={`grid place-items-center text-center ${compact ? 'p-7' : 'p-10'}`}>
      <Mascot size={compact ? 56 : 80} className="k-float" />
      <div className="font-display font-bold text-ink mt-4">{title}</div>
      {hint && <p className="text-sm text-muted mt-1 max-w-sm">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </Card>
  )
}

/* 2 — Chargement : des squelettes qui ont la forme de la vraie page. */
export function Skeleton({ className = '' }) { return <div className={`k-skeleton ${className}`} /> }

export function SkeletonStats({ n = 5 }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="card p-4 flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
          <div className="flex-1 min-w-0"><Skeleton className="h-5 w-16" /><Skeleton className="h-3 w-24 mt-2" /></div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonChart({ height = 260, className = '' }) {
  return (
    <Card className={`p-5 ${className}`}>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-28 mt-2" />
      <div className="k-skeleton rounded-2xl mt-5" style={{ height }} />
    </Card>
  )
}

export function SkeletonRows({ n = 5 }) {
  return (
    <Card className="p-5">
      <Skeleton className="h-4 w-40" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: n }, (_, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <div className="flex-1"><Skeleton className="h-3.5 w-40" /><Skeleton className="h-3 w-56 mt-2" /></div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </Card>
  )
}

/* 3 — Erreur : ce qui s'est passé, et quoi faire ensuite. Jamais un code. */
export function ErrorState({ title = 'La console n\'a pas pu lire ses données', hint, action }) {
  return (
    <Card className="grid place-items-center text-center p-10">
      <span className="w-14 h-14 rounded-2xl grid place-items-center" style={{ background: STATUS.danger.bg, color: STATUS.danger.fg }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
      </span>
      <div className="font-display font-bold text-ink mt-4">{title}</div>
      <p className="text-sm text-muted mt-1 max-w-md">
        {hint || 'Les données de démonstration sont stockées dans ce navigateur et semblent abîmées. Réinitialiser les recrée à l\'identique — rien n\'est perdu ailleurs.'}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </Card>
  )
}

/* Conservé pour les cellules de tableau : une ligne sobre, jamais « Aucune donnée ». */
export function Empty({ children }) { return <div className="text-center text-muted text-sm py-10">{children}</div> }
