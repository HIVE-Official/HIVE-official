// HIVE Motion System Foundation - Liquid Metal with Orchestrated Physics;
// Every animation feels like liquid metal with real weight and premium precision;
import { Variants, MotionValue, useAnimation } from 'framer-motion';

// 🎬 Core Motion Personality: Liquid Metal;
// Premium, weighty, but impossibly smooth;
export const liquidMetal = {
  // The signature HIVE easing - smooth operator;
  easing: [0.23, 1, 0.32, 1] as const,
  
  // Physics constants for weight and momentum;
  physics: {
    mass: 0.8,           // Feels substantial but not sluggish;
    stiffness: 400,      // Responsive spring;
    damping: 25,         // Smooth settle without bounce;
    velocity: 0,         // Clean start;
  },
  
  // Performance optimization;
  performance: {
    willChange: 'transform',
    transformOrigin: 'center',
    backfaceVisibility: 'hidden' as const,
    transform: 'translateZ(0)', // GPU layer;
  }
} as const;

// 🌊 Motion Duration Scale - Orchestrated Timing;
export const motionDurations = {
  instant: 0.1,       // Micro-interactions;
  quick: 0.2,         // Button press, toggle;
  smooth: 0.4,        // The signature HIVE duration;
  flowing: 0.6,       // Card transitions, form reveals;
  dramatic: 0.8,      // Space activation, major state change;
  orchestrated: 1.2,  // Full sequences, achievement moments;
} as const;

// ⚡ Cascade Timing System - For ripple effects;
export const cascadeTiming = {
  stagger: 0.05,      // 50ms between elements;
  ripple: 0.08,       // Faster for ripple effects;
  sequence: 0.12,     // Slower for deliberate sequences;
  wave: 0.03,         // Ultra-fast wave effects;
} as const;

// 🧲 Magnetic Snap System - Tool Assembly Physics;
export const magneticSnap = {
  // Detection zones for magnetic attraction;
  zones: {
    near: 20,           // px - starts magnetic pull;
    snap: 8,            // px - snaps into place;
    release: 40,        // px - releases magnetic hold;
  },
  
  // Snap animation;
  snapAnimation: {
    type: "spring" as const,
    stiffness: 800,     // Firm snap;
    damping: 30,        // Quick settle;
    mass: 0.5,          // Light feel for precision;
  },
  
  // Magnetic pull animation;
  pullAnimation: {
    type: "spring" as const,
    stiffness: 300,     // Gradual pull;
    damping: 20,        // Smooth approach;
    mass: 0.8,          // Heavier feel for anticipation;
  }
} as const;

// 🌀 Liquid Flow Variants - For content that flows like liquid metal;
export const liquidFlow: Variants = {
  // Hidden state - compressed and transparent;
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0,
    }
  },
  
  // Visible state - expands with liquid smoothness;
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      ...liquidMetal.physics,
    }
  },
  
  // Exit state - flows out smoothly;
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

// 📡 Feed Update Flow - New items flow in like liquid metal;
export const feedFlow: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    scale: 0.9,
    transition: { duration: 0 }
  },
  
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: index * cascadeTiming.stagger,
      duration: motionDurations.flowing,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    }
  }),
  
  // Push existing content with real weight;
  pushed: {
    y: -5,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

// 🎯 Magnetic Hover - Premium interaction feel;
export const magneticHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      ...liquidMetal.physics,
    }
  },
  
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      stiffness: 400,
      damping: 15,
    }
  },
  
  pressed: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: motionDurations.instant,
      ease: liquidMetal.easing as any,
    }
  }
};

