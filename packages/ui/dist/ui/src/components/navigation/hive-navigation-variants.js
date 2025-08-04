"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Menu, Search, Bell, User, Command, ChevronDown, X, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { semantic } from '@hive/tokens';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { useNavigation, NavigationContainer, NavigationBrand } from './hive-navigation-system.js';
import { HiveLogo, HiveGlyphOnly } from '../hive-logo.js';
import { HiveNavigationItem, HiveNavigationSection, HiveNavigationCreateButton } from './hive-navigation-item.js';
export function SidebarNavigation() {
    const { config, sections, isCollapsed, setCollapsed, navigate } = useNavigation();
    const sidebarWidth = {
        compact: isCollapsed ? 'w-16' : 'w-48',
        standard: isCollapsed ? 'w-16' : 'w-64',
        expanded: isCollapsed ? 'w-20' : 'w-80'
    };
    return (_jsxs(NavigationContainer, { className: cn("fixed left-0 top-0 h-full backdrop-blur-xl z-40", "transition-all duration-300 ease-out", sidebarWidth[config.size], "flex flex-col"), style: {
            backgroundColor: 'var(--hive-background-primary)',
            backdropFilter: 'blur(3) saturate(180%)',
            borderRight: `1px solid var(--hive-border-primary)`,
        }, children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b", style: { borderColor: 'var(--hive-border-primary)' }, children: [config.showBranding && (_jsx(NavigationBrand, { logo: isCollapsed ? _jsx(HiveGlyphOnly, { size: "md", variant: "gold" }) : _jsx(HiveLogo, { size: "md", variant: "gold" }), title: !isCollapsed ? "HIVE" : undefined, subtitle: !isCollapsed ? "Campus Platform" : undefined, href: "/" })), config.collapsible && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setCollapsed(!isCollapsed), className: "h-8 w-8 p-0 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: _jsx(Menu, { className: "h-4 w-4" }) }))] }), _jsx("div", { className: "flex-1 overflow-y-auto py-4", children: sections.map((section) => (_jsxs("div", { className: "mb-6", children: [_jsx(HiveNavigationSection, { label: section.label, collapsed: isCollapsed }), _jsx("div", { className: "space-y-1 px-2", children: section.items.map((item) => (_jsx(HiveNavigationItem, { item: item, isActive: item.isActive, isCollapsed: isCollapsed, onNavigate: navigate }, item.id))) })] }, section.id))) }), _jsx("div", { className: "p-4 border-t space-y-2", style: { borderColor: 'var(--hive-border-primary)' }, children: _jsx(HiveNavigationCreateButton, { collapsed: isCollapsed, onClick: () => navigate({ id: 'create', label: 'Create' }) }) })] }));
}
// ============================================================================
// TOPBAR NAVIGATION VARIANT
// ============================================================================
export function TopbarNavigation() {
    const { config, sections, user, searchOpen, setSearchOpen, navigate } = useNavigation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // Flatten sections for topbar display
    const allItems = sections.flatMap(section => section.items);
    const primaryItems = allItems.slice(0, 5); // Show first 5 items
    const secondaryItems = allItems.slice(5);
    return (_jsxs(NavigationContainer, { className: cn("sticky top-0 z-50 backdrop-blur-xl", config.position === 'fixed' && "fixed top-0 left-0 right-0"), style: {
            backgroundColor: 'var(--hive-background-primary)',
            backdropFilter: 'blur(3) saturate(180%)',
            borderBottom: `1px solid var(--hive-border-primary)`,
        }, children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsxs("div", { className: "flex items-center", children: [config.showBranding && (_jsx(NavigationBrand, { logo: _jsx(HiveLogo, { size: "md", variant: "gold" }), href: "/", className: "mr-8" })), _jsxs("div", { className: "hidden md:flex items-center space-x-1", children: [primaryItems.map((item) => (_jsx(HiveNavigationItem, { item: item, isActive: item.isActive, onNavigate: navigate, size: "sm", className: "rounded-2xl" }, item.id))), secondaryItems.length > 0 && (_jsx(Button, { variant: "ghost", size: "sm", className: "p-2 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) }))] })] }), config.showSearch && (_jsx("div", { className: "flex-1 max-w-lg mx-8 hidden lg:block", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4", style: { color: 'var(--hive-text-muted)' } }), _jsx("input", { type: "text", placeholder: "Search spaces, people, tools...", onClick: () => setSearchOpen(true), readOnly: true, className: "w-full h-9 pl-10 pr-16 rounded-full border transition-all duration-200 cursor-pointer backdrop-blur-sm", style: {
                                            backgroundColor: 'var(--hive-background-secondary)',
                                            borderColor: 'var(--hive-border-primary)',
                                            color: 'var(--hive-text-primary)',
                                        } }), _jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2", children: _jsxs("kbd", { className: "inline-flex items-center px-2 py-1 rounded text-xs border", style: {
                                                backgroundColor: 'var(--hive-background-primary)',
                                                borderColor: 'var(--hive-border-subtle)',
                                                color: 'var(--hive-text-muted)'
                                            }, children: [_jsx(Command, { className: "w-3 h-3 mr-1" }), "K"] }) })] }) })), _jsxs("div", { className: "flex items-center space-x-4", children: [config.showNotifications && (_jsxs(Button, { variant: "ghost", size: "sm", className: "relative text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: [_jsx(Bell, { className: "w-5 h-5" }), _jsx("span", { className: "absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse", style: { backgroundColor: 'var(--hive-status-error)' } })] })), config.showUserMenu && user && (_jsxs(Button, { variant: "ghost", size: "sm", className: "flex items-center space-x-2 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", children: [_jsx("div", { className: "w-8 h-8 rounded-full flex items-center justify-center", style: { backgroundColor: 'var(--hive-background-secondary)' }, children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "w-8 h-8 rounded-full" })) : (_jsx(User, { className: "w-4 h-4" })) }), _jsx("span", { className: "hidden sm:block text-sm", children: user.name.split(' ')[0] }), _jsx(ChevronDown, { className: "w-4 h-4" })] })), _jsx(Button, { variant: "ghost", size: "sm", className: "md:hidden text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]", onClick: () => setMobileMenuOpen(!mobileMenuOpen), children: mobileMenuOpen ? _jsx(X, { className: "w-5 h-5" }) : _jsx(Menu, { className: "w-5 h-5" }) })] })] }) }), mobileMenuOpen && (_jsx("div", { className: "md:hidden border-t", style: { borderColor: 'var(--hive-border-primary)' }, children: _jsx("div", { className: "px-2 pt-2 pb-3 space-y-1", children: allItems.map((item) => (_jsx(HiveNavigationItem, { item: item, isActive: item.isActive, onNavigate: (navItem) => {
                            navigate(navItem);
                            setMobileMenuOpen(false);
                        }, size: "sm", className: "w-full justify-start" }, item.id))) }) }))] }));
}
// ============================================================================
// COMMAND NAVIGATION VARIANT
// ============================================================================
export function CommandNavigation() {
    const { config, sections, user, searchOpen, setSearchOpen, navigate } = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    // Flatten and prepare items for command palette
    const allItems = sections.flatMap(section => section.items.map(item => ({
        ...item,
        category: section.label,
        keywords: item.keywords || []
    })));
    const filteredItems = searchQuery.length > 0
        ? allItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())))
        : allItems;
    return (_jsxs(NavigationContainer, { className: "min-h-screen", style: { backgroundColor: semantic.background.primary }, children: [_jsx("div", { className: "border-b", style: { borderColor: semantic.border.primary }, children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-12", children: [config.showBranding && (_jsx(NavigationBrand, { logo: _jsx(HiveLogo, { size: "sm", variant: "gold" }), href: "/" })), _jsxs(Button, { onClick: () => setSearchOpen(true), className: "flex items-center space-x-2 px-4 py-2 border transition-colors", style: {
                                    backgroundColor: semantic.background.secondary,
                                    borderColor: semantic.border.primary,
                                    color: semantic.text.muted,
                                }, children: [_jsx(Search, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:block", children: "Search or jump to..." }), _jsxs("kbd", { className: "hidden sm:inline-flex items-center px-2 py-1 border rounded text-xs", children: [_jsx(Command, { className: "w-3 h-3 mr-1" }), "K"] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [config.showNotifications && (_jsxs(Button, { variant: "ghost", size: "sm", className: "relative", children: [_jsx(Bell, { className: "w-4 h-4" }), _jsx("span", { className: "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" })] })), user && (_jsx(Button, { variant: "ghost", size: "sm", className: "w-6 h-6 p-0", children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "w-6 h-6 rounded-full" })) : (_jsx(User, { className: "w-3 h-3" })) }))] })] }) }) }), searchOpen && (_jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsxs("div", { className: "flex min-h-full items-start justify-center p-4 pt-16", children: [_jsx("div", { className: "fixed inset-0 backdrop-blur-sm", style: { backgroundColor: 'color-mix(in_srgb,var(--hive-background-primary)_50%,transparent)' }, onClick: () => setSearchOpen(false) }), _jsxs("div", { className: "relative w-full max-w-2xl rounded-lg border shadow-xl", style: {
                                backgroundColor: semantic.background.primary,
                                borderColor: semantic.border.primary,
                            }, children: [_jsxs("div", { className: "flex items-center border-b px-4", style: { borderColor: semantic.border.primary }, children: [_jsx(Search, { className: "w-5 h-5 mr-3", style: { color: semantic.text.muted } }), _jsx("input", { type: "text", placeholder: "Search commands, tools, spaces...", value: searchQuery, onChange: (e) => {
                                                setSearchQuery(e.target.value);
                                                setSelectedIndex(0);
                                            }, className: "w-full py-4 bg-transparent focus:outline-none", style: { color: semantic.text.primary }, autoFocus: true })] }), _jsx("div", { className: "max-h-96 overflow-y-auto p-2", children: filteredItems.length > 0 ? (filteredItems.map((item, index) => {
                                        const Icon = item.icon;
                                        const isSelected = index === selectedIndex;
                                        return (_jsxs(Button, { variant: "ghost", onClick: () => {
                                                navigate(item);
                                                setSearchOpen(false);
                                                setSearchQuery('');
                                            }, className: cn("w-full justify-start p-3 h-auto", isSelected && "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]"), style: {
                                                backgroundColor: isSelected ? semantic.brand.primary : undefined,
                                                color: isSelected ? semantic.text.inverse : semantic.text.primary,
                                            }, children: [Icon && _jsx(Icon, { className: "w-4 h-4 mr-3 flex-shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0 text-left", children: [_jsx("div", { className: "font-medium truncate", children: item.label }), item.description && (_jsx("div", { className: "text-xs truncate mt-1", style: {
                                                                color: isSelected ? semantic.text.inverse : semantic.text.muted,
                                                                opacity: isSelected ? 0.8 : 1
                                                            }, children: item.description }))] })] }, item.id));
                                    })) : (_jsxs("div", { className: "px-3 py-8 text-center", style: { color: semantic.text.muted }, children: [_jsx(Search, { className: "w-8 h-8 mx-auto mb-3" }), _jsx("p", { children: "No results found" }), _jsx("p", { className: "text-sm mt-1", children: "Try searching for something else" })] })) }), _jsxs("div", { className: "border-t px-4 py-3 text-xs flex items-center justify-between", style: {
                                        borderColor: semantic.border.primary,
                                        color: semantic.text.muted
                                    }, children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("span", { children: "\u2191\u2193 Navigate" }), _jsx("span", { children: "\u21B5 Select" }), _jsx("span", { children: "ESC Close" })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("kbd", { className: "px-2 py-1 border rounded text-xs", children: "\u2318" }), _jsx("kbd", { className: "px-2 py-1 border rounded text-xs", children: "K" })] })] })] })] }) }))] }));
}
// ============================================================================
// MINIMAL NAVIGATION VARIANT
// ============================================================================
export function MinimalNavigation() {
    const { config, user } = useNavigation();
    return (_jsx(NavigationContainer, { className: "fixed top-4 left-4 right-4 z-50 rounded-full border backdrop-blur-xl", style: {
            backgroundColor: `${semantic.background.primary}CC`,
            borderColor: semantic.border.primary,
        }, children: _jsxs("div", { className: "flex items-center justify-between px-6 py-3", children: [config.showBranding && (_jsx(NavigationBrand, { logo: _jsx(HiveGlyphOnly, { size: "sm", variant: "gold" }), href: "/" })), _jsxs("div", { className: "flex items-center space-x-4", children: [config.showSearch && (_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Search, { className: "w-4 h-4" }) })), config.showNotifications && (_jsxs(Button, { variant: "ghost", size: "sm", className: "relative", children: [_jsx(Bell, { className: "w-4 h-4" }), _jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" })] })), user && (_jsx(Button, { variant: "ghost", size: "sm", className: "w-8 h-8 p-0 rounded-full", children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "w-8 h-8 rounded-full" })) : (_jsx(User, { className: "w-4 h-4" })) }))] })] }) }));
}
//# sourceMappingURL=hive-navigation-variants.js.map