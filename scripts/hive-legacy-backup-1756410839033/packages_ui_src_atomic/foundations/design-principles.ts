// HIVE Design System Foundation - Core Principles
// Implementing PRD Design Philosophy: "Empowering Individual Agency Within Community"

export const designPrinciples = {
  // Core Philosophy
  philosophy: {
    title: "Empowering Individual Agency Within Community",
    description: "Every design decision balances personal empowerment with community participation",
    pillars: [
      "Student-First Minimalism",
      "Customization Without Chaos", 
      "Privacy Through Clarity",
      "Mobile-Native Thinking",
      "Progressive Disclosure"
    ]
  },

  // Design Values (PRD Section 1)
  values: {
    "Clarity Over Decoration": {
      implementation: [
        "Generous whitespace for visual breathing",
        "High contrast for instant comprehension", 
        "Minimal color palette for focus",
        "Typography-driven hierarchy"
      ]
    },
    "Speed Over Beauty": {
      implementation: [
        "Performance as a design feature",
        "Instant feedback for all interactions",
        "Skeleton states over loading spinners", 
        "Optimistic UI updates"
      ]
    },
    "Flexibility Over Prescription": {
      implementation: [
        "Multiple valid ways to accomplish tasks",
        "User-defined workflows",
        "Adaptable information architecture",
        "Personal optimization paths"
      ]
    }
  },

  // Component Standards
  componentStandards: {
    // All components must follow these patterns
    tokenUsage: {
      required: "All components MUST use design tokens - never hardcoded values",
      semantic: "Use semantic tokens (semantic.text.primary) over direct colors",
      fallbacks: "Provide fallbacks for legacy browser support"
    },
    
    responsiveDesign: {
      approach: "Mobile-first with progressive enhancement",
      breakpoints: "Use standardized breakpoint tokens only",
      touchTargets: "Minimum 44px touch targets on mobile"
    },
    
    accessibility: {
      contrast: "WCAG 2.1 AA minimum (4.5:1 normal text, 3:1 large text)",
      focus: "Visible focus states for all interactive elements",
      motion: "Respect prefers-reduced-motion"
    },
    
    performance: {
      animations: "GPU-accelerated transforms only",
      images: "Lazy loading and proper sizing",
      bundleSize: "Component chunking for optimal loading"
    }
  },

  // PRD Alignment Requirements
  prdAlignment: {
    colorSystem: {
      approach: "Vercel-inspired monochrome with single gold accent",
      forbidden: "No hardcoded hex values in components",
      tokens: "Use semantic.* tokens exclusively"
    },
    
    typography: {
      fonts: ["Geist Sans (primary)", "Space Grotesk (display)", "Geist Mono (code)"],
      scale: "1 base unit spacing system",
      hierarchy: "Clear font-weight and size relationships"
    },
    
    interactions: {
      style: "Subtle and purposeful motion",
      performance: "60fps animations minimum", 
      duration: "150-300ms for micro-interactions"
    }
  }
} as const;

// Component Quality Gates
export const qualityGates = {
  // Pre-commit requirements
  required: [
    "Uses design tokens exclusively",
    "Passes accessibility audit",
    "Mobile-responsive implementation", 
    "TypeScript strict mode compliance",
    "Storybook documentation"
  ],
  
  // Performance benchmarks
  performance: {
    maxBundleSize: "50kb gzipped per component",
    animationFramerate: "60fps minimum",
    timeToInteractive: "100ms maximum"
  },
  
  // Design consistency
  consistency: {
    colorTokenUsage: "100% semantic token usage",
    spacingSystem: "1 base unit compliance",
    borderRadius: "Apple-like generous values"
  }
} as const;

// Usage Guidelines
export const usageGuidelines = {
  // For developers
  developers: {
    tokenUsage: "Always import tokens from @hive/tokens",
    componentExtension: "Extend atomic components, don't recreate",
    naming: "Follow HIVE component naming conventions",
    testing: "Include accessibility and visual regression tests"
  },
  
  // For designers  
  designers: {
    tokenSystem: "Design using tokens in Figma",
    consistency: "Audit designs against component library",
    responsive: "Design mobile-first, enhance for desktop",
    accessibility: "Consider screen readers and keyboard navigation"
  }
} as const;

export type DesignPrinciple = keyof typeof designPrinciples;
export type QualityGate = keyof typeof qualityGates;
export type UsageGuideline = keyof typeof usageGuidelines;