"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import { Badge } from "../atoms/badge";
import { CalendarDays, Layers, Users, LayoutGrid, Clock, TrendingUp, Heart, Sparkles, } from "lucide-react";
const FeedFilters = React.forwardRef(({ className, activeFilter = "all", onFilterChange, activeTimeFilter = null, onTimeFilterChange, eventsCount = 0, urgentEventsCount = 0, ritualsCount = 0, trendingCount = 0, showTimeFilters = false, enablePsychology = true, showLiveActivity = true, compact = false, ...props }, ref) => {
    const filters = [
        {
            id: "all",
            label: "All",
            icon: _jsx(LayoutGrid, { className: "h-4 w-4" }),
        },
        {
            id: "events",
            label: "Events",
            icon: _jsx(CalendarDays, { className: "h-4 w-4" }),
            badge: urgentEventsCount || eventsCount,
            isLive: urgentEventsCount > 0,
            urgencyLevel: urgentEventsCount > 0 ? 'high' : 'medium',
        },
        {
            id: "spaces",
            label: "My Spaces",
            icon: _jsx(Layers, { className: "h-4 w-4" }),
        },
        {
            id: "rituals",
            label: "Rituals",
            icon: _jsx(Heart, { className: "h-4 w-4" }),
            badge: ritualsCount,
            isLive: ritualsCount > 0,
            urgencyLevel: 'medium',
        },
        {
            id: "trending",
            label: "Trending",
            icon: _jsx(TrendingUp, { className: "h-4 w-4" }),
            badge: trendingCount,
            isLive: true,
            urgencyLevel: 'medium',
        },
        {
            id: "friends",
            label: "Friends",
            icon: _jsx(Users, { className: "h-4 w-4" }),
        },
    ];
    const timeFilters = [
        {
            id: "now",
            label: "Happening Now",
            icon: _jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
            description: "Next 2 hours",
        },
        {
            id: "today",
            label: "Today",
            icon: _jsx(Clock, { className: "h-3.5 w-3.5" }),
            description: "Next 24 hours",
        },
        {
            id: "week",
            label: "This Week",
            icon: _jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
            description: "Next 7 days",
        },
    ];
    return (_jsxs("div", { ref: ref, className: cn("space-y-3", className), ...props, children: [_jsx("div", { className: cn("flex gap-2", compact ? "flex-wrap" : "overflow-x-auto pb-2"), children: filters.map((filter) => {
                    const isActive = activeFilter === filter.id;
                    return (_jsxs("div", { className: "relative", children: [_jsxs(Button, { variant: isActive ? "default" : "outline", size: compact ? "sm" : "default", className: cn("shrink-0 transition-all duration-fast ease-smooth", compact ? "h-8 px-3" : "h-10 px-4", "gap-2", 
                                // Behavioral psychology: urgency indicators
                                enablePsychology && filter.urgencyLevel === 'high' && "animate-pulse", enablePsychology && filter.isLive && !isActive && "border-[#FFD700]/30", isActive && filter.isLive && "border-[#FFD700]"), onClick: () => onFilterChange?.(filter.id), children: [_jsx("div", { className: cn("transition-all duration-fast ease-smooth", isActive && "scale-110", filter.isLive && "text-[#FFD700]"), children: filter.icon }), _jsx("span", { children: filter.label }), filter.badge && filter.badge > 0 && (_jsx(Badge, { variant: isActive ? "secondary" : "default", className: cn("h-5 px-1.5 text-[10px] ml-1 transition-all duration-fast ease-smooth", isActive && "bg-[#FFD700] text-black", 
                                        // FOMO generation for high counts
                                        enablePsychology && filter.badge > 10 && "animate-bounce scale-110", filter.urgencyLevel === 'high' && "bg-red-500 text-white"), children: filter.badge > 99 ? '99+' : filter.badge }))] }), showLiveActivity && filter.isLive && (_jsxs("div", { className: "absolute -top-1 -right-1", children: [_jsx("div", { className: "w-2 h-2 bg-[#FFD700] rounded-full animate-ping" }), _jsx("div", { className: "absolute inset-0 w-2 h-2 bg-[#FFD700] rounded-full" })] })), enablePsychology && filter.urgencyLevel === 'high' && (_jsx("div", { className: "absolute inset-0 rounded-md bg-red-500/10 animate-pulse pointer-events-none" }))] }, filter.id));
                }) }), (showTimeFilters || activeTimeFilter) && (_jsxs("div", { className: "flex gap-2 overflow-x-auto pb-2", children: [timeFilters.map((filter) => (_jsxs(Button, { variant: activeTimeFilter === filter.id ? "default" : "ghost", size: "sm", className: "h-8 px-3 gap-1.5 shrink-0", onClick: () => {
                            if (activeTimeFilter === filter.id) {
                                onTimeFilterChange?.(null);
                            }
                            else {
                                onTimeFilterChange?.(filter.id);
                            }
                        }, children: [filter.icon, _jsxs("div", { className: "flex flex-col items-start", children: [_jsx("span", { className: "text-xs leading-none", children: filter.label }), activeTimeFilter === filter.id && (_jsx("span", { className: "text-[10px] text-muted-foreground leading-none mt-0.5", children: filter.description }))] })] }, filter.id))), activeTimeFilter && (_jsx(Button, { variant: "ghost", size: "sm", className: "h-8 px-2 text-xs text-muted-foreground", onClick: () => onTimeFilterChange?.(null), children: "Clear" }))] })), activeFilter !== "all" && !compact && (_jsxs("div", { className: "text-xs text-muted-foreground", children: [activeFilter === "events" && (_jsx("p", { children: "Showing events from your spaces and campus" })), activeFilter === "spaces" && (_jsx("p", { children: "Content from spaces you've joined" })), activeFilter === "friends" && (_jsx("p", { children: "Activity from people you follow" })), activeFilter === "rituals" && (_jsx("p", { children: "Campus-wide challenges and campaigns" })), activeFilter === "trending" && enablePsychology && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("p", { children: "Popular content right now" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" }), _jsx("span", { className: "text-[10px]", children: "Live activity" })] })] }))] })), showLiveActivity && enablePsychology && !compact && (_jsxs("div", { className: "flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/5", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" }), _jsx("span", { children: "247 students active now" })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Sparkles, { className: "h-3 w-3 text-[#FFD700]" }), _jsx("span", { children: "Peak activity 8-10pm" })] })] }))] }));
});
FeedFilters.displayName = "FeedFilters";
export { FeedFilters };
//# sourceMappingURL=feed-filters.js.map