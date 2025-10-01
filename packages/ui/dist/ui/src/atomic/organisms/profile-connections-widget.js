'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../atoms/card';
import { Avatar } from '../atoms/avatar';
import { Badge } from '../atoms/badge';
import { Users, UserPlus, Heart, Link, Sparkles, ChevronRight, Shield } from 'lucide-react';
import { PrivacyControl } from '../molecules/privacy-control';
import { PresenceIndicator } from '../atoms/presence-indicator';
/**
 * My Connections Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - Two-layer social graph visualization
 * - Gold accent for friends (inner circle)
 * - Connection strength algorithm visualization
 * - Mobile-optimized grid layout
 */
export const MyConnectionsWidget = ({ connections = [], pendingFriendRequests = 0, isOwnProfile = false, privacyLevel = 'public', onPrivacyChange, onConnectionClick, onViewAll, onManageFriends, className = '' }) => {
    const [viewMode, setViewMode] = useState('all');
    const friends = connections.filter(c => c.isFriend);
    const displayConnections = viewMode === 'friends' ? friends : connections;
    const getConnectionStrengthColor = (strength) => {
        if (strength >= 70)
            return 'border-[#FFD700]';
        if (strength >= 40)
            return 'border-white/40';
        return 'border-white/16';
    };
    const formatLastInteraction = (date) => {
        if (!date)
            return 'Never';
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0)
            return 'Today';
        if (days === 1)
            return 'Yesterday';
        if (days < 7)
            return `${days} days ago`;
        if (days < 30)
            return `${Math.floor(days / 7)} weeks ago`;
        return `${Math.floor(days / 30)} months ago`;
    };
    return (_jsxs(Card, { className: `
        relative overflow-hidden
        bg-black border border-white/8
        p-6 space-y-4
        transition-all duration-300
        hover:border-white/16
        ${className}
      `, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-gray-900 rounded-lg", children: _jsx(Users, { className: "w-4 h-4 text-[#FFD700]" }) }), _jsx("h3", { className: "text-lg font-medium text-white", children: "My Connections" }), _jsx(Badge, { variant: "secondary", className: "bg-gray-900 text-gray-300", children: connections.length })] }), isOwnProfile && onPrivacyChange && (_jsx(PrivacyControl, { level: privacyLevel, onLevelChange: onPrivacyChange, compact: true, className: "backdrop-blur-sm" }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setViewMode('all'), className: `
            flex-1 py-2 px-3
            text-sm font-medium
            rounded-lg transition-all duration-200
            min-h-[44px]
            ${viewMode === 'all'
                            ? 'bg-gray-800 text-white border border-white/16'
                            : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-300'}
          `, children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(Link, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "All Connections" }), _jsx(Badge, { variant: "secondary", className: "bg-black/50 text-gray-300 text-xs", children: connections.length })] }) }), _jsx("button", { onClick: () => setViewMode('friends'), className: `
            flex-1 py-2 px-3
            text-sm font-medium
            rounded-lg transition-all duration-200
            min-h-[44px]
            ${viewMode === 'friends'
                            ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20'
                            : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-300'}
          `, children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(Heart, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Friends" }), _jsx(Badge, { variant: "secondary", className: "bg-black/50 text-[#FFD700] text-xs", children: friends.length })] }) })] }), isOwnProfile && pendingFriendRequests > 0 && (_jsxs("button", { onClick: onManageFriends, className: "\n            w-full p-3\n            bg-[#FFD700]/10 hover:bg-[#FFD700]/20\n            border border-[#FFD700]/20 hover:border-[#FFD700]/30\n            rounded-lg\n            transition-all duration-200\n            flex items-center justify-between\n            group\n          ", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(UserPlus, { className: "w-4 h-4 text-[#FFD700]" }), _jsxs("span", { className: "text-sm text-[#FFD700]", children: [pendingFriendRequests, " pending friend request", pendingFriendRequests !== 1 ? 's' : ''] })] }), _jsx(ChevronRight, { className: "w-4 h-4 text-[#FFD700] opacity-50 group-hover:opacity-100 transition-opacity" })] })), _jsx("div", { className: "space-y-2", children: displayConnections.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Users, { className: "w-8 h-8 text-gray-600 mx-auto mb-3" }), _jsx("p", { className: "text-sm text-gray-400", children: viewMode === 'friends' ? 'No friends yet' : 'No connections yet' }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: viewMode === 'friends'
                                ? 'Send friend requests to your closest connections'
                                : 'Connect with people in your spaces' })] })) : (displayConnections.slice(0, 8).map((connection) => (_jsxs("button", { onClick: () => onConnectionClick?.(connection.id), className: "\n                group w-full\n                flex items-center gap-3\n                p-3 -m-3\n                hover:bg-white/[0.02]\n                rounded-lg\n                transition-all duration-200\n              ", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: `p-0.5 rounded-full ${getConnectionStrengthColor(connection.connectionStrength)}`, children: _jsx(Avatar, { className: "w-10 h-10", children: connection.avatarUrl && (_jsx("img", { src: connection.avatarUrl, alt: connection.name, className: "w-full h-full object-cover rounded-full" })) }) }), connection.presenceStatus && (_jsx("div", { className: "absolute -bottom-1 -right-1", children: _jsx(PresenceIndicator, { status: connection.presenceStatus, size: "sm", lastSeen: connection.lastSeen }) })), connection.isFriend && (_jsx("div", { className: "absolute -top-1 -right-1", children: _jsx("div", { className: "bg-[#FFD700] rounded-full p-0.5", children: _jsx(Heart, { className: "w-2.5 h-2.5 text-black fill-black" }) }) }))] }), _jsxs("div", { className: "flex-1 min-w-0 text-left", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("p", { className: "text-sm font-medium text-white truncate", children: connection.name }), connection.connectionStrength >= 70 && (_jsx(Sparkles, { className: "w-3 h-3 text-[#FFD700]" }))] }), _jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [connection.major && (_jsx("span", { className: "text-xs text-gray-400 truncate", children: connection.major })), connection.mutualSpaces > 0 && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-xs text-gray-500", children: "\u2022" }), _jsxs("span", { className: "text-xs text-gray-500", children: [connection.mutualSpaces, " shared space", connection.mutualSpaces !== 1 ? 's' : ''] })] }))] })] }), _jsxs("div", { className: "flex flex-col items-end", children: [_jsx("div", { className: "text-xs text-gray-500", children: formatLastInteraction(connection.lastInteraction) }), connection.connectionStrength >= 40 && (_jsx("div", { className: "flex items-center gap-1 mt-1", children: _jsx("div", { className: "flex gap-0.5", children: [...Array(3)].map((_, i) => (_jsx("div", { className: `w-1 h-3 rounded-sm ${connection.connectionStrength > (i + 1) * 33
                                                ? 'bg-[#FFD700]'
                                                : 'bg-gray-700'}` }, i))) }) }))] }), _jsx(ChevronRight, { className: "\n                w-4 h-4 text-gray-600\n                opacity-0 group-hover:opacity-100\n                transition-opacity duration-200\n              " })] }, connection.id)))) }), displayConnections.length > 8 && onViewAll && (_jsxs("button", { onClick: onViewAll, className: "\n            w-full py-3 px-4\n            bg-gray-900 hover:bg-gray-800\n            text-sm text-gray-300 hover:text-white\n            rounded-lg\n            transition-all duration-200\n            flex items-center justify-center gap-2\n            min-h-[44px]\n          ", children: ["View all ", viewMode === 'friends' ? 'friends' : 'connections', _jsx(ChevronRight, { className: "w-4 h-4" })] })), _jsx("div", { className: "pt-4 border-t border-white/8 space-y-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "w-3.5 h-3.5 text-gray-400" }), _jsx("span", { className: "text-xs text-gray-400", children: "Trust Network" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-xs text-gray-300", children: [friends.length, " close friends"] }), _jsx("span", { className: "text-xs text-gray-500", children: "\u2022" }), _jsxs("span", { className: "text-xs text-gray-400", children: [connections.filter(c => c.connectionStrength >= 70).length, " strong bonds"] })] })] }) })] }));
};
//# sourceMappingURL=profile-connections-widget.js.map