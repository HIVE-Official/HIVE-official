// HIVE Luxury Color Design System
// Dark Luxury • Matte Black Sports Car • Premium Rebellion

// Core Dark Luxury Palette - Rich blacks and sophisticated metals
export const colors = {
  // Rich Blacks - Multiple depth levels
  void: '#000000',           // Pure void for maximum contrast
  obsidian: '#0A0A0B',      // Main background - rich black
  charcoal: '#111113',      // Card backgrounds
  graphite: '#1A1A1C',      // Elevated surfaces
  slate: '#222225',         // Interactive elements
  steel: '#2A2A2D',         // Borders and dividers
  
  // Luxury Grays - Sophisticated neutrals
  platinum: '#E5E5E7',      // Primary text
  silver: '#C1C1C4',        // Secondary text
  mercury: '#9B9B9F',       // Muted text
  pewter: '#6B6B70',        // Disabled text
  smoke: '#4A4A4F',         // Subtle elements
  
  // Accent Gold - Premium highlights
  gold: '#FFD700',          // Primary accent
  champagne: '#F7E98E',     // Lighter gold
  amber: '#FFA500',         // Warning states
  bronze: '#CD7F32',        // Muted accent
  
  // Status Colors - Refined versions
  emerald: '#10B981',       // Success
  ruby: '#EF4444',          // Error
  sapphire: '#3B82F6',      // Info
  citrine: '#F59E0B',       // Warning
  
  // Legacy Support - Keep for backwards compatibility
  black: '#0A0A0B',         // Map to obsidian
  white: '#E5E5E7',         // Map to platinum
  
  // Gray Scale - Luxury metal hierarchy
  gray: {
    50: '#4A4A4F',          // smoke
    100: '#6B6B70',         // pewter
    200: '#9B9B9F',         // mercury
    300: '#C1C1C4',         // silver
    400: '#E5E5E7',         // platinum
    500: '#2A2A2D',         // steel
    600: '#222225',         // slate
    700: '#1A1A1C',         // graphite
    800: '#111113',         // charcoal
    900: '#0A0A0B',         // obsidian
    950: '#000000',         // void
  },
} as const;

// Transparent Overlays - Luxury glass effects
export const overlay = {
  // Glass morphism
  glass: 'rgba(255, 255, 255, 0.05)',
  'glass-medium': 'rgba(255, 255, 255, 0.08)',
  'glass-strong': 'rgba(255, 255, 255, 0.12)',
  
  // Gold glows
  'gold-subtle': 'rgba(255, 215, 0, 0.1)',
  'gold-medium': 'rgba(255, 215, 0, 0.15)',
  'gold-strong': 'rgba(255, 215, 0, 0.3)',
  'gold-glow': 'rgba(255, 215, 0, 0.4)',
  
  // Shadows
  'shadow-soft': 'rgba(0, 0, 0, 0.2)',
  'shadow-medium': 'rgba(0, 0, 0, 0.3)',
  'shadow-deep': 'rgba(0, 0, 0, 0.4)',
  'shadow-void': 'rgba(0, 0, 0, 0.6)',
  
  // Legacy support
  white: 'rgba(255, 255, 255, 0.05)',
  'white-medium': 'rgba(255, 255, 255, 0.08)',
  'white-strong': 'rgba(255, 255, 255, 0.12)',
} as const;

// Luxury Gradients - Subtle sophistication
export const gradients = {
  // Background gradients
  midnight: 'linear-gradient(135deg, #0A0A0B 0%, #111113 100%)',
  obsidian: 'linear-gradient(180deg, #0A0A0B 0%, #1A1A1C 100%)',
  charcoal: 'linear-gradient(45deg, #111113 0%, #222225 100%)',
  
  // Interactive gradients
  'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)',
  'silver-sheen': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
  
  // Glass morphism
  'glass-dark': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
  'glass-gold': 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  
  // Depth gradients
  'surface-elevated': 'linear-gradient(180deg, #1A1A1C 0%, #222225 100%)',
  'surface-pressed': 'linear-gradient(180deg, #111113 0%, #0A0A0B 100%)',
} as const;

