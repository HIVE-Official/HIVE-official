export declare const typography: {
    readonly fontFamily: {
        readonly sans: readonly ["Geist Sans", "system-ui", "sans-serif"];
        readonly display: readonly ["Space Grotesk", "system-ui", "sans-serif"];
        readonly mono: readonly ["JetBrains Mono", "monospace"];
    };
    readonly fontSize: {
        readonly 'display-2xl': "4.5rem";
        readonly 'display-xl': "3.75rem";
        readonly 'display-lg': "3rem";
        readonly 'display-md': "2.25rem";
        readonly 'display-sm': "1.875rem";
        readonly 'heading-xl': "1.5rem";
        readonly 'heading-lg': "1.25rem";
        readonly 'heading-md': "1.125rem";
        readonly 'heading-sm': "1rem";
        readonly 'body-lg': "1.125rem";
        readonly 'body-md': "1rem";
        readonly 'body-sm': "0.875rem";
        readonly 'body-xs': "0.75rem";
        readonly 'body-2xs': "0.625rem";
        readonly xs: "0.75rem";
        readonly sm: "0.875rem";
        readonly base: "1rem";
        readonly lg: "1.125rem";
        readonly xl: "1.25rem";
        readonly '2xl': "1.5rem";
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