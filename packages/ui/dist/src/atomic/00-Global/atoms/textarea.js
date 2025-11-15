'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";
const textareaVariants = cva("flex min-h-[108px] w-full border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-5 py-3 text-sm text-[var(--hive-text-primary)] transition-[border,background,box-shadow] duration-200 ease-out placeholder:text-[var(--hive-text-muted)] focus-visible:outline-none focus-visible:border-[var(--hive-border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_28px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-60", {
    variants: {
        variant: {
            default: "hover:border-[var(--hive-border-primary)]",
            subtle: "border-[var(--hive-border-subtle)] bg-[var(--hive-background-primary)]",
            destructive: "border-[var(--hive-status-error)] focus-visible:ring-[color-mix(in_srgb,var(--hive-status-error) 90%,transparent)] focus-visible:shadow-[0_0_0_1px_var(--hive-status-error),0_0_32px_rgba(239,68,68,0.28)]",
            success: "border-[var(--hive-status-success)] focus-visible:ring-[color-mix(in_srgb,var(--hive-status-success) 80%,transparent)] focus-visible:shadow-[0_0_0_1px_var(--hive-status-success),0_0_32px_rgba(16,185,129,0.24)]",
            warning: "border-[var(--hive-status-warning)] focus-visible:ring-[color-mix(in_srgb,var(--hive-status-warning) 85%,transparent)]",
            ghost: "border-transparent bg-transparent focus-visible:border-[var(--hive-border-default)] focus-visible:ring-[var(--hive-interactive-focus)]",
            outline: "border-2 border-[var(--hive-border-default)] bg-transparent",
        },
        size: {
            sm: "min-h-[72px] px-3 py-2 text-sm",
            default: "min-h-[96px] px-4 py-3 text-sm",
            lg: "min-h-[128px] px-5 py-4 text-base",
            xl: "min-h-[160px] px-6 py-5 text-base",
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
        rounded: "lg",
    },
});
const Textarea = React.forwardRef(({ className, variant, size, resize, rounded, label, helperText, error, maxLength, showCount = false, autoResize = false, description, leftIcon, rightIcon, footerContent, onClear, showClearButton, required, optional, value, onChange, disabled, id, wrapperClassName, ...props }, ref) => {
    const textareaRef = React.useRef(null);
    const combinedRef = React.useMemo(() => {
        return (node) => {
            if (typeof ref === "function") {
                ref(node);
            }
            else if (ref) {
                ;
                ref.current = node;
            }
            textareaRef.current = node;
        };
    }, [ref]);
    const textareaId = id ?? React.useId();
    const computedVariant = error ? "destructive" : variant;
    const hasValue = value !== undefined && `${value}`.length > 0;
    const currentLength = typeof value === "string" ? value.length : 0;
    const isOverLimit = Boolean(maxLength && currentLength > maxLength);
    React.useEffect(() => {
        if (autoResize && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value, autoResize]);
    const handleChange = React.useCallback((event) => {
        if (autoResize) {
            const target = event.target;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
        }
        onChange?.(event);
    }, [onChange, autoResize]);
    const textareaClassName = cn(textareaVariants({
        variant: computedVariant,
        size,
        resize: autoResize ? "none" : resize,
        rounded,
    }), leftIcon && "pl-12", (rightIcon || (showClearButton && hasValue)) && "pr-12", disabled && "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)]", className);
    const controlledTextareaProps = value !== undefined ? { value } : {};
    const textareaNode = (_jsx("textarea", { id: textareaId, className: textareaClassName, ref: combinedRef, onChange: handleChange, maxLength: maxLength, disabled: disabled, "aria-invalid": Boolean(error) || undefined, "aria-describedby": helperText || error || footerContent ? `${textareaId}-helper` : undefined, ...props, ...controlledTextareaProps }));
    return (_jsxs("div", { className: cn("flex flex-col gap-2", wrapperClassName), children: [label ? (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("label", { htmlFor: textareaId, className: cn("text-sm font-medium text-[var(--hive-text-primary)]", disabled && "opacity-70"), children: [label, required ? (_jsx("span", { className: "ml-1 text-[var(--hive-status-error)]", children: "*" })) : null, optional ? (_jsx("span", { className: "ml-1 font-normal text-[var(--hive-text-secondary)]", children: "(optional)" })) : null] }), showCount && maxLength ? (_jsxs("span", { className: cn("text-xs", isOverLimit
                            ? "text-[var(--hive-status-error)]"
                            : "text-[var(--hive-text-secondary)]"), "aria-live": "polite", children: [currentLength, "/", maxLength] })) : null] })) : null, description ? (_jsx("p", { className: "text-xs text-[var(--hive-text-secondary)]", children: description })) : null, _jsxs("div", { className: "relative", children: [leftIcon ? (_jsx("span", { className: "pointer-events-none absolute left-4 top-4 text-[var(--hive-text-secondary)]", "aria-hidden": true, children: leftIcon })) : null, textareaNode, (rightIcon || (showClearButton && hasValue && !disabled)) ? (_jsxs("span", { className: "absolute right-3 top-3 flex items-start gap-1 text-[var(--hive-text-secondary)]", children: [showClearButton && hasValue && !disabled && onClear ? (_jsx("button", { type: "button", onClick: onClear, className: "rounded-full p-1 transition-colors hover:text-[var(--hive-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]", "aria-label": "Clear text", children: _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })) : null, rightIcon ? _jsx("span", { "aria-hidden": true, children: rightIcon }) : null] })) : null] }), (helperText || error || footerContent) ? (_jsxs("div", { className: "flex items-start justify-between gap-2 text-xs", id: `${textareaId}-helper`, children: [_jsx("p", { className: cn("leading-snug", error
                            ? "text-[var(--hive-status-error)]"
                            : "text-[var(--hive-text-secondary)]"), children: error || helperText }), footerContent ? _jsx("span", { children: footerContent }) : null] })) : null] }));
});
Textarea.displayName = "Textarea";
export { Textarea, textareaVariants };
//# sourceMappingURL=textarea.js.map