// Borders - Premium sophistication
export const border = {
  // Metal borders
  steel: colors.steel,                    // #2A2A2D
  graphite: colors.graphite,              // #1A1A1C
  slate: colors.slate,                    // #222225
  
  // Glass borders
  glass: overlay.glass,                   // rgba(255, 255, 255, 0.05)
  'glass-strong': overlay['glass-strong'], // rgba(255, 255, 255, 0.12)
  
  // Gold accents
  gold: 'rgba(255, 215, 0, 0.2)',
  'gold-strong': 'rgba(255, 215, 0, 0.4)',
  'gold-glow': 'rgba(255, 215, 0, 0.6)',
  
  // Legacy support
  subtle: overlay.glass,
  medium: overlay['glass-medium'],
} as const;

// Shadows - Layered depth system
export const shadows = {
  // Elevation shadows
  level1: '0 1px 3px rgba(0, 0, 0, 0.3)',
  level2: '0 4px 6px rgba(0, 0, 0, 0.3)',
  level3: '0 8px 15px rgba(0, 0, 0, 0.3)',
  level4: '0 12px 25px rgba(0, 0, 0, 0.4)',
  level5: '0 20px 40px rgba(0, 0, 0, 0.5)',
  
  // Interactive shadows
  hover: '0 8px 25px rgba(0, 0, 0, 0.3)',
  active: '0 4px 12px rgba(0, 0, 0, 0.4)',
  focus: '0 0 0 2px rgba(255, 215, 0, 0.3)',
  
  // Glow effects
  'gold-glow': '0 0 20px rgba(255, 215, 0, 0.3)',
  'gold-glow-strong': '0 0 30px rgba(255, 215, 0, 0.4)',
  'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.3)',
  'ruby-glow': '0 0 20px rgba(239, 68, 68, 0.3)',
  
  // Inner shadows
  'inset-deep': 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  'inset-soft': 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
} as const;

// Clean semantic mapping - Dark luxury hierarchy
export const semantic = {
  background: {
    primary: colors.obsidian,           // #0A0A0B - Main app background
    secondary: colors.charcoal,         // #111113 - Card backgrounds
    tertiary: colors.graphite,          // #1A1A1C - Elevated surfaces
    overlay: overlay.glass,             // Glass morphism overlays
    interactive: colors.slate,          // #222225 - Interactive elements
  },
  
  text: {
    primary: colors.platinum,           // #E5E5E7 - Main text
    secondary: colors.silver,           // #C1C1C4 - Secondary text
    muted: colors.mercury,              // #9B9B9F - Muted text
    disabled: colors.pewter,            // #6B6B70 - Disabled text
    inverse: colors.obsidian,           // #0A0A0B - Text on gold/light
  },
  
  brand: {
    primary: colors.gold,               // #FFD700 - HIVE gold
    secondary: colors.champagne,        // #F7E98E - Lighter gold
    accent: colors.amber,               // #FFA500 - Warning accent
    muted: colors.bronze,               // #CD7F32 - Muted accent
  },
  
  interactive: {
    hover: overlay['glass-medium'],     // Glass hover effect
    focus: colors.gold,                 // Gold focus ring
    active: overlay['glass-strong'],    // Glass active state
    disabled: colors.smoke,             // #4A4A4F - Disabled state
  },
  
  status: {
    success: colors.emerald,            // #10B981 - Success green
    warning: colors.citrine,            // #F59E0B - Warning amber
    error: colors.ruby,                 // #EF4444 - Error red
    info: colors.sapphire,              // #3B82F6 - Info blue
  },
  
  border: {
    primary: border.steel,              // #2A2A2D - Primary borders
    secondary: border.graphite,         // #1A1A1C - Secondary borders
    subtle: border.glass,               // Glass subtle borders
    focus: border.gold,                 // Gold focus borders
    error: colors.ruby,                 // Red error borders
  },
} as const;

// Type exports
export type ColorToken = keyof typeof colors;
export type SemanticToken = keyof typeof semantic;
export type GradientToken = keyof typeof gradients;
export type ShadowToken = keyof typeof shadows;