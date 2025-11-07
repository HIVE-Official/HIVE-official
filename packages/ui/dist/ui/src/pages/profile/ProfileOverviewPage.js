import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../atomic/00-Global/atoms/badge";
import { Button } from "../../atomic/00-Global/atoms/button";
import { Avatar, AvatarFallback, AvatarImage, } from "../../atomic/00-Global/atoms/avatar";
import { Surface } from "../../layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../atomic/00-Global/atoms/tabs";
const DEFAULT_STATS = [
    { label: "Spaces", value: "12" },
    { label: "Rituals hosted", value: "38" },
    { label: "Tools launched", value: "5" },
    { label: "Mentors", value: "3" },
];
const DEFAULT_HIGHLIGHTS = [
    {
        id: "highlight-1",
        title: "Launched nightly robotics lab",
        description: "Scaled to 45 students per sprint with HiveLab automations.",
        timestamp: "This week",
        category: "Ritual",
        icon: "🤖",
    },
    {
        id: "highlight-2",
        title: "Published campus service board tool",
        description: "500+ students tracking service opportunities.",
        timestamp: "2 weeks ago",
        category: "HiveLab",
        icon: "🛠️",
    },
];
const DEFAULT_EXPERIENCES = [
    {
        id: "exp-1",
        title: "Student Lead · UB Robotics Collective",
        subtitle: "Tonight at UB · Campus builder program",
        period: "2023 — Present",
        description: "Scaled the Robotics Collective with weekly rituals, mobile-first scheduling, and sponsor integrations.",
        tags: ["Ritual Host", "Builder", "Live"],
    },
    {
        id: "exp-2",
        title: "Fellow · HiveLab Campus Tools",
        subtitle: "HiveLab Studio",
        period: "2024 — Present",
        description: "Designed and shipped student-run automation flows for campus housing, scholarships, and rideshare boards.",
        tags: ["HiveLab", "Automation"],
    },
];
const DEFAULT_SPACES = [
    { id: "space-robotics", name: "UB Robotics Collective", role: "Lead" },
    { id: "space-founders", name: "UB Founders", role: "Co-lead" },
    { id: "space-service", name: "Campus Service Lab", role: "Mentor" },
];
export function ProfileOverviewPage({ campusName = "UB", userName = "Laney Fraass", handle = "laney", avatarUrl, avatarFallback = "LF", pronouns = "she/her", program = "Student Lead · Robotics & HiveLab Fellow", badges = ["Builder", "Verified Host", "Student-run"], stats = DEFAULT_STATS, highlights = DEFAULT_HIGHLIGHTS, experiences = DEFAULT_EXPERIENCES, spaces = DEFAULT_SPACES, }) {
    return (_jsxs("div", { className: "min-h-screen bg-[var(--hive-background-page,#07080d)] text-[var(--hive-text-primary,#f7f7ff)]", children: [_jsx("div", { className: "h-52 w-full bg-[radial-gradient(circle_at_top,#2f2160,transparent)]", "aria-hidden": true }), _jsx("div", { className: "relative -mt-20", children: _jsxs(Surface, { className: "mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-8 md:flex-row md:items-end", children: [_jsxs("div", { className: "flex flex-1 flex-col gap-4", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-5", children: [_jsx(Avatar, { className: "h-28 w-28 border-4 border-[rgba(255,214,102,0.35)] shadow-xl", children: avatarUrl ? (_jsx(AvatarImage, { src: avatarUrl, alt: userName })) : (_jsx(AvatarFallback, { children: avatarFallback })) }), _jsxs("div", { children: [_jsxs("p", { className: "text-xs uppercase tracking-[0.24em] text-[var(--hive-text-muted,#8d93a7)]", children: [campusName, " campus profile"] }), _jsx("h1", { className: "text-3xl font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: userName }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary,#c4c7d8)]", children: ["@", handle, " \u00B7 ", pronouns] }), _jsx("p", { className: "mt-2 text-sm text-[var(--hive-text-secondary,#c4c7d8)]", children: program })] })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: badges.map((badge) => (_jsx(Badge, { tone: "contrast", variant: "pill", children: badge }, badge))) })] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(Button, { variant: "secondary", children: "Message" }), _jsx(Button, { variant: "ghost", children: "Share profile" }), _jsx(Button, { variant: "primary", children: "Invite to ritual" })] })] }) }), _jsxs("main", { className: "mx-auto grid max-w-5xl gap-6 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]", children: [_jsx("section", { className: "space-y-6", children: _jsx(Surface, { className: "rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-6", children: _jsxs(Tabs, { defaultValue: "highlights", children: [_jsxs(TabsList, { className: "bg-[var(--hive-background-tertiary,#181a27)] text-[var(--hive-text-muted,#8d93a7)]", variant: "pills", children: [_jsx(TabsTrigger, { value: "highlights", children: "Highlights" }), _jsx(TabsTrigger, { value: "timeline", children: "Timeline" }), _jsx(TabsTrigger, { value: "activity", children: "Activity" })] }), _jsx(TabsContent, { value: "highlights", children: _jsx("ul", { className: "mt-6 space-y-5", children: highlights.map((highlight) => (_jsxs("li", { className: "flex items-start gap-4 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-5 py-4", children: [_jsx("span", { "aria-hidden": true, className: "text-xl", children: highlight.icon ?? "✨" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsxs("header", { className: "flex flex-wrap items-center gap-2", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: highlight.title }), _jsx(Badge, { tone: "muted", variant: "pill", children: highlight.category })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary,#c5c7d6)]", children: highlight.description }), _jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8d93a7)]", children: highlight.timestamp })] })] }, highlight.id))) }) }), _jsx(TabsContent, { value: "timeline", children: _jsx("ul", { className: "mt-6 space-y-6", children: experiences.map((experience) => (_jsxs("li", { className: "space-y-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-5 py-4", children: [_jsxs("header", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: experience.title }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary,#c3c5d6)]", children: experience.subtitle })] }), _jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8d93a7)]", children: experience.period })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary,#c5c7d6)]", children: experience.description }), experience.tags && experience.tags.length > 0 ? (_jsx("div", { className: "flex flex-wrap gap-2", children: experience.tags.map((tag) => (_jsx(Badge, { tone: "muted", variant: "pill", children: tag }, tag))) })) : null] }, experience.id))) }) }), _jsx(TabsContent, { value: "activity", children: _jsxs("div", { className: "mt-6 space-y-4 text-sm text-[var(--hive-text-secondary,#c5c7d6)]", children: [_jsx("p", { children: "Laney has been active in HiveLab, Robotics Collective, and UB Founders this week." }), _jsx("p", { children: "Campus prompts: responded to 4 onboarding nudges \u00B7 Mentoring 3 new tool builders." })] }) })] }) }) }), _jsxs("aside", { className: "space-y-6", children: [_jsxs(Surface, { className: "rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-6", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Campus stats" }), _jsx("div", { className: "mt-4 grid grid-cols-2 gap-4", children: stats.map((stat) => (_jsxs("div", { className: "rounded-2xl bg-[var(--hive-background-tertiary,#171827)] px-4 py-3", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.28em] text-[var(--hive-text-muted,#8d93a7)]", children: stat.label }), _jsx("p", { className: "mt-1 text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: stat.value })] }, stat.label))) })] }), _jsxs(Surface, { className: "space-y-4 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#0f1019)] p-6", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Spaces" }), _jsx("ul", { className: "space-y-3", children: spaces.map((space) => (_jsxs("li", { className: "flex items-center justify-between rounded-2xl bg-[var(--hive-background-tertiary,#171827)] px-4 py-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: space.name }), _jsx("p", { className: "text-xs uppercase tracking-[0.28em] text-[var(--hive-text-muted,#8d93a7)]", children: space.role })] }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-xs uppercase tracking-[0.24em]", children: "View" })] }, space.id))) }), _jsx(Button, { variant: "secondary", className: "w-full", children: "Manage spaces" })] })] })] })] }));
}
//# sourceMappingURL=ProfileOverviewPage.js.map