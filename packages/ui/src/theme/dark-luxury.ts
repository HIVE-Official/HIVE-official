// HIVE Dark Luxury Theme - Matte Black Sports Car Aesthetic
// Rich blacks, subtle gradients, layered depth

// Core Dark Luxury Palette
export const darkLuxury = {
  // Rich Blacks - Multiple depths
  void: '#000000',           // Pure void
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
  
  // Transparent Overlays
  goldGlow: 'rgba(255, 215, 0, 0.15)',
  shadowDeep: 'rgba(0, 0, 0, 0.4)',
  shadowSoft: 'rgba(0, 0, 0, 0.2)',
  glassMatte: 'rgba(255, 255, 255, 0.05)',
  glassShine: 'rgba(255, 255, 255, 0.1)',
} as const;

// Luxury Gradients - Subtle sophistication
export const luxuryGradients = {
  // Background gradients
  midnight: 'linear-gradient(135deg, #0A0A0B 0%, #111113 100%)',
  obsidian: 'linear-gradient(180deg, #0A0A0B 0%, #1A1A1C 100%)',
  charcoal: 'linear-gradient(45deg, #111113 0%, #222225 100%)',
  
  // Interactive gradients
  goldShimmer: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)',
  silverSheen: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
  
  // Glass morphism
  glassDark: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
  glassGold: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  
  // Depth gradients
  surfaceElevated: 'linear-gradient(180deg, #1A1A1C 0%, #222225 100%)',
  surfacePressed: 'linear-gradient(180deg, #111113 0%, #0A0A0B 100%)',
} as const;

// Shadow System - Layered depth
export const luxuryShadows = {
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
  goldGlow: '0 0 20px rgba(255, 215, 0, 0.3)',
  goldGlowStrong: '0 0 30px rgba(255, 215, 0, 0.4)',
  emeraldGlow: '0 0 20px rgba(16, 185, 129, 0.3)',
  rubyGlow: '0 0 20px rgba(239, 68, 68, 0.3)',
  
  // Inner shadows
  insetDeep: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  insetSoft: 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
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
  none: '0px',
  subtle: '2px',
  soft: '4px',
  medium: '8px',
  large: '12px',
  xl: '16px',
  pill: '9999px',
  circle: '50%',
} as const;

// Spacing Scale - Refined proportions
export const luxurySpacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
  '6xl': '64px',
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
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
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
    backdropFilter: 'blur(12px) saturate(180%)',
    backgroundColor: darkLuxury.glassMatte,
    border: `1px solid ${darkLuxury.glassShine}`,
  },
  
  // Frosted glass
  frosted: {
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: `1px solid rgba(255, 255, 255, 0.08)`,
  },
  
  // Premium glass with gold tint
  goldGlass: {
    backdropFilter: 'blur(12px) saturate(180%)',
    backgroundColor: darkLuxury.goldGlow,
    border: `1px solid rgba(255, 215, 0, 0.2)`,
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
  `0 0 20px ${color.replace(')', `, ${intensity})`)}`;

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