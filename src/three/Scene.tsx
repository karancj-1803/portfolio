import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { MutableRefObject } from 'react'
import { DataField } from './DataField'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'

interface SceneProps {
  scrollProgress: MutableRefObject<number>
  pointer: MutableRefObject<{ x: number; y: number }>
  reducedMotion: boolean
}

function CameraRig({ pointer, reducedMotion }: Pick<SceneProps, 'pointer' | 'reducedMotion'>) {
  const { camera } = useThree()
  useFrame(() => {
    if (reducedMotion) return
    const tx = pointer.current.x * 0.5
    const ty = -pointer.current.y * 0.3
    camera.position.x += (tx - camera.position.x) * 0.02
    camera.position.y += (ty - camera.position.y) * 0.02
    camera.lookAt(0, 0, -2)
  })
  return null
}

export default function Scene({ scrollProgress, pointer, reducedMotion }: SceneProps) {
  const { tier, dpr } = useDeviceCapability()
  const count = tier === 'low' ? 260 : tier === 'mid' ? 480 : 720

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.4} />
      <CameraRig pointer={pointer} reducedMotion={reducedMotion} />
      <DataField count={count} scrollProgress={scrollProgress} pointer={pointer} reducedMotion={reducedMotion} />
    </Canvas>
  )
}
