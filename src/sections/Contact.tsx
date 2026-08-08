import { Github, Linkedin, Mail } from 'lucide-react'
import Reveal from '@/components/Reveal'
import MagneticButton from '@/components/MagneticButton'
import { profile } from '@/data/profile'

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 sm:py-44 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(56,189,248,0.09),transparent_70%)]" />
      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-signal-400/80">Contact</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display font-bold text-[clamp(2.1rem,5.5vw,4rem)] leading-[1.05] text-frost mt-4 text-balance">
            Have a problem worth building?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-mist text-base max-w-lg mx-auto text-balance">
            Let's turn data, software, and intelligence into something useful.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={`mailto:${profile.email}`} cursorLabel="EMAIL">
              <Mail size={15} /> Email Me
            </MagneticButton>
            <MagneticButton href={profile.linkedin} target="_blank" rel="noreferrer" variant="outline" cursorLabel="VIEW">
              <Linkedin size={15} /> LinkedIn
            </MagneticButton>
            <MagneticButton href={profile.github} target="_blank" rel="noreferrer" variant="outline" cursorLabel="VIEW">
              <Github size={15} /> GitHub
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p className="mt-16 font-mono text-[11px] text-mist/70 tracking-wide">
            © {new Date().getFullYear()} Karan C J · Designed &amp; built with intent.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
