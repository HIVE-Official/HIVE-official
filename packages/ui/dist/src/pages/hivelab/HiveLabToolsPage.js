import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Badge } from "../../atomic/00-Global/atoms/badge";
import { Button } from "../../atomic/00-Global/atoms/button";
import { Surface } from "../../layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../atomic/00-Global/atoms/tabs";
import { cn } from "../../lib/utils";
const STATUS_TONE = {
    draft: "bg-[var(--hive-background-tertiary,#171827)] text-[var(--hive-text-secondary,#c5c7d8)]",
    live: "bg-[rgba(34,197,94,0.15)] text-[var(--hive-status-success-text,#bff3cb)]",
    paused: "bg-[rgba(244,114,182,0.15)] text-[var(--hive-status-warning-text,#fddbe8)]",
};
const DEFAULT_WORKFLOWS = [
    {
        id: "wf-campus-shuttle",
        name: "Campus shuttle board",
        description: "Live shuttle tracking with alerts for slow routes. Syncs to Spaces.",
        status: "live",
        updatedAt: "Updated 2h ago",
        owner: "Laney Fraass",
        metrics: [
            { label: "Active riders", value: "312" },
            { label: "Response time", value: "1.2s" },
        ],
        tags: ["Transit", "Realtime"],
    },
    {
        id: "wf-supply-drop",
        name: "Activity supply drop",
        description: "Automated checkout of tools across labs and makerspaces.",
        status: "draft",
        updatedAt: "Draft saved 35m ago",
        owner: "UB Founders",
        metrics: [
            { label: "Requests", value: "42" },
            { label: "Approvers", value: "5" },
        ],
        tags: ["Logistics"],
    },
    {
        id: "wf-event-feedback",
        name: "Event feedback ritual",
        description: "Collects live responses during rituals with positive nudges.",
        status: "paused",
        updatedAt: "Paused yesterday",
        owner: "Cultural Mosaic",
        metrics: [
            { label: "Sessions", value: "18" },
            { label: "Avg response", value: "2m" },
        ],
        tags: ["Rituals"],
    },
];
const DEFAULT_EXPERIMENTS = [
    {
        id: "exp-ritual-reminders",
        title: "Ritual reminder sequences",
        summary: "Tests cadence for multi-phase events across builder spaces.",
        author: "UB Robotics",
        campusSpace: "Robotics Collective",
        createdAt: "Today",
    },
    {
        id: "exp-civic-hud",
        title: "Civic service HUD",
        summary: "Aggregates campus service projects with campus-owned opt-in flows.",
        author: "Sustainability Studio",
        campusSpace: "Impact & Civic",
        createdAt: "2 days ago",
    },
];
export function HiveLabToolsPage({ campusName = "UB", workflows = DEFAULT_WORKFLOWS, experiments = DEFAULT_EXPERIMENTS, activeTab = "workflows", onTabChange, onLaunchClick, }) {
    return (_jsxs("div", { className: "min-h-screen bg-[var(--hive-background-page,#05060b)] text-[var(--hive-text-primary,#f7f7ff)]", children: [_jsx("div", { className: "border-b border-[var(--hive-border-subtle,#161827)] bg-[var(--hive-background-secondary,#0e1019)]/90 backdrop-blur", children: _jsxs("div", { className: "mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-xs uppercase tracking-[0.34em] text-[var(--hive-text-muted,#8d93a7)]", children: ["HiveLab \u00B7 ", campusName, " campus"] }), _jsx("h1", { className: "text-3xl font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Ship campus tools with student energy" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary,#c5c8d8)]", children: "Manage workflows, launch experiments, and link everything to campus spaces." })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { variant: "secondary", children: "Import flow" }), _jsx(Button, { variant: "primary", children: "Create workflow" })] })] }) }), _jsxs("main", { className: "mx-auto grid max-w-6xl gap-6 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]", children: [_jsx("section", { className: "space-y-6", children: _jsx(Surface, { className: "rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6", children: _jsxs(Tabs, { defaultValue: activeTab, onValueChange: onTabChange, children: [_jsxs(TabsList, { className: "bg-[var(--hive-background-tertiary,#171827)] text-[var(--hive-text-muted,#8d93a7)]", variant: "pills", children: [_jsx(TabsTrigger, { value: "workflows", children: "Workflows" }), _jsx(TabsTrigger, { value: "experiments", children: "Experiments" }), _jsx(TabsTrigger, { value: "library", children: "Library" })] }), _jsx(TabsContent, { value: "workflows", children: _jsx("div", { className: "mt-6 space-y-5", children: workflows.map((workflow) => (_jsxs("article", { className: "space-y-4 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#161827)] px-5 py-4", children: [_jsxs("header", { className: "flex flex-wrap items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: workflow.name }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary,#c5c7d8)]", children: workflow.description })] }), _jsx(Badge, { tone: "contrast", className: cn("border-none text-xs font-semibold uppercase tracking-[0.24em]", STATUS_TONE[workflow.status]), children: workflow.status })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-[var(--hive-text-muted,#8d93a7)]", children: [_jsx("span", { children: workflow.updatedAt }), _jsxs("span", { children: ["Owner \u00B7 ", workflow.owner] }), workflow.tags?.map((tag) => (_jsxs(Badge, { tone: "muted", variant: "pill", children: ["#", tag] }, tag)))] }), _jsx("div", { className: "grid gap-3 md:grid-cols-2", children: workflow.metrics.map((metric) => (_jsxs("div", { className: "rounded-2xl bg-[rgba(255,255,255,0.03)] px-4 py-3", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.28em] text-[var(--hive-text-muted,#8d93a7)]", children: metric.label }), _jsx("p", { className: "mt-2 text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: metric.value })] }, metric.label))) }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { size: "sm", variant: "secondary", children: "Edit flow" }), _jsx(Button, { size: "sm", variant: "ghost", children: "View analytics" })] })] }, workflow.id))) }) }), _jsx(TabsContent, { value: "experiments", children: _jsx("div", { className: "mt-6 space-y-4", children: experiments.map((experiment) => (_jsxs("article", { className: "space-y-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#161827)] px-5 py-4", children: [_jsxs("header", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: experiment.title }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary,#c5c7d8)]", children: experiment.summary })] }), _jsx(Badge, { tone: "muted", variant: "pill", children: experiment.campusSpace })] }), _jsxs("div", { className: "flex flex-wrap gap-4 text-xs text-[var(--hive-text-muted,#8d93a7)]", children: [_jsxs("span", { children: ["Author \u00B7 ", experiment.author] }), _jsxs("span", { children: ["Created \u00B7 ", experiment.createdAt] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "secondary", children: "Review experiment" }), _jsx(Button, { size: "sm", variant: "ghost", children: "Duplicate" })] })] }, experiment.id))) }) }), _jsx(TabsContent, { value: "library", children: _jsxs("div", { className: "mt-6 space-y-3 text-sm text-[var(--hive-text-secondary,#c5c7d8)]", children: [_jsx("p", { children: "Browse student-built templates, automations, and rituals ready for campus deployment." }), _jsx(Button, { variant: "secondary", children: "Open template library" })] }) })] }) }) }), _jsxs("aside", { className: "space-y-6", children: [_jsxs(Surface, { className: "space-y-4 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Quick actions" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { className: "w-full justify-between", variant: "secondary", onClick: onLaunchClick, children: "Launch on campus" }), _jsx(Button, { className: "w-full justify-between", variant: "ghost", children: "Configure data source" }), _jsx(Button, { className: "w-full justify-between", variant: "ghost", children: "Share with space" })] })] }), _jsxs(Surface, { className: "space-y-4 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Workflow health" }), _jsxs("div", { className: "space-y-3 text-sm text-[var(--hive-text-secondary,#c5c7d8)]", children: [_jsxs("p", { children: ["Live flows healthy: ", _jsx("strong", { className: "text-[var(--hive-text-primary,#f5f5ff)]", children: "4" })] }), _jsxs("p", { children: ["Alerts: ", _jsx("strong", { className: "text-[var(--hive-text-primary,#f5f5ff)]", children: "0" })] }), _jsxs("p", { children: ["Queue time: ", _jsx("strong", { className: "text-[var(--hive-text-primary,#f5f5ff)]", children: "1.2s" })] })] }), _jsx(Button, { variant: "secondary", className: "w-full", children: "View analytics" })] })] })] })] }));
}
//# sourceMappingURL=HiveLabToolsPage.js.map