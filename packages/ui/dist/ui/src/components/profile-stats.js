"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ProfileStatistic } from '../atomic/atoms/profile-statistic';
import { Users, Zap, BookOpen, Star, TrendingUp, Award, Calendar } from 'lucide-react';
const profileStatsVariants = cva("flex transition-all duration-200", {
    variants: {
        layout: {
            horizontal: "flex-row flex-wrap gap-4",
            vertical: "flex-col gap-3",
            grid: "grid gap-4",
            compact: "flex-row flex-wrap gap-2"
        },
        columns: {
            auto: "",
            "2": "grid-cols-2",
            "3": "grid-cols-3",
            "4": "grid-cols-4",
            "5": "grid-cols-5"
        },
        variant: {
            default: "bg-hive-surface-elevated border border-hive-border-subtle rounded-xl p-4",
            ghost: "bg-transparent p-0",
            minimal: "bg-transparent p-2",
            card: "bg-hive-surface-elevated border border-hive-border-subtle rounded-xl p-6 shadow-lg"
        },
        spacing: {
            tight: "gap-2",
            normal: "gap-4",
            loose: "gap-6"
        }
    },
    defaultVariants: {
        layout: "horizontal",
        columns: "auto",
        variant: "default",
        spacing: "normal"
    }
});
// HIVE stat configurations aligned with unified data model
const HIVE_STAT_CONFIGS = {
    spacesJoined: {
        label: 'Spaces Joined',
        icon: Users,
        iconColor: 'secondary',
        emphasis: 'normal'
    },
    spacesActive: {
        label: 'Active Spaces',
        icon: Zap,
        iconColor: 'gold',
        emphasis: 'secondary'
    },
    spacesLed: {
        label: 'Leading',
        icon: Star,
        iconColor: 'gold',
        emphasis: 'gold'
    },
    toolsUsed: {
        label: 'Tools Used',
        icon: BookOpen,
        iconColor: 'default',
        emphasis: 'normal'
    },
    connectionsCount: {
        label: 'Connections',
        icon: Users,
        iconColor: 'default',
        emphasis: 'normal'
    },
    totalActivity: {
        label: 'Total Activity',
        icon: TrendingUp,
        iconColor: 'success',
        emphasis: 'normal'
    },
    currentStreak: {
        label: 'Current Streak',
        icon: Calendar,
        iconColor: 'warning',
        emphasis: 'normal'
    },
    longestStreak: {
        label: 'Best Streak',
        icon: Award,
        iconColor: 'gold',
        emphasis: 'gold'
    },
    reputation: {
        label: 'Reputation',
        icon: Award,
        iconColor: 'gold',
        emphasis: 'gold'
    },
    achievements: {
        label: 'Achievements',
        icon: Award,
        iconColor: 'success',
        emphasis: 'normal'
    }
};
export function ProfileStats({ stats, priority = ['spacesJoined', 'spacesActive', 'connectionsCount', 'currentStreak'], maxStats = 4, showIcons = true, showTrends = false, interactive = false, onStatClick, changes, loading = false, layout = "horizontal", columns = "auto", variant = "default", spacing = "normal", className, ...props }) {
    // Determine grid columns based on layout and number of stats
    const determinedColumns = React.useMemo(() => {
        if (layout !== "grid")
            return "auto";
        if (columns !== "auto")
            return columns;
        const statsCount = Math.min(priority.length, maxStats);
        if (statsCount <= 2)
            return "2";
        if (statsCount <= 3)
            return "3";
        if (statsCount <= 4)
            return "4";
        return "5";
    }, [layout, columns, priority.length, maxStats]);
    // Filter and prioritize stats
    const displayStats = React.useMemo(() => {
        return priority
            .slice(0, maxStats)
            .map(key => {
            const config = HIVE_STAT_CONFIGS[key];
            const value = stats[key];
            const change = changes?.[key];
            if (value === undefined)
                return null;
            return {
                key,
                value,
                change,
                config,
                onClick: interactive && onStatClick ? () => onStatClick(key, value) : undefined
            };
        })
            .filter(Boolean);
    }, [stats, priority, maxStats, interactive, onStatClick, changes]);
    // Determine stat size based on layout
    const statSize = React.useMemo(() => {
        if (layout === "compact")
            return "xs";
        if (layout === "vertical")
            return "md";
        return "sm";
    }, [layout]);
    // Determine stat variant based on container variant
    const statVariant = React.useMemo(() => {
        if (variant === "ghost" || variant === "minimal")
            return "ghost";
        if (layout === "compact")
            return "compact";
        return "default";
    }, [variant, layout]);
    if (loading) {
        return (_jsx("div", { className: cn(profileStatsVariants({ layout, columns: determinedColumns, variant, spacing }), className), children: Array.from({ length: Math.min(priority.length, maxStats) }).map((_, i) => (_jsx(ProfileStatistic, { value: "", label: "", loading: true, size: statSize, variant: statVariant }, i))) }));
    }
    return (_jsx("div", { className: cn(profileStatsVariants({ layout, columns: determinedColumns, variant, spacing }), className), ...props, children: displayStats.map((stat) => (_jsx(ProfileStatistic, { value: stat.value, label: stat.config.label, icon: showIcons ? stat.config.icon : undefined, iconColor: stat.config.iconColor, emphasis: stat.config.emphasis, change: stat.change, showTrend: showTrends && stat.change !== undefined, size: statSize, variant: statVariant, interactive: !!stat.onClick, onClick: stat.onClick }, stat.key))) }));
}
// Preset variants for common use cases
export function CompactProfileStats(props) {
    return (_jsx(ProfileStats, { layout: "compact", maxStats: 3, showIcons: false, variant: "ghost", ...props }));
}
export function CardProfileStats(props) {
    return _jsx(ProfileStats, { variant: "card", ...props });
}
export function GridProfileStats(props) {
    return _jsx(ProfileStats, { layout: "grid", ...props });
}
export function StudentProfileStats(props) {
    return (_jsx(ProfileStats, { priority: ['spacesJoined', 'connectionsCount', 'currentStreak', 'reputation'], ...props }));
}
export function BuilderProfileStats(props) {
    return (_jsx(ProfileStats, { priority: ['toolsUsed', 'spacesLed', 'reputation', 'totalActivity'], ...props }));
}
export function ActiveUserProfileStats(props) {
    return (_jsx(ProfileStats, { priority: ['spacesActive', 'currentStreak', 'totalActivity', 'achievements'], ...props }));
}
// Export variants for external use
export { profileStatsVariants };
//# sourceMappingURL=profile-stats.js.map