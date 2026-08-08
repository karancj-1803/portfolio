import { useState } from 'react'
import { flagshipProject } from '@/data/flagship'

const TABS: { key: keyof typeof flagshipProject.caseStudy; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'pipelineDesc', label: 'Pipeline' },
  { key: 'decisions', label: 'Engineering Decisions' },
  { key: 'transformation', label: 'Data Transformation' },
  { key: 'outcome', label: 'Outcome' },
  { key: 'stack', label: 'Technology Stack' },
]

export default function CaseStudy() {
  const [active, setActive] = useState<(typeof TABS)[number]['key']>('problem')
  const content = flagshipProject.caseStudy[active]

  return (
    <div className="rounded-2xl border border-signal-500/12 bg-void-900/50 p-6 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`font-mono text-[11px] tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full border transition-colors ${
              active === tab.key
                ? 'border-signal-500/50 text-signal-400 bg-signal-500/10'
                : 'border-signal-500/10 text-mist hover:text-frost'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 min-h-[88px]">
        {Array.isArray(content) ? (
          <div className="flex flex-wrap gap-2">
            {content.map((item) => (
              <span
                key={item}
                className="text-xs font-mono px-2.5 py-1 rounded-md border border-signal-500/15 text-signal-400/90"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-mist text-[15px] leading-relaxed text-balance">{content}</p>
        )}
      </div>
    </div>
  )
}
