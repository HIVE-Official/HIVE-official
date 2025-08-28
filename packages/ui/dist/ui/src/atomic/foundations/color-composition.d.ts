/**
 * HIVE Color Composition System - PRODUCTION READY
 * Organizes existing comprehensive color system into campus social patterns
 *
 * Built on existing robust color tokens - like HIVE's version of Vercel's system
 * Accessibility-first with WCAG AA+ compliance and dark mode optimization
 *
 * Status: ✅ PRODUCTION READY
 * Version: v1.0.0
 * Date: August 26, 2025
 */
export declare const colorPrinciples: {
    readonly philosophy: "Systematic organization of HIVE's comprehensive color system for campus social utility";
    readonly rules: readonly ["Build on existing: Organize robust color tokens already built in design-tokens.css", "Campus social utility: Colors communicate community function and status instantly", "Dark mode optimized: Extended study session eye comfort built-in", "Accessibility-first: WCAG AA+ compliance already achieved"];
};
export declare const hiveColors: {
    readonly brand: {
        readonly gold: {
            readonly primary: "var(--hive-gold-primary)";
            readonly hover: "var(--hive-gold-hover)";
            readonly background: "var(--hive-gold-background)";
            readonly border: "var(--hive-gold-border)";
            readonly use: "@mentions, premium features, primary CTA";
        };
    };
    readonly surface: {
        readonly primary: "var(--hive-bg-primary)";
        readonly secondary: "var(--hive-bg-secondary)";
        readonly tertiary: "var(--hive-bg-tertiary)";
        readonly interactive: "var(--hive-bg-interactive)";
        readonly use: "Card elevation, surface hierarchy";
    };
    readonly text: {
        readonly primary: "var(--hive-text-primary)";
        readonly secondary: "var(--hive-text-secondary)";
        readonly muted: "var(--hive-text-muted)";
        readonly placeholder: "var(--hive-text-placeholder)";
        readonly use: "Content hierarchy, accessibility compliant";
    };
    readonly semantic: {
        readonly success: "var(--hive-success-primary)";
        readonly warning: "var(--hive-warning-primary)";
        readonly error: "var(--hive-error-primary)";
        readonly info: "var(--hive-info-primary)";
        readonly use: "Status communication, space categories";
    };
    readonly border: {
        readonly primary: "var(--hive-border-primary)";
        readonly subtle: "var(--hive-border-subtle)";
        readonly glass: "var(--hive-border-glass)";
        readonly use: "Card borders, glassmorphism effects";
    };
};
export declare const campusPatterns: {
    readonly user: {
        readonly mention: "var(--hive-gold-primary)";
        readonly online: "var(--hive-success-primary)";
        readonly away: "var(--hive-warning-primary)";
        readonly offline: "var(--hive-text-muted)";
        readonly use: "User presence, mentions, identity";
    };
    readonly space: {
        readonly academic: "var(--hive-info-primary)";
        readonly social: "var(--hive-gold-primary)";
        readonly tools: "var(--hive-success-primary)";
        readonly joined: "var(--hive-success-primary)";
        readonly pending: "var(--hive-warning-primary)";
        readonly use: "Space categorization, membership status";
    };
    readonly tool: {
        readonly active: "var(--hive-success-primary)";
        readonly shared: "var(--hive-gold-primary)";
        readonly personal: "var(--hive-info-primary)";
        readonly broken: "var(--hive-error-primary)";
        readonly use: "Tool state communication";
    };
    readonly engagement: {
        readonly liked: "var(--hive-success-primary)";
        readonly default: "var(--hive-text-secondary)";
        readonly urgent: "var(--hive-error-primary)";
        readonly info: "var(--hive-info-primary)";
        readonly use: "Social engagement, notifications";
    };
};
export declare const colorComposition: {
    readonly system: {
        readonly brand: {
            readonly gold: {
                readonly primary: "var(--hive-gold-primary)";
                readonly hover: "var(--hive-gold-hover)";
                readonly background: "var(--hive-gold-background)";
                readonly border: "var(--hive-gold-border)";
                readonly use: "@mentions, premium features, primary CTA";
            };
        };
        readonly surface: {
            readonly primary: "var(--hive-bg-primary)";
            readonly secondary: "var(--hive-bg-secondary)";
            readonly tertiary: "var(--hive-bg-tertiary)";
            readonly interactive: "var(--hive-bg-interactive)";
            readonly use: "Card elevation, surface hierarchy";
        };
        readonly text: {
            readonly primary: "var(--hive-text-primary)";
            readonly secondary: "var(--hive-text-secondary)";
            readonly muted: "var(--hive-text-muted)";
            readonly placeholder: "var(--hive-text-placeholder)";
            readonly use: "Content hierarchy, accessibility compliant";
        };
        readonly semantic: {
            readonly success: "var(--hive-success-primary)";
            readonly warning: "var(--hive-warning-primary)";
            readonly error: "var(--hive-error-primary)";
            readonly info: "var(--hive-info-primary)";
            readonly use: "Status communication, space categories";
        };
        readonly border: {
            readonly primary: "var(--hive-border-primary)";
            readonly subtle: "var(--hive-border-subtle)";
            readonly glass: "var(--hive-border-glass)";
            readonly use: "Card borders, glassmorphism effects";
        };
    };
    readonly campus: {
        readonly user: {
            readonly mention: "var(--hive-gold-primary)";
            readonly online: "var(--hive-success-primary)";
            readonly away: "var(--hive-warning-primary)";
            readonly offline: "var(--hive-text-muted)";
            readonly use: "User presence, mentions, identity";
        };
        readonly space: {
            readonly academic: "var(--hive-info-primary)";
            readonly social: "var(--hive-gold-primary)";
            readonly tools: "var(--hive-success-primary)";
            readonly joined: "var(--hive-success-primary)";
            readonly pending: "var(--hive-warning-primary)";
            readonly use: "Space categorization, membership status";
        };
        readonly tool: {
            readonly active: "var(--hive-success-primary)";
            readonly shared: "var(--hive-gold-primary)";
            readonly personal: "var(--hive-info-primary)";
            readonly broken: "var(--hive-error-primary)";
            readonly use: "Tool state communication";
        };
        readonly engagement: {
            readonly liked: "var(--hive-success-primary)";
            readonly default: "var(--hive-text-secondary)";
            readonly urgent: "var(--hive-error-primary)";
            readonly info: "var(--hive-info-primary)";
            readonly use: "Social engagement, notifications";
        };
    };
    readonly principles: {
        readonly philosophy: "Systematic organization of HIVE's comprehensive color system for campus social utility";
        readonly rules: readonly ["Build on existing: Organize robust color tokens already built in design-tokens.css", "Campus social utility: Colors communicate community function and status instantly", "Dark mode optimized: Extended study session eye comfort built-in", "Accessibility-first: WCAG AA+ compliance already achieved"];
    };
};
export type ColorComposition = typeof colorComposition;
export type HiveColors = typeof hiveColors;
export type CampusPatterns = typeof campusPatterns;
//# sourceMappingURL=color-composition.d.ts.map