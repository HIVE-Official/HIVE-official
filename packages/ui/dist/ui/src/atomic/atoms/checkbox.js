'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const CHECK_DARK = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath d='M4.2 8.8 6.8 11.2 12 5.2' stroke='%23111111' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e";
const CHECK_LIGHT = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath d='M4.2 8.8 6.8 11.2 12 5.2' stroke='%23ffffff' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e";
const checkboxVariants = cva([
    "peer inline-flex h-5 w-5 shrink-0 appearance-none items-center justify-center rounded-full cursor-pointer",
    "border border-[color-mix(in_srgb,var(--hive-border-default) 74%,#ffd700 10%)]",
    "bg-[color-mix(in_srgb,var(--hive-background-secondary) 95%,#ffd700 3%)]",
    "shadow-[0_2px_6px_rgba(0,0,0,0.28)]",
    "transition-[background,border,box-shadow,transform] duration-140 ease-out",
    "hover:border-[color-mix(in_srgb,var(--hive-border-default) 64%,#ffd700 22%)] hover:bg-[color-mix(in_srgb,var(--hive-background-secondary) 86%,#ffd700 10%)]",
    "active:translate-y-[1px] active:shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "after:pointer-events-none after:absolute after:inset-0 after:bg-center after:bg-no-repeat after:bg-contain after:bg-[var(--hive-checkbox-check)] after:bg-[length:62%] after:opacity-0 after:transition-opacity after:duration-150 after:ease-out after:content-['']",
    "before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:h-[2px] before:w-[58%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[#0f0f0f] before:opacity-0 before:transition-opacity before:duration-150 before:ease-out before:content-['']",
    "data-[state=unchecked]:bg-[color-mix(in_srgb,var(--hive-background-secondary) 97%,#ffd700 2%)]",
    "data-[state=unchecked]:border-[color-mix(in_srgb,var(--hive-border-default) 82%,#ffd700 6%)]",
    "data-[state=checked]:bg-[#ffd700] data-[state=checked]:border-[#ffd700]",
    "data-[state=checked]:shadow-[0_12px_30px_rgba(255,215,0,0.35)]",
    "data-[state=checked]:after:opacity-100",
    "data-[state=indeterminate]:bg-[#ffd700] data-[state=indeterminate]:border-[#ffd700]",
    "data-[state=indeterminate]:before:opacity-100",
].join(" "), {
    variants: {
        variant: {
            default: "",
            destructive: [
                "data-[state=checked]:bg-[color-mix(in_srgb,var(--hive-status-error) 86%,#240000)]",
                "data-[state=checked]:border-[color-mix(in_srgb,var(--hive-status-error) 88%,transparent)]",
                "data-[state=checked]:shadow-[0_8px_24px_rgba(212,60,60,0.24)]",
                "data-[state=checked]:after:bg-[length:60%]",
                "data-[state=indeterminate]:bg-[color-mix(in_srgb,var(--hive-status-error) 78%,#240000)]",
                "data-[state=indeterminate]:border-[color-mix(in_srgb,var(--hive-status-error) 84%,transparent)]",
                "data-[state=indeterminate]:before:bg-[rgba(255,255,255,0.92)]",
            ].join(" "),
            success: [
                "data-[state=checked]:bg-[color-mix(in_srgb,var(--hive-status-success) 76%,#0d2b16)]",
                "data-[state=checked]:border-[color-mix(in_srgb,var(--hive-status-success) 82%,transparent)]",
                "data-[state=checked]:shadow-[0_8px_22px_rgba(51,178,73,0.2)]",
                "data-[state=checked]:after:bg-[length:58%]",
                "data-[state=indeterminate]:bg-[color-mix(in_srgb,var(--hive-status-success) 68%,#0d2b16)]",
                "data-[state=indeterminate]:border-[color-mix(in_srgb,var(--hive-status-success) 76%,transparent)]",
                "data-[state=indeterminate]:before:bg-[rgba(255,255,255,0.92)]",
            ].join(" "),
            warning: [
                "data-[state=checked]:bg-[color-mix(in_srgb,var(--hive-status-warning) 72%,#2b1a00)]",
                "data-[state=checked]:border-[color-mix(in_srgb,var(--hive-status-warning) 80%,transparent)]",
                "data-[state=checked]:shadow-[0_8px_22px_rgba(255,184,0,0.22)]",
                "data-[state=checked]:after:bg-[length:60%]",
                "data-[state=indeterminate]:bg-[color-mix(in_srgb,var(--hive-status-warning) 66%,#2b1a00)]",
                "data-[state=indeterminate]:border-[color-mix(in_srgb,var(--hive-status-warning) 74%,transparent)]",
                `data-[state=indeterminate]:before:bg-[#111111]`,
            ].join(" "),
        },
        size: {
            default: "h-5 w-5",
            sm: "h-4 w-4 after:bg-[length:64%] before:w-1/2",
            lg: "h-6 w-6 after:bg-[length:58%]",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Checkbox = React.forwardRef(({ className, variant, size, checked, indeterminate, onCheckedChange, onChange, label, description, error, disabled, ...props }, ref) => {
    const checkboxId = React.useId();
    const internalRef = React.useRef(null);
    const composedRef = React.useCallback((node) => {
        internalRef.current = node;
        if (typeof ref === "function") {
            ref(node);
        }
        else if (ref) {
            ;
            ref.current = node;
        }
    }, [ref]);
    React.useEffect(() => {
        if (internalRef.current) {
            internalRef.current.indeterminate = Boolean(indeterminate);
        }
    }, [indeterminate]);
    const checkboxState = indeterminate
        ? "indeterminate"
        : checked
            ? "checked"
            : "unchecked";
    const handleChange = React.useCallback((event) => {
        const isChecked = event.target.checked;
        if (internalRef.current) {
            internalRef.current.indeterminate = false;
        }
        onCheckedChange?.(isChecked);
        onChange?.(event);
    }, [onCheckedChange, onChange]);
    return (_jsxs("div", { className: "flex flex-col space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { ref: composedRef, id: checkboxId, type: "checkbox", checked: checked, onChange: handleChange, disabled: disabled, "data-state": checkboxState, "aria-checked": indeterminate ? "mixed" : undefined, className: cn(checkboxVariants({ variant, size }), className), style: { ["--hive-checkbox-check"]: `url(\"${(variant === 'destructive' || variant === 'success') ? CHECK_LIGHT : CHECK_DARK}\")` }, ...props }), label && (_jsx("label", { htmlFor: checkboxId, className: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", "text-[var(--hive-text-primary)] cursor-pointer", disabled && "cursor-not-allowed opacity-70"), children: label }))] }), (description || error) && (_jsx("p", { className: cn("text-xs ml-7", error
                    ? "text-[var(--hive-status-error)]"
                    : "text-[var(--hive-text-secondary)]"), children: error || description }))] }));
});
Checkbox.displayName = "Checkbox";
export { Checkbox, checkboxVariants };
//# sourceMappingURL=checkbox.js.map