import Link from 'next/link'

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/notes', label: 'Notes' },
  { href: '/projects', label: 'Projects' },
  { href: '/recruiter', label: 'For Recruiters' },
]

export default function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold text-white transition hover:text-indigo-200"
        >
          Saroosh Ashraf
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-300 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/notes"
          className="group inline-flex items-center gap-2 rounded-full border border-indigo-400/60 bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:border-indigo-300 hover:bg-indigo-500/30 hover:text-white"
        >
          Latest Notes
          <span aria-hidden className="translate-x-0 transition group-hover:translate-x-1">-&gt;</span>
        </Link>
      </div>
    </nav>
  )
}
