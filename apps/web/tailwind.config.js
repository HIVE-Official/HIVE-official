const {
  colors,
  typography,
  motion,
  spacing,
  effects,
} = require("@hive/tokens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
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
        ...colors,
        border: colors.border,
        input: colors.border,
        ring: colors.ring,
        background: colors.background,
        foreground: colors.foreground,
        primary: {
          DEFAULT: colors.accent.DEFAULT,
          foreground: colors.background,
        },
        secondary: {
          DEFAULT: colors.surface,
          foreground: colors.foreground,
        },
        destructive: {
          DEFAULT: colors.surface,
          foreground: colors.foreground,
        },
        muted: {
          DEFAULT: colors.muted,
          foreground: colors.foreground,
        },
        accent: {
          DEFAULT: colors.accent.DEFAULT,
          foreground: colors.background,
        },
        popover: {
          DEFAULT: colors["surface-02"],
          foreground: colors.foreground,
        },
        card: {
          DEFAULT: colors.surface,
          foreground: colors.foreground,
        },
      },
      spacing: {
        ...spacing,
      },
      fontFamily: {
        sans: typography.fontFamily.sans,
        display: typography.fontFamily.display,
        mono: typography.fontFamily.mono,
      },
      fontSize: {
        ...typography.tailwindFontSizes,
      },
      transitionDuration: {
        ...motion.duration,
      },
      transitionTimingFunction: {
        ...motion.easing,
      },
      boxShadow: {
        ...effects.shadow,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        ...motion.keyframes,
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
        ...motion.animations,
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
