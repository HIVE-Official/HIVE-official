// HIVE PRD-Aligned Color System
// Vercel-inspired monochrome with single gold accent
// Replaces luxury metals theme with simplified, focused palette

// === PRD CORE PALETTE (Vercel-Inspired) ===
export const prdColors = {
  // Background Hierarchy (Monochrome Foundation)
  black: '#000000',                    // Pure black base
  white: '#FFFFFF',                    // Pure white
  gray: {
    1000: '#0A0A0A',                   // Near black (replaces obsidian)
    900: '#171717',                    // Elevated surfaces (replaces charcoal)
    800: '#262626',                    // Interactive elements (replaces graphite)
    700: '#404040',                    // Strong borders (replaces slate)
    600: '#525252',                    // Disabled text (replaces steel)
    500: '#737373',                    // Placeholder text (replaces smoke)
    400: '#A3A3A3',                    // Secondary text (replaces pewter)
    300: '#D4D4D4',                    // Tertiary text (replaces mercury)
    200: '#E5E5E5',                    // Subtle borders (replaces silver)
    100: '#F5F5F5',                    // Light backgrounds (replaces platinum)
    50: '#FAFAFA',                     // Off-white
  },

  // Primary Accent (Single Gold System)
  blue: {
    600: '#0070F3',                    // Primary actions (Vercel blue)
    500: '#0761D1',                    // Hover state
    400: '#2D7FF9',                    // Focus rings
  },

  // Secondary Accent (Single Gold System)
  gold: {
    500: '#FFD700',                    // Primary gold - ONLY gold color used
    400: '#FFD700',                    // Hover state - same gold
    300: '#FFD700',                    // Subtle accent - same gold
  },

  // Semantic Colors (Minimal & Functional)
  green: {
    500: '#00D46A',                    // Success
    400: '#22DD77',                    // Hover
  },
  yellow: {
    500: '#FFB800',                    // Warning
    400: '#FFC533',                    // Hover
  },
  red: {
    500: '#FF3737',                    // Error
    400: '#FF5555',                    // Hover
  },
} as const;

// === PRD SEMANTIC MAPPING ===
export const prdSemantic = {
  // Background System (Simplified)
  background: {
    primary: prdColors.black,           // #000000 - Main app background
    secondary: prdColors.gray[900],     // #171717 - Card backgrounds
    tertiary: prdColors.gray[800],      // #262626 - Elevated surfaces
    interactive: prdColors.gray[700],   // #404040 - Interactive elements
    overlay: 'rgba(0, 0, 0, 0.6)',     // Modal overlays
  },

  // Text Hierarchy (High Contrast)
  text: {
    primary: prdColors.white,           // #FFFFFF - Primary content
    secondary: prdColors.gray[300],     // #D4D4D4 - Supporting content
    tertiary: prdColors.gray[400],      // #A3A3A3 - Metadata
    disabled: prdColors.gray[600],      // #525252 - Disabled state
    inverse: prdColors.black,           // #000000 - Text on light backgrounds
  },

  // Brand System (Focused)
  brand: {
    primary: prdColors.gold[500],       // #FFD700 - HIVE Gold Primary
    secondary: prdColors.gold[400],     // #FFD700 - Gold hover state
    hover: prdColors.gold[400],         // #FFD700 - Hover states
    onGold: prdColors.black,            // #000000 - Text on gold backgrounds
  },

  // Interactive States (Grayscale Default - ChatGPT/Vercel Feel)
  interactive: {
    hover: 'rgba(255, 255, 255, 0.04)',  // Subtle white hover
    focus: 'rgba(255, 255, 255, 0.20)',  // White focus rings (NOT gold)
    active: 'rgba(255, 255, 255, 0.08)', // Active state
    disabled: prdColors.gray[700],       // #404040 - Disabled
  },

  // Gold Reserved for Key Moments Only
  gold: {
    cta: prdColors.gold[500],            // Primary CTAs only
    achievement: prdColors.gold[500],    // Ritual completion, level up
    online: prdColors.gold[500],         // Online presence indicator
    featured: prdColors.gold[500],       // Featured content badge
  },

  // Status Colors (Minimal)
  status: {
    success: prdColors.green[500],      // #00D46A
    warning: prdColors.yellow[500],     // #FFB800
    error: prdColors.red[500],          // #FF3737
    info: prdColors.white,              // #FFFFFF - Info uses neutral/white
  },

  // Border System (Grayscale - ChatGPT/Vercel Feel)
  border: {
    default: 'rgba(255, 255, 255, 0.08)',  // Subtle dividers
    hover: 'rgba(255, 255, 255, 0.16)',    // Hover borders
    focus: 'rgba(255, 255, 255, 0.40)',    // White focus borders (NOT gold)
    strong: prdColors.gray[700],             // Strong borders
  },
} as const;

// === MIGRATION MAPPING ===
// Maps old luxury tokens to new PRD tokens
export const migrationMapping = {
  // Background migrations
  'hive-obsidian': prdSemantic.background.primary,           // #000000
  'hive-charcoal': prdSemantic.background.secondary,         // #171717
  'hive-graphite': prdSemantic.background.tertiary,          // #262626
  'hive-slate': prdSemantic.background.interactive,          // #404040
  'hive-steel': prdColors.gray[700],                         // #404040

  // Text migrations
  'hive-platinum': prdSemantic.text.primary,                 // #FFFFFF
  'hive-silver': prdSemantic.text.secondary,                 // #D4D4D4
  'hive-mercury': prdSemantic.text.tertiary,                 // #A3A3A3
  'hive-pewter': prdSemantic.text.disabled,                  // #525252
  'hive-smoke': prdColors.gray[500],                         // #737373

  // Brand migrations
  'hive-gold': prdSemantic.brand.secondary,                  // #FFD700
  'hive-champagne': prdSemantic.brand.secondary,             // #FFD700 - removed champagne
  'hive-amber': prdSemantic.status.warning,                  // #FFB800
  'hive-bronze': prdSemantic.brand.secondary,                // #FFD700 - use gold instead

  // Status migrations
  'hive-emerald': prdSemantic.status.success,                // #00D46A
  'hive-ruby': prdSemantic.status.error,                     // #FF3737
  'hive-sapphire': prdSemantic.status.info,                  // #0070F3
  'hive-citrine': prdSemantic.status.warning,                // #FFB800
} as const;

