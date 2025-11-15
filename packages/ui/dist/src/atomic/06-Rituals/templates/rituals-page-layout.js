'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../../lib/utils';
import { RitualCard } from '../organisms/ritual-card';
// import { RitualFeedBannerCard, type RitualFeedBannerCardProps } from '../organisms/ritual-feed-banner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../00-Global/atoms/tabs';
import { Sparkles, Calendar, CheckCircle2 } from 'lucide-react';
/**
 * RitualsPageLayout
 *
 * Complete rituals page with:
 * - Tab filters (Active, Upcoming, Completed)
 * - Featured ritual banner
 * - Grid of ritual cards
 * - Empty states per tab
 */
export const RitualsPageLayout = React.forwardRef(({ rituals, featuredRitual, 
// featuredRitualBanner, // Temporarily disabled
onRitualJoin, onRitualView, 
// onBannerAction, // Temporarily disabled (related to featuredRitualBanner)
defaultTab = 'active', isLoading = false, className, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultTab);
    const filteredRituals = React.useMemo(() => {
        return rituals.filter((r) => r.status === activeTab);
    }, [rituals, activeTab]);
    const renderEmptyState = (tab) => {
        const emptyStates = {
            active: {
                icon: Sparkles,
                title: 'No active rituals',
                description: 'Check back soon for new campus-wide challenges',
            },
            upcoming: {
                icon: Calendar,
                title: 'No upcoming rituals',
                description: 'New rituals are added regularly',
            },
            completed: {
                icon: CheckCircle2,
                title: 'No completed rituals yet',
                description: 'Join a ritual to start building habits',
            },
        };
        const state = emptyStates[tab];
        const Icon = state.icon;
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [_jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--hive-background-tertiary)]", children: _jsx(Icon, { className: "h-8 w-8 text-[var(--hive-text-tertiary)]" }) }), _jsx("h3", { className: "mb-2 text-lg font-semibold text-[var(--hive-text-primary)]", children: state.title }), _jsx("p", { className: "text-sm text-[var(--hive-text-tertiary)]", children: state.description })] }));
    };
    return (_jsx("div", { ref: ref, className: cn('min-h-screen bg-[var(--hive-background-primary)]', className), ...props, children: _jsxs("div", { className: "mx-auto max-w-7xl px-4 py-8", role: "main", "aria-labelledby": "rituals-title", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { id: "rituals-title", className: "mb-2 text-3xl font-bold text-[var(--hive-text-primary)]", children: "Campus Rituals" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Build better habits together. Join campus-wide behavioral campaigns." })] }), activeTab === 'active' && (_jsxs("div", { className: "mb-8 space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }), _jsx("span", { className: "text-sm font-semibold uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]", children: "Featured" })] }), featuredRitual ? (_jsx(RitualCard, { ritual: featuredRitual, variant: "featured", onJoin: () => onRitualJoin?.(featuredRitual.id), onViewDetails: () => onRitualView?.(featuredRitual.id), className: "max-w-md" })) : null] })), _jsxs(Tabs, { value: activeTab, onValueChange: (v) => setActiveTab(v), children: [_jsxs(TabsList, { className: "mb-6", "aria-label": "Ritual filters", children: [_jsxs(TabsTrigger, { value: "active", children: ["Active", rituals.filter((r) => r.status === 'active').length > 0 && (_jsx("span", { className: "ml-2 rounded-full bg-[var(--hive-background-tertiary)] px-2 py-0.5 text-xs", children: rituals.filter((r) => r.status === 'active').length }))] }), _jsxs(TabsTrigger, { value: "upcoming", children: ["Upcoming", rituals.filter((r) => r.status === 'upcoming').length > 0 && (_jsx("span", { className: "ml-2 rounded-full bg-[var(--hive-background-tertiary)] px-2 py-0.5 text-xs", children: rituals.filter((r) => r.status === 'upcoming').length }))] }), _jsxs(TabsTrigger, { value: "completed", children: ["Completed", rituals.filter((r) => r.status === 'completed').length > 0 && (_jsx("span", { className: "ml-2 rounded-full bg-[var(--hive-background-tertiary)} px-2 py-0.5 text-xs", children: rituals.filter((r) => r.status === 'completed').length }))] })] }), _jsx(TabsContent, { value: "active", "aria-label": "Active rituals", children: isLoading ? (_jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [...Array(6)].map((_, i) => (_jsx("div", { className: "h-80 animate-pulse rounded-2xl bg-[var(--hive-background-secondary)]" }, i))) })) : filteredRituals.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", role: "list", children: filteredRituals.map((ritual) => (_jsx(RitualCard, { role: "listitem", ritual: ritual, onJoin: () => onRitualJoin?.(ritual.id), onViewDetails: () => onRitualView?.(ritual.id) }, ritual.id))) })) : (renderEmptyState('active')) }), _jsx(TabsContent, { value: "upcoming", "aria-label": "Upcoming rituals", children: isLoading ? (_jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [...Array(6)].map((_, i) => (_jsx("div", { className: "h-80 animate-pulse rounded-2xl bg-[var(--hive-background-secondary)]" }, i))) })) : filteredRituals.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", role: "list", children: filteredRituals.map((ritual) => (_jsx(RitualCard, { role: "listitem", ritual: ritual, onJoin: () => onRitualJoin?.(ritual.id), onViewDetails: () => onRitualView?.(ritual.id) }, ritual.id))) })) : (renderEmptyState('upcoming')) }), _jsx(TabsContent, { value: "completed", "aria-label": "Completed rituals", children: isLoading ? (_jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [...Array(6)].map((_, i) => (_jsx("div", { className: "h-80 animate-pulse rounded-2xl bg-[var(--hive-background-secondary)]" }, i))) })) : filteredRituals.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", role: "list", children: filteredRituals.map((ritual) => (_jsx(RitualCard, { role: "listitem", ritual: ritual, onViewDetails: () => onRitualView?.(ritual.id) }, ritual.id))) })) : (renderEmptyState('completed')) })] })] }) }));
});
RitualsPageLayout.displayName = 'RitualsPageLayout';
//# sourceMappingURL=rituals-page-layout.js.map