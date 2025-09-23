/**
 * Universal Shell Component
 * The foundational wrapper for the entire HIVE platform
 * Provides consistent layout, navigation, and context across all pages
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
const ShellContext = createContext({
    isSidebarOpen: true,
    toggleSidebar: () => { },
    isMobile: false,
    currentSlice: 'feed',
    shellReady: false,
});
export const useShell = () => useContext(ShellContext);
// Main Shell Component
export const UniversalShell = ({ children, className = '', variant = 'full' }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [shellReady, setShellReady] = useState(false);
    const pathname = usePathname();
    // Detect mobile/desktop
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            setIsSidebarOpen(window.innerWidth >= 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        setShellReady(true);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    // Determine current vertical slice from pathname
    const getCurrentSlice = () => {
        if (pathname?.includes('/feed'))
            return 'feed';
        if (pathname?.includes('/spaces'))
            return 'spaces';
        if (pathname?.includes('/profile'))
            return 'profile';
        if (pathname?.includes('/hivelab') || pathname?.includes('/tools'))
            return 'hivelab';
        if (pathname?.includes('/events'))
            return 'events';
        if (pathname?.includes('/messages'))
            return 'messages';
        if (pathname?.includes('/rituals'))
            return 'rituals';
        return 'feed'; // default
    };
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const contextValue = {
        isSidebarOpen,
        toggleSidebar,
        isMobile,
        currentSlice: getCurrentSlice(),
        shellReady,
    };
    // For minimal variant, only show header and content
    if (variant === 'minimal') {
        return (_jsx(ShellContext.Provider, { value: contextValue, children: _jsxs("div", { className: `hive-shell-minimal min-h-screen bg-black ${className}`, children: [_jsx("a", { href: "#main-content", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--hive-brand-secondary)] text-black px-4 py-2 rounded", children: "Skip to main content" }), _jsx(GlobalHeader, {}), _jsx("main", { id: "main-content", className: "pt-16 min-h-[calc(100vh-64px)]", children: _jsx("div", { className: "hive-content-wrapper", children: shellReady ? children : _jsx(ShellLoader, {}) }) }), _jsx("div", { id: "modal-root" }), _jsx("div", { id: "toast-root" })] }) }));
    }
    // Full variant with all navigation elements
    return (_jsx(ShellContext.Provider, { value: contextValue, children: _jsxs("div", { className: `hive-shell min-h-screen bg-black ${className}`, children: [_jsx("a", { href: "#main-content", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--hive-brand-secondary)] text-black px-4 py-2 rounded", children: "Skip to main content" }), _jsx(GlobalHeader, {}), _jsxs("div", { className: "flex h-[calc(100vh-64px)] pt-16", children: [_jsx(Sidebar, {}), _jsx("main", { id: "main-content", className: `
              flex-1 overflow-y-auto
              ${!isMobile && isSidebarOpen ? 'lg:ml-64' : ''}
              transition-all duration-300
            `, children: _jsx("div", { className: "hive-content-wrapper", children: shellReady ? children : _jsx(ShellLoader, {}) }) }), !isMobile && ['feed', 'spaces'].includes(getCurrentSlice()) && (_jsx(ContextPanel, {}))] }), isMobile && _jsx(MobileBottomNav, {}), _jsx("div", { id: "modal-root" }), _jsx("div", { id: "toast-root" })] }) }));
};
// Global Header Component
const GlobalHeader = () => {
    const { toggleSidebar, isMobile, currentSlice } = useShell();
    return (_jsx("header", { className: "fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-white/10", children: _jsxs("div", { className: "flex items-center justify-between h-16 px-4 lg:px-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: toggleSidebar, className: "lg:hidden p-2 text-white/60 hover:text-white transition-colors", "aria-label": "Toggle menu", children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-secondary)] rounded flex items-center justify-center", children: _jsx("span", { className: "font-black text-black text-xl", children: "H" }) }), !isMobile && (_jsx("span", { className: "font-black text-xl text-white", children: "HIVE" }))] })] }), !isMobile && (_jsx("div", { className: "flex-1 max-w-xl mx-8", children: _jsx(GlobalSearch, {}) })), _jsxs("div", { className: "flex items-center gap-2", children: [isMobile && (_jsx("button", { className: "p-2 text-white/60 hover:text-white transition-colors", children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) })), _jsx(NotificationBell, {}), _jsx(UserMenu, {})] })] }) }));
};
// Sidebar Navigation Component
const Sidebar = () => {
    const { isSidebarOpen, isMobile, currentSlice } = useShell();
    if (isMobile && !isSidebarOpen)
        return null;
    const navItems = [
        { id: 'feed', label: 'Feed', icon: '🏠', path: '/feed' },
        { id: 'spaces', label: 'Spaces', icon: '🏛️', path: '/spaces' },
        { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' },
        { id: 'hivelab', label: 'HiveLab', icon: '🔧', path: '/hivelab' },
        { id: 'events', label: 'Events', icon: '📅', path: '/events' },
        { id: 'messages', label: 'Messages', icon: '💬', path: '/messages', badge: 3 },
        { id: 'rituals', label: 'Rituals', icon: '🎭', path: '/rituals' },
    ];
    return (_jsxs(_Fragment, { children: [isMobile && isSidebarOpen && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-30 lg:hidden", onClick: () => { } })), _jsxs("aside", { className: `
        fixed top-16 left-0 bottom-0 z-30
        w-64 bg-black border-r border-white/10
        transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `, children: [_jsx("nav", { className: "p-4 space-y-2", children: navItems.map(item => (_jsx(SidebarNavItem, { ...item, active: currentSlice === item.id }, item.id))) }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 p-4 border-t border-white/10", children: _jsx("button", { className: "w-full px-4 py-3 bg-[var(--hive-brand-secondary)] text-black font-semibold rounded-lg hover:bg-[var(--hive-brand-secondary-hover)] transition-colors", children: "Create Post" }) })] })] }));
};
// Sidebar Navigation Item
const SidebarNavItem = ({ label, icon, path, active, badge }) => {
    return (_jsxs("a", { href: path, className: `
        flex items-center gap-3 px-4 py-3 rounded-lg
        transition-all duration-200
        ${active
            ? 'bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-l-4 border-[var(--hive-brand-secondary)]'
            : 'text-white/60 hover:text-white hover:bg-white/5'}
      `, children: [_jsx("span", { className: "text-xl", children: icon }), _jsx("span", { className: "font-medium", children: label }), badge && (_jsx("span", { className: "ml-auto bg-[var(--hive-brand-secondary)] text-black text-xs font-bold px-2 py-1 rounded-full", children: badge }))] }));
};
// Context Panel (Right Sidebar)
const ContextPanel = () => {
    return (_jsx("aside", { className: "hidden xl:block w-80 border-l border-white/10 p-6", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("section", { children: [_jsx("h3", { className: "text-white font-semibold mb-3", children: "Trending Now" }), _jsxs("div", { className: "space-y-2", children: [_jsx(TrendingItem, { tag: "#midterms", count: "1.2k" }), _jsx(TrendingItem, { tag: "#halloween", count: "847" }), _jsx(TrendingItem, { tag: "#studygroup", count: "623" })] })] }), _jsxs("section", { children: [_jsx("h3", { className: "text-white font-semibold mb-3", children: "Active Now" }), _jsxs("div", { className: "flex -space-x-2", children: [[1, 2, 3, 4, 5].map(i => (_jsx("div", { className: "w-8 h-8 rounded-full bg-white/20 border-2 border-black" }, i))), _jsx("div", { className: "w-8 h-8 rounded-full bg-white/10 border-2 border-black flex items-center justify-center", children: _jsx("span", { className: "text-white/60 text-xs", children: "+12" }) })] })] })] }) }));
};
// Mobile Bottom Navigation
const MobileBottomNav = () => {
    const { currentSlice } = useShell();
    const navItems = [
        { id: 'feed', icon: '🏠' },
        { id: 'spaces', icon: '🔍' },
        { id: 'create', icon: '➕', primary: true },
        { id: 'messages', icon: '💬' },
        { id: 'profile', icon: '👤' },
    ];
    return (_jsx("nav", { className: "fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 z-30", children: _jsx("div", { className: "flex justify-around items-center h-16", children: navItems.map(item => (_jsx("button", { className: `
              p-3 rounded-lg transition-all
              ${item.primary ? 'bg-[var(--hive-brand-secondary)] text-black scale-110' : ''}
              ${!item.primary && currentSlice === item.id ? 'text-[var(--hive-brand-secondary)]' : ''}
              ${!item.primary && currentSlice !== item.id ? 'text-white/60' : ''}
            `, children: _jsx("span", { className: "text-xl", children: item.icon }) }, item.id))) }) }));
};
// Global Search Component
const GlobalSearch = () => {
    return (_jsxs("div", { className: "relative", children: [_jsx("input", { type: "search", placeholder: "Search everything...", className: "w-full px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none transition-all" }), _jsx("svg", { className: "absolute left-3 top-2.5 w-5 h-5 text-white/30", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })] }));
};
// Notification Bell
const NotificationBell = () => {
    const [hasNotifications, setHasNotifications] = useState(true);
    return (_jsxs("button", { className: "relative p-2 text-white/60 hover:text-white transition-colors", children: [_jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }) }), hasNotifications && (_jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full" }))] }));
};
// User Menu
const UserMenu = () => {
    return (_jsxs("button", { className: "flex items-center gap-2 p-1 rounded-lg hover:bg-white/5 transition-colors", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)]" }), _jsx("svg", { className: "w-4 h-4 text-white/60", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }));
};
// Shell Loader
const ShellLoader = () => {
    return (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 border-4 border-[var(--hive-brand-secondary)] border-t-transparent rounded-full animate-spin" }), _jsx("p", { className: "text-white/60", children: "Loading HIVE..." })] }) }));
};
// Trending Item Component
const TrendingItem = ({ tag, count }) => (_jsxs("button", { className: "flex items-center justify-between w-full p-2 rounded hover:bg-white/5 transition-colors", children: [_jsx("span", { className: "text-[var(--hive-brand-secondary)]", children: tag }), _jsxs("span", { className: "text-white/40 text-sm", children: [count, " posts"] })] }));
export default UniversalShell;
//# sourceMappingURL=UniversalShell.js.map