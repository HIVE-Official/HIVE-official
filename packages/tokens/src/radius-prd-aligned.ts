// HIVE PRD-Aligned Border Radius System
// Apple-like generous values for softer, more refined components

// === PRD RADIUS SCALE (Apple-Inspired) ===
export const prdRadius = {
  // Base Scale (More generous than typical 4-8px systems)
  none: '0px',
  sm: '12px',       // Small elements (up from 8px)
  md: '16px',       // Buttons, inputs (up from 12px) 
  lg: '20px',       // Cards (up from 16px)
  xl: '24px',       // Large cards (up from 20px)
  '2xl': '32px',    // Modals (up from 24px)
  '3xl': '40px',    // Hero elements
  full: '9999px',   // Pills, avatars
} as const;

// === COMPONENT-SPECIFIC RADIUS ===
export const prdComponentRadius = {
  // Interactive Elements
  button: prdRadius.md,           // 16px - generous for touch
  input: prdRadius.md,            // 16px - matches buttons
  select: prdRadius.md,           // 16px - form consistency
  
  // Content Containers
  card: prdRadius.lg,             // 20px - softer containers
  modal: prdRadius['2xl'],        // 32px - premium dialogs
  widget: prdRadius.xl,           // 24px - dashboard widgets
  
  // Media & Content
  image: prdRadius.lg,            // 20px - softer media
  avatar: prdRadius.full,         // Full circle
  badge: prdRadius.full,          // Pill shape
  
  // Layout Elements
  container: prdRadius.lg,        // 20px - content sections
  surface: prdRadius.xl,          // 24px - elevated surfaces
  overlay: prdRadius['2xl'],      // 32px - modal overlays
} as const;

// === RESPONSIVE RADIUS (Mobile Adjustments) ===
export const prdResponsiveRadius = {
  // Mobile: Slightly more generous for touch
  mobile: {
    button: '18px',    // +2px for touch targets
    input: '18px',     // +2px for touch targets
    card: '24px',      // +4px for premium mobile feel
    modal: '40px',     // +8px for mobile modal experience
  },
  
  // Desktop: PRD standard values
  desktop: prdComponentRadius,
} as const;

// === CSS CUSTOM PROPERTIES ===
export const prdRadiusCSSVariables = `
/* HIVE PRD-Aligned Border Radius System */
:root {
  /* Base Scale */
  --hive-radius-none: ${prdRadius.none};
  --hive-radius-sm: ${prdRadius.sm};
  --hive-radius-md: ${prdRadius.md};
  --hive-radius-lg: ${prdRadius.lg};
  --hive-radius-xl: ${prdRadius.xl};
  --hive-radius-2xl: ${prdRadius['2xl']};
  --hive-radius-3xl: ${prdRadius['3xl']};
  --hive-radius-full: ${prdRadius.full};
  
  /* Component-Specific */
  --hive-radius-button: ${prdComponentRadius.button};
  --hive-radius-input: ${prdComponentRadius.input};
  --hive-radius-card: ${prdComponentRadius.card};
  --hive-radius-modal: ${prdComponentRadius.modal};
  --hive-radius-widget: ${prdComponentRadius.widget};
  --hive-radius-image: ${prdComponentRadius.image};
  --hive-radius-avatar: ${prdComponentRadius.avatar};
  --hive-radius-badge: ${prdComponentRadius.badge};
}

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
  :root {
    --hive-radius-button: ${prdResponsiveRadius.mobile.button};
    --hive-radius-input: ${prdResponsiveRadius.mobile.input};
    --hive-radius-card: ${prdResponsiveRadius.mobile.card};
    --hive-radius-modal: ${prdResponsiveRadius.mobile.modal};
  }
}
`;

// === TAILWIND CONFIGURATION ===
export const prdTailwindRadius = {
  'hive-sm': prdRadius.sm,
  'hive-md': prdRadius.md,
  'hive-lg': prdRadius.lg,
  'hive-xl': prdRadius.xl,
  'hive-2xl': prdRadius['2xl'],
  'hive-3xl': prdRadius['3xl'],
  'hive-button': prdComponentRadius.button,
  'hive-input': prdComponentRadius.input,
  'hive-card': prdComponentRadius.card,
  'hive-modal': prdComponentRadius.modal,
  'hive-widget': prdComponentRadius.widget,
};

// === MIGRATION MAPPING ===
// Maps old radius tokens to new PRD values
export const radiusMigrationMapping = {
  // Old system → New PRD system
  'rounded-sm': 'rounded-hive-sm',      // 8px → 12px
  'rounded-md': 'rounded-hive-md',      // 12px → 16px
  'rounded-lg': 'rounded-hive-lg',      // 16px → 20px
  'rounded-xl': 'rounded-hive-xl',      // 20px → 24px
  'rounded-2xl': 'rounded-hive-2xl',    // 24px → 32px
  
  // Component-specific migrations
  'rounded-button': 'rounded-hive-button',
  'rounded-card': 'rounded-hive-card',
  'rounded-modal': 'rounded-hive-modal',
} as const;

// === USAGE GUIDELINES ===
export const prdRadiusGuidelines = {
  buttons: "Use 16px (md) for consistent touch targets across desktop and mobile",
  cards: "Use 20px (lg) for softer, more premium container feel",
  modals: "Use 32px (2xl) for sophisticated dialog appearance",
  images: "Use 20px (lg) to soften media while maintaining clarity",
  interactive: "Maintain consistent radius across related interactive elements",
  mobile: "Increase radius slightly on mobile for better touch experience",
  nesting: "Use smaller radius for nested elements (card > button = lg > md)",
} as const;

// === DESIGN PRINCIPLES ===
export const radiusDesignPrinciples = {
  hierarchy: "Larger elements get larger radius values",
  consistency: "Related elements should share radius values",
  touch: "Mobile targets get slightly more generous radius",
  nesting: "Nested elements use smaller radius than their containers",
  premium: "Generous radius conveys quality and sophistication",
  accessibility: "Larger radius improves touch targets for accessibility",
} as const;

export type PRDRadiusToken = keyof typeof prdRadius;
export type PRDComponentRadiusToken = keyof typeof prdComponentRadius;
export type RadiusMigrationToken = keyof typeof radiusMigrationMapping;