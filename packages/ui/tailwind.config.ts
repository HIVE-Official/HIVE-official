import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  safelist: [
    // HIVE motion system durations - using named durations from theme
    'duration-50',        // 50ms
    'duration-90',        // 90ms (also 'fast')
    'duration-120',       // 120ms
    'duration-150',       // 150ms
    'duration-180',       // 180ms
    'duration-200',       // 200ms (also 'base')
    'duration-240',       // 240ms
    'duration-280',       // 280ms
    'duration-400',       // 400ms
    // HIVE motion easing - using custom defined timing function
    'ease-custom-bezier',
  ],
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
        // === HIVE TOKENS (Primary) ===
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
        // === HIVE RADIUS (Primary) ===
        sm: '4px',
        DEFAULT: '12px',
        lg: '12px',
        xl: '24px',
        full: '9999px',
      },
      fontFamily: {
        // === HIVE FONTS ===
        sans: ['Inter', 'sans-serif'],               // Primary font
        display: ['Space Grotesk', 'sans-serif'],    // Display font  
        mono: ['Geist Mono', 'monospace'],           // Code font
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
        '50': '50ms',
        '90': '90ms',
        'fast': '90ms',
        '120': '120ms',
        '150': '150ms',
        '180': '180ms',
        '200': '200ms',
        'base': '200ms',
        '240': '240ms',
        '280': '280ms',
        '350': '350ms',
        'slow': '350ms',
        '400': '400ms',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config; 