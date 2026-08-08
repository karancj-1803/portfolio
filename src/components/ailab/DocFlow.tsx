import { ArrowRight } from 'lucide-react'

interface DocFlowProps {
  stages: string[]
}

export default function DocFlow({ stages }: DocFlowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {stages.map((stage, i) => (
        <div key={stage} className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-wide px-2.5 py-1.5 rounded-md border border-signal-500/20 text-signal-400 bg-signal-500/[0.04] whitespace-nowrap">
            {stage}
          </span>
          {i < stages.length - 1 && <ArrowRight size={12} className="text-signal-500/40 shrink-0" />}
        </div>
      ))}
    </div>
  )
}
