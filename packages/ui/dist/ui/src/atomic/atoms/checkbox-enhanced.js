'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
// HIVE Checkbox System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage
const checkboxVariants = cva(
// Base styles using semantic tokens only
"peer shrink-0 rounded border-2 border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--hive-brand-secondary)] data-[state=checked]:border-[var(--hive-brand-secondary)] data-[state=checked]:text-[var(--hive-text-inverse)]", {
    variants: {
        size: {
            sm: "h-4 w-4",
            default: "h-5 w-5",
            lg: "h-6 w-6",
            xl: "h-7 w-7",
        },
        variant: {
            default: "border-[var(--hive-border-default)] data-[state=checked]:bg-[var(--hive-brand-secondary)] data-[state=checked]:border-[var(--hive-brand-secondary)]",
            success: "border-[var(--hive-status-success)] data-[state=checked]:bg-[var(--hive-status-success)] data-[state=checked]:border-[var(--hive-status-success)]",
            error: "border-[var(--hive-status-error)] data-[state=checked]:bg-[var(--hive-status-error)] data-[state=checked]:border-[var(--hive-status-error)]",
            warning: "border-[var(--hive-status-warning)] data-[state=checked]:bg-[var(--hive-status-warning)] data-[state=checked]:border-[var(--hive-status-warning)]",
            info: "border-[var(--hive-status-info)] data-[state=checked]:bg-[var(--hive-status-info)] data-[state=checked]:border-[var(--hive-status-info)]",
        },
        radius: {
            none: "rounded-none",
            sm: "rounded-sm",
            default: "rounded",
            lg: "rounded-md",
            full: "rounded-full",
        }
    },
    defaultVariants: {
        size: "default",
        variant: "default",
        radius: "default",
    },
});
const checkboxLabelVariants = cva("text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
    variants: {
        color: {
            primary: "text-[var(--hive-text-primary)]",
            secondary: "text-[var(--hive-text-secondary)]",
            tertiary: "text-[var(--hive-text-tertiary)]",
            error: "text-[var(--hive-status-error)]",
            success: "text-[var(--hive-status-success)]",
            warning: "text-[var(--hive-status-warning)]",
            info: "text-[var(--hive-status-info)]",
        },
        weight: {
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
        }
    },
    defaultVariants: {
        color: "primary",
        weight: "normal",
    },
});
const Checkbox = React.forwardRef(({ className, size, variant, radius, label, description, error, required, indeterminate, labelProps, checked, id, ...props }, ref) => {
    const checkboxId = id || React.useId();
    const inputRef = React.useRef(null);
    // Handle indeterminate state
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate || false;
        }
    }, [indeterminate]);
    // Set ref function to handle both forwarded ref and internal ref
    const setRefs = React.useCallback((node) => {
        if (inputRef.current !== node) {
            inputRef.current = node;
        }
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
    }, [ref]);
    const checkboxElement = (_jsxs("div", { className: "relative flex items-center", children: [_jsx("input", { type: "checkbox", id: checkboxId, className: cn(checkboxVariants({ size, variant, radius }), className), ref: setRefs, checked: checked, "data-state": indeterminate ? "indeterminate" : checked ? "checked" : "unchecked", ...props }), (checked || indeterminate) && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: indeterminate ? (_jsx(IndeterminateIcon, { size: size })) : (_jsx(CheckIcon, { size: size })) }))] }));
    if (label || description || error) {
        return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [checkboxElement, _jsxs("div", { className: "flex-1 space-y-1", children: [label && (_jsxs("label", { htmlFor: checkboxId, className: cn(checkboxLabelVariants({
                                        color: labelProps?.color,
                                        weight: labelProps?.weight
                                    }), "cursor-pointer", labelProps?.className), ...(labelProps && Object.fromEntries(Object.entries(labelProps).filter(([key]) => !['color', 'weight', 'className'].includes(key)))), children: [label, required && (_jsx("span", { className: "ml-1 text-[var(--hive-status-error)]", children: "*" }))] })), description && (_jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)] leading-relaxed", children: description }))] })] }), error && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)] ml-8", children: error }))] }));
    }
    return checkboxElement;
});
Checkbox.displayName = "Checkbox";
const CheckboxGroup = React.forwardRef(({ className, orientation = "vertical", spacing = "md", label, description, error, required, children, ...props }, ref) => {
    const groupId = React.useId();
    const spacingClasses = {
        none: "",
        sm: orientation === "horizontal" ? "space-x-4" : "space-y-2",
        md: orientation === "horizontal" ? "space-x-6" : "space-y-3",
        lg: orientation === "horizontal" ? "space-x-8" : "space-y-4",
    };
    return (_jsxs("div", { className: "space-y-2", children: [label && (_jsxs("label", { htmlFor: groupId, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [label, required && (_jsx("span", { className: "ml-1 text-[var(--hive-status-error)]", children: "*" }))] })), description && (_jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)]", children: description })), _jsx("div", { ref: ref, id: groupId, className: cn("flex", orientation === "horizontal" ? "flex-row flex-wrap items-center" : "flex-col", spacingClasses[spacing], className), role: "group", "aria-labelledby": label ? groupId : undefined, ...props, children: children }), error && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)]", children: error }))] }));
});
CheckboxGroup.displayName = "CheckboxGroup";
const CheckboxCard = React.forwardRef(({ icon, badge, label, description, className, ...props }, ref) => {
    return (_jsx("label", { className: cn("relative flex cursor-pointer rounded-lg border-2 border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-4 transition-all duration-200 hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-interactive-hover)] has-[:checked]:border-[var(--hive-brand-secondary)] has-[:checked]:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]", className), children: _jsxs("div", { className: "flex items-start space-x-3 w-full", children: [_jsx(Checkbox, { ref: ref, className: "mt-0.5", ...props }), icon && (_jsx("div", { className: "flex-shrink-0 text-[var(--hive-text-secondary)]", children: icon })), _jsxs("div", { className: "flex-1 space-y-1", children: [label && (_jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: label })), description && (_jsx("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: description }))] }), badge && (_jsx("div", { className: "flex-shrink-0", children: badge }))] }) }));
});
CheckboxCard.displayName = "CheckboxCard";
// Checkbox presets for common patterns
export const CheckboxPresets = {
    // Terms & Conditions
    Terms: (props) => (_jsx(Checkbox, { label: "I agree to the Terms & Conditions", required: true, ...props })),
    // Newsletter Subscription
    Newsletter: (props) => (_jsx(Checkbox, { label: "Subscribe to newsletter", description: "Receive updates and special offers", ...props })),
    // Remember Me
    RememberMe: (props) => (_jsx(Checkbox, { label: "Remember me", size: "sm", ...props })),
    // Select All
    SelectAll: (props) => (_jsx(Checkbox, { label: "Select all", ...props })),
};
const CheckIcon = ({ size = "default" }) => {
    const iconSize = {
        sm: "w-3 h-3",
        default: "w-3.5 h-3.5",
        lg: "w-4 h-4",
        xl: "w-5 h-5",
    };
    return (_jsx("svg", { className: cn("text-current", iconSize[size || "default"]), viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M20 6L9 17l-5-5" }) }));
};
const IndeterminateIcon = ({ size = "default" }) => {
    const iconSize = {
        sm: "w-2.5 h-2.5",
        default: "w-3 h-3",
        lg: "w-3.5 h-3.5",
        xl: "w-4 h-4",
    };
    return (_jsx("div", { className: cn("bg-current rounded-sm", iconSize[size || "default"], "h-0.5") }));
};
export { Checkbox, CheckboxGroup, CheckboxCard, checkboxVariants };
//# sourceMappingURL=checkbox-enhanced.js.map