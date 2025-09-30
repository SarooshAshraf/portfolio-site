'use client'

import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const heroSignals = [
  {
    title: "Strategic + hands-on",
    description: "Architecting data foundations while staying close to the code and models.",
  },
  {
    title: "Outcome obsessed",
    description: "Marrying experimentation with business storytelling so impact is obvious.",
  },
  {
    title: "Curious collaborator",
    description: "Building momentum with teams that love asking better questions together.",
  },
]

type SectionCard = {
  title: string
  description: string
  href: Route
  status: string
}

const sectionCards = [
  {
    title: "Experience Timeline",
    description: "Follow the high-impact roles, teams, and ML moments powering my perspective. Launching soon.",
    href: "/about",
    status: "Coming soon",
  },
  {
    title: "Projects",
    description: "Cool projects I've worked on!",
    href: "/projects",
    status: "Featured work",
  },
  {
    title: "Notes",
    description: "My take on the tech world",
    href: "/notes",
    status: "Fresh updates",
  },
] satisfies SectionCard[];

export default function Page() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute left-1/2 top-1/3 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[180px]" />
      </div>

      <section className="relative px-6 pt-32 pb-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:items-center">
          <motion.div
            className="flex flex-1 flex-col gap-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/80 lg:mx-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              Data & ML portfolio
            </motion.span>
            <motion.h1
              className="text-4xl font-semibold leading-tight text-white sm:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
            >
              Hi, I&apos;m Saroosh. Thanks for visiting my (WIP) site.
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-slate-200/90 lg:mx-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            >
              I love all things Data &amp; ML! I build stories, systems, and products that turn complex data into momentum for teams and the people they serve.
            </motion.p>
            <motion.div
              className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center lg:justify-start"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(79,70,229,0.45)] transition hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
              >
                Explore Projects
                <span aria-hidden>-&gt;</span>
              </Link>
              <Link
                href="/recruiter"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
              >
                Recruiter Portal
              </Link>
            </motion.div>
            <motion.div
              className="grid gap-4 pt-6 sm:grid-cols-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
            >
              {heroSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-[0_20px_40px_rgba(15,23,42,0.3)]"
                >
                  <p className="text-sm font-semibold text-white">{signal.title}</p>
                  <p className="mt-2 text-xs text-slate-300/90">{signal.description}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex flex-1 items-center justify-center"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.35 }}
          >
            <div className="relative isolate w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_35px_120px_rgba(8,47,73,0.45)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.45),transparent_70%)]" />
              <div className="relative h-[22rem] w-full">
                <Image
                  src="/about-hero.jpg"
                  alt="Saroosh collaborating in a data and ML workspace"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 400px, 85vw"
                  priority
                />
              </div>
            </div>
            <div aria-hidden className="absolute -top-8 right-10 h-36 w-36 rounded-full bg-indigo-500/40 blur-[90px]" />
            <div aria-hidden className="absolute bottom-6 -left-10 h-40 w-40 rounded-full bg-cyan-400/30 blur-[100px]" />
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative px-6 pb-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <motion.div
            className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Choose your path
            </p>
            <h2 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              This landing page is your gateway into the full story.
            </h2>
            <p className="mt-4 text-lg text-slate-300/90">
              Dive into the experiences that shaped my craft, explore the products I loved shipping, or skim the notes where I unpack frameworks in real time.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {sectionCards.map((card, index) => (
              <motion.article
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_35px_80px_rgba(15,23,42,0.35)] transition duration-300 hover:border-indigo-300/40 hover:bg-indigo-500/10"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-indigo-200/80">
                  <span>{card.status}</span>
                  <span className="text-white/40">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-4 text-sm text-slate-300/90">{card.description}</p>
                <Link
                  href={card.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition group-hover:text-white"
                >
                  {card.status === 'Coming soon' ? 'Preview the journey' : 'Step inside'}
                  <span aria-hidden className="transition group-hover:translate-x-1">-&gt;</span>
                </Link>
                <div aria-hidden className="pointer-events-none absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-indigo-400/40 opacity-0 blur-[100px] transition group-hover:opacity-100" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-500/20 via-slate-900/50 to-cyan-500/20 px-8 py-12 text-center shadow-[0_40px_120px_rgba(15,23,42,0.45)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(165,180,252,0.35),transparent_70%)]" />
            <div className="relative mx-auto max-w-2xl">
              <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                Let&apos;s build data experiences that make teams say &#39;wow&#39;.
              </h3>
              <p className="mt-4 text-base text-slate-200/90">
                Whether it&apos;s architecting the pipeline, productionizing the model, or telling the story, I love working on problems where Data &amp; ML unlock lasting momentum.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/50"
                >
                  Browse featured work
                </Link>
                <Link
                  href="/notes"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
                >
                  Read my latest notes
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}


