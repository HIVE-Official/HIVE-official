import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const checkboxVariants = cva("peer h-4 w-4 shrink-0 rounded-sm border border-[var(--hive-border-default)] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--hive-brand-primary)] data-[state=checked]:text-[var(--hive-brand-primary-text)]", {
    variants: {
        variant: {
            default: "data-[state=checked]:bg-[var(--hive-brand-primary)]",
            destructive: "data-[state=checked]:bg-[var(--hive-status-error)]",
            success: "data-[state=checked]:bg-[var(--hive-status-success)]",
            warning: "data-[state=checked]:bg-[var(--hive-status-warning)]",
        },
        size: {
            default: "h-4 w-4",
            sm: "h-3 w-3",
            lg: "h-5 w-5",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Checkbox = React.forwardRef(({ className, variant, size, checked, onCheckedChange, onChange, label, description, error, disabled, ...props }, ref) => {
    const checkboxId = React.useId();
    const handleChange = React.useCallback((event) => {
        const isChecked = event.target.checked;
        onCheckedChange?.(isChecked);
        onChange?.(event);
    }, [onCheckedChange, onChange]);
    return (_jsxs("div", { className: "flex flex-col space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { ref: ref, id: checkboxId, type: "checkbox", checked: checked, onChange: handleChange, disabled: disabled, "data-state": checked ? "checked" : "unchecked", className: cn(checkboxVariants({ variant, size }), className), ...props }), label && (_jsx("label", { htmlFor: checkboxId, className: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", "text-[var(--hive-text-primary)] cursor-pointer", disabled && "cursor-not-allowed opacity-70"), children: label }))] }), (description || error) && (_jsx("p", { className: cn("text-xs ml-7", error
                    ? "text-[var(--hive-status-error)]"
                    : "text-[var(--hive-text-secondary)]"), children: error || description }))] }));
});
Checkbox.displayName = "Checkbox";
export { Checkbox, checkboxVariants };
//# sourceMappingURL=checkbox.js.map