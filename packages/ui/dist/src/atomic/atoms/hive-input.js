import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const hiveInputVariants = cva("flex w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--hive-text-placeholder)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        variant: {
            default: "h-10 border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] focus-visible:ring-[var(--hive-interactive-focus)]",
            destructive: "h-10 border-[var(--hive-status-error)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] focus-visible:ring-[var(--hive-status-error)]",
            success: "h-10 border-[var(--hive-status-success)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] focus-visible:ring-[var(--hive-status-success)]",
            brand: "h-10 border-[var(--hive-brand-primary)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] focus-visible:ring-[var(--hive-brand-primary)]",
            ghost: "h-10 border-transparent bg-transparent text-[var(--hive-text-primary)] focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:border-[var(--hive-border-default)]",
        },
        size: {
            default: "h-10 px-3 py-2",
            sm: "h-9 px-3 text-xs",
            lg: "h-11 px-4 text-base",
            xl: "h-12 px-4 text-lg",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const HiveInput = React.forwardRef(({ className, variant, size, label, helperText, error, ...props }, ref) => {
    const inputId = React.useId();
    return (_jsxs("div", { className: "flex flex-col space-y-1", children: [label && (_jsx("label", { htmlFor: inputId, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: label })), _jsx("input", { id: inputId, className: cn(hiveInputVariants({ variant: error ? "destructive" : variant, size }), className), ref: ref, ...props }), (helperText || error) && (_jsx("p", { className: cn("text-xs", error
                    ? "text-[var(--hive-status-error)]"
                    : "text-[var(--hive-text-secondary)]"), children: error || helperText }))] }));
});
HiveInput.displayName = "HiveInput";
export { HiveInput, hiveInputVariants };
//# sourceMappingURL=hive-input.js.map