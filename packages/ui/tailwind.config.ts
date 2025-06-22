import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../apps/web/src/**/*.{ts,tsx}",
    "./src/**/*.stories.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    spacing: {
      "0": "0",
      "1": "4px",
      "2": "8px",
      "3": "12px",
      "4": "16px",
      "5": "20px",
      "6": "24px",
      "8": "32px",
      "10": "40px",
      "12": "48px",
      "16": "64px",
      "20": "80px",
      "24": "96px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#111111",
        foreground: "#FFFFFF",
        muted: "#6B7280",
        disabled: "#3F3F46",
        border: "#2A2A2A",
        accent: {
          DEFAULT: "#FFD700",
          600: "#EAC200",
          700: "#C4A500",
        },
        "surface-01": "#111111",
        "surface-02": "#181818",
        "surface-03": "#1F1F1F",
        "bg-canvas": "#0A0A0A",
        "bg-card": "#111111",
        "accent-gold": "#FFD700",
        "accent-gold-hover": "#EAC200",
        "text-primary": "#FFFFFF",
        "text-muted": "#6B7280",
        ring: "#FFD700",
        "ring-offset": "#0A0A0A",
        input: "#2A2A2A",
        primary: {
          DEFAULT: "#FFD700",
          foreground: "#0A0A0A",
        },
        secondary: {
          DEFAULT: "#111111",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#111111",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#111111",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#111111",
          foreground: "#FFFFFF",
        },
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
      fontFamily: {
        sans: [
          "Geist Sans Variable",
          "Geist Sans",
          "system-ui",
          "sans-serif"
        ],
        display: [
          "Space Grotesk Variable",
          "Space Grotesk",
          "system-ui",
          "sans-serif"
        ],
        mono: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
      },
      fontSize: {
        caption: ["12px", { lineHeight: "18px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        button: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        h4: ["18px", { lineHeight: "26px", fontWeight: "600" }],
        h3: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        h2: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        h1: ["32px", { lineHeight: "40px", fontWeight: "600" }],
        display: ["48px", { lineHeight: "56px", fontWeight: "600" }],
        xs: ["12px", { lineHeight: "18px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "26px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["32px", { lineHeight: "40px" }],
        "4xl": ["48px", { lineHeight: "56px" }],
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
            opacity: "1" 
          },
          "50%": { 
            transform: "scale(1.1) rotate(180deg)",
            opacity: "0.8" 
          },
          "100%": { 
            transform: "scale(1) rotate(360deg)",
            opacity: "1" 
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
        "accordion-down": "accordion-down 220ms cubic-bezier(0.22, 0.61, 0.36, 1)",
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
      boxShadow: {
        "elevation-1": "0 4px 24px rgba(0, 0, 0, 0.45)",
        "elevation-2": "0 8px 32px rgba(0, 0, 0, 0.6)",
        "focus-ring": "0 0 0 2px #FFD700",
        "1": "0 1px 3px rgba(0, 0, 0, 0.45)",
        "2": "0 4px 12px rgba(0, 0, 0, 0.45)",
        "3": "0 8px 24px rgba(0, 0, 0, 0.45)",
        card: "0 4px 24px rgba(0, 0, 0, 0.45)",
        "card-hover": "0 8px 32px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
