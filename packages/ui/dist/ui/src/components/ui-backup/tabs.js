"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { cn } from "../lib/utils";
const TabsContext = createContext(undefined);
const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs components must be used within a Tabs provider");
    }
    return context;
};
export const Tabs = ({ defaultValue, value: controlledValue, onValueChange, children, className, }) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const handleValueChange = (newValue) => {
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    };
    return (_jsx(TabsContext.Provider, { value: { value, onValueChange: handleValueChange }, children: _jsx("div", { className: cn("w-full", className), children: children }) }));
};
export const TabsList = ({ children, className }) => {
    return (_jsx("div", { className: cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className), children: children }));
};
export const TabsTrigger = ({ value, children, className, disabled = false, }) => {
    const { value: activeValue, onValueChange } = useTabsContext();
    const isActive = activeValue === value;
    return (_jsx("button", { type: "button", disabled: disabled, onClick: () => !disabled && onValueChange(value), className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", isActive
            ? "bg-background text-foreground shadow-sm"
            : "hover:bg-background/50", className), children: children }));
};
export const TabsContent = ({ value, children, className, }) => {
    const { value: activeValue } = useTabsContext();
    if (activeValue !== value) {
        return null;
    }
    return (_jsx("div", { className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className), children: children }));
};
//# sourceMappingURL=tabs.js.map