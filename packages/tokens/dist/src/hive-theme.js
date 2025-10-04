/**
 * HIVE Branded Theme Configuration
 *
 * Based on 2025 industry research:
 * - Linear: Monochrome evolution with single accent
 * - Arc Browser: Calm animations, spatial clarity
 * - Stripe: Information density, subtle depth
 * - shadcn/ui: Foundation with HIVE differentiation
 *
 * @see /packages/ui/2025_DESIGN_AESTHETIC_AUDIT.md
 */
export const hiveTheme = {
    /**
     * Monochrome Color System
     *
     * Philosophy: Linear's 2025 evolution
     * "Even MORE monochromatic... moving toward an even more monochromatic approach"
     *
     * Uses true black (#000) for OLED battery savings (47% improvement)
     * High contrast for outdoor campus usage
     */
    colors: {
        // Base layers (monochrome)
        background: {
            base: '#000000', // Level 0: True black (OLED optimized)
            surface: '#121212', // Level 1: Cards, panels, inputs
            elevated: '#1A1A1C', // Level 2: Modals, dropdowns, tooltips
            muted: '#0A0A0A', // Subtle variation for sections
        },
        // Text hierarchy (high contrast)
        text: {
            primary: '#FFFFFF', // Primary content, headings
            secondary: '#A1A1AA', // Secondary content, labels (zinc-400)
            tertiary: '#71717A', // Tertiary content, helper text (zinc-500)
            disabled: '#52525B', // Disabled state (zinc-600)
            inverse: '#09090B', // Text on light backgrounds (zinc-950)
        },
        // HIVE Gold Accent (strategic use only)
        primary: {
            DEFAULT: '#FFD700', // HIVE gold
            light: '#FFED4E', // Hover/active state
            dark: '#D4AF37', // Pressed state
            muted: '#FFF9DB', // 10% opacity background
        },
        // Semantic colors (monochrome + function)
        semantic: {
            // Success (green for completion, growth)
            success: {
                DEFAULT: '#22C55E', // green-500
                light: '#4ADE80', // green-400
                dark: '#16A34A', // green-600
                bg: 'rgba(34, 197, 94, 0.1)',
            },
            // Error (red for alerts, destructive)
            error: {
                DEFAULT: '#EF4444', // red-500
                light: '#F87171', // red-400
                dark: '#DC2626', // red-600
                bg: 'rgba(239, 68, 68, 0.1)',
            },
            // Warning (orange for caution)
            warning: {
                DEFAULT: '#F59E0B', // amber-500
                light: '#FBBF24', // amber-400
                dark: '#D97706', // amber-600
                bg: 'rgba(245, 158, 11, 0.1)',
            },
            // Info (blue for neutral information)
            info: {
                DEFAULT: '#3B82F6', // blue-500
                light: '#60A5FA', // blue-400
                dark: '#2563EB', // blue-600
                bg: 'rgba(59, 130, 246, 0.1)',
            },
        },
        // Border colors (subtle definition)
        border: {
            DEFAULT: 'rgba(255, 255, 255, 0.08)', // Subtle separation
            strong: 'rgba(255, 255, 255, 0.12)', // Emphasized borders
            muted: 'rgba(255, 255, 255, 0.04)', // Very subtle
            primary: '#FFD700', // Gold accent border
        },
        // Interactive states
        states: {
            hover: 'rgba(255, 255, 255, 0.05)', // Hover overlay
            active: 'rgba(255, 255, 255, 0.08)', // Active/pressed
            focus: 'rgba(255, 215, 0, 0.2)', // Gold focus ring
            disabled: 'rgba(255, 255, 255, 0.02)', // Disabled overlay
        },
    },
    /**
     * Depth System (Stripe-inspired)
     *
     * Philosophy: Simplified from 5+ levels to 3 levels
     * Faster rendering, clearer hierarchy, easier implementation
     */
    shadows: {
        none: 'none',
        // Level 1: Cards, panels, inputs
        sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
        // Level 2: Modals, dropdowns, tooltips
        md: '0 8px 16px rgba(0, 0, 0, 0.4)',
        // Level 3: High elevation (rarely used)
        lg: '0 16px 32px rgba(0, 0, 0, 0.5)',
        // Gold glow (for emphasis)
        glow: '0 0 20px rgba(255, 215, 0, 0.3)',
    },
    /**
     * Animation System (Apple-inspired)
     *
     * Philosophy: "Smooth, fluid animations that feel premium"
     * Slower, more deliberate timing creates polished, luxurious feel
     */
    animation: {
        // Duration (in milliseconds) - Apple-like timing
        duration: {
            instant: 0, // No animation
            fast: 250, // Micro-interactions (hover, focus) - was 120ms
            normal: 400, // Standard transitions (page changes, modals) - was 200ms
            slow: 600, // Deliberate animations (onboarding, celebrations) - was 300ms
            slowest: 800, // Special moments (confetti, completion) - was 500ms
        },
        // Easing curves (Apple-inspired)
        easing: {
            // Standard ease (Apple's signature curve)
            smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Apple standard ease
            // Ease in-out (most fluid)
            liquid: 'cubic-bezier(0.42, 0, 0.58, 1)', // Apple ease-in-out
            // Bouncy (celebrations, success states)
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Kept for celebrations
            // Sharp (instant feel)
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)', // Kept for quick actions
            // Gentle (subtle fades) - Apple fade timing
            gentle: 'cubic-bezier(0.16, 1, 0.3, 1)', // Apple gentle ease
        },
        // Pre-configured transitions (Apple timing)
        transitions: {
            // Default (most UI elements)
            default: {
                duration: 400, // Slower, more premium feel
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Apple standard
            },
            // Fast interactions (hover, focus)
            fast: {
                duration: 250, // Still responsive but smoother
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            },
            // Page transitions
            page: {
                duration: 400, // Deliberate page changes
                easing: 'cubic-bezier(0.42, 0, 0.58, 1)', // Apple ease-in-out
            },
            // Modal/overlay
            modal: {
                duration: 400, // Premium modal entrance
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Apple gentle ease
            },
            // Success/celebration
            success: {
                duration: 600, // Satisfying celebration
                easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy
            },
        },
    },
    /**
     * Glassmorphism Configuration
     *
     * Philosophy: Adds depth without visual weight
     * Used for floating elements, not primary surfaces
     */
    glass: {
        // Subtle glass (step indicators, badges)
        subtle: {
            background: 'rgba(18, 18, 18, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
        },
        // Standard glass (cards, modals)
        standard: {
            background: 'rgba(18, 18, 18, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
        },
        // Strong glass (emphasized elements)
        strong: {
            background: 'rgba(26, 26, 28, 0.9)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
        },
    },
    /**
     * Border Radius System
     *
     * Follows shadcn/ui defaults with HIVE adjustments
     */
    radius: {
        none: '0',
        sm: '0.375rem', // 6px - Small elements
        md: '0.5rem', // 8px - Default (buttons, inputs)
        lg: '0.75rem', // 12px - Cards
        xl: '1rem', // 16px - Large cards
        '2xl': '1.5rem', // 24px - Modals
        full: '9999px', // Pills, avatars
    },
    /**
     * Spacing Scale (Tailwind default)
     *
     * Generous spacing for touch targets and readability
     */
    spacing: {
        // Touch targets
        touchTarget: '44px', // iOS minimum
        // Common patterns
        sectionGap: '3rem', // 48px - Between sections (onboarding)
        cardPadding: '1.5rem', // 24px - Inside cards
        modalPadding: '2rem', // 32px - Inside modals
    },
    /**
     * Typography Scale
     *
     * Geist Sans with campus-optimized hierarchy
     * @see /packages/ui/TYPOGRAPHY_GUIDE.md
     */
    typography: {
        // Font families
        sans: 'var(--font-geist-sans), system-ui, sans-serif',
        mono: 'var(--font-geist-mono), monospace',
        // Size scale
        sizes: {
            xs: '0.75rem', // 12px - Metadata, timestamps
            sm: '0.875rem', // 14px - Body text default
            base: '1rem', // 16px - Larger body
            lg: '1.125rem', // 18px - Card titles
            xl: '1.25rem', // 20px - Section headings
            '2xl': '1.5rem', // 24px - Page titles
            '3xl': '2rem', // 32px - Hero headings (onboarding)
            '4xl': '2.5rem', // 40px - Large hero
        },
        // Weight scale
        weights: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        // Line heights (optimized for readability)
        leading: {
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75,
        },
    },
    /**
     * Component Overrides
     *
     * HIVE-specific component styling
     */
    components: {
        button: {
            // Primary (gold)
            primary: {
                background: '#FFD700',
                color: '#09090B',
                hover: '#FFED4E',
                active: '#D4AF37',
            },
            // Secondary (monochrome)
            secondary: {
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                hover: 'rgba(255, 255, 255, 0.12)',
                active: 'rgba(255, 255, 255, 0.16)',
            },
            // Ghost (subtle)
            ghost: {
                background: 'transparent',
                color: '#A1A1AA',
                hover: 'rgba(255, 255, 255, 0.05)',
                active: 'rgba(255, 255, 255, 0.08)',
            },
        },
        input: {
            background: '#121212',
            border: 'rgba(255, 255, 255, 0.08)',
            focus: {
                border: '#FFD700',
                ring: 'rgba(255, 215, 0, 0.2)',
            },
        },
        card: {
            background: '#121212',
            border: 'rgba(255, 255, 255, 0.08)',
            shadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        badge: {
            // Gold badge (student leader, featured)
            primary: {
                background: 'rgba(255, 215, 0, 0.1)',
                color: '#FFD700',
                border: 'rgba(255, 215, 0, 0.2)',
            },
            // Secondary badge (context, metadata)
            secondary: {
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#A1A1AA',
                border: 'rgba(255, 255, 255, 0.08)',
            },
        },
    },
    /**
     * Campus-Specific Patterns
     *
     * Colors for campus context (temporal, social proof, etc.)
     */
    campus: {
        // Temporal urgency
        temporal: {
            urgent: '#EF4444', // Starting soon (red)
            soon: '#F59E0B', // Starting today (orange)
            upcoming: '#3B82F6', // This week (blue)
            future: '#71717A', // Later (gray)
        },
        // Social proof
        social: {
            mutual: '#FFD700', // Mutual friends (gold)
            space: '#3B82F6', // Same space (blue)
            major: '#8B5CF6', // Same major (purple)
        },
        // Space categories (subtle color coding)
        categories: {
            academic: '#3B82F6', // Blue
            social: '#EC4899', // Pink
            professional: '#8B5CF6', // Purple
            athletic: '#EF4444', // Red
            cultural: '#F59E0B', // Orange
            greek: '#D946EF', // Magenta
        },
    },
};
/**
 * CSS Variables Export
 *
 * For use in Tailwind config and global CSS
 */
