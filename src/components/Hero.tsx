import { useEffect, useRef } from 'react';
import { PROFILE } from '@/data/portfolio';
import { useReducedMotion, useIsTouch } from '@/hooks/useMotion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

// All kept on the far left/right edges — the center column is the name,
// tagline, buttons and social icons, so nothing here should land at left ~50%
// regardless of its vertical position, or it collides with that content.
const TECH_LABELS = [
  { text: 'Azure', top: 15, left: 6, z: 20 },
  { text: 'Databricks', top: 20, left: 90, z: 40 },
  { text: 'Python', top: 50, left: 4, z: 30 },
  { text: 'PySpark', top: 55, left: 92, z: 50 },
  { text: 'GenAI', top: 84, left: 8, z: 10 },
  { text: 'SQL', top: 88, left: 88, z: 60 },
];

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current!;
    const title = titleRef.current!;
    // A permanent off-axis tilt — without this, the extrusion layers sit
    // exactly behind the front face along the Z-axis and are 100% occluded
    // by it at zero rotation, so the 3D depth is invisible until you move
    // the mouse. This is the sweet spot: enough angle that the extruded
    // sides are clearly visible at rest (too little and the depth vanishes
    // again; too much and the whole word reads as skewed instead of 3D).
    const BASE_ROT_X = -4;
    const BASE_ROT_Y = 8;
    let targetRotX = BASE_ROT_X, targetRotY = BASE_ROT_Y;
    // Start AT the baseline, not 0 — an "ease in from flat" entrance sounds
    // nice but means the depth is fully invisible until this effect's first
    // rAF tick actually fires. A backgrounded/throttled tab (or just a slow
    // first paint) leaves it stuck flat with no depth at all. The JSX below
    // also sets this same baseline as a static inline transform so the
    // extrusion is visible even before this effect runs a single frame.
    let curRotX = BASE_ROT_X, curRotY = BASE_ROT_Y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = BASE_ROT_Y + px * 30;
      targetRotX = BASE_ROT_X - py * 20;
    };

    const loop = () => {
      curRotX += (targetRotX - curRotX) * 0.1;
      curRotY += (targetRotY - curRotY) * 0.1;
      const dx = curRotY - BASE_ROT_Y;
      const dy = curRotX - BASE_ROT_X;
      title.style.transform = `translate3d(${dx * 0.8}px, ${dy * 0.8}px, 0) rotateX(${curRotX}deg) rotateY(${curRotY}deg)`;

      // Tech labels: real depth parallax — closer (higher z) labels shift
      // more with the pointer and stay sharper; far ones drift less and blur.
      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        const depthNorm = TECH_LABELS[i].z / 60;
        const z = TECH_LABELS[i].z;
        el.style.transform = `translate3d(${dx * depthNorm * 2.2}px, ${dy * depthNorm * 2.2}px, ${z}px)`;
        el.style.filter = `blur(${(1 - depthNorm) * 1.6}px)`;
        el.style.opacity = String(0.35 + depthNorm * 0.55);
      });

      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      targetRotX = BASE_ROT_X;
      targetRotY = BASE_ROT_Y;
    };

    // Touch idle motion — orbits gently around the same baseline tilt.
    let idleT = 0;
    const idleLoop = () => {
      if (isTouch && !reduced) {
        idleT += 0.008;
        const dx = Math.sin(idleT) * 6;
        const dy = Math.cos(idleT * 0.7) * 4;
        title.style.transform = `translate3d(${dx * 0.8}px, ${dy * 0.8}px, 0) rotateX(${BASE_ROT_X + dy}deg) rotateY(${BASE_ROT_Y + dx}deg)`;
        labelRefs.current.forEach((el, i) => {
          if (!el) return;
          const depthNorm = TECH_LABELS[i].z / 60;
          el.style.transform = `translate3d(${dx * depthNorm * 2.2}px, ${dy * depthNorm * 2.2}px, ${TECH_LABELS[i].z}px)`;
          el.style.opacity = String(0.35 + depthNorm * 0.55);
        });
      }
      raf = requestAnimationFrame(idleLoop);
    };

    if (isTouch) {
      raf = requestAnimationFrame(idleLoop);
    } else {
      stage.addEventListener('mousemove', onMove);
      stage.addEventListener('mouseleave', onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced, isTouch]);

  // Build extrusion layers
  const layers = Array.from({ length: 14 }, (_, i) => i);

  return (
    <section
      id="hero"
      ref={stageRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden perspective-1000"
    >
      {/* Receding data-grid floor — anchors the scene in space and gives
          the background real depth instead of flat ambient noise. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[55vh] pointer-events-none overflow-hidden"
        style={{ perspective: '500px', perspectiveOrigin: '50% 100%' }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateX(75deg)',
            transformOrigin: 'bottom',
            backgroundImage:
              'linear-gradient(rgba(245,158,11,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.16) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'linear-gradient(to top, black 15%, transparent 75%)',
            WebkitMaskImage: 'linear-gradient(to top, black 15%, transparent 75%)',
          }}
        />
      </div>

      {/* HUD-style corner brackets — frames the whole hero like a
          viewfinder, giving the floating name text a focal anchor. */}
      {[
        'top-6 left-6 md:top-10 md:left-10 border-t border-l',
        'top-6 right-6 md:top-10 md:right-10 border-t border-r',
        'bottom-6 left-6 md:bottom-10 md:left-10 border-b border-l',
        'bottom-6 right-6 md:bottom-10 md:right-10 border-b border-r',
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute w-6 h-6 md:w-8 md:h-8 border-amber/30 pointer-events-none ${pos}`}
        />
      ))}

      {/* Subtle tech labels — real depth parallax, see loop() above */}
      <div
        className="absolute inset-0 pointer-events-none select-none preserve-3d"
        style={{ perspective: '900px' }}
      >
        {TECH_LABELS.map((label, i) => (
          <span
            key={label.text}
            ref={(el) => { labelRefs.current[i] = el; }}
            className="absolute font-mono text-[10px] tracking-[0.3em] text-amber-200"
            style={{
              top: `${label.top}%`,
              left: `${label.left}%`,
              transform: `translateZ(${label.z}px)`,
              willChange: 'transform, filter',
            }}
          >
            {label.text}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 preserve-3d">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10 reveal in">
          <span className="relative h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-amber/60">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-amber" />
          </span>
          <p className="font-mono text-[10px] md:text-xs tracking-[0.35em] text-ash-500">
            {PROFILE.role}
          </p>
          <span className="relative h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-amber/60">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-amber" />
          </span>
        </div>

        <div className="relative preserve-3d" style={{ perspective: '800px' }}>
          {/* Slow-rotating beacon ring behind the name — a focal anchor so
              the lettering reads as sitting inside the scene, not floating. */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 pointer-events-none"
            style={{
              width: 'min(70vw, 640px)',
              aspectRatio: '1 / 1',
              transform: 'translate(-50%, -50%) translateZ(-70px)',
            }}
          >
            <div className="w-full h-full rounded-full border border-dashed border-amber/25 animate-[spin_70s_linear_infinite]" />
          </div>
          <h1
            ref={titleRef}
            className="relative font-display font-bold text-[clamp(3.5rem,12vw,11rem)] leading-[0.92] tracking-tighter text-ivory-50 preserve-3d backface-hidden"
            style={{
              willChange: 'transform',
              transformStyle: 'preserve-3d',
              // Static fallback matching BASE_ROT_X/Y above — the extrusion
              // must be visible on first paint, not only after JS's rAF loop
              // has had a chance to run.
              transform: 'rotateX(-4deg) rotateY(8deg)',
            }}
          >
            {/* Extrusion layers — a real color ramp (warm amber-brown up
                front fading to near-black at the back) so the depth reads
                as a visible material gradient at any angle, not just two
                near-identical dark tones that vanish when nearly flat. */}
            {layers.map((i) => {
              const t = i / (layers.length - 1); // 0 = frontmost extrusion layer, 1 = back
              const front = [92, 58, 26]; // warm amber-brown, brighter near the face for more pop
              const back = [10, 9, 8]; // near-black
              const rgb = front.map((c, k) => Math.round(c + (back[k] - c) * t));
              return (
                <span
                  key={i}
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `translateZ(${-(layers.length - i) * 4.5}px)`,
                    color: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
                  }}
                >
                  KARAN C J
                </span>
              );
            })}
            {/* Front face */}
            <span
              className="relative block"
              style={{
                background: 'linear-gradient(180deg, #F7F4ED 0%, #E8E3D8 40%, #D6D0C2 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 40px rgba(245,158,11,0.15)',
              }}
            >
              KARAN C J
            </span>

            {/* Shimmer sweep — a bright band drifts across the lettering on
                a slow loop, the classic "polished metal" premium-3D-text tell. */}
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
              style={{
                transform: 'translateZ(1px)',
                backgroundImage: 'linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.85) 50%, transparent 65%)',
                backgroundSize: '250% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                mixBlendMode: 'overlay',
                animation: 'shimmer 6s ease-in-out infinite',
              }}
            >
              KARAN C J
            </span>
          </h1>

          {/* Amber edge glow behind — sits deep in the extrusion stack so it
              reads as light spilling from behind the lettering, not a flat sticker. */}
          <div
            className="absolute inset-0 -z-10 blur-3xl opacity-50"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.45), transparent 65%)',
              transform: 'translateZ(-55px)',
            }}
          />
        </div>

        <p className="mt-8 md:mt-10 max-w-md text-base md:text-lg text-ash-400 leading-relaxed whitespace-pre-line text-balance reveal in">
          {PROFILE.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor="EXPLORE"
            className="group relative px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-graphite-950 bg-amber hover:bg-amber-glow transition-colors font-medium duration-300 rounded-full overflow-hidden"
          >
            <span className="relative z-10">EXPLORE MY WORK</span>
          </button>
          <a
            href={PROFILE.resume}
            download="Karan-CJ-Resume.docx"
            data-cursor="RESUME"
            className="px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-ivory-100 border border-graphite-600 hover:border-amber hover:text-amber transition-colors duration-300 rounded-full"
          >
            DOWNLOAD RESUME
          </a>
        </div>

        <div className="mt-10 flex items-center gap-5">
          {[
            { Icon: Github, href: PROFILE.github, label: 'GitHub' },
            { Icon: Linkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
            { Icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Email' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              data-cursor={label.toUpperCase()}
              aria-label={label}
              className="text-ash-500 hover:text-amber transition-colors duration-300"
            >
              <Icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.3em] text-ash-600">SCROLL</span>
        <ArrowDown size={14} className="text-ash-600 animate-bounce" strokeWidth={1} />
      </div>
    </section>
  );
}
