"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { UserCard } from "../molecules/user-card.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs.js";
import { cn } from "../../lib/utils.js";
const ConnectionList = React.forwardRef(({ className, connections, variant = "following", following = [], showActions = true, onToggleFollow, onConnectionClick, ...props }, ref) => {
    if (variant === "both") {
        return (_jsx("div", { ref: ref, className: cn("w-full", className), ...props, children: _jsxs(Tabs, { defaultValue: "followers", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsxs(TabsTrigger, { value: "followers", children: ["Followers", _jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: connections.length })] }), _jsxs(TabsTrigger, { value: "following", children: ["Following", _jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: following.length })] })] }), _jsx(TabsContent, { value: "followers", className: "mt-6", children: connections.length === 0 ? (_jsx(EmptyState, { text: "No followers yet" })) : (_jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: connections.map((connection) => (_jsx(ConnectionCard, { connection: connection, showActions: showActions, onToggleFollow: onToggleFollow, onConnectionClick: onConnectionClick }, connection.id))) })) }), _jsx(TabsContent, { value: "following", className: "mt-6", children: following.length === 0 ? (_jsx(EmptyState, { text: "Not following anyone yet" })) : (_jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: following.map((connection) => (_jsx(ConnectionCard, { connection: connection, showActions: showActions, onToggleFollow: onToggleFollow, onConnectionClick: onConnectionClick }, connection.id))) })) })] }) }));
    }
    return (_jsx("div", { ref: ref, className: cn("w-full", className), ...props, children: connections.length === 0 ? (_jsx(EmptyState, { text: variant === "following"
                ? "Not following anyone yet"
                : "No followers yet" })) : (_jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: connections.map((connection) => (_jsx(ConnectionCard, { connection: connection, showActions: showActions, onToggleFollow: onToggleFollow, onConnectionClick: onConnectionClick }, connection.id))) })) }));
});
ConnectionList.displayName = "ConnectionList";
function ConnectionCard({ connection, showActions, onToggleFollow, onConnectionClick, }) {
    const handleClick = () => {
        onConnectionClick?.(connection.id);
    };
    const handleToggleFollow = () => {
        onToggleFollow?.(connection.id, !connection.isFollowing);
    };
    // Format badge: major + year, or just verified status
    const badge = connection.major && connection.academicYear
        ? `${connection.major} • ${connection.academicYear}`
        : connection.verified
            ? "Verified"
            : undefined;
    return (_jsx("div", { className: "relative", onClick: handleClick, children: _jsx(UserCard, { name: connection.name, handle: connection.handle, avatar: connection.avatarUrl, bio: connection.bio || (connection.mutualConnections ?
                `${connection.mutualConnections} mutual ${connection.mutualConnections === 1 ? 'connection' : 'connections'}`
                : undefined), badge: badge, badgeVariant: "secondary", actionLabel: showActions && onToggleFollow ? (connection.isFollowing ? "Following" : "Follow") : undefined, onAction: showActions && onToggleFollow ? handleToggleFollow : undefined, actionVariant: connection.isFollowing ? "outline" : "default" }) }));
}
// Empty state component
function EmptyState({ text }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 px-4 text-center", children: [_jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4", children: _jsx("svg", { className: "h-8 w-8 text-muted-foreground", fill: "none", strokeWidth: "1.5", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" }) }) }), _jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: text }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Connect with people to build your network" })] }));
}
export { ConnectionList };
//# sourceMappingURL=connection-list.js.map