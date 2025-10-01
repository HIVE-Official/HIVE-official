import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const hiveCardVariants = cva("rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]",
            brand: "border-[var(--hive-brand-primary)] bg-gradient-to-br from-[var(--hive-brand-primary)]/5 to-[var(--hive-brand-secondary)]/5 text-[var(--hive-text-primary)]",
            elevated: "border-[var(--hive-border-default)] bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] shadow-lg",
            interactive: "border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] hover:border-[var(--hive-border-strong)] cursor-pointer",
            glass: "border-[var(--hive-border-default)]/20 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm text-[var(--hive-text-primary)]",
        },
        size: {
            sm: "p-4",
            default: "p-6",
            lg: "p-8",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const HiveCard = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(hiveCardVariants({ variant, size, className })), ...props }));
});
HiveCard.displayName = "HiveCard";
const HiveCardHeader = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex flex-col space-y-1.5", className), ...props })));
HiveCardHeader.displayName = "HiveCardHeader";
const HiveCardTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h3", { ref: ref, className: cn("text-lg font-semibold leading-none tracking-tight text-[var(--hive-text-primary)]", className), ...props })));
HiveCardTitle.displayName = "HiveCardTitle";
const HiveCardDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("p", { ref: ref, className: cn("text-sm text-[var(--hive-text-secondary)]", className), ...props })));
HiveCardDescription.displayName = "HiveCardDescription";
const HiveCardContent = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("pt-0", className), ...props })));
HiveCardContent.displayName = "HiveCardContent";
const HiveCardFooter = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex items-center pt-6", className), ...props })));
HiveCardFooter.displayName = "HiveCardFooter";
export { HiveCard, HiveCardHeader, HiveCardFooter, HiveCardTitle, HiveCardDescription, HiveCardContent, hiveCardVariants, };
//# sourceMappingURL=hive-card.js.map