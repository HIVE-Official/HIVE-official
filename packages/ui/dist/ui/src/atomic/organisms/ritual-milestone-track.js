"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Check, Lock, Circle } from "lucide-react";
import { Badge } from "../atoms/badge";
const RitualMilestoneTrack = React.forwardRef(({ className, milestones, orientation = "vertical", compact = false, onMilestoneClick, ...props }, ref) => {
    const isVertical = orientation === "vertical";
    return (_jsx("div", { ref: ref, className: cn("relative", isVertical ? "space-y-6" : "flex gap-6 overflow-x-auto pb-4", className), ...props, children: milestones.map((milestone, index) => {
            const isFirst = index === 0;
            const isLast = index === milestones.length - 1;
            const isCompleted = milestone.status === "completed";
            const isActive = milestone.status === "active";
            const isLocked = milestone.status === "locked";
            return (_jsxs("div", { className: cn("relative flex", isVertical ? "flex-row gap-4" : "flex-col items-center gap-2", isVertical ? "min-w-0" : "min-w-[200px]"), children: [!isLast && (_jsx("div", { className: cn("absolute bg-white/8", isVertical
                            ? "left-5 top-12 w-0.5 h-full"
                            : "top-5 left-12 w-full h-0.5", isCompleted && "bg-[#FFD700]/30") })), _jsxs("div", { className: cn("relative z-10 shrink-0 flex items-center justify-center rounded-full border-2 transition-all duration-smooth", compact ? "h-10 w-10" : "h-12 w-12", isCompleted &&
                            "bg-[#FFD700] border-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.3)]", isActive &&
                            "bg-white/10 border-white text-white animate-pulse", isLocked && "bg-[#0c0c0c] border-white/20 text-white/30", onMilestoneClick && !isLocked && "cursor-pointer hover:scale-110"), onClick: () => !isLocked && onMilestoneClick?.(milestone), children: [isCompleted && _jsx(Check, { className: "h-5 w-5" }), isActive && milestone.progress !== undefined ? (_jsxs("span", { className: "text-xs font-bold", children: [milestone.progress, "%"] })) : isActive ? (_jsx(Circle, { className: "h-4 w-4 fill-current" })) : null, isLocked && _jsx(Lock, { className: "h-4 w-4" })] }), _jsxs("div", { className: cn("flex-1 min-w-0", isVertical ? "" : "text-center", compact && "space-y-1"), children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h4", { className: cn("font-semibold", compact ? "text-sm" : "text-base", isCompleted && "text-white", isActive && "text-white", isLocked && "text-white/40"), children: milestone.name }), isCompleted && !compact && (_jsx(Badge, { variant: "freshman", className: "h-5 text-[9px] border-[#FFD700]/50 text-[#FFD700]", children: "Done" }))] }), milestone.description && !compact && (_jsx("p", { className: cn("text-sm mt-1", isCompleted && "text-white/70", isActive && "text-white/70", isLocked && "text-white/30"), children: milestone.description })), milestone.reward && (isCompleted || isActive) && !compact && (_jsxs("div", { className: "flex items-center gap-1.5 mt-2 text-xs text-[#FFD700]", children: [_jsx("span", { children: "\uD83C\uDF81" }), _jsx("span", { children: milestone.reward })] })), isActive && milestone.progress !== undefined && !compact && (_jsx("div", { className: "mt-2 h-1.5 bg-white/8 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-[#FFD700] transition-all duration-smooth", style: { width: `${milestone.progress}%` } }) }))] })] }, milestone.id));
        }) }));
});
RitualMilestoneTrack.displayName = "RitualMilestoneTrack";
export { RitualMilestoneTrack };
//# sourceMappingURL=ritual-milestone-track.js.map