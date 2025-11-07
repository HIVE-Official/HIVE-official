import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
import { Progress } from "../atoms/progress.js";
export function HeaderBar({ title, description, leading, trailing, divider = true, className, ...props }) {
    return (_jsxs("header", { className: cn("rounded-3xl bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,13,19,0.88))_88%,transparent)]", "backdrop-blur-xl border border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_72%,transparent)]", "px-5 py-4 md:px-6", className), ...props, children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("h1", { className: "truncate text-lg font-semibold text-[var(--hive-text-primary)]", children: title }), description ? (_jsx("p", { className: "mt-0.5 truncate text-sm text-[var(--hive-text-secondary)]", children: description })) : null] }), _jsx("div", { className: "flex items-center gap-2", children: trailing })] }), divider && _jsx("div", { className: "mt-3 h-px w-full bg-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_68%,transparent)]" }), leading ? _jsx("div", { className: "mt-3", children: leading }) : null] }));
}
export function ProgressHeader({ progress = 0, ...props }) {
    return (_jsx(HeaderBar, { ...props, leading: _jsx(Progress, { value: Math.max(0, Math.min(100, progress)), size: "xs", "aria-label": "Progress" }) }));
}
export function ActionRow({ primaryAction, secondaryAction, sticky = true, className, ...props }) {
    return (_jsxs("div", { role: "region", "aria-label": "Actions", className: cn("flex items-center justify-end gap-3 rounded-2xl border border-[var(--hive-border-subtle)] bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,13,19,0.9))_88%,transparent)] px-4 py-3 backdrop-blur-xl", sticky && "sticky bottom-4", className), ...props, children: [secondaryAction, primaryAction] }));
}
export function FilterChipsBar({ items, activeIds = [], onToggle, className, ...props }) {
    return (_jsxs("div", { className: cn("relative", className), ...props, children: [_jsx("div", { className: "pointer-events-none absolute -left-1 top-0 h-full w-8 bg-gradient-to-r from-[var(--hive-background-primary)] to-transparent" }), _jsx("div", { className: "pointer-events-none absolute -right-1 top-0 h-full w-8 bg-gradient-to-l from-[var(--hive-background-primary)] to-transparent" }), _jsx("div", { className: "no-scrollbar flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-2 py-1", children: items.map((it) => {
                    const active = activeIds.includes(it.id);
                    return (_jsx("button", { type: "button", onClick: () => onToggle?.(it.id), className: cn("snap-start rounded-full border px-3 py-1.5 text-sm transition-colors", active
                            ? "border-[color-mix(in_srgb,var(--hive-brand-primary)#FACC15_50%,var(--hive-border-subtle))] bg-[color-mix(in_srgb,var(--hive-brand-primary)#FACC15_16%,transparent)] text-[var(--hive-text-primary)]"
                            : "border-[var(--hive-border-subtle)] text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[color-mix(in_srgb,var(--hive-background-tertiary)_40%,transparent)]"), "aria-pressed": active, children: it.label }, it.id));
                }) })] }));
}
//# sourceMappingURL=header-bar.js.map
