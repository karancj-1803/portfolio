import { aiLabProjects } from '@/data/aiLab'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import AgentGraph from '@/components/ailab/AgentGraph'
import DocFlow from '@/components/ailab/DocFlow'
import { useTilt } from '@/hooks/useTilt'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'

function ProjectPanel({ project, reverse }: { project: (typeof aiLabProjects)[number]; reverse?: boolean }) {
  const reducedMotion = useReducedMotion()
  const { isTouch } = useDeviceCapability()
  const tiltRef = useTilt<HTMLDivElement>({ max: 3, scale: 1.005, disabled: reducedMotion || isTouch })

  return (
    <div
      className={`grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center ${
        reverse ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div ref={tiltRef} style={{ transformStyle: 'preserve-3d' }}>
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-signal-400/80">{project.role}</p>
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-frost mt-2">{project.title}</h3>

        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((s) => (
            <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-md border border-signal-500/15 text-mist">
              {s}
            </span>
          ))}
        </div>

        <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {project.capabilities.map((c) => (
            <li key={c} className="text-sm text-mist flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-signal-400 shrink-0" />
              {c}
            </li>
          ))}
        </ul>

        {project.id === 'intellidocs' && (
          <div className="mt-7 overflow-x-auto">
            <DocFlow stages={project.flow} />
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-signal-500/12 bg-void-900/40 p-8 flex items-center justify-center">
        {project.id === 'spm' ? (
          <AgentGraph nodes={project.flow} />
        ) : (
          <div className="w-full">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist mb-4 text-center">
              Retrieval Pipeline
            </p>
            <div className="flex flex-col gap-3">
              {project.flow.map((stage, i) => (
                <div key={stage} className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-signal-500/60 w-5">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1 rounded-lg border border-signal-500/15 bg-signal-500/[0.03] px-3 py-2 text-xs font-mono text-signal-400">
                    {stage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AILab() {
  return (
    <section id="ai-lab" className="relative py-28 sm:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="03"
          eyebrow="AI Lab"
          title="Where pipelines become agents."
          description="Applied Generative AI systems — from multi-agent orchestration to grounded retrieval."
        />

        <div className="mt-16 space-y-24">
          {aiLabProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05} y={32}>
              <ProjectPanel project={project} reverse={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
