import ProjectsShowcase, { type ProjectCard } from './ProjectsShowcase'

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
      <section className="flex min-h-screen w-full flex-col gap-8 pt-14 lg:pt-16 pb-[clamp(3.5rem,6vw,9.5rem)]">
        <header className="space-y-3 px-6">
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">My projects</h1>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-200/80">Scroll or click to swap cards</p>
        </header>

        <ProjectsShowcase projects={projects} />
      </section>
    </main>
  )
}
