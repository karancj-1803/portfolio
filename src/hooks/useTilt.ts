import { useEffect, useRef } from 'react'

interface TiltOptions {
  max?: number // max rotation degrees
  scale?: number
  disabled?: boolean
}

/**
 * Applies a subtle pointer-driven perspective tilt to a DOM element via
 * direct style mutation (no React state), with spring-like easing back to rest.
 */
export function useTilt<T extends HTMLElement>({ max = 8, scale = 1.01, disabled = false }: TiltOptions = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || disabled) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0

    const loop = () => {
      curX += (targetX - curX) * 0.1
      curY += (targetY - curY) * 0.1
      el.style.transform = `perspective(900px) rotateX(${curY}deg) rotateY(${curX}deg) scale3d(${scale}, ${scale}, ${scale})`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      targetX = (px - 0.5) * max * 2
      targetY = -(py - 0.5) * max * 2
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [max, scale, disabled])

  return ref
}
