export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-mist">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll to initialize</span>
      <div className="relative w-px h-10 bg-signal-500/20 overflow-hidden">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-signal-400 animate-pulseDot" />
        <span className="absolute inset-0 w-px bg-gradient-to-b from-signal-400 to-transparent animate-[floatY_2.2s_ease-in-out_infinite]" />
      </div>
    </div>
  )
}
