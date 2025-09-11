'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
// Max width variants based on Tailwind responsive breakpoints
const maxWidthVariants = {
    xs: 'max-w-xs', // 320px
    sm: 'max-w-sm', // 384px
    md: 'max-w-md', // 448px
    lg: 'max-w-lg', // 512px
    xl: 'max-w-xl', // 576px
    '2xl': 'max-w-2xl', // 672px
    '3xl': 'max-w-3xl', // 768px
    '4xl': 'max-w-4xl', // 896px
    '5xl': 'max-w-5xl', // 1024px
    '6xl': 'max-w-6xl', // 1152px
    '7xl': 'max-w-7xl', // 1280px
    full: 'max-w-full',
    none: 'max-w-none'
};
// Padding variants using HIVE spacing scale
const paddingVariants = {
    none: '',
    xs: 'p-2', // 2
    sm: 'p-4', // 16px
    md: 'p-6', // 24px
    lg: 'p-8', // 32px
    xl: 'p-12' // 48px
};
// Responsive padding with gutters
const gutterPadding = {
    none: '',
    xs: 'px-2',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 md:px-8',
    lg: 'px-4 sm:px-6 md:px-8 lg:px-12',
    xl: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'
};
// Container variants for different use cases
const containerVariants = {
    default: '',
    card: [
        'bg-[var(--hive-background-secondary)]',
        'border border-[var(--hive-border-primary)]',
        'rounded-xl',
        'shadow-sm'
    ].join(' '),
    panel: [
        'bg-[var(--hive-background-primary)]',
        'border border-[var(--hive-border-primary)]',
        'rounded-lg'
    ].join(' '),
    section: [
        'bg-[var(--hive-background-tertiary)]',
        'border-y border-[var(--hive-border-tertiary)]'
    ].join(' ')
};
export const Container = React.forwardRef(({ maxWidth = '7xl', padding = 'md', center = true, fluid = false, breakout = false, variant = 'default', gutter = false, className, children, title, subtitle, breadcrumbs, actions, ...props }, ref) => {
    const baseClasses = [
        // Container basics
        'w-full',
        // Max width (unless fluid or breakout)
        !fluid && !breakout && (maxWidthVariants[maxWidth] || maxWidth),
        // Centering
        center && 'mx-auto',
        // Padding
        gutter
            ? gutterPadding[padding]
            : paddingVariants[padding],
        // Fluid behavior
        fluid && 'min-w-full',
        // Breakout behavior (extends beyond normal constraints)
        breakout && [
            'relative',
            'left-1/2',
            'right-1/2',
            '-ml-[50vw]',
            '-mr-[50vw]',
            'w-screen',
            'max-w-none'
        ].join(' '),
        // Variant styles
        containerVariants[variant]
    ].filter(Boolean).join(' ');
    return (_jsxs("div", { ref: ref, className: cn(baseClasses, className), ...props, children: [(title || subtitle || breadcrumbs || actions) && (_jsxs("div", { className: "mb-6", children: [breadcrumbs && (_jsx("nav", { className: "flex space-x-2 text-sm mb-2", children: breadcrumbs.map((crumb, index) => (_jsxs("span", { className: "flex items-center", children: [index > 0 && _jsx("span", { className: "mx-2 text-[var(--hive-text-tertiary)]", children: "/" }), crumb.icon, crumb.href ? (_jsx("a", { href: crumb.href, className: "text-[var(--hive-brand-secondary)] hover:underline", children: crumb.label })) : (_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: crumb.label }))] }, index))) })), _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [title && _jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: title }), subtitle && _jsx("p", { className: "text-[var(--hive-text-secondary)] mt-1", children: subtitle })] }), actions && _jsx("div", { children: actions })] })] })), children] }));
});
Container.displayName = 'Container';
// Convenient preset components
export const PageContainer = (props) => (_jsx(Container, { maxWidth: "7xl", gutter: true, ...props }));
export const ContentContainer = (props) => (_jsx(Container, { maxWidth: "4xl", ...props }));
export const NarrowContainer = (props) => (_jsx(Container, { maxWidth: "2xl", ...props }));
export const WideContainer = (props) => (_jsx(Container, { maxWidth: "6xl", ...props }));
export const FluidContainer = (props) => (_jsx(Container, { fluid: true, ...props }));
export const CardContainer = (props) => (_jsx(Container, { variant: "card", ...props }));
export const PanelContainer = (props) => (_jsx(Container, { variant: "panel", ...props }));
export const SectionContainer = (props) => (_jsx(Container, { variant: "section", ...props }));
export const BreakoutContainer = (props) => (_jsx(Container, { breakout: true, ...props }));
// Size-specific containers
export const SmallContainer = (props) => (_jsx(Container, { maxWidth: "sm", ...props }));
export const MediumContainer = (props) => (_jsx(Container, { maxWidth: "md", ...props }));
export const LargeContainer = (props) => (_jsx(Container, { maxWidth: "lg", ...props }));
export const ExtraLargeContainer = (props) => (_jsx(Container, { maxWidth: "xl", ...props }));
// Layout composition helpers
export const CenteredContent = ({ children, className }) => (_jsx(Container, { maxWidth: "4xl", center: true, padding: "lg", className: className, children: children }));
export const FullWidthSection = ({ children, className }) => (_jsx(Container, { fluid: true, variant: "section", padding: "xl", className: className, children: _jsx(Container, { maxWidth: "7xl", center: true, padding: "none", children: children }) }));
//# sourceMappingURL=container.js.map