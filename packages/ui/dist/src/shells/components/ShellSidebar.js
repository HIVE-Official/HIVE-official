'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * ShellSidebar - CLEAN VERSION
 * Minimal, focused sidebar with reduced clutter
 */
import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { MotionDiv, MotionButton, MotionAside, AnimatePresence } from '../motion-safe';
import { ChevronRight } from 'lucide-react';
// HIVE Refined Easing
const HIVE_EASING = {
    entrance: [0.16, 1, 0.3, 1],
    reveal: [0.23, 1, 0.32, 1],
    interactive: [0.25, 0.46, 0.45, 0.94],
    layout: [0.4, 0, 0.2, 1],
};
// Helper: Check if path is active
const isPathActive = (currentPath, targetPath) => {
    if (!targetPath || !currentPath)
        return false;
    const normalizedTarget = targetPath.split('?')[0];
    if (normalizedTarget === '/')
        return currentPath === '/';
    return currentPath === normalizedTarget || currentPath.startsWith(`${normalizedTarget}/`);
};
export function ShellSidebar({ navItems, mySpaces, onNavigate, isOpen, onToggle, isMobile, headerStyle = 'default', renderUserMenu, }) {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState({});
    // Flatten all spaces into a single list (no sections)
    const allSpaces = useMemo(() => {
        return mySpaces.flatMap((section) => section.spaces);
    }, [mySpaces]);
    const handleNavigate = (path) => {
        if (path) {
            onNavigate(path);
            if (isMobile)
                onToggle();
        }
    };
    const toggleExpand = (id) => {
        setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    // Render single nav item
    const renderNavItem = (item, depth = 0) => {
        const isActive = isPathActive(pathname, item.path);
        const hasChildren = (item.children?.length ?? 0) > 0;
        const isExpanded = expandedItems[item.id] ?? false;
        const Icon = item.icon;
        return (_jsxs("div", { children: [_jsxs(MotionButton, { type: "button", className: `group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-300 ${isActive
                        ? 'bg-white/[0.08] text-white shadow-[0_0_20px_rgba(255,215,0,0.1)]'
                        : 'text-white/70 hover:bg-white/[0.04] hover:text-white'}`, onClick: () => {
                        if (hasChildren) {
                            toggleExpand(item.id);
                        }
                        else {
                            handleNavigate(item.path);
                        }
                    }, initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.4, delay: depth * 0.05, ease: HIVE_EASING.reveal }, children: [Icon && _jsx(Icon, { className: "h-5 w-5 flex-shrink-0", strokeWidth: isActive ? 2.5 : 2 }), _jsx("span", { className: "flex-1 text-sm font-medium", children: item.label }), item.badge && item.badge > 0 && (_jsx("span", { className: "flex h-5 min-w-[20px] items-center justify-center rounded-full bg-hive-brand-primary px-1.5 text-[11px] font-semibold text-black", children: item.badge > 9 ? '9+' : item.badge })), hasChildren && (_jsx(ChevronRight, { className: `h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}` }))] }), hasChildren && isExpanded && (_jsx(MotionDiv, { className: "mt-1 space-y-1 pl-8", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3, ease: HIVE_EASING.reveal }, children: item.children?.map((child) => renderNavItem(child, depth + 1)) }))] }, item.id));
    };
    // Render space - SIMPLIFIED (no meta, no badges, just dot + name)
    const renderSpace = (space) => {
        const statusColor = space.status === 'live'
            ? 'bg-emerald-400'
            : space.status === 'new'
                ? 'bg-amber-400'
                : 'bg-white/30';
        return (_jsxs(MotionButton, { type: "button", className: "group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-white/80 transition-all duration-300 hover:bg-white/[0.04] hover:text-white", onClick: () => handleNavigate(space.href), initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: HIVE_EASING.reveal }, children: [_jsx("span", { className: `h-2 w-2 flex-shrink-0 rounded-full ${statusColor}` }), _jsx("span", { className: "truncate font-medium", children: space.label })] }, space.id));
    };
    return (_jsxs(_Fragment, { children: [_jsx(AnimatePresence, { children: isMobile && isOpen && (_jsx(MotionDiv, { className: "fixed inset-0 bg-black/30 z-40 lg:hidden", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.4, ease: HIVE_EASING.reveal }, onClick: onToggle })) }), _jsxs(MotionAside, { className: `fixed ${headerStyle === 'hidden' ? 'top-0' : 'top-16'} left-0 bottom-0 z-40 w-64 overflow-hidden`, initial: false, animate: {
                    x: isOpen ? 0 : -264,
                    opacity: isOpen ? 1 : 0,
                }, transition: { duration: 0.6, ease: HIVE_EASING.layout }, children: [_jsx("div", { className: "absolute inset-0 bg-black/90 backdrop-blur-sm border-r border-white/8 shadow-[2px_0_12px_rgba(0,0,0,0.15)]" }), _jsxs("nav", { className: "relative z-10 flex h-full flex-col", children: [_jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-8", children: [_jsx("section", { className: "space-y-1", children: navItems.map((item) => renderNavItem(item)) }), allSpaces.length > 0 && (_jsxs("section", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between px-3", children: [_jsx("span", { className: "text-[10px] font-medium uppercase tracking-[0.18em] text-white/50", children: "My Spaces" }), _jsx("span", { className: "text-[10px] font-medium text-white/40", children: allSpaces.length })] }), _jsxs("div", { className: "space-y-1", children: [allSpaces.slice(0, 8).map((space) => renderSpace(space)), allSpaces.length > 8 && (_jsxs("button", { className: "w-full px-3 py-2 text-xs text-white/50 hover:text-white/70 transition-colors", onClick: () => handleNavigate('/spaces'), children: ["+", allSpaces.length - 8, " more"] }))] })] }))] }), _jsx("div", { className: "border-t border-white/8 p-3", children: renderUserMenu?.({ variant: 'sidebar', onNavigate: handleNavigate }) })] })] })] }));
}
//# sourceMappingURL=ShellSidebar.js.map