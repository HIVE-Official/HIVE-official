'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
const radioSizes = {
    sm: {
        radio: 'h-4 w-4',
        text: 'text-sm',
        dot: 'h-2 w-2'
    },
    md: {
        radio: 'h-5 w-5',
        text: 'text-base',
        dot: 'h-2.5 w-2.5'
    },
    lg: {
        radio: 'h-6 w-6',
        text: 'text-lg',
        dot: 'h-3 w-3'
    }
};
// Single Radio Component
export const SingleRadio = React.forwardRef(({ label, description, size = 'md', variant = 'default', error, checked = false, disabled = false, className, ...props }, ref) => {
    const radioClasses = [
        'relative flex items-center justify-center',
        'border-2 rounded-full',
        'transition-all duration-200 ease-out',
        radioSizes[size].radio,
        // States
        !disabled && !error && [
            'border-hive-border-default',
            'hover:border-hive-gold',
            'focus-within:border-hive-gold focus-within:ring-2 focus-within:ring-hive-gold/20'
        ].filter(Boolean).join(' '),
        disabled && [
            'border-[var(--hive-border-default)]',
            'bg-hive-smoke',
            'cursor-not-allowed'
        ].join(' '),
        error && [
            'border-hive-ruby',
            'focus-within:border-hive-ruby focus-within:ring-2 focus-within:ring-hive-ruby/20'
        ].join(' '),
        // Checked state
        checked && !disabled && [
            'bg-[var(--hive-brand-secondary)] border-hive-gold',
            error && 'bg-hive-ruby border-hive-ruby'
        ].filter(Boolean).join(' ')
    ].filter(Boolean).join(' ');
    const containerClasses = [
        'flex items-start gap-3',
        variant === 'card' && [
            'p-4 rounded-xl border border-hive-border-default',
            'hover:bg-hive-background-interactive',
            !disabled && 'cursor-pointer',
            disabled && 'opacity-50'
        ].filter(Boolean).join(' ')
    ].filter(Boolean).join(' ');
    return (_jsxs("label", { className: cn(containerClasses, className), children: [_jsxs("div", { className: radioClasses, children: [_jsx("input", { ref: ref, type: "radio", checked: checked, disabled: disabled, className: "sr-only", ...props }), checked && (_jsx("div", { className: cn('rounded-full bg-[var(--hive-text-primary)]', radioSizes[size].dot, disabled && 'bg-[var(--hive-text-disabled)]') }))] }), (label || description) && (_jsxs("div", { className: "flex-1 min-w-0", children: [label && (_jsx("div", { className: cn('font-medium text-hive-text-primary', radioSizes[size].text, disabled && 'text-[var(--hive-text-disabled)]'), children: label })), description && (_jsx("div", { className: cn('text-hive-text-secondary mt-1', size === 'sm' && 'text-xs', size === 'md' && 'text-sm', size === 'lg' && 'text-base', disabled && 'text-[var(--hive-text-disabled)]'), children: description }))] }))] }));
});
SingleRadio.displayName = 'SingleRadio';
// Radio Group Component
export const Radio = ({ name, options, value, size = 'md', variant = 'default', orientation = 'vertical', error, disabled = false, onChange }) => {
    const handleChange = (optionValue) => {
        if (!disabled) {
            onChange?.(optionValue);
        }
    };
    const containerClasses = [
        'space-y-3',
        orientation === 'horizontal' && 'flex flex-wrap gap-4 space-y-0'
    ].filter(Boolean).join(' ');
    return (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: containerClasses, children: options.map((option) => (_jsx(SingleRadio, { name: name, value: option.value, label: option.label, description: option.description, size: size, variant: variant, checked: value === option.value, disabled: disabled || option.disabled, error: error, onChange: () => handleChange(option.value) }, option.value))) }), error && (_jsx("p", { className: "text-xs text-hive-ruby", children: error }))] }));
};
//# sourceMappingURL=radio.js.map