import { ABOUT } from '@/data/portfolio';
import { useInView, useTilt } from '@/hooks/useMotion';
import { GraduationCap } from 'lucide-react';

const PORTRAIT_URL = '/assets/profile.png';
// Background-removed cutout of the same photo (generated via rembg) — layered
// on top so hovering can dim/blur the original background while the subject
// itself scales forward, simulating a "pop out of frame" cutout effect.
const PORTRAIT_CUTOUT_URL = '/assets/profile-cutout.png';

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const tiltRef = useTilt<HTMLDivElement>(7, 24);

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="section-number">03 / ABOUT</span>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Portrait */}
          <div className={`lg:col-span-2 reveal  ${inView ? 'in' : ''}`} style={{ perspective: '1200px' }}>
            <div ref={tiltRef} className="relative group preserve-3d " style={{ willChange: 'transform', aspectRatio: '3 / 4' }}>
              {/* Background layer — the original photo, clipped to the frame.
                  Dims and blurs on hover so the cutout above reads as popping forward. */}
              <div
                className="absolute inset-0 overflow-hidden rounded-lg"
                style={{ boxShadow: '0 40px 70px -25px rgba(0,0,0,0.7)' }}
              >
                <img
                  src={PORTRAIT_URL}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 ease-out scale-105 group-hover:scale-110 group-hover:blur-md group-hover:brightness-[0.45] group-hover:saturate-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-transparent to-transparent" />
                {/* Warm rim light */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-700 group-hover:opacity-10"
                  style={{
                    background: 'linear-gradient(135deg, transparent 60%, rgba(245,158,11,0.15) 100%)',
                  }}
                />
              </div>

              {/* Foreground cutout — background-removed subject. Clipped to
                  the frame at rest (identical footprint to the background
                  layer, so it's seamless), and only released to overflow
                  on hover so the pop-forward scale can bleed past the edges.
                  `overflow` isn't animatable, so re-clipping on mouse-leave
                  would otherwise snap instantly and cut the still-shrinking
                  image off mid-transition — delay-700 holds it open for the
                  same 700ms the scale-down transition takes, so the clip
                  only re-engages once the image is actually back to size. */}
              <div className="absolute inset-0 rounded-lg overflow-hidden transition-[overflow] duration-0 delay-700 group-hover:overflow-visible group-hover:delay-0 pointer-events-none">
                <img
                  src={PORTRAIT_CUTOUT_URL}
                  alt="Karan C J"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out scale-105 group-hover:scale-[1.10] group-hover:-translate-y-2"
                  style={{
                    filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.55))',
                    transition: 'transform 700ms ease-out, filter 700ms ease-out',
                  }}
                />
              </div>

              {/* Amber edge glow */}
              <div
                className="absolute -inset-1 -z-10 rounded-lg opacity-30 blur-xl"
                style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), transparent 60%)' }}
              />
            </div>
          </div>

          {/* Text */}
          <div className={`lg:col-span-3 reveal ${inView ? 'in' : ''}`} style={{ transitionDelay: '150ms' }}>
            <p className="font-display text-2xl md:text-3xl text-ivory-50 leading-[1.3] tracking-tight mb-8 text-balance">
              {ABOUT.lead}
            </p>

            <div className="space-y-3 mb-10">
              {ABOUT.narrative.map((line, i) => (
                <p
                  key={i}
                  className="text-lg text-ash-400 leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Education */}
            <div className="flex items-start gap-4 pt-6 border-t border-graphite-700">
              <div className="mt-1">
                <GraduationCap size={22} className="text-amber" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-ivory-100 font-medium text-base">{ABOUT.education.degree}</h4>
                <p className="text-ash-500 text-sm mt-0.5">{ABOUT.education.college}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-ash-600">{ABOUT.education.years}</span>
                  <span className="font-mono text-[11px] tracking-[0.1em] text-amber">CGPA {ABOUT.education.cgpa}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
