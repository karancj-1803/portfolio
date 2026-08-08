import { useEffect, useRef } from 'react'

export interface PointerState {
  x: number // normalized -1..1
  y: number // normalized -1..1
  px: number // raw pixel x
  py: number // raw pixel y
}

/**
 * Tracks pointer position into a ref (no React state updates) so that
 * 3D / animation render loops can read it every frame without re-rendering
 * the component tree on every mousemove.
 */
export function usePointerRef() {
  const pointer = useRef<PointerState>({ x: 0, y: 0, px: 0, py: 0 })

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      pointer.current.px = e.clientX
      pointer.current.py = e.clientY
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return pointer
}