export const hiveThemeCSSVariables = {
    // Colors
    '--hive-bg-base': hiveTheme.colors.background.base,
    '--hive-bg-surface': hiveTheme.colors.background.surface,
    '--hive-bg-elevated': hiveTheme.colors.background.elevated,
    '--hive-text-primary': hiveTheme.colors.text.primary,
    '--hive-text-secondary': hiveTheme.colors.text.secondary,
    '--hive-text-tertiary': hiveTheme.colors.text.tertiary,
    '--hive-primary': hiveTheme.colors.primary.DEFAULT,
    '--hive-primary-light': hiveTheme.colors.primary.light,
    '--hive-primary-dark': hiveTheme.colors.primary.dark,
    '--hive-border': hiveTheme.colors.border.DEFAULT,
    '--hive-border-strong': hiveTheme.colors.border.strong,
    // Shadows
    '--hive-shadow-sm': hiveTheme.shadows.sm,
    '--hive-shadow-md': hiveTheme.shadows.md,
    '--hive-shadow-lg': hiveTheme.shadows.lg,
    // Animation
    '--hive-duration-fast': `${hiveTheme.animation.duration.fast}ms`,
    '--hive-duration-normal': `${hiveTheme.animation.duration.normal}ms`,
    '--hive-duration-slow': `${hiveTheme.animation.duration.slow}ms`,
    '--hive-easing-smooth': hiveTheme.animation.easing.smooth,
    '--hive-easing-liquid': hiveTheme.animation.easing.liquid,
    // Border radius
    '--hive-radius-sm': hiveTheme.radius.sm,
    '--hive-radius-md': hiveTheme.radius.md,
    '--hive-radius-lg': hiveTheme.radius.lg,
};
/**
 * Tailwind Config Extension
 *
 * Use this in tailwind.config.master.ts
 */
