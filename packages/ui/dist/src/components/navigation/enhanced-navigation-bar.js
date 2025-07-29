"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlignJustify, Search, Bell, Command, Zap, Settings, ChevronDown, Users, Home, BookOpen, Code, Compass, Star, Plus, Bookmark, Activity, Coffee, Globe, Headphones, MessageSquare, Camera, PenTool, Layers, Database, BarChart3, GitBranch, Shield, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system.js';
// Default navigation structure with nested items
const defaultNavigationItems = [
    {
        id: 'spaces',
        label: 'Spaces',
        icon: _jsx(Users, { size: 16 }),
        children: [
            {
                id: 'my-spaces',
                label: 'My Spaces',
                icon: _jsx(Home, { size: 14 }),
                href: '/spaces',
                description: 'Spaces you\'re a member of'
            },
            {
                id: 'discover-spaces',
                label: 'Discover',
                icon: _jsx(Compass, { size: 14 }),
                href: '/spaces/discover',
                description: 'Find new spaces to join'
            },
            {
                id: 'create-space',
                label: 'Create Space',
                icon: _jsx(Plus, { size: 14 }),
                href: '/spaces/create',
                description: 'Start a new space',
                featured: true
            },
            {
                id: 'space-categories',
                label: 'Categories',
                icon: _jsx(Layers, { size: 14 }),
                children: [
                    {
                        id: 'academic',
                        label: 'Academic',
                        icon: _jsx(BookOpen, { size: 12 }),
                        href: '/spaces/category/academic'
                    },
                    {
                        id: 'social',
                        label: 'Social',
                        icon: _jsx(Coffee, { size: 12 }),
                        href: '/spaces/category/social'
                    },
                    {
                        id: 'professional',
                        label: 'Professional',
                        icon: _jsx(Star, { size: 12 }),
                        href: '/spaces/category/professional'
                    },
                    {
                        id: 'creative',
                        label: 'Creative',
                        icon: _jsx(Camera, { size: 12 }),
                        href: '/spaces/category/creative'
                    }
                ]
            }
        ]
    },
    {
        id: 'hivelab',
        label: 'HiveLab',
        icon: _jsx(Zap, { size: 16 }),
        children: [
            {
                id: 'builder-console',
                label: 'Builder Console',
                icon: _jsx(Code, { size: 14 }),
                href: '/hivelab/console',
                description: 'Manage your tools and projects'
            },
            {
                id: 'tool-templates',
                label: 'Templates',
                icon: _jsx(PenTool, { size: 14 }),
                href: '/hivelab/templates',
                description: 'Pre-built tool templates'
            },
            {
                id: 'analytics',
                label: 'Analytics',
                icon: _jsx(BarChart3, { size: 14 }),
                href: '/hivelab/analytics',
                description: 'Usage insights and metrics'
            },
            {
                id: 'builder-tools',
                label: 'Builder Tools',
                icon: _jsx(GitBranch, { size: 14 }),
                children: [
                    {
                        id: 'visual-builder',
                        label: 'Visual Builder',
                        icon: _jsx(Layers, { size: 12 }),
                        href: '/hivelab/build/visual',
                        featured: true
                    },
                    {
                        id: 'code-editor',
                        label: 'Code Editor',
                        icon: _jsx(Code, { size: 12 }),
                        href: '/hivelab/build/code'
                    },
                    {
                        id: 'database',
                        label: 'Database Tools',
                        icon: _jsx(Database, { size: 12 }),
                        href: '/hivelab/build/database'
                    }
                ]
            }
        ]
    },
    {
        id: 'feed',
        label: 'Feed',
        icon: _jsx(Activity, { size: 16 }),
        children: [
            {
                id: 'home-feed',
                label: 'Home',
                icon: _jsx(Home, { size: 14 }),
                href: '/feed',
                description: 'Your personalized activity feed'
            },
            {
                id: 'trending',
                label: 'Trending',
                icon: _jsx(Sparkles, { size: 14 }),
                href: '/feed/trending',
                description: 'Popular content across campus'
            },
            {
                id: 'bookmarks',
                label: 'Bookmarks',
                icon: _jsx(Bookmark, { size: 14 }),
                href: '/feed/bookmarks',
                description: 'Saved posts and content'
            },
            {
                id: 'discussions',
                label: 'Discussions',
                icon: _jsx(MessageSquare, { size: 14 }),
                href: '/feed/discussions',
                description: 'Active conversations'
            }
        ]
    },
    {
        id: 'resources',
        label: 'Resources',
        icon: _jsx(BookOpen, { size: 16 }),
        children: [
            {
                id: 'help-center',
                label: 'Help Center',
                icon: _jsx(Headphones, { size: 14 }),
                href: '/help',
                description: 'Documentation and guides'
            },
            {
                id: 'community',
                label: 'Community',
                icon: _jsx(Globe, { size: 14 }),
                href: '/community',
                description: 'Connect with other users'
            },
            {
                id: 'campus-guide',
                label: 'Campus Guide',
                icon: _jsx(Compass, { size: 14 }),
                href: '/guide',
                description: 'Navigate your institution'
            }
        ]
    }
];
// Dropdown menu animation variants
const dropdownVariants = {
    hidden: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing
        }
    }
};
const submenuVariants = {
    hidden: {
        opacity: 0,
        x: -10,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing
        }
    }
};
// Dropdown Menu Component
function DropdownMenu({ trigger, items, isOpen, onToggle, onClose }) {
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const menuRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
                setActiveSubmenu(null);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);
    const renderNavItem = (item, level = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isSubmenuActive = activeSubmenu === item.id;
        return (_jsxs("div", { className: "relative", children: [_jsx(motion.button, { className: cn("w-full flex items-center justify-between px-3 py-2.5 text-left text-sm rounded-lg transition-colors", level === 0 ? "hover:bg-[var(--hive-text-primary)]/10" : "hover:bg-[var(--hive-text-primary)]/5", item.featured && "bg-yellow-500/10 border border-yellow-500/20", item.disabled && "opacity-50 cursor-not-allowed"), onClick: () => {
                        if (hasChildren) {
                            setActiveSubmenu(isSubmenuActive ? null : item.id);
                        }
                        else {
                            item.onClick?.();
                            onClose();
                        }
                    }, onMouseEnter: () => hasChildren && setActiveSubmenu(item.id), disabled: item.disabled, whileHover: { x: level === 0 ? 2 : 1 }, whileTap: { scale: 0.98 }, children: _jsxs("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: [item.icon && (_jsx("div", { className: cn("text-current shrink-0", item.featured && "text-yellow-400"), children: item.icon })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: cn("font-medium truncate", level === 0 ? "text-[var(--hive-text-primary)]" : "text-[var(--hive-text-primary)]/90", item.featured && "text-yellow-400"), children: item.label }), item.description && level === 0 && (_jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/60 truncate mt-0.5", children: item.description }))] }), item.badge && (_jsx("span", { className: "bg-yellow-500/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0", children: item.badge })), hasChildren && (_jsx(ChevronDown, { className: cn("w-4 h-4 transition-transform shrink-0", level > 0 ? "rotate-[-90deg]" : "", isSubmenuActive && level === 0 && "rotate-180") }))] }) }), hasChildren && (_jsx(AnimatePresence, { children: isSubmenuActive && (_jsx(motion.div, { className: cn(level === 0
                            ? "absolute left-full top-0 ml-1 w-64 bg-[var(--hive-background-primary)]/90 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl z-50"
                            : "mt-1 ml-6 space-y-1"), variants: level === 0 ? submenuVariants : dropdownVariants, initial: "hidden", animate: "visible", exit: "hidden", children: item.children.map(child => renderNavItem(child, level + 1)) })) }))] }, item.id));
    };
    return (_jsxs("div", { className: "relative", ref: menuRef, children: [_jsx("div", { onClick: onToggle, children: trigger }), _jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { className: "absolute top-full left-0 mt-2 w-80 bg-[var(--hive-background-primary)]/90 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl z-50", variants: dropdownVariants, initial: "hidden", animate: "visible", exit: "hidden", children: _jsx("div", { className: "space-y-1", children: items.map(item => renderNavItem(item)) }) })) })] }));
}
// User Menu Component
function UserMenu({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const userMenuItems = [
        {
            id: 'profile',
            label: 'Profile',
            icon: _jsx(Users, { size: 14 }),
            href: '/profile',
            description: 'View and edit your profile'
        },
        {
            id: 'account',
            label: 'Account Settings',
            icon: _jsx(Settings, { size: 14 }),
            children: [
                {
                    id: 'privacy',
                    label: 'Privacy',
                    icon: _jsx(Shield, { size: 12 }),
                    href: '/settings/privacy'
                },
                {
                    id: 'notifications',
                    label: 'Notifications',
                    icon: _jsx(Bell, { size: 12 }),
                    href: '/settings/notifications'
                },
                {
                    id: 'preferences',
                    label: 'Preferences',
                    icon: _jsx(Settings, { size: 12 }),
                    href: '/settings/preferences'
                }
            ]
        },
        {
            id: 'logout',
            label: 'Sign Out',
            icon: _jsx(Users, { size: 14 }),
            onClick: () => console.log('Logout')
        }
    ];
    const userInitial = user.avatar || user.name[0] || 'U';
    return (_jsx(DropdownMenu, { trigger: _jsxs("button", { className: "flex items-center space-x-2 p-1 rounded-lg hover:bg-[var(--hive-text-primary)]/10 transition-colors", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[var(--hive-background-primary)] text-sm font-medium", children: userInitial }), _jsx(ChevronDown, { className: "w-4 h-4 text-[var(--hive-text-primary)]/60" })] }), items: userMenuItems, isOpen: isOpen, onToggle: () => setIsOpen(!isOpen), onClose: () => setIsOpen(false) }));
}
// Main Enhanced Navigation Bar
export function EnhancedNavigationBar({ user, onToggleSidebar, sidebarCollapsed, showGlobalSearch = true, showNotifications = true, onOpenNotifications, onOpenCommandPalette, unreadNotificationCount = 0, className, navigationItems = defaultNavigationItems, onToggleNavigationMode }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const closeAllDropdowns = () => {
        setOpenDropdown(null);
    };
    return (_jsxs("header", { className: cn("fixed top-0 left-0 right-0 z-50 h-16", "backdrop-blur-xl border-b", "flex items-center justify-between px-6", "transition-all duration-300 ease-out", className), style: {
            background: 'color-mix(in_srgb,var(--hive-background-primary)_80%,transparent)',
            backdropFilter: 'blur(4) saturate(180%)',
            borderColor: 'var(--hive-interactive-active)',
        }, children: [_jsxs("div", { className: "flex items-center space-x-6", children: [onToggleSidebar && (_jsx("button", { onClick: onToggleSidebar, className: "p-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors", children: _jsx(AlignJustify, { className: "w-5 h-5" }) })), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center", children: _jsx("div", { className: "w-4 h-4 bg-[var(--hive-background-primary)] rounded-sm" }) }), _jsx("span", { className: "font-bold text-xl text-[var(--hive-text-primary)] tracking-tight", children: "HIVE" })] }), _jsx("nav", { className: "hidden md:flex items-center space-x-1", children: navigationItems.map((item) => (_jsx(DropdownMenu, { trigger: _jsxs("button", { className: "flex items-center space-x-1 px-3 py-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors", children: [item.icon, _jsx("span", { className: "font-medium", children: item.label }), item.children && (_jsx(ChevronDown, { className: "w-4 h-4 ml-1" }))] }), items: item.children || [], isOpen: openDropdown === item.id, onToggle: () => setOpenDropdown(openDropdown === item.id ? null : item.id), onClose: closeAllDropdowns }, item.id))) })] }), showGlobalSearch && (_jsx("div", { className: "flex-1 max-w-md mx-8", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-primary)]/40" }), _jsx("input", { type: "text", placeholder: "Search spaces, people, tools...", onClick: onOpenCommandPalette, readOnly: true, className: "w-full h-10 pl-10 pr-16 bg-[var(--hive-text-primary)]/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm text-[var(--hive-text-primary)] placeholder-white/40 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 cursor-pointer hover:border-white/30" }), _jsx("div", { className: "absolute right-2 top-1/2 transform -translate-y-1/2", children: _jsxs("kbd", { className: "inline-flex items-center px-1.5 py-0.5 rounded-lg text-xs bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/60 border border-white/20", children: [_jsx(Command, { className: "w-3 h-3 mr-1" }), "K"] }) })] }) })), _jsxs("div", { className: "flex items-center space-x-3", children: [onToggleNavigationMode && (_jsx("button", { onClick: onToggleNavigationMode, className: "p-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors", title: "Switch to Sidebar Navigation", children: _jsx(AlignJustify, { className: "w-5 h-5" }) })), user?.builderStatus !== 'none' && (_jsxs("button", { className: "p-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors relative", children: [_jsx(Zap, { className: "w-5 h-5" }), user?.builderStatus === 'active' && (_jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" }))] })), showNotifications && (_jsxs("button", { onClick: onOpenNotifications, className: "p-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors relative", children: [_jsx(Bell, { className: "w-5 h-5" }), unreadNotificationCount > 0 && (_jsx("div", { className: "absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center rounded-full font-medium bg-yellow-400 text-[var(--hive-background-primary)]", children: unreadNotificationCount > 9 ? '9+' : unreadNotificationCount }))] })), _jsx("button", { className: "p-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors", children: _jsx(Settings, { className: "w-5 h-5" }) }), user ? (_jsx(UserMenu, { user: user })) : (_jsx("button", { className: "px-4 py-2 bg-yellow-400 text-[var(--hive-background-primary)] rounded-lg font-medium hover:bg-yellow-300 transition-colors", children: "Sign In" }))] })] }));
}
//# sourceMappingURL=enhanced-navigation-bar.js.map