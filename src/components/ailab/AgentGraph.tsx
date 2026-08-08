interface AgentGraphProps {
  nodes: string[] // first item is the orchestrator
}

export default function AgentGraph({ nodes }: AgentGraphProps) {
  const [center, ...agents] = nodes
  const radius = 42

  return (
    <div className="relative mx-auto w-full max-w-[280px]" style={{ height: 280 }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
        {agents.map((_, i) => {
          const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2
          const x = 50 + Math.cos(angle) * radius
          const y = 50 + Math.sin(angle) * radius
          return (
            <line
              key={i}
              x1={50}
              y1={50}
              x2={x}
              y2={y}
              stroke="#38BDF8"
              strokeWidth="0.5"
              opacity="0.35"
              style={{ animation: `agentPulse 2.4s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
            />
          )
        })}
      </svg>

      {/* center node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-signal-500/50 bg-signal-500/10 flex items-center justify-center text-center px-1 shadow-glow-sm">
        <span className="font-mono text-[9px] leading-tight text-frost">{center}</span>
      </div>

      {agents.map((agent, i) => {
        const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2
        const x = 50 + Math.cos(angle) * radius
        const y = 50 + Math.sin(angle) * radius
        return (
          <div
            key={agent}
            className="absolute w-[76px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-signal-500/20 bg-void-900/90 px-2 py-1.5 text-center"
            style={{ top: `${y}%`, left: `${x}%` }}
          >
            <span className="font-mono text-[9px] leading-tight text-signal-400">{agent}</span>
          </div>
        )
      })}

      <style>{`
        @keyframes agentPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
