import { useEffect, useRef } from 'react';
import { PROFILE } from '@/data/portfolio';
import { useReducedMotion, useIsTouch } from '@/hooks/useMotion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current!;
    const title = titleRef.current!;
    const light = lightRef.current!;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tx = px * 14;
      ty = py * 10;
      if (light) {
        light.style.background = `radial-gradient(circle 400px at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(245,158,11,0.12), transparent 70%)`;
      }
    };

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      const rotY = cx * 0.55;
      const rotX = -cy * 0.55;
      title.style.transform = `translate3d(${cx * 0.3}px, ${cy * 0.3}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => { active = true; };
    const onLeave = () => {
      active = false;
      tx = 0; ty = 0;
    };

    // Touch idle motion
    let idleT = 0;
    const idleLoop = () => {
      if (isTouch && !reduced) {
        idleT += 0.008;
        const ix = Math.sin(idleT) * 2;
        const iy = Math.cos(idleT * 0.7) * 1.5;
        title.style.transform = `translate3d(${ix}px, ${iy}px, 0) rotateX(${iy * 0.3}deg) rotateY(${ix * 0.3}deg)`;
      }
      raf = requestAnimationFrame(idleLoop);
    };

    if (isTouch) {
      raf = requestAnimationFrame(idleLoop);
    } else {
      stage.addEventListener('mousemove', onMove);
      stage.addEventListener('mouseenter', onEnter);
      stage.addEventListener('mouseleave', onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseenter', onEnter);
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
      {/* Dynamic warm light following pointer */}
      <div
        ref={lightRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle 400px at 50% 50%, rgba(245,158,11,0.08), transparent 70%)' }}
      />

      {/* Subtle tech labels */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {['Azure', 'Databricks', 'Python', 'PySpark', 'GenAI', 'SQL'].map((label, i) => (
          <span
            key={label}
            className="absolute font-mono text-[10px] tracking-[0.3em] text-ash-700/40"
            style={{
              top: `${[20, 35, 65, 75, 30, 70][i]}%`,
              left: `${[8, 88, 12, 85, 50, 50][i]}%`,
              transform: `translateZ(${[20, 40, 30, 50, 10, 60][i]}px)`,
            }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 preserve-3d">
        <p className="font-mono text-[10px] md:text-xs tracking-[0.35em] text-ash-500 mb-8 md:mb-10 reveal in">
          {PROFILE.role}
        </p>

        <div className="relative preserve-3d" style={{ perspective: '800px' }}>
          <h1
            ref={titleRef}
            className="relative font-display font-bold text-[clamp(3.5rem,12vw,11rem)] leading-[0.92] tracking-tighter text-ivory-50 preserve-3d backface-hidden"
            style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
          >
            {/* Extrusion layers */}
            {layers.map((i) => (
              <span
                key={i}
                aria-hidden
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `translateZ(${-(layers.length - i) * 2}px)`,
                  color: i < 6 ? '#1F1B17' : '#11100E',
                  opacity: 1,
                  filter: 'blur(0.3px)',
                }}
              >
                KARAN C J
              </span>
            ))}
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
          </h1>

          {/* Amber edge glow behind */}
          <div
            className="absolute inset-0 -z-10 blur-2xl opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.3), transparent 60%)',
              transform: 'translateZ(-30px)',
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
            className="group relative px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-graphite-950 bg-amber hover:bg-amber-glow transition-colors duration-300 rounded-full overflow-hidden"
          >
            <span className="relative z-10">EXPLORE MY WORK</span>
          </button>
          <a
            href={PROFILE.resume}
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
