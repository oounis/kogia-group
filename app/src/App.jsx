import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landing from './pages/Landing.jsx'
import Console from './pages/Console.jsx'

export default function App() {
  return (
    <HashRouter>
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: '12px', fontSize: '14px' } }} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/console/*" element={<Console />} />
      </Routes>
    </HashRouter>
  )
}
