'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils.js';
const separatorSizes = {
    horizontal: {
        sm: 'h-0.5',
        md: 'h-0.5',
        lg: 'h-0.75'
    },
    vertical: {
        sm: 'w-0.5',
        md: 'w-0.5',
        lg: 'w-0.75'
    }
};
const separatorVariants = {
    solid: 'bg-hive-border-default',
    dashed: 'border-dashed border-t border-hive-border-default bg-transparent',
    dotted: 'border-dotted border-t border-hive-border-default bg-transparent',
    gradient: 'bg-gradient-to-r from-transparent via-hive-border-default to-transparent'
};
const separatorSpacing = {
    none: '',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6'
};
const verticalSpacing = {
    none: '',
    sm: 'mx-2',
    md: 'mx-4',
    lg: 'mx-6'
};
export const Separator = React.forwardRef(({ orientation = 'horizontal', variant = 'solid', size = 'md', spacing = 'md', decorative = false, className, ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal';
    const baseClasses = [
        // Base styles
        'flex-shrink-0',
        // Orientation and size
        isHorizontal ? [
            'w-full',
            separatorSizes.horizontal[size]
        ].join(' ') : [
            'h-full',
            separatorSizes.vertical[size]
        ].join(' '),
        // Variant styles
        separatorVariants[variant],
        // Spacing
        spacing !== 'none' && (isHorizontal ? separatorSpacing[spacing] : verticalSpacing[spacing])
    ].filter(Boolean).join(' ');
    return (_jsx("div", { ref: ref, className: cn(baseClasses, className), role: decorative ? 'none' : 'separator', "aria-orientation": orientation, ...props }));
});
Separator.displayName = 'Separator';
// Convenient preset components
export const HorizontalSeparator = (props) => (_jsx(Separator, { orientation: "horizontal", ...props }));
export const VerticalSeparator = (props) => (_jsx(Separator, { orientation: "vertical", ...props }));
export const GradientDivider = (props) => (_jsx(Separator, { variant: "gradient", ...props }));
//# sourceMappingURL=separator.js.map