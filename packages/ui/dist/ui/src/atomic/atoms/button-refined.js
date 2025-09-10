/**
 * HIVE Button Component - Refined with CSS Variables & Composition System
 * Demonstrates proper use of design tokens and atomic composition rules
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
// Import our composition system for consistent styling
import { buttonComposition } from "../foundations/component-composition.js";
// Button variants using CSS variables instead of hardcoded values
const buttonVariants = cva(
// Base styles using our CSS variables and composition rules
[
    "inline-flex items-center justify-center",
    "whitespace-nowrap font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "transition-all duration-[var(--hive-duration-fast)] ease-out",
    // Default border radius from composition
    "rounded-[var(--hive-radius-base)]"
], {
    variants: {
        variant: {
            // Primary: Gold accent system
            primary: [
                "bg-transparent",
                "border border-[var(--hive-gold-primary)]",
                "text-[var(--hive-gold-primary)]",
                "hover:bg-[var(--hive-gold-background)]",
                "hover:border-[var(--hive-gold-hover)]",
                "active:bg-[var(--hive-bg-selected)]",
                "focus-visible:ring-[var(--hive-gold-border)]"
            ],
            // Secondary: Clean outline
            secondary: [
                "bg-transparent",
                "border border-[var(--hive-border-glass)]",
                "text-[var(--hive-text-primary)]",
                "hover:bg-[var(--hive-bg-subtle)]",
                "hover:border-[var(--hive-border-glass-strong)]",
                "active:bg-[var(--hive-bg-active)]",
                "focus-visible:ring-[var(--hive-border-glass-strong)]"
            ],
            // Ghost: Minimal interaction
            ghost: [
                "bg-transparent border-transparent",
                "text-[var(--hive-text-secondary)]",
                "hover:bg-[var(--hive-bg-subtle)]",
                "hover:text-[var(--hive-text-primary)]",
                "active:bg-[var(--hive-bg-active)]",
                "focus-visible:ring-[var(--hive-border-glass)]"
            ],
            // Destructive: Error states
            destructive: [
                "bg-transparent",
                "border border-[var(--hive-error-primary)]",
                "text-[var(--hive-error-primary)]",
                "hover:bg-[var(--hive-error-background)]",
                "active:bg-[var(--hive-bg-selected)]",
                "focus-visible:ring-[var(--hive-error-border)]"
            ]
        },
        size: {
            // Using composition system for consistent sizing
            sm: [
                "h-[var(--hive-height-button-sm)]", // 32px
                "px-3 py-2", // 12px 8px (approximation of composition values)
                "text-[length:var(--hive-font-size-small)]", // 14px
                "gap-2" // 8px
            ],
            default: [
                "h-[var(--hive-height-button-base)]", // 40px  
                "px-4 py-3", // 16px 12px (approximation)
                "text-[length:var(--hive-font-size-base)]", // 16px
                "gap-2" // 8px
            ],
            lg: [
                "h-[var(--hive-height-button-lg)]", // 48px
                "px-5 py-4", // 20px 16px (approximation)
                "text-[length:var(--hive-font-size-large)]", // 18px
                "gap-2" // 8px
            ],
            icon: [
                "h-[var(--hive-height-button-base)]", // 40px square
                "w-[var(--hive-height-button-base)]",
                "p-0"
            ]
        }
    },
    defaultVariants: {
        variant: "secondary",
        size: "default"
    }
});
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props }));
});
Button.displayName = "Button";
export { Button, buttonVariants };
// Export composition data for other components to use
export const buttonCompositionData = buttonComposition;
//# sourceMappingURL=button-refined.js.map