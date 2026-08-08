import { useEffect, useRef } from 'react'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'

/**
 * Minimal two-part cursor (dot + ring). Reads/writes DOM directly on every
 * pointer event — no React state — so it never triggers a re-render.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const { isTouch } = useDeviceCapability()

  useEffect(() => {
    if (isTouch) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let ringX = window.innerWidth / 2
    let ringY = window.innerHeight / 2
    let targetX = ringX
    let targetY = ringY

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`
    }

    const setLabel = (text: string) => {
      ring.textContent = text
    }

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      const magnetic = target.closest<HTMLElement>('[data-cursor]')
      if (magnetic) {
        const label = magnetic.dataset.cursor || ''
        ring.style.width = label ? '64px' : '48px'
        ring.style.height = label ? '64px' : '48px'
        ring.style.borderColor = 'rgba(103,232,249,0.85)'
        ring.style.background = 'rgba(56,189,248,0.08)'
        setLabel(label)
      } else {
        ring.style.width = '34px'
        ring.style.height = '34px'
        ring.style.borderColor = 'rgba(103,232,249,0.5)'
        ring.style.background = 'transparent'
        setLabel('')
      }
    }

    let raf = 0
    const loop = () => {
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
