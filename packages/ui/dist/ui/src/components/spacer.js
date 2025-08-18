'use client';
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../lib/utils';
// Base spacing scale based on HIVE design tokens
const spacingSizes = {
    xs: '0.25rem', // 1
    sm: '0.5rem', // 2
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem' // 96px
};
// Responsive spacing utilities
const responsiveSpacing = {
    xs: {
        base: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg'
    },
    sm: {
        base: 'sm',
        sm: 'md',
        md: 'lg',
        lg: 'xl'
    },
    md: {
        base: 'md',
        sm: 'lg',
        md: 'xl',
        lg: '2xl'
    },
    lg: {
        base: 'lg',
        sm: 'xl',
        md: '2xl',
        lg: '3xl'
    },
    xl: {
        base: 'xl',
        sm: '2xl',
        md: '3xl',
        lg: '4xl'
    },
    '2xl': {
        base: '2xl',
        sm: '3xl',
        md: '4xl',
        lg: '4xl'
    },
    '3xl': {
        base: '3xl',
        sm: '4xl',
        md: '4xl',
        lg: '4xl'
    },
    '4xl': {
        base: '4xl',
        sm: '4xl',
        md: '4xl',
        lg: '4xl'
    }
};
export const Spacer = React.forwardRef(({ size = 'md', direction = 'vertical', responsive = false, flexible = false, debug = false, className, style, ...props }, ref) => {
    const getSpacingStyle = () => {
        const baseStyle = {};
        if (flexible) {
            if (direction === 'horizontal' || direction === 'both') {
                baseStyle.flexGrow = 1;
            }
            if (direction === 'vertical' || direction === 'both') {
                baseStyle.flexGrow = 1;
            }
            return baseStyle;
        }
        // Fixed spacing
        const spacing = spacingSizes[size];
        switch (direction) {
            case 'horizontal':
                baseStyle.width = spacing;
                baseStyle.minWidth = spacing;
                break;
            case 'vertical':
                baseStyle.height = spacing;
                baseStyle.minHeight = spacing;
                break;
            case 'both':
                baseStyle.width = spacing;
                baseStyle.height = spacing;
                baseStyle.minWidth = spacing;
                baseStyle.minHeight = spacing;
                break;
        }
        return baseStyle;
    };
    const getResponsiveClasses = () => {
        if (!responsive)
            return '';
        const responsiveSize = responsiveSpacing[size];
        const classes = [];
        if (direction === 'vertical' || direction === 'both') {
            classes.push(`h-[${spacingSizes[responsiveSize.base]}]`, `sm:h-[${spacingSizes[responsiveSize.sm]}]`, `md:h-[${spacingSizes[responsiveSize.md]}]`, `lg:h-[${spacingSizes[responsiveSize.lg]}]`);
        }
        if (direction === 'horizontal' || direction === 'both') {
            classes.push(`w-[${spacingSizes[responsiveSize.base]}]`, `sm:w-[${spacingSizes[responsiveSize.sm]}]`, `md:w-[${spacingSizes[responsiveSize.md]}]`, `lg:w-[${spacingSizes[responsiveSize.lg]}]`);
        }
        return classes.join(' ');
    };
    const baseClasses = [
        // Base layout
        'flex-shrink-0',
        // Flexible behavior
        flexible && 'flex-1',
        // Responsive classes (when not using inline styles)
        responsive && getResponsiveClasses(),
        // Debug visualization
        debug && [
            'bg-[color-mix(in_srgb,var(--hive-status-error)_20%,transparent)]',
            'border border-dashed border-[var(--hive-status-error)]',
            'relative'
        ].filter(Boolean).join(' ')
    ].filter(Boolean).join(' ');
    const computedStyle = {
        ...getSpacingStyle(),
        ...style
    };
    return (_jsx("div", { ref: ref, className: cn(baseClasses, className), style: responsive ? style : computedStyle, "aria-hidden": "true", ...props, children: debug && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("span", { className: "text-xs font-mono text-[var(--hive-status-error)] bg-[var(--hive-background-primary)] px-1 rounded", children: [size, " ", direction] }) })) }));
});
Spacer.displayName = 'Spacer';
// Convenient preset components
export const VerticalSpacer = (props) => (_jsx(Spacer, { direction: "vertical", ...props }));
export const HorizontalSpacer = (props) => (_jsx(Spacer, { direction: "horizontal", ...props }));
export const FlexibleSpacer = (props) => (_jsx(Spacer, { flexible: true, ...props }));
export const ResponsiveSpacer = (props) => (_jsx(Spacer, { responsive: true, ...props }));
// Size-specific presets
export const TinySpacer = (props) => (_jsx(Spacer, { size: "xs", ...props }));
export const SmallSpacer = (props) => (_jsx(Spacer, { size: "sm", ...props }));
export const MediumSpacer = (props) => (_jsx(Spacer, { size: "md", ...props }));
export const LargeSpacer = (props) => (_jsx(Spacer, { size: "lg", ...props }));
export const ExtraLargeSpacer = (props) => (_jsx(Spacer, { size: "xl", ...props }));
export const HugeSpacer = (props) => (_jsx(Spacer, { size: "2xl", ...props }));
// Direction + size combinations
export const VerticalGap = {
    xs: () => _jsx(VerticalSpacer, { size: "xs" }),
    sm: () => _jsx(VerticalSpacer, { size: "sm" }),
    md: () => _jsx(VerticalSpacer, { size: "md" }),
    lg: () => _jsx(VerticalSpacer, { size: "lg" }),
    xl: () => _jsx(VerticalSpacer, { size: "xl" }),
    '2xl': () => _jsx(VerticalSpacer, { size: "2xl" }),
    '3xl': () => _jsx(VerticalSpacer, { size: "3xl" }),
    '4xl': () => _jsx(VerticalSpacer, { size: "4xl" })
};
export const HorizontalGap = {
    xs: () => _jsx(HorizontalSpacer, { size: "xs" }),
    sm: () => _jsx(HorizontalSpacer, { size: "sm" }),
    md: () => _jsx(HorizontalSpacer, { size: "md" }),
    lg: () => _jsx(HorizontalSpacer, { size: "lg" }),
    xl: () => _jsx(HorizontalSpacer, { size: "xl" }),
    '2xl': () => _jsx(HorizontalSpacer, { size: "2xl" }),
    '3xl': () => _jsx(HorizontalSpacer, { size: "3xl" }),
    '4xl': () => _jsx(HorizontalSpacer, { size: "4xl" })
};
//# sourceMappingURL=spacer.js.map