'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Clock, Users, BookOpen, MessageSquare, CheckCircle2, ArrowRight, Calendar, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { BaseWidget } from '../bento-grid/base-widget.js';
import { HiveButton } from '../../hive-button.js';
import { cn } from '../../../lib/utils.js';
export const PriorityCoordinationWidget = ({ priorities = [], isLoading = false, onActionTaken, onPriorityClick, onViewAll, ...baseProps }) => {
    const [expandedSections, setExpandedSections] = useState(new Set(['urgent']));
    const [showAllItems, setShowAllItems] = useState(false);
    // Organize priorities by urgency
    const organizedPriorities = useMemo(() => {
        const urgent = priorities.filter(p => p.type === 'urgent').sort((a, b) => b.priority - a.priority);
        const today = priorities.filter(p => p.type === 'today').sort((a, b) => b.priority - a.priority);
        const thisWeek = priorities.filter(p => p.type === 'this_week').sort((a, b) => b.priority - a.priority);
        return { urgent, today, thisWeek };
    }, [priorities]);
    const toggleSection = (section) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(section)) {
                newSet.delete(section);
            }
            else {
                newSet.add(section);
            }
            return newSet;
        });
    };
    const getSourceIcon = (source) => {
        const iconMap = {
            calendar: _jsx(Calendar, { className: "h-4 w-4" }),
            community: _jsx(Users, { className: "h-4 w-4" }),
            social: _jsx(MessageSquare, { className: "h-4 w-4" }),
            personal: _jsx(BookOpen, { className: "h-4 w-4" })
        };
        return iconMap[source] || _jsx(AlertCircle, { className: "h-4 w-4" });
    };
    const getSourceColor = (source) => {
        const colorMap = {
            calendar: 'text-blue-400 bg-blue-400/10',
            community: 'text-purple-400 bg-purple-400/10',
            social: 'text-green-400 bg-green-400/10',
            personal: 'text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10'
        };
        return colorMap[source] || 'text-gray-400 bg-gray-400/10';
    };
    const getUrgencyColor = (type) => {
        const colorMap = {
            urgent: 'text-red-400',
            today: 'text-orange-400',
            this_week: 'text-green-400'
        };
        return colorMap[type] || 'text-gray-400';
    };
    const getUrgencyEmoji = (type) => {
        const emojiMap = {
            urgent: '🔴',
            today: '🟡',
            this_week: '🟢'
        };
        return emojiMap[type] || '⚪';
    };
    const renderPriorityItem = (priority, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 }, className: "group relative", children: _jsx("div", { className: cn('p-3 rounded-lg border transition-all duration-200 cursor-pointer', 'bg-hive-surface-elevated/50 border-hive-border-subtle/50', 'hover:bg-hive-surface-elevated border-hive-border-subtle', 'hover:shadow-lg hover:shadow-hive-gold/5'), onClick: () => onPriorityClick(priority.id), children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: cn('p-2 rounded-full shrink-0 mt-0.5', getSourceColor(priority.source)), children: getSourceIcon(priority.source) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [_jsx("h4", { className: "font-medium text-hive-text-primary line-clamp-1", children: priority.title }), priority.deadline && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-hive-text-tertiary shrink-0", children: [_jsx(Clock, { className: "h-3 w-3" }), new Date(priority.deadline).toLocaleDateString()] }))] }), _jsx("p", { className: "text-sm text-hive-text-secondary line-clamp-2 mb-3", children: priority.description }), priority.context.participants && priority.context.participants.length > 0 && (_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx(Users, { className: "h-3 w-3 text-hive-text-tertiary" }), _jsxs("span", { className: "text-xs text-hive-text-tertiary", children: [priority.context.participants.length, " people involved"] })] })), _jsxs("div", { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [priority.actions.slice(0, 2).map((action) => (_jsx(HiveButton, { size: "sm", variant: action.type === 'primary' ? 'primary' : 'outline', onClick: (e) => {
                                            e.stopPropagation();
                                            onActionTaken(priority.id, action.id);
                                        }, className: "text-xs px-3 py-1", children: action.label }, action.id))), priority.actions.length > 2 && (_jsx(HiveButton, { size: "sm", variant: "ghost", onClick: (e) => {
                                            e.stopPropagation();
                                            onPriorityClick(priority.id);
                                        }, className: "h-7 w-7 p-0", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }))] })] }), _jsx("div", { className: cn('w-2 h-2 rounded-full shrink-0 mt-2', priority.priority >= 80 ? 'bg-red-400' :
                            priority.priority >= 60 ? 'bg-orange-400' :
                                'bg-green-400') })] }) }) }, priority.id));
    const renderPrioritySection = (title, priorities, type) => {
        const isExpanded = expandedSections.has(type);
        const displayItems = showAllItems ? priorities : priorities.slice(0, 3);
        if (priorities.length === 0)
            return null;
        return (_jsxs("div", { className: "space-y-3", children: [_jsxs("button", { onClick: () => toggleSection(type), className: "flex items-center justify-between w-full text-left group", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-lg", children: getUrgencyEmoji(type) }), _jsxs("h3", { className: cn('font-semibold text-sm uppercase tracking-wide', getUrgencyColor(type)), children: [title, " (", priorities.length, ")"] })] }), isExpanded ? (_jsx(ChevronUp, { className: "h-4 w-4 text-hive-text-secondary group-hover:text-hive-text-primary transition-colors" })) : (_jsx(ChevronDown, { className: "h-4 w-4 text-hive-text-secondary group-hover:text-hive-text-primary transition-colors" }))] }), _jsx(AnimatePresence, { children: isExpanded && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.2 }, className: "space-y-2", children: [displayItems.map((priority, index) => renderPriorityItem(priority, index)), priorities.length > 3 && !showAllItems && (_jsxs("button", { onClick: () => setShowAllItems(true), className: "w-full py-2 text-sm text-hive-text-secondary hover:text-hive-text-primary transition-colors text-center", children: ["Show ", priorities.length - 3, " more items"] }))] })) })] }));
    };
    const widgetContent = (_jsxs("div", { className: "h-full flex flex-col", children: [isLoading ? (_jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold mx-auto mb-2" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Loading priorities..." })] }) })) : priorities.length === 0 ? (_jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(CheckCircle2, { className: "h-12 w-12 text-green-400 mx-auto mb-3" }), _jsx("h3", { className: "font-medium text-hive-text-primary mb-1", children: "You're all caught up!" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "No urgent coordination needed right now." })] }) })) : (_jsxs("div", { className: "flex-1 space-y-4 overflow-y-auto", children: [renderPrioritySection('URGENT', organizedPriorities.urgent, 'urgent'), renderPrioritySection('TODAY', organizedPriorities.today, 'today'), renderPrioritySection('THIS WEEK', organizedPriorities.thisWeek, 'this_week')] })), priorities.length > 0 && (_jsx("div", { className: "pt-4 border-t border-hive-border-subtle/50", children: _jsxs(HiveButton, { variant: "outline", size: "sm", onClick: onViewAll, className: "w-full gap-2", children: [_jsx("span", { children: "View All Priorities" }), _jsx(ArrowRight, { className: "h-4 w-4" })] }) }))] }));
    return (_jsx(BaseWidget, { ...baseProps, children: widgetContent }));
};
//# sourceMappingURL=priority-coordination-widget.js.map