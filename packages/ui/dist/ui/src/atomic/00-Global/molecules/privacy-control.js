"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Users, Globe, Lock, Ghost } from "lucide-react";
import { cn } from "../../../lib/utils.js";
import { Button } from "../atoms/button.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../atoms/select.js";
const PRIVACY_LEVELS = [
    {
        value: "public",
        label: "Public",
        description: "Visible to everyone at UB",
        icon: Globe,
        tone: "text-emerald-400",
    },
    {
        value: "connections",
        label: "Connections",
        description: "Only your connections can view",
        icon: Users,
        tone: "text-sky-400",
    },
    {
        value: "private",
        label: "Private",
        description: "Only you can view",
        icon: Lock,
        tone: "text-amber-400",
    },
    {
        value: "ghost",
        label: "Ghost",
        description: "Hidden across Hive",
        icon: Ghost,
        tone: "text-purple-400",
    },
];
export function PrivacyControl({ level, onLevelChange, widgetName, compact = false, showDescription = false, className, }) {
    const current = React.useMemo(() => PRIVACY_LEVELS.find((item) => item.value === level) ?? PRIVACY_LEVELS[0], [level]);
    const Icon = current.icon;
    if (compact) {
        return (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
                const index = PRIVACY_LEVELS.findIndex((item) => item.value === level);
                const next = PRIVACY_LEVELS[(index + 1) % PRIVACY_LEVELS.length];
                onLevelChange(next.value);
            }, className: cn("h-8 gap-1 px-2 text-xs", current.tone, className), children: [_jsx(Icon, { className: "h-3.5 w-3.5", "aria-hidden": true }), _jsx("span", { children: current.label })] }));
    }
    return (_jsxs("div", { className: cn("space-y-2", className), children: [widgetName ? (_jsx("span", { className: "text-xs uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--hive-text-muted,#8e90a2) 90%,transparent)]", children: widgetName })) : null, _jsxs(Select, { value: level, onValueChange: (value) => onLevelChange(value), children: [_jsx(SelectTrigger, { className: "w-full bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 88%,transparent)]", children: _jsx(SelectValue, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { className: cn("h-4 w-4", current.tone), "aria-hidden": true }), _jsx("span", { children: current.label })] }) }) }), _jsx(SelectContent, { className: "bg-[color-mix(in_srgb,var(--hive-background-primary,#090a14) 96%,transparent)] border-[color-mix(in_srgb,var(--hive-border-default,#242736) 75%,transparent)]", children: PRIVACY_LEVELS.map((item) => {
                            const ItemIcon = item.icon;
                            return (_jsxs(SelectItem, { value: item.value, className: "flex cursor-pointer gap-2 px-3", children: [_jsx(ItemIcon, { className: cn("h-4 w-4", item.tone), "aria-hidden": true }), _jsxs("div", { className: "flex flex-col text-left", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-primary,#f7f7ff)]", children: item.label }), showDescription ? (_jsx("span", { className: "text-xs text-[var(--hive-text-muted,#9194a8)]", children: item.description })) : null] })] }, item.value));
                        }) })] }), showDescription ? (_jsx("p", { className: "text-xs text-[var(--hive-text-muted,#9194a8)]", children: current.description })) : null] }));
}
export function BulkPrivacyControl({ widgets, onBulkChange, className }) {
    const [pending, setPending] = React.useState({});
    const applyAll = (level) => {
        const updates = widgets.reduce((acc, widget) => {
            acc[widget.id] = level;
            return acc;
        }, {});
        setPending(updates);
        onBulkChange(updates);
    };
    const updateWidget = (widgetId, level) => {
        setPending((prev) => ({ ...prev, [widgetId]: level }));
    };
    const hasChanges = Object.keys(pending).length > 0;
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default,#2b2e3f) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 88%,transparent)] p-3", children: [_jsx("span", { className: "text-xs uppercase tracking-[0.32em] text-[var(--hive-text-muted,#8d90a2)]", children: "Set all widgets to" }), _jsx("div", { className: "flex gap-2", children: PRIVACY_LEVELS.map((item) => {
                            const ItemIcon = item.icon;
                            return (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => applyAll(item.value), className: cn("gap-1 px-2", item.tone), children: [_jsx(ItemIcon, { className: "h-3.5 w-3.5", "aria-hidden": true }), _jsx("span", { className: "text-xs", children: item.label })] }, item.value));
                        }) })] }), _jsx("div", { className: "space-y-3", children: widgets.map((widget) => (_jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default,#2b2e3f) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 82%,transparent)] p-3", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-primary,#f7f7ff)]", children: widget.name }), _jsx(PrivacyControl, { level: pending[widget.id] ?? widget.level, onLevelChange: (value) => updateWidget(widget.id, value), compact: true })] }, widget.id))) }), hasChanges ? (_jsx(Button, { onClick: () => {
                    onBulkChange(pending);
                    setPending({});
                }, className: "w-full", children: "Save privacy settings" })) : null] }));
}
//# sourceMappingURL=privacy-control.js.map