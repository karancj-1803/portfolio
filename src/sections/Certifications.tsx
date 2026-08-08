import { certifications, internship } from '@/data/credentials'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Factory } from 'lucide-react'

export default function Certifications() {
  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-16">
        <div>
          <SectionHeading index="05" eyebrow="Certifications" title="Continuous, focused learning." />
          <div className="mt-10 divide-y divide-signal-500/10 border-t border-b border-signal-500/10">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.04}>
                <div className="flex items-center justify-between gap-6 py-4">
                  <div>
                    <p className="text-frost text-sm font-medium">{c.title}</p>
                    <p className="text-mist text-xs mt-0.5">{c.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-signal-400/80 shrink-0">{c.year}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal delay={0.1}>
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-mist mb-4">Industrial Exposure</p>
            <div className="rounded-2xl border border-signal-500/12 bg-void-900/40 p-6">
              <div className="flex items-center gap-3">
                <Factory className="text-signal-400" size={20} />
                <div>
                  <p className="text-frost text-sm font-medium">{internship.organization}</p>
                  <p className="text-mist text-xs mt-0.5">
                    {internship.role} · {internship.period}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {internship.exposure.map((e) => (
                  <span key={e} className="text-[11px] font-mono px-2.5 py-1 rounded-md border border-signal-500/15 text-mist">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
