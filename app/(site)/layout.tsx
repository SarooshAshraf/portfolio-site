import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import '@/app/globals.css'

import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Saroosh Ashraf | Data & ML Portfolio',
  description: 'Showcasing data experimentation, machine learning work, and projects by Saroosh Ashraf.',
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black font-sans text-slate-100 antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
