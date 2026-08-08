import { GraduationCap } from 'lucide-react'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { useTilt } from '@/hooks/useTilt'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import { profile } from '@/data/profile'

export default function About() {
  const reducedMotion = useReducedMotion()
  const { isTouch } = useDeviceCapability()
  const tiltRef = useTilt<HTMLDivElement>({ max: 6, scale: 1.015, disabled: reducedMotion || isTouch })

  return (
    <section id="about" className="relative py-28 sm:py-36 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-20 items-center">
        <Reveal>
          <div style={{ perspective: '1200px' }} className="mx-auto max-w-sm">
            <div
              ref={tiltRef}
              className="relative rounded-[28px] border border-signal-500/15 bg-void-900/50 p-3"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute -inset-px rounded-[28px] bg-grid-fine bg-[size:18px_18px] opacity-20 pointer-events-none" />
              <div className="relative overflow-hidden rounded-[22px] aspect-[4/5]">
                <img
                  src={profile.portraitUrl}
                  alt="Portrait of Karan C J"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950/70 via-transparent to-signal-500/10" />
                <div className="absolute inset-0 ring-1 ring-inset ring-signal-400/20 rounded-[22px]" />
              </div>
              {/* HUD corner marks */}
              {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map(
                (pos) => (
                  <span key={pos} className={`absolute ${pos} w-4 h-4 border-signal-400/50`} />
                ),
              )}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-signal-400/70">
                <span>KCJ // 01</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-signal-400 animate-pulseDot" /> ACTIVE
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            index="00"
            eyebrow="Profile"
            title="I build at the intersection of data, intelligence, and software."
          />

          <div className="mt-6 space-y-4">
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="text-mist text-[15px] leading-relaxed text-balance">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-signal-500/10 bg-void-900/40 p-5">
              <GraduationCap className="text-signal-400 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-frost text-sm font-medium">{profile.education.degree}</p>
                <p className="text-mist text-sm mt-0.5">{profile.education.institution}</p>
                <p className="font-mono text-[11px] text-signal-400/80 mt-1.5 tracking-wide">
                  {profile.education.period} · {profile.education.grade}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
