import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";
const levelStyles = {
    1: "text-[var(--hive-font-size-display-lg)] leading-[var(--hive-line-height-tight)]",
    2: "text-[var(--hive-font-size-display-md)] leading-[var(--hive-line-height-tight)]",
    3: "text-[var(--hive-font-size-display-sm)] leading-[var(--hive-line-height-tight)]",
    4: "text-[var(--hive-font-size-heading-xl)] leading-[var(--hive-line-height-snug)]",
    5: "text-[var(--hive-font-size-heading-lg)] leading-[var(--hive-line-height-normal)]",
    6: "text-[var(--hive-font-size-heading-md)] leading-[var(--hive-line-height-normal)]",
};
const headingVariants = cva("[font-family:var(--hive-font-family-sans,'Geist Sans',system-ui,sans-serif)] antialiased tracking-tight text-[var(--hive-text-primary)]", {
    variants: {
        tone: {
            primary: "text-[var(--hive-text-primary)]",
            secondary: "text-[var(--hive-text-secondary)]",
            muted: "text-[var(--hive-text-muted)]",
            inverse: "text-[var(--hive-text-inverse)]",
            accent: "text-[var(--hive-brand-primary)]",
        },
        align: {
            start: "text-left",
            center: "text-center",
            end: "text-right",
        },
        weight: {
            medium: "font-[var(--hive-font-weight-medium,500)]",
            semibold: "font-[var(--hive-font-weight-semibold,600)]",
            bold: "font-[var(--hive-font-weight-bold,700)]",
        },
        uppercase: {
            true: "uppercase tracking-[0.18em]",
        },
    },
    defaultVariants: {
        tone: "primary",
        align: "start",
        weight: "semibold",
    },
});
export const Heading = React.forwardRef(({ className, level = 2, children, tone, align, weight, uppercase, ...props }, ref) => {
    const Component = `h${level}`;
    const defaultWeight = weight ?? (level <= 3 ? "semibold" : "medium");
    return (_jsx(Component, { ref: ref, className: cn(levelStyles[level], headingVariants({
            tone,
            align,
            weight: defaultWeight,
            uppercase,
        }), className), ...props, children: children }));
});
Heading.displayName = "Heading";
export { headingVariants };
//# sourceMappingURL=heading.js.map