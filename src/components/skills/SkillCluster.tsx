import type { SkillCategory } from '@/data/skills'

interface SkillClusterProps {
  category: SkillCategory
  active: boolean
  dimmed: boolean
  onEnter: () => void
  onLeave: () => void
}

export default function SkillCluster({ category, active, dimmed, onEnter, onLeave }: SkillClusterProps) {
  const radius = 40

  return (
    <div
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={onEnter}
      className={`relative rounded-2xl border p-6 min-h-[220px] transition-all duration-500 cursor-pointer ${
        active
          ? 'border-signal-500/50 bg-signal-500/[0.06]'
          : dimmed
            ? 'border-signal-500/5 opacity-40'
            : 'border-signal-500/12 hover:border-signal-500/25'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full" style={{ background: category.color, boxShadow: `0 0 8px ${category.color}` }} />
        <h3 className="font-display font-semibold text-sm tracking-wide text-frost">{category.label}</h3>
      </div>

      <div
        className={`relative mt-6 transition-all duration-500 ${active ? 'min-h-[220px]' : 'min-h-0'}`}
      >
        {active ? (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            {category.skills.map((_, i) => {
              const angle = (i / category.skills.length) * Math.PI * 2 - Math.PI / 2
              const x = 50 + Math.cos(angle) * radius
              const y = 50 + Math.sin(angle) * radius
              return <line key={i} x1={50} y1={20} x2={x} y2={y} stroke={category.color} strokeWidth="0.4" opacity="0.3" />
            })}
          </svg>
        ) : null}

        <div className={`flex flex-wrap gap-2 ${active ? '' : 'opacity-80'}`}>
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-mono px-2.5 py-1 rounded-md border transition-all duration-300"
              style={{
                borderColor: active ? `${category.color}55` : 'rgba(56,189,248,0.1)',
                color: active ? '#DDF7FF' : '#7C93AD',
                transform: active ? 'translateY(0)' : 'translateY(0)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
