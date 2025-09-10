"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { ProfileAvatar } from '../atoms/profile-avatar.js';
import { ProfileBadge } from '../atoms/profile-badge.js';
import { ProfileAction } from '../atoms/profile-action.js';
import { MapPin, Calendar, Link as LinkIcon, GraduationCap } from 'lucide-react';
const profileHeaderVariants = cva("flex gap-4 p-4 transition-all duration-200", {
    variants: {
        layout: {
            horizontal: "flex-row items-start",
            vertical: "flex-col items-center text-center",
            compact: "flex-row items-center"
        },
        variant: {
            default: "bg-hive-surface-elevated border border-hive-border-subtle rounded-xl",
            ghost: "bg-transparent",
            card: "bg-hive-surface-elevated border border-hive-border-subtle rounded-xl shadow-lg",
            minimal: "bg-transparent border-b border-hive-border-subtle rounded-none"
        },
        spacing: {
            tight: "gap-2 p-3",
            normal: "gap-4 p-4",
            loose: "gap-6 p-6"
        }
    },
    defaultVariants: {
        layout: "horizontal",
        variant: "default",
        spacing: "normal"
    }
});
export function ProfileHeader({ user, isOwnProfile = false, showOnlineStatus = true, showMeta = true, showBio = true, showBadges = true, onEditProfile, onEditAvatar, onShareProfile, avatarSize = "lg", maxBioLength = 200, layout = "horizontal", variant = "default", spacing = "normal", className, children, ...props }) {
    // Determine avatar editable state
    const avatarEditable = isOwnProfile && !!onEditAvatar;
    // Truncate bio if needed
    const displayBio = React.useMemo(() => {
        if (!user.bio)
            return undefined;
        if (user.bio.length <= maxBioLength)
            return user.bio;
        return user.bio.slice(0, maxBioLength) + '...';
    }, [user.bio, maxBioLength]);
    // Format join date
    const joinDate = React.useMemo(() => {
        return new Date(user.joinedAt).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    }, [user.joinedAt]);
    // Format website URL for display
    const displayWebsite = React.useMemo(() => {
        if (!user.website)
            return undefined;
        return user.website.replace(/^https?:\/\//, '');
    }, [user.website]);
    const isCompact = layout === "compact";
    const isVertical = layout === "vertical";
    return (_jsxs("div", { className: cn(profileHeaderVariants({ layout, variant, spacing }), className), ...props, children: [_jsx(ProfileAvatar, { src: user.avatar, name: user.name, size: avatarSize, isBuilder: user.isBuilder, isVerified: user.isVerified, ghostMode: user.ghostMode, onlineStatus: user.onlineStatus, showStatus: showOnlineStatus, editable: avatarEditable, onEdit: onEditAvatar, className: "flex-shrink-0" }), _jsxs("div", { className: cn("flex-1 min-w-0 space-y-3", isVertical && "w-full", isCompact && "space-y-1"), children: [_jsxs("div", { className: cn("flex items-start justify-between gap-4", isVertical && "flex-col items-center gap-2"), children: [_jsxs("div", { className: cn("min-w-0", isVertical && "text-center"), children: [_jsx("h1", { className: cn("font-bold text-hive-text-primary truncate", isCompact ? "text-lg" : "text-xl sm:text-2xl"), children: user.name }), _jsxs("p", { className: cn("text-hive-text-secondary", isCompact ? "text-sm" : "text-base"), children: ["@", user.handle] })] }), !isCompact && (_jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [isOwnProfile ? (_jsxs(_Fragment, { children: [_jsx(ProfileAction, { actionType: "edit", onClick: onEditProfile, size: "sm" }), _jsx(ProfileAction, { actionType: "settings", size: "sm", iconOnly: true })] })) : (_jsxs(_Fragment, { children: [_jsx(ProfileAction, { actionType: "message", size: "sm" }), _jsx(ProfileAction, { actionType: "connect", size: "sm" })] })), _jsx(ProfileAction, { actionType: "share", onClick: onShareProfile, size: "sm", iconOnly: true })] }))] }), showBadges && !isCompact && (_jsxs("div", { className: cn("flex flex-wrap gap-2", isVertical && "justify-center"), children: [user.isBuilder && _jsx(ProfileBadge, { type: "builder" }), user.isVerified && _jsx(ProfileBadge, { type: "verified" }), user.ghostMode && _jsx(ProfileBadge, { type: "ghost" })] })), showBio && displayBio && !isCompact && (_jsx("p", { className: cn("text-hive-text-primary text-sm sm:text-base", isVertical && "text-center"), children: displayBio })), showMeta && !isCompact && (_jsxs("div", { className: cn("flex flex-wrap items-center gap-4 text-sm text-hive-text-secondary", isVertical && "justify-center"), children: [user.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-4 w-4" }), _jsx("span", { children: user.location })] })), (user.school || user.major) && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(GraduationCap, { className: "h-4 w-4" }), _jsxs("span", { children: [user.major && user.school ? `${user.major} at ${user.school}` :
                                                user.major || user.school, user.gradYear && ` '${user.gradYear.slice(-2)}`] })] })), user.website && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(LinkIcon, { className: "h-4 w-4" }), _jsx("a", { href: user.website, target: "_blank", rel: "noopener noreferrer", className: "text-hive-gold hover:underline", children: displayWebsite })] })), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "h-4 w-4" }), _jsxs("span", { children: ["Joined ", joinDate] })] })] })), isCompact && (_jsxs("div", { className: "flex items-center gap-2", children: [isOwnProfile ? (_jsx(ProfileAction, { actionType: "edit", onClick: onEditProfile, size: "xs" })) : (_jsxs(_Fragment, { children: [_jsx(ProfileAction, { actionType: "message", size: "xs" }), _jsx(ProfileAction, { actionType: "connect", size: "xs" })] })), _jsx(ProfileAction, { actionType: "share", onClick: onShareProfile, size: "xs", iconOnly: true })] })), children] })] }));
}
// Preset variants for common use cases
export function CompactProfileHeader(props) {
    return (_jsx(ProfileHeader, { layout: "compact", avatarSize: "md", showMeta: false, showBio: false, ...props }));
}
export function CardProfileHeader(props) {
    return _jsx(ProfileHeader, { variant: "card", ...props });
}
export function MinimalProfileHeader(props) {
    return (_jsx(ProfileHeader, { variant: "minimal", showMeta: false, ...props }));
}
// Export variants for external use
export { profileHeaderVariants };
//# sourceMappingURL=profile-header.js.map