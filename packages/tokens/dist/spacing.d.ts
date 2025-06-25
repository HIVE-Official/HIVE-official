export declare const spacing: {
    readonly "0": "0px";
    readonly "1": "8px";
    readonly "2": "16px";
    readonly "3": "24px";
    readonly "4": "32px";
    readonly "5": "40px";
    readonly "6": "48px";
    readonly "7": "56px";
    readonly "8": "64px";
    readonly "9": "72px";
    readonly "10": "80px";
    readonly xs: "8px";
    readonly sm: "16px";
    readonly md: "24px";
    readonly lg: "32px";
    readonly xl: "48px";
};
export declare const getTailwindSpacing: () => {
    "0": "0px";
    "1": "8px";
    "2": "16px";
    "3": "24px";
    "4": "32px";
    "5": "40px";
    "6": "48px";
    "7": "56px";
    "8": "64px";
    "9": "72px";
    "10": "80px";
    xs: "8px";
    sm: "16px";
    md: "24px";
    lg: "32px";
    xl: "48px";
};
export type SpacingToken = keyof typeof spacing;
export declare const spacingUsage: {
    readonly rules: readonly ["All component margins and paddings must use the 8dp grid system.", "Use numeric tokens (e.g., p-2, m-4) for clarity.", "Avoid one-off spacing values.", "Layout components should provide spacing props (e.g., <Stack gap={2}>)."];
    readonly componentSpacing: {
        readonly padding: "Use tokens 2, 3, or 4 for internal component padding.";
        readonly margin: "Use tokens 2, 4, or 6 for spacing between components.";
        readonly gap: "Use tokens 1, 2, or 3 for gaps in flex/grid layouts.";
    };
};
export default spacing;
//# sourceMappingURL=spacing.d.ts.map