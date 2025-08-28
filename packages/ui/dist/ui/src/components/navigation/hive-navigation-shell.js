"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { cn } from '../../lib/utils';
import { semantic } from '../../../../tokens/src';
import { NavigationProvider, useNavigation } from './hive-navigation-system';
import { SidebarNavigation, TopbarNavigation, CommandNavigation, MinimalNavigation } from './hive-navigation-variants';
// ============================================================================
// NAVIGATION RENDERER
// ============================================================================
function NavigationRenderer() {
    const { config, isMobile } = useNavigation();
    // Auto-select mobile variant on small screens
    const effectiveVariant = isMobile ? 'topbar' : config.variant;
    switch (effectiveVariant) {
        case 'sidebar':
            return _jsx(SidebarNavigation, {});
        case 'topbar':
            return _jsx(TopbarNavigation, {});
        case 'command':
            return _jsx(CommandNavigation, {});
        case 'minimal':
            return _jsx(MinimalNavigation, {});
        default:
            return _jsx(SidebarNavigation, {});
    }
}
function MainContent({ children, className }) {
    const { config, isCollapsed, isMobile } = useNavigation();
    // Calculate content margins based on navigation variant
    const contentMargins = useMemo(() => {
        if (isMobile) {
            return {
                marginTop: config.variant === 'minimal' ? '88px' : '64px',
                marginLeft: '0px',
            };
        }
        switch (config.variant) {
            case 'sidebar': {
                const widths = {
                    compact: isCollapsed ? '64px' : '192px',
                    standard: isCollapsed ? '64px' : '256px',
                    expanded: isCollapsed ? '80px' : '320px'
                };
                return {
                    marginTop: '0px',
                    marginLeft: widths[config.size],
                };
            }
            case 'topbar':
                return {
                    marginTop: '64px',
                    marginLeft: '0px',
                };
            case 'command':
                return {
                    marginTop: '48px',
                    marginLeft: '0px',
                };
            case 'minimal':
                return {
                    marginTop: '88px',
                    marginLeft: '0px',
                };
            default:
                return {
                    marginTop: '0px',
                    marginLeft: '0px',
                };
        }
    }, [config.variant, config.size, isCollapsed, isMobile]);
    return (_jsx("main", { className: cn("min-h-screen transition-all duration-300 ease-out", className), style: {
            marginTop: contentMargins.marginTop,
            marginLeft: contentMargins.marginLeft,
            backgroundColor: semantic.background.primary,
            color: semantic.text.primary,
        }, children: _jsx("div", { className: "min-h-full", children: children }) }));
}
export function HiveNavigationShell({ children, variant = 'sidebar', size = 'standard', user, sections, onNavigate, className, showSearch = true, showNotifications = true, showUserMenu = true, showBranding = true, collapsible = true, defaultCollapsed = false, keyboardShortcuts = true, mobileBreakpoint = 768, position = 'fixed', accessibility = {
    skipLinks: true,
    announcements: true,
    reducedMotion: false
} }) {
    const config = {
        variant,
        size,
        position,
        showSearch,
        showNotifications,
        showUserMenu,
        showBranding,
        collapsible,
        defaultCollapsed,
        keyboardShortcuts,
        mobileBreakpoint,
        accessibility
    };
    const handleNavigate = (item) => {
        // Handle navigation
        if (item.onClick) {
            item.onClick();
        }
        else if (item.href) {
            window.location.href = item.href;
        }
        // Call custom handler
        onNavigate?.(item);
    };
    return (_jsx(NavigationProvider, { config: config, user: user, sections: sections, onNavigate: handleNavigate, children: _jsxs("div", { className: cn("min-h-screen", className), style: { backgroundColor: semantic.background.primary }, children: [accessibility.skipLinks && (_jsx("div", { className: "sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50", children: _jsx("a", { href: "#main-content", className: "inline-block px-4 py-2 text-sm font-medium text-[var(--hive-text-primary)] bg-[var(--hive-background-primary)] rounded-md", children: "Skip to main content" }) })), _jsx(NavigationRenderer, {}), _jsx(MainContent, { className: "relative", children: _jsx("div", { id: "main-content", className: "w-full", children: children }) }), _jsx(MobileSidebarOverlay, {})] }) }));
}
// ============================================================================
// MOBILE SIDEBAR OVERLAY
// ============================================================================
function MobileSidebarOverlay() {
    const { config, isCollapsed, isMobile, setCollapsed } = useNavigation();
    if (!isMobile || config.variant !== 'sidebar' || isCollapsed) {
        return null;
    }
    return (_jsx("div", { className: "fixed inset-0 z-30 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm md:hidden", onClick: () => setCollapsed(true) }));
}
// ============================================================================
// CONVENIENCE HOOKS
// ============================================================================
export function useHiveNavigation() {
    return useNavigation();
}
// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================
export const navigationPresets = {
    // Standard sidebar navigation
    sidebar: {
        variant: 'sidebar',
        size: 'standard',
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true,
        collapsible: true,
        keyboardShortcuts: true,
    },
    // Compact sidebar for focused work
    compact: {
        variant: 'sidebar',
        size: 'compact',
        showSearch: false,
        showNotifications: false,
        showUserMenu: true,
        showBranding: true,
        collapsible: true,
        defaultCollapsed: true,
        keyboardShortcuts: true,
    },
    // Top navigation for content-heavy apps
    topbar: {
        variant: 'topbar',
        size: 'standard',
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true,
        keyboardShortcuts: true,
    },
    // Command-driven navigation for power users
    command: {
        variant: 'command',
        size: 'standard',
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true,
        keyboardShortcuts: true,
    },
    // Minimal navigation for immersive experiences
    minimal: {
        variant: 'minimal',
        size: 'compact',
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true,
        keyboardShortcuts: true,
    },
    // Admin dashboard navigation
    admin: {
        variant: 'sidebar',
        size: 'expanded',
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true,
        collapsible: true,
        keyboardShortcuts: true,
    },
    // Mobile-optimized navigation
    mobile: {
        variant: 'topbar',
        size: 'compact',
        showSearch: false,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true,
        keyboardShortcuts: false,
    }
};
// ============================================================================
// EXPORT EVERYTHING
// ============================================================================
export { NavigationProvider, useNavigation } from './hive-navigation-system';
//# sourceMappingURL=hive-navigation-shell.js.map