'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { MotionDiv, AnimatePresence } from "../../../shells/motion-safe";
const selectVariants = cva("inline-flex w-full items-center justify-between gap-2 rounded-[32px] border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-5 py-2.5 text-sm text-[var(--hive-text-primary)] transition-[border,background,box-shadow] duration-200 ease-out placeholder:text-[var(--hive-text-muted)] focus:outline-none focus-visible:border-[var(--hive-border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_28px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-60", {
    variants: {
        variant: {
            default: "hover:border-[var(--hive-border-primary)]",
            subtle: "border-[var(--hive-border-subtle)] bg-[var(--hive-background-primary)]",
            destructive: "border-[var(--hive-status-error)] focus-visible:ring-[color-mix(in_srgb,var(--hive-status-error) 90%,transparent)] focus-visible:shadow-[0_0_0_1px_var(--hive-status-error),0_0_32px_rgba(239,68,68,0.28)]",
            success: "border-[var(--hive-status-success)] focus-visible:ring-[color-mix(in_srgb,var(--hive-status-success) 80%,transparent)] focus-visible:shadow-[0_0_0_1px_var(--hive-status-success),0_0_32px_rgba(16,185,129,0.24)]",
        },
        size: {
            sm: "h-9 px-3 text-sm",
            default: "h-11 px-4 text-sm",
            lg: "h-12 px-5 text-base",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const selectContentVariants = cva("relative z-50 min-w-[12rem] overflow-hidden rounded-2xl border border-[var(--hive-border-default)] bg-[color-mix(in_srgb,var(--hive-background-primary) 92%,transparent)] shadow-[0_24px_60px_rgba(0,0,0,0.45)]", {
    variants: {
        position: {
            "item-aligned": "",
            popper: "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        },
        appearance: {
            default: "text-[var(--hive-text-primary)]",
        },
    },
    defaultVariants: {
        position: "popper",
        appearance: "default",
    },
});
const selectItemVariants = cva("relative flex w-full cursor-default select-none items-center rounded-lg py-2.5 pl-8 pr-3 text-sm outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-30", {
    variants: {
        variant: {
            default: "",
            destructive: "text-[var(--hive-status-error)] focus:text-[var(--hive-status-error)]",
        },
        appearance: {
            default: "focus:bg-[color-mix(in_srgb,var(--hive-background-tertiary) 40%,transparent)] focus:text-[var(--hive-text-primary)]",
            subtle: "focus:bg-[color-mix(in_srgb,var(--hive-background-secondary) 55%,transparent)] focus:text-[var(--hive-text-primary)]",
        }
    },
    defaultVariants: {
        variant: "default",
        appearance: "default",
    },
});
const SelectContext = React.createContext(null);
function Select({ value, onValueChange, defaultValue, open, onOpenChange, disabled, children, }) {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlledValue = value !== undefined;
    const isControlledOpen = open !== undefined;
    const currentValue = isControlledValue ? value : internalValue;
    const currentOpen = isControlledOpen ? open : internalOpen;
    const handleValueChange = React.useCallback((newValue) => {
        if (!isControlledValue) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
        // Close after selection
        if (!isControlledOpen) {
            setInternalOpen(false);
        }
        onOpenChange?.(false);
    }, [isControlledValue, isControlledOpen, onValueChange, onOpenChange]);
    const handleOpenChange = React.useCallback((newOpen) => {
        if (disabled)
            return;
        if (!isControlledOpen) {
            setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    }, [disabled, isControlledOpen, onOpenChange]);
    const contextValue = React.useMemo(() => ({
        value: currentValue,
        onValueChange: handleValueChange,
        open: currentOpen,
        onOpenChange: handleOpenChange,
    }), [currentValue, handleValueChange, currentOpen, handleOpenChange]);
    return (_jsx(SelectContext.Provider, { value: contextValue, children: children }));
}
const SelectTrigger = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectTrigger must be used within Select");
    }
    return (_jsxs("button", { ref: ref, type: "button", role: "combobox", "aria-expanded": context.open, "aria-haspopup": "listbox", className: cn(selectVariants({ variant, size }), className), onClick: () => context.onOpenChange(!context.open), ...props, children: [children, _jsx(ChevronDown, { "aria-hidden": true, className: cn("h-4 w-4 text-[var(--hive-text-tertiary)] transition-transform duration-200", context.open && "rotate-180") })] }));
});
SelectTrigger.displayName = "SelectTrigger";
const SelectValue = React.forwardRef(({ className, placeholder, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectValue must be used within Select");
    }
    return (_jsx("span", { ref: ref, className: cn("truncate", className), ...props, children: context.value || placeholder }));
});
SelectValue.displayName = "SelectValue";
const SELECT_EASING = [0.23, 1, 0.32, 1];
const SelectContent = React.forwardRef(({ className, children, position, appearance, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectContent must be used within Select");
    }
    return (_jsx(AnimatePresence, { children: context.open ? (_jsx(MotionDiv, { ref: ref, role: "listbox", initial: { opacity: 0, y: -8, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -8, scale: 0.96 }, transition: { duration: 0.18, ease: SELECT_EASING }, className: cn(selectContentVariants({ position, appearance }), className), ...props, children: children }, "select-content")) : null }));
});
SelectContent.displayName = "SelectContent";
const SelectItem = React.forwardRef(({ className, children, value, disabled, variant, appearance, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectItem must be used within Select");
    }
    const isSelected = context.value === value;
    return (_jsxs("div", { ref: ref, role: "option", "aria-selected": isSelected, "data-disabled": disabled, className: cn(selectItemVariants({ variant, appearance }), isSelected && "text-[var(--hive-brand-primary)]", className), onClick: disabled ? undefined : () => context.onValueChange(value), ...props, children: [isSelected && (_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: _jsx("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", children: _jsx("path", { d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) }) })), children] }));
});
SelectItem.displayName = "SelectItem";
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-[var(--hive-text-primary)]", className), ...props })));
SelectLabel.displayName = "SelectLabel";
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("-mx-1 my-1 h-px bg-[var(--hive-border-default)]", className), ...props })));
SelectSeparator.displayName = "SelectSeparator";
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectSeparator, selectVariants, selectContentVariants, selectItemVariants, };
//# sourceMappingURL=select.js.map