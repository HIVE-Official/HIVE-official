// Animation Variants using Design System Motion Tokens
export const HIVE_MOTION = {
  durations: {
    micro: 0.15,
    fast: 0.2,
    standard: 0.3,
    slow: 0.5,
    deliberate: 0.7
  },
  easing: {
    standard: [0.4, 0.0, 0.2, 1] as const,
    decelerate: [0.0, 0.0, 0.2, 1] as const,
    accelerate: [0.4, 0.0, 1, 1] as const
  },
  stagger: {
    micro: 0.05,
    small: 0.1,
    medium: 0.15
  }
} as const;

// Respect reduced motion preferences
export const getMotionConfig = () => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      ...HIVE_MOTION,
      durations: {
        micro: 0,
        fast: 0,
        standard: 0,
        slow: 0,
        deliberate: 0
      },
      stagger: {
        micro: 0,
        small: 0,
        medium: 0
      }
    };
  }
  return HIVE_MOTION;
};

export const stepContentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const cardVariants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98 }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};