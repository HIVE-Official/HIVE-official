import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const tabsListVariants = cva("inline-flex h-10 items-center justify-center rounded-md bg-[var(--hive-background-secondary)] p-1 text-[var(--hive-text-secondary)]", {
    variants: {
        variant: {
            default: "bg-[var(--hive-background-secondary)]",
            underline: "bg-transparent border-b border-[var(--hive-border-default)]",
            pills: "bg-[var(--hive-background-tertiary)] gap-1",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const tabsTriggerVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "data-[state=active]:bg-[var(--hive-background-primary)] data-[state=active]:text-[var(--hive-text-primary)] data-[state=active]:shadow-sm",
            underline: "border-b-2 border-transparent data-[state=active]:border-[var(--hive-brand-primary)] data-[state=active]:text-[var(--hive-brand-primary)] rounded-none",
            pills: "data-[state=active]:bg-[var(--hive-brand-primary)] data-[state=active]:text-[var(--hive-brand-primary-text)] hover:bg-[var(--hive-background-secondary)]",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const tabsContentVariants = cva("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2", {
    variants: {
        variant: {
            default: "",
            card: "rounded-md border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-6",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const TabsContext = React.createContext(null);
function Tabs({ value, defaultValue, onValueChange, variant = "default", children, className }) {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const handleValueChange = React.useCallback((newValue) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    }, [isControlled, onValueChange]);
    const contextValue = React.useMemo(() => ({
        value: currentValue,
        onValueChange: handleValueChange,
        variant,
    }), [currentValue, handleValueChange, variant]);
    return (_jsx(TabsContext.Provider, { value: contextValue, children: _jsx("div", { className: cn("w-full", className), children: children }) }));
}
const TabsList = React.forwardRef(({ className, variant, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const actualVariant = variant || context?.variant || "default";
    return (_jsx("div", { ref: ref, role: "tablist", className: cn(tabsListVariants({ variant: actualVariant }), className), ...props }));
});
TabsList.displayName = "TabsList";
const TabsTrigger = React.forwardRef(({ className, variant, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const actualVariant = variant || context?.variant || "default";
    if (!context) {
        throw new Error("TabsTrigger must be used within Tabs");
    }
    const isActive = context.value === value;
    return (_jsx("button", { ref: ref, role: "tab", "aria-selected": isActive, "data-state": isActive ? "active" : "inactive", className: cn(tabsTriggerVariants({ variant: actualVariant }), className), onClick: () => context.onValueChange(value), ...props, children: children }));
});
TabsTrigger.displayName = "TabsTrigger";
const TabsContent = React.forwardRef(({ className, variant, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error("TabsContent must be used within Tabs");
    }
    const isActive = context.value === value;
    if (!isActive) {
        return null;
    }
    return (_jsx("div", { ref: ref, role: "tabpanel", "data-state": isActive ? "active" : "inactive", className: cn(tabsContentVariants({ variant }), className), ...props, children: children }));
});
TabsContent.displayName = "TabsContent";
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, tabsContentVariants, };
//# sourceMappingURL=tabs.js.map