// 🧈 Buttery Social Interactions - Production-level college platform feel;
export const butteryInteractions = {
  // Haptic-like button feedback with multiple states;
  socialButton: {
    rest: {
      scale: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        duration: motionDurations.smooth,
        ease: liquidMetal.easing as any,
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      }
    },
    
    hover: {
      scale: 1.05,
      y: -1,
      transition: {
        duration: motionDurations.quick,
        ease: liquidMetal.easing as any,
        type: "spring" as const,
        stiffness: 500,
        damping: 12,
      }
    },
    
    pressed: {
      scale: 0.95,
      y: 1,
      rotateZ: 0.5,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    
    // Satisfying release with slight overshoot;
    released: {
      scale: 1.02,
      y: 0,
      rotateZ: 0,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring" as const,
        stiffness: 400,
        damping: 15,
      }
    }
  },

  // Real-time presence pulse that feels alive;
  presencePulse: {
    online: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    },
    
    active: {
      scale: [1, 1.15, 1],
      opacity: [1, 0.9, 1],
      boxShadow: [
        "0 0 0 0 color-mix(in_srgb,var(--hive-brand-secondary)_40%,transparent)",
        "0 0 0 1 color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)",
        "0 0 0 0 transparent"
      ],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    },
    
    typing: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    }
  },

  // Floating reactions that feel magical;
  floatingReaction: {
    spawn: {
      scale: 0,
      opacity: 0,
      y: 0,
      x: 0,
      rotate: 0,
      transition: { duration: 0 }
    },
    
    float: {
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0.8],
      y: -60,
      x: (Math.random() - 0.5) * 40,
      rotate: (Math.random() - 0.5) * 30,
      transition: {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.3, 1],
      }
    },
    
    vanish: {
      scale: 0.8,
      opacity: 0,
      y: -80,
      transition: {
        duration: 0.3,
        ease: liquidMetal.easing as any,
      }
    }
  },

  // Smooth typing indicators with personality;
  typingIndicator: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 10,
      transition: { duration: 0 }
    },
    
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: motionDurations.quick,
        ease: liquidMetal.easing as any,
        type: "spring" as const,
        stiffness: 400,
        damping: 20,
      }
    },
    
    // Subtle bounce for dots;
    bounce: (index: number) => ({
      y: [0, -8, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
        delay: index * 0.15,
      }
    })
  },

  // Production-level loading states that feel premium;
  loadingStates: {
    // Smooth skeleton shimmer;
    skeleton: {
      backgroundPosition: ["-200%", "200%"],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    },
    
    // Elegant spinner;
    spinner: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    },
    
    // Pulsing placeholder;
    pulse: {
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    },
    
    // Smooth content reveal;
    contentReveal: {
      hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
        transition: { duration: 0 }
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: motionDurations.flowing,
          ease: liquidMetal.easing as any,
          type: "spring" as const,
          stiffness: 300,
          damping: 25,
        }
      }
    }
  },

  // Seamless engagement flows with instant feedback;
  engagementFlow: {
    // Like button with heart animation;
    likeButton: {
      idle: {
        scale: 1,
        rotate: 0,
        transition: {
          duration: motionDurations.smooth,
          ease: liquidMetal.easing as any,
        }
      },
      
      liked: {
        scale: [1, 1.3, 1.1],
        rotate: [0, 15, 0],
        transition: {
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
          times: [0, 0.6, 1],
        }
      },
      
      // Bounce for repeated likes;
      bounce: {
        scale: [1.1, 1.2, 1.1],
        transition: {
          duration: 0.2,
          ease: "easeInOut",
        }
      }
    },
    
    // Comment expansion with smooth reveal;
    commentExpansion: {
      collapsed: {
        height: 0,
        opacity: 0,
        transition: {
          duration: motionDurations.smooth,
          ease: liquidMetal.easing as any,
        }
      },
      
      expanded: {
        height: "auto",
        opacity: 1,
        transition: {
          duration: motionDurations.flowing,
          ease: liquidMetal.easing as any,
          staggerChildren: 0.1,
        }
      }
    },
    
    // Share button with ripple effect;
    shareButton: {
      rest: {
        scale: 1,
        boxShadow: "0 0 0 0 transparent",
        transition: {
          duration: motionDurations.smooth,
          ease: liquidMetal.easing as any,
        }
      },
      
      shared: {
        scale: [1, 1.1, 1],
        boxShadow: [
          "0 0 0 0 color-mix(in_srgb,var(--hive-brand-secondary)_40%,transparent)",
          "0 0 0 5 transparent",
          "0 0 0 0 transparent"
        ],
        transition: {
          duration: 0.6,
          ease: liquidMetal.easing as any,
          times: [0, 0.5, 1],
        }
      }
    }
  }
} as const;

// 🌊 Ripple Cascade - Space activation ripples;
export const rippleCascade = {
  // Central ripple that spreads outward;
  center: {
    scale: [0, 2, 2.5],
    opacity: [0.6, 0.3, 0],
    transition: {
      duration: motionDurations.dramatic,
      ease: liquidMetal.easing as any,
    }
  },
  
  // Connected components that follow;
  connected: (distance: number) => ({
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      delay: distance * cascadeTiming.ripple,
      duration: motionDurations.flowing,
      ease: liquidMetal.easing as any,
    }
  })
};

// 🏗️ Tool Assembly Animation - Elements snap together;
export const toolAssembly: Variants = {
  floating: {
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      ...liquidMetal.physics,
    }
  },
  
  // Approaching magnetic field;
  approaching: {
    scale: 1.05,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  
  // Snapped into place;
  assembled: {
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      ...magneticSnap.snapAnimation,
      duration: motionDurations.quick,
    }
  }
};

