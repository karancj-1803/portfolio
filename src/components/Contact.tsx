import { CONTACT, PROFILE } from '@/data/portfolio';
import { useInView } from '@/hooks/useMotion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section id="contact" className="relative py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div ref={ref} className="flex flex-col items-center text-center">
          {/* Converging signal */}
          <div className="relative mb-12">
            <div
              className="w-2 h-2 rounded-full bg-amber-glow"
              style={{ boxShadow: '0 0 20px rgba(251,191,36,0.8), 0 0 60px rgba(245,158,11,0.4)' }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-20 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.4), transparent 70%)' }}
            />
          </div>

          <div className={`reveal ${inView ? 'in' : ''}`}>
            <h2 className="font-display text-4xl md:text-7xl text-ivory-50 tracking-tighter leading-[1.02] whitespace-pre-line mb-6">
              {CONTACT.heading}
            </h2>
            <p className="text-ash-400 text-lg leading-relaxed whitespace-pre-line mb-12 max-w-md">
              {CONTACT.sub}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              <a
                href={`mailto:${CONTACT.email}`}
                data-cursor="EMAIL"
                className="group flex items-center gap-2 px-7 py-3.5 font-mono text-[11px] tracking-[0.2em] text-graphite-950 bg-amber hover:bg-amber-glow transition-colors duration-300 rounded-full"
              >
                EMAIL ME
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="VISIT"
                className="px-7 py-3.5 font-mono text-[11px] tracking-[0.2em] text-ivory-100 border border-graphite-600 hover:border-amber hover:text-amber transition-colors rounded-full"
              >
                LINKEDIN
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="VISIT"
                className="px-7 py-3.5 font-mono text-[11px] tracking-[0.2em] text-ivory-100 border border-graphite-600 hover:border-amber hover:text-amber transition-colors rounded-full"
              >
                GITHUB
              </a>
            </div>
          </div>

          {/* Social row */}
          <div className={`reveal ${inView ? 'in' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center gap-6">
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
                  className="text-ash-600 hover:text-amber transition-colors duration-300"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-ash-700">
              © 2026 KARAN C J
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
