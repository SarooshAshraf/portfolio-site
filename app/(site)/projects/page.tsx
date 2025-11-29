import CardSwap, { Card } from '@/components/CardSwap'

type ProjectCard = {
  title: string
  badge: string
  status: string
  summary: string
  outcome: string
  tags: string[]
  gradient: string
}

const projects: ProjectCard[] = [
  {
    title: 'This site',
    badge: '',
    status: '',
    summary: '',
    outcome: '',
    tags: [],
    gradient: 'from-cyan-500/25 via-slate-900/80 to-emerald-500/25',
  },
  {
    title: 'MFG AI Data Assistant',
    badge: '',
    status: '',
    summary: '',
    outcome: '',
    tags: [],
    gradient: 'from-indigo-500/25 via-slate-900/80 to-blue-500/25',
  },
  {
    title: 'AI Photo Album',
    badge: '',
    status: '',
    summary: '',
    outcome: '',
    tags: [],
    gradient: 'from-amber-400/20 via-slate-900/80 to-rose-500/20',
  },
  {
    title: 'Coming soon...',
    badge: '',
    status: '',
    summary: '',
    outcome: '',
    tags: [],
    gradient: 'from-fuchsia-500/25 via-slate-900/80 to-violet-500/25',
  },
]

export default function ProjectsPage() {
  return (
    <main className="relative isolate overflow-hidden">
      <section className="flex min-h-screen w-full flex-col gap-10 py-20 lg:py-24">
        <header className="space-y-3 px-6">
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">My projects</h1>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-200/80">Scroll or click to swap cards</p>
        </header>

        <div className="projects-stage relative mt-auto h-[620px] w-full overflow-visible sm:h-[580px] lg:h-[640px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[60%] rounded-[40px] bg-gradient-to-b from-white/5 via-purple-500/10 to-transparent blur-3xl"
          />
          <div className="flex h-full w-full items-center justify-end pr-[12%] sm:pr-[10%] lg:pr-[8%] max-md:pr-4">
            <CardSwap
              width={520}
              height={400}
              cardDistance={70}
              verticalDistance={70}
              scrollControlled
              scrollSwapDuration={0.55}
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
      </section>
    </main>
  )
}
