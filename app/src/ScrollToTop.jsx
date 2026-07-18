import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// À chaque changement de page (y compris entre les sections de la console),
// on remonte en haut. Sans ça, ouvrir une section depuis le bas d'une longue
// page l'affichait à mi-hauteur. On ne réagit qu'au chemin — le défilement
// d'une ancre dans une même page n'est pas interrompu.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}
