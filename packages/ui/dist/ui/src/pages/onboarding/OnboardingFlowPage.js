import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from "../../atomic/00-Global/atoms/button.js";
import { Input } from "../../atomic/00-Global/atoms/input.js";
import { Textarea } from "../../atomic/00-Global/atoms/textarea.js";
import { Checkbox } from "../../atomic/00-Global/atoms/checkbox.js";
import { Label } from "../../atomic/00-Global/atoms/label.js";
import { Surface } from "../../layout/index.js";
import { Badge } from "../../atomic/00-Global/atoms/badge.js";
import { cn } from "@/lib/utils";
const DEFAULT_STEPS = [
    {
        id: "identity",
        title: "Identity",
        description: "Name, campus badge, pronouns",
        status: "current",
    },
    {
        id: "interests",
        title: "Interests",
        description: "Spaces, rituals, and squads",
        status: "upcoming",
    },
    {
        id: "tools",
        title: "Tools",
        description: "Pick HiveLab experiences",
        status: "upcoming",
    },
];
const DEFAULT_INTERESTS = [
    "Robotics",
    "Design",
    "Campus Impact",
    "Arts",
    "Sustainability",
    "Hackathons",
    "Wellness",
    "Campus Media",
    "HiveLab Automation",
    "E-Sports",
];
export function OnboardingFlowPage({ campusName = "UB", steps = DEFAULT_STEPS, interests = DEFAULT_INTERESTS, selectedInterests = ["Robotics", "Hackathons", "HiveLab Automation"], onSelectInterest, }) {
    return (_jsx("div", { className: "min-h-screen bg-[var(--hive-background-page,#06070d)] text-[var(--hive-text-primary,#f7f7ff)]", children: _jsxs("div", { className: "mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-24 pt-14", children: [_jsxs("header", { className: "space-y-4 text-center", children: [_jsxs(Badge, { tone: "contrast", variant: "pill", className: "uppercase tracking-[0.32em]", children: ["Welcome to ", campusName] }), _jsx("h1", { className: "text-3xl font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Launch your campus presence" }), _jsx("p", { className: "mx-auto max-w-xl text-sm text-[var(--hive-text-secondary,#c5c7d8)]", children: "In under two minutes, we\u2019ll personalize spaces, rituals, and HiveLab tools so you\u2019re publishing with student energy tonight." })] }), _jsxs("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]", children: [_jsxs(Surface, { className: "space-y-6 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Set your campus badge" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "full-name", className: "text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8c92a7)]", children: "Full name" }), _jsx(Input, { id: "full-name", placeholder: "Laney Fraass", defaultValue: "Laney Fraass", className: "mt-2" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "handle", className: "text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8c92a7)]", children: "Handle" }), _jsx(Input, { id: "handle", placeholder: "laney", defaultValue: "laney", className: "mt-2", leftIcon: _jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.26em] text-[var(--hive-text-muted,#8c92a7)]", children: "hive.so/" }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "campus-role", className: "text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8c92a7)]", children: "Campus focus" }), _jsx(Textarea, { id: "campus-role", rows: 3, className: "mt-2 resize-none", defaultValue: "Student Lead \u00B7 UB Robotics Collective & HiveLab Fellow" })] }), _jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-4 py-3", children: [_jsx(Checkbox, { id: "student-run", defaultChecked: true }), _jsx(Label, { htmlFor: "student-run", className: "text-sm text-[var(--hive-text-secondary,#c5c7d8)]", children: "I\u2019m representing a student-run space or ritual." })] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Button, { variant: "ghost", children: "Exit" }), _jsx(Button, { variant: "primary", className: "px-8", children: "Continue" })] })] }), _jsxs(Surface, { className: "space-y-6 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Campus pathways" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary,#c5c7d8)]", children: "Pick up to three for personalized rituals, spaces, and HiveLab templates." }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: interests.map((interest) => {
                                        const active = selectedInterests.includes(interest);
                                        return (_jsx("button", { type: "button", onClick: () => onSelectInterest?.(interest), className: cn("rounded-2xl border px-4 py-3 text-left text-sm transition-colors duration-150", active
                                                ? "border-[var(--hive-brand-primary,#ffd166)] bg-[rgba(255,214,102,0.12)] text-[var(--hive-text-primary,#f5f5ff)] shadow-[0_12px_28px_rgba(255,214,102,0.18)]"
                                                : "border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] text-[var(--hive-text-secondary,#c5c7d8)] hover:border-[var(--hive-border-default,#2a2d3c)]"), children: interest }, interest));
                                    }) }), _jsx("div", { className: "rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-4 py-3", children: _jsx("p", { className: "text-xs text-[var(--hive-text-secondary,#c5c7d8)]", children: "Customize later in your profile. You\u2019ll get a curated feed and onboarding prompts in Feed, Spaces, and HiveLab." }) })] })] }), _jsxs(Surface, { className: "grid gap-4 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Progress" }), _jsx("ol", { className: "space-y-2", children: steps.map((step, index) => (_jsxs("li", { className: cn("flex items-center justify-between rounded-2xl border px-4 py-3 text-sm", step.status === "complete" && "border-[rgba(34,197,94,0.4)] bg-[rgba(34,197,94,0.12)] text-[var(--hive-status-success-text,#bff3cb)]", step.status === "current" && "border-[var(--hive-brand-primary,#ffd166)] bg-[rgba(255,214,102,0.12)] text-[var(--hive-text-primary,#fdfdfd)]", step.status === "upcoming" && "border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] text-[var(--hive-text-muted,#8c92a7)]"), children: [_jsxs("div", { children: [_jsxs("p", { className: "font-semibold", children: [index + 1, ". ", step.title] }), _jsx("p", { className: "text-xs", children: step.description })] }), _jsx("span", { className: "text-xs uppercase tracking-[0.26em]", children: step.status })] }, step.id))) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "What\u2019s next" }), _jsxs("div", { className: "space-y-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-5 py-4 text-sm text-[var(--hive-text-secondary,#c5c7d8)]", children: [_jsx("p", { children: "Unlock ritual previews in Feed once you confirm interests." }), _jsx("p", { children: "Spaces suggested tonight: Robotics Collective, Hive Founders, Sustainability Studio." }), _jsx("p", { children: "HiveLab templates: Campus service board, live ritual RSVP, campus quiet hours guard." })] }), _jsx(Button, { variant: "secondary", className: "w-full", children: "Save & exit" })] })] })] }) }));
}
//# sourceMappingURL=OnboardingFlowPage.js.map