import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/data/nav'
import { useActiveSection } from '@/hooks/useActiveSection'

export default function Nav() {
  const active = useActiveSection(navItems.map((n) => n.id))
  const [open, setOpen] = useState(false)

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <ul className="flex items-center gap-1 rounded-full border border-signal-500/15 bg-void-950/60 backdrop-blur-md px-2 py-2 shadow-[0_0_30px_rgba(2,8,23,0.6)]">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                data-cursor="VIEW"
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-1.5 rounded-full font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                  active === item.id ? 'text-frost' : 'text-mist hover:text-signal-400'
                }`}
              >
                {active === item.id && (
                  <span className="absolute inset-0 rounded-full bg-signal-500/12 border border-signal-500/30" />
                )}
                <span className="relative">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="w-11 h-11 rounded-full border border-signal-500/25 bg-void-950/80 backdrop-blur-md flex items-center justify-center text-signal-400"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
        {open && (
          <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-signal-500/15 bg-void-900/95 backdrop-blur-xl p-2 shadow-[0_0_40px_rgba(2,8,23,0.8)]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-mono text-xs tracking-[0.1em] uppercase ${
                  active === item.id ? 'text-signal-400 bg-signal-500/10' : 'text-mist'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
