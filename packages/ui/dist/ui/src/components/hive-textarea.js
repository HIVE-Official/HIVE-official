"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, liquidFlow } from '../motion/hive-motion-system';
// HIVE Textarea System - Builder's Toolkit with Liquid Metal Motion
// Matte obsidian glass with floating labels and premium interactions
const hiveTextareaVariants = cva(
// Base styles - matte obsidian glass with heavy radius using semantic tokens
"relative w-full bg-[var(--hive-background-secondary)]/40 backdrop-blur-xl border rounded-xl transition-all hive-motion-base focus-within:bg-[var(--hive-background-secondary)]/60", {
    variants: {
        variant: {
            // Standard textarea - matte obsidian glass with semantic tokens
            default: "border-[var(--hive-border-subtle)] focus-within:border-[var(--hive-border-primary)] focus-within:ring-2 focus-within:ring-[var(--hive-brand-primary)]/50",
            // Error state - semantic error tokens
            error: "border-[var(--hive-status-error)]/40 focus-within:border-[var(--hive-status-error)]/60 focus-within:ring-2 focus-within:ring-[var(--hive-status-error)]/50",
            // Success state - semantic success tokens
            success: "border-[var(--hive-status-success)]/40 focus-within:border-[var(--hive-status-success)]/60 focus-within:ring-2 focus-within:ring-[var(--hive-status-success)]/50",
            // Disabled state - semantic disabled tokens
            disabled: "border-[var(--hive-border-disabled)] bg-[var(--hive-background-disabled)] opacity-60 cursor-not-allowed",
            // Premium variant - semantic brand tokens
            premium: "border-[var(--hive-brand-primary)]/30 focus-within:border-[var(--hive-brand-primary)]/60 focus-within:ring-2 focus-within:ring-[var(--hive-brand-primary)]/50 focus-within:shadow-lg focus-within:shadow-[var(--hive-shadow-gold-glow)]",
            // Minimal variant for basic use cases
            minimal: "border-[var(--hive-border-subtle)] focus-within:border-[var(--hive-border-primary)] bg-transparent",
        },
        size: {
            sm: "min-h-20",
            default: "min-h-[30]",
            lg: "min-h-[160px]",
            xl: "min-h-50",
        },
        radius: {
            sm: "rounded-[var(--hive-radius-lg)]",
            default: "rounded-[var(--hive-radius-xl)]",
            lg: "rounded-[var(--hive-radius-2xl)]",
            xl: "rounded-[var(--hive-radius-2xl)]",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        radius: "default",
    },
});
// Character count fade animation
const characterCountVariants = {
    hidden: {
        opacity: 0,
        y: 5,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
            type: "spring",
            stiffness: 400,
            damping: 25,
        }
    }
};
// Helper text slide animation
const helperTextVariants = {
    ...liquidFlow,
    visible: {
        ...liquidFlow.visible,
        transition: {
            duration: motionDurations.flowing,
            ease: liquidMetal.easing,
            type: "spring",
            stiffness: 300,
            damping: 25,
        }
    }
};
const HiveTextarea = React.forwardRef(({ className, variant, size, radius, label, helperText, errorText, successText, showCharacterCount = false, maxLength, leftIcon, rightIcon, onClear, loading = false, floatingLabel = true, resize = true, value, defaultValue, disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || defaultValue || '');
    const textareaRef = useRef(null);
    // Determine if label should float
    const hasValue = Boolean(internalValue);
    const shouldFloat = isFocused || hasValue;
    // Determine current state variant
    const currentVariant = errorText ? 'error' : successText ? 'success' : variant;
    // Character count logic
    const currentLength = String(internalValue).length;
    const showCount = showCharacterCount && (isFocused || (maxLength && currentLength > maxLength * 0.8));
    const isOverLimit = maxLength && currentLength > maxLength;
    // Handle textarea change
    const handleChange = (e) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        props.onChange?.(e);
    };
    // Status message to show
    const statusMessage = errorText || successText || helperText;
    return (_jsxs("div", { className: "w-full", children: [label && !floatingLabel && (_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: label })), _jsx("div", { className: "relative", children: _jsxs("div", { className: cn(hiveTextareaVariants({ variant: currentVariant, size, radius, className })), children: [leftIcon && (_jsx("div", { className: "absolute left-3 top-4 text-[var(--hive-text-secondary)] z-10", children: leftIcon })), label && floatingLabel && (_jsx(motion.label, { className: cn("absolute pointer-events-none origin-left font-medium transition-all duration-300 z-10", leftIcon ? "left-10" : "left-3", shouldFloat ? "top-2 text-xs text-[var(--hive-text-primary)]" : "top-4 text-sm text-[var(--hive-text-secondary)]"), animate: {
                                scale: shouldFloat ? 0.9 : 1,
                                y: shouldFloat ? 0 : 0,
                            }, transition: {
                                duration: 0.2,
                                ease: "easeOut",
                            }, children: label })), _jsx("textarea", { ref: textareaRef, value: value, defaultValue: defaultValue, disabled: disabled || loading, maxLength: maxLength, className: cn("w-full h-full bg-transparent text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none relative z-20", leftIcon ? "pl-10" : "pl-3", "pr-12", // Proper space for icons and count
                            floatingLabel ? "pt-6 pb-3" : "py-3", resize ? "resize-y" : "resize-none", size === 'sm' && "text-sm", size === 'default' && "text-sm", size === 'lg' && "text-base", size === 'xl' && "text-lg"), onFocus: (e) => {
                                setIsFocused(true);
                                props.onFocus?.(e);
                            }, onBlur: (e) => {
                                setIsFocused(false);
                                props.onBlur?.(e);
                            }, onChange: handleChange, ...props }), _jsxs("div", { className: "absolute bottom-3 right-3 flex items-center space-x-2 z-10", children: [_jsx(AnimatePresence, { children: showCount && (_jsxs(motion.span, { className: cn("text-xs font-medium shrink-0", isOverLimit ? "text-[var(--hive-status-error)]" : "text-[var(--hive-text-secondary)]"), variants: characterCountVariants, initial: "hidden", animate: "visible", exit: "hidden", children: [currentLength, maxLength && `/${maxLength}`] })) }), onClear && hasValue && !loading && (_jsx(motion.button, { type: "button", className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors shrink-0 w-4 h-4 flex items-center justify-center", onClick: onClear, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: "\u00D7" })), loading && (_jsx(motion.div, { className: "w-4 h-4 border-2 border-[var(--hive-text-secondary)] border-t-[var(--hive-text-primary)] rounded-full shrink-0", animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" } })), rightIcon && !loading && (_jsx("div", { className: "text-[var(--hive-text-secondary)] shrink-0", children: rightIcon }))] })] }) }), _jsx(AnimatePresence, { mode: "wait", children: statusMessage && (_jsx(motion.div, { className: cn("text-sm px-1 mt-2", errorText && "text-[var(--hive-status-error)]", successText && "text-[var(--hive-status-success)]", !errorText && !successText && "text-[var(--hive-text-secondary)]"), variants: helperTextVariants, initial: "hidden", animate: "visible", exit: "exit", children: statusMessage })) })] }));
});
HiveTextarea.displayName = "HiveTextarea";
// Pre-built Textarea Variants for common use cases
const HiveToolDescriptionTextarea = React.forwardRef((props, ref) => (_jsx(HiveTextarea, { ref: ref, label: "Tool Description", placeholder: "Describe what your tool does...", variant: "premium", showCharacterCount: true, maxLength: 500, size: "lg", ...props })));
const HiveSpaceDescriptionTextarea = React.forwardRef((props, ref) => (_jsx(HiveTextarea, { ref: ref, label: "Space Description", placeholder: "Describe your space...", showCharacterCount: true, maxLength: 300, ...props })));
const HiveFeedbackTextarea = React.forwardRef((props, ref) => (_jsx(HiveTextarea, { ref: ref, label: "Feedback", placeholder: "Share your thoughts...", showCharacterCount: true, maxLength: 1000, size: "lg", ...props })));
const HiveCodeTextarea = React.forwardRef((props, ref) => (_jsx(HiveTextarea, { ref: ref, className: "font-mono text-sm", variant: "minimal", resize: false, ...props })));
HiveToolDescriptionTextarea.displayName = "HiveToolDescriptionTextarea";
HiveSpaceDescriptionTextarea.displayName = "HiveSpaceDescriptionTextarea";
HiveFeedbackTextarea.displayName = "HiveFeedbackTextarea";
HiveCodeTextarea.displayName = "HiveCodeTextarea";
export { HiveTextarea, HiveToolDescriptionTextarea, HiveSpaceDescriptionTextarea, HiveFeedbackTextarea, HiveCodeTextarea, hiveTextareaVariants };
// Simple Textarea component for basic use cases (backwards compatibility)
const Textarea = React.forwardRef((props, ref) => (_jsx(HiveTextarea, { ref: ref, variant: "minimal", floatingLabel: false, ...props })));
Textarea.displayName = "Textarea";
// Export as Textarea for easier migration and consistency
export { Textarea, HiveTextarea as TextareaAdvanced };
//# sourceMappingURL=hive-textarea.js.map