// === PRD CSS CUSTOM PROPERTIES ===
export const prdCSSVariables = `
/* HIVE PRD-Aligned Color System */
:root {
  /* Backgrounds */
  --hive-background-primary: ${prdSemantic.background.primary};
  --hive-background-secondary: ${prdSemantic.background.secondary};
  --hive-background-tertiary: ${prdSemantic.background.tertiary};
  --hive-background-interactive: ${prdSemantic.background.interactive};
  
  /* Text */
  --hive-text-primary: ${prdSemantic.text.primary};
  --hive-text-secondary: ${prdSemantic.text.secondary};
  --hive-text-tertiary: ${prdSemantic.text.tertiary};
  --hive-text-disabled: ${prdSemantic.text.disabled};
  
  /* Brand */
  --hive-brand-primary: ${prdSemantic.brand.primary};
  --hive-brand-secondary: ${prdSemantic.brand.secondary};
  --hive-brand-hover: ${prdSemantic.brand.hover};
  --hive-brand-on-gold: ${prdSemantic.brand.onGold};
  /* Legacy alias */
  --hive-brand-secondary-hover: var(--hive-brand-hover);
  
  /* Interactive (Grayscale Default - ChatGPT/Vercel Feel) */
  --hive-interactive-hover: ${prdSemantic.interactive.hover};
  --hive-interactive-focus: ${prdSemantic.interactive.focus};
  --hive-interactive-active: ${prdSemantic.interactive.active};

  /* Gold - Reserved for Key Moments Only */
  --hive-gold-cta: ${prdSemantic.gold.cta};
  --hive-gold-achievement: ${prdSemantic.gold.achievement};
  --hive-gold-online: ${prdSemantic.gold.online};
  --hive-gold-featured: ${prdSemantic.gold.featured};

  /* Status */
  --hive-status-success: ${prdSemantic.status.success};
  --hive-status-warning: ${prdSemantic.status.warning};
  --hive-status-error: ${prdSemantic.status.error};
  --hive-status-info: ${prdSemantic.status.info};
  
  /* Borders */
  --hive-border-default: ${prdSemantic.border.default};
  --hive-border-hover: ${prdSemantic.border.hover};
  --hive-border-focus: ${prdSemantic.border.focus};
  --hive-border-strong: ${prdSemantic.border.strong};

  /* Legacy aliases (compat) */
  --hive-border-primary: var(--hive-border-default);
  --hive-border-secondary: var(--hive-border-strong);
}
`;

// === TAILWIND CONFIGURATION ===
export const prdTailwindColors = {
  'hive-background': {
    primary: prdSemantic.background.primary,
    secondary: prdSemantic.background.secondary,
    tertiary: prdSemantic.background.tertiary,
    interactive: prdSemantic.background.interactive,
  },
  'hive-text': {
    primary: prdSemantic.text.primary,
    secondary: prdSemantic.text.secondary,
    tertiary: prdSemantic.text.tertiary,
    disabled: prdSemantic.text.disabled,
  },
  'hive-brand': {
    primary: prdSemantic.brand.primary,
    secondary: prdSemantic.brand.secondary,
    hover: prdSemantic.brand.hover,
    'on-gold': prdSemantic.brand.onGold,
  },
  'hive-status': {
    success: prdSemantic.status.success,
    warning: prdSemantic.status.warning,
    error: prdSemantic.status.error,
    info: prdSemantic.status.info,
  },
  'hive-border': {
    default: prdSemantic.border.default,
    hover: prdSemantic.border.hover,
    focus: prdSemantic.border.focus,
    strong: prdSemantic.border.strong,
  },
};

// === USAGE GUIDELINES ===
export const prdColorGuidelines = {
  // ChatGPT/Vercel/SF Startup Aesthetic
  default: "Black/white/gray for 95% of the UI - clean, minimal, professional",
  gold: "ONLY for: Primary CTAs, achievements, online presence, featured badges",
  interactive: "Use grayscale for hovers/focus - NOT gold (avoid visual noise)",
  backgrounds: "Layer backgrounds from primary (#000) → secondary (#171717) → tertiary (#262626)",
  text: "White primary, gray secondary - high contrast for readability",
  borders: "Subtle white borders - NO gold borders except special badges",
  focus: "White glow for focus rings - save gold for dopamine hits",
  buttons: "Default buttons are white-on-black, gold ONLY for primary CTAs",
} as const;

// === GOLD USAGE RULES (Brand Discipline) ===
export const goldUsageRules = {
  allowed: [
    "Primary CTA buttons (Join Space, Create Tool, Start Ritual)",
    "Achievement moments (Ritual complete, level unlocked)",
    "Online presence indicator (147 students online)",
    "Featured content badges (Featured Tool, Hot Space)",
  ],
  forbidden: [
    "Focus rings (use white glow instead)",
    "Hover states (use grayscale instead)",
    "All borders (use white/gray instead)",
    "Secondary buttons (use outline variant)",
    "Decorative elements (keep minimal)",
  ],
} as const;

export type PRDColorToken = keyof typeof prdColors;
export type PRDSemanticToken = keyof typeof prdSemantic;
export type MigrationToken = keyof typeof migrationMapping;
