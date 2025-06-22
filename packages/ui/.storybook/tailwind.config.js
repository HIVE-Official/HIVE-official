/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../src/**/*.{js,ts,jsx,tsx,mdx}",
    "../src/stories/**/*.{js,ts,jsx,tsx}",
    "../src/components/**/*.{js,ts,jsx,tsx}",
    "../**/*.stories.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // HIVE brand colors hardcoded for Storybook
        "bg-root": "#0A0A0A",
        "surface-01": "#111111",
        "surface-02": "#141417",
        "surface-03": "#1A1A1D",
        "border-line": "#333333",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B3B3B3",
        "text-disabled": "#666666",
        "yellow-500": "#FFD700",
        "yellow-600": "#E6C200",
        "yellow-700": "#CCAD00",

        // shadcn/ui compatibility
        border: "#333333",
        input: "#1A1A1D",
        ring: "#FFD700",
        background: "#0A0A0A",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#FFD700",
          foreground: "#0A0A0A",
        },
        secondary: {
          DEFAULT: "#141417",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#111111",
          foreground: "#B3B3B3",
        },
        accent: {
          DEFAULT: "#FFD700",
          foreground: "#0A0A0A",
        },
        card: {
          DEFAULT: "#111111",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["General Sans Variable", "system-ui", "sans-serif"],
        body: ["Inter Variable", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Consolas", "monospace"],
      },
      fontSize: {
        h1: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h2: ["2rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        h3: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h4: ["1.25rem", { lineHeight: "1.35", letterSpacing: "0" }],
        body: ["1rem", { lineHeight: "1.5", letterSpacing: "0" }],
        caption: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],
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
      // MOTION SYSTEM - Apple-inspired timing
      // ============================================================================
      transitionTimingFunction: {
        hive: "cubic-bezier(0.32, 0.72, 0, 1)",
        "hive-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "hive-ease": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        apple: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      transitionDuration: {
        75: "75ms", // Ultra-fast feedback
        90: "90ms", // Standard micro-interaction (Apple-like)
        150: "150ms", // Hover states
        250: "250ms", // Medium transitions
        300: "300ms", // Standard transition
        400: "400ms", // Ritual moments
        500: "500ms", // Slow transitions
      },

      animation: {
        "border-flicker": "border-flicker 16ms ease-out",
        "micro-shake": "micro-shake 16ms ease-out",
        "scale-success": "scale-success 200ms ease-out",
      },
      keyframes: {
        "border-flicker": {
          "0%": { borderColor: "#333333" },
          "50%": { borderColor: "#FFFFFF" },
          "100%": { borderColor: "#333333" },
        },
        "micro-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-1px)" },
          "75%": { transform: "translateX(1px)" },
        },
        "scale-success": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)" },
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
