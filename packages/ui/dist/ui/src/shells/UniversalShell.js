'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * 🎯 HIVE Universal Shell Component
 * The Premium App Shell with Buttery Smooth Interactions
 *
 * DESIGN SYSTEM COMPLIANCE:
 * ✅ Gold (#FFD700) signature brand color
 * ✅ Framer Motion with HIVE easing curves
 * ✅ Glass morphism effects
 * ✅ Geist Sans typography (font-sans)
 * ✅ Mobile-first with 44px touch targets
 * ✅ Dark luxury aesthetic
 */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { MotionDiv, MotionSpan, MotionButton, MotionLink, MotionNav, MotionAside, AnimatePresence } from './motion-safe';
import { Home, Users, User, Wrench, Calendar, Sparkles, MessageCircle, Search, Menu, X, Plus, ChevronDown, TrendingUp, Activity, Settings, LogOut, Moon, Sun, } from 'lucide-react';
import { NotificationSystem } from '../atomic/organisms/notification-system';
// HIVE Easing Curves from Design System
const HIVE_EASING = {
    liquid: [0.23, 1, 0.32, 1],
    magnetic: [0.25, 0.46, 0.45, 0.94],
    silk: [0.16, 1, 0.3, 1]
};
const ShellContext = createContext({
    isSidebarOpen: true,
    toggleSidebar: () => { },
    isMobile: false,
    currentSlice: 'feed',
    shellReady: false,
    isDarkMode: true,
    toggleDarkMode: () => { },
    notificationCount: 0,
    messageCount: 0,
});
export const useShell = () => {
    const context = useContext(ShellContext);
    if (!context) {
        console.warn('useShell must be used within ShellContext.Provider');
        // Return default values to prevent crashes
        return {
            isSidebarOpen: true,
            toggleSidebar: () => { },
            isMobile: false,
            currentSlice: 'feed',
            shellReady: false,
            isDarkMode: true,
            toggleDarkMode: () => { },
            notificationCount: 0,
            messageCount: 0,
        };
    }
    return context;
};
// Main Shell Component with HIVE Design System
export const UniversalShell = ({ children, className = '', variant = 'full' }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [shellReady, setShellReady] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [notificationCount, setNotificationCount] = useState(5);
    const [messageCount, setMessageCount] = useState(3);
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
        return 'feed';
    };
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const contextValue = {
        isSidebarOpen,
        toggleSidebar,
        isMobile,
        currentSlice: getCurrentSlice(),
        shellReady,
        isDarkMode,
        toggleDarkMode,
        notificationCount,
        messageCount,
    };
    // For minimal variant, only show header and content
    if (variant === 'minimal') {
        return (_jsx(ShellContext.Provider, { value: contextValue, children: _jsxs("div", { className: `hive-shell-minimal min-h-screen bg-hive-background-primary font-sans ${className}`, children: [_jsx("a", { href: "#main-content", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-hive-brand-primary text-hive-brand-onGold px-4 py-2 rounded-lg font-sans", children: "Skip to main content" }), _jsx(GlobalHeader, {}), _jsx("main", { id: "main-content", className: "pt-16 min-h-[calc(100vh-64px)]", children: _jsx(MotionDiv, { className: "hive-content-wrapper", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: HIVE_EASING.liquid }, children: shellReady ? children : _jsx(ShellLoader, {}) }) }), _jsx("div", { id: "modal-root" }), _jsx("div", { id: "toast-root" })] }) }));
    }
    // Full variant with all navigation elements
    return (_jsx(ShellContext.Provider, { value: contextValue, children: _jsxs("div", { className: `hive-shell min-h-screen bg-hive-background-primary font-sans ${className}`, children: [_jsx("a", { href: "#main-content", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-hive-brand-primary text-hive-brand-onGold px-4 py-2 rounded-lg font-sans", children: "Skip to main content" }), _jsx(GlobalHeader, {}), _jsxs("div", { className: "flex h-[calc(100vh-64px)] pt-16", children: [_jsx(Sidebar, {}), _jsx("main", { id: "main-content", className: `
              flex-1 overflow-y-auto
              ${!isMobile && isSidebarOpen ? 'lg:ml-64' : ''}
              transition-all duration-500 ease-out
            `, children: _jsx(MotionDiv, { className: "hive-content-wrapper", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, ease: HIVE_EASING.liquid }, children: shellReady ? children : _jsx(ShellLoader, {}) }) }), !isMobile && ['feed', 'spaces'].includes(getCurrentSlice()) && (_jsx(ContextPanel, {}))] }), isMobile && _jsx(MobileBottomNav, {}), _jsx("div", { id: "modal-root" }), _jsx("div", { id: "toast-root" })] }) }));
};
// Global Header - Ultra Premium with Dynamic Effects
const GlobalHeader = () => {
    const { toggleSidebar, isMobile } = useShell();
    const [mounted, setMounted] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return (_jsxs(MotionDiv, { className: "fixed top-0 left-0 right-0 z-50", initial: { y: -100 }, animate: { y: 0 }, transition: { duration: 0.6, ease: HIVE_EASING.liquid }, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-hive-background-primary/95 via-hive-background-primary/85 to-hive-background-primary/75 backdrop-blur-2xl" }), _jsx("div", { className: "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-hive-border-default to-transparent" }), _jsx(MotionDiv, { className: "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-hive-brand-primary/30 to-transparent", animate: { opacity: [0.3, 0.6, 0.3] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } }), _jsxs("div", { className: "relative flex items-center justify-between h-16 px-4 lg:px-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(MotionButton, { onClick: toggleSidebar, className: "lg:hidden relative p-2.5 text-hive-text-secondary hover:text-hive-text-primary rounded-lg overflow-hidden group", whileTap: { scale: 0.92 }, whileHover: { scale: 1.05 }, transition: { duration: 0.15, ease: HIVE_EASING.magnetic }, "aria-label": "Toggle menu", children: [_jsx(MotionDiv, { className: "absolute inset-0 bg-hive-background-tertiary/30 backdrop-blur-md rounded-lg", initial: { opacity: 0 }, whileHover: { opacity: 1 }, transition: { duration: 0.2 } }), _jsx(MotionDiv, { whileHover: { rotate: 180 }, transition: { duration: 0.3, ease: HIVE_EASING.magnetic }, children: _jsx(Menu, { className: "w-6 h-6 relative z-10" }) }), _jsx(MotionDiv, { className: "absolute inset-0 bg-hive-brand-primary/10 blur-xl", initial: { opacity: 0 }, whileHover: { opacity: 1 }, transition: { duration: 0.3 } })] }), _jsxs(MotionLink, { href: "/", className: "flex items-center gap-3 cursor-pointer group", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, transition: { duration: 0.2, ease: HIVE_EASING.liquid }, children: [_jsxs(MotionDiv, { className: "relative w-10 h-10 lg:w-11 lg:h-11", whileHover: {
                                            rotate: [0, -5, 5, -5, 0],
                                            transition: { duration: 0.5, ease: HIVE_EASING.magnetic }
                                        }, children: [_jsx(MotionDiv, { className: "absolute inset-0 bg-hive-brand-primary rounded-xl blur-xl opacity-40 group-hover:opacity-60", animate: { scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } }), _jsx("div", { className: "relative w-full h-full bg-gradient-to-br from-hive-brand-primary via-[#FFE55C] to-hive-brand-primary rounded-xl p-1.5 shadow-hive-gold-glow group-hover:shadow-hive-gold-glow-strong transition-all duration-300", children: _jsx("svg", { viewBox: "0 0 1500 1500", className: "w-full h-full drop-shadow-md", children: _jsx("path", { fill: "currentColor", className: "text-hive-brand-onGold", d: "M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z" }) }) }), _jsx(MotionDiv, { className: "absolute inset-0 rounded-xl border-2 border-hive-brand-primary/30", animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } })] }), !isMobile && (_jsxs("div", { className: "flex flex-col -space-y-1", children: [_jsx(MotionSpan, { className: "font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-hive-text-primary to-hive-text-primary/90 font-sans tracking-tight", style: {
                                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                                                }, children: "HIVE" }), _jsx(MotionSpan, { className: "text-[10px] text-hive-brand-primary font-medium tracking-[0.3em] uppercase opacity-80 font-sans", initial: { opacity: 0, y: -10 }, animate: { opacity: 0.8, y: 0 }, transition: { delay: 0.2, ease: HIVE_EASING.silk }, children: "SOCIAL UTILITY" })] }))] })] }), !isMobile && (_jsx(MotionDiv, { className: "flex-1 max-w-2xl mx-8", animate: {
                            scale: searchFocused ? 1.01 : 1,
                            y: searchFocused ? -1 : 0
                        }, transition: { duration: 0.3, ease: HIVE_EASING.liquid }, children: _jsx(GlobalSearch, { onFocusChange: setSearchFocused }) })), _jsxs("div", { className: "flex items-center gap-2", children: [isMobile && (_jsx(MotionButton, { className: "p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors", whileTap: { scale: 0.95 }, children: _jsx(Search, { className: "w-6 h-6" }) })), _jsx(NotificationSystem, { onNavigate: (url) => {
                                    // In the shell context, we can't use useRouter directly
                                    // This would need to be passed down from the app level
                                    console.log('Navigate to:', url);
                                    if (typeof window !== 'undefined') {
                                        window.location.href = url;
                                    }
                                } }), _jsx(UserMenu, {})] })] })] }));
};
// Sidebar - Ultra Premium Glass with Magnetic Navigation
const Sidebar = () => {
    const { isSidebarOpen, isMobile, currentSlice, toggleSidebar } = useShell();
    const pathname = usePathname();
    const [hoveredItem, setHoveredItem] = useState(null);
    const navItems = [
        { id: 'feed', label: 'Feed', icon: Home, path: '/feed', color: 'from-blue-500/20 to-purple-500/20' },
        { id: 'spaces', label: 'Spaces', icon: Users, path: '/spaces', color: 'from-green-500/20 to-emerald-500/20' },
        { id: 'profile', label: 'Profile', icon: User, path: '/profile', color: 'from-pink-500/20 to-rose-500/20' },
        { id: 'hivelab', label: 'HiveLab', icon: Wrench, path: '/hivelab', color: 'from-orange-500/20 to-amber-500/20' },
        { id: 'events', label: 'Events', icon: Calendar, path: '/events', color: 'from-indigo-500/20 to-blue-500/20' },
        { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages', badge: 3, color: 'from-violet-500/20 to-purple-500/20' },
        { id: 'rituals', label: 'Rituals', icon: Sparkles, path: '/rituals', color: 'from-yellow-500/20 to-amber-500/20' },
    ];
    return (_jsxs(_Fragment, { children: [_jsx(AnimatePresence, { children: isMobile && isSidebarOpen && (_jsx(MotionDiv, { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3, ease: HIVE_EASING.liquid }, onClick: toggleSidebar })) }), _jsxs(MotionAside, { className: `
          fixed top-16 left-0 bottom-0 z-40
          w-64 overflow-hidden
        `, initial: false, animate: {
                    x: isSidebarOpen ? 0 : -264,
                    opacity: isSidebarOpen ? 1 : 0
                }, transition: { duration: 0.4, ease: HIVE_EASING.liquid }, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-hive-background-secondary/95 to-hive-background-secondary/90 backdrop-blur-2xl" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-hive-brand-primary/5 via-transparent to-hive-brand-primary/5" }), _jsx("div", { className: "absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-hive-border-default to-transparent" }), _jsx(MotionDiv, { className: "absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-hive-brand-primary/30 to-transparent", animate: { opacity: [0.2, 0.5, 0.2] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }), _jsx("nav", { className: "p-4 space-y-2", children: _jsx(AnimatePresence, { children: navItems.map((item, index) => (_jsx(MotionDiv, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: {
                                    duration: 0.3,
                                    delay: index * 0.05,
                                    ease: HIVE_EASING.silk
                                }, children: _jsx(SidebarNavItem, { ...item, active: pathname?.includes(item.path) }) }, item.id))) }) }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 p-4 border-t border-hive-border-default", children: _jsxs(MotionButton, { className: "w-full px-4 py-3 bg-gradient-to-r from-hive-brand-primary to-hive-brand-primary/90 text-hive-brand-onGold font-semibold font-sans rounded-lg shadow-hive-gold-glow hover:shadow-hive-gold-glow-strong transition-all duration-300 ease-out", whileHover: { scale: 1.02, y: -2 }, whileTap: { scale: 0.98 }, transition: { duration: 0.15, ease: HIVE_EASING.magnetic }, children: [_jsx(Plus, { className: "inline-block w-5 h-5 mr-2" }), "Create Post"] }) })] })] }));
};
// Sidebar Navigation Item - Premium Magnetic with Gradient
const SidebarNavItem = ({ label, icon: Icon, path, active, badge, color = 'from-hive-brand-primary/20 to-hive-brand-primary/10' }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (_jsxs(MotionLink, { href: path, className: `
        relative flex items-center gap-3 px-4 py-3 rounded-xl font-sans overflow-hidden group
        transition-all duration-300 ease-out
        ${active
            ? 'text-hive-brand-primary'
            : 'text-hive-text-secondary hover:text-hive-text-primary'}
      `, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), whileHover: { x: 4, scale: 1.02 }, whileTap: { scale: 0.98 }, transition: { duration: 0.15, ease: HIVE_EASING.magnetic }, children: [_jsx(MotionDiv, { className: `absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100`, animate: {
                    opacity: active ? 0.15 : isHovered ? 0.1 : 0
                }, transition: { duration: 0.3, ease: HIVE_EASING.liquid } }), active && (_jsxs(_Fragment, { children: [_jsx(MotionDiv, { className: "absolute inset-0 bg-hive-brand-primary/10 backdrop-blur-sm", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }), _jsx(MotionDiv, { className: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-hive-brand-primary to-hive-brand-primary/60 rounded-r-full shadow-hive-gold-glow", layoutId: "activeIndicator", transition: { duration: 0.3, ease: HIVE_EASING.liquid } })] })), _jsx(MotionDiv, { animate: {
                    rotate: isHovered ? [0, -10, 10, 0] : 0
                }, transition: { duration: 0.4, ease: HIVE_EASING.magnetic }, children: _jsx(Icon, { className: "w-5 h-5 relative z-10" }) }), _jsx("span", { className: "font-medium relative z-10", children: label }), badge && (_jsxs(MotionSpan, { className: "ml-auto relative z-10", initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.3, ease: HIVE_EASING.magnetic }, children: [_jsx(MotionSpan, { className: "absolute inset-0 bg-hive-brand-primary rounded-full blur-md", animate: { scale: [1, 1.3, 1] }, transition: { duration: 2, repeat: Infinity } }), _jsx("span", { className: "relative bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary text-hive-brand-onGold text-xs font-bold px-2 py-1 rounded-full", children: badge })] })), isHovered && !active && (_jsx(MotionDiv, { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent", initial: { x: '-100%' }, animate: { x: '100%' }, transition: { duration: 0.5, ease: HIVE_EASING.liquid } }))] }));
};
// Context Panel with Glass Morphism
const ContextPanel = () => {
    return (_jsx(MotionAside, { className: "hidden xl:block w-80 border-l border-hive-border-default p-6 bg-hive-background-secondary/50 backdrop-blur-xl", initial: { x: 320, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0.5, delay: 0.2, ease: HIVE_EASING.liquid }, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("section", { children: [_jsxs("h3", { className: "text-hive-text-primary font-semibold font-sans mb-3 flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-4 h-4 text-hive-brand-primary" }), "Trending Now"] }), _jsx("div", { className: "space-y-2", children: ['#midterms', '#halloween', '#studygroup'].map((tag, index) => (_jsx(MotionDiv, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1, ease: HIVE_EASING.silk }, children: _jsx(TrendingItem, { tag: tag, count: `${1.2 - index * 0.3}k` }) }, tag))) })] }), _jsxs("section", { children: [_jsxs("h3", { className: "text-hive-text-primary font-semibold font-sans mb-3 flex items-center gap-2", children: [_jsx(Activity, { className: "w-4 h-4 text-hive-brand-primary" }), "Active Now"] }), _jsxs("div", { className: "flex -space-x-2", children: [[1, 2, 3, 4, 5].map(i => (_jsx(MotionDiv, { className: "w-8 h-8 rounded-full bg-gradient-to-br from-hive-brand-primary/20 to-hive-brand-primary/10 border-2 border-hive-background-primary", initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: i * 0.05, ease: HIVE_EASING.magnetic }, whileHover: { scale: 1.1, zIndex: 10 } }, i))), _jsx(MotionDiv, { className: "w-8 h-8 rounded-full bg-hive-background-tertiary border-2 border-hive-background-primary flex items-center justify-center", initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.3, ease: HIVE_EASING.magnetic }, children: _jsx("span", { className: "text-hive-text-tertiary text-xs font-sans", children: "+12" }) })] })] })] }) }));
};
// Mobile Bottom Navigation - Ultra Premium iOS-Like Tab Bar
const MobileBottomNav = () => {
    const { currentSlice } = useShell();
    const pathname = usePathname();
    const [createPressed, setCreatePressed] = useState(false);
    const navItems = [
        { id: 'feed', icon: Home, path: '/feed', label: 'Feed' },
        { id: 'spaces', icon: Users, path: '/spaces', label: 'Spaces' },
        { id: 'create', icon: Plus, primary: true, label: 'Create' },
        { id: 'messages', icon: MessageCircle, path: '/messages', label: 'Chat' },
        { id: 'profile', icon: User, path: '/profile', label: 'You' },
    ];
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed bottom-16 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-30" }), _jsxs(MotionNav, { className: "fixed bottom-0 left-0 right-0 z-40", initial: { y: 100 }, animate: { y: 0 }, transition: { duration: 0.5, ease: HIVE_EASING.liquid }, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-hive-background-primary/95 to-hive-background-primary/98 backdrop-blur-2xl" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-hive-brand-primary/5 to-transparent" }), _jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hive-border-default to-transparent" }), _jsx(MotionDiv, { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hive-brand-primary/20 to-transparent", animate: { opacity: [0.2, 0.4, 0.2] }, transition: { duration: 3, repeat: Infinity } }), _jsx("div", { className: "relative flex justify-around items-center h-20 px-4 pb-4 pt-2", children: navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname?.includes(item.path || '');
                            if (item.primary) {
                                // Premium Create Button
                                return (_jsxs(MotionButton, { className: "relative", onTouchStart: () => setCreatePressed(true), onTouchEnd: () => setCreatePressed(false), whileTap: { scale: 0.9 }, transition: { duration: 0.15, ease: HIVE_EASING.magnetic }, children: [_jsx(MotionDiv, { className: "absolute -inset-3 bg-hive-brand-primary/30 rounded-full blur-xl", animate: {
                                                scale: createPressed ? 1.2 : [1, 1.1, 1],
                                                opacity: createPressed ? 0.8 : [0.4, 0.6, 0.4]
                                            }, transition: { duration: createPressed ? 0.1 : 2, repeat: createPressed ? 0 : Infinity } }), _jsxs(MotionDiv, { className: "relative w-14 h-14 bg-gradient-to-br from-hive-brand-primary via-[#FFE55C] to-hive-brand-primary rounded-full shadow-hive-gold-glow flex items-center justify-center", whileHover: { rotate: 90 }, transition: { duration: 0.3, ease: HIVE_EASING.magnetic }, children: [_jsx(Plus, { className: "w-7 h-7 text-hive-brand-onGold", strokeWidth: 3 }), _jsx("div", { className: "absolute inset-x-0 top-1 h-6 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-sm" })] })] }, item.id));
                            }
                            // Regular Navigation Items
                            return (_jsxs(MotionLink, { href: item.path, className: "relative flex flex-col items-center gap-1 p-2 min-w-[60px]", whileTap: { scale: 0.92 }, transition: { duration: 0.1, ease: HIVE_EASING.magnetic }, children: [_jsxs(MotionDiv, { className: "relative", animate: {
                                            y: isActive ? -2 : 0,
                                            scale: isActive ? 1.05 : 1
                                        }, transition: { duration: 0.2, ease: HIVE_EASING.liquid }, children: [_jsx(Icon, { className: `w-6 h-6 transition-colors ${isActive ? 'text-hive-brand-primary' : 'text-hive-text-tertiary'}`, strokeWidth: isActive ? 2.5 : 2 }), isActive && (_jsx(MotionDiv, { className: "absolute -inset-2 bg-hive-brand-primary/20 rounded-full blur-md", initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.3 } }))] }), _jsx(MotionSpan, { className: `text-[10px] font-medium transition-all font-sans ${isActive
                                            ? 'text-hive-brand-primary'
                                            : 'text-hive-text-tertiary/70'}`, animate: { opacity: isActive ? 1 : 0.7 }, children: item.label }), isActive && (_jsx(MotionDiv, { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-hive-brand-primary rounded-full shadow-hive-gold-glow", layoutId: "mobileActiveIndicator", transition: { duration: 0.3, ease: HIVE_EASING.liquid } }))] }, item.id));
                        }) })] })] }));
};
// Global Search - Ultra Premium Glass Effect
const GlobalSearch = ({ onFocusChange }) => {
    const [query, setQuery] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const searchRef = useRef(null);
    return (_jsxs(MotionDiv, { className: "relative group", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), whileHover: { scale: 1.01 }, transition: { duration: 0.2, ease: HIVE_EASING.magnetic }, children: [_jsx(MotionDiv, { className: "absolute -inset-1 bg-gradient-to-r from-hive-brand-primary/20 via-transparent to-hive-brand-primary/20 rounded-xl blur-lg", animate: {
                    opacity: isHovered ? 0.5 : 0,
                    scale: isHovered ? 1 : 0.95
                }, transition: { duration: 0.3, ease: HIVE_EASING.liquid } }), _jsxs("div", { className: "relative", children: [_jsx("input", { ref: searchRef, type: "search", placeholder: "Search spaces, people, events...", value: query, onChange: (e) => setQuery(e.target.value), onFocus: () => onFocusChange(true), onBlur: () => onFocusChange(false), className: "w-full px-5 py-2.5 pl-11 pr-10 bg-hive-background-tertiary/40 backdrop-blur-xl border border-hive-border-default/50 rounded-xl text-hive-text-primary placeholder-hive-text-tertiary/70 focus:bg-hive-background-tertiary/60 focus:border-hive-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/20 focus:shadow-hive-gold-glow/20 transition-all duration-300 ease-out font-sans text-sm" }), _jsx(MotionDiv, { className: "absolute left-3.5 top-1/2 -translate-y-1/2", animate: {
                            rotate: isHovered ? [0, -10, 10, -10, 0] : 0
                        }, transition: { duration: 0.5, ease: HIVE_EASING.magnetic }, children: _jsx(Search, { className: "w-5 h-5 text-hive-text-tertiary/70" }) }), query && (_jsx(MotionButton, { className: "absolute right-3 top-1/2 -translate-y-1/2 text-hive-text-tertiary hover:text-hive-text-primary p-1 rounded-md hover:bg-hive-background-tertiary/50", initial: { scale: 0, rotate: -90 }, animate: { scale: 1, rotate: 0 }, exit: { scale: 0, rotate: 90 }, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, transition: { duration: 0.2, ease: HIVE_EASING.magnetic }, onClick: () => setQuery(''), children: _jsx(X, { className: "w-4 h-4" }) })), !query && !isHovered && (_jsx(MotionDiv, { className: "absolute right-3 top-1/2 -translate-y-1/2 text-hive-text-tertiary/50 text-xs font-medium font-sans pointer-events-none", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 }, children: "\u2318K" }))] })] }));
};
// Note: NotificationBell has been replaced with NotificationSystem
// The new system provides real-time notifications with behavioral psychology
// User Menu with Dropdown
const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useShell();
    return (_jsxs("div", { className: "relative", children: [_jsxs(MotionButton, { className: "flex items-center gap-2 p-1 rounded-lg hover:bg-hive-background-tertiary transition-all", onClick: () => setIsOpen(!isOpen), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, transition: { duration: 0.15, ease: HIVE_EASING.magnetic }, children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-hive-brand-primary to-hive-brand-primary/60 shadow-hive-gold-glow" }), _jsx(ChevronDown, { className: `w-4 h-4 text-hive-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}` })] }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(MotionDiv, { className: "absolute right-0 mt-2 w-56 bg-hive-background-secondary/95 backdrop-blur-xl border border-hive-border-default rounded-lg shadow-hive-level3 overflow-hidden", initial: { opacity: 0, y: -10, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.95 }, transition: { duration: 0.2, ease: HIVE_EASING.liquid }, children: [_jsxs("div", { className: "p-4 border-b border-hive-border-default", children: [_jsx("p", { className: "text-hive-text-primary font-semibold font-sans", children: "Student Name" }), _jsx("p", { className: "text-hive-text-tertiary text-sm font-sans", children: "@studenthandle" })] }), _jsxs("div", { className: "p-2", children: [[
                                    { icon: User, label: 'Profile', action: () => { } },
                                    { icon: Settings, label: 'Settings', action: () => { } },
                                    { icon: isDarkMode ? Sun : Moon, label: isDarkMode ? 'Light Mode' : 'Dark Mode', action: toggleDarkMode },
                                ].map((item, index) => {
                                    const Icon = item.icon;
                                    return (_jsxs(MotionButton, { className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-tertiary transition-all font-sans", onClick: item.action, initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.05, ease: HIVE_EASING.silk }, whileHover: { x: 4 }, children: [_jsx(Icon, { className: "w-4 h-4" }), _jsx("span", { children: item.label })] }, item.label));
                                }), _jsx("div", { className: "border-t border-hive-border-default mt-2 pt-2", children: _jsxs(MotionButton, { className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-hive-status-error hover:bg-hive-status-error/10 transition-all font-sans", whileHover: { x: 4 }, onClick: () => {
                                            // Clear session data
                                            if (typeof window !== 'undefined') {
                                                // Clear localStorage
                                                localStorage.removeItem('hive_session');
                                                localStorage.removeItem('dev_auth_mode');
                                                localStorage.removeItem('dev_user');
                                                // Clear cookies
                                                document.cookie = 'hive_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                                                document.cookie = 'dev-mode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                                                // Redirect to login
                                                window.location.href = '/auth/login?schoolId=test-university&schoolName=Test%20University&domain=test.edu';
                                            }
                                        }, children: [_jsx(LogOut, { className: "w-4 h-4" }), _jsx("span", { children: "Sign Out" })] }) })] })] })) })] }));
};
// Shell Loader with Gold Animation
const ShellLoader = () => {
    return (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsxs(MotionDiv, { className: "text-center", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, ease: HIVE_EASING.liquid }, children: [_jsx(MotionDiv, { className: "w-16 h-16 mx-auto mb-4 border-4 border-hive-brand-primary border-t-transparent rounded-full", animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" } }), _jsx("p", { className: "text-hive-text-secondary font-sans animate-pulse", children: "Loading HIVE..." })] }) }));
};
// Trending Item with Hover Effect
const TrendingItem = ({ tag, count }) => (_jsxs(MotionButton, { className: "flex items-center justify-between w-full p-2 rounded-lg hover:bg-hive-background-interactive transition-all font-sans", whileHover: { x: 4, backgroundColor: 'var(--hive-background-interactive)' }, whileTap: { scale: 0.98 }, transition: { duration: 0.15, ease: HIVE_EASING.magnetic }, children: [_jsx("span", { className: "text-hive-brand-primary", children: tag }), _jsxs("span", { className: "text-hive-text-tertiary text-sm", children: [count, " posts"] })] }));
export default UniversalShell;
//# sourceMappingURL=UniversalShell.js.map