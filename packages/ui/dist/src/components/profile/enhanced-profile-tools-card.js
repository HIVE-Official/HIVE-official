"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings, MoreHorizontal, Calendar, Users, QrCode, BarChart3, MessageSquare, Play, Download, Grid3X3, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.js';
import { Button } from '../hive-button.js';
import { Badge } from '../ui/badge.js';
import { cn } from '../../lib/utils.js';
import { EventSystemContainer } from '../tools';
// Mock Event System Configuration
const mockEventSystemConfig = {
    defaultEventTypes: ['study_session', 'social_meetup', 'project_work'],
    calendarIntegration: true,
    notificationSettings: {
        eventReminders: true,
        rsvpUpdates: true,
        checkInAlerts: false
    },
    spaceIntegration: {
        enabled: true,
        autoAnnounce: true,
        requireApproval: false
    },
    memberPermissions: {
        anyoneCanCreate: true,
        requireApproval: false,
        moderatorRoles: ['admin', 'moderator']
    }
};
// Tool icons mapping
const TOOL_ICONS = {
    'event-creator': Calendar,
    'rsvp-manager': Users,
    'check-in-system': QrCode,
    'event-analytics': BarChart3,
    'feedback-collector': MessageSquare,
};
// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1
        }
    }
};
const toolVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        scale: 1.05,
        y: -2,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
};
export const EnhancedProfileToolsCard = ({ data = {
    installations: [
        {
            id: 'inst-1',
            toolId: 'event-creator',
            installationDate: new Date('2024-12-01'),
            lastUsed: new Date('2024-12-14'),
            configuration: {},
            isActive: true,
            usage: {
                totalSessions: 23,
                totalTime: 4500000, // 1.25 hours
                lastActivity: new Date('2024-12-14')
            }
        },
        {
            id: 'inst-2',
            toolId: 'rsvp-manager',
            installationDate: new Date('2024-12-05'),
            lastUsed: new Date('2024-12-13'),
            configuration: {},
            isActive: true,
            usage: {
                totalSessions: 12,
                totalTime: 2100000, // 35 minutes
                lastActivity: new Date('2024-12-13')
            }
        }
    ],
    eventSystemConfig: mockEventSystemConfig,
    isEventSystemInstalled: true,
    totalToolsAvailable: 24,
    quickActions: [
        { toolId: 'event-creator', action: 'create', label: 'Create Event', icon: Calendar },
        { toolId: 'rsvp-manager', action: 'manage', label: 'Manage RSVPs', icon: Users }
    ]
}, isLoading = false, onToolAction, onInstallTool, onBrowseMarketplace, onConfigureTool, className }) => {
    const [viewMode, setViewMode] = useState('grid');
    const [showSystemView, setShowSystemView] = useState(false);
    // Calculate statistics
    const stats = useMemo(() => {
        const activeTools = data.installations.filter(i => i.isActive).length;
        let totalSessions = 0;
        let totalTime = 0;
        data.installations.forEach(i => {
            totalSessions += i.usage.totalSessions;
            totalTime += i.usage.totalTime;
        });
        const recentlyUsed = data.installations.filter(i => i.lastUsed && (Date.now() - i.lastUsed.getTime()) < 7 * 24 * 60 * 60 * 1000).length;
        return {
            installed: data.installations.length,
            active: activeTools,
            totalSessions,
            totalTimeHours: Math.round(totalTime / (1000 * 60 * 60) * 10) / 10,
            recentlyUsed
        };
    }, [data.installations]);
    const formatTimeAgo = (date) => {
        const diff = Date.now() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours}h ago`;
        return 'Just now';
    };
    if (isLoading) {
        return (_jsx(Card, { className: cn("h-96", className), children: _jsx(CardContent, { className: "flex items-center justify-center h-full", children: _jsx("div", { className: "w-8 h-8 border-2 border-[var(--hive-brand-secondary)] border-t-transparent rounded-full animate-spin" }) }) }));
    }
    return (_jsx(motion.div, { className: cn("space-y-4", className), variants: containerVariants, initial: "hidden", animate: "visible", children: _jsxs(Card, { className: "bg-gradient-to-br from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5 border-[var(--hive-brand-secondary)]/20", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-brand-secondary)] rounded-xl flex items-center justify-center", children: _jsx(Grid3X3, { className: "h-5 w-5 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-bold", children: "My Tools" }), _jsxs("p", { className: "text-sm text-gray-600", children: [stats.installed, " installed \u2022 ", stats.active, " active"] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "flex border rounded-lg", children: [_jsx(Button, { variant: viewMode === 'grid' ? 'primary' : 'ghost', size: "sm", onClick: () => setViewMode('grid'), className: "h-8 w-8 p-0", children: _jsx(Grid3X3, { className: "h-4 w-4" }) }), _jsx(Button, { variant: viewMode === 'list' ? 'primary' : 'ghost', size: "sm", onClick: () => setViewMode('list'), className: "h-8 w-8 p-0", children: _jsx(List, { className: "h-4 w-4" }) })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: onBrowseMarketplace, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Browse"] })] })] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-secondary)]", children: stats.installed }), _jsx("div", { className: "text-sm text-gray-600", children: "Installed" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-status-success)]", children: stats.totalSessions }), _jsx("div", { className: "text-sm text-gray-600", children: "Sessions" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-[var(--hive-status-info)]", children: [stats.totalTimeHours, "h"] }), _jsx("div", { className: "text-sm text-gray-600", children: "Total Time" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-status-info)]", children: stats.recentlyUsed }), _jsx("div", { className: "text-sm text-gray-600", children: "Recent" })] })] }), data.isEventSystemInstalled && (_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("h3", { className: "font-semibold flex items-center space-x-2", children: [_jsx("div", { className: "w-6 h-6 bg-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center", children: _jsx(Calendar, { className: "h-3 w-3 text-[var(--hive-background-primary)]" }) }), _jsx("span", { children: "Event Management System" }), _jsx(Badge, { className: "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]", children: "Integrated" })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setShowSystemView(!showSystemView), children: showSystemView ? 'Hide System' : 'Show System' })] }), _jsx(AnimatePresence, { children: showSystemView && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "bg-[var(--hive-text-primary)] rounded-lg border border-[var(--hive-brand-secondary)]/20 p-4", children: _jsx(EventSystemContainer, { installationId: "profile-event-system", configuration: data.eventSystemConfig, onSystemUpdate: (state) => console.log('System updated:', state), onComponentAction: (id, action, data) => onToolAction?.(id, action, data), className: "max-h-96 overflow-y-auto" }) })) })] })), data.quickActions.length > 0 && (_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Quick Actions" }), _jsx("div", { className: "flex flex-wrap gap-2", children: data.quickActions.map(action => {
                                        const IconComponent = action.icon;
                                        return (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => onToolAction?.(action.toolId, action.action), className: "flex items-center space-x-2", children: [_jsx(IconComponent, { className: "h-4 w-4" }), _jsx("span", { children: action.label })] }, `${action.toolId}-${action.action}`));
                                    }) })] })), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "font-semibold", children: "Installed Tools" }), _jsxs("div", { className: "text-sm text-gray-500", children: [data.installations.length, " of ", data.totalToolsAvailable, " available tools"] })] }), viewMode === 'grid' ? (_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: [_jsx(AnimatePresence, { mode: "popLayout", children: data.installations.map(installation => {
                                                const IconComponent = TOOL_ICONS[installation.toolId] || Settings;
                                                return (_jsx(motion.div, { layout: true, variants: toolVariants, whileHover: "hover", className: "relative", children: _jsx(Card, { className: cn("cursor-pointer transition-all duration-200 hover:shadow-md", installation.isActive ? "border-green-200 bg-green-50/50" : "border-gray-200"), children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "mb-3", children: _jsx("div", { className: "w-12 h-12 bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] rounded-xl flex items-center justify-center mx-auto", children: _jsx(IconComponent, { className: "h-6 w-6" }) }) }), _jsx("h4", { className: "font-medium text-sm mb-1 capitalize", children: installation.toolId.replace(/[-_]/g, ' ') }), _jsxs("div", { className: "text-xs text-gray-500 mb-3", children: [installation.usage.totalSessions, " sessions"] }), installation.lastUsed && (_jsx("div", { className: "text-xs text-gray-400 mb-3", children: formatTimeAgo(installation.lastUsed) })), _jsxs("div", { className: "flex space-x-1", children: [_jsxs(Button, { size: "sm", onClick: () => onToolAction?.(installation.toolId, 'launch'), className: "flex-1 h-7 text-xs bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]", children: [_jsx(Play, { className: "h-3 w-3 mr-1" }), "Use"] }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => onConfigureTool?.(installation.id), className: "h-7 w-7 p-0", children: _jsx(Settings, { className: "h-3 w-3" }) })] }), _jsx("div", { className: cn("absolute top-2 right-2 w-2 h-2 rounded-full", installation.isActive ? "bg-green-500" : "bg-gray-300") })] }) }) }, installation.id));
                                            }) }), _jsx(motion.div, { variants: toolVariants, whileHover: "hover", children: _jsx(Card, { className: "cursor-pointer border-dashed border-2 border-gray-300 hover:border-[var(--hive-brand-secondary)] transition-all duration-200 hover:bg-[var(--hive-brand-secondary)]/5", onClick: onBrowseMarketplace, children: _jsxs(CardContent, { className: "p-4 text-center h-full flex flex-col justify-center", children: [_jsx("div", { className: "w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3", children: _jsx(Plus, { className: "h-6 w-6 text-gray-400" }) }), _jsx("h4", { className: "font-medium text-sm text-gray-600 mb-1", children: "Add Tool" }), _jsx("div", { className: "text-xs text-gray-400", children: "Browse marketplace" })] }) }) })] })) : (_jsx("div", { className: "space-y-2", children: _jsx(AnimatePresence, { mode: "popLayout", children: data.installations.map(installation => {
                                            const IconComponent = TOOL_ICONS[installation.toolId] || Settings;
                                            return (_jsx(motion.div, { layout: true, variants: toolVariants, className: "p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center", children: _jsx(IconComponent, { className: "h-4 w-4" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm capitalize", children: installation.toolId.replace(/[-_]/g, ' ') }), _jsxs("div", { className: "text-xs text-gray-500", children: [installation.usage.totalSessions, " sessions \u2022 ", formatTimeAgo(installation.lastUsed || installation.installationDate)] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { variant: installation.isActive ? 'default' : 'secondary', className: "text-xs", children: installation.isActive ? 'Active' : 'Inactive' }), _jsxs(Button, { size: "sm", onClick: () => onToolAction?.(installation.toolId, 'launch'), className: "h-7 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]", children: [_jsx(Play, { className: "h-3 w-3 mr-1" }), "Use"] }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => onConfigureTool?.(installation.id), className: "h-7 w-7 p-0", children: _jsx(MoreHorizontal, { className: "h-3 w-3" }) })] })] }) }, installation.id));
                                        }) }) }))] }), data.installations.length === 0 && (_jsxs("div", { className: "text-center py-4", children: [_jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4", children: _jsx(Grid3X3, { className: "h-8 w-8 text-gray-400" }) }), _jsx("h3", { className: "font-semibold text-gray-700 mb-2", children: "No tools installed" }), _jsx("p", { className: "text-gray-500 mb-4", children: "Browse the marketplace to find tools that enhance your HIVE experience" }), _jsxs(Button, { onClick: onBrowseMarketplace, className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Browse Marketplace"] })] }))] })] }) }));
};
export default EnhancedProfileToolsCard;
//# sourceMappingURL=enhanced-profile-tools-card.js.map