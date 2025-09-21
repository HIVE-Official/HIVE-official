// HIVE Liquid Metal Motion System - Complete Integration;
// Unified system that orchestrates all motion with premium feel;
import { Variants, MotionValue, useAnimation } from 'framer-motion';

// AnimationControls type definition;
type AnimationControls = ReturnType<typeof useAnimation>;
import { motionOrchestrator } from '../motion/hive-motion-system';

// 🏗️ Core Liquid Metal Physics;
export const liquidMetalPhysics = {
  // Mass settings for different component types;
  mass: {
    light: 0.5,        // Buttons, toggles, micro-interactions;
    standard: 0.8,     // Cards, forms, most UI elements;
    heavy: 1.2,        // Modals, space cards, important elements;
    massive: 1.8,      // Page transitions, space activation;
  },
  
  // Stiffness for responsiveness feel;
  stiffness: {
    snap: 800,         // Immediate magnetic snap;
    firm: 600,         // Quick decisive response;
    balanced: 400,     // Standard HIVE response;
    gentle: 200,       // Flowing, organic movement;
  },
  
  // Damping for settle behavior;
  damping: {
    tight: 35,         // Quick settle, no overshoot;
    balanced: 25,      // Perfect HIVE settle;
    loose: 15,         // Some natural overshoot;
    flowing: 10,       // Liquid-like settle;
  }
} as const;

// 🌊 Liquid Metal Signature Easing System;
export const liquidEasing = {
  // The signature HIVE curve - liquid mercury feel;
  signature: [0.23, 1, 0.32, 1] as const,
  
  // Magnetic attraction - starts slow, accelerates smoothly;
  magnetic: [0.25, 0.46, 0.45, 0.94] as const,
  
  // Silk touch - premium butter smooth;
  silk: [0.16, 1, 0.3, 1] as const,
  
  // Steel spring - controlled bounce for interactions;
  steel: [0.34, 1.56, 0.64, 1] as const,
  
  // Molten flow - for cascading sequences;
  molten: [0.19, 1, 0.22, 1] as const,
  
  // Premium snap - instant but sophisticated;
  snap: [0.25, 0.1, 0.25, 1] as const,
} as const;

// ⏱️ Orchestrated Timing System;
export const liquidTiming = {
  // Core durations aligned with 60fps;
  duration: {
    micro: 0.1,        // 6 frames - instant feedback;
    snap: 0.15,        // 9 frames - button press;
    quick: 0.2,        // 12 frames - toggle, hover;
    smooth: 0.4,       // 24 frames - HIVE signature;
    flowing: 0.6,      // 36 frames - card movement;
    dramatic: 0.8,     // 48 frames - space activation;
    orchestrated: 1.2, // 72 frames - full sequences;
    cinematic: 1.8,    // 108 frames - major milestones;
  },
  
  // Cascade timing for ripple effects;
  cascade: {
    wave: 0.03,        // Ultra-fast wave propagation;
    ripple: 0.05,      // Standard ripple spread;
    stagger: 0.08,     // Deliberate sequential reveal;
    sequence: 0.12,    // Orchestrated multi-element;
  },
  
  // Magnetic zones for tool assembly;
  magnetic: {
    detection: 24,     // px - starts magnetic pull;
    attraction: 16,    // px - strong pull begins;
    snap: 8,           // px - snaps into place;
    release: 32,       // px - releases magnetic hold;
  }
} as const;

