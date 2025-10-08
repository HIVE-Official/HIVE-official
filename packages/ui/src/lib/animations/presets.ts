/**
 * HIVE 2025 Animation Presets
 *
 * Modern animation patterns with spring physics and natural motion.
 * Inspired by: Linear, Arc Browser, Stripe, iOS, Apple Design
 *
 * @see /packages/ui/HIVE_ANIMATION_SYSTEM.md
 */

import type { Transition, Variants } from 'framer-motion';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SPRING PHYSICS (2025 Standard)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * Spring animations feel more natural than easing curves.
 * Use springs for interactions that should feel "physical".
 */

export const springs = {
  /** Snappy response (buttons, toggles) */
  snappy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },

  /** Smooth motion (cards, modals) */
  smooth: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
  },

  /** Bouncy (success states, celebrations) */
  bouncy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 20,
    mass: 1,
  },

  /** Gentle (subtle elements, tooltips) */
  gentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
  },

  /** Wobbly (playful interactions, 3x streak milestone) */
  wobbly: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 12,
    mass: 1,
  },

  /** Stiff (instant feel, drawers) */
  stiff: {
    type: 'spring' as const,
    stiffness: 600,
    damping: 40,
    mass: 0.5,
  },
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * EASING CURVES (Fallback for non-spring animations)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const easings = {
  /** Linear's signature ease */
  linear: 'cubic-bezier(0.25, 0.1, 0.25, 1)',

  /** Material Design standard */
  material: 'cubic-bezier(0.4, 0, 0.2, 1)',

  /** Apple's ease-in-out */
  apple: 'cubic-bezier(0.42, 0, 0.58, 1)',

  /** Stripe's smooth ease */
  stripe: 'cubic-bezier(0.65, 0, 0.35, 1)',

  /** Sharp entrance */
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',

  /** Overshoot (celebrations) */
  overshoot: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TRANSITION PRESETS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const transitions = {
  /** Fast micro-interactions (hover, focus) - 120ms */
  fast: {
    duration: 0.12,
    ease: easings.material,
  },

  /** Standard UI transitions (200ms) */
  default: {
    duration: 0.2,
    ease: easings.linear,
  },

  /** Slower deliberate animations (300ms) */
  slow: {
    duration: 0.3,
    ease: easings.linear,
  },

  /** Page transitions (250ms) */
  page: {
    duration: 0.25,
    ease: easings.apple,
  },
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FADE ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const fade = {
  /** Simple fade in/out */
  simple: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as Variants,

  /** Fade with slight upward movement */
  up: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  } as Variants,

  /** Fade with slight downward movement */
  down: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  } as Variants,

  /** Fade from left */
  left: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  } as Variants,

  /** Fade from right */
  right: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  } as Variants,
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SCALE ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const scale = {
  /** Simple scale (modals, tooltips) */
  simple: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  } as Variants,

  /** Pop in (notifications, badges) */
  pop: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  } as Variants,

  /** Bounce in (success states) */
  bounce: {
    initial: { scale: 0 },
    animate: {
      scale: [0, 1.2, 1],
      transition: springs.bouncy,
    },
    exit: { scale: 0 },
  } as Variants,

  /** Grow from center */
  grow: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: springs.smooth,
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: transitions.fast,
    },
  } as Variants,
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SLIDE ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const slide = {
  /** Slide from bottom (mobile sheets) */
  fromBottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  } as Variants,

  /** Slide from top */
  fromTop: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  } as Variants,

  /** Slide from left (drawers) */
  fromLeft: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  } as Variants,

  /** Slide from right */
  fromRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  } as Variants,
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * STAGGER ANIMATIONS (Lists, Grids)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const stagger = {
  /** Fast stagger (50ms delay) */
  fast: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: springs.smooth,
      },
    },
  } as { container: Variants; item: Variants },

  /** Standard stagger (80ms delay) */
  default: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.05,
        },
      },
    },
    item: {
      hidden: { opacity: 0, x: -20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: springs.smooth,
      },
    },
  } as { container: Variants; item: Variants },

  /** Slow stagger (120ms delay) */
  slow: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: springs.gentle,
      },
    },
  } as { container: Variants; item: Variants },

  /** Grid stagger (2D grid layout) */
  grid: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.03,
        },
      },
    },
    item: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: springs.snappy,
      },
    },
  } as { container: Variants; item: Variants },
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MODAL & OVERLAY ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const modal = {
  /** Desktop modal (scale + fade) */
  desktop: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    content: {
      initial: { opacity: 0, scale: 0.95, y: 20 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: springs.smooth,
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: transitions.fast,
      },
    },
  } as { overlay: Variants; content: Variants },

  /** Mobile sheet (slide from bottom) */
  mobile: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    content: {
      initial: { y: '100%' },
      animate: {
        y: 0,
        transition: springs.smooth,
      },
      exit: {
        y: '100%',
        transition: transitions.fast,
      },
    },
  } as { overlay: Variants; content: Variants },

  /** Full screen (iOS-style) */
  fullscreen: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    content: {
      initial: { opacity: 0, scale: 0.9 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: springs.gentle,
      },
      exit: {
        opacity: 0,
        scale: 1.1,
        transition: transitions.fast,
      },
    },
  } as { overlay: Variants; content: Variants },
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MICRO-INTERACTIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const micro = {
  /** Button press (scale down) */
  press: {
    whileTap: { scale: 0.95 },
    transition: springs.snappy,
  } as const,

  /** Button hover (subtle lift) */
  hover: {
    whileHover: { y: -2 },
    transition: springs.gentle,
  } as const,

  /** Card hover (lift + glow) */
  cardHover: {
    whileHover: {
      y: -4,
      transition: springs.smooth,
    },
  } as const,

  /** Toggle switch */
  toggle: {
    layout: true,
    transition: springs.snappy,
  } as const,

  /** Checkbox check */
  check: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: springs.bouncy,
    },
  } as Variants,

  /** Loading pulse */
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  } as Variants,

  /** Shake (error state) */
  shake: {
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  } as Variants,
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SUCCESS & CELEBRATION ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const celebration = {
  /** Checkmark bounce */
  checkmark: {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: springs.bouncy,
    },
  } as Variants,

  /** Confetti burst */
  confetti: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.2, 1],
      opacity: [0, 1, 1],
      rotate: [0, 360],
      transition: {
        duration: 0.5,
        ease: easings.overshoot,
      },
    },
  } as Variants,

  /** Badge earned */
  badge: {
    initial: { scale: 0, rotate: -45 },
    animate: {
      scale: [0, 1.3, 1],
      rotate: [45, 0],
      transition: springs.wobbly,
    },
  } as Variants,

  /** Streak fire */
  streak: {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  } as Variants,
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PAGE TRANSITIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const page = {
  /** Fade (simple page transition) */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.page,
  } as const,

  /** Slide (lateral navigation) */
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: springs.smooth,
  } as const,

  /** Stack (modal-like) */
  stack: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: springs.gentle,
  } as const,
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SKELETON & LOADING ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const loading = {
  /** Skeleton pulse */
  skeleton: {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  } as Variants,

  /** Spinner rotate */
  spinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  } as Variants,

  /** Dots bounce */
  dots: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  } as Variants,
} as const;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * GESTURE ANIMATIONS (Drag, Swipe)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const gesture = {
  /** Swipe to dismiss */
  swipeToDismiss: {
    drag: 'x' as const,
    dragConstraints: { left: -100, right: 100 },
    dragElastic: 0.2,
    whileDrag: { scale: 0.95 },
  },

  /** Drag to reorder */
  dragToReorder: {
    drag: true as const,
    dragMomentum: false,
    dragElastic: 0.1,
    whileDrag: {
      scale: 1.05,
      zIndex: 10,
      transition: springs.snappy,
    },
  },

  /** Pull to refresh */
  pullToRefresh: {
    drag: 'y' as const,
    dragConstraints: { top: 0, bottom: 100 },
    dragElastic: 0.3,
  },
} as const;
