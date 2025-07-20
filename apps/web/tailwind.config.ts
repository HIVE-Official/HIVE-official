import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Include UI package components
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: "",
  theme: {
    spacing: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '20px',
      '6': '24px',
      '8': '32px',
      '10': '40px',
      '12': '48px',
      '16': '64px',
      '20': '80px',
      '24': '96px',
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        '1': '0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
        '2': '0px 4px 8px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
        '3': '0px 10px 20px 0px rgba(0, 0, 0, 0.15), 0px 3px 6px 0px rgba(0, 0, 0, 0.10)',
        '4': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        'bg-canvas': '#0A0A0A',
        'bg-card': 'rgba(255,255,255,0.02)',
        'accent-gold': '#FFD700',
        'accent-gold-hover': '#FFE255',
        'text-primary': '#FFFFFF',
        'text-muted': '#A1A1AA',
        'error': '#FF5555',
        'success': '#22C55E',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '12px',
        lg: '12px',
        xl: '24px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'display': ['48px', '56px'],
        'h1': ['32px', '40px'],
        'h2': ['24px', '32px'],
        'body': ['16px', '24px'],
        'caption': ['12px', '18px'],
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
      transitionTimingFunction: {
        'custom-bezier': 'cubic-bezier(0.33, 0.65, 0, 1)',
      },
      transitionDuration: {
        'fast': '90ms',
        'base': '200ms',
        'slow': '350ms',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config;