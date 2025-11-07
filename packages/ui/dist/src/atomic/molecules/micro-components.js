"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { animate, useReducedMotion } from "framer-motion";
import { BadgeCheck, Check, Clock, HelpCircle, Info, Paperclip, UserPlus, Users, X, } from "lucide-react";
import { cn } from "../../lib/utils";
const chipBaseClasses = "inline-flex min-h-[30px] items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_72%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_55%,transparent)] px-2.5 py-1 text-xs font-medium leading-tight tracking-tight text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC)_92%,transparent)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus,#FACC15)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary,#070709)] motion-safe:transition-transform";
const interactiveClasses = "cursor-pointer hover:border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_48%,var(--hive-border-subtle,#2E2F39))] hover:bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_12%,var(--hive-background-overlay,#0C0D11))] focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus,#FACC15)]";
export const ChipBase = React.forwardRef(({ className, asChild = false, interactive = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (_jsx(Comp, { ref: ref, className: cn(chipBaseClasses, interactive && interactiveClasses, className), ...props }));
});
ChipBase.displayName = "ChipBase";
export function Dot({ className, pulse = false, ...props }) {
    return (_jsx("span", { "aria-hidden": true, className: cn("inline-block h-1.5 w-1.5 rounded-full bg-current", pulse && "motion-safe:animate-pulse", className), ...props }));
}
export function AnimatedNumber({ value }) {
    const shouldReduceMotion = useReducedMotion();
    const [display, setDisplay] = React.useState(value);
    const previous = React.useRef(value);
    React.useEffect(() => {
        if (shouldReduceMotion) {
            setDisplay(value);
            previous.current = value;
            return;
        }
        const controls = animate(previous.current, value, {
            duration: 0.35,
            ease: "easeOut",
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        previous.current = value;
        return () => controls.stop();
    }, [value, shouldReduceMotion]);
    return _jsx("span", { className: "tabular-nums", children: display });
}
export function ExplainabilityChip({ label = "Why?", onClick }) {
    if (onClick) {
        return (_jsx(ChipBase, { asChild: true, interactive: true, children: _jsxs("button", { type: "button", onClick: onClick, className: "inline-flex items-center gap-1.5 text-left text-[var(--hive-text-primary)]", children: [_jsx(HelpCircle, { className: "h-3.5 w-3.5", "aria-hidden": true }), _jsx("span", { children: label })] }) }));
    }
    return (_jsxs(ChipBase, { className: "text-[var(--hive-text-primary)]", children: [_jsx(HelpCircle, { className: "h-3.5 w-3.5", "aria-hidden": true }), _jsx("span", { children: label })] }));
}
const reasonToneClass = {
    neutral: "border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_72%,transparent)] text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC)_88%,transparent)]",
    pro: "border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_45%,var(--hive-border-subtle,#2E2F39))] text-[var(--hive-text-primary)]",
    con: "border-[color-mix(in_srgb,var(--hive-status-error,#F87171)_45%,var(--hive-border-subtle,#2E2F39))] text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC)_82%,transparent)]",
};
export function ReasonChip({ text, tone = "neutral" }) {
    return _jsx(ChipBase, { className: reasonToneClass[tone], children: text });
}
export function ReasonBadgeStack({ reasons = [], max = 4 }) {
    const items = reasons.slice(0, max);
    const extra = reasons.length - items.length;
    return (_jsxs("div", { className: "flex items-center gap-1", children: [items.map((reason) => (_jsx(ReasonChip, { text: reason }, reason))), extra > 0 && (_jsxs(ChipBase, { "aria-label": `Plus ${extra} more`, children: ["+", extra] }))] }));
}
export function TimePill({ label }) {
    return (_jsxs(ChipBase, { className: "text-[var(--hive-text-primary)]", children: [_jsx(Clock, { className: "h-3.5 w-3.5", "aria-hidden": true }), _jsx("span", { children: label })] }));
}
export function VerificationBadge({ leader = false, className }) {
    return (_jsx(BadgeCheck, { className: cn("h-4 w-4 align-[-2px]", leader ? "text-[var(--hive-brand-primary,#FACC15)]" : "text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC)_75%,transparent)]", className), "aria-label": leader ? "Leader verified" : "Verified" }));
}
export function RoleBadge({ role }) {
    if (!role)
        return null;
    return _jsx(ChipBase, { children: role });
}
const statusToneClass = {
    neutral: {
        chip: "text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC)_88%,transparent)]",
        dot: "text-[color-mix(in_srgb,var(--hive-border-default,#373945)_85%,transparent)]",
    },
    success: {
        chip: "text-[var(--hive-status-success,#34D399)]",
        dot: "text-[var(--hive-status-success,#34D399)]",
    },
    warning: {
        chip: "text-[var(--hive-status-warning,#FBBF24)]",
        dot: "text-[var(--hive-status-warning,#FBBF24)]",
    },
    danger: {
        chip: "text-[var(--hive-status-error,#EF4444)]",
        dot: "text-[var(--hive-status-error,#EF4444)]",
    },
    info: {
        chip: "text-[var(--hive-brand-primary,#FACC15)]",
        dot: "text-[var(--hive-brand-primary,#FACC15)]",
    },
};
export function StatusChip({ status = "neutral", label, }) {
    const tone = statusToneClass[status];
    return (_jsxs(ChipBase, { className: tone.chip, children: [_jsx(Dot, { className: cn("mr-0.5", tone.dot) }), _jsx("span", { children: label })] }));
}
export function RSVPChip({ going = false, onToggle }) {
    return (_jsx(ChipBase, { asChild: true, interactive: true, className: cn(going
            ? "border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_65%,var(--hive-border-subtle,#2E2F39))] text-[var(--hive-text-primary)]"
            : "text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC)_90%,transparent)]"), children: _jsxs("button", { type: "button", onClick: onToggle, "aria-pressed": going, className: "inline-flex items-center gap-1.5 text-left", children: [going ? _jsx(Check, { className: "h-3.5 w-3.5", "aria-hidden": true }) : _jsx(UserPlus, { className: "h-3.5 w-3.5", "aria-hidden": true }), _jsx("span", { children: going ? "Going" : "RSVP" })] }) }));
}
export function CapacityBar({ value = 0, max = 0 }) {
    const pct = max > 0 ? Math.min(100, Math.round(((value ?? 0) / max) * 100)) : 0;
    return (_jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_38%,transparent)]", role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100, children: _jsx("div", { className: "h-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_75%,transparent)] transition-[width] duration-200 ease-out", style: { width: `${pct}%` } }) }));
}
export function NowIndicator({ label = "Now" }) {
    return (_jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_82%,var(--hive-text-secondary,#C0C2CC))]", children: [_jsx(Dot, { className: "text-[var(--hive-brand-primary,#FACC15)] motion-safe:animate-pulse" }), _jsx("span", { children: label })] }));
}
export function CounterChip({ icon: Icon = Info, value = 0, label, }) {
    return (_jsxs(ChipBase, { className: "text-[var(--hive-text-primary)]", children: [_jsx(Icon, { className: "h-3.5 w-3.5", "aria-hidden": true }), _jsx(AnimatedNumber, { value: value }), label ? _jsx("span", { children: label }) : null] }));
}
export function InlineProgress({ value = 0 }) {
    const clamped = Math.max(0, Math.min(100, value ?? 0));
    return (_jsx("div", { className: "h-1 w-full overflow-hidden rounded bg-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_35%,transparent)]", children: _jsx("div", { className: "h-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_75%,transparent)] transition-[width] duration-200 ease-out", style: { width: `${clamped}%` } }) }));
}
export function CharacterCounter({ value = 0, max = 500 }) {
    const total = max ?? 500;
    const current = Math.max(0, value ?? 0);
    const pct = Math.min(1, total > 0 ? current / total : 0);
    const near = pct > 0.85 && pct < 1;
    const over = pct >= 1;
    const meterClass = over
        ? "bg-[var(--hive-status-error,#EF4444)]"
        : near
            ? "bg-[var(--hive-status-warning,#FBBF24)]"
            : "bg-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC)_68%,transparent)]";
    const textClass = over
        ? "text-[var(--hive-status-error,#EF4444)]"
        : near
            ? "text-[var(--hive-status-warning,#FBBF24)]"
            : "text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC)_85%,transparent)]";
    return (_jsxs("div", { className: "flex items-center justify-end gap-2 text-xs", children: [_jsxs("span", { className: cn("tabular-nums", textClass), children: [current, "/", total] }), _jsx("div", { className: "h-1 w-16 overflow-hidden rounded bg-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_45%,transparent)]", children: _jsx("div", { className: cn("h-full transition-[width] duration-150 ease-out", meterClass), style: { width: `${Math.min(100, Math.round(pct * 100))}%` } }) })] }));
}
export function AttachmentChip({ name, size, onRemove, }) {
    return (_jsxs(ChipBase, { className: "max-w-full text-[var(--hive-text-primary)]", children: [_jsx(Paperclip, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": true }), _jsx("span", { className: "max-w-[12rem] truncate", children: name }), size ? _jsxs("span", { className: "text-[color-mix(in_srgb,var(--hive-text-tertiary,#7F8293)_85%,transparent)]", children: ["\u00B7 ", size] }) : null, onRemove ? (_jsx("button", { type: "button", onClick: onRemove, className: "ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC)_85%,transparent)] transition-colors hover:text-[var(--hive-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus,#FACC15)]", "aria-label": "Remove attachment", children: _jsx(X, { className: "h-3.5 w-3.5", "aria-hidden": true }) })) : null] }));
}
export function RSVPStatusSummary({ going = 0, capacity = 0, label = "going", }) {
    return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(CounterChip, { icon: Users, value: going, label: label }), _jsx(CapacityBar, { value: going, max: capacity })] }));
}
//# sourceMappingURL=micro-components.js.map