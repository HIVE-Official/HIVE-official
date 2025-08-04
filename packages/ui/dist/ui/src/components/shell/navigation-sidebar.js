"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
import { Home, Users, MessageSquare, Zap, Calendar, Settings, User, ChevronLeft, ChevronRight } from 'lucide-react';
const navigationItems = [
    {
        id: 'profile',
        label: 'Profile',
        icon: User,
        href: '/profile',
    },
    {
        id: 'spaces',
        label: 'Spaces',
        icon: Users,
        href: '/spaces',
    },
    {
        id: 'feed',
        label: 'Feed',
        icon: MessageSquare,
        href: '/feed',
    },
    {
        id: 'hivelab',
        label: 'HiveLAB',
        icon: Zap,
        href: '/hivelab',
    },
    {
        id: 'calendar',
        label: 'Calendar',
        icon: Calendar,
        href: '/calendar',
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
];
export const NavigationSidebar = ({ collapsed = false, user, currentSection = 'profile', onToggleCollapse, onSectionChange, className, }) => {
    return (_jsxs("div", { className: cn('bg-hive-background-secondary border-r border-hive-border-subtle h-full flex flex-col transition-all duration-300', collapsed ? 'w-16' : 'w-64', className), children: [_jsxs("div", { className: "p-4 border-b border-hive-border-subtle", children: [!collapsed && (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-hive-accent-gold flex items-center justify-center", children: _jsx(Home, { className: "w-4 h-4 text-hive-text-primary" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h2", { className: "text-hive-text-primary font-semibold text-sm", children: "HIVE" }), _jsx("p", { className: "text-hive-text-secondary text-xs", children: "Campus Platform" })] })] })), collapsed && (_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-8 h-8 rounded-full bg-hive-accent-gold flex items-center justify-center", children: _jsx(Home, { className: "w-4 h-4 text-hive-text-primary" }) }) }))] }), _jsx("nav", { className: "flex-1 px-2 py-4 space-y-1", children: navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentSection === item.id;
                    return (_jsxs("button", { onClick: () => onSectionChange?.(item.id), className: cn('w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200', 'hover:bg-hive-background-tertiary', isActive
                            ? 'bg-hive-accent-gold/10 text-hive-accent-gold border border-hive-accent-gold/20'
                            : 'text-hive-text-secondary hover:text-hive-text-primary', collapsed ? 'justify-center' : 'justify-start'), children: [_jsx(Icon, { className: cn('w-5 h-5', !collapsed && 'mr-3') }), !collapsed && (_jsx("span", { className: "flex-1 text-left", children: item.label }))] }, item.id));
                }) }), user && (_jsxs("div", { className: "p-4 border-t border-hive-border-subtle", children: [!collapsed && (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-hive-text-muted flex items-center justify-center overflow-hidden", children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "w-full h-full object-cover" })) : (_jsx(User, { className: "w-4 h-4 text-hive-text-primary" })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-hive-text-primary font-medium text-sm truncate", children: user.name }), user.handle && (_jsxs("p", { className: "text-hive-text-secondary text-xs truncate", children: ["@", user.handle] }))] })] })), collapsed && (_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-8 h-8 rounded-full bg-hive-text-muted flex items-center justify-center overflow-hidden", children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "w-full h-full object-cover" })) : (_jsx(User, { className: "w-4 h-4 text-hive-text-primary" })) }) }))] })), onToggleCollapse && (_jsx("div", { className: "p-2 border-t border-hive-border-subtle", children: _jsx("button", { onClick: onToggleCollapse, className: "w-full flex items-center justify-center p-2 rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-tertiary transition-colors", children: collapsed ? (_jsx(ChevronRight, { className: "w-4 h-4" })) : (_jsx(ChevronLeft, { className: "w-4 h-4" })) }) }))] }));
};
export default NavigationSidebar;
//# sourceMappingURL=navigation-sidebar.js.map