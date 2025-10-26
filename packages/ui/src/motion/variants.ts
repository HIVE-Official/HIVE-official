// Bounded Context Owner: Design System Guild
import type { Variants, Transition } from 'framer-motion'
import { DUR, EASE, SPRING } from './tokens'

const sec = (ms: number) => ms / 1000
const ease = (name: keyof typeof EASE) => EASE[name]

// Enter/Exit primitives
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: sec(DUR.sm), ease: ease('decel') } },
  exit: { opacity: 0, transition: { duration: sec(DUR.sm), ease: ease('accel') } },
}

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: sec(DUR.md), ease: ease('standard') } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: sec(DUR.sm), ease: ease('accel') } },
}

export const liftY: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: sec(DUR.md), ease: ease('decel') } },
  exit: { opacity: 0, y: 8, transition: { duration: sec(DUR.sm), ease: ease('accel') } },
}

export const slideX = (dir: -1 | 1 = 1): Variants => ({
  hidden: { opacity: 0, x: 12 * dir },
  show: { opacity: 1, x: 0, transition: { duration: sec(DUR.md), ease: ease('decel') } },
  exit: { opacity: 0, x: 12 * dir, transition: { duration: sec(DUR.sm), ease: ease('accel') } },
})

export const slideY = (dir: -1 | 1 = 1): Variants => ({
  hidden: { opacity: 0, y: 12 * dir },
  show: { opacity: 1, y: 0, transition: { duration: sec(DUR.md), ease: ease('decel') } },
  exit: { opacity: 0, y: 12 * dir, transition: { duration: sec(DUR.sm), ease: ease('accel') } },
})

export const sheetUp: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ...SPRING.md } },
  exit: { y: 24, opacity: 0, transition: { duration: sec(DUR.sm), ease: ease('accel') } },
}

export const sheetRight: Variants = {
  hidden: { x: 24, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { ...SPRING.md } },
  exit: { x: 24, opacity: 0, transition: { duration: sec(DUR.sm), ease: ease('accel') } },
}

export const popoverPop: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { ...SPRING.sm } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: sec(DUR.xs), ease: ease('accel') } },
}

// Shell & list helpers
export const routeCrossfade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: sec(DUR.md), ease: ease('standard') } },
  exit: { opacity: 0, transition: { duration: sec(DUR.md), ease: ease('accel') } },
}

export const contextRailSlide = slideX(-1)

export const staggerChildren = (ms = 30) => ({
  staggerChildren: ms / 1000,
})

export const reorderSpring: Transition = { ...SPRING.sm }
export const optimisticInsert = fadeScale