export const hiveTailwindExtension = {
    colors: {
        'hive-bg': {
            base: hiveTheme.colors.background.base,
            surface: hiveTheme.colors.background.surface,
            elevated: hiveTheme.colors.background.elevated,
            muted: hiveTheme.colors.background.muted,
        },
        'hive-text': {
            primary: hiveTheme.colors.text.primary,
            secondary: hiveTheme.colors.text.secondary,
            tertiary: hiveTheme.colors.text.tertiary,
            disabled: hiveTheme.colors.text.disabled,
        },
        'hive-gold': {
            DEFAULT: hiveTheme.colors.primary.DEFAULT,
            light: hiveTheme.colors.primary.light,
            dark: hiveTheme.colors.primary.dark,
            muted: hiveTheme.colors.primary.muted,
        },
    },
    boxShadow: {
        'hive-sm': hiveTheme.shadows.sm,
        'hive-md': hiveTheme.shadows.md,
        'hive-lg': hiveTheme.shadows.lg,
        'hive-glow': hiveTheme.shadows.glow,
    },
    transitionDuration: {
        'fast': `${hiveTheme.animation.duration.fast}ms`, // 250ms
        'smooth': `${hiveTheme.animation.duration.normal}ms`, // 400ms
        'slow': `${hiveTheme.animation.duration.slow}ms`, // 600ms
    },
    transitionTimingFunction: {
        'smooth': hiveTheme.animation.easing.smooth,
        'liquid': hiveTheme.animation.easing.liquid,
        'bounce': hiveTheme.animation.easing.bounce,
    },
};
//# sourceMappingURL=hive-theme.js.map