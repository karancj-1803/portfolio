import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { flagshipProject } from '@/data/flagship'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import PipelineVisual from '@/components/flagship/PipelineVisual'
import CaseStudy from '@/components/flagship/CaseStudy'

export default function FlagshipProject() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="work" className="relative py-28 sm:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="02" eyebrow="Flagship Project" title={flagshipProject.title} />
          <Reveal delay={0.1}>
            <span className="font-mono text-xs tracking-[0.1em] uppercase text-signal-400/80 border border-signal-500/25 rounded-full px-4 py-1.5">
              Role · {flagshipProject.role}
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 grid grid-cols-3 max-w-lg gap-6 border-y border-signal-500/10 py-6">
            {flagshipProject.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display font-bold text-2xl sm:text-3xl text-signal-400">{m.value}</p>
                <p className="text-[11px] font-mono text-mist mt-1 leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 rounded-3xl border border-signal-500/12 bg-void-900/40 p-6 sm:p-10">
            <PipelineVisual nodes={flagshipProject.pipeline} />
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {flagshipProject.concepts.map((c) => (
              <span
                key={c}
                className="text-xs font-mono px-3 py-1.5 rounded-full border border-signal-500/15 text-mist hover:text-signal-400 hover:border-signal-500/40 transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <button
            onClick={() => setExpanded((v) => !v)}
            data-cursor="EXPLORE"
            className="mt-10 inline-flex items-center gap-2 font-display text-sm font-medium text-frost border-b border-signal-500/40 pb-1 hover:text-signal-400 hover:border-signal-400 transition-colors"
          >
            Explore Architecture
            <ChevronDown size={15} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </Reveal>

        <div
          className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div className="pt-8">
              <CaseStudy />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
