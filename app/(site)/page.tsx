'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import ProfileCard from '@/components/ProfileCard'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sarooshashraf/',
    icon: '/linkedin.png',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/sarooshashraf',
    icon: '/github-icon.png',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sarooshashraf/',
    icon: '/instagram.png',
  },
] as const

const HERO_HEADLINE = 'Thanks for visiting my site.'

export default function Page() {
  const [typedText, setTypedText] = useState(HERO_HEADLINE)
  const [isTypingComplete, setIsTypingComplete] = useState(true)
  const typingIntervalRef = useRef<number | null>(null)
  const startTimerRef = useRef<number | null>(null)
  const hasAnimated = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText(HERO_HEADLINE)
      setIsTypingComplete(true)
      return
    }

    if (hasAnimated.current) {
      return
    }

    hasAnimated.current = true
    setTypedText('')
    setIsTypingComplete(false)

    let currentIndex = 0

    startTimerRef.current = window.setTimeout(() => {
      typingIntervalRef.current = window.setInterval(() => {
        currentIndex += 1
        setTypedText(HERO_HEADLINE.slice(0, currentIndex))

        if (currentIndex >= HERO_HEADLINE.length) {
          setIsTypingComplete(true)
          if (typingIntervalRef.current !== null) {
            window.clearInterval(typingIntervalRef.current)
            typingIntervalRef.current = null
          }
        }
      }, 45)
    }, 350)

    return () => {
      if (startTimerRef.current !== null) {
        window.clearTimeout(startTimerRef.current)
        startTimerRef.current = null
      }

      if (typingIntervalRef.current !== null) {
        window.clearInterval(typingIntervalRef.current)
        typingIntervalRef.current = null
      }
    }
  }, [prefersReducedMotion])

  return (
    <main className="relative isolate overflow-hidden">

      <section className="relative px-6 pt-20 pb-16">
        <div className="mx-auto flex w-full flex-col items-center gap-10 text-center">
          <motion.h1
            className="text-center text-4xl font-semibold leading-tight text-white sm:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          >
            <span className="relative block">
              <span aria-hidden className="pointer-events-none block select-none whitespace-pre-wrap opacity-0">
                {HERO_HEADLINE}
              </span>
              <span className="absolute inset-0 block whitespace-pre-wrap">
                {typedText}
                {!isTypingComplete && (
                  <motion.span
                    aria-hidden
                    className="ml-1 inline-block h-7 w-[2px] align-bottom bg-white/80 sm:h-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </span>
            </span>
          </motion.h1>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
          >
            <ProfileCard
              className="mx-auto w-full max-w-[520px]"
              avatarUrl="/about-hero.jpg"
              miniAvatarUrl="/about-hero.jpg"
              name="Saroosh Ashraf"
              title="Software Engineer"
              status="Get in touch with me!"
              contactText="Connect"
              enableTilt
              enableMobileTilt={false}
              behindGlowColor="rgba(255,255,255,0.1)"
              innerGradient="linear-gradient(140deg, rgba(10,10,10,0.98) 0%, rgba(33,33,33,0.75) 100%)"
              onContactClick={() => {
                window.location.assign('/recruiter')
              }}
            />
          </motion.div>
          <motion.div
            className="mx-auto flex w-full max-w-[520px] flex-wrap items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
          >
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black/60 p-3 transition hover:border-white hover:bg-white"
              >
                <span className="sr-only">{social.label}</span>
                <Image
                  src={social.icon}
                  alt={social.label}
                  width={36}
                  height={36}
                  className="object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}


