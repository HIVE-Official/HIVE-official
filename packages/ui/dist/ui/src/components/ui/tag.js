'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils.js';
import { X } from 'lucide-react';
const tagColors = {
    default: {
        filled: 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-default)]',
        outline: 'bg-transparent text-[var(--hive-text-primary)] border-[var(--hive-border-default)]',
        ghost: 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)] border-transparent',
        gradient: 'bg-gradient-to-r from-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)] border-transparent'
    },
    primary: {
        filled: 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] border-[var(--hive-brand-secondary)]',
        outline: 'bg-transparent text-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)]',
        ghost: 'bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)] text-[var(--hive-brand-secondary)] border-transparent',
        gradient: 'bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[color-mix(in_srgb,var(--hive-brand-secondary)_80%,var(--hive-brand-primary))] text-[var(--hive-background-primary)] border-transparent'
    },
    success: {
        filled: 'bg-[var(--hive-status-success)] text-[var(--hive-background-primary)] border-[var(--hive-status-success)]',
        outline: 'bg-transparent text-[var(--hive-status-success)] border-[var(--hive-status-success)]',
        ghost: 'bg-[color-mix(in_srgb,var(--hive-status-success)_10%,transparent)] text-[var(--hive-status-success)] border-transparent',
        gradient: 'bg-gradient-to-r from-[var(--hive-status-success)] to-[color-mix(in_srgb,var(--hive-status-success)_80%,transparent)] text-[var(--hive-background-primary)] border-transparent'
    },
    warning: {
        filled: 'bg-[var(--hive-status-warning)] text-[var(--hive-background-primary)] border-[var(--hive-status-warning)]',
        outline: 'bg-transparent text-[var(--hive-status-warning)] border-[var(--hive-status-warning)]',
        ghost: 'bg-[color-mix(in_srgb,var(--hive-status-warning)_10%,transparent)] text-[var(--hive-status-warning)] border-transparent',
        gradient: 'bg-gradient-to-r from-[var(--hive-status-warning)] to-[color-mix(in_srgb,var(--hive-status-warning)_80%,transparent)] text-[var(--hive-background-primary)] border-transparent'
    },
    error: {
        filled: 'bg-[var(--hive-status-error)] text-[var(--hive-background-primary)] border-[var(--hive-status-error)]',
        outline: 'bg-transparent text-[var(--hive-status-error)] border-[var(--hive-status-error)]',
        ghost: 'bg-[color-mix(in_srgb,var(--hive-status-error)_10%,transparent)] text-[var(--hive-status-error)] border-transparent',
        gradient: 'bg-gradient-to-r from-[var(--hive-status-error)] to-[color-mix(in_srgb,var(--hive-status-error)_80%,transparent)] text-[var(--hive-background-primary)] border-transparent'
    },
    gold: {
        filled: 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] border-[var(--hive-brand-secondary)]',
        outline: 'bg-transparent text-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)]',
        ghost: 'bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)] text-[var(--hive-brand-secondary)] border-transparent',
        gradient: 'bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[color-mix(in_srgb,var(--hive-brand-secondary)_60%,var(--hive-brand-primary))] text-[var(--hive-background-primary)] border-transparent'
    },
    ruby: {
        filled: 'bg-[var(--hive-status-error)] text-[var(--hive-background-primary)] border-[var(--hive-status-error)]',
        outline: 'bg-transparent text-[var(--hive-status-error)] border-[var(--hive-status-error)]',
        ghost: 'bg-[color-mix(in_srgb,var(--hive-status-error)_10%,transparent)] text-[var(--hive-status-error)] border-transparent',
        gradient: 'bg-gradient-to-r from-[var(--hive-status-error)] to-[color-mix(in_srgb,var(--hive-status-error)_70%,var(--hive-status-warning))] text-[var(--hive-background-primary)] border-transparent'
    },
    emerald: {
        filled: 'bg-[var(--hive-status-success)] text-[var(--hive-background-primary)] border-[var(--hive-status-success)]',
        outline: 'bg-transparent text-[var(--hive-status-success)] border-[var(--hive-status-success)]',
        ghost: 'bg-[color-mix(in_srgb,var(--hive-status-success)_10%,transparent)] text-[var(--hive-status-success)] border-transparent',
        gradient: 'bg-gradient-to-r from-[var(--hive-status-success)] to-[color-mix(in_srgb,var(--hive-status-success)_70%,var(--hive-status-info))] text-[var(--hive-background-primary)] border-transparent'
    },
    sapphire: {
        filled: 'bg-[var(--hive-status-info)] text-[var(--hive-background-primary)] border-[var(--hive-status-info)]',
        outline: 'bg-transparent text-[var(--hive-status-info)] border-[var(--hive-status-info)]',
        ghost: 'bg-[color-mix(in_srgb,var(--hive-status-info)_10%,transparent)] text-[var(--hive-status-info)] border-transparent',
        gradient: 'bg-gradient-to-r from-[var(--hive-status-info)] to-[color-mix(in_srgb,var(--hive-status-info)_80%,transparent)] text-[var(--hive-background-primary)] border-transparent'
    }
};
const tagSizes = {
    sm: {
        base: 'px-2 py-1 text-xs',
        icon: 'w-3 h-3',
        removeButton: 'w-3 h-3'
    },
    md: {
        base: 'px-3 py-1.5 text-sm',
        icon: 'w-4 h-4',
        removeButton: 'w-4 h-4'
    },
    lg: {
        base: 'px-4 py-2 text-base',
        icon: 'w-5 h-5',
        removeButton: 'w-5 h-5'
    }
};
export const Tag = React.forwardRef(({ variant = 'default', size = 'md', color = 'default', removable = false, disabled = false, interactive = false, leftIcon, rightIcon, onRemove, className, children, onClick, ...props }, ref) => {
    const handleRemove = (e) => {
        e.stopPropagation();
        if (!disabled && onRemove) {
            onRemove();
        }
    };
    const baseClasses = [
        // Layout
        'inline-flex items-center gap-1.5',
        'rounded-full',
        'border',
        'font-medium',
        'transition-all duration-200 ease-out',
        'select-none',
        // Size
        tagSizes[size].base,
        // Color and variant
        tagColors[color][variant === 'default' ? 'filled' : variant],
        // Interactive states
        interactive && !disabled && [
            'cursor-pointer',
            'hover:scale-105',
            'active:scale-95'
        ].filter(Boolean).join(' '),
        // Disabled state
        disabled && [
            'opacity-50',
            'cursor-not-allowed',
            'pointer-events-none'
        ].join(' '),
        // Focus styles for interactive tags
        interactive && !disabled && [
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)]',
            'focus:ring-offset-2'
        ].join(' ')
    ].filter(Boolean).join(' ');
    const iconSize = tagSizes[size].icon;
    const removeButtonSize = tagSizes[size].removeButton;
    return (_jsxs("div", { ref: ref, className: cn(baseClasses, className), onClick: interactive && !disabled ? onClick : undefined, role: interactive ? 'button' : undefined, tabIndex: interactive && !disabled ? 0 : undefined, onKeyDown: interactive && !disabled ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.(e);
            }
        } : undefined, ...props, children: [leftIcon && (_jsx("span", { className: cn('flex-shrink-0', iconSize), children: leftIcon })), _jsx("span", { className: "truncate", children: children }), rightIcon && !removable && (_jsx("span", { className: cn('flex-shrink-0', iconSize), children: rightIcon })), removable && (_jsx("button", { type: "button", onClick: handleRemove, disabled: disabled, className: cn('flex-shrink-0 rounded-full', 'transition-all duration-200 ease-out', 'hover:bg-[color-mix(in_srgb,var(--hive-text-primary)_10%,transparent)]', 'focus:outline-none focus:bg-[color-mix(in_srgb,var(--hive-text-primary)_10%,transparent)]', 'active:scale-90', removeButtonSize, disabled && 'cursor-not-allowed opacity-50'), "aria-label": "Remove tag", children: _jsx(X, { className: "w-full h-full" }) }))] }));
});
Tag.displayName = 'Tag';
// Convenient preset components
export const PrimaryTag = (props) => (_jsx(Tag, { color: "primary", ...props }));
export const SuccessTag = (props) => (_jsx(Tag, { color: "success", ...props }));
export const WarningTag = (props) => (_jsx(Tag, { color: "warning", ...props }));
export const ErrorTag = (props) => (_jsx(Tag, { color: "error", ...props }));
export const RemovableTag = (props) => (_jsx(Tag, { removable: true, ...props }));
export const InteractiveTag = (props) => (_jsx(Tag, { interactive: true, ...props }));
export const OutlineTag = (props) => (_jsx(Tag, { variant: "secondary", ...props }));
export const GhostTag = (props) => (_jsx(Tag, { variant: "ghost", ...props }));
export const GradientTag = (props) => (_jsx(Tag, { variant: "gradient", ...props }));
//# sourceMappingURL=tag.js.map