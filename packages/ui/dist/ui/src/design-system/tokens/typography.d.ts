/**
 * HIVE Typography System
 * Semantic typography tokens for campus-first design
 */
export declare const typography: {
    readonly fontFamily: {
        readonly body: "var(--hive-font-body)";
        readonly heading: "var(--hive-font-heading)";
        readonly mono: "var(--hive-font-mono)";
    };
    readonly fontSize: {
        readonly xs: "var(--hive-text-xs)";
        readonly sm: "var(--hive-text-sm)";
        readonly base: "var(--hive-text-base)";
        readonly lg: "var(--hive-text-lg)";
        readonly xl: "var(--hive-text-xl)";
        readonly '2xl': "var(--hive-text-2xl)";
        readonly '3xl': "var(--hive-text-3xl)";
    };
    readonly fontWeight: {
        readonly normal: "var(--hive-font-weight-normal)";
        readonly medium: "var(--hive-font-weight-medium)";
        readonly semibold: "var(--hive-font-weight-semibold)";
        readonly bold: "var(--hive-font-weight-bold)";
    };
    readonly lineHeight: {
        readonly tight: "var(--hive-line-height-tight)";
        readonly normal: "var(--hive-line-height-normal)";
        readonly relaxed: "var(--hive-line-height-relaxed)";
    };
    readonly letterSpacing: {
        readonly tight: "var(--hive-letter-spacing-tight)";
        readonly normal: "var(--hive-letter-spacing-normal)";
        readonly wide: "var(--hive-letter-spacing-wide)";
    };
};
export type TypographyToken = keyof typeof typography;
export type FontFamily = keyof typeof typography.fontFamily;
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type LineHeight = keyof typeof typography.lineHeight;
export type LetterSpacing = keyof typeof typography.letterSpacing;
//# sourceMappingURL=typography.d.ts.map