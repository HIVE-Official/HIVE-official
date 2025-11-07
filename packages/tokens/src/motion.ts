// Motion design tokens - Liquid Metal Motion System

export const motion = {
  // Simplified Motion System - ChatGPT/Vercel Feel (3 Core Curves)
  easing: {
    // PRIMARY: Use for 90% of animations (buttons, hovers, transitions)
    default: 'cubic-bezier(0.23, 1, 0.32, 1)',       // Smooth, natural (Vercel-inspired)
    reveal: 'cubic-bezier(0.23, 1, 0.32, 1)',        // Content entrance ease

    // SNAP: Use for toggles, checkboxes, instant feedback
    snap: 'cubic-bezier(0.25, 0.1, 0.25, 1)',        // Quick, decisive
    interactive: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Interactive tap/press

    // DRAMATIC: Use for achievements, rituals, major moments ONLY
    dramatic: 'cubic-bezier(0.165, 0.84, 0.44, 1)',  // Cinematic, special
    layout: 'cubic-bezier(0.165, 0.84, 0.44, 1)',    // Layout transitions

    // Legacy aliases (map to core 3)
    liquid: 'cubic-bezier(0.23, 1, 0.32, 1)',        // → default
    magnetic: 'cubic-bezier(0.23, 1, 0.32, 1)',      // → default
    silk: 'cubic-bezier(0.23, 1, 0.32, 1)',          // → default
    easeOut: 'cubic-bezier(0.23, 1, 0.32, 1)',       // → default
    spring: 'cubic-bezier(0.25, 0.1, 0.25, 1)',      // → snap
    cinematic: 'cubic-bezier(0.165, 0.84, 0.44, 1)', // → dramatic
  },
  
  // Duration Scale - Orchestrated timing (aligned with hive-motion.ts)
  duration: {
    instant: '0.1s',        // Micro-interactions
    snap: '0.15s',          // Button presses
    quick: '0.2s',          // Button press, toggle
    smooth: '0.25s',        // Hover states
    liquid: '0.35s',        // Card movements
    flowing: '0.5s',        // Layout changes
    cascade: '0.75s',       // Sequential animations
    dramatic: '1.0s',       // Space activation, major state change
    orchestrated: '1.2s',   // Full sequences, achievement moments
    cinematic: '1.0s',      // Cinematic moments
  },
  
  // Cascade Timing - For ripple effects and orchestrated sequences
  cascade: {
    wave: '0.03s',          // Ultra-fast wave effects (18ms)
    ripple: '0.05s',        // Standard ripple spread (30ms)
    stagger: '0.08s',       // Sequential element reveals (48ms)
    sequence: '0.12s',      // Deliberate orchestrated sequences (72ms)
    milestone: '0.15s',     // Major milestone celebrations (90ms)
    cinematic: '0.2s',      // Epic space activation moments (120ms)
  },
  
  // Orchestration timing patterns for complex sequences
  orchestration: {
    // Tool creation sequence timing
    toolCreation: {
      elementAppear: '0.1s',     // Individual elements appear
      elementConnect: '0.08s',   // Elements connect magnetically
      toolComplete: '0.15s',     // Tool completion celebration
      plantDelay: '0.3s',        // Delay before planting
    },
    
    // Space activation sequence timing
    spaceActivation: {
      rippleStart: '0s',         // Immediate ripple from activation point
      connectedElements: '0.05s', // Connected UI elements respond
      secondaryWave: '0.3s',     // Secondary wave for distant elements
      celebration: '0.8s',       // Celebration sequence starts
    },
    
    // Feed update sequence timing
    feedUpdate: {
      newItemAppear: '0.1s',     // New feed item appears
      existingItemShift: '0.05s', // Existing items shift
      readIndicator: '0.2s',     // Read/unread indicators update
    },
    
    // Builder progression timing
    builderProgression: {
      skillUnlock: '0.2s',       // New skill unlocks
      badgeAppear: '0.15s',      // Achievement badge appears
      rightsPropagation: '0.1s', // New rights propagate through UI
    }
  },
  
  // Transform Values - Consistent scaling and movement
  transform: {
    // Scale transforms
    scaleHover: '1.02',     // Subtle hover scale
    scaleTap: '0.98',       // Press down scale
    scaleModal: '1.05',     // Modal entrance scale
    
    // Translation values
    moveHover: '-2px',      // Upward hover movement
    movePress: '0px',       // Return to baseline
    moveSlide: '20px',      // Slide in/out distance
    
    // Rotation values
    rotateSubtle: '1deg',   // Subtle rotation
    rotateMedium: '3deg',   // Medium rotation
    rotateFull: '360deg',   // Full rotation
  },
  
  // Spring Physics - For realistic motion feel
  spring: {
    // Mass - weight feeling
    light: '0.5',          // Light, snappy elements
    normal: '0.8',         // Standard weight
    heavy: '1.2',          // Substantial elements
    
    // Stiffness - responsiveness
    soft: '200',           // Gentle, flowing
    medium: '400',         // Balanced response
    firm: '600',           // Quick, decisive
    snap: '800',           // Immediate snap
    
    // Damping - settle behavior
    loose: '15',           // Some overshoot
    balanced: '25',        // Smooth settle
    tight: '30',           // Quick settle
    overdamped: '40',      // No overshoot
  },
  
  // Magnetic Zones - Tool assembly physics
  magnetic: {
    near: '20px',          // Detection zone
    snap: '8px',           // Snap threshold
    release: '40px',       // Release distance
  },
} as const;

// Performance optimization constants
export const performance = {
  willChange: {
    transform: 'transform',
    opacity: 'opacity',
    auto: 'auto',
    scroll: 'scroll-position',
  },
  
  transformOrigin: {
    center: 'center',
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
  },
  
  backfaceVisibility: {
    visible: 'visible',
    hidden: 'hidden',
  },
} as const;

export type MotionToken = keyof typeof motion;
export type MotionEasing = keyof typeof motion.easing;
export type MotionDuration = keyof typeof motion.duration;
export type MotionCascade = keyof typeof motion.cascade;
