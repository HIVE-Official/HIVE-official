'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
// HIVE Radix Select System - Atomic Design with Semantic Tokens
// Full compatibility with existing legacy select usage
const selectTriggerVariants = cva(
// Base styles using semantic tokens only
"flex h-10 w-full items-center justify-between rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] ring-offset-[var(--hive-background-primary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)] focus:border-[var(--hive-brand-secondary)]",
            error: "border-[var(--hive-status-error)] focus:border-[var(--hive-status-error)] focus:ring-[color-mix(in_srgb,var(--hive-status-error)_30%,transparent)]",
            success: "border-[var(--hive-status-success)] focus:border-[var(--hive-status-success)] focus:ring-[color-mix(in_srgb,var(--hive-status-success)_30%,transparent)]",
            warning: "border-[var(--hive-status-warning)] focus:border-[var(--hive-status-warning)] focus:ring-[color-mix(in_srgb,var(--hive-status-warning)_30%,transparent)]",
            brand: "border-[var(--hive-brand-secondary)] focus:border-[var(--hive-brand-secondary)]",
        },
        size: {
            sm: "h-8 px-2 text-xs",
            default: "h-10 px-3 text-sm",
            lg: "h-12 px-4 text-base",
            xl: "h-14 px-5 text-lg",
        },
        radius: {
            none: "rounded-none",
            sm: "rounded-sm",
            default: "rounded-lg",
            lg: "rounded-xl",
            full: "rounded-full",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        radius: "default",
    },
});
const selectContentVariants = cva("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", {
    variants: {
        position: {
            popper: "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            item: "",
        }
    },
    defaultVariants: {
        position: "popper",
    },
});
// === CORE RADIX COMPONENTS ===
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, variant, size, radius, children, ...props }, ref) => (_jsxs(SelectPrimitive.Trigger, { ref: ref, className: cn(selectTriggerVariants({ variant, size, radius }), className), ...props, children: [children, _jsx(SelectPrimitive.Icon, { asChild: true, children: _jsx(ChevronDownIcon, { className: "h-4 w-4 opacity-50" }) })] })));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (_jsx(SelectPrimitive.ScrollUpButton, { ref: ref, className: cn("flex cursor-default items-center justify-center py-1 text-[var(--hive-text-secondary)]", className), ...props, children: _jsx(ChevronUpIcon, { className: "h-4 w-4" }) })));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (_jsx(SelectPrimitive.ScrollDownButton, { ref: ref, className: cn("flex cursor-default items-center justify-center py-1 text-[var(--hive-text-secondary)]", className), ...props, children: _jsx(ChevronDownIcon, { className: "h-4 w-4" }) })));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (_jsx(SelectPrimitive.Portal, { children: _jsxs(SelectPrimitive.Content, { ref: ref, className: cn(selectContentVariants({ position }), className), position: position, ...props, children: [_jsx(SelectScrollUpButton, {}), _jsx(SelectPrimitive.Viewport, { className: cn("p-1", position === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"), children: children }), _jsx(SelectScrollDownButton, {})] }) })));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (_jsx(SelectPrimitive.Label, { ref: ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-[var(--hive-text-secondary)]", className), ...props })));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (_jsxs(SelectPrimitive.Item, { ref: ref, className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-[var(--hive-text-primary)] outline-none focus:bg-[var(--hive-interactive-hover)] focus:text-[var(--hive-text-primary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), ...props, children: [_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: _jsx(SelectPrimitive.ItemIndicator, { children: _jsx(CheckIcon, { className: "h-4 w-4" }) }) }), _jsx(SelectPrimitive.ItemText, { children: children })] })));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx(SelectPrimitive.Separator, { ref: ref, className: cn("-mx-1 my-1 h-px bg-[var(--hive-border-subtle)]", className), ...props })));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const HiveSelect = React.forwardRef(({ className, variant = "default", size = "default", radius = "default", placeholder, error, success, helperText, label, required, value, onValueChange, children, disabled, ...props }, ref) => {
    const selectId = React.useId();
    // Determine variant based on state
    const computedVariant = error ? "error" : success ? "success" : variant;
    const selectElement = (_jsxs(Select, { value: value, onValueChange: onValueChange, disabled: disabled, ...props, children: [_jsx(SelectTrigger, { variant: computedVariant, size: size, radius: radius, className: className, id: selectId, children: _jsx(SelectValue, { placeholder: placeholder }) }), _jsx(SelectContent, { children: children })] }));
    if (label || error || success || helperText) {
        return (_jsxs("div", { className: "space-y-2", children: [label && (_jsxs("label", { htmlFor: selectId, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [label, required && (_jsx("span", { className: "ml-1 text-[var(--hive-status-error)]", children: "*" }))] })), selectElement, (error || success || helperText) && (_jsx("p", { className: cn("text-xs", error && "text-[var(--hive-status-error)]", success && "text-[var(--hive-status-success)]", !error && !success && "text-[var(--hive-text-tertiary)]"), children: error || success || helperText }))] }));
    }
    return selectElement;
});
HiveSelect.displayName = "HiveSelect";
// === ICONS ===
const ChevronDownIcon = React.forwardRef(({ className, ...props }, ref) => (_jsx("svg", { ref: ref, className: className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props, children: _jsx("path", { d: "m6 9 6 6 6-6" }) })));
ChevronDownIcon.displayName = "ChevronDownIcon";
const ChevronUpIcon = React.forwardRef(({ className, ...props }, ref) => (_jsx("svg", { ref: ref, className: className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props, children: _jsx("path", { d: "m18 15-6-6-6 6" }) })));
ChevronUpIcon.displayName = "ChevronUpIcon";
const CheckIcon = React.forwardRef(({ className, ...props }, ref) => (_jsx("svg", { ref: ref, className: className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props, children: _jsx("path", { d: "M20 6 9 17l-5-5" }) })));
CheckIcon.displayName = "CheckIcon";
// === EXPORTS ===
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton, HiveSelect, selectTriggerVariants, selectContentVariants, };
//# sourceMappingURL=select-radix.js.map