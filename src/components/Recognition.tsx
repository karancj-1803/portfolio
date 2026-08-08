import { RECOGNITION } from '@/data/portfolio';
import { useInView } from '@/hooks/useMotion';
import { Award, BadgeCheck, Briefcase } from 'lucide-react';

export default function Recognition() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const ach = RECOGNITION.achievement;

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="section-number">06 / RECOGNITION</span>
        </div>

        <div ref={ref} className="space-y-16">
          {/* Achievement — hero priority */}
          <div className={`reveal ${inView ? 'in' : ''}`}>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-amber/10 border border-amber/30">
                  <Award size={26} className="text-amber" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-4xl text-ivory-50 tracking-tight mb-3">
                  {ach.title}
                </h3>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                  <span className="text-ash-400 text-base">{ach.event}</span>
                  <span className="text-ash-600">·</span>
                  <span className="text-ash-500 text-sm">{ach.venue}</span>
                  <span className="text-ash-600">·</span>
                  <span className="font-mono text-xs text-ash-600">{ach.coSponsored}</span>
                  <span className="text-ash-600">·</span>
                  <span className="font-mono text-xs text-amber">{ach.year}</span>
                </div>
                <p className="text-ash-400 leading-relaxed max-w-xl mb-2">{ach.description}</p>
                <p className="font-mono text-[11px] tracking-[0.1em] text-ash-600">{ach.context}</p>
              </div>
            </div>
          </div>

          {/* Certifications + Internship */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Certifications */}
            <div className={`reveal ${inView ? 'in' : ''}`} style={{ transitionDelay: '100ms' }}>
              <div className="flex items-center gap-2 mb-6">
                <BadgeCheck size={18} className="text-amber" strokeWidth={1.5} />
                <h4 className="font-mono text-[11px] tracking-[0.2em] text-ash-500">CERTIFICATIONS</h4>
              </div>
              <div className="space-y-4">
                {RECOGNITION.certifications.map((cert) => (
                  <div key={cert.title} className="border-l border-graphite-700 pl-4 py-1">
                    <p className="text-ivory-100 text-sm leading-snug">{cert.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-ash-500 text-xs">{cert.issuer}</span>
                      <span className="text-ash-700">·</span>
                      <span className="font-mono text-[10px] text-ash-600">{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internship */}
            <div className={`reveal ${inView ? 'in' : ''}`} style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center gap-2 mb-6">
                <Briefcase size={18} className="text-amber" strokeWidth={1.5} />
                <h4 className="font-mono text-[11px] tracking-[0.2em] text-ash-500">INTERNSHIP</h4>
              </div>
              <div className="border-l border-graphite-700 pl-4">
                <h5 className="text-ivory-100 text-base">{RECOGNITION.internship.org}</h5>
                <div className="flex items-center gap-2 mt-1 mb-3">
                  <span className="text-ash-500 text-sm">{RECOGNITION.internship.role}</span>
                  <span className="text-ash-700">·</span>
                  <span className="font-mono text-[10px] text-ash-600">{RECOGNITION.internship.date}</span>
                </div>
                <p className="text-ash-500 text-sm leading-relaxed">
                  Industrial exposure involving {RECOGNITION.internship.points.join(', ')}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
