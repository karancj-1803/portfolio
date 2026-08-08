import { useState } from 'react';
import { CAPABILITY_GROUPS } from '@/data/portfolio';
import { useReducedMotion, useIsTouch } from '@/hooks/useMotion';

export default function Capabilities() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  return (
    <section id="capabilities" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="section-number">05 / CAPABILITIES</span>
          <h2 className="font-display text-3xl md:text-5xl text-ivory-50 tracking-tighter mt-4">
            WHAT I WORK WITH.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {CAPABILITY_GROUPS.map((group, i) => {
            const isActive = active === i;
            const dimmed = active !== null && !isActive;

            return (
              <div
                key={group.label}
                onMouseEnter={() => !isTouch && !reduced && setActive(i)}
                onMouseLeave={() => !isTouch && !reduced && setActive(null)}
                data-cursor=""
                className="relative transition-all duration-500"
                style={{
                  transform: isActive && !reduced && !isTouch ? 'translateZ(20px) scale(1.02)' : 'translateZ(0) scale(1)',
                  opacity: dimmed ? 0.5 : 1,
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ash-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`h-px transition-all duration-500 ${
                      isActive ? 'w-12 bg-amber' : 'w-6 bg-graphite-600'
                    }`}
                  />
                  <h3
                    className={`font-display text-lg md:text-xl tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-amber' : 'text-ivory-100'
                    }`}
                  >
                    {group.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`text-sm transition-colors duration-300 ${
                        isActive ? 'text-ivory-100' : 'text-ash-500'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
