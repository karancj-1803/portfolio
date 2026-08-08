import { NAV_ITEMS, PROFILE } from '@/data/portfolio';
import { useActiveSection } from '@/hooks/useMotion';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const ids = NAV_ITEMS.map((n) => n.id);
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-3' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <button
            onClick={() => go('hero')}
            data-cursor="HOME"
            className="font-display text-sm tracking-tight text-ivory-100 hover:text-amber transition-colors"
          >
            <span className="text-amber tracking-widest">C J</span>  
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                data-cursor={item.label}
                className={`group relative px-4 py-2 font-mono text-[11px] tracking-[0.2em] transition-colors ${
                  active === item.id ? 'text-ivory-100' : 'text-ash-600 hover:text-ash-400'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-1 w-1 rounded-full bg-amber transition-all duration-300 ${
                    active === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`w-5 h-px bg-ivory-100 transition-all ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`w-5 h-px bg-ivory-100 transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-ivory-100 transition-all ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden glass transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="font-display text-3xl text-ivory-100 hover:text-amber transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
            </button>
          ))}
          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-4 font-mono text-xs tracking-[0.2em] text-ash-500"
          >
            {PROFILE.email}
          </a>
        </div>
      </div>
    </>
  );
}
