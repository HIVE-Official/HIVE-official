'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Plus, ArrowRight, Star, Users, Calendar, BookOpen, DollarSign, Target, Sparkles, Crown, ExternalLink } from 'lucide-react';
import { BaseWidget } from '../bento-grid/base-widget';
import { HiveButton } from '../../hive-button';
import { HiveBadge } from '../../hive-badge';
import { cn } from '../../../lib/utils';
const PREVIEW_TOOLS = [
    {
        id: 'expense-tracker',
        name: 'Group Expense Tracker',
        description: 'Split dinner costs transparently with receipt scanning',
        icon: _jsx(DollarSign, { className: "h-5 w-5" }),
        category: 'Social Coordination',
        emoji: '💰',
        impact: 'Reduces group payment friction by 85%',
        users: '2.3k'
    },
    {
        id: 'availability-matcher',
        name: 'Availability Matcher',
        description: 'Find optimal coordination times across friend groups',
        icon: _jsx(Calendar, { className: "h-5 w-5" }),
        category: 'Social Coordination',
        emoji: '📅',
        impact: 'Saves 20min per group planning session',
        users: '1.8k'
    },
    {
        id: 'event-planner',
        name: 'Event Planning Suite',
        description: 'End-to-end gathering coordination with polling',
        icon: _jsx(Users, { className: "h-5 w-5" }),
        category: 'Social Coordination',
        emoji: '🎪',
        impact: '3x higher event attendance rates',
        users: '4.1k'
    },
    {
        id: 'study-organizer',
        name: 'Study Session Organizer',
        description: 'Academic collaboration with space booking',
        icon: _jsx(BookOpen, { className: "h-5 w-5" }),
        category: 'Academic Tools',
        emoji: '📚',
        impact: 'Improves study group consistency by 60%',
        users: '3.2k'
    },
    {
        id: 'campus-exchange',
        name: 'Campus Exchange',
        description: 'Buy/sell textbooks within trusted network',
        icon: _jsx(ArrowRight, { className: "h-5 w-5" }),
        category: 'Community Marketplace',
        emoji: '📖',
        impact: 'Save avg $200/semester on textbooks',
        users: '5.7k'
    },
    {
        id: 'goal-tracker',
        name: 'Goal Tracker',
        description: 'Personal development with accountability partnerships',
        icon: _jsx(Target, { className: "h-5 w-5" }),
        category: 'Personal Productivity',
        emoji: '🎯',
        impact: '2.5x goal completion rate improvement',
        users: '1.9k'
    }
];
const TOOL_CATEGORIES = [
    {
        id: 'social-coordination',
        name: 'Social Coordination',
        emoji: '👥',
        count: 8,
        description: 'Group planning & coordination tools'
    },
    {
        id: 'community-marketplace',
        name: 'Community Marketplace',
        emoji: '💰',
        count: 6,
        description: 'Campus-specific trading & services'
    },
    {
        id: 'academic-collaboration',
        name: 'Academic Collaboration',
        emoji: '📚',
        count: 12,
        description: 'Study groups & project management'
    },
    {
        id: 'personal-productivity',
        name: 'Personal Productivity',
        emoji: '🎯',
        count: 10,
        description: 'Individual goals & habit tracking'
    }
];
export const PersonalToolsPreviewWidget = ({ isV1Unlocked = false, onJoinWaitlist, onViewToolCategory, ...baseProps }) => {
    const [activeTab, setActiveTab] = useState('preview');
    const [selectedTool, setSelectedTool] = useState(null);
    const renderPreviewTab = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: cn('p-3 rounded-lg border text-center', isV1Unlocked
                    ? 'bg-green-400/10 border-green-400/30 text-green-400'
                    : 'bg-[var(--hive-brand-secondary)]/10 border-hive-gold/30 text-[var(--hive-brand-secondary)]'), children: [_jsx("div", { className: "flex items-center justify-center gap-2 mb-1", children: isV1Unlocked ? (_jsxs(_Fragment, { children: [_jsx(Crown, { className: "h-4 w-4" }), _jsx("span", { className: "font-semibold text-sm", children: "v1 UNLOCKED" })] })) : (_jsxs(_Fragment, { children: [_jsx(Lock, { className: "h-4 w-4" }), _jsx("span", { className: "font-semibold text-sm", children: "LAUNCHING v1" })] })) }), _jsx("p", { className: "text-xs opacity-90", children: isV1Unlocked
                            ? 'Access to all personal tools and community marketplace'
                            : 'Social-enhanced productivity tools coming Fall 2025' })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("h4", { className: "text-sm font-semibold text-hive-text-primary flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" }), "Featured Tools"] }), _jsx("div", { className: "space-y-2", children: PREVIEW_TOOLS.slice(0, 3).map((tool, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: cn('p-3 rounded-lg border transition-all cursor-pointer group', 'bg-hive-surface-elevated/30 border-hive-border-subtle/30', 'hover:bg-hive-surface-elevated hover:border-hive-border-subtle', selectedTool === tool.id && 'ring-2 ring-hive-gold/30'), onClick: () => setSelectedTool(selectedTool === tool.id ? null : tool.id), children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "p-2 bg-[var(--hive-brand-secondary)]/10 rounded-lg text-[var(--hive-brand-secondary)] shrink-0", children: _jsx("span", { className: "text-lg", children: tool.emoji }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h5", { className: "font-medium text-hive-text-primary text-sm line-clamp-1", children: tool.name }), _jsxs(HiveBadge, { variant: "tool-builder", className: "text-xs", children: [tool.users, " users"] })] }), _jsx("p", { className: "text-xs text-hive-text-secondary line-clamp-2 mb-2", children: tool.description }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Star, { className: "h-3 w-3 text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-hive-text-tertiary", children: tool.impact })] })] })] }), selectedTool === tool.id && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, className: "mt-3 pt-3 border-t border-hive-border-subtle/30", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-xs text-hive-text-secondary", children: ["Category: ", tool.category] }), _jsx(HiveButton, { size: "sm", variant: "outline", onClick: (e) => {
                                                    e.stopPropagation();
                                                    onViewToolCategory(tool.category);
                                                }, className: "text-xs", children: "Explore" })] }) }))] }, tool.id))) })] }), _jsxs("div", { className: "p-3 bg-purple-400/5 border border-purple-400/20 rounded-lg", children: [_jsxs("h5", { className: "text-sm font-medium text-purple-400 mb-2 flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4" }), "Social-Enhanced Features"] }), _jsxs("ul", { className: "text-xs text-hive-text-secondary space-y-1", children: [_jsx("li", { children: "\u2022 Tools integrate with your community activity" }), _jsx("li", { children: "\u2022 Share expenses transparently with friends" }), _jsx("li", { children: "\u2022 Find study partners through availability matching" }), _jsx("li", { children: "\u2022 Build trust through community verification" })] })] })] }));
    const renderCategoriesTab = () => (_jsxs("div", { className: "space-y-3", children: [_jsxs("h4", { className: "text-sm font-semibold text-hive-text-primary", children: ["Tool Categories (", TOOL_CATEGORIES.reduce((sum, cat) => sum + cat.count, 0), " total)"] }), _jsx("div", { className: "grid gap-3", children: TOOL_CATEGORIES.map((category) => (_jsx(motion.button, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: () => onViewToolCategory(category.id), className: cn('p-3 rounded-lg border text-left transition-all group', 'bg-hive-surface-elevated/30 border-hive-border-subtle/30', 'hover:bg-hive-surface-elevated hover:border-hive-border-subtle'), children: _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-xl", children: category.emoji }), _jsxs("div", { children: [_jsx("h5", { className: "font-medium text-hive-text-primary text-sm", children: category.name }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: category.description })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveBadge, { variant: "tool-builder", className: "text-xs", children: category.count }), _jsx(ArrowRight, { className: "h-4 w-4 text-hive-text-tertiary group-hover:text-hive-text-secondary transition-colors" })] })] }) }, category.id))) })] }));
    const widgetContent = (_jsxs("div", { className: "h-full flex flex-col", children: [_jsx("div", { className: "flex border-b border-hive-border-subtle/30 mb-4", children: [
                    { id: 'preview', label: 'Preview', icon: Star },
                    { id: 'categories', label: 'Categories', icon: Plus }
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: cn('flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors relative', activeTab === tab.id
                            ? 'text-[var(--hive-brand-secondary)]'
                            : 'text-hive-text-secondary hover:text-hive-text-primary'), children: [_jsx(Icon, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:block", children: tab.label }), activeTab === tab.id && (_jsx(motion.div, { layoutId: "tools-tab-indicator", className: "absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--hive-brand-secondary)]" }))] }, tab.id));
                }) }), _jsx("div", { className: "flex-1 overflow-y-auto", children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 }, transition: { duration: 0.2 }, children: [activeTab === 'preview' && renderPreviewTab(), activeTab === 'categories' && renderCategoriesTab()] }, activeTab) }) }), _jsx("div", { className: "pt-4 border-t border-hive-border-subtle/30", children: isV1Unlocked ? (_jsxs(HiveButton, { variant: "primary", size: "sm", onClick: () => onViewToolCategory('all'), className: "w-full gap-2", children: [_jsx("span", { children: "Browse All Tools" }), _jsx(ArrowRight, { className: "h-4 w-4" })] })) : (_jsxs(HiveButton, { variant: "outline", size: "sm", onClick: onJoinWaitlist, className: "w-full gap-2", children: [_jsx(Lock, { className: "h-4 w-4" }), _jsx("span", { children: "Join v1 Waitlist" }), _jsx(ExternalLink, { className: "h-4 w-4" })] })) })] }));
    return (_jsx(BaseWidget, { ...baseProps, children: widgetContent }));
};
//# sourceMappingURL=personal-tools-preview-widget.js.map