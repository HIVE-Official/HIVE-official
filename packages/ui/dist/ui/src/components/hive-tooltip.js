"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva } from 'class-variance-authority';
import { cn } from "../lib/utils";
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';
// HIVE Tooltip variants - Luxury glass morphism with semantic tokens
const hiveTooltipVariants = cva(
// Base styles - matte obsidian glass with heavy radius and backdrop blur
"z-50 overflow-hidden text-sm shadow-lg backdrop-blur-xl border transition-all", {
    variants: {
        variant: {
            // Default glass morphism variant
            default: "bg-[var(--hive-background-secondary)]/80 text-[var(--hive-text-primary)] border-[var(--hive-border-glass)] rounded-[var(--hive-radius-lg)]",
            // Glass strong variant with enhanced opacity
            glass: "bg-[var(--hive-overlay-glass-strong)] text-[var(--hive-text-primary)] border-[var(--hive-border-glass-strong)] rounded-[var(--hive-radius-lg)]",
            // Gold accent variant
            gold: "bg-[var(--hive-background-secondary)]/80 text-[var(--hive-brand-primary)] border-[var(--hive-border-gold)] rounded-[var(--hive-radius-lg)] shadow-[var(--hive-shadow-gold-glow)]",
            // Success state
            success: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border-[var(--hive-status-success)]/30 rounded-[var(--hive-radius-lg)] backdrop-blur-xl",
            // Warning state
            warning: "bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border-[var(--hive-status-warning)]/30 rounded-[var(--hive-radius-lg)] backdrop-blur-xl",
            // Error state
            error: "bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)] border-[var(--hive-status-error)]/30 rounded-[var(--hive-radius-lg)] backdrop-blur-xl",
            // Info state
            info: "bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border-[var(--hive-status-info)]/30 rounded-[var(--hive-radius-lg)] backdrop-blur-xl",
            // Minimal variant
            minimal: "bg-[var(--hive-background-primary)]/90 text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)] rounded-[var(--hive-radius-md)] backdrop-blur-sm",
            // Solid variant for high contrast needs
            solid: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-primary)] rounded-[var(--hive-radius-lg)]",
        },
        size: {
            sm: "px-2 py-1 text-xs max-w-48",
            default: "px-3 py-1.5 text-sm max-w-64",
            lg: "px-4 py-2 text-base max-w-80",
            xl: "px-5 py-3 text-lg max-w-96",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
// Animation variants for smooth entrance/exit
const tooltipAnimationVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 2,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
            type: "spring",
            stiffness: 400,
            damping: 25,
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 2,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    }
};
const HiveTooltipProvider = TooltipPrimitive.Provider;
const HiveTooltip = TooltipPrimitive.Root;
const HiveTooltipTrigger = TooltipPrimitive.Trigger;
const HiveTooltipContent = React.forwardRef(({ className, sideOffset = 4, variant, size, withArrow = true, animated = true, children, ...props }, ref) => (_jsxs(TooltipPrimitive.Content, { ref: ref, sideOffset: sideOffset, className: cn(hiveTooltipVariants({ variant, size }), animated && "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props, children: [children, withArrow && (_jsx(TooltipPrimitive.Arrow, { className: cn("fill-current", variant === 'gold' && "text-[var(--hive-background-secondary)]", variant === 'success' && "text-[var(--hive-status-success)]", variant === 'warning' && "text-[var(--hive-status-warning)]", variant === 'error' && "text-[var(--hive-status-error)]", variant === 'info' && "text-[var(--hive-status-info)]", !variant && "text-[var(--hive-background-secondary)]") }))] })));
HiveTooltipContent.displayName = TooltipPrimitive.Content.displayName;
const HiveMotionTooltip = React.forwardRef(({ children, content, variant = "default", size = "default", side = "top", delayDuration = 200, withArrow = true, ...props }, ref) => (_jsx(HiveTooltipProvider, { delayDuration: delayDuration, children: _jsxs(HiveTooltip, { children: [_jsx(HiveTooltipTrigger, { asChild: true, children: children }), _jsx(HiveTooltipContent, { side: side, variant: variant, size: size, withArrow: withArrow, ...props, children: content })] }) })));
HiveMotionTooltip.displayName = "HiveMotionTooltip";
// Pre-built Tooltip variants for common use cases
const HiveHelpTooltip = React.forwardRef(({ ...props }, ref) => (_jsx(HiveMotionTooltip, { ref: ref, variant: "glass", size: "default", ...props })));
const HiveErrorTooltip = React.forwardRef(({ ...props }, ref) => (_jsx(HiveMotionTooltip, { ref: ref, variant: "error", ...props })));
const HiveSuccessTooltip = React.forwardRef(({ ...props }, ref) => (_jsx(HiveMotionTooltip, { ref: ref, variant: "success", ...props })));
const HiveGoldTooltip = React.forwardRef(({ ...props }, ref) => (_jsx(HiveMotionTooltip, { ref: ref, variant: "gold", ...props })));
const HiveMinimalTooltip = React.forwardRef(({ ...props }, ref) => (_jsx(HiveMotionTooltip, { ref: ref, variant: "minimal", withArrow: false, ...props })));
HiveHelpTooltip.displayName = "HiveHelpTooltip";
HiveErrorTooltip.displayName = "HiveErrorTooltip";
HiveSuccessTooltip.displayName = "HiveSuccessTooltip";
HiveGoldTooltip.displayName = "HiveGoldTooltip";
HiveMinimalTooltip.displayName = "HiveMinimalTooltip";
export { HiveTooltip, HiveTooltipTrigger, HiveTooltipContent, HiveTooltipProvider, HiveMotionTooltip, HiveHelpTooltip, HiveErrorTooltip, HiveSuccessTooltip, HiveGoldTooltip, HiveMinimalTooltip, hiveTooltipVariants };
// Export for backward compatibility
export { HiveTooltip as Tooltip, HiveTooltipTrigger as TooltipTrigger, HiveTooltipContent as TooltipContent, HiveTooltipProvider as TooltipProvider };
//# sourceMappingURL=hive-tooltip.js.map