import { X } from 'lucide-react'
import { useEffect } from 'react'

export function Card({ className='', children }){ return <div className={`card ${className}`}>{children}</div> }

export function StatCard({ label, value, sub, tint='brand', icon }){
  const map={brand:['#EEEBFF','#6C5CE7'],sky:['#E4F7FE','#0BA5D8'],butter:['#FFF4DD','#E59A12'],mint:['#E2FBF3','#10B981'],coral:['#FFE8EC','#FF6B81'],grape:['#F1ECFE','#8B5CF6']}
  const [bg,fg]=map[tint]||map.brand
  return <div className="card p-4 flex items-center gap-3"><span className="w-12 h-12 rounded-2xl grid place-items-center shrink-0" style={{background:bg,color:fg}}>{icon}</span>
    <div className="min-w-0"><div className="text-2xl font-extrabold leading-none">{value}</div><div className="text-xs text-muted mt-1 truncate">{label}{sub&&<span className="ml-1">· {sub}</span>}</div></div></div>
}

export function Badge({ status }){
  const m={
    paid:['#E2FBF3','#10B981','Payé'],pending:['#FFF4DD','#E59A12','En attente'],overdue:['#FFE8EC','#EF4444','En retard'],
    active:['#E2FBF3','#10B981','Actif'],trial:['#E4F7FE','#0BA5D8','Essai'],late:['#FFE8EC','#EF4444','En retard'],
    suspended:['#FFF4DD','#E59A12','Suspendu'],revoked:['#FFE8EC','#EF4444','Révoqué'],
    open:['#FFF4DD','#E59A12','Ouvert'],resolved:['#E2FBF3','#10B981','Résolu'],
    auto:['#E2FBF3','#10B981','Auto'],manual:['#EEF1F6','#8A93A6','Manuel'],
  }
  const [bg,fg,label]=m[status]||['#EEF1F6','#8A93A6',status]
  return <span className="text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap" style={{background:bg,color:fg}}>{label}</span>
}

export function Avatar({ name, initials, color='#6C5CE7', size=36 }){
  const i=initials||(name?name.split(' ').map(w=>w[0]).slice(0,2).join(''):'?')
  return <span className="rounded-full grid place-items-center text-white font-bold shrink-0" style={{width:size,height:size,fontSize:size*0.36,background:color}}>{i}</span>
}

export function Btn({ children, variant='primary', className='', ...p }){
  const base="inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold text-sm px-4 py-2.5 transition disabled:opacity-50 cursor-pointer"
  const v=variant==='primary'?"text-white accent-bg hover:opacity-90":variant==='soft'?"accent-soft accent-text hover:opacity-80":variant==='danger'?"bg-white border border-line text-coral hover:bg-coral-soft":"bg-white border border-line hover:bg-canvas"
  return <button className={`${base} ${v} ${className}`} {...p}>{children}</button>
}

export function Field({ label, children, hint }){ return <label className="block"><span className="text-xs font-semibold text-muted">{label}</span><div className="mt-1">{children}</div>{hint&&<span className="text-[10px] text-muted">{hint}</span>}</label> }
export function Input(p){ return <input {...p} className={`w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm accent-ring ${p.className||''}`}/> }
export function Textarea(p){ return <textarea {...p} className={`w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm accent-ring ${p.className||''}`}/> }
export function Select(p){ return <select {...p} className={`w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm accent-ring ${p.className||''}`}/> }

export function Section({ title, children, cols=2 }){
  return <div className="mb-4"><div className="text-xs font-bold uppercase tracking-wide accent-text mb-2">{title}</div>
    <div className={`grid gap-3 ${cols===2?'sm:grid-cols-2':cols===3?'sm:grid-cols-3':''}`}>{children}</div></div>
}

export function Modal({ open, onClose, title, children, footer, size='lg' }){
  useEffect(()=>{ if(!open) return; const h=e=>e.key==='Escape'&&onClose(); window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h) },[open,onClose])
  if(!open) return null
  const w={lg:'max-w-lg',xl:'max-w-2xl','2xl':'max-w-3xl'}[size]
  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-ink/30 backdrop-blur-sm" onClick={onClose} aria-hidden="true"/>
      <div className="fixed inset-0 grid place-items-center p-4">
        <div className={`card w-full ${w} pop flex flex-col max-h-[90vh]`}>
          <div className="flex items-center justify-between p-5 border-b border-line"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="text-muted hover:text-ink cursor-pointer"><X size={18}/></button></div>
          <div className="p-5 overflow-y-auto scroll-thin">{children}</div>
          {footer&&<div className="p-4 border-t border-line flex justify-end gap-2">{footer}</div>}
        </div>
      </div>
    </div>
  )
}

export function Table({ head, children }){
  return <div className="card overflow-hidden"><div className="overflow-x-auto scroll-thin"><table className="w-full text-sm">
    <thead><tr className="text-left text-[11px] uppercase tracking-wide text-muted bg-canvas">{head.map((h,i)=><th key={i} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
    <tbody className="divide-y divide-line">{children}</tbody></table></div></div>
}

export function PageHead({ title, sub, action }){
  return <div className="flex items-end justify-between gap-3 mb-5 flex-wrap"><div><h1 className="text-2xl font-extrabold">{title}</h1>{sub&&<p className="text-muted mt-0.5">{sub}</p>}</div>{action}</div>
}

export function Empty({ children }){ return <div className="text-center text-muted text-sm py-10">{children}</div> }

export function Mark({ size=34 }){
  return (<svg viewBox="0 0 68 72" width={size} height={size} aria-hidden="true">
    <defs><linearGradient id="kmark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6C5CE7"/><stop offset="1" stopColor="#36C5F0"/></linearGradient></defs>
    <path d="M34 62 C31 52 28 47 22 43 C15 38 10 31 7 22 C18 27 28 33 31 41 L34 46 L37 41 C40 33 50 27 61 22 C58 31 53 38 46 43 C40 47 37 52 34 62 Z" fill="url(#kmark)"/>
  </svg>)
}
