import { useEffect, useRef } from 'react'
import { journeyStages, journeyNow } from '@/data/journey'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const PATH_D = 'M 40 40 C 220 40, 180 220, 400 240 S 620 440, 780 460'

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const litPathRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const path = pathRef.current
    const lit = litPathRef.current
    const dot = dotRef.current
    if (!section || !path || !lit || !dot || reducedMotion) return

    const length = path.getTotalLength()
    lit.style.strokeDasharray = `${length}`
    lit.style.strokeDashoffset = `${length}`

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress
        lit.style.strokeDashoffset = `${length * (1 - progress)}`
        const point = path.getPointAtLength(length * progress)
        dot.setAttribute('cx', String(point.x))
        dot.setAttribute('cy', String(point.y))
      },
    })

    return () => {
      trigger.kill()
    }
  }, [reducedMotion])

  return (
    <section id="journey" ref={sectionRef} className="relative py-28 sm:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="01"
          eyebrow="Engineering Journey"
          title="Three disciplines. One trajectory."
          description="Every stage still shapes how the next one is built."
        />

        <div className="relative mt-24 lg:mt-32">
          {/* Trajectory SVG — desktop only decorative path */}
          <svg
            viewBox="0 0 820 500"
            className="hidden lg:block absolute inset-0 w-full h-full opacity-90 -translate-y-6"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path ref={pathRef} d={PATH_D} fill="none" stroke="rgba(15,42,71,0.6)" strokeWidth="1.5" />
            <path ref={litPathRef} d={PATH_D} fill="none" stroke="#38BDF8" strokeWidth="1.5" />
            <circle ref={dotRef} r="5" fill="#67E8F9" style={{ filter: 'drop-shadow(0 0 8px #67E8F9)' }} />
          </svg>

          <div className="relative grid lg:grid-cols-3 gap-10 lg:gap-8">
            {journeyStages.map((stage, i) => (
              <Reveal key={stage.index} delay={i * 0.1} y={32}>
                <div
                  className={`relative rounded-2xl border border-signal-500/12 bg-void-900/40 p-7 ${
                    i === 1 ? 'lg:mt-16' : i === 2 ? 'lg:mt-32' : ''
                  }`}
                >
                  <span className="section-index font-mono text-4xl text-signal-500/25 font-semibold">
                    {stage.index}
                  </span>
                  <h3 className="font-display font-semibold text-xl text-frost mt-2">{stage.title}</h3>
                  <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-mist mt-1">{stage.subtitle}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {stage.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono px-2.5 py-1 rounded-md border border-signal-500/15 text-signal-400/90 bg-signal-500/[0.04]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="relative mt-14 lg:mt-24 mx-auto max-w-xl text-center rounded-2xl border border-signal-500/25 bg-gradient-to-b from-signal-500/[0.06] to-transparent px-8 py-8">
              <p className="font-mono text-[11px] tracking-[0.2em] text-signal-400 uppercase">Now</p>
              <p className="font-display font-semibold text-xl sm:text-2xl text-frost mt-2 text-balance">
                {journeyNow}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
