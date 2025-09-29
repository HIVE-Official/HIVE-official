'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const selectVariants = cva("flex h-10 w-full items-center justify-between rounded-md border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] ring-offset-background placeholder:text-[var(--hive-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--hive-interactive-focus)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)]",
            destructive: "border-[var(--hive-status-error)] focus:ring-[var(--hive-status-error)]",
            success: "border-[var(--hive-status-success)] focus:ring-[var(--hive-status-success)]",
        },
        size: {
            default: "h-10 px-3 py-2",
            sm: "h-9 px-3 text-xs",
            lg: "h-11 px-4 text-base",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const selectContentVariants = cva("relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-[var(--hive-border-default)] bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] shadow-md", {
    variants: {
        position: {
            "item-aligned": "",
            popper: "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        },
    },
    defaultVariants: {
        position: "popper",
    },
});
const selectItemVariants = cva("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-[var(--hive-background-secondary)] focus:text-[var(--hive-text-primary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", {
    variants: {
        variant: {
            default: "",
            destructive: "text-[var(--hive-status-error)] focus:text-[var(--hive-status-error)]",
        },
    },
    defaultVariants: {
        variant: "default",
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
    return (_jsxs("button", { ref: ref, type: "button", role: "combobox", "aria-expanded": context.open, "aria-haspopup": "listbox", className: cn(selectVariants({ variant, size }), className), onClick: () => context.onOpenChange(!context.open), ...props, children: [children, _jsx("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 opacity-50", children: _jsx("path", { d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819L7.5 8.63638L10.0682 6.06819C10.244 5.89245 10.244 5.60753 10.0682 5.43179C9.89245 5.25605 9.60753 5.25605 9.43179 5.43179L7.5 7.36362L5.56821 5.43179C5.39247 5.25605 5.10755 5.25605 4.93179 5.43179Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) })] }));
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
const SelectContent = React.forwardRef(({ className, children, position, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectContent must be used within Select");
    }
    if (!context.open) {
        return null;
    }
    return (_jsx("div", { ref: ref, role: "listbox", className: cn(selectContentVariants({ position }), className), ...props, children: children }));
});
SelectContent.displayName = "SelectContent";
const SelectItem = React.forwardRef(({ className, children, value, disabled, variant, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectItem must be used within Select");
    }
    const isSelected = context.value === value;
    return (_jsxs("div", { ref: ref, role: "option", "aria-selected": isSelected, "data-disabled": disabled, className: cn(selectItemVariants({ variant }), className), onClick: disabled ? undefined : () => context.onValueChange(value), ...props, children: [isSelected && (_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: _jsx("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", children: _jsx("path", { d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) }) })), children] }));
});
SelectItem.displayName = "SelectItem";
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-[var(--hive-text-primary)]", className), ...props })));
SelectLabel.displayName = "SelectLabel";
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("-mx-1 my-1 h-px bg-[var(--hive-border-default)]", className), ...props })));
SelectSeparator.displayName = "SelectSeparator";
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectSeparator, selectVariants, selectContentVariants, selectItemVariants, };
//# sourceMappingURL=select.js.map