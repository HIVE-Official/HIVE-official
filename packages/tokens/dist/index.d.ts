export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./motion";
export { default as colors } from "./colors";
export { default as typography } from "./typography";
export { default as motion } from "./motion";
export type { ColorToken, } from "./colors";
export type { FontSizeToken, FontWeightToken, FontFamilyToken, LineHeightToken, LetterSpacingToken, } from "./typography";
export type { MotionDuration, MotionEasing, MotionScale, MotionKeyframes, MotionAnimation, } from "./motion";
export type { SpacingToken } from "./spacing";
export declare const designTokens: {
    readonly colors: {
        readonly bg: {
            readonly canvas: "#0A0A0A";
            readonly card: "rgba(255, 255, 255, 0.02)";
        };
        readonly accent: {
            readonly gold: "#FFD700";
            readonly "gold-hover": "#FFE255";
        };
        readonly text: {
            readonly primary: "#FFFFFF";
            readonly muted: "#A1A1AA";
        };
        readonly error: "#FF5555";
        readonly success: "#22C55E";
        readonly warning: "#F59E0B";
    };
    readonly spacing: {
        readonly "0": "0";
        readonly "1": "4px";
        readonly "2": "8px";
        readonly "3": "12px";
        readonly "4": "16px";
        readonly "5": "20px";
        readonly "6": "24px";
        readonly "8": "32px";
        readonly "10": "40px";
        readonly "12": "48px";
        readonly "16": "64px";
        readonly "20": "80px";
        readonly "24": "96px";
    };
    readonly typography: {
        readonly fontFamily: {
            readonly sans: readonly ["Inter", "system-ui", "sans-serif"];
            readonly display: readonly ["Space Grotesk", "system-ui", "sans-serif"];
            readonly mono: readonly ["JetBrains Mono", "Consolas", "Monaco", "monospace"];
        };
        readonly fontSize: {
            readonly display: readonly ["48px", "56px"];
            readonly h1: readonly ["32px", "40px"];
            readonly h2: readonly ["24px", "32px"];
            readonly h3: readonly ["20px", "28px"];
            readonly h4: readonly ["18px", "26px"];
            readonly body: readonly ["16px", "24px"];
            readonly "body-sm": readonly ["14px", "20px"];
            readonly caption: readonly ["12px", "18px"];
            readonly button: readonly ["14px", "20px"];
            readonly code: readonly ["14px", "20px"];
        };
    };
    readonly motion: {
        readonly duration: {
            readonly instant: "90ms";
            readonly fast: "150ms";
            readonly base: "200ms";
            readonly slow: "350ms";
            readonly slower: "500ms";
        };
        readonly easing: {
            readonly spring: "cubic-bezier(0.33, 0.65, 0, 1)";
            readonly smooth: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        };
    };
};
//# sourceMappingURL=index.d.ts.map