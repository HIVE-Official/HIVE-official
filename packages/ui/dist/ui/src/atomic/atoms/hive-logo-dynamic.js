'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Image from 'next/image';
const LOGO_PATHS = {
    gold: '/assets/hive-logo-gold.svg',
    black: '/assets/hive-logo-black.svg',
    white: '/assets/hive-logo-white.svg',
};
const SIZES = {
    xs: { width: 24, height: 24 },
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 },
};
export const HiveLogoDynamic = ({ variant = 'auto', size = 'md', className = '', alt = 'HIVE', glow = false, animated = false, }) => {
    // Auto-detect variant based on parent background
    const [detectedVariant, setDetectedVariant] = React.useState('gold');
    React.useEffect(() => {
        if (variant === 'auto') {
            // Check if we're in a dark theme context
            const isDark = document.documentElement.classList.contains('dark') ||
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            // Check parent background color
            const checkParentBackground = (element) => {
                if (!element)
                    return;
                const bgColor = window.getComputedStyle(element).backgroundColor;
                if (bgColor && bgColor !== 'transparent') {
                    // Parse RGB values
                    const rgb = bgColor.match(/\d+/g);
                    if (rgb) {
                        const [r, g, b] = rgb.map(Number);
                        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                        // Use gold on dark backgrounds, black on light backgrounds
                        setDetectedVariant(brightness < 128 ? 'gold' : 'black');
                    }
                }
            };
            // Try to detect from immediate parent
            const parent = document.querySelector('.logo-container');
            if (parent) {
                checkParentBackground(parent);
            }
            else {
                // Default based on theme
                setDetectedVariant(isDark ? 'gold' : 'black');
            }
        }
    }, [variant]);
    const finalVariant = variant === 'auto' ? detectedVariant : variant;
    const dimensions = SIZES[size];
    return (_jsxs("div", { className: `
        relative inline-block
        ${animated ? 'transition-transform hover:scale-110' : ''}
        ${className}
      `, children: [_jsx(Image, { src: LOGO_PATHS[finalVariant], alt: alt, width: dimensions.width, height: dimensions.height, priority: true, className: `
          ${finalVariant === 'gold' && glow ? 'drop-shadow-[0_0_20px_color-mix(in srgb, var(--hive-brand-secondary) 50%, transparent)]' : ''}
        ` }), finalVariant === 'gold' && glow && (_jsx("div", { className: "absolute inset-0 -z-10", children: _jsx(Image, { src: LOGO_PATHS.gold, alt: "", width: dimensions.width, height: dimensions.height, className: "blur-xl opacity-50 animate-pulse", "aria-hidden": "true" }) }))] }));
};
/**
 * Logo with text lockup
 */
export const HiveLogoLockup = ({ variant = 'auto', size = 'md', orientation = 'horizontal', tagline }) => {
    const textSizes = {
        sm: 'text-xl',
        md: 'text-3xl',
        lg: 'text-5xl'
    };
    const logoSizes = {
        sm: 'sm',
        md: 'md',
        lg: 'lg'
    };
    const textColors = {
        gold: 'text-[var(--hive-brand-secondary)]',
        black: 'text-black',
        white: 'text-white',
        auto: 'text-current'
    };
    return (_jsxs("div", { className: `
        flex items-center gap-3
        ${orientation === 'vertical' ? 'flex-col text-center' : 'flex-row'}
      `, children: [_jsx(HiveLogoDynamic, { variant: variant, size: logoSizes[size], glow: variant === 'gold', animated: true }), _jsxs("div", { children: [_jsx("div", { className: `font-black tracking-tight ${textSizes[size]} ${textColors[variant]}`, children: "HIVE" }), tagline && (_jsx("div", { className: `text-xs uppercase tracking-wider opacity-60 mt-1`, children: tagline }))] })] }));
};
/**
 * Animated logo for loading states
 */
export const HiveLogoSpinner = ({ size = 'md' }) => {
    return (_jsxs("div", { className: "relative", children: [_jsx(HiveLogoDynamic, { variant: "gold", size: size, className: "animate-spin" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx("div", { className: "w-1/2 h-1/2 bg-black rounded-full" }) })] }));
};
/**
 * Logo usage examples
 */
export const LogoUsageExamples = () => {
    return (_jsxs("div", { className: "space-y-8 p-8", children: [_jsxs("div", { className: "bg-black p-8 rounded-lg", children: [_jsx("h3", { className: "text-white mb-4", children: "On Black (Gold Logo)" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(HiveLogoDynamic, { variant: "gold", size: "sm" }), _jsx(HiveLogoDynamic, { variant: "gold", size: "md", glow: true }), _jsx(HiveLogoDynamic, { variant: "gold", size: "lg", glow: true, animated: true })] })] }), _jsxs("div", { className: "bg-white p-8 rounded-lg", children: [_jsx("h3", { className: "text-black mb-4", children: "On White (Black Logo)" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(HiveLogoDynamic, { variant: "black", size: "sm" }), _jsx(HiveLogoDynamic, { variant: "black", size: "md" }), _jsx(HiveLogoDynamic, { variant: "black", size: "lg", animated: true })] })] }), _jsxs("div", { className: "bg-[var(--hive-brand-secondary)] p-8 rounded-lg", children: [_jsx("h3", { className: "text-black mb-4", children: "On Gold (Black Logo)" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(HiveLogoDynamic, { variant: "black", size: "sm" }), _jsx(HiveLogoDynamic, { variant: "black", size: "md" }), _jsx(HiveLogoDynamic, { variant: "black", size: "lg" })] })] }), _jsxs("div", { className: "bg-black p-8 rounded-lg", children: [_jsx("h3", { className: "text-white mb-4", children: "Logo Lockups" }), _jsxs("div", { className: "space-y-4", children: [_jsx(HiveLogoLockup, { variant: "gold", size: "md", tagline: "Campus Operating System" }), _jsx(HiveLogoLockup, { variant: "gold", size: "lg", orientation: "vertical", tagline: "Built by students, for students" })] })] }), _jsxs("div", { className: "bg-black p-8 rounded-lg", children: [_jsx("h3", { className: "text-white mb-4", children: "Loading States" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(HiveLogoSpinner, { size: "sm" }), _jsx(HiveLogoSpinner, { size: "md" }), _jsx(HiveLogoSpinner, { size: "lg" })] })] })] }));
};
export default HiveLogoDynamic;
//# sourceMappingURL=hive-logo-dynamic.js.map