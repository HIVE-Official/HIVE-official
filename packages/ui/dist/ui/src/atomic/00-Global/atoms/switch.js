'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils.js";
const switchVariants = cva("peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-[color-mix(in_srgb,var(--hive-border-subtle) 58%,#ffd700 28%)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 74%,#ffd700 16%)] transition-[background,border,box-shadow] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)] disabled:cursor-not-allowed disabled:opacity-40 data-[state=unchecked]:bg-[color-mix(in_srgb,var(--hive-background-tertiary) 66%,#ffd700 12%)] data-[state=unchecked]:border-[color-mix(in_srgb,var(--hive-border-default) 68%,#ffd700 18%)]", {
    variants: {
        variant: {
            default: "data-[state=checked]:bg-[#ffd700] data-[state=checked]:border-[#ffd700] data-[state=checked]:shadow-[0_14px_38px_rgba(255,215,0,0.4)]",
            destructive: "data-[state=checked]:bg-[var(--hive-status-error)] data-[state=checked]:border-[var(--hive-status-error)]",
            success: "data-[state=checked]:bg-[var(--hive-status-success)] data-[state=checked]:border-[var(--hive-status-success)]",
        },
        size: {
            default: "h-6 w-11",
            sm: "h-5 w-9",
            lg: "h-7 w-12",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const switchThumbVariants = cva("pointer-events-none block rounded-full bg-[color-mix(in_srgb,#1f1f1f 82%,#ffd700 10%)] shadow-[0_4px_14px_rgba(0,0,0,0.45)] ring-0 transition-transform duration-150 data-[state=checked]:bg-[#101010] data-[state=checked]:shadow-[0_8px_20px_rgba(0,0,0,0.45)]", {
    variants: {
        size: {
            default: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-[2px]",
            sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-[2px]",
            lg: "h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-[2px]",
        },
    },
    defaultVariants: {
        size: "default",
    },
});
const Switch = React.forwardRef(({ className, variant, size, checked, onCheckedChange, label, description, error, disabled, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(false);
    const switchId = React.useId();
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    const handleClick = React.useCallback(() => {
        if (disabled)
            return;
        const newChecked = !isChecked;
        if (!isControlled) {
            setInternalChecked(newChecked);
        }
        onCheckedChange?.(newChecked);
    }, [disabled, isChecked, isControlled, onCheckedChange]);
    const handleKeyDown = React.useCallback((event) => {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            handleClick();
        }
    }, [handleClick]);
    return (_jsxs("div", { className: "flex flex-col space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("button", { ref: ref, id: switchId, role: "switch", type: "button", "aria-checked": isChecked, "aria-describedby": description ? `${switchId}-description` : undefined, "data-state": isChecked ? "checked" : "unchecked", disabled: disabled, className: cn(switchVariants({ variant, size }), className), onClick: handleClick, onKeyDown: handleKeyDown, ...props, children: _jsx("span", { "data-state": isChecked ? "checked" : "unchecked", className: cn(switchThumbVariants({ size }), "bg-[var(--hive-background-primary)]") }) }), label && (_jsx("label", { htmlFor: switchId, className: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", "text-[var(--hive-text-primary)] cursor-pointer", disabled && "cursor-not-allowed opacity-70"), onClick: !disabled ? handleClick : undefined, children: label }))] }), (description || error) && (_jsx("p", { id: `${switchId}-description`, className: cn("text-xs", error
                    ? "text-[var(--hive-status-error)]"
                    : "text-[var(--hive-text-secondary)]"), children: error || description }))] }));
});
Switch.displayName = "Switch";
export { Switch, switchVariants, switchThumbVariants };
//# sourceMappingURL=switch.js.map