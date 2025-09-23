import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const textareaEnhancedVariants = cva("flex min-h-[80px] w-full rounded-md border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] ring-offset-background placeholder:text-[var(--hive-text-placeholder)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)]",
            destructive: "border-[var(--hive-status-error)] focus-visible:ring-[var(--hive-status-error)]",
            success: "border-[var(--hive-status-success)] focus-visible:ring-[var(--hive-status-success)]",
            warning: "border-[var(--hive-status-warning)] focus-visible:ring-[var(--hive-status-warning)]",
            ghost: "border-transparent bg-transparent focus-visible:border-[var(--hive-border-default)]",
            outline: "border-2 border-[var(--hive-border-default)] bg-transparent",
        },
        size: {
            default: "min-h-[80px] px-3 py-2 text-sm",
            sm: "min-h-[60px] px-2 py-1 text-xs",
            lg: "min-h-[120px] px-4 py-3 text-base",
            xl: "min-h-[160px] px-4 py-4 text-lg",
        },
        resize: {
            none: "resize-none",
            vertical: "resize-y",
            horizontal: "resize-x",
            both: "resize",
        },
        rounded: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        resize: "vertical",
        rounded: "md",
    },
});
const TextareaEnhanced = React.forwardRef(({ className, variant, size, resize, rounded, label, description, helperText, error, maxLength, showCount = false, autoResize = false, leftIcon, rightIcon, footerContent, onClear, showClearButton, required, optional, value, onChange, disabled, id, ...props }, ref) => {
    const textareaRef = React.useRef(null);
    const combinedRef = React.useMemo(() => {
        return (node) => {
            if (ref) {
                if (typeof ref === 'function') {
                    ref(node);
                }
                else {
                    ref.current = node;
                }
            }
            textareaRef.current = node;
        };
    }, [ref]);
    const textareaId = id || React.useId();
    const hasValue = Boolean(value && String(value).length > 0);
    // Auto-resize functionality
    React.useEffect(() => {
        if (autoResize && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value, autoResize]);
    const handleChange = React.useCallback((e) => {
        if (autoResize) {
            const textarea = e.target;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
        onChange?.(e);
    }, [onChange, autoResize]);
    const currentLength = typeof value === 'string' ? value.length : 0;
    const isOverLimit = maxLength ? currentLength > maxLength : false;
    return (_jsxs("div", { className: "flex flex-col space-y-2", children: [label && (_jsx("div", { className: "flex items-center justify-between", children: _jsxs("label", { htmlFor: textareaId, className: cn("text-sm font-medium text-[var(--hive-text-primary)]", disabled && "opacity-70"), children: [label, required && _jsx("span", { className: "text-[var(--hive-status-error)] ml-1", children: "*" }), optional && _jsx("span", { className: "text-[var(--hive-text-secondary)] ml-1 font-normal", children: "(optional)" })] }) })), description && (_jsx("p", { className: "text-xs text-[var(--hive-text-secondary)]", children: description })), _jsxs("div", { className: "relative", children: [leftIcon && (_jsx("div", { className: "absolute left-3 top-3 text-[var(--hive-text-secondary)] z-10", children: leftIcon })), _jsx("textarea", { id: textareaId, className: cn(textareaEnhancedVariants({
                            variant: error ? "destructive" : variant,
                            size,
                            resize: autoResize ? "none" : resize,
                            rounded
                        }), leftIcon && "pl-10", (rightIcon || (showClearButton && hasValue)) && "pr-10", className), ref: combinedRef, value: value, onChange: handleChange, maxLength: maxLength, disabled: disabled, ...props }), (rightIcon || (showClearButton && hasValue && !disabled)) && (_jsxs("div", { className: "absolute right-3 top-3 flex items-start space-x-1", children: [showClearButton && hasValue && !disabled && onClear && (_jsx("button", { type: "button", onClick: onClear, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] focus:outline-none transition-colors", "aria-label": "Clear textarea", children: _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })), rightIcon && (_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: rightIcon }))] })), showCount && maxLength && (_jsx("div", { className: "absolute bottom-2 right-2", children: _jsxs("span", { className: cn("text-xs font-mono", isOverLimit
                                ? "text-[var(--hive-status-error)]"
                                : "text-[var(--hive-text-secondary)]"), children: [currentLength, "/", maxLength] }) }))] }), footerContent && (_jsx("div", { className: "flex items-center justify-between", children: footerContent })), (helperText || error) && (_jsx("p", { className: cn("text-xs", error
                    ? "text-[var(--hive-status-error)]"
                    : "text-[var(--hive-text-secondary)]"), children: error || helperText }))] }));
});
TextareaEnhanced.displayName = "TextareaEnhanced";
export { TextareaEnhanced, textareaEnhancedVariants };
//# sourceMappingURL=textarea-enhanced.js.map