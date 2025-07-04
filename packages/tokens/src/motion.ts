// HIVE Brand System v1.0 - Motion Tokens (CUSTOM BRAND)
// Premium motion system for dark-first UI with gold accents
// NO Material Design - this is HIVE's custom motion language

export const motion = {
  // HIVE-specific durations (web-optimized, premium feel)
  duration: {
    instant: "50ms",   // Immediate feedback (hover, focus)
    fast: "120ms",     // Micro-interactions, state changes  
    base: "180ms",     // Content transitions, modals
    slow: "280ms",     // Complex animations, emphasis
    ritual: "400ms",   // Special HIVE moments, celebrations
  },

  // HIVE brand easing (tech sleek + modular)
  easing: {
    // Primary HIVE curve for all interactions
    hive: "cubic-bezier(0.33, 0.65, 0, 1)",            // Signature HIVE curve
    
    // Variations for specific contexts
    smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",     // Smooth, confident
    snap: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",     // Playful bounce (minimal use)
    elegant: "cubic-bezier(0.23, 1, 0.32, 1)",          // Elegant, refined
    
    // Performance easing (when needed)
    linear: "linear",
    ease: "ease",
  },

  // HIVE-specific scale values (subtle, premium)
  scale: {
    none: "1",
    micro: "1.01",     // Subtle hover for cards
    small: "1.02",     // Button hover
    medium: "1.05",    // Emphasis
    large: "1.1",      // Strong emphasis
    ritual: "1.15",    // Special HIVE moments
  },

  // HIVE keyframes (dark-first, gold accents)
  keyframes: {
    // Subtle entrance animations
    fadeIn: "hive-fade-in",
    slideUp: "hive-slide-up", 
    slideDown: "hive-slide-down",
    scaleIn: "hive-scale-in",
    
    // Gold accent animations
    goldPulse: "hive-gold-pulse",
    goldGlow: "hive-gold-glow",
    
    // Dark surface animations
    surfaceRise: "hive-surface-rise",
    embossReveal: "hive-emboss-reveal",
    
    // Special HIVE moments
    ritualBurst: "hive-ritual-burst",
    spaceJoin: "hive-space-join",
  },

  // Performance optimization hints
  performance: {
    // GPU-accelerated properties (safe to animate)
    gpu: ["transform", "opacity", "filter"],
    // Properties that cause layout (avoid animating)
    layout: ["width", "height", "padding", "margin", "border-width"],
    // HIVE-optimized will-change hints
    willChange: {
      transform: "transform",
      opacity: "opacity", 
      filter: "filter",
      auto: "auto",
    },
  },

  // Accessibility support
  accessibility: {
    // Reduced motion fallbacks
    reducedMotion: {
      duration: "0.01ms",
      easing: "linear",
      scale: "1",
    },
    // Focus indicators (HIVE gold)
    focus: {
      ring: "2px solid #FFD700",
      offset: "2px",
      duration: "120ms",
    },
  },
};

// HIVE motion utilities
export const createHiveTransition = (
  property: string = "all",
  duration: keyof typeof motion.duration = "fast",
  easing: keyof typeof motion.easing = "hive"
) => {
  return `${property} ${motion.duration[duration]} ${motion.easing[easing]}`;
};

export const createHiveHover = (
  scale: keyof typeof motion.scale = "micro"
) => {
  return {
    transition: createHiveTransition("transform", "fast", "hive"),
    "&:hover": {
      transform: `scale(${motion.scale[scale]})`,
    },
  };
};

export const createGoldAccent = (
  duration: keyof typeof motion.duration = "fast"
) => {
  return {
    transition: createHiveTransition("all", duration, "hive"),
    "&:hover": {
      boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
      borderColor: "#FFD700",
    },
  };
};

// HIVE-specific animation presets
export const hiveAnimations = {
  // Card hover (subtle emboss effect)
  cardHover: {
    transition: createHiveTransition("all", "fast", "smooth"),
    "&:hover": {
      transform: "scale(1.01) translateY(-1px)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 215, 0, 0.1)",
    },
  },
  
  // Button press (HIVE gold)
  buttonPress: {
    transition: createHiveTransition("all", "fast", "snap"),
    "&:active": {
      transform: "scale(0.98)",
    },
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 0 15px rgba(255, 215, 0, 0.2)",
    },
  },
  
  // Modal entrance (elegant)
  modalEnter: {
    animation: `${motion.keyframes.fadeIn} ${motion.duration.base} ${motion.easing.elegant}, ${motion.keyframes.scaleIn} ${motion.duration.base} ${motion.easing.elegant}`,
  },
  
  // Ritual celebration (special HIVE moment)
  ritualCelebration: {
    animation: `${motion.keyframes.ritualBurst} ${motion.duration.ritual} ${motion.easing.hive}`,
  },
};

export default motion;
