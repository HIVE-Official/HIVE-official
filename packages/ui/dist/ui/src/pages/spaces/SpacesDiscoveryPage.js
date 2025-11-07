import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from "../../atomic/00-Global/atoms/button";
import { Badge } from "../../atomic/00-Global/atoms/badge";
import { Surface } from "../../layout";
import { SpaceCard } from "./SpaceCard";
const DEFAULT_FEATURED = [
    {
        id: "robotics",
        name: "UB Robotics Collective",
        description: "Nightly build sessions, competition prep, and rapid prototyping with HiveLab automations.",
        members: 842,
        category: "Builder Labs",
        bannerColor: "from-[#2a1b4d] via-[#191726] to-[#0c0d17]",
        tags: ["Hardware", "Rituals", "Late Night"],
        metrics: [
            { label: "Momentum", value: "High" },
            { label: "Rituals", value: "4 / week" },
        ],
        hosts: [
            { name: "Laney Fraass", initials: "LF", role: "Lead" },
            { name: "Marcus Lee", initials: "ML", role: "Co-Lead" },
        ],
    },
    {
        id: "climate",
        name: "Sustainability Studio",
        description: "Campus energy dashboards, climate hacks, and weekly regenerative design jams.",
        members: 506,
        category: "Impact & Civic",
        bannerColor: "from-[#10321f] via-[#162b1f] to-[#0c0f12]",
        tags: ["Climate", "Data", "Civic"],
        momentum: "Growing",
        metrics: [
            { label: "Active tools", value: "6" },
            { label: "Members online", value: "189" },
        ],
    },
];
const DEFAULT_RECOMMENDED = [
    {
        id: "music",
        name: "Campus Music Guild",
        description: "Collaborative sessions, student-run concerts, and pop-up studio rituals.",
        members: 421,
        category: "Arts & Culture",
        bannerColor: "from-[#2f1b29] via-[#211423] to-[#120b15]",
        tags: ["Live Sets", "Open Mic", "Production"],
        metrics: [
            { label: "Events Tonight", value: "2" },
            { label: "Leads", value: "8" },
        ],
    },
    {
        id: "founders",
        name: "UB Founders",
        description: "Venture sprints, campus pitch nights, and HiveLab tool drops.",
        members: 694,
        category: "Builders & Founders",
        bannerColor: "from-[#1b263e] via-[#111829] to-[#090c12]",
        tags: ["Startups", "Rituals", "Mentorship"],
        momentum: "Live",
    },
    {
        id: "wellness",
        name: "Collective Motion",
        description: "Wellness rituals, dawn runs, and campus hiking squads.",
        members: 310,
        category: "Lifestyle & Wellness",
        bannerColor: "from-[#12302c] via-[#122523] to-[#090e11]",
        tags: ["Movement", "Outdoors"],
    },
];
const DEFAULT_CATEGORIES = [
    { id: "builders", label: "Builder labs", count: 14 },
    { id: "rituals", label: "Ritual crews", count: 11 },
    { id: "wellness", label: "Wellness", count: 9 },
    { id: "arts", label: "Arts & culture", count: 17 },
    { id: "impact", label: "Impact & civic", count: 6 },
];
export function SpacesDiscoveryPage({ campusName = "UB", featuredSpaces = DEFAULT_FEATURED, recommendedSpaces = DEFAULT_RECOMMENDED, categories = DEFAULT_CATEGORIES, }) {
    return (_jsxs("div", { className: "min-h-screen bg-[var(--hive-background-page,#07080d)] text-[var(--hive-text-primary,#f7f7ff)]", children: [_jsx("div", { className: "border-b border-[var(--hive-border-subtle,#1d1f2c)] bg-[var(--hive-background-secondary,#10111a)]/85 backdrop-blur", children: _jsxs("div", { className: "mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 lg:flex-row lg:items-center lg:justify-between", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-xs uppercase tracking-[0.32em] text-[var(--hive-text-muted,#9096ad)]", children: ["Spaces \u00B7 Tonight at ", campusName] }), _jsx("h1", { className: "text-3xl font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Rally your campus crews" }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary,#c4c7d8)]", children: ["Discover rituals, tools, and hosts powering the ", campusName, " campus drop by drop."] })] }), _jsx(Button, { variant: "primary", size: "lg", children: "Create a space" })] }) }), _jsxs("main", { className: "mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-10", children: [_jsxs("section", { className: "space-y-4", children: [_jsxs("header", { className: "flex flex-wrap items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Featured rituals" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary,#c5c8d8)]", children: "Spaces leading tonight\u2019s campus programming." })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "secondary", children: "View schedule" }), _jsx(Button, { variant: "ghost", children: "Campus map" })] })] }), _jsx("div", { className: "grid gap-6 md:grid-cols-2", children: featuredSpaces.map((space) => (_jsx(SpaceCard, { space: space, ctaLabel: "RSVP" }, space.id))) })] }), _jsxs("section", { className: "space-y-4", children: [_jsxs("header", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Recommended for you" }), _jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((category) => (_jsxs(Badge, { tone: "muted", variant: "pill", children: [category.label, category.count !== undefined ? ` · ${category.count}` : ""] }, category.id))) })] }), _jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: recommendedSpaces.map((space) => (_jsx(SpaceCard, { space: space }, space.id))) })] }), _jsxs(Surface, { className: "flex flex-col gap-4 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)] p-6 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Bring your crew onto Hive" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary,#c4c7d8)]", children: "Invite leaders, set rituals, and launch a student-run campus presence in under five minutes." })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "secondary", children: "Start onboarding" }), _jsx(Button, { variant: "ghost", children: "Share link" })] })] })] })] }));
}
//# sourceMappingURL=SpacesDiscoveryPage.js.map