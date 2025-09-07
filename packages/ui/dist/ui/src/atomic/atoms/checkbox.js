'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils.js';
import { Check, Minus } from 'lucide-react';
const checkboxSizes = {
    sm: {
        box: 'h-4 w-4',
        text: 'text-sm',
        icon: 'h-3 w-3'
    },
    md: {
        box: 'h-5 w-5',
        text: 'text-base',
        icon: 'h-3.5 w-3.5'
    },
    lg: {
        box: 'h-6 w-6',
        text: 'text-lg',
        icon: 'h-4 w-4'
    }
};
export const Checkbox = React.forwardRef(({ label, description, error, size = 'md', variant = 'default', indeterminate = false, checked, className, disabled, ...props }, ref) => {
    const inputRef = React.useRef(null);
    React.useImperativeHandle(ref, () => inputRef.current);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);
    const isChecked = indeterminate ? false : checked;
    const showCheck = isChecked || indeterminate;
    const boxClasses = [
        'relative flex items-center justify-center',
        'border rounded',
        'transition-all duration-200 ease-out',
        checkboxSizes[size].box,
        // States
        !disabled && !error && [
            'border-white/20',
            'bg-transparent',
            'hover:border-[#FFD700]',
            'focus-within:border-[#FFD700]'
        ].filter(Boolean).join(' '),
        disabled && [
            'border-[var(--hive-border-disabled)]',
            'bg-[var(--hive-background-disabled)]',
            'cursor-not-allowed'
        ].join(' '),
        error && [
            'border-[var(--hive-status-error)]',
            'focus-within:border-[var(--hive-status-error)]'
        ].join(' '),
        // Checked state - keep transparent background
        showCheck && !disabled && [
            'border-[#FFD700]',
            error && 'border-[#FFD700]'
        ].filter(Boolean).join(' ')
    ].filter(Boolean).join(' ');
    const containerClasses = [
        'flex items-start gap-3',
        variant === 'card' && [
            'p-4 rounded-xl border border-[var(--hive-border-default)]',
            'hover:bg-[var(--hive-background-secondary)]',
            !disabled && 'cursor-pointer',
            disabled && 'opacity-50'
        ].filter(Boolean).join(' ')
    ].filter(Boolean).join(' ');
    return (_jsxs("label", { className: cn(containerClasses, className), children: [_jsxs("div", { className: boxClasses, children: [_jsx("input", { ref: inputRef, type: "checkbox", checked: isChecked, disabled: disabled, className: "sr-only", ...props }), showCheck && (_jsx("div", { className: cn('flex items-center justify-center', 'text-[#FFD700]', checkboxSizes[size].icon, disabled && 'text-white/40'), children: indeterminate ? (_jsx(Minus, { className: "h-full w-full stroke-[1.5]" })) : (_jsx(Check, { className: "h-full w-full stroke-[1.5]" })) }))] }), (label || description) && (_jsxs("div", { className: "flex-1 min-w-0", children: [label && (_jsx("div", { className: cn('font-medium text-[var(--hive-text-primary)]', checkboxSizes[size].text, disabled && 'text-[var(--hive-text-disabled)]'), children: label })), description && (_jsx("div", { className: cn('text-[var(--hive-text-secondary)] mt-1', size === 'sm' && 'text-xs', size === 'md' && 'text-sm', size === 'lg' && 'text-base', disabled && 'text-[var(--hive-text-disabled)]'), children: description })), error && (_jsx("div", { className: cn('text-[var(--hive-status-error)] mt-1', size === 'sm' && 'text-xs', size === 'md' && 'text-sm', size === 'lg' && 'text-base'), children: error }))] }))] }));
});
Checkbox.displayName = 'Checkbox';
//# sourceMappingURL=checkbox.js.map