/**
 * SpaceCard - Purpose-built for UB campus spaces
 *
 * Shows the information students actually scan for:
 * 1. What's the space about? (name, activity)
 * 2. Who's there? (member count, activity level)
 * 3. How do I join? (clear action)
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Users, MessageSquare, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Card } from '../ui/card.js';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Badge } from '../ui/badge.js';
export function SpaceCard({ space, showLocation = true, showActivity = true, onJoin, onView, isJoined = false, className }) {
    const handleJoinClick = (e) => {
        e.stopPropagation();
        onJoin?.(space.id);
    };
    const handleCardClick = () => {
        onView?.(space.id);
    };
    const categoryColors = {
        academic: 'bg-blue-500/10 text-blue-400 border-blue-400/30',
        residential: 'bg-green-500/10 text-green-400 border-green-400/30',
        social: 'bg-purple-500/10 text-purple-400 border-purple-400/30',
        professional: 'bg-amber-500/10 text-amber-400 border-amber-400/30'
    };
    return (_jsx(Card, { className: cn("cursor-pointer border border-gray-700 bg-[var(--hive-background-primary)] hover:border-gray-600 hover:bg-gray-850", className), onClick: handleCardClick, children: _jsxs("div", { className: "p-4 space-y-3", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-inverse)] text-base leading-tight line-clamp-2", children: space.name }), space.isActive && (_jsx("div", { className: "flex-shrink-0 h-2 w-2 bg-green-400 rounded-full animate-pulse", title: "Active now" }))] }), space.description && (_jsx("p", { className: "text-sm text-gray-400 line-clamp-2 leading-relaxed", children: space.description }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-500", children: [showLocation && space.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { children: space.location })] })), showActivity && space.recentActivity && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MessageSquare, { className: "h-3 w-3" }), _jsx("span", { children: space.recentActivity })] }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-500", children: [_jsx(Users, { className: "h-3 w-3" }), _jsxs("span", { children: [space.memberCount, " ", space.memberCount === 1 ? 'member' : 'members'] })] }), _jsx(Badge, { variant: "secondary", className: cn("text-xs px-2 py-0.5 border", categoryColors[space.category]), children: space.category }), space.isPrivate && (_jsx(Badge, { variant: "secondary", className: "text-xs px-2 py-0.5", children: "Private" }))] }), _jsx(Button, { size: "sm", variant: isJoined ? "secondary" : "primary", onClick: handleJoinClick, className: "text-xs px-3 py-1.5 h-auto", children: isJoined ? "Joined ✓" : "Join" })] })] })] }) }));
}
// Compact version for lists
export function SpaceCardCompact({ space, onJoin, isJoined, className }) {
    return (_jsxs("div", { className: cn("flex items-center justify-between p-3 border-b border-gray-700 hover:bg-gray-800/50", className), children: [_jsx("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-inverse)] text-sm truncate", children: space.name }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [_jsx(Users, { className: "h-3 w-3" }), _jsxs("span", { children: [space.memberCount, " members"] }), space.isActive && (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-1 w-1 bg-gray-500 rounded-full" }), _jsx("span", { className: "text-green-400", children: "Active" })] }))] })] }) }), _jsx(Button, { size: "sm", variant: isJoined ? "secondary" : "primary", onClick: (e) => {
                    e.stopPropagation();
                    onJoin?.(space.id);
                }, className: "text-xs px-3 py-1.5 h-auto flex-shrink-0", children: isJoined ? "Joined" : "Join" })] }));
}
// Loading skeleton
export function SpaceCardSkeleton() {
    return (_jsx(Card, { className: "border border-gray-700 bg-[var(--hive-background-primary)]", children: _jsxs("div", { className: "p-4 space-y-3", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-5 bg-gray-800 rounded animate-pulse" }), _jsx("div", { className: "h-4 bg-gray-800 rounded animate-pulse w-3/4" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-3 bg-gray-800 rounded animate-pulse w-1/2" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("div", { className: "h-4 bg-gray-800 rounded animate-pulse w-1/3" }), _jsx("div", { className: "h-8 bg-gray-800 rounded animate-pulse w-16" })] })] })] }) }));
}
//# sourceMappingURL=simple-space-card.js.map