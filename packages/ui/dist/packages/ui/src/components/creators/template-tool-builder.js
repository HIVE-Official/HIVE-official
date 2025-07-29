// HIVE Template Tool Builder - Atomic Design: Template
// Pre-built campus-focused templates for quick tool creation
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Star, Clock, Users, Zap, BookOpen, MessageSquare, Calendar, BarChart3, GraduationCap, Coffee, Trophy, Grid3X3, List, Play, Eye, Save } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveInput } from '../hive-input';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveCard, HiveCardContent } from '../hive-card';
import { HiveSelect } from '../hive-select';
import { HiveMotionWrapper } from '../hive-motion-wrapper';
import { ToolPreview } from './tool-preview';
// Enhanced campus-focused templates
const CAMPUS_TEMPLATES = [
    // Academic Templates
    {
        id: 'course-feedback',
        name: 'Course Feedback Form',
        description: 'Collect student feedback on courses, professors, and curriculum',
        category: 'academic',
        difficulty: 'beginner',
        thumbnail: '/templates/course-feedback.png',
        elements: [],
        config: {
            primaryColor: '#3B82F6',
            theme: 'light',
            allowMultipleSubmissions: false,
            requireAuthentication: true
        },
        metadata: {
            toolType: 'template',
            tags: ['feedback', 'academic', 'survey'],
            estimatedBuildTime: 5
        },
        tags: ['academic', 'feedback', 'survey', 'forms'],
        useCount: 1247,
        rating: 4.8,
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'study-group-scheduler',
        name: 'Study Group Scheduler',
        description: 'Coordinate study sessions and group meetings',
        category: 'academic',
        difficulty: 'intermediate',
        thumbnail: '/templates/study-scheduler.png',
        elements: [],
        config: {
            primaryColor: '#10B981',
            theme: 'light'
        },
        metadata: {
            toolType: 'template',
            tags: ['scheduling', 'study', 'groups'],
            estimatedBuildTime: 15
        },
        tags: ['academic', 'scheduling', 'collaboration'],
        useCount: 892,
        rating: 4.6,
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'assignment-tracker',
        name: 'Assignment Tracker',
        description: 'Track assignments, deadlines, and progress across courses',
        category: 'productivity',
        difficulty: 'intermediate',
        thumbnail: '/templates/assignment-tracker.png',
        elements: [],
        config: {
            primaryColor: '#F59E0B',
            theme: 'auto'
        },
        metadata: {
            toolType: 'template',
            tags: ['productivity', 'deadlines', 'tracking'],
            estimatedBuildTime: 20
        },
        tags: ['productivity', 'academic', 'planning'],
        useCount: 2156,
        rating: 4.9,
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    // Social Templates
    {
        id: 'event-poll',
        name: 'Event Planning Poll',
        description: 'Collect preferences for events, dates, and activities',
        category: 'social',
        difficulty: 'beginner',
        thumbnail: '/templates/event-poll.png',
        elements: [],
        config: {
            primaryColor: '#8B5CF6',
            theme: 'light'
        },
        metadata: {
            toolType: 'template',
            tags: ['polls', 'events', 'planning'],
            estimatedBuildTime: 8
        },
        tags: ['social', 'events', 'polls', 'planning'],
        useCount: 1654,
        rating: 4.7,
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'roommate-finder',
        name: 'Roommate Compatibility Quiz',
        description: 'Help students find compatible roommates',
        category: 'social',
        difficulty: 'intermediate',
        thumbnail: '/templates/roommate-finder.png',
        elements: [],
        config: {
            primaryColor: '#EC4899',
            theme: 'light'
        },
        metadata: {
            toolType: 'template',
            tags: ['housing', 'compatibility', 'matching'],
            estimatedBuildTime: 25
        },
        tags: ['social', 'housing', 'compatibility'],
        useCount: 743,
        rating: 4.5,
        isPremium: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    // Campus Life Templates
    {
        id: 'dining-review',
        name: 'Dining Hall Reviews',
        description: 'Rate and review campus dining options',
        category: 'campus-life',
        difficulty: 'beginner',
        thumbnail: '/templates/dining-review.png',
        elements: [],
        config: {
            primaryColor: '#F97316',
            theme: 'light'
        },
        metadata: {
            toolType: 'template',
            tags: ['reviews', 'dining', 'ratings'],
            estimatedBuildTime: 10
        },
        tags: ['campus-life', 'dining', 'reviews'],
        useCount: 567,
        rating: 4.3,
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'club-signup',
        name: 'Club Registration Form',
        description: 'Streamline club and organization signups',
        category: 'campus-life',
        difficulty: 'beginner',
        thumbnail: '/templates/club-signup.png',
        elements: [],
        config: {
            primaryColor: '#06B6D4',
            theme: 'light'
        },
        metadata: {
            toolType: 'template',
            tags: ['clubs', 'registration', 'forms'],
            estimatedBuildTime: 12
        },
        tags: ['campus-life', 'clubs', 'registration'],
        useCount: 1023,
        rating: 4.6,
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    // Greek Life Templates
    {
        id: 'rush-feedback',
        name: 'Rush Week Feedback',
        description: 'Collect feedback from rush events and activities',
        category: 'greek-life',
        difficulty: 'beginner',
        thumbnail: '/templates/rush-feedback.png',
        elements: [],
        config: {
            primaryColor: '#7C3AED',
            theme: 'light'
        },
        metadata: {
            toolType: 'template',
            tags: ['greek-life', 'rush', 'feedback'],
            estimatedBuildTime: 8
        },
        tags: ['greek-life', 'rush', 'feedback'],
        useCount: 234,
        rating: 4.4,
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    // Analytics Templates
    {
        id: 'engagement-dashboard',
        name: 'Student Engagement Dashboard',
        description: 'Track and visualize student engagement metrics',
        category: 'analytics',
        difficulty: 'advanced',
        thumbnail: '/templates/engagement-dashboard.png',
        elements: [],
        config: {
            primaryColor: '#84CC16',
            theme: 'light'
        },
        metadata: {
            toolType: 'template',
            tags: ['analytics', 'dashboard', 'metrics'],
            estimatedBuildTime: 45
        },
        tags: ['analytics', 'dashboard', 'admin'],
        useCount: 156,
        rating: 4.8,
        isPremium: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
// Template categories with campus focus
const TEMPLATE_CATEGORIES = [
    { id: 'all', name: 'All Templates', icon: Grid3X3, color: 'var(--hive-color-neutral-400)' },
    { id: 'academic', name: 'Academic', icon: BookOpen, color: 'var(--hive-color-blue-500)' },
    { id: 'social', name: 'Social', icon: MessageSquare, color: 'var(--hive-color-pink-500)' },
    { id: 'campus-life', name: 'Campus Life', icon: Coffee, color: 'var(--hive-color-orange-500)' },
    { id: 'greek-life', name: 'Greek Life', icon: Trophy, color: 'var(--hive-color-purple-500)' },
    { id: 'productivity', name: 'Productivity', icon: Zap, color: 'var(--hive-color-green-500)' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'var(--hive-color-yellow-500)' },
    { id: 'events', name: 'Events', icon: Calendar, color: 'var(--hive-color-indigo-500)' }
];
const TemplateCard = ({ template, onSelect, onPreview, isSelected, viewMode }) => {
    const difficultyColors = {
        beginner: 'text-green-600 bg-green-100',
        intermediate: 'text-yellow-600 bg-yellow-100',
        advanced: 'text-red-600 bg-red-100'
    };
    return (_jsx(HiveMotionWrapper, { className: "scale-hover", children: _jsxs(HiveCard, { className: cn("cursor-pointer transition-all duration-200 hover:shadow-lg group relative", viewMode === 'list' ? "flex-row" : "", isSelected && "ring-2 ring-[var(--hive-color-gold-primary)] ring-offset-2"), onClick: () => onSelect(template), children: [template.isPremium && (_jsx("div", { className: "absolute top-2 right-2 z-10", children: _jsxs(HiveBadge, { className: "bg-[var(--hive-color-gold-primary)] text-[var(--hive-background-primary)]", children: [_jsx(Star, { size: 12 }), "Premium"] }) })), _jsxs(HiveCardContent, { className: cn("p-0", viewMode === 'list' ? "flex items-center" : ""), children: [_jsx("div", { className: cn("bg-gradient-to-br from-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] flex items-center justify-center", viewMode === 'list' ? "w-24 h-24 rounded-l-lg" : "w-full h-32 rounded-t-lg"), children: _jsx("div", { className: "w-12 h-12 rounded-lg flex items-center justify-center", style: { backgroundColor: template.config.primaryColor + '20' }, children: _jsx("div", { className: "w-8 h-8 rounded flex items-center justify-center", style: { backgroundColor: template.config.primaryColor }, children: _jsx(GraduationCap, { size: 16, className: "text-white" }) }) }) }), _jsxs("div", { className: cn("p-4", viewMode === 'list' ? "flex-1" : ""), children: [_jsx("div", { className: "flex items-start justify-between mb-2", children: _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] group-hover:text-[var(--hive-color-gold-primary)] transition-colors truncate", children: template.name }), _jsx("p", { className: cn("text-[var(--hive-text-secondary)] mt-1", viewMode === 'list' ? "text-sm line-clamp-1" : "text-sm line-clamp-2"), children: template.description })] }) }), _jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx(HiveBadge, { variant: "course-tag", className: cn("text-xs", difficultyColors[template.difficulty]), children: template.difficulty }), _jsx(HiveBadge, { variant: "course-tag", className: "text-xs", children: template.category })] }), _jsx("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-tertiary)]", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { size: 12 }), template.useCount.toLocaleString()] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { size: 12 }), template.rating] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { size: 12 }), template.metadata.estimatedBuildTime, "min"] })] }) }), _jsxs("div", { className: cn("flex gap-2 mt-3", viewMode === 'grid' ? "opacity-0 group-hover:opacity-100 transition-opacity" : ""), children: [_jsxs(HiveButton, { variant: "outline", size: "sm", onClick: (e) => {
                                                e.stopPropagation();
                                                onPreview(template);
                                            }, className: "flex-1", children: [_jsx(Eye, { size: 14 }), "Preview"] }), _jsx(HiveButton, { variant: "primary", size: "sm", onClick: (e) => {
                                                e.stopPropagation();
                                                onSelect(template);
                                            }, className: "flex-1", children: "Use Template" })] })] })] })] }) }));
};
// Main Template Tool Builder component
export const TemplateToolBuilder = ({ tool, templates = CAMPUS_TEMPLATES, onChange, onSave, onPreview, isLoading = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewTemplate, setPreviewTemplate] = useState(null);
    // Filter and sort templates
    const filteredTemplates = useMemo(() => {
        let filtered = templates;
        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(template => template.category === selectedCategory);
        }
        // Filter by search term
        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();
            filtered = filtered.filter(template => template.name.toLowerCase().includes(query) ||
                template.description.toLowerCase().includes(query) ||
                template.tags.some(tag => tag.toLowerCase().includes(query)));
        }
        // Sort templates
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return b.useCount - a.useCount;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                default:
                    return 0;
            }
        });
    }, [templates, selectedCategory, searchTerm, sortBy]);
    // Handle template selection
    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        // Create new tool from template
        const newTool = {
            ...tool,
            name: template.name,
            description: template.description,
            elements: [...template.elements],
            config: { ...tool.config, ...template.config },
            metadata: {
                ...tool.metadata,
                ...template.metadata,
                templateId: template.id
            },
            updatedAt: new Date()
        };
        onChange(newTool);
    };
    // Handle template preview
    const handleTemplatePreview = (template) => {
        setPreviewTemplate(template);
        setShowPreview(true);
    };
    return (_jsxs("div", { className: "flex flex-col h-screen bg-[var(--hive-background-primary)]", children: [_jsxs("div", { className: "p-6 border-b border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Template Library" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mt-1", children: "Start with a pre-built template designed for campus communities" })] }), _jsxs("div", { className: "flex gap-1 p-1 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-default)]", children: [_jsx(HiveButton, { variant: viewMode === 'grid' ? 'default' : 'ghost', size: "sm", onClick: () => setViewMode('grid'), children: _jsx(Grid3X3, { size: 16 }) }), _jsx(HiveButton, { variant: viewMode === 'list' ? 'default' : 'ghost', size: "sm", onClick: () => setViewMode('list'), children: _jsx(List, { size: 16 }) })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { size: 16, className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-tertiary)]" }), _jsx(HiveInput, { placeholder: "Search templates...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }), _jsx(HiveSelect, { value: selectedCategory, onValueChange: (value) => setSelectedCategory(value), options: [
                                    { value: 'all', label: 'All Categories' },
                                    ...TEMPLATE_CATEGORIES.map((category) => ({
                                        value: category.id,
                                        label: category.name
                                    }))
                                ] }), _jsx(HiveSelect, { value: sortBy, onValueChange: (value) => setSortBy(value), options: [
                                    { value: 'popular', label: 'Most Popular' },
                                    { value: 'rating', label: 'Highest Rated' },
                                    { value: 'newest', label: 'Newest' }
                                ] })] })] }), _jsx("div", { className: "flex-1 overflow-auto p-6", children: filteredTemplates.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-center", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-background-secondary)] rounded-2xl flex items-center justify-center mb-4", children: _jsx(Search, { size: 24, className: "text-[var(--hive-text-tertiary)]" }) }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: "No templates found" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] max-w-sm", children: "Try adjusting your search or filter to find the perfect template for your needs." })] })) : (_jsx("div", { className: cn("gap-6", viewMode === 'grid'
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        : "space-y-4"), children: filteredTemplates.map((template) => (_jsx(TemplateCard, { template: template, onSelect: handleTemplateSelect, onPreview: handleTemplatePreview, isSelected: selectedTemplate?.id === template.id, viewMode: viewMode }, template.id))) })) }), selectedTemplate && (_jsx("div", { className: "p-6 border-t border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center", style: { backgroundColor: selectedTemplate.config.primaryColor + '20' }, children: _jsx(GraduationCap, { size: 20, style: { color: selectedTemplate.config.primaryColor } }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: selectedTemplate.name }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Ready to customize and deploy" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(HiveButton, { variant: "outline", onClick: () => onSave(tool), disabled: isLoading, children: [_jsx(Save, { size: 16 }), "Save Draft"] }), _jsxs(HiveButton, { variant: "primary", onClick: () => onPreview(tool), children: [_jsx(Play, { size: 16 }), "Continue Building"] })] })] }) })), showPreview && previewTemplate && (_jsx(ToolPreview, { tool: {
                    ...tool,
                    name: previewTemplate.name,
                    description: previewTemplate.description,
                    elements: previewTemplate.elements
                }, onClose: () => {
                    setShowPreview(false);
                    setPreviewTemplate(null);
                } }))] }));
};
export default TemplateToolBuilder;
//# sourceMappingURL=template-tool-builder.js.map