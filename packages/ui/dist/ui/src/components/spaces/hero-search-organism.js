"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { HiveButton } from "../hive-button";
import { Search, Filter, Globe, Eye, TrendingUp, Users } from "lucide-react";
import { cn } from "../../lib/utils";
function CampusVisualization({ totalSpaces = 360, categoryBreakdown, animationSpeed = "normal", interactive = true, className }) {
    const getAnimationDuration = () => {
        switch (animationSpeed) {
            case "slow": return "duration-1000";
            case "fast": return "duration-300";
            default: return "duration-700";
        }
    };
    const defaultStats = {
        university_organizations: categoryBreakdown?.university_organizations || 180,
        student_organizations: categoryBreakdown?.student_organizations || 120,
        greek_life: categoryBreakdown?.greek_life || 23,
        campus_living: categoryBreakdown?.campus_living || 37,
    };
    return (_jsxs("div", { className: cn("relative w-full h-64 bg-gradient-to-br from-[var(--hive-background-primary)]/50 to-[var(--hive-background-tertiary)]/50 border border-[var(--hive-interactive-active)] rounded-2xl overflow-hidden", interactive && "group cursor-pointer", className), children: [_jsx("div", { className: cn("absolute inset-0 transition-opacity", interactive ? "opacity-20 group-hover:opacity-30" : "opacity-25", getAnimationDuration()), children: _jsxs("svg", { viewBox: "0 0 400 200", className: "w-full h-full", children: [_jsx("rect", { x: "50", y: "80", width: "30", height: "40", rx: "2", className: cn("transition-colors duration-500", interactive
                                ? "fill-[var(--hive-brand-secondary)]/40 group-hover:fill-[var(--hive-brand-secondary)]/60"
                                : "fill-[var(--hive-brand-secondary)]/50") }), _jsx("rect", { x: "100", y: "60", width: "40", height: "60", rx: "2", className: cn("transition-colors duration-700", interactive
                                ? "fill-[var(--hive-brand-secondary)]/30 group-hover:fill-[var(--hive-brand-secondary)]/50"
                                : "fill-[var(--hive-brand-secondary)]/40") }), _jsx("rect", { x: "200", y: "90", width: "35", height: "35", rx: "2", className: cn("transition-colors duration-600", interactive
                                ? "fill-[var(--hive-brand-secondary)]/35 group-hover:fill-[var(--hive-brand-secondary)]/55"
                                : "fill-[var(--hive-brand-secondary)]/45") }), _jsx("rect", { x: "300", y: "70", width: "45", height: "50", rx: "2", className: cn("transition-colors duration-800", interactive
                                ? "fill-[var(--hive-brand-secondary)]/40 group-hover:fill-[var(--hive-brand-secondary)]/60"
                                : "fill-[var(--hive-brand-secondary)]/50") }), [...Array(12)].map((_, i) => (_jsx("circle", { cx: 60 + (i * 25), cy: 140 + (Math.sin(i) * 10), r: "2", className: cn("transition-all duration-1000", interactive
                                ? "fill-white/40 group-hover:fill-[var(--hive-brand-secondary)]/80"
                                : "fill-white/60"), style: { animationDelay: `${i * 100}ms` } }, i))), _jsx("path", { d: "M80,120 Q150,100 220,110 T340,100", className: cn("stroke-2 fill-none transition-all duration-1000", interactive
                                ? "stroke-[var(--hive-brand-secondary)]/20 group-hover:stroke-[var(--hive-brand-secondary)]/40"
                                : "stroke-[var(--hive-brand-secondary)]/30") })] }) }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: cn("text-4xl font-bold transition-colors duration-500", interactive
                                ? "text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-secondary)]"
                                : "text-[var(--hive-brand-secondary)]"), children: totalSpaces }), _jsx("div", { className: cn("text-sm transition-colors", interactive
                                ? "text-[var(--hive-text-tertiary)] group-hover:text-[var(--hive-text-primary)]/80"
                                : "text-[var(--hive-text-primary)]/80"), children: "Active Communities" }), _jsxs("div", { className: cn("flex gap-4 text-xs transition-colors", interactive
                                ? "text-[var(--hive-text-tertiary)] group-hover:text-[var(--hive-text-primary)]/70"
                                : "text-[var(--hive-text-primary)]/70"), children: [_jsxs("span", { children: ["\uD83C\uDF93 ", defaultStats.university_organizations] }), _jsxs("span", { children: ["\uD83D\uDC65 ", defaultStats.student_organizations] }), _jsxs("span", { children: ["\uD83C\uDFDB\uFE0F ", defaultStats.greek_life] }), _jsxs("span", { children: ["\uD83C\uDFE0 ", defaultStats.campus_living] })] })] }) }), interactive && (_jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[var(--hive-brand-secondary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" }))] }));
}
function EnhancedSearchBar({ value = "", onChange, onSearch, placeholder = "Search spaces, organizations, communities...", showFilters = false, onFilterToggle, filterTags = ['Student Orgs', 'Greek Life', 'Academic', 'Sports', 'Arts', 'Tech'], onFilterTag, isLoading = false, className }) {
    const [query, setQuery] = useState(value);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const handleQueryChange = useCallback((newQuery) => {
        setQuery(newQuery);
        onChange?.(newQuery);
    }, [onChange]);
    const handleSubmit = useCallback((e) => {
        e?.preventDefault();
        onSearch?.(query);
    }, [query, onSearch]);
    const handleFilterToggle = useCallback(() => {
        const newState = !filtersVisible;
        setFiltersVisible(newState);
        onFilterToggle?.();
    }, [filtersVisible, onFilterToggle]);
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }, [handleSubmit]);
    return (_jsxs("div", { className: cn("relative w-full max-w-2xl mx-auto", className), children: [_jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--hive-text-tertiary)]" }), _jsx("input", { type: "text", value: query, onChange: (e) => handleQueryChange(e.target.value), onKeyDown: handleKeyDown, placeholder: placeholder, disabled: isLoading, className: cn("w-full h-14 pl-12 pr-16 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-2xl text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] focus:border-[var(--hive-brand-secondary)]/50 focus:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] transition-all duration-300 focus:outline-none", isLoading && "opacity-50 cursor-not-allowed") }), _jsx(HiveButton, { size: "sm", variant: "ghost", type: "button", onClick: handleFilterToggle, disabled: isLoading, className: "absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-[var(--hive-brand-secondary)]/20", children: _jsx(Filter, { className: "h-4 w-4 text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] transition-colors" }) })] }) }), (filtersVisible || showFilters) && (_jsx("div", { className: "absolute top-full left-0 right-0 mt-2 p-4 bg-[color-mix(in_srgb,var(--hive-background-primary)_80%,transparent)] border border-[var(--hive-interactive-active)] rounded-xl backdrop-blur-lg z-10", children: _jsx("div", { className: "flex flex-wrap gap-2", children: filterTags.map((tag) => (_jsx(HiveButton, { size: "sm", variant: "outline", onClick: () => onFilterTag?.(tag), className: "border-[var(--hive-border-hover)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] hover:border-[var(--hive-brand-secondary)]/30", children: tag }, tag))) }) }))] }));
}
function QuickActionButtons({ onBrowseAll, onTrending, onMySpaces, customActions = [], isLoading = false, layout = "horizontal", className }) {
    const defaultActions = [
        {
            label: "Browse All",
            icon: Eye,
            onClick: onBrowseAll,
            variant: "outline",
            className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-active)] group"
        },
        {
            label: "Trending",
            icon: TrendingUp,
            onClick: onTrending,
            variant: "outline",
            className: "border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/10 group"
        },
        {
            label: "My Spaces",
            icon: Users,
            onClick: onMySpaces,
            variant: "outline",
            className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-active)]"
        }
    ];
    const allActions = [...defaultActions, ...customActions];
    return (_jsx("div", { className: cn("flex gap-4 justify-center", layout === "vertical" ? "flex-col items-center" : "flex-wrap", className), children: allActions.map((action, index) => {
            const IconComponent = action.icon;
            return (_jsxs(HiveButton, { variant: action.variant || "outline", onClick: action.onClick, disabled: isLoading || !action.onClick, className: action.className, children: [IconComponent && (_jsx(IconComponent, { className: cn("h-4 w-4 mr-2", action.className?.includes('group') && "group-hover:text-[var(--hive-brand-secondary)] transition-colors") })), action.label] }, `${action.label}-${index}`));
        }) }));
}
export function HeroSearchOrganism({ title = "Campus Spaces", subtitle, totalSpaces = 360, categoryBreakdown, onSearch, onBrowseAll, onTrending, onMySpaces, customActions, campusVisualization, searchConfig, variant = "default", isLoading = false, className }) {
    const getDefaultSubtitle = () => {
        if (subtitle)
            return subtitle;
        return `Discover and connect with ${totalSpaces} pre-seeded communities across your campus ecosystem`;
    };
    const getSpacing = () => {
        switch (variant) {
            case "compact":
                return "pt-4 pb-8";
            case "minimal":
                return "pt-6 pb-12";
            default:
                return "pt-8 pb-16";
        }
    };
    const showVisualization = variant !== "minimal";
    return (_jsxs("div", { className: cn("relative", className), children: [variant === "default" && (_jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [_jsx("div", { className: "absolute -top-40 -right-40 w-80 h-80 bg-[var(--hive-brand-secondary)]/5 rounded-full blur-3xl animate-pulse" }), _jsx("div", { className: "absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--hive-brand-secondary)]/3 rounded-full blur-3xl animate-pulse delay-1000" })] })), _jsx("div", { className: cn("relative z-10", getSpacing()), children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("div", { className: "flex items-center justify-center gap-3 mb-6", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary)] rounded-2xl flex items-center justify-center", children: _jsx(Globe, { className: "h-6 w-6 text-[var(--hive-background-primary)]" }) }), _jsx("h1", { className: "text-5xl font-bold text-[var(--hive-text-primary)]", children: title.includes("Spaces") ? (_jsxs(_Fragment, { children: [title.split(" ")[0], " ", _jsx("span", { className: "text-[var(--hive-brand-secondary)]", children: title.split(" ")[1] })] })) : (title) })] }), _jsx("p", { className: "text-xl text-[var(--hive-text-tertiary)] mb-8 max-w-2xl mx-auto", children: getDefaultSubtitle() }), _jsx("div", { className: "mb-8", children: _jsx(EnhancedSearchBar, { onSearch: onSearch, placeholder: searchConfig?.placeholder, showFilters: searchConfig?.showFilters, filterTags: searchConfig?.filterTags, isLoading: isLoading }) }), _jsx(QuickActionButtons, { onBrowseAll: onBrowseAll, onTrending: onTrending, onMySpaces: onMySpaces, customActions: customActions, isLoading: isLoading })] }), showVisualization && (_jsx("div", { className: "mb-16", children: _jsx(CampusVisualization, { totalSpaces: totalSpaces, categoryBreakdown: categoryBreakdown, animationSpeed: campusVisualization?.animationSpeed, interactive: campusVisualization?.interactive }) }))] }) })] }));
}
//# sourceMappingURL=hero-search-organism.js.map