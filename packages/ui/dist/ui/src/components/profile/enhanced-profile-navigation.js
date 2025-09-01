import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Enhanced Profile Navigation - Campus Command Center
 * Integrates NavigationMenu molecule with profile-specific navigation patterns
 *
 * Built using HIVE foundation systems and molecules:
 * - NavigationMenu molecule for consistent navigation patterns
 * - Campus-specific navigation presets and features
 * - Cross-slice integration for Profile as Campus Command Center
 */
import React from 'react';
import { cn } from '../../lib/utils.js';
// Molecule imports
import { NavigationMenu } from '../../atomic/molecules/navigation-menu.js';
// Foundation system imports
import { iconComposition, User, Activity, Settings, Users, Hammer, Calendar, Bell, Shield, Eye, EyeOff, BarChart3, MessageSquare, Link, Zap, TrendingUp, Home, Search } from '../../atomic/foundations/icon-composition.js';
// === PROFILE NAVIGATION PRESETS ===
const profileNavigationPresets = {
    // Main profile tabs (horizontal)
    mainTabs: (user) => [
        {
            id: 'overview',
            label: 'Overview',
            icon: Home,
            href: '/profile'
        },
        {
            id: 'activity',
            label: 'Activity',
            icon: Activity,
            href: '/profile/activity'
        },
        {
            id: 'spaces',
            label: 'My Spaces',
            icon: Users,
            href: '/profile/spaces',
            badge: 5 // Example: active spaces count
        },
        {
            id: 'tools',
            label: 'My Tools',
            icon: Hammer,
            href: '/profile/tools',
            badge: user.isBuilder ? 3 : undefined // Show tool count for builders
        },
        {
            id: 'connections',
            label: 'Connections',
            icon: Activity,
            href: '/profile/connections',
            badge: 12 // Example: new connection requests
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: Settings,
            href: '/profile/settings',
            badge: user.unreadNotifications || undefined
        }
    ],
    // Settings sidebar navigation (vertical)
    settingsSidebar: (user) => [
        {
            id: 'profile',
            label: 'Profile',
            items: [
                { id: 'overview', label: 'Basic Info', icon: User },
                { id: 'privacy', label: 'Privacy', icon: user.ghostMode ? EyeOff : Eye },
                { id: 'connections', label: 'Connections', icon: Users },
                { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 }
            ]
        },
        {
            id: 'campus',
            label: 'Campus',
            items: [
                { id: 'spaces', label: 'Space Settings', icon: Users },
                { id: 'tools', label: 'Tool Preferences', icon: Hammer },
                { id: 'calendar', label: 'Calendar Sync', icon: Calendar },
                { id: 'analytics', label: 'My Analytics', icon: BarChart3 }
            ]
        },
        {
            id: 'account',
            label: 'Account',
            items: [
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'data', label: 'Data & Export', icon: Link },
                { id: 'help', label: 'Help & Support', icon: MessageSquare }
            ]
        }
    ],
    // Mobile bottom navigation
    mobileNav: (user) => [
        { id: 'overview', label: 'Profile', icon: User },
        { id: 'spaces', label: 'Spaces', icon: Users, badge: 5 },
        { id: 'tools', label: 'Tools', icon: Hammer, badge: user.isBuilder ? 3 : undefined },
        { id: 'activity', label: 'Activity', icon: Activity, badge: 12 }
    ],
    // Quick actions (floating)
    quickActions: () => [
        { id: 'search', label: 'Search', icon: Search },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 7 },
        { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 }
    ],
    // Builder-specific navigation
    builderTabs: () => [
        { id: 'overview', label: 'Dashboard', icon: BarChart3 },
        { id: 'tools', label: 'My Tools', icon: Hammer, badge: 8 },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'workshop', label: 'Workshop', icon: Zap },
        { id: 'community', label: 'Community', icon: Users }
    ]
};
// === SECTION METADATA ===
const sectionMetadata = {
    overview: {
        title: 'Profile Overview',
        description: 'Your campus command center with personalized insights',
        icon: Home,
        campusFeature: true
    },
    activity: {
        title: 'Campus Activity',
        description: 'Your recent interactions across spaces, tools, and events',
        icon: Activity,
        campusFeature: true
    },
    spaces: {
        title: 'My Spaces',
        description: 'Communities you belong to and their latest activity',
        icon: Users,
        campusFeature: true
    },
    tools: {
        title: 'My Tools',
        description: 'Tools you\'ve built, saved, and frequently use',
        icon: Hammer,
        campusFeature: true
    },
    connections: {
        title: 'Campus Connections',
        description: 'Your network of classmates, floor mates, and collaborators',
        icon: Activity,
        campusFeature: true
    },
    calendar: {
        title: 'Integrated Calendar',
        description: 'Your schedule with campus events and space activities',
        icon: Calendar,
        campusFeature: true
    },
    analytics: {
        title: 'Your Impact',
        description: 'Analytics on your campus contributions and engagement',
        icon: BarChart3,
        campusFeature: true
    },
    settings: {
        title: 'Profile Settings',
        description: 'Manage your profile, privacy, and campus preferences',
        icon: Settings
    },
    privacy: {
        title: 'Privacy & Visibility',
        description: 'Control who can see your profile and activity',
        icon: Shield
    }
};
// === MAIN COMPONENT ===
export const EnhancedProfileNavigation = React.forwardRef(({ activeSection, onSectionChange, user, showAnalytics = false, showBuilderFeatures = false, showCampusIntegration = true, variant = 'tabs', layout = 'horizontal', size = 'base', campusOptimized = true, className }, ref) => {
    // Get appropriate navigation items based on variant
    const getNavigationItems = () => {
        switch (variant) {
            case 'sidebar':
                return profileNavigationPresets.settingsSidebar(user);
            case 'floating':
                return profileNavigationPresets.quickActions();
            case 'pills':
            case 'tabs':
            default:
                if (showBuilderFeatures && user.isBuilder) {
                    return profileNavigationPresets.builderTabs();
                }
                return profileNavigationPresets.mainTabs(user);
        }
    };
    const navigationData = getNavigationItems();
    // Handle navigation item click
    const handleNavigation = (item) => {
        // Update active section
        onSectionChange(item.id);
        // Handle external navigation if href provided
        if (item.href && typeof window !== 'undefined') {
            // For demo purposes, we'll just update the URL hash
            window.history.pushState(null, '', item.href);
        }
    };
    // Render navigation based on data type
    if (Array.isArray(navigationData) && navigationData.length > 0 && 'items' in navigationData[0]) {
        // Grouped navigation (sidebar)
        return (_jsx(NavigationMenu, { ref: ref, groups: navigationData, activeId: activeSection, size: size, variant: variant, orientation: layout, layout: variant === 'sidebar' ? 'sidebar' : 'basic', campusOptimized: campusOptimized, onItemClick: handleNavigation, className: cn(
            // Campus-specific styling
            showCampusIntegration && [
                'bg-[var(--hive-bg-tertiary)]/50',
                'backdrop-blur-sm',
                'border border-[var(--hive-border-glass)]',
                'rounded-xl',
                variant === 'sidebar' && 'p-2'
            ].filter(Boolean).join(' '), className), ...(layout === 'vertical' ? { orientation: 'vertical' } : {}) }));
    }
    else {
        // Simple navigation items
        return (_jsx(NavigationMenu, { ref: ref, items: navigationData, activeId: activeSection, size: size, variant: variant, orientation: layout, layout: variant === 'floating' ? 'floating' : variant === 'tabs' ? 'tabs' : 'basic', campusOptimized: campusOptimized, onItemClick: handleNavigation, className: cn(
            // Campus-specific styling
            showCampusIntegration && variant === 'floating' && [
                'fixed bottom-6 left-1/2 -translate-x-1/2 z-50'
            ].join(' '), className) }));
    }
});
EnhancedProfileNavigation.displayName = 'EnhancedProfileNavigation';
export const ProfileSectionHeader = React.forwardRef(({ section, showDescription = true, className }, ref) => {
    const metadata = sectionMetadata[section];
    const IconComponent = metadata.icon;
    return (_jsxs("div", { ref: ref, className: cn('flex items-start gap-4 mb-6', className), children: [_jsx("div", { className: cn('p-3 rounded-xl', 'bg-[var(--hive-gold-background)]', 'border border-[var(--hive-gold-border)]'), children: _jsx(IconComponent, { className: cn(iconComposition.sizes.large.className, 'text-[var(--hive-gold-primary)]') }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h1", { className: "text-2xl font-semibold text-[var(--hive-text-primary)]", children: metadata.title }), metadata.campusFeature && (_jsx("span", { className: "px-2 py-1 text-xs font-medium bg-[var(--hive-info-background)] text-[var(--hive-info-primary)] rounded-full border border-[var(--hive-info-border)]", children: "Campus" }))] }), showDescription && (_jsx("p", { className: "text-[var(--hive-text-secondary)] leading-relaxed", children: metadata.description }))] })] }));
});
ProfileSectionHeader.displayName = 'ProfileSectionHeader';
export { profileNavigationPresets, sectionMetadata };
//# sourceMappingURL=enhanced-profile-navigation.js.map