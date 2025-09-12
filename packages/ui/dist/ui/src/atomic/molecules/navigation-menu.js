import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Navigation Menu Molecule
 * Campus-optimized navigation components - tabs, menu items, and nav groups
 *
 * Built using all foundation systems:
 * - Typography: Consistent nav label hierarchy and badge formatting
 * - Color: Campus semantic colors and active state indicators
 * - Layout: Systematic spacing between nav items and groups
 * - Icon: Navigation icons with proper sizing and context
 * - Interaction: Hover states, active feedback, and keyboard navigation
 * - Shadow: Subtle elevation for floating nav elements
 * - Border: Consistent radius and active state borders
 * - Motion: Smooth navigation transitions and indicator animations
 */
import React, { useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
// Foundation system imports
import { typographyComposition } from '../foundations/typography-composition';
import { layoutComposition } from '../foundations/layout-composition';
import { iconComposition, Home, Users, Hammer, Activity, User, Settings, Bell, ExternalLink } from '../foundations/icon-composition';
import { shadowComposition } from '../foundations/shadow-composition';
// === NAVIGATION ITEM VARIANTS ===
const navigationItemVariants = cva(
// Base nav item styles using foundation systems
[
    // Layout foundation
    'relative inline-flex items-center',
    'cursor-pointer',
    // Typography foundation
    'font-[var(--hive-font-family-primary)]',
    'font-medium',
    'text-[var(--hive-text-secondary)]',
    // Interaction foundation
    'transition-all',
    'duration-[150ms]',
    // Focus ring using border foundation
    'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20',
    'rounded-lg',
    // Hover states
    'hover:text-[var(--hive-text-primary)]',
    'hover:bg-[var(--hive-bg-subtle)]'
].join(' '), {
    variants: {
        size: {
            small: [
                // Padding
                'px-3 py-2', // 12px x 8px
                // Typography
                `text-[${typographyComposition.scale.small.size}]`, // 14px
                // Icon sizing
                `[&_.hive-nav-icon]:${iconComposition.sizes.small.className}`, // 16px
                // Badge sizing
                '[&_.hive-nav-badge]:text-xs [&_.hive-nav-badge]:px-1.5 [&_.hive-nav-badge]:py-0.5'
            ],
            base: [
                // Padding
                'px-4 py-2.5', // 16px x 10px
                // Typography
                `text-[${typographyComposition.scale.base.size}]`, // 16px
                // Icon sizing
                `[&_.hive-nav-icon]:${iconComposition.sizes.base.className}`, // 20px
                // Badge sizing
                '[&_.hive-nav-badge]:text-xs [&_.hive-nav-badge]:px-2 [&_.hive-nav-badge]:py-1'
            ],
            large: [
                // Padding
                'px-5 py-3', // 20px x 12px
                // Typography
                `text-[${typographyComposition.scale.large.size}]`, // 18px
                // Icon sizing
                `[&_.hive-nav-icon]:${iconComposition.sizes.large.className}`, // 24px
                // Badge sizing
                '[&_.hive-nav-badge]:text-sm [&_.hive-nav-badge]:px-2.5 [&_.hive-nav-badge]:py-1'
            ]
        },
        variant: {
            // Default navigation style
            default: '',
            // Tab navigation style
            tab: [
                'border-b-2 border-transparent',
                'hover:border-[var(--hive-border-glass)]',
                'data-[active=true]:border-[var(--hive-gold-primary)]',
                'data-[active=true]:text-[var(--hive-gold-primary)]',
                'rounded-b-none'
            ].join(' '),
            // Pill navigation style
            pill: [
                'rounded-full',
                'data-[active=true]:bg-[var(--hive-gold-background)]',
                'data-[active=true]:text-[var(--hive-gold-primary)]',
                'data-[active=true]:border',
                'data-[active=true]:border-[var(--hive-gold-border)]'
            ].join(' '),
            // Sidebar navigation style
            sidebar: [
                'w-full justify-start',
                'rounded-lg',
                'data-[active=true]:bg-[var(--hive-gold-background)]',
                'data-[active=true]:text-[var(--hive-gold-primary)]',
                'data-[active=true]:border-r-2',
                'data-[active=true]:border-r-[var(--hive-gold-primary)]'
            ].join(' '),
            // Ghost minimal style
            ghost: [
                'bg-transparent',
                'hover:bg-[var(--hive-bg-subtle)]',
                'data-[active=true]:text-[var(--hive-gold-primary)]'
            ].join(' ')
        },
        state: {
            default: '',
            active: [
                'text-[var(--hive-gold-primary)]'
            ].join(' '),
            disabled: [
                'opacity-50',
                'cursor-not-allowed',
                'hover:bg-transparent',
                'hover:text-[var(--hive-text-secondary)]'
            ].join(' ')
        }
    },
    defaultVariants: {
        size: 'base',
        variant: 'default',
        state: 'default'
    }
});
// === NAVIGATION CONTAINER VARIANTS ===
const navigationContainerVariants = cva(
// Base container styles
[
    // Layout foundation
    'flex',
    layoutComposition.utils.gap[1], // 4px gap between items
    'items-center'
].join(' '), {
    variants: {
        orientation: {
            horizontal: 'flex-row',
            vertical: [
                'flex-col',
                'items-stretch',
                layoutComposition.utils.gap[2] // 8px vertical gap
            ].join(' ')
        },
        layout: {
            // Basic navigation
            basic: '',
            // Scrollable horizontal tabs
            tabs: [
                'overflow-x-auto',
                'scrollbar-hide', // Hide scrollbar for clean mobile experience
                'border-b border-[var(--hive-border-subtle)]',
                'pb-0'
            ].join(' '),
            // Sidebar navigation
            sidebar: [
                'flex-col items-stretch w-full',
                layoutComposition.utils.gap[1], // 4px between sidebar items
                'p-2'
            ].join(' '),
            // Floating navigation
            floating: [
                'bg-[var(--hive-bg-tertiary)]',
                'border border-[var(--hive-border-glass)]',
                'rounded-xl',
                'p-2',
                `shadow-[${shadowComposition.scale.floating.shadow}]`,
                'backdrop-blur-lg'
            ].join(' ')
        }
    },
    defaultVariants: {
        orientation: 'horizontal',
        layout: 'basic'
    }
});
const NavigationBadge = React.forwardRef(({ children, className }, ref) => (_jsx("span", { ref: ref, className: cn(
    // Base badge styles
    'hive-nav-badge', 'inline-flex items-center justify-center', 'min-w-[1rem]', 'rounded-full', 
    // Typography foundation
    'font-[var(--hive-font-family-primary)]', 'font-medium', 'tabular-nums', 
    // Color foundation
    'bg-[var(--hive-error-primary)]', 'text-[var(--hive-bg-primary)]', 
    // Motion foundation
    'transition-all duration-[150ms]', 'animate-in zoom-in-50', className), children: children })));
NavigationBadge.displayName = 'NavigationBadge';
const NavigationItemComponent = React.forwardRef(({ item, isActive, size, variant, showIcon, showBadge, onClick }, ref) => {
    const IconComponent = item.icon;
    const hasNotification = item.badge && (typeof item.badge === 'number' ? item.badge > 0 : item.badge.length > 0);
    const handleClick = () => {
        if (item.disabled)
            return;
        onClick(item);
    };
    const handleKeyDown = (e) => {
        if (item.disabled)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(item);
        }
    };
    return (_jsxs("button", { ref: ref, type: "button", className: cn(navigationItemVariants({
            size,
            variant,
            state: item.disabled ? 'disabled' : isActive ? 'active' : 'default'
        }), 
        // Icon and text gap
        showIcon && 'gap-2.5'), disabled: item.disabled, "data-active": isActive, onClick: handleClick, onKeyDown: handleKeyDown, "aria-current": isActive ? 'page' : undefined, title: item.label, children: [showIcon && IconComponent && (_jsx(IconComponent, { className: cn('hive-nav-icon', 'shrink-0', 
                // Motion foundation - smooth icon transitions
                'transition-transform duration-[150ms]', 
                // Active state animation
                isActive && 'scale-110') })), _jsx("span", { className: "truncate", children: item.label }), item.external && (_jsx(ExternalLink, { className: cn('hive-nav-icon', 'shrink-0', 'opacity-60') })), showBadge && hasNotification && (_jsx(NavigationBadge, { children: typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge }))] }));
});
NavigationItemComponent.displayName = 'NavigationItemComponent';
// === MAIN COMPONENT ===
export const NavigationMenu = React.forwardRef(({ className, orientation, layout, items = [], groups = [], activeId, size = 'base', variant = 'default', campusOptimized = false, showIcons = true, showBadges = true, onItemClick, onActiveChange, ...props }, ref) => {
    // Combine individual items and grouped items
    const allItems = [
        ...items,
        ...groups.flatMap(group => group.items)
    ];
    // Handle item click
    const handleItemClick = useCallback((item) => {
        if (item.disabled)
            return;
        // Update active state
        onActiveChange?.(item.id);
        // Handle external links
        if (item.external && item.href) {
            window.open(item.href, '_blank', 'noopener,noreferrer');
            return;
        }
        // Handle internal navigation
        if (item.href) {
            // Let router handle navigation
            window.location.href = item.href;
            return;
        }
        // Call custom click handler
        onItemClick?.(item);
    }, [onItemClick, onActiveChange]);
    // Render individual items
    const renderItems = (itemList) => (itemList.map(item => (_jsx(NavigationItemComponent, { item: item, isActive: activeId === item.id, size: size, variant: variant, showIcon: showIcons, showBadge: showBadges, onClick: handleItemClick }, item.id))));
    return (_jsxs("nav", { ref: ref, className: cn(navigationContainerVariants({ orientation, layout }), 
        // Campus optimizations
        campusOptimized && [
            // Better mobile touch targets
            '[&_button]:min-h-[44px]',
            // Enhanced mobile scrolling for tabs
            layout === 'tabs' && 'scroll-smooth',
            // Mobile-friendly spacing
            'gap-1 sm:gap-2'
        ].join(' '), className), role: "navigation", "aria-label": "Navigation menu", ...props, children: [items.length > 0 && renderItems(items), groups.map(group => (_jsxs("div", { className: "contents", children: [group.label && layout === 'sidebar' && (_jsx("div", { className: cn('px-4 py-2 mt-4 first:mt-0', 'font-[var(--hive-font-family-primary)]', 'font-semibold', `text-[${typographyComposition.scale.caption.size}]`, // 12px
                        'text-[var(--hive-text-muted)]', 'uppercase tracking-wide'), children: group.label })), renderItems(group.items)] }, group.id)))] }));
});
NavigationMenu.displayName = 'NavigationMenu';
// === CAMPUS NAVIGATION PRESETS ===
export const campusNavigationPresets = {
    // Main campus navigation
    mainNav: [
        { id: 'feed', label: 'Feed', icon: Home, href: '/feed' },
        { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces', badge: 3 },
        { id: 'tools', label: 'Tools', icon: Hammer, href: '/tools' },
        { id: 'profile', label: 'Profile', icon: User, href: '/profile' }
    ],
    // Profile navigation tabs
    profileTabs: [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'activity', label: 'Activity', icon: Activity },
        { id: 'settings', label: 'Settings', icon: Settings }
    ],
    // Settings sidebar navigation
    settingsGroups: [
        {
            id: 'account',
            label: 'Account',
            items: [
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'notifications', label: 'Notifications', icon: Bell, badge: 2 },
                { id: 'privacy', label: 'Privacy', icon: Settings }
            ]
        },
        {
            id: 'campus',
            label: 'Campus',
            items: [
                { id: 'spaces', label: 'My Spaces', icon: Users },
                { id: 'tools', label: 'My Tools', icon: Hammer },
                { id: 'connections', label: 'Connections', icon: Activity }
            ]
        }
    ]
};
// Types already exported inline above
export { navigationItemVariants, navigationContainerVariants, NavigationBadge };
//# sourceMappingURL=navigation-menu.js.map