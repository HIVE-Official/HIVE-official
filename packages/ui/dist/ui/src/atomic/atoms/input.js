import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const inputVariants = cva("flex w-full rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--hive-text-placeholder)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)] focus-visible:ring-[var(--hive-interactive-focus)]",
            error: "border-[var(--hive-status-error)] focus-visible:ring-[var(--hive-status-error)] text-[var(--hive-status-error)]",
            success: "border-[var(--hive-status-success)] focus-visible:ring-[var(--hive-status-success)]",
            glass: "hive-glass border-[var(--hive-border-default)]/30 backdrop-blur-sm focus-visible:hive-glass-strong",
            glow: "border-[var(--hive-brand-primary)]/50 focus-visible:ring-[var(--hive-brand-primary)] focus-visible:shadow-hive-gold-glow",
        },
        size: {
            default: "h-10",
            sm: "h-8 text-xs px-2",
            lg: "h-12 text-base px-4",
            xl: "h-14 text-lg px-5",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Input = React.forwardRef(({ className, variant, size, type, ...props }, ref) => {
    return (_jsx("input", { type: type, className: cn(inputVariants({ variant, size, className })), ref: ref, ...props }));
});
Input.displayName = "Input";
export { Input, inputVariants };
//# sourceMappingURL=input.js.map