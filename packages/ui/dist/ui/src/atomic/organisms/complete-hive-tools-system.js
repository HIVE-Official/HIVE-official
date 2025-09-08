'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/tabs';
import { ToolLibraryModal } from '../molecules/tool-library-modal';
import { ToolConfigurationPanel } from '../molecules/tool-configuration-panel';
import { ProfileHiveLabWidget } from '../molecules/profile-hivelab-widget';
import { VisualToolComposer } from '../molecules/visual-tool-composer';
import { Button } from '../atoms/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../atoms/card';
import { Badge } from '../atoms/badge.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Package, Wrench, Users, TrendingUp, Rocket, Grid, Plus, Search, Settings, Share2, GitBranch, Zap } from 'lucide-react';
// Campus-specific tool templates
const CAMPUS_TEMPLATES = [
    {
        id: 'study-group-coordinator',
        name: 'Study Group Coordinator',
        description: 'Organize study sessions with smart scheduling',
        icon: '📚',
        category: 'Academic',
        popularity: 94,
        features: ['Auto-scheduling', 'Resource sharing', 'Progress tracking']
    },
    {
        id: 'laundry-tracker',
        name: 'Laundry Tracker',
        description: 'Never forget your laundry again',
        icon: '🧺',
        category: 'Daily Life',
        popularity: 87,
        features: ['Machine availability', 'Timer alerts', 'Building maps']
    },
    {
        id: 'ride-share-hub',
        name: 'Ride Share Hub',
        description: 'Coordinate rides home with fellow students',
        icon: '🚗',
        category: 'Transportation',
        popularity: 92,
        features: ['Route matching', 'Cost splitting', 'Safety verification']
    },
    {
        id: 'meal-swap',
        name: 'Meal Swap Coordinator',
        description: 'Trade dining hall swipes efficiently',
        icon: '🍕',
        category: 'Food',
        popularity: 78,
        features: ['Swipe tracking', 'Fair trades', 'Dietary preferences']
    }
];
export const CompleteHIVEToolsSystem = ({ userId, userProfile, spaceId, initialTab = 'marketplace', onToolInstall, onToolCreate, onToolDeploy }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [selectedTool, setSelectedTool] = useState(null);
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [isComposerOpen, setIsComposerOpen] = useState(false);
    const [personalTools, setPersonalTools] = useState([]);
    const [marketplaceTools, setMarketplaceTools] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    // Load tools data
    useEffect(() => {
        loadMarketplaceTools();
        loadPersonalTools();
    }, [userId]);
    const loadMarketplaceTools = async () => {
        try {
            const response = await fetch('/api/tools/browse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category: selectedCategory })
            });
            if (response.ok) {
                const data = await response.json();
                setMarketplaceTools(data.tools || []);
            }
        }
        catch (error) {
            console.error('Failed to load marketplace tools:', error);
        }
    };
    const loadPersonalTools = async () => {
        try {
            const response = await fetch('/api/tools/personal');
            if (response.ok) {
                const data = await response.json();
                setPersonalTools(data.tools || []);
            }
        }
        catch (error) {
            console.error('Failed to load personal tools:', error);
        }
    };
    const handleInstallTool = async (toolId) => {
        try {
            const response = await fetch('/api/tools/install', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toolId })
            });
            if (response.ok) {
                await loadPersonalTools();
                onToolInstall?.(toolId);
                setActiveTab('personal');
            }
        }
        catch (error) {
            console.error('Failed to install tool:', error);
        }
    };
    const handleCreateFromTemplate = async (templateId) => {
        const template = CAMPUS_TEMPLATES.find(t => t.id === templateId);
        if (!template)
            return;
        try {
            const response = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    template: templateId,
                    name: template.name,
                    description: template.description
                })
            });
            if (response.ok) {
                const newTool = await response.json();
                await loadPersonalTools();
                onToolCreate?.(newTool);
                setSelectedTool(newTool);
                setIsConfigOpen(true);
            }
        }
        catch (error) {
            console.error('Failed to create tool from template:', error);
        }
    };
    const handleDeployToSpace = async (toolId) => {
        if (!spaceId)
            return;
        try {
            const response = await fetch('/api/tools/deploy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toolId, spaceId })
            });
            if (response.ok) {
                onToolDeploy?.(toolId, spaceId);
            }
        }
        catch (error) {
            console.error('Failed to deploy tool:', error);
        }
    };
    const renderMarketplace = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-foreground-primary", children: "Quick Start Templates" }), _jsxs(Badge, { variant: "secondary", className: "bg-surface-secondary", children: [_jsx(Zap, { className: "w-3 h-3 mr-1" }), "UB Campus Optimized"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: CAMPUS_TEMPLATES.map((template) => (_jsxs(Card, { className: "border-border-primary hover:border-orange-primary/50 transition-all cursor-pointer group", onClick: () => handleCreateFromTemplate(template.id), children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-2xl", children: template.icon }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-base", children: template.name }), _jsx(Badge, { variant: "outline", className: "mt-1 text-xs", children: template.category })] })] }), _jsxs("div", { className: "flex items-center gap-1 text-foreground-secondary", children: [_jsx(TrendingUp, { className: "w-4 h-4" }), _jsxs("span", { className: "text-sm", children: [template.popularity, "%"] })] })] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-foreground-secondary mb-3", children: template.description }), _jsx("div", { className: "flex flex-wrap gap-2", children: template.features.map((feature, i) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: feature }, i))) }), _jsxs(Button, { size: "sm", className: "w-full mt-3 group-hover:bg-orange-primary group-hover:text-white", variant: "outline", children: [_jsx(Plus, { className: "w-4 h-4 mr-1" }), "Quick Deploy"] })] })] }, template.id))) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-foreground-primary", children: "Community Tools" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setIsLibraryOpen(true), children: [_jsx(Search, { className: "w-4 h-4 mr-1" }), "Browse All"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: marketplaceTools.slice(0, 6).map((tool) => (_jsxs(Card, { className: "border-border-primary hover:border-purple-primary/50 transition-all", children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsx(CardTitle, { className: "text-sm", children: tool.name }), _jsxs(CardDescription, { className: "text-xs", children: ["by ", tool.metadata?.creatorName || 'Anonymous'] })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-xs text-foreground-secondary mb-3 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-foreground-secondary", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [tool.metadata?.installCount || 0, " users"] })] }), _jsxs(Button, { size: "sm", variant: "ghost", onClick: () => handleInstallTool(tool.id), children: [_jsx(Package, { className: "w-4 h-4 mr-1" }), "Install"] })] })] })] }, tool.id))) })] })] }));
    const renderPersonalTools = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-foreground-primary", children: "Your Toolkit" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { variant: "secondary", children: [personalTools.length, " Tools"] }), _jsxs(Button, { size: "sm", onClick: () => setActiveTab('hivelab'), children: [_jsx(Plus, { className: "w-4 h-4 mr-1" }), "Create New"] })] })] }), personalTools.length === 0 ? (_jsx(Card, { className: "border-dashed", children: _jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [_jsx(Package, { className: "w-12 h-12 text-foreground-secondary mb-4" }), _jsx("h4", { className: "text-lg font-medium mb-2", children: "No tools yet" }), _jsx("p", { className: "text-sm text-foreground-secondary text-center mb-4", children: "Install tools from the marketplace or create your own" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => setActiveTab('marketplace'), children: "Browse Marketplace" }), _jsx(Button, { size: "sm", onClick: () => setActiveTab('hivelab'), children: "Create Tool" })] })] }) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: personalTools.map((tool) => (_jsxs(Card, { className: "border-border-primary hover:shadow-lg transition-all", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-base", children: tool.name }), _jsx(Badge, { variant: tool.status === 'published' ? 'default' : 'secondary', className: "mt-1 text-xs", children: tool.status })] }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
                                            setSelectedTool(tool);
                                            setIsConfigOpen(true);
                                        }, children: _jsx(Settings, { className: "w-4 h-4" }) })] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-foreground-secondary mb-4 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center gap-1", children: tool.metadata?.isCollaborative && (_jsxs(Badge, { variant: "outline", className: "text-xs", children: [_jsx(GitBranch, { className: "w-3 h-3 mr-1" }), "Collaborative"] })) }), _jsxs("div", { className: "flex gap-1", children: [spaceId && (_jsx(Button, { size: "sm", variant: "ghost", onClick: () => handleDeployToSpace(tool.id), children: _jsx(Rocket, { className: "w-4 h-4" }) })), _jsx(Button, { size: "sm", variant: "ghost", children: _jsx(Share2, { className: "w-4 h-4" }) })] })] })] })] }, tool.id))) }))] }));
    const renderHiveLab = () => (_jsxs("div", { className: "space-y-6", children: [userProfile && (_jsx(ProfileHiveLabWidget, { profile: {
                    name: userProfile.name,
                    handle: userProfile.handle,
                    avatar: userProfile.avatar,
                    builderLevel: userProfile.builderLevel || 'novice',
                    stats: {
                        toolsBuilt: personalTools.filter(t => t.ownerId === userId).length,
                        totalUsers: personalTools.reduce((sum, t) => sum + (t.metadata?.installCount || 0), 0),
                        collaborations: personalTools.filter(t => t.metadata?.isCollaborative).length
                    },
                    recentBuilds: personalTools.slice(0, 3).map(t => ({
                        id: t.id,
                        name: t.name,
                        users: t.metadata?.installCount || 0,
                        trend: 'up'
                    }))
                } })), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-foreground-primary mb-4", children: "Start Building" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(Card, { className: "border-border-primary hover:border-orange-primary transition-all cursor-pointer", onClick: () => setIsComposerOpen(true), children: _jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-orange-primary/10 rounded-lg", children: _jsx(Sparkles, { className: "w-6 h-6 text-orange-primary" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-base", children: "Visual Composer" }), _jsx(CardDescription, { children: "Drag and drop elements to build tools" })] })] }) }) }), _jsx(Card, { className: "border-border-primary hover:border-purple-primary transition-all cursor-pointer", onClick: () => setActiveTab('marketplace'), children: _jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-purple-primary/10 rounded-lg", children: _jsx(Grid, { className: "w-6 h-6 text-purple-primary" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-base", children: "From Template" }), _jsx(CardDescription, { children: "Start with a proven campus solution" })] })] }) }) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-foreground-primary mb-4", children: "Community Activity" }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { variant: "secondary", children: "New" }), _jsx("span", { className: "text-sm", children: "Study Buddy Matcher launched" })] }), _jsx("span", { className: "text-xs text-foreground-secondary", children: "2 hours ago" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { variant: "outline", children: "Update" }), _jsx("span", { className: "text-sm", children: "Laundry Tracker v2.0 released" })] }), _jsx("span", { className: "text-xs text-foreground-secondary", children: "5 hours ago" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { variant: "secondary", children: "Trending" }), _jsx("span", { className: "text-sm", children: "Event Coordinator hits 500 users" })] }), _jsx("span", { className: "text-xs text-foreground-secondary", children: "1 day ago" })] })] }) }) })] })] }));
    return (_jsxs("div", { className: "w-full max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("h1", { className: "text-2xl font-bold text-foreground-primary", children: "HiveLab & Tools" }), _jsx("p", { className: "text-foreground-secondary", children: "Build and share solutions that make campus life better" })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 mb-6", children: [_jsxs(TabsTrigger, { value: "marketplace", className: "flex items-center gap-2", children: [_jsx(Package, { className: "w-4 h-4" }), "Marketplace"] }), _jsxs(TabsTrigger, { value: "personal", className: "flex items-center gap-2", children: [_jsx(Wrench, { className: "w-4 h-4" }), "Your Tools"] }), _jsxs(TabsTrigger, { value: "hivelab", className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "w-4 h-4" }), "HiveLab"] })] }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 }, children: [_jsx(TabsContent, { value: "marketplace", className: "mt-0", children: renderMarketplace() }), _jsx(TabsContent, { value: "personal", className: "mt-0", children: renderPersonalTools() }), _jsx(TabsContent, { value: "hivelab", className: "mt-0", children: renderHiveLab() })] }, activeTab) })] }), _jsx(ToolLibraryModal, { isOpen: isLibraryOpen, onClose: () => setIsLibraryOpen(false), onSelectTool: (tool) => {
                    setSelectedTool(tool);
                    setIsLibraryOpen(false);
                    handleInstallTool(tool.id);
                }, tools: marketplaceTools, categories: ['Academic', 'Daily Life', 'Transportation', 'Food', 'Social', 'Events'] }), selectedTool && (_jsx(ToolConfigurationPanel, { isOpen: isConfigOpen, onClose: () => {
                    setIsConfigOpen(false);
                    setSelectedTool(null);
                }, tool: selectedTool, onSave: async (config) => {
                    try {
                        const response = await fetch(`/api/tools/${selectedTool.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ config })
                        });
                        if (response.ok) {
                            await loadPersonalTools();
                            setIsConfigOpen(false);
                        }
                    }
                    catch (error) {
                        console.error('Failed to save tool config:', error);
                    }
                } })), _jsx(VisualToolComposer, { isOpen: isComposerOpen, onClose: () => setIsComposerOpen(false), onSave: async (elements) => {
                    try {
                        const response = await fetch('/api/tools', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: 'New Tool',
                                description: 'Created with Visual Composer',
                                elements
                            })
                        });
                        if (response.ok) {
                            const newTool = await response.json();
                            await loadPersonalTools();
                            onToolCreate?.(newTool);
                            setIsComposerOpen(false);
                            setActiveTab('personal');
                        }
                    }
                    catch (error) {
                        console.error('Failed to create tool:', error);
                    }
                }, availableElements: [
                    { id: 'text-input', name: 'Text Input', category: 'input' },
                    { id: 'button', name: 'Button', category: 'action' },
                    { id: 'calendar', name: 'Calendar', category: 'scheduling' },
                    { id: 'map', name: 'Map', category: 'location' },
                    { id: 'chart', name: 'Chart', category: 'data' },
                    { id: 'list', name: 'List', category: 'display' }
                ] })] }));
};
//# sourceMappingURL=complete-hive-tools-system.js.map