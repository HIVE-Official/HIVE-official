"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ChevronRight, Home, Users, Code, Zap, Calendar, BookOpen, User, Settings, Compass, Heart } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { cn } from '../../lib/utils';
// Route mappings for generating breadcrumbs from pathname
const routeMappings = {
    '/': { label: 'Dashboard', icon: Home },
    '/spaces': { label: 'Spaces', icon: Users },
    '/spaces/browse': { label: 'Browse Spaces', icon: Compass },
    '/spaces/my': { label: 'My Spaces', icon: Heart },
    '/tools': { label: 'Tools', icon: Code },
    '/build': { label: 'HiveLab', icon: Zap },
    '/calendar': { label: 'Calendar', icon: Calendar },
    '/events': { label: 'Events', icon: Calendar },
    '/resources': { label: 'Resources', icon: BookOpen },
    '/profile': { label: 'Profile', icon: User },
    '/settings': { label: 'Settings', icon: Settings },
};
// Generate breadcrumbs from pathname
export function generateBreadcrumbsFromPath(pathname) {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    let currentPath = '';
    for (const segment of segments) {
        currentPath += `/${segment}`;
        const mapping = routeMappings[currentPath];
        if (mapping) {
            breadcrumbs.push({
                label: mapping.label,
                href: currentPath,
                icon: mapping.icon,
            });
        }
    }
    {
        // Dynamic segments (like IDs)
        let label = segment;
        // Format dynamic segments
        if (segment.length > 20) {
            label = `${segment.slice(0, 10)}...${segment.slice(-6)}`;
        }
        else {
            label = segment.charAt(0).toUpperCase() + segment.slice(1);
        }
        breadcrumbs.push({
            label,
            href: currentPath,
        });
    }
}
return breadcrumbs;
export function BreadcrumbNavigation({ items, className, showHome = true, maxItems = 5 }) {
    // Truncate items if they exceed maxItems
    const displayItems = items.length > maxItems
        ? [
            ...items.slice(0, 2),
            { label: '...', href: undefined },
            ...items.slice(-(maxItems - 3))
        ]
        : items;
    return (_jsxs("nav", { className: cn("flex items-center space-x-1 text-sm overflow-x-auto scrollbar-hide", className), "aria-label": "Breadcrumb", children: [showHome && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", size: "sm", className: "h-6 px-1 hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] hover:text-[var(--hive-text-primary)] shrink-0", onClick: () => window.location.href = '/', children: _jsx(Home, { className: "h-3 w-3" }) }), displayItems.length > 0 && (_jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-border-default)] shrink-0" }))] })), displayItems.map((item, index) => {
                const isLast = index === displayItems.length - 1;
                const isEllipsis = item.label === '...';
                const Icon = item.icon;
                return (_jsxs(React.Fragment, { children: [_jsxs("div", { className: "flex items-center space-x-1 shrink-0", children: [Icon && _jsx(Icon, { className: "h-3 w-3" }), isEllipsis ? (_jsx("span", { className: "px-1 text-[var(--hive-text-tertiary)]", children: item.label })) : item.href ? (_jsx(Button, { variant: "ghost", size: "sm", className: cn("h-6 px-1 font-normal max-w-32 truncate", "hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] hover:text-[var(--hive-text-primary)]", "text-[var(--hive-text-tertiary)]"), onClick: () => window.location.href = item.href, title: item.label, children: item.label })) : (_jsx("span", { className: cn("px-1 font-medium max-w-32 truncate", isLast ? "text-[var(--hive-text-primary)]" : "text-[var(--hive-text-tertiary)]"), title: item.label, children: item.label }))] }), !isLast && (_jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-border-default)] shrink-0" }))] }, index));
            })] }));
}
// Smart breadcrumb component that auto-generates from pathname
export function SmartBreadcrumbNavigation({ items, pathname, autoGenerate = true, className, showHome = true, maxItems = 5, }) {
    const breadcrumbItems = React.useMemo(() => {
        if (items)
            return items;
        if (autoGenerate && pathname) {
            return generateBreadcrumbsFromPath(pathname);
        }
        return [];
    }, [items, pathname, autoGenerate]);
    return (_jsx(BreadcrumbNavigation, { items: breadcrumbItems, className: className, showHome: showHome, maxItems: maxItems }));
}
//# sourceMappingURL=breadcrumb-navigation.js.map