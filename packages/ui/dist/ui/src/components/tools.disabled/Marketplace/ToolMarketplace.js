"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Download, Play, Settings, Plus, Eye, TrendingUp, Calendar, Users, QrCode, BarChart3, MessageSquare, Zap, Award, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../hive-button';
import { Input } from '../../hive-input';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui-legacy-backup/select';
import { cn } from '../../../lib/utils';
// Event Management System Showcase Data
const EVENT_SYSTEM_COMPONENTS = [
    {
        id: 'event-creator',
        name: 'Event Creator',
        description: 'Professional event planning with templates and smart defaults',
        category: 'event_management',
        type: 'individual',
        systemParent: 'event-management-system',
        icon: Calendar,
        color: 'var(--hive-status-warning)',
        downloads: 1247,
        rating: 4.9,
        ratingCount: 89,
        creator: 'HIVE Team',
        creatorType: 'hive_team',
        tags: ['events', 'planning', 'templates'],
        version: '2.1.0',
        lastUpdated: new Date('2024-12-10'),
        isFeatured: true,
        isVerified: true,
        isPremium: false,
        supportedPlatforms: ['web', 'mobile'],
        requiredPermissions: ['calendar', 'notifications'],
        integrations: ['calendar', 'spaces', 'notifications']
    },
    {
        id: 'rsvp-manager',
        name: 'RSVP Manager',
        description: 'Advanced attendance coordination with real-time tracking',
        category: 'event_management',
        type: 'individual',
        systemParent: 'event-management-system',
        icon: Users,
        color: 'var(--hive-status-success)',
        downloads: 1156,
        rating: 4.8,
        ratingCount: 73,
        creator: 'HIVE Team',
        creatorType: 'hive_team',
        tags: ['rsvp', 'attendance', 'tracking'],
        version: '2.0.1',
        lastUpdated: new Date('2024-12-08'),
        isFeatured: true,
        isVerified: true,
        isPremium: false,
        supportedPlatforms: ['web', 'mobile'],
        requiredPermissions: ['notifications', 'contacts'],
        integrations: ['event-creator', 'check-in-system']
    },
    {
        id: 'check-in-system',
        name: 'Check-in System',
        description: 'QR code attendance tracking with live analytics',
        category: 'event_management',
        type: 'individual',
        systemParent: 'event-management-system',
        icon: QrCode,
        color: 'var(--hive-status-info)',
        downloads: 892,
        rating: 4.7,
        ratingCount: 56,
        creator: 'HIVE Team',
        creatorType: 'hive_team',
        tags: ['check-in', 'qr-code', 'analytics'],
        version: '1.8.0',
        lastUpdated: new Date('2024-12-05'),
        isFeatured: true,
        isVerified: true,
        isPremium: false,
        supportedPlatforms: ['web', 'mobile'],
        requiredPermissions: ['camera', 'location'],
        integrations: ['rsvp-manager', 'event-analytics']
    },
    {
        id: 'event-analytics',
        name: 'Event Analytics',
        description: 'Comprehensive event performance analysis and insights',
        category: 'event_management',
        type: 'individual',
        systemParent: 'event-management-system',
        icon: BarChart3,
        color: 'var(--hive-status-info)',
        downloads: 743,
        rating: 4.6,
        ratingCount: 42,
        creator: 'HIVE Team',
        creatorType: 'hive_team',
        tags: ['analytics', 'insights', 'reporting'],
        version: '1.5.2',
        lastUpdated: new Date('2024-12-03'),
        isFeatured: false,
        isVerified: true,
        isPremium: false,
        supportedPlatforms: ['web'],
        requiredPermissions: ['analytics'],
        integrations: ['event-creator', 'rsvp-manager', 'check-in-system']
    },
    {
        id: 'feedback-collector',
        name: 'Feedback Collector',
        description: 'Post-event feedback collection and analysis',
        category: 'event_management',
        type: 'individual',
        systemParent: 'event-management-system',
        icon: MessageSquare,
        color: 'var(--hive-status-warning)',
        downloads: 634,
        rating: 4.5,
        ratingCount: 38,
        creator: 'HIVE Team',
        creatorType: 'hive_team',
        tags: ['feedback', 'surveys', 'improvement'],
        version: '1.3.1',
        lastUpdated: new Date('2024-11-28'),
        isFeatured: false,
        isVerified: true,
        isPremium: false,
        supportedPlatforms: ['web', 'mobile'],
        requiredPermissions: ['notifications'],
        integrations: ['event-creator', 'event-analytics']
    }
];
// Mock Event System Showcase
const mockEventSystem = {
    id: 'event-management-system',
    name: 'Event Management System',
    description: 'Complete professional event coordination solution',
    components: EVENT_SYSTEM_COMPONENTS,
    stats: {
        totalDownloads: 5672,
        averageRating: 4.8,
        eventsCreated: 12847,
        successRate: 94.2
    },
    testimonials: [
        {
            user: 'Sarah Chen',
            organization: 'Student Government',
            quote: 'This system transformed how we organize campus events. Attendance increased by 340%!',
            rating: 5
        },
        {
            user: 'Marcus Rodriguez',
            organization: 'Engineering Club',
            quote: 'The integrated workflow saves us hours of coordination work every week.',
            rating: 5
        },
        {
            user: 'Emma Thompson',
            organization: 'Drama Society',
            quote: 'Professional-grade event management that actually works for students.',
            rating: 4
        }
    ]
};
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};
const cardHoverVariants = {
    hover: {
        y: -4,
        scale: 1.02,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
};
export const ToolMarketplace = ({ tools = [], eventSystem = mockEventSystem, onToolInstall, onToolPreview, onSystemInstall, onToolAction, className }) => {
    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [activeTab, setActiveTab] = useState('featured');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Combine Event System components with other tools
    const allTools = useMemo(() => {
        return [...eventSystem.components, ...tools];
    }, [eventSystem.components, tools]);
    // Filter and sort tools
    const filteredTools = useMemo(() => {
        let filtered = allTools.filter(tool => {
            const matchesSearch = searchQuery === '' ||
                tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
        // Sort tools
        switch (sortBy) {
            case 'featured':
                filtered.sort((a, b) => {
                    if (a.isFeatured && !b.isFeatured)
                        return -1;
                    if (!a.isFeatured && b.isFeatured)
                        return 1;
                    return b.downloads - a.downloads;
                });
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'downloads':
                filtered.sort((a, b) => b.downloads - a.downloads);
                break;
            case 'newest':
                filtered.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
                break;
        }
        return filtered;
    }, [allTools, searchQuery, categoryFilter, sortBy]);
    // Handle tool installation
    const handleToolInstall = useCallback(async (toolId) => {
        setIsLoading(true);
        setError(null);
        try {
            await onToolInstall?.(toolId);
        }
        catch (error) {
            console.error('Failed to install tool:', error);
            setError(error instanceof Error
                ? error.message
                : 'Failed to install tool. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    }, [onToolInstall]);
    // Handle system installation
    const handleSystemInstall = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            await onSystemInstall?.(eventSystem.id);
        }
        catch (error) {
            console.error('Failed to install Event System:', error);
            setError(error instanceof Error
                ? error.message
                : 'Failed to install Event System. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    }, [onSystemInstall, eventSystem.id]);
    return (_jsxs(motion.div, { className: cn("tool-marketplace space-y-6", className), variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "bg-gradient-to-br from-[var(--hive-status-warning)]/10 to-[var(--hive-status-warning)]/5 border-[var(--hive-status-warning)]/20", children: _jsx(CardHeader, { children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center space-x-2 mb-4", children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-status-warning)] rounded-2xl flex items-center justify-center", children: _jsx(Zap, { className: "h-6 w-6 text-[var(--hive-background-primary)]" }) }), _jsx("h1", { className: "text-3xl font-bold", children: "Tool Marketplace" })] }), _jsx("p", { className: "text-lg text-gray-600 mb-6", children: "Discover powerful tools to enhance your HIVE experience" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-status-warning)]", children: allTools.length }), _jsx("div", { className: "text-sm text-gray-600", children: "Available Tools" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-status-success)]", children: eventSystem.stats.eventsCreated.toLocaleString() }), _jsx("div", { className: "text-sm text-gray-600", children: "Events Created" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-status-info)]", children: eventSystem.stats.totalDownloads.toLocaleString() }), _jsx("div", { className: "text-sm text-gray-600", children: "Total Downloads" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-[var(--hive-status-info)]", children: [eventSystem.stats.successRate, "%"] }), _jsx("div", { className: "text-sm text-gray-600", children: "Success Rate" })] })] })] }) }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "bg-gradient-to-br from-[var(--hive-status-warning)]/5 to-[var(--hive-status-warning)]/3 border-[var(--hive-status-warning)]/30", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-status-warning)] rounded-2xl flex items-center justify-center", children: _jsx(Calendar, { className: "h-8 w-8 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h2", { className: "text-2xl font-bold", children: eventSystem.name }), _jsxs(Badge, { className: "bg-[var(--hive-status-warning)] text-[var(--hive-background-primary)]", children: [_jsx(Award, { className: "h-3 w-3 mr-1" }), "Featured System"] })] }), _jsx("p", { className: "text-gray-600 mb-2", children: eventSystem.description }), _jsxs("div", { className: "flex items-center space-x-4 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "h-4 w-4 fill-[var(--hive-status-warning)] text-[var(--hive-status-warning)]" }), _jsx("span", { children: eventSystem.stats.averageRating })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Download, { className: "h-4 w-4 text-gray-500" }), _jsx("span", { children: eventSystem.stats.totalDownloads.toLocaleString() })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(TrendingUp, { className: "h-4 w-4 text-green-500" }), _jsxs("span", { children: [eventSystem.stats.successRate, "% success rate"] })] })] })] })] }), _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsxs(Button, { onClick: handleSystemInstall, className: "bg-[var(--hive-status-warning)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-status-warning)]", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Install Complete System"] }), _jsxs(Button, { variant: "outline", onClick: () => onToolPreview?.(eventSystem.id), className: "border-[var(--hive-status-warning)] text-[var(--hive-brand-secondary)] hover:bg-[var(--hive-status-warning)]/10", children: [_jsx(Eye, { className: "h-4 w-4 mr-2" }), "Preview System"] })] })] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "mb-6", children: [_jsxs("h3", { className: "font-semibold mb-3", children: ["System Components (", eventSystem.components.length, ")"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", children: eventSystem.components.slice(0, 6).map(component => {
                                                const IconComponent = component.icon;
                                                return (_jsxs("div", { className: "flex items-center space-x-3 p-3 bg-[var(--hive-text-primary)] rounded-lg border border-gray-200", children: [_jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center", style: { backgroundColor: `${component.color}20`, color: component.color }, children: _jsx(IconComponent, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium text-sm", children: component.name }), _jsx("div", { className: "text-xs text-gray-500 truncate", children: component.description })] })] }, component.id));
                                            }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "What Students Say" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: eventSystem.testimonials.map((testimonial, index) => (_jsxs("div", { className: "bg-[var(--hive-text-primary)] p-4 rounded-lg border border-gray-200", children: [_jsx("div", { className: "flex items-center space-x-1 mb-2", children: Array.from({ length: testimonial.rating }).map((_, i) => (_jsx(Star, { className: "h-3 w-3 fill-[var(--hive-status-warning)] text-[var(--hive-status-warning)]" }, i))) }), _jsxs("p", { className: "text-sm text-gray-700 mb-2", children: ["\"", testimonial.quote, "\""] }), _jsxs("div", { className: "text-xs text-gray-500", children: [_jsx("div", { className: "font-medium", children: testimonial.user }), _jsx("div", { children: testimonial.organization })] })] }, index))) })] })] })] }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx(Input, { placeholder: "Search tools by name, description, or tags...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10" })] }) }), _jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [_jsxs(SelectTrigger, { className: "w-full md:w-48", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), _jsx(SelectValue, {})] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Categories" }), _jsx(SelectItem, { value: "event_management", children: "Event Management" }), _jsx(SelectItem, { value: "academic", children: "Academic" }), _jsx(SelectItem, { value: "productivity", children: "Productivity" }), _jsx(SelectItem, { value: "social", children: "Social" }), _jsx(SelectItem, { value: "creative", children: "Creative" })] })] }), _jsxs(Select, { value: sortBy, onValueChange: setSortBy, children: [_jsx(SelectTrigger, { className: "w-full md:w-48", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "featured", children: "Featured First" }), _jsx(SelectItem, { value: "rating", children: "Highest Rated" }), _jsx(SelectItem, { value: "downloads", children: "Most Downloaded" }), _jsx(SelectItem, { value: "newest", children: "Newest First" })] })] })] }) }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: categoryFilter === 'all'
                                            ? `All Tools (${filteredTools.length})`
                                            : `${categoryFilter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Tools (${filteredTools.length})` }), _jsxs("div", { className: "text-sm text-gray-500", children: ["Sorted by: ", sortBy.replace('_', ' ')] })] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredTools.map(tool => {
                                            const IconComponent = tool.icon;
                                            return (_jsx(motion.div, { layout: true, variants: itemVariants, whileHover: "hover", className: "h-full", children: _jsx(motion.div, { variants: cardHoverVariants, children: _jsxs(Card, { className: "h-full bg-[var(--hive-text-primary)] border hover:shadow-lg transition-all duration-200 relative overflow-hidden", children: [tool.isFeatured && (_jsx("div", { className: "absolute top-3 right-3 bg-[var(--hive-status-warning)] text-[var(--hive-background-primary)] text-xs font-semibold px-2 py-1 rounded-full z-10", children: "Featured" })), _jsx("div", { className: "absolute inset-0 opacity-5", style: {
                                                                    background: `linear-gradient(135deg, ${tool.color}20 0%, ${tool.color}05 100%)`
                                                                } }), _jsxs(CardContent, { className: "p-6 relative z-10 h-full flex flex-col", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center", style: { backgroundColor: `${tool.color}20`, color: tool.color }, children: _jsx(IconComponent, { className: "h-6 w-6" }) }), _jsxs("div", { className: "flex items-center space-x-1", children: [tool.isVerified && (_jsx(Shield, { className: "h-4 w-4 text-blue-500" })), tool.isPremium && (_jsx(Award, { className: "h-4 w-4 text-yellow-500" }))] })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-lg mb-2", children: tool.name }), _jsx("p", { className: "text-sm text-gray-600 mb-3 line-clamp-2", children: tool.description }), _jsx("div", { className: "flex flex-wrap gap-1 mb-4", children: tool.tags.slice(0, 3).map(tag => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, tag))) }), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-600 mb-4", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "h-4 w-4 fill-[var(--hive-status-warning)] text-[var(--hive-status-warning)]" }), _jsx("span", { children: tool.rating }), _jsxs("span", { className: "text-gray-400", children: ["(", tool.ratingCount, ")"] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Download, { className: "h-4 w-4" }), _jsx("span", { children: tool.downloads.toLocaleString() })] })] }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500 mb-4", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsxs("span", { children: ["by ", tool.creator] }), tool.creatorType === 'hive_team' && (_jsx(Badge, { variant: "outline", className: "text-xs", children: "Official" }))] }), _jsxs("div", { children: ["v", tool.version] })] })] }), _jsx("div", { className: "flex space-x-2", children: tool.isInstalled ? (_jsxs(_Fragment, { children: [_jsxs(Button, { size: "sm", className: "flex-1", style: { backgroundColor: tool.color, color: 'white' }, onClick: () => onToolAction?.(tool.id, 'launch'), children: [_jsx(Play, { className: "h-4 w-4 mr-2" }), "Launch"] }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => onToolAction?.(tool.id, 'settings'), children: _jsx(Settings, { className: "h-4 w-4" }) })] })) : (_jsxs(_Fragment, { children: [_jsxs(Button, { size: "sm", className: "flex-1", onClick: () => handleToolInstall(tool.id), children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Install"] }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => onToolPreview?.(tool.id), children: _jsx(Eye, { className: "h-4 w-4" }) })] })) }), tool.systemParent && (_jsxs("div", { className: "mt-2 text-xs text-gray-500 flex items-center", children: [_jsx("div", { className: "w-2 h-2 bg-[var(--hive-status-warning)] rounded-full mr-2" }), "Part of Event Management System"] }))] })] }) }) }, tool.id));
                                        }) }) }), filteredTools.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Search, { className: "h-12 w-12 mx-auto mb-4 text-gray-400" }), _jsx("h3", { className: "text-lg font-semibold text-gray-600 mb-2", children: "No tools found" }), _jsx("p", { className: "text-gray-500", children: "Try adjusting your search criteria or browse all categories" })] }))] })] }) })] }));
};
export default ToolMarketplace;
//# sourceMappingURL=ToolMarketplace.js.map