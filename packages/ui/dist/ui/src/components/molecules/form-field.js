'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Input } from "../ui/input.js";
import { Typography } from "../ui/typography.js";
import { Label } from "../ui/label.js";
export const FormField = React.forwardRef(({ id, label, helperText, errorMessage, required = false, showOptional = false, success = false, variant, className, ...props }, ref) => {
    // Generate unique ID if not provided
    const fieldId = id || React.useId();
    // Determine input variant based on state
    const inputVariant = errorMessage ? 'error' : success ? 'success' : variant;
    return (_jsxs("div", { className: "space-y-2", children: [label && (_jsxs(Label, { htmlFor: fieldId, className: cn("text-sm font-medium text-[var(--hive-text-inverse)]", props.disabled && "opacity-50"), children: [label, required && (_jsx("span", { className: "ml-1 text-[#F87171]", "aria-label": "Required", children: "*" })), showOptional && !required && (_jsx("span", { className: "ml-1 text-[var(--hive-text-inverse)]/50 text-sm font-normal", children: "(Optional)" }))] })), _jsx(Input, { ref: ref, id: fieldId, variant: inputVariant, className: cn(
                // Label animation on focus
                "transition-all duration-200", className), "aria-describedby": cn(helperText && `${fieldId}-helper`, errorMessage && `${fieldId}-error`) || undefined, "aria-invalid": errorMessage ? 'true' : undefined, ...props }), helperText && !errorMessage && (_jsx(Typography, { id: `${fieldId}-helper`, size: "small", color: "medium", className: "text-xs", children: helperText })), errorMessage && (_jsx(Typography, { id: `${fieldId}-error`, size: "small", color: "error", className: "text-xs", role: "alert", children: errorMessage })), success && !errorMessage && (_jsx(Typography, { size: "small", color: "success", className: "text-xs", children: "\u2713 Valid" }))] }));
});
FormField.displayName = "FormField";
// Form Field Presets for common patterns
export const FormFieldPresets = {
    // Email Field
    EmailField: (props) => (_jsx(FormField, { type: "email", label: "Email", placeholder: "your.email@buffalo.edu", ...props })),
    // Password Field
    PasswordField: (props) => (_jsx(FormField, { type: "password", label: "Password", ...props })),
    // Required Text Field
    RequiredTextField: (props) => (_jsx(FormField, { required: true, ...props })),
    // Search Field
    SearchField: (props) => (_jsx(FormField, { type: "search", placeholder: "Search...", ...props })),
};
export { FormField as FormFieldMolecule };
//# sourceMappingURL=form-field.js.map