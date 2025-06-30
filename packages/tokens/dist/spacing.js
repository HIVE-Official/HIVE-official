// HIVE Brand System v1.0 - Spacing System (CORRECTED)
// Aligns with 8dp grid system from /memory-bank/design-checklist.md
export const spacing = {
    // 8dp Grid System (1 unit = 8px)
    "0": "0px", // 0 units
    "1": "8px", // 1 unit
    "2": "16px", // 2 units
    "3": "24px", // 3 units
    "4": "32px", // 4 units
    "5": "40px", // 5 units
    "6": "48px", // 6 units
    "7": "56px", // 7 units
    "8": "64px", // 8 units
    "9": "72px", // 9 units
    "10": "80px", // 10 units
    // Legacy aliases for backward compatibility and semantic clarity
    xs: "8px", // 1 unit
    sm: "16px", // 2 units
    md: "24px", // 3 units
    lg: "32px", // 4 units
    xl: "48px", // 6 units
};
// Utility for creating Tailwind-compatible spacing scale
export const getTailwindSpacing = () => {
    return { ...spacing };
};
// Spacing usage guidelines
export const spacingUsage = {
    rules: [
        "All component margins and paddings must use the 8dp grid system.",
        "Use numeric tokens (e.g., p-2, m-4) for clarity.",
        "Avoid one-off spacing values.",
        "Layout components should provide spacing props (e.g., <Stack gap={2}>).",
    ],
    componentSpacing: {
        padding: "Use tokens 2, 3, or 4 for internal component padding.",
        margin: "Use tokens 2, 4, or 6 for spacing between components.",
        gap: "Use tokens 1, 2, or 3 for gaps in flex/grid layouts.",
    },
};
export default spacing;
//# sourceMappingURL=spacing.js.map