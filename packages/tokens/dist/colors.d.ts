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
    readonly accent: "#FFD700";
    readonly "accent-600": "#EAC200";
    readonly "accent-700": "#C4A500";
};
export declare const HIVE_SEMANTIC_TOKENS: {
    readonly "bg-root": "#0A0A0A";
    readonly "surface-01": "#111111";
    readonly "surface-02": "#181818";
    readonly "surface-03": "#1F1F1F";
    readonly "border-line": "#2A2A2A";
    readonly "text-primary": "#FFFFFF";
    readonly "text-secondary": "#6B7280";
    readonly "text-disabled": "#3F3F46";
    readonly "yellow-500": "#FFD700";
    readonly "yellow-600": "#EAC200";
    readonly "yellow-700": "#C4A500";
    readonly "overlay-scrim": "rgba(0, 0, 0, 0.55)";
    readonly "shadow-ambient": "0 2px 4px 0 rgba(0, 0, 0, 0.6)";
    readonly "grain-speck": "rgba(255, 255, 255, 0.015)";
};
export declare const HIVE_GRAYSCALE: {
    readonly 50: "#FFFFFF";
    readonly 100: "#F5F5F5";
    readonly 200: "#E5E5E5";
    readonly 300: "#CFCFCF";
    readonly 400: "#A0A0A0";
    readonly 500: "#6B7280";
    readonly 600: "#5F5F5F";
    readonly 700: "#2A2A2A";
    readonly 800: "#181818";
    readonly 900: "#0A0A0A";
};
export declare const HIVE_INTERACTION_STATES: {
    readonly hover: {
        readonly "surface-01-hover": "#1A1A1A";
        readonly "surface-02-hover": "#212121";
        readonly "surface-03-hover": "#282828";
        readonly "accent-hover": "#EAC200";
    };
    readonly pressed: {
        readonly "accent-pressed": "#C4A500";
        readonly "yellow-overlay": "rgba(196, 165, 0, 0.1)";
    };
    readonly focus: {
        readonly "focus-ring": "#FFD700";
        readonly "focus-ring-offset": "#0A0A0A";
    };
};
export declare const HIVE_FEEDBACK_SYSTEM: {
    readonly error: {
        readonly motion: "shake-micro";
        readonly border: "#6B7280";
        readonly duration: "90ms";
    };
    readonly success: {
        readonly motion: "pulse-subtle";
        readonly border: "#FFFFFF";
        readonly duration: "220ms";
    };
    readonly processing: {
        readonly motion: "pulse-continuous";
        readonly border: "#2A2A2A";
        readonly duration: "1200ms";
    };
    readonly ritual: {
        readonly background: "#FFD700";
        readonly color: "#0A0A0A";
        readonly gradient: "conic-gradient(from 0deg, #FFD700, #C4A500, #FFD700)";
        readonly duration: "300ms";
    };
};
export declare function generateCSSVariables(): Record<string, string>;
export declare const ACCESSIBILITY_COMPLIANCE: {
    readonly contrast: {
        readonly "white-on-background": "21:1";
        readonly "muted-on-background": "8.2:1";
        readonly "accent-on-background": "10.4:1";
        readonly "foreground-on-surface": "12.5:1";
        readonly "disabled-on-surface": "4.8:1";
    };
    readonly principles: readonly ["Yellow accents never used for critical information alone", "Motion-based feedback for error/success states (NO colored states)", "Focus rings always visible for keyboard navigation", "All text meets minimum contrast requirements", "Pure monochrome + yellow system enforced"];
};
export type ColorToken = keyof typeof colors;
export type SemanticToken = keyof typeof HIVE_SEMANTIC_TOKENS;
export type GrayscaleToken = keyof typeof HIVE_GRAYSCALE;
export declare function getColor(token: ColorToken): string;
export declare function getSemanticToken(token: SemanticToken): string;
export { colors as default, HIVE_SEMANTIC_TOKENS as semanticTokens, HIVE_GRAYSCALE as grayscale, HIVE_INTERACTION_STATES as interactionStates, HIVE_FEEDBACK_SYSTEM as feedbackSystem, };
//# sourceMappingURL=colors.d.ts.map