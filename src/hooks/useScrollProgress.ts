import { useEffect, useRef } from 'react'

/**
 * Returns a ref holding normalized scroll progress (0..1) of the whole document,
 * updated via rAF-throttled scroll listener without triggering re-renders.
 */
export function useScrollProgressRef() {
  const progress = useRef(0)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}
