"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { getLogoMotionProps } from '../lib/motion-utils';
// HIVE Responsive & Contextual Logo System
// Adapts to screen size, user preferences, and application context
const responsiveVariants = cva("transition-all duration-300 ease-in-out", {
    variants: {
        breakpoint: {
            mobile: "w-6 h-6",
            tablet: "w-8 h-8",
            desktop: "w-10 h-10",
            wide: "w-12 h-12",
        },
        layout: {
            horizontal: "flex-row space-x-2",
            vertical: "flex-col space-y-1",
            icon: "justify-center",
        },
        theme: {
            light: "text-[var(--hive-background-primary)]",
            dark: "text-[var(--hive-text-primary)]",
            auto: "text-current",
            gold: "text-[var(--hive-color-gold)]",
            brand: "text-[var(--hive-text-primary)]",
        }
    },
    defaultVariants: {
        breakpoint: "desktop",
        layout: "horizontal",
        theme: "auto",
    },
});
// Hook to detect screen size
const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState('desktop');
    useEffect(() => {
        const checkBreakpoint = () => {
            const width = window.innerWidth;
            if (width < 640)
                setBreakpoint('mobile');
            else if (width < 1024)
                setBreakpoint('tablet');
            else if (width < 1920)
                setBreakpoint('desktop');
            else
                setBreakpoint('wide');
        };
        checkBreakpoint();
        window.addEventListener('resize', checkBreakpoint);
        return () => window.removeEventListener('resize', checkBreakpoint);
    }, []);
    return breakpoint;
};
// Hook to detect theme preference
const useThemeDetection = () => {
    const [theme, setTheme] = useState('dark');
    useEffect(() => {
        const checkTheme = () => {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(isDark ? 'dark' : 'light');
        };
        checkTheme();
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', checkTheme);
        return () => mediaQuery.removeEventListener('change', checkTheme);
    }, []);
    return theme;
};
// Base HIVE logo path
const HIVE_PATH = "M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z";
// 1. FULLY RESPONSIVE LOGO
export const HiveLogoResponsive = ({ showWordmark = true, adaptToContext = true, theme: propTheme, userPreferences = {}, className, ...props }) => {
    const detectedBreakpoint = useBreakpoint();
    const detectedTheme = useThemeDetection();
    const theme = propTheme || (adaptToContext ? detectedTheme : 'auto');
    // Adapt layout based on screen size
    const layout = detectedBreakpoint === 'mobile' ? 'vertical' :
        detectedBreakpoint === 'tablet' && !showWordmark ? 'icon' :
            'horizontal';
    // Adapt wordmark visibility
    const shouldShowWordmark = showWordmark && detectedBreakpoint !== 'mobile';
    // Motion preferences
    const shouldAnimate = !userPreferences.reducedMotion;
    return (_jsxs(motion.div, { className: cn("flex items-center", responsiveVariants({
            breakpoint: detectedBreakpoint,
            layout,
            theme,
            className
        })), initial: shouldAnimate ? { opacity: 0, scale: 0.9 } : {}, animate: shouldAnimate ? { opacity: 1, scale: 1 } : {}, transition: shouldAnimate ? { duration: 0.3, ease: "easeOut" } : {}, ...getLogoMotionProps(props), children: [_jsx(motion.div, { className: "flex-shrink-0", whileHover: shouldAnimate ? { scale: 1.05 } : {}, whileTap: shouldAnimate ? { scale: 0.95 } : {}, children: _jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: _jsx("path", { d: HIVE_PATH, fill: "currentColor" }) }) }), _jsx(AnimatePresence, { children: shouldShowWordmark && (_jsx(motion.span, { className: cn("font-bold tracking-wide select-none", layout === "vertical" && "text-center", userPreferences.fontSize === 'small' && "text-sm", userPreferences.fontSize === 'large' && "text-lg"), initial: { opacity: 0, width: 0 }, animate: { opacity: 1, width: "auto" }, exit: { opacity: 0, width: 0 }, transition: { duration: 0.2 }, children: "HIVE" })) })] }));
};
// 2. NAVIGATION LOGO (Context-Aware)
export const HiveLogoNavigation = ({ isScrolled = false, isMenuOpen = false, className, ...props }) => {
    const breakpoint = useBreakpoint();
    // Size adapts to scroll state and screen size
    const size = isScrolled ? 'sm' :
        breakpoint === 'mobile' ? 'md' : 'lg';
    return (_jsx(motion.div, { className: cn("flex items-center", className), animate: {
            scale: isScrolled ? 0.8 : 1,
            opacity: isMenuOpen ? 0.7 : 1,
        }, transition: { duration: 0.2, ease: "easeOut" }, ...getLogoMotionProps(props), children: _jsx(HiveLogoResponsive, { showWordmark: !isScrolled && breakpoint !== 'mobile', theme: "brand", userPreferences: { reducedMotion: false } }) }));
};
// 3. ADAPTIVE FAVICON SYSTEM
export const HiveLogofavicon = ({ size = 32, context = "default", className, ...props }) => {
    const contextColors = {
        default: "currentColor",
        notification: "var(--hive-color-gold)",
        activity: "var(--hive-status-success)",
        error: "var(--hive-status-error)",
    };
    const shouldPulse = context !== "default";
    return (_jsx(motion.div, { className: cn("flex items-center justify-center", className), style: {
            width: size,
            height: size,
            color: contextColors[context]
        }, animate: shouldPulse ? {
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
        } : {}, transition: shouldPulse ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        } : {}, ...getLogoMotionProps(props), children: _jsxs("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: [_jsx("path", { d: HIVE_PATH, fill: "currentColor" }), context !== "default" && (_jsx("circle", { cx: "1200", cy: "300", r: "150", fill: contextColors[context], className: "animate-pulse" }))] }) }));
};
// 4. THEME-ADAPTIVE LOGO
export const HiveLogoThemeAdaptive = ({ className, ...props }) => {
    const theme = useThemeDetection();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return _jsx("div", { className: "w-8 h-8" }); // Placeholder to prevent hydration mismatch
    }
    return (_jsx(motion.div, { className: cn("flex items-center", className), initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 }, ...getLogoMotionProps(props), children: _jsx(HiveLogoResponsive, { theme: theme, showWordmark: true, adaptToContext: false }) }, theme));
};
// 5. LOADING STATE LOGO
export const HiveLogoLoading = ({ progress = 0, message = "Loading...", className, ...props }) => {
    return (_jsxs(motion.div, { className: cn("flex flex-col items-center space-y-4", className), initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, ...getLogoMotionProps(props), children: [_jsxs(motion.div, { className: "relative w-16 h-16 text-[var(--hive-color-gold)]", animate: { rotate: 360 }, transition: { duration: 2, repeat: Infinity, ease: "linear" }, children: [_jsxs("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: [_jsx("path", { d: HIVE_PATH, fill: "currentColor", opacity: "0.3" }), _jsx("defs", { children: _jsx("mask", { id: "progress-mask", children: _jsx("rect", { x: "0", y: "0", width: "1500", height: 1500 * (progress / 100), fill: "white" }) }) }), _jsx("path", { d: HIVE_PATH, fill: "currentColor", mask: "url(#progress-mask)" })] }), _jsxs("svg", { className: "absolute inset-0 w-full h-full transform -rotate-90", children: [_jsx("circle", { cx: "50%", cy: "50%", r: "40%", fill: "none", stroke: "currentColor", strokeWidth: "2", opacity: "0.2" }), _jsx(motion.circle, { cx: "50%", cy: "50%", r: "40%", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", initial: { pathLength: 0 }, animate: { pathLength: progress / 100 }, transition: { duration: 0.5, ease: "easeInOut" }, style: {
                                    strokeDasharray: "251.2", // 2 * π * r where r = 40% of viewbox
                                    strokeDashoffset: 251.2 * (1 - progress / 100),
                                } })] })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: message }), _jsxs("div", { className: "text-[var(--hive-text-primary)]/60 text-sm", children: [Math.round(progress), "%"] })] })] }));
};
// 6. USER STATUS LOGO
export const HiveLogoUserStatus = ({ status = "online", size = "md", showStatus = true, className, ...props }) => {
    const statusColors = {
        online: "var(--hive-status-success)",
        away: "var(--hive-color-gold)",
        busy: "var(--hive-status-error)",
        offline: "var(--hive-text-disabled)",
    };
    const statusAnimation = {
        online: { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] },
        away: { opacity: [1, 0.5, 1] },
        busy: { scale: [1, 0.9, 1] },
        offline: {},
    };
    return (_jsxs("div", { className: cn("relative", className), ...props, children: [_jsx(HiveLogoResponsive, { breakpoint: size, theme: "brand", showWordmark: false }), showStatus && (_jsx(motion.div, { className: "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[var(--hive-background-primary)]", style: { backgroundColor: statusColors[status] }, animate: statusAnimation[status], transition: {
                    duration: 2,
                    repeat: status === "online" ? Infinity : 0,
                    ease: "easeInOut"
                } }))] }));
};
// 7. CONTEXTUAL APP LOGO
export const HiveLogoApp = ({ appSection = "dashboard", className, ...props }) => {
    const sectionColors = {
        dashboard: "var(--hive-text-primary)",
        spaces: "var(--hive-color-gold)",
        profile: "var(--hive-status-info)",
        settings: "var(--hive-status-warning)",
        tools: "var(--hive-brand-secondary)",
    };
    const sectionEffects = {
        dashboard: "none",
        spaces: "glow",
        profile: "pulse",
        settings: "spin",
        tools: "bounce",
    };
    return (_jsxs(motion.div, { className: cn("flex items-center space-x-2", className), style: { color: sectionColors[appSection] }, initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3 }, ...getLogoMotionProps(props), children: [_jsx(HiveLogoResponsive, { showWordmark: true, theme: "auto", userPreferences: { reducedMotion: false } }), _jsx(motion.div, { className: "text-xs font-medium opacity-60 capitalize", initial: { opacity: 0 }, animate: { opacity: 0.6 }, transition: { delay: 0.2 }, children: appSection })] }));
};
// Export all responsive variants
export { HiveLogoResponsive as ResponsiveLogo, HiveLogoNavigation as NavigationLogo, HiveLogofavicon as FaviconLogo, HiveLogoThemeAdaptive as ThemeAdaptiveLogo, HiveLogoLoading as LoadingLogo, HiveLogoUserStatus as UserStatusLogo, HiveLogoApp as AppLogo, };
//# sourceMappingURL=hive-logo-responsive.js.map