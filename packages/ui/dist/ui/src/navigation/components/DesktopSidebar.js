"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Desktop Sidebar Navigation
 * YC-Quality Implementation with Power User Features
 *
 * Features collapsible sidebar, status indicators, keyboard shortcuts,
 * and smooth animations optimized for desktop productivity.
 */
import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { NAVIGATION_SIZING, NAVIGATION_MOTION, NAVIGATION_A11Y } from '../core/data.js';
import { cn } from '../../lib/utils.js';
// ============================================================================
// SIDEBAR HEADER
// ============================================================================
const SidebarHeader = memo(({ collapsed, onToggleCollapse }) => {
    return (_jsxs("div", { className: cn('flex items-center justify-between p-4 border-b', 'border-[var(--hive-border-subtle)]'), children: [_jsx(AnimatePresence, { mode: "wait", children: !collapsed && (_jsxs(motion.div, { className: "flex items-center gap-3", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: NAVIGATION_MOTION.duration.fast / 1000 }, children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center", children: _jsx(Hash, { className: "w-5 h-5 text-[var(--hive-text-inverse)]" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-bold text-[var(--hive-brand-secondary)] tracking-wider", children: "HIVE" }), _jsx("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: "Campus OS" })] })] })) }), _jsx(motion.button, { type: "button", onClick: onToggleCollapse, className: cn('w-8 h-8 flex items-center justify-center rounded-lg', 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]', 'hover:bg-[var(--hive-interactive-hover)]', 'transition-all duration-200', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]', collapsed && 'mx-auto'), "aria-label": collapsed ? 'Expand sidebar' : 'Collapse sidebar', "data-testid": "sidebar-toggle", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: collapsed ? (_jsx(ChevronRight, { className: "w-4 h-4" })) : (_jsx(ChevronLeft, { className: "w-4 h-4" })) })] }));
});
SidebarHeader.displayName = 'SidebarHeader';
// ============================================================================
// SIDEBAR NAVIGATION ITEM
// ============================================================================
const SidebarItem = memo(({ item, collapsed, onNavigate }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const Icon = item.icon;
    const isActive = item.isActive || false;
    const handleClick = useCallback(() => {
        if (!item.isDisabled) {
            onNavigate(item.href);
        }
    }, [item.href, item.isDisabled, onNavigate]);
    const handleKeyDown = useCallback((event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !item.isDisabled) {
            event.preventDefault();
            onNavigate(item.href);
        }
    }, [item.href, item.isDisabled, onNavigate]);
    return (_jsxs("div", { className: "relative", children: [_jsxs(motion.button, { type: "button", onClick: handleClick, onKeyDown: handleKeyDown, onMouseEnter: () => collapsed && setShowTooltip(true), onMouseLeave: () => setShowTooltip(false), onFocus: () => collapsed && setShowTooltip(true), onBlur: () => setShowTooltip(false), disabled: item.isDisabled, className: cn(
                // Base styles
                'w-full flex items-center gap-3 px-3 py-3 rounded-lg', 'transition-all duration-200 ease-out group relative overflow-hidden', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]', 
                // Layout
                collapsed ? 'justify-center' : 'justify-start', 
                // Active state
                isActive && [
                    'bg-[var(--hive-brand-secondary)]/10',
                    'text-[var(--hive-brand-secondary)]',
                    'border border-[var(--hive-brand-secondary)]/20',
                    'shadow-sm'
                ], 
                // Inactive state
                !isActive && [
                    'text-[var(--hive-text-secondary)]',
                    'hover:text-[var(--hive-text-primary)]',
                    'hover:bg-[var(--hive-interactive-hover)]',
                    'hover:border-[var(--hive-border-hover)]'
                ], 
                // Disabled state
                item.isDisabled && 'opacity-50 cursor-not-allowed'), style: {
                    height: NAVIGATION_SIZING.heights.sidebarItem,
                    minHeight: NAVIGATION_SIZING.heights.sidebarItem
                }, "aria-label": `${item.label} - ${item.description}`, "aria-current": isActive ? 'page' : undefined, "data-testid": `sidebar-item-${item.id}`, whileHover: !item.isDisabled ? { x: 2 } : {}, whileTap: !item.isDisabled ? { scale: 0.98 } : {}, children: [_jsxs("div", { className: cn('relative flex items-center justify-center rounded-lg transition-all duration-200', collapsed ? 'w-7 h-7' : 'w-8 h-8', isActive
                            ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]'
                            : 'bg-[var(--hive-bg-tertiary)] text-current'), children: [_jsx(Icon, { className: "w-4 h-4", "aria-hidden": "true" }), collapsed && item.badge && (_jsx(motion.div, { className: cn('absolute -top-1 -right-1 w-3 h-3 rounded-full', 'bg-[var(--hive-error)] border-2 border-[var(--hive-background-primary)]'), initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.1, type: 'spring', stiffness: 500, damping: 30 } }))] }), _jsx(AnimatePresence, { children: !collapsed && (_jsxs(motion.div, { className: "flex items-center justify-between flex-1 min-w-0", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 }, transition: { duration: NAVIGATION_MOTION.duration.fast / 1000 }, children: [_jsx("span", { className: "text-sm font-medium truncate", children: item.label }), item.badge && (_jsx(motion.div, { className: cn('ml-2 px-2 py-0.5 text-xs font-medium rounded-full shrink-0', item.badge.type === 'notification' && 'bg-[var(--hive-error)]/20 text-[var(--hive-error)]', item.badge.type === 'status' && 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]', item.badge.type === 'feature' && 'bg-[var(--hive-info)]/20 text-[var(--hive-info)]'), initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.1, type: 'spring', stiffness: 500, damping: 30 }, children: item.badge.count && item.badge.count > 99 ? '99+' : item.badge.count || item.badge.label }))] })) }), isActive && (_jsx(motion.div, { className: "absolute right-2 w-1 h-6 rounded-full bg-[var(--hive-brand-secondary)]", layoutId: "sidebar-active-indicator", transition: { type: 'spring', stiffness: 500, damping: 30 } }))] }), _jsx(AnimatePresence, { children: collapsed && showTooltip && (_jsxs(motion.div, { className: cn('absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none', 'px-3 py-2 rounded-lg shadow-lg border backdrop-blur-md max-w-xs', 'bg-[var(--hive-bg-secondary)] border-[var(--hive-border-default)]', 'text-[var(--hive-text-primary)]'), initial: { opacity: 0, x: -10, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -10, scale: 0.95 }, transition: { duration: 0.15 }, children: [_jsx("div", { className: "font-medium text-sm mb-1", children: item.label }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: item.description }), _jsx("div", { className: "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1", style: {
                                width: 0,
                                height: 0,
                                borderTop: '6px solid transparent',
                                borderBottom: '6px solid transparent',
                                borderRight: `6px solid var(--hive-bg-secondary)`
                            } })] })) })] }));
});
SidebarItem.displayName = 'SidebarItem';
// ============================================================================
// USER PROFILE SECTION
// ============================================================================
const UserProfileSection = memo(({ user, collapsed }) => {
    if (collapsed) {
        return (_jsx("div", { className: "px-3 py-3 border-b border-[var(--hive-border-subtle)]", children: _jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]", title: user.name, children: user.name.charAt(0).toUpperCase() }) }));
    }
    return (_jsx(motion.div, { className: "px-3 py-3 border-b border-[var(--hive-border-subtle)]", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.1 }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]", children: user.name.charAt(0).toUpperCase() }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)] truncate", children: user.name }), _jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)] truncate", children: ["@", user.handle] })] }), user.builderStatus === 'active' && (_jsx("div", { className: "w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)] animate-pulse" }))] }) }));
});
UserProfileSection.displayName = 'UserProfileSection';
// ============================================================================
// MAIN DESKTOP SIDEBAR
// ============================================================================
export const DesktopSidebar = memo(({ items, user, collapsed, onNavigate, onToggleCollapse, className, testId = 'desktop-sidebar' }) => {
    return (_jsxs(motion.aside, { className: cn(
        // Positioning and layout
        'fixed left-0 top-0 h-screen flex-shrink-0 flex flex-col', 'transition-all duration-300 ease-out', 
        // Styling
        'bg-[var(--hive-bg-secondary)] backdrop-blur-xl', 'border-r border-[var(--hive-border-default)]', 
        // Z-index
        'z-40', className), style: {
            width: collapsed ? NAVIGATION_SIZING.widths.sidebarCollapsed : NAVIGATION_SIZING.widths.sidebarExpanded,
            boxShadow: 'inset -1px 0 0 var(--hive-brand-secondary)/10'
        }, "aria-label": NAVIGATION_A11Y.labels.sidebarNavigation, "data-testid": testId, initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: NAVIGATION_MOTION.duration.normal / 1000 }, children: [_jsx(SidebarHeader, { collapsed: collapsed, onToggleCollapse: onToggleCollapse }), _jsx(UserProfileSection, { user: user, collapsed: collapsed }), _jsx("nav", { className: "flex-1 px-2 py-4 overflow-y-auto", children: _jsx("div", { className: "space-y-1", children: items.map((item) => (_jsx(SidebarItem, { item: item, collapsed: collapsed, onNavigate: onNavigate }, item.id))) }) }), _jsx(motion.div, { className: "p-3 border-t border-[var(--hive-border-subtle)]", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, children: !collapsed && (_jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)] text-center", children: [NAVIGATION_A11Y.keyboardShortcuts.toggleSidebar, " to toggle"] })) })] }));
});
DesktopSidebar.displayName = 'DesktopSidebar';
export const SidebarOverlay = memo(({ isOpen, onClose }) => {
    return (_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { className: "fixed inset-0 bg-black/50 z-30 md:hidden", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, onClick: onClose, "aria-hidden": "true" })) }));
});
SidebarOverlay.displayName = 'SidebarOverlay';
//# sourceMappingURL=DesktopSidebar.js.map