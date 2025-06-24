const { designTokens } = require("@hive/tokens");

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
        ...designTokens.colors,
        ...designTokens.shadcnColors,
      },
      spacing: {
        ...designTokens.spacing,
      },
      fontFamily: {
        sans: designTokens.typography.fontFamily.sans,
        display: designTokens.typography.fontFamily.display,
        mono: designTokens.typography.fontFamily.mono,
      },
      fontSize: {
        ...designTokens.tailwindFontSizes,
      },
      transitionDuration: {
        ...designTokens.motion.duration,
      },
      transitionTimingFunction: {
        ...designTokens.motion.easing,
      },
      boxShadow: {
        ...designTokens.effects.shadow,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
