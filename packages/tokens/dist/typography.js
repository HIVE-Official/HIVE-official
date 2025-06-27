// HIVE Design System - Typography Tokens
// Font stack: Space Grotesk for headlines, Geist for body (S-tier Vercel feel)
export const typography = {
    // Font families - UPDATED for S-tier premium feel with Geist
    fontFamily: {
        sans: ["Geist", "Inter Variable", "Inter", "system-ui", "sans-serif"],
        display: [
            "Space Grotesk Variable",
            "Space Grotesk",
            "system-ui",
            "sans-serif",
        ],
        mono: ["Geist Mono", "JetBrains Mono", "Consolas", "Monaco", "monospace"],
    },
    // Font weights
    fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
    },
    // Type scale - aligned with Geist for premium feel
    fontSize: {
        // Display sizes - Space Grotesk Variable
        display: {
            size: "64px",
            lineHeight: "72px",
            fontWeight: "600",
            fontFamily: "Space Grotesk Variable",
            usage: "Hero headlines, marketing pages",
        },
        // Heading hierarchy - Space Grotesk Variable
        h1: {
            size: "48px",
            lineHeight: "56px",
            fontWeight: "600",
            fontFamily: "Space Grotesk Variable",
            usage: "Page titles, primary headings",
        },
        h2: {
            size: "32px",
            lineHeight: "40px",
            fontWeight: "600",
            fontFamily: "Space Grotesk Variable",
            usage: "Section headers, secondary headings",
        },
        h3: {
            size: "24px",
            lineHeight: "32px",
            fontWeight: "600",
            fontFamily: "Space Grotesk Variable",
            usage: "Subsection headers",
        },
        h4: {
            size: "20px",
            lineHeight: "28px",
            fontWeight: "600",
            fontFamily: "Space Grotesk Variable",
            usage: "Card titles, minor headings",
        },
        // Body text - Geist (S-tier premium)
        body: {
            size: "16px",
            lineHeight: "24px",
            fontWeight: "400",
            fontFamily: "Geist",
            usage: "Body text, paragraphs, default text",
        },
        bodySmall: {
            size: "14px",
            lineHeight: "20px",
            fontWeight: "400",
            fontFamily: "Geist",
            usage: "Smaller body text, captions",
        },
        // UI text - Geist (S-tier premium)
        caption: {
            size: "12px",
            lineHeight: "18px",
            fontWeight: "400",
            fontFamily: "Geist",
            usage: "Labels, metadata, micro-copy",
        },
        button: {
            size: "14px",
            lineHeight: "20px",
            fontWeight: "500",
            fontFamily: "Geist",
            usage: "Button text, CTAs",
        },
        // Code text - Geist Mono (S-tier premium)
        code: {
            size: "14px",
            lineHeight: "20px",
            fontWeight: "400",
            fontFamily: "Geist Mono",
            usage: "Code snippets, technical content",
        },
    },
    // Line height scale
    lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
    },
    // Letter spacing values
    letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
    },
};
// Utility function to get font size with line height
export const getFontSize = (key) => {
    const font = typography.fontSize[key];
    return {
        fontSize: font.size,
        lineHeight: font.lineHeight,
        fontWeight: font.fontWeight,
        fontFamily: font.fontFamily,
    };
};
// Tailwind-compatible font size configuration
export const tailwindFontSizes = {
    display: ["64px", "72px"],
    h1: ["48px", "56px"],
    h2: ["32px", "40px"],
    h3: ["24px", "32px"],
    h4: ["20px", "28px"],
    body: ["16px", "24px"],
    "body-sm": ["14px", "20px"],
    caption: ["12px", "18px"],
    button: ["14px", "20px"],
    code: ["14px", "20px"],
};
// Typography usage guidelines
export const typographyUsage = {
    // Heading hierarchy
    headings: {
        display: "Hero sections, landing pages, marketing headers",
        h1: "Page titles, primary content headers",
        h2: "Section headers, main content divisions",
        h3: "Subsection headers, card titles",
        h4: "Minor headings, component titles",
    },
    // Body text guidelines
    body: {
        primary: "Main content, articles, descriptions",
        secondary: "Supporting content, metadata",
        small: "Fine print, disclaimers, helper text",
    },
    // UI text guidelines
    interface: {
        button: "Button labels, navigation items",
        caption: "Timestamps, metadata, small labels",
        code: "Code blocks, technical documentation",
    },
};
// Export for easy importing
export default typography;
