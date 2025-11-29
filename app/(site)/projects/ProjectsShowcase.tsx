'use client'

import { useState } from 'react'
import CardSwap, { Card } from '@/components/CardSwap'
import MagicBento from '@/components/MagicBento'

export type ProjectCard = {
  title: string
  badge: string
  status: string
  summary: string
  outcome: string
  tags: string[]
  gradient: string
}

type ProjectsShowcaseProps = {
  projects: ProjectCard[]
}

const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ projects }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null)
  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null

  return (
    <div className="projects-stage relative mt-4 sm:mt-6 mb-[clamp(2rem,4vw,4.5rem)] h-[620px] w-full overflow-visible sm:h-[580px] lg:h-[640px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[60%] rounded-[40px] bg-gradient-to-b from-white/5 via-purple-500/10 to-transparent blur-3xl"
      />

      <div className="relative grid h-full w-full items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1.75fr_1fr] lg:gap-10 lg:px-8 xl:grid-cols-[1.95fr_1fr] xl:gap-12 2xl:grid-cols-[2.35fr_1fr] 2xl:gap-16">
        <div className="relative flex h-full items-center">
          <div className="w-full rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Magic Bento preview</p>
                <p className="text-sm leading-relaxed text-slate-100/85">
                  {activeProject
                    ? `Placeholder layout for ${activeProject.title}`
                    : 'Click any project card to load its Magic Bento placeholder in this space.'}
                </p>
              </div>
              {activeProject && (
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  Selected
                </span>
              )}
            </div>

            <div className="mt-6 flex min-h-[420px] items-center justify-center rounded-2xl bg-black/40 px-2 py-3 sm:px-4 lg:px-5">
              {activeProject ? (
                <MagicBento
                  key={activeProject.title}
                  textAutoHide
                  enableStars
                  enableSpotlight
                  enableBorderGlow
                  enableTilt
                  enableMagnetism
                  clickEffect
                  spotlightRadius={300}
                  particleCount={12}
                  glowColor="132, 0, 255"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-white/20 px-4 text-center text-sm leading-relaxed text-white/70">
                  Choose a project card on the right to render its Magic Bento placeholder preview here.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex h-full w-full items-center justify-end pr-[8%] sm:pr-[6%] lg:pr-[3%] xl:pr-[2%] 2xl:pr-[1%] max-md:pr-4">
          <CardSwap
            width={520}
            height={400}
            cardDistance={70}
            verticalDistance={70}
            scrollControlled
            scrollSwapDuration={0.55}
            onCardClick={(idx) => setActiveProjectIndex(idx)}
          >
            {projects.map((project) => (
              <Card
                key={project.title}
                className={`flex h-full flex-col justify-between overflow-hidden border border-white/15 bg-gradient-to-br ${project.gradient} p-6 text-left text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-sm`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/70">
                    <span>{project.badge}</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80">
                      {project.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold leading-tight text-white">{project.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-100/85">{project.summary}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-relaxed text-slate-100/85">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">Impact</span>
                    <p className="mt-2">{project.outcome}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/80">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </div>
  )
}

export default ProjectsShowcase
