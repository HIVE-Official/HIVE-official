// HIVE Design System - Main Tokens Export
// Centralized access to all design tokens
// Core design tokens
export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./motion";
// Default exports for easy importing
export { default as colors } from "./colors";
export { default as typography } from "./typography";
export { default as motion } from "./motion";
// Consolidated design system object
export const designTokens = {
    colors: {
        bg: {
            canvas: "#0A0A0A",
            card: "rgba(255, 255, 255, 0.02)",
        },
        accent: {
            gold: "#FFD700",
            "gold-hover": "#FFE255",
        },
        text: {
            primary: "#FFFFFF",
            muted: "#A1A1AA",
        },
        error: "#FF5555",
        success: "#22C55E",
        warning: "#F59E0B",
    },
    spacing: {
        "0": "0",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
    },
    typography: {
        fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
            display: ["Space Grotesk", "system-ui", "sans-serif"],
            mono: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
        },
        fontSize: {
            display: ["48px", "56px"],
            h1: ["32px", "40px"],
            h2: ["24px", "32px"],
            h3: ["20px", "28px"],
            h4: ["18px", "26px"],
            body: ["16px", "24px"],
            "body-sm": ["14px", "20px"],
            caption: ["12px", "18px"],
            button: ["14px", "20px"],
            code: ["14px", "20px"],
        },
    },
    motion: {
        duration: {
            instant: "90ms",
            fast: "150ms",
            base: "200ms",
            slow: "350ms",
            slower: "500ms",
        },
        easing: {
            spring: "cubic-bezier(0.33, 0.65, 0, 1)",
            smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
            bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        },
    },
};
//# sourceMappingURL=index.js.map