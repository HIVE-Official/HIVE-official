import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
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
export const NavigationItem = React.forwardRef(({ icon, label, description, badge, active = false, disabled = false, layout = "sidebar", href, target, rel, className, onClick, onSelect, id, ...props }, ref) => {
    const Component = (href ? "a" : "button");
    const badgeValue = formatBadge(badge);
    const baseClass = "group relative inline-flex items-center rounded-xl font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus,#FACC15)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary,#060608)] disabled:pointer-events-none disabled:opacity-40";
    const contentClasses = cn(baseClass, layoutClassMap[layout], active ? activeClassMap[layout] : inactiveClassMap[layout], layout === "sidebar" || layout === "inline"
        ? "gap-2"
        : "items-center justify-center text-center", className);
    const iconSize = layout === "rail" || layout === "bottom" ? "h-5 w-5" : "h-4.5 w-4.5";
    const Indicator = layout === "bottom" || layout === "rail"
        ? (_jsx("span", { className: cn("absolute left-1/2 h-1 w-10 rounded-full transition-opacity duration-200 ease-out -translate-x-1/2", layout === "bottom" ? "-top-1" : "top-1.5", active
                ? "bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 82%,transparent)] opacity-100"
                : "opacity-0"), "aria-hidden": true }))
        : null;
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
    const elementProps = {
        id,
        ref: ref,
        className: contentClasses,
        "data-layout": layout,
        "aria-current": active ? "page" : undefined,
        "aria-disabled": disabled || undefined,
        onClick: handleClick,
        ...props,
    };
    if (Component === "a") {
        elementProps.href = href;
        if (target)
            elementProps.target = target;
        if (rel)
            elementProps.rel = rel;
    }
    else {
        elementProps.type = props.type ?? "button";
        elementProps.disabled = disabled;
    }
    return React.createElement(Component, elementProps, _jsxs(_Fragment, { children: [Indicator, icon ? (_jsx("span", { className: cn("flex shrink-0 items-center justify-center rounded-lg transition-colors duration-200", layout === "sidebar" || layout === "inline"
                    ? "h-7 w-7 bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(15,16,24,0.82)) 70%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 15%,transparent)]"
                    : "h-9 w-9 bg-transparent"), children: React.isValidElement(icon)
                    ? React.cloneElement(icon, {
                        className: cn(iconSize, icon.props?.className),
                    })
                    : icon })) : null, _jsxs("span", { className: cn("flex min-w-0 flex-1 flex-col", layout === "sidebar" || layout === "inline"
                    ? "items-start text-left"
                    : "items-center text-center"), children: [_jsx("span", { className: "truncate", children: label }), description ? (_jsx("span", { className: "mt-0.5 text-xs font-normal text-[color-mix(in_srgb,var(--hive-text-tertiary,#8E90A2) 85%,transparent)]", children: description })) : null] }), badgeValue ? (_jsx("span", { className: cn("ml-auto shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold", active
                    ? "border-transparent bg-[color-mix(in_srgb,var(--hive-background-primary,#050507) 12%,transparent)] text-[var(--hive-text-primary,#F9FAFB)]"
                    : "border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39) 68%,transparent)] text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 85%,transparent)]"), children: badgeValue })) : null] }));
});
NavigationItem.displayName = "NavigationItem";
export function SidebarNav({ sections, activeId, onSelect, header, footer, className, ...props }) {
    return (_jsxs("nav", { className: cn("flex h-full flex-col gap-4 rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39) 75%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(13,14,20,0.86)) 82%,transparent)] px-3 py-4 backdrop-blur-xl", className), "aria-label": "Sidebar navigation", ...props, children: [header ? _jsx("div", { className: "px-1", children: header }) : null, _jsx("div", { className: "flex-1 space-y-5 overflow-y-auto pr-1", children: sections.map((section) => (_jsxs("div", { className: "space-y-2", children: [section.label ? (_jsx("div", { className: "px-1 text-xs font-semibold uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--hive-text-tertiary,#8E90A2) 80%,transparent)]", children: section.label })) : null, _jsx("div", { className: "flex flex-col gap-1.5", children: section.items.map((item) => {
                                const resolvedActive = item.active ?? item.id === activeId;
                                return (_jsx(NavigationItem, { id: item.id, icon: item.icon, label: item.label, description: item.description, badge: item.badge, active: resolvedActive, disabled: item.disabled, layout: "sidebar", href: item.href, target: item.target, rel: item.rel, onSelect: (event) => onSelect?.(item, event) }, item.id));
                            }) })] }, section.id))) }), footer ? _jsx("div", { className: "mt-2 border-t border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39) 65%,transparent)] pt-3 px-1", children: footer }) : null] }));
}
export function NavigationRail({ items, activeId, onSelect, footerItems, label = "Main navigation", className, ...props }) {
    return (_jsxs("nav", { className: cn("flex h-full w-[76px] flex-col items-center justify-between rounded-3xl border border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39) 72%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,13,19,0.9)) 85%,transparent)] px-2 py-4 backdrop-blur-xl", className), "aria-label": label, ...props, children: [_jsx("div", { className: "flex flex-col items-center gap-2", children: items.map((item) => (_jsx(NavigationItem, { id: item.id, icon: item.icon, label: item.label, badge: item.badge, active: item.active ?? item.id === activeId, disabled: item.disabled, layout: "rail", href: item.href, target: item.target, rel: item.rel, onSelect: (event) => onSelect?.(item, event), "aria-label": item.label }, item.id))) }), footerItems?.length ? (_jsx("div", { className: "flex flex-col items-center gap-2 pt-4 border-t border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39) 65%,transparent)] w-full", children: footerItems.map((item) => (_jsx(NavigationItem, { id: item.id, icon: item.icon, label: item.label, badge: item.badge, active: item.active ?? item.id === activeId, disabled: item.disabled, layout: "rail", href: item.href, target: item.target, rel: item.rel, onSelect: (event) => onSelect?.(item, event), "aria-label": item.label }, item.id))) })) : null] }));
}
export function BottomNav({ items, activeId, onSelect, label = "Primary navigation", className, ...props }) {
    return (_jsx("nav", { className: cn("flex w-full items-center gap-1 rounded-3xl border border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,13,19,0.92)) 88%,transparent)] px-2 py-2 backdrop-blur-xl", className), "aria-label": label, ...props, children: items.map((item) => (_jsx(NavigationItem, { id: item.id, icon: item.icon, label: item.label, badge: item.badge, active: item.active ?? item.id === activeId, disabled: item.disabled, layout: "bottom", href: item.href, target: item.target, rel: item.rel, onSelect: (event) => onSelect?.(item, event) }, item.id))) }));
}
export function TopBar({ leading, centered, trailing, border = "subtle", sticky = false, className, children, ...props }) {
    return (_jsxs("header", { className: cn("flex w-full items-center justify-between gap-4 rounded-3xl bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,13,19,0.88)) 88%,transparent)] px-5 py-3 backdrop-blur-xl", border === "subtle" &&
            "border border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39) 72%,transparent)] shadow-[0_24px_48px_rgba(8,9,16,0.25)]", sticky && "sticky top-4 z-50", className), ...props, children: [_jsx("div", { className: "flex min-w-0 items-center gap-3", children: leading }), _jsx("div", { className: "flex min-w-0 flex-1 items-center justify-center", children: centered }), _jsx("div", { className: "flex min-w-0 items-center justify-end gap-3", children: trailing ?? children })] }));
}
//# sourceMappingURL=navigation-primitives.js.map