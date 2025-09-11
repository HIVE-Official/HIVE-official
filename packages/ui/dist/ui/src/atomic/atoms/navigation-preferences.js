"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
const options = [
    {
        value: 'auto',
        label: 'Automatic',
        description: 'Adapts to your screen size and usage patterns'
    },
    {
        value: 'sidebar',
        label: 'Sidebar',
        description: 'Always show navigation in a side panel'
    },
    {
        value: 'tabs',
        label: 'Top Tabs',
        description: 'Show navigation as tabs at the top'
    }
];
export function NavigationPreferences({ value, onChange, className }) {
    return (_jsx("div", { className: cn("space-y-4", className), children: _jsx("div", { className: "space-y-3", children: options.map((option) => (_jsxs("label", { className: cn("flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-colors", value === option.value
                    ? "border-[var(--hive-brand-gold)] bg-[var(--hive-brand-gold)]/5"
                    : "border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-border-interactive)]"), children: [_jsx("input", { type: "radio", name: "navigation-preference", value: option.value, checked: value === option.value, onChange: () => onChange(option.value), className: "mt-1 w-4 h-4 text-[var(--hive-brand-gold)] bg-transparent border-[var(--hive-border-primary)] focus:ring-[var(--hive-brand-gold)] focus:ring-2" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: option.label }), value === option.value && (_jsx("span", { className: "text-xs px-2 py-1 bg-[var(--hive-brand-gold)] text-[var(--hive-text-inverse)] rounded-full font-medium", children: "Active" }))] }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary)] mt-1", children: option.description })] })] }, option.value))) }) }));
}
//# sourceMappingURL=navigation-preferences.js.map