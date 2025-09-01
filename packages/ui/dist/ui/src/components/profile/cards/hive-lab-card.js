'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion } from '../../framer-motion-proxy.js';
import { cn } from '../../../lib/utils.js';
import { Card, CardContent, CardHeader } from '../../atomic/ui/card';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../atomic/atoms/badge';
import { Progress } from '../../ui/progress.js';
import { Zap, Plus, Settings, Crown, Star, Wrench, Rocket, Users, Eye, Award, BarChart3, Edit, ExternalLink, Sparkles, Beaker, Database, Layout, Smartphone, Lightbulb } from 'lucide-react';
// Tool Type Configuration
const toolTypeConfig = {
    form: {
        icon: Layout,
        color: 'bg-blue-500',
        textColor: 'text-blue-700',
        bgColor: 'bg-blue-50',
        label: 'Form'
    },
    calculator: {
        icon: Database,
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50',
        label: 'Calculator'
    },
    tracker: {
        icon: BarChart3,
        color: 'bg-purple-500',
        textColor: 'text-purple-700',
        bgColor: 'bg-purple-50',
        label: 'Tracker'
    },
    game: {
        icon: Smartphone,
        color: 'bg-pink-500',
        textColor: 'text-pink-700',
        bgColor: 'bg-pink-50',
        label: 'Game'
    },
    utility: {
        icon: Wrench,
        color: 'bg-orange-500',
        textColor: 'text-orange-700',
        bgColor: 'bg-orange-50',
        label: 'Utility'
    },
    social: {
        icon: Users,
        color: 'bg-red-500',
        textColor: 'text-red-700',
        bgColor: 'bg-red-50',
        label: 'Social'
    },
    academic: {
        icon: Award,
        color: 'bg-indigo-500',
        textColor: 'text-indigo-700',
        bgColor: 'bg-indigo-50',
        label: 'Academic'
    }
};
// Status Configuration
const statusConfig = {
    draft: {
        icon: Edit,
        color: 'bg-gray-500',
        textColor: 'text-gray-700',
        label: 'Draft'
    },
    testing: {
        icon: Beaker,
        color: 'bg-yellow-500',
        textColor: 'text-yellow-700',
        label: 'Testing'
    },
    published: {
        icon: Rocket,
        color: 'bg-green-500',
        textColor: 'text-green-700',
        label: 'Live'
    },
    archived: {
        icon: Archive,
        color: 'bg-gray-400',
        textColor: 'text-[var(--hive-text-muted)]',
        label: 'Archived'
    }
};
// Builder Level Configuration
const builderLevelConfig = {
    1: { title: 'Apprentice', color: 'text-[var(--hive-text-muted)]', bgColor: 'bg-[var(--hive-background-secondary)]' },
    2: { title: 'Maker', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    3: { title: 'Artisan', color: 'text-green-600', bgColor: 'bg-green-100' },
    4: { title: 'Expert', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    5: { title: 'Master', color: 'text-orange-600', bgColor: 'bg-orange-100' },
    6: { title: 'Legend', color: 'text-red-600', bgColor: 'bg-red-100' }
};
// Tool Item Component
function ToolItem({ tool, onClick, variant = 'compact' }) {
    const config = toolTypeConfig[tool.type];
    const statusConfig_ = statusConfig[tool.status];
    const TypeIcon = config.icon;
    const StatusIcon = statusConfig_.icon;
    return (_jsxs(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: cn('p-2 rounded-lg border transition-all cursor-pointer', 'bg-white border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]'), onClick: () => onClick?.(tool.id), children: [_jsxs("div", { className: "flex items-start gap-2", children: [_jsx("div", { className: cn('w-6 h-6 rounded flex items-center justify-center flex-shrink-0', config.color), children: _jsx(TypeIcon, { className: "w-3 h-3 text-[var(--hive-text-inverse)]" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h5", { className: "font-medium text-xs text-[var(--hive-text-primary)] truncate", children: tool.name }), _jsxs(Badge, { variant: "secondary", className: "text-xs px-1 py-0", children: [_jsx(StatusIcon, { className: "w-2 h-2 mr-1" }), statusConfig_.label] })] }), variant === 'compact' && (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-xs text-[var(--hive-text-muted)] line-clamp-1 mt-0.5", children: tool.description }), _jsxs("div", { className: "flex items-center gap-3 mt-1 text-xs text-[var(--hive-text-muted)]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-2.5 h-2.5" }), tool.usage.uniqueUsers] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-2.5 h-2.5" }), tool.usage.totalUses] }), tool.usage.rating > 0 && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-2.5 h-2.5" }), tool.usage.rating.toFixed(1)] }))] })] }))] })] }), tool.progress < 100 && tool.status === 'draft' && (_jsxs("div", { className: "mt-2", children: [_jsx(Progress, { value: tool.progress, className: "h-1" }), _jsxs("span", { className: "text-xs text-[var(--hive-text-muted)]", children: [tool.progress, "% complete"] })] }))] }));
}
// Builder Stats Component
function BuilderStatsDisplay({ stats }) {
    const levelConfig = builderLevelConfig[Math.min(stats.level, 6)];
    const xpProgress = (stats.xp / (stats.xp + stats.xpToNext)) * 100;
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: cn('inline-flex items-center gap-2 px-2 py-1 rounded-full', levelConfig.bgColor), children: [_jsx(Crown, { className: cn('w-3 h-3', levelConfig.color) }), _jsxs("span", { className: cn('text-xs font-medium', levelConfig.color), children: ["Level ", stats.level, " ", levelConfig.title] })] }), _jsxs("div", { className: "mt-2", children: [_jsx(Progress, { value: xpProgress, className: "h-1" }), _jsxs("p", { className: "text-xs text-[var(--hive-text-muted)] mt-1", children: [stats.xp, " / ", stats.xp + stats.xpToNext, " XP"] })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: stats.publishedTools }), _jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Published" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: stats.totalUses }), _jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Total Uses" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: stats.streak }), _jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Day Streak" })] })] }), stats.badges.length > 0 && (_jsxs("div", { className: "flex justify-center gap-1", children: [stats.badges.slice(0, 3).map((badge) => (_jsx("div", { className: "w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center", title: badge.name, children: _jsx("span", { className: "text-xs", children: badge.icon }) }, badge.id))), stats.badges.length > 3 && (_jsx("div", { className: "w-6 h-6 bg-[var(--hive-background-secondary)] rounded-full flex items-center justify-center", children: _jsxs("span", { className: "text-xs text-[var(--hive-text-muted)]", children: ["+", stats.badges.length - 3] }) }))] }))] }));
}
// Non-Builder Welcome Component
function NonBuilderWelcome({ onBecomeBuilder }) {
    return (_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: "w-12 h-12 mx-auto bg-[var(--hive-brand-gold)] rounded-full flex items-center justify-center", children: _jsx(Sparkles, { className: "w-6 h-6 text-[var(--hive-text-inverse)]" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-1", children: "Become a Builder" }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted)] leading-relaxed", children: "Create tools that help your campus community. Join the builder program!" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "text-xs text-[var(--hive-text-muted)]", children: ["\u2728 Create custom tools", _jsx("br", {}), "\uD83D\uDC51 Earn builder status", _jsx("br", {}), "\uD83D\uDE80 Share with your spaces"] }), _jsxs(Button, { size: "sm", className: "w-full", onClick: onBecomeBuilder, children: [_jsx(Lightbulb, { className: "w-3 h-3 mr-2" }), "Apply to Build"] })] })] }));
}
// Quick Actions Component
function QuickActions({ onCreateTool, hasTools }) {
    const quickTemplates = [
        { type: 'form', label: 'Form', icon: Layout },
        { type: 'calculator', label: 'Calculator', icon: Database },
        { type: 'tracker', label: 'Tracker', icon: BarChart3 }
    ];
    return (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("span", { className: "text-xs font-medium text-[var(--hive-text-muted)]", children: "Quick Create" }) }), _jsx("div", { className: "grid grid-cols-3 gap-1", children: quickTemplates.map(({ type, label, icon: Icon }) => (_jsxs(Button, { size: "sm", variant: "secondary", className: "h-8 px-2 text-xs", onClick: onCreateTool, children: [_jsx(Icon, { className: "w-3 h-3 mr-1" }), label] }, type))) }), hasTools && (_jsxs(Button, { size: "sm", variant: "ghost", className: "w-full h-6 text-xs", children: [_jsx(ExternalLink, { className: "w-3 h-3 mr-1" }), "View All Tools"] }))] }));
}
// Main HiveLAB Card Component
export function HiveLabCard({ tools, builderStats, isBuilder, isEditMode, onCreateTool, onToolClick, onSettingsClick, className }) {
    const [showAllTools, setShowAllTools] = useState(false);
    const recentTools = useMemo(() => tools
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .slice(0, showAllTools ? undefined : 2), [tools, showAllTools]);
    const activeTools = useMemo(() => tools.filter(tool => tool.status === 'published' || tool.status === 'testing'), [tools]);
    const draftTools = useMemo(() => tools.filter(tool => tool.status === 'draft'), [tools]);
    return (_jsxs(Card, { className: cn('h-full overflow-hidden', className), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "w-5 h-5 text-[var(--hive-brand-gold)]" }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] text-sm", children: "HiveLAB" }), isBuilder && (_jsxs(Badge, { variant: "primary", className: "text-xs bg-[var(--hive-brand-gold)]", children: [_jsx(Crown, { className: "w-3 h-3 mr-1" }), "Builder"] }))] }), !isEditMode && isBuilder && (_jsx(Button, { size: "sm", variant: "ghost", className: "h-6 w-6 p-0", onClick: onSettingsClick, children: _jsx(Settings, { className: "w-3 h-3" }) }))] }) }), _jsx(CardContent, { className: "space-y-3", children: !isBuilder ? (_jsx(NonBuilderWelcome, { onBecomeBuilder: onCreateTool })) : (_jsxs(_Fragment, { children: [_jsx(BuilderStatsDisplay, { stats: builderStats }), tools.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-xs font-medium text-[var(--hive-text-muted)]", children: ["Recent Tools (", tools.length, ")"] }), tools.length > 2 && !showAllTools && (_jsx(Button, { size: "sm", variant: "ghost", className: "h-4 px-1 text-xs", onClick: () => setShowAllTools(true), children: "View All" }))] }), _jsx("div", { className: "space-y-1", children: recentTools.map((tool) => (_jsx(ToolItem, { tool: tool, onClick: onToolClick, variant: "minimal" }, tool.id))) })] })), _jsx(QuickActions, { onCreateTool: onCreateTool, hasTools: tools.length > 0 }), draftTools.length > 0 && (_jsxs("div", { className: "p-2 bg-[var(--hive-background-tertiary)] rounded text-xs", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Edit, { className: "w-3 h-3 text-[var(--hive-text-muted)]" }), _jsxs("span", { className: "text-[var(--hive-text-muted)]", children: [draftTools.length, " draft", draftTools.length > 1 ? 's' : '', " in progress"] })] }), draftTools[0] && (_jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: draftTools[0].name }), _jsx(Progress, { value: draftTools[0].progress, className: "h-1 mt-1" })] }))] })), tools.length === 0 && (_jsxs("div", { className: "text-center py-4", children: [_jsx(Beaker, { className: "w-8 h-8 mx-auto mb-2 text-[var(--hive-text-muted)] opacity-50" }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted)] mb-2", children: "Start building your first tool!" }), _jsxs(Button, { size: "sm", onClick: onCreateTool, children: [_jsx(Plus, { className: "w-3 h-3 mr-1" }), "Create Tool"] })] }))] })) })] }));
}
// Default props for development
export const mockTools = [
    {
        id: 'tool-1',
        name: 'Study Group Scheduler',
        description: 'Schedule and manage study sessions for your courses',
        type: 'form',
        status: 'published',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        usage: {
            totalUses: 145,
            uniqueUsers: 23,
            thisWeek: 18,
            rating: 4.7,
            reviews: 12
        },
        progress: 100,
        isPublic: true,
        isShared: true,
        spaceId: 'space-cs250',
        spaceName: 'CS 250 Study Group'
    },
    {
        id: 'tool-2',
        name: 'GPA Calculator',
        description: 'Calculate your semester and cumulative GPA',
        type: 'calculator',
        status: 'testing',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 60 * 1000),
        usage: {
            totalUses: 67,
            uniqueUsers: 45,
            thisWeek: 22,
            rating: 4.9,
            reviews: 8
        },
        progress: 95,
        isPublic: false,
        isShared: false
    },
    {
        id: 'tool-3',
        name: 'Habit Tracker',
        description: 'Track daily habits and build streaks',
        type: 'tracker',
        status: 'draft',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        usage: {
            totalUses: 0,
            uniqueUsers: 0,
            thisWeek: 0,
            rating: 0,
            reviews: 0
        },
        progress: 65,
        isPublic: false,
        isShared: false
    }
];
export const mockBuilderStats = {
    level: 3,
    xp: 2450,
    xpToNext: 550,
    totalTools: 8,
    publishedTools: 3,
    totalUses: 1247,
    streak: 12,
    badges: [
        {
            id: 'badge-1',
            name: 'First Tool',
            icon: '🚀',
            earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            description: 'Published your first tool'
        },
        {
            id: 'badge-2',
            name: 'Popular Creator',
            icon: '⭐',
            earnedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            description: 'Tool reached 100+ uses'
        },
        {
            id: 'badge-3',
            name: 'Streak Master',
            icon: '🔥',
            earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            description: '10-day building streak'
        }
    ],
    achievements: [
        {
            id: 'achievement-1',
            title: 'Tool Master',
            progress: 3,
            total: 5,
            completed: false
        },
        {
            id: 'achievement-2',
            title: 'Community Helper',
            progress: 147,
            total: 500,
            completed: false
        }
    ]
};
//# sourceMappingURL=hive-lab-card.js.map