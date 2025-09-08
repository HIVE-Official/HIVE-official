"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { cn } from '../../lib/utils.js';
import { HiveCard } from '../hive-card.js';
import { HiveButton } from '../hive-button.js';
import { HiveBadge } from '../hive-badge.js';
import { Avatar as HiveAvatar } from '../../atomic/atoms/avatar.js';
import { Wrench, Plus, ExternalLink, Star, Users, Settings, Share2, Heart, MoreVertical, Zap, Calendar, FileText, BarChart, Globe, Lock, Unlock, Code, Palette, Database, Cloud } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
// Category configuration
const categoryConfig = {
    productivity: {
        label: 'Productivity',
        icon: Zap,
        color: 'bg-yellow-100 text-yellow-700'
    },
    collaboration: {
        label: 'Collaboration',
        icon: Users,
        color: 'bg-blue-100 text-blue-700'
    },
    analytics: {
        label: 'Analytics',
        icon: BarChart,
        color: 'bg-purple-100 text-purple-700'
    },
    automation: {
        label: 'Automation',
        icon: Settings,
        color: 'bg-green-100 text-green-700'
    },
    social: {
        label: 'Social',
        icon: Heart,
        color: 'bg-pink-100 text-pink-700'
    },
    custom: {
        label: 'Custom',
        icon: Code,
        color: 'bg-gray-100 text-gray-700'
    }
};
// Tool icons mapping
const toolIcons = {
    calendar: Calendar,
    document: FileText,
    analytics: BarChart,
    global: Globe,
    code: Code,
    design: Palette,
    database: Database,
    cloud: Cloud,
    settings: Settings
};
// Tool Card Component
const ToolCard = ({ tool, isLeader, variant = 'widget', onInstall, onUninstall, onFavorite, onConfigure, onView }) => {
    const [showActions, setShowActions] = useState(false);
    const categoryInfo = categoryConfig[tool.category];
    const CategoryIcon = categoryInfo.icon;
    const ToolIcon = tool.icon ? toolIcons[tool.icon] || Wrench : Wrench;
    const statusConfig = {
        active: { label: 'Active', color: 'bg-green-100 text-green-700' },
        beta: { label: 'Beta', color: 'bg-yellow-100 text-yellow-700' },
        coming_soon: { label: 'Coming Soon', color: 'bg-blue-100 text-blue-700' },
        deprecated: { label: 'Deprecated', color: 'bg-red-100 text-red-700' }
    };
    const priceConfig = {
        free: { label: 'Free', color: 'text-green-600' },
        paid: { label: tool.price?.amount || 'Paid', color: 'text-gray-600' },
        freemium: { label: 'Freemium', color: 'text-blue-600' }
    };
    return (_jsx(HiveCard, { className: cn("hover:shadow-md transition-all group", variant === 'compact' && "p-3", tool.status === 'deprecated' && "opacity-60"), children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: cn("p-3 rounded-lg shrink-0", tool.isInstalled ? "bg-orange-50" : "bg-gray-50"), children: _jsx(ToolIcon, { className: cn("h-6 w-6", tool.isInstalled ? "text-[var(--hive-gold-dark)]" : "text-gray-600") }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "font-semibold text-gray-900 truncate", children: tool.name }), tool.isInstalled && (_jsx(HiveBadge, { variant: "secondary", className: "text-xs bg-green-100 text-green-700", children: "Installed" })), tool.status !== 'active' && (_jsx(HiveBadge, { variant: "secondary", className: cn("text-xs", statusConfig[tool.status].color), children: statusConfig[tool.status].label }))] }), _jsx("p", { className: "text-sm text-gray-600 mt-1 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center gap-3 mt-2", children: [_jsxs("span", { className: cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs", categoryInfo.color), children: [_jsx(CategoryIcon, { className: "h-3 w-3" }), categoryInfo.label] }), tool.price && (_jsx("span", { className: cn("text-xs font-medium", priceConfig[tool.price.type].color), children: priceConfig[tool.price.type].label }))] })] })] }), _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowActions(!showActions), className: "p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }), showActions && (_jsxs("div", { className: "absolute right-0 top-6 w-48 bg-[var(--hive-white)] rounded-lg shadow-lg border border-gray-200 py-1 z-10", children: [tool.url && (_jsxs("a", { href: tool.url, target: "_blank", rel: "noopener noreferrer", className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(ExternalLink, { className: "h-4 w-4" }), "View tool"] })), !tool.isInstalled && tool.status === 'active' && (_jsxs("button", { onClick: () => {
                                                onInstall?.();
                                                setShowActions(false);
                                            }, className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Install tool"] })), tool.isInstalled && (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => {
                                                        onConfigure?.();
                                                        setShowActions(false);
                                                    }, className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Settings, { className: "h-4 w-4" }), "Configure"] }), _jsxs("button", { onClick: () => {
                                                        onUninstall?.();
                                                        setShowActions(false);
                                                    }, className: "w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2", children: [_jsx(MoreVertical, { className: "h-4 w-4" }), "Uninstall"] })] })), _jsxs("button", { onClick: () => {
                                                onFavorite?.();
                                                setShowActions(false);
                                            }, className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Star, { className: cn("h-4 w-4", tool.isFavorite && "fill-current text-[var(--hive-gold)]") }), tool.isFavorite ? 'Unfavorite' : 'Add to favorites'] }), _jsxs("button", { onClick: () => setShowActions(false), className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Share2, { className: "h-4 w-4" }), "Share tool"] })] }))] })] }), variant === 'full' && tool.features && tool.features.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1", children: [tool.features.slice(0, 3).map((feature) => (_jsx("span", { className: "text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded", children: feature }, feature))), tool.features.length > 3 && (_jsxs("span", { className: "text-xs px-2 py-1 text-gray-500", children: ["+", tool.features.length - 3, " more"] }))] })), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-gray-100", children: [_jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-600", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-3 w-3" }), tool.stats.users, " users"] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "h-3 w-3 fill-current text-[var(--hive-gold)]" }), tool.stats.rating.toFixed(1)] }), _jsxs("span", { className: "text-gray-500", children: ["(", tool.stats.reviews, " reviews)"] })] }), _jsx("div", { className: "flex items-center gap-1 text-xs text-gray-500", children: tool.visibility === 'private' ? (_jsxs(_Fragment, { children: [_jsx(Lock, { className: "h-3 w-3" }), "Private"] })) : tool.visibility === 'space' ? (_jsxs(_Fragment, { children: [_jsx(Users, { className: "h-3 w-3" }), "Space only"] })) : (_jsxs(_Fragment, { children: [_jsx(Unlock, { className: "h-3 w-3" }), "Public"] })) })] }), variant === 'full' && (_jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveAvatar, { src: tool.creator.avatar, alt: tool.creator.name, initials: tool.creator.name.slice(0, 2).toUpperCase(), size: "xs" }), _jsxs("span", { children: ["by ", tool.creator.name] })] }), _jsxs("span", { children: ["Updated ", formatDistanceToNow(tool.lastUpdated, { addSuffix: true })] })] }))] }) }));
};
// Main Surface Component
export const HiveToolsSurface = ({ spaceId, spaceName, isLeader = false, currentUserId, className, variant = 'widget', tools: propTools, loading = false, error = null, onCreateTool, onInstallTool, onUninstallTool, onFavoriteTool, onConfigureTool, }) => {
    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    // Mock data for development
    const mockTools = useMemo(() => [
        {
            id: '1',
            name: 'Task Manager Pro',
            description: 'Advanced task management with Kanban boards, Gantt charts, and team collaboration features.',
            category: 'productivity',
            icon: 'calendar',
            creator: {
                id: '1',
                name: 'Sarah Chen'
            },
            stats: {
                users: 234,
                rating: 4.8,
                reviews: 45
            },
            status: 'active',
            visibility: 'public',
            url: 'https://taskmanager.example.com',
            features: ['Kanban boards', 'Gantt charts', 'Time tracking', 'Team collaboration'],
            lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
            price: { type: 'freemium' },
            isInstalled: true,
            isFavorite: true
        },
        {
            id: '2',
            name: 'Analytics Dashboard',
            description: 'Real-time analytics and insights for your space activities and member engagement.',
            category: 'analytics',
            icon: 'analytics',
            creator: {
                id: '2',
                name: 'Marcus Johnson'
            },
            stats: {
                users: 156,
                rating: 4.6,
                reviews: 28
            },
            status: 'active',
            visibility: 'space',
            features: ['Real-time data', 'Custom reports', 'Export to CSV', 'API access'],
            lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
            price: { type: 'free' },
            isInstalled: true
        },
        {
            id: '3',
            name: 'Meeting Scheduler',
            description: 'Smart scheduling tool that finds the best time for everyone and integrates with calendars.',
            category: 'collaboration',
            icon: 'calendar',
            creator: {
                id: '3',
                name: 'Emily Rodriguez'
            },
            stats: {
                users: 89,
                rating: 4.3,
                reviews: 12
            },
            status: 'beta',
            visibility: 'public',
            url: 'https://scheduler.example.com',
            features: ['Calendar sync', 'Time zone support', 'Availability finder'],
            lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            price: { type: 'free' },
            isInstalled: false
        },
        {
            id: '4',
            name: 'Code Review Bot',
            description: 'Automated code review assistant that helps maintain code quality and standards.',
            category: 'automation',
            icon: 'code',
            creator: {
                id: '4',
                name: 'Alex Kim'
            },
            stats: {
                users: 67,
                rating: 4.5,
                reviews: 8
            },
            status: 'active',
            visibility: 'public',
            features: ['GitHub integration', 'Style checking', 'Security scanning'],
            lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
            price: { type: 'paid', amount: '$10/mo' },
            isInstalled: false
        },
        {
            id: '5',
            name: 'Social Feed Widget',
            description: 'Embed your space\'s social feed anywhere with customizable themes and filters.',
            category: 'social',
            icon: 'global',
            creator: {
                id: '1',
                name: 'Sarah Chen'
            },
            stats: {
                users: 45,
                rating: 4.2,
                reviews: 6
            },
            status: 'coming_soon',
            visibility: 'public',
            features: ['Embeddable widget', 'Custom themes', 'Content filtering'],
            lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
            price: { type: 'free' },
            isInstalled: false
        }
    ], []);
    const tools = propTools || mockTools;
    // Filter tools
    const filteredTools = useMemo(() => {
        let filtered = [...tools];
        // Filter by installation status
        if (filter === 'installed') {
            filtered = filtered.filter(t => t.isInstalled);
        }
        else if (filter === 'available') {
            filtered = filtered.filter(t => !t.isInstalled);
        }
        // Filter by category
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(t => t.category === categoryFilter);
        }
        // Sort by popularity (users) and rating
        filtered.sort((a, b) => {
            if (a.isInstalled !== b.isInstalled) {
                return a.isInstalled ? -1 : 1;
            }
            return (b.stats.users * b.stats.rating) - (a.stats.users * a.stats.rating);
        });
        return filtered;
    }, [tools, filter, categoryFilter]);
    // Stats
    const stats = useMemo(() => {
        const installed = tools.filter(t => t.isInstalled).length;
        const favorites = tools.filter(t => t.isFavorite).length;
        return { installed, favorites, total: tools.length };
    }, [tools]);
    if (loading) {
        return (_jsx("div", { className: cn("space-y-4", className), children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "bg-gray-200 rounded-lg h-20 mb-4" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2, 3, 4].map((i) => (_jsx("div", { className: "bg-gray-100 rounded-lg h-32" }, i))) })] }) }));
    }
    if (error) {
        return (_jsx(HiveCard, { className: cn("p-6", className), children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx("p", { className: "text-gray-600", children: "Unable to load tools" }), _jsx("p", { className: "text-sm text-gray-500", children: error.message })] }) }));
    }
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: variant === 'full' && spaceName ? `${spaceName} Tools` : 'Tools' }), _jsxs("p", { className: "text-sm text-gray-500 mt-1", children: [stats.installed, " installed \u2022 ", stats.total - stats.installed, " available"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [variant === 'full' && (_jsxs(_Fragment, { children: [_jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)]", children: [_jsx("option", { value: "all", children: "All Tools" }), _jsx("option", { value: "installed", children: "Installed" }), _jsx("option", { value: "available", children: "Available" })] }), _jsxs("select", { value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), className: "px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)]", children: [_jsx("option", { value: "all", children: "All Categories" }), _jsx("option", { value: "productivity", children: "Productivity" }), _jsx("option", { value: "collaboration", children: "Collaboration" }), _jsx("option", { value: "analytics", children: "Analytics" }), _jsx("option", { value: "automation", children: "Automation" }), _jsx("option", { value: "social", children: "Social" }), _jsx("option", { value: "custom", children: "Custom" })] })] })), isLeader && (_jsxs(HiveButton, { variant: "primary", size: "sm", onClick: onCreateTool, className: "flex items-center gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), variant === 'widget' ? 'Add' : 'Create Tool'] }))] })] }), _jsx("div", { className: cn("grid gap-4", variant === 'full' ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"), children: filteredTools.length === 0 ? (_jsx(HiveCard, { className: "col-span-full p-8", children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Wrench, { className: "h-12 w-12 text-gray-400 mx-auto" }), _jsx("p", { className: "text-gray-600", children: "No tools found" }), _jsx("p", { className: "text-sm text-gray-500", children: filter === 'installed'
                                    ? "Install tools to enhance your space"
                                    : isLeader
                                        ? "Create or install tools for your community"
                                        : "Check back later for new tools" })] }) })) : (filteredTools
                    .slice(0, variant === 'widget' ? 4 : undefined)
                    .map((tool) => (_jsx(ToolCard, { tool: tool, isLeader: isLeader, variant: variant, onInstall: () => onInstallTool?.(tool.id), onUninstall: () => onUninstallTool?.(tool.id), onFavorite: () => onFavoriteTool?.(tool.id), onConfigure: () => onConfigureTool?.(tool.id), onView: () => console.log('View tool:', tool.id) }, tool.id)))) }), variant === 'widget' && filteredTools.length > 4 && (_jsxs("button", { className: "w-full py-2 text-sm text-[var(--hive-gold-dark)] hover:text-orange-700 font-medium", children: ["Browse all ", filteredTools.length, " tools \u2192"] }))] }));
};
// Export display name for debugging
HiveToolsSurface.displayName = 'HiveToolsSurface';
//# sourceMappingURL=HiveToolsSurface.js.map