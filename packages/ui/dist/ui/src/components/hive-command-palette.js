"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { cva } from 'class-variance-authority';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system';
import { User, Settings, Folder, Code, Zap } from 'lucide-react';
// HIVE Command Palette - Magnetic Search with Liquid Metal Motion
// Sophisticated command interface with magnetic interactions and builder-focused actions
const hiveCommandPaletteVariants = cva(
// Base palette styles - matte obsidian glass with heavy backdrop blur
"fixed inset-0 z-50 flex items-start justify-center pt-[20vh]", {
    variants: {
        variant: {
            default: "",
            premium: "",
        }
    },
    defaultVariants: {
        variant: "default",
    },
});
// Command item animation variants with magnetic effects
const commandItemVariants = {
    rest: {
        x: 0,
        scale: 1,
        backgroundColor: 'var(--hive-interactive-hover)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    hover: {
        x: 4,
        scale: 1.01,
        backgroundColor: 'var(--hive-interactive-active)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    selected: {
        x: 6,
        scale: 1.02,
        backgroundColor: 'var(--hive-brand-primary)/15',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    }
};
// Palette entrance animation
const paletteVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        y: -20,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
            type: "spring",
            stiffness: 300,
            damping: 25,
        }
    }
};
// Result list stagger animation
const resultListVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: cascadeTiming.stagger,
            delayChildren: 0.1,
        }
    }
};
const resultItemVariants = {
    hidden: {
        opacity: 0,
        x: -20,
        transition: {
            duration: motionDurations.quick,
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
            type: "spring",
            stiffness: 400,
            damping: 25,
        }
    }
};
const HiveCommandPalette = React.forwardRef(({ className, variant, isOpen, onClose, onSelect, items, categories, placeholder = "Search for commands, tools, spaces...", hotkey = "⌘K", recentItems = [], maxResults = 8, ...props }, ref) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const inputRef = useRef(null);
    // Filter and search logic
    const filteredItems = useMemo(() => {
        if (!query && !selectedCategory) {
            return recentItems.slice(0, maxResults);
        }
        let filtered = items;
        // Filter by category if selected
        if (selectedCategory) {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }
        // Filter by search query
        if (query) {
            const lowercaseQuery = query.toLowerCase();
            filtered = filtered.filter(item => item.title.toLowerCase().includes(lowercaseQuery) ||
                item.description?.toLowerCase().includes(lowercaseQuery) ||
                item.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)));
        }
        return filtered.slice(0, maxResults);
    }, [query, selectedCategory, items, recentItems, maxResults]);
    // Group filtered items by category
    const groupedItems = useMemo(() => {
        const groups = {};
        filteredItems.forEach(item => {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push(item);
        });
    });
    return groups;
}, [filteredItems]);
// Handle keyboard navigation
useEffect(() => {
    if (!isOpen)
        return;
    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Escape':
                onClose();
                break;
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    handleSelect(filteredItems[selectedIndex]);
                }
                break;
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen, selectedIndex, filteredItems, onClose]);
// Reset state when opening
useEffect(() => {
    if (isOpen) {
        setQuery('');
        setSelectedIndex(0);
        setSelectedCategory(null);
        setTimeout(() => inputRef.current?.focus(), 100);
    }
}, [isOpen]);
// Update selected index when filtered items change
useEffect(() => {
    setSelectedIndex(0);
}, [filteredItems]);
const handleSelect = (item) => {
    onSelect?.(item);
    item.action();
    onClose();
};
const handleCategorySelect = (categoryId) => {
    if (selectedCategory === categoryId) {
        setSelectedCategory(null);
    }
    else {
        setSelectedCategory(categoryId);
        setQuery('');
    }
};
const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
};
return (_jsx(AnimatePresence, { mode: "wait", children: isOpen && (_jsxs(motion.div, { ref: ref, className: cn(hiveCommandPaletteVariants({ variant, className })), initial: "hidden", animate: "visible", exit: "hidden", onClick: handleBackdropClick, ...props, children: [_jsx(motion.div, { className: "absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }), _jsxs(motion.div, { className: "relative w-full max-w-2xl mx-4 bg-[var(--hive-background-primary)]/60 backdrop-blur-2xl border border-[var(--hive-border-primary)] rounded-2xl shadow-2xl overflow-hidden", variants: paletteVariants, children: [_jsxs("div", { className: "flex items-center px-6 py-4 border-b border-[var(--hive-border-primary)]", children: [_jsx(Search, { className: "text-[var(--hive-text-muted)] mr-3", size: 20 }), _jsx("input", { ref: inputRef, className: "flex-1 bg-transparent text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none text-lg", placeholder: placeholder, value: query, onChange: (e) => setQuery(e.target.value) }), _jsx("div", { className: "text-[var(--hive-text-muted)] text-sm font-mono", children: hotkey })] }), !query && (_jsx("div", { className: "px-6 py-4 border-b border-white/10", children: _jsxs("div", { className: "flex items-center space-x-2 overflow-x-auto", children: [_jsx(motion.button, { className: cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0", !selectedCategory
                                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                        : "bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-primary)]/60 hover:bg-[var(--hive-text-primary)]/10"), onClick: () => setSelectedCategory(null), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: "All" }), categories.map((category) => (_jsxs(motion.button, { className: cn("flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0", selectedCategory === category.id
                                        ? `bg-${category.color}/20 text-${category.color} border border-${category.color}/30`
                                        : "bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-primary)]/60 hover:bg-[var(--hive-text-primary)]/10"), onClick: () => handleCategorySelect(category.id), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [category.icon, _jsx("span", { children: category.title })] }, category.id)))] }) })), _jsx("div", { className: "max-h-96 overflow-y-auto", children: filteredItems.length > 0 ? (_jsx(motion.div, { className: "p-2", variants: resultListVariants, initial: "hidden", animate: "visible", children: Object.entries(groupedItems).map(([categoryId, categoryItems]) => {
                                const category = categories.find(c => c.id === categoryId);
                                return (_jsxs("div", { className: "mb-4 last:mb-0", children: [category && Object.keys(groupedItems).length > 1 && (_jsxs("div", { className: "flex items-center space-x-2 px-3 py-2 text-xs font-medium text-[var(--hive-text-primary)]/60 uppercase tracking-wider", children: [category.icon, _jsx("span", { children: category.title })] })), categoryItems.map((item, index) => {
                                            const globalIndex = filteredItems.indexOf(item);
                                            const isSelected = globalIndex === selectedIndex;
                                            return (_jsxs(motion.button, { className: "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left", variants: commandItemVariants, initial: "rest", animate: isSelected ? "selected" : "rest", whileHover: !isSelected ? "hover" : "selected", onClick: () => handleSelect(item), onMouseEnter: () => setSelectedIndex(globalIndex), children: [_jsxs(motion.div, { className: "flex items-center space-x-3 flex-1 min-w-0", variants: resultItemVariants, children: [_jsx("div", { className: cn("text-current shrink-0", isSelected ? "text-yellow-400" : "text-[var(--hive-text-primary)]/60"), children: item.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: cn("font-medium truncate", isSelected ? "text-[var(--hive-text-primary)]" : "text-[var(--hive-text-primary)]/80"), children: item.title }), item.description && (_jsx("div", { className: "text-sm text-[var(--hive-text-primary)]/50 truncate", children: item.description }))] })] }), _jsxs("div", { className: "flex items-center space-x-2 shrink-0 ml-4", children: [item.shortcut && (_jsx("div", { className: "text-xs font-mono text-[var(--hive-text-primary)]/40 bg-[var(--hive-text-primary)]/5 px-2 py-1 rounded border border-white/10", children: item.shortcut })), _jsx(ArrowRight, { className: cn("transition-colors", isSelected ? "text-yellow-400" : "text-[var(--hive-text-primary)]/40"), size: 16 })] })] }, item.id));
                                        })] }, categoryId));
                            }) })) : (_jsxs("div", { className: "px-6 py-12 text-center", children: [_jsx(Search, { className: "mx-auto mb-4 text-[var(--hive-text-primary)]/40", size: 48 }), _jsx("div", { className: "text-[var(--hive-text-primary)]/60 font-medium mb-2", children: "No results found" }), _jsx("div", { className: "text-[var(--hive-text-primary)]/40 text-sm", children: "Try searching for tools, spaces, or actions" })] })) }), _jsx("div", { className: "px-6 py-3 bg-[var(--hive-background-primary)]/20 border-t border-white/10", children: _jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-primary)]/50", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("div", { className: "w-4 h-4 bg-[var(--hive-text-primary)]/10 rounded border border-white/20 flex items-center justify-center", children: "\u21B5" }), _jsx("span", { children: "select" })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("div", { className: "w-4 h-4 bg-[var(--hive-text-primary)]/10 rounded border border-white/20 flex items-center justify-center", children: "\u2193\u2191" }), _jsx("span", { children: "navigate" })] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { children: "esc" }), _jsx("span", { children: "close" })] })] }) })] })] })) }));
