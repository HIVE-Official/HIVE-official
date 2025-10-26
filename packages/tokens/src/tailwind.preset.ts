// Bounded Context Owner: Identity & Access Management Guild
import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import { neutralPalette, brandPalette, statusPalette, radii, componentRadii, typography, shadows, motion } from "./tokens";

const neutralScale = {
  950: neutralPalette[950],
  900: neutralPalette[900],
  850: neutralPalette[850],
  800: neutralPalette[800],
  700: neutralPalette[700],
  600: neutralPalette[600],
  500: neutralPalette[500],
  400: neutralPalette[400],
  300: neutralPalette[300],
  200: neutralPalette[200],
  150: neutralPalette[150],
  100: neutralPalette[100],
  50: neutralPalette[50]
};

const tailwindPreset: Config = {
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "var(--gutter-inline, 1rem)",
        sm: "var(--gutter-inline, 1.25rem)",
        md: "var(--gutter-inline, 1.5rem)",
        lg: "var(--gutter-inline, 2rem)",
        xl: "var(--gutter-inline, 2.5rem)",
        "2xl": "var(--gutter-inline, 3rem)"
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        neutral: neutralScale,
        brand: {
          gold: brandPalette.gold,
          "gold-hover": brandPalette.goldHover
        },
        success: statusPalette.success,
        warning: statusPalette.warning,
        error: statusPalette.error,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      // Typography system — roles resolved via CSS variables declared in tokens/styles.css
      fontSize: {
        // Map common Tailwind aliases onto tokenized roles to avoid hard-coded sizes in apps
        xs: ["var(--font-size-caption)", { lineHeight: "var(--line-height-caption)", letterSpacing: "var(--tracking-caption)" }],
        sm: ["var(--font-size-bodySm)", { lineHeight: "var(--line-height-bodySm)", letterSpacing: "var(--tracking-bodySm)" }],
        base: ["var(--font-size-body)", { lineHeight: "var(--line-height-body)", letterSpacing: "var(--tracking-body)" }],
        lg: ["var(--font-size-h4)", { lineHeight: "var(--line-height-h4)", letterSpacing: "var(--tracking-h4)" }],
        xl: ["var(--font-size-h3)", { lineHeight: "var(--line-height-h3)", letterSpacing: "var(--tracking-h3)" }],
        "2xl": ["var(--font-size-h2)", { lineHeight: "var(--line-height-h2)", letterSpacing: "var(--tracking-h2)" }],
        // For 3xl+ prefer explicit roles; keep approximate mappings for compatibility
        "3xl": ["var(--font-size-h1)", { lineHeight: "var(--line-height-h1)", letterSpacing: "var(--tracking-h1)" }],
        "4xl": ["var(--font-size-h1)", { lineHeight: "var(--line-height-h1)", letterSpacing: "var(--tracking-h1)" }],
        "5xl": ["var(--font-size-display)", { lineHeight: "var(--line-height-display)", letterSpacing: "var(--tracking-display)" }],
        "6xl": ["var(--font-size-display)", { lineHeight: "var(--line-height-display)", letterSpacing: "var(--tracking-display)" }],
        display: ["var(--font-size-display)", { lineHeight: "var(--line-height-display)", letterSpacing: "var(--tracking-display)" }],
        h1: ["var(--font-size-h1)", { lineHeight: "var(--line-height-h1)", letterSpacing: "var(--tracking-h1)" }],
        h2: ["var(--font-size-h2)", { lineHeight: "var(--line-height-h2)", letterSpacing: "var(--tracking-h2)" }],
        h3: ["var(--font-size-h3)", { lineHeight: "var(--line-height-h3)", letterSpacing: "var(--tracking-h3)" }],
        h4: ["var(--font-size-h4)", { lineHeight: "var(--line-height-h4)", letterSpacing: "var(--tracking-h4)" }],
        lead: ["var(--font-size-lead)", { lineHeight: "var(--line-height-lead)", letterSpacing: "var(--tracking-lead)" }],
        body: ["var(--font-size-body)", { lineHeight: "var(--line-height-body)", letterSpacing: "var(--tracking-body)" }],
        "body-sm": ["var(--font-size-bodySm)", { lineHeight: "var(--line-height-bodySm)", letterSpacing: "var(--tracking-bodySm)" }],
        caption: ["var(--font-size-caption)", { lineHeight: "var(--line-height-caption)", letterSpacing: "var(--tracking-caption)" }],
        legal: ["var(--font-size-legal)", { lineHeight: "var(--line-height-legal)", letterSpacing: "var(--tracking-legal)" }],
        label: ["var(--font-size-label)", { lineHeight: "var(--line-height-label)", letterSpacing: "var(--tracking-label)" }],
        code: ["var(--font-size-code)", { lineHeight: "var(--line-height-code)", letterSpacing: "var(--tracking-code)" }],
        kbd: ["var(--font-size-kbd)", { lineHeight: "var(--line-height-kbd)", letterSpacing: "var(--tracking-kbd)" }]
      },
      fontWeight: {
        display: "var(--font-weight-display)",
        h1: "var(--font-weight-h1)",
        h2: "var(--font-weight-h2)",
        h3: "var(--font-weight-h3)",
        h4: "var(--font-weight-h4)",
        lead: "var(--font-weight-lead)",
        body: "var(--font-weight-body)",
        "body-sm": "var(--font-weight-bodySm)",
        caption: "var(--font-weight-caption)",
        legal: "var(--font-weight-legal)",
        label: "var(--font-weight-label)",
        code: "var(--font-weight-code)",
        kbd: "var(--font-weight-kbd)"
      },
      spacing: {
        gutter: "var(--gutter-inline)",
        page: "var(--page-inline)",
        "section-y": "var(--section-space-y)",
        "stack-xs": "var(--stack-xs)",
        "stack-sm": "var(--stack-sm)",
        "stack-md": "var(--stack-md)",
        "stack-lg": "var(--stack-lg)",
        "stack-xl": "var(--stack-xl)",
        18: "4.5rem",
        88: "22rem"
      },
      borderRadius: {
        none: radii.none,
        sm: radii.sm,
        md: radii.md,
        lg: radii.lg,
        xl: radii.xl,
        "2xl": radii["2xl"],
        "3xl": radii["3xl"],
        full: radii.full,
        button: componentRadii.button,
        input: componentRadii.input,
        card: componentRadii.card,
        modal: componentRadii.modal
      },
      fontFamily: {
        sans: typography.fontFamily.sans,
        display: typography.fontFamily.display,
        mono: typography.fontFamily.mono
      },
      boxShadow: {
        subtle: shadows.subtle,
        glow: shadows.glow,
        focus: shadows.focus,
        level1: shadows.level1,
        level2: shadows.level2
      },
      transitionDuration: motion.duration,
      transitionTimingFunction: motion.easing,
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "hive-glow": {
          "0%, 100%": {
            boxShadow: shadows.glow
          },
          "50%": {
            boxShadow: "0 0 45px rgba(255, 215, 0, 0.45)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down var(--accordion-duration, 200ms) ease-out",
        "accordion-up": "accordion-up var(--accordion-duration, 200ms) ease-out",
        "hive-glow": "hive-glow 2.4s ease-in-out infinite alternate"
      }
    }
  },
  plugins: [forms]
};

export default tailwindPreset;
