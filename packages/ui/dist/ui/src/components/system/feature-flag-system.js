import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE Feature Flag System
 * Centralized feature management for easy activation/deactivation
 */
import React, { useState, useCallback, createContext, useContext } from 'react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { HiveBadge as Badge } from '../index.js';
import { Settings, Eye, EyeOff, Users, MessageSquare, Zap, Search, RefreshCw, CheckCircle, Activity, BarChart3, Palette, Download, Upload, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const FeatureFlagContext = createContext(null);
export const useFeatureFlag = (flagId) => {
    const context = useContext(FeatureFlagContext);
    if (!context) {
        console.warn(`Feature flag context not found. Defaulting ${flagId} to false.`);
        return false;
    }
    return context.isEnabled(flagId);
};
export const useFeatureFlags = () => {
    const context = useContext(FeatureFlagContext);
    if (!context) {
        console.warn('Feature flag context not found. Returning default values.');
        return {
            flags: {},
            isEnabled: () => false,
            toggleFlag: () => { },
            refreshFlags: () => { }
        };
    }
    return context;
};
// Default feature flags for HIVE platform
export const DEFAULT_FEATURE_FLAGS = [
    // Social Features
    {
        id: 'comments-system',
        name: 'Comments System',
        description: 'Threaded comments with real-time updates and social interactions',
        category: 'social',
        status: 'enabled',
        isEnabled: false,
        createdAt: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-01T00:00:00Z',
        modifiedBy: 'system',
        version: '1.0.0',
        impact: 'high',
        metrics: {
            usageCount: 0,
            errorRate: 0,
            performanceImpact: 0.1,
            userSatisfaction: 0
        }
    },
    {
        id: 'direct-messaging',
        name: 'Direct Messaging',
        description: 'Real-time chat and messaging system with file sharing',
        category: 'communication',
        status: 'enabled',
        isEnabled: false,
        createdAt: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-01T00:00:00Z',
        modifiedBy: 'system',
        version: '1.0.0',
        impact: 'high',
        metrics: {
            usageCount: 0,
            errorRate: 0,
            performanceImpact: 0.2,
            userSatisfaction: 0
        }
    },
    {
        id: 'follow-system',
        name: 'Follow System',
        description: 'Follow/unfollow users and spaces with notifications',
        category: 'social',
        status: 'enabled',
        isEnabled: false,
        createdAt: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-01T00:00:00Z',
        modifiedBy: 'system',
        version: '1.0.0',
        impact: 'medium',
        metrics: {
            usageCount: 0,
            errorRate: 0,
            performanceImpact: 0.05,
            userSatisfaction: 0
        }
    },
    {
        id: 'notifications-center',
        name: 'Notifications Center',
        description: 'Real-time notification system with categorization',
        category: 'communication',
        status: 'enabled',
        isEnabled: false,
        createdAt: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-01T00:00:00Z',
        modifiedBy: 'system',
        version: '1.0.0',
        impact: 'high',
        metrics: {
            usageCount: 0,
            errorRate: 0,
            performanceImpact: 0.1,
            userSatisfaction: 0
        }
    },
    // Tool Features
    {
        id: 'tool-reviews',
        name: 'Tool Reviews & Ratings',
        description: 'Complete review system for tools with ratings and feedback',
        category: 'tools',
        status: 'enabled',
        isEnabled: false,
        createdAt: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-01T00:00:00Z',
        modifiedBy: 'system',
        version: '1.0.0',
        impact: 'medium',
        metrics: {
            usageCount: 0,
            errorRate: 0,
            performanceImpact: 0.05,
            userSatisfaction: 0
        }
    },
    {
        id: 'live-tool-execution',
        name: 'Live Tool Execution',
        description: 'Real-time tool execution with collaborative features',
        category: 'tools',
        status: 'beta',
        isEnabled: false,
        createdAt: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-01T00:00:00Z',
        modifiedBy: 'system',
        version: '1.0.0',
        impact: 'critical',
        metrics: {
            usageCount: 0,
            errorRate: 0,
            performanceImpact: 0.3,
            userSatisfaction: 0
        }
    },
    {
        id: 'space-creation',
        name: 'Space Creation Flow',
        description: 'Complete space creation with advanced configuration',
        category: 'social',
        status: 'enabled',
        isEnabled: false,
        createdAt: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-01T00:00:00Z',
        modifiedBy: 'system',
        version: '1.0.0',
        impact: 'high',
        metrics: {
            usageCount: 0,
            errorRate: 0,
            performanceImpact: 0.1,
            userSatisfaction: 0
        }
    },
    // System Features
    {
        id: 'integration-connections',
        name: 'Third-party Integrations',
        description: 'Connect external services and manage permissions',
        category: 'system',
        status: 'enabled',
        isEnabled: false,
        createdAt: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-01T00:00:00Z',
        modifiedBy: 'system',
        version: '1.0.0',
        impact: 'medium',
        metrics: {
            usageCount: 0,
            errorRate: 0,
            performanceImpact: 0.1,
            userSatisfaction: 0
        }
    },
    // Analytics Features
    {
        id: 'advanced-analytics',
        name: 'Advanced Analytics',
        description: 'Detailed usage analytics and insights dashboard',
        category: 'analytics',
        status: 'beta',
        isEnabled: false,
        createdAt: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-01T00:00:00Z',
        modifiedBy: 'system',
        version: '1.0.0',
        impact: 'low',
        metrics: {
            usageCount: 0,
            errorRate: 0,
            performanceImpact: 0.05,
            userSatisfaction: 0
        }
    },
    // Experimental Features
    {
        id: 'ai-assistance',
        name: 'AI-Powered Assistance',
        description: 'AI-driven suggestions and automated workflows',
        category: 'experimental',
        status: 'beta',
        isEnabled: false,
        createdAt: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-01T00:00:00Z',
        modifiedBy: 'system',
        version: '0.1.0',
        impact: 'medium',
        rolloutPercentage: 10,
        userGroups: ['beta-testers'],
        environment: ['development', 'staging'],
        metrics: {
            usageCount: 0,
            errorRate: 0,
            performanceImpact: 0.2,
            userSatisfaction: 0
        }
    }
];
const FeatureFlagCard = ({ flag, canEdit, onToggle, onUpdate }) => {
    const [isToggling, setIsToggling] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const handleToggle = useCallback(async () => {
        if (!canEdit || isToggling)
            return;
        setIsToggling(true);
        try {
            await onToggle(flag.id, !flag.isEnabled);
        }
        finally {
            setIsToggling(false);
        }
    }, [flag.id, flag.isEnabled, onToggle, canEdit, isToggling]);
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'social': return Users;
            case 'tools': return Zap;
            case 'communication': return MessageSquare;
            case 'ui': return Palette;
            case 'system': return Settings;
            case 'analytics': return BarChart3;
            case 'experimental': return Activity;
            default: return Settings;
        }
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case 'social': return 'text-blue-400';
            case 'tools': return 'text-yellow-400';
            case 'communication': return 'text-green-400';
            case 'ui': return 'text-purple-400';
            case 'system': return 'text-gray-400';
            case 'analytics': return 'text-orange-400';
            case 'experimental': return 'text-pink-400';
            default: return 'text-gray-400';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'enabled': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'disabled': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
            case 'beta': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'deprecated': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };
    const getImpactColor = (impact) => {
        switch (impact) {
            case 'low': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'high': return 'text-orange-400';
            case 'critical': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    const CategoryIcon = getCategoryIcon(flag.category);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl hover:bg-[var(--hive-background-secondary)]/50 transition-colors", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-start space-x-3 flex-1", children: [_jsx("div", { className: `w-8 h-8 rounded-lg bg-[var(--hive-background-secondary)] flex items-center justify-center ${getCategoryColor(flag.category)}`, children: _jsx(CategoryIcon, { className: "w-4 h-4" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] truncate", children: flag.name }), _jsx(Badge, { size: "sm", className: getStatusColor(flag.status), children: flag.status }), flag.rolloutPercentage && flag.rolloutPercentage < 100 && (_jsxs(Badge, { size: "sm", variant: "secondary", children: [flag.rolloutPercentage, "%"] }))] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] leading-relaxed mb-2", children: flag.description }), _jsxs("div", { className: "flex items-center space-x-3 text-xs text-[var(--hive-text-muted)]", children: [_jsx("span", { className: "capitalize", children: flag.category }), _jsxs("span", { children: ["v", flag.version] }), _jsxs("span", { className: `capitalize ${getImpactColor(flag.impact)}`, children: [flag.impact, " impact"] }), flag.metrics && (_jsxs("span", { children: [flag.metrics.usageCount, " uses"] }))] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "xs", onClick: () => setShowDetails(!showDetails), children: showDetails ? _jsx(EyeOff, { className: "w-3 h-3" }) : _jsx(Eye, { className: "w-3 h-3" }) }), canEdit && (_jsx(Button, { variant: "ghost", size: "xs", onClick: handleToggle, disabled: isToggling, className: `${flag.isEnabled ? 'text-green-400' : 'text-gray-400'}`, children: isToggling ? (_jsx(RefreshCw, { className: "w-3 h-3 animate-spin" })) : flag.isEnabled ? (_jsx(CheckCircle, { className: "w-3 h-3" })) : (_jsx(Circle, { className: "w-3 h-3" })) }))] })] }), _jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `text-sm font-medium ${flag.isEnabled ? 'text-green-400' : 'text-gray-400'}`, children: flag.isEnabled ? 'Enabled' : 'Disabled' }), flag.dependencies && flag.dependencies.length > 0 && (_jsxs(Badge, { size: "xs", variant: "secondary", className: "flex items-center space-x-1", children: [_jsx(Link, { className: "w-2 h-2" }), _jsx("span", { children: flag.dependencies.length })] }))] }), canEdit && (_jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: flag.isEnabled, onChange: () => handleToggle(), disabled: isToggling, className: "sr-only peer" }), _jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[var(--hive-border-default)] after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" })] }))] }), _jsx(AnimatePresence, { children: showDetails && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "pt-3 border-t border-[var(--hive-border-subtle)] space-y-3", children: [flag.dependencies && flag.dependencies.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: "text-xs font-medium text-[var(--hive-text-primary)] mb-1", children: "Dependencies" }), _jsx("div", { className: "flex flex-wrap gap-1", children: flag.dependencies.map((dep) => (_jsx(Badge, { size: "xs", variant: "secondary", children: dep }, dep))) })] })), flag.environment && (_jsxs("div", { children: [_jsx("h4", { className: "text-xs font-medium text-[var(--hive-text-primary)] mb-1", children: "Environment" }), _jsx("div", { className: "flex flex-wrap gap-1", children: flag.environment.map((env) => (_jsx(Badge, { size: "xs", variant: "secondary", children: env }, env))) })] })), flag.userGroups && flag.userGroups.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: "text-xs font-medium text-[var(--hive-text-primary)] mb-1", children: "User Groups" }), _jsx("div", { className: "flex flex-wrap gap-1", children: flag.userGroups.map((group) => (_jsx(Badge, { size: "xs", className: "bg-purple-500/10 text-purple-400 border-purple-500/20", children: group }, group))) })] })), flag.metrics && (_jsxs("div", { children: [_jsx("h4", { className: "text-xs font-medium text-[var(--hive-text-primary)] mb-2", children: "Performance" }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-muted)]", children: "Usage:" }), _jsx("span", { className: "text-[var(--hive-text-secondary)]", children: flag.metrics.usageCount })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-muted)]", children: "Error Rate:" }), _jsxs("span", { className: `${flag.metrics.errorRate > 5 ? 'text-red-400' : 'text-green-400'}`, children: [(flag.metrics.errorRate * 100).toFixed(1), "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-muted)]", children: "Performance:" }), _jsxs("span", { className: `${flag.metrics.performanceImpact > 0.2 ? 'text-yellow-400' : 'text-green-400'}`, children: [(flag.metrics.performanceImpact * 100).toFixed(0), "ms"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-muted)]", children: "Satisfaction:" }), _jsx("span", { className: "text-[var(--hive-text-secondary)]", children: flag.metrics.userSatisfaction > 0 ? `${(flag.metrics.userSatisfaction * 100).toFixed(0)}%` : 'N/A' })] })] })] })), _jsxs("div", { className: "pt-2 border-t border-[var(--hive-border-subtle)] text-xs text-[var(--hive-text-muted)]", children: [_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { children: ["Created: ", new Date(flag.createdAt).toLocaleDateString()] }), _jsxs("span", { children: ["Modified: ", new Date(flag.lastModified).toLocaleDateString()] })] }), _jsxs("div", { className: "mt-1", children: ["Modified by: ", flag.modifiedBy] })] })] })) })] }));
};
const Circle = ({ className }) => (_jsx("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("circle", { cx: "12", cy: "12", r: "10", strokeWidth: "2" }) }));
export const FeatureFlagProvider = ({ children, initialFlags = {} }) => {
    const [flags, setFlags] = useState(initialFlags);
    const isEnabled = useCallback((flagId) => {
        return flags[flagId] ?? false;
    }, [flags]);
    const toggleFlag = useCallback((flagId) => {
        setFlags(prev => ({
            ...prev,
            [flagId]: !prev[flagId]
        }));
    }, []);
    const refreshFlags = useCallback(() => {
        // This would typically fetch from an API
        console.log('Refreshing feature flags...');
    }, []);
    const value = {
        flags,
        isEnabled,
        toggleFlag,
        refreshFlags
    };
    return (_jsx(FeatureFlagContext.Provider, { value: value, children: children }));
};
export const FeatureFlagSystem = ({ flags, groups = [], currentUserId, userRole, environment, onToggleFlag, onUpdateFlag, onBulkToggle, onExportFlags, onImportFlags, enableFeatureFlag = true }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedFlags, setSelectedFlags] = useState([]);
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState([]);
    // Feature flag check
    if (!enableFeatureFlag)
        return null;
    const canEdit = userRole === 'admin' || userRole === 'developer';
    const filteredFlags = React.useMemo(() => {
        return flags.filter(flag => {
            // Search filter
            if (searchQuery && !flag.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !flag.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            // Category filter
            if (filterCategory !== 'all' && flag.category !== filterCategory) {
                return false;
            }
            // Status filter
            if (filterStatus !== 'all' && flag.status !== filterStatus) {
                return false;
            }
            // Environment filter
            if (flag.environment && !flag.environment.includes(environment)) {
                return false;
            }
            return true;
        });
    }, [flags, searchQuery, filterCategory, filterStatus, environment]);
    const categories = React.useMemo(() => {
        const cats = Array.from(new Set(flags.map(f => f.category)));
        return cats.sort();
    }, [flags]);
    const statuses = React.useMemo(() => {
        const stats = Array.from(new Set(flags.map(f => f.status)));
        return stats.sort();
    }, [flags]);
    const handleBulkToggle = useCallback(async (enabled) => {
        if (selectedFlags.length === 0)
            return;
        await onBulkToggle?.(selectedFlags, enabled);
        setSelectedFlags([]);
        setShowBulkActions(false);
    }, [selectedFlags, onBulkToggle]);
    const handleSelectAll = useCallback(() => {
        if (selectedFlags.length === filteredFlags.length) {
            setSelectedFlags([]);
        }
        else {
            setSelectedFlags(filteredFlags.map(f => f.id));
        }
    }, [selectedFlags, filteredFlags]);
    const toggleGroup = useCallback((groupId) => {
        setExpandedGroups(prev => prev.includes(groupId)
            ? prev.filter(id => id !== groupId)
            : [...prev, groupId]);
    }, []);
    const getFlagStats = () => {
        const enabled = flags.filter(f => f.isEnabled).length;
        const total = flags.length;
        const beta = flags.filter(f => f.status === 'beta').length;
        const experimental = flags.filter(f => f.category === 'experimental').length;
        return { enabled, total, beta, experimental };
    };
    const stats = getFlagStats();
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Feature Flags" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)] mt-1", children: ["Manage and monitor feature rollouts across ", environment] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [canEdit && (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "secondary", onClick: () => onExportFlags?.('json'), className: "flex items-center space-x-2", children: [_jsx(Download, { className: "w-4 h-4" }), _jsx("span", { children: "Export" })] }), _jsxs(Button, { variant: "secondary", onClick: () => document.getElementById('import-input')?.click(), className: "flex items-center space-x-2", children: [_jsx(Upload, { className: "w-4 h-4" }), _jsx("span", { children: "Import" })] }), _jsx("input", { id: "import-input", type: "file", accept: ".json", className: "hidden", onChange: (e) => {
                                            // Handle file import
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    try {
                                                        const data = JSON.parse(event.target?.result);
                                                        onImportFlags?.(data);
                                                    }
                                                    catch (error) {
                                                        console.error('Failed to parse import file:', error);
                                                    }
                                                };
                                                reader.readAsText(file);
                                            }
                                        } })] })), _jsxs(Button, { onClick: () => window.location.reload(), className: "bg-[var(--hive-primary)] text-[var(--hive-text-inverse)] flex items-center space-x-2", children: [_jsx(RefreshCw, { className: "w-4 h-4" }), _jsx("span", { children: "Refresh" })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsx("div", { className: "p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-400" }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: stats.enabled }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Enabled" })] })] }) }), _jsx("div", { className: "p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Settings, { className: "w-5 h-5 text-[var(--hive-text-muted)]" }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: stats.total }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Total Flags" })] })] }) }), _jsx("div", { className: "p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Activity, { className: "w-5 h-5 text-yellow-400" }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: stats.beta }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Beta Features" })] })] }) }), _jsx("div", { className: "p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Zap, { className: "w-5 h-5 text-pink-400" }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: stats.experimental }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Experimental" })] })] }) })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", placeholder: "Search feature flags...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]" })] }), _jsxs("select", { value: filterCategory, onChange: (e) => setFilterCategory(e.target.value), className: "px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-primary)]", children: [_jsx("option", { value: "all", children: "All Categories" }), categories.map(category => (_jsx("option", { value: category, className: "capitalize", children: category }, category)))] }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-primary)]", children: [_jsx("option", { value: "all", children: "All Statuses" }), statuses.map(status => (_jsx("option", { value: status, className: "capitalize", children: status }, status)))] }), canEdit && (_jsxs(Button, { variant: "secondary", onClick: () => setShowBulkActions(!showBulkActions), className: "flex items-center space-x-2", children: [_jsx(Settings, { className: "w-4 h-4" }), _jsx("span", { children: "Bulk Actions" })] }))] }), _jsx(AnimatePresence, { children: showBulkActions && canEdit && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Button, { size: "sm", variant: "secondary", onClick: handleSelectAll, children: selectedFlags.length === filteredFlags.length ? 'Deselect All' : 'Select All' }), _jsxs("span", { className: "text-sm text-[var(--hive-text-muted)]", children: [selectedFlags.length, " selected"] })] }), selectedFlags.length > 0 && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { size: "sm", onClick: () => handleBulkToggle(true), className: "bg-green-600 hover:bg-green-700 text-[var(--hive-text-inverse)]", children: "Enable Selected" }), _jsx(Button, { size: "sm", onClick: () => handleBulkToggle(false), className: "bg-red-600 hover:bg-red-700 text-[var(--hive-text-inverse)]", children: "Disable Selected" })] }))] }) })) }), _jsx("div", { className: "space-y-4", children: filteredFlags.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Settings, { className: "w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: "No feature flags found" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Try adjusting your search or filters" })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: filteredFlags.map((flag) => (_jsxs("div", { className: "relative", children: [showBulkActions && canEdit && (_jsx("input", { type: "checkbox", checked: selectedFlags.includes(flag.id), onChange: (e) => {
                                    if (e.target.checked) {
                                        setSelectedFlags(prev => [...prev, flag.id]);
                                    }
                                    else {
                                        setSelectedFlags(prev => prev.filter(id => id !== flag.id));
                                    }
                                }, className: "absolute top-2 left-2 z-10" })), _jsx(FeatureFlagCard, { flag: flag, canEdit: canEdit, onToggle: onToggleFlag || (() => Promise.resolve()), onUpdate: onUpdateFlag })] }, flag.id))) })) })] }));
};
//# sourceMappingURL=feature-flag-system.js.map