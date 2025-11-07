import { prdColors, prdSemantic } from './colors-prd-aligned';
/**
 * Convert hex color to RGB values
 */
export declare const hexToRgb: (hex: string) => {
    r: number;
    g: number;
    b: number;
} | null;
/**
 * Create color with opacity
 */
export declare const withOpacity: (color: string, opacity: number) => string;
/**
 * Generate color scale from base color
 */
export declare const generateColorScale: (baseColor: string, steps?: number) => Record<number, string>;
/**
 * Get color by semantic meaning
 */
export declare const getSemanticColor: (semantic: keyof typeof prdSemantic, variant?: string) => string | {
    readonly primary: "#000000";
    readonly secondary: "#171717";
    readonly tertiary: "#262626";
    readonly interactive: "#404040";
    readonly overlay: "rgba(0, 0, 0, 0.6)";
} | {
    readonly primary: "#FFFFFF";
    readonly secondary: "#D4D4D4";
    readonly tertiary: "#A3A3A3";
    readonly disabled: "#525252";
    readonly inverse: "#000000";
} | {
    readonly primary: "#FFD700";
    readonly secondary: "#FFD700";
    readonly hover: "#FFD700";
    readonly onGold: "#000000";
} | {
    readonly hover: "rgba(255, 255, 255, 0.04)";
    readonly focus: "rgba(255, 255, 255, 0.20)";
    readonly active: "rgba(255, 255, 255, 0.08)";
    readonly disabled: "#404040";
} | {
    readonly cta: "#FFD700";
    readonly achievement: "#FFD700";
    readonly online: "#FFD700";
    readonly featured: "#FFD700";
} | {
    readonly success: "#00D46A";
    readonly warning: "#FFB800";
    readonly error: "#FF3737";
    readonly info: "#FFFFFF";
} | {
    readonly default: "rgba(255, 255, 255, 0.08)";
    readonly hover: "rgba(255, 255, 255, 0.16)";
    readonly focus: "rgba(255, 255, 255, 0.40)";
    readonly strong: "#404040";
};
/**
 * Get CSS custom property for semantic color
 */
export declare const getCSSVariable: (token: string) => string;
/**
 * Calculate contrast ratio between two colors
 */
export declare const getContrastRatio: (color1: string, color2: string) => number;
/**
 * Check if color combination meets WCAG AA standards
 */
export declare const meetsWCAGAA: (foreground: string, background: string) => boolean;
/**
 * Check if color combination meets WCAG AAA standards
 */
export declare const meetsWCAGAAA: (foreground: string, background: string) => boolean;
/**
 * Get appropriate text color for background
 */
export declare const getTextColorForBackground: (backgroundColor: string) => string;
/**
 * Generate hover state for color
 */
export declare const getHoverColor: (baseColor: string) => string;
/**
 * Generate focus ring color with opacity
 */
export declare const getFocusRingColor: (brandColor: string) => string;
/**
 * Validate HIVE color usage
 */
export declare const validateHiveColor: (color: string) => {
    isValid: boolean;
    issues: string[];
    suggestions: string[];
};
/**
 * Generate CSS custom properties for HIVE semantic colors
 */
export declare const generateSemanticCSSProperties: () => string;
/**
 * Get all HIVE colors for documentation
 */
export declare const getAllHiveColors: () => {
    backgrounds: {
        readonly primary: "#000000";
        readonly secondary: "#171717";
        readonly tertiary: "#262626";
        readonly interactive: "#404040";
        readonly overlay: "rgba(0, 0, 0, 0.6)";
    };
    text: {
        readonly primary: "#FFFFFF";
        readonly secondary: "#D4D4D4";
        readonly tertiary: "#A3A3A3";
        readonly disabled: "#525252";
        readonly inverse: "#000000";
    };
    brand: {
        readonly primary: "#FFD700";
        readonly secondary: "#FFD700";
        readonly hover: "#FFD700";
        readonly onGold: "#000000";
    };
    status: {
        readonly success: "#00D46A";
        readonly warning: "#FFB800";
        readonly error: "#FF3737";
        readonly info: "#FFFFFF";
    };
    interactive: {
        readonly hover: "rgba(255, 255, 255, 0.04)";
        readonly focus: "rgba(255, 255, 255, 0.20)";
        readonly active: "rgba(255, 255, 255, 0.08)";
        readonly disabled: "#404040";
    };
    borders: {
        readonly default: "rgba(255, 255, 255, 0.08)";
        readonly hover: "rgba(255, 255, 255, 0.16)";
        readonly focus: "rgba(255, 255, 255, 0.40)";
        readonly strong: "#404040";
    };
};
/**
 * Utilities specific to HIVE's gold accent system
 */
export declare const goldAccentUtils: {
    /**
     * Get the primary gold color
     */
    primary: "#FFD700";
    /**
     * Check if gold should be used for this context
     */
    shouldUseGold: (context: "achievement" | "premium" | "special" | "regular") => boolean;
    /**
     * Get appropriate gold opacity for different uses
     */
    getGoldWithOpacity: (opacity: number) => string;
    /**
     * Validate gold usage against guidelines
     */
    validateGoldUsage: (context: string) => {
        appropriate: boolean;
        reason: string;
    };
};
export { prdColors, prdSemantic };
export type { PRDColorToken, PRDSemanticToken } from './colors-prd-aligned';
//# sourceMappingURL=color-utilities.d.ts.map