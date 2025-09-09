'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import React, { useState, useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
// Foundation system imports
import { typographyComposition } from '../foundations/typography-composition.js';
import { layoutComposition } from '../foundations/layout-composition.js';
import { iconComposition, AlertCircle, CheckCircle, Eye, EyeOff, Search, Mail, Lock, User } from '../foundations/icon-composition.js';
import { motionComposition } from '../foundations/motion-composition.js';
// === FORM FIELD VARIANTS ===
const formFieldVariants = cva(
// Base container styles
[
    'flex flex-col',
    layoutComposition.utils.gap[2], // 8px gap between elements
    'w-full'
].join(' '), {
    variants: {
        size: {
            small: [
                // Input sizing
                '[&_.hive-input]:h-8', // 32px height
                '[&_.hive-input]:px-3', // 12px horizontal padding
                '[&_.hive-input]:text-sm',
                // Label sizing
                `[&_.hive-label]:text-[${typographyComposition.scale.small.size}]`, // 14px
                // Icon sizing
                `[&_.hive-input-icon]:${iconComposition.sizes.small.className}` // 16px
            ],
            base: [
                // Input sizing
                '[&_.hive-input]:h-10', // 40px height
                '[&_.hive-input]:px-4', // 16px horizontal padding
                '[&_.hive-input]:text-base',
                // Label sizing
                `[&_.hive-label]:text-[${typographyComposition.scale.base.size}]`, // 16px
                // Icon sizing
                `[&_.hive-input-icon]:${iconComposition.sizes.base.className}` // 20px
            ],
            large: [
                // Input sizing
                '[&_.hive-input]:h-12', // 48px height
                '[&_.hive-input]:px-5', // 20px horizontal padding
                '[&_.hive-input]:text-lg',
                // Label sizing
                `[&_.hive-label]:text-[${typographyComposition.scale.large.size}]`, // 18px
                // Icon sizing
                `[&_.hive-input-icon]:${iconComposition.sizes.large.className}` // 24px
            ]
        },
        variant: {
            // Default campus theme
            default: '',
            // Filled background style
            filled: [
                '[&_.hive-input]:bg-[var(--hive-bg-subtle)]',
                '[&_.hive-input]:border-transparent',
                '[&_.hive-input:focus]:bg-[var(--hive-bg-primary)]'
            ].join(' '),
            // Ghost minimal style
            ghost: [
                '[&_.hive-input]:bg-transparent',
                '[&_.hive-input]:border-transparent',
                '[&_.hive-input]:border-b',
                '[&_.hive-input]:border-b-[var(--hive-border-subtle)]',
                '[&_.hive-input]:rounded-none',
                '[&_.hive-input]:px-0'
            ].join(' ')
        }
    },
    defaultVariants: {
        size: 'base',
        variant: 'default'
    }
});
// === INPUT VARIANTS ===
const inputVariants = cva(
// Base input styles using foundation systems
[
    'hive-input',
    'w-full',
    'rounded-lg',
    'border',
    'bg-[var(--hive-bg-primary)]',
    'border-[var(--hive-border-subtle)]',
    // Typography foundation
    'font-[var(--hive-font-family-primary)]',
    'text-[var(--hive-text-primary)]',
    'placeholder:text-[var(--hive-text-muted)]',
    // Interaction foundation
    'transition-all',
    `duration-[${motionComposition.durations.fast.ms}]`,
    // Focus styles using color foundation
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-[var(--hive-gold-primary)]/20',
    'focus:border-[var(--hive-gold-primary)]',
    // Hover effects
    'hover:border-[var(--hive-border-glass-strong)]',
    // Disabled state
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:bg-[var(--hive-bg-tertiary)]'
].join(' '), {
    variants: {
        state: {
            default: '',
            error: [
                'border-[var(--hive-error-primary)]',
                'focus:ring-[var(--hive-error-primary)]/20',
                'focus:border-[var(--hive-error-primary)]'
            ].join(' '),
            success: [
                'border-[var(--hive-success-primary)]',
                'focus:ring-[var(--hive-success-primary)]/20',
                'focus:border-[var(--hive-success-primary)]'
            ].join(' '),
            warning: [
                'border-[var(--hive-warning-primary)]',
                'focus:ring-[var(--hive-warning-primary)]/20',
                'focus:border-[var(--hive-warning-primary)]'
            ].join(' ')
        }
    },
    defaultVariants: {
        state: 'default'
    }
});
// === ICON MAPPING ===
const typeIconMap = {
    email: Mail,
    password: Lock,
    search: Search,
    text: User
};
const ValidationMessage = React.forwardRef(({ state, message, className }, ref) => {
    if (!message)
        return null;
    const stateConfig = {
        error: {
            icon: AlertCircle,
            color: 'text-[var(--hive-error-primary)]',
            bgColor: 'bg-[var(--hive-error-background)]',
            borderColor: 'border-[var(--hive-error-border)]'
        },
        success: {
            icon: CheckCircle,
            color: 'text-[var(--hive-success-primary)]',
            bgColor: 'bg-[var(--hive-success-background)]',
            borderColor: 'border-[var(--hive-success-border)]'
        },
        warning: {
            icon: AlertCircle,
            color: 'text-[var(--hive-warning-primary)]',
            bgColor: 'bg-[var(--hive-warning-background)]',
            borderColor: 'border-[var(--hive-warning-border)]'
        },
        default: {
            icon: null,
            color: 'text-[var(--hive-text-muted)]',
            bgColor: '',
            borderColor: ''
        }
    };
    const config = stateConfig[state];
    const IconComponent = config.icon;
    return (_jsxs("div", { ref: ref, className: cn(
        // Base styles using layout foundation
        'flex items-center gap-2', 'p-2 rounded-md', 
        // Typography foundation
        'font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.small.size}]`, // 14px
        'font-medium', 
        // Color foundation
        config.color, config.bgColor, config.borderColor && `border ${config.borderColor}`, 
        // Motion foundation
        `transition-all duration-[${motionComposition.durations.fast.ms}]`, 'animate-in slide-in-from-top-1 fade-in-50', className), children: [IconComponent && (_jsx(IconComponent, { className: cn('hive-input-icon shrink-0', config.color) })), _jsx("span", { children: message })] }));
});
ValidationMessage.displayName = 'ValidationMessage';
// === MAIN COMPONENT ===
export const ComprehensiveFormField = React.forwardRef(({ className, size, variant, label, id, type = 'text', placeholder, value, defaultValue, state = 'default', error, success, warning, helpText, icon: IconProp, showPasswordToggle = false, required = false, disabled = false, readOnly = false, campusOptimized = false, onChange, onValidation, onFocus, onBlur, ...props }, ref) => {
    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    // Determine actual input type
    const actualType = type === 'password' && showPassword ? 'text' : type;
    // Determine validation state from props
    const validationState = error ? 'error' : success ? 'success' : warning ? 'warning' : state;
    // Determine validation message
    const validationMessage = error || success || warning;
    // Determine icon to show
    const IconComponent = IconProp || typeIconMap[type];
    // Handle input change
    const handleChange = useCallback((e) => {
        const newValue = e.target.value;
        onChange?.(newValue);
        // Basic validation callback
        if (onValidation) {
            const isValid = required ? newValue.trim().length > 0 : true;
            onValidation(isValid);
        }
    }, [onChange, onValidation, required]);
    // Handle focus
    const handleFocus = useCallback((e) => {
        setIsFocused(true);
        onFocus?.(e);
    }, [onFocus]);
    // Handle blur
    const handleBlur = useCallback((e) => {
        setIsFocused(false);
        onBlur?.(e);
    }, [onBlur]);
    return (_jsxs("div", { className: cn(formFieldVariants({ size, variant }), className), children: [label && (_jsx("label", { htmlFor: id, className: cn('hive-label', 'font-[var(--hive-font-family-primary)]', 'font-medium', 'text-[var(--hive-text-primary)]', 
                // Required indicator
                required && "after:content-['*'] after:ml-1 after:text-[var(--hive-error-primary)]", 
                // Motion foundation
                `transition-colors duration-[${motionComposition.durations.fast.ms}]`, 
                // Focus state
                isFocused && 'text-[var(--hive-gold-primary)]'), children: label })), _jsxs("div", { className: "relative", children: [IconComponent && (_jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none", children: _jsx(IconComponent, { className: cn('hive-input-icon', 'text-[var(--hive-text-muted)]', 
                            // State colors
                            validationState === 'error' && 'text-[var(--hive-error-primary)]', validationState === 'success' && 'text-[var(--hive-success-primary)]', validationState === 'warning' && 'text-[var(--hive-warning-primary)]', 
                            // Focus color
                            isFocused && validationState === 'default' && 'text-[var(--hive-gold-primary)]', 
                            // Motion foundation
                            `transition-colors duration-[${motionComposition.durations.fast.ms}]`) }) })), _jsx("input", { ref: ref, id: id, type: actualType, placeholder: placeholder, value: value, defaultValue: defaultValue, required: required, disabled: disabled, readOnly: readOnly, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, className: cn(inputVariants({ state: validationState }), 
                        // Icon padding adjustments
                        IconComponent && 'pl-10', (showPasswordToggle && type === 'password') && 'pr-10', 
                        // Campus optimizations
                        campusOptimized && [
                            // Better mobile touch targets
                            'min-h-[44px]',
                            // Campus-specific placeholder styling
                            'placeholder:text-[var(--hive-text-muted)]',
                            // Enhanced focus ring for campus accessibility
                            'focus:ring-4'
                        ].join(' ')), ...props }), showPasswordToggle && type === 'password' && (_jsx("button", { type: "button", className: cn('absolute right-3 top-1/2 -translate-y-1/2', 'p-1 rounded-md', 'text-[var(--hive-text-muted)]', 'hover:text-[var(--hive-text-primary)]', 'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20', 
                        // Motion foundation
                        `transition-colors duration-[${motionComposition.durations.fast.ms}]`, disabled && 'opacity-50 cursor-not-allowed'), onClick: () => setShowPassword(!showPassword), disabled: disabled, "aria-label": showPassword ? 'Hide password' : 'Show password', children: showPassword ? (_jsx(EyeOff, { className: "hive-input-icon" })) : (_jsx(Eye, { className: "hive-input-icon" })) }))] }), validationMessage && (_jsx(ValidationMessage, { state: validationState, message: validationMessage })), helpText && !validationMessage && (_jsx("div", { className: cn('font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.small.size}]`, // 14px
                'text-[var(--hive-text-muted)]', 'px-1'), children: helpText }))] }));
});
ComprehensiveFormField.displayName = 'ComprehensiveFormField';
// Type already exported inline above
export { formFieldVariants, inputVariants };
//# sourceMappingURL=form-field-comprehensive.js.map