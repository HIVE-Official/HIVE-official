"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Compass, Zap, User, Settings, Search, Bell, Plus, X, Calendar, Users, Building, LogOut, Crown, Shield, Activity, BookOpen, HelpCircle } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Badge } from '../../atomic/atoms/badge.js';
import { Separator } from '../../ui/separator';
import { cn } from '../../lib/utils.js';
const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
    { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces' },
    { id: 'tools', label: 'Tools', icon: Zap, href: '/tools' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
];
const secondaryNavItems = [
    { id: 'calendar', label: 'Calendar', icon: Calendar, href: '/calendar' },
    { id: 'events', label: 'Events', icon: Calendar, href: '/events' },
    { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources' },
    { id: 'browse-spaces', label: 'Browse Spaces', icon: Compass, href: '/spaces/browse' },
    { id: 'my-spaces', label: 'My Spaces', icon: Users, href: '/spaces/my' },
];
const builderNavItems = [
    { id: 'hivelab', label: 'HiveLab', icon: Plus, href: '/build', requiresBuilder: true, isNew: true },
    { id: 'my-tools', label: 'My Tools', icon: Activity, href: '/tools?filter=my' },
];
const quickActions = [
    { id: 'search', label: 'Search', icon: Search, action: 'openSearch' },
    { id: 'notifications', label: 'Notifications', icon: Bell, action: 'openNotifications' },
    { id: 'create', label: 'Create', icon: Plus, action: 'openCreate' },
];
export function MobileNavigationMenu({ user, isOpen, onClose, unreadNotifications = 0, className }) {
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    const handleNavigation = (href) => {
        router.push(href);
        onClose();
    };
    const handleAction = (action) => {
        switch (action) {
            case 'openSearch':
                // Trigger global search
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
                break;
            case 'openNotifications':
                // Open notification center
                window.dispatchEvent(new CustomEvent('toggle-notifications'));
                break;
            case 'openCreate':
                router.push('/build');
                break;
        }
        onClose();
    };
    const isActive = (href) => {
        if (href === '/')
            return pathname === '/';
        return pathname.startsWith(href);
    };
    const canAccessBuilder = user?.builderStatus === 'active' || user?.role === 'faculty' || user?.role === 'admin';
    if (!mounted)
        return null;
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, className: "fixed inset-0 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm z-40 lg:hidden", onClick: onClose }), _jsx(motion.div, { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' }, transition: { type: 'spring', damping: 30, stiffness: 300 }, className: cn("fixed left-0 top-0 bottom-0 w-80 bg-hive-background-primary border-r border-hive-border-subtle z-50 overflow-y-auto lg:hidden", className), children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-hive-border-subtle", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-hive-gold to-hive-brand-secondary rounded-lg flex items-center justify-center", children: _jsx(Building, { className: "h-4 w-4 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-hive-text-primary", children: "HIVE" }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: "Campus Network" })] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "text-hive-text-secondary hover:text-hive-text-primary", children: _jsx(X, { className: "h-5 w-5" }) })] }), user && (_jsx("div", { className: "p-6 border-b border-hive-border-subtle", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-brand-secondary)]/20 rounded-full flex items-center justify-center", children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "w-10 h-10 rounded-full object-cover" })) : (_jsx(User, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-hive-text-primary truncate", children: user.name }), _jsxs("p", { className: "text-xs text-hive-text-secondary truncate", children: ["@", user.handle] })] }), user.builderStatus === 'active' && (_jsx(Crown, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" })), user.role === 'admin' && (_jsx(Shield, { className: "h-4 w-4 text-purple-400" }))] }) })), _jsxs("div", { className: "p-6 border-b border-hive-border-subtle", children: [_jsx("h3", { className: "text-sm font-medium text-hive-text-secondary mb-3", children: "Quick Actions" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: quickActions.map((action) => {
                                            const Icon = action.icon;
                                            const hasNotificationBadge = action.id === 'notifications' && unreadNotifications > 0;
                                            return (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleAction(action.action), className: "flex flex-col items-center gap-1 h-auto py-3 text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated relative", children: [_jsx(Icon, { className: "h-5 w-5" }), _jsx("span", { className: "text-xs", children: action.label }), hasNotificationBadge && (_jsx(Badge, { className: "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-[var(--hive-text-primary)]", children: unreadNotifications > 99 ? '99+' : unreadNotifications }))] }, action.id));
                                        }) })] }), _jsx("div", { className: "flex-1 p-6", children: _jsxs("nav", { className: "space-y-1", children: [_jsx("h3", { className: "text-sm font-medium text-hive-text-secondary mb-3", children: "Navigation" }), primaryNavItems.map((item) => {
                                            const Icon = item.icon;
                                            const active = isActive(item.href);
                                            return (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleNavigation(item.href), className: cn("w-full justify-start gap-3 h-10", active
                                                    ? "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-r-2 border-hive-gold"
                                                    : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated"), children: [_jsx(Icon, { className: "h-5 w-5" }), _jsx("span", { children: item.label }), item.badge && (_jsx(Badge, { className: "ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs", children: item.badge })), item.isNew && (_jsx(Badge, { variant: "secondary", className: "ml-auto text-xs", children: "New" }))] }, item.id));
                                        }), _jsx(Separator, { className: "my-4" }), _jsx("h3", { className: "text-sm font-medium text-hive-text-secondary mb-3", children: "More" }), secondaryNavItems.map((item) => {
                                            const Icon = item.icon;
                                            const active = isActive(item.href);
                                            return (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleNavigation(item.href), className: cn("w-full justify-start gap-3 h-10", active
                                                    ? "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-r-2 border-hive-gold"
                                                    : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated"), children: [_jsx(Icon, { className: "h-5 w-5" }), _jsx("span", { children: item.label })] }, item.id));
                                        }), canAccessBuilder && (_jsxs(_Fragment, { children: [_jsx(Separator, { className: "my-4" }), _jsx("h3", { className: "text-sm font-medium text-hive-text-secondary mb-3", children: "Builder Tools" }), builderNavItems.map((item) => {
                                                    const Icon = item.icon;
                                                    const active = isActive(item.href);
                                                    return (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleNavigation(item.href), className: cn("w-full justify-start gap-3 h-10", active
                                                            ? "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-r-2 border-hive-gold"
                                                            : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated"), children: [_jsx(Icon, { className: "h-5 w-5" }), _jsx("span", { children: item.label }), item.isNew && (_jsx(Badge, { variant: "secondary", className: "ml-auto text-xs", children: "New" }))] }, item.id));
                                                })] }))] }) }), _jsx("div", { className: "p-6 border-t border-hive-border-subtle", children: _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleNavigation('/settings'), className: "w-full justify-start gap-3 h-10 text-hive-text-secondary hover:text-hive-text-primary", children: [_jsx(Settings, { className: "h-5 w-5" }), _jsx("span", { children: "Settings" })] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleNavigation('/help'), className: "w-full justify-start gap-3 h-10 text-hive-text-secondary hover:text-hive-text-primary", children: [_jsx(HelpCircle, { className: "h-5 w-5" }), _jsx("span", { children: "Help & Support" })] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
                                                // Handle logout
                                                window.location.href = '/auth/logout';
                                            }, className: "w-full justify-start gap-3 h-10 text-red-400 hover:text-red-300 hover:bg-red-500/10", children: [_jsx(LogOut, { className: "h-5 w-5" }), _jsx("span", { children: "Sign Out" })] })] }) })] }) })] })) }));
}
//# sourceMappingURL=mobile-navigation-menu.js.map