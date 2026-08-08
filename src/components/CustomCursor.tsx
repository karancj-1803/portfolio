import { useEffect, useRef } from 'react';
import { useIsTouch, useReducedMotion } from '@/hooks/useMotion';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isTouch) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        const text = target.dataset.cursor || '';
        label.textContent = text;
        label.style.opacity = text ? '1' : '0';
        ring.classList.add('cursor-active');
      } else {
        label.style.opacity = '0';
        ring.classList.remove('cursor-active');
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      label.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(20px, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [isTouch, reduced]);

  if (isTouch) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 w-8 h-8 rounded-full border border-amber/40 transition-[width,height,opacity,border-color] duration-300"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-amber-glow"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 font-mono text-[10px] tracking-[0.2em] uppercase text-amber-glow opacity-0 transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
