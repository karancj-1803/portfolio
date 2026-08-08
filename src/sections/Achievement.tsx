import { Award } from 'lucide-react'
import { achievement } from '@/data/credentials'
import Reveal from '@/components/Reveal'

export default function Achievement() {
  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl border border-signal-500/20 bg-gradient-to-br from-void-900/70 to-void-950 p-8 sm:p-12 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-signal-500/10 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-14 h-14 rounded-2xl border border-signal-500/30 bg-signal-500/10 flex items-center justify-center shrink-0">
                <Award className="text-signal-400" size={24} />
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-signal-400/80">
                  {achievement.year} · {achievement.format}
                </p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-frost mt-2">{achievement.title}</h3>
                <p className="text-mist text-sm mt-2">
                  {achievement.event} — {achievement.host} · {achievement.cosponsor}
                </p>

                <div className="mt-6 rounded-2xl border border-signal-500/10 bg-void-900/50 p-5">
                  <p className="font-display font-medium text-frost">{achievement.project}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {achievement.concepts.map((c) => (
                      <span key={c} className="text-xs font-mono px-2.5 py-1 rounded-md border border-signal-500/15 text-signal-400/90">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
