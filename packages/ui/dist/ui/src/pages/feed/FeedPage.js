import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../atomic/00-Global/atoms/badge.js";
import { Button } from "../../atomic/00-Global/atoms/button.js";
import { Avatar, AvatarFallback, AvatarImage, } from "../../atomic/00-Global/atoms/avatar.js";
import { Surface } from "../../layout/index.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../atomic/00-Global/atoms/tabs.js";
import { cn } from "@/lib/utils";
const DEFAULT_POSTS = [
    {
        id: "ritual-prep",
        author: {
            name: "Laney Fraass",
            handle: "laney",
            campusRole: "Student Lead · HiveLab",
            badges: ["Host", "Verified"],
            avatarInitials: "LF",
        },
        title: "Tonight at UB · Ritual Launch",
        content: "We’re unlocking a late-night maker lab for Robotics + Design. RSVP to secure your badge and bring a friend—spaces are capped at 45 seats.",
        postedAt: "6 minutes ago",
        campusLocation: "UB Foundry · Innovation Wing",
        tags: ["Ritual", "Maker Lab", "Late Night"],
        media: [
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80",
                alt: "Students collaborating in a robotics lab",
            },
        ],
        stats: {
            applause: 128,
            replies: 14,
            reposts: 8,
            saves: 36,
        },
        pinned: true,
    },
    {
        id: "campus-mural",
        author: {
            name: "Ava Patel",
            handle: "ava.patel",
            campusRole: "Arts Council · UB Student",
            avatarInitials: "AP",
            badges: ["Arts & Culture"],
        },
        content: "We finished the campus mural! Drop by the Student Union east wall to sign your name. Open until 10PM, paint and drop cloths ready.",
        postedAt: "45 minutes ago",
        tags: ["Arts", "Campus Pride"],
        media: [
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
                alt: "Colorful campus mural with students painting",
            },
        ],
        stats: {
            applause: 86,
            replies: 9,
            saves: 21,
        },
    },
    {
        id: "cs-hack",
        author: {
            name: "UB Hackers",
            handle: "ubhackers",
            campusRole: "Student Org",
            avatarInitials: "UB",
        },
        content: "CS Hacknight is live in Baldy 21. Bring a project, join a crew, or test a new HiveLab tool. Pizza arrives at 9:15pm.",
        postedAt: "1 hour ago",
        tags: ["Hacknight", "Open Lab"],
        stats: {
            applause: 52,
            replies: 4,
            saves: 19,
        },
    },
];
const DEFAULT_RITUALS = [
    {
        id: "ritual-1",
        title: "Campus Film Festival Pitch Review",
        time: "7:30 PM · Tonight",
        location: "Student Union Theater",
        status: "live",
    },
    {
        id: "ritual-2",
        title: "Robotics Lab · After Hours",
        time: "9:00 PM · Tonight",
        location: "Innovation Wing · Foundry",
        status: "up-next",
    },
    {
        id: "ritual-3",
        title: "Sunrise Trail Run",
        time: "6:15 AM · Tomorrow",
        location: "Lake LaSalle Trailhead",
        status: "prep",
    },
];
const DEFAULT_SPACES = [
    {
        id: "space-robotics",
        name: "UB Robotics Collective",
        category: "STEM Builders",
        members: 842,
        status: "live",
    },
    {
        id: "space-cultural",
        name: "Cultural Mosaic",
        category: "Community & Culture",
        members: 623,
        status: "growing",
    },
    {
        id: "space-sustain",
        name: "Sustainability Studio",
        category: "Campus Impact",
        members: 506,
        status: "calm",
    },
];
const DEFAULT_ACTIONS = [
    { id: "share", label: "Share ritual photos", description: "Drop highlights from tonight’s events." },
    { id: "start", label: "Start a pop-up space", description: "Host a lightweight campus pop-up." },
    { id: "build", label: "Prototype in HiveLab", description: "Spin up a tool or automation." },
];
const STATUS_TONE = {
    live: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success-text,#bef0c2)]",
    "up-next": "bg-[var(--hive-brand-primary,#ffd166)]/15 text-[var(--hive-brand-primary,#ffd166)]",
    prep: "bg-[var(--hive-text-muted,#9aa3b6)]/15 text-[var(--hive-text-muted,#9aa3b6)]",
};
function FeedPostCard({ post }) {
    return (_jsxs(Surface, { elevation: "sm", padding: "lg", className: cn("space-y-5 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)]", post.pinned && "ring-2 ring-[var(--hive-brand-primary,#ffd166)]/60"), children: [_jsxs("header", { className: "flex items-start gap-4", children: [_jsx(Avatar, { className: "h-12 w-12", children: post.author.avatarUrl ? (_jsx(AvatarImage, { src: post.author.avatarUrl, alt: post.author.name })) : (_jsx(AvatarFallback, { children: post.author.avatarInitials ?? post.author.name.slice(0, 2) })) }), _jsxs("div", { className: "flex flex-1 flex-col gap-2", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "text-base font-semibold text-[var(--hive-text-primary,#f7f7ff)]", children: post.author.name }), _jsx("span", { className: "text-xs uppercase tracking-[0.25em] text-[var(--hive-text-muted,#9297a8)]", children: post.author.campusRole }), post.pinned ? (_jsx(Badge, { tone: "contrast", variant: "pill", children: "Pinned" })) : null] }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary,#c9cad6)]", children: ["@", post.author.handle] }), post.title ? (_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: post.title })) : null] }), _jsx("span", { className: "text-xs text-[var(--hive-text-muted,#9093a0)]", children: post.postedAt })] }), _jsx("p", { className: "text-sm leading-6 text-[var(--hive-text-primary,#f5f5ff)]", children: post.content }), post.media && post.media.length > 0 ? (_jsx("div", { className: "overflow-hidden rounded-2xl border border-[var(--hive-border-subtle,#282a3a)]", children: post.media[0].type === "image" ? (_jsx("img", { src: post.media[0].url, alt: post.media[0].alt ?? "", className: "max-h-[420px] w-full object-cover", loading: "lazy" })) : null })) : null, post.tags && post.tags.length > 0 ? (_jsx("div", { className: "flex flex-wrap gap-2", children: post.tags.map((tag) => (_jsxs(Badge, { tone: "muted", variant: "pill", children: ["#", tag.replace(/\s+/g, "").toLowerCase()] }, tag))) })) : null, _jsxs("footer", { className: "flex flex-wrap items-center gap-4 text-xs text-[var(--hive-text-muted,#8f94a3)]", children: [_jsxs("button", { type: "button", className: "flex items-center gap-2 hover:text-[var(--hive-text-primary,#f5f5ff)]", children: [_jsx("span", { role: "img", "aria-hidden": true, children: "\uD83D\uDD25" }), "Applause ", post.stats.applause.toLocaleString()] }), _jsxs("button", { type: "button", className: "flex items-center gap-2 hover:text-[var(--hive-text-primary,#f5f5ff)]", children: [_jsx("span", { role: "img", "aria-hidden": true, children: "\uD83D\uDCAC" }), "Replies ", post.stats.replies] }), post.stats.reposts !== undefined ? (_jsxs("button", { type: "button", className: "flex items-center gap-2 hover:text-[var(--hive-text-primary,#f5f5ff)]", children: [_jsx("span", { role: "img", "aria-hidden": true, children: "\uD83D\uDD01" }), "Boosts ", post.stats.reposts] })) : null, post.stats.saves !== undefined ? (_jsxs("button", { type: "button", className: "flex items-center gap-2 hover:text-[var(--hive-text-primary,#f5f5ff)]", children: [_jsx("span", { role: "img", "aria-hidden": true, children: "\uD83D\uDCCC" }), "Saves ", post.stats.saves] })) : null] })] }));
}
function QuickActionList({ actions, }) {
    return (_jsxs(Surface, { elevation: "sm", padding: "lg", className: "space-y-4 rounded-3xl bg-[var(--hive-background-secondary,#11131f)]", children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: "Actions" }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted,#9aa1b5)]", children: "Ship something before midnight." })] }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-xs uppercase tracking-[0.2em]", children: "View all" })] }), _jsx("ul", { className: "space-y-3", children: actions.map((action) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx("span", { className: "mt-1 rounded-full bg-[var(--hive-background-tertiary,#181a26)] px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--hive-text-muted,#8c92a3)]", children: action.id }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-[var(--hive-text-primary,#f5f5ff)]", children: action.label }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary,#c3c4d5)]", children: action.description })] })] }, action.id))) })] }));
}
function RitualList({ rituals }) {
    return (_jsxs(Surface, { elevation: "sm", padding: "lg", className: "space-y-5 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)]", children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#fdfdff)]", children: "Ritual Watch" }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted,#949ab0)]", children: "Keep UB\u2019s cadence tight." })] }), _jsx(Button, { variant: "secondary", size: "sm", children: "Submit" })] }), _jsx("ul", { className: "space-y-4", children: rituals.map((ritual) => (_jsxs("li", { className: "flex items-start justify-between gap-3 rounded-2xl bg-[var(--hive-background-tertiary,#171827)] px-4 py-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: ritual.title }), _jsxs("p", { className: "text-xs text-[var(--hive-text-secondary,#c5c6d9)]", children: [ritual.time, " \u00B7 ", ritual.location] })] }), ritual.status ? (_jsx("span", { className: cn("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]", STATUS_TONE[ritual.status]), children: ritual.status === "live" ? "Live" : ritual.status === "up-next" ? "Up next" : "Prep" })) : null] }, ritual.id))) })] }));
}
function TrendingSpaces({ spaces }) {
    return (_jsxs(Surface, { elevation: "sm", padding: "lg", className: "space-y-4 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)]", children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary,#fdfdff)]", children: "Trending Spaces" }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted,#969bb2)]", children: "Campus squads gaining momentum." })] }), _jsx(Button, { variant: "ghost", size: "sm", children: "See all" })] }), _jsx("ul", { className: "space-y-4", children: spaces.map((space) => (_jsxs("li", { className: "flex items-center justify-between gap-3 rounded-2xl bg-[var(--hive-background-tertiary,#161822)] px-4 py-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]", children: space.name }), _jsxs("p", { className: "text-xs text-[var(--hive-text-secondary,#c5c7d3)]", children: [space.category, " \u00B7 ", space.members.toLocaleString(), " members"] })] }), space.status ? (_jsx(Badge, { tone: "muted", variant: "pill", children: space.status === "live" ? "Live" : space.status === "growing" ? "Growing" : "Calm" })) : null] }, space.id))) })] }));
}
export function FeedPage({ campusName = "UB", userName = "Laney", activeTab = "all", posts = DEFAULT_POSTS, rituals = DEFAULT_RITUALS, trendingSpaces = DEFAULT_SPACES, announcements = ["Feed focus mode is live for UB campus leaders.", "HiveLab prototypes auto-sync with Spaces you've joined."], quickActions = DEFAULT_ACTIONS, onTabChange, }) {
    return (_jsxs("div", { className: "min-h-screen bg-[var(--hive-background-page,#07080d)] text-[var(--hive-text-primary,#f7f7ff)]", children: [_jsx("div", { className: "border-b border-[var(--hive-border-subtle,#1d1f2c)] bg-[var(--hive-background-secondary,#10111a)]/90 backdrop-blur", children: _jsxs("div", { className: "mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-xs uppercase tracking-[0.35em] text-[var(--hive-text-muted,#949ab8)]", children: [campusName, " Campus Feed"] }), _jsxs("h1", { className: "text-3xl font-semibold text-[var(--hive-text-primary,#fefefe)]", children: ["Tonight at ", campusName] }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary,#c9ccda)]", children: [userName, ", curate the rituals, spaces, and tools that keep UB moving."] })] }), _jsx(Button, { size: "lg", variant: "primary", className: "self-start md:self-auto", children: "Compose update" })] }) }), _jsxs("main", { className: "mx-auto grid max-w-6xl gap-6 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs(Surface, { className: "space-y-5 rounded-3xl bg-[var(--hive-background-secondary,#10111a)] px-6 py-5", children: [_jsxs(Tabs, { defaultValue: activeTab, className: "w-full", onValueChange: onTabChange, children: [_jsxs(TabsList, { className: "bg-[var(--hive-background-tertiary,#171827)] text-[var(--hive-text-muted,#9398af)]", variant: "pills", children: [_jsx(TabsTrigger, { value: "all", children: "All" }), _jsx(TabsTrigger, { value: "rituals", children: "Rituals" }), _jsx(TabsTrigger, { value: "spaces", children: "Spaces" }), _jsx(TabsTrigger, { value: "tools", children: "HiveLab" })] }), _jsx(TabsContent, { value: "all", children: _jsx("p", { className: "text-xs text-[var(--hive-text-muted,#8e94a5)]", children: "Hive curates posts from verified campus hosts plus your subscribed spaces." }) })] }), announcements.length > 0 ? (_jsx("div", { className: "grid gap-3 rounded-2xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-tertiary,#181a27)] p-4 md:grid-cols-2", children: announcements.map((announcement) => (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("span", { "aria-hidden": true, className: "mt-1 text-lg", children: "\uD83D\uDCE3" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary,#c7c9d8)]", children: announcement })] }, announcement))) })) : null] }), posts.map((post) => (_jsx(FeedPostCard, { post: post }, post.id)))] }), _jsxs("aside", { className: "space-y-6", children: [_jsx(QuickActionList, { actions: quickActions }), _jsx(RitualList, { rituals: rituals }), _jsx(TrendingSpaces, { spaces: trendingSpaces })] })] })] }));
}
//# sourceMappingURL=FeedPage.js.map