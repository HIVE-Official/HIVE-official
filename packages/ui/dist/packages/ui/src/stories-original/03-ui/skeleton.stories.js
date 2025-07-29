import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '../../components/ui/skeleton';
import { HiveCard, HiveCardHeader, HiveCardContent } from '../../components';
import { User, BookOpen, Calendar, BarChart3, Users, Zap } from 'lucide-react';
const meta = {
    title: '03-UI/Skeleton Loading',
    component: Skeleton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'HIVE luxury skeleton loading patterns for campus platform - uses obsidian backgrounds with subtle pulse animations.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
// HIVE Campus Profile Loading
const CampusProfileSkeleton = () => (_jsxs(HiveCard, { className: "w-80", children: [_jsx(HiveCardHeader, { children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Skeleton, { className: "h-12 w-12 rounded-full" }), _jsxs("div", { className: "space-y-2 flex-1", children: [_jsx(Skeleton, { className: "h-4 w-32" }), _jsx(Skeleton, { className: "h-3 w-24" })] }), _jsx(Skeleton, { className: "h-6 w-16 rounded-full" })] }) }), _jsxs(HiveCardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-3/4" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-3 w-16" }), _jsx(Skeleton, { className: "h-6 w-20" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-3 w-12" }), _jsx(Skeleton, { className: "h-6 w-24" })] })] }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: Array.from({ length: 6 }).map((_, i) => (_jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i))) })] })] }));
// HIVE Space Card Loading
const SpaceCardSkeleton = () => (_jsx(HiveCard, { className: "w-80", children: _jsxs(HiveCardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Skeleton, { className: "h-10 w-10 rounded-xl" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx(Skeleton, { className: "h-5 w-32" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-3 w-3 rounded-full" }), _jsx(Skeleton, { className: "h-3 w-24" })] })] }), _jsx(Skeleton, { className: "h-6 w-12 rounded-full" })] }), _jsx(Skeleton, { className: "h-32 w-full rounded-xl" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-8 w-16 rounded-lg" }), _jsx(Skeleton, { className: "h-8 w-20 rounded-lg" })] }), _jsx(Skeleton, { className: "h-8 w-8 rounded-lg" })] })] }) }));
// HIVE Feed Post Loading
const FeedPostSkeleton = () => (_jsxs(HiveCard, { className: "w-96", children: [_jsx(HiveCardHeader, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Skeleton, { className: "h-10 w-10 rounded-xl" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-28" }), _jsx(Skeleton, { className: "h-3 w-36" })] }), _jsx(Skeleton, { className: "h-6 w-12 rounded-full" })] }) }), _jsxs(HiveCardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-5/6" }), _jsx(Skeleton, { className: "h-4 w-4/6" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-background-tertiary)]/60 rounded-xl border border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(Skeleton, { className: "h-5 w-5 rounded" }), _jsx(Skeleton, { className: "h-4 w-32" })] }), _jsx(Skeleton, { className: "h-3 w-full" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-8 w-20 rounded-xl" }), _jsx(Skeleton, { className: "h-8 w-16 rounded-xl" }), _jsx(Skeleton, { className: "h-8 w-20 rounded-xl" })] }), _jsx(Skeleton, { className: "h-8 w-8 rounded-xl" })] })] })] }));
// HIVE Dashboard Widget Loading
const DashboardWidgetSkeleton = ({ title }) => (_jsxs(HiveCard, { className: "w-72", children: [_jsx(HiveCardHeader, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Skeleton, { className: "h-6 w-6 rounded" }), _jsx("div", { className: "flex-1", children: _jsx(Skeleton, { className: "h-5 w-24" }) }), _jsx(Skeleton, { className: "h-4 w-4 rounded" })] }) }), _jsx(HiveCardContent, { children: title === 'Calendar' ? (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "grid grid-cols-7 gap-1", children: Array.from({ length: 7 }).map((_, i) => (_jsx(Skeleton, { className: "h-6 w-6 rounded" }, i))) }), _jsx("div", { className: "grid grid-cols-7 gap-1", children: Array.from({ length: 35 }).map((_, i) => (_jsx(Skeleton, { className: "h-6 w-6 rounded" }, i))) })] })) : title === 'Chart' ? (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex items-end gap-1 h-24", children: Array.from({ length: 7 }).map((_, i) => (_jsx(Skeleton, { className: "flex-1 rounded-t", style: { height: `${Math.random() * 60 + 20}%` } }, i))) }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Skeleton, { className: "h-3 w-8" }), _jsx(Skeleton, { className: "h-3 w-12" }), _jsx(Skeleton, { className: "h-3 w-8" })] })] })) : (_jsxs("div", { className: "space-y-3", children: [_jsx(Skeleton, { className: "h-16 w-full rounded-xl" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-3 w-full" }), _jsx(Skeleton, { className: "h-3 w-3/4" }), _jsx(Skeleton, { className: "h-3 w-1/2" })] })] })) })] }));
// HIVE Loading Showcase
const HIVELoadingShowcase = () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: "HIVE Campus Loading States" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] max-w-2xl mx-auto", children: "Luxury skeleton patterns for campus platform components using obsidian backgrounds and subtle pulse animations." })] }), _jsxs("div", { className: "grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx(User, { className: "w-5 h-5" }), "Profile Loading"] }), _jsx(CampusProfileSkeleton, {})] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx(Users, { className: "w-5 h-5" }), "Space Loading"] }), _jsx(SpaceCardSkeleton, {})] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx(BookOpen, { className: "w-5 h-5" }), "Feed Post Loading"] }), _jsx(FeedPostSkeleton, {})] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx(Calendar, { className: "w-5 h-5" }), "Calendar Widget"] }), _jsx(DashboardWidgetSkeleton, { title: "Calendar" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx(BarChart3, { className: "w-5 h-5" }), "Chart Widget"] }), _jsx(DashboardWidgetSkeleton, { title: "Chart" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx(Zap, { className: "w-5 h-5" }), "Tool Widget"] }), _jsx(DashboardWidgetSkeleton, { title: "Tool" })] })] })] }));
// ============================================================================
// STORYBOOK STORIES
// ============================================================================
export const Basic = {
    render: () => (_jsxs("div", { className: "space-y-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(Skeleton, { className: "h-4 w-64" }), _jsx(Skeleton, { className: "h-4 w-48" }), _jsx(Skeleton, { className: "h-4 w-56" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Basic skeleton loading using HIVE design tokens with subtle pulse animation.',
            },
        },
    },
};
export const CampusProfile = {
    render: () => (_jsx("div", { className: "p-8 bg-[var(--hive-background-primary)]", children: _jsx(CampusProfileSkeleton, {}) })),
    parameters: {
        docs: {
            description: {
                story: 'Campus student profile loading state with academic info and tool grid.',
            },
        },
    },
};
export const SpaceCard = {
    render: () => (_jsx("div", { className: "p-8 bg-[var(--hive-background-primary)]", children: _jsx(SpaceCardSkeleton, {}) })),
    parameters: {
        docs: {
            description: {
                story: 'Campus space card loading state with preview and interaction buttons.',
            },
        },
    },
};
export const FeedPost = {
    render: () => (_jsx("div", { className: "p-8 bg-[var(--hive-background-primary)]", children: _jsx(FeedPostSkeleton, {}) })),
    parameters: {
        docs: {
            description: {
                story: 'Campus feed post loading state with tool preview and social actions.',
            },
        },
    },
};
export const DashboardWidgets = {
    render: () => (_jsx("div", { className: "p-8 bg-[var(--hive-background-primary)] space-y-6", children: _jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [_jsx(DashboardWidgetSkeleton, { title: "Calendar" }), _jsx(DashboardWidgetSkeleton, { title: "Chart" }), _jsx(DashboardWidgetSkeleton, { title: "Tool" })] }) })),
    parameters: {
        docs: {
            description: {
                story: 'Campus dashboard widget loading states for calendar, charts, and tools.',
            },
        },
    },
};
export const CompleteShowcase = {
    render: () => _jsx(HIVELoadingShowcase, {}),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Complete showcase of HIVE campus loading states using luxury design system.',
            },
        },
    },
};
//# sourceMappingURL=skeleton.stories.js.map