'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const inputEnhancedVariants = cva("flex w-full rounded-md border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--hive-text-placeholder)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)]",
            destructive: "border-[var(--hive-status-error)] focus-visible:ring-[var(--hive-status-error)]",
            success: "border-[var(--hive-status-success)] focus-visible:ring-[var(--hive-status-success)]",
            warning: "border-[var(--hive-status-warning)] focus-visible:ring-[var(--hive-status-warning)]",
        },
        size: {
            default: "h-10 px-3 py-2 text-sm",
            sm: "h-8 px-2 py-1 text-xs",
            lg: "h-12 px-4 py-3 text-base",
        },
        width: {
            auto: "w-auto",
            full: "w-full",
            fit: "w-fit",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        width: "full",
    },
});
const InputEnhanced = React.forwardRef(({ className, variant, size, width, type, label, description, error, helperText, leftIcon, rightIcon, onClear, showClearButton, value, disabled, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const hasValue = Boolean(value && String(value).length > 0);
    return (_jsxs("div", { className: "flex flex-col space-y-2", children: [label && (_jsx("label", { htmlFor: inputId, className: cn("text-sm font-medium leading-none text-[var(--hive-text-primary)]", disabled && "opacity-70"), children: label })), description && (_jsx("p", { className: "text-xs text-[var(--hive-text-secondary)]", children: description })), _jsxs("div", { className: "relative", children: [leftIcon && (_jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-secondary)]", children: leftIcon })), _jsx("input", { ref: ref, id: inputId, type: type, value: value, disabled: disabled, className: cn(inputEnhancedVariants({ variant, size, width }), leftIcon && "pl-10", (rightIcon || (showClearButton && hasValue)) && "pr-10", className), ...props }), (rightIcon || (showClearButton && hasValue && !disabled)) && (_jsxs("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1", children: [showClearButton && hasValue && !disabled && onClear && (_jsx("button", { type: "button", onClick: onClear, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] focus:outline-none", "aria-label": "Clear input", children: _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })), rightIcon && (_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: rightIcon }))] }))] }), (error || helperText) && (_jsx("p", { className: cn("text-xs", error
                    ? "text-[var(--hive-status-error)]"
                    : "text-[var(--hive-text-secondary)]"), children: error || helperText }))] }));
});
InputEnhanced.displayName = "InputEnhanced";
export { InputEnhanced, inputEnhancedVariants };
//# sourceMappingURL=input-enhanced.js.map