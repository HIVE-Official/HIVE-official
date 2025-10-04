"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Button } from "../atoms/button.js";
import { Badge } from "../atoms/badge.js";
import { Card } from "../atoms/card.js";
import { RitualProgressRing } from "../molecules/ritual-progress-ring.js";
import { RitualMilestoneTrack } from "../organisms/ritual-milestone-track.js";
import { RitualLeaderboard } from "../organisms/ritual-leaderboard.js";
import { Calendar, Users, Trophy, Clock, ArrowLeft } from "lucide-react";
const RitualDetailView = React.forwardRef(({ className, ritual, onJoin, onLeave, onMilestoneClick, onBack, onShare, showLeaderboard = true, ...props }, ref) => {
    const [isJoining, setIsJoining] = React.useState(false);
    const handleJoinLeave = async () => {
        setIsJoining(true);
        try {
            if (ritual.hasJoined) {
                await onLeave?.();
            }
            else {
                await onJoin?.();
            }
        }
        finally {
            setIsJoining(false);
        }
    };
    return (_jsxs("div", { ref: ref, className: cn("min-h-screen bg-[#000000] pb-20", className), ...props, children: [_jsx("div", { className: "sticky top-0 z-50 border-b border-white/8 bg-[#0c0c0c]/95 backdrop-blur", children: _jsxs("div", { className: "max-w-4xl mx-auto px-6 py-4 flex items-center justify-between", children: [onBack && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onBack, className: "text-white/70 hover:text-white", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] })), _jsx("div", { className: "flex-1" }), onShare && (_jsx(Button, { variant: "outline", size: "sm", onClick: onShare, className: "border-white/20 text-white", children: "Share" }))] }) }), _jsxs("div", { className: "max-w-4xl mx-auto px-6 py-8 space-y-8", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "text-6xl mb-4", children: ritual.icon }), _jsx("h1", { className: "text-3xl md:text-4xl font-bold text-white", children: ritual.title }), _jsx("p", { className: "text-lg text-white/70 max-w-2xl mx-auto", children: ritual.description }), _jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(Badge, { variant: "freshman", className: "border-white/20 text-white", children: ritual.type }), _jsx(Badge, { variant: "freshman", className: "border-white/20 text-white", children: ritual.category })] })] }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { size: "lg", onClick: handleJoinLeave, disabled: isJoining, className: cn("min-w-[200px] text-base font-semibold", ritual.hasJoined
                                ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                                : "bg-[#FFD700] text-black hover:bg-[#FFD700]/90 border border-[#FFD700]"), children: isJoining
                                ? "..."
                                : ritual.hasJoined
                                    ? "Leave Ritual"
                                    : "Join Ritual" }) }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs(Card, { className: "bg-[#0c0c0c] border border-white/8 p-4 text-center", children: [_jsx(Users, { className: "h-5 w-5 text-white/50 mx-auto mb-2" }), _jsx("div", { className: "text-2xl font-bold text-white", children: ritual.progress.participants.toLocaleString() }), _jsx("div", { className: "text-xs text-white/50", children: "Participants" })] }), _jsxs(Card, { className: "bg-[#0c0c0c] border border-white/8 p-4 text-center", children: [_jsx(Trophy, { className: "h-5 w-5 text-[#FFD700] mx-auto mb-2" }), _jsxs("div", { className: "text-2xl font-bold text-white", children: [ritual.progress.campus, "%"] }), _jsx("div", { className: "text-xs text-white/50", children: "Campus Progress" })] }), _jsxs(Card, { className: "bg-[#0c0c0c] border border-white/8 p-4 text-center", children: [_jsx(Calendar, { className: "h-5 w-5 text-white/50 mx-auto mb-2" }), _jsx("div", { className: "text-2xl font-bold text-white", children: ritual.endDate }), _jsx("div", { className: "text-xs text-white/50", children: "Ends" })] }), _jsxs(Card, { className: "bg-[#0c0c0c] border border-white/8 p-4 text-center", children: [_jsx(Clock, { className: "h-5 w-5 text-white/50 mx-auto mb-2" }), _jsx("div", { className: "text-2xl font-bold text-white", children: ritual.timeRemaining ? `${ritual.timeRemaining.days}d ${ritual.timeRemaining.hours}h` : "—" }), _jsx("div", { className: "text-xs text-white/50", children: "Remaining" })] })] }), ritual.hasJoined && (_jsx("div", { className: "flex justify-center", children: _jsx(RitualProgressRing, { personal: ritual.progress.personal, campus: ritual.progress.campus, size: "lg" }) })), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Milestones" }), _jsx(RitualMilestoneTrack, { milestones: ritual.milestones, onMilestoneClick: onMilestoneClick })] }), (ritual.rewards.badge || ritual.rewards.title || ritual.rewards.feature) && (_jsxs(Card, { className: "bg-[#0c0c0c] border border-[#FFD700]/30 p-6", children: [_jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [_jsx("span", { children: "\uD83C\uDF81" }), "Rewards"] }), _jsxs("div", { className: "space-y-3", children: [ritual.rewards.badge && (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { className: "bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30", children: "Badge" }), _jsx("span", { className: "text-white", children: ritual.rewards.badge })] })), ritual.rewards.title && (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { className: "bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30", children: "Title" }), _jsx("span", { className: "text-white", children: ritual.rewards.title })] })), ritual.rewards.feature && (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { className: "bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30", children: "Feature" }), _jsx("span", { className: "text-white", children: ritual.rewards.feature })] }))] })] })), showLeaderboard && ritual.hasJoined && (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Leaderboard" }), _jsx(RitualLeaderboard, { entries: [
                                    { rank: 1, name: "Sarah Chen", handle: "sarachen", progress: 100, avatar: undefined },
                                    { rank: 2, name: "Mike Johnson", handle: "mikej", progress: 95, avatar: undefined },
                                    { rank: 3, name: "Emma Davis", handle: "emmad", progress: 87, avatar: undefined },
                                ] })] }))] })] }));
});
RitualDetailView.displayName = "RitualDetailView";
export { RitualDetailView };
//# sourceMappingURL=ritual-detail-view.js.map