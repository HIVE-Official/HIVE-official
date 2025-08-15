'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
// HIVE Select System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage
const selectVariants = cva(
// Base styles using semantic tokens only
"flex w-full items-center justify-between rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:border-[var(--hive-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-50 [&>option]:bg-[var(--hive-background-primary)] [&>option]:text-[var(--hive-text-primary)] [&>option]:py-2 [&>option]:px-3 [&>option:hover]:bg-[var(--hive-brand-secondary)] [&>option:hover]:text-[var(--hive-background-primary)] [&>option:checked]:bg-[var(--hive-brand-secondary)] [&>option:checked]:text-[var(--hive-background-primary)]", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)] focus:border-[var(--hive-brand-secondary)]",
            error: "border-[var(--hive-status-error)] focus:border-[var(--hive-status-error)] focus:ring-[color-mix(in_srgb,var(--hive-status-error)_30%,transparent)]",
            success: "border-[var(--hive-status-success)] focus:border-[var(--hive-status-success)] focus:ring-[color-mix(in_srgb,var(--hive-status-success)_30%,transparent)]",
            warning: "border-[var(--hive-status-warning)] focus:border-[var(--hive-status-warning)] focus:ring-[color-mix(in_srgb,var(--hive-status-warning)_30%,transparent)]",
            brand: "bg-transparent border-2 border-[var(--hive-brand-secondary)] focus:border-[var(--hive-brand-secondary)] focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)]",
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
const Select = React.forwardRef(({ className, variant, size, radius, options, placeholder, error, success, helperText, label, required, allowClear, onClear, value, id, ...props }, ref) => {
    const selectId = id || React.useId();
    const hasValue = Boolean(value);
    // Determine variant based on state
    const computedVariant = error ? "error" : success ? "success" : variant;
    const selectElement = (_jsxs("div", { className: "relative", children: [_jsxs("select", { id: selectId, className: cn(selectVariants({ variant: computedVariant, size, radius }), "appearance-none cursor-pointer pr-10", className), ref: ref, value: value, ...props, children: [placeholder && (_jsx("option", { value: "", disabled: true, children: placeholder })), options.map((option) => (_jsx("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value)))] }), _jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--hive-brand-secondary)] transition-colors duration-200", children: _jsx(ChevronDownIcon, {}) }), allowClear && hasValue && onClear && (_jsx("button", { type: "button", onClick: onClear, className: "absolute right-8 top-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center rounded-full hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", "aria-label": "Clear selection", children: _jsx(ClearIcon, {}) }))] }));
    if (label || error || success || helperText) {
        return (_jsxs("div", { className: "space-y-2", children: [label && (_jsxs("label", { htmlFor: selectId, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [label, required && (_jsx("span", { className: "ml-1 text-[var(--hive-status-error)]", children: "*" }))] })), selectElement, (error || success || helperText) && (_jsx("p", { className: cn("text-xs", error && "text-[var(--hive-status-error)]", success && "text-[var(--hive-status-success)]", !error && !success && "text-[var(--hive-text-tertiary)]"), children: error || success || helperText }))] }));
    }
    return selectElement;
});
Select.displayName = "Select";
const MultiSelect = React.forwardRef(({ value = [], onChange, maxSelected, ...props }, ref) => {
    const handleChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        if (maxSelected && selectedOptions.length > maxSelected) {
            return; // Don't allow selection beyond max
        }
        onChange?.(selectedOptions);
    };
    return (_jsx(Select, { ref: ref, value: value, onChange: handleChange, multiple: true, className: "min-h-20", ...props }));
});
MultiSelect.displayName = "MultiSelect";
const SelectGroup = React.forwardRef(({ className, orientation = "vertical", spacing = "md", children, ...props }, ref) => {
    const spacingClasses = {
        none: "",
        sm: orientation === "horizontal" ? "space-x-2" : "space-y-2",
        md: orientation === "horizontal" ? "space-x-4" : "space-y-4",
    };
    return (_jsx("div", { ref: ref, className: cn("flex", orientation === "horizontal" ? "flex-row items-end" : "flex-col", spacingClasses[spacing], className), ...props, children: children }));
});
SelectGroup.displayName = "SelectGroup";
// Select presets for common patterns
export const SelectPresets = {
    // Country Select
    Country: (props) => (_jsx(Select, { options: [
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
            { value: "mx", label: "Mexico" },
            { value: "uk", label: "United Kingdom" },
            { value: "de", label: "Germany" },
            { value: "fr", label: "France" },
        ], placeholder: "Select country", ...props })),
    // Priority Select
    Priority: (props) => (_jsx(Select, { options: [
            { value: "low", label: "Low Priority" },
            { value: "medium", label: "Medium Priority" },
            { value: "high", label: "High Priority" },
            { value: "urgent", label: "Urgent" },
        ], placeholder: "Select priority", ...props })),
    // Status Select
    Status: (props) => (_jsx(Select, { options: [
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
            { value: "archived", label: "Archived" },
        ], placeholder: "Select status", ...props })),
    // Size Select
    Size: (props) => (_jsx(Select, { options: [
            { value: "xs", label: "Extra Small" },
            { value: "sm", label: "Small" },
            { value: "md", label: "Medium" },
            { value: "lg", label: "Large" },
            { value: "xl", label: "Extra Large" },
        ], placeholder: "Select size", ...props })),
};
// Simple icons using semantic approach
const ChevronDownIcon = () => (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", className: "drop-shadow-sm", children: _jsx("path", { d: "M6 9l6 6 6-6", strokeLinecap: "round", strokeLinejoin: "round" }) }));
const ClearIcon = () => (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }));
export { Select, Select as SelectEnhanced, MultiSelect, SelectGroup, selectVariants };
//# sourceMappingURL=select-enhanced.js.map