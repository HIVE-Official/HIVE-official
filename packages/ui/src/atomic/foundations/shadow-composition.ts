/**
 * HIVE Shadow/Elevation Composition System - PRODUCTION READY
 * Depth hierarchy for UI layers and campus social interface
 * 
 * Built for dark mode campus platform with subtle, systematic depth
 * Creates visual hierarchy through elevation and shadow patterns
 * 
 * Status: ✅ PRODUCTION READY
 * Version: v1.0.0
 * Date: August 26, 2025
 */

// === SHADOW PHILOSOPHY ===
export const shadowPrinciples = {
  philosophy: "Elevation creates hierarchy and guides attention in campus social flows",
  rules: [
    "Dark mode optimized: Subtle shadows that work on dark backgrounds",
    "Campus hierarchy: Clear distinction between content layers",
    "Performance first: Lightweight shadows that don't impact scroll",
    "Mobile optimized: Visible on all devices and lighting conditions"
  ]
} as const;

// === ELEVATION SCALE ===
export const elevationScale = {
  // Systematic depth levels (0-5 scale)
  surface: {
    level: 0,
    description: 'Base surface, no elevation',
    shadow: 'none',
    use: 'Page backgrounds, base cards',
    zIndex: 0
  },
  
  raised: {
    level: 1,
    description: 'Slightly elevated, subtle depth',
    shadow: '0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.08)',
    use: 'Basic cards, form inputs, subtle containers',
    zIndex: 1
  },
  
  floating: {
    level: 2, 
    description: 'Clearly floating, standard card depth',
    shadow: '0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)',
    use: 'Standard cards, buttons, interactive elements',
    zIndex: 10
  },
  
  elevated: {
    level: 3,
    description: 'Prominently elevated, attention-drawing',
    shadow: '0 8px 16px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.16)',
    use: 'Important cards, modal triggers, featured content',
    zIndex: 20
  },
  
  lifted: {
    level: 4,
    description: 'High elevation, temporary emphasis',
    shadow: '0 16px 32px rgba(0, 0, 0, 0.24), 0 8px 16px rgba(0, 0, 0, 0.20)',
    use: 'Hover states, active elements, temporary overlays',
    zIndex: 30
  },
  
  overlay: {
    level: 5,
    description: 'Maximum elevation, overlay content',
    shadow: '0 24px 48px rgba(0, 0, 0, 0.32), 0 16px 32px rgba(0, 0, 0, 0.28)',
    use: 'Modals, dropdowns, tooltips, popover content',
    zIndex: 50
  }
} as const;

// === SHADOW CSS VARIABLES ===
export const shadowVariables = {
  // CSS custom properties for shadows (already in design-tokens.css)
  variables: {
    sm: 'var(--hive-shadow-sm)',     // Level 1 - raised
    base: 'var(--hive-shadow-base)', // Level 2 - floating  
    md: 'var(--hive-shadow-md)',     // Level 3 - elevated
    lg: 'var(--hive-shadow-lg)',     // Level 4 - lifted
    xl: 'var(--hive-shadow-xl)'      // Level 5 - overlay
  },
  
  // Tailwind class mappings
  tailwind: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    base: 'shadow',
    md: 'shadow-md', 
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }
} as const;

