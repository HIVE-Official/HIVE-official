import type { Config } from "tailwindcss"
import designTokens from "@hive/tokens"
import tailwindcssAnimate from "tailwindcss-animate"

// Destructure the needed tokens for a cleaner config
const {
  effects,
  motion,
  shadcnColors,
  spacing,
  tailwindFontSizes,
  typography,
} = designTokens

const config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
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
      colors: shadcnColors,
      spacing: spacing,
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      fontFamily: typography.fontFamily,
      fontSize: tailwindFontSizes,
      boxShadow: {
        ...effects.shadow,
        emboss: effects.emboss.DEFAULT,
      },
      blur: effects.blur,
      // HIVE Motion System
      transitionDuration: {
        instant: motion.duration.instant,
        fast: motion.duration.fast,
        base: motion.duration.base,
        slow: motion.duration.slow,
        ritual: motion.duration.ritual,
      },
      transitionTimingFunction: {
        smooth: motion.easing.smooth,
        snap: motion.easing.snap,
        elegant: motion.easing.elegant,
        brand: motion.easing.brand,
        "ease-smooth": motion.easing.smooth,
        "ease-snap": motion.easing.snap,
        "ease-elegant": motion.easing.elegant,
        "ease-brand": motion.easing.brand,
      },
      scale: {
        micro: motion.scale.micro,
        small: motion.scale.small,
        medium: motion.scale.medium,
        large: motion.scale.large,
        ritual: motion.scale.ritual,
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
        // HIVE brand keyframes
        "hive-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "hive-slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "hive-scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "hive-gold-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 215, 0, 0.7)" },
          "50%": { boxShadow: "0 0 0 10px rgba(255, 215, 0, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // HIVE brand animations
        "hive-fade-in": `hive-fade-in ${motion.duration.base} ${motion.easing.elegant}`,
        "hive-slide-up": `hive-slide-up ${motion.duration.base} ${motion.easing.smooth}`,
        "hive-scale-in": `hive-scale-in ${motion.duration.fast} ${motion.easing.snap}`,
        "hive-gold-pulse": `hive-gold-pulse ${motion.duration.ritual} ${motion.easing.brand} infinite`,
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config