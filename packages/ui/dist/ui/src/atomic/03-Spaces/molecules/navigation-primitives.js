"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
const layoutClassMap = {
    sidebar: "w-full justify-between px-3 py-2 text-left min-h-[44px] text-sm",
    inline: "justify-start px-3 py-1.5 min-h-[40px] text-sm",
    rail: "flex-col gap-1 px-2 py-3 min-h-[64px] min-w-[56px] text-xs",
    bottom: "flex-1 flex-col gap-1 px-2 py-2 min-h-[56px] text-xs",
};
const activeClassMap = {
    sidebar: "bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 18%,transparent)] text-[var(--hive-text-primary,#F9FAFB)] border border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 32%,var(--hive-border-subtle,#2E2F39))] shadow-[0_16px_42px_rgba(7,8,15,0.32)]",
    inline: "bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 18%,transparent)] text-[var(--hive-text-primary,#F9FAFB)] border border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 30%,var(--hive-border-subtle,#2E2F39))]",
    rail: "bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 18%,transparent)] text-[var(--hive-text-primary,#F9FAFB)] border border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 30%,var(--hive-border-subtle,#2E2F39))] shadow-[0_12px_30px_rgba(7,8,15,0.28)]",
    bottom: "bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 16%,transparent)] text-[var(--hive-text-primary,#F9FAFB)] shadow-[0_-8px_28px_rgba(7,8,15,0.3)]",
};
const inactiveClassMap = {
    sidebar: "text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 85%,transparent)] hover:text-[var(--hive-text-primary,#F9FAFB)] hover:bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(15,16,24,0.8)) 65%,transparent)] border border-transparent",
    inline: "text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 88%,transparent)] hover:text-[var(--hive-text-primary,#F9FAFB)] hover:bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(15,16,24,0.8)) 60%,transparent)] border border-transparent",
    rail: "text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 88%,transparent)] hover:text-[var(--hive-text-primary,#F9FAFB)] hover:bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(15,16,24,0.8)) 66%,transparent)] border border-transparent",
    bottom: "text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 88%,transparent)] hover:text-[var(--hive-text-primary,#F9FAFB)] hover:bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(15,16,24,0.8)) 58%,transparent)]",
};
function formatBadge(value) {
    if (typeof value === "number") {
        return value > 99 ? "99+" : String(value);
    }
    return value;
}
export const NavigationItem = React.forwardRef(function NavigationItem({ icon, label, description, badge, active = false, disabled = false, layout = "sidebar", href, target, rel, className, onClick, onSelect, id, ...props }, ref) {
    const Component = (href ? "a" : "button");
    const badgeValue = formatBadge(badge);
    const baseClass = "group relative inline-flex items-center rounded-xl font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus,#FACC15)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary,#060608)] disabled:pointer-events-none disabled:opacity-40";
    const contentClasses = cn(baseClass, layoutClassMap[layout], active ? activeClassMap[layout] : inactiveClassMap[layout], layout === "sidebar" || layout === "inline"
        ? "gap-2"
        : "items-center justify-center text-center", className);
    const iconSize = layout === "rail" || layout === "bottom"
        ? "h-5 w-5"
        : "h-5 w-5";
    const Indicator = layout === "bottom" || layout === "rail" ? (_jsx("span", { className: cn("absolute left-1/2 h-1 w-10 -translate-x-1/2 rounded-full transition-opacity duration-200 ease-out", layout === "bottom" ? "-top-1" : "top-1.5", active
            ? "bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 82%,transparent)] opacity-100"
            : "opacity-0"), "aria-hidden": true })) : null;
    const handleClick = (event) => {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        onClick?.(event);
        if (!event.defaultPrevented) {
            onSelect?.(event);
        }
    };
    const sharedChildren = (_jsxs(_Fragment, { children: [Indicator, icon ? (_jsx("span", { className: cn("flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-white/0 transition-colors", iconSize, active ? "text-[var(--hive-text-primary,#F9FAFB)]" : undefined, layout === "sidebar" || layout === "inline"
                    ? "bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(15,16,24,0.8)) 62%,transparent)] text-[var(--hive-text-secondary,#C0C2CC)]"
                    : "text-[var(--hive-text-secondary,#C0C2CC)]"), children: icon })) : null, _jsxs("span", { className: "flex flex-1 flex-col text-left", children: [_jsx("span", { className: "text-sm font-semibold leading-tight", children: label }), description && layout !== "rail" && layout !== "bottom" ? (_jsx("span", { className: "text-xs font-normal text-[var(--hive-text-secondary)]", children: description })) : null] }), badgeValue ? (_jsx("span", { className: "ml-auto inline-flex min-w-[24px] items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 20%,transparent)] px-2 py-0.5 text-xs font-semibold text-[var(--hive-text-primary,#F9FAFB)]", children: badgeValue })) : null] }));
    if (Component === "a") {
        return (_jsx("a", { id: id, ref: ref, className: contentClasses, "data-layout": layout, "aria-current": active ? "page" : undefined, "aria-disabled": disabled || undefined, onClick: handleClick, href: href, target: target, rel: rel, ...props, children: sharedChildren }));
    }
    return (_jsx("button", { id: id, ref: ref, className: contentClasses, "data-layout": layout, "aria-current": active ? "page" : undefined, disabled: disabled, onClick: handleClick, type: props.type ?? "button", ...props, children: sharedChildren }));
});
export function SidebarNav({ sections, activeId, onSelect, header, footer, className, ...props }) {
    return (_jsxs("nav", { className: cn("flex w-full flex-col gap-6 rounded-3xl border border-white/8 bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,14,24,0.9)) 78%,transparent)] p-4 text-[var(--hive-text-secondary)] shadow-[0_18px_45px_rgba(0,0,0,0.48)] backdrop-blur-xl", className), "aria-label": "Primary navigation", ...props, children: [header ? _jsx("div", { children: header }) : null, _jsx("div", { className: "space-y-6", children: sections.map((section) => (_jsxs("div", { className: "space-y-2", children: [section.label ? (_jsx("div", { className: "px-2 text-xs uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 68%,transparent)]", children: section.label })) : null, _jsx("div", { className: "flex flex-col gap-2", children: section.items.map((item) => (_jsx(NavigationItem, { ...item, id: item.id, active: item.id === activeId, layout: "sidebar", onSelect: (event) => onSelect?.(item, event) }, item.id))) })] }, section.id))) }), footer ? _jsx("div", { children: footer }) : null] }));
}
export function NavigationRail({ items, activeId, onSelect, footerItems, label, className, ...props }) {
    return (_jsxs("nav", { className: cn("flex min-w-[72px] flex-col items-center gap-6 rounded-3xl border border-white/8 bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,14,24,0.92)) 82%,transparent)] p-3 text-[var(--hive-text-secondary)] shadow-[0_14px_38px_rgba(0,0,0,0.42)] backdrop-blur-xl", className), "aria-label": label ?? "Secondary navigation", ...props, children: [label ? (_jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 68%,transparent)]", children: label })) : null, _jsx("div", { className: "flex flex-1 flex-col gap-3", children: items.map((item) => (_jsx(NavigationItem, { ...item, id: item.id, layout: "rail", active: item.id === activeId, onSelect: (event) => onSelect?.(item, event) }, item.id))) }), footerItems?.length ? (_jsx("div", { className: "flex flex-col gap-3", children: footerItems.map((item) => (_jsx(NavigationItem, { ...item, id: item.id, layout: "rail", active: item.id === activeId, onSelect: (event) => onSelect?.(item, event) }, item.id))) })) : null] }));
}
export function BottomNav({ items, activeId, onSelect, label, className, ...props }) {
    return (_jsx("nav", { className: cn("flex w-full items-center gap-2 rounded-3xl border border-white/10 bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(10,10,16,0.94)) 86%,transparent)] p-2 text-[var(--hive-text-secondary)] shadow-[0_-12px_45px_rgba(0,0,0,0.4)] backdrop-blur-xl", className), "aria-label": label ?? "Mobile navigation", ...props, children: items.map((item) => (_jsx(NavigationItem, { ...item, id: item.id, layout: "bottom", active: item.id === activeId, onSelect: (event) => onSelect?.(item, event) }, item.id))) }));
}
export function TopBar({ leading, centered, trailing, border = "subtle", sticky = false, className, children, ...props }) {
    return (_jsx("header", { className: cn("flex w-full items-center justify-between gap-4 rounded-3xl bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(15,16,24,0.92)) 80%,transparent)] px-4 py-3 text-[var(--hive-text-secondary)] shadow-[0_12px_35px_rgba(0,0,0,0.38)] backdrop-blur-xl md:px-6 md:py-4", border === "subtle" && "border border-white/10", sticky && "sticky top-4 z-30", className), ...props, children: children ? (children) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex min-w-0 items-center gap-3", children: leading }), _jsx("div", { className: "flex flex-1 items-center justify-center", children: centered }), _jsx("div", { className: "flex min-w-0 items-center justify-end gap-3", children: trailing })] })) }));
}
//# sourceMappingURL=navigation-primitives.js.map