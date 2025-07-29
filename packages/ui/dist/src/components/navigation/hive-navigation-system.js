"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { cn } from '../../lib/utils.js';
import { motion } from '../framer-motion-proxy.js';
import { getHiveMotionProps } from '../../lib/motion-utils.js';
const NavigationContext = createContext(null);
export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
export function NavigationProvider({ children, config, user = null, sections, onNavigate, onConfigChange }) {
    const [currentConfig, setCurrentConfig] = useState(config);
    const [isCollapsed, setIsCollapsed] = useState(config.defaultCollapsed ?? false);
    const [isMobile, setIsMobile] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [activeItemId, setActiveItemId] = useState(null);
    // Handle mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < (currentConfig.mobileBreakpoint ?? 768));
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [currentConfig.mobileBreakpoint]);
    // Handle keyboard shortcuts
    useEffect(() => {
        if (!currentConfig.keyboardShortcuts)
            return;
        const handleKeyDown = (e) => {
            // Command/Ctrl + K for search
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
            // Command/Ctrl + B for sidebar toggle
            if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
                e.preventDefault();
                setIsCollapsed(!isCollapsed);
            }
            // Escape to close overlays
            if (e.key === 'Escape') {
                setSearchOpen(false);
                setNotificationsOpen(false);
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [currentConfig.keyboardShortcuts, isCollapsed]);
    const updateConfig = (newConfig) => {
        const updatedConfig = { ...currentConfig, ...newConfig };
        setCurrentConfig(updatedConfig);
        onConfigChange?.(updatedConfig);
    };
    const navigate = (item) => {
        setActiveItemId(item.id);
        onNavigate?.(item);
        // Close mobile menu after navigation
        if (isMobile) {
            setIsCollapsed(true);
        }
    };
    const value = {
        config: currentConfig,
        user,
        sections,
        isCollapsed,
        isMobile,
        searchOpen,
        notificationsOpen,
        userMenuOpen,
        activeItemId,
        setCollapsed: setIsCollapsed,
        setSearchOpen,
        setNotificationsOpen,
        setUserMenuOpen,
        setActiveItem: setActiveItemId,
        updateConfig,
        navigate
    };
    return (_jsx(NavigationContext.Provider, { value: value, children: children }));
}
export function NavigationContainer({ children, className, style }) {
    const { config } = useNavigation();
    return (_jsx(motion.nav, { className: cn("hive-navigation", `hive-navigation--${config.variant}`, `hive-navigation--${config.size}`, `hive-navigation--${config.position}`, 
        // HIVE design system base styles
        "relative overflow-hidden transition-all duration-300 ease-out", "backdrop-blur-sm", className), style: {
            backgroundColor: 'var(--hive-background-primary)',
            color: 'var(--hive-text-primary)',
            border: `1px solid var(--hive-border-subtle)`,
            ...style
        }, role: "navigation", "aria-label": "Main navigation", ...getHiveMotionProps('surface'), children: children }));
}
export function NavigationBrand({ logo, title, subtitle, href, className }) {
    const { config, isCollapsed } = useNavigation();
    const brandContent = (_jsxs("div", { className: cn("flex items-center gap-3 transition-all duration-300 ease-out", isCollapsed && config.variant === 'sidebar' && "justify-center", className), children: [logo && (_jsx("div", { className: "flex-shrink-0", children: logo })), (!isCollapsed || config.variant !== 'sidebar') && (_jsxs("div", { className: "flex flex-col min-w-0", children: [title && (_jsx("span", { className: "font-semibold text-lg tracking-tight truncate", style: {
                            color: 'var(--hive-text-primary)',
                            fontFamily: 'var(--hive-font-family-primary)',
                            fontSize: 'var(--hive-font-size-lg)',
                            fontWeight: 'var(--hive-font-weight-semibold)'
                        }, children: title })), subtitle && (_jsx("span", { className: "text-sm truncate", style: {
                            color: 'var(--hive-text-muted)',
                            fontSize: 'var(--hive-font-size-sm)',
                            fontWeight: 'var(--hive-font-weight-regular)'
                        }, children: subtitle }))] }))] }));
    if (href) {
        return (_jsx(motion.a, { href: href, className: "block p-4 hover:bg-[var(--hive-interactive-hover)] transition-all duration-200 rounded-2xl", "aria-label": `${title} home`, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: brandContent }));
    }
    return (_jsx("div", { className: "p-4", children: brandContent }));
}
//# sourceMappingURL=hive-navigation-system.js.map