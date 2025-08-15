import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
// HIVE Card System - Atomic Design with Semantic Tokens
// Simplified version for atomic UI system
const cardVariants = cva("relative overflow-hidden transition-all duration-300 ease-out", {
    variants: {
        variant: {
            default: "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-subtle)]/70 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-lg",
            elevated: "bg-[var(--hive-background-elevated-strong)] border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-subtle)]/70 hover:bg-[var(--hive-background-elevated-strong-hover)] hover:shadow-xl shadow-lg",
            minimal: "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)]/50 hover:border-[var(--hive-border-subtle)] hover:bg-[var(--hive-background-elevated-hover)]",
            ghost: "bg-transparent border-none",
        },
        size: {
            sm: "p-3",
            default: "p-4",
            lg: "p-6",
            xl: "p-8",
        },
        radius: {
            none: "rounded-none",
            sm: "rounded-lg",
            default: "rounded-xl",
            lg: "rounded-2xl",
            full: "rounded-3xl",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        radius: "default",
    },
});
const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
    variants: {
        spacing: {
            none: "p-0",
            sm: "pb-2",
            default: "pb-4",
            lg: "pb-6",
        }
    },
    defaultVariants: {
        spacing: "default"
    }
});
const cardTitleVariants = cva("font-semibold leading-none tracking-tight text-[var(--hive-text-primary)]", {
    variants: {
        size: {
            sm: "text-base",
            default: "text-lg",
            lg: "text-xl",
            xl: "text-2xl",
        }
    },
    defaultVariants: {
        size: "default"
    }
});
const cardDescriptionVariants = cva("text-[var(--hive-text-secondary)]", {
    variants: {
        size: {
            sm: "text-xs",
            default: "text-sm",
            lg: "text-base",
        }
    },
    defaultVariants: {
        size: "default"
    }
});
const cardContentVariants = cva("", {
    variants: {
        spacing: {
            none: "p-0",
            sm: "pt-2",
            default: "pt-0",
            lg: "pt-2",
        }
    },
    defaultVariants: {
        spacing: "default"
    }
});
const cardFooterVariants = cva("flex items-center", {
    variants: {
        spacing: {
            none: "p-0",
            sm: "pt-2",
            default: "pt-4",
            lg: "pt-6",
        }
    },
    defaultVariants: {
        spacing: "default"
    }
});
export const Card = React.forwardRef(({ className, variant, size, radius, ...props }, ref) => (_jsx("div", { ref: ref, className: cn(cardVariants({ variant, size, radius }), className), ...props })));
Card.displayName = "Card";
export const CardHeader = React.forwardRef(({ className, spacing, ...props }, ref) => (_jsx("div", { ref: ref, className: cn(cardHeaderVariants({ spacing }), className), ...props })));
CardHeader.displayName = "CardHeader";
export const CardTitle = React.forwardRef(({ className, size, ...props }, ref) => (_jsx("h3", { ref: ref, className: cn(cardTitleVariants({ size }), className), ...props })));
CardTitle.displayName = "CardTitle";
export const CardDescription = React.forwardRef(({ className, size, ...props }, ref) => (_jsx("p", { ref: ref, className: cn(cardDescriptionVariants({ size }), className), ...props })));
CardDescription.displayName = "CardDescription";
export const CardContent = React.forwardRef(({ className, spacing, ...props }, ref) => (_jsx("div", { ref: ref, className: cn(cardContentVariants({ spacing }), className), ...props })));
CardContent.displayName = "CardContent";
export const CardFooter = React.forwardRef(({ className, spacing, ...props }, ref) => (_jsx("div", { ref: ref, className: cn(cardFooterVariants({ spacing }), className), ...props })));
CardFooter.displayName = "CardFooter";
export { cardVariants, cardHeaderVariants, cardTitleVariants, cardDescriptionVariants, cardContentVariants, cardFooterVariants };
//# sourceMappingURL=card.js.map