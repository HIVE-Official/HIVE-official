'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * 🎯 HIVE Universal Shell Component (Refactored)
 * The Minimal & Intuitive App Shell
 *
 * ARCHITECTURE:
 * - Extracted sub-components for maintainability
 * - Composition pattern for flexibility
 * - Smart defaults reduce configuration
 * - Clean separation of concerns
 *
 * DESIGN SYSTEM COMPLIANCE:
 * ✅ Gold (#FFD700) signature brand color
 * ✅ Framer Motion with HIVE easing curves
 * ✅ Glass morphism effects
 * ✅ Geist Sans typography (font-sans)
 * ✅ Mobile-first with 44px touch targets
 * ✅ Dark luxury aesthetic
 */
import React, { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MotionDiv, MotionButton, AnimatePresence } from './motion-safe';
import { ChevronDown, ChevronRight, Flame, FlaskConical, Home, LogOut, Moon, Settings, Sun, User, Plus, MessageSquare, } from 'lucide-react';
// Import extracted components
import { ShellHeader } from './components/ShellHeader';
import { ShellSidebar } from './components/ShellSidebar';
import { ShellMobileNav } from './components/ShellMobileNav';
import { ShellContextRail } from './components/ShellContextRail';
import { ShellContext, useShell, useShellState } from './hooks/useShellState';
import { NotificationSystem } from '../atomic/molecules/notification-system';
import { CommandPalette } from '../navigation/UniversalNav';
// Default navigation items for sidebar
export const DEFAULT_SIDEBAR_NAV_ITEMS = [
    { id: 'feed', label: 'Feed', icon: Home, path: '/feed' },
    { id: 'spaces', label: 'Spaces', icon: Flame, path: '/spaces' },
    { id: 'hivelab', label: 'HiveLab', icon: FlaskConical, path: '/hivelab' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];
// Default navigation items for mobile bottom tabs
export const DEFAULT_MOBILE_NAV_ITEMS = [
    { id: 'feed', icon: Home, path: '/feed', label: 'Feed' },
    { id: 'spaces', icon: Flame, path: '/spaces', label: 'Spaces' },
    { id: 'add', icon: Plus, path: '/create', label: 'Create' },
    { id: 'messages', icon: MessageSquare, path: '/feed', label: 'Messages' },
    { id: 'profile', icon: User, path: '/profile', label: 'Profile' },
];
// HIVE Refined Easing Curves - Slower, More Luxurious Motion
const HIVE_EASING = {
    // Page loads and major transitions - slow, confident (600ms)
    entrance: [0.16, 1, 0.3, 1],
    // Component reveals - graceful arrival (500ms)
    reveal: [0.23, 1, 0.32, 1],
    // Interactive feedback - responsive but luxurious (300ms)
    interactive: [0.25, 0.46, 0.45, 0.94],
    // Layout changes - deliberate glide (500ms)
    layout: [0.4, 0, 0.2, 1],
    // Legacy support
    liquid: [0.23, 1, 0.32, 1],
    magnetic: [0.25, 0.46, 0.45, 0.94],
    silk: [0.16, 1, 0.3, 1]
};
/**
 * Main Shell Component with HIVE Design System
 * Refactored for minimal complexity and maximum maintainability
 */
export const UniversalShell = ({ children, className = '', variant = 'full', sidebarStyle = 'default', headerStyle = 'default', navItems: navItemsProp, mobileNavItems: mobileNavItemsProp, notificationCount: notificationCountProp, messageCount: messageCountProp, breadcrumbs: breadcrumbsProp, showBreadcrumbs = true, mySpaces: mySpacesProp, notifications, notificationsLoading, notificationsError, onNotificationNavigate, showContextRail = true, }) => {
    const [commandOpen, setCommandOpen] = useState(false);
    const pathname = usePathname();
    // Initialize shell state with custom hook
    const { contextValue, handleNavigate, currentSidebarWidth } = useShellState(notificationCountProp, messageCountProp);
    const sidebarNavItems = useMemo(() => navItemsProp ?? DEFAULT_SIDEBAR_NAV_ITEMS, [navItemsProp]);
    const mobileNavItems = useMemo(() => mobileNavItemsProp ?? DEFAULT_MOBILE_NAV_ITEMS, [mobileNavItemsProp]);
    const mySpaces = useMemo(() => mySpacesProp ?? [], [mySpacesProp]);
    // Auto-generate breadcrumbs from pathname
    const autoBreadcrumbs = useMemo(() => {
        if (!pathname)
            return [];
        const segments = pathname.split('/').filter(Boolean);
        if (segments.length === 0) {
            return [{ label: 'Feed', href: '/feed' }];
        }
        const crumbs = [];
        let currentPath = '';
        segments.forEach((segment) => {
            currentPath += `/${segment}`;
            const label = segment
                .replace(/[-_]/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            crumbs.push({ label, href: currentPath });
        });
        return crumbs;
    }, [pathname]);
    const breadcrumbs = showBreadcrumbs ? (breadcrumbsProp ?? autoBreadcrumbs) : [];
    // Global command palette shortcut (⌘K)
    useEffect(() => {
        const onKey = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setCommandOpen((prev) => !prev);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);
    // Determine current vertical slice from pathname
    const getCurrentSlice = () => {
        if (pathname?.includes('/feed'))
            return 'feed';
        if (pathname?.includes('/spaces'))
            return 'spaces';
        if (pathname?.includes('/profile'))
            return 'profile';
        if (pathname?.includes('/hivelab') || pathname?.includes('/tools'))
            return 'hivelab';
        if (pathname?.includes('/events'))
            return 'events';
        if (pathname?.includes('/messages'))
            return 'messages';
        if (pathname?.includes('/rituals'))
            return 'rituals';
        return 'feed';
    };
    // For minimal variant, only show header and content
    if (variant === 'minimal') {
        return (_jsx(ShellContext.Provider, { value: contextValue, children: _jsxs("div", { className: `hive-shell-minimal min-h-screen bg-hive-background-primary font-sans ${className}`, children: [_jsx("a", { href: "#main-content", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 rounded-lg bg-[#050506] px-4 py-2 font-sans text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] focus:outline-none focus:ring-2 focus:ring-white/70", children: "Skip to main content" }), _jsx(ShellHeader, { onMenuToggle: contextValue.toggleSidebar, onSearch: () => setCommandOpen(true), notifications: {
                            items: notifications ?? [],
                            loading: notificationsLoading,
                            error: notificationsError ?? null,
                            onNavigate: onNotificationNavigate ?? handleNavigate,
                        }, showMobileMenu: false }), _jsxs("main", { id: "main-content", className: "pt-16 min-h-[calc(100vh-64px)]", children: [breadcrumbs.length > 0 && (_jsx(BreadcrumbRail, { items: breadcrumbs, className: "px-4 pb-4 md:px-6" })), _jsx(MotionDiv, { className: "hive-content-wrapper", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: HIVE_EASING.entrance }, children: contextValue.shellReady ? children : _jsx(ShellLoader, {}) })] }), _jsx(CommandPalette, { open: commandOpen, onOpenChange: setCommandOpen }), _jsx("div", { id: "modal-root" }), _jsx("div", { id: "toast-root" })] }) }));
    }
    // Full variant with all navigation elements
    return (_jsx(ShellContext.Provider, { value: contextValue, children: _jsxs("div", { className: `hive-shell min-h-screen bg-hive-background-primary font-sans ${className}`, children: [_jsx("a", { href: "#primary-navigation", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 rounded-lg bg-[#050506] px-4 py-2 font-sans text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] focus:outline-none focus:ring-2 focus:ring-white/70", children: "Skip to primary navigation" }), _jsx("a", { href: "#main-content", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 rounded-lg bg-[#050506] px-4 py-2 font-sans text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] focus:outline-none focus:ring-2 focus:ring-white/70", children: "Skip to main content" }), headerStyle !== 'hidden' && (_jsx(ShellHeader, { onMenuToggle: contextValue.toggleSidebar, onSearch: () => setCommandOpen(true), notifications: {
                        items: notifications ?? [],
                        loading: notificationsLoading,
                        error: notificationsError ?? null,
                        onNavigate: onNotificationNavigate ?? handleNavigate,
                    } })), _jsxs("div", { className: `flex ${headerStyle === 'hidden' ? 'h-screen' : 'h-[calc(100vh-64px)] pt-16'}`, children: [_jsx(ShellSidebar, { navItems: sidebarNavItems, mySpaces: mySpaces, onNavigate: handleNavigate, collapsed: contextValue.isSidebarCollapsed, onCollapseChange: contextValue.setSidebarCollapsed, isOpen: contextValue.isSidebarOpen, onToggle: contextValue.toggleSidebar, isMobile: contextValue.isMobile, headerStyle: headerStyle, variant: variant, sidebarStyle: sidebarStyle, renderUserMenu: (props) => _jsx(UserMenu, { ...props, onNavigate: handleNavigate }) }), _jsxs("main", { id: "main-content", className: `
              flex-1 overflow-y-auto
              transition-all duration-500 ease-out
            `, style: !contextValue.isMobile ? { marginLeft: currentSidebarWidth } : undefined, children: [breadcrumbs.length > 0 && (_jsx(BreadcrumbRail, { items: breadcrumbs, className: "px-4 pt-6 pb-4 md:px-8" })), _jsx(MotionDiv, { className: "hive-content-wrapper", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, ease: HIVE_EASING.entrance }, children: contextValue.shellReady ? children : _jsx(ShellLoader, {}) })] }), !contextValue.isMobile && showContextRail && ['feed', 'spaces'].includes(getCurrentSlice()) && (_jsx(ShellContextRail, {}))] }), contextValue.isMobile && (_jsx(ShellMobileNav, { navItems: mobileNavItems, onNavigate: handleNavigate })), _jsx(CommandPalette, { open: commandOpen, onOpenChange: setCommandOpen }), headerStyle !== 'default' && (_jsx("div", { className: "fixed top-3 right-3 z-50", children: _jsx(NotificationSystem, { notifications: (notifications ?? []), loading: notificationsLoading, error: notificationsError ?? undefined, onNavigate: (url) => {
                            if (onNotificationNavigate) {
                                onNotificationNavigate(url);
                                return;
                            }
                            handleNavigate(url);
                        } }) })), _jsx("div", { id: "modal-root" }), _jsx("div", { id: "toast-root" })] }) }));
};
/**
 * BreadcrumbRail - Simple breadcrumb navigation
 */
const BreadcrumbRail = ({ items, className }) => {
    if (!items || items.length === 0) {
        return null;
    }
    return (_jsxs(MotionDiv, { role: "navigation", "aria-label": "Breadcrumbs", className: `flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/45 ${className ?? ''}`, initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: HIVE_EASING.reveal }, children: [_jsx("span", { className: "text-white/55", children: "UB" }), items.map((item, index) => (_jsxs(React.Fragment, { children: [_jsx(ChevronRight, { className: "h-3 w-3 text-white/30" }), item.href && index !== items.length - 1 ? (_jsx(Link, { href: item.href, className: "text-white/55 transition-colors hover:text-white", children: item.label })) : (_jsx("span", { className: "text-white/55", children: item.label }))] }, `${item.label}-${index}`)))] }));
};
/**
 * UserMenu - User dropdown menu with profile, settings, and sign out
 */
