// Unified HIVE Motion System Utilities
// Consolidates all motion patterns into a single, comprehensive system

import { Variants } from 'framer-motion';

// Utility to separate conflicting props for Framer Motion components
export function separateMotionProps<T extends Record<string, any>>(props: T) {
  const {
    layout,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    onCopy,
    onCut,
    onPaste,
    size,
    breakpoint,
    theme,
    logoLayout,
    animated,
    // Remove any other conflicting props
    ...cleanProps
  } = props;
  
  return cleanProps;
}

// Type-safe prop separation for motion components
export function getMotionProps<T extends Record<string, any>>(props: T) {
  return separateMotionProps(props) as any;
}

// Specific utility for logo components
export function getLogoMotionProps<T extends Record<string, any>>(props: T) {
  const {
    layout,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    size,
    breakpoint,
    theme,
    showWordmark,
    adaptToContext,
    userPreferences,
    ...cleanProps
  } = props;
  
  return cleanProps as any;
}

// Core HIVE Motion Personality Constants
export const hiveMotionCore = {
  // Signature liquid metal easing
  easing: [0.23, 1, 0.32, 1] as const,
  
  // Duration scale for orchestrated timing
  durations: {
    instant: 0.1,
    quick: 0.2,
    smooth: 0.4,
    flowing: 0.6,
    dramatic: 0.8,
    orchestrated: 1.2,
  },
  
  // Physics constants
  physics: {
    mass: 0.8,
    stiffness: 400,
    damping: 25,
  },
  
  // Performance optimization
  performance: {
    willChange: 'transform',
    transformOrigin: 'center',
    backfaceVisibility: 'hidden' as const,
    transform: 'translateZ(0)',
  }
} as const;

// HIVE Liquid Metal Motion System
export const liquidMetalMotion = {
  // Standard magnetic hover for buttons and cards
  magneticHover: {
    y: "var(--hive-transform-moveHover)",
    scale: "var(--hive-transform-scaleHover)",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
      mass: 0.8,
    }
  },
  
  // Tap/press interaction
  magneticTap: {
    scale: "var(--hive-transform-scaleTap)",
    y: "var(--hive-transform-movePress)",
    transition: {
      type: "spring" as const,
      stiffness: 600,
      damping: 30,
    }
  },
  
  // Entrance animations
  entrance: {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: hiveMotionCore.durations.smooth,
        ease: hiveMotionCore.easing,
      }
    }
  },
  
  // Exit animations
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: hiveMotionCore.durations.quick,
      ease: hiveMotionCore.easing,
    }
  }
};

// Standard Motion Variants (consolidating basic motion.ts)
export const hiveMotionVariants: Record<string, Variants> = {
  // Fade transitions
  fadeIn: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: hiveMotionCore.durations.smooth,
        ease: hiveMotionCore.easing,
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: hiveMotionCore.durations.quick,
        ease: hiveMotionCore.easing,
      }
    },
  },
  
  // Slide transitions with liquid feel
  slideIn: {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: hiveMotionCore.durations.smooth,
        ease: hiveMotionCore.easing,
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: {
        duration: hiveMotionCore.durations.quick,
        ease: hiveMotionCore.easing,
      }
    },
  },
  
  // Scale transitions with liquid metal feel
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: hiveMotionCore.durations.smooth,
        ease: hiveMotionCore.easing,
        type: "spring",
        ...hiveMotionCore.physics,
      }
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      transition: {
        duration: hiveMotionCore.durations.quick,
        ease: hiveMotionCore.easing,
      }
    },
  },
  
  // Liquid flow for complex sequences
  liquidFlow: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: hiveMotionCore.durations.quick,
        ease: hiveMotionCore.easing,
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: hiveMotionCore.durations.flowing,
        ease: hiveMotionCore.easing,
        type: "spring",
        ...hiveMotionCore.physics,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: {
        duration: hiveMotionCore.durations.quick,
        ease: hiveMotionCore.easing,
      }
    }
  }
};

// Get motion props based on component type
export function getHiveMotionProps(
  type: 'button' | 'card' | 'modal' | 'surface' = 'button',
  enableMagnetic: boolean = true
) {
  const base = {
    style: {
      willChange: 'transform',
      transformOrigin: 'center',
      backfaceVisibility: 'hidden' as const,
      transform: 'translateZ(0)',
    }
  };

  if (!enableMagnetic) return base;

  switch (type) {
    case 'button':
      return {
        ...base,
        whileHover: liquidMetalMotion.magneticHover,
        whileTap: liquidMetalMotion.magneticTap,
      };
      
    case 'card':
      return {
        ...base,
        whileHover: {
          y: -2,
          scale: 1.01,
          transition: liquidMetalMotion.magneticHover.transition,
        },
        whileTap: {
          scale: 0.99,
          transition: liquidMetalMotion.magneticTap.transition,
        }
      };
      
    case 'modal':
      return {
        ...base,
        ...liquidMetalMotion.entrance,
        exit: liquidMetalMotion.exit,
      };
      
    case 'surface':
      return {
        ...base,
        whileHover: {
          scale: 1.005,
          transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 25,
          }
        }
      };
      
    default:
      return base;
  }
}

// Cascade animation for multiple elements
export function getCascadeProps(index: number, delay: number = 0.05) {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * delay,
        duration: hiveMotionCore.durations.smooth,
        ease: hiveMotionCore.easing,
      }
    }
  };
}

// Advanced cascade with stagger patterns
export function getStaggerProps(
  count: number, 
  pattern: 'wave' | 'ripple' | 'sequence' = 'wave'
) {
  const delays = {
    wave: 0.03,
    ripple: 0.08, 
    sequence: 0.12,
  };
  
  return {
    animate: {
      transition: {
        staggerChildren: delays[pattern],
        delayChildren: 0.1,
      }
    }
  };
}

// Magnetic attraction system for tool building
export const magneticSystem = {
  zones: {
    near: 20,
    snap: 8,
    release: 40,
  },
  
  snapAnimation: {
    type: "spring" as const,
    stiffness: 800,
    damping: 30,
    mass: 0.5,
  },
  
  pullAnimation: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
    mass: 0.8,
  }
};

// Export legacy motion variants for backwards compatibility
export const गति = hiveMotionVariants; // Support for existing imports