'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
const linkVariants = {
    default: [
        'text-blue-400',
        'hover:text-blue-300',
        'active:text-blue-500',
        'transition-colors duration-200 ease-out'
    ].join(' '),
    ghost: [
        'text-[var(--hive-text-primary)]',
        'hover:text-blue-400',
        'transition-colors duration-200 ease-out'
    ].join(' '),
    underline: [
        'text-[var(--hive-text-primary)]',
        'underline decoration-blue-400 underline-offset-2',
        'hover:text-blue-400 hover:decoration-blue-300',
        'transition-all duration-200 ease-out'
    ].join(' '),
    button: [
        'inline-flex items-center justify-center gap-2',
        'px-4 py-2 rounded-hive-md',
        'bg-blue-600 text-[var(--hive-text-primary)] font-medium',
        'hover:bg-blue-500',
        'active:bg-blue-700',
        'transition-all duration-200 ease-out'
    ].join(' ')
};
const linkSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
};
const linkColors = {
    primary: 'text-[var(--hive-text-primary)] hover:text-blue-400',
    secondary: 'text-gray-400 hover:text-[var(--hive-text-primary)]',
    gold: 'text-yellow-400 hover:text-yellow-300',
    muted: 'text-gray-500 hover:text-gray-400'
};
export const Link = React.forwardRef(({ variant = 'default', size = 'md', color, external = false, disabled = false, className, children, href, ...props }, ref) => {
    const baseClasses = [
        // Base styles
        'font-medium',
        'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black',
        'rounded-sm',
        // Size
        linkSizes[size],
        // Variant or custom color
        color ? linkColors[color] : linkVariants[variant],
        // Disabled state
        disabled && [
            'pointer-events-none',
            'opacity-50',
            'cursor-not-allowed'
        ].join(' ')
    ].filter(Boolean).join(' ');
    const linkProps = {
        ...props,
        ...(external && {
            target: '_blank',
            rel: 'noopener noreferrer'
        })
    };
    // Render as span if no href (for disabled state)
    if (disabled || !href) {
        return (_jsx("span", { className: cn(baseClasses, className), "aria-disabled": disabled, children: children }));
    }
    return (_jsxs("a", { ref: ref, href: href, className: cn(baseClasses, className), ...linkProps, children: [children, external && (_jsxs("svg", { className: "ml-1 h-3 w-3", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: [_jsx("path", { fillRule: "evenodd", d: "M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z", clipRule: "evenodd" }), _jsx("path", { fillRule: "evenodd", d: "M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z", clipRule: "evenodd" })] }))] }));
});
Link.displayName = 'Link';
//# sourceMappingURL=link.js.map