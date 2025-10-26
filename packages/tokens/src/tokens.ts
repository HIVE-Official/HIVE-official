// Bounded Context Owner: Identity & Access Management Guild

// HIVE PRD-Aligned monochrome + gold palette

export const neutralPalette = {
  950: "#000000",
  900: "#0A0A0A",
  850: "#111111",
  800: "#171717",
  700: "#262626",
  600: "#404040",
  500: "#525252",
  400: "#737373",
  300: "#A3A3A3",
  200: "#D4D4D4",
  150: "#E5E5E5",
  100: "#F5F5F5",
  50: "#FAFAFA"
} as const;

export const brandPalette = {
  gold: "#FFD700",
  goldHover: "#FFE55C",
  goldSubtle: "rgba(255, 215, 0, 0.12)"
} as const;

export const statusPalette = {
  success: "#00D46A",
  warning: "#FFB800",
  error: "#FF3737"
} as const;

export const semanticColors = {
  background: {
    primary: neutralPalette[950],
    secondary: neutralPalette[800],
    tertiary: neutralPalette[700],
    overlay: "rgba(0, 0, 0, 0.6)"
  },
  text: {
    primary: neutralPalette[50],
    secondary: neutralPalette[200],
    tertiary: neutralPalette[300],
    disabled: neutralPalette[500],
    inverse: neutralPalette[950]
  },
  border: {
    subtle: "rgba(255, 255, 255, 0.08)",
    focus: brandPalette.gold,
    strong: neutralPalette[600]
  }
} as const;

export const typography = {
  fontFamily: {
    // Canonical variables prioritize Geist, while allowing app-level override via CSS vars
    sans: "var(--font-sans, var(--font-geist-sans, 'Geist Sans', system-ui, sans-serif))",
    display: "var(--font-sans, var(--font-geist-sans, 'Geist Sans', system-ui, sans-serif))",
    mono: "var(--font-mono, var(--font-geist-mono, 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace))"
  }
} as const;

export const radii = {
  none: "0px",
  sm: "12px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "40px",
  full: "9999px"
} as const;

export const componentRadii = {
  // Sharpen the modern SaaS feel with bolder radii
  button: radii.lg, // 20px for clearer pill‑like shape
  input: radii.lg,
  card: radii.lg,
  modal: radii["2xl"],
  badge: radii.full
} as const;

export const shadows = {
  subtle: "0 12px 32px rgba(0, 0, 0, 0.35)",
  glow: "0 0 30px rgba(255, 215, 0, 0.35)",
  focus: "0 0 0 3px rgba(255, 215, 0, 0.35)",
  level1: "0 1px 3px rgba(0, 0, 0, 0.3)",
  level2: "0 4px 10px rgba(0, 0, 0, 0.35)"
} as const;

export const motion = {
  duration: {
    instant: "0ms",
    // Canonical cadence aligned with CSS variables in tokens/styles.css
    micro: "100ms",
    rapid: "150ms",
    swift: "200ms",
    smooth: "300ms",
    deliberate: "400ms",
    linger: "600ms",
    tiltHover: "200ms",
    skeletonGrow: "200ms",
    skeletonSweep: "2000ms",
    gradientDrift: "12000ms",
    borderRun: "3000ms",
    float: "6000ms",
    shine: "1250ms",
    meteor: "5000ms",
    textItem: "300ms"
  },
  easing: {
    standard: "cubic-bezier(0.32, 0.72, 0, 1)",
    // Additional named easings for nuanced choreography
    decel: "cubic-bezier(0.1, 0, 0, 1)",
    accel: "cubic-bezier(0.3, 0, 0.8, 0.2)",
    entrance: "cubic-bezier(0.12, 0.64, 0.04, 1)",
    exit: "cubic-bezier(0.7, 0, 0.84, 0)",
    emphasized: "cubic-bezier(0.2, 0, 0, 1)",
    linear: "linear"
  },
  spring: {
    sm: { stiffness: 340, damping: 28, mass: 0.9 },
    md: { stiffness: 280, damping: 30, mass: 1 },
    lg: { stiffness: 220, damping: 28, mass: 1.2 }
  }
} as const;

export const tokens = {
  neutralPalette,
  brandPalette,
  statusPalette,
  semanticColors,
  typography,
  radii,
  componentRadii,
  shadows,
  motion
};

export type NeutralKey = keyof typeof neutralPalette;
export type BrandKey = keyof typeof brandPalette;
export type StatusKey = keyof typeof statusPalette;