// 🧲 Enhanced Magnetic Interaction System;
export const magneticInteractions = {
  // Standard button/card hover with magnetic lift;
  hover: {
    rest: {
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        mass: liquidMetalPhysics.mass.standard,
        stiffness: liquidMetalPhysics.stiffness.balanced,
        damping: liquidMetalPhysics.damping.balanced,
        duration: liquidTiming.duration.smooth,
      }
    },
    
    magnetic: {
      scale: 1.02,
      y: -3,
      rotateX: 1,
      rotateY: 0.5,
      transition: {
        type: "spring" as const,
        mass: liquidMetalPhysics.mass.light,
        stiffness: liquidMetalPhysics.stiffness.firm,
        damping: liquidMetalPhysics.damping.tight,
        duration: liquidTiming.duration.quick,
      }
    },
    
    pressed: {
      scale: 0.98,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        mass: liquidMetalPhysics.mass.light,
        stiffness: liquidMetalPhysics.stiffness.snap,
        damping: liquidMetalPhysics.damping.tight,
        duration: liquidTiming.duration.micro,
      }
    }
  },
  
  // Tool assembly magnetic snap;
  toolSnap: {
    floating: {
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        mass: liquidMetalPhysics.mass.standard,
        stiffness: liquidMetalPhysics.stiffness.gentle,
        damping: liquidMetalPhysics.damping.flowing,
      }
    },
    
    approaching: {
      scale: 1.05,
      filter: "blur(0.5px)",
      transition: {
        type: "spring" as const,
        mass: liquidMetalPhysics.mass.light,
        stiffness: liquidMetalPhysics.stiffness.balanced,
        damping: liquidMetalPhysics.damping.balanced,
        duration: liquidTiming.duration.quick,
      }
    },
    
    snapped: {
      scale: 1,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        mass: liquidMetalPhysics.mass.heavy,
        stiffness: liquidMetalPhysics.stiffness.snap,
        damping: liquidMetalPhysics.damping.tight,
        duration: liquidTiming.duration.snap,
      }
    }
  }
} as const;

// 🌊 Liquid Flow Variants for Content;
export const liquidFlow: Variants = {
  // Hidden state - compressed like liquid metal;
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 20,
    rotateX: -10,
    filter: "blur(1)",
    transition: { duration: 0 }
  },
  
  // Visible state - expands with liquid smoothness;
  visible: (index: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: index * liquidTiming.cascade.stagger,
      type: "spring" as const,
      mass: liquidMetalPhysics.mass.standard,
      stiffness: liquidMetalPhysics.stiffness.balanced,
      damping: liquidMetalPhysics.damping.balanced,
      duration: liquidTiming.duration.flowing,
    }
  }),
  
  // Exit state - flows out like mercury;
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -15,
    rotateX: 5,
    filter: "blur(0.5)",
    transition: {
      type: "spring" as const,
      mass: liquidMetalPhysics.mass.light,
      stiffness: liquidMetalPhysics.stiffness.firm,
      damping: liquidMetalPhysics.damping.tight,
      duration: liquidTiming.duration.quick,
    }
  }
};

// 🎭 Space Activation Sequence - Orchestrated awakening;
export const spaceActivation: Variants = {
  dormant: {
    scale: 1,
    opacity: 0.7,
    filter: "grayscale(0.3) blur(0.5px)",
    transition: {
      duration: 3,
      ease: liquidEasing.signature,
      repeat: Infinity,
      repeatType: "reverse" as const,
    }
  },
  
  awakening: {
    scale: 1.02,
    opacity: 1,
    filter: "grayscale(0) blur(0px)",
    transition: {
      type: "spring" as const,
      mass: liquidMetalPhysics.mass.heavy,
      stiffness: liquidMetalPhysics.stiffness.gentle,
      damping: liquidMetalPhysics.damping.balanced,
      duration: liquidTiming.duration.dramatic,
    }
  },
  
  activated: {
    scale: 1,
    opacity: 1,
    filter: "grayscale(0) blur(0px)",
    transition: {
      type: "spring" as const,
      mass: liquidMetalPhysics.mass.standard,
      stiffness: liquidMetalPhysics.stiffness.balanced,
      damping: liquidMetalPhysics.damping.balanced,
      duration: liquidTiming.duration.smooth,
    }
  }
};

