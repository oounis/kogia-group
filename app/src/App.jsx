import { Component, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landing from './pages/Landing.jsx'
import Console from './pages/Console.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import { hasDb, seedDb, resetDb } from './db.js'
import { Btn, Card, ErrorState, Mark } from './ui.jsx'

/* Erreur (§8.3) : on dit ce qui s'est passé et quoi faire ensuite. Jamais un
   code, jamais « Oups », jamais un écran blanc. */
class Boundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="min-h-screen bg-canvas grid place-items-center p-6">
        <div className="w-full max-w-lg">
          <ErrorState
            title="La console s'est arrêtée en cours de route"
            hint="Rien n'est perdu : les données de démonstration vivent dans ce navigateur. Rechargez la page ; si l'écran revient cassé, repartez d'une base neuve."
            action={
              <div className="flex gap-2">
                <Btn onClick={() => window.location.reload()}>Recharger la console</Btn>
                <Btn variant="ghost" onClick={() => { resetDb(); window.location.reload() }}>Repartir d'une base neuve</Btn>
              </div>
            }
          />
        </div>
      </div>
    )
  }
}

/* Premier lancement (§8.5) : on rencontre l'animal avant de rencontrer un formulaire. */
function FirstRun({ onReady }) {
  const [busy, setBusy] = useState(false)
  function prepare() {
    setBusy(true)
    // Le semis est un vrai travail (écriture locale) : le croissant tourne pendant.
    requestAnimationFrame(() => { seedDb(); onReady() })
  }
  return (
    <div className="min-h-screen bg-canvas grid place-items-center p-6">
      <Card className="w-full max-w-md p-8 text-center k-reveal">
        {/* Le lockup, en petit — pas un logo géant en décor (charte §4.10). */}
        <div className="flex items-center justify-center gap-2.5">
          <span className="w-9 h-9 rounded-xl grid place-items-center accent-bg text-white"><Mark size={22} /></span>
          <span className="font-display font-extrabold tracking-tight">kogia</span>
        </div>
        <h1 className="text-2xl font-extrabold mt-5">Bienvenue dans la Console propriétaire</h1>
        <p className="text-muted text-sm mt-2">
          C'est l'outil interne de Kogia Group : clients, catalogue, accès, factures et abonnements,
          au même endroit. Il tourne ici, dans votre navigateur, sur un jeu de démonstration.
        </p>
        <div className="mt-6"><Btn className="w-full" loading={busy} onClick={prepare}>Préparer la console</Btn></div>
        <p className="text-[11px] text-muted mt-4">par Kogia Group</p>
      </Card>
    </div>
  )
}

export default function App() {
  const [ready, setReady] = useState(() => hasDb())
  if (!ready) return <Boundary><FirstRun onReady={() => setReady(true)} /></Boundary>
  return (
    <Boundary>
      <HashRouter>
        <ScrollToTop />
        {/* Succès (§8.4) : bref, chaleureux, et il s'efface tout seul. */}
        <Toaster position="top-right" toastOptions={{
          duration: 2600,
          style: { borderRadius: '12px', fontSize: '14px', color: '#0E2135', border: '1px solid #DCE3EB', boxShadow: '0 10px 30px -12px rgb(14 33 53 / .12)' },
          success: { iconTheme: { primary: '#12946F', secondary: '#FFFFFF' } },
          error: { iconTheme: { primary: '#DC4B54', secondary: '#FFFFFF' } },
        }} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/console/*" element={<Console />} />
        </Routes>
      </HashRouter>
    </Boundary>
  )
}
