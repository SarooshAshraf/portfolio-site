'use client'

import { motion, type MotionProps } from 'framer-motion'
import type { ComponentPropsWithoutRef } from 'react'

export type MotionDivProps = ComponentPropsWithoutRef<'div'> & MotionProps

export const MotionDiv = motion.div
