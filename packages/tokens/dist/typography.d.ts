export declare const typography: {
    readonly fontFamily: {
        readonly sans: readonly ["Inter Variable", "Inter", "system-ui", "sans-serif"];
        readonly display: readonly ["Space Grotesk Variable", "Space Grotesk", "system-ui", "sans-serif"];
        readonly mono: readonly ["JetBrains Mono", "Consolas", "Monaco", "monospace"];
    };
    readonly fontWeight: {
        readonly light: "300";
        readonly normal: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
    };
    readonly fontSize: {
        readonly display: {
            readonly size: "64px";
            readonly lineHeight: "72px";
            readonly fontWeight: "600";
            readonly fontFamily: "Space Grotesk Variable";
            readonly usage: "Hero headlines, marketing pages";
        };
        readonly h1: {
            readonly size: "48px";
            readonly lineHeight: "56px";
            readonly fontWeight: "600";
            readonly fontFamily: "Space Grotesk Variable";
            readonly usage: "Page titles, primary headings";
        };
        readonly h2: {
            readonly size: "32px";
            readonly lineHeight: "40px";
            readonly fontWeight: "600";
            readonly fontFamily: "Space Grotesk Variable";
            readonly usage: "Section headers, secondary headings";
        };
        readonly h3: {
            readonly size: "24px";
            readonly lineHeight: "32px";
            readonly fontWeight: "600";
            readonly fontFamily: "Space Grotesk Variable";
            readonly usage: "Subsection headers";
        };
        readonly h4: {
            readonly size: "20px";
            readonly lineHeight: "28px";
            readonly fontWeight: "600";
            readonly fontFamily: "Space Grotesk Variable";
            readonly usage: "Card titles, minor headings";
        };
        readonly body: {
            readonly size: "16px";
            readonly lineHeight: "24px";
            readonly fontWeight: "400";
            readonly fontFamily: "Inter Variable";
            readonly usage: "Body text, paragraphs, default text";
        };
        readonly bodySmall: {
            readonly size: "14px";
            readonly lineHeight: "20px";
            readonly fontWeight: "400";
            readonly fontFamily: "Inter Variable";
            readonly usage: "Smaller body text, captions";
        };
        readonly caption: {
            readonly size: "12px";
            readonly lineHeight: "18px";
            readonly fontWeight: "400";
            readonly fontFamily: "Inter Variable";
            readonly usage: "Labels, metadata, micro-copy";
        };
        readonly button: {
            readonly size: "14px";
            readonly lineHeight: "20px";
            readonly fontWeight: "500";
            readonly fontFamily: "Inter Variable";
            readonly usage: "Button text, CTAs";
        };
        readonly code: {
            readonly size: "14px";
            readonly lineHeight: "20px";
            readonly fontWeight: "400";
            readonly fontFamily: "JetBrains Mono";
            readonly usage: "Code snippets, technical content";
        };
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
        readonly tight: "-0.025em";
        readonly normal: "0em";
        readonly wide: "0.025em";
    };
};
export declare const getFontSize: (key: keyof typeof typography.fontSize) => {
    fontSize: "12px" | "24px" | "64px" | "48px" | "32px" | "20px" | "16px" | "14px";
    lineHeight: "24px" | "72px" | "56px" | "32px" | "40px" | "20px" | "28px" | "18px";
    fontWeight: "400" | "500" | "600";
    fontFamily: "Inter Variable" | "Space Grotesk Variable" | "JetBrains Mono";
};
export declare const tailwindFontSizes: {
    readonly display: readonly ["64px", "72px"];
    readonly h1: readonly ["48px", "56px"];
    readonly h2: readonly ["32px", "40px"];
    readonly h3: readonly ["24px", "32px"];
    readonly h4: readonly ["20px", "28px"];
    readonly body: readonly ["16px", "24px"];
    readonly "body-sm": readonly ["14px", "20px"];
    readonly caption: readonly ["12px", "18px"];
    readonly button: readonly ["14px", "20px"];
    readonly code: readonly ["14px", "20px"];
};
export type FontSizeToken = keyof typeof typography.fontSize;
export type FontWeightToken = keyof typeof typography.fontWeight;
export type FontFamilyToken = keyof typeof typography.fontFamily;
export type LineHeightToken = keyof typeof typography.lineHeight;
export type LetterSpacingToken = keyof typeof typography.letterSpacing;
export declare const typographyUsage: {
    readonly headings: {
        readonly display: "Hero sections, landing pages, marketing headers";
        readonly h1: "Page titles, primary content headers";
        readonly h2: "Section headers, main content divisions";
        readonly h3: "Subsection headers, card titles";
        readonly h4: "Minor headings, component titles";
    };
    readonly body: {
        readonly primary: "Main content, articles, descriptions";
        readonly secondary: "Supporting content, metadata";
        readonly small: "Fine print, disclaimers, helper text";
    };
    readonly interface: {
        readonly button: "Button labels, navigation items";
        readonly caption: "Timestamps, metadata, small labels";
        readonly code: "Code blocks, technical documentation";
    };
};
export default typography;
//# sourceMappingURL=typography.d.ts.map