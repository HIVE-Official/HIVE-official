"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Navigation Container - Master Navigation Orchestrator
 * YC-Quality Implementation with Perfect Responsive Behavior
 *
 * This is the main navigation component that orchestrates between all
 * navigation modes based on screen size and user preferences.
 */
import { memo, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigationState } from '../hooks/useNavigationState';
import { MobileNavigation } from './MobileNavigation';
import { DesktopSidebar, SidebarOverlay } from './DesktopSidebar';
import { DesktopTopbar } from './DesktopTopbar';
import { TabletDrawer, TabletDrawerTrigger } from './TabletDrawer';
import { cn } from '../../lib/utils';
// ============================================================================
// NAVIGATION LAYOUT WRAPPER
// ============================================================================
const NavigationLayout = memo(({ children, navigationState }) => {
    const { mode } = navigationState;
    return (_jsx("div", { className: "relative min-h-screen", children: _jsx("main", { className: cn('min-h-screen transition-all duration-300 ease-out', 
            // Mobile layout - full width with bottom spacing
            mode === 'mobile-tabs' && [
                'w-full pb-16' // Space for bottom tabs
            ], 
            // Desktop sidebar layout - left margin for sidebar
            mode === 'desktop-sidebar' && [
                'ml-64' // Fixed margin for sidebar
            ], 
            // Desktop topbar layout - top padding for header
            mode === 'desktop-tabs' && [
                'pt-16 w-full' // Space for top header
            ], 
            // Tablet drawer layout - full width (drawer overlays)
            mode === 'tablet-drawer' && [
                'w-full'
            ]), style: {
            // Additional styles can be added here if needed
            }, children: children }) }));
});
NavigationLayout.displayName = 'NavigationLayout';
// ============================================================================
// MAIN NAVIGATION CONTAINER
// ============================================================================
export const NavigationContainer = memo(({ user, onOpenCommandPalette, onOpenNotifications, unreadNotificationCount = 0, children, className, testId = 'navigation-container' }) => {
    // ============================================================================
    // STATE MANAGEMENT
    // ============================================================================
    const navigationState = useNavigationState({
        user,
        enableAnalytics: true,
        enableDebug: process.env.NODE_ENV === 'development'
    });
    const { state, items, actions } = navigationState;
    // Local state for tablet drawer
    const [tabletDrawerOpen, setTabletDrawerOpen] = useState(false);
    // ============================================================================
    // EVENT HANDLERS
    // ============================================================================
    const handleNavigate = useCallback((href) => {
        actions.navigate(href);
        // Close tablet drawer on navigation
        if (tabletDrawerOpen) {
            setTabletDrawerOpen(false);
        }
    }, [actions, tabletDrawerOpen]);
    const handleToggleSidebar = useCallback(() => {
        actions.toggleSidebar();
    }, [actions]);
    const handleOpenTabletDrawer = useCallback(() => {
        setTabletDrawerOpen(true);
    }, []);
    const handleCloseTabletDrawer = useCallback(() => {
        setTabletDrawerOpen(false);
    }, []);
    // ============================================================================
    // RENDER NAVIGATION COMPONENTS
    // ============================================================================
    const renderNavigation = () => {
        switch (state.mode) {
            case 'mobile-tabs':
                return (_jsx(MobileNavigation, { items: items, onNavigate: handleNavigate, testId: "mobile-navigation" }));
            case 'desktop-sidebar':
                return (_jsxs(_Fragment, { children: [_jsx(DesktopSidebar, { items: items, user: user, collapsed: state.sidebarCollapsed, onNavigate: handleNavigate, onToggleCollapse: handleToggleSidebar, testId: "desktop-sidebar" }), _jsx(SidebarOverlay, { isOpen: false, onClose: () => actions.setMobileNavOpen(false) })] }));
            case 'desktop-tabs':
                return (_jsx(DesktopTopbar, { items: items, user: user, onNavigate: handleNavigate, onOpenCommandPalette: onOpenCommandPalette, onOpenNotifications: onOpenNotifications, unreadNotificationCount: unreadNotificationCount, testId: "desktop-topbar" }));
            case 'tablet-drawer':
                return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed top-4 left-4 z-40", children: _jsx(TabletDrawerTrigger, { onOpen: handleOpenTabletDrawer }) }), _jsx(TabletDrawer, { items: items, user: user, isOpen: tabletDrawerOpen, onNavigate: handleNavigate, onClose: handleCloseTabletDrawer, testId: "tablet-drawer" })] }));
            default:
                // Fallback to mobile navigation
                return (_jsx(MobileNavigation, { items: items, onNavigate: handleNavigate, testId: "fallback-navigation" }));
        }
    };
    // ============================================================================
    // RENDER
    // ============================================================================
    return (_jsx(NavigationLayout, { navigationState: state, children: _jsxs("div", { className: cn('relative', className), "data-testid": testId, "data-navigation-mode": state.mode, "data-screen-size": state.screenSize, children: [_jsx(AnimatePresence, { mode: "wait", children: renderNavigation() }), children] }) }));
});
NavigationContainer.displayName = 'NavigationContainer';
/**
 * Higher-order component for wrapping pages with navigation
 */
export const withNavigation = (Component) => {
    const WithNavigationComponent = memo((props) => {
        const { user, onOpenCommandPalette, onOpenNotifications, unreadNotificationCount, children, ...componentProps } = props;
        const navigationState = useNavigationState({
            user,
            enableAnalytics: true
        });
        return (_jsxs(NavigationLayout, { navigationState: navigationState.state, children: [_jsx(NavigationContainer, { user: user, onOpenCommandPalette: onOpenCommandPalette, onOpenNotifications: onOpenNotifications, unreadNotificationCount: unreadNotificationCount }), _jsx(Component, { ...componentProps, children: children })] }));
    });
    WithNavigationComponent.displayName = `withNavigation(${Component.displayName || Component.name})`;
    return WithNavigationComponent;
};
// ============================================================================
// EXPORT COMPLETE NAVIGATION SYSTEM
// ============================================================================
export { NavigationContainer as default };
// Re-export all navigation components for direct usage
export { MobileNavigation, DesktopSidebar, DesktopTopbar, TabletDrawer, SidebarOverlay, TabletDrawerTrigger };
// Re-export hooks and utilities
export { useNavigationState } from '../hooks/useNavigationState';
//# sourceMappingURL=NavigationContainer.js.map