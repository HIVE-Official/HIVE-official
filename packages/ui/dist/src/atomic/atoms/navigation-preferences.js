"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Switch } from "./switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Label } from "./label";
const NavigationPreferences = React.forwardRef(({ preferences, onPreferenceChange, className, ...props }, ref) => {
    return (_jsxs(Card, { ref: ref, className: cn("w-full", className), ...props, children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Navigation Preferences" }), _jsx(CardDescription, { children: "Customize how you navigate through HIVE" })] }), _jsx(CardContent, { className: "space-y-6", children: preferences.map((preference) => (_jsxs("div", { className: "flex items-center justify-between space-x-4", children: [_jsxs("div", { className: "flex-1 space-y-1", children: [_jsx(Label, { htmlFor: preference.id, className: "text-sm font-medium", children: preference.label }), preference.description && (_jsx("p", { className: "text-xs text-[var(--hive-text-secondary)]", children: preference.description }))] }), _jsx("div", { className: "flex-shrink-0", children: preference.type === 'boolean' ? (_jsx(Switch, { id: preference.id, checked: preference.value, onCheckedChange: (checked) => onPreferenceChange(preference.id, checked) })) : (_jsxs(Select, { value: preference.value, onValueChange: (value) => onPreferenceChange(preference.id, value), children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select option" }) }), _jsx(SelectContent, { children: preference.options?.map((option) => (_jsx(SelectItem, { value: option.value, children: option.label }, option.value))) })] })) })] }, preference.id))) })] }));
});
NavigationPreferences.displayName = "NavigationPreferences";
export { NavigationPreferences };
//# sourceMappingURL=navigation-preferences.js.map