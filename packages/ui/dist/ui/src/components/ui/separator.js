'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
const separatorVariants = cva(
// Base styles
'flex-shrink-0', {
    variants: {
        orientation: {
            horizontal: 'h-px w-full',
            vertical: 'h-full w-px',
        },
        variant: {
            default: 'bg-hive-border-default',
            muted: 'bg-hive-border-muted',
            subtle: 'bg-hive-border-subtle',
            strong: 'bg-hive-border-strong',
            gold: 'bg-hive-gold/20',
            glass: 'bg-hive-background-glass/30 backdrop-blur-sm',
        },
        size: {
            thin: '',
            default: '',
            thick: '',
        },
        spacing: {
            tight: '',
            default: '',
            loose: '',
        },
    },
    compoundVariants: [
        // Horizontal variants
        {
            orientation: 'horizontal',
            size: 'thin',
            className: 'h-px',
        },
        {
            orientation: 'horizontal',
            size: 'default',
            className: 'h-0.5',
        },
        {
            orientation: 'horizontal',
            size: 'thick',
            className: 'h-1',
        },
        // Vertical variants
        {
            orientation: 'vertical',
            size: 'thin',
            className: 'w-px',
        },
        {
            orientation: 'vertical',
            size: 'default',
            className: 'w-0.5',
        },
        {
            orientation: 'vertical',
            size: 'thick',
            className: 'w-1',
        },
        // Spacing variants
        {
            orientation: 'horizontal',
            spacing: 'tight',
            className: 'my-2',
        },
        {
            orientation: 'horizontal',
            spacing: 'default',
            className: 'my-4',
        },
        {
            orientation: 'horizontal',
            spacing: 'loose',
            className: 'my-6',
        },
        {
            orientation: 'vertical',
            spacing: 'tight',
            className: 'mx-2',
        },
        {
            orientation: 'vertical',
            spacing: 'default',
            className: 'mx-4',
        },
        {
            orientation: 'vertical',
            spacing: 'loose',
            className: 'mx-6',
        },
    ],
    defaultVariants: {
        orientation: 'horizontal',
        variant: 'default',
        size: 'default',
        spacing: 'default',
    },
});
const Separator = React.forwardRef(({ className, orientation = 'horizontal', variant = 'default', size = 'default', spacing = 'default', decorative, animated = false, ...props }, ref) => {
    const baseClasses = cn(separatorVariants({ orientation, variant, size, spacing }), {
        'animate-pulse': animated && variant === 'gold',
    }, className);
    if (decorative) {
        return (_jsxs("div", { ref: ref, className: cn('flex items-center', {
                'flex-col': orientation === 'horizontal',
                'flex-row': orientation === 'vertical',
            }), ...props, children: [_jsx("div", { className: cn(baseClasses, 'flex-1') }), _jsx("div", { className: cn('px-3', {
                        'py-1': orientation === 'horizontal',
                        'py-3': orientation === 'vertical',
                    }), children: decorative }), _jsx("div", { className: cn(baseClasses, 'flex-1') })] }));
    }
    return (_jsx("div", { ref: ref, className: baseClasses, role: "separator", "aria-orientation": orientation, ...props }));
});
Separator.displayName = 'Separator';
export { Separator, separatorVariants };
//# sourceMappingURL=separator.js.map