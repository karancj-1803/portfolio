import { RECOGNITION } from '@/data/portfolio';
import { useInView, useTilt } from '@/hooks/useMotion';
import { Award, BadgeCheck } from 'lucide-react';

function CertCard({ cert, index }: { cert: (typeof RECOGNITION.certifications)[number]; index: number }) {
  const tiltRef = useTilt<HTMLDivElement>(6, 18);

  return (
    <div style={{ perspective: '900px' }}>
      <div
        ref={tiltRef}
        data-cursor=""
        className="group relative preserve-3d rounded-lg border border-graphite-700 hover:border-amber/40 bg-graphite-900/40 p-5 h-full transition-colors duration-300"
        style={{ willChange: 'transform' }}
      >
        <div className="flex items-start justify-between mb-4" style={{ transform: 'translateZ(20px)' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-amber/10 border border-amber/30 group-hover:bg-amber/15 transition-colors duration-300">
            <BadgeCheck size={16} className="text-amber" strokeWidth={1.5} />
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-ash-700">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="text-ivory-100 text-sm leading-snug mb-3" style={{ transform: 'translateZ(14px)' }}>
          {cert.title}
        </p>

        <div className="flex items-center gap-2 mt-auto">
          <span className="text-ash-500 text-xs">{cert.issuer}</span>
          <span className="text-ash-700">·</span>
          <span className="font-mono text-[10px] text-amber">{cert.year}</span>
        </div>
      </div>
    </div>
  );
}

export default function Recognition() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const tiltRef = useTilt<HTMLDivElement>(4, 20);
  const ach = RECOGNITION.achievement;

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="section-number">06 / RECOGNITION</span>
          <h2 className="font-display text-3xl md:text-5xl text-ivory-50 tracking-tighter mt-4">
            AWARDS &amp; CREDENTIALS.
          </h2>
        </div>

        <div ref={ref} className="space-y-12">
          {/* Achievement — hero priority, framed as a real award card */}
          <div className={`reveal ${inView ? 'in' : ''}`} style={{ perspective: '1400px' }}>
            <div
              ref={tiltRef}
              className="relative preserve-3d overflow-hidden rounded-2xl border border-amber/20 p-8 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center transition-shadow duration-300"
              style={{
                willChange: 'transform',
                background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(23,21,18,0.4) 45%, transparent 100%)',
                boxShadow: '0 40px 80px -30px rgba(0,0,0,0.7)',
              }}
            >
              {/* Oversized watermark icon, echoes the giant index numbers in Selected Work */}
              <Award
                aria-hidden
                size={220}
                strokeWidth={0.75}
                className="absolute -right-10 -bottom-14 text-amber/[0.06] pointer-events-none select-none"
              />

              <div className="flex-shrink-0" style={{ transform: 'translateZ(40px)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-amber/10 border border-amber/30 shadow-[0_0_30px_-6px_rgba(245,158,11,0.5)]">
                  <Award size={28} className="text-amber" strokeWidth={1.5} />
                </div>
              </div>

              <div className="relative flex-1" style={{ transform: 'translateZ(24px)' }}>
                <span className="font-mono text-[10px] tracking-[0.25em] text-amber mb-2 block">
                  {ach.year} · {ach.context}
                </span>
                <h3 className="font-display text-2xl md:text-4xl text-ivory-50 tracking-tight mb-3">
                  {ach.title}
                </h3>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                  <span className="text-ash-300 text-base">{ach.event}</span>
                  <span className="text-ash-600">·</span>
                  <span className="text-ash-500 text-sm">{ach.venue}</span>
                  <span className="text-ash-600">·</span>
                  <span className="font-mono text-xs text-ash-500">{ach.coSponsored}</span>
                </div>
                <p className="text-ash-400 leading-relaxed max-w-xl">{ach.description}</p>
              </div>
            </div>
          </div>

          {/* Certifications — full-width card wall */}
          <div className={`reveal ${inView ? 'in' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-6">
              <BadgeCheck size={18} className="text-amber" strokeWidth={1.5} />
              <h4 className="font-mono text-[11px] tracking-[0.2em] text-ash-500">CERTIFICATIONS</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RECOGNITION.certifications.map((cert, i) => (
                <CertCard key={cert.title} cert={cert} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
