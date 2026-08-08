import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react'
import InteractiveName from '@/components/InteractiveName'
import MagneticButton from '@/components/MagneticButton'
import ScrollIndicator from '@/components/ScrollIndicator'
import Reveal from '@/components/Reveal'
import { profile } from '@/data/profile'

const LABELS = [
  { text: 'Azure', top: '18%', left: '10%', delay: '0s' },
  { text: 'Databricks', top: '68%', left: '8%', delay: '1.4s' },
  { text: 'PySpark', top: '22%', left: '86%', delay: '0.8s' },
  { text: 'Python', top: '78%', left: '84%', delay: '2.1s' },
  { text: 'SQL', top: '46%', left: '4%', delay: '2.8s' },
  { text: 'GenAI', top: '50%', left: '92%', delay: '1.9s' },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-grid-fine bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)] opacity-60" />

      {/* Floating technical labels */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        {LABELS.map((l) => (
          <span
            key={l.text}
            className="absolute font-mono text-[11px] tracking-[0.15em] text-signal-400/50 animate-floatY"
            style={{ top: l.top, left: l.left, animationDelay: l.delay }}
          >
            {l.text}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center pt-20">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-signal-500/25 px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-400 animate-pulseDot" />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-mist">
              Data Engineer · Full Stack AI Developer
            </span>
          </div>
        </Reveal>

        <InteractiveName />

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-[15px] sm:text-base text-mist leading-relaxed text-balance">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              cursorLabel="EXPLORE"
            >
              Explore My Work <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton href={profile.resumeUrl} variant="outline" cursorLabel="GET">
              <Download size={15} /> Download Resume
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="GITHUB"
              aria-label="GitHub"
              className="text-mist hover:text-signal-400 transition-colors"
            >
              <Github size={19} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="LINKEDIN"
              aria-label="LinkedIn"
              className="text-mist hover:text-signal-400 transition-colors"
            >
              <Linkedin size={19} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="EMAIL"
              aria-label="Email"
              className="text-mist hover:text-signal-400 transition-colors"
            >
              <Mail size={19} />
            </a>
          </div>
        </Reveal>
      </div>

      <ScrollIndicator />
    </section>
  )
}
