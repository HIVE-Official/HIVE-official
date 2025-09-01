'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Avatar } from "../ui/avatar.js";
import { Typography } from "../ui/typography.js";
import { Button } from "../ui/button.js";
import { Badge } from "../ui/badge.js";
export const UserItem = React.forwardRef(({ user, variant = 'default', showStatus = true, actionButton, onUserClick, className, disabled = false, ...props }, ref) => {
    const handleUserClick = () => {
        if (!disabled && onUserClick) {
            onUserClick(user);
        }
    };
    const handleActionClick = (e) => {
        e.stopPropagation();
        if (actionButton && !actionButton.loading) {
            actionButton.onClick(user);
        }
    };
    // Generate avatar fallback from name
    const avatarFallback = user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    const isInteractive = onUserClick && !disabled;
    return (_jsxs("div", { ref: ref, className: cn("flex items-center gap-3 p-3 rounded-lg transition-colors", isInteractive && "cursor-pointer hover:bg-white/5 focus:bg-white/10 focus:outline-none", disabled && "opacity-50 cursor-not-allowed", user.isBlocked && "opacity-60", className), onClick: handleUserClick, role: isInteractive ? "button" : undefined, tabIndex: isInteractive ? 0 : undefined, onKeyDown: isInteractive ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleUserClick();
            }
        } : undefined, ...props, children: [_jsxs("div", { className: "relative shrink-0", children: [_jsx(Avatar, { size: variant === 'compact' ? 'sm' : 'md', className: cn(user.isGhostMode && "opacity-60", user.isBlocked && "grayscale"), children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-[#2C2C2E] text-[var(--hive-text-inverse)]/70 text-sm font-medium", children: avatarFallback })) }), showStatus && user.isOnline && !user.isGhostMode && !user.isBlocked && (_jsx("div", { className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-black bg-[#34D399]" })), showStatus && user.isGhostMode && (_jsx("div", { className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-black bg-white/30" }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Typography, { size: variant === 'compact' ? 'small' : 'regular', weight: "medium", className: cn("truncate", user.isBlocked && "line-through"), children: user.name }), user.isBuilder && (_jsx(Badge, { variant: "secondary", className: "bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20", children: "Builder" })), user.isGhostMode && (_jsx(Badge, { variant: "secondary", className: "bg-white/10 text-[var(--hive-text-inverse)]/60", children: "Ghost" }))] }), variant !== 'compact' && (_jsxs("div", { className: "flex items-center gap-2 mt-1", children: [user.handle && (_jsxs(Typography, { size: "small", color: "medium", className: "truncate", children: ["@", user.handle] })), user.role && (_jsxs(_Fragment, { children: [user.handle && (_jsx("span", { className: "text-[var(--hive-text-inverse)]/30", children: "\u2022" })), _jsx(Typography, { size: "small", color: "medium", className: "truncate", children: user.role })] })), user.year && (_jsxs(_Fragment, { children: [(user.handle || user.role) && (_jsx("span", { className: "text-[var(--hive-text-inverse)]/30", children: "\u2022" })), _jsxs(Typography, { size: "small", color: "medium", className: "truncate", children: ["Class of ", user.year] })] }))] })), user.isBlocked && variant === 'detailed' && (_jsx(Typography, { size: "small", color: "error", className: "mt-1", children: "This user is blocked" }))] }), actionButton && !user.isBlocked && (_jsx(Button, { variant: actionButton.variant || 'secondary', size: "small", loading: actionButton.loading, onClick: handleActionClick, className: "shrink-0", children: actionButton.label })), variant === 'compact' && showStatus && (_jsxs("div", { className: "shrink-0", children: [user.isOnline && !user.isGhostMode && (_jsx("div", { className: "h-2 w-2 rounded-full bg-[#34D399]" })), user.isGhostMode && (_jsx("div", { className: "h-2 w-2 rounded-full bg-white/30" })), !user.isOnline && !user.isGhostMode && (_jsx("div", { className: "h-2 w-2 rounded-full bg-white/20" }))] }))] }));
});
UserItem.displayName = "UserItem";
// User Item Presets for common use cases
export const UserItemPresets = {
    // Member List Item
    MemberListItem: (props) => (_jsx(UserItem, { variant: "primary", showStatus: true, ...props })),
    // Search Result Item
    SearchResultItem: (props) => (_jsx(UserItem, { variant: "detailed", showStatus: false, ...props })),
    // Compact List Item (for mobile or condensed lists)
    CompactListItem: (props) => (_jsx(UserItem, { variant: "compact", showStatus: true, ...props })),
    // Mention Suggestion Item
    MentionItem: (props) => (_jsx(UserItem, { variant: "primary", showStatus: false, ...props })),
};
export { UserItem as UserItemMolecule };
//# sourceMappingURL=user-item.js.map