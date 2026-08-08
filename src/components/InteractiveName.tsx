import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'

const LAYERS = 7
const MAX_ROTATE = 8

/**
 * A dimensional, pointer-reactive rendering of "KARAN C J" built from
 * stacked text layers offset in Z (CSS 3D) rather than a WebGL text mesh —
 * cheaper, sharper at any resolution, and fully accessible as real text.
 */
export default function InteractiveName() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { isTouch } = useDeviceCapability()

  useEffect(() => {
    const wrap = wrapRef.current
    const stage = stageRef.current
    if (!wrap || !stage) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0
    let idleT = 0

    const loop = () => {
      idleT += 0.006
      if (isTouch || reducedMotion) {
        targetX = reducedMotion ? 0 : Math.sin(idleT) * 3
        targetY = reducedMotion ? 0 : Math.cos(idleT * 0.8) * 2
      }
      curX += (targetX - curX) * 0.08
      curY += (targetY - curY) * 0.08
      stage.style.transform = `rotateX(${curY}deg) rotateY(${curX}deg)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      if (isTouch || reducedMotion) return
      const rect = wrap.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      targetX = (px - 0.5) * MAX_ROTATE * 2
      targetY = -(py - 0.5) * MAX_ROTATE * 2
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    if (!isTouch && !reducedMotion) {
      window.addEventListener('pointermove', onMove, { passive: true })
      wrap.addEventListener('pointerleave', onLeave)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [isTouch, reducedMotion])

  const layers = Array.from({ length: LAYERS })

  return (
    <div
      ref={wrapRef}
      className="select-none"
      style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
    >
      <div
        ref={stageRef}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        className="relative"
      >
        {layers.map((_, i) => {
          const depth = i - LAYERS + 1 // negative, back layers further away
          const isFront = i === LAYERS - 1
          return (
            <h1
              key={i}
              aria-hidden={!isFront}
              className="font-display font-extrabold tracking-tight leading-[0.95] whitespace-nowrap absolute inset-0"
              style={{
                transform: `translateZ(${depth * 2.4}px)`,
                fontSize: 'clamp(3.2rem, 12vw, 8.5rem)',
                color: isFront ? '#DDF7FF' : `rgba(15, 42, 71, ${0.9 - i * 0.03})`,
                WebkitTextStroke: isFront ? '0px' : undefined,
                textShadow: isFront
                  ? '0 0 1px rgba(221,247,255,0.5), 0 2px 40px rgba(56,189,248,0.35), 0 0 90px rgba(56,189,248,0.18)'
                  : 'none',
              }}
            >
              KARAN C J
            </h1>
          )
        })}
        {/* spacer to give the absolutely-positioned stack real layout height */}
        <h1
          className="font-display font-extrabold tracking-tight leading-[0.95] whitespace-nowrap opacity-0 pointer-events-none"
          style={{ fontSize: 'clamp(3.2rem, 12vw, 8.5rem)' }}
        >
          KARAN C J
        </h1>
      </div>
    </div>
  )
}
