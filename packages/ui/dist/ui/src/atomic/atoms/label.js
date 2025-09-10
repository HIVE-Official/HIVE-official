'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils.js';
const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
};
const labelVariants = {
    default: 'block font-medium text-[var(--hive-text-primary)]',
    inline: 'inline-flex items-center font-medium text-[var(--hive-text-primary)]',
    floating: 'absolute font-medium text-[var(--hive-text-secondary)] transition-all duration-200 ease-out'
};
export const Label = React.forwardRef(({ htmlFor, required = false, size = 'md', variant = 'default', disabled = false, className, children, ...props }, ref) => {
    const baseClasses = [
        labelVariants[variant],
        labelSizes[size],
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed',
        // Floating variant positioning
        variant === 'floating' && [
            'left-3 top-2.5',
            'pointer-events-none',
            'peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-[var(--hive-text-muted)]',
            'peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-[var(--hive-brand-secondary)]',
            'peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs'
        ].join(' ')
    ].filter(Boolean).join(' ');
    return (_jsxs("label", { ref: ref, htmlFor: htmlFor, className: cn(baseClasses, className), ...props, children: [children, required && (_jsx("span", { className: "text-[var(--hive-status-error)] ml-1", "aria-label": "required", title: "This field is required", children: "*" }))] }));
});
Label.displayName = 'Label';
//# sourceMappingURL=label.js.map