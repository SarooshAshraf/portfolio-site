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
    title: 'B.Eng Begins',
    description:
      'I begin my journey into the complex realm of engineering, learning about hardware, and systems.',
    icon: { src: '/mcmaster-logo.png', alt: 'McMaster University crest' },
  },
  {
    title: 'First engineering internship at IKO Industries',
    description: 'I used my experience with Python and scripting to automate several plant processes, resulting in massive efficiency boosts!',
    icon: { src: '/IKO-logo.png', alt: 'IKO Industries logo' },
  },
  {
    title: 'Product Data Management Intern at Enervac',
    description: 'I set up and maintained the PDM vault for all products at Enervac. Lots of SQL, lots of detail, lots of improvement!',
    icon: { src: '/enervac-logo.jpg', alt: 'Enervac logo' },
  },
  {
    title: 'Tesla ✈️ California!',
    description:
      'Helped develop the products and battery engineering behind the coolest truck in the world - Cybertruck',
    icon: { src: '/Tesla-logo.jpg', alt: 'Tesla logo' },
  },
  {
    title: 'Graduation from McMaster!',
    description: 'I graduated from McMaster University ready to bridge hardware, software, and product.',
    icon: { src: '/graduation-logo.jpg', alt: 'Graduation cap illustration' },
  },
  {
    title: 'Systems engineer at Toyota',
    description: 'My work as a quality systems engineer was deeply impactful for the vehicles built here in Canada.',
    icon: { src: '/toyota-logo.avif', alt: 'Toyota logo' },
  },
  {
    title: 'Mastering Software Engineering',
    description: 'I began my project-based M.Eng at Ontario Tech University, reporting to a supervisory professor',
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

        <div className="relative pb-20 md:pb-24">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-28 hidden h-[6px] rounded-full bg-gradient-to-r from-indigo-400/60 via-white/40 to-indigo-400/60 shadow-[0_8px_30px_rgba(79,70,229,0.35)] md:block"
            />
            <ul className="relative flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between md:gap-10">
              {experiences.map((experience, index) => {
                const tooltipId = `experience-tooltip-${index}`
                const position = String(index + 1).padStart(2, '0')

                return (
                  <li
                    key={experience.title}
                    className="group relative flex w-full flex-col items-center text-center md:min-w-0 md:flex-1 md:pt-28"
                  >
                    <button
                      type="button"
                      aria-describedby={tooltipId}
                      className="relative flex h-24 w-24 transform items-center justify-center rounded-full border-2 border-indigo-200/60 bg-indigo-500/10 text-white shadow-[0_18px_60px_rgba(79,70,229,0.3)] transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:bg-indigo-500/20 focus-visible:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-200 md:h-28 md:w-28 md:-translate-y-1/2 md:shadow-[0_24px_70px_rgba(79,70,229,0.35)] md:hover:-translate-y-[65%] md:focus-visible:-translate-y-[65%]"
                    >
                      <span className="pointer-events-none absolute -top-7 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/80 md:-top-9">
                        {position}
                      </span>
                      <span className="sr-only">{experience.title}</span>
                      <div className="pointer-events-none absolute inset-[5px] overflow-hidden rounded-full md:inset-[6px]">
                        <Image
                          src={experience.icon.src}
                          alt={experience.icon.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 88px, 112px"
                        />
                      </div>
                    </button>

                    <h3 className="mt-5 max-w-[260px] text-base font-semibold leading-snug text-white md:mt-6 md:max-w-[240px]">
                      {experience.title}
                    </h3>
                    <div
                      id={tooltipId}
                      role="tooltip"
                      className="pointer-events-none absolute left-1/2 top-[calc(100%+0.4rem)] hidden w-72 -translate-x-1/2 rounded-3xl border border-white/10 bg-slate-950/95 p-5 text-left opacity-0 shadow-[0_30px_80px_rgba(8,47,73,0.5)] transition duration-300 group-hover:-translate-y-1 group-hover:opacity-100 group-focus-within:-translate-y-1 group-focus-within:opacity-100 md:block"
                    >
                      <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-white/10 bg-slate-950/95" />
                      <p className="text-sm leading-relaxed text-slate-200/90">
                        {experience.description}
                      </p>
                    </div>
                    <p className="mt-3 max-w-[320px] text-sm leading-relaxed text-slate-300/80 md:hidden">
                      {experience.description}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
