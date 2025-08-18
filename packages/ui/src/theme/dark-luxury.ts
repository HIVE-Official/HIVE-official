// HIVE Dark Luxury Theme - Matte Black Sports Car Aesthetic
// Rich blacks, subtle gradients, layered depth

// Core Dark Luxury Palette
export const darkLuxury = {
  // Rich Blacks - Multiple depths
  void: 'var(--hive-background-primary)',           // Pure void
  obsidian: 'var(--hive-background-primary)',      // Main background - rich black
  charcoal: 'var(--hive-background-secondary)',      // Card backgrounds
  graphite: 'var(--hive-background-tertiary)',      // Elevated surfaces
  slate: 'var(--hive-background-interactive)',         // Interactive elements
  steel: 'var(--hive-border-default)',         // Borders and dividers
  
  // Luxury Grays - Sophisticated neutrals
  platinum: 'var(--hive-text-primary)',      // Primary text
  silver: 'var(--hive-text-secondary)',        // Secondary text
  mercury: 'var(--hive-text-tertiary)',       // Muted text
  pewter: 'var(--hive-text-disabled)',        // Disabled text
  smoke: 'var(--hive-text-disabled)',         // Subtle elements
  
  // Accent Gold - Premium highlights
  gold: 'var(--hive-brand-secondary)',          // Primary accent
  champagne: 'var(--hive-brand-secondary)',     // Lighter gold
  amber: 'var(--hive-status-warning)',         // Warning states
  bronze: 'var(--hive-brand-secondary)',        // Muted accent
  
  // Status Colors - Refined versions
  emerald: 'var(--hive-status-success)',       // Success
  ruby: 'var(--hive-status-error)',          // Error
  sapphire: 'var(--hive-status-info)',      // Info
  citrine: 'var(--hive-status-warning)',       // Warning
  
  // Transparent Overlays
  goldGlow: 'color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)',
  shadowDeep: 'color-mix(in_srgb,var(--hive-background-primary)_40%,transparent)',
  shadowSoft: 'color-mix(in_srgb,var(--hive-background-primary)_20%,transparent)',
  glassMatte: 'var(--hive-interactive-hover)',
  glassShine: 'var(--hive-interactive-active)',
} as const;

// Luxury Gradients - Subtle sophistication
export const luxuryGradients = {
  // Background gradients
  midnight: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-background-secondary) 100%)',
  obsidian: 'linear-gradient(180deg, var(--hive-background-primary) 0%, var(--hive-background-tertiary) 100%)',
  charcoal: 'linear-gradient(45deg, var(--hive-background-secondary) 0%, var(--hive-background-interactive) 100%)',
  
  // Interactive gradients
  goldShimmer: 'linear-gradient(90deg, transparent, color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent), transparent)',
  silverSheen: 'linear-gradient(90deg, transparent, var(--hive-interactive-hover), transparent)',
  
  // Glass morphism
  glassDark: 'linear-gradient(135deg, var(--hive-interactive-active), var(--hive-interactive-hover))',
  glassGold: 'linear-gradient(135deg, color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent), color-mix(in_srgb,var(--hive-brand-secondary)_5%,transparent))',
  
  // Depth gradients
  surfaceElevated: 'linear-gradient(180deg, var(--hive-background-tertiary) 0%, var(--hive-background-interactive) 100%)',
  surfacePressed: 'linear-gradient(180deg, var(--hive-background-secondary) 0%, var(--hive-background-primary) 100%)',
} as const;

// Shadow System - Layered depth
export const luxuryShadows = {
  // Elevation shadows
  level1: '0 1px 3px color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)',
  level2: '0 1 1.5 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)',
  level3: '0 2 15px color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)',
  level4: '0 3 6 color-mix(in_srgb,var(--hive-background-primary)_40%,transparent)',
  level5: '0 5 10 color-mix(in_srgb,var(--hive-background-primary)_50%,transparent)',
  
  // Interactive shadows
  hover: '0 2 6 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)',
  active: '0 1 3 color-mix(in_srgb,var(--hive-background-primary)_40%,transparent)',
  focus: '0 0 0 0.5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)',
  
  // Glow effects
  goldGlow: '0 0 5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)',
  goldGlowStrong: '0 0 30px color-mix(in_srgb,var(--hive-brand-secondary)_40%,transparent)',
  emeraldGlow: '0 0 5 color-mix(in_srgb,var(--hive-status-success)_30%,transparent)',
  rubyGlow: '0 0 5 color-mix(in_srgb,var(--hive-status-error)_30%,transparent)',
  
  // Inner shadows
  insetDeep: 'inset 0 0.5 1 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)',
  insetSoft: 'inset 0 1px 0.5 color-mix(in_srgb,var(--hive-background-primary)_20%,transparent)',
} as const;

