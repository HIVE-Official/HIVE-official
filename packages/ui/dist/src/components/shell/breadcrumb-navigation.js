"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '../../index.js';
import { cn } from '../../lib/utils.js';
export function BreadcrumbNavigation({ items, className }) {
    return (_jsxs("nav", { className: cn("flex items-center space-x-1 text-sm text-[var(--hive-text-tertiary)]", className), "aria-label": "Breadcrumb", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "h-6 px-1 hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] hover:text-[var(--hive-text-primary)]", children: _jsx(Home, { className: "h-3 w-3" }) }), items.length > 0 && (_jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-border-default)]" })), items.map((item, index) => {
                const isLast = index === items.length - 1;
                const Icon = item.icon;
                return (_jsxs(React.Fragment, { children: [_jsxs("div", { className: "flex items-center space-x-1", children: [Icon && _jsx(Icon, { className: "h-3 w-3" }), item.href ? (_jsx(Button, { variant: "ghost", size: "sm", className: cn("h-6 px-1 font-normal", "hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] hover:text-[var(--hive-text-primary)]", "text-[var(--hive-text-tertiary)]"), children: item.label })) : (_jsx("span", { className: cn("px-1 font-medium", isLast ? "text-[var(--hive-text-primary)]" : "text-[var(--hive-text-tertiary)]"), children: item.label }))] }), !isLast && (_jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-border-default)]" }))] }, index));
            })] }));
}
//# sourceMappingURL=breadcrumb-navigation.js.map