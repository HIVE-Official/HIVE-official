"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE Desktop Top Navigation Bar
 * YC-Quality Implementation with Clean Design
 *
 * Horizontal navigation optimized for content consumption
 * with integrated search, notifications, and user menu.
 */
import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Hash, Command, ChevronDown } from 'lucide-react';
import { NAVIGATION_SIZING, NAVIGATION_MOTION, NAVIGATION_A11Y } from '../core/data.js';
import { cn } from '../../lib/utils.js';
// ============================================================================
// TOPBAR NAVIGATION ITEM
// ============================================================================
const TopbarItem = memo(({ item, onNavigate }) => {
    const Icon = item.icon;
    const isActive = item.isActive || false;
    const handleClick = () => {
        if (!item.isDisabled) {
            onNavigate(item.href);
        }
    };
    const handleKeyDown = (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !item.isDisabled) {
            event.preventDefault();
            onNavigate(item.href);
        }
    };
    return (_jsxs(motion.button, { type: "button", onClick: handleClick, onKeyDown: handleKeyDown, disabled: item.isDisabled, className: cn(
        // Base styles
        'relative flex items-center gap-2 px-4 py-2 rounded-lg', 'transition-all duration-200 ease-out', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]', 'min-h-[40px]', // Minimum touch target
        // Active state
        isActive && [
            'bg-[var(--hive-brand-secondary)]/10',
            'text-[var(--hive-brand-secondary)]',
            'font-medium'
        ], 
        // Inactive state
        !isActive && [
            'text-[var(--hive-text-secondary)]',
            'hover:text-[var(--hive-text-primary)]',
            'hover:bg-[var(--hive-interactive-hover)]'
        ], 
        // Disabled state
        item.isDisabled && 'opacity-50 cursor-not-allowed'), "aria-label": `${item.label} - ${item.description}`, "aria-current": isActive ? 'page' : undefined, "data-testid": `topbar-item-${item.id}`, whileHover: !item.isDisabled ? { y: -1 } : {}, whileTap: !item.isDisabled ? { scale: 0.98 } : {}, children: [_jsx(Icon, { className: "w-4 h-4", "aria-hidden": "true" }), _jsx("span", { className: "text-sm font-medium", children: item.label }), item.badge && (_jsx(motion.div, { className: cn('ml-1 px-1.5 py-0.5 text-xs font-medium rounded-full', item.badge.type === 'notification' && 'bg-[var(--hive-error)]/20 text-[var(--hive-error)]', item.badge.type === 'status' && 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]', item.badge.type === 'feature' && 'bg-[var(--hive-info)]/20 text-[var(--hive-info)]'), initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.1, type: 'spring', stiffness: 500, damping: 30 }, children: item.badge.count && item.badge.count > 99 ? '99+' : item.badge.count || item.badge.label })), isActive && (_jsx(motion.div, { className: "absolute bottom-0 left-1/2 w-8 h-0.5 rounded-full bg-[var(--hive-brand-secondary)]", layoutId: "topbar-active-indicator", style: { x: '-50%' }, transition: { type: 'spring', stiffness: 500, damping: 30 } }))] }));
});
TopbarItem.displayName = 'TopbarItem';
// ============================================================================
// USER MENU
// ============================================================================
const UserMenu = memo(({ user, onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const userInitial = user.name.charAt(0).toUpperCase();
    const menuItems = [
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' },
        { label: 'Sign Out', href: '/auth/logout' }
    ];
    return (_jsxs("div", { className: "relative", children: [_jsxs(motion.button, { type: "button", onClick: () => setIsOpen(!isOpen), className: cn('flex items-center gap-2 p-1 rounded-lg', 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]', 'hover:bg-[var(--hive-interactive-hover)]', 'transition-all duration-200', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]'), "aria-label": "User menu", "aria-expanded": isOpen, "data-testid": "user-menu-trigger", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-[var(--hive-brand-secondary)] flex items-center justify-center text-[var(--hive-text-inverse)] text-sm font-medium", children: userInitial }), _jsx(ChevronDown, { className: cn('w-4 h-4 transition-transform duration-200', isOpen && 'rotate-180') }), user.builderStatus === 'active' && (_jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-[var(--hive-brand-secondary)] rounded-full animate-pulse" }))] }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40", onClick: () => setIsOpen(false), "aria-hidden": "true" }), _jsxs(motion.div, { className: cn('absolute top-full right-0 mt-2 w-48 z-50', 'bg-[var(--hive-bg-secondary)] backdrop-blur-xl', 'border border-[var(--hive-border-default)] rounded-xl', 'shadow-lg overflow-hidden'), initial: { opacity: 0, y: -10, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.95 }, transition: { duration: 0.15 }, children: [_jsxs("div", { className: "p-3 border-b border-[var(--hive-border-subtle)]", children: [_jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: user.name }), _jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: ["@", user.handle] })] }), _jsx("div", { className: "py-1", children: menuItems.map((item) => (_jsx("button", { onClick: () => {
                                            onNavigate(item.href);
                                            setIsOpen(false);
                                        }, className: cn('w-full flex items-center px-3 py-2 text-left text-sm', 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]', 'hover:bg-[var(--hive-interactive-hover)]', 'transition-colors duration-150'), children: item.label }, item.href))) })] })] })) })] }));
});
UserMenu.displayName = 'UserMenu';
// ============================================================================
// SEARCH BAR
// ============================================================================
const SearchBar = memo(({ onOpenCommandPalette }) => {
    return (_jsxs("button", { type: "button", onClick: onOpenCommandPalette, className: cn('flex items-center gap-3 px-4 py-2 w-full max-w-md', 'bg-[var(--hive-bg-tertiary)] border border-[var(--hive-border-subtle)]', 'rounded-xl text-left', 'text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-secondary)]', 'hover:border-[var(--hive-border-hover)]', 'transition-all duration-200', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]'), "aria-label": "Open command palette", "data-testid": "search-bar", children: [_jsx(Search, { className: "w-4 h-4", "aria-hidden": "true" }), _jsx("span", { className: "flex-1 text-sm", children: "Search spaces, people, tools..." }), _jsxs("div", { className: "flex items-center gap-1 text-xs", children: [_jsx("kbd", { className: "px-1.5 py-0.5 bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-subtle)] rounded", children: _jsx(Command, { className: "w-3 h-3" }) }), _jsx("kbd", { className: "px-1.5 py-0.5 bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-subtle)] rounded", children: "K" })] })] }));
});
SearchBar.displayName = 'SearchBar';
// ============================================================================
// MAIN DESKTOP TOPBAR
// ============================================================================
export const DesktopTopbar = memo(({ items, user, onNavigate, onOpenCommandPalette, onOpenNotifications, unreadNotificationCount = 0, className, testId = 'desktop-topbar' }) => {
    return (_jsxs(motion.header, { className: cn(
        // Positioning
        'fixed top-0 left-0 right-0 z-50', 
        // Layout
        'flex items-center justify-between px-6', 
        // Styling
        'bg-[var(--hive-background-primary)]/95 backdrop-blur-xl', 'border-b border-[var(--hive-border-default)]', className), style: {
            height: NAVIGATION_SIZING.heights.desktopHeader,
            backdropFilter: 'blur(20px) saturate(180%)'
        }, "aria-label": NAVIGATION_A11Y.labels.desktopNavigation, "data-testid": testId, initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: NAVIGATION_MOTION.duration.normal / 1000 }, children: [_jsxs("div", { className: "flex items-center gap-8", children: [_jsxs(motion.div, { className: "flex items-center gap-2", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center", children: _jsx(Hash, { className: "w-5 h-5 text-[var(--hive-text-inverse)]" }) }), _jsx("div", { className: "text-xl font-bold text-[var(--hive-text-primary)] tracking-tight", children: "HIVE" })] }), _jsx("nav", { className: "hidden md:flex items-center gap-2", children: items.map((item) => (_jsx(TopbarItem, { item: item, onNavigate: onNavigate }, item.id))) })] }), _jsx("div", { className: "flex-1 max-w-md mx-8", children: _jsx(SearchBar, { onOpenCommandPalette: onOpenCommandPalette }) }), _jsxs("div", { className: "flex items-center gap-3", children: [user.builderStatus === 'active' && (_jsx(motion.div, { className: cn('px-2 py-1 text-xs font-medium rounded-full', 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]'), initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2, type: 'spring', stiffness: 500, damping: 30 }, children: "Builder" })), onOpenNotifications && (_jsxs(motion.button, { type: "button", onClick: onOpenNotifications, className: cn('relative p-2 rounded-lg', 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]', 'hover:bg-[var(--hive-interactive-hover)]', 'transition-all duration-200', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]'), "aria-label": "Open notifications", "data-testid": "notifications-button", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: [_jsx(Bell, { className: "w-5 h-5" }), unreadNotificationCount > 0 && (_jsx(motion.div, { className: cn('absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1', 'flex items-center justify-center text-xs font-medium', 'bg-[var(--hive-error)] text-[var(--hive-text-inverse)] rounded-full', 'border-2 border-[var(--hive-background-primary)]'), initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: 'spring', stiffness: 500, damping: 30 }, children: unreadNotificationCount > 99 ? '99+' : unreadNotificationCount }))] })), _jsx(UserMenu, { user: user, onNavigate: onNavigate })] })] }));
});
DesktopTopbar.displayName = 'DesktopTopbar';
//# sourceMappingURL=DesktopTopbar.js.map