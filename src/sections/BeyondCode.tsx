import { beyondCode } from '@/data/credentials'
import Reveal from '@/components/Reveal'

export default function BeyondCode() {
  return (
    <section className="relative py-20 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-mist">Beyond Code</p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {beyondCode.map((item, i) => (
              <span key={item} className="flex items-center gap-8">
                <span className="font-display text-lg sm:text-xl text-mist hover:text-signal-400 transition-colors">
                  {item}
                </span>
                {i < beyondCode.length - 1 && <span className="hidden sm:inline text-signal-500/30">/</span>}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
