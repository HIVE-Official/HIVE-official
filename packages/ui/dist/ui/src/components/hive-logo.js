"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
// HIVE Logo Component - Hexagon-bee glyph + wordmark based on brand guidelines
// Following darkLuxury color system and design specifications
const hiveLogoVariants = cva("flex items-center font-bold transition-all duration-200", {
    variants: {
        variant: {
            primary: "text-[var(--hive-text-primary)]",
            inverted: "text-[var(--hive-background-primary)]",
            gold: "text-[var(--hive-color-gold)]",
            monochrome: "text-current",
        },
        size: {
            xs: "text-sm space-x-2",
            sm: "text-base space-x-2",
            md: "text-lg space-x-3",
            lg: "text-xl space-x-3",
            xl: "text-2xl space-x-4",
            "2xl": "text-3xl space-x-4",
        },
        layout: {
            horizontal: "flex-row",
            vertical: "flex-col space-y-1 space-x-0",
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
        layout: "horizontal",
    },
});
const glyphSizes = {
    xs: "w-4 h-4",
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
    "2xl": "w-12 h-12",
};
// Official HIVE Logo SVG glyph - inline SVG for reliable display
const HiveGlyph = ({ size = "md", variant = "primary", className }) => {
    const glyphColor = variant === "inverted" ? "var(--hive-background-primary)"
        : variant === "gold" ? "var(--hive-brand-secondary)"
            : variant === "monochrome" ? "currentColor"
                : "var(--hive-text-primary)";
    return (_jsx("svg", { className: cn(glyphSizes[size], className), viewBox: "0 0 1500 1500", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-label": "HIVE logo", children: _jsx("path", { d: "M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z", fill: glyphColor }) }));
};
export const HiveLogo = React.forwardRef(({ className, variant, size, layout, showWordmark = true, interactive = false, ...props }, ref) => {
    if (interactive) {
        return (_jsxs("button", { ref: ref, className: cn(hiveLogoVariants({ variant, size, layout, className }), "cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--hive-color-gold)]/50 rounded-lg p-1"), ...props, children: [_jsx(HiveGlyph, { size: size || "md", variant: variant || "primary" }), showWordmark && (_jsx("span", { className: cn("font-bold tracking-wide select-none", layout === "vertical" && "text-center"), children: "HIVE" }))] }));
    }
    return (_jsxs("div", { ref: ref, className: cn(hiveLogoVariants({ variant, size, layout, className })), ...props, children: [_jsx(HiveGlyph, { size: size || "md", variant: variant || "primary" }), showWordmark && (_jsx("span", { className: cn("font-bold tracking-wide select-none", layout === "vertical" && "text-center"), children: "HIVE" }))] }));
});
HiveLogo.displayName = "HiveLogo";
// Convenience exports for common use cases
export const HiveGlyphOnly = ({ size = "md", variant = "primary", className, ...props }) => (_jsx(HiveLogo, { showWordmark: false, size: size, variant: variant, className: className, ...props }));
export const HiveLogoInteractive = (props) => (_jsx(HiveLogo, { interactive: true, ...props }));
//# sourceMappingURL=hive-logo.js.map