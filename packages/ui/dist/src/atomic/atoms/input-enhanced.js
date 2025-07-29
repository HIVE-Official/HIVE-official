'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
// HIVE Input System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage
const inputVariants = cva(
// Base styles using semantic tokens only
"flex w-full rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:border-[var(--hive-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)] focus:border-[var(--hive-brand-secondary)]",
            error: "border-[var(--hive-status-error)] focus:border-[var(--hive-status-error)] focus:ring-[color-mix(in_srgb,var(--hive-status-error)_30%,transparent)]",
            success: "border-[var(--hive-status-success)] focus:border-[var(--hive-status-success)] focus:ring-[color-mix(in_srgb,var(--hive-status-success)_30%,transparent)]",
            warning: "border-[var(--hive-status-warning)] focus:border-[var(--hive-status-warning)] focus:ring-[color-mix(in_srgb,var(--hive-status-warning)_30%,transparent)]",
            brand: "border-[var(--hive-brand-secondary)] focus:border-[var(--hive-brand-secondary)]",
        },
        size: {
            sm: "h-8 px-2 text-xs",
            default: "h-10 px-3 text-sm",
            lg: "h-12 px-4 text-base",
            xl: "h-14 px-5 text-lg",
        },
        radius: {
            none: "rounded-none",
            sm: "rounded-sm",
            default: "rounded-lg",
            lg: "rounded-xl",
            full: "rounded-full",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        radius: "default",
    },
});
const Input = React.forwardRef(({ className, variant, size, radius, leftIcon, rightIcon, leftElement, rightElement, error, success, helperText, label, required, id, ...htmlProps }, ref) => {
    // Filter out any conflicting HTML size attribute
    const { size: _htmlSize, ...props } = htmlProps;
    const inputId = id || React.useId();
    const hasLeftElement = leftIcon || leftElement;
    const hasRightElement = rightIcon || rightElement;
    // Determine variant based on state
    const computedVariant = error ? "error" : success ? "success" : variant;
    const inputElement = (_jsx("input", { id: inputId, className: cn(inputVariants({ variant: computedVariant, size, radius }), hasLeftElement && "pl-10", hasRightElement && "pr-10", className), ref: ref, ...props }));
    const wrapperElement = hasLeftElement || hasRightElement ? (_jsxs("div", { className: "relative", children: [(leftIcon || leftElement) && (_jsxs("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[var(--hive-text-tertiary)]", children: [leftIcon && (_jsx("span", { className: "flex h-4 w-4 items-center justify-center", children: leftIcon })), leftElement] })), inputElement, (rightIcon || rightElement) && (_jsxs("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-[var(--hive-text-tertiary)]", children: [rightIcon && (_jsx("span", { className: "flex h-4 w-4 items-center justify-center", children: rightIcon })), rightElement] }))] })) : inputElement;
    if (label || error || success || helperText) {
        return (_jsxs("div", { className: "space-y-2", children: [label && (_jsxs("label", { htmlFor: inputId, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [label, required && (_jsx("span", { className: "ml-1 text-[var(--hive-status-error)]", children: "*" }))] })), wrapperElement, (error || success || helperText) && (_jsx("p", { className: cn("text-xs", error && "text-[var(--hive-status-error)]", success && "text-[var(--hive-status-success)]", !error && !success && "text-[var(--hive-text-tertiary)]"), children: error || success || helperText }))] }));
    }
    return wrapperElement;
});
Input.displayName = "Input";
const SearchInput = React.forwardRef(({ onClear, showClearButton = true, value, ...props }, ref) => {
    const hasValue = Boolean(value);
    return (_jsx(Input, { ref: ref, type: "search", value: value, leftIcon: _jsx(SearchIcon, {}), rightElement: showClearButton && hasValue && onClear ? (_jsx("button", { type: "button", onClick: onClear, className: "flex h-4 w-4 items-center justify-center rounded-full hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", "aria-label": "Clear search", children: _jsx(ClearIcon, {}) })) : undefined, ...props }));
});
SearchInput.displayName = "SearchInput";
const PasswordInput = React.forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (_jsx(Input, { ref: ref, type: showPassword ? "text" : "password", rightElement: _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "flex h-4 w-4 items-center justify-center text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", "aria-label": showPassword ? "Hide password" : "Show password", children: showPassword ? _jsx(EyeOffIcon, {}) : _jsx(EyeIcon, {}) }), ...props }));
});
PasswordInput.displayName = "PasswordInput";
const NumberInput = React.forwardRef(({ min, max, step = 1, onIncrement, onDecrement, showControls = true, ...props }, ref) => {
    return (_jsx(Input, { ref: ref, type: "number", min: min, max: max, step: step, rightElement: showControls ? (_jsxs("div", { className: "flex flex-col", children: [_jsx("button", { type: "button", onClick: onIncrement, className: "flex h-3 w-4 items-center justify-center text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", "aria-label": "Increment", children: _jsx(ChevronUpIcon, {}) }), _jsx("button", { type: "button", onClick: onDecrement, className: "flex h-3 w-4 items-center justify-center text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", "aria-label": "Decrement", children: _jsx(ChevronDownIcon, {}) })] })) : undefined, ...props }));
});
NumberInput.displayName = "NumberInput";
const InputGroup = React.forwardRef(({ className, orientation = "vertical", spacing = "md", children, ...props }, ref) => {
    const spacingClasses = {
        none: "",
        sm: orientation === "horizontal" ? "space-x-2" : "space-y-2",
        md: orientation === "horizontal" ? "space-x-4" : "space-y-4",
    };
    return (_jsx("div", { ref: ref, className: cn("flex", orientation === "horizontal" ? "flex-row items-end" : "flex-col", spacingClasses[spacing], className), ...props, children: children }));
});
InputGroup.displayName = "InputGroup";
// Input presets for common patterns
export const InputPresets = {
    // Email Input
    Email: (props) => (_jsx(Input, { type: "email", leftIcon: _jsx(EmailIcon, {}), placeholder: "Enter your email", ...props })),
    // Phone Input
    Phone: (props) => (_jsx(Input, { type: "tel", leftIcon: _jsx(PhoneIcon, {}), placeholder: "Enter your phone number", ...props })),
    // URL Input
    URL: (props) => (_jsx(Input, { type: "url", leftIcon: _jsx(LinkIcon, {}), placeholder: "https://example.com", ...props })),
    // Search Input
    Search: (props) => (_jsx(SearchInput, { placeholder: "Search...", ...props })),
    // Currency Input
    Currency: (props) => (_jsx(Input, { type: "number", leftElement: _jsx("span", { className: "text-[var(--hive-text-tertiary)]", children: "$" }), placeholder: "0.00", ...props })),
};
// Simple icons using semantic approach
const SearchIcon = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("path", { d: "m21 21-4.35-4.35" })] }));
const ClearIcon = () => (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }));
const EyeIcon = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), _jsx("circle", { cx: "12", cy: "12", r: "3" })] }));
const EyeOffIcon = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }), _jsx("path", { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68" }), _jsx("path", { d: "M6.61 6.61A13.526 13.526 0 0 0 1 12s4 8 11 8a9.74 9.74 0 0 0 5.39-1.61" }), _jsx("path", { d: "M2 2l20 20" })] }));
const ChevronUpIcon = () => (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M18 15l-6-6-6 6" }) }));
const ChevronDownIcon = () => (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M6 9l6 6 6-6" }) }));
const EmailIcon = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }), _jsx("polyline", { points: "22,6 12,13 2,6" })] }));
const PhoneIcon = () => (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }));
const LinkIcon = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }), _jsx("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })] }));
export { Input, SearchInput, PasswordInput, NumberInput, InputGroup, inputVariants };
//# sourceMappingURL=input-enhanced.js.map