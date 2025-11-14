import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../../lib/utils.js";
import { Badge } from "../../00-Global/atoms/badge.js";
export function AdminShell({ title, subtitle, campusName, navItems, actions, children, banner, footer, className, navFooter, onSelectNavItem, }) {
    return (_jsxs("div", { className: cn("flex min-h-screen w-full bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]", className), children: [_jsx(AdminNavRail, { campusName: campusName, items: navItems, footer: navFooter, onSelect: onSelectNavItem }), _jsxs("div", { className: "relative flex min-h-screen flex-1 flex-col bg-[linear-gradient(135deg,rgba(10,10,10,0.92)_0%,rgba(20,20,25,0.88)_50%,rgba(10,10,10,0.92)_100%)]", children: [_jsx(AdminTopBar, { title: title, subtitle: subtitle, campusName: campusName, actions: actions }), _jsx(AdminMobileNav, { items: navItems, onSelect: onSelectNavItem }), banner && (_jsx("div", { className: "border-b border-white/10 bg-white/[0.03] px-4 py-3 md:px-8", children: banner })), _jsx("main", { className: "flex-1 px-4 pb-16 pt-8 md:px-8", children: children }), footer && (_jsx("footer", { className: "border-t border-white/10 bg-black/40 px-4 py-6 md:px-8", children: footer }))] })] }));
}
export function AdminTopBar({ title, subtitle, campusName, actions, }) {
    return (_jsx("header", { className: "border-b border-white/10 bg-black/60 px-4 py-4 backdrop-blur-lg md:px-8", children: _jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h1", { className: "text-xl font-semibold tracking-tight text-white md:text-2xl", children: title }), _jsx(Badge, { variant: "outline", className: "border-white/20 bg-white/5 text-[10px] uppercase tracking-wider text-white/70", children: campusName })] }), subtitle && (_jsx("p", { className: "mt-1 text-sm text-white/60 md:text-base", children: subtitle }))] }), actions && (_jsx("div", { className: "flex flex-wrap items-center gap-2", children: actions }))] }) }));
}
export function AdminNavRail({ campusName, items, footer, onSelect, }) {
    if (items.length === 0) {
        return null;
    }
    return (_jsx("aside", { className: "hidden w-64 flex-none border-r border-white/10 bg-black/75 px-3 py-6 backdrop-blur lg:flex", children: _jsxs("div", { className: "flex h-full w-full flex-col", children: [_jsxs("div", { className: "px-2", children: [_jsx("div", { className: "text-xs font-semibold uppercase tracking-widest text-white/40", children: "Hive Admin" }), _jsx("div", { className: "text-sm text-white/60", children: campusName })] }), _jsx("nav", { className: "mt-6 flex-1 space-y-1 text-sm", "aria-label": "Admin primary navigation", children: items.map((item) => {
                        const Icon = item.icon;
                        const content = (_jsxs("div", { className: cn("flex items-center gap-3 rounded-md px-3 py-2 transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[var(--hive-brand-primary)]/70", item.active
                                ? "bg-[var(--hive-brand-primary)]/15 text-white"
                                : "text-white/60 hover:bg-white/5 hover:text-white"), children: [Icon && _jsx(Icon, { className: "h-4 w-4", "aria-hidden": "true" }), _jsxs("div", { className: "flex flex-1 flex-col", children: [_jsx("span", { className: "font-medium", children: item.label }), item.description && (_jsx("span", { className: "text-xs text-white/40", children: item.description }))] }), typeof item.badge === "number" ? (_jsx("span", { className: "ml-auto inline-flex min-w-[1.6rem] items-center justify-center rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-white/80", children: item.badge })) : (item.badge)] }));
                        if (item.href) {
                            return (_jsx("a", { href: item.href, className: "block", onClick: () => onSelect?.(item), children: content }, item.id));
                        }
                        return (_jsx("button", { type: "button", className: "block w-full border-0 bg-transparent p-0 text-left", onClick: () => onSelect?.(item), children: content }, item.id));
                    }) }), footer && (_jsx("div", { className: "mt-6 border-t border-white/10 pt-4 text-xs text-white/50", children: footer }))] }) }));
}
function AdminMobileNav({ items, onSelect }) {
    if (items.length === 0) {
        return null;
    }
    return (_jsx("div", { className: "border-b border-white/10 bg-black/40 px-4 py-2 md:hidden", children: _jsx("nav", { className: "flex gap-2 overflow-x-auto text-sm", "aria-label": "Mobile admin navigation", children: items.map((item) => (_jsxs("button", { type: "button", className: cn("flex items-center gap-2 rounded-full px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[var(--hive-brand-primary)]/70", item.active
                    ? "bg-[var(--hive-brand-primary)]/20 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"), onClick: () => onSelect?.(item), children: [item.icon && _jsx(item.icon, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), _jsx("span", { className: "whitespace-nowrap", children: item.label }), typeof item.badge === "number" && item.badge > 0 && (_jsx("span", { className: "inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white/20 px-2 text-[10px] font-semibold text-white/90", children: item.badge }))] }, item.id))) }) }));
}
//# sourceMappingURL=admin-shell.js.map