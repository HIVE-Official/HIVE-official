// HIVE MASTER TAILWIND CONFIGURATION
// This is the SINGLE SOURCE OF TRUTH for all Tailwind configuration across HIVE platform
// All other Tailwind configs should extend this one

import type { Config } from 'tailwindcss';
import { prdTailwindColors } from './src/colors-prd-aligned';
import { prdTailwindRadius } from './src/radius-prd-aligned';
import { hiveTailwindColors } from './src/tailwind-config';

const masterConfig: Config = {
  darkMode: 'class',

  // COMPREHENSIVE CONTENT PATHS - covers all packages
  content: [
    // Web App
    './apps/web/src/**/*.{js,ts,jsx,tsx,mdx}',

    // Admin App
    './apps/admin/src/**/*.{js,ts,jsx,tsx,mdx}',

    // UI Package Components
    './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/ui/.storybook/**/*.{js,ts,jsx,tsx}',

    // Other packages that use Tailwind
    './packages/*/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      // HIVE COLOR SYSTEM - Complete palette
      colors: {
        // Merge all color systems
        ...hiveTailwindColors,
        ...prdTailwindColors,

        // Core Design System Colors (for shadcn/ui compatibility)
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

        // HIVE Branded Colors
        'hive-brand-primary': '#FFD700',
        'hive-brand-secondary': '#1a1a1a',
        'hive-background': '#000000',
        'hive-background-overlay': '#111111',
        'hive-surface': '#1a1a1a',
        'hive-text-primary': '#ffffff',
        'hive-text-secondary': '#cccccc',
        'hive-text-mutedLight': '#888888',
        'hive-border-default': '#333333',
        'hive-gold': '#FFD700',
        'hive-obsidian': '#0c0c0c',
      },

      // RADIUS SYSTEM
      borderRadius: {
        ...prdTailwindRadius,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // TYPOGRAPHY SYSTEM
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },

      // SPACING SYSTEM - Mobile optimized
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },

      // ANIMATION SYSTEM
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'hive-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)'
          },
        },
        'hive-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.02)',
            opacity: '0.9',
          },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'hive-glow': 'hive-glow 2s ease-in-out infinite',
        'hive-pulse': 'hive-pulse 2s ease-in-out infinite',
      },

      // BOX SHADOW SYSTEM
      boxShadow: {
        'hive-level1': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'hive-level2': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'hive-level3': '0 8px 15px rgba(0, 0, 0, 0.3)',
        'hive-gold-glow': '0 0 20px rgba(255, 215, 0, 0.3)',
        'hive-gold-glow-strong': '0 0 30px rgba(255, 215, 0, 0.4)',
      },
    },
  },

  plugins: [
    require('tailwindcss-animate'),

    // Custom HIVE plugins
    function({ addUtilities }: any) {
      addUtilities({
        '.hive-glass': {
          'backdrop-filter': 'blur(12px) saturate(150%)',
          '-webkit-backdrop-filter': 'blur(12px) saturate(150%)',
          'background': 'rgba(255, 255, 255, 0.05)',
          'border': '1px solid rgba(255, 255, 255, 0.08)',
        },
        '.hive-glass-strong': {
          'backdrop-filter': 'blur(20px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
          'background': 'rgba(255, 255, 255, 0.12)',
          'border': '1px solid rgba(255, 255, 255, 0.12)',
        },
        '.hive-interactive': {
          'transition': 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
          'transform-origin': 'center',
          'backface-visibility': 'hidden',
          'transform': 'translateZ(0)',
        },
        '.hive-interactive:hover': {
          'transform': 'translateY(-2px) scale(1.02)',
          'box-shadow': '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.3)',
        },
        '.hive-interactive:active': {
          'transform': 'translateY(0) scale(0.98)',
          'transition-duration': '0.15s',
        },
      });
    },
  ],
};

export default masterConfig;