import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useMotion';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Cursor-follow glow — fixed to the viewport so it tracks the pointer
  // across the whole page, not just inside Hero.
  useEffect(() => {
    if (reduced) return;
    const glow = glowRef.current;
    if (!glow) return;
    const onMove = (e: MouseEvent) => {
      glow.style.background = `radial-gradient(circle 450px at ${e.clientX}px ${e.clientY}px, rgba(245,158,11,0.1), transparent 70%)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  // Depth-of-field dust field: particle size/sharpness/parallax scale with z,
  // so the field reads as receding space rather than flat ambient noise.
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const COUNT = Math.max(26, Math.floor((w * h) / 42000));
    const LINK_DIST = Math.max(120, Math.min(w, h) * 0.12);
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2, // 0.2 (far) .. 1.0 (near)
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
    }));

    // Pointer parallax: near particles (higher z) drift further under the
    // cursor than far ones, simulating a camera looking through depth.
    let mx = 0, my = 0, pmx = 0, pmy = 0;
    const onPointerMove = (e: MouseEvent) => {
      mx = (e.clientX / w - 0.5) * 2;
      my = (e.clientY / h - 0.5) * 2;
    };
    window.addEventListener('mousemove', onPointerMove);

    // Screen-space position of each particle this frame (after motion + parallax),
    // cached once so the line pass below doesn't recompute it per-pair.
    const at = particles.map(() => ({ x: 0, y: 0, z: 0 }));

    let raf = 0;
    const draw = () => {
      pmx += (mx - pmx) * 0.04;
      pmy += (my - pmy) * 0.04;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        at[i].x = p.x + pmx * p.z * 22;
        at[i].y = p.y + pmy * p.z * 16;
        at[i].z = p.z;
      }

      // Connecting lines — the "node network" look. Nearby, similarly-deep
      // particles link with a line whose brightness fades with distance.
      for (let i = 0; i < at.length; i++) {
        for (let j = i + 1; j < at.length; j++) {
          const dx = at[i].x - at[j].x;
          const dy = at[i].y - at[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > LINK_DIST) continue;
          const closeness = 1 - dist / LINK_DIST;
          const depth = (at[i].z + at[j].z) / 2;
          const alpha = closeness * closeness * depth * 0.35;
          if (alpha < 0.01) continue;
          ctx.beginPath();
          ctx.moveTo(at[i].x, at[i].y);
          ctx.lineTo(at[j].x, at[j].y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      for (let i = 0; i < at.length; i++) {
        const p = particles[i];
        const r = 0.5 + p.z * 1.8; // near = bigger
        const alpha = 0.35 + p.z * 0.55; // near = brighter/sharper
        ctx.beginPath();
        ctx.arc(at[i].x, at[i].y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
        ctx.fill();
        // Soft glow halo on the nearest particles so they read as lit nodes.
        if (p.z > 0.6) {
          ctx.beginPath();
          ctx.arc(at[i].x, at[i].y, r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${(p.z - 0.6) * 0.18})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onPointerMove);
    };
  }, [reduced]);

  // Scroll-depth layers: two glow orbs drift at different rates as the page
  // scrolls, giving the whole page (not just Hero) a sense of layered depth.
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (orb1Ref.current) orb1Ref.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        if (orb2Ref.current) orb2Ref.current.style.transform = `translate3d(0, ${-y * 0.05}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <>
      <div className="fixed inset-0 z-0 bg-graphite-950" />
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.06), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(234,88,12,0.04), transparent 60%)',
        }}
      />
      {/* Slow-drifting depth orbs, layered behind the dust field */}
      <div
        ref={orb1Ref}
        className="fixed z-0 pointer-events-none rounded-full opacity-40 blur-3xl"
        style={{
          width: '48vw',
          height: '48vw',
          top: '10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.14), transparent 70%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={orb2Ref}
        className="fixed z-0 pointer-events-none rounded-full opacity-30 blur-3xl"
        style={{
          width: '40vw',
          height: '40vw',
          bottom: '5%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(234,88,12,0.12), transparent 70%)',
          willChange: 'transform',
        }}
      />
      {!reduced && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-0 pointer-events-none opacity-80"
          style={{ width: '100vw', height: '100vh' }}
        />
      )}
      {!reduced && (
        <div
          ref={glowRef}
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle 450px at 50% 50%, rgba(245,158,11,0.06), transparent 70%)' }}
        />
      )}
      <div className="grain" />
      <div className="vignette" />
    </>
  );
}
