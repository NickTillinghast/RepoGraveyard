import { useEffect, useState } from 'react'

function currentRoute() {
  return window.location.hash.replace(/^#/, '') || '/'
}

// Tiny hash router: "#/graveyard" -> "/graveyard". Hash URLs work on any static host.
export function useHashRoute() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onChange = () => {
      setRoute(currentRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
