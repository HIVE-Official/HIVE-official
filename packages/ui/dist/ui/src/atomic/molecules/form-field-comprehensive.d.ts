/**
 * HIVE Comprehensive Form Field Molecule
 * Campus-optimized form input combination with label, validation, and help text
 *
 * Built using all foundation systems:
 * - Typography: Consistent label hierarchy and input text styling
 * - Color: Campus semantic colors for validation states and focus
 * - Layout: Systematic spacing between label, input, and validation messages
 * - Icon: Validation status icons and input adornment icons
 * - Interaction: Focus states, hover feedback, and validation animations
 * - Shadow: Subtle elevation for focused inputs
 * - Border: Consistent radius and focus ring styling
 * - Motion: Smooth validation state transitions and focus animations
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const formFieldVariants: (props?: {
    size?: "small" | "base" | "large";
    variant?: "ghost" | "default" | "filled";
} & import("class-variance-authority/types").ClassProp) => string;
declare const inputVariants: (props?: {
    state?: "error" | "default" | "success" | "warning";
} & import("class-variance-authority/types").ClassProp) => string;
export type ValidationState = 'default' | 'error' | 'success' | 'warning';
export type InputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
export interface ComprehensiveFormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>, VariantProps<typeof formFieldVariants> {
    label?: string;
    id: string;
    type?: InputType;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    state?: ValidationState;
    error?: string;
    success?: string;
    warning?: string;
    helpText?: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    showPasswordToggle?: boolean;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    campusOptimized?: boolean;
    onChange?: (value: string) => void;
    onValidation?: (isValid: boolean) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export declare const ComprehensiveFormField: React.ForwardRefExoticComponent<ComprehensiveFormFieldProps & React.RefAttributes<HTMLInputElement>>;
export { formFieldVariants, inputVariants };
//# sourceMappingURL=form-field-comprehensive.d.ts.map