"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { cn } from '../../lib/utils.js';
import { motion } from '../framer-motion-proxy.js';
import { User, Search, Bell, ChevronDown, MapPin, Building, Coffee, Beaker } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { useNavigation, NavigationContainer, NavigationBrand } from './hive-navigation-system.js';
import { HiveLogo } from '../hive-logo.js';
// ============================================================================
// CAMPUS BAR - TOP NAVIGATION
// ============================================================================
export function CampusBar() {
    const { user, searchOpen, setSearchOpen } = useNavigation();
    const [builderMode, setBuilderMode] = useState(false);
    // Campus metaphor navigation items
    const campusAreas = [
        {
            id: 'feed',
            label: 'Feed',
            description: 'The quad where everyone gathers',
            icon: Coffee,
            href: '/feed',
            isActive: false
        },
        {
            id: 'spaces',
            label: 'Spaces',
            description: 'Buildings you enter for focused work',
            icon: Building,
            href: '/spaces',
            isActive: false
        },
        {
            id: 'profile',
            label: 'Profile',
            description: 'Your dorm room - your personal space',
            icon: User,
            href: '/profile',
            isActive: false
        }
    ];
    return (_jsx(NavigationContainer, { className: "sticky top-0 z-50 backdrop-blur-xl border-b", style: {
            backgroundColor: 'var(--hive-background-primary)',
            backdropFilter: 'blur(3) saturate(180%)',
            borderColor: 'var(--hive-border-primary)',
        }, children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsx(NavigationBrand, { logo: _jsx(HiveLogo, { size: "md", variant: "gold" }), href: "/", className: "mr-8" }), _jsx("div", { className: "flex items-center space-x-1", children: campusAreas.map((area) => {
                            const Icon = area.icon;
                            return (_jsxs(motion.button, { className: cn("flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-200", "hover:bg-[var(--hive-interactive-hover)]", area.isActive && "bg-[var(--hive-overlay-gold-subtle)] text-[var(--hive-brand-primary)]"), style: {
                                    color: area.isActive ? 'var(--hive-brand-primary)' : 'var(--hive-text-primary)'
                                }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Icon, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: area.label })] }, area.id));
                        }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(motion.button, { onClick: () => setBuilderMode(!builderMode), className: cn("flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all duration-300", builderMode
                                    ? "bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)] border-[var(--hive-brand-primary)]"
                                    : "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]"), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Beaker, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium text-sm", children: "HiveLAB" }), !builderMode && (_jsx(motion.div, { className: "w-2 h-2 rounded-full", style: { backgroundColor: 'var(--hive-brand-primary)' }, animate: { opacity: [1, 0.5, 1] }, transition: { duration: 1.5, repeat: Infinity } }))] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setSearchOpen(true), className: "text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: _jsx(Search, { className: "w-4 h-4" }) }), _jsxs(Button, { variant: "ghost", size: "sm", className: "relative text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: [_jsx(Bell, { className: "w-4 h-4" }), _jsx(motion.div, { className: "absolute -top-1 -right-1 w-3 h-3 rounded-full", style: { backgroundColor: 'var(--hive-status-error)' }, animate: { scale: [1, 1.2, 1] }, transition: { duration: 2, repeat: Infinity } })] }), user && (_jsxs(Button, { variant: "ghost", size: "sm", className: "flex items-center space-x-2 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: [_jsx("div", { className: "w-8 h-8 rounded-full flex items-center justify-center", style: { backgroundColor: 'var(--hive-background-secondary)' }, children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "w-8 h-8 rounded-full" })) : (_jsx(User, { className: "w-4 h-4" })) }), _jsx("span", { className: "hidden sm:block text-sm font-medium", children: user.name.split(' ')[0] }), _jsx(ChevronDown, { className: "w-3 h-3" })] }))] })] }) }) }));
}
export function ContextBreadcrumbs({ items, className }) {
    return (_jsxs("nav", { className: cn("flex items-center space-x-2 text-sm", className), children: [_jsx(MapPin, { className: "w-4 h-4", style: { color: 'var(--hive-text-muted)' } }), items.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === items.length - 1;
                return (_jsxs(React.Fragment, { children: [_jsxs("div", { className: "flex items-center gap-1", children: [Icon && _jsx(Icon, { className: "w-3 h-3" }), item.href ? (_jsx("a", { href: item.href, className: "hover:text-[var(--hive-brand-primary)] transition-colors", style: {
                                        color: isLast ? 'var(--hive-text-primary)' : 'var(--hive-text-muted)'
                                    }, children: item.label })) : (_jsx("span", { style: {
                                        color: isLast ? 'var(--hive-text-primary)' : 'var(--hive-text-muted)'
                                    }, children: item.label }))] }), !isLast && (_jsx("span", { style: { color: 'var(--hive-text-muted)' }, children: "/" }))] }, item.id));
            })] }));
}
export function SixSurfacesTabBar({ surfaces, onSurfaceChange, className }) {
    return (_jsx("div", { className: cn("flex items-center space-x-1 p-1 rounded-2xl border backdrop-blur-sm", className), style: {
            backgroundColor: 'var(--hive-background-secondary)',
            borderColor: 'var(--hive-border-primary)'
        }, children: surfaces.map((surface) => {
            const Icon = surface.icon;
            return (_jsxs(motion.button, { onClick: () => onSurfaceChange?.(surface.id), className: cn("flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 relative", surface.isActive
                    ? "bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]"
                    : "text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Icon, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium text-sm", children: surface.label }), surface.count && surface.count > 0 && (_jsx("span", { className: "px-2 py-1 text-xs rounded-full font-medium", style: {
                            backgroundColor: surface.isActive
                                ? 'var(--hive-background-primary)'
                                : 'var(--hive-background-tertiary)',
                            color: surface.isActive
                                ? 'var(--hive-text-primary)'
                                : 'var(--hive-text-muted)'
                        }, children: surface.count }))] }, surface.id));
        }) }));
}
export function CampusLayoutShell({ children, breadcrumbs, surfaces, onSurfaceChange, className }) {
    return (_jsxs("div", { className: cn("min-h-screen", className), children: [_jsx(CampusBar, {}), (breadcrumbs || surfaces) && (_jsx("div", { className: "border-b px-4 sm:px-6 lg:px-8 py-3", style: { borderColor: 'var(--hive-border-subtle)' }, children: _jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [breadcrumbs && (_jsx(ContextBreadcrumbs, { items: breadcrumbs })), surfaces && (_jsx(SixSurfacesTabBar, { surfaces: surfaces, onSurfaceChange: onSurfaceChange }))] }) })), _jsx("main", { className: "flex-1", children: children })] }));
}
//# sourceMappingURL=hive-campus-navigation.js.map