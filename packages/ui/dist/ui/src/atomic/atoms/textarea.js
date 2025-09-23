import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const textareaVariants = cva("flex min-h-[80px] w-full rounded-md border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] ring-offset-background placeholder:text-[var(--hive-text-placeholder)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)]",
            destructive: "border-[var(--hive-status-error)] focus-visible:ring-[var(--hive-status-error)]",
            success: "border-[var(--hive-status-success)] focus-visible:ring-[var(--hive-status-success)]",
            warning: "border-[var(--hive-status-warning)] focus-visible:ring-[var(--hive-status-warning)]",
            ghost: "border-transparent bg-transparent focus-visible:border-[var(--hive-border-default)]",
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
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        resize: "vertical",
    },
});
const Textarea = React.forwardRef(({ className, variant, size, resize, label, helperText, error, maxLength, showCount = false, autoResize = false, value, onChange, ...props }, ref) => {
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
    const textareaId = React.useId();
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
    return (_jsxs("div", { className: "flex flex-col space-y-1", children: [label && (_jsx("label", { htmlFor: textareaId, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: label })), _jsxs("div", { className: "relative", children: [_jsx("textarea", { id: textareaId, className: cn(textareaVariants({
                            variant: error ? "destructive" : variant,
                            size,
                            resize: autoResize ? "none" : resize
                        }), className), ref: combinedRef, value: value, onChange: handleChange, maxLength: maxLength, ...props }), showCount && maxLength && (_jsx("div", { className: "absolute bottom-2 right-2", children: _jsxs("span", { className: cn("text-xs", isOverLimit
                                ? "text-[var(--hive-status-error)]"
                                : "text-[var(--hive-text-secondary)]"), children: [currentLength, "/", maxLength] }) }))] }), (helperText || error) && (_jsx("p", { className: cn("text-xs", error
                    ? "text-[var(--hive-status-error)]"
                    : "text-[var(--hive-text-secondary)]"), children: error || helperText }))] }));
});
Textarea.displayName = "Textarea";
export { Textarea, textareaVariants };
//# sourceMappingURL=textarea.js.map