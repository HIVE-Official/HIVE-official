import type { Config } from "tailwindcss";
import { colors, designTokens } from "@hive/tokens";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
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
      // ============================================================================
      // HIVE SEMANTIC COLOR SYSTEM
      // ============================================================================
      colors: {
        // Primary semantic tokens
        'bg-root': 'var(--bg-root)',
        'surface-01': 'var(--surface-01)', 
        'surface-02': 'var(--surface-02)',
        'surface-03': 'var(--surface-03)',
        'border-line': 'var(--border-line)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-disabled': 'var(--text-disabled)',
        'yellow-500': 'var(--yellow-500)',
        'yellow-600': 'var(--yellow-600)',
        'yellow-700': 'var(--yellow-700)',
        
        // Interaction states
        'surface-01-hover': 'var(--surface-01-hover)',
        'surface-02-hover': 'var(--surface-02-hover)',
        'surface-03-hover': 'var(--surface-03-hover)',
        
        // Simplified grayscale using design tokens
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        
        // Legacy shadcn/ui compatibility
        border: "var(--border-line)",
        input: "var(--surface-03)",
        ring: "var(--yellow-500)",
        background: "var(--bg-root)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--yellow-500)",
          foreground: "var(--bg-root)",
        },
        secondary: {
          DEFAULT: "var(--surface-02)",
          foreground: "var(--text-primary)",
        },
        destructive: {
          DEFAULT: "var(--yellow-500)", // Use yellow for destructive actions
          foreground: "var(--bg-root)",
        },
        muted: {
          DEFAULT: "var(--surface-01)",
          foreground: "var(--text-secondary)",
        },
        accent: {
          DEFAULT: "var(--yellow-500)",
          foreground: "var(--bg-root)",
        },
        popover: {
          DEFAULT: "var(--surface-02)",
          foreground: "var(--text-primary)",
        },
        card: {
          DEFAULT: "var(--surface-01)",
          foreground: "var(--text-primary)",
        },
      },
      
      // ============================================================================
      // GEIST-INSPIRED SHADOW SYSTEM
      // ============================================================================
      boxShadow: {
        // Ambient shadows for elevation
        'ambient': 'var(--shadow-ambient)',
        'elevation-1': '0 1px 2px 0 rgba(0, 0, 0, 0.6)',
        'elevation-2': '0 2px 4px 0 rgba(0, 0, 0, 0.6)',
        'elevation-3': '0 4px 8px 0 rgba(0, 0, 0, 0.6)',
        'elevation-4': '0 8px 16px 0 rgba(0, 0, 0, 0.6)',
        
        // Focus rings
        'focus': '0 0 0 2px var(--yellow-500)',
        'focus-offset': '0 0 0 2px var(--bg-root), 0 0 0 4px var(--yellow-500)',
        
        // Special effects
        'grain': '0 0 0 1px var(--grain-speck)',
      },
      
      // ============================================================================
      // MOTION SYSTEM - Geist-inspired timing
      // ============================================================================
      transitionTimingFunction: {
        'hive': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'hive-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'hive-ease': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '90': '90ms', // Standard micro-interaction
        '150': '150ms', // Hover states
        '250': '250ms', // Medium transitions
        '400': '400ms', // Ritual moments
      },
      
      // ============================================================================
      // ANIMATION SYSTEM
      // ============================================================================
      keyframes: {
        // Feedback animations (no color, motion-based)
        'border-flicker': {
          '0%': { borderColor: 'var(--border-line)' },
          '50%': { borderColor: 'var(--text-primary)' },
          '100%': { borderColor: 'var(--border-line)' },
        },
        'micro-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-1px)' },
          '75%': { transform: 'translateX(1px)' },
        },
        'scale-success': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
        'ritual-bloom': {
          '0%': { 
            backgroundImage: 'none',
            transform: 'scale(1)',
          },
          '50%': { 
            backgroundImage: 'conic-gradient(from 0deg, var(--yellow-500), var(--yellow-700), var(--yellow-500))',
            transform: 'scale(1.02)',
          },
          '100%': { 
            backgroundImage: 'none',
            transform: 'scale(1)',
          },
        },
        'grain-shimmer': {
          '0%, 100%': { opacity: '0.015' },
          '50%': { opacity: '0.025' },
        },
      },
      animation: {
        'border-flicker': 'border-flicker 16ms ease-out',
        'micro-shake': 'micro-shake 16ms ease-out',
        'scale-success': 'scale-success 200ms ease-out',
        'ritual-bloom': 'ritual-bloom 400ms ease-out',
        'grain-shimmer': 'grain-shimmer 2s ease-in-out infinite',
      },
      
      // ============================================================================
      // TYPOGRAPHY SYSTEM
      // ============================================================================
      fontFamily: {
        'display': ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'], // Headlines, hero, CTA
        'body': ['var(--font-geist-sans)', 'Geist Sans Variable', 'Geist Sans', 'system-ui', 'sans-serif'], // Body text, menus
        'mono': ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'], // Code, empty states
      },
      fontSize: {
        // Type scale aligned with design system
        'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h4': ['1.25rem', { lineHeight: '1.35', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'code': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0' }],
      },
      
      // ============================================================================
      // SPACING SYSTEM - 4px base
      // ============================================================================
      spacing: {
        '0.5': '0.125rem', // 2px
        '1': '0.25rem',    // 4px
        '1.5': '0.375rem', // 6px
        '2': '0.5rem',     // 8px
        '3': '0.75rem',    // 12px
        '4': '1rem',       // 16px
        '5': '1.25rem',    // 20px
        '6': '1.5rem',     // 24px
        '8': '2rem',       // 32px
        '10': '2.5rem',    // 40px
        '12': '3rem',      // 48px
        '16': '4rem',      // 64px
        '20': '5rem',      // 80px
        '24': '6rem',      // 96px
      },
      
      // ============================================================================
      // BORDER RADIUS - Apple-inspired strong radius system
      // ============================================================================
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',     // 4px - Small elements
        'DEFAULT': '0.75rem', // 12px - Standard (Apple-like)
        'md': '0.75rem',     // 12px - Medium elements
        'lg': '1rem',        // 16px - Cards (Apple-like)
        'xl': '1.25rem',     // 20px - Large containers
        '2xl': '1.5rem',     // 24px - Hero sections
        '3xl': '2rem',       // 32px - Extra large
        'full': '9999px',    // Fully rounded
        
        // HIVE semantic radius
        'hive': '1rem',      // 16px - Main card radius (Apple-like)
        'hive-sm': '0.75rem', // 12px - Smaller components
        'hive-lg': '1.25rem', // 20px - Large cards/modals  
        'hive-xl': '1.5rem',  // 24px - Hero sections
        'button': '0.75rem',  // 12px - Button radius
        'input': '0.75rem',   // 12px - Input fields
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
