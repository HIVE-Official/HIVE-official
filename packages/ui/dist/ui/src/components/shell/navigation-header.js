"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePathname } from 'next/navigation';
import { AlignJustify, Search, Bell, Command, Zap, Settings, Hash } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { UserMenu } from './user-menu.js';
import { cn } from '../../lib/utils.js';
export function NavigationHeader({ user, currentSection = 'profile', onToggleSidebar, sidebarCollapsed, showGlobalSearch = true, showNotifications = true, showBuilderAccess = true, onOpenNotifications, onOpenCommandPalette, unreadNotificationCount = 0, height = 'compact', className }) {
    const pathname = usePathname();
    // Get current section from pathname
    const getCurrentSection = () => {
        if (pathname === '/')
            return 'feed';
        if (pathname.startsWith('/spaces'))
            return 'spaces';
        if (pathname.startsWith('/profile'))
            return 'profile';
        if (pathname.startsWith('/build'))
            return 'hivelab';
        return currentSection;
    };
    const activeSection = getCurrentSection();
    // Dynamic header heights (mobile-optimized)
    const headerHeights = {
        compact: 'h-10',
        standard: 'h-12',
        tall: 'h-16',
    };
    // Section-specific contextual info
    const sectionContext = {
        profile: { title: 'Profile', subtitle: 'Your command center' },
        spaces: { title: 'Spaces', subtitle: 'Campus containers' },
        feed: { title: 'Feed', subtitle: 'Campus pulse' },
        hivelab: { title: 'HiveLAB', subtitle: 'Builder console' },
        rituals: { title: 'Rituals', subtitle: 'Platform experiences' },
    };
    const currentContext = sectionContext[activeSection];
    return (_jsxs("header", { className: cn("fixed top-0 left-0 right-0 z-50", headerHeights[height], "backdrop-blur-xl border-b", "flex items-center justify-between", "transition-all duration-300 ease-out", className), style: {
            background: 'color-mix(in_srgb,var(--hive-background-primary)_80%,transparent)',
            backdropFilter: 'blur(4) saturate(180%)',
            borderColor: 'var(--hive-border-primary)',
            padding: `0 var(--hive-spacing-4)`,
        }, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: onToggleSidebar, className: "h-8 w-8 p-0 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: _jsx(AlignJustify, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-6 h-6 bg-[var(--hive-brand-secondary)] rounded-md flex items-center justify-center", children: _jsx(Hash, { className: "w-4 h-4 text-[var(--hive-text-inverse)]" }) }), _jsx("span", { className: "font-semibold text-base tracking-tight text-[var(--hive-text-primary)]", children: "HIVE" })] }), _jsxs("div", { className: "hidden md:flex items-center gap-2 text-[var(--hive-text-muted)]", children: [_jsx("div", { className: "w-1 h-4 bg-[var(--hive-border-primary)] rounded-full" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: currentContext.title }), height !== 'compact' && (_jsx("span", { className: "text-xs text-[var(--hive-text-muted)]", children: currentContext.subtitle }))] })] })] })] }), showGlobalSearch && (_jsx("div", { className: "flex-1 max-w-md mx-4", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", placeholder: "Search spaces, people, tools...", onClick: onOpenCommandPalette, readOnly: true, className: "w-full h-8 pl-8 pr-12 bg-[var(--hive-background-secondary)]/80 backdrop-blur-sm border border-[var(--hive-border-primary)] rounded-xl text-xs text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)]/50 focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all duration-200 cursor-pointer hover:border-[var(--hive-border-secondary)]" }), _jsx("div", { className: "absolute right-2 top-1/2 transform -translate-y-1/2", children: _jsxs("kbd", { className: "inline-flex items-center px-1 py-0.5 rounded text-xs bg-[var(--hive-background-primary)]/60 text-[var(--hive-text-muted)] border border-[var(--hive-border-subtle)]", children: [_jsx(Command, { className: "h-2 w-2 mr-0.5" }), "K"] }) })] }) })), _jsxs("div", { className: "flex items-center gap-2", children: [showBuilderAccess && user?.builderStatus !== 'none' && (_jsxs(Button, { variant: "ghost", size: "sm", className: "h-9 w-9 p-0 relative text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: [_jsx(Zap, { className: "h-4 w-4" }), user?.builderStatus === 'active' && (_jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-[var(--hive-brand-primary)] rounded-full animate-pulse" }))] })), showNotifications && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onOpenNotifications, className: "h-9 w-9 p-0 relative text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: [_jsx(Bell, { className: "h-4 w-4" }), unreadNotificationCount > 0 && (_jsx("div", { className: "absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center rounded-full font-medium bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]", children: unreadNotificationCount > 9 ? '9+' : unreadNotificationCount }))] })), _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: _jsx(Settings, { className: "h-4 w-4" }) }), user ? (_jsx(UserMenu, { user: user })) : (_jsx(Button, { size: "sm", variant: "primary", className: "font-medium", children: "Sign In" }))] })] }));
}
//# sourceMappingURL=navigation-header.js.map