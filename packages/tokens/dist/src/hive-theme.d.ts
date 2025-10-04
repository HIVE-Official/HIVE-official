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
export declare const hiveTheme: {
    /**
     * Monochrome Color System
     *
     * Philosophy: Linear's 2025 evolution
     * "Even MORE monochromatic... moving toward an even more monochromatic approach"
     *
     * Uses true black (#000) for OLED battery savings (47% improvement)
     * High contrast for outdoor campus usage
     */
    readonly colors: {
        readonly background: {
            readonly base: "#000000";
            readonly surface: "#121212";
            readonly elevated: "#1A1A1C";
            readonly muted: "#0A0A0A";
        };
        readonly text: {
            readonly primary: "#FFFFFF";
            readonly secondary: "#A1A1AA";
            readonly tertiary: "#71717A";
            readonly disabled: "#52525B";
            readonly inverse: "#09090B";
        };
        readonly primary: {
            readonly DEFAULT: "#FFD700";
            readonly light: "#FFED4E";
            readonly dark: "#D4AF37";
            readonly muted: "#FFF9DB";
        };
        readonly semantic: {
            readonly success: {
                readonly DEFAULT: "#22C55E";
                readonly light: "#4ADE80";
                readonly dark: "#16A34A";
                readonly bg: "rgba(34, 197, 94, 0.1)";
            };
            readonly error: {
                readonly DEFAULT: "#EF4444";
                readonly light: "#F87171";
                readonly dark: "#DC2626";
                readonly bg: "rgba(239, 68, 68, 0.1)";
            };
            readonly warning: {
                readonly DEFAULT: "#F59E0B";
                readonly light: "#FBBF24";
                readonly dark: "#D97706";
                readonly bg: "rgba(245, 158, 11, 0.1)";
            };
            readonly info: {
                readonly DEFAULT: "#3B82F6";
                readonly light: "#60A5FA";
                readonly dark: "#2563EB";
                readonly bg: "rgba(59, 130, 246, 0.1)";
            };
        };
        readonly border: {
            readonly DEFAULT: "rgba(255, 255, 255, 0.08)";
            readonly strong: "rgba(255, 255, 255, 0.12)";
            readonly muted: "rgba(255, 255, 255, 0.04)";
            readonly primary: "#FFD700";
        };
        readonly states: {
            readonly hover: "rgba(255, 255, 255, 0.05)";
            readonly active: "rgba(255, 255, 255, 0.08)";
            readonly focus: "rgba(255, 215, 0, 0.2)";
            readonly disabled: "rgba(255, 255, 255, 0.02)";
        };
    };
    /**
     * Depth System (Stripe-inspired)
     *
     * Philosophy: Simplified from 5+ levels to 3 levels
     * Faster rendering, clearer hierarchy, easier implementation
     */
    readonly shadows: {
        readonly none: "none";
        readonly sm: "0 2px 4px rgba(0, 0, 0, 0.3)";
        readonly md: "0 8px 16px rgba(0, 0, 0, 0.4)";
        readonly lg: "0 16px 32px rgba(0, 0, 0, 0.5)";
        readonly glow: "0 0 20px rgba(255, 215, 0, 0.3)";
    };
    /**
     * Animation System (Apple-inspired)
     *
     * Philosophy: "Smooth, fluid animations that feel premium"
     * Slower, more deliberate timing creates polished, luxurious feel
     */
    readonly animation: {
        readonly duration: {
            readonly instant: 0;
            readonly fast: 250;
            readonly normal: 400;
            readonly slow: 600;
            readonly slowest: 800;
        };
        readonly easing: {
            readonly smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)";
            readonly liquid: "cubic-bezier(0.42, 0, 0.58, 1)";
            readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            readonly sharp: "cubic-bezier(0.4, 0, 0.6, 1)";
            readonly gentle: "cubic-bezier(0.16, 1, 0.3, 1)";
        };
        readonly transitions: {
            readonly default: {
                readonly duration: 400;
                readonly easing: "cubic-bezier(0.25, 0.1, 0.25, 1)";
            };
            readonly fast: {
                readonly duration: 250;
                readonly easing: "cubic-bezier(0.25, 0.1, 0.25, 1)";
            };
            readonly page: {
                readonly duration: 400;
                readonly easing: "cubic-bezier(0.42, 0, 0.58, 1)";
            };
            readonly modal: {
                readonly duration: 400;
                readonly easing: "cubic-bezier(0.16, 1, 0.3, 1)";
            };
            readonly success: {
                readonly duration: 600;
                readonly easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            };
        };
    };
    /**
     * Glassmorphism Configuration
     *
     * Philosophy: Adds depth without visual weight
     * Used for floating elements, not primary surfaces
     */
    readonly glass: {
        readonly subtle: {
            readonly background: "rgba(18, 18, 18, 0.8)";
            readonly backdropFilter: "blur(8px)";
            readonly border: "1px solid rgba(255, 255, 255, 0.08)";
        };
        readonly standard: {
            readonly background: "rgba(18, 18, 18, 0.8)";
            readonly backdropFilter: "blur(12px)";
            readonly border: "1px solid rgba(255, 255, 255, 0.08)";
        };
        readonly strong: {
            readonly background: "rgba(26, 26, 28, 0.9)";
            readonly backdropFilter: "blur(16px)";
            readonly border: "1px solid rgba(255, 255, 255, 0.12)";
        };
    };
    /**
     * Border Radius System
     *
     * Follows shadcn/ui defaults with HIVE adjustments
     */
    readonly radius: {
        readonly none: "0";
        readonly sm: "0.375rem";
        readonly md: "0.5rem";
        readonly lg: "0.75rem";
        readonly xl: "1rem";
        readonly '2xl': "1.5rem";
        readonly full: "9999px";
    };
    /**
     * Spacing Scale (Tailwind default)
     *
     * Generous spacing for touch targets and readability
     */
    readonly spacing: {
        readonly touchTarget: "44px";
        readonly sectionGap: "3rem";
        readonly cardPadding: "1.5rem";
        readonly modalPadding: "2rem";
    };
    /**
     * Typography Scale
     *
     * Geist Sans with campus-optimized hierarchy
     * @see /packages/ui/TYPOGRAPHY_GUIDE.md
     */
    readonly typography: {
        readonly sans: "var(--font-geist-sans), system-ui, sans-serif";
        readonly mono: "var(--font-geist-mono), monospace";
        readonly sizes: {
            readonly xs: "0.75rem";
            readonly sm: "0.875rem";
            readonly base: "1rem";
            readonly lg: "1.125rem";
            readonly xl: "1.25rem";
            readonly '2xl': "1.5rem";
            readonly '3xl': "2rem";
            readonly '4xl': "2.5rem";
        };
        readonly weights: {
            readonly normal: 400;
            readonly medium: 500;
            readonly semibold: 600;
            readonly bold: 700;
        };
        readonly leading: {
            readonly tight: 1.25;
            readonly normal: 1.5;
            readonly relaxed: 1.75;
        };
    };
    /**
     * Component Overrides
     *
     * HIVE-specific component styling
     */
    readonly components: {
        readonly button: {
            readonly primary: {
                readonly background: "#FFD700";
                readonly color: "#09090B";
                readonly hover: "#FFED4E";
                readonly active: "#D4AF37";
            };
            readonly secondary: {
                readonly background: "rgba(255, 255, 255, 0.08)";
                readonly color: "#FFFFFF";
                readonly hover: "rgba(255, 255, 255, 0.12)";
                readonly active: "rgba(255, 255, 255, 0.16)";
            };
            readonly ghost: {
                readonly background: "transparent";
                readonly color: "#A1A1AA";
                readonly hover: "rgba(255, 255, 255, 0.05)";
                readonly active: "rgba(255, 255, 255, 0.08)";
            };
        };
        readonly input: {
            readonly background: "#121212";
            readonly border: "rgba(255, 255, 255, 0.08)";
            readonly focus: {
                readonly border: "#FFD700";
                readonly ring: "rgba(255, 215, 0, 0.2)";
            };
        };
        readonly card: {
            readonly background: "#121212";
            readonly border: "rgba(255, 255, 255, 0.08)";
            readonly shadow: "0 2px 4px rgba(0, 0, 0, 0.3)";
        };
        readonly badge: {
            readonly primary: {
                readonly background: "rgba(255, 215, 0, 0.1)";
                readonly color: "#FFD700";
                readonly border: "rgba(255, 215, 0, 0.2)";
            };
            readonly secondary: {
                readonly background: "rgba(255, 255, 255, 0.08)";
                readonly color: "#A1A1AA";
                readonly border: "rgba(255, 255, 255, 0.08)";
            };
        };
    };
    /**
     * Campus-Specific Patterns
     *
     * Colors for campus context (temporal, social proof, etc.)
     */
    readonly campus: {
        readonly temporal: {
            readonly urgent: "#EF4444";
            readonly soon: "#F59E0B";
            readonly upcoming: "#3B82F6";
            readonly future: "#71717A";
        };
        readonly social: {
            readonly mutual: "#FFD700";
            readonly space: "#3B82F6";
            readonly major: "#8B5CF6";
        };
        readonly categories: {
            readonly academic: "#3B82F6";
            readonly social: "#EC4899";
            readonly professional: "#8B5CF6";
            readonly athletic: "#EF4444";
            readonly cultural: "#F59E0B";
            readonly greek: "#D946EF";
        };
    };
};
/**
 * CSS Variables Export
 *
 * For use in Tailwind config and global CSS
 */
