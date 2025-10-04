/**
 * Ritual Progress Card Component
 *
 * Implements campus-wide ritual tracking with behavioral psychology:
 * - Progress rings with Instagram story quality
 * - 70% completion target per SPEC
 * - Streak counters and milestone rewards
 * - Social proof and leaderboard integration
 * - Check-in buttons with haptic feedback simulation
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../atoms/card";
import { Button } from "../atoms/button";
import { Badge } from "../atoms/badge";
import { CheckCircle, Calendar, Users, Crown, Flame, Target, TrendingUp, Zap, Award, } from "lucide-react";
const RitualProgressCard = React.forwardRef(({ className, ritual, onCheckIn, onViewDetails, onViewLeaderboard, onShare, compact = false, enablePsychology = true, ...props }, ref) => {
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Handle check-in with animation
    const handleCheckIn = () => {
        if (!ritual.participation.hasCheckedInToday) {
            setIsAnimating(true);
            onCheckIn?.(ritual.id);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };
    // Calculate ring colors based on category
    const getRingColor = () => {
        switch (ritual.category) {
            case 'health': return 'stroke-green-500';
            case 'academic': return 'stroke-blue-500';
            case 'social': return 'stroke-purple-500';
            case 'campus': return 'stroke-[#FFD700]';
            case 'seasonal': return 'stroke-orange-500';
            default: return 'stroke-gray-500';
        }
    };
    // Progress ring radius and circumference
    const radius = compact ? 35 : 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (ritual.progress.percentage / 100) * circumference;
    // Category icon
    const getCategoryIcon = () => {
        switch (ritual.category) {
            case 'health': return _jsx(Zap, { className: "h-4 w-4" });
            case 'academic': return _jsx(Target, { className: "h-4 w-4" });
            case 'social': return _jsx(Users, { className: "h-4 w-4" });
            case 'campus': return _jsx(Crown, { className: "h-4 w-4" });
            case 'seasonal': return _jsx(Calendar, { className: "h-4 w-4" });
            default: return _jsx(Award, { className: "h-4 w-4" });
        }
    };
    return (_jsxs(Card, { ref: ref, className: cn("relative overflow-hidden transition-all duration-fast ease-smooth", "bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm", "border border-white/10 hover:border-white/20", compact ? "p-3" : "p-4", isAnimating && "scale-105 shadow-lg shadow-[#FFD700]/20", className), ...props, children: [ritual.isNewRitual && (_jsx("div", { className: "absolute top-2 right-2", children: _jsx(Badge, { className: "bg-[#FFD700] text-black text-xs font-semibold animate-pulse", children: "New!" }) })), _jsxs("div", { className: "flex items-start gap-4", children: [_jsxs("div", { className: "relative flex-shrink-0", children: [_jsxs("svg", { className: "transform -rotate-90 transition-all duration-smooth ease-smooth", width: compact ? 80 : 100, height: compact ? 80 : 100, children: [_jsx("circle", { cx: compact ? 40 : 50, cy: compact ? 40 : 50, r: radius, stroke: "rgb(255 255 255 / 0.1)", strokeWidth: "4", fill: "transparent" }), _jsx("circle", { cx: compact ? 40 : 50, cy: compact ? 40 : 50, r: radius, className: cn(getRingColor(), "transition-all duration-smooth ease-smooth"), strokeWidth: "4", fill: "transparent", strokeLinecap: "round", strokeDasharray: circumference, strokeDashoffset: strokeDashoffset, style: {
                                            filter: 'drop-shadow(0 0 6px currentColor)',
                                        } })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: cn("font-bold text-white", compact ? "text-sm" : "text-lg"), children: [ritual.progress.percentage, "%"] }), !compact && (_jsxs("div", { className: "text-xs text-white/60", children: [ritual.progress.current, "/", ritual.progress.target] }))] }) }), ritual.progress.streakDays > 0 && (_jsx("div", { className: "absolute -bottom-1 -right-1", children: _jsxs("div", { className: "bg-orange-500 rounded-full px-1.5 py-0.5 flex items-center gap-1", children: [_jsx(Flame, { className: "h-3 w-3 text-white" }), _jsx("span", { className: "text-xs font-bold text-white", children: ritual.progress.streakDays })] }) }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("div", { className: "text-white/60", children: getCategoryIcon() }), _jsx("h3", { className: cn("font-semibold text-white line-clamp-1", compact ? "text-sm" : "text-base"), children: ritual.title })] }), !compact && (_jsx("p", { className: "text-xs text-white/70 line-clamp-2 mb-2", children: ritual.description }))] }), _jsx(Badge, { variant: "outline", className: "text-xs border-white/20 text-white/70 capitalize", children: ritual.category })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs mb-3", children: [_jsxs("div", { children: [_jsx("span", { className: "text-white/60", children: "Participants:" }), _jsx("span", { className: "ml-1 text-white font-medium", children: ritual.participation.totalParticipants })] }), _jsxs("div", { children: [_jsx("span", { className: "text-white/60", children: "Days left:" }), _jsx("span", { className: "ml-1 text-white font-medium", children: ritual.duration.daysRemaining })] })] }), ritual.participation.friendsParticipating.length > 0 && (_jsx("div", { className: "mb-3", children: _jsxs("div", { className: "text-xs text-[#FFD700] font-medium", children: [ritual.participation.friendsParticipating.slice(0, 2).join(', '), ritual.participation.friendsParticipating.length > 2 &&
                                            ` +${ritual.participation.friendsParticipating.length - 2} friends`, " participating"] }) })), enablePsychology && ritual.motivationalMessage && (_jsx("div", { className: "mb-3 p-2 bg-white/5 rounded text-xs text-white/80 italic", children: ritual.motivationalMessage })), ritual.rewards.nextMilestone && !ritual.progress.isCompleted && (_jsxs("div", { className: "mb-3 p-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded", children: [_jsxs("div", { className: "text-xs text-[#FFD700] font-medium mb-1", children: ["Next milestone: ", ritual.rewards.nextMilestone.description] }), _jsxs("div", { className: "text-xs text-white/70", children: [ritual.rewards.nextMilestone.pointsNeeded, " points to unlock ", ritual.rewards.nextMilestone.reward] })] }))] })] }), _jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/10 mt-3", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: ritual.participation.hasCheckedInToday ? "default" : "outline", size: "sm", className: cn("transition-all duration-fast ease-smooth", ritual.participation.hasCheckedInToday && "bg-green-600 hover:bg-green-600/90", !ritual.participation.hasCheckedInToday && "hover:scale-105 active:scale-95"), onClick: handleCheckIn, disabled: ritual.participation.hasCheckedInToday, children: ritual.participation.hasCheckedInToday ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle, { className: "h-4 w-4 mr-1" }), "Checked In"] })) : (_jsxs(_Fragment, { children: [_jsx(Target, { className: "h-4 w-4 mr-1" }), "Check In"] })) }), ritual.leaderboard && (_jsxs(Button, { variant: "ghost", size: "sm", className: "text-white/70 hover:text-white", onClick: () => onViewLeaderboard?.(ritual.id), children: [_jsx(Crown, { className: "h-4 w-4 mr-1" }), "#", ritual.leaderboard.myRank] }))] }), _jsx("div", { className: "flex gap-1", children: !compact && (_jsx(Button, { variant: "ghost", size: "sm", className: "h-8 px-2 text-white/60 hover:text-white", onClick: () => onViewDetails?.(ritual.id), children: _jsx(TrendingUp, { className: "h-4 w-4" }) })) })] }), ritual.progress.isCompleted && enablePsychology && (_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent pointer-events-none", children: _jsx("div", { className: "absolute top-2 left-2", children: _jsx(Award, { className: "h-6 w-6 text-[#FFD700] animate-pulse" }) }) }))] }));
});
RitualProgressCard.displayName = "RitualProgressCard";
export { RitualProgressCard };
//# sourceMappingURL=ritual-progress-card.js.map