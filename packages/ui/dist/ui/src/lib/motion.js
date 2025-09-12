/**
 * HIVE Motion Utilities - Framer Motion Bridge
 * Connects HIVE design tokens with Framer Motion for consistent animations
 */
import { motion } from '../../../tokens/src/motion.js';
// HIVE Transition Presets
export const hiveTransitions = {
    // Core HIVE transitions using design tokens
    instant: {
        duration: parseFloat(motion.duration.instant) / 1000,
        ease: [0.33, 0.65, 0, 1], // HIVE signature curve
    },
    quick: {
        duration: parseFloat(motion.duration.quick) / 1000,
        ease: [0.33, 0.65, 0, 1],
    },
    smooth: {
        duration: parseFloat(motion.duration.smooth) / 1000,
        ease: [0.33, 0.65, 0, 1],
    },
    liquid: {
        duration: parseFloat(motion.duration.liquid) / 1000,
        ease: [0.25, 0.46, 0.45, 0.94], // smooth curve
    },
    dramatic: {
        duration: parseFloat(motion.duration.dramatic) / 1000,
        ease: [0.68, -0.55, 0.265, 1.55], // snap curve for special moments
    },
    // Easing variations
    flowing: {
        duration: parseFloat(motion.duration.flowing) / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
    },
    elegant: {
        duration: parseFloat(motion.duration.smooth) / 1000,
        ease: [0.23, 1, 0.32, 1],
    },
};
// HIVE Animation Variants
export const hiveVariants = {
    // Entrance animations
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: hiveTransitions.smooth,
        },
    },
    slideUp: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: hiveTransitions.smooth,
        },
    },
    slideDown: {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: hiveTransitions.smooth,
        },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: hiveTransitions.smooth,
        },
    },
    // Interactive states
    hover: {
        rest: { scale: 1 },
        hover: {
            scale: parseFloat(motion.transform.scaleHover),
            transition: hiveTransitions.quick,
        },
    },
    press: {
        rest: { scale: 1 },
        tap: {
            scale: 0.98,
            transition: hiveTransitions.instant,
        },
    },
    // Gold accent animations
    goldPulse: {
        pulse: {
            boxShadow: [
                '0 0 0 rgba(var(--hive-gold-rgb), 0)',
                '0 0 20px rgba(var(--hive-gold-rgb), 0.3)',
                '0 0 0 rgba(var(--hive-gold-rgb), 0)',
            ],
            transition: {
                duration: 2,
                ease: [0.33, 0.65, 0, 1],
                repeat: Infinity,
                repeatType: 'loop',
            },
        },
    },
    goldGlow: {
        glow: {
            filter: [
                'drop-shadow(0 0 0 rgba(var(--hive-gold-rgb), 0))',
                'drop-shadow(0 0 12px rgba(var(--hive-gold-rgb), 0.4))',
                'drop-shadow(0 0 0 rgba(var(--hive-gold-rgb), 0))',
            ],
            transition: {
                duration: 1.5,
                ease: [0.33, 0.65, 0, 1],
                repeat: Infinity,
                repeatType: 'loop',
            },
        },
    },
    // Special HIVE moments
    ritualBurst: {
        burst: {
            scale: [1, 1.05, 1.15, 1.05, 1],
            opacity: [1, 0.9, 0.8, 0.9, 1],
            filter: [
                'brightness(1)',
                'brightness(1.1)',
                'brightness(1.2) drop-shadow(0 0 15px rgba(var(--hive-gold-rgb), 0.4))',
                'brightness(1.1)',
                'brightness(1)',
            ],
            transition: hiveTransitions.dramatic,
        },
    },
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
            transition: hiveTransitions.dramatic,
        },
    },
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
    },
    // List item for staggered animations
    item: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: hiveTransitions.smooth,
        },
    },
};
// HIVE Component Animation Presets
export const hivePresets = {
    // Card hover effect
    cardHover: {
        whileHover: {
            scale: 1.01,
            y: -1,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(var(--hive-gold-rgb), 0.1)',
            transition: hiveTransitions.quick,
        },
    },
    // Button interactions
    button: {
        whileHover: {
            scale: 1.02,
            boxShadow: '0 0 15px rgba(var(--hive-gold-rgb), 0.2)',
            transition: hiveTransitions.quick,
        },
        whileTap: {
            scale: 0.98,
            transition: hiveTransitions.instant,
        },
    },
    // Modal entrance
    modal: {
        initial: 'hidden',
        animate: 'visible',
        exit: 'hidden',
        variants: {
            hidden: {
                opacity: 0,
                scale: 0.95,
                transition: hiveTransitions.smooth,
            },
            visible: {
                opacity: 1,
                scale: 1,
                transition: hiveTransitions.elegant,
            },
        },
    },
    // Page transitions
    page: {
        initial: 'hidden',
        animate: 'visible',
        exit: 'hidden',
        variants: hiveVariants.fadeIn,
    },
    // Staggered list
    list: {
        initial: 'hidden',
        animate: 'visible',
        variants: hiveVariants.container,
    },
    listItem: {
        variants: hiveVariants.item,
    },
};
// HIVE Animation Utilities
export const createHiveTransition = (duration = 'quick', easing = 'liquid') => {
    const easingMap = {
        liquid: [0.33, 0.65, 0, 1],
        smooth: [0.25, 0.46, 0.45, 0.94],
        snap: [0.68, -0.55, 0.265, 1.55],
        elegant: [0.23, 1, 0.32, 1],
        magnetic: [0.25, 0.46, 0.45, 0.94],
        silk: [0.16, 1, 0.3, 1],
        steel: [0.34, 1.56, 0.64, 1],
        molten: [0.19, 1, 0.22, 1],
        orchestrated: [0.215, 0.61, 0.355, 1],
        cinematic: [0.165, 0.84, 0.44, 1],
        cascade: [0.19, 1, 0.22, 1],
        toolSnap: [0.68, -0.6, 0.32, 1.6],
        toolFloat: [0.25, 0.46, 0.45, 0.94],
        toolPlant: [0.34, 1.56, 0.64, 1],
        easeIn: [0.4, 0, 1, 1],
        easeOut: [0, 0, 0.2, 1],
        easeInOut: [0.4, 0, 0.2, 1],
        spring: [0.175, 0.885, 0.32, 1.275],
        bounce: [0.68, -0.55, 0.265, 1.55],
    };
    return {
        duration: parseFloat(motion.duration[duration]) / 1000,
        ease: easingMap[easing],
    };
};
export const createHiveScale = (scale = 'scaleHover') => ({
    whileHover: {
        scale: parseFloat(motion.transform[scale]),
        transition: hiveTransitions.quick,
    },
});
export const createGoldAccent = (duration = 'quick') => ({
    whileHover: {
        boxShadow: '0 0 20px rgba(var(--hive-gold-rgb), 0.3)',
        borderColor: 'var(--hive-gold)',
        transition: createHiveTransition(duration, 'liquid'),
    },
});
// Accessibility helper
export const withReducedMotion = (animation) => {
    return {
        ...animation,
        // Framer Motion automatically respects prefers-reduced-motion
        // but we can override specific properties if needed
    };
};
// Export adaptive motion utilities
export { useAdaptiveMotion } from './adaptive-motion.js';
//# sourceMappingURL=motion.js.map