import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import '@/app/globals.css'

import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import ColorBends from '@/components/ColorBends'

export const metadata: Metadata = {
  title: 'Saroosh Ashraf | Data & ML Portfolio',
  description: 'Showcasing data experimentation, machine learning work, and projects by Saroosh Ashraf.',
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black font-sans text-slate-100 antialiased">
        <div className="fixed inset-0 -z-10">
          <ColorBends
            className="h-full w-full"
            colors={['#ff5c7a', '#8a5cff', '#00ffd1']}
            rotation={0}
            autoRotate={0}
            speed={0.2}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.5}
            noise={0.1}
            transparent
          />
        </div>
        <div className="relative flex min-h-screen flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
