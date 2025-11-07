import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";
const linkVariants = cva("[font-family:var(--hive-font-family-sans,'Geist Sans',system-ui,sans-serif)] inline-flex items-center gap-2 leading-snug transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--hive-interactive-focus,#FACC15)] focus-visible:ring-offset-[var(--hive-background-primary)] underline-offset-[0.3em]", {
    variants: {
        tone: {
            brand: "text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/85",
            neutral: "text-[var(--hive-text-primary)] hover:text-[var(--hive-text-secondary)]",
            muted: "text-[var(--hive-text-muted)] hover:text-[var(--hive-text-secondary)]",
            inverse: "text-[var(--hive-text-inverse)] hover:text-[var(--hive-text-inverse)]/80",
            danger: "text-[var(--hive-status-error)] hover:text-[var(--hive-status-error)]/85",
        },
        size: {
            sm: "text-[var(--hive-font-size-body-sm)]",
            md: "text-[var(--hive-font-size-body-md)]",
            lg: "text-[var(--hive-font-size-body-lg)]",
        },
        weight: {
            regular: "font-[var(--hive-font-weight-normal,400)]",
            medium: "font-[var(--hive-font-weight-medium,500)]",
            semibold: "font-[var(--hive-font-weight-semibold,600)]",
        },
        underline: {
            hover: "hover:underline",
            always: "underline decoration-[color:currentColor] decoration-1",
            none: "no-underline",
        },
        subtle: {
            true: "opacity-80 hover:opacity-100",
        },
    },
    defaultVariants: {
        tone: "brand",
        size: "md",
        weight: "medium",
        underline: "hover",
    },
});
const iconSizeMap = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
};
const renderIcon = (icon, size, position) => {
    if (!icon)
        return null;
    const wrapper = "inline-flex items-center justify-center";
    const dimension = iconSizeMap[size];
    if (React.isValidElement(icon)) {
        return (_jsx("span", { "aria-hidden": true, className: wrapper, children: React.cloneElement(icon, {
                className: cn(dimension, icon.props.className),
                strokeWidth: icon.props.strokeWidth ?? 1.5,
            }) }));
    }
    return (_jsx("span", { "aria-hidden": true, className: cn(wrapper, dimension), children: icon }));
};
export const Link = React.forwardRef(({ className, children, tone, size, weight, underline, subtle, leadingIcon, trailingIcon, ...props }, ref) => {
    const iconSize = size ?? "md";
    return (_jsxs("a", { ref: ref, className: cn(linkVariants({
            tone,
            size,
            weight,
            underline,
            subtle,
        }), className), ...props, children: [renderIcon(leadingIcon, iconSize, "leading"), _jsx("span", { className: "whitespace-pre-wrap", children: children }), renderIcon(trailingIcon, iconSize, "trailing")] }));
});
Link.displayName = "Link";
export { linkVariants };
//# sourceMappingURL=link.js.map