// Bounded Context Owner: Design System Guild
import type { Config } from "tailwindcss";
import tailwindPreset from "@hive/tokens/tailwind";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssForms from "@tailwindcss/forms";
import motionDepthPlugin from "./src/plugins/tailwind.motion-depth";

const config: Config = {
  darkMode: ["class"],
  presets: [tailwindPreset],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./.storybook/**/*.{ts,tsx}",
    "../../apps/web/src/**/*.{ts,tsx,mdx}",
    "../../packages/core/src/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      transitionDuration: {
        swift: "var(--motion-duration-swift)",
        smooth: "var(--motion-duration-smooth)"
      },
      transitionTimingFunction: {
        standard: "var(--motion-ease-standard)"
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      colors: {
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      }
    }
  },
  plugins: [tailwindcssAnimate, tailwindcssForms, motionDepthPlugin]
};

export default config;