;
HiveCommandPalette.displayName = "HiveCommandPalette";
// Hook for managing command palette state and hotkey
export function useHiveCommandPalette(hotkey = 'mod+k') {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const handleKeyDown = (e) => {
            const isMod = e.metaKey || e.ctrlKey;
            if (hotkey === 'mod+k' && isMod && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [hotkey]);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(!isOpen);
    return {
        isOpen,
        open,
        close,
        toggle,
    };
}
// Pre-built command categories for builder tools
export const builderCategories = [
    {
        id: 'tools',
        title: 'Tools',
        icon: _jsx(Code, { size: 14 }),
        color: 'blue-400',
    },
    {
        id: 'spaces',
        title: 'Spaces',
        icon: _jsx(Folder, { size: 14 }),
        color: 'green-400',
    },
    {
        id: 'people',
        title: 'People',
        icon: _jsx(User, { size: 14 }),
        color: 'purple-400',
    },
    {
        id: 'actions',
        title: 'Actions',
        icon: _jsx(Zap, { size: 14 }),
        color: 'yellow-400',
    },
    {
        id: 'settings',
        title: 'Settings',
        icon: _jsx(Settings, { size: 14 }),
        color: 'gray-400',
    },
];
export { HiveCommandPalette, hiveCommandPaletteVariants };
//# sourceMappingURL=hive-command-palette.js.map