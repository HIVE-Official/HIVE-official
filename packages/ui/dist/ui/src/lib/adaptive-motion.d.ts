/**
 * HIVE Adaptive Motion System
 * Adapts animations based on student energy states and time of day
 */
import React from 'react';
import { motion } from '@hive/tokens';
import type { Variants, Transition } from 'framer-motion';
export type StudentEnergyState = 'high-energy' | 'transition' | 'evening' | 'late-night' | 'reduced-motion';
export type CampusContext = 'academic' | 'social' | 'ritual' | 'navigation';
/**
 * Detect current student energy state based on time and context
 */
export declare function detectEnergyState(overrideState?: StudentEnergyState): StudentEnergyState;
/**
 * Get adaptive motion configuration based on energy state
 */
export declare function getAdaptiveMotion(energyState: StudentEnergyState, context?: CampusContext): {
    duration: {
        instant: number;
        fast: number;
        base: number;
        slow: number;
        ritual: number;
    };
    scale: {
        micro: number;
        small: number;
        medium: number;
        large: number;
        ritual: number;
    };
    easing: "snap";
} | {
    duration: {
        instant: number;
        fast: number;
        base: number;
        slow: number;
        ritual: number;
    };
    scale: {
        micro: number;
        small: number;
        medium: number;
        large: number;
        ritual: number;
    };
    easing: "smooth";
} | {
    duration: {
        instant: number;
        fast: number;
        base: number;
        slow: number;
        ritual: number;
    };
    scale: {
        micro: number;
        small: number;
        medium: number;
        large: number;
        ritual: number;
    };
    easing: "hive";
} | {
    duration: {
        instant: number;
        fast: number;
        base: number;
        slow: number;
        ritual: number;
    };
    scale: {
        micro: number;
        small: number;
        medium: number;
        large: number;
        ritual: number;
    };
    easing: "elegant";
} | {
    duration: {
        instant: number;
        fast: number;
        base: number;
        slow: number;
        ritual: number;
    };
    scale: {
        micro: number;
        small: number;
        medium: number;
        large: number;
        ritual: number;
    };
    easing: "linear";
};
/**
 * Create adaptive transition based on current energy state
 */
export declare function createAdaptiveTransition(energyState: StudentEnergyState, duration?: keyof typeof motion.duration, context?: CampusContext): Transition;
/**
 * Create adaptive variants for common animations
 */
export declare function createAdaptiveVariants(energyState: StudentEnergyState, context?: CampusContext): Record<string, Variants>;
/**
 * React hook for adaptive motion
 */
export declare function useAdaptiveMotion(context?: CampusContext, overrideState?: StudentEnergyState): {
    energyState: StudentEnergyState;
    config: {
        duration: {
            instant: number;
            fast: number;
            base: number;
            slow: number;
            ritual: number;
        };
        scale: {
            micro: number;
            small: number;
            medium: number;
            large: number;
            ritual: number;
        };
        easing: "snap";
    } | {
        duration: {
            instant: number;
            fast: number;
            base: number;
            slow: number;
            ritual: number;
        };
        scale: {
            micro: number;
            small: number;
            medium: number;
            large: number;
            ritual: number;
        };
        easing: "smooth";
    } | {
        duration: {
            instant: number;
            fast: number;
            base: number;
            slow: number;
            ritual: number;
        };
        scale: {
            micro: number;
            small: number;
            medium: number;
            large: number;
            ritual: number;
        };
        easing: "hive";
    } | {
        duration: {
            instant: number;
            fast: number;
            base: number;
            slow: number;
            ritual: number;
        };
        scale: {
            micro: number;
            small: number;
            medium: number;
            large: number;
            ritual: number;
        };
        easing: "elegant";
    } | {
        duration: {
            instant: number;
            fast: number;
            base: number;
            slow: number;
            ritual: number;
        };
        scale: {
            micro: number;
            small: number;
            medium: number;
            large: number;
            ritual: number;
        };
        easing: "linear";
    };
    variants: Record<string, Variants>;
    createTransition: (duration?: keyof typeof motion.duration) => Transition;
};
/**
 * Component wrapper for adaptive motion context
 */
export declare function AdaptiveMotionProvider({ children, energyState, context, }: {
    children: React.ReactNode;
    energyState?: StudentEnergyState;
    context?: CampusContext;
}): import("react/jsx-runtime").JSX.Element;
export type { Variants, Transition } from 'framer-motion';
export { motion } from '@hive/tokens';
//# sourceMappingURL=adaptive-motion.d.ts.map