export declare const hiveThemeCSSVariables: {
    '--hive-bg-base': "#000000";
    '--hive-bg-surface': "#121212";
    '--hive-bg-elevated': "#1A1A1C";
    '--hive-text-primary': "#FFFFFF";
    '--hive-text-secondary': "#A1A1AA";
    '--hive-text-tertiary': "#71717A";
    '--hive-primary': "#FFD700";
    '--hive-primary-light': "#FFED4E";
    '--hive-primary-dark': "#D4AF37";
    '--hive-border': "rgba(255, 255, 255, 0.08)";
    '--hive-border-strong': "rgba(255, 255, 255, 0.12)";
    '--hive-shadow-sm': "0 2px 4px rgba(0, 0, 0, 0.3)";
    '--hive-shadow-md': "0 8px 16px rgba(0, 0, 0, 0.4)";
    '--hive-shadow-lg': "0 16px 32px rgba(0, 0, 0, 0.5)";
    '--hive-duration-fast': string;
    '--hive-duration-normal': string;
    '--hive-duration-slow': string;
    '--hive-easing-smooth': "cubic-bezier(0.25, 0.1, 0.25, 1)";
    '--hive-easing-liquid': "cubic-bezier(0.42, 0, 0.58, 1)";
    '--hive-radius-sm': "0.375rem";
    '--hive-radius-md': "0.5rem";
    '--hive-radius-lg': "0.75rem";
};
/**
 * Tailwind Config Extension
 *
 * Use this in tailwind.config.master.ts
 */
export declare const hiveTailwindExtension: {
    colors: {
        'hive-bg': {
            base: "#000000";
            surface: "#121212";
            elevated: "#1A1A1C";
            muted: "#0A0A0A";
        };
        'hive-text': {
            primary: "#FFFFFF";
            secondary: "#A1A1AA";
            tertiary: "#71717A";
            disabled: "#52525B";
        };
        'hive-gold': {
            DEFAULT: "#FFD700";
            light: "#FFED4E";
            dark: "#D4AF37";
            muted: "#FFF9DB";
        };
    };
    boxShadow: {
        'hive-sm': "0 2px 4px rgba(0, 0, 0, 0.3)";
        'hive-md': "0 8px 16px rgba(0, 0, 0, 0.4)";
        'hive-lg': "0 16px 32px rgba(0, 0, 0, 0.5)";
        'hive-glow': "0 0 20px rgba(255, 215, 0, 0.3)";
    };
    transitionDuration: {
        fast: string;
        smooth: string;
        slow: string;
    };
    transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)";
        liquid: "cubic-bezier(0.42, 0, 0.58, 1)";
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    };
};
export type HiveTheme = typeof hiveTheme;
//# sourceMappingURL=hive-theme.d.ts.map