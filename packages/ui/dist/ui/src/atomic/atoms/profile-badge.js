"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Crown, Shield, Star, Award, Zap, Users, BookOpen, EyeOff } from 'lucide-react';
const profileBadgeVariants = cva("inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200", {
    variants: {
        size: {
            xs: "px-2 py-1 text-xs",
            sm: "px-3 py-1.5 text-xs",
            md: "px-4 py-2 text-sm",
            lg: "px-5 py-2.5 text-base"
        },
        variant: {
            builder: "bg-[var(--hive-brand-gold)]/20 text-[var(--hive-brand-gold)] border border-[var(--hive-brand-gold)]/30 shadow-lg shadow-[var(--hive-brand-gold)]/10",
            verified: "bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 shadow-lg shadow-[var(--hive-status-info)]/10",
            leader: "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 shadow-lg shadow-[var(--hive-brand-secondary)]/10",
            ghost: "bg-[var(--hive-text-muted)]/20 text-[var(--hive-text-muted)] border border-[var(--hive-text-muted)]/30",
            achievement: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/30",
            streak: "bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border border-[var(--hive-status-warning)]/30",
            academic: "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30",
            social: "bg-[var(--hive-brand-accent)]/20 text-[var(--hive-brand-accent)] border border-[var(--hive-brand-accent)]/30",
            default: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]"
        },
        interactive: {
            true: "cursor-pointer hover:scale-105 hover:brightness-110",
            false: ""
        },
        pulsing: {
            true: "animate-pulse",
            false: ""
        }
    },
    defaultVariants: {
        size: "sm",
        variant: "default",
        interactive: false,
        pulsing: false
    }
});
const iconVariants = cva("flex-shrink-0", {
    variants: {
        size: {
            xs: "h-3 w-3",
            sm: "h-3.5 w-3.5",
            md: "h-4 w-4",
            lg: "h-5 w-5"
        }
    },
    defaultVariants: {
        size: "sm"
    }
});
// Predefined badge types with their icons and styling
export const BADGE_TYPES = {
    builder: {
        icon: Crown,
        label: "Builder",
        variant: "builder",
        description: "Active tool creator and community builder"
    },
    verified: {
        icon: Shield,
        label: "Verified",
        variant: "verified",
        description: "Verified student account"
    },
    leader: {
        icon: Star,
        label: "Leader",
        variant: "leader",
        description: "Community leader and space moderator"
    },
    ghost: {
        icon: EyeOff,
        label: "Ghost Mode",
        variant: "ghost",
        description: "Privacy mode enabled"
    },
    achievement: {
        icon: Award,
        label: "Achiever",
        variant: "achievement",
        description: "Unlocked special achievements"
    },
    streak: {
        icon: Zap,
        label: "Streak",
        variant: "streak",
        description: "Active daily streak"
    },
    academic: {
        icon: BookOpen,
        label: "Scholar",
        variant: "academic",
        description: "Academic excellence recognition"
    },
    social: {
        icon: Users,
        label: "Connector",
        variant: "social",
        description: "Active community member"
    }
};
export function ProfileBadge({ type, label, icon: CustomIcon, value, showIcon = true, showValue = false, onClick, tooltip, size = "sm", variant = "default", interactive = false, pulsing = false, className, ...props }) {
    // Get predefined badge config if type is provided
    const badgeConfig = type ? BADGE_TYPES[type] : null;
    // Determine final values
    const finalIcon = CustomIcon || badgeConfig?.icon;
    const finalLabel = label || badgeConfig?.label || "Badge";
    const finalVariant = variant !== "default" ? variant : (badgeConfig?.variant || "default");
    const finalInteractive = interactive || !!onClick;
    const finalTooltip = tooltip || badgeConfig?.description;
    return (_jsxs("div", { className: cn(profileBadgeVariants({
            size,
            variant: finalVariant,
            interactive: finalInteractive,
            pulsing
        }), className), onClick: onClick, role: finalInteractive ? "button" : undefined, tabIndex: finalInteractive ? 0 : undefined, title: finalTooltip, ...props, children: [showIcon && finalIcon && (React.createElement(finalIcon, { className: cn(iconVariants({ size })) })), _jsx("span", { children: finalLabel }), showValue && value !== undefined && (_jsx("span", { className: "font-bold", children: typeof value === 'number' && value >= 1000
                    ? `${(value / 1000).toFixed(1)}k`
                    : value }))] }));
}
// Preset badge components for common use cases
export function BuilderBadge({ size = "sm", ...props }) {
    return _jsx(ProfileBadge, { type: "builder", size: size, ...props });
}
export function VerifiedBadge({ size = "sm", ...props }) {
    return _jsx(ProfileBadge, { type: "verified", size: size, ...props });
}
export function LeaderBadge({ size = "sm", ...props }) {
    return _jsx(ProfileBadge, { type: "leader", size: size, ...props });
}
export function GhostBadge({ size = "sm", ...props }) {
    return _jsx(ProfileBadge, { type: "ghost", size: size, ...props });
}
export function StreakBadge({ value, size = "sm", ...props }) {
    return (_jsx(ProfileBadge, { type: "streak", size: size, value: value, showValue: value !== undefined, label: value !== undefined ? `${value} day streak` : "Streak", ...props }));
}
export function AchievementBadge({ value, size = "sm", ...props }) {
    return (_jsx(ProfileBadge, { type: "achievement", size: size, value: value, showValue: value !== undefined, label: value !== undefined ? `${value} achievements` : "Achiever", ...props }));
}
// Export variants for external use
export { profileBadgeVariants };
//# sourceMappingURL=profile-badge.js.map