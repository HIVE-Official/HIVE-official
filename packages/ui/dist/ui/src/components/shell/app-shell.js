"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { NavigationHeader } from './navigation-header';
import { NavigationSidebar } from './navigation-sidebar';
import { cn } from '../../lib/utils';
export function AppShell({ children, user, currentSection = 'profile', layoutType = 'dashboard', className, showGlobalSearch = true, showNotifications = true, showBuilderAccess = true, onOpenCommandPalette, onOpenNotifications, sidebarWidth = 'standard', headerHeight = 'standard' }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    // Dynamic sidebar widths for different contexts
    const sidebarSizes = {
        compact: { expanded: 'ml-48', collapsed: 'ml-12', width: 'w-48' },
        standard: { expanded: 'ml-64', collapsed: 'ml-16', width: 'w-64' },
        wide: { expanded: 'ml-80', collapsed: 'ml-20', width: 'w-80' },
    };
    // Dynamic header heights
    const headerSizes = {
        compact: 'h-12 pt-12',
        standard: 'h-16 pt-16',
        tall: 'h-20 pt-20',
    };
    const currentSidebarSize = sidebarSizes[sidebarWidth];
    const currentHeaderSize = headerSizes[headerHeight];
    return (_jsxs("div", { className: cn("min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]", "transition-all duration-300 ease-out", className), style: {
            background: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-background-secondary) 100%)',
        }, children: [_jsx(NavigationHeader, { user: user, currentSection: currentSection, onToggleSidebar: () => setSidebarCollapsed(!sidebarCollapsed), sidebarCollapsed: sidebarCollapsed, showGlobalSearch: showGlobalSearch, showNotifications: showNotifications, showBuilderAccess: showBuilderAccess, onOpenCommandPalette: onOpenCommandPalette, onOpenNotifications: onOpenNotifications, height: headerHeight }), _jsxs("div", { className: "flex min-h-screen", children: [_jsx(NavigationSidebar, { collapsed: sidebarCollapsed, user: user, currentPath: currentSection }), _jsx("main", { className: cn("flex-1 transition-all duration-300 ease-out", currentHeaderSize.split(' ')[1], // Extract pt-X class
                        sidebarCollapsed ? currentSidebarSize.collapsed : currentSidebarSize.expanded, 
                        // Layout-specific styling
                        layoutType === 'feed' && "max-w-none", layoutType === 'builder' && "bg-[var(--hive-background-secondary)]/50", layoutType === 'ritual' && "bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-tertiary)]", layoutType === 'full' && "ml-0 pt-0", // Override margins for full-screen
                        layoutType === 'modal' && "relative" // For modal overlays
                        ), children: _jsx("div", { className: cn("min-h-full", 
                            // Layout-specific content styling
                            layoutType === 'dashboard' && "p-6 space-y-6", layoutType === 'feed' && "max-w-2xl mx-auto p-4", layoutType === 'builder' && "p-8", layoutType === 'surface' && "p-6", layoutType === 'ritual' && "p-8 text-center", layoutType === 'split' && "p-0", // No padding for split layouts
                            layoutType === 'full' && "p-0" // No padding for full-screen
                            ), children: children }) })] }), _jsx("div", { id: "hive-portal-root", className: "relative z-[100]" })] }));
}
//# sourceMappingURL=app-shell.js.map