// === CAMPUS SHADOW PATTERNS ===
export const campusShadowPatterns = {
  // Feed/Social Content
  social: {
    post: {
      shadow: elevationScale.floating.shadow,
      class: 'shadow-md',
      interaction: 'hover:shadow-lg transition-shadow duration-200',
      use: 'Social posts, user content cards'
    },
    
    comment: {
      shadow: elevationScale.raised.shadow,
      class: 'shadow-sm',
      interaction: 'hover:shadow transition-shadow duration-200',
      use: 'Comment cards, nested content'
    },
    
    reaction: {
      shadow: 'none',
      class: 'shadow-none',
      interaction: 'hover:shadow-sm transition-shadow duration-150',
      use: 'Reaction buttons, micro-interactions'
    }
  },
  
  // Academic/Study Content
  academic: {
    studyCard: {
      shadow: elevationScale.floating.shadow,
      class: 'shadow-md',
      interaction: 'hover:shadow-lg active:shadow transition-shadow duration-200',
      use: 'Study group cards, academic content'
    },
    
    scheduleItem: {
      shadow: elevationScale.raised.shadow,
      class: 'shadow-sm',
      interaction: 'hover:shadow transition-shadow duration-200',
      use: 'Calendar items, schedule blocks'
    },
    
    resourceCard: {
      shadow: elevationScale.elevated.shadow,
      class: 'shadow-lg',
      interaction: 'hover:shadow-xl transition-shadow duration-200',
      use: 'Important resources, featured content'
    }
  },
  
  // Space/Community Content
  community: {
    spaceCard: {
      shadow: elevationScale.floating.shadow,
      class: 'shadow-md',
      interaction: 'hover:shadow-lg group-focus:shadow-lg transition-shadow duration-200',
      use: 'Space cards, community previews'
    },
    
    memberCard: {
      shadow: elevationScale.raised.shadow,
      class: 'shadow-sm',
      interaction: 'hover:shadow transition-shadow duration-200',
      use: 'Member lists, user previews'
    },
    
    leaderCard: {
      shadow: elevationScale.elevated.shadow,
      class: 'shadow-lg',
      interaction: 'hover:shadow-xl transition-shadow duration-200',
      use: 'Space leaders, featured members'
    }
  },
  
  // Tool/Builder Content
  tools: {
    toolCard: {
      shadow: elevationScale.floating.shadow,
      class: 'shadow-md',
      interaction: 'hover:shadow-lg active:shadow-sm transition-shadow duration-200',
      use: 'Tool marketplace cards'
    },
    
    builderPanel: {
      shadow: elevationScale.elevated.shadow,
      class: 'shadow-lg',
      interaction: 'focus-within:shadow-xl transition-shadow duration-300',
      use: 'Tool builder interface panels'
    },
    
    previewCard: {
      shadow: elevationScale.lifted.shadow,
      class: 'shadow-xl',
      interaction: 'hover:shadow-2xl transition-shadow duration-200',
      use: 'Tool previews, showcase items'
    }
  }
} as const;

// === INTERACTIVE SHADOW STATES ===
export const interactiveShadows = {
  // Button shadow patterns
  buttons: {
    primary: {
      default: 'shadow-md',
      hover: 'shadow-lg hover:shadow-xl',
      active: 'active:shadow-sm',
      focus: 'focus-visible:shadow-lg focus-visible:shadow-[var(--hive-gold-primary)]/20',
      transition: 'transition-shadow duration-200'
    },
    
    secondary: {
      default: 'shadow-sm',
      hover: 'shadow-md hover:shadow-lg',
      active: 'active:shadow-sm',
      focus: 'focus-visible:shadow-md',
      transition: 'transition-shadow duration-200'
    },
    
    ghost: {
      default: 'shadow-none',
      hover: 'shadow-sm hover:shadow-md',
      active: 'active:shadow-none',
      focus: 'focus-visible:shadow-sm',
      transition: 'transition-shadow duration-150'
    }
  },
  
  // Card interaction shadows
  cards: {
    static: {
      shadow: 'shadow-sm',
      transition: 'none'
    },
    
    interactive: {
      default: 'shadow-md',
      hover: 'hover:shadow-lg',
      active: 'active:shadow',
      focus: 'focus:shadow-lg focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20',
      transition: 'transition-all duration-200'
    },
    
    selectable: {
      default: 'shadow-sm',
      hover: 'hover:shadow-md',
      selected: 'shadow-lg ring-2 ring-[var(--hive-gold-primary)]/30',
      transition: 'transition-all duration-200'
    },
    
    draggable: {
      default: 'shadow-md',
      hover: 'hover:shadow-lg',
      dragging: 'shadow-xl rotate-2 scale-105',
      transition: 'transition-all duration-150'
    }
  },
  
  // Input shadow patterns
  inputs: {
    default: {
      shadow: 'shadow-sm',
      focus: 'focus:shadow-md focus:shadow-[var(--hive-gold-primary)]/10',
      error: 'shadow-sm shadow-[var(--hive-error-primary)]/20',
      success: 'shadow-sm shadow-[var(--hive-success-primary)]/20'
    }
  }
} as const;

