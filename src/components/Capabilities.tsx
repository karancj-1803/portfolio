import { useState } from 'react';
import { CAPABILITY_GROUPS } from '@/data/portfolio';
import { useReducedMotion, useIsTouch, useTilt } from '@/hooks/useMotion';

function CapabilityCard({
  group,
  index,
  isActive,
  dimmed,
  onEnter,
  onLeave,
}: {
  group: (typeof CAPABILITY_GROUPS)[number];
  index: number;
  isActive: boolean;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const tiltRef = useTilt<HTMLDivElement>(6, 24);

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        ref={tiltRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        data-cursor=""
        className="relative preserve-3d rounded-lg p-5 -m-5 transition-[opacity,box-shadow] duration-500"
        style={{
          willChange: 'transform',
          opacity: dimmed ? 0.5 : 1,
          boxShadow: isActive
            ? '0 30px 60px -25px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.15)'
            : '0 0 0 0 transparent',
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[10px] tracking-[0.2em] text-ash-700">
            {String(index + 1).padStart(2, '0')}
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
    </div>
  );
}

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
          {CAPABILITY_GROUPS.map((group, i) => (
            <CapabilityCard
              key={group.label}
              group={group}
              index={i}
              isActive={active === i}
              dimmed={active !== null && active !== i}
              onEnter={() => !isTouch && !reduced && setActive(i)}
              onLeave={() => !isTouch && !reduced && setActive(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
