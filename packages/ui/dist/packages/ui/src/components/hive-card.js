import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cva } from 'class-variance-authority';
import { motion } from './framer-motion-proxy';
import { cn } from '../lib/utils';
import { getMotionProps } from '../lib/motion-utils';
import { HiveMagneticHover } from './hive-magnetic-interactions';
import { liquidFlow, liquidMetalPerformance, liquidMetalUtils } from '../motion/hive-liquid-metal';
// HIVE Card variants - Premium black/white/gold aesthetics
const hiveCardVariants = cva(
// Base styles - sophisticated card design
"relative overflow-hidden transition-all duration-300 ease-out", {
    variants: {
        variant: {
            // Standard cards using semantic tokens - subtle borders, emphasis on background
            "default": "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)]/30 hover:border-[var(--hive-border-subtle)]/50 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-lg",
            "elevated": "bg-[var(--hive-background-elevated-strong)] border border-[var(--hive-border-subtle)]/40 hover:border-[var(--hive-border-subtle)]/60 hover:bg-[var(--hive-background-elevated-strong-hover)] hover:shadow-xl shadow-lg",
            "minimal": "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)]/20 hover:border-[var(--hive-border-subtle)]/40 hover:bg-[var(--hive-background-elevated-hover)]",
            // Gold accent cards - subtle borders with background emphasis
            "gold-accent": "bg-[var(--hive-background-elevated)] border border-[var(--hive-brand-secondary)]/20 hover:border-[var(--hive-brand-secondary)]/30 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-lg",
            "gold-featured": "bg-[var(--hive-background-elevated-strong)] border border-[var(--hive-brand-secondary)]/30 hover:border-[var(--hive-brand-secondary)]/40 hover:bg-[var(--hive-background-elevated-strong-hover)] hover:shadow-xl",
            "gold-premium": "bg-[var(--hive-background-elevated-strong)] border border-[var(--hive-brand-secondary)]/30 hover:border-[var(--hive-brand-secondary)]/40 hover:bg-[var(--hive-background-elevated-strong-hover)] hover:shadow-xl",
            // Special variants - subtle borders with background emphasis
            "builder": "bg-[var(--hive-background-elevated-strong)] border border-[var(--hive-brand-secondary)]/25 hover:border-[var(--hive-brand-secondary)]/35 hover:bg-[var(--hive-background-elevated-strong-hover)] hover:shadow-lg relative before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[var(--hive-brand-primary)]",
            "student": "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)]/25 hover:border-[var(--hive-border-subtle)]/45 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-lg",
            "space": "bg-[var(--hive-background-elevated-strong)] border border-[var(--hive-border-subtle)]/30 hover:border-[var(--hive-border-subtle)]/50 hover:bg-[var(--hive-background-elevated-strong-hover)] hover:shadow-xl backdrop-blur-sm",
            "tool": "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)]/25 hover:border-[var(--hive-brand-secondary)]/30 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-lg",
            // Status cards using semantic status tokens - subtle borders
            "online": "bg-[var(--hive-background-elevated)] border border-[var(--hive-status-success)]/15 hover:border-[var(--hive-status-success)]/25 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-lg hover:shadow-[var(--hive-shadow-emerald-glow)]",
            "building": "bg-[var(--hive-background-elevated)] border border-[var(--hive-status-info)]/15 hover:border-[var(--hive-status-info)]/25 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-lg hover:shadow-[var(--hive-status-info)]/20",
            "studying": "bg-[var(--hive-background-elevated)] border border-[var(--hive-status-info)]/15 hover:border-[var(--hive-status-info)]/25 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-lg hover:shadow-[var(--hive-status-info)]/20",
            // Interactive cards using semantic tokens - subtle borders, background emphasis
            "clickable": "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)]/25 hover:border-[var(--hive-border-subtle)]/45 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
            "selectable": "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)]/25 hover:border-[var(--hive-brand-secondary)]/30 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-lg cursor-pointer transition-all",
            "selected": "bg-[var(--hive-background-elevated-strong)] border border-[var(--hive-brand-secondary)]/40 shadow-lg",
            // Content cards using semantic tokens - subtle borders, background emphasis  
            "post": "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)]/20 hover:border-[var(--hive-border-subtle)]/40 hover:bg-[var(--hive-background-elevated-hover)] hover:shadow-md",
            "announcement": "bg-[var(--hive-background-elevated-strong)] border border-[var(--hive-brand-secondary)]/30 shadow-lg",
            "featured-post": "bg-[var(--hive-background-elevated-strong)] border border-[var(--hive-brand-secondary)]/30 hover:border-[var(--hive-brand-secondary)]/40 hover:bg-[var(--hive-background-elevated-strong-hover)] hover:shadow-lg",
        },
        size: {
            "compact": "p-2 sm:p-3",
            "sm": "p-3 sm:p-4",
            "default": "p-4 sm:p-5",
            "lg": "p-5 sm:p-6",
            "xl": "p-6 sm:p-8",
        },
        rounded: {
            "sm": "rounded-[var(--hive-radius-xl)]", // Heavy radius even on small
            "default": "rounded-[var(--hive-radius-2xl)]", // Premium heavy radius 
            "lg": "rounded-[var(--hive-radius-3xl)]", // Ultra heavy for luxury
            "full": "rounded-[var(--hive-radius-3xl)]", // Maximum luxury radius
        },
        shadow: {
            "none": "",
            "sm": "shadow-sm",
            "default": "shadow-md",
            "lg": "shadow-lg",
            "xl": "shadow-xl shadow-black/25",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "sm",
        rounded: "default",
        shadow: "none",
    },
});
const HiveCard = React.forwardRef(({ className, variant, size, rounded, shadow, interactive = false, selected = false, goldAccent = false, magneticHover = true, magneticIntensity = 'subtle', animateEntrance = false, cascadeIndex, children, onClick, ...props }, ref) => {
    // Auto-adjust variant based on props
    let finalVariant = variant;
    if (selected && !variant)
        finalVariant = "selected";
    if (interactive && !variant)
        finalVariant = "clickable";
    if (goldAccent && !variant)
        finalVariant = "gold-accent";
    // Determine if card should have enhanced interactions
    const isPremiumCard = finalVariant?.includes('gold') || finalVariant === 'builder' || finalVariant === 'selected';
    const shouldUseMagneticHover = magneticHover && (interactive || isPremiumCard);
    // Create motion variants based on card type
    const cardMotionProps = shouldUseMagneticHover ? {
        whileHover: {
            y: -2,
            scale: 1.01,
            transition: liquidMetalUtils.createSpringTransition('light', 'balanced', 'balanced')
        },
        whileTap: interactive ? {
            scale: 0.99,
            transition: liquidMetalUtils.createSpringTransition('standard', 'firm', 'tight')
        } : undefined
    } : {};
    // Entrance animation for cascade effects
    const entranceProps = animateEntrance ? {
        variants: liquidFlow,
        initial: "hidden",
        animate: "visible",
        custom: cascadeIndex || 0
    } : {};
    const CardComponent = (_jsx(motion.div, { className: cn(hiveCardVariants({
            variant: finalVariant,
            size,
            rounded,
            shadow,
            className
        })), ref: ref, onClick: onClick, style: liquidMetalPerformance.gpuLayer, ...cardMotionProps, ...entranceProps, ...getMotionProps(props), children: children }));
    // Enhanced magnetic hover for premium cards
    if (shouldUseMagneticHover && isPremiumCard) {
        return (_jsx(HiveMagneticHover, { intensity: magneticIntensity, disabled: !interactive, children: CardComponent }));
    }
    return CardComponent;
});
HiveCard.displayName = "HiveCard";
// HIVE Card Header Component
const HiveCardHeader = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex flex-col space-y-1.5 p-0 pb-4", className), ...props })));
HiveCardHeader.displayName = "HiveCardHeader";
// HIVE Card Title Component  
const HiveCardTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h3", { ref: ref, className: cn("text-lg font-semibold leading-none tracking-tight text-[var(--hive-text-primary)]", className), ...props })));
HiveCardTitle.displayName = "HiveCardTitle";
// HIVE Card Description Component
const HiveCardDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("p", { ref: ref, className: cn("text-sm text-[var(--hive-text-secondary)]", className), ...props })));
HiveCardDescription.displayName = "HiveCardDescription";
// HIVE Card Content Component
const HiveCardContent = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("p-0", className), ...props })));
HiveCardContent.displayName = "HiveCardContent";
// HIVE Card Footer Component
const HiveCardFooter = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex items-center p-0 pt-4", className), ...props })));
HiveCardFooter.displayName = "HiveCardFooter";
export { HiveCard, hiveCardVariants, HiveCardHeader, HiveCardTitle, HiveCardDescription, HiveCardContent, HiveCardFooter };
// Export as Card for easier migration and consistency
export { HiveCard as Card, hiveCardVariants as cardVariants, HiveCardHeader as CardHeader, HiveCardTitle as CardTitle, HiveCardDescription as CardDescription, HiveCardContent as CardContent, HiveCardFooter as CardFooter };
//# sourceMappingURL=hive-card.js.map