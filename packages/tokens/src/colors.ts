/**
 * HIVE Brand System v1.0 - PRODUCTION STANDARD
 * Monochrome + Yellow Color System (CORRECTED)
 * Aligned with /memory-bank/hive-brand-system.md
 */

// ============================================================================
// PRODUCTION COLOR TOKENS - CORRECTED VALUES
// ============================================================================

export const colors = {
  // Canvas & Surfaces (90% of interface)
  background: "#0A0A0A", // Primary canvas (matte black)
  surface: "#111111", // Card backgrounds, elevated surfaces
  border: "#2A2A2A", // CORRECTED: Dividers, input borders

  // Text Hierarchy
  foreground: "#FFFFFF", // Primary text, headlines
  muted: "#6B7280", // Secondary text, metadata
  disabled: "#3F3F46", // Disabled states, placeholder text

  // Yellow Accent System (≤10% usage) - FINAL CORRECTED VALUES
  accent: {
    DEFAULT: "#FFD700", // Gold - primary accent for text, borders, focus
    600: "#EAC200", // CORRECTED: Gold hover state
    700: "#C4A500", // CORRECTED: Gold pressed state
  },

  // Surface variants for depth
  "surface-01": "#111111", // Primary cards, feed rows
  "surface-02": "#181818", // Drawers, dropdowns, modals
  "surface-03": "#1F1F1F", // Nested blocks, input backgrounds

  // Focus system
  ring: "#FFD700", // Gold focus ring
  "ring-offset": "#0A0A0A", // Background for ring offset

  // Legacy token mappings for backward compatibility
  "bg-canvas": "#0A0A0A",
  "bg-card": "#111111",
  "accent-gold": "#FFD700",
  "accent-gold-hover": "#EAC200", // CORRECTED
  "accent-gold-pressed": "#C4A500", // CORRECTED
  "text-primary": "#FFFFFF",
  "text-muted": "#6B7280",
  "border-primary": "#2A2A2A", // CORRECTED

  // NO SUCCESS/ERROR/WARNING COLORS (Pure monochrome + yellow system)
  // Status feedback is handled via motion, not colors
} as const;

// ============================================================================
// SHADCN/UI COLOR MAPPINGS (Brand-compliant)
// ============================================================================

export const shadcnColors = {
  background: colors.background,
  foreground: colors.foreground,

  primary: {
    DEFAULT: colors.accent.DEFAULT, // Gold
    foreground: colors.background, // Dark text on gold background
  },

  secondary: {
    DEFAULT: colors.surface, // Surface
    foreground: colors.foreground, // White text
  },

  muted: {
    DEFAULT: colors.muted, // Muted text color
    foreground: colors.foreground, // White text
  },

  accent: {
    DEFAULT: colors.accent.DEFAULT, // Gold
    foreground: colors.background, // Dark text on gold
  },

  destructive: {
    DEFAULT: colors.surface, // NO red - use surface
    foreground: colors.foreground, // White text
  },

  border: colors.border, // CORRECTED border
  input: colors.border, // CORRECTED input border
  ring: colors.ring, // Gold focus ring

  card: {
    DEFAULT: colors.surface, // Surface background
    foreground: colors.foreground, // White text
  },

  popover: {
    DEFAULT: colors["surface-02"], // Elevated surface
    foreground: colors.foreground, // White text
  },
} as const;

// ============================================================================
// CSS CUSTOM PROPERTY MAPPINGS
// ============================================================================

export const cssVars = {
  // Brand tokens
  "--background": colors.background,
  "--surface": colors.surface,
  "--border": colors.border, // CORRECTED
  "--foreground": colors.foreground,
  "--muted": colors.muted,
  "--disabled": colors.disabled,
  "--accent": colors.accent.DEFAULT,
  "--accent-hover": colors.accent[600], // CORRECTED
  "--accent-active": colors.accent[700], // CORRECTED

  // Surface variants
  "--surface-01": colors["surface-01"],
  "--surface-02": colors["surface-02"],
  "--surface-03": colors["surface-03"],

  // Focus system
  "--ring": colors.ring,
  "--ring-offset": colors["ring-offset"],
} as const;

// ============================================================================
// BRAND COMPLIANCE VALIDATION
// ============================================================================

export const COLOR_COMPLIANCE = {
  rules: [
    "Pure monochrome + yellow system only",
    "Border color must be #2A2A2A (not #374151 or #262626)",
    "Gold hover must be #EAC200 (not #E6C200)",
    "Gold active must be #C4A500",
    "NO success/error/warning colors (green/red/blue)",
    "NO gold fills except ritual badges",
    "Status feedback via motion, not colors",
  ],

  violations: [
    "Using red/green/blue for status feedback",
    "Gold fills on primary buttons",
    "Wrong border colors (#374151, #262626, etc.)",
    "Wrong gold hover values (#E6C200, #FFCC00, etc.)",
    "Multiple accent color systems",
  ],

  goldUsage: {
    allowed: [
      "Text color for emphasis",
      "Border color for focus/active states",
      "Focus ring color",
      "Ritual badge backgrounds ONLY",
    ],
    forbidden: [
      "Primary button backgrounds",
      "Secondary button backgrounds",
      "Card backgrounds",
      "Large surface areas",
    ],
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get a color value with TypeScript safety
 */
export function getColor(path: keyof typeof colors): string {
  return colors[path] as string;
}

/**
 * Get an accent color variant
 */
export function getAccent(
  variant: keyof typeof colors.accent = "DEFAULT"
): string {
  return colors.accent[variant];
}

/**
 * Validate if a color follows brand guidelines
 */
export function isValidBorderColor(color: string): boolean {
  return color === colors.border;
}

export function isValidGoldHover(color: string): boolean {
  return color === colors.accent[600];
}

export function isValidGoldActive(color: string): boolean {
  return color === colors.accent[700];
}

// ============================================================================
// EXPORTS
// ============================================================================

export default colors;

// Type exports for better TypeScript support
export type ColorToken = keyof typeof colors;
export type AccentVariant = keyof typeof colors.accent;
export type SurfaceVariant = "surface-01" | "surface-02" | "surface-03";

// Brand compliance note: This color system enforces:
// - CORRECTED border color: #2A2A2A
// - CORRECTED gold hover: #EAC200 (not #E6C200)
// - CORRECTED gold active: #C4A500
// - Pure monochrome + yellow system (no success/error colors)
// - Motion-based status feedback instead of color-based
// - Gold fills ONLY for ritual badges
