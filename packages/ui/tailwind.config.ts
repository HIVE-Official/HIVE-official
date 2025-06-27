import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"
import tailwindcssAnimate from "tailwindcss-animate"

const config = {
  darkMode: ["class", "[data-mode='dark']"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // HIVE-specific surface colors
        "surface-01": "hsl(var(--surface-01))",
        "surface-02": "hsl(var(--surface-02))",
        "surface-03": "hsl(var(--surface-03))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Geist", "Geist Sans", ...fontFamily.sans],
        mono: ["Geist Mono", ...fontFamily.mono],
        display: ["Space Grotesk Variable", "Space Grotesk", ...fontFamily.sans],
      },
      fontSize: {
        // HIVE Typography Scale - from packages/tokens/src/typography.ts
        'display': ['64px', { lineHeight: '72px', fontWeight: '600' }],
        'h1': ['48px', { lineHeight: '56px', fontWeight: '600' }],
        'h2': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '18px', fontWeight: '400' }],
        'button': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'code': ['14px', { lineHeight: '20px', fontWeight: '400' }],
      },
      transitionDuration: {
        // HIVE Motion Timing - from packages/tokens/src/motion.ts
        'instant': '50ms',     // Immediate feedback
        'fast': '120ms',       // Micro-interactions
        'base': '180ms',       // Content transitions  
        'slow': '280ms',       // Complex animations
        'ritual': '400ms',     // Special HIVE moments
      },
      transitionTimingFunction: {
        // HIVE Brand Easing - from packages/tokens/src/motion.ts
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'snap': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elegant': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'brand': 'cubic-bezier(0.33, 0.65, 0, 1)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "accordion-up": "accordion-up 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config