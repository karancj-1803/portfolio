import { useEffect, useState } from 'react'

export type DeviceTier = 'low' | 'mid' | 'high'

export interface DeviceCapability {
  tier: DeviceTier
  isTouch: boolean
  isMobile: boolean
  dpr: number
  supportsWebGL: boolean
}

function detect(): DeviceCapability {
  if (typeof window === 'undefined') {
    return { tier: 'mid', isTouch: false, isMobile: false, dpr: 1, supportsWebGL: true }
  }

  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
  const isMobile = window.innerWidth < 768
  const cores = navigator.hardwareConcurrency || 4
  const mem = (navigator as any).deviceMemory || 4

  let supportsWebGL = true
  try {
    const canvas = document.createElement('canvas')
    supportsWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    supportsWebGL = false
  }

  let tier: DeviceTier = 'high'
  if (isMobile || cores <= 4 || mem <= 4) tier = 'low'
  else if (cores <= 8 || mem <= 8) tier = 'mid'

  const dpr = Math.min(window.devicePixelRatio || 1, tier === 'low' ? 1.5 : tier === 'mid' ? 2 : 2)

  return { tier, isTouch, isMobile, dpr, supportsWebGL }
}

export function useDeviceCapability(): DeviceCapability {
  const [caps, setCaps] = useState<DeviceCapability>(() => detect())

  useEffect(() => {
    const onResize = () => setCaps(detect())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return caps
}
