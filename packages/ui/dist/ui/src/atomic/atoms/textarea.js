'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';
const textareaVariants = {
    default: [
        'bg-transparent',
        'border border-[var(--hive-border-default)]',
        'focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20',
        'hover:border-[var(--hive-border-hover)]'
    ].join(' '),
    outline: [
        'bg-transparent',
        'border border-[var(--hive-border-default)]',
        'focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20',
        'hover:border-[var(--hive-border-hover)]'
    ].join(' '),
    ghost: [
        'bg-transparent',
        'border border-transparent',
        'focus:bg-[var(--hive-background-secondary)] focus:border-[var(--hive-border-default)]'
    ].join(' '),
    filled: [
        'bg-[var(--hive-background-secondary)]',
        'border border-transparent',
        'focus:bg-[var(--hive-background-tertiary)] focus:border-[var(--hive-brand-secondary)]'
    ].join(' ')
};
const textareaSizes = {
    sm: 'p-4 text-sm min-h-24',
    md: 'p-5 text-sm min-h-32',
    lg: 'p-6 text-base min-h-40'
};
const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
};
export const Textarea = React.forwardRef(({ label, error, helperText, variant = 'default', size = 'md', resize = 'vertical', maxLength, showCount = false, fullWidth = true, className, disabled, value, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || '');
    const currentLength = typeof value === 'string' ? value.length : (typeof internalValue === 'string' ? internalValue.length : 0);
    React.useEffect(() => {
        if (typeof value === 'string') {
            setInternalValue(value);
        }
    }, [value]);
    const baseClasses = [
        // Layout - chip feel with high radius
        'w-full rounded-2xl',
        'transition-all duration-200 ease-out',
        // Typography
        'font-medium text-[var(--hive-text-primary)]',
        'placeholder:text-[var(--hive-text-tertiary)]',
        // Focus
        'focus:outline-none',
        // States
        'disabled:opacity-50 disabled:cursor-not-allowed',
        error && 'border-hive-ruby focus:border-hive-ruby focus:ring-hive-ruby/20',
        // Variants and sizing
        textareaVariants[variant],
        textareaSizes[size],
        resizeClasses[resize],
        // Width
        fullWidth && 'w-full'
    ].filter(Boolean).join(' ');
    const showCharacterCount = showCount && maxLength;
    return (_jsxs("div", { className: cn('space-y-2', fullWidth && 'w-full'), children: [label && (_jsx("label", { className: "block text-sm font-medium text-hive-text-primary", children: label })), _jsxs("div", { className: "relative", children: [_jsx("textarea", { ref: ref, value: value, maxLength: maxLength, disabled: disabled, className: cn(baseClasses, className), onChange: (e) => {
                            setInternalValue(e.target.value);
                            props.onChange?.(e);
                        }, ...props }), error && (_jsx("div", { className: "absolute top-3 right-3", children: _jsx(AlertCircle, { className: "h-4 w-4 text-hive-ruby" }) }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [error && (_jsx("p", { className: "text-xs text-hive-ruby", children: error })), !error && helperText && (_jsx("p", { className: "text-xs text-hive-text-secondary", children: helperText }))] }), showCharacterCount && (_jsxs("p", { className: cn('text-xs', currentLength > maxLength * 0.9 ? 'text-[var(--hive-brand-secondary)]' : 'text-hive-text-secondary', currentLength >= maxLength && 'text-hive-ruby'), children: [currentLength, "/", maxLength] }))] })] }));
});
Textarea.displayName = 'Textarea';
//# sourceMappingURL=textarea.js.map