// 🌀 Ripple Cascade System - For space activation moments;
export const rippleCascade = {
  // Primary ripple from activation point;
  origin: {
    scale: [0, 2.5, 3],
    opacity: [0.8, 0.4, 0],
    filter: ["blur(0px)", "blur(1px)", "blur(0.5)"],
    transition: {
      duration: liquidTiming.duration.dramatic,
      ease: liquidEasing.molten,
    }
  },
  
  // Connected elements that follow the ripple;
  connected: (distance: number) => ({
    scale: [1, 1.03, 1],
    opacity: [1, 0.9, 1],
    y: [0, -2, 0],
    transition: {
      delay: distance * liquidTiming.cascade.ripple,
      type: "spring" as const,
      mass: liquidMetalPhysics.mass.standard,
      stiffness: liquidMetalPhysics.stiffness.balanced,
      damping: liquidMetalPhysics.damping.balanced,
      duration: liquidTiming.duration.flowing,
    }
  }),
  
  // Secondary wave for larger activations;
  wave: (distance: number) => ({
    scale: [1, 1.01, 1],
    filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"],
    transition: {
      delay: distance * liquidTiming.cascade.wave + 0.3,
      duration: liquidTiming.duration.smooth,
      ease: liquidEasing.silk,
    }
  })
};

// 🏆 Milestone Celebrations - Orchestrated sequences;
export const milestoneSequences = {
  // Tool creation success;
  toolCreated: {
    initial: { 
      scale: 0.8, 
      opacity: 0, 
      rotate: -10,
      y: 30,
      filter: "blur(3px)"
    },
    animate: { 
      scale: [0.8, 1.1, 1], 
      opacity: 1, 
      rotate: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        mass: liquidMetalPhysics.mass.heavy,
        stiffness: liquidMetalPhysics.stiffness.balanced,
        damping: liquidMetalPhysics.damping.loose,
        duration: liquidTiming.duration.orchestrated,
        times: [0, 0.6, 1],
      }
    }
  },
  
  // Space activation celebration;
  spaceActivated: {
    initial: { 
      scale: 0.9, 
      opacity: 0, 
      rotate: -15,
      filter: "grayscale(1) blur(1)"
    },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      filter: "grayscale(0) blur(0px)",
      transition: {
        type: "spring" as const,
        mass: liquidMetalPhysics.mass.massive,
        stiffness: liquidMetalPhysics.stiffness.gentle,
        damping: liquidMetalPhysics.damping.balanced,
        duration: liquidTiming.duration.cinematic,
      }
    }
  },
  
  // Achievement unlock;
  achievement: {
    initial: { 
      scale: 0, 
      rotate: -180, 
      opacity: 0,
      filter: "brightness(0.5) blur(1)"
    },
    animate: { 
      scale: [0, 1.2, 1], 
      rotate: 0, 
      opacity: 1,
      filter: "brightness(1) blur(0px)",
      transition: {
        type: "spring" as const,
        mass: liquidMetalPhysics.mass.heavy,
        stiffness: liquidMetalPhysics.stiffness.balanced,
        damping: liquidMetalPhysics.damping.loose,
        duration: liquidTiming.duration.orchestrated,
        times: [0, 0.7, 1],
      }
    }
  }
};

// 🎮 Enhanced Motion Orchestrator;
export class LiquidMetalOrchestrator {
  private sequences = new Map<string, AnimationControls>();
  private cascadeQueue: Array<() => Promise<void>> = [];
  private isProcessingCascade = false;
  
  // Register animation controls for orchestration;
  register(id: string, controls: AnimationControls) {
    this.sequences.set(id, controls);
  }
  
  // Remove controls when component unmounts;
  unregister(id: string) {
    this.sequences.delete(id);
  }
  
  // Trigger space activation ripple effect;
  async triggerSpaceActivation(
    originId: string, 
    connectedElements: Array<{id: string, distance: number}>
  ) {
    // Start origin ripple;
    const origin = this.sequences.get(originId);
    if (origin) {
      origin.start(rippleCascade.origin);
    }
    
    // Sort by distance for proper cascade timing;
    const sorted = connectedElements.sort((a, b) => a.distance - b.distance);
    
    // Trigger connected elements;
    sorted.forEach(({id, distance}) => {
      const controls = this.sequences.get(id);
      if (controls) {
        controls.start(rippleCascade.connected(distance));
        
        // Add secondary wave for distant elements;
        if (distance > 100) {
          setTimeout(() => {
            controls.start(rippleCascade.wave(distance));
          }, 300);
        }
      }
    });
  }
  
