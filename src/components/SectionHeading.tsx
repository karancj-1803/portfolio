import Reveal from './Reveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ index, eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}>
      <Reveal>
        <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="section-index font-mono text-xs text-signal-500">{index}</span>
          <span className="h-px w-8 bg-signal-500/40" />
          <span className="section-index font-mono text-xs uppercase text-mist">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display font-bold text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.08] text-frost text-balance">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-mist text-[15px] leading-relaxed max-w-xl text-balance">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
