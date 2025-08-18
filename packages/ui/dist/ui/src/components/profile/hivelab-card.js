"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { cn } from "../lib/utils";
export function HiveLabCard({ isBuilder, toolsCreated = 0, totalEngagement = 0, countdownDate, className }) {
    if (isBuilder) {
        return (_jsx(BuilderHiveLabCard, { toolsCreated: toolsCreated, totalEngagement: totalEngagement, className: className }));
    }
    return (_jsx(NonBuilderHiveLabCard, { countdownDate: countdownDate, className: className }));
}
function BuilderHiveLabCard({ toolsCreated, totalEngagement, className }) {
    const nextBadgeTarget = 5;
    const progressPercentage = Math.min((toolsCreated / nextBadgeTarget) * 100, 100);
    return (_jsxs("div", { className: cn("h-full flex flex-col", className), children: [_jsxs("div", { className: "relative mb-6", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 via-[#FFD700]/10 to-transparent rounded-xl -m-4" }), _jsx("div", { className: "relative", children: _jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#E6C200] rounded-xl flex items-center justify-center shadow-lg", children: _jsx("svg", { className: "w-6 h-6 text-black", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M10 12L8 10L10 8L12 10L10 12Z M10 2L13 5L11 7L13 9L10 12L7 9L9 7L7 5L10 2Z" }) }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[#FFD700] font-display", children: "HiveLAB" }), _jsx("p", { className: "text-muted text-sm", children: "Builder Dashboard" })] })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 mb-6", children: [_jsxs("div", { className: "bg-[#2A2A2A]/30 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm text-muted", children: "Tools Created" }), _jsxs("span", { className: "text-xs text-[#FFD700]", children: [toolsCreated, "/", nextBadgeTarget] })] }), _jsx("div", { className: "text-3xl font-bold text-foreground mb-2", children: toolsCreated }), _jsx("div", { className: "w-full bg-[#1A1A1A] rounded-full h-2 mb-1", children: _jsx("div", { className: "bg-gradient-to-r from-[#FFD700] to-[#E6C200] h-2 rounded-full transition-all duration-500", style: { width: `${progressPercentage}%` } }) }), _jsx("div", { className: "text-xs text-muted", children: nextBadgeTarget - toolsCreated > 0
                                    ? `${nextBadgeTarget - toolsCreated} more for Tool Master badge`
                                    : "Tool Master achieved! 🎉" })] }), _jsxs("div", { className: "text-center p-3 bg-[#1A1A1A] rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-[#FFD700] mb-1", children: totalEngagement.toLocaleString() }), _jsx("div", { className: "text-xs text-muted", children: "Total Student Impact" })] })] }), _jsx("div", { className: "mt-auto", children: _jsx("button", { className: "w-full py-3 px-4 bg-gradient-to-r from-[#FFD700] to-[#E6C200] text-black rounded-lg font-semibold text-sm transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:scale-105 hover:shadow-lg hover:shadow-[#FFD700]/20 focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#111111]", children: "\u26A1 Create New Tool" }) })] }));
}
function NonBuilderHiveLabCard({ countdownDate, className }) {
    const [timeLeft, setTimeLeft] = React.useState("");
    React.useEffect(() => {
        if (!countdownDate)
            return;
        const updateCountdown = () => {
            const now = new Date().getTime();
            const target = countdownDate.getTime();
            const difference = target - now;
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${days}d ${hours}h ${minutes}m`);
            }
            else {
                setTimeLeft("Available Now!");
            }
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [countdownDate]);
    return (_jsxs("div", { className: cn("h-full flex flex-col", className), children: [_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-8 h-8 bg-[#2A2A2A] rounded-lg flex items-center justify-center", children: _jsx("svg", { className: "w-5 h-5 text-[#FFD700]", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-foreground font-display", children: "HiveLAB" })] }), _jsx("p", { className: "text-muted text-sm", children: "Tool creation coming soon" })] }), _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center", children: [_jsx("div", { className: "text-3xl font-bold text-[#FFD700] mb-2 font-mono", children: timeLeft || "Soon™" }), _jsx("p", { className: "text-muted text-sm mb-4", children: "Until builder applications open" })] }), _jsx("div", { className: "mt-auto", children: _jsx("button", { className: "w-full py-2 px-4 bg-transparent border border-[#2A2A2A] text-muted rounded-lg font-medium text-sm transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:border-[#FFD700]/50 hover:text-[#FFD700] focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#111111]", children: "Notify Me" }) })] }));
}
//# sourceMappingURL=hivelab-card.js.map