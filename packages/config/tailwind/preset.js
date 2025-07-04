/** @type {import('tailwindcss').Config} */
const preset = {
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // HIVE-specific surface colors
        surface: "hsl(var(--surface))",
        "surface-01": "hsl(var(--surface-01))",
        "surface-02": "hsl(var(--surface-02))",
        "surface-03": "hsl(var(--surface-03))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
        display: "var(--font-display)",
      },
      fontSize: {
        // HIVE Typography Scale - from packages/tokens/src/typography.ts
        'display': ['64px', { lineHeight: '72px', fontWeight: '600' }],
        'h1': ['48px', { lineHeight: '56px', fontWeight: '600' }],
        'h2': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '18px', fontWeight: '400' }],
        'button': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'code': ['14px', { lineHeight: '20px', fontWeight: '400' }],
      },
      transitionDuration: {
        // HIVE Motion Timing - from packages/tokens/src/motion.ts
        'instant': '50ms',     // Immediate feedback
        'fast': '120ms',       // Micro-interactions
        'base': '180ms',       // Content transitions  
        'slow': '280ms',       // Complex animations
        'ritual': '400ms',     // Special HIVE moments
      },
      transitionTimingFunction: {
        // HIVE Brand Easing - from packages/tokens/src/motion.ts
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'snap': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elegant': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'brand': 'cubic-bezier(0.33, 0.65, 0, 1)',
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
        // HIVE Brand Keyframes
        "hive-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "hive-slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hive-slide-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hive-scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "hive-gold-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 rgba(255, 215, 0, 0)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" },
        },
        "hive-gold-glow": {
          "0%": { filter: "drop-shadow(0 0 0 rgba(255, 215, 0, 0))" },
          "50%": { filter: "drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))" },
          "100%": { filter: "drop-shadow(0 0 0 rgba(255, 215, 0, 0))" },
        },
        "hive-surface-rise": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(8px)",
            backgroundColor: "hsl(var(--background))",
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0)",
            backgroundColor: "hsl(var(--surface))",
          },
        },
        "hive-emboss-reveal": {
          "0%": { 
            opacity: "0",
            boxShadow: "inset 0 0 0 rgba(255, 215, 0, 0)",
          },
          "100%": { 
            opacity: "1",
            boxShadow: "inset 0 1px 0 rgba(255, 215, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2)",
          },
        },
        "hive-ritual-burst": {
          "0%": { 
            transform: "scale(1)", 
            opacity: "1",
            filter: "brightness(1)",
          },
          "25%": { 
            transform: "scale(1.05)", 
            opacity: "0.9",
            filter: "brightness(1.1)",
          },
          "50%": { 
            transform: "scale(1.15)", 
            opacity: "0.8",
            filter: "brightness(1.2) drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))",
          },
          "75%": { 
            transform: "scale(1.05)", 
            opacity: "0.9",
            filter: "brightness(1.1)",
          },
          "100%": { 
            transform: "scale(1)", 
            opacity: "1",
            filter: "brightness(1)",
          },
        },
        "hive-space-join": {
          "0%": { 
            opacity: "0", 
            transform: "scale(0.8) rotate(-2deg)",
            filter: "blur(2px)",
          },
          "50%": { 
            opacity: "0.7", 
            transform: "scale(1.02) rotate(0deg)",
            filter: "blur(0px) drop-shadow(0 0 10px rgba(255, 215, 0, 0.2))",
          },
          "100%": { 
            opacity: "1", 
            transform: "scale(1) rotate(0deg)",
            filter: "blur(0px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "accordion-up": "accordion-up 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        // HIVE Brand Animations
        "hive-fade-in": "hive-fade-in 180ms cubic-bezier(0.33, 0.65, 0, 1)",
        "hive-slide-up": "hive-slide-up 180ms cubic-bezier(0.33, 0.65, 0, 1)",
        "hive-slide-down": "hive-slide-down 180ms cubic-bezier(0.33, 0.65, 0, 1)",
        "hive-scale-in": "hive-scale-in 180ms cubic-bezier(0.33, 0.65, 0, 1)",
        "hive-gold-pulse": "hive-gold-pulse 2s cubic-bezier(0.33, 0.65, 0, 1) infinite",
        "hive-gold-glow": "hive-gold-glow 1.5s cubic-bezier(0.33, 0.65, 0, 1) infinite",
        "hive-surface-rise": "hive-surface-rise 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "hive-emboss-reveal": "hive-emboss-reveal 180ms cubic-bezier(0.23, 1, 0.32, 1)",
        "hive-ritual-burst": "hive-ritual-burst 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "hive-space-join": "hive-space-join 400ms cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
};

export default preset; 