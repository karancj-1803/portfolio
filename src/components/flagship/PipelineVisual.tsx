import type { PipelineNode } from '@/data/flagship'

interface PipelineVisualProps {
  nodes: PipelineNode[]
}

export default function PipelineVisual({ nodes }: PipelineVisualProps) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-3">
        {nodes.map((node, i) => (
          <div key={node.id} className="relative flex flex-col items-center text-center px-2">
            {/* connector to next node */}
            {i < nodes.length - 1 && (
              <div className="hidden lg:block absolute top-6 left-1/2 w-full h-px overflow-hidden">
                <span className="absolute inset-0 bg-signal-500/15" />
                <span
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-signal-400 shadow-glow-sm"
                  style={{
                    animation: `packetMove 2.6s linear infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              </div>
            )}
            <div className="relative z-10 w-12 h-12 rounded-xl border border-signal-500/30 bg-void-900 flex items-center justify-center">
              <span className="font-mono text-[10px] text-signal-400">{String(i + 1).padStart(2, '0')}</span>
              <span className="absolute inset-0 rounded-xl bg-signal-500/10 blur-md -z-10" />
            </div>
            <p className="mt-3 text-sm font-medium text-frost">{node.label}</p>
            {node.sublabel && <p className="text-[11px] font-mono text-mist mt-1">{node.sublabel}</p>}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes packetMove {
          0% { left: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
