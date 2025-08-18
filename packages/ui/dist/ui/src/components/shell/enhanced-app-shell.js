"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { NavigationContainer } from '../../navigation';
import { EnhancedHiveCommandPalette, comprehensiveSearchCategories, defaultSearchItems } from '../enhanced-hive-command-palette';
import { NotificationCenter } from './notification-center';
import { NotificationProvider, useNotifications } from './notification-service';
import { PageTransition } from '../page-transition';
import { cn } from '../../lib/utils';
function AppShellContent({ children, user, className }) {
    const { notifications, unreadCount } = useNotifications();
    const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
    const [notificationCenterOpen, setNotificationCenterOpen] = React.useState(false);
    // Convert user to NavigationUser format
    const navigationUser = user ? {
        id: user.id,
        name: user.name,
        handle: user.handle,
        avatar: user.avatar,
        builderStatus: user.builderStatus || 'none',
        role: user.role || 'student',
        preferences: {
            layout: 'auto',
            sidebarCollapsed: false,
            enableKeyboardShortcuts: true,
            enableAnimations: true,
            theme: 'system'
        }
    } : {
        id: 'guest',
        name: 'Guest User',
        handle: 'guest',
        builderStatus: 'none',
        role: 'student',
        preferences: {
            layout: 'auto',
            sidebarCollapsed: false,
            enableKeyboardShortcuts: true,
            enableAnimations: true,
            theme: 'system'
        }
    };
    // Setup keyboard shortcuts
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            // Command palette shortcut
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                setCommandPaletteOpen(true);
                return;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);
    return (_jsxs("div", { className: cn("min-h-screen", className), style: {
            backgroundColor: 'var(--hive-background-primary)',
            color: 'var(--hive-text-primary)',
        }, children: [_jsx(NavigationContainer, { user: navigationUser, onOpenCommandPalette: () => setCommandPaletteOpen(true), onOpenNotifications: () => setNotificationCenterOpen(true), unreadNotificationCount: unreadCount, children: _jsx(PageTransition, { className: "min-h-full p-4 sm:p-5 hive-spacing-responsive", children: children }) }), _jsx(EnhancedHiveCommandPalette, { isOpen: commandPaletteOpen, onClose: () => setCommandPaletteOpen(false), staticItems: defaultSearchItems, categories: comprehensiveSearchCategories, onSearch: async (query, category) => {
                    // This would be replaced with actual search API calls
                    // For now, return filtered default items
                    return defaultSearchItems.filter(item => (!category || item.category === category) &&
                        (item.title.toLowerCase().includes(query.toLowerCase()) ||
                            item.description?.toLowerCase().includes(query.toLowerCase()) ||
                            item.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))));
                }, recentItems: [], maxResults: 8, enableLiveSearch: true }), _jsx(NotificationCenter, { isOpen: notificationCenterOpen, onClose: () => setNotificationCenterOpen(false), notifications: notifications })] }));
}
export function EnhancedAppShell({ children, user, className }) {
    return (_jsx(NotificationProvider, { children: _jsx(AppShellContent, { user: user, className: className, children: children }) }));
}
//# sourceMappingURL=enhanced-app-shell.js.map