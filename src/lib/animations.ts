/**
 * ZOVEN — Centralized Framer Motion animation variants
 * All animations use only opacity, transform, filter — fully GPU-accelerated.
 */

import type { Variants } from 'framer-motion'

type Ease4 = [number, number, number, number]

const smooth: Ease4 = [0.16, 1, 0.3, 1]
const snappy: Ease4 = [0.25, 1, 0.5, 1]
const bounce: Ease4 = [0.34, 1.56, 0.64, 1]

/** Simple fade up — universal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: smooth },
  },
}

/** Blur + scale up — premium card feel */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.94, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: smooth },
  },
}

/** Slide from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48, rotate: -1 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.75, ease: smooth },
  },
}

/** Slide from right */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 48, rotate: 1 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.75, ease: smooth },
  },
}

/** Scale from small — icon, badge */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: bounce },
  },
}

/** Curtain reveal (clip-path bottom-up) — headline dramatic */
export const curtainReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.85, ease: smooth },
  },
}

/** Fade in with no transform — subtle */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: snappy },
  },
}

/** Container with stagger */
export function staggerContainer(stagger = 0.1, delayChildren = 0.1): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}

/** Fast stagger container */
export const fastStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

/** Slow stagger container */
export const slowStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

/** Horizontal line draw */
export const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: smooth },
  },
}

/** Vertical line grow (for step connectors) */
export const lineGrowY: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.5, ease: snappy },
  },
}

/** Number counter (just reveal with slight upward motion) */
export const countReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: bounce },
  },
}
