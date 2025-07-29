export declare const typography: {
    readonly fontFamily: {
        readonly sans: readonly ["Geist Sans", "system-ui", "sans-serif"];
        readonly display: readonly ["Space Grotesk", "system-ui", "sans-serif"];
        readonly mono: readonly ["JetBrains Mono", "monospace"];
    };
    readonly fontSize: {
        readonly 'display-2xl': "2.5rem";
        readonly 'display-xl': "2.25rem";
        readonly 'display-lg': "2rem";
        readonly 'display-md': "1.75rem";
        readonly 'display-sm': "1.5rem";
        readonly 'heading-xl': "1.25rem";
        readonly 'heading-lg': "1.125rem";
        readonly 'heading-md': "1rem";
        readonly 'heading-sm': "0.875rem";
        readonly 'body-lg': "1rem";
        readonly 'body-md': "0.875rem";
        readonly 'body-sm': "0.75rem";
        readonly 'body-xs': "0.625rem";
        readonly 'body-2xs': "0.5rem";
        readonly xs: "0.625rem";
        readonly sm: "0.75rem";
        readonly base: "0.875rem";
        readonly lg: "1rem";
        readonly xl: "1.125rem";
        readonly '2xl': "1.25rem";
    };
    readonly fontWeight: {
        readonly light: "300";
        readonly normal: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
    };
    readonly lineHeight: {
        readonly none: "1";
        readonly tight: "1.25";
        readonly snug: "1.375";
        readonly normal: "1.5";
        readonly relaxed: "1.625";
        readonly loose: "2";
    };
    readonly letterSpacing: {
        readonly tighter: "-0.05em";
        readonly tight: "-0.025em";
        readonly normal: "0";
        readonly wide: "0.025em";
        readonly wider: "0.05em";
        readonly widest: "0.1em";
    };
};
export type TypographyToken = keyof typeof typography;
//# sourceMappingURL=typography.d.ts.map