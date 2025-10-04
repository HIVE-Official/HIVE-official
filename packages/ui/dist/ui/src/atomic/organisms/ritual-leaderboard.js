"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Card } from "../atoms/card.js";
import { Avatar } from "../atoms/avatar.js";
import { Badge } from "../atoms/badge.js";
import { Trophy, Medal, Award } from "lucide-react";
const RitualLeaderboard = React.forwardRef(({ className, entries, limit, highlightCurrentUser = true, ...props }, ref) => {
    const displayEntries = limit ? entries.slice(0, limit) : entries;
    const getRankIcon = (rank) => {
        if (rank === 1)
            return _jsx(Trophy, { className: "h-5 w-5 text-[#FFD700]" });
        if (rank === 2)
            return _jsx(Medal, { className: "h-5 w-5 text-[#C0C0C0]" });
        if (rank === 3)
            return _jsx(Award, { className: "h-5 w-5 text-[#CD7F32]" });
        return null;
    };
    const getRankColor = (rank) => {
        if (rank === 1)
            return "text-[#FFD700]";
        if (rank === 2)
            return "text-[#C0C0C0]";
        if (rank === 3)
            return "text-[#CD7F32]";
        return "text-white/50";
    };
    return (_jsxs("div", { ref: ref, className: cn("space-y-2", className), ...props, children: [displayEntries.map((entry) => {
                const isTop3 = entry.rank <= 3;
                const isCurrentUser = highlightCurrentUser && entry.isCurrentUser;
                return (_jsxs(Card, { className: cn("p-4 transition-all duration-200", "bg-[#0c0c0c] border border-white/8", "hover:border-white/20", isCurrentUser && "border-[#FFD700]/30 bg-[#FFD700]/5"), children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 flex-shrink-0", children: isTop3 ? (getRankIcon(entry.rank)) : (_jsx("span", { className: cn("text-2xl font-bold", getRankColor(entry.rank)), children: entry.rank })) }), _jsx(Avatar, { className: "h-10 w-10 border border-white/20", children: entry.avatar ? (_jsx("img", { src: entry.avatar, alt: entry.name })) : (_jsx("div", { className: "bg-white/10 w-full h-full flex items-center justify-center text-white", children: entry.name.charAt(0).toUpperCase() })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h4", { className: "text-sm font-semibold text-white truncate", children: entry.name }), isCurrentUser && (_jsx(Badge, { variant: "freshman", className: "border-[#FFD700]/30 text-[#FFD700] text-xs", children: "You" }))] }), _jsxs("p", { className: "text-xs text-white/50", children: ["@", entry.handle] })] }), _jsxs("div", { className: "text-right flex-shrink-0", children: [_jsxs("div", { className: cn("text-xl font-bold", entry.progress === 100 ? "text-[#FFD700]" : "text-white"), children: [entry.progress, "%"] }), entry.progress === 100 && (_jsx("div", { className: "text-xs text-[#FFD700]", children: "Complete" }))] })] }), _jsx("div", { className: "mt-3 h-1.5 bg-white/8 rounded-full overflow-hidden", children: _jsx("div", { className: cn("h-full rounded-full transition-all duration-500", entry.progress === 100 ? "bg-[#FFD700]" : "bg-white/30"), style: { width: `${entry.progress}%` } }) })] }, entry.rank));
            }), limit && entries.length > limit && (_jsx("div", { className: "text-center py-2", children: _jsxs("p", { className: "text-sm text-white/50", children: ["+", entries.length - limit, " more participants"] }) }))] }));
});
RitualLeaderboard.displayName = "RitualLeaderboard";
export { RitualLeaderboard };
//# sourceMappingURL=ritual-leaderboard.js.map