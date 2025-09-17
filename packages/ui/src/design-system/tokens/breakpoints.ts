/**
 * HIVE Responsive Breakpoint Logic
 * Mobile-First Scaling Rules for Campus Environments
 */

// Breakpoint Definitions - Campus device considerations
export const breakpointValues = {
  // Mobile Small: 320px - 479px (small phones)
  mobileSmall: 320,
  
  // Mobile Large: 480px - 767px (large phones)  
  mobileLarge: 480,
  
  // Tablet: 768px - 1023px (tablets, small laptops)
  tablet: 768,
  
  // Desktop Small: 1024px - 1199px (laptops)
  desktopSmall: 1024,
  
  // Desktop Large: 1200px - 1599px (desktops)
  desktopLarge: 1200,
  
  // Desktop XL: 1600px+ (large monitors, max-width: 1400px content)
  desktopXL: 1600
} as const;

// Media Query Helpers - Mobile-first approach
export const mediaQueries = {
  // Mobile first (default styles)
  mobile: `screen and (min-width: ${breakpointValues.mobileSmall}px)`,
  
  // Tablet and up
  tablet: `screen and (min-width: ${breakpointValues.tablet}px)`,
  
  // Desktop and up
  desktop: `screen and (min-width: ${breakpointValues.desktopSmall}px)`,
  
  // Large desktop and up
  desktopLarge: `screen and (min-width: ${breakpointValues.desktopLarge}px)`,
  
  // Extra large screens
  desktopXL: `screen and (min-width: ${breakpointValues.desktopXL}px)`,
  
  // Mobile only (max-width queries)
  mobileOnly: `screen and (max-width: ${breakpointValues.tablet - 1}px)`,
  
  // Tablet only
  tabletOnly: `screen and (min-width: ${breakpointValues.tablet}) and (max-width: ${breakpointValues.desktopSmall - 1}px)`,
  
  // Desktop only
  desktopOnly: `screen and (min-width: ${breakpointValues.desktopSmall})`,
  
  // High DPI displays
  retina: `screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 192dpi)`
} as const;

// Component Scaling Rules - Systematic approach
export const scalingRules = {
  // Typography Scaling
  typography: {
    mobile: {
      scaleFactor: 0.9, // Reduce font sizes by 10%
      minimumBodySize: '14px',
      lineHeightAdjustment: 'maintain proportional relationships'
    },
    
    tablet: {
      scaleFactor: 1.0, // Base font sizes
      optimizeForReading: true
    },
    
    desktop: {
      scaleFactor: 1.05, // Increase font sizes by 5% for better readability
      maximumLineLength: '65ch' // Optimal reading length
    }
  },

  // Spacing Scaling  
  spacing: {
    mobile: {
      scaleFactor: 0.75, // Reduce all spacing by 25%
      minimumTouchTarget: '44px',
      containerPadding: '16px'
    },
    
    tablet: {
      scaleFactor: 1.0, // Base spacing values
      containerPadding: '24px'
    },
    
    desktop: {
      scaleFactor: 1.0, // No upper scaling limit
      containerPadding: '32px',
      maxContentWidth: '1400px'
    }
  },

  // Touch Target Scaling
  touchTargets: {
    mobile: {
      minimum: '44px', // iOS/Android guidelines
      recommended: '48px',
      spacing: '8px' // Between adjacent targets
    },
    
    tablet: {
      minimum: '44px',
      recommended: '44px',
      spacing: '4px'
    },
    
    desktop: {
      minimum: '40px', // Mouse precision allows smaller targets
      recommended: '40px',
      spacing: '4px'
    }
  }
} as const;

