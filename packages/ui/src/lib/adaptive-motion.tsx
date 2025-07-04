/**
 * HIVE Adaptive Motion System
 * Adapts animations based on student energy states and time of day
 */

import React from 'react';
import { motion } from '@hive/tokens';
import { hiveTransitions, hiveVariants } from './motion';
import type { Variants, Transition } from 'framer-motion';

// Student Energy States
export type StudentEnergyState = 
  | 'high-energy'     // 8am-11am, 1pm-3pm (peak focus)
  | 'transition'      // 11am-1pm, 3pm-5pm (meals/breaks)
  | 'evening'         // 5pm-9pm (social/collaborative)
  | 'late-night'      // 9pm+ (low energy/studying)
  | 'reduced-motion'; // Accessibility override

// Campus Context
export type CampusContext = 
  | 'academic'        // Study/class focused
  | 'social'          // Social interactions
  | 'ritual'          // Special HIVE moments
  | 'navigation';     // Moving between sections

/**
 * Detect current student energy state based on time and context
 */
export function detectEnergyState(
  overrideState?: StudentEnergyState
): StudentEnergyState {
  // Check for accessibility preference first
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return 'reduced-motion';
  }

  // Use override if provided
  if (overrideState) return overrideState;

  // Detect based on time of day
  const hour = new Date().getHours();
  
  if ((hour >= 8 && hour < 11) || (hour >= 13 && hour < 15)) {
    return 'high-energy'; // Peak focus times
  } else if ((hour >= 11 && hour < 13) || (hour >= 15 && hour < 17)) {
    return 'transition'; // Break/meal times
  } else if (hour >= 17 && hour < 21) {
    return 'evening'; // Social/collaborative time
  } else {
    return 'late-night'; // Low energy studying
  }
}

/**
 * Get adaptive motion configuration based on energy state
 */
export function getAdaptiveMotion(
  energyState: StudentEnergyState,
  context: CampusContext = 'navigation'
) {
  const configs = {
    'high-energy': {
      // Fast, confident animations during peak focus
      duration: {
        instant: 30,
        fast: 90,
        base: 140,
        slow: 200,
        ritual: 300,
      },
      scale: {
        micro: 1.015,
        small: 1.03,
        medium: 1.07,
        large: 1.12,
        ritual: 1.2,
      },
      easing: 'snap' as const, // More energetic easing
    },
    
    'transition': {
      // Welcoming, smooth animations during breaks
      duration: {
        instant: 40,
        fast: 110,
        base: 160,
        slow: 240,
        ritual: 350,
      },
      scale: {
        micro: 1.01,
        small: 1.025,
        medium: 1.055,
        large: 1.08,
        ritual: 1.12,
      },
      easing: 'smooth' as const, // Welcoming easing
    },
    
    'evening': {
      // Standard HIVE animations for social time
      duration: {
        instant: 50,
        fast: 120,
        base: 180,
        slow: 280,
        ritual: 400,
      },
      scale: {
        micro: 1.01,
        small: 1.02,
        medium: 1.05,
        large: 1.1,
        ritual: 1.15,
      },
      easing: 'hive' as const, // Brand standard
    },
    
    'late-night': {
      // Gentle, minimal animations for low energy
      duration: {
        instant: 60,
        fast: 140,
        base: 220,
        slow: 320,
        ritual: 450,
      },
      scale: {
        micro: 1.005,
        small: 1.015,
        medium: 1.03,
        large: 1.05,
        ritual: 1.08,
      },
      easing: 'elegant' as const, // Gentle easing
    },
    
    'reduced-motion': {
      // Minimal animations for accessibility
      duration: {
        instant: 10,
        fast: 10,
        base: 10,
        slow: 10,
        ritual: 10,
      },
      scale: {
        micro: 1,
        small: 1,
        medium: 1,
        large: 1,
        ritual: 1,
      },
      easing: 'linear' as const,
    },
  };

  return configs[energyState];
}

/**
 * Create adaptive transition based on current energy state
 */
export function createAdaptiveTransition(
  energyState: StudentEnergyState,
  duration: keyof typeof motion.duration = 'fast',
  context: CampusContext = 'navigation'
): Transition {
  const config = getAdaptiveMotion(energyState, context);
  
  const easingMap = {
    hive: [0.33, 0.65, 0, 1],
    smooth: [0.25, 0.46, 0.45, 0.94],
    snap: [0.68, -0.55, 0.265, 1.55],
    elegant: [0.23, 1, 0.32, 1],
    linear: [0, 0, 1, 1],
  } as const;

  return {
    duration: config.duration[duration] / 1000,
    ease: easingMap[config.easing],
  };
}

/**
 * Create adaptive variants for common animations
 */
export function createAdaptiveVariants(
  energyState: StudentEnergyState,
  context: CampusContext = 'navigation'
): Record<string, Variants> {
  const config = getAdaptiveMotion(energyState, context);
  
  return {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: createAdaptiveTransition(energyState, 'base', context),
      },
    },

    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: createAdaptiveTransition(energyState, 'base', context),
      },
    },

    scaleIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: createAdaptiveTransition(energyState, 'base', context),
      },
    },

    hover: {
      rest: { scale: 1 },
      hover: { 
        scale: config.scale.micro,
        transition: createAdaptiveTransition(energyState, 'fast', context),
      },
    },

    ritual: {
      rest: { scale: 1, filter: 'brightness(1)' },
      active: { 
        scale: config.scale.ritual,
        filter: 'brightness(1.2) drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))',
        transition: createAdaptiveTransition(energyState, 'ritual', 'ritual'),
      },
    },
  };
}

/**
 * React hook for adaptive motion
 */
export function useAdaptiveMotion(
  context: CampusContext = 'navigation',
  overrideState?: StudentEnergyState
) {
  const energyState = detectEnergyState(overrideState);
  const config = getAdaptiveMotion(energyState, context);
  const variants = createAdaptiveVariants(energyState, context);
  
  return {
    energyState,
    config,
    variants,
    createTransition: (duration: keyof typeof motion.duration = 'fast') => 
      createAdaptiveTransition(energyState, duration, context),
  };
}

/**
 * Component wrapper for adaptive motion context
 */
export function AdaptiveMotionProvider({ 
  children, 
  energyState,
  context = 'navigation',
}: {
  children: React.ReactNode;
  energyState?: StudentEnergyState;
  context?: CampusContext;
}) {
  // This could be extended to use React Context if needed
  // For now, components can call useAdaptiveMotion directly
  return <>{children}</>;
}

// Export types and utilities
export type { Variants, Transition } from 'framer-motion';
export { motion } from '@hive/tokens';