/**
 * HIVE Motion Utilities - Framer Motion Bridge
 * Connects HIVE design tokens with Framer Motion for consistent animations
 */

import { Variants, Transition, type MotionProps } from 'framer-motion';
import { motion } from '@hive/tokens';

// HIVE Transition Presets
export const hiveTransitions = {
  // Core HIVE transitions using design tokens
  instant: {
    duration: parseFloat(motion.duration.instant) / 1000,
    ease: [0.33, 0.65, 0, 1], // HIVE signature curve
  } satisfies Transition,

  fast: {
    duration: parseFloat(motion.duration.fast) / 1000,
    ease: [0.33, 0.65, 0, 1],
  } satisfies Transition,

  base: {
    duration: parseFloat(motion.duration.base) / 1000,
    ease: [0.33, 0.65, 0, 1],
  } satisfies Transition,

  slow: {
    duration: parseFloat(motion.duration.slow) / 1000,
    ease: [0.25, 0.46, 0.45, 0.94], // smooth curve
  } satisfies Transition,

  ritual: {
    duration: parseFloat(motion.duration.ritual) / 1000,
    ease: [0.68, -0.55, 0.265, 1.55], // snap curve for special moments
  } satisfies Transition,

  // Easing variations
  smooth: {
    duration: parseFloat(motion.duration.base) / 1000,
    ease: [0.25, 0.46, 0.45, 0.94],
  } satisfies Transition,

  elegant: {
    duration: parseFloat(motion.duration.base) / 1000,
    ease: [0.23, 1, 0.32, 1],
  } satisfies Transition,
} as const;

// HIVE Animation Variants
export const hiveVariants = {
  // Entrance animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: hiveTransitions.base,
    },
  } satisfies Variants,

  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: hiveTransitions.base,
    },
  } satisfies Variants,

  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: hiveTransitions.base,
    },
  } satisfies Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: hiveTransitions.base,
    },
  } satisfies Variants,

  // Interactive states
  hover: {
    rest: { scale: 1 },
    hover: { 
      scale: parseFloat(motion.scale.micro),
      transition: hiveTransitions.fast,
    },
  } satisfies Variants,

  press: {
    rest: { scale: 1 },
    tap: { 
      scale: 0.98,
      transition: hiveTransitions.instant,
    },
  } satisfies Variants,

  // Gold accent animations
  goldPulse: {
    pulse: {
      boxShadow: [
        '0 0 0 rgba(255, 215, 0, 0)',
        '0 0 20px rgba(255, 215, 0, 0.3)',
        '0 0 0 rgba(255, 215, 0, 0)',
      ],
      transition: {
        duration: 2,
        ease: [0.33, 0.65, 0, 1],
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  } satisfies Variants,

  goldGlow: {
    glow: {
      filter: [
        'drop-shadow(0 0 0 rgba(255, 215, 0, 0))',
        'drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))',
        'drop-shadow(0 0 0 rgba(255, 215, 0, 0))',
      ],
      transition: {
        duration: 1.5,
        ease: [0.33, 0.65, 0, 1],
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  } satisfies Variants,

  // Special HIVE moments
  ritualBurst: {
    burst: {
      scale: [1, 1.05, 1.15, 1.05, 1],
      opacity: [1, 0.9, 0.8, 0.9, 1],
      filter: [
        'brightness(1)',
        'brightness(1.1)',
        'brightness(1.2) drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))',
        'brightness(1.1)',
        'brightness(1)',
      ],
      transition: hiveTransitions.ritual,
    },
  } satisfies Variants,

  spaceJoin: {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      rotate: -2,
      filter: 'blur(2px)',
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      filter: 'blur(0px)',
      transition: hiveTransitions.ritual,
    },
  } satisfies Variants,

  // Container animations for staggered children
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } satisfies Variants,

  // List item for staggered animations
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: hiveTransitions.base,
    },
  } satisfies Variants,
} as const;

// HIVE Component Animation Presets
export const hivePresets = {
  // Card hover effect
  cardHover: {
    whileHover: {
      scale: 1.01,
      y: -1,
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 215, 0, 0.1)',
      transition: hiveTransitions.fast,
    },
  } satisfies Partial<MotionProps>,

  // Button interactions
  button: {
    whileHover: {
      scale: 1.02,
      boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)',
      transition: hiveTransitions.fast,
    },
    whileTap: {
      scale: 0.98,
      transition: hiveTransitions.instant,
    },
  } satisfies Partial<MotionProps>,

  // Modal entrance
  modal: {
    initial: 'hidden',
    animate: 'visible',
    exit: 'hidden',
    variants: {
      hidden: { 
        opacity: 0, 
        scale: 0.95,
        transition: hiveTransitions.base,
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: hiveTransitions.elegant,
      },
    },
  } satisfies Partial<MotionProps>,

  // Page transitions
  page: {
    initial: 'hidden',
    animate: 'visible',
    exit: 'hidden',
    variants: hiveVariants.fadeIn,
  } satisfies Partial<MotionProps>,

  // Staggered list
  list: {
    initial: 'hidden',
    animate: 'visible',
    variants: hiveVariants.container,
  } satisfies Partial<MotionProps>,

  listItem: {
    variants: hiveVariants.item,
  } satisfies Partial<MotionProps>,
} as const;

// HIVE Animation Utilities
export const createHiveTransition = (
  duration: keyof typeof motion.duration = 'fast',
  easing: keyof typeof motion.easing = 'hive'
): Transition => {
  const easingMap = {
    hive: [0.33, 0.65, 0, 1],
    smooth: [0.25, 0.46, 0.45, 0.94],
    snap: [0.68, -0.55, 0.265, 1.55],
    elegant: [0.23, 1, 0.32, 1],
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
  } as const;

  return {
    duration: parseFloat(motion.duration[duration]) / 1000,
    ease: easingMap[easing],
  };
};

export const createHiveScale = (
  scale: keyof typeof motion.scale = 'micro'
): Partial<MotionProps> => ({
  whileHover: {
    scale: parseFloat(motion.scale[scale]),
    transition: hiveTransitions.fast,
  },
});

export const createGoldAccent = (
  duration: keyof typeof motion.duration = 'fast'
): Partial<MotionProps> => ({
  whileHover: {
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
    borderColor: '#FFD700',
    transition: createHiveTransition(duration, 'hive'),
  },
});

// Accessibility helper
export const withReducedMotion = (animation: Partial<MotionProps>): Partial<MotionProps> => {
  return {
    ...animation,
    // Framer Motion automatically respects prefers-reduced-motion
    // but we can override specific properties if needed
  };
};

// Export motion tokens for direct access
export { motion } from '@hive/tokens';
export type { Variants, Transition, MotionProps } from 'framer-motion';

// Export adaptive motion utilities
export { useAdaptiveMotion, type StudentEnergyState, type CampusContext } from './adaptive-motion';