"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Compass, User, Settings, Users, Calendar, Heart, AlignJustify, Hash, Library, Palette, Wrench } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { cn } from '../../lib/utils';
const navigationItems = [
    {
        id: 'dashboard',
        icon: Home,
        label: 'Dashboard',
        href: '/',
        matchPaths: ['/'],
        description: 'Your personal dashboard and activity feed'
    },
    {
        id: 'spaces',
        icon: Users,
        label: 'Spaces',
        href: '/spaces',
        matchPaths: ['/spaces'],
        description: 'Join and browse campus communities',
        children: [
            {
                id: 'spaces-browse',
                icon: Compass,
                label: 'Browse Spaces',
                href: '/spaces/browse',
                description: 'Discover new communities'
            },
            {
                id: 'spaces-my',
                icon: Heart,
                label: 'My Spaces',
                href: '/spaces/my',
                description: 'Your joined communities'
            }
        ]
    },
    {
        id: 'tools',
        icon: Palette,
        label: 'Tools',
        href: '/tools',
        matchPaths: ['/tools'],
        description: 'Browse and manage campus tools'
    },
    {
        id: 'hivelab',
        icon: Wrench,
        label: 'HiveLab',
        href: '/build',
        matchPaths: ['/build'],
        description: 'Build and deploy custom campus tools'
    },
    {
        id: 'calendar',
        icon: Calendar,
        label: 'Calendar',
        href: '/calendar',
        matchPaths: ['/calendar', '/events'],
        description: 'View your schedule and campus events'
    },
    {
        id: 'resources',
        icon: Library,
        label: 'Resources',
        href: '/resources',
        matchPaths: ['/resources'],
        description: 'Access campus resources and documentation'
    },
    {
        id: 'profile',
        icon: User,
        label: 'Profile',
        href: '/profile',
        matchPaths: ['/profile'],
        description: 'Manage your campus profile and settings'
    }
];
const bottomItems = [
    {
        id: 'settings',
        icon: Settings,
        label: 'Settings',
        href: '/settings',
        description: 'Manage your account and app preferences'
    },
];
export function NavigationSidebar({ collapsed, user, currentPath = '/', className, onToggle, onToggleNavigationMode }) {
    const router = useRouter();
    const pathname = usePathname();
    // Helper function to check if a navigation item is active
    const isItemActive = (item) => {
        const activePath = currentPath || pathname;
        if (item.href && activePath === item.href)
            return true;
        if (item.matchPaths) {
            return item.matchPaths.some(path => activePath === path || activePath.startsWith(path + '/'));
        }
        return false;
    };
    return (_jsxs("aside", { className: cn("h-screen flex-shrink-0", "transition-all duration-300 ease-out", "flex flex-col overflow-hidden", 
        // Enhanced HIVE styling
        "backdrop-blur-2xl border-r", 
        // Responsive width behavior
        collapsed
            ? "w-0 md:w-16"
            : "w-0 md:w-50", // Hidden on mobile, 50 on desktop
        className), style: {
            background: 'var(--hive-bg-secondary)',
            backdropFilter: 'blur(24px) saturate(150%)',
            borderRight: '1px solid var(--hive-border-default)',
            boxShadow: 'inset -1px 0 0 var(--hive-brand-secondary)/20',
        }, children: [_jsxs("div", { className: "px-3 py-3 border-b flex items-center justify-between", style: {
                    borderColor: 'var(--hive-border-default)',
                    background: 'linear-gradient(90deg, var(--hive-brand-secondary)/8 0%, transparent 100%)'
                }, children: [!collapsed && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-6 h-6 bg-[var(--hive-brand-secondary)] rounded-md flex items-center justify-center", children: _jsx(Hash, { className: "w-4 h-4 text-[var(--hive-text-inverse)]" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-bold tracking-wider text-[var(--hive-brand-secondary)]", children: "HIVE" }), _jsx("div", { className: "text-xs font-medium text-[var(--hive-text-tertiary)]", children: "Campus OS" })] })] })), _jsx(Button, { variant: "ghost", size: "sm", onClick: onToggle, className: "h-8 w-8 p-0 md:hidden transition-all duration-200 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] rounded-md", style: {
                            color: 'var(--hive-text-tertiary)'
                        }, children: _jsx("div", { className: "h-4 w-4", children: _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "w-4 h-0.5 bg-current transition-all duration-200" }), _jsx("div", { className: "w-4 h-0.5 bg-current transition-all duration-200" }), _jsx("div", { className: "w-4 h-0.5 bg-current transition-all duration-200" })] }) }) })] }), !collapsed && user && (_jsx("div", { className: "px-3 py-3 border-b transition-all duration-500 ease-out", style: { borderColor: 'var(--hive-border-default)' }, children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium relative overflow-hidden transition-all duration-300 ease-out", style: {
                                background: 'linear-gradient(135deg, var(--hive-brand-secondary) 0%, var(--hive-brand-secondary)/80 100%)',
                                color: 'var(--hive-text-inverse)',
                                boxShadow: '0 0.5 2 var(--hive-brand-secondary)/25'
                            }, children: user.name.charAt(0).toUpperCase() }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-sm font-medium truncate transition-colors duration-200", style: { color: 'var(--hive-text-primary)' }, children: user.name }), _jsxs("div", { className: "text-xs truncate transition-colors duration-200", style: { color: 'var(--hive-text-tertiary)' }, children: ["@", user.handle] })] })] }) })), _jsx("nav", { className: "flex-1 px-2 overflow-y-auto", children: _jsx("div", { className: "space-y-2", children: navigationItems.map((item) => (_jsx(NavigationItem, { item: item, collapsed: collapsed, isActive: isItemActive(item), router: router }, item.id))) }) }), _jsx("div", { className: "border-t px-3 py-4", style: { borderColor: 'var(--hive-border-default)' }, children: _jsxs("div", { className: "space-y-2", children: [!collapsed && onToggleNavigationMode && (_jsxs(Button, { variant: "ghost", onClick: onToggleNavigationMode, className: "w-full justify-start h-10 px-3 mb-3 transition-all duration-200 hover:bg-[var(--hive-interactive-hover)] hover:text-[var(--hive-text-primary)] text-[var(--hive-text-tertiary)] rounded-md", style: {
                                fontSize: '3.25px'
                            }, children: [_jsx(AlignJustify, { className: "h-4 w-4 mr-2" }), "Switch to Top Nav"] })), bottomItems.map((item) => (_jsx(NavigationItem, { item: item, collapsed: collapsed, isActive: isItemActive(item), router: router }, item.id)))] }) })] }));
}
function NavigationItem({ item, collapsed, isActive = false, router }) {
    const Icon = item.icon;
    const [isNavigating, setIsNavigating] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const handleClick = async () => {
        if (item.href && router) {
            setIsNavigating(true);
            try {
                await router.push(item.href);
            }
            catch (error) {
                console.error('Navigation error:', error);
            }
            finally {
                setIsNavigating(false);
            }
        }
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs(Button, { variant: "ghost", onClick: handleClick, disabled: isNavigating, className: cn("w-full transition-all duration-300 ease-out group relative overflow-hidden rounded-lg", collapsed ? "justify-center h-12 p-0" : "justify-start h-12 px-4", "hover:scale-[1.02] hover:-translate-y-0.5", isNavigating && "pointer-events-none", isActive && "shadow-lg"), style: {
                    background: isActive
                        ? 'linear-gradient(90deg, var(--hive-brand-secondary)/15 0%, var(--hive-brand-secondary)/8 100%)'
                        : 'transparent',
                    color: isActive ? 'var(--hive-brand-secondary)' : 'var(--hive-text-tertiary)',
                    border: isActive ? '1px solid var(--hive-brand-secondary)/25' : '1px solid transparent',
                    fontWeight: isActive ? '500' : '400',
                    transform: isNavigating ? 'scale(0.98)' : 'scale(1)',
                    boxShadow: isActive ? '0 1 3 var(--hive-brand-secondary)/20' : 'none',
                }, onMouseEnter: (e) => {
                    if (collapsed) {
                        setShowTooltip(true);
                    }
                    if (!isActive && !isNavigating) {
                        e.currentTarget.style.background = 'var(--hive-interactive-hover)';
                        e.currentTarget.style.color = 'var(--hive-text-primary)';
                        e.currentTarget.style.borderColor = 'var(--hive-border-hover)';
                        e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                    }
                }, onMouseLeave: (e) => {
                    setShowTooltip(false);
                    if (!isActive && !isNavigating) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--hive-text-tertiary)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }
                }, onFocus: () => {
                    if (collapsed) {
                        setShowTooltip(true);
                    }
                }, onBlur: () => {
                    setShowTooltip(false);
                }, children: [_jsxs("div", { className: cn("flex items-center justify-center rounded-lg transition-all duration-300 ease-out relative", collapsed ? "w-7 h-7" : "w-8 h-8 mr-3", isNavigating && "animate-pulse"), style: {
                            background: isActive
                                ? 'linear-gradient(135deg, var(--hive-brand-secondary) 0%, var(--hive-brand-secondary)/80 100%)'
                                : 'var(--hive-bg-tertiary)',
                            color: isActive ? 'var(--hive-text-inverse)' : 'inherit',
                            transform: isNavigating ? 'scale(0.9)' : 'scale(1)',
                        }, children: [_jsx(Icon, { className: cn("h-4 w-4 transition-all duration-300 ease-out", isNavigating && "opacity-70") }), isNavigating && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", style: { background: 'inherit' }, children: _jsx("div", { className: "w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin", style: {
                                        borderColor: isActive ? 'var(--hive-text-inverse)' : 'var(--hive-brand-secondary)',
                                        borderTopColor: 'transparent'
                                    } }) }))] }), !collapsed && (_jsx("span", { className: cn("text-sm transition-all duration-300 ease-out truncate", isActive ? "font-medium" : "font-normal", isNavigating && "opacity-70"), style: {
                            fontWeight: isActive ? '500' : '400'
                        }, children: item.label })), isActive && (_jsx("div", { className: "absolute right-2 w-1 h-6 rounded-full transition-all duration-300 ease-out", style: {
                            background: 'linear-gradient(180deg, var(--hive-brand-secondary) 0%, var(--hive-brand-secondary)/80 100%)',
                            boxShadow: '0 0 2 var(--hive-brand-secondary)/50'
                        } }))] }), collapsed && showTooltip && (_jsx("div", { className: "absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:block", style: {
                    animation: 'fadeInScale 200ms ease-out forwards'
                }, children: _jsxs("div", { className: "px-3 py-2 rounded-lg shadow-lg border backdrop-blur-md max-w-xs", style: {
                        background: 'var(--hive-bg-secondary)',
                        borderColor: 'var(--hive-border-default)',
                        color: 'var(--hive-text-primary)',
                        boxShadow: '0 8px 32px var(--hive-shadow-primary)/20'
                    }, children: [_jsx("div", { className: "font-medium text-sm mb-1", style: { color: 'var(--hive-text-primary)' }, children: item.label }), item.description && (_jsx("div", { className: "text-xs leading-relaxed", style: {
                                color: 'var(--hive-text-secondary)',
                                whiteSpace: 'normal',
                                wordWrap: 'break-word'
                            }, children: item.description })), _jsx("div", { className: "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1", style: {
                                width: 0,
                                height: 0,
                                borderTop: '6px solid transparent',
                                borderBottom: '6px solid transparent',
                                borderRight: '6px solid var(--hive-bg-secondary)',
                            } })] }) }))] }));
}
//# sourceMappingURL=navigation-sidebar.js.map