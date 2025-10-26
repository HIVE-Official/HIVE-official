// Bounded Context Owner: Design System Guild
// Canonical Hive token exports for consuming in JS/TS (design docs reference these)

export const spacing = {
  "2xs": 0.25, // rem
  xs: 0.5,
  sm: 0.75,
  md: 1.25,
  lg: 2,
  xl: 3,
  "2xl": 4.5
} as const;

export const layout = {
  primary60: 0.6,
  secondary40: 0.4,
  primary65: 0.65,
  secondary35: 0.35,
  primary70: 0.7,
  secondary30: 0.3,
  paddingDesktop: 2.5, // rem
  paddingMobile: 1.25
} as const;

export const radii = {
  sm: 0.5,
  md: 0.75,
  lg: 1.25,
  pill: 999
} as const;

export const typography = {
  fontSans: '"Geist Sans","Inter",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
  fontMono: '"Geist Mono","JetBrains Mono","SFMono-Regular",ui-monospace,monospace',
  scale: {
    900: 3,
    800: 2.5,
    700: 2,
    600: 1.5,
    500: 1.25,
    400: 1,
    300: 0.8125
  },
  lineHeight: {
    tight: 1.2,
    default: 1.5,
    compact: 1.35
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
} as const;

export const motion = {
  duration: {
    micro: "120ms",
    fast: "160ms",
    standard: "200ms",
    smooth: "260ms",
    composed: "320ms",
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
    emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
    standard: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    enter: "cubic-bezier(0.33, 1, 0.68, 1)",
    exit: "cubic-bezier(0.22, 1, 0.36, 1)",
    linear: "linear"
  },
  spring: {
    sm: { stiffness: 340, damping: 28, mass: 0.9 },
    md: { stiffness: 280, damping: 30, mass: 1 },
    lg: { stiffness: 220, damping: 28, mass: 1.2 }
  }
} as const;

export const colors = {
  gold: "#FFD700",
  goldSoft: "#FFE066",
  goldDeep: "#CCAD00",
  black: "#050505",
  white: "#FFFFFF"
} as const;

export const hiveTokens = {
  spacing,
  layout,
  radii,
  typography,
  motion,
  colors
} as const;

export type HiveTokens = typeof hiveTokens;
