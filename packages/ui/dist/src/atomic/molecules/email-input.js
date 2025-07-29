'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';
const emailSizes = {
    sm: 'h-10 text-sm',
    md: 'h-12 text-sm',
    lg: 'h-14 text-base'
};
export const EmailInput = forwardRef(({ value = '', onChange, domain = 'university.edu', placeholder = 'username', label, error, size = 'md', className, ...props }, ref) => {
    return (_jsxs("div", { className: cn('space-y-2', className), children: [label && (_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: [label, error && _jsx("span", { className: "text-[var(--hive-status-error)] ml-1", children: "*" })] })), _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: cn('flex items-center flex-1 px-5', 'bg-transparent border border-[var(--hive-border-default)]', 'rounded-2xl rounded-r-none border-r-0', 'focus-within:border-[var(--hive-brand-secondary)] focus-within:ring-2 focus-within:ring-[var(--hive-brand-secondary)]/20', 'hover:border-[var(--hive-border-hover)]', 'transition-all duration-200 ease-out', emailSizes[size], error && 'border-[var(--hive-status-error)] focus-within:border-[var(--hive-status-error)]'), children: _jsx("input", { ref: ref, type: "text", value: value, onChange: (e) => onChange?.(e.target.value), placeholder: placeholder, className: cn('flex-1 bg-transparent outline-none', 'font-medium text-[var(--hive-text-primary)]', 'placeholder:text-[var(--hive-text-tertiary)]'), ...props }) }), _jsxs("div", { className: cn('flex items-center px-5', 'bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)]', 'rounded-2xl rounded-l-none', 'font-medium text-[var(--hive-text-secondary)]', emailSizes[size], error && 'border-[var(--hive-status-error)]'), children: ["@", domain] })] }), error && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)]", children: error }))] }));
});
EmailInput.displayName = 'EmailInput';
//# sourceMappingURL=email-input.js.map