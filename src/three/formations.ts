// Procedural particle-position generators for each narrative "formation" the
// background data-flow evolves through as the visitor scrolls. Each function
// returns a Float32Array of length count*3 (x,y,z per particle) so the
// render loop can lerp between two formations without any per-frame
// allocation.

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export type FormationName = 'cloud' | 'timeline' | 'pipeline' | 'graph' | 'orbital' | 'convergence'

export function makeCloud(count: number): Float32Array {
  const rand = seededRandom(1)
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = 4 + rand() * 5
    const theta = rand() * Math.PI * 2
    const phi = Math.acos(rand() * 2 - 1)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
    arr[i * 3 + 2] = r * Math.cos(phi) - 2
  }
  return arr
}

export function makeTimeline(count: number): Float32Array {
  const rand = seededRandom(2)
  const arr = new Float32Array(count * 3)
  const clusters = 3
  for (let i = 0; i < count; i++) {
    const c = i % clusters
    const cx = (c - 1) * 5.2
    const spread = 1.1
    arr[i * 3] = cx + (rand() - 0.5) * spread
    arr[i * 3 + 1] = (rand() - 0.5) * spread + Math.sin(cx * 0.5) * 0.6
    arr[i * 3 + 2] = (rand() - 0.5) * spread - 2
  }
  return arr
}

export function makePipeline(count: number): Float32Array {
  const rand = seededRandom(3)
  const arr = new Float32Array(count * 3)
  const layers = 5
  for (let i = 0; i < count; i++) {
    const layer = i % layers
    const x = (layer - (layers - 1) / 2) * 3.4
    arr[i * 3] = x + (rand() - 0.5) * 0.5
    arr[i * 3 + 1] = (rand() - 0.5) * 4.5
    arr[i * 3 + 2] = (rand() - 0.5) * 1.5 - 2
  }
  return arr
}

export function makeGraph(count: number): Float32Array {
  const rand = seededRandom(4)
  const arr = new Float32Array(count * 3)
  const nodeClusters = 6
  const clusterCenters: [number, number, number][] = []
  for (let c = 0; c < nodeClusters; c++) {
    const angle = (c / nodeClusters) * Math.PI * 2
    clusterCenters.push([Math.cos(angle) * 4.2, Math.sin(angle) * 3, -2 + (rand() - 0.5)])
  }
  for (let i = 0; i < count; i++) {
    const c = clusterCenters[i % nodeClusters]
    arr[i * 3] = c[0] + (rand() - 0.5) * 0.9
    arr[i * 3 + 1] = c[1] + (rand() - 0.5) * 0.9
    arr[i * 3 + 2] = c[2] + (rand() - 0.5) * 0.9
  }
  return arr
}

export function makeOrbital(count: number): Float32Array {
  const rand = seededRandom(5)
  const arr = new Float32Array(count * 3)
  const rings = 4
  for (let i = 0; i < count; i++) {
    const ring = i % rings
    const r = 2.2 + ring * 1.6
    const theta = rand() * Math.PI * 2
    arr[i * 3] = Math.cos(theta) * r
    arr[i * 3 + 1] = Math.sin(theta) * r * 0.5
    arr[i * 3 + 2] = -2 + Math.sin(theta * 2) * 0.6
  }
  return arr
}

export function makeConvergence(count: number): Float32Array {
  const rand = seededRandom(6)
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = rand() * 0.6
    const theta = rand() * Math.PI * 2
    const phi = Math.acos(rand() * 2 - 1)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi) - 2
  }
  return arr
}

export const FORMATION_BUILDERS: Record<FormationName, (count: number) => Float32Array> = {
  cloud: makeCloud,
  timeline: makeTimeline,
  pipeline: makePipeline,
  graph: makeGraph,
  orbital: makeOrbital,
  convergence: makeConvergence,
}

export interface ScrollStop {
  t: number
  formation: FormationName
}

export const SCROLL_STOPS: ScrollStop[] = [
  { t: 0, formation: 'cloud' },
  { t: 0.16, formation: 'timeline' },
  { t: 0.38, formation: 'pipeline' },
  { t: 0.56, formation: 'graph' },
  { t: 0.74, formation: 'orbital' },
  { t: 1.0, formation: 'convergence' },
]
