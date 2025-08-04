import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Select component - simplified bridge for tool elements
 * Creates a basic select using standard HTML select element with HIVE styling
 */
import React from 'react';
import { cn } from '../../lib/utils.js';
export const Select = React.forwardRef(({ className, onValueChange, onChange, children, ...props }, ref) => {
    const handleChange = (e) => {
        if (onValueChange) {
            onValueChange(e.target.value);
        }
        if (onChange) {
            onChange(e);
        }
    };
    return (_jsx("select", { ref: ref, className: cn("flex w-full items-center justify-between rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:border-[var(--hive-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-50", className), onChange: handleChange, ...props, children: children }));
});
Select.displayName = 'Select';
// For compatibility with Radix-style API
export const SelectTrigger = Select;
export const SelectContent = ({ children }) => _jsx(_Fragment, { children: children });
export const SelectValue = ({ placeholder }) => _jsx("option", { value: "", disabled: true, children: placeholder });
export const SelectItem = ({ value, children, disabled }) => (_jsx("option", { value: value, disabled: disabled, children: children }));
//# sourceMappingURL=select.js.map