// === MODAL AND OVERLAY SHADOWS ===
export const overlayShadows = {
  // Modal shadows (highest elevation)
  modal: {
    backdrop: 'shadow-none', // Backdrop has no shadow
    content: 'shadow-xl drop-shadow-2xl',
    animation: 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2'
  },
  
  // Dropdown shadows
  dropdown: {
    menu: 'shadow-lg drop-shadow-lg',
    item: 'shadow-none hover:shadow-sm',
    animation: 'animate-in fade-in-0 slide-in-from-top-2'
  },
  
  // Tooltip shadows
  tooltip: {
    container: 'shadow-md drop-shadow-sm',
    animation: 'animate-in fade-in-0 zoom-in-95'
  },
  
  // Popover shadows
  popover: {
    content: 'shadow-lg drop-shadow-md',
    trigger: 'shadow-none',
    animation: 'animate-in fade-in-0 zoom-in-95'
  }
} as const;

// === PERFORMANCE SHADOW PATTERNS ===
export const performanceShadows = {
  // Optimized shadow patterns
  optimization: {
    // Use transform instead of box-shadow for animations
    transform: 'Use transform: translateY() for lift effects instead of heavy shadow changes',
    
    // Batch shadow updates
    batching: 'Group shadow transitions with other properties',
    
    // Avoid complex shadows on scroll
    scrollOptimization: 'Reduce shadow complexity during scroll events'
  },
  
  // Mobile shadow adjustments
  mobile: {
    reduced: 'Slightly reduce shadow intensity on mobile for performance',
    touch: 'Ensure shadows are visible under finger during touch',
    battery: 'Consider battery impact of complex shadows'
  },
  
  // Dark mode shadow optimization
  darkMode: {
    visibility: 'Ensure shadows are visible on dark backgrounds',
    contrast: 'Maintain sufficient contrast for accessibility',
    subtlety: 'Use subtle shadows that enhance rather than overpower'
  }
} as const;

// === Z-INDEX MANAGEMENT ===
export const zIndexLayers = {
  // Systematic z-index hierarchy
  behind: -1,     // Behind base content
  base: 0,        // Base layer (most content)
  raised: 1,      // Slightly above base
  floating: 10,   // Standard floating content
  elevated: 20,   // Important floating content
  lifted: 30,     // Temporary elevated content
  overlay: 40,    // Overlay content (dropdowns, tooltips)
  modal: 50,      // Modal content
  toast: 60,      // Toast notifications
  maximum: 9999   // Maximum z-index for emergencies
} as const;

// === COMPREHENSIVE EXPORT ===
export const shadowComposition = {
  principles: shadowPrinciples,
  scale: elevationScale,
  variables: shadowVariables,
  campus: campusShadowPatterns,
  interactive: interactiveShadows,
  overlays: overlayShadows,
  performance: performanceShadows,
  zIndex: zIndexLayers
} as const;

// === SHADOW UTILITY FUNCTIONS ===
export const createShadowClass = (elevation: keyof typeof elevationScale) => {
  return shadowVariables.tailwind[elevation === 'surface' ? 'none' : 
         elevation === 'raised' ? 'sm' :
         elevation === 'floating' ? 'base' :
         elevation === 'elevated' ? 'md' :
         elevation === 'lifted' ? 'lg' : 'xl'];
};

export const createInteractiveShadowClass = (component: 'buttons' | 'cards', variant: string) => {
  const componentShadows = interactiveShadows[component] as Record<string, Record<string, string>>;
  const variantShadows = componentShadows[variant];
  if (!variantShadows) return '';
  
  return Object.values(variantShadows).filter(v => typeof v === 'string').join(' ');
};

export const createCampusShadowClass = (category: keyof typeof campusShadowPatterns, variant: string) => {
  const categoryShadows = campusShadowPatterns[category] as Record<string, { shadow: string; class: string; interaction: string; use: string }>;
  const variantShadow = categoryShadows[variant];
  if (!variantShadow) return '';
  
  return `${variantShadow.class} ${variantShadow.interaction}`;
};

// === TYPE EXPORTS ===
export type ShadowComposition = typeof shadowComposition;
export type ElevationScale = typeof elevationScale;
export type CampusShadowPatterns = typeof campusShadowPatterns;
export type InteractiveShadows = typeof interactiveShadows;