// Device-Specific Optimizations
export const deviceOptimizations = {
  // Mobile Optimizations
  mobile: {
    // Performance
    performance: {
      reducedAnimations: 'Shorter durations, simpler easing',
      shadowReduction: 'Lower blur radius and opacity',
      imageOptimization: 'WebP format, lazy loading'
    },
    
    // UX Patterns
    ux: {
      thumbNavigation: 'Bottom navigation for thumb reach',
      swipeGestures: 'Enable swipe for navigation',
      pullToRefresh: 'Standard mobile refresh pattern',
      scrollBehavior: 'Momentum scrolling enabled'
    },
    
    // Layout
    layout: {
      singleColumn: 'Stack elements vertically',
      fullWidth: 'Maximize screen real estate',
      cardSpacing: '16px vertical spacing'
    }
  },

  // Tablet Optimizations  
  tablet: {
    // Layout flexibility
    layout: {
      adaptiveColumns: '2-column layout where appropriate',
      modalSizing: 'Max 80% of viewport width',
      navigationDrawer: 'Side drawer for secondary navigation'
    },
    
    // Interaction
    interaction: {
      hoverStates: 'Support hover on trackpad',
      contextMenus: 'Right-click context menus',
      dragAndDrop: 'Enhanced drag interactions'
    }
  },

  // Desktop Optimizations
  desktop: {
    // Advanced interactions
    interaction: {
      keyboardShortcuts: 'Full keyboard navigation',
      mouseInteractions: 'Hover states, right-click menus',
      multiWindow: 'Support for multiple browser windows'
    },
    
    // Layout sophistication
    layout: {
      multiColumn: '3+ column layouts',
      sidebarNavigation: 'Persistent left sidebar',
      detailPanels: 'Right panels for additional info',
      modalCentering: 'Center modals in viewport'
    }
  }
} as const;

// Container System - Responsive widths
export const containerSizes = {
  // Content containers
  content: {
    mobile: '100%', // Full width on mobile
    tablet: '100%', // Full width on tablet  
    desktop: '1200px', // Fixed max width on desktop
    desktopXL: '1400px' // Larger max on big screens
  },
  
  // Reading containers (optimized line length)
  reading: {
    mobile: '100%',
    tablet: '65ch', // Optimal reading width
    desktop: '65ch',
    desktopXL: '70ch'
  },
  
  // Form containers
  form: {
    mobile: '100%',
    tablet: '600px', // Comfortable form width
    desktop: '600px',
    desktopXL: '600px' // Forms don't need to be wider
  }
} as const;

// Grid System - Responsive columns
export const gridSystem = {
  // Column counts by breakpoint
  columns: {
    mobile: 4,    // 4-column grid on mobile
    tablet: 8,    // 8-column grid on tablet
    desktop: 12,  // 12-column grid on desktop
    desktopXL: 16 // 16-column grid on large screens
  },
  
  // Gutter sizes
  gutters: {
    mobile: '16px',
    tablet: '24px', 
    desktop: '32px',
    desktopXL: '40px'
  },
  
  // Common span patterns
  spans: {
    mobile: {
      full: 4,
      half: 2,
      quarter: 1
    },
    
    tablet: {
      full: 8,
      half: 4,
      third: 2,
      quarter: 2
    },
    
    desktop: {
      full: 12,
      half: 6,
      third: 4,
      quarter: 3,
      sixth: 2
    }
  }
} as const;

// Campus-Specific Considerations
export const campusOptimizations = {
  // University WiFi considerations
  networkOptimizations: {
    mobile: {
      dataUsage: 'Minimize data usage on cellular',
      offlineSupport: 'Cache critical content',
      progressiveLoading: 'Load content incrementally'
    },
    
    campusWiFi: {
      assumption: 'Good bandwidth but variable latency',
      optimization: 'Aggressive caching, lazy loading',
      fallback: 'Graceful degradation for poor connections'
    }
  },
  
  // Student device patterns
  devicePatterns: {
    primaryMobile: 'Students primarily use phones',
    laptopSecondary: 'Laptops for serious work',
    tabletRare: 'Tablets less common in student population',
    
    optimization: {
      mobileFirst: 'Design for mobile, enhance for desktop',
      touchPrimary: 'Assume touch interactions',
      keyboardSecondary: 'Support keyboard when available'
    }
  },
  
  // Campus context usage
  contextualUsage: {
    walkingUsage: 'Design for distracted, one-handed use',
    classroomUsage: 'Quick, silent interactions',
    dormUsage: 'Full-featured experience',
    libraryUsage: 'Focus-friendly, minimal distractions'
  }
} as const;

export const breakpoints = {
  breakpointValues,
  mediaQueries,
  scalingRules,
  deviceOptimizations,
  containerSizes,
  gridSystem,
  campusOptimizations
} as const;