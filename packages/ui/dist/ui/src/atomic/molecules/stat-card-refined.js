/**
 * HIVE StatCard Component - Perfect for Profile Dashboard
 * Demonstrates complete atomic composition system usage
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Card, CardContent } from "../ui/card";
// Import our composition system
import { statCardComposition } from "../foundations/component-composition";
// Icon size mapping from composition system
const iconSizes = {
    sm: "w-[var(--hive-icon-large)] h-[var(--hive-icon-large)]", // 24px
    base: "w-[var(--hive-icon-xl)] h-[var(--hive-icon-xl)]", // 32px (default)
    lg: "w-8 h-8" // 32px fallback
};
// Semantic variant styles from composition system
const statCardVariants = cva(
// Base styles using composition rules
[
    // Layout from statCardComposition.layout
    "p-[var(--hive-space-5)]", // 20px padding (comfortable)
    "rounded-[var(--hive-radius-lg)]", // 12px border radius
    "bg-[var(--hive-bg-secondary)]", // Card background
    "border border-[var(--hive-border-subtle)]", // Subtle border
    // Interactive states
    "transition-all duration-180 ease-out",
    "hover:bg-[var(--hive-bg-interactive)]",
    "hover:border-[var(--hive-border-glass)]",
    "hover:shadow-[var(--hive-shadow-md)]",
    // Content layout
    "flex flex-col items-center text-center",
    "gap-[var(--hive-space-3)]" // 12px gap between elements
], {
    variants: {
        semantic: {
            spaces: [
                // Icon container with info colors
                "[&_.icon-container]:bg-[var(--hive-info-background)]",
                "[&_.icon-container]:text-[var(--hive-info-primary)]",
                "hover:border-[var(--hive-info-border)]"
            ],
            tools: [
                // Icon container with success colors
                "[&_.icon-container]:bg-[var(--hive-success-background)]",
                "[&_.icon-container]:text-[var(--hive-success-primary)]",
                "hover:border-[var(--hive-success-border)]"
            ],
            activity: [
                // Icon container with warning colors
                "[&_.icon-container]:bg-[var(--hive-warning-background)]",
                "[&_.icon-container]:text-[var(--hive-warning-primary)]",
                "hover:border-[var(--hive-warning-border)]"
            ],
            reputation: [
                // Icon container with gold colors
                "[&_.icon-container]:bg-[var(--hive-gold-background)]",
                "[&_.icon-container]:text-[var(--hive-gold-primary)]",
                "hover:border-[var(--hive-gold-border)]"
            ],
            default: [
                // Default neutral colors
                "[&_.icon-container]:bg-[var(--hive-bg-interactive)]",
                "[&_.icon-container]:text-[var(--hive-text-primary)]"
            ]
        }
    },
    defaultVariants: {
        semantic: "default"
    }
});
const StatCard = React.forwardRef(({ className, semantic, icon: Icon, value, label, trend, interactive = false, onClick, ...props }, ref) => {
    return (_jsx(Card, { className: cn(statCardVariants({ semantic, className }), interactive && "cursor-pointer", onClick && "cursor-pointer"), onClick: onClick, ref: ref, ...props, children: _jsxs(CardContent, { className: "p-0 flex flex-col items-center gap-[var(--hive-space-3)]", children: [_jsx("div", { className: cn(
                    // Icon container from statCardComposition.icon
                    "icon-container", "flex items-center justify-center", "p-[var(--hive-space-3)]", // 12px padding
                    "rounded-[var(--hive-radius-lg)]", // 12px border radius
                    "mb-[var(--hive-space-2)]", // 8px margin bottom
                    iconSizes.base // 32px icon size
                    ), children: _jsx(Icon, { className: "w-full h-full" }) }), _jsxs("div", { className: "flex items-center gap-[var(--hive-space-1)]", children: [_jsx("div", { className: cn(
                            // Value styles from statCardComposition.content
                            "text-[length:var(--hive-font-size-h2)]", // 26px
                            "font-[var(--hive-font-weight-bold)]", // Bold weight
                            "leading-[var(--hive-line-height-h2)]", // 40px line height
                            "text-[var(--hive-text-primary)]" // High contrast
                            ), children: typeof value === 'number' ? value.toLocaleString() : value }), trend && trend.icon && (_jsx("div", { className: cn("flex items-center", trend.direction === 'up' && "text-[var(--hive-success-primary)]", trend.direction === 'down' && "text-[var(--hive-error-primary)]", trend.direction === 'neutral' && "text-[var(--hive-text-muted)]"), children: _jsx(trend.icon, { className: "w-[var(--hive-icon-small)] h-[var(--hive-icon-small)]" }) }))] }), _jsx("div", { className: cn(
                    // Label styles from statCardComposition.content
                    "text-[length:var(--hive-font-size-small)]", // 14px
                    "font-[var(--hive-font-weight-medium)]", // Medium weight
                    "text-[var(--hive-text-muted)]", // Lower contrast
                    "mt-[var(--hive-space-1)]" // 4px margin top
                    ), children: label }), trend && trend.value && (_jsx("div", { className: cn("text-[length:var(--hive-font-size-caption)]", // 12px
                    "font-[var(--hive-font-weight-medium)]", trend.direction === 'up' && "text-[var(--hive-success-primary)]", trend.direction === 'down' && "text-[var(--hive-error-primary)]", trend.direction === 'neutral' && "text-[var(--hive-text-muted)]"), children: trend.value }))] }) }));
});
StatCard.displayName = "StatCard";
export { StatCard, statCardVariants };
// Export composition data for reference
export const statCardCompositionData = statCardComposition;
//# sourceMappingURL=stat-card-refined.js.map