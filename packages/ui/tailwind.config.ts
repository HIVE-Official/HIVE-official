import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { designTokens } from "@hive/tokens";

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../apps/web/src/**/*.{ts,tsx}",
    "./src/**/*.stories.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    spacing: designTokens.spacing,
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...designTokens.colors,
        ...designTokens.shadcnColors,
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "24px",
        full: "9999px",
        hive: "12px",
      },
      fontFamily: designTokens.typography.fontFamily,
      fontSize: designTokens.tailwindFontSizes,
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "shake-micro": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "ritual-burst": {
          "0%": {
            transform: "scale(1) rotate(0deg)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.1) rotate(180deg)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(1) rotate(360deg)",
            opacity: "1",
          },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down":
          "accordion-down 220ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        "accordion-up": "accordion-up 220ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        "shake-micro": "shake-micro 90ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        "pulse-subtle": "pulse-subtle 220ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        "ritual-burst": "ritual-burst 300ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        spin: "spin 1000ms linear infinite",
        pulse: "pulse 2000ms cubic-bezier(0.22, 0.61, 0.36, 1) infinite",
        shimmer: "shimmer 1200ms linear infinite",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        hive: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        "ease-hive": "cubic-bezier(0.22, 0.61, 0.36, 1)",
        "custom-bezier": "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      transitionDuration: {
        fast: "90ms",
        content: "220ms",
        slow: "300ms",
        base: "220ms",
      },
      scale: {
        98: "0.98",
        102: "1.02",
        105: "1.05",
        110: "1.1",
      },
      boxShadow: designTokens.effects.shadow,
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
