import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";
const captionVariants = cva("[font-family:var(--hive-font-family-sans,'Geist Sans',system-ui,sans-serif)] uppercase tracking-[0.22em] text-[var(--hive-text-muted)] antialiased", {
    variants: {
        tone: {
            primary: "text-[var(--hive-text-primary)]",
            muted: "text-[var(--hive-text-muted)]",
            inverse: "text-[var(--hive-text-inverse)]",
            accent: "text-[var(--hive-brand-primary)]",
        },
        size: {
            xs: "text-[var(--hive-font-size-body-2xs)]",
            sm: "text-[var(--hive-font-size-body-xs)]",
        },
        weight: {
            medium: "font-[var(--hive-font-weight-medium,500)]",
            semibold: "font-[var(--hive-font-weight-semibold,600)]",
        },
        align: {
            start: "text-left",
            center: "text-center",
            end: "text-right",
        },
    },
    defaultVariants: {
        tone: "muted",
        size: "sm",
        weight: "medium",
        align: "start",
    },
});
export const Caption = React.forwardRef(({ className, tone, size, weight, align, ...props }, ref) => (_jsx("span", { ref: ref, className: cn(captionVariants({
        tone,
        size,
        weight,
        align,
    }), className), ...props })));
Caption.displayName = "Caption";
export { captionVariants };
//# sourceMappingURL=caption.js.map