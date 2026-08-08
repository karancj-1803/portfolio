import { useState } from 'react'
import { skillCategories } from '@/data/skills'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import SkillCluster from '@/components/skills/SkillCluster'

export default function SkillsUniverse() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="skills" className="relative py-28 sm:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="04"
          eyebrow="Skills Universe"
          title="An ecosystem, not a scorecard."
          description="No proficiency bars — just the technologies in active use, grouped by where they live."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.05} y={20}>
              <SkillCluster
                category={category}
                active={active === category.id}
                dimmed={active !== null && active !== category.id}
                onEnter={() => setActive(category.id)}
                onLeave={() => setActive(null)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
