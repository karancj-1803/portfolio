import CanvasRoot from '@/three/CanvasRoot'
import CustomCursor from '@/components/CustomCursor'
import Nav from '@/components/Nav'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Journey from '@/sections/Journey'
import FlagshipProject from '@/sections/FlagshipProject'
import AILab from '@/sections/AILab'
import SkillsUniverse from '@/sections/SkillsUniverse'
import Achievement from '@/sections/Achievement'
import Certifications from '@/sections/Certifications'
import BeyondCode from '@/sections/BeyondCode'
import Contact from '@/sections/Contact'
import { usePointerRef } from '@/hooks/usePointerRef'
import { useScrollProgressRef } from '@/hooks/useScrollProgress'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function App() {
  const pointer = usePointerRef()
  const scrollProgress = useScrollProgressRef()
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative">
      <CanvasRoot scrollProgress={scrollProgress} pointer={pointer} reducedMotion={reducedMotion} />
      <CustomCursor />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Journey />
        <FlagshipProject />
        <AILab />
        <SkillsUniverse />
        <Achievement />
        <Certifications />
        <BeyondCode />
        <Contact />
      </main>
    </div>
  )
}
