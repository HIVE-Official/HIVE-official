'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { X, Search, Filter, Calendar, Users, BarChart3, MessageSquare, CheckCircle, Settings, Zap, Star, Download } from 'lucide-react';
const CATEGORY_INFO = {
    productivity: {
        icon: _jsx(Zap, { className: "w-5 h-5" }),
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500/30',
    },
    social: {
        icon: _jsx(Users, { className: "w-5 h-5" }),
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20',
        borderColor: 'border-purple-500/30',
    },
    academic: {
        icon: _jsx(BarChart3, { className: "w-5 h-5" }),
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20',
        borderColor: 'border-blue-500/30',
    },
    coordination: {
        icon: _jsx(Calendar, { className: "w-5 h-5" }),
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/20',
        borderColor: 'border-emerald-500/30',
    },
};
export const ToolLibraryModal = ({ isOpen, onClose, availableTools, onPlantTool, spaceType, isPlanting = false, plantingToolId, className }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTool, setSelectedTool] = useState(null);
    const categories = ['all', 'productivity', 'social', 'academic', 'coordination'];
    const filteredTools = availableTools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    const handlePlantTool = (tool) => {
        onPlantTool?.(tool);
    };
    const formatNumber = (num) => {
        if (num >= 1000)
            return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffInDays < 7)
            return `${diffInDays}d ago`;
        if (diffInDays < 30)
            return `${Math.floor(diffInDays / 7)}w ago`;
        return `${Math.floor(diffInDays / 30)}mo ago`;
    };
    if (!isOpen)
        return null;
    return (_jsx(AnimatePresence, { children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, className: "absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: cn('relative w-full max-w-6xl h-[80vh] overflow-hidden', 'bg-gradient-to-br from-[var(--hive-background-secondary)]/95 via-[var(--hive-background-tertiary)]/90 to-[var(--hive-background-interactive)]/95', 'backdrop-blur-xl border border-[var(--hive-border-primary)]/30', 'rounded-3xl shadow-2xl', className), children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-[var(--hive-border-primary)]/20", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Tool Library" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mt-1", children: "Choose tools to enhance your space functionality" })] }), _jsx("button", { onClick: onClose, className: "w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "flex h-full", children: [_jsxs("div", { className: "w-64 p-6 border-r border-[var(--hive-border-primary)]/20", children: [_jsxs("div", { className: "relative mb-6", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search tools...", className: "w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)]/50 transition-colors duration-200" })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary)] mb-3 flex items-center gap-2", children: [_jsx(Filter, { className: "w-4 h-4" }), "Categories"] }), _jsx("div", { className: "space-y-2", children: categories.map((category) => {
                                                        const isSelected = selectedCategory === category;
                                                        const categoryInfo = category !== 'all' ? CATEGORY_INFO[category] : null;
                                                        return (_jsxs("button", { onClick: () => setSelectedCategory(category), className: cn('w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200', isSelected
                                                                ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30'
                                                                : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50'), children: [categoryInfo ? categoryInfo.icon : _jsx(MessageSquare, { className: "w-4 h-4" }), _jsx("span", { className: "capitalize font-medium", children: category === 'all' ? 'All Tools' : category }), _jsx("span", { className: "text-xs text-[var(--hive-text-muted)] ml-auto", children: category === 'all'
                                                                        ? availableTools.length
                                                                        : availableTools.filter(t => t.category === category).length })] }, category));
                                                    }) })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: selectedTool ? (
                                    /* Tool Detail View */
                                    _jsxs("div", { className: "p-6", children: [_jsx("button", { onClick: () => setSelectedTool(null), className: "flex items-center gap-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] transition-colors duration-200 mb-6", children: "\u2190 Back to Library" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-3xl", children: selectedTool.icon }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("h3", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: selectedTool.name }), selectedTool.isOfficial && (_jsx("div", { className: "px-2 py-1 bg-[var(--hive-status-info)]/20 border border-[var(--hive-status-info)]/40 rounded-full", children: _jsx("span", { className: "text-xs font-semibold text-[var(--hive-status-info)]", children: "Official" }) }))] }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-3", children: selectedTool.description }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-[var(--hive-text-muted)]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400" }), _jsx("span", { children: selectedTool.rating.toFixed(1) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Download, { className: "w-4 h-4" }), _jsxs("span", { children: [formatNumber(selectedTool.installations), " installs"] })] }), _jsxs("span", { children: ["Updated ", formatDate(selectedTool.lastUpdated)] })] })] })] }), _jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: () => handlePlantTool(selectedTool), disabled: isPlanting && plantingToolId === selectedTool.id, className: "px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300 disabled:opacity-50", children: isPlanting && plantingToolId === selectedTool.id ? 'Planting...' : 'Plant Tool' })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-3", children: "Features" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: selectedTool.features.map((feature, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-[var(--hive-status-success)]" }), _jsx("span", { className: "text-[var(--hive-text-secondary)]", children: feature })] }, index))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-3", children: "Tags" }), _jsx("div", { className: "flex flex-wrap gap-2", children: selectedTool.tags.map((tag, index) => (_jsx("span", { className: "px-3 py-1 bg-[var(--hive-background-primary)]/40 border border-[var(--hive-border-primary)]/20 rounded-full text-sm text-[var(--hive-text-secondary)]", children: tag }, index))) })] })] })] })) : (
                                    /* Tool Grid */
                                    _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: selectedCategory === 'all' ? 'All Tools' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tools` }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: [filteredTools.length, " tool", filteredTools.length !== 1 ? 's' : '', " available"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredTools.map((tool, index) => {
                                                    const categoryInfo = CATEGORY_INFO[tool.category];
                                                    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 }, onClick: () => setSelectedTool(tool), className: "cursor-pointer group bg-[var(--hive-background-tertiary)]/40 backdrop-blur-sm border border-[var(--hive-border-primary)]/20 rounded-2xl p-5 hover:border-[var(--hive-brand-primary)]/40 transition-all duration-300", children: [_jsx("div", { className: "flex items-start justify-between mb-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[var(--hive-background-secondary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-xl", children: tool.icon }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)] transition-colors duration-300", children: tool.name }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsxs("div", { className: cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', categoryInfo.bgColor, categoryInfo.borderColor, 'border'), children: [_jsx("span", { className: categoryInfo.color, children: React.cloneElement(categoryInfo.icon, { className: 'w-3 h-3' }) }), _jsx("span", { className: categoryInfo.color, children: tool.category })] }), tool.isOfficial && (_jsx("div", { className: "px-2 py-0.5 bg-[var(--hive-status-info)]/20 border border-[var(--hive-status-info)]/40 rounded-full", children: _jsx("span", { className: "text-xs font-semibold text-[var(--hive-status-info)]", children: "Official" }) }))] })] })] }) }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-4 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-muted)]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-3 h-3 text-yellow-400" }), _jsx("span", { children: tool.rating.toFixed(1) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Download, { className: "w-3 h-3" }), _jsx("span", { children: formatNumber(tool.installations) })] })] }), _jsx("button", { onClick: (e) => {
                                                                            e.stopPropagation();
                                                                            handlePlantTool(tool);
                                                                        }, disabled: isPlanting && plantingToolId === tool.id, className: "px-3 py-1.5 bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30 rounded-lg font-medium hover:bg-[var(--hive-brand-primary)]/20 transition-all duration-200 disabled:opacity-50", children: isPlanting && plantingToolId === tool.id ? 'Planting...' : 'Plant' })] })] }, tool.id));
                                                }) }), filteredTools.length === 0 && (_jsxs("div", { className: "text-center py-12 text-[var(--hive-text-muted)]", children: [_jsx(Settings, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }), _jsx("p", { children: "No tools found matching your criteria" }), _jsx("p", { className: "text-sm mt-1", children: "Try adjusting your search or filters" })] }))] })) })] })] })] }) }));
};
export default ToolLibraryModal;
//# sourceMappingURL=tool-library-modal.js.map