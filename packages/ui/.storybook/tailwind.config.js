import {
  colors,
  shadcnColors,
  typography,
  tailwindFontSizes,
} from "../../tokens/src/index.ts";
import { motion as hiveMotion } from "../../tokens/src/motion.ts";
const motion = JSON.parse(JSON.stringify(hiveMotion));

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../src/**/*.{js,ts,jsx,tsx,mdx}",
    "../src/stories/**/*.{js,ts,jsx,tsx}",
    "../src/components/**/*.{js,ts,jsx,tsx}",
    "../**/*.stories.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        ...colors, // Import base HIVE colors
        ...shadcnColors, // Import shadcn/ui compatible colors
      },
      fontFamily: {
        ...typography.fontFamily, // Import font families from tokens
      },
      fontSize: {
        ...tailwindFontSizes, // Import font sizes from tokens
      },
      fontWeight: {
        ...typography.fontWeight, // Import font weights from tokens
      },
      lineHeight: {
        ...typography.lineHeight, // Import line heights from tokens
      },
      letterSpacing: {
        ...typography.letterSpacing, // Import letter spacing from tokens
      },
      // ============================================================================
      // APPLE-INSPIRED SHADOW SYSTEM
      // ============================================================================
      boxShadow: {
        // Elevation shadows (Apple-like)
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.6)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 1px 2px 0 rgba(0, 0, 0, 0.6)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.6)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.6)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.6)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)",
        none: "none",

        // HIVE specific shadows
        "elevation-1": "0 1px 2px 0 rgba(0, 0, 0, 0.6)",
        "elevation-2": "0 2px 4px 0 rgba(0, 0, 0, 0.6)",
        "elevation-3": "0 4px 8px 0 rgba(0, 0, 0, 0.6)",
        "elevation-4": "0 8px 16px 0 rgba(0, 0, 0, 0.6)",

        // Focus rings
        focus: "0 0 0 2px #FFD700",
        "focus-offset": "0 0 0 2px #0A0A0A, 0 0 0 4px #FFD700",
      },

      // ============================================================================
      // HIVE CUSTOM MOTION SYSTEM (NO Material Design)
      // ============================================================================
      transitionTimingFunction: {
        // HIVE custom easing functions
        "hive-smooth": motion.easing.smooth, // Primary HIVE easing
        "hive-snap": motion.easing.snap, // Playful bounce
        "hive-elegant": motion.easing.elegant, // Refined transitions
        "hive-brand": motion.easing.brand, // Signature HIVE spring

        // Performance fallbacks
        linear: motion.easing.linear,
        ease: motion.easing.ease,
      },
      transitionDuration: {
        // HIVE timing hierarchy
        instant: motion.duration.instant, // 50ms - Immediate feedback
        fast: motion.duration.fast, // 120ms - Micro-interactions
        base: motion.duration.base, // 180ms - Content transitions
        slow: motion.duration.slow, // 280ms - Complex animations
        ritual: motion.duration.ritual, // 400ms - Special HIVE moments

        // Legacy values for compatibility
        75: "75ms",
        90: "90ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
      },

      animation: {
        // HIVE brand animations
        "hive-fade-in": `${motion.keyframes.fadeIn} ${motion.duration.base} ${motion.easing.smooth}`,
        "hive-scale-in": `${motion.keyframes.scaleIn} ${motion.duration.base} ${motion.easing.elegant}`,
        "hive-slide-up": `${motion.keyframes.slideUp} ${motion.duration.base} ${motion.easing.smooth}`,
        "hive-slide-down": `${motion.keyframes.slideDown} ${motion.duration.base} ${motion.easing.smooth}`,
        "hive-gold-pulse": `${motion.keyframes.goldPulse} ${motion.duration.slow} ${motion.easing.smooth} infinite`,
        "hive-gold-glow": `${motion.keyframes.goldGlow} ${motion.duration.slow} ${motion.easing.smooth} infinite`,
        "hive-surface-rise": `${motion.keyframes.surfaceRise} ${motion.duration.base} ${motion.easing.elegant}`,
        "hive-emboss-reveal": `${motion.keyframes.embossReveal} ${motion.duration.base} ${motion.easing.smooth}`,
        "hive-ritual-burst": `${motion.keyframes.ritualBurst} ${motion.duration.ritual} ${motion.easing.brand}`,
        "hive-space-join": `${motion.keyframes.spaceJoin} ${motion.duration.ritual} ${motion.easing.brand}`,

        // Legacy animations (kept for compatibility)
        "border-flicker": "border-flicker 16ms ease-out",
        "micro-shake": "micro-shake 16ms ease-out",
        "scale-success": "scale-success 200ms ease-out",
        shake: "shake 90ms cubic-bezier(0.33, 0.65, 0, 1)",
      },
      keyframes: {
        // shadcn/ui required keyframes
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // HIVE custom keyframes (defined as CSS keyframes)
        "hive-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "hive-scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "hive-slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hive-slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hive-gold-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 215, 0, 0.4)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(255, 215, 0, 0)" },
        },
        "hive-gold-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255, 215, 0, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)" },
        },
        "hive-surface-rise": {
          "0%": {
            transform: "translateY(0)",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
          },
          "100%": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          },
        },
        "hive-emboss-reveal": {
          "0%": {
            opacity: "0",
            transform: "scale(0.98)",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
            boxShadow:
              "0 4px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 215, 0, 0.1)",
          },
        },
        "hive-ritual-burst": {
          "0%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
          "50%": { transform: "scale(1.15) rotate(180deg)", opacity: "0.8" },
          "100%": { transform: "scale(1) rotate(360deg)", opacity: "1" },
        },
        "hive-space-join": {
          "0%": {
            transform: "scale(0.9)",
            opacity: "0",
            boxShadow: "0 0 0 rgba(255, 215, 0, 0)",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "1",
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.2)",
          },
        },

        // Legacy keyframes (kept for compatibility)
        "micro-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-1px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(1px)" },
        },
        "scale-success": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
        },
        // Legacy motion keyframes
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        scaleOut: {
          "0%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
        },
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInFromRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        ritualBurst: {
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
      },
      borderRadius: {
        // Apple-inspired strong radius system (matching main app)
        none: "0",
        sm: "0.25rem", // 4px - Small elements
        DEFAULT: "0.75rem", // 12px - Standard (Apple-like)
        md: "0.75rem", // 12px - Medium elements
        lg: "1rem", // 16px - Cards (Apple-like)
        xl: "1.25rem", // 20px - Large containers
        "2xl": "1.5rem", // 24px - Hero sections
        "3xl": "2rem", // 32px - Extra large
        full: "9999px", // Fully rounded

        // HIVE semantic radius (matching main app)
        hive: "1rem", // 16px - Main card radius (Apple-like)
        "hive-sm": "0.75rem", // 12px - Smaller components
        "hive-lg": "1.25rem", // 20px - Large cards/modals
        "hive-xl": "1.5rem", // 24px - Hero sections
        button: "0.75rem", // 12px - Button radius
        input: "0.75rem", // 12px - Input fields
      },

      // ============================================================================
      // SPACING SYSTEM - Apple-inspired 4px base (matching main app)
      // ============================================================================
      spacing: {
        px: "1px",
        0: "0",
        0.5: "0.125rem", // 2px
        1: "0.25rem", // 4px - Base unit
        1.5: "0.375rem", // 6px
        2: "0.5rem", // 8px
        2.5: "0.625rem", // 10px
        3: "0.75rem", // 12px
        3.5: "0.875rem", // 14px
        4: "1rem", // 16px
        5: "1.25rem", // 20px
        6: "1.5rem", // 24px
        7: "1.75rem", // 28px
        8: "2rem", // 32px
        9: "2.25rem", // 36px
        10: "2.5rem", // 40px
        11: "2.75rem", // 44px
        12: "3rem", // 48px
        14: "3.5rem", // 56px
        16: "4rem", // 64px
        20: "5rem", // 80px
        24: "6rem", // 96px
        28: "7rem", // 112px
        32: "8rem", // 128px
        36: "9rem", // 144px
        40: "10rem", // 160px
        44: "11rem", // 176px
        48: "12rem", // 192px
        52: "13rem", // 208px
        56: "14rem", // 224px
        60: "15rem", // 240px
        64: "16rem", // 256px
        72: "18rem", // 288px
        80: "20rem", // 320px
        96: "24rem", // 384px
      },

      // ============================================================================
      // SIZING SYSTEM - Apple-inspired proportional sizing
      // ============================================================================
      width: {
        auto: "auto",
        ...Object.fromEntries(
          Object.entries({
            px: "1px",
            0: "0",
            0.5: "0.125rem",
            1: "0.25rem",
            1.5: "0.375rem",
            2: "0.5rem",
            2.5: "0.625rem",
            3: "0.75rem",
            3.5: "0.875rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            7: "1.75rem",
            8: "2rem",
            9: "2.25rem",
            10: "2.5rem",
            11: "2.75rem",
            12: "3rem",
            14: "3.5rem",
            16: "4rem",
            20: "5rem",
            24: "6rem",
            28: "7rem",
            32: "8rem",
            36: "9rem",
            40: "10rem",
            44: "11rem",
            48: "12rem",
            52: "13rem",
            56: "14rem",
            60: "15rem",
            64: "16rem",
            72: "18rem",
            80: "20rem",
            96: "24rem",
          }).map(([key, value]) => [key, value])
        ),
        // Fractional widths
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        screen: "100vw",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      },

      height: {
        auto: "auto",
        ...Object.fromEntries(
          Object.entries({
            px: "1px",
            0: "0",
            0.5: "0.125rem",
            1: "0.25rem",
            1.5: "0.375rem",
            2: "0.5rem",
            2.5: "0.625rem",
            3: "0.75rem",
            3.5: "0.875rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            7: "1.75rem",
            8: "2rem",
            9: "2.25rem",
            10: "2.5rem",
            11: "2.75rem",
            12: "3rem",
            14: "3.5rem",
            16: "4rem",
            20: "5rem",
            24: "6rem",
            28: "7rem",
            32: "8rem",
            36: "9rem",
            40: "10rem",
            44: "11rem",
            48: "12rem",
            52: "13rem",
            56: "14rem",
            60: "15rem",
            64: "16rem",
            72: "18rem",
            80: "20rem",
            96: "24rem",
          }).map(([key, value]) => [key, value])
        ),
        // Fractional heights
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "5/6": "83.333333%",
        full: "100%",
        screen: "100vh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      },
    },
  },
  plugins: [],
};
