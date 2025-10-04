"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../atoms/card";
import { Badge } from "../atoms/badge";
import { Progress } from "../atoms/progress";
import { Trophy, Users, Zap, Heart, Target, Flame, Clock, TrendingUp, } from "lucide-react";
const RitualsCardStrip = React.forwardRef(({ className, rituals = [], onRitualClick, onJoinRitual, showEmptyState = false, ...props }, ref) => {
    if (rituals.length === 0 && !showEmptyState) {
        return null;
    }
    return (_jsxs("div", { ref: ref, className: cn("space-y-2", className), ...props, children: [_jsxs("div", { className: "flex items-center justify-between px-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Flame, { className: "h-4 w-4 text-[#FFD700]" }), _jsx("h3", { className: "text-sm font-bold text-foreground uppercase tracking-wide", children: "Campus Rituals" })] }), rituals.length > 0 && (_jsxs(Badge, { variant: "freshman", className: "text-xs border-black", children: [rituals.filter(r => r.hasJoined).length, " active"] }))] }), _jsxs("div", { className: "flex gap-3 overflow-x-auto pb-2 scrollbar-hide", children: [rituals.map((ritual) => (_jsx(RitualCard, { ritual: ritual, onClick: () => onRitualClick?.(ritual.id), onJoin: () => onJoinRitual?.(ritual.id) }, ritual.id))), showEmptyState && rituals.length === 0 && (_jsxs(Card, { className: "p-6 flex-shrink-0 w-64 flex flex-col items-center justify-center text-center border-2 border-gray-200", children: [_jsx("div", { className: "text-4xl mb-2", children: "\uD83C\uDFAF" }), _jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "No Active Rituals" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Check back soon for campus-wide challenges" })] }))] })] }));
});
RitualsCardStrip.displayName = "RitualsCardStrip";
const RitualCard = ({ ritual, onClick, onJoin }) => {
    // Monochrome type system - use typography and borders instead of color
    const typeIcons = {
        onboarding: _jsx(Target, { className: "h-4 w-4" }),
        seasonal: _jsx(Trophy, { className: "h-4 w-4" }),
        challenge: _jsx(Zap, { className: "h-4 w-4" }),
        emergency: _jsx(Heart, { className: "h-4 w-4" }),
    };
    // Progress hierarchy: Gold for complete, black for high progress, gray for low
    const progressBorderClass = ritual.progress.percentage === 100
        ? "border-[#FFD700]"
        : ritual.progress.percentage >= 50
            ? "border-black"
            : "border-gray-300";
    return (_jsxs(Card, { className: cn("relative flex-shrink-0 w-64 p-4 cursor-pointer transition-all border-2", "hover:border-black", ritual.hasJoined && "ring-2 ring-[#FFD700]", ritual.status === "completed" && "bg-gray-50 dark:bg-gray-950"), onClick: onClick, children: [_jsx("div", { className: "absolute -top-2 -right-2", children: _jsx("div", { className: cn("relative h-12 w-12 rounded-full flex items-center justify-center", "bg-background border-4", progressBorderClass), children: _jsx("span", { className: "text-xs font-bold", children: ritual.icon }) }) }), _jsxs("div", { className: cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mb-3 uppercase tracking-wide", "bg-black text-white"), children: [typeIcons[ritual.type], _jsx("span", { children: ritual.type })] }), _jsx("h4", { className: "text-sm font-bold text-foreground mb-1 line-clamp-2", children: ritual.title }), _jsx("p", { className: "text-xs text-muted-foreground mb-3 line-clamp-2", children: ritual.description }), _jsxs("div", { className: "mb-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Your Progress" }), _jsxs("span", { className: cn("text-xs font-bold", ritual.progress.percentage === 100 && "text-[#FFD700]"), children: [ritual.progress.current, "/", ritual.progress.total] })] }), _jsx(Progress, { value: ritual.progress.percentage, className: cn("h-2", ritual.progress.percentage === 100 && "[&>div]:bg-[#FFD700]") })] }), ritual.currentMilestone && ritual.hasJoined && (_jsx("div", { className: "mb-3 p-2 border-2 border-gray-200 rounded text-xs", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-muted-foreground font-semibold", children: "Next:" }), _jsx("span", { className: "font-bold text-foreground", children: ritual.currentMilestone.name })] }) })), _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-3", children: [_jsx(Users, { className: "h-3 w-3" }), _jsxs("span", { className: "font-medium", children: [ritual.campusProgress.participants.toLocaleString(), " students joined", ritual.campusProgress.target && (_jsxs("span", { className: "ml-1 font-bold text-foreground", children: ["(", Math.round(ritual.campusProgress.percentage), "%)"] }))] })] }), ritual.status === "active" && (_jsxs("div", { className: cn("flex items-center gap-1 text-xs mb-3 font-semibold", ritual.timeRemaining.isUrgent ? "text-[#FFD700]" : "text-muted-foreground"), children: [_jsx(Clock, { className: "h-3 w-3" }), _jsxs("span", { children: [ritual.timeRemaining.days > 0 && `${ritual.timeRemaining.days}d `, ritual.timeRemaining.hours, "h remaining"] })] })), ritual.isTrending && (_jsxs("div", { className: "flex items-center gap-1 text-xs mb-3", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-[#FFD700]" }), _jsx("span", { className: "font-semibold text-foreground", children: "Trending" })] })), ritual.rewards.badge && (_jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx(Trophy, { className: "h-3 w-3 text-[#FFD700]" }), _jsxs("span", { className: "font-medium", children: ["Earn: ", ritual.rewards.badge] })] })), !ritual.hasJoined && ritual.status === "active" && (_jsx("button", { onClick: (e) => {
                    e.stopPropagation();
                    onJoin();
                }, className: "absolute bottom-4 right-4 px-3 py-1.5 bg-black text-white text-xs font-bold rounded-md hover:bg-gray-900 transition-colors border-2 border-black", children: "Join" })), ritual.status === "completed" && (_jsx("div", { className: "absolute top-4 right-4", children: _jsx(Badge, { className: "bg-[#FFD700] text-black border-none font-bold", children: "\u2713 Complete" }) }))] }));
};
export { RitualsCardStrip };
//# sourceMappingURL=rituals-card-strip.js.map