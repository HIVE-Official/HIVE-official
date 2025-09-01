'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../lib/utils.js';
import { Input as Input } from '../atomic/atoms/input-enhanced.js';
import { Text } from '../atomic/atoms/text.js';
export const FormField = ({ label, description, error, required = false, children, className }) => {
    // Generate unique ID for accessibility
    const fieldId = React.useId();
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    // Clone child with accessibility props
    const childWithProps = React.cloneElement(children, {
        id: fieldId,
        'aria-describedby': [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
        'aria-invalid': error ? 'true' : undefined,
        error
    });
    return (_jsxs("div", { className: cn('space-y-2', className), children: [label && (_jsx("label", { htmlFor: fieldId, className: "block font-medium text-[var(--hive-text-primary)]", children: _jsxs(Text, { variant: "body-sm", color: "primary", children: [label, required && (_jsx("span", { className: "text-[var(--hive-status-error)] ml-1", "aria-label": "required", children: "*" }))] }) })), description && (_jsx(Text, { variant: "body-xs", color: "secondary", id: descriptionId, children: description })), childWithProps, error && (_jsx(Text, { variant: "body-xs", color: "ruby", id: errorId, role: "alert", children: error }))] }));
};
// Composed form field components for common patterns
export const TextFormField = ({ label, description, error, required, className, ...inputProps }) => (_jsx(FormField, { label: label, description: description, error: error, required: required, className: className, children: _jsx(Input, { ...inputProps }) }));
export const EmailFormField = ({ label = 'Email', ...props }) => (_jsx(TextFormField, { type: "email", label: label, ...props }));
export const PasswordFormField = ({ label = 'Password', ...props }) => (_jsx(TextFormField, { type: "password", label: label, ...props }));
//# sourceMappingURL=form-field.js.map