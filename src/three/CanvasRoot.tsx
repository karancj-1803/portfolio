import { lazy, Suspense, useEffect, useState } from 'react'
import type { MutableRefObject } from 'react'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'

const Scene = lazy(() => import('./Scene'))

interface CanvasRootProps {
  scrollProgress: MutableRefObject<number>
  pointer: MutableRefObject<{ x: number; y: number }>
  reducedMotion: boolean
}

/**
 * Mounts the persistent WebGL data-flow background exactly once, deferring
 * the (heavy) three.js chunk until after first paint, and falling back to a
 * static gradient when WebGL is unavailable.
 */
export default function CanvasRoot({ scrollProgress, pointer, reducedMotion }: CanvasRootProps) {
  const { supportsWebGL } = useDeviceCapability()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!supportsWebGL) return
    const id = ('requestIdleCallback' in window ? (window as any).requestIdleCallback : (cb: () => void) => setTimeout(cb, 200))(
      () => setReady(true),
    )
    return () => {
      if ('cancelIdleCallback' in window) (window as any).cancelIdleCallback(id)
    }
  }, [supportsWebGL])

  if (!supportsWebGL) {
    return (
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(60% 50% at 50% 30%, rgba(56,189,248,0.10), transparent), linear-gradient(180deg, #020817, #030B18)',
        }}
      />
    )
  }

  return (
    <>
      <Suspense fallback={null}>
        {ready && <Scene scrollProgress={scrollProgress} pointer={pointer} reducedMotion={reducedMotion} />}
      </Suspense>
      {/* Recedes the data field behind foreground copy — keeps text legible
          without needing a card background on every block. */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(120% 70% at 50% 0%, transparent 0%, rgba(2,8,23,0.35) 60%, rgba(2,8,23,0.72) 100%), linear-gradient(180deg, rgba(2,8,23,0.15), rgba(2,8,23,0.15))',
        }}
      />
    </>
  )
}
