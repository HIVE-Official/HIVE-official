"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, TrendingUp, UserCheck } from "lucide-react";
import { HiveCard } from "../atoms/hive-card.js";
import { Badge } from "../atoms/badge.js";
import { Button } from "../atoms/button.js";
import { Skeleton } from "../atoms/skeleton.js";
const activityDot = {
    very_active: "bg-green-500",
    active: "bg-blue-500",
    moderate: "bg-yellow-500",
    quiet: "bg-gray-500",
};
export const SpaceCard = ({ space, onJoin, onClick, showFriends, showExclusive, className, ...rest }) => {
    const handleClick = () => {
        onClick?.(space);
    };
    return (_jsxs(HiveCard, { role: "article", "aria-label": `Space: ${space.name}`, tabIndex: 0, className: `bg-gray-900/50 border-gray-800 hover:border-[var(--hive-brand-primary)] transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] ${className ?? ""}`, onClick: handleClick, onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
            }
        }, ...rest, children: [_jsxs("div", { className: "h-24 bg-gradient-to-br from-hive-gold/20 to-purple-600/20 relative", children: [space.bannerImage ? (
                    // Decorative banner; name/description provide context
                    _jsx("img", { src: space.bannerImage, alt: "", className: "w-full h-full object-cover", "aria-hidden": "true" })) : null, space.onlineCount && space.onlineCount > 0 ? (_jsxs("div", { className: "absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur rounded-full px-2 py-1", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }), _jsxs("span", { className: "text-xs text-white", children: [space.onlineCount, " online"] })] })) : null, space.joinPolicy !== "open" ? (_jsx("div", { className: "absolute top-2 left-2", children: _jsx(Badge, { className: "bg-black/60 text-white", "aria-label": space.joinPolicy === "approval" ? "Approval required" : "Invite only", children: space.joinPolicy === "approval" ? "Approval Required" : "Invite Only" }) })) : null] }), _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-bold text-white group-hover:text-[var(--hive-brand-primary)] transition-colors truncate", children: space.name }), _jsx("p", { className: "text-sm text-gray-400 line-clamp-2 mt-1", children: space.description })] }), _jsx("div", { className: `ml-3 w-2 h-2 flex-shrink-0 rounded-full ${activityDot[space.activityLevel]}`, "aria-hidden": "true" })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-400 mb-3", children: [_jsxs("div", { className: "flex items-center gap-1", "aria-label": `${space.memberCount} members`, children: [_jsx(Users, { className: "w-4 h-4", "aria-hidden": "true" }), _jsx("span", { children: space.memberCount })] }), showFriends && (space.friendsInSpace ?? 0) > 0 ? (_jsxs("div", { className: "flex items-center gap-1 text-green-400", "aria-label": `${space.friendsInSpace} friends in space`, children: [_jsx(UserCheck, { className: "w-4 h-4", "aria-hidden": "true" }), _jsx("span", { children: space.friendsInSpace })] })) : null, (space.mutualConnections ?? 0) > 0 ? (_jsxs("div", { className: "flex items-center gap-1", "aria-label": `${space.mutualConnections} mutual connections`, children: [_jsx(TrendingUp, { className: "w-4 h-4", "aria-hidden": "true" }), _jsx("span", { children: space.mutualConnections })] })) : null] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex gap-1", "aria-hidden": "true", children: [_jsx("div", { className: "h-1 bg-red-400 rounded-full transition-all", style: { width: `${(space.anxietyReliefScore ?? 0) * 60}px` } }), _jsx("div", { className: "h-1 bg-green-400 rounded-full transition-all", style: { width: `${(space.socialProofScore ?? 0) * 60}px` } }), showExclusive ? (_jsx("div", { className: "h-1 bg-purple-400 rounded-full transition-all", style: { width: `${(space.insiderAccessScore ?? 0) * 60}px` } })) : null] }), onJoin ? (_jsx(Button, { size: "sm", "aria-label": `Join ${space.name}`, onClick: (e) => {
                                    e.stopPropagation();
                                    onJoin(space);
                                }, className: "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)] hover:text-black", children: "Join" })) : null] }), (space.joinToActiveRate ?? 0) >= 0.7 ? (_jsx("div", { className: "mt-2 pt-2 border-t border-gray-800", children: _jsxs("p", { className: "text-xs text-green-400", children: ["\u2713 ", Math.round((space.joinToActiveRate ?? 0) * 100), "% become active members"] }) })) : null] })] }));
}, as, any;
SpaceCard.Skeleton = function SpaceCardSkeleton() {
    return (_jsxs(HiveCard, { className: "bg-gray-900/50 border-gray-800 overflow-hidden", children: [_jsx(Skeleton, { className: "h-24 w-full rounded-none" }), _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "mb-3", children: [_jsx(Skeleton, { className: "h-5 w-3/4 mb-2" }), _jsx(Skeleton, { className: "h-4 w-full mb-1" }), _jsx(Skeleton, { className: "h-4 w-2/3" })] }), _jsxs("div", { className: "flex items-center gap-4 mb-3", children: [_jsx(Skeleton, { className: "h-4 w-16" }), _jsx(Skeleton, { className: "h-4 w-20" }), _jsx(Skeleton, { className: "h-4 w-24" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex gap-1 flex-1", children: [_jsx(Skeleton, { className: "h-1 w-12 rounded-full" }), _jsx(Skeleton, { className: "h-1 w-10 rounded-full" }), _jsx(Skeleton, { className: "h-1 w-14 rounded-full" })] }), _jsx(Skeleton, { className: "h-9 w-16 rounded-md" })] })] })] }));
};
export default SpaceCard;
//# sourceMappingURL=space-card.js.map