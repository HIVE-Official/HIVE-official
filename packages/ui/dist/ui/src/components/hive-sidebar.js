"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';
import { ChevronLeft, ChevronRight, Menu, X, Users, User, Zap, Home, Plus, Settings } from 'lucide-react';
// HIVE Sidebar System - Section-Based Navigation
// Organized into logical sections: Spaces, Profile, HiveLab, Feed
const hiveSidebarVariants = cva(
// Base sidebar styles - matte obsidian glass
"relative h-full bg-[var(--hive-background-primary)]/40 backdrop-blur-xl border-r flex flex-col transition-all duration-300", {
    variants: {
        variant: {
            // Standard sidebar - matte obsidian glass
            default: "border-white/20",
            // Premium sidebar - gold accent
            premium: "border-yellow-500/30",
            // Minimal sidebar - subtle
            minimal: "border-white/10 bg-[var(--hive-background-primary)]/20",
        },
        size: {
            sm: "w-16", // Icon-only collapsed
            default: "w-64", // Standard width
            lg: "w-80", // Wider for more content
            xl: "w-96", // Extra wide
        },
        position: {
            left: "left-0",
            right: "right-0 border-r-0 border-l",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        position: "left",
    },
});
// Sidebar item animation variants
const sidebarItemVariants = {
    rest: {
        x: 0,
        backgroundColor: 'var(--hive-interactive-hover)',
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
        }
    },
    hover: {
        x: 4,
        backgroundColor: 'var(--hive-interactive-active)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    active: {
        x: 6,
        backgroundColor: 'color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    }
};
// Collapse animation variants
const collapseVariants = {
    expanded: {
        width: 'auto',
        opacity: 1,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
        }
    },
    collapsed: {
        width: 0,
        opacity: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
        }
    }
};
const HiveSidebar = React.forwardRef(({ className, variant, size: sizeProp, position, sections, isCollapsed = true, onToggleCollapse, showCollapseButton = true, activeItemId, onItemClick, onSectionToggle, header, footer, isOverlay = false, onOverlayClose, user, ...props }, ref) => {
    const [expandedSections, setExpandedSections] = useState(new Set(sections.filter(s => s.isExpanded !== false).map(s => s.id)));
    // Determine actual size based on collapsed state
    const actualSize = isCollapsed ? 'sm' : sizeProp || 'default';
    const toggleSection = (sectionId) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId);
        }
        else {
            newExpanded.add(sectionId);
        }
        setExpandedSections(newExpanded);
        onSectionToggle?.(sectionId);
    };
    const handleItemClick = (item, sectionId) => {
        if (item.isDisabled)
            return;
        onItemClick?.(item, sectionId);
    };
    const renderQuickAction = (action) => (_jsxs(motion.button, { className: cn("p-2 rounded-lg transition-colors text-xs flex items-center space-x-1", action.variant === 'primary' && "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30", action.variant === 'ghost' && "text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10", (!action.variant || action.variant === 'default') && "bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/20"), onClick: action.onClick, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [action.icon, !isCollapsed && _jsx("span", { className: "text-xs", children: action.label })] }, action.id));
    const renderItem = (item, sectionId) => {
        const isActive = activeItemId === item.id || item.isActive;
        return (_jsx(motion.button, { className: cn("w-full flex items-center px-3 py-2.5 text-left transition-colors group rounded-lg mx-2", isCollapsed && "px-2 justify-center mx-1", item.isDisabled && "opacity-50 cursor-not-allowed", isActive && "bg-yellow-500/20 text-yellow-400", !isActive && !item.isDisabled && "text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10"), variants: sidebarItemVariants, initial: "rest", animate: isActive ? "active" : "rest", whileHover: !item.isDisabled ? "hover" : "rest", onClick: () => handleItemClick(item, sectionId), children: _jsxs("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: [_jsxs("div", { className: "text-current shrink-0 relative", children: [item.avatar ? (_jsx("div", { className: "w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[var(--hive-background-primary)] text-xs font-medium", children: item.avatar })) : (item.icon), item.status && (_jsx("div", { className: cn("absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-black", item.status === 'online' && "bg-green-400", item.status === 'busy' && "bg-red-400", item.status === 'away' && "bg-yellow-400", item.status === 'offline' && "bg-gray-500") }))] }), _jsx(AnimatePresence, { mode: "wait", children: !isCollapsed && (_jsxs(motion.div, { className: "flex items-center justify-between flex-1 min-w-0", variants: collapseVariants, initial: "collapsed", animate: "expanded", exit: "collapsed", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium truncate text-sm", children: item.label }), item.subtitle && (_jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/50 truncate", children: item.subtitle })), item.lastActivity && (_jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/40 truncate", children: item.lastActivity }))] }), _jsx("div", { className: "flex items-center space-x-2 shrink-0", children: item.badge && (_jsx("span", { className: "bg-yellow-500/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full font-medium", children: item.badge })) })] })) })] }) }, item.id));
    };
    const renderSection = (section) => {
        const isExpanded = expandedSections.has(section.id);
        return (_jsxs("div", { className: "mb-6", children: [_jsxs(motion.button, { className: cn("w-full flex items-center justify-between px-4 py-3 text-left transition-colors group", isCollapsed && "px-3 justify-center"), onClick: () => toggleSection(section.id), whileHover: { backgroundColor: 'var(--hive-interactive-hover)' }, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "text-yellow-400 shrink-0", children: section.icon }), _jsx(AnimatePresence, { mode: "wait", children: !isCollapsed && (_jsxs(motion.div, { className: "flex items-center space-x-2", variants: collapseVariants, initial: "collapsed", animate: "expanded", exit: "collapsed", children: [_jsx("span", { className: "font-semibold text-[var(--hive-text-primary)] text-sm", children: section.title }), section.badge && (_jsx("span", { className: "bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full font-medium", children: section.badge }))] })) })] }), !isCollapsed && (_jsx(motion.div, { animate: { rotate: isExpanded ? 90 : 0 }, transition: { duration: motionDurations.quick }, className: "text-[var(--hive-text-primary)]/60", children: _jsx(ChevronRight, { size: 16 }) }))] }), !isCollapsed && section.quickActions && section.quickActions.length > 0 && isExpanded && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, className: "px-4 pb-2", children: _jsx("div", { className: "flex flex-wrap gap-1", children: section.quickActions.map(renderQuickAction) }) })), _jsx(AnimatePresence, { children: isExpanded && (_jsxs(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: {
                            duration: motionDurations.smooth,
                            ease: liquidMetal.easing,
                        }, className: "overflow-hidden", children: [_jsx("div", { className: "space-y-1 pb-2", children: section.items.map(item => renderItem(item, section.id)) }), !isCollapsed && section.previewContent && (_jsx("div", { className: "px-4 pb-2", children: section.previewContent }))] })) })] }, section.id));
    };
    const sidebarContent = (_jsxs(motion.div, { ref: ref, className: cn(hiveSidebarVariants({ variant, size: actualSize, position, className })), initial: { x: position === 'right' ? 100 : -100, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: position === 'right' ? 100 : -100, opacity: 0 }, transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
            type: "spring",
            stiffness: 300,
            damping: 25,
        }, ...props, children: [header && (_jsx("div", { className: cn("px-4 py-6 border-b border-white/10", isCollapsed && "px-3 py-4"), children: _jsx(AnimatePresence, { mode: "wait", children: !isCollapsed ? (_jsx(motion.div, { variants: collapseVariants, initial: "collapsed", animate: "expanded", exit: "collapsed", children: header })) : (_jsx("div", { className: "flex justify-center", children: _jsx(Menu, { size: 20, className: "text-[var(--hive-text-primary)]/60" }) })) }) })), user && !isCollapsed && (_jsx("div", { className: "px-4 py-4 border-b border-white/10", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[var(--hive-background-primary)] text-sm font-medium relative", children: [user.avatar || user.name[0], user.status && (_jsx("div", { className: cn("absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-black", user.status === 'online' && "bg-green-400", user.status === 'busy' && "bg-red-400", user.status === 'away' && "bg-yellow-400", user.status === 'offline' && "bg-gray-500") }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)] text-sm truncate", children: user.name }), _jsxs("div", { className: "text-xs text-[var(--hive-text-primary)]/60 truncate", children: ["@", user.handle] })] })] }) })), _jsx("div", { className: "flex-1 overflow-y-auto py-4", children: _jsx("nav", { children: sections.map(renderSection) }) }), footer && (_jsx("div", { className: cn("px-4 py-6 border-t border-white/10 mt-auto", isCollapsed && "px-3 py-4"), children: _jsx(AnimatePresence, { mode: "wait", children: !isCollapsed ? (_jsx(motion.div, { variants: collapseVariants, initial: "collapsed", animate: "expanded", exit: "collapsed", children: footer })) : (_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-8 h-8 bg-[var(--hive-text-primary)]/10 rounded-full" }) })) }) })), showCollapseButton && onToggleCollapse && (_jsx(motion.button, { className: cn("absolute -right-3 top-6 w-6 h-6 bg-[var(--hive-background-primary)]/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 transition-colors", position === 'right' && "-left-3"), onClick: onToggleCollapse, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: isCollapsed ? _jsx(ChevronRight, { size: 12 }) : _jsx(ChevronLeft, { size: 12 }) })), isOverlay && onOverlayClose && (_jsx(motion.button, { className: "absolute top-4 right-4 w-8 h-8 bg-[var(--hive-background-primary)]/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 transition-colors", onClick: onOverlayClose, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(X, { size: 16 }) }))] }));
    if (isOverlay) {
        return (_jsx(AnimatePresence, { children: _jsxs("div", { className: "fixed inset-0 z-40 flex", children: [_jsx(motion.div, { className: "absolute inset-0 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onOverlayClose }), _jsx("div", { className: cn("relative z-50", position === 'right' && "ml-auto"), children: sidebarContent })] }) }));
    }
    return sidebarContent;
});
HiveSidebar.displayName = "HiveSidebar";
// Pre-built Sidebar Hook for easy state management
export function useHiveSidebar(initialCollapsed = true, initialSections = []) {
    const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
    const [activeItemId, setActiveItemId] = useState();
    const [sections, setSections] = useState(initialSections);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    const setCollapsed = (collapsed) => setIsCollapsed(collapsed);
    const setActiveItem = (itemId) => setActiveItemId(itemId);
    const updateSection = (sectionId, updates) => {
        setSections(prev => prev.map(section => section.id === sectionId ? { ...section, ...updates } : section));
    };
    const updateSectionItems = (sectionId, items) => {
        updateSection(sectionId, { items });
    };
    const addSectionItem = (sectionId, item) => {
        setSections(prev => prev.map(section => section.id === sectionId
            ? { ...section, items: [...section.items, item] }
            : section));
    };
    const removeSectionItem = (sectionId, itemId) => {
        setSections(prev => prev.map(section => section.id === sectionId
            ? { ...section, items: section.items.filter(item => item.id !== itemId) }
            : section));
    };
    return {
        isCollapsed,
        activeItemId,
        sections,
        toggleCollapse,
        setCollapsed,
        setActiveItem,
        setSections,
        updateSection,
        updateSectionItems,
        addSectionItem,
        removeSectionItem,
    };
}
// Helper function to create default HIVE sections
export function createDefaultHiveSections() {
    return [
        {
            id: 'spaces',
            title: 'Spaces',
            icon: _jsx(Users, { size: 18 }),
            items: [],
            quickActions: [
                {
                    id: 'create-space',
                    label: 'Create',
                    icon: _jsx(Plus, { size: 14 }),
                    onClick: () => console.log('Create space'),
                    variant: 'primary'
                },
                {
                    id: 'join-space',
                    label: 'Join',
                    icon: _jsx(Users, { size: 14 }),
                    onClick: () => console.log('Join space'),
                    variant: 'default'
                }
            ],
            isExpanded: true
        },
        {
            id: 'profile',
            title: 'Profile',
            icon: _jsx(User, { size: 18 }),
            items: [],
            quickActions: [
                {
                    id: 'edit-profile',
                    label: 'Edit',
                    icon: _jsx(Settings, { size: 14 }),
                    onClick: () => console.log('Edit profile'),
                    variant: 'ghost'
                }
            ],
            isExpanded: false
        },
        {
            id: 'hivelab',
            title: 'HiveLab',
            icon: _jsx(Zap, { size: 18 }),
            items: [],
            quickActions: [
                {
                    id: 'create-tool',
                    label: 'Create',
                    icon: _jsx(Plus, { size: 14 }),
                    onClick: () => console.log('Create tool'),
                    variant: 'primary'
                }
            ],
            isExpanded: true
        },
        {
            id: 'feed',
            title: 'Feed',
            icon: _jsx(Home, { size: 18 }),
            items: [],
            badge: '5',
            isExpanded: true
        }
    ];
}
export { HiveSidebar, hiveSidebarVariants };
//# sourceMappingURL=hive-sidebar.js.map