"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Badge } from "../atoms/badge";
import { cn } from "../../lib/utils";
const ActivityTimeline = React.forwardRef(({ className, activities, variant = "default", limit, showViewAll = true, onViewAll, ...props }, ref) => {
    const displayActivities = limit ? activities.slice(0, limit) : activities;
    const hasMore = limit && activities.length > limit;
    if (activities.length === 0) {
        return (_jsxs("div", { ref: ref, className: cn("py-12 text-center", className), ...props, children: [_jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: _jsx("svg", { className: "h-8 w-8 text-muted-foreground", fill: "none", strokeWidth: "1.5", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No activity yet" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Start engaging with spaces and people" })] }));
    }
    return (_jsxs("div", { ref: ref, className: cn("space-y-4", className), ...props, children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-4 top-0 bottom-0 w-px bg-border" }), _jsx("div", { className: "space-y-6", children: displayActivities.map((activity, index) => (_jsx(ActivityItem, { activity: activity, variant: variant, isLast: index === displayActivities.length - 1 }, activity.id))) })] }), hasMore && showViewAll && onViewAll && (_jsxs("button", { onClick: onViewAll, className: "w-full py-2 text-sm font-medium text-primary hover:text-primary/80 transition-smooth ease-liquid", children: ["View all ", activities.length, " activities \u2192"] }))] }));
});
ActivityTimeline.displayName = "ActivityTimeline";
function ActivityItem({ activity, variant, isLast }) {
    const icon = getActivityIcon(activity.type);
    const handleClick = () => {
        activity.onClick?.();
    };
    return (_jsxs("div", { className: cn("relative flex gap-4 group", activity.onClick && "cursor-pointer"), onClick: handleClick, children: [_jsx("div", { className: "relative z-10 flex-shrink-0", children: _jsx("div", { className: cn("h-8 w-8 rounded-full flex items-center justify-center", getActivityColor(activity.type)), children: icon }) }), _jsx("div", { className: cn("flex-1 pb-6", isLast && "pb-0"), children: _jsxs("div", { className: cn("rounded-lg border border-border bg-card p-4 transition-smooth ease-liquid", activity.onClick && "group-hover:bg-accent/50 group-hover:shadow-sm"), children: [_jsxs("div", { className: "flex items-start justify-between gap-4 mb-2", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: activity.title }), variant === "default" && activity.description && (_jsx("p", { className: "text-xs text-muted-foreground mt-1", children: activity.description }))] }), _jsx("time", { className: "text-xs text-muted-foreground shrink-0", children: activity.timestamp })] }), activity.metadata && variant === "default" && (_jsxs("div", { className: "space-y-2 mt-3", children: [activity.metadata.postPreview && (_jsxs("p", { className: "text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3", children: ["\"", activity.metadata.postPreview, "\""] })), activity.metadata.connectionName && activity.metadata.avatarUrl && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { className: "h-6 w-6", children: [_jsx(AvatarImage, { src: activity.metadata.avatarUrl }), _jsx(AvatarFallback, { className: "text-xs", children: activity.metadata.connectionName[0] })] }), _jsx("span", { className: "text-xs font-medium text-foreground", children: activity.metadata.connectionName })] })), activity.metadata.badge && (_jsx(Badge, { variant: activity.metadata.badge.variant || "secondary", className: "text-xs", children: activity.metadata.badge.label }))] }))] }) })] }));
}
// Helper functions
function getActivityIcon(type) {
    const iconClass = "h-4 w-4";
    switch (type) {
        case "post":
        case "space_post":
            return (_jsx("svg", { className: iconClass, fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) }));
        case "comment":
            return (_jsx("svg", { className: iconClass, fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" }) }));
        case "connection":
            return (_jsx("svg", { className: iconClass, fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" }) }));
        case "space_join":
            return (_jsx("svg", { className: iconClass, fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" }) }));
        case "ritual_complete":
            return (_jsx("svg", { className: iconClass, fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }));
        case "tool_create":
            return (_jsx("svg", { className: iconClass, fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" }) }));
        case "achievement":
            return (_jsx("svg", { className: iconClass, fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" }) }));
        default:
            return null;
    }
}
function getActivityColor(type) {
    switch (type) {
        case "post":
        case "space_post":
            return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
        case "comment":
            return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
        case "connection":
            return "bg-green-500/10 text-green-600 dark:text-green-400";
        case "space_join":
            return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
        case "ritual_complete":
            return "bg-primary/10 text-primary";
        case "tool_create":
            return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400";
        case "achievement":
            return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
        default:
            return "bg-muted text-muted-foreground";
    }
}
export { ActivityTimeline };
//# sourceMappingURL=activity-timeline.js.map