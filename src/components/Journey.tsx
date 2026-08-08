import { useEffect, useRef } from 'react';
import { JOURNEY } from '@/data/portfolio';
import { useScrollProgress, useReducedMotion } from '@/hooks/useMotion';

export default function Journey() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      if (lineRef.current) lineRef.current.style.height = '100%';
      if (dotRef.current) dotRef.current.style.bottom = '100%';
      return;
    }
    if (lineRef.current) {
      lineRef.current.style.height = `${progress * 100}%`;
    }
    if (dotRef.current) {
      dotRef.current.style.bottom = `${progress * 100}%`;
    }
  }, [progress, reduced]);

  return (
    <section id="journey" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="section-number">04 / JOURNEY</span>
          <h2 className="font-display text-3xl md:text-5xl text-ivory-50 tracking-tighter mt-4 max-w-2xl">
            {JOURNEY.title}
          </h2>
        </div>

        <div ref={ref} className="relative pl-8 md:pl-16">
          {/* Track */}
          <div className="absolute left-3 md:left-7 top-0 bottom-0 w-px bg-graphite-700" />

          {/* Animated signal line */}
          <div
            ref={lineRef}
            className="absolute left-3 md:left-7 top-0 w-px"
            style={{
              height: '0%',
              background: 'linear-gradient(to bottom, #FBBF24, #F59E0B, #EA580C)',
              boxShadow: '0 0 12px rgba(245,158,11,0.6)',
            }}
          />

          {/* Signal dot */}
          <div
            ref={dotRef}
            className="absolute left-3 md:left-7 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              bottom: '0%',
              background: '#FBBF24',
              boxShadow: '0 0 20px rgba(251,191,36,0.8), 0 0 40px rgba(245,158,11,0.4)',
            }}
          />

          {/* Stages */}
          <div className="space-y-16 md:space-y-24">
            {JOURNEY.stages.map((stage, i) => (
              <div key={stage.label} className="relative">
                {/* Node */}
                <div className="absolute -left-8 md:-left-16 top-1.5 w-2 h-2 rounded-full bg-graphite-500 border border-ash-700" />

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ash-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl text-ivory-50 tracking-tight">
                    {stage.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 ml-8 md:ml-0">
                  {stage.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-[0.1em] text-ash-500 px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
