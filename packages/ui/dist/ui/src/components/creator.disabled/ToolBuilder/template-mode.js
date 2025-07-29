"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { Card } from '../../ui/card';
import { Button } from '../../../index';
import { Input } from '../../../index';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Search, Filter, Star, Users, Clock, Zap, Calculator, Calendar, FileText, Hash, } from 'lucide-react';
const MOCK_TEMPLATES = [
    {
        id: '1',
        name: 'GPA Calculator',
        description: 'Calculate semester and cumulative GPA with credit hours',
        category: 'calculator',
        difficulty: 'beginner',
        usageCount: 1247,
        rating: 4.8,
        estimatedTime: 5,
        tags: ['gpa', 'grades', 'academic'],
        author: { name: 'Sarah Chen', handle: 'sarahc' },
        featured: true,
        icon: Calculator,
    },
    {
        id: '2',
        name: 'Study Schedule Builder',
        description: 'Plan your study sessions with automatic time blocking',
        category: 'organizer',
        difficulty: 'intermediate',
        usageCount: 892,
        rating: 4.6,
        estimatedTime: 10,
        tags: ['study', 'schedule', 'planning'],
        author: { name: 'Alex Rodriguez', handle: 'alexr' },
        featured: true,
        icon: Calendar,
    },
    {
        id: '3',
        name: 'Assignment Tracker',
        description: 'Track homework, projects, and due dates across classes',
        category: 'organizer',
        difficulty: 'beginner',
        usageCount: 2156,
        rating: 4.9,
        estimatedTime: 7,
        tags: ['assignments', 'deadlines', 'organization'],
        author: { name: 'Jordan Kim', handle: 'jordank' },
        featured: false,
        icon: FileText,
    },
    {
        id: '4',
        name: 'Random Team Generator',
        description: 'Automatically create balanced teams for group projects',
        category: 'generator',
        difficulty: 'beginner',
        usageCount: 634,
        rating: 4.3,
        estimatedTime: 3,
        tags: ['teams', 'random', 'groups'],
        author: { name: 'Casey Williams', handle: 'caseyw' },
        featured: false,
        icon: Hash,
    },
];
const CATEGORIES = [
    { id: 'all', name: 'All Templates', count: MOCK_TEMPLATES.length },
    { id: 'calculator', name: 'Calculators', count: MOCK_TEMPLATES.filter(t => t.category === 'calculator').length },
    { id: 'organizer', name: 'Organizers', count: MOCK_TEMPLATES.filter(t => t.category === 'organizer').length },
    { id: 'generator', name: 'Generators', count: MOCK_TEMPLATES.filter(t => t.category === 'generator').length },
];
function TemplateCard({ template, onSelect }) {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)]';
            case 'intermediate': return 'bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)]';
            case 'advanced': return 'bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)]';
            default: return 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)]';
        }
    };
    return (_jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, transition: { duration: 0.2 }, children: _jsxs(Card, { className: cn("p-4 h-full cursor-pointer transition-all duration-200", "bg-[var(--hive-background-secondary)]/50 border-[var(--hive-border-primary)]", "hover:bg-[var(--hive-background-secondary)]/80 hover:border-[var(--hive-brand-primary)]/50", template.featured && "ring-2 ring-[var(--hive-brand-primary)]/30"), children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("w-10 h-10 rounded-lg flex items-center justify-center", "bg-[var(--hive-brand-primary)]/20"), children: _jsx(template.icon, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] mb-1", children: template.name }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { className: getDifficultyColor(template.difficulty), children: template.difficulty }), template.featured && (_jsxs(Badge, { className: "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]", children: [_jsx(Star, { className: "h-3 w-3 mr-1" }), "Featured"] }))] })] })] }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-[var(--hive-text-secondary)]", children: [_jsx(Star, { className: "h-3 w-3 fill-current text-[var(--hive-status-warning)]" }), template.rating] })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-4 line-clamp-2", children: template.description }), _jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-secondary)] mb-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-3 w-3" }), template.usageCount.toLocaleString()] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), template.estimatedTime, "m"] })] }), _jsxs("span", { children: ["by @", template.author.handle] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex flex-wrap gap-1", children: [template.tags.slice(0, 3).map((tag) => (_jsx("span", { className: cn("px-2 py-1 rounded text-xs", "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)]"), children: tag }, tag))), template.tags.length > 3 && (_jsxs("span", { className: "text-xs text-[var(--hive-text-secondary)]", children: ["+", template.tags.length - 3] }))] }), _jsxs(Button, { size: "sm", onClick: onSelect, className: cn("bg-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/90", "text-[var(--hive-text-primary)]"), children: [_jsx(Zap, { className: "h-3 w-3 mr-1" }), "Use"] })] })] }) }));
}
export const TemplateMode = ({ onSelectTemplate, className }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredTemplates, setFilteredTemplates] = useState(MOCK_TEMPLATES);
    React.useEffect(() => {
        let filtered = MOCK_TEMPLATES;
        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(template => template.category === selectedCategory);
        }
        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(template => template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
        }
        setFilteredTemplates(filtered);
    }, [searchTerm, selectedCategory]);
    return (_jsxs("div", { className: cn("flex flex-col h-full", className), children: [_jsxs("div", { className: "p-4 border-b border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-secondary)]" }), _jsx(Input, { value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Search templates by name, description, or tags...", className: cn("pl-10 bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]", "focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30") })] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filters"] })] }), _jsx("div", { className: "flex items-center gap-2", children: CATEGORIES.map((category) => (_jsxs(Button, { variant: selectedCategory === category.id ? "primary" : "outline", size: "sm", onClick: () => setSelectedCategory(category.id), className: "h-8", children: [category.name, _jsxs("span", { className: "ml-2 text-xs opacity-70", children: ["(", category.count, ")"] })] }, category.id))) })] }), _jsx(ScrollArea, { className: "flex-1", children: _jsx("div", { className: "p-4", children: filteredTemplates.length > 0 ? (_jsx(motion.div, { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 }, children: filteredTemplates.map((template, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 }, children: _jsx(TemplateCard, { template: template, onSelect: () => onSelectTemplate(template) }) }, template.id))) })) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex flex-col items-center justify-center h-64 text-center", children: [_jsx(Search, { className: "h-12 w-12 text-[var(--hive-text-secondary)] mb-4" }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: "No templates found" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] max-w-md", children: "Try adjusting your search terms or filters to find the perfect template for your tool." })] })) }) })] }));
};
export default TemplateMode;
//# sourceMappingURL=template-mode.js.map