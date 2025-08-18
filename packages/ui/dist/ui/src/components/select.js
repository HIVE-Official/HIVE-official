import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { ErrorBoundary } from "./error-boundary";
import { cn } from "../lib/utils";
const selectVariants = cva(
// Base styles using semantic tokens only
"flex w-full items-center justify-between rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:border-[var(--hive-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-50 [&>option]:bg-[var(--hive-background-primary)] [&>option]:text-[var(--hive-text-primary)] [&>option]:py-2 [&>option]:px-3 [&>option:hover]:bg-[var(--hive-brand-secondary)] [&>option:hover]:text-[var(--hive-background-primary)] [&>option:checked]:bg-[var(--hive-brand-secondary)] [&>option:checked]:text-[var(--hive-background-primary)]", {
    variants: {
        variant: {
            default: "border-[var(--hive-border-default)] focus:border-[var(--hive-brand-secondary)]",
            error: "border-[var(--hive-status-error)] focus:border-[var(--hive-status-error)] focus:ring-[color-mix(in_srgb,var(--hive-status-error)_30%,transparent)]",
            success: "border-[var(--hive-status-success)] focus:border-[var(--hive-status-success)] focus:ring-[color-mix(in_srgb,var(--hive-status-success)_30%,transparent)]",
            warning: "border-[var(--hive-status-warning)] focus:border-[var(--hive-status-warning)] focus:ring-[color-mix(in_srgb,var(--hive-status-warning)_30%,transparent)]",
            brand: "bg-transparent border-2 border-[var(--hive-brand-secondary)] focus:border-[var(--hive-brand-secondary)] focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)]",
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
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (_jsxs(SelectPrimitive.Trigger, { ref: ref, className: cn("flex h-10 w-full items-center justify-between rounded-md border border-border bg-surface-01 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-fast ease-smooth focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 hover:border-accent/50", className), ...props, children: [children, _jsx(SelectPrimitive.Icon, { asChild: true, children: _jsx(ChevronDown, { className: "h-4 w-4 opacity-50 transition-transform duration-fast ease-smooth" }) })] })));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (_jsx(ErrorBoundary, { children: _jsx(SelectPrimitive.Portal, { children: _jsx(SelectPrimitive.Content, { ref: ref, className: cn("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-01 text-foreground shadow-lg transition-all duration-fast ease-smooth data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className), position: position, ...props, children: _jsx(SelectPrimitive.Viewport, { className: cn("p-1", position === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"), children: children }) }) }) })));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (_jsx(SelectPrimitive.Label, { ref: ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-foreground", className), ...props })));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (_jsxs(SelectPrimitive.Item, { ref: ref, className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-foreground outline-none transition-colors duration-fast ease-smooth focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent/50", className), ...props, children: [_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: _jsx(SelectPrimitive.ItemIndicator, { children: _jsx(Check, { className: "h-4 w-4 text-accent" }) }) }), "======= const Select = React.forwardRef", _jsx(HTMLSelectElement, {}), ", SelectProps>( (", (className,
            variant,
            size,
            radius,
            options,
            placeholder,
            error,
            success,
            helperText,
            label,
            required,
            allowClear,
            onClear,
            value,
            id,
        ), "...props }, ref) => ", , "const selectId = id || React.useId(); const hasValue = Boolean(value); // Determine variant based on state const computedVariant = error ? \"error\" : success ? \"success\" : variant; const selectElement = (", _jsxs("div", { className: "relative", children: [_jsxs("select", { id: selectId, className: cn(selectVariants({ variant: computedVariant, size, radius }), "appearance-none cursor-pointer pr-10", className), ref: ref, value: value, ...props, children: [placeholder && (_jsx("option", { value: "", disabled: true, children: placeholder })), options.map((option) => (_jsx("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value)))] }), _jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--hive-brand-secondary)] transition-colors duration-200", children: _jsx(ChevronDownIcon, {}) }), allowClear && hasValue && onClear && (_jsx("button", { type: "button", onClick: onClear, className: "absolute right-8 top-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center rounded-full hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", "aria-label": "Clear selection", children: _jsx(ClearIcon, {}) }))] }), "); if (label || error || success || helperText) ", , "return (", _jsxs("div", { className: "space-y-2", children: [label && (_jsxs("label", { htmlFor: selectId, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [label, required && (_jsx("span", { className: "ml-1 text-[var(--hive-status-error)]", children: "*" }))] })), selectElement, (error || success || helperText) && (_jsx("p", { className: cn("text-xs", error && "text-[var(--hive-status-error)]", success && "text-[var(--hive-status-success)]", !error && !success && "text-[var(--hive-text-tertiary)]"), children: error || success || helperText }))] }), "); } return selectElement; } ); Select.displayName = \"Select\"; // Multi-Select Component export interface MultiSelectProps extends Omit", _jsx(SelectProps, {}), ", 'value' | 'onChange'> ", value ?  : string[], "; onChange?: (value: string[]) => void; maxSelected?: number; } const MultiSelect = React.forwardRef", _jsx(HTMLSelectElement, {}), ", MultiSelectProps>( (", (value = [], onChange, maxSelected, ), " ...props }, ref) => ", , "const handleChange = (e: React.ChangeEvent", _jsxs(HTMLSelectElement, { children: [") => ", , "const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); if (maxSelected && selectedOptions.length > maxSelected) ", , "return; // Don't allow selection beyond max } onChange?.(selectedOptions); }; return (", _jsx(Select, { ref: ref, value: value, onChange: handleChange, multiple: true, className: "min-h-20", ...props }), "); } ); MultiSelect.displayName = \"MultiSelect\"; // Native Select Group Component export interface SelectGroupProps extends React.HTMLAttributes", _jsxs(HTMLDivElement, { children: [" ", orientation ?  : "horizontal" | "vertical", "; spacing?: \"none\" | \"sm\" | \"md\"; } const SelectGroup = React.forwardRef", _jsx(HTMLDivElement, {}), ", SelectGroupProps>( (", (className, orientation = "vertical", spacing = "md", children, ), " ...props }, ref) => ", , "const spacingClasses = ", none, ": \"\", sm: orientation === \"horizontal\" ? \"space-x-2\" : \"space-y-2\", md: orientation === \"horizontal\" ? \"space-x-4\" : \"space-y-4\", }; return (", _jsx("div", { ref: ref, className: cn("flex", orientation === "horizontal" ? "flex-row items-end" : "flex-col", spacingClasses[spacing], className), ...props, children: children }), "); } ); SelectGroup.displayName = \"SelectGroup\"; // Select presets for common patterns export const SelectPresets = ", 
                        // Country Select
                        Country, ": (props: Omit", _jsx(SelectProps, {}), ", 'options'>) => (", _jsx(Select, { options: [
                                { value: "us", label: "United States" },
                                { value: "ca", label: "Canada" },
                                { value: "mx", label: "Mexico" },
                                { value: "uk", label: "United Kingdom" },
                                { value: "de", label: "Germany" },
                                { value: "fr", label: "France" },
                            ], placeholder: "Select country", ...props }), "), // Priority Select Priority: (props: Omit", _jsx(SelectProps, {}), ", 'options'>) => (", _jsx(Select, { options: [
                                { value: "low", label: "Low Priority" },
                                { value: "medium", label: "Medium Priority" },
                                { value: "high", label: "High Priority" },
                                { value: "urgent", label: "Urgent" },
                            ], placeholder: "Select priority", ...props }), "), // Status Select Status: (props: Omit", _jsx(SelectProps, {}), ", 'options'>) => (", _jsx(Select, { options: [
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                                { value: "pending", label: "Pending" },
                                { value: "archived", label: "Archived" },
                            ], placeholder: "Select status", ...props }), "), // Size Select Size: (props: Omit", _jsx(SelectProps, {}), ", 'options'>) => (", _jsx(Select, { options: [
                                { value: "xs", label: "Extra Small" },
                                { value: "sm", label: "Small" },
                                { value: "md", label: "Medium" },
                                { value: "lg", label: "Large" },
                                { value: "xl", label: "Extra Large" },
                            ], placeholder: "Select size", ...props }), "), }; // Simple icons using semantic approach const ChevronDownIcon = () => (", _jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", className: "drop-shadow-sm", children: _jsx("path", { d: "M6 9l6 6 6-6", strokeLinecap: "round", strokeLinejoin: "round" }) }), "); >>>>>>> main:packages/ui/src/components/ui/select.tsx const ClearIcon = () => (", _jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M18 6L6 18M6 6l12 12" }) })] })] })] })));
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx(SelectPrimitive.Separator, { ref: ref, className: cn("-mx-1 my-1 h-px bg-border", className), ...props })));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, };
//# sourceMappingURL=select.js.map