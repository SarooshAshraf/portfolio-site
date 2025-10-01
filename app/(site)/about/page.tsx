import Image from 'next/image'

type Experience = {
  title: string
  description: string
  icon: {
    src: string
    alt: string
  }
}

const experiences: Experience[] = [
  {
    title: 'Bachelor of engineering begins',
    description:
      'I begin my journey into the complex realm of engineering, learning about hardware, systems, and electrical systems.',
    icon: { src: '/mcmaster-logo.png', alt: 'McMaster University crest' },
  },
  {
    title: 'First engineering internship at IKO Industries',
    description: 'I used my experience with Python and scripting to automate several plant processes.',
    icon: { src: '/IKO-logo.png', alt: 'IKO Industries logo' },
  },
  {
    title: 'Product Data Management Intern at Enervac',
    description: 'I set up and maintained the PDM vault for all products at Enervac.',
    icon: { src: '/enervac-logo.jpg', alt: 'Enervac logo' },
  },
  {
    title: 'California bound for Tesla',
    description:
      'I interned at Tesla from Jan 2022 to Sept 2022 doing product and battery engineering activities for the Cybertruck.',
    icon: { src: '/Tesla-logo.jpg', alt: 'Tesla logo' },
  },
  {
    title: 'Graduation! I finish at McMaster',
    description: 'I graduate from McMaster University ready to bridge hardware, software, and product.',
    icon: { src: '/graduation-logo.jpg', alt: 'Graduation cap illustration' },
  },
  {
    title: 'Systems engineer at Toyota',
    description: 'My work as a systems engineer was deeply impactful for the vehicles built here in Canada.',
    icon: { src: '/toyota-logo.avif', alt: 'Toyota logo' },
  },
  {
    title: 'Diving deep into software',
    description: 'I begin my masters in software engineering at Ontario Tech University.',
    icon: { src: '/ontariotechuniversity-logo.jpg', alt: 'Ontario Tech University logo' },
  },
  {
    title: 'Data Science intern at Scotiabank',
    description:
      'My most exciting role yet - I am doing incredibly innovative work with ML models and LLM integration.',
    icon: { src: '/scotiabank-logo.png', alt: 'Scotiabank logo' },
  },
]

export default function ExperienceTimelinePage() {
  return (
    <main className="relative isolate overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.2),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-24">
        <header className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/80">
            Experience timeline
          </span>
          <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">
            Mapping the journey from curiosity to momentum.
          </h1>
          <p className="mt-4 text-lg text-slate-300/90">
            Every icon marks a moment where engineering insight, product intuition, and data storytelling came together.
            Hover, tap, or focus on each milestone to explore the details.
          </p>
        </header>

        <div className="relative overflow-x-auto pb-16">
          <div className="min-w-[1024px] px-4">
            <div className="relative">
              <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-[72px] h-px bg-gradient-to-r from-indigo-400/40 via-white/15 to-indigo-400/40" />
              <ul className="relative flex items-start justify-between gap-10">
                {experiences.map((experience, index) => {
                  const tooltipId = `experience-tooltip-${index}`
                  const position = String(index + 1).padStart(2, '0')

                  return (
                    <li
                      key={experience.title}
                      className="group relative flex min-w-[200px] flex-1 flex-col items-center pb-32 text-center"
                    >
                      <button
                        type="button"
                        aria-describedby={tooltipId}
                        className="relative flex h-28 w-28 items-center justify-center rounded-full border border-indigo-300/50 bg-indigo-500/10 p-6 text-white shadow-[0_25px_70px_rgba(79,70,229,0.35)] transition hover:-translate-y-1 hover:border-indigo-200/70 hover:bg-indigo-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-200"
                      >
                        <span className="pointer-events-none absolute -top-6 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/80">
                          {position}
                        </span>
                        <Image
                          src={experience.icon.src}
                          alt={experience.icon.alt}
                          width={72}
                          height={72}
                          className="h-16 w-16 object-contain"
                        />
                      </button>
                      <h3 className="mt-6 max-w-[220px] text-base font-semibold text-white">
                        {experience.title}
                      </h3>
                      <div
                        id={tooltipId}
                        role="tooltip"
                        className="pointer-events-none absolute left-1/2 top-[calc(100%+1.75rem)] w-72 -translate-x-1/2 rounded-3xl border border-white/10 bg-slate-950/95 p-5 text-left opacity-0 shadow-[0_30px_80px_rgba(8,47,73,0.55)] transition duration-300 group-hover:-translate-y-2 group-hover:opacity-100 group-focus-within:-translate-y-2 group-focus-within:opacity-100"
                      >
                        <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-white/10 bg-slate-950/95" />
                        <p className="text-sm leading-relaxed text-slate-200/90">
                          {experience.description}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

