"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { BentoGrid } from "./bento-grid/index.js";
import { ProfileHeaderCard } from "./profile-header-card.js";
import { HiveLabCard } from "./hivelab-card.js";
import { ToolsCard } from "./tools-card.js";
import { CalendarCard } from "./calendar-card.js";
import { GhostModeCard } from "./ghost-mode-card.js";
import { RequestAccessCard } from "./request-access-card.js";
// Define static components outside of render
const SocialPreviewCard = React.memo(() => (_jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center", children: [_jsx("div", { className: "w-8 h-8 bg-[#2A2A2A] rounded-lg flex items-center justify-center mb-3", children: _jsx("svg", { className: "w-5 h-5 text-[#FFD700]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" }) }) }), _jsx("h4", { className: "text-sm font-semibold text-foreground mb-1", children: "Social Features" }), _jsx("p", { className: "text-xs text-muted", children: "Build privately, share when ready" })] })));
SocialPreviewCard.displayName = 'SocialPreviewCard';
export function BentoProfileDashboard({ user, className }) {
    const [ghostMode, setGhostMode] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const mockTools = [
        { id: "1", name: "Study Timer", category: "Productivity", users: 1247, icon: "⏱️" },
        { id: "2", name: "GPA Calc", category: "Academic", users: 892, icon: "📊" },
        { id: "3", name: "Campus Map", category: "Navigation", users: 2156, icon: "🗺️" }
    ];
    const mockEvents = [
        {
            id: "1",
            title: "CS 250 Exam",
            date: new Date(2024, 6, 15),
            type: "academic"
        },
        {
            id: "2",
            title: "Study Group",
            date: new Date(2024, 6, 18),
            type: "personal"
        }
    ];
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);
    // Create components with props bound
    const ProfileHeaderCardWithProps = React.useMemo(() => () => (_jsx(ProfileHeaderCard, { fullName: user.fullName, handle: user.handle, avatarUrl: user.avatarUrl, major: user.major, graduationYear: user.graduationYear, isBuilder: user.isBuilder })), [user]);
    const HiveLabCardWithProps = React.useMemo(() => () => (_jsx(HiveLabCard, { isBuilder: user.isBuilder || false, toolsCreated: user.builderAchievements?.toolsCreated || 0, totalEngagement: user.builderAchievements?.totalEngagement || 0, countdownDate: user.isBuilder ? undefined : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })), [user]);
    const ToolsCardWithProps = React.useMemo(() => () => (_jsx(ToolsCard, { tools: mockTools })), []);
    const CalendarCardWithProps = React.useMemo(() => () => (_jsx(CalendarCard, { events: mockEvents })), []);
    const GhostModeCardWithProps = React.useMemo(() => () => (_jsx(GhostModeCard, { isGhostMode: ghostMode, onToggle: setGhostMode })), [ghostMode]);
    const RequestAccessCardWithProps = React.useMemo(() => () => (_jsx(RequestAccessCard, {})), []);
    const cards = [
        {
            id: "profile-header",
            size: "2x1",
            priority: 1,
            component: ProfileHeaderCardWithProps
        },
        {
            id: "hivelab",
            size: "1x2",
            priority: 2,
            component: HiveLabCardWithProps
        },
        {
            id: "calendar",
            size: "1x2",
            priority: 3,
            component: CalendarCardWithProps
        },
        {
            id: "tools",
            size: "2x2",
            priority: 4,
            component: ToolsCardWithProps
        },
        {
            id: "ghost-mode",
            size: "1x1",
            priority: 5,
            component: GhostModeCardWithProps
        },
        {
            id: "request-access",
            size: "1x2",
            priority: 6,
            component: RequestAccessCardWithProps
        },
        {
            id: "social-preview",
            size: "1x1",
            priority: 7,
            isLocked: true,
            component: SocialPreviewCard
        }
    ];
    return (_jsx("div", { className: className, children: _jsx("div", { className: `transition-all duration-[400ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'}`, children: _jsx(BentoGrid, { cards: cards }) }) }));
}
//# sourceMappingURL=bento-profile-dashboard.js.map