// Z-Index Scale - Spatial hierarchy
export const luxuryDepth = {
  background: -1,
  surface: 0,
  card: 10,
  cardHover: 20,
  dropdown: 100,
  modal: 200,
  tooltip: 300,
  notification: 400,
  overlay: 500,
} as const;

// Border Radius Scale - Soft brutalism
export const luxuryRadius = {
  none: '0',
  subtle: '0.5',
  soft: '1',
  medium: '2',
  large: '3',
  xl: '4',
  pill: 'full',
  circle: '50%',
} as const;

// Spacing Scale - Refined proportions
export const luxurySpacing = {
  xs: '1',
  sm: '2',
  md: '3',
  lg: '4',
  xl: '5',
  '2xl': '6',
  '3xl': '8',
  '4xl': '10',
  '5xl': '12',
  '6xl': '16',
} as const;

// Typography Scale - Premium hierarchy
export const luxuryTypography = {
  // Font weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Font sizes - Fluid scale
  sizes: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  },
  
  // Line heights
  leading: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Letter spacing
  tracking: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// Glass Morphism Effects
export const glassEffects = {
  // Background blur for glass elements
  backdrop: {
    backdropFilter: 'blur(3) saturate(180%)',
    backgroundColor: darkLuxury.glassMatte,
    border: `1px solid ${darkLuxury.glassShine}`,
  },
  
  // Frosted glass
  frosted: {
    backdropFilter: 'blur(2)',
    backgroundColor: 'color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)',
    border: `1px solid color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)`,
  },
  
  // Premium glass with gold tint
  goldGlass: {
    backdropFilter: 'blur(3) saturate(180%)',
    backgroundColor: darkLuxury.goldGlow,
    border: `1px solid color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)`,
  },
} as const;

// Component-specific luxury themes
export const luxuryComponents = {
  // Card themes
  card: {
    background: darkLuxury.charcoal,
    border: `1px solid ${darkLuxury.steel}`,
    shadow: luxuryShadows.level2,
    radius: luxuryRadius.large,
  },
  
  cardElevated: {
    background: luxuryGradients.surfaceElevated,
    border: `1px solid ${darkLuxury.steel}`,
    shadow: luxuryShadows.level3,
    radius: luxuryRadius.large,
  },
  
  // Button themes
  primaryButton: {
    background: luxuryGradients.goldShimmer,
    color: darkLuxury.obsidian,
    shadow: luxuryShadows.goldGlow,
    radius: luxuryRadius.medium,
  },
  
  ghostButton: {
    background: 'transparent',
    color: darkLuxury.platinum,
    border: `1px solid ${darkLuxury.steel}`,
    radius: luxuryRadius.medium,
  },
  
  // Input themes
  input: {
    background: darkLuxury.graphite,
    border: `1px solid ${darkLuxury.steel}`,
    color: darkLuxury.platinum,
    radius: luxuryRadius.medium,
  },
  
  inputFocused: {
    background: darkLuxury.charcoal,
    border: `1px solid ${darkLuxury.gold}`,
    shadow: luxuryShadows.focus,
  },
} as const;

// Utility functions
export const withLuxuryGlow = (color: string, intensity: number = 0.3) => 
  `0 0 5 ${color.replace(')', `, ${intensity})`)}`;

export const createLuxuryGradient = (from: string, to: string, direction: number = 135) =>
  `linear-gradient(${direction}deg, ${from} 0%, ${to} 100%)`;

export const luxuryBorder = (color: string = darkLuxury.steel, width: number = 1) =>
  `${width}px solid ${color}`;

// Export complete theme object
export const hiveDarkLuxury = {
  colors: darkLuxury,
  gradients: luxuryGradients,
  shadows: luxuryShadows,
  depth: luxuryDepth,
  radius: luxuryRadius,
  spacing: luxurySpacing,
  typography: luxuryTypography,
  glass: glassEffects,
  components: luxuryComponents,
} as const;

export type DarkLuxuryTheme = typeof hiveDarkLuxury;