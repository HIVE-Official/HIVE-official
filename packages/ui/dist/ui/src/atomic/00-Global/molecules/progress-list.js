"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CheckCircle2, Circle, Dot, XCircle } from "lucide-react";
import { cn } from "../../lib/utils";
export const ProgressList = React.forwardRef(function ProgressList({ steps, compact = false, className, ...props }, ref) {
    return (_jsx("ul", { ref: ref, className: cn("relative space-y-3", className), ...props, children: steps.map((step, idx) => (_jsxs("li", { className: "relative pl-7", children: [idx < steps.length - 1 ? (_jsx("span", { "aria-hidden": true, className: "absolute left-3.5 top-6 block h-[calc(100%-1.5rem)] w-px bg-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_60%,transparent)]" })) : null, _jsx(StepIndicator, { state: step.state }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: cn("text-sm font-medium", step.state === "blocked"
                                ? "text-[var(--hive-status-error)]"
                                : step.state === "done"
                                    ? "text-[var(--hive-text-primary)]"
                                    : step.state === "active"
                                        ? "text-[var(--hive-text-primary)]"
                                        : "text-[var(--hive-text-secondary)]"), "aria-current": step.state === "active" ? "step" : undefined, children: step.label }), !compact && step.description ? (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: step.description })) : null] })] }, step.id))) }));
});
function StepIndicator({ state = "upcoming" }) {
    const base = "absolute left-0 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full border bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_35%,transparent)]";
    if (state === "done") {
        return (_jsx("span", { "aria-hidden": true, className: cn(base, "border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_45%,var(--hive-border-subtle,#2E2F39))] text-[var(--hive-brand-primary)]"), children: _jsx(CheckCircle2, { className: "h-4 w-4" }) }));
    }
    if (state === "active") {
        return (_jsx("span", { "aria-hidden": true, className: cn(base, "border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_45%,var(--hive-border-subtle,#2E2F39))] text-[var(--hive-brand-primary)]"), children: _jsx(Dot, { className: "h-5 w-5" }) }));
    }
    if (state === "blocked") {
        return (_jsx("span", { "aria-hidden": true, className: cn(base, "border-[color-mix(in_srgb,var(--hive-status-error,#EF4444)_45%,var(--hive-border-subtle,#2E2F39))] text-[var(--hive-status-error)]"), children: _jsx(XCircle, { className: "h-4 w-4" }) }));
    }
    return (_jsx("span", { "aria-hidden": true, className: cn(base, "border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_65%,transparent)] text-[var(--hive-text-secondary)]"), children: _jsx(Circle, { className: "h-4 w-4" }) }));
}
//# sourceMappingURL=progress-list.js.map