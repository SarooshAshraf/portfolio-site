import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import '@/app/globals.css'

import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'TODO',
  description: 'TODO',
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