  // Trigger milestone celebration sequence;
  async triggerMilestone(
    type: keyof typeof milestoneSequences,
    elementIds: string[]
  ) {
    const sequence = milestoneSequences[type];
    
    for (let i = 0; i < elementIds.length; i++) {
      const controls = this.sequences.get(elementIds[i]);
      if (controls) {
        setTimeout(() => {
          controls.start(sequence.animate);
        }, i * liquidTiming.cascade.sequence * 1000);
      }
    }
  }
  
  // Process queued cascade animations;
  private async processCascadeQueue() {
    if (this.isProcessingCascade || this.cascadeQueue.length === 0) return;
    
    this.isProcessingCascade = true;
    
    while (this.cascadeQueue.length > 0) {
      const animation = this.cascadeQueue.shift();
      if (animation) {
        await animation();
        await new Promise(resolve => 
          setTimeout(resolve, liquidTiming.cascade.stagger * 1000)
        );
      }
    }
    
    this.isProcessingCascade = false;
  }
  
  // Queue cascade animation;
  queueCascade(animation: () => Promise<void>) {
    this.cascadeQueue.push(animation);
    this.processCascadeQueue();
  }
  
  // Emergency stop all animations;
  stopAll() {
    this.sequences.forEach(controls => {
      controls.stop();
    });
    this.cascadeQueue.length = 0;
    this.isProcessingCascade = false;
  }
}

// Export singleton orchestrator;
export const liquidMetalOrchestrator = new LiquidMetalOrchestrator();

// 🔧 Utility Functions;
export const liquidMetalUtils = {
  // Calculate magnetic field strength based on distance;
  calculateMagneticStrength(distance: number): number {
    const maxDistance = liquidTiming.magnetic.detection;
    return Math.max(0, 1 - (distance / maxDistance));
  },
  
  // Check if element is in magnetic zone;
  isInMagneticZone(distance: number, zone: keyof typeof liquidTiming.magnetic): boolean {
    return distance <= liquidTiming.magnetic[zone];
  },
  
  // Generate cascade delay for index;
  getCascadeDelay(index: number, type: keyof typeof liquidTiming.cascade = 'stagger'): number {
    return index * liquidTiming.cascade[type];
  },
  
  // Create optimized spring transition;
  createSpringTransition(
    mass: keyof typeof liquidMetalPhysics.mass = 'standard',
    stiffness: keyof typeof liquidMetalPhysics.stiffness = 'balanced',
    damping: keyof typeof liquidMetalPhysics.damping = 'balanced'
  ) {
    return {
      type: "spring" as const,
      mass: liquidMetalPhysics.mass[mass],
      stiffness: liquidMetalPhysics.stiffness[stiffness],
      damping: liquidMetalPhysics.damping[damping],
    };
  },
  
  // Create eased transition;
  createEasedTransition(
    duration: keyof typeof liquidTiming.duration = 'smooth',
    easing: keyof typeof liquidEasing = 'signature'
  ) {
    return {
      duration: liquidTiming.duration[duration],
      ease: liquidEasing[easing],
    };
  }
};

// 🎨 Performance Optimizations;
export const liquidMetalPerformance = {
  // GPU acceleration settings;
  gpuLayer: {
    willChange: 'transform, opacity, filter',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden' as const,
    perspective: 1000,
  },
  
  // Reduced motion compliance;
  respectsReducedMotion: (motionStyles: any) => ({
    ...motionStyles,
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
      transition: 'none',
      transform: 'none',
    },
  }),
  
  // Intersection observer for performance;
  createIntersectionObserver: (callback: (entries: IntersectionObserverEntry[]) => void) => {
    return new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
    });
  }
};

// Type exports;
export type LiquidMetalPhysics = typeof liquidMetalPhysics;
export type LiquidEasing = keyof typeof liquidEasing;
export type LiquidTiming = keyof typeof liquidTiming.duration;
export type MagneticZone = keyof typeof liquidTiming.magnetic;
export type CascadeType = keyof typeof liquidTiming.cascade;