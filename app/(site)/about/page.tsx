import Image from 'next/image'

const highlights = [
  {
    label: 'Leadership',
    detail: 'Guided analytics teams that shipped ML systems into production with measurable lift.'
  },
  {
    label: 'Experimentation',
    detail: 'Designed test frameworks that balance statistical rigor with clear stakeholder storytelling.'
  },
  {
    label: 'Enablement',
    detail: 'Mentored product and data partners so insights become rituals, not one-off reports.'
  }
]

export default function AboutPage() {
  return (
    <main className="relative isolate overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:90px_90px]" />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-24 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-col gap-6 text-center lg:text-left">
          <span className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/80 lg:self-start">
            About Saroosh
          </span>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            From curiosity to momentum.
          </h1>
          <p className="text-lg text-slate-300/90">
            I build data and machine learning experiences that give teams clarity, confidence, and the courage to ship. That means translating complex narratives into decisions leaders trust—and staying close enough to the pipeline to keep models honest.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-[0_20px_40px_rgba(15,23,42,0.3)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/80">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-slate-200/90">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-1 justify-center">
          <div className="relative isolate w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_35px_120px_rgba(8,47,73,0.45)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.35),transparent_70%)]" />
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/about-hero.jpg"
                alt="Saroosh collaborating in a data and ML workspace"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 500px"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