// 🎭 Ambient Breathing - Dormant spaces waiting for activation;
export const ambientBreathing: Variants = {
  dormant: {
    scale: 1,
    opacity: 0.7,
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
    }
  },
  
  awakening: {
    scale: 1.02,
    opacity: 1,
    transition: {
      duration: motionDurations.dramatic,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      ...liquidMetal.physics,
    }
  }
};

// 🏆 Milestone Moments - Big orchestrated sequences;
export const milestoneSequence = {
  // Space activation celebration;
  spaceActivation: {
    initial: { scale: 0.9, opacity: 0, rotate: -5 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: {
        duration: motionDurations.orchestrated,
        ease: liquidMetal.easing as any,
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      }
    }
  },
  
  // Tool launch sequence;
  toolLaunch: {
    initial: { y: 50, opacity: 0, scale: 0.8 },
    animate: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: motionDurations.dramatic,
        ease: liquidMetal.easing as any,
        type: "spring" as const,
        ...liquidMetal.physics,
      }
    }
  },
  
  // Achievement unlock;
  achievement: {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { 
      scale: [0, 1.2, 1], 
      rotate: 0, 
      opacity: 1,
      transition: {
        duration: motionDurations.orchestrated,
        ease: liquidMetal.easing as any,
        times: [0, 0.6, 1],
      }
    }
  }
};

// 🎮 Motion Control System - Central orchestration;
export class HiveMotionOrchestrator {
  private activeSequences = new Map<string, ReturnType<typeof useAnimation>>();
  private cascadeQueue: Array<() => void> = [];
  
  // Register a motion sequence;
  registerSequence(id: string, controls: ReturnType<typeof useAnimation>) {
    this.activeSequences.set(id, controls);
  }
  
  // Trigger orchestrated sequence;
  async triggerSequence(sequenceType: keyof typeof milestoneSequence, elements: string[]) {
    const sequence = milestoneSequence[sequenceType];
    
    // Animate elements in cascade;
    for (let i = 0; i < elements.length; i++) {
      const controls = this.activeSequences.get(elements[i]);
      if (controls) {
        setTimeout(() => {
          controls.start(sequence.animate);
        }, i * cascadeTiming.sequence * 1000);
      }
    }
  }
  
  // Trigger ripple effect from source element;
  triggerRipple(sourceId: string, connectedElements: Array<{id: string, distance: number}>) {
    // Start center ripple;
    const sourceControls = this.activeSequences.get(sourceId);
    if (sourceControls) {
      sourceControls.start(rippleCascade.center);
    }
    
    // Cascade to connected elements;
    connectedElements.forEach(({id, distance}) => {
      const controls = this.activeSequences.get(id);
      if (controls) {
        controls.start(rippleCascade.connected(distance));
      }}
    });
  }
  
  // Cleanup completed sequences;
  cleanup(id: string) {
    this.activeSequences.delete(id);
  }
}

// Export singleton orchestrator;
export const motionOrchestrator = new HiveMotionOrchestrator();

// 🎨 CSS Custom Properties for smooth operator easing;
export const motionCSS = `
  :root {
    --hive-easing: cubic-bezier(0.23, 1, 0.32, 1);
    --hive-duration-smooth: 0.4s;
    --hive-duration-quick: 0.2s;
    --hive-duration-flowing: 0.6s;
  }
  
  .hive-motion-base {
    transition: all var(--hive-duration-smooth) var(--hive-easing);
    transform-origin: center;
    will-change: transform;
    backface-visibility: hidden;
    transform: translateZ(0);
  }
  
  .hive-motion-quick {
    transition-duration: var(--hive-duration-quick);
  }
  
  .hive-motion-flowing {
    transition-duration: var(--hive-duration-flowing);
  }
`;

// 🔧 Utility Functions;
export const motionUtils = {
  // Calculate distance for cascade timing;
  calculateDistance(element1: DOMRect, element2: DOMRect): number {
    const dx = element1.x - element2.x;
    const dy = element1.y - element2.y;
    return Math.sqrt(dx * dx + dy * dy);
  },
  
  // Check if element is in magnetic zone;
  isInMagneticZone(element: DOMRect, target: DOMRect, zone: keyof typeof magneticSnap.zones): boolean {
    const distance = this.calculateDistance(element, target);
    return distance <= magneticSnap.zones[zone];
  },
  
  // Generate stagger delay for index;
  getStaggerDelay(index: number, type: keyof typeof cascadeTiming = 'stagger'): number {
    return index * cascadeTiming[type];
  },
  
  // Create liquid metal transition;
  createLiquidTransition(duration: keyof typeof motionDurations = 'smooth') {
    return {
      duration: motionDurations[duration],
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      ...liquidMetal.physics,
    };
  }
};

export type MotionDuration = keyof typeof motionDurations;
export type CascadeType = keyof typeof cascadeTiming;
export type MagneticZone = keyof typeof magneticSnap.zones;