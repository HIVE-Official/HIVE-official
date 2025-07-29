'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { cn } from '../../lib/utils.js';
import { Home, Compass, Zap, Calendar, BookOpen, User, Settings, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from './button.js';
const navigationItems = [
    {
        id: 'feed',
        icon: Home,
        label: 'Feed',
        href: '/',
        matchPaths: ['/']
    },
    {
        id: 'spaces',
        icon: Compass,
        label: 'Spaces',
        href: '/spaces',
        matchPaths: ['/spaces'],
        children: [
            { id: 'spaces-my', icon: User, label: 'My Spaces', href: '/spaces/my' },
            { id: 'spaces-browse', icon: Compass, label: 'Browse', href: '/spaces/browse' },
            { id: 'spaces-activate', icon: Zap, label: 'Activate', href: '/spaces/activate' }
        ]
    },
    {
        id: 'tools',
        icon: Zap,
        label: 'Tools',
        href: '/tools',
        matchPaths: ['/tools', '/build'],
        children: [
            { id: 'tools-my', icon: User, label: 'My Tools', href: '/tools/my' },
            { id: 'tools-marketplace', icon: Compass, label: 'Marketplace', href: '/tools/marketplace' },
            { id: 'tools-build', icon: Zap, label: 'Builder', href: '/tools/build' }
        ]
    },
    {
        id: 'calendar',
        icon: Calendar,
        label: 'Calendar',
        href: '/calendar',
        matchPaths: ['/calendar']
    },
    {
        id: 'resources',
        icon: BookOpen,
        label: 'Resources',
        href: '/resources',
        matchPaths: ['/resources']
    },
    {
        id: 'profile',
        icon: User,
        label: 'Profile',
        href: '/profile',
        matchPaths: ['/profile']
    }
];
const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Settings', href: '/settings' },
];
export const Sidebar = ({ user, currentPath = '/', collapsed = false, onItemClick, onToggle, breadcrumbs = [], currentSection, className, }) => {
    const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '';
    const [expandedItems, setExpandedItems] = useState([]);
    const isItemActive = (item) => {
        if (currentPath === item.href)
            return true;
        if (item.matchPaths) {
            return item.matchPaths.some(path => currentPath === path || currentPath.startsWith(path + '/'));
        }
        return false;
    };
    const handleItemClick = (item) => {
        if (item.children && item.children.length > 0) {
            // Toggle expansion for items with children
            setExpandedItems(prev => prev.includes(item.id)
                ? prev.filter(id => id !== item.id)
                : [...prev, item.id]);
        }
        else {
            onItemClick?.(item.href);
        }
    };
    const isExpanded = (itemId) => expandedItems.includes(itemId);
    return (_jsxs("aside", { className: cn('h-screen flex-shrink-0 flex flex-col', 'bg-[var(--hive-background-primary)]', 'border-r border-[var(--hive-border-default)]', 'transition-all duration-300 ease-out', collapsed ? 'w-16' : 'w-72', className), children: [!collapsed && breadcrumbs.length > 0 && (_jsx("div", { className: "px-4 py-3 border-b border-[var(--hive-border-default)]", children: _jsx("div", { className: "flex items-center space-x-2 text-sm", children: breadcrumbs.map((crumb, index) => (_jsxs(React.Fragment, { children: [index > 0 && (_jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-text-tertiary)]" })), _jsx("button", { onClick: () => crumb.href && onItemClick?.(crumb.href), className: cn('text-sm transition-colors hover:text-[var(--hive-text-primary)]', crumb.href
                                    ? 'text-[var(--hive-text-secondary)] cursor-pointer'
                                    : 'text-[var(--hive-text-primary)] font-medium'), children: crumb.label })] }, index))) }) })), !collapsed && user && (_jsx("div", { className: "px-4 py-4 border-b border-[var(--hive-border-default)]", children: _jsxs("div", { className: "flex items-center space-x-3 p-3 rounded-2xl bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)]", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-[var(--hive-background-tertiary)] to-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-2xl flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)]", children: initials }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-sm font-semibold text-[var(--hive-text-primary)] truncate", children: user.name }), _jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)] truncate", children: ["@", user.handle] })] })] }) })), _jsx("nav", { className: "flex-1 px-4 overflow-y-auto", children: _jsx("div", { className: "space-y-1", children: navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isItemActive(item);
                        const hasChildren = item.children && item.children.length > 0;
                        const isItemExpanded = isExpanded(item.id);
                        return (_jsxs("div", { children: [_jsxs(Button, { variant: "ghost", onClick: () => handleItemClick(item), className: cn('w-full transition-all duration-300 relative group', collapsed ? 'h-12 px-0 justify-center' : 'h-12 px-3 justify-start', 'rounded-xl', isActive ? [
                                        'bg-gradient-to-r from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5',
                                        'border border-[var(--hive-brand-secondary)]/20'
                                    ].join(' ') : [
                                        'hover:bg-[var(--hive-background-secondary)]',
                                        'border border-transparent'
                                    ].join(' ')), children: [_jsx("div", { className: cn('w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300', !collapsed && 'mr-3', isActive ? 'bg-[var(--hive-brand-secondary)]' : 'bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]'), children: _jsx(Icon, { className: cn('h-4 w-4 transition-colors duration-300', isActive
                                                    ? 'text-[var(--hive-text-inverse)]'
                                                    : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]') }) }), !collapsed && (_jsxs(_Fragment, { children: [_jsx("span", { className: cn('text-sm font-medium truncate transition-colors duration-300 flex-1 text-left', isActive
                                                        ? 'text-[var(--hive-brand-secondary)]'
                                                        : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'), children: item.label }), hasChildren && (_jsx("div", { className: "w-5 h-5 flex items-center justify-center", children: isItemExpanded ? (_jsx(ChevronDown, { className: "h-3 w-3 text-[var(--hive-text-tertiary)]" })) : (_jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-text-tertiary)]" })) }))] })), isActive && !collapsed && !hasChildren && (_jsx("div", { className: "absolute right-3 w-1.5 h-6 bg-[var(--hive-brand-secondary)] rounded-full" }))] }), !collapsed && hasChildren && isItemExpanded && (_jsx("div", { className: "ml-6 mt-1 space-y-1 border-l border-[var(--hive-border-default)] pl-4", children: item.children.map((child) => {
                                        const ChildIcon = child.icon;
                                        const isChildActive = isItemActive(child);
                                        return (_jsxs(Button, { variant: "ghost", onClick: () => onItemClick?.(child.href), className: cn('w-full h-10 px-3 justify-start rounded-lg transition-all duration-300 group', isChildActive ? [
                                                'bg-[var(--hive-brand-secondary)]/5',
                                                'border border-[var(--hive-brand-secondary)]/15'
                                            ].join(' ') : [
                                                'hover:bg-[var(--hive-background-secondary)]',
                                                'border border-transparent'
                                            ].join(' ')), children: [_jsx("div", { className: cn('w-6 h-6 rounded-md flex items-center justify-center mr-3 transition-all duration-300', isChildActive ? 'bg-[var(--hive-brand-secondary)]/20' : 'bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]'), children: _jsx(ChildIcon, { className: cn('h-3 w-3 transition-colors duration-300', isChildActive
                                                            ? 'text-[var(--hive-brand-secondary)]'
                                                            : 'text-[var(--hive-text-tertiary)] group-hover:text-[var(--hive-text-secondary)]') }) }), _jsx("span", { className: cn('text-sm font-medium truncate transition-colors duration-300', isChildActive
                                                        ? 'text-[var(--hive-brand-secondary)]'
                                                        : 'text-[var(--hive-text-tertiary)] group-hover:text-[var(--hive-text-secondary)]'), children: child.label }), isChildActive && (_jsx("div", { className: "absolute right-3 w-1 h-4 bg-[var(--hive-brand-secondary)] rounded-full" }))] }, child.id));
                                    }) }))] }, item.id));
                    }) }) }), _jsx("div", { className: "p-4 border-t border-[var(--hive-border-default)]", children: _jsx("div", { className: "space-y-2", children: bottomItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isItemActive(item);
                        return (_jsxs(Button, { variant: "ghost", onClick: () => handleItemClick(item), className: cn('w-full transition-all duration-300 relative group', collapsed ? 'h-12 px-0 justify-center' : 'h-12 px-4 justify-start', 'rounded-2xl', isActive ? [
                                'bg-gradient-to-r from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5',
                                'border border-[var(--hive-brand-secondary)]/20'
                            ].join(' ') : [
                                'hover:bg-[var(--hive-background-secondary)]',
                                'border border-transparent'
                            ].join(' ')), children: [_jsx("div", { className: cn('w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300', !collapsed && 'mr-3', isActive ? 'bg-[var(--hive-brand-secondary)]' : 'bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]'), children: _jsx(Icon, { className: cn('h-4 w-4 transition-colors duration-300', isActive
                                            ? 'text-[var(--hive-text-inverse)]'
                                            : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]') }) }), !collapsed && (_jsx("span", { className: cn('text-sm font-medium truncate transition-colors duration-300', isActive
                                        ? 'text-[var(--hive-brand-secondary)]'
                                        : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'), children: item.label }))] }, item.id));
                    }) }) })] }));
};
//# sourceMappingURL=sidebar.js.map