"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, Sparkles } from "lucide-react";
import { cn } from "../../../lib/utils.js";
import { Card } from "../../00-Global/atoms/card.js";
import { Button } from "../../00-Global/atoms/button.js";
const DEFAULT_STEPS = [
    { id: "avatar", title: "Add a profile photo" },
    { id: "bio", title: "Share a short bio" },
    { id: "academic", title: "Confirm academic details" },
    { id: "housing", title: "Add housing or residency" },
    { id: "interests", title: "Select your interests" },
    { id: "spaces", title: "Join 3+ spaces" },
];
export function ProfileCompletionCard({ completionPercentage, completedSteps = [], steps = DEFAULT_STEPS, onStepClick, className, }) {
    const remaining = steps.filter((step) => !completedSteps.includes(step.id));
    return (_jsxs(Card, { className: cn("border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 58%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 92%,transparent)] p-6", className), children: [_jsxs("div", { className: "flex items-center gap-3 text-[var(--hive-text-primary,#f7f7ff)]", children: [_jsx("div", { className: "rounded-xl bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 12%,transparent)] p-2", children: _jsx(Sparkles, { className: "h-4 w-4 text-[var(--hive-brand-primary,#facc15)]", "aria-hidden": true }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium", children: "Boost your profile" }), _jsxs("p", { className: "text-xs uppercase tracking-[0.28em] text-[var(--hive-text-muted,#8d90a2)]", children: [Math.round(completionPercentage), "% complete"] })] })] }), _jsx("div", { className: "mt-4 h-2 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 78%,transparent)]", children: _jsx("div", { className: "h-full rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 92%,transparent)] transition-[width] duration-500", style: { width: `${Math.min(100, Math.max(0, completionPercentage))}%` } }) }), _jsx("ul", { className: "mt-4 space-y-2", children: remaining.slice(0, 4).map((step) => (_jsx("li", { children: _jsxs(Button, { variant: "ghost", className: "w-full justify-between rounded-2xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 65%,transparent)] px-4 py-3 text-left text-sm text-[var(--hive-text-secondary,#c0c2cc)] hover:bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 80%,transparent)]", onClick: () => onStepClick?.(step.id), children: [_jsx("span", { children: step.title }), _jsx(CheckCircle, { className: "h-4 w-4 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 90%,transparent)]", "aria-hidden": true })] }) }, step.id))) }), remaining.length === 0 ? (_jsx("div", { className: "mt-4 rounded-2xl bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 12%,transparent)] p-3 text-center text-sm text-[var(--hive-brand-primary,#facc15)]", children: "Profile complete \u2014 you\u2019re ready to shine on campus!" })) : null] }));
}
//# sourceMappingURL=profile-completion-card.js.map