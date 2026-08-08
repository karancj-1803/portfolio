import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'span'
}

export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const reducedMotion = useReducedMotion()
  const Tag = as as any

  const style: CSSProperties = reducedMotion
    ? {}
    : {
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        opacity: inView ? 1 : 0,
        transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity 0.9s ease ${delay}s`,
      }

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}
