import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ArrowDownRight, ArrowUpRight, Clock, Dot, Minus, ShieldAlert, } from "lucide-react";
import { cn } from "../../../lib/utils.js";
import { Card, CardContent, CardHeader, CardTitle, } from "../../00-Global/atoms/card.js";
import { Button } from "../../00-Global/atoms/button.js";
export function AdminMetricCard({ title, value, format = typeof value === "number" ? "number" : "string", currency = "USD", delta, icon: Icon, description, footer, subtle = false, }) {
    const formattedValue = formatMetricValue(value, format, currency);
    const deltaTone = delta?.tone ?? (delta && delta.value < 0
        ? "negative"
        : delta && delta.value > 0
            ? "positive"
            : "neutral");
    const DeltaIcon = deltaTone === "positive"
        ? ArrowUpRight
        : deltaTone === "negative"
            ? ArrowDownRight
            : Minus;
    return (_jsxs(Card, { className: cn("relative overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur", subtle && "border-white/5 bg-white/[0.02]"), children: [_jsxs(CardHeader, { className: "flex flex-row items-start justify-between space-y-0 pb-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.3em] text-white/40", children: title }), _jsxs("div", { className: "flex items-baseline gap-2", children: [_jsx("span", { className: "text-3xl font-semibold tracking-tight text-white", children: formattedValue }), delta && (_jsxs("span", { className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", deltaTone === "positive" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-300", deltaTone === "negative" && "border-red-500/30 bg-red-500/10 text-red-300", deltaTone === "neutral" && "border-white/10 bg-white/5 text-white/60"), "aria-label": delta.label, children: [_jsx(DeltaIcon, { className: "h-3 w-3", "aria-hidden": "true" }), _jsxs("span", { children: [Math.abs(delta.value), "%"] })] }))] })] }), Icon && (_jsx("span", { className: "rounded-full border border-white/10 bg-white/5 p-2 text-white/70", children: _jsx(Icon, { className: "h-5 w-5", "aria-hidden": "true" }) }))] }), (description || footer) && (_jsxs(CardContent, { className: "space-y-3 pt-0 text-sm text-white/60", children: [description && _jsx("p", { children: description }), footer && _jsx("div", { className: "pt-2", children: footer })] }))] }));
}
export function StatusPill({ label, tone = "neutral", icon: Icon, className, ...rest }) {
    const toneClass = {
        neutral: "border-white/10 bg-white/5 text-white/70",
        info: "border-sky-500/30 bg-sky-500/10 text-sky-200",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
        warning: "border-amber-500/30 bg-amber-500/10 text-amber-200",
        danger: "border-red-500/30 bg-red-500/10 text-red-200",
    };
    return (_jsxs("span", { className: cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase", toneClass[tone], className), ...rest, children: [Icon && _jsx(Icon, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), _jsx("span", { children: label })] }));
}
export function AuditLogList({ events, emptyState, title = "Recent Activity", className, }) {
    const hasEvents = events.length > 0;
    return (_jsxs(Card, { className: cn("border-white/10 bg-white/[0.03]", className), children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-base font-semibold text-white", children: title }) }), _jsx(CardContent, { className: "space-y-5 text-sm", children: hasEvents ? (_jsx("ul", { className: "space-y-4", children: events.map((event) => {
                        const VariantIcon = event.icon ||
                            (event.variant === "critical"
                                ? ShieldAlert
                                : event.variant === "warning"
                                    ? Clock
                                    : undefined);
                        return (_jsx("li", { className: "space-y-1.5", children: _jsx("div", { className: "flex items-start justify-between gap-3", children: _jsxs("div", { className: "flex flex-1 items-start gap-3", children: [VariantIcon && (_jsx("span", { className: "mt-0.5", children: _jsx(VariantIcon, { className: "h-4 w-4 text-white/60", "aria-hidden": "true" }) })), _jsxs("div", { children: [_jsx("p", { className: "text-[var(--hive-text-primary)] font-medium", children: event.summary }), event.description && (_jsx("p", { className: "text-white/60", children: event.description })), _jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-white/40", children: [event.actor && (_jsxs(_Fragment, { children: [_jsx("span", { children: event.actor }), _jsx(Dot, { className: "h-4 w-4", "aria-hidden": "true" })] })), _jsx("time", { dateTime: toISOString(event.timestamp), children: formatRelativeTime(event.timestamp) }), event.meta?.map((chip) => (_jsx("span", { className: "rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50", children: chip }, chip)))] })] })] }) }) }, event.id));
                    }) })) : (_jsx("div", { className: "rounded-lg border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-white/50", children: emptyState ?? "No activity logged yet." })) })] }));
}
export function ModerationQueue({ items, onAction, emptyState, className, }) {
    const hasItems = items.length > 0;
    return (_jsxs(Card, { className: cn("border-white/10 bg-white/[0.03]", className), children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-base font-semibold text-white", children: "Moderation Queue" }) }), _jsx(CardContent, { className: "space-y-4 text-sm", children: hasItems ? (_jsx("ul", { className: "space-y-3", children: items.map((item) => (_jsx("li", { className: "rounded-lg border border-white/10 bg-black/30 p-4", children: _jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-start md:justify-between", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-white", children: item.title }), _jsx(StatusPill, { label: formatStatusLabel(item.status), tone: toneForStatus(item.status) }), item.severity && (_jsx(StatusPill, { label: `${item.severity} priority`, tone: toneForSeverity(item.severity) }))] }), item.summary && (_jsx("p", { className: "text-white/60", children: item.summary })), _jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-white/40", children: [_jsxs("span", { children: ["Submitted by ", item.submittedBy] }), _jsx(Dot, { className: "h-4 w-4", "aria-hidden": "true" }), _jsx("time", { dateTime: toISOString(item.submittedAt), children: formatRelativeTime(item.submittedAt) }), item.tags?.map((tag) => (_jsx("span", { className: "rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50", children: tag }, tag)))] })] }), item.ctaLabel && (_jsx(Button, { size: "sm", variant: "secondary", className: "border-white/10 bg-white/5 text-white/80 hover:bg-white/10", onClick: () => onAction?.(item), children: item.ctaLabel }))] }) }, item.id))) })) : (_jsx("div", { className: "rounded-lg border border-dashed border-white/10 bg-white/5 px-4 py-10 text-center text-white/50", children: emptyState ?? "Your moderation queue is clear." })) })] }));
}
function formatMetricValue(value, format, currency) {
    if (format === "string" || typeof value === "string") {
        return value;
    }
    const safeValue = Number(value);
    if (!Number.isFinite(safeValue)) {
        return value;
    }
    const formatter = format === "currency"
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        })
        : new Intl.NumberFormat("en-US", {
            style: format === "percent" ? "percent" : "decimal",
            maximumFractionDigits: format === "percent" ? 1 : 0,
        });
    return formatter.format(format === "percent" ? safeValue / 100 : safeValue);
}
function formatStatusLabel(status) {
    return status
        .replace(/_/g, " ")
        .replace(/\b\w/g, (match) => match.toUpperCase());
}
function toneForStatus(status) {
    switch (status) {
        case "pending":
            return "warning";
        case "under_review":
            return "info";
        case "escalated":
            return "danger";
        case "resolved":
            return "success";
        case "dismissed":
        default:
            return "neutral";
    }
}
function toneForSeverity(severity) {
    if (!severity)
        return "neutral";
    switch (severity) {
        case "high":
            return "danger";
        case "medium":
            return "warning";
        case "low":
        default:
            return "info";
    }
}
function formatRelativeTime(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "unknown";
    }
    const diffMs = Date.now() - date.getTime();
    const minutes = Math.round(diffMs / (1000 * 60));
    if (minutes < 1)
        return "just now";
    if (minutes < 60)
        return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24)
        return `${hours}h ago`;
    const days = Math.round(hours / 24);
    if (days < 7)
        return `${days}d ago`;
    const weeks = Math.round(days / 7);
    if (weeks < 5)
        return `${weeks}w ago`;
    const months = Math.round(days / 30);
    if (months < 12)
        return `${months}mo ago`;
    const years = Math.round(days / 365);
    return `${years}y ago`;
}
function toISOString(value) {
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
//# sourceMappingURL=admin-dashboard-primitives.js.map