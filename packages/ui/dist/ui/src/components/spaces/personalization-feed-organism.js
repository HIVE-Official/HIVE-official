"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { HiveCard } from "../hive-card";
import { HiveButton } from "../hive-button";
import { Grid } from "../Grid";
import { Heart, Activity, Target, Zap, Plus, ArrowRight, Crown, Star, Users } from "lucide-react";
import { cn } from "../../lib/utils";
function MySpacesSection({ spaces = [], onSpaceClick, onBrowseSpaces, isLoading = false, layout = "default" }) {
    const getRoleBadge = (role) => {
        if (role === "owner") {
            return (_jsxs("div", { className: "flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs", children: [_jsx(Crown, { className: "h-3 w-3" }), "Owner"] }));
        }
        if (role === "admin") {
            return (_jsxs("div", { className: "flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs", children: [_jsx(Star, { className: "h-3 w-3" }), "Admin"] }));
        }
        return null;
    };
    const getInitials = (name) => {
        return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase();
    };
    if (isLoading) {
        return (_jsxs(HiveCard, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-5 h-5 bg-[var(--hive-text-primary)]/10 rounded animate-pulse" }), _jsx("div", { className: "h-6 bg-[var(--hive-text-primary)]/10 rounded w-32 animate-pulse" })] }), _jsx("div", { className: "space-y-3", children: Array.from({ length: 3 }).map((_, i) => (_jsx("div", { className: "h-12 bg-[var(--hive-text-primary)]/5 rounded-lg animate-pulse" }, i))) })] }));
    }
    return (_jsxs(HiveCard, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)] hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] transition-all", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Heart, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "My Spaces" }), _jsxs("span", { className: "text-sm text-[var(--hive-text-tertiary)]", children: ["(", spaces.length, ")"] })] }), spaces.length > 0 ? (_jsxs("div", { className: "space-y-2", children: [spaces.slice(0, layout === "expanded" ? 5 : 3).map((space) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] transition-all cursor-pointer group", onClick: () => onSpaceClick?.(space.id), children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center text-[var(--hive-background-primary)] font-semibold text-xs", children: getInitials(space.name) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-medium text-sm truncate", children: space.name }), getRoleBadge(space.role)] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-text-tertiary)]", children: [_jsx(Users, { className: "h-3 w-3" }), space.memberCount || 0, " members", space.isActive && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsxs("div", { className: "flex items-center gap-1 text-green-400", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" }), "Active"] })] }))] })] }), _jsx(ArrowRight, { className: "h-4 w-4 text-[var(--hive-brand-secondary)] group-hover:translate-x-1 transition-transform flex-shrink-0" })] }, space.id))), spaces.length > (layout === "expanded" ? 5 : 3) && (_jsx("div", { className: "text-center pt-2", children: _jsxs(HiveButton, { size: "sm", variant: "ghost", onClick: onBrowseSpaces, className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)]", children: ["View all ", spaces.length, " spaces"] }) }))] })) : (_jsxs("div", { className: "text-center py-4", children: [_jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm mb-3", children: "No spaces joined yet" }), _jsx(HiveButton, { size: "sm", onClick: onBrowseSpaces, className: "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/30", children: "Browse Spaces" })] }))] }));
}
function RecommendationsSection({ recommendations = [], onRecommendationClick, onJoinSpace, isLoading = false, layout = "default" }) {
    const getInitials = (name) => {
        return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase();
    };
    const getConfidenceColor = (confidence) => {
        if (!confidence)
            return "text-[var(--hive-text-tertiary)]";
        if (confidence >= 0.8)
            return "text-green-400";
        if (confidence >= 0.6)
            return "text-yellow-400";
        return "text-blue-400";
    };
    if (isLoading) {
        return (_jsxs(HiveCard, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-5 h-5 bg-[var(--hive-text-primary)]/10 rounded animate-pulse" }), _jsx("div", { className: "h-6 bg-[var(--hive-text-primary)]/10 rounded w-32 animate-pulse" })] }), _jsx("div", { className: "space-y-3", children: Array.from({ length: 3 }).map((_, i) => (_jsx("div", { className: "h-16 bg-[var(--hive-text-primary)]/5 rounded-lg animate-pulse" }, i))) })] }));
    }
    return (_jsxs(HiveCard, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)] hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] transition-all", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Zap, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Recommended" })] }), recommendations.length > 0 ? (_jsx("div", { className: "space-y-3", children: recommendations.slice(0, layout === "expanded" ? 5 : 3).map((space) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] transition-all cursor-pointer group", onClick: () => onRecommendationClick?.(space.id), children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-interactive-active)] rounded-lg flex items-center justify-center text-[var(--hive-text-primary)] font-semibold text-xs", children: getInitials(space.name) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-medium text-sm truncate mb-1", children: space.name }), _jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)] truncate", children: [space.reason || "Suggested for you", space.confidence && (_jsxs("span", { className: cn("ml-2", getConfidenceColor(space.confidence)), children: [Math.round(space.confidence * 100), "% match"] }))] })] }), _jsx(HiveButton, { size: "sm", variant: "ghost", onClick: (e) => {
                                e.stopPropagation();
                                onJoinSpace?.(space.id);
                            }, className: "p-2 hover:bg-[var(--hive-brand-secondary)]/20 group-hover:bg-[var(--hive-brand-secondary)]/20", children: _jsx(Plus, { className: "h-4 w-4 text-[var(--hive-brand-secondary)] group-hover:scale-110 transition-transform" }) })] }, space.id))) })) : (_jsx("div", { className: "text-center py-4", children: _jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "No recommendations available" }) }))] }));
}
function ActivityStatsSection({ stats, isLoading = false }) {
    if (isLoading) {
        return (_jsxs(HiveCard, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-5 h-5 bg-[var(--hive-text-primary)]/10 rounded animate-pulse" }), _jsx("div", { className: "h-6 bg-[var(--hive-text-primary)]/10 rounded w-32 animate-pulse" })] }), _jsx("div", { className: "space-y-4", children: Array.from({ length: 3 }).map((_, i) => (_jsxs("div", { className: "flex justify-between", children: [_jsx("div", { className: "h-4 bg-[var(--hive-text-primary)]/5 rounded w-20 animate-pulse" }), _jsx("div", { className: "h-6 bg-[var(--hive-text-primary)]/10 rounded w-8 animate-pulse" })] }, i))) })] }));
    }
    const defaultStats = {
        spacesJoined: 0,
        weeklyGrowth: 0,
        activeNow: 0,
        ...stats
    };
    return (_jsxs(HiveCard, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Activity, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Your Activity" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-tertiary)]", children: "Spaces Joined" }), _jsx("span", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: defaultStats.spacesJoined })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-tertiary)]", children: "This Week" }), _jsxs("span", { className: cn("text-lg font-bold", defaultStats.weeklyGrowth > 0 ? "text-[var(--hive-brand-secondary)]" : "text-[var(--hive-text-primary)]"), children: [defaultStats.weeklyGrowth > 0 ? '+' : '', defaultStats.weeklyGrowth] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-tertiary)]", children: "Active Now" }), _jsx("span", { className: "text-lg font-bold text-green-400", children: defaultStats.activeNow })] }), defaultStats.totalInteractions !== undefined && (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-tertiary)]", children: "Total Interactions" }), _jsx("span", { className: "text-lg font-bold text-blue-400", children: defaultStats.totalInteractions })] }))] })] }));
}
export function PersonalizationFeedOrganism({ mySpaces = [], recommendedSpaces = [], activityStats, title = "Your Campus Hub", subtitle = "Personalized recommendations and quick access to your active communities", onSpaceClick, onRecommendationClick, onBrowseSpaces, onJoinSpace, layout = "default", showSections = {
    mySpaces: true,
    recommendations: true,
    activity: true
}, isLoading = {}, className }) {
    const getGridConfig = () => {
        switch (layout) {
            case "compact":
                return { base: 1, md: 2 };
            case "expanded":
                return { base: 1, md: 2, lg: 3, xl: 4 };
            default:
                return { base: 1, md: 2, lg: 3 };
        }
    };
    const getPadding = () => {
        switch (layout) {
            case "compact":
                return "p-6";
            case "expanded":
                return "p-10";
            default:
                return "p-8";
        }
    };
    return (_jsxs(HiveCard, { className: cn(getPadding(), "bg-gradient-to-br from-[var(--hive-brand-secondary)]/5 to-[var(--hive-brand-secondary)]/10 border-[var(--hive-brand-secondary)]/20 relative overflow-hidden", className), children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[var(--hive-brand-secondary)]/10 via-transparent to-[var(--hive-brand-secondary)]/5 -translate-x-full animate-pulse" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "flex items-center justify-center gap-3 mb-4", children: [_jsx(Target, { className: "h-6 w-6 text-[var(--hive-brand-secondary)]" }), _jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: title })] }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] max-w-2xl mx-auto", children: subtitle })] }), _jsxs(Grid, { cols: getGridConfig(), gap: 6, children: [showSections.mySpaces && (_jsx(MySpacesSection, { spaces: mySpaces, onSpaceClick: onSpaceClick, onBrowseSpaces: onBrowseSpaces, isLoading: isLoading.mySpaces, layout: layout })), showSections.recommendations && (_jsx(RecommendationsSection, { recommendations: recommendedSpaces, onRecommendationClick: onRecommendationClick, onJoinSpace: onJoinSpace, isLoading: isLoading.recommendations, layout: layout })), showSections.activity && (_jsx(ActivityStatsSection, { stats: activityStats, isLoading: isLoading.activity }))] })] })] }));
}
//# sourceMappingURL=personalization-feed-organism.js.map