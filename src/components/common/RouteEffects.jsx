import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function RouteEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
      } else {
        window.scrollTo({ top: 0, left: 0 })
      }
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [pathname, hash])

  return null
}

export default RouteEffects
