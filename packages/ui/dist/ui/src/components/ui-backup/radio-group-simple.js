import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Simple RadioGroup component - for tool elements
 * Uses standard HTML radio inputs with HIVE styling
 */
import React from 'react';
import { cn } from '../lib/utils';
export const RadioGroup = React.forwardRef(({ className, value, onValueChange, name, disabled, children, ...props }, ref) => {
    const handleChange = (newValue) => {
        if (onValueChange) {
            onValueChange(newValue);
        }
    };
    // Clone children and add radio group props
    const clonedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === RadioGroupItem) {
            return React.cloneElement(child, {
                ...child.props,
                name,
                checked: child.props.value === value,
                disabled: disabled || child.props.disabled,
                onChange: () => handleChange(child.props.value),
            });
        }
        return child;
    });
    return (_jsx("div", { ref: ref, className: cn("space-y-2", className), role: "radiogroup", ...props, children: clonedChildren }));
});
RadioGroup.displayName = 'RadioGroup';
export const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("input", { type: "radio", ref: ref, className: cn("h-5 w-5 rounded-full border-2 border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-[var(--hive-brand-secondary)] checked:border-[var(--hive-brand-secondary)]", className), ...props }));
});
RadioGroupItem.displayName = 'RadioGroupItem';
//# sourceMappingURL=radio-group-simple.js.map