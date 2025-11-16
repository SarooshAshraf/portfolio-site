import type { Route } from 'next'
import Link from 'next/link'

type NavLink = {
  label: string
  href: Route | { pathname: Route; hash?: string }
}

const navLinks = [
  { label: 'About', href: { pathname: '/', hash: 'about' } },
  { label: 'Notes', href: '/notes' },
  { label: 'Experience Timeline', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'For Recruiters', href: '/recruiter' },
] satisfies NavLink[]

export default function Nav() {
  return (
    <nav aria-label="Primary" className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2 px-6 py-4 text-center sm:flex-row sm:gap-6">
        <Link href="/" className="text-lg font-semibold text-white transition hover:text-white/80">
          Saroosh Ashraf
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-white/70">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
