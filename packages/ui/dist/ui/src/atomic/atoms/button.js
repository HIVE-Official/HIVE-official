import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hive-interactive", {
    variants: {
        variant: {
            default: "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-hover)] shadow-hive-level1 hover:shadow-hive-gold-glow",
            primary: "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-hover)] shadow-hive-level1 hover:shadow-hive-gold-glow",
            destructive: "bg-[var(--hive-status-error)] text-white hover:bg-[var(--hive-status-error)]/90 shadow-hive-level1",
            outline: "border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] hover:text-[var(--hive-text-primary)] shadow-hive-level1",
            secondary: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] shadow-hive-level1",
            ghost: "hover:bg-[var(--hive-interactive-hover)] hover:text-[var(--hive-text-primary)]",
            link: "text-[var(--hive-brand-primary)] underline-offset-4 hover:underline",
            // New 2025 variants
            glow: "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-hover)] animate-hive-glow shadow-hive-gold-glow-strong",
            glass: "hive-glass border border-[var(--hive-border-default)] text-[var(--hive-text-primary)] hover:hive-glass-strong",
            gradient: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-background-primary)] hover:opacity-90 shadow-hive-level2",
        },
        size: {
            default: "h-11 px-4 py-2 min-h-[44px]", // Mobile-friendly: 44px minimum
            sm: "h-11 rounded-md px-3 min-h-[44px]", // Mobile-friendly: 44px minimum
            lg: "h-12 rounded-md px-8 min-h-[48px]",
            xl: "h-14 rounded-lg px-10 text-base min-h-[56px]", // Larger size for emphasis
            icon: "h-11 w-11 min-h-[44px] min-w-[44px]", // Mobile-friendly: 44px minimum
            "icon-sm": "h-11 w-11 min-h-[44px] min-w-[44px]", // Mobile-friendly: 44px minimum
            "icon-lg": "h-14 w-14 min-h-[56px] min-w-[56px]", // Larger icons
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props }));
});
Button.displayName = "Button";
export { Button, buttonVariants };
//# sourceMappingURL=button.js.map