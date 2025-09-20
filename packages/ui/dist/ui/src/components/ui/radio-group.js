'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
// HIVE Radio System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage
const radioVariants = cva(
// Hidden native input
"peer sr-only");
const radioIndicatorVariants = cva(
// Custom radio button styling
"relative flex items-center justify-center aspect-square shrink-0 rounded-full border-2 bg-[var(--hive-background-secondary)] transition-all duration-200 cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 hover:border-[var(--hive-brand-secondary)] peer-checked:border-[var(--hive-brand-secondary)] peer-checked:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]", {
    variants: {
        size: {
            sm: "h-4 w-4",
            default: "h-5 w-5",
            lg: "h-6 w-6",
            xl: "h-7 w-7",
        },
        variant: {
            default: "border-[var(--hive-border-default)] peer-checked:border-[var(--hive-brand-secondary)]",
            success: "border-[var(--hive-status-success)] peer-checked:border-[var(--hive-status-success)]",
            error: "border-[var(--hive-status-error)] peer-checked:border-[var(--hive-status-error)]",
            warning: "border-[var(--hive-status-warning)] peer-checked:border-[var(--hive-status-warning)]",
            info: "border-[var(--hive-status-info)] peer-checked:border-[var(--hive-status-info)]",
        }
    },
    defaultVariants: {
        size: "default",
        variant: "default",
    },
});
const radioLabelVariants = cva("text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
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
const Radio = React.forwardRef(({ className, size, variant, label, description, error, labelProps, checked, id, ...props }, ref) => {
    const radioId = id || React.useId();
    const radioElement = (_jsxs("div", { className: "relative flex items-center", children: [_jsx("input", { type: "radio", id: radioId, className: cn(radioVariants(), className), ref: ref, checked: checked, ...props }), _jsx("div", { className: cn(radioIndicatorVariants({ size, variant })), children: _jsx("div", { className: cn("rounded-full transition-all duration-200", checked ? "opacity-100 scale-100" : "opacity-0 scale-0", 
                    // Size based on parent
                    size === "sm" && "h-1.5 w-1.5", size === "default" && "h-2 w-2", size === "lg" && "h-2.5 w-2.5", size === "xl" && "h-3 w-3", 
                    // Color based on variant
                    variant === "default" && "bg-[var(--hive-brand-secondary)]", variant === "success" && "bg-[var(--hive-status-success)]", variant === "error" && "bg-[var(--hive-status-error)]", variant === "warning" && "bg-[var(--hive-status-warning)]", variant === "info" && "bg-[var(--hive-status-info)]") }) })] }));
    if (label || description || error) {
        return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [radioElement, _jsxs("div", { className: "flex-1 space-y-1", children: [label && (_jsx("label", { htmlFor: radioId, className: cn(radioLabelVariants({
                                        color: labelProps?.color,
                                        weight: labelProps?.weight
                                    }), "cursor-pointer", labelProps?.className), ...(labelProps && Object.fromEntries(Object.entries(labelProps).filter(([key]) => !['color', 'weight', 'className'].includes(key)))), children: label })), description && (_jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)] leading-relaxed", children: description }))] })] }), error && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)] ml-8", children: error }))] }));
    }
    return radioElement;
});
Radio.displayName = "Radio";
const RadioGroup = React.forwardRef(({ className, name, value, onChange, orientation = "vertical", spacing = "md", label, description, error, required, disabled, children, ...props }, ref) => {
    const groupId = React.useId();
    const spacingClasses = {
        none: "",
        sm: orientation === "horizontal" ? "space-x-4" : "space-y-2",
        md: orientation === "horizontal" ? "space-x-6" : "space-y-3",
        lg: orientation === "horizontal" ? "space-x-8" : "space-y-4",
    };
    // Handle radio change
    const handleRadioChange = (radioValue) => {
        onChange?.(radioValue);
    };
    // Clone children and add necessary props
    const radioChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Radio) {
            return React.cloneElement(child, {
                name,
                checked: child.props.value === value,
                onChange: () => handleRadioChange(child.props.value),
                disabled: disabled || child.props.disabled,
            });
        }
    });
});
return child;
;
return (_jsxs("div", { className: "space-y-2", children: [label && (_jsxs("label", { htmlFor: groupId, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [label, required && (_jsx("span", { className: "ml-1 text-[var(--hive-status-error)]", children: "*" }))] })), description && (_jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)]", children: description })), _jsx("div", { ref: ref, id: groupId, className: cn("flex", orientation === "horizontal" ? "flex-row flex-wrap items-center" : "flex-col", spacingClasses[spacing], className), role: "radiogroup", "aria-labelledby": label ? groupId : undefined, "aria-required": required, ...props, children: radioChildren }), error && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)]", children: error }))] }));
;
RadioGroup.displayName = "RadioGroup";
const RadioCard = React.forwardRef(({ icon, badge, label, description, value, className, ...props }, ref) => {
    const radioId = React.useId();
    return (_jsx("label", { htmlFor: radioId, className: cn("relative flex cursor-pointer rounded-lg border-2 border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-4 transition-all duration-200 hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-interactive-hover)] has-[:checked]:border-[var(--hive-brand-secondary)] has-[:checked]:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]", className), children: _jsxs("div", { className: "flex items-start space-x-3 w-full", children: [_jsx(Radio, { ref: ref, id: radioId, className: "mt-0.5", value: value, ...props }), icon && (_jsx("div", { className: "flex-shrink-0 text-[var(--hive-text-secondary)]", children: icon })), _jsxs("div", { className: "flex-1 space-y-1", children: [label && (_jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: label })), description && (_jsx("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: description }))] }), badge && (_jsx("div", { className: "flex-shrink-0", children: badge }))] }) }));
});
RadioCard.displayName = "RadioCard";
// Radio presets for common patterns
export const RadioPresets = {
    // Payment Method
    PaymentMethod: ({ options, ...props }) => (_jsx(RadioGroup, { ...props, children: options.map((option) => (_jsx(RadioCard, { value: option.value, label: option.label, icon: option.icon }, option.value))) })),
    // Priority Level
    Priority: (props) => (_jsxs(RadioGroup, { ...props, children: [_jsx(Radio, { value: "low", label: "Low Priority" }), _jsx(Radio, { value: "medium", label: "Medium Priority" }), _jsx(Radio, { value: "high", label: "High Priority" }), _jsx(Radio, { value: "urgent", label: "Urgent" })] })),
    // Size Selection
    Size: (props) => (_jsxs(RadioGroup, { orientation: "horizontal", ...props, children: [_jsx(Radio, { value: "xs", label: "XS" }), _jsx(Radio, { value: "sm", label: "SM" }), _jsx(Radio, { value: "md", label: "MD" }), _jsx(Radio, { value: "lg", label: "LG" }), _jsx(Radio, { value: "xl", label: "XL" })] })),
    // Theme Selection
    Theme: (props) => (_jsxs(RadioGroup, { ...props, children: [_jsx(Radio, { value: "light", label: "Light Theme", description: "Clean and bright interface" }), _jsx(Radio, { value: "dark", label: "Dark Theme", description: "Easy on the eyes" }), _jsx(Radio, { value: "auto", label: "Auto", description: "Matches system preference" })] })),
};
export { Radio, RadioGroup, RadioCard, radioVariants, radioIndicatorVariants };
//# sourceMappingURL=radio-group.js.map