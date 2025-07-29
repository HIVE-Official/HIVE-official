"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { usePathname } from 'next/navigation';
import { ShellProvider, useShell } from './shell-provider';
import { NavigationSidebar } from './navigation-sidebar';
import { EnhancedHiveCommandPalette, comprehensiveSearchCategories, defaultSearchItems } from '../enhanced-hive-command-palette';
import { NotificationCenter } from './notification-center';
import { NotificationProvider, useNotifications } from './notification-service';
import { EnhancedNavigationBar } from '../navigation/enhanced-navigation-bar';
import { PageTransition } from '../page-transition';
import { cn } from '../../lib/utils';
import { useKeyboardNavigation } from '../../hooks/use-navigation-context';
function AppShellContent({ children, user, className }) {
    const { sidebarCollapsed, setSidebarCollapsed, commandPaletteOpen, setCommandPaletteOpen, notificationCenterOpen, setNotificationCenterOpen, navigationMode, setNavigationMode, } = useShell();
    const { notifications, unreadCount } = useNotifications();
    const pathname = usePathname();
    const { handleKeyboardShortcut } = useKeyboardNavigation();
    // Setup keyboard shortcuts
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            // Command palette shortcut
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                setCommandPaletteOpen(true);
                return;
            }
            // Handle other navigation shortcuts
            handleKeyboardShortcut(event);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyboardShortcut, setCommandPaletteOpen]);
    if (navigationMode === 'topbar') {
        return (_jsxs("div", { className: cn("min-h-screen", className), style: {
                backgroundColor: 'var(--hive-bg-primary)',
                color: 'var(--hive-text-primary)',
            }, children: [_jsx(EnhancedNavigationBar, { user: user, onToggleSidebar: () => { }, sidebarCollapsed: false, onOpenNotifications: () => setNotificationCenterOpen(true), onOpenCommandPalette: () => setCommandPaletteOpen(true), unreadNotificationCount: unreadCount, showGlobalSearch: true, showNotifications: true, onToggleNavigationMode: () => setNavigationMode('sidebar') }), _jsx("main", { className: "pt-12 sm:pt-14 min-h-screen", children: _jsx(PageTransition, { className: "min-h-full p-4 sm:p-5 hive-spacing-responsive", children: children }) }), _jsx(EnhancedHiveCommandPalette, { isOpen: commandPaletteOpen, onClose: () => setCommandPaletteOpen(false), categories: comprehensiveSearchCategories, staticItems: defaultSearchItems }), _jsx(NotificationCenter, { isOpen: notificationCenterOpen, onClose: () => setNotificationCenterOpen(false), notifications: notifications })] }));
    }
    // Default: Sidebar Mode
    return (_jsxs("div", { className: cn("min-h-screen flex", className), style: {
            backgroundColor: 'var(--hive-bg-primary)',
            color: 'var(--hive-text-primary)',
        }, children: [_jsx(NavigationSidebar, { collapsed: sidebarCollapsed, user: user, currentPath: pathname, onToggle: () => setSidebarCollapsed(!sidebarCollapsed), onToggleNavigationMode: () => setNavigationMode('topbar') }), _jsx("main", { className: cn("flex-1 transition-all duration-300 ease-out", "min-h-screen"), children: _jsx(PageTransition, { className: "min-h-full p-4 sm:p-5 hive-spacing-responsive", children: children }) }), _jsx(EnhancedHiveCommandPalette, { isOpen: commandPaletteOpen, onClose: () => setCommandPaletteOpen(false), staticItems: defaultSearchItems, categories: comprehensiveSearchCategories, onSearch: async (query, category) => {
                    // This would be replaced with actual search API calls
                    // For now, return filtered default items
                    return defaultSearchItems.filter(item => (!category || item.category === category) &&
                        (item.title.toLowerCase().includes(query.toLowerCase()) ||
                            item.description?.toLowerCase().includes(query.toLowerCase()) ||
                            item.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))));
                }, recentItems: [], maxResults: 8, enableLiveSearch: true }), _jsx(NotificationCenter, { isOpen: notificationCenterOpen, onClose: () => setNotificationCenterOpen(false), notifications: notifications }), !sidebarCollapsed && navigationMode === 'sidebar' && (_jsx("div", { className: "fixed inset-0 z-30 bg-[var(--hive-background-primary)]/50 md:hidden", onClick: () => setSidebarCollapsed(true) }))] }));
}
export function EnhancedAppShell({ children, user, className, initialSidebarCollapsed = true, notifications = [] }) {
    return (_jsx(NotificationProvider, { children: _jsx(ShellProvider, { initialSidebarCollapsed: initialSidebarCollapsed, initialUnreadCount: 0, children: _jsx(AppShellContent, { user: user, className: className, children: children }) }) }));
}
//# sourceMappingURL=enhanced-app-shell.js.map