'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
// HIVE Textarea System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage
const textareaVariants = cva(
// Base styles using semantic tokens only
"flex w-full rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:border-[var(--hive-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-50 resize-none", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)] focus:border-[var(--hive-brand-secondary)]",
            error: "border-[var(--hive-status-error)] focus:border-[var(--hive-status-error)] focus:ring-[color-mix(in_srgb,var(--hive-status-error)_30%,transparent)]",
            success: "border-[var(--hive-status-success)] focus:border-[var(--hive-status-success)] focus:ring-[color-mix(in_srgb,var(--hive-status-success)_30%,transparent)]",
            warning: "border-[var(--hive-status-warning)] focus:border-[var(--hive-status-warning)] focus:ring-[color-mix(in_srgb,var(--hive-status-warning)_30%,transparent)]",
            brand: "border-[var(--hive-brand-secondary)] focus:border-[var(--hive-brand-secondary)]",
        },
        size: {
            sm: "min-h-20 px-2 py-1.5 text-xs",
            default: "min-h-24 px-3 py-2 text-sm",
            lg: "min-h-32 px-4 py-3 text-base",
            xl: "min-h-40 px-5 py-4 text-lg",
        },
        radius: {
            none: "rounded-none",
            sm: "rounded-sm",
            default: "rounded-lg",
            lg: "rounded-xl",
            full: "rounded-2xl",
        },
        resize: {
            none: "resize-none",
            vertical: "resize-y",
            horizontal: "resize-x",
            both: "resize",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        radius: "default",
        resize: "vertical",
    },
});
const Textarea = React.forwardRef(({ className, variant, size, radius, resize, error, success, helperText, label, required, showCharCount, maxLength, autoResize, value, onChange, id, ...props }, ref) => {
    const textareaId = id || React.useId();
    const [charCount, setCharCount] = React.useState(0);
    const textareaRef = React.useRef(null);
    // Determine variant based on state
    const computedVariant = error ? "error" : success ? "success" : variant;
    // Handle auto-resize
    const handleAutoResize = React.useCallback(() => {
        if (autoResize && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [autoResize]);
    // Handle value changes
    const handleChange = (e) => {
        const newValue = e.target.value;
        setCharCount(newValue.length);
        if (maxLength && newValue.length > maxLength) {
            return; // Don't allow input beyond maxLength
        }
        onChange?.(e);
        handleAutoResize();
    };
    // Set ref function to handle both forwarded ref and internal ref
    const setRefs = React.useCallback((node) => {
        textareaRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
    }, [ref]);
    // Initialize character count and auto-resize
    React.useEffect(() => {
        if (value) {
            setCharCount(String(value).length);
        }
        handleAutoResize();
    }, [value, handleAutoResize]);
    const textareaElement = (_jsxs("div", { className: "relative", children: [_jsx("textarea", { id: textareaId, className: cn(textareaVariants({ variant: computedVariant, size, radius, resize }), autoResize && "overflow-hidden", className), ref: setRefs, value: value, onChange: handleChange, maxLength: maxLength, ...props }), showCharCount && (_jsxs("div", { className: "absolute bottom-2 right-3 text-xs text-[var(--hive-text-tertiary)]", children: [charCount, maxLength && ` / ${maxLength}`] }))] }));
    if (label || error || success || helperText || showCharCount) {
        return (_jsxs("div", { className: "space-y-2", children: [label && (_jsxs("label", { htmlFor: textareaId, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [label, required && (_jsx("span", { className: "ml-1 text-[var(--hive-status-error)]", children: "*" }))] })), textareaElement, (error || success || helperText) && (_jsx("p", { className: cn("text-xs", error && "text-[var(--hive-status-error)]", success && "text-[var(--hive-status-success)]", !error && !success && "text-[var(--hive-text-tertiary)]"), children: error || success || helperText }))] }));
    }
    return textareaElement;
});
Textarea.displayName = "Textarea";
const CodeTextarea = React.forwardRef(({ language, showLineNumbers, ...props }, ref) => {
    return (_jsx(Textarea, { ref: ref, className: "font-mono text-sm bg-[color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)] border-[var(--hive-border-default)]", placeholder: language ? `Enter ${language} code...` : "Enter code...", ...props }));
});
CodeTextarea.displayName = "CodeTextarea";
const TextareaGroup = React.forwardRef(({ className, orientation = "vertical", spacing = "md", children, ...props }, ref) => {
    const spacingClasses = {
        none: "",
        sm: orientation === "horizontal" ? "space-x-2" : "space-y-2",
        md: orientation === "horizontal" ? "space-x-4" : "space-y-4",
    };
    return (_jsx("div", { ref: ref, className: cn("flex", orientation === "horizontal" ? "flex-row items-start" : "flex-col", spacingClasses[spacing], className), ...props, children: children }));
});
TextareaGroup.displayName = "TextareaGroup";
// Textarea presets for common patterns
export const TextareaPresets = {
    // Comment/Message Input
    Comment: (props) => (_jsx(Textarea, { placeholder: "Write your comment...", size: "default", autoResize: true, showCharCount: true, maxLength: 500, ...props })),
    // Description Input
    Description: (props) => (_jsx(Textarea, { placeholder: "Enter description...", size: "lg", showCharCount: true, maxLength: 1000, ...props })),
    // Notes Input
    Notes: (props) => (_jsx(Textarea, { placeholder: "Add your notes...", autoResize: true, resize: "vertical", ...props })),
    // Code Input
    Code: (props) => (_jsx(CodeTextarea, { placeholder: "Enter code...", size: "lg", resize: "both", ...props })),
    // Feedback Input
    Feedback: (props) => (_jsx(Textarea, { placeholder: "Share your feedback...", size: "lg", autoResize: true, showCharCount: true, maxLength: 2000, ...props })),
};
export { Textarea, CodeTextarea, TextareaGroup, textareaVariants };
//# sourceMappingURL=textarea-enhanced.js.map