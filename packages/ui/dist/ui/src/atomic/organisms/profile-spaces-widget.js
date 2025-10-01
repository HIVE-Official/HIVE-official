'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card } from '../atoms/card';
import { Badge } from '../atoms/badge';
import { Users, Lock, Unlock, Crown, Star, ChevronRight, Plus } from 'lucide-react';
import { PrivacyControl } from '../molecules/privacy-control';
/**
 * My Spaces Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - Luxury card design with subtle depth
 * - Gold accent for leadership/special roles
 * - 8px grid spacing
 * - Mobile-optimized cards
 */
export const MySpacesWidget = ({ spaces = [], isOwnProfile = false, privacyLevel = 'public', onPrivacyChange, onSpaceClick, onExploreSpaces, className = '' }) => {
    const getSpaceTypeColor = (type) => {
        switch (type) {
            case 'academic':
                return 'text-blue-400';
            case 'social':
                return 'text-[#FFD700]';
            case 'event':
                return 'text-green-400';
            case 'housing':
                return 'text-purple-400';
            default:
                return 'text-gray-400';
        }
    };
    const getActivityIndicator = (level) => {
        switch (level) {
            case 'high':
                return { color: 'bg-green-500', pulse: true };
            case 'medium':
                return { color: 'bg-[#FFD700]', pulse: false };
            case 'low':
                return { color: 'bg-gray-500', pulse: false };
        }
    };
    return (_jsxs(Card, { className: `
        relative overflow-hidden
        bg-black border border-white/8
        p-6 space-y-4
        transition-all duration-300
        hover:border-white/16
        ${className}
      `, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-gray-900 rounded-lg", children: _jsx(Users, { className: "w-4 h-4 text-[#FFD700]" }) }), _jsx("h3", { className: "text-lg font-medium text-white", children: "My Spaces" }), spaces.length > 0 && (_jsx(Badge, { variant: "secondary", className: "bg-gray-900 text-gray-300", children: spaces.length }))] }), isOwnProfile && onPrivacyChange && (_jsx(PrivacyControl, { level: privacyLevel, onLevelChange: onPrivacyChange, compact: true, className: "backdrop-blur-sm" }))] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: spaces.length === 0 ? (_jsxs("div", { className: "col-span-full text-center py-8", children: [_jsx(Users, { className: "w-8 h-8 text-gray-600 mx-auto mb-3" }), _jsx("p", { className: "text-sm text-gray-400", children: "No spaces joined yet" }), isOwnProfile && (_jsx("button", { onClick: onExploreSpaces, className: "\n                  mt-4 px-4 py-2\n                  bg-[#FFD700] hover:bg-[#FFD700]/90\n                  text-black font-medium text-sm\n                  rounded-lg\n                  transition-all duration-200\n                  min-h-[44px]\n                ", children: "Explore Spaces" }))] })) : (spaces.slice(0, 6).map((space) => {
                    const activityIndicator = getActivityIndicator(space.activityLevel);
                    return (_jsxs("button", { onClick: () => onSpaceClick?.(space.id), className: "\n                  group relative\n                  bg-gray-900 hover:bg-gray-800\n                  border border-white/8 hover:border-white/16\n                  rounded-lg p-4\n                  transition-all duration-200\n                  text-left\n                  min-h-[88px]\n                ", children: [space.role === 'leader' && (_jsx("div", { className: "absolute -top-1 -right-1", children: _jsx("div", { className: "bg-[#FFD700] rounded-full p-1", children: _jsx(Crown, { className: "w-3 h-3 text-black" }) }) })), _jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "text-sm font-medium text-white truncate", children: space.name }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [space.isPrivate ? (_jsx(Lock, { className: "w-3 h-3 text-gray-500" })) : (_jsx(Unlock, { className: "w-3 h-3 text-gray-500" })), _jsx("span", { className: `text-xs ${getSpaceTypeColor(space.type)}`, children: space.type })] })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: `
                        w-2 h-2 rounded-full
                        ${activityIndicator.color}
                        ${activityIndicator.pulse ? 'animate-pulse' : ''}
                      ` }), space.unreadCount && space.unreadCount > 0 && (_jsx("div", { className: "absolute -top-1 -right-1", children: _jsx("div", { className: "bg-[#FFD700] text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium", children: space.unreadCount > 9 ? '9+' : space.unreadCount }) }))] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3 h-3 text-gray-500" }), _jsx("span", { className: "text-xs text-gray-400", children: space.memberCount })] }), space.role === 'moderator' && (_jsx(Star, { className: "w-3 h-3 text-[#FFD700]" }))] }), _jsx(ChevronRight, { className: "\n                    w-4 h-4 text-gray-600\n                    opacity-0 group-hover:opacity-100\n                    transition-opacity duration-200\n                  " })] })] }, space.id));
                })) }), spaces.length > 0 && onExploreSpaces && (_jsxs("button", { onClick: onExploreSpaces, className: "\n            w-full py-3 px-4\n            bg-gray-900 hover:bg-gray-800\n            border border-dashed border-white/8 hover:border-white/16\n            text-sm text-gray-300 hover:text-white\n            rounded-lg\n            transition-all duration-200\n            flex items-center justify-center gap-2\n            min-h-[44px]\n          ", children: [_jsx(Plus, { className: "w-4 h-4" }), "Discover more spaces"] })), spaces.some(s => s.role === 'leader' || s.role === 'moderator') && (_jsx("div", { className: "pt-4 border-t border-white/8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Crown, { className: "w-4 h-4 text-[#FFD700]" }), _jsx("span", { className: "text-xs text-gray-400", children: "Leadership" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-xs text-[#FFD700] font-medium", children: [spaces.filter(s => s.role === 'leader').length, " leading"] }), spaces.some(s => s.role === 'moderator') && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-xs text-gray-500", children: "\u2022" }), _jsxs("span", { className: "text-xs text-gray-300", children: [spaces.filter(s => s.role === 'moderator').length, " moderating"] })] }))] })] }) }))] }));
};
//# sourceMappingURL=profile-spaces-widget.js.map