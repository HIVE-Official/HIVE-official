'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../atoms/card.js';
import { Activity, Users, MessageCircle, Heart, Zap, ChevronRight } from 'lucide-react';
import { PrivacyControl } from '../molecules/privacy-control.js';
/**
 * My Activity Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - 8px grid system for spacing
 * - Monochrome with gold accents for key interactions
 * - Subtle hover states with white/4 overlay
 * - Mobile-optimized with 44px touch targets
 */
export const MyActivityWidget = ({ activities = [], isOwnProfile = false, privacyLevel = 'public', onPrivacyChange, onViewAll, className = '' }) => {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'post':
                return MessageCircle;
            case 'comment':
                return MessageCircle;
            case 'connection':
                return Users;
            case 'space_join':
                return Users;
            default:
                return Activity;
        }
    };
    const formatTimestamp = (date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) {
            const mins = Math.floor(diff / (1000 * 60));
            return `${mins}m ago`;
        }
        else if (hours < 24) {
            return `${hours}h ago`;
        }
        else {
            const days = Math.floor(hours / 24);
            return `${days}d ago`;
        }
    };
    return (_jsxs(Card, { className: `
        relative overflow-hidden
        bg-black border border-white/8
        p-6 space-y-4
        transition-all duration-300
        hover:border-white/16
        ${className}
      `, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-gray-900 rounded-lg", children: _jsx(Activity, { className: "w-4 h-4 text-[#FFD700]" }) }), _jsx("h3", { className: "text-lg font-medium text-white", children: "My Activity" })] }), isOwnProfile && onPrivacyChange && (_jsx(PrivacyControl, { level: privacyLevel, onLevelChange: onPrivacyChange, compact: true, className: "backdrop-blur-sm" }))] }), _jsx("div", { className: "space-y-3", children: activities.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Activity, { className: "w-8 h-8 text-gray-600 mx-auto mb-3" }), _jsx("p", { className: "text-sm text-gray-400", children: "No recent activity" }), isOwnProfile && (_jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Start exploring spaces to build your activity" }))] })) : (activities.slice(0, 5).map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    return (_jsxs("div", { className: "\n                  group flex items-start gap-3\n                  p-3 -m-3\n                  hover:bg-white/[0.02]\n                  rounded-lg\n                  transition-all duration-200\n                  cursor-pointer\n                ", children: [_jsx("div", { className: "p-1.5 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors", children: _jsx(Icon, { className: "w-3.5 h-3.5 text-gray-400" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm text-white truncate", children: activity.title }), activity.spaceName && (_jsxs("p", { className: "text-xs text-gray-400 mt-0.5", children: ["in ", activity.spaceName] })), _jsxs("div", { className: "flex items-center gap-3 mt-1", children: [_jsx("span", { className: "text-xs text-gray-500", children: formatTimestamp(activity.timestamp) }), activity.engagementCount !== undefined && activity.engagementCount > 0 && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Heart, { className: "w-3 h-3 text-gray-500" }), _jsx("span", { className: "text-xs text-gray-500", children: activity.engagementCount })] }))] })] }), _jsx(ChevronRight, { className: "\n                  w-4 h-4 text-gray-600\n                  opacity-0 group-hover:opacity-100\n                  transition-opacity duration-200\n                " })] }, activity.id));
                })) }), activities.length > 5 && onViewAll && (_jsxs("button", { onClick: onViewAll, className: "\n            w-full py-3 px-4\n            bg-gray-900 hover:bg-gray-800\n            text-sm text-gray-300 hover:text-white\n            rounded-lg\n            transition-all duration-200\n            flex items-center justify-center gap-2\n            min-h-[44px]\n          ", children: ["View all activity", _jsx(ChevronRight, { className: "w-4 h-4" })] })), activities.length > 0 && (_jsx("div", { className: "pt-4 border-t border-white/8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "w-4 h-4 text-[#FFD700]" }), _jsx("span", { className: "text-xs text-gray-400", children: "Activity Streak" })] }), _jsx("span", { className: "text-xs text-[#FFD700] font-medium", children: "3 days" })] }) }))] }));
};
//# sourceMappingURL=profile-activity-widget.js.map