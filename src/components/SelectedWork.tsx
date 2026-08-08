import { useEffect, useRef, useState } from 'react';
import { PROJECTS, type Project } from '@/data/portfolio';
import { useReducedMotion, useIsTouch } from '@/hooks/useMotion';
import { ArrowUpRight, X } from 'lucide-react';

const PROJECT_IMAGES: Record<string, string[]> = {
  'retail-analytics': [
    'https://images.pexels.com/photos/27141316/pexels-photo-27141316.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  'smart-pm-ai': [
    'https://images.pexels.com/photos/38888656/pexels-photo-38888656.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/27141314/pexels-photo-27141314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/27141316/pexels-photo-27141316.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  'intellidocs-ai': [
    'https://images.pexels.com/photos/30530414/pexels-photo-30530414.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/30479283/pexels-photo-30479283.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/30530406/pexels-photo-30530406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
};

function ProjectVisual({ projectId, depth, index }: { projectId: string; depth: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();
  const images = PROJECT_IMAGES[projectId] || [];

  useEffect(() => {
    if (reduced || isTouch) return;
    const el = ref.current!;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) / vh;
        const depthFactor = (3 - depth) * 0.04;
        el.style.transform = `translate3d(0, ${offset * depthFactor * 100}px, ${-depth * 60}px) rotateY(${depth * 1.5}deg)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [depth, reduced, isTouch]);

  if (!images[index]) return null;

  return (
    <div
      ref={ref}
      className="absolute rounded-lg overflow-hidden preserve-3d backface-hidden"
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        width: depth === 0 ? '100%' : depth === 1 ? '88%' : '76%',
        height: depth === 0 ? '100%' : depth === 1 ? '88%' : '76%',
        top: '50%',
        left: '50%',
        marginLeft: depth === 0 ? '-50%' : depth === 1 ? '-44%' : '-38%',
        marginTop: depth === 0 ? '-50%' : depth === 1 ? '-44%' : '-38%',
        opacity: depth === 0 ? 1 : depth === 1 ? 0.6 : 0.3,
        zIndex: 10 - depth,
        boxShadow: depth === 0
          ? '0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,158,11,0.12), 0 0 60px -10px rgba(245,158,11,0.15)'
          : '0 30px 60px -20px rgba(0,0,0,0.6)',
      }}
    >
      <img
        src={images[index]}
        alt={`Project visual ${index + 1}`}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/60 via-transparent to-transparent" />
    </div>
  );
}

function ProjectShowcase({ project, onOpenCaseStudy }: { project: Project; onOpenCaseStudy: () => void }) {
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || isTouch) return;
    const el = tiltRef.current!;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
    };
    const onLeave = () => { tx = 0; ty = 0; };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `rotateY(${cx}deg) rotateX(${-cy}deg)`;
      raf = requestAnimationFrame(loop);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); cancelAnimationFrame(raf); };
  }, [reduced, isTouch]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Visual */}
      <div className="relative perspective-1000" style={{ minHeight: '340px' }}>
        <div
          ref={tiltRef}
          className="relative w-full preserve-3d"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform', height: '380px' }}
        >
          <ProjectVisual projectId={project.id} depth={2} index={2} />
          <ProjectVisual projectId={project.id} depth={1} index={1} />
          <ProjectVisual projectId={project.id} depth={0} index={0} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-[0.2em] text-amber">{project.index}</span>
          <span className="h-px w-8 bg-graphite-600" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-ash-500">{project.category}</span>
        </div>

        <h3 className="font-display text-3xl md:text-5xl text-ivory-50 leading-[1.02] tracking-tighter mb-4">
          {project.titleLines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h3>

        <p className="text-ash-400 text-base leading-relaxed max-w-md mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] tracking-[0.1em] text-ash-400 px-2.5 py-1 border border-graphite-600 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 mb-8">
          {project.highlights.map((h) => (
            <div key={h.label}>
              <div className="font-display text-xl text-amber-glow">{h.value}</div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ash-600">{h.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.actions.map((action) =>
            action.type === 'case-study' ? (
              <button
                key={action.label}
                onClick={onOpenCaseStudy}
                data-cursor="EXPLORE"
                className="group flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.15em] text-ivory-100 border border-graphite-600 hover:border-amber hover:text-amber transition-colors rounded-full"
              >
                {action.label}
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ) : (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="VISIT"
                className="px-5 py-2.5 font-mono text-[11px] tracking-[0.15em] text-ash-400 hover:text-amber transition-colors"
              >
                {action.label}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function CaseStudyOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const cs = project.caseStudy;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center">
      <div
        className="absolute inset-0 bg-graphite-950/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        ref={scrollRef}
        className="relative w-full max-w-3xl h-full md:h-[90vh] md:mt-[5vh] overflow-y-auto scrollbar-none bg-graphite-850 md:rounded-2xl border border-graphite-600"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 glass px-6 md:px-10 py-5 flex items-center justify-between border-b border-graphite-600">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-amber">{project.category}</span>
            <h4 className="font-display text-lg text-ivory-50 mt-0.5">{project.title}</h4>
          </div>
          <button
            onClick={onClose}
            data-cursor="CLOSE"
            className="p-2 text-ash-400 hover:text-amber transition-colors rounded-full"
            aria-label="Close case study"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 md:px-10 py-8 space-y-8">
          {/* Problem + Role */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-mono text-[10px] tracking-[0.25em] text-ash-600 mb-2">PROBLEM</h5>
              <p className="text-ash-400 text-sm leading-relaxed">{cs.problem}</p>
            </div>
            <div>
              <h5 className="font-mono text-[10px] tracking-[0.25em] text-ash-600 mb-2">MY ROLE</h5>
              <p className="text-ash-400 text-sm leading-relaxed">{cs.myRole}</p>
            </div>
          </div>

          {/* Stack */}
          <div>
            <h5 className="font-mono text-[10px] tracking-[0.25em] text-ash-600 mb-3">TECHNOLOGY STACK</h5>
            <div className="flex flex-wrap gap-2">
              {cs.stack.map((s) => (
                <span key={s} className="font-mono text-[10px] tracking-[0.1em] text-ivory-200 px-2.5 py-1 bg-graphite-700 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <h5 className="font-mono text-[10px] tracking-[0.25em] text-ash-600 mb-2">ARCHITECTURE</h5>
            <p className="text-ash-400 text-sm leading-relaxed">{cs.architecture}</p>
          </div>

          {/* Pipeline visualization */}
          {cs.pipeline && (
            <div>
              <h5 className="font-mono text-[10px] tracking-[0.25em] text-ash-600 mb-4">PIPELINE</h5>
              <div className="flex flex-col items-center gap-3 py-4">
                {/* Sources */}
                <div className="flex gap-3">
                  {cs.pipeline.from.map((src) => (
                    <div key={src} className="px-4 py-2 font-mono text-[10px] tracking-[0.1em] text-ivory-100 border border-graphite-500 rounded-md bg-graphite-700/50">
                      {src}
                    </div>
                  ))}
                </div>
                {/* Connector */}
                <div className="w-px h-6 bg-gradient-to-b from-amber/40 to-amber" />
                {/* Through stages */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {cs.pipeline.through.map((stage, i) => (
                    <div key={stage} className="flex items-center gap-2">
                      <div className="px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-amber bg-amber/10 border border-amber/30 rounded-md">
                        {stage}
                      </div>
                      {i < cs.pipeline!.through.length - 1 && (
                        <span className="text-amber/50">→</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-px h-6 bg-gradient-to-b from-amber to-amber/40" />
                {/* Destination */}
                <div className="px-5 py-2.5 font-mono text-[11px] tracking-[0.15em] text-graphite-950 bg-amber-glow rounded-md font-medium">
                  {cs.pipeline.to}
                </div>
              </div>
            </div>
          )}

          {/* Detailed sections */}
          <div className="space-y-5">
            {cs.sections.map((section) => (
              <div key={section.heading} className="border-l border-graphite-600 pl-4">
                <h6 className="font-mono text-[10px] tracking-[0.2em] text-amber mb-1">{section.heading}</h6>
                <p className="text-ash-400 text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-number">02 / SELECTED WORK</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-ivory-50 tracking-tighter">
            THINGS I'VE BUILT.
          </h2>
        </div>

        {/* Projects */}
        <div className="space-y-32 md:space-y-48">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="relative">
              {/* Large background index */}
              <span
                className="absolute -top-12 right-0 font-display text-[10rem] md:text-[16rem] text-graphite-800/40 leading-none pointer-events-none select-none"
                aria-hidden
              >
                {project.index}
              </span>
              <div className="relative">
                <ProjectShowcase
                  project={project}
                  onOpenCaseStudy={() => setActiveCaseStudy(i)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case study overlay */}
      {activeCaseStudy !== null && (
        <CaseStudyOverlay
          project={PROJECTS[activeCaseStudy]}
          onClose={() => setActiveCaseStudy(null)}
        />
      )}
    </section>
  );
}
