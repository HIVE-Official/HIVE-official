import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Star, Download, Users, Search, Sparkles, TrendingUp, Settings, Eye, BarChart3, X, Send } from 'lucide-react';
const meta = {
    title: '10-creator/HIVE Tool System (Refined)',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# HIVE Tool System - Black Matte Refined

Consolidated tool ecosystem with consistent black matte sleek aesthetic. Removes redundancies and establishes clear design hierarchy.

## Unified Design Principles:
- **Single color system**: HIVE tokens only (obsidian, charcoal, graphite)
- **Black matte foundation**: All interfaces use consistent dark theme
- **Strategic yellow accents**: Brand moments and primary actions only
- **Minimal complexity levels**: Simplified interaction patterns

## Design Tokens Used:
- \`obsidian\` (var(--hive-background-primary)) - Main backgrounds
- \`charcoal\` (var(--hive-background-secondary)) - Card backgrounds  
- \`graphite\` (var(--hive-background-tertiary)) - Elevated surfaces
- \`platinum\` (var(--hive-text-primary)) - Primary text
- \`gold\` (var(--hive-brand-secondary)) - Brand accents
        `,
            },
        },
    },
};
export default meta;
// Unified Tool Card Component (eliminates redundancy)
const UnifiedToolCard = ({ tool, variant = 'marketplace', onAction }) => (_jsx(Card, { className: "bg-charcoal border-graphite hover:border-gold/20 transition-all duration-300", children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "font-semibold text-platinum group-hover:text-gold transition-colors", children: tool.name }), tool.featured && (_jsx(Badge, { className: "bg-gold text-obsidian text-xs", children: "Featured" }))] }), _jsx("p", { className: "text-sm text-silver mb-3 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-mercury", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Download, { className: "w-3 h-3" }), _jsx("span", { children: tool.stats?.installs || tool.installs })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-3 h-3 fill-gold text-gold" }), _jsx("span", { children: tool.stats?.rating || '4.8' })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsx("span", { children: tool.stats?.spaces || tool.activeUsers })] })] })] }), variant === 'management' && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${tool.status === 'active' ? 'bg-emerald' : 'bg-mercury'}` }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-platinum hover:text-gold", children: _jsx(Settings, { className: "w-4 h-4" }) })] }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { onClick: () => onAction(tool, 'primary'), className: "flex-1 bg-gold hover:bg-gold/90 text-obsidian font-medium", children: variant === 'marketplace' ? 'Install' : 'Configure' }), _jsx(Button, { onClick: () => onAction(tool, 'secondary'), variant: "outline", size: "sm", className: "border-steel text-platinum hover:border-gold hover:text-gold", children: variant === 'marketplace' ? _jsx(Eye, { className: "w-4 h-4" }) : _jsx(BarChart3, { className: "w-4 h-4" }) })] })] }) }));
// Unified Modal Component (eliminates redundancy)
const UnifiedModal = ({ isOpen, onClose, title, children, actions }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 bg-void/80 backdrop-blur-sm flex items-end md:items-center justify-center", children: _jsxs("div", { className: "bg-obsidian border border-steel w-full max-w-2xl max-h-[90vh] overflow-y-auto md:rounded-xl", children: [_jsxs("div", { className: "sticky top-0 bg-obsidian border-b border-steel px-6 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "text-platinum hover:text-gold", children: _jsx(X, { className: "w-4 h-4" }) }), _jsx("h2", { className: "font-semibold text-platinum", children: title })] }), _jsx(Badge, { variant: "outline", className: "border-steel text-mercury", children: "CS 442" })] }), _jsx("div", { className: "p-6 text-platinum", children: children }), actions && (_jsx("div", { className: "sticky bottom-0 bg-obsidian border-t border-steel px-6 py-4", children: actions }))] }) }));
};
// Mock data (simplified)
const mockTools = [
    {
        id: '1',
        name: 'Quick Poll',
        description: 'Create instant polls with real-time results',
        installs: 847,
        featured: true,
        status: 'active',
        activeUsers: 234,
    },
    {
        id: '2',
        name: 'Event Coordinator',
        description: 'Advanced event planning and RSVP tracking',
        installs: 623,
        featured: false,
        status: 'active',
        activeUsers: 156,
    },
    {
        id: '3',
        name: 'GPA Calculator',
        description: 'Track semester GPA with predictions',
        installs: 1205,
        featured: true,
        status: 'needs_update',
        activeUsers: 345,
    },
];
// Consolidated Tool Marketplace
export const ToolMarketplace = {
    render: () => {
        const [searchQuery, setSearchQuery] = useState('');
        return (_jsxs("div", { className: "min-h-screen bg-obsidian text-platinum", children: [_jsx("div", { className: "bg-charcoal border-b border-steel px-6 py-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-platinum", children: "Tool Marketplace" }), _jsx("p", { className: "text-silver", children: "Discover tools built by students, for students" })] }), _jsx(Button, { className: "bg-gold text-obsidian hover:bg-gold/90 font-medium", children: "Build a Tool" })] }), _jsxs("div", { className: "relative max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-mercury w-4 h-4" }), _jsx(Input, { placeholder: "Search tools...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 bg-graphite border-steel text-platinum placeholder:text-mercury" })] })] }) }), _jsx("div", { className: "max-w-7xl mx-auto px-6 py-8", children: _jsxs("div", { className: "flex gap-8", children: [_jsx("div", { className: "w-64 flex-shrink-0", children: _jsxs(Card, { className: "bg-charcoal border-steel p-4", children: [_jsx("h3", { className: "font-semibold text-platinum mb-4", children: "Categories" }), _jsx("div", { className: "space-y-2", children: [
                                                { name: 'Featured', count: 8, icon: Sparkles },
                                                { name: 'Trending', count: 12, icon: TrendingUp },
                                                { name: 'Academic', count: 24, icon: Users },
                                            ].map(category => {
                                                const Icon = category.icon;
                                                return (_jsxs("button", { className: "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors hover:bg-graphite group", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { className: "w-4 h-4 text-mercury group-hover:text-gold" }), _jsx("span", { className: "text-sm text-platinum", children: category.name })] }), _jsx(Badge, { variant: "outline", className: "border-steel text-mercury text-xs", children: category.count })] }, category.name));
                                            }) })] }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "grid grid-cols-4 gap-4 mb-8", children: [
                                            { label: 'Available Tools', value: '247', accent: 'gold' },
                                            { label: 'Student Builders', value: '89', accent: 'emerald' },
                                            { label: 'Active Installations', value: '1.2K', accent: 'sapphire' },
                                            { label: 'Spaces Using Tools', value: '156', accent: 'citrine' },
                                        ].map(stat => (_jsxs(Card, { className: "bg-charcoal border-steel p-4 text-center", children: [_jsx("div", { className: `text-2xl font-bold text-${stat.accent}`, children: stat.value }), _jsx("div", { className: "text-sm text-mercury", children: stat.label })] }, stat.label))) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: mockTools.map(tool => (_jsx(UnifiedToolCard, { tool: tool, variant: "marketplace", onAction: (tool, action) => console.log(`${action}:`, tool.name) }, tool.id))) })] })] }) })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Unified tool marketplace with consistent black matte aesthetic and HIVE design tokens.',
            },
        },
    },
};
// Consolidated Tool Management
export const ToolManagement = {
    render: () => (_jsxs("div", { className: "min-h-screen bg-obsidian text-platinum", children: [_jsx("div", { className: "bg-charcoal border-b border-steel px-6 py-6", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-platinum", children: "Tool Management" }), _jsx("p", { className: "text-silver", children: "CS 442 - Software Engineering" })] }), _jsx(Button, { className: "bg-gold text-obsidian hover:bg-gold/90 font-medium", children: "Install New Tool" })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8", children: [_jsx("div", { className: "grid grid-cols-4 gap-6 mb-8", children: [
                            { label: 'Total Tools', value: '4', icon: Settings },
                            { label: 'Active Tools', value: '3', icon: Users },
                            { label: 'Active Users', value: '735', icon: TrendingUp },
                            { label: 'Interactions', value: '4.8K', icon: BarChart3 },
                        ].map(stat => {
                            const Icon = stat.icon;
                            return (_jsx(Card, { className: "bg-charcoal border-steel p-6", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-graphite rounded-xl flex items-center justify-center", children: _jsx(Icon, { className: "w-6 h-6 text-gold" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-mercury", children: stat.label }), _jsx("div", { className: "text-2xl font-bold text-platinum", children: stat.value })] })] }) }, stat.label));
                        }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-platinum mb-6", children: "Installed Tools" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: mockTools.map(tool => (_jsx(UnifiedToolCard, { tool: tool, variant: "management", onAction: (tool, action) => console.log(`${action}:`, tool.name) }, tool.id))) })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Unified tool management dashboard with consistent black matte design.',
            },
        },
    },
};
// Consolidated HiveLAB Builder
export const HiveLabBuilder = {
    render: () => (_jsxs("div", { className: "h-screen bg-obsidian text-platinum flex flex-col", children: [_jsxs("div", { className: "bg-charcoal border-b border-steel px-6 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("h1", { className: "font-semibold text-platinum", children: "HiveLAB Builder" }), _jsx(Badge, { variant: "outline", className: "border-steel text-mercury", children: "Draft" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: "text-platinum hover:text-gold", children: [_jsx(Eye, { className: "w-4 h-4 mr-2" }), "Preview"] }), _jsx(Button, { className: "bg-gold text-obsidian hover:bg-gold/90 font-medium", children: "Publish" })] })] }), _jsxs("div", { className: "flex-1 flex", children: [_jsx("div", { className: "w-64 bg-charcoal border-r border-steel overflow-y-auto", children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-medium text-platinum mb-4", children: "Element Library" }), _jsx("div", { className: "space-y-3", children: [
                                        { name: 'Text Input', icon: '📝' },
                                        { name: 'Button', icon: '🔘' },
                                        { name: 'Poll', icon: '📊' },
                                        { name: 'Calendar', icon: '📅' },
                                    ].map(element => (_jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg hover:bg-graphite cursor-pointer transition-colors group", children: [_jsx("span", { className: "text-lg", children: element.icon }), _jsx("span", { className: "text-sm text-platinum group-hover:text-gold", children: element.name })] }, element.name))) })] }) }), _jsx("div", { className: "flex-1 bg-graphite relative", children: _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-medium text-platinum mb-2", children: "Start Building" }), _jsx("div", { className: "text-sm text-mercury", children: "Drag elements from the library to begin" })] }) }) }), _jsx("div", { className: "w-64 bg-charcoal border-l border-steel", children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-medium text-platinum mb-4", children: "Properties" }), _jsx("div", { className: "text-center text-mercury text-sm mt-8", children: "Select an element to edit properties" })] }) })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Unified HiveLAB builder with consistent black matte professional interface.',
            },
        },
    },
};
// Consolidated Tool Usage Modal
export const ToolUsageModal = {
    render: () => {
        const [isOpen, setIsOpen] = useState(true);
        return (_jsxs("div", { className: "h-screen bg-obsidian p-8", children: [_jsx("div", { className: "max-w-md mx-auto", children: _jsxs(Card, { className: "bg-charcoal border-steel p-6", children: [_jsx("h3", { className: "font-semibold text-platinum mb-2", children: "CS 442 - Software Engineering" }), _jsx("p", { className: "text-mercury text-sm mb-4", children: "34 members \u2022 12 tools installed" }), _jsx(Button, { onClick: () => setIsOpen(true), className: "w-full bg-gold text-obsidian hover:bg-gold/90 font-medium", children: "Create Quick Poll" })] }) }), _jsx(UnifiedModal, { isOpen: isOpen, onClose: () => setIsOpen(false), title: "Quick Poll", actions: _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { variant: "outline", onClick: () => setIsOpen(false), className: "border-steel text-platinum hover:border-gold hover:text-gold", children: "Cancel" }), _jsxs(Button, { className: "bg-gold text-obsidian hover:bg-gold/90 font-medium", children: [_jsx(Send, { className: "w-4 h-4 mr-2" }), "Post Poll"] })] }), children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-platinum mb-2 block", children: "Question" }), _jsx("textarea", { placeholder: "What would you like to ask?", className: "w-full bg-graphite border border-steel rounded-lg px-4 py-3 text-platinum placeholder:text-mercury resize-none", rows: 3 })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-platinum mb-3 block", children: "Options" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Input, { placeholder: "Option 1", className: "bg-graphite border-steel text-platinum placeholder:text-mercury" }), _jsx(Input, { placeholder: "Option 2", className: "bg-graphite border-steel text-platinum placeholder:text-mercury" }), _jsx(Button, { variant: "outline", size: "sm", className: "w-full border-steel text-platinum hover:border-gold hover:text-gold", children: "Add Option" })] })] })] }) })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Unified tool usage modal with consistent black matte interface and HIVE tokens.',
            },
        },
    },
};
//# sourceMappingURL=tool-system-refined.stories.js.map