const UserMenu = ({ variant = 'sidebar', onNavigate, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useShell();
    const containerClasses = variant === 'sidebar'
        ? 'flex w-full items-center gap-4 rounded-2xl border border-white/12 bg-[#08080A] px-4 py-3 text-left text-white transition-colors duration-150 hover:border-white/25 hover:bg-[#101013]'
        : variant === 'compact'
            ? 'flex w-full items-center justify-between rounded-2xl border border-white/12 bg-[#0A0A0B] px-3 py-2 text-left text-white hover:border-white/20 hover:bg-white/[0.04] transition'
            : variant === 'collapsed'
                ? 'flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-[#08080A] text-white transition hover:border-white/25 hover:bg-[#101013]'
                : 'flex items-center gap-2 p-1 rounded-lg hover:bg-hive-background-tertiary transition-all';
    const dropdownPositionClasses = variant === 'sidebar' || variant === 'compact'
        ? 'left-0 right-0 bottom-full mb-3'
        : 'right-0 top-full mt-2';
    const dropdownWidthClass = variant === 'sidebar' || variant === 'compact' ? 'w-full' : 'w-56';
    const handleNavigate = (path) => {
        if (path) {
            onNavigate?.(path);
        }
        setIsOpen(false);
    };
    return (_jsxs("div", { className: "relative", children: [_jsx(MotionButton, { className: containerClasses, onClick: () => setIsOpen((prev) => !prev), onContextMenu: (event) => {
                    event.preventDefault();
                    setIsOpen(true);
                }, whileHover: { scale: variant === 'sidebar' ? 1.01 : 1.02 }, whileTap: { scale: 0.98 }, transition: { duration: 0.12, ease: HIVE_EASING.magnetic }, children: variant === 'collapsed' ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-6 w-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5" }), _jsx("span", { className: "sr-only", children: "Account menu" })] })) : variant === 'compact' ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-8 w-8 rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5" }), _jsx("div", { className: "flex flex-col", children: _jsx("span", { className: "text-sm font-medium text-white", children: "@amina_builds" }) })] }), _jsx(ChevronDown, { className: `h-4 w-4 text-white/45 transition-transform ${isOpen ? 'rotate-180' : ''}` })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-12 w-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-semibold text-white", children: "Amina Khan" }), _jsx("span", { className: "text-xs text-white/45", children: "Student Lead \u00B7 UB" })] })] }), _jsx(ChevronDown, { className: `h-4 w-4 text-white/45 transition-transform ${isOpen ? 'rotate-180' : ''}` })] })) }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(MotionDiv, { className: `absolute ${dropdownPositionClasses} ${dropdownWidthClass} rounded-lg border border-hive-border-default bg-hive-background-secondary/95 backdrop-blur-xl shadow-hive-level3 overflow-hidden`, initial: { opacity: 0, y: -10, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.95 }, transition: { duration: 0.3, ease: HIVE_EASING.interactive }, children: [_jsxs("div", { className: "px-4 py-3 border-b border-hive-border-default", children: [_jsx("p", { className: "text-sm font-semibold text-white", children: "Amina Khan" }), _jsx("p", { className: "text-xs text-white/50", children: "@amina_builds" })] }), _jsxs("div", { className: "p-2 space-y-1", children: [[
                                    { icon: User, label: 'Profile', path: '/profile' },
                                    { icon: Settings, label: 'Settings', path: '/settings' },
                                    { icon: isDarkMode ? Sun : Moon, label: isDarkMode ? 'Light Mode' : 'Dark Mode', action: () => toggleDarkMode() },
                                ].map((item, index) => {
                                    const Icon = item.icon;
                                    return (_jsxs(MotionButton, { className: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-white/70 transition-colors hover:bg-white/5 hover:text-white", onClick: () => {
                                            if (item.path) {
                                                handleNavigate(item.path);
                                            }
                                            else {
                                                item.action?.();
                                                setIsOpen(false);
                                            }
                                        }, initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.05, duration: 0.4, ease: HIVE_EASING.reveal }, whileHover: { x: 4 }, children: [_jsx(Icon, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm font-medium", children: item.label })] }, item.label));
                                }), _jsx("div", { className: "mt-1 border-t border-hive-border-default pt-2", children: _jsxs(MotionButton, { className: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-hive-status-error transition-colors hover:bg-hive-status-error/10", whileHover: { x: 4 }, onClick: () => {
                                            setIsOpen(false);
                                            if (typeof window !== 'undefined') {
                                                localStorage.removeItem('hive_session');
                                                localStorage.removeItem('dev_auth_mode');
                                                localStorage.removeItem('dev_user');
                                                document.cookie = 'hive_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                                                document.cookie = 'dev-mode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                                                window.location.href = '/auth/login?schoolId=test-university&schoolName=Test%20University&domain=test.edu';
                                            }
                                        }, children: [_jsx(LogOut, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm font-semibold", children: "Sign Out" })] }) })] })] })) })] }));
};
/**
 * ShellLoader - Loading indicator with HIVE brand animation
 */
const ShellLoader = () => {
    return (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsxs(MotionDiv, { className: "text-center", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, ease: HIVE_EASING.reveal }, children: [_jsx(MotionDiv, { className: "w-16 h-16 mx-auto mb-4 border-4 border-hive-brand-primary border-t-transparent rounded-full", animate: { rotate: 360 }, transition: { duration: 1.2, repeat: Infinity, ease: "linear" } }), _jsx("p", { className: "text-hive-text-secondary font-sans animate-pulse", children: "Loading HIVE..." })] }) }));
};
export default UniversalShell;
//# sourceMappingURL=UniversalShell.js.map