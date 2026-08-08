import { BEYOND_CODE } from '@/data/portfolio';
import { useInView } from '@/hooks/useMotion';
import { Palette, Film, PenTool, Clapperboard } from 'lucide-react';

const ICONS = [PenTool, Film, Palette, Clapperboard];

export default function BeyondCode() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-12">
          <span className="section-number">07 / BEYOND CODE</span>
        </div>

        <div ref={ref} className={`reveal ${inView ? 'in' : ''}`}>
          <p className="font-display text-2xl md:text-3xl text-ivory-50 tracking-tight mb-10 max-w-lg text-balance">
            When I'm not engineering, I'm designing.
          </p>

          <div className="flex flex-wrap gap-x-10 gap-y-6">
            {BEYOND_CODE.map((item, i) => {
              const Icon = ICONS[i] || PenTool;
              return (
                <div key={item} className="flex items-center gap-3 group">
                  <Icon
                    size={18}
                    className="text-ash-600 group-hover:text-amber transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                  <span className="text-ash-400 group-hover:text-ivory-100 transition-colors duration-300 text-base">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
