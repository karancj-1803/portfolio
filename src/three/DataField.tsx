import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { FORMATION_BUILDERS, SCROLL_STOPS } from './formations'
import type { MutableRefObject } from 'react'

interface DataFieldProps {
  count: number
  scrollProgress: MutableRefObject<number>
  pointer: MutableRefObject<{ x: number; y: number }>
  reducedMotion: boolean
}

const COLOR_A = new THREE.Color('#38BDF8')
const COLOR_B = new THREE.Color('#67E8F9')

export function DataField({ count, scrollProgress, pointer, reducedMotion }: DataFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const groupRef = useRef<THREE.Group>(null)

  const formations = useMemo(() => {
    const entries: Record<string, Float32Array> = {}
    for (const stop of SCROLL_STOPS) {
      if (!entries[stop.formation]) entries[stop.formation] = FORMATION_BUILDERS[stop.formation](count)
    }
    return entries
  }, [count])

  const positions = useMemo(() => new Float32Array(count * 3), [count])
  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const c = COLOR_A.clone().lerp(COLOR_B, Math.random())
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    }
    return arr
  }, [count])

  // Static chain connections for a visible subset — cheap, reused geometry.
  const linkCount = Math.min(70, count)
  const linePositions = useMemo(() => new Float32Array((linkCount - 1) * 2 * 3), [linkCount])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [positions, colors])

  const lineGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    return g
  }, [linePositions])

  const t = useRef(0)

  useFrame((state, delta) => {
    const progress = scrollProgress.current
    t.current += delta

    // find segment
    let i = 0
    while (i < SCROLL_STOPS.length - 2 && progress > SCROLL_STOPS[i + 1].t) i++
    const a = SCROLL_STOPS[i]
    const b = SCROLL_STOPS[i + 1]
    const localT = b.t > a.t ? Math.min(1, Math.max(0, (progress - a.t) / (b.t - a.t))) : 0

    const from = formations[a.formation]
    const to = formations[b.formation]
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute

    const wobble = reducedMotion ? 0 : Math.sin(t.current * 0.6) * 0.05

    for (let p = 0; p < count; p++) {
      const idx = p * 3
      const fx = from[idx] + (to[idx] - from[idx]) * localT
      const fy = from[idx + 1] + (to[idx + 1] - from[idx + 1]) * localT
      const fz = from[idx + 2] + (to[idx + 2] - from[idx + 2]) * localT
      posAttr.array[idx] = fx + (reducedMotion ? 0 : Math.sin(t.current * 0.4 + p) * 0.03)
      posAttr.array[idx + 1] = fy + wobble * Math.cos(p)
      posAttr.array[idx + 2] = fz
    }
    posAttr.needsUpdate = true

    // update chain line connecting first `linkCount` particles
    if (linesRef.current) {
      const lp = lineGeometry.getAttribute('position') as THREE.BufferAttribute
      for (let li = 0; li < linkCount - 1; li++) {
        const i0 = li * 3
        const i1 = (li + 1) * 3
        lp.array[li * 6] = posAttr.array[i0]
        lp.array[li * 6 + 1] = posAttr.array[i0 + 1]
        lp.array[li * 6 + 2] = posAttr.array[i0 + 2]
        lp.array[li * 6 + 3] = posAttr.array[i1]
        lp.array[li * 6 + 4] = posAttr.array[i1 + 1]
        lp.array[li * 6 + 5] = posAttr.array[i1 + 2]
      }
      lp.needsUpdate = true

      // connections are most meaningful during pipeline/graph formations
      const connectionWeight =
        a.formation === 'pipeline' || b.formation === 'pipeline' || a.formation === 'graph' || b.formation === 'graph'
          ? 0.18
          : 0.045
      ;(linesRef.current.material as THREE.LineBasicMaterial).opacity = connectionWeight
    }

    // gentle group rotation + pointer parallax
    if (groupRef.current) {
      const targetRotY = pointer.current.x * 0.15
      const targetRotX = pointer.current.y * 0.08
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03
      if (!reducedMotion) groupRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.038}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#38BDF8" transparent opacity={0.07} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  )
}
