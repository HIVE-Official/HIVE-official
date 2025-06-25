/**
 * HIVE Brand System v1.0 - PRODUCTION STANDARD
 * Monochrome + Yellow Color System (CORRECTED)
 * Aligned with /memory-bank/hive-brand-system.md
 */
export declare const colors: {
    readonly background: "#0A0A0A";
    readonly surface: "#111111";
    readonly border: "#2A2A2A";
    readonly foreground: "#FFFFFF";
    readonly muted: "#6B7280";
    readonly disabled: "#3F3F46";
    readonly accent: {
        readonly DEFAULT: "#FFD700";
        readonly 600: "#EAC200";
        readonly 700: "#C4A500";
    };
    readonly "surface-01": "#111111";
    readonly "surface-02": "#181818";
    readonly "surface-03": "#1F1F1F";
    readonly ring: "#FFD700";
    readonly "ring-offset": "#0A0A0A";
    readonly "bg-canvas": "#0A0A0A";
    readonly "bg-card": "#111111";
    readonly "accent-gold": "#FFD700";
    readonly "accent-gold-hover": "#EAC200";
    readonly "accent-gold-pressed": "#C4A500";
    readonly "text-primary": "#FFFFFF";
    readonly "text-muted": "#6B7280";
    readonly "border-primary": "#2A2A2A";
};
export declare const shadcnColors: {
    readonly background: "#0A0A0A";
    readonly foreground: "#FFFFFF";
    readonly primary: {
        readonly DEFAULT: "#FFD700";
        readonly foreground: "#0A0A0A";
    };
    readonly secondary: {
        readonly DEFAULT: "#111111";
        readonly foreground: "#FFFFFF";
    };
    readonly muted: {
        readonly DEFAULT: "#6B7280";
        readonly foreground: "#FFFFFF";
    };
    readonly accent: {
        readonly DEFAULT: "#FFD700";
        readonly foreground: "#0A0A0A";
    };
    readonly destructive: {
        readonly DEFAULT: "#111111";
        readonly foreground: "#FFFFFF";
    };
    readonly border: "#2A2A2A";
    readonly input: "#2A2A2A";
    readonly ring: "#FFD700";
    readonly card: {
        readonly DEFAULT: "#111111";
        readonly foreground: "#FFFFFF";
    };
    readonly popover: {
        readonly DEFAULT: "#181818";
        readonly foreground: "#FFFFFF";
    };
};
export declare const cssVars: {
    readonly "--background": "#0A0A0A";
    readonly "--surface": "#111111";
    readonly "--border": "#2A2A2A";
    readonly "--foreground": "#FFFFFF";
    readonly "--muted": "#6B7280";
    readonly "--disabled": "#3F3F46";
    readonly "--accent": "#FFD700";
    readonly "--accent-hover": "#EAC200";
    readonly "--accent-active": "#C4A500";
    readonly "--surface-01": "#111111";
    readonly "--surface-02": "#181818";
    readonly "--surface-03": "#1F1F1F";
    readonly "--ring": "#FFD700";
    readonly "--ring-offset": "#0A0A0A";
};
export declare const COLOR_COMPLIANCE: {
    readonly rules: readonly ["Pure monochrome + yellow system only", "Border color must be #2A2A2A (not #374151 or #262626)", "Gold hover must be #EAC200 (not #E6C200)", "Gold active must be #C4A500", "NO success/error/warning colors (green/red/blue)", "NO gold fills except ritual badges", "Status feedback via motion, not colors"];
    readonly violations: readonly ["Using red/green/blue for status feedback", "Gold fills on primary buttons", "Wrong border colors (#374151, #262626, etc.)", "Wrong gold hover values (#E6C200, #FFCC00, etc.)", "Multiple accent color systems"];
    readonly goldUsage: {
        readonly allowed: readonly ["Text color for emphasis", "Border color for focus/active states", "Focus ring color", "Ritual badge backgrounds ONLY"];
        readonly forbidden: readonly ["Primary button backgrounds", "Secondary button backgrounds", "Card backgrounds", "Large surface areas"];
    };
};
/**
 * Get a color value with TypeScript safety
 */
export declare function getColor(path: keyof typeof colors): string;
/**
 * Get an accent color variant
 */
export declare function getAccent(variant?: keyof typeof colors.accent): string;
/**
 * Validate if a color follows brand guidelines
 */
export declare function isValidBorderColor(color: string): boolean;
export declare function isValidGoldHover(color: string): boolean;
export declare function isValidGoldActive(color: string): boolean;
export default colors;
export type ColorToken = keyof typeof colors;
export type AccentVariant = keyof typeof colors.accent;
export type SurfaceVariant = "surface-01" | "surface-02" | "surface-03";
//# sourceMappingURL=colors.d.ts.map