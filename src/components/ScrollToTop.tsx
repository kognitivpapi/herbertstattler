import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function resetScrollPosition() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    resetScrollPosition()
  }, [pathname])

  return null
}
