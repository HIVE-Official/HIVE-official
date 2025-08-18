"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import Image from 'next/image';
import { HiveButton } from '../hive-button';
export function UnifiedHeader({ variant = 'landing', showBackButton = false, backHref = '/', rightAction, className = '' }) {
    const baseStyles = "relative z-10 border-b backdrop-blur-xl";
    const borderStyles = "border-white/10";
    const backgroundStyles = "bg-white/2";
    return (_jsx("div", { className: `${baseStyles} ${borderStyles} ${backgroundStyles} ${className}`, style: {
            borderColor: 'rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.02)'
        }, children: _jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Link, { href: variant === 'schools' ? '/landing' : '/', className: "flex items-center hive-gap-md hover:opacity-80 transition-opacity", children: [_jsx("div", { className: "w-6 h-6 sm:w-8 sm:h-8", children: _jsx(Image, { src: "/assets/hive-logo-white.svg", alt: "HIVE", width: 32, height: 32, className: "w-full h-full" }) }), _jsx("span", { className: "hive-font-sans text-lg sm:text-xl font-bold tracking-wide text-white", children: "HIVE" })] }), _jsx("div", { className: "flex items-center hive-gap-md", children: rightAction })] }) }) }));
}
// Pre-built header variants for common use cases
export function LandingPageHeader() {
    return _jsx(UnifiedHeader, { variant: "landing" });
}
export function SchoolsPageHeader({ onComingSoonClick }) {
    return (_jsx(UnifiedHeader, { variant: "schools", rightAction: _jsx(HiveButton, { variant: "secondary", size: "default", onClick: onComingSoonClick, children: "What's Coming" }) }));
}
export function AuthPageHeader() {
    return _jsx(UnifiedHeader, { variant: "auth" });
}
export function DashboardPageHeader() {
    return _jsx(UnifiedHeader, { variant: "dashboard" });
}
//# sourceMappingURL=unified-header.js.map