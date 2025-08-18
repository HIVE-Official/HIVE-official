/**
 * HIVE Motion System
 * Standardized animation curves and durations following brand guidelines
 */

// HIVE Motion Curve - The signature easing for all HIVE animations
export const HIVE_MOTION_CURVE = [0.33, 0.65, 0, 1] as const;
export const HIVE_MOTION_CURVE_CSS = 'cubic-bezier(0.33, 0.65, 0, 1)';

// Duration System (in milliseconds)
export const HIVE_DURATIONS = {
  /** Micro-interactions: Button hovers, icon changes */
  micro: 90,
  /** Standard: Panel slides, card flips, most UI transitions */
  standard: 180,
  /** Complex: Page transitions, complex animations */
  complex: 240,
  /** Cinematic: Hero animations, celebration moments */
  cinematic: 400,
} as const;

// Framer Motion preset configurations
export const hiveMotion = {
  /** Standard HIVE transition for most UI elements */
  standard: {
    duration: HIVE_DURATIONS.standard / 1000, // Convert to seconds for Framer Motion
    ease: HIVE_MOTION_CURVE,
  },
  
  /** Quick micro-interactions */
  micro: {
    duration: HIVE_DURATIONS.micro / 1000,
    ease: HIVE_MOTION_CURVE,
  },
  
  /** Complex animations and page transitions */
  complex: {
    duration: HIVE_DURATIONS.complex / 1000,
    ease: HIVE_MOTION_CURVE,
  },
  
  /** Cinematic moments like onboarding celebrations */
  cinematic: {
    duration: HIVE_DURATIONS.cinematic / 1000,
    ease: HIVE_MOTION_CURVE,
  },
} as const;

// CSS-in-JS utilities for styled components
export const hiveTransition = {
  /** Standard transition for most elements */
  standard: `all ${HIVE_DURATIONS.standard}ms ${HIVE_MOTION_CURVE_CSS}`,
  
  /** Quick micro-interactions */
  micro: `all ${HIVE_DURATIONS.micro}ms ${HIVE_MOTION_CURVE_CSS}`,
  
  /** Complex animations */
  complex: `all ${HIVE_DURATIONS.complex}ms ${HIVE_MOTION_CURVE_CSS}`,
  
  /** Cinematic moments */
  cinematic: `all ${HIVE_DURATIONS.cinematic}ms ${HIVE_MOTION_CURVE_CSS}`,
  
  /** Property-specific transitions */
  opacity: `opacity ${HIVE_DURATIONS.standard}ms ${HIVE_MOTION_CURVE_CSS}`,
  transform: `transform ${HIVE_DURATIONS.standard}ms ${HIVE_MOTION_CURVE_CSS}`,
  colors: `background-color ${HIVE_DURATIONS.standard}ms ${HIVE_MOTION_CURVE_CSS}, border-color ${HIVE_DURATIONS.standard}ms ${HIVE_MOTION_CURVE_CSS}, color ${HIVE_DURATIONS.standard}ms ${HIVE_MOTION_CURVE_CSS}`,
} as const;

// Tailwind CSS class utilities
export const hiveTailwindTransition = {
  /** Standard transition classes for Tailwind */
  standard: `transition-all duration-[${HIVE_DURATIONS.standard}ms] ease-[${HIVE_MOTION_CURVE_CSS}]`,
  micro: `transition-all duration-[${HIVE_DURATIONS.micro}ms] ease-[${HIVE_MOTION_CURVE_CSS}]`,
  complex: `transition-all duration-[${HIVE_DURATIONS.complex}ms] ease-[${HIVE_MOTION_CURVE_CSS}]`,
  cinematic: `transition-all duration-[${HIVE_DURATIONS.cinematic}ms] ease-[${HIVE_MOTION_CURVE_CSS}]`,
} as const;

// Animation presets for common patterns
export const hiveAnimations = {
  /** Fade in animation */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: hiveMotion.standard,
  },
  
  /** Slide up animation */
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: hiveMotion.standard,
  },
  
  /** Scale in animation */
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: hiveMotion.standard,
  },
  
  /** Button press animation */
  buttonPress: {
    whileTap: { scale: 0.98 },
    transition: hiveMotion.micro,
  },
  
  /** Card hover animation */
  cardHover: {
    whileHover: { y: -2, scale: 1.01 },
    transition: hiveMotion.standard,
  },
  
  /** Stagger children animation */
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },
} as const;

// Campus Energy adaptive motion (for future implementation)
export const campusEnergyMotion = {
  /** High energy periods - faster, more dynamic */
  high: {
    duration: HIVE_DURATIONS.standard * 0.8,
    ease: HIVE_MOTION_CURVE,
  },
  
  /** Focus periods - slower, more deliberate */
  focus: {
    duration: HIVE_DURATIONS.standard * 1.2,
    ease: HIVE_MOTION_CURVE,
  },
  
  /** Transition periods - balanced */
  transition: {
    duration: HIVE_DURATIONS.standard,
    ease: HIVE_MOTION_CURVE,
  },
} as const;

// Validation utility to check if motion follows HIVE standards
export const isHiveMotion = (transition: string): boolean => {
  const hivePattern = new RegExp(
    `(${HIVE_DURATIONS.micro}|${HIVE_DURATIONS.standard}|${HIVE_DURATIONS.complex}|${HIVE_DURATIONS.cinematic})ms.*${HIVE_MOTION_CURVE_CSS.replace(/[()]/g, '\\$&')}`
  );
  return hivePattern.test(transition);
};

// Export everything for easy importing
export default {
  curve: HIVE_MOTION_CURVE,
  curveCss: HIVE_MOTION_CURVE_CSS,
  durations: HIVE_DURATIONS,
  motion: hiveMotion,
  transition: hiveTransition,
  tailwind: hiveTailwindTransition,
  animations: hiveAnimations,
  campusEnergy: campusEnergyMotion,
  isHiveMotion,
};