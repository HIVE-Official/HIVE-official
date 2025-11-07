import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[background,transform,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)] disabled:pointer-events-none disabled:opacity-40 border border-transparent", {
    variants: {
        variant: {
            default: "bg-[var(--hive-text-primary)] text-[var(--hive-background-primary)] hover:bg-[color-mix(in_srgb,var(--hive-text-primary) 88%,transparent)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] active:translate-y-[1px]",
            primary: "bg-[var(--hive-text-primary)] text-[var(--hive-background-primary)] hover:bg-[color-mix(in_srgb,var(--hive-text-primary) 88%,transparent)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] active:translate-y-[1px]",
            secondary: "border border-[var(--hive-border-default)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 70%,transparent)] text-[var(--hive-text-primary)] hover:border-[color-mix(in_srgb,var(--hive-brand-primary) 35%,var(--hive-border-primary))] hover:bg-[color-mix(in_srgb,var(--hive-background-tertiary) 35%,transparent)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] active:translate-y-[1px]",
            outline: "border border-[var(--hive-border-strong,#262b3d)] bg-transparent text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]",
            ghost: "bg-transparent text-[var(--hive-text-primary)] hover:bg-[color-mix(in_srgb,var(--hive-background-tertiary) 25%,transparent)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)] active:bg-[color-mix(in_srgb,var(--hive-background-tertiary) 45%,transparent)]",
            destructive: "bg-[var(--hive-status-error)] text-[var(--hive-background-primary)] hover:bg-[color-mix(in_srgb,var(--hive-status-error) 85%,transparent)] active:translate-y-[1px]",
            link: "bg-transparent px-0 text-[var(--hive-brand-primary)] underline-offset-[0.3em] hover:underline",
            brand: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] text-[var(--hive-brand-primary-text)] hover:from-[var(--hive-brand-primary)]/90 hover:to-[var(--hive-brand-secondary)]/90 shadow-lg hover:shadow-xl transition-shadow",
            success: "bg-[var(--hive-status-success)] text-[var(--hive-status-success-text)] hover:bg-[var(--hive-status-success)]/90",
            warning: "bg-[var(--hive-status-warning)] text-[var(--hive-status-warning-text)] hover:bg-[var(--hive-status-warning)]/90",
        },
        size: {
            sm: "h-9 min-h-[40px] px-3 text-sm",
            md: "h-11 min-h-[44px] px-4 text-sm",
            lg: "h-12 min-h-[48px] px-6 text-base",
            xl: "h-12 min-h-[52px] px-8 text-base",
            icon: "h-11 w-11 min-h-[44px] min-w-[44px] p-0",
            default: "h-10 min-h-[44px] px-4 text-sm",
        },
        loading: {
            true: "cursor-progress",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});
const iconSizeMap = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
    xl: "h-5 w-5",
    icon: "h-4.5 w-4.5",
    default: "h-4 w-4",
};
const renderIcon = (icon, size) => {
    if (!icon)
        return null;
    const dimension = iconSizeMap[size];
    if (React.isValidElement(icon)) {
        return (_jsx("span", { "aria-hidden": true, className: "inline-flex items-center justify-center", children: React.cloneElement(icon, {
                className: cn(dimension, icon.props.className),
                strokeWidth: icon.props.strokeWidth ?? 1.6,
            }) }));
    }
    return (_jsx("span", { "aria-hidden": true, className: cn("inline-flex items-center justify-center", dimension), children: icon }));
};
const LoadingSpinner = ({ color }) => (_jsx("span", { className: "inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent", "aria-hidden": true, style: { color } }));
const Button = React.forwardRef(({ className, variant, size = "md", asChild = false, leadingIcon, trailingIcon, leftIcon, rightIcon, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const resolvedVariant = variant === undefined
        ? undefined
        : variant === "default"
            ? "default"
            : variant;
    const resolvedSizeProp = size ?? "md";
    const resolvedSize = resolvedSizeProp === "default"
        ? "default"
        : resolvedSizeProp;
    const mergedLeadingIcon = leadingIcon ?? leftIcon;
    const mergedTrailingIcon = trailingIcon ?? rightIcon;
    const isIconOnly = !children && (mergedLeadingIcon || mergedTrailingIcon);
    const computedSize = (isIconOnly ? "icon" : resolvedSize) ?? "md";
    const spinnerColor = resolvedVariant === "primary" ||
        resolvedVariant === "default" ||
        resolvedVariant === "destructive" ||
        resolvedVariant === "brand"
        ? "var(--hive-background-primary)"
        : "var(--hive-text-primary)";
    return (_jsx(Comp, { className: cn(buttonVariants({
            variant: resolvedVariant,
            size: computedSize,
            loading: loading ? true : undefined,
        }), className), ref: ref, disabled: disabled || loading, "aria-busy": loading, ...props, children: loading ? (_jsx(LoadingSpinner, { color: spinnerColor })) : (_jsxs(_Fragment, { children: [renderIcon(mergedLeadingIcon, computedSize), children ? _jsx("span", { className: "whitespace-nowrap", children: children }) : null, renderIcon(mergedTrailingIcon, computedSize)] })) }));
});
Button.displayName = "Button";
export { Button, buttonVariants };
//# sourceMappingURL=button.js.map