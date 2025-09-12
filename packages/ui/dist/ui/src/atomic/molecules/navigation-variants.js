'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
import { Home, User, Compass, Zap } from 'lucide-react';
const coreItems = [
    { id: 'feed', icon: Home, label: 'Feed', href: '/' },
    { id: 'spaces', icon: Compass, label: 'Spaces', href: '/spaces' },
    { id: 'hivelab', icon: Zap, label: 'HiveLab', href: '/hivelab' },
    { id: 'profile', icon: User, label: 'Profile', href: '/profile' }
];
// 1. Minimal Floating Sidebar
export const MinimalFloatingSidebar = ({ currentPath = '/', onItemClick, user, className }) => {
    const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '';
    return (_jsx("div", { className: cn('fixed left-4 top-1/2 -translate-y-1/2 z-50', 'w-16 bg-[var(--hive-background-primary)]/95 backdrop-blur-xl', 'border border-[var(--hive-border-default)]/50', 'rounded-3xl shadow-2xl', className), children: _jsxs("div", { className: "p-3 space-y-2", children: [user && (_jsx("div", { className: "w-10 h-10 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-xs font-bold text-[var(--hive-text-primary)] mb-4", children: initials })), coreItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
                    return (_jsx("button", { onClick: () => onItemClick?.(item.href), className: cn('w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200', isActive
                            ? 'bg-[var(--hive-brand-secondary)] shadow-lg shadow-[var(--hive-brand-secondary)]/25'
                            : 'bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-background-tertiary)]'), children: _jsx(Icon, { className: cn('h-5 w-5', isActive ? 'text-[var(--hive-text-inverse)]' : 'text-[var(--hive-text-secondary)]') }) }, item.id));
                })] }) }));
};
// 2. Clean Vertical Sidebar
export const CleanVerticalSidebar = ({ currentPath = '/', onItemClick, user, className }) => {
    const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '';
    return (_jsx("aside", { className: cn('w-64 h-screen bg-[var(--hive-background-primary)] border-r border-[var(--hive-border-default)]', className), children: _jsxs("div", { className: "p-6 space-y-6", children: [user && (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)]", children: initials }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-[var(--hive-text-primary)]", children: user.name }), _jsxs("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["@", user.handle] })] })] })), _jsx("nav", { className: "space-y-2", children: coreItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
                        return (_jsxs("button", { onClick: () => onItemClick?.(item.href), className: cn('w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200', isActive
                                ? 'bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/20'
                                : 'text-[var(--hive-text-secondary)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]'), children: [_jsx(Icon, { className: "h-5 w-5 flex-shrink-0" }), _jsx("span", { className: "font-medium", children: item.label })] }, item.id));
                    }) })] }) }));
};
// 3. Top Horizontal Navigation
export const TopHorizontalNav = ({ currentPath = '/', onItemClick, user, className }) => {
    const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '';
    return (_jsxs("nav", { className: cn('w-full h-16 bg-[var(--hive-background-primary)] border-b border-[var(--hive-border-default)]', 'flex items-center justify-between px-6', className), children: [_jsx("div", { className: "flex items-center space-x-2", children: coreItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
                    return (_jsxs("button", { onClick: () => onItemClick?.(item.href), className: cn('flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-200', isActive
                            ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)] shadow-lg'
                            : 'text-[var(--hive-text-secondary)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]'), children: [_jsx(Icon, { className: "h-4 w-4" }), _jsx("span", { className: "font-medium text-sm", children: item.label })] }, item.id));
                }) }), user && (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: user.name }), _jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: ["@", user.handle] })] }), _jsx("div", { className: "w-10 h-10 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)]", children: initials })] }))] }));
};
// 4. Bottom Tab Navigation (Mobile-style)
export const BottomTabNav = ({ currentPath = '/', onItemClick, className }) => {
    return (_jsx("nav", { className: cn('fixed bottom-0 left-0 right-0 z-50', 'h-20 bg-[var(--hive-background-primary)]/95 backdrop-blur-xl', 'border-t border-[var(--hive-border-default)]', 'flex items-center justify-around px-4', className), children: coreItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
            return (_jsxs("button", { onClick: () => onItemClick?.(item.href), className: cn('flex flex-col items-center space-y-1 p-2 rounded-2xl transition-all duration-200', isActive
                    ? 'text-[var(--hive-brand-secondary)]'
                    : 'text-[var(--hive-text-secondary)]'), children: [_jsx("div", { className: cn('w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200', isActive
                            ? 'bg-[var(--hive-brand-secondary)]/10 border border-[var(--hive-brand-secondary)]/20'
                            : 'bg-transparent'), children: _jsx(Icon, { className: "h-5 w-5" }) }), _jsx("span", { className: "text-xs font-medium", children: item.label })] }, item.id));
        }) }));
};
// 5. Compact Icon Rail
export const CompactIconRail = ({ currentPath = '/', onItemClick, user, className }) => {
    const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '';
    return (_jsxs("aside", { className: cn('w-20 h-screen bg-[var(--hive-background-primary)] border-r border-[var(--hive-border-default)]', 'flex flex-col items-center py-6', className), children: [user && (_jsx("div", { className: "w-12 h-12 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)] mb-6", children: initials })), _jsx("div", { className: "space-y-4", children: coreItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
                    return (_jsxs("button", { onClick: () => onItemClick?.(item.href), className: cn('w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 relative group', isActive
                            ? 'bg-[var(--hive-brand-secondary)] shadow-lg shadow-[var(--hive-brand-secondary)]/25'
                            : 'bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-background-tertiary)]'), children: [_jsx(Icon, { className: cn('h-5 w-5', isActive ? 'text-[var(--hive-text-inverse)]' : 'text-[var(--hive-text-secondary)]') }), _jsx("div", { className: "absolute left-full ml-2 px-2 py-1 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-xs font-medium text-[var(--hive-text-primary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none", children: item.label })] }, item.id));
                }) })] }));
};
//# sourceMappingURL=navigation-variants.js.map