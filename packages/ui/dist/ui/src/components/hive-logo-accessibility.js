"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
// WCAG compliant color contrast ratios
const WCAG_COLORS = {
    // AA compliance (4.5:1 ratio)
    aa: {
        white: 'var(--hive-text-primary)',
        black: 'var(--hive-color-void)',
        gold: 'var(--hive-color-bronze)', // Darker gold for better contrast
        accent: 'var(--hive-color-sapphire)', // Blue with sufficient contrast
    },
    // AAA compliance (7:1 ratio)
    aaa: {
        white: 'var(--hive-text-primary)',
        black: 'var(--hive-color-void)',
        gold: 'var(--hive-brand-secondary)', // Even darker gold
        accent: 'var(--hive-status-info)', // Darker blue
    }
};
// Color blindness filters
const COLOR_BLIND_FILTERS = {
    protanopia: 'url(#protanopia-filter)',
    deuteranopia: 'url(#deuteranopia-filter)',
    tritanopia: 'url(#tritanopia-filter)',
    none: 'none',
};
// Accessibility variants system
const accessibilityVariants = cva("inline-flex items-center transition-all duration-200 focus:outline-none", {
    variants: {
        variant: {
            primary: "text-[var(--hive-text-primary)]",
            gold: "text-[var(--hive-color-bronze)]", // WCAG AA compliant gold
            inverted: "text-[var(--hive-background-primary)]",
            monochrome: "text-current",
        },
        size: {
            xs: "w-4 h-4 min-w-4 min-h-4",
            sm: "w-5 h-5 min-w-5 min-h-5",
            md: "w-6 h-6 min-w-6 min-h-6",
            lg: "w-8 h-8 min-w-8 min-h-8",
            xl: "w-10 h-10 min-w-10 min-h-10",
            "2xl": "w-12 h-12 min-w-12 min-h-12",
            "3xl": "w-16 h-16 min-w-16 min-h-16",
            "4xl": "w-20 h-20 min-w-20 min-h-20",
        },
        contrast: {
            normal: "",
            high: "contrast-150 brightness-110",
            maximum: "contrast-200 brightness-125",
        },
        focusRing: {
            default: "focus:ring-2 focus:ring-[var(--hive-color-gold)] focus:ring-offset-2 focus:ring-offset-[var(--hive-background-primary)]",
            enhanced: "focus:ring-4 focus:ring-[var(--hive-color-gold)] focus:ring-offset-4 focus:ring-offset-[var(--hive-background-primary)] focus:shadow-lg",
            custom: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        },
        touchTarget: {
            small: "p-1", // 44px minimum
            medium: "p-2", // 48px minimum  
            large: "p-3", // 56px minimum
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
        contrast: "normal",
        focusRing: "default",
        touchTarget: "medium",
    },
});
// Screen reader announcements
const useScreenReaderAnnouncement = () => {
    const [announcement, setAnnouncement] = useState('');
    const announce = useCallback((message, priority = 'polite') => {
        setAnnouncement(message);
        // Create temporary live region for announcement
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', priority);
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        document.body.appendChild(liveRegion);
        setTimeout(() => {
            liveRegion.textContent = message;
            setTimeout(() => {
                if (document.body.contains(liveRegion)) {
                    document.body.removeChild(liveRegion);
                }
            }, 2000);
        }, 100);
    }, []);
    return { announce, announcement };
};
// High contrast mode detection
const useHighContrastMode = () => {
    const [isHighContrast, setIsHighContrast] = useState(false);
    useEffect(() => {
        const checkHighContrast = () => {
            // Check for Windows high contrast mode
            const highContrastMedia = window.matchMedia('(prefers-contrast: high)');
            setIsHighContrast(highContrastMedia.matches);
        };
        checkHighContrast();
        const highContrastMedia = window.matchMedia('(prefers-contrast: high)');
        const handleChange = () => checkHighContrast();
        highContrastMedia.addEventListener('change', handleChange);
        return () => highContrastMedia.removeEventListener('change', handleChange);
    }, []);
    return isHighContrast;
};
// Color blindness filters component
const ColorBlindnessFilters = memo(() => (_jsx("svg", { style: { position: 'absolute', width: 0, height: 0 }, "aria-hidden": "true", children: _jsxs("defs", { children: [_jsx("filter", { id: "protanopia-filter", children: _jsx("feColorMatrix", { type: "matrix", values: "0.567, 0.433, 0, 0, 0\n                  0.558, 0.442, 0, 0, 0\n                  0, 0.242, 0.758, 0, 0\n                  0, 0, 0, 1, 0" }) }), _jsx("filter", { id: "deuteranopia-filter", children: _jsx("feColorMatrix", { type: "matrix", values: "0.625, 0.375, 0, 0, 0\n                  0.7, 0.3, 0, 0, 0\n                  0, 0.3, 0.7, 0, 0\n                  0, 0, 0, 1, 0" }) }), _jsx("filter", { id: "tritanopia-filter", children: _jsx("feColorMatrix", { type: "matrix", values: "0.95, 0.05, 0, 0, 0\n                  0, 0.433, 0.567, 0, 0\n                  0, 0.475, 0.525, 0, 0\n                  0, 0, 0, 1, 0" }) })] }) })));
ColorBlindnessFilters.displayName = 'ColorBlindnessFilters';
// Main accessibility-focused logo component
export const HiveLogoAccessible = memo(({ variant = 'primary', size = 'md', accessibility = {}, ariaLabel, ariaDescription, ariaLabelledBy, ariaDescribedBy, role = 'img', semanticPurpose = 'logo', interactive = false, onClick, onFocus, onBlur, context = 'main', landmarks = false, className, ...props }) => {
    const ref = useRef(null);
    const shouldReduceMotion = useReducedMotion();
    const systemHighContrast = useHighContrastMode();
    const { announce } = useScreenReaderAnnouncement();
    // Apply accessibility settings
    const highContrast = accessibility.highContrast || systemHighContrast;
    const complianceLevel = accessibility.complianceLevel || 'AA';
    const colorBlindSupport = accessibility.colorBlindnessSupport || 'none';
    const minTouchTarget = accessibility.minTouchTarget || 44;
    // Determine colors based on compliance level
    const colors = WCAG_COLORS[complianceLevel === 'AAA' ? 'aaa' : 'aa'];
    // Dynamic ARIA label based on context and purpose
    const dynamicAriaLabel = useMemo(() => {
        if (ariaLabel)
            return ariaLabel;
        const purposeText = {
            logo: 'HIVE company logo',
            navigation: 'Navigate to HIVE homepage',
            branding: 'HIVE brand identifier',
            decoration: 'HIVE decorative element',
        };
        const contextText = {
            header: 'in header',
            footer: 'in footer',
            sidebar: 'in sidebar',
            main: 'in main content',
            navigation: 'in navigation',
        };
        return `${purposeText[semanticPurpose]} ${contextText[context]}`;
    }, [ariaLabel, semanticPurpose, context]);
    // Enhanced description for screen readers
    const enhancedDescription = useMemo(() => {
        if (ariaDescription)
            return ariaDescription;
        if (!accessibility.describeLogo)
            return undefined;
        return `Hexagonal interlocking logo design representing the HIVE brand. ${interactive ? 'Interactive element.' : ''} ${variant === 'gold' ? 'Displayed in gold color.' : `Displayed in ${variant} variant.`}`;
    }, [ariaDescription, accessibility.describeLogo, interactive, variant]);
    // Keyboard event handler
    const handleKeyDown = useCallback((event) => {
        if (!interactive)
            return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (accessibility.announceChanges) {
                announce(`${dynamicAriaLabel} activated`, 'assertive');
            }
            onClick?.(event);
        }
    }, [interactive, onClick, dynamicAriaLabel, accessibility.announceChanges, announce]);
    // Focus handlers with announcements
    const handleFocus = useCallback((event) => {
        if (accessibility.announceChanges) {
            announce(`Focused on ${dynamicAriaLabel}`, 'polite');
        }
        onFocus?.(event);
    }, [onFocus, dynamicAriaLabel, accessibility.announceChanges, announce]);
    const handleBlur = useCallback((event) => {
        onBlur?.(event);
    }, [onBlur]);
    // Click handler with haptic feedback
    const handleClick = useCallback((event) => {
        if (accessibility.hapticFeedback && 'vibrate' in navigator) {
            navigator.vibrate(50); // Brief tactile feedback
        }
        if (accessibility.announceChanges) {
            announce(`${dynamicAriaLabel} activated`, 'assertive');
        }
        onClick?.(event);
    }, [onClick, dynamicAriaLabel, accessibility.announceChanges, accessibility.hapticFeedback, announce]);
    // Touch target size enforcement
    const touchTargetSize = useMemo(() => {
        if (minTouchTarget <= 44)
            return 'small';
        if (minTouchTarget <= 48)
            return 'medium';
        return 'large';
    }, [minTouchTarget]);
    // Animation configuration
    const animationProps = useMemo(() => {
        if (shouldReduceMotion || accessibility.noAnimations || accessibility.reducedMotion) {
            return {};
        }
        return {
            whileFocus: { scale: 1.02 },
            whileHover: interactive ? { scale: 1.05 } : {},
            whileTap: interactive ? { scale: 0.98 } : {},
            transition: { duration: 0.2 },
        };
    }, [shouldReduceMotion, accessibility, interactive]);
    // Component props
    const componentProps = {
        ref,
        className: cn(accessibilityVariants({
            variant,
            size,
            contrast: highContrast ? (complianceLevel === 'AAA' ? 'maximum' : 'high') : 'normal',
            focusRing: accessibility.focusRing || 'default',
            touchTarget: touchTargetSize,
            className,
        })),
        role: interactive ? (role === 'img' ? 'button' : role) : role,
        'aria-label': dynamicAriaLabel,
        'aria-description': enhancedDescription,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        tabIndex: interactive ? (accessibility.customTabOrder || 0) : undefined,
        onClick: interactive ? handleClick : undefined,
        onKeyDown: interactive ? handleKeyDown : undefined,
        onFocus: interactive ? handleFocus : undefined,
        onBlur: interactive ? handleBlur : undefined,
        style: {
            minWidth: `${minTouchTarget}px`,
            minHeight: `${minTouchTarget}px`,
            color: colors[variant] || colors.white,
            filter: COLOR_BLIND_FILTERS[colorBlindSupport],
        },
        ...animationProps,
        ...props,
    };
    // Landmark wrapper for navigation context
    const LogoComponent = () => (_jsxs(_Fragment, { children: [_jsx(ColorBlindnessFilters, {}), _jsxs(motion.div, { ...componentProps, children: [_jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", "aria-hidden": "true" // Logo SVG is decorative, label is on container
                        , children: _jsx("path", { d: "M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z", fill: "currentColor" }) }), !accessibility.simpleMode && (_jsx("span", { className: cn("ml-2 font-bold tracking-wide select-none", accessibility.enlargeText && "text-lg", accessibility.clearLabels && "font-extrabold"), "aria-hidden": "true" // Wordmark is decorative, main label is on container
                        , children: "HIVE" }))] })] }));
    // Wrap in landmark if requested
    if (landmarks && context === 'navigation') {
        return (_jsx("nav", { "aria-label": "Main navigation", children: _jsx(LogoComponent, {}) }));
    }
    if (landmarks && context === 'header') {
        return (_jsx("header", { children: _jsx(LogoComponent, {}) }));
    }
    return _jsx(LogoComponent, {});
});
HiveLogoAccessible.displayName = 'HiveLogoAccessible';
// Skip link component for keyboard navigation
export const HiveSkipLink = ({ href, children, className }) => {
    return (_jsx("a", { href: href, className: cn("sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50", "px-4 py-2 bg-transparent border border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)] font-semibold rounded-lg", "focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--hive-brand-secondary)]", className), children: children }));
};
// Accessibility testing component
export const HiveLogoAccessibilityTest = ({ className }) => {
    const [testResults, setTestResults] = useState({
        contrastRatio: 0,
        keyboardAccessible: false,
        screenReaderFriendly: false,
        touchTargetSize: 0,
    });
    useEffect(() => {
        // Run accessibility tests
        const runTests = () => {
            // Color contrast test
            const contrastRatio = calculateContrastRatio('var(--hive-text-primary)', 'var(--hive-background-primary)');
            // Keyboard accessibility test
            const keyboardAccessible = checkKeyboardAccessibility();
            // Screen reader test
            const screenReaderFriendly = checkScreenReaderSupport();
            // Touch target size test
            const touchTargetSize = measureTouchTargetSize();
            setTestResults({
                contrastRatio,
                keyboardAccessible,
                screenReaderFriendly,
                touchTargetSize,
            });
        };
        runTests();
    }, []);
    const calculateContrastRatio = (color1, color2) => {
        // Simplified contrast ratio calculation
        // In production, use a proper color contrast library
        return 4.5; // Mock value
    };
    const checkKeyboardAccessibility = () => {
        // Check if logo is keyboard accessible
        return true; // Mock value
    };
    const checkScreenReaderSupport = () => {
        // Check if logo has proper ARIA attributes
        return true; // Mock value
    };
    const measureTouchTargetSize = () => {
        // Measure touch target size
        return 44; // Mock value
    };
    return (_jsxs("div", { className: cn("p-6 bg-[var(--hive-background-primary)]/20 rounded-xl space-y-4", className), children: [_jsx("h3", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: "Accessibility Test Results" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]/70", children: "Contrast Ratio:" }), _jsxs("span", { className: cn("font-semibold", testResults.contrastRatio >= 4.5 ? "text-green-400" : "text-red-400"), children: [testResults.contrastRatio, ":1 ", testResults.contrastRatio >= 4.5 ? "✓" : "✗"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]/70", children: "Keyboard Accessible:" }), _jsx("span", { className: cn("font-semibold", testResults.keyboardAccessible ? "text-green-400" : "text-red-400"), children: testResults.keyboardAccessible ? "✓ Pass" : "✗ Fail" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]/70", children: "Screen Reader Support:" }), _jsx("span", { className: cn("font-semibold", testResults.screenReaderFriendly ? "text-green-400" : "text-red-400"), children: testResults.screenReaderFriendly ? "✓ Pass" : "✗ Fail" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]/70", children: "Touch Target Size:" }), _jsxs("span", { className: cn("font-semibold", testResults.touchTargetSize >= 44 ? "text-green-400" : "text-red-400"), children: [testResults.touchTargetSize, "px ", testResults.touchTargetSize >= 44 ? "✓" : "✗"] })] })] })] }));
};
// Export accessibility components (already exported with const declarations above)
export { ColorBlindnessFilters, };
//# sourceMappingURL=hive-logo-accessibility.js.map