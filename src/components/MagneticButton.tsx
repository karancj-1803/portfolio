import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'outline'
  cursorLabel?: string
  target?: string
  rel?: string
  className?: string
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'solid',
  cursorLabel,
  target,
  rel,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const { isTouch } = useDeviceCapability()

  useEffect(() => {
    const el = ref.current
    if (!el || isTouch) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`
    }
    const onLeave = () => {
      el.style.transform = 'translate(0px, 0px)'
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [isTouch])

  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display font-medium text-sm transition-[transform,box-shadow,background,border-color] duration-300 ease-out will-change-transform'
  const solid = 'bg-signal-500 text-void-950 hover:shadow-glow hover:bg-signal-400'
  const outline = 'border border-signal-500/30 text-frost hover:border-signal-500/70 hover:bg-signal-500/5'

  const cls = `${base} ${variant === 'solid' ? solid : outline} ${className}`

  if (href) {
    return (
      <a ref={ref as any} href={href} target={target} rel={rel} data-cursor={cursorLabel} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref as any} onClick={onClick} data-cursor={cursorLabel} className={cls}>
      {children}
    </button>
  )
}
