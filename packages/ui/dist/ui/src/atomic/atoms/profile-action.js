"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { Edit3, Settings, Share2, MessageSquare, UserPlus, MoreHorizontal, Camera, Bell, Shield, Eye, EyeOff, Heart, Bookmark, Link, Download, Upload } from 'lucide-react';
const profileActionVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed", {
    variants: {
        size: {
            xs: "px-2 py-1 text-xs min-h-[28px]",
            sm: "px-3 py-1.5 text-sm min-h-[32px]",
            md: "px-4 py-2 text-sm min-h-[36px]",
            lg: "px-6 py-3 text-base min-h-[44px]"
        },
        variant: {
            primary: "bg-[var(--hive-brand-gold)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-brand-secondary)] shadow-lg hover:shadow-xl",
            secondary: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border border-[var(--hive-border-primary)] hover:bg-[var(--hive-background-interactive)] hover:border-[var(--hive-brand-gold)]/30",
            outline: "border border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-interactive)] hover:border-[var(--hive-brand-gold)]/30",
            ghost: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-interactive)]",
            destructive: "bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)] border border-[var(--hive-status-error)]/30 hover:bg-[var(--hive-status-error)]/30",
            success: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/30 hover:bg-[var(--hive-status-success)]/30"
        },
        shape: {
            rounded: "rounded-lg",
            pill: "rounded-full",
            square: "rounded-md"
        },
        width: {
            auto: "w-auto",
            full: "w-full",
            icon: "aspect-square"
        },
        interactive: {
            true: "cursor-pointer hover:scale-105 active:scale-95",
            false: "cursor-default"
        }
    },
    defaultVariants: {
        size: "md",
        variant: "secondary",
        shape: "rounded",
        width: "auto",
        interactive: true
    }
});
const iconVariants = cva("flex-shrink-0", {
    variants: {
        size: {
            xs: "h-3 w-3",
            sm: "h-4 w-4",
            md: "h-4 w-4",
            lg: "h-5 w-5"
        }
    },
    defaultVariants: {
        size: "md"
    }
});
// Predefined action types
export const ACTION_TYPES = {
    edit: {
        icon: Edit3,
        label: "Edit Profile",
        variant: "outline"
    },
    settings: {
        icon: Settings,
        label: "Settings",
        variant: "ghost"
    },
    share: {
        icon: Share2,
        label: "Share",
        variant: "ghost"
    },
    message: {
        icon: MessageSquare,
        label: "Message",
        variant: "primary"
    },
    connect: {
        icon: UserPlus,
        label: "Connect",
        variant: "outline"
    },
    follow: {
        icon: Heart,
        label: "Follow",
        variant: "outline"
    },
    bookmark: {
        icon: Bookmark,
        label: "Save",
        variant: "ghost"
    },
    camera: {
        icon: Camera,
        label: "Change Photo",
        variant: "secondary"
    },
    privacy: {
        icon: Shield,
        label: "Privacy",
        variant: "ghost"
    },
    notifications: {
        icon: Bell,
        label: "Notifications",
        variant: "ghost"
    },
    visibility: {
        icon: Eye,
        label: "Visibility",
        variant: "ghost"
    },
    ghost: {
        icon: EyeOff,
        label: "Ghost Mode",
        variant: "ghost"
    },
    copy: {
        icon: Link,
        label: "Copy Link",
        variant: "ghost"
    },
    download: {
        icon: Download,
        label: "Download",
        variant: "ghost"
    },
    upload: {
        icon: Upload,
        label: "Upload",
        variant: "secondary"
    },
    more: {
        icon: MoreHorizontal,
        label: "More",
        variant: "ghost"
    }
};
export function ProfileAction({ actionType, type: _type = "button", label, icon: CustomIcon, iconOnly = false, loading = false, badge, tooltip, href, external = false, onClick, size = "md", variant = "secondary", shape = "rounded", width = "auto", interactive = true, disabled, className, children, ...props }) {
    // Get predefined action config if actionType is provided
    const actionConfig = actionType ? ACTION_TYPES[actionType] : null;
    // Determine final values
    const finalIcon = CustomIcon || actionConfig?.icon;
    const finalLabel = label || actionConfig?.label || "Action";
    const finalVariant = variant !== "secondary" ? variant : (actionConfig?.variant || "secondary");
    const finalDisabled = disabled || loading;
    // Handle click with loading state
    const handleClick = React.useCallback((e) => {
        if (loading || disabled)
            return;
        if (href) {
            if (external) {
                window.open(href, '_blank', 'noopener,noreferrer');
            }
            else {
                window.location.href = href;
            }
            return;
        }
        onClick?.(e);
    }, [loading, disabled, href, external, onClick]);
    const content = (_jsxs(_Fragment, { children: [loading && (_jsx("div", { className: "animate-spin rounded-full border-2 border-current border-t-transparent h-4 w-4" })), !loading && finalIcon && (React.createElement(finalIcon, { className: cn(iconVariants({ size })) })), !iconOnly && !loading && (_jsx("span", { className: "truncate", children: finalLabel })), children, badge && (_jsx("span", { className: "ml-1 px-1.5 py-0.5 bg-[var(--hive-brand-gold)] text-[var(--hive-text-inverse)] text-xs font-bold rounded-full min-w-[16px] flex items-center justify-center", children: typeof badge === 'number' && badge > 99 ? '99+' : badge }))] }));
    // Render as link if href is provided
    if (href && !onClick) {
        return (_jsx("a", { href: href, target: external ? '_blank' : undefined, rel: external ? 'noopener noreferrer' : undefined, className: cn(profileActionVariants({
                size,
                variant: finalVariant,
                shape,
                width,
                interactive
            }), finalDisabled && "pointer-events-none", className), title: tooltip, "aria-label": finalLabel, children: content }));
    }
    return (_jsx("button", { className: cn(profileActionVariants({
            size,
            variant: finalVariant,
            shape,
            width,
            interactive
        }), className), onClick: handleClick, disabled: finalDisabled, title: tooltip, "aria-label": finalLabel, ...props, children: content }));
}
// Preset action components for common use cases
export function EditAction({ ...props }) {
    return _jsx(ProfileAction, { actionType: "edit", ...props });
}
export function ShareAction({ ...props }) {
    return _jsx(ProfileAction, { actionType: "share", ...props });
}
export function MessageAction({ ...props }) {
    return _jsx(ProfileAction, { actionType: "message", ...props });
}
export function ConnectAction({ ...props }) {
    return _jsx(ProfileAction, { actionType: "connect", ...props });
}
export function SettingsAction({ ...props }) {
    return _jsx(ProfileAction, { actionType: "settings", ...props });
}
export function CameraAction({ ...props }) {
    return _jsx(ProfileAction, { actionType: "camera", ...props });
}
export function MoreAction({ ...props }) {
    return _jsx(ProfileAction, { actionType: "more", ...props });
}
// Export variants for external use
export { profileActionVariants };
//# sourceMappingURL=profile-action.js.map