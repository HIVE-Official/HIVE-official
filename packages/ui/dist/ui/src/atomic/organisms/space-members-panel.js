"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card.js";
import { Badge } from "../atoms/badge.js";
import { Button } from "../atoms/button.js";
import { cn } from "../../lib/utils.js";
const SpaceMembersPanel = React.forwardRef(({ className, members = [], totalMemberCount, previewLimit = 6, canInvite = false, showOnlineStatus = true, emptyStateMessage = "No members yet", isLoading = false, onAction, 
// Legacy handlers
onInvite, onViewAll, onMemberClick, ...props }, ref) => {
    // Aggregated event handlers
    const handleInvite = React.useCallback(() => {
        onInvite?.();
        onAction?.({ type: "member.invite" });
    }, [onInvite, onAction]);
    const handleViewAll = React.useCallback(() => {
        onViewAll?.();
        onAction?.({ type: "member.viewAll" });
    }, [onViewAll, onAction]);
    const handleMemberClick = React.useCallback((member) => {
        onMemberClick?.(member);
        onAction?.({ type: "member.click", memberId: member.userId });
    }, [onMemberClick, onAction]);
    // Preview members (limited count)
    const previewMembers = React.useMemo(() => {
        return members.slice(0, previewLimit);
    }, [members, previewLimit]);
    // Calculate total count
    const totalCount = totalMemberCount ?? members.length;
    const hasMore = totalCount > previewMembers.length;
    // Get role badge color
    const getRoleBadgeVariant = (role) => {
        switch (role) {
            case "founder":
                return "default";
            case "leader":
                return "default";
            case "moderator":
                return "secondary";
            default:
                return "outline";
        }
    };
    return (_jsxs(Card, { ref: ref, className: cn("transition-all duration-smooth", className), ...props, children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CardTitle, { className: "text-lg font-semibold tracking-tight leading-tight", children: "Members" }), totalCount > 0 && (_jsx(Badge, { variant: "sophomore", className: "text-xs", children: totalCount }))] }), canInvite && (onInvite || onAction) && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: handleInvite, disabled: isLoading, className: "h-8 px-2 transition-all duration-smooth", children: [_jsx("svg", { className: "h-3.5 w-3.5 mr-1", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" }) }), _jsx("span", { className: "text-xs", children: "Invite" })] }))] }) }), _jsx(CardContent, { className: "space-y-3", children: previewMembers.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-center", children: [_jsx("svg", { className: "h-12 w-12 text-white/30 mb-3", fill: "none", strokeWidth: "1.5", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" }) }), _jsx("p", { className: "text-sm text-white/70", children: emptyStateMessage }), canInvite && (onInvite || onAction) && (_jsxs(Button, { variant: "outline", size: "sm", onClick: handleInvite, disabled: isLoading, className: "mt-3 transition-all duration-smooth", children: [_jsx("svg", { className: "h-4 w-4 mr-1.5", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" }) }), "Invite Members"] }))] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-3 gap-2", children: previewMembers.map((member) => (_jsxs("div", { onClick: () => handleMemberClick(member), className: cn("group relative flex flex-col items-center p-2 rounded-lg border border-white/8 bg-[#0c0c0c] transition-all duration-smooth", (onMemberClick || onAction) && "cursor-pointer hover:border-white/20 hover:bg-white/10"), children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "h-12 w-12 overflow-hidden rounded-full border-2 border-white/8 bg-white/10", children: member.avatar ? (_jsx("img", { src: member.avatar, alt: member.name, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-[#FFD700]/10 text-[#FFD700] text-xs font-semibold", children: member.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .slice(0, 2)
                                                        .toUpperCase() })) }), showOnlineStatus && member.isOnline && (_jsx("div", { className: "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0c0c0c] bg-green-500" }))] }), _jsx("p", { className: "mt-1.5 text-xs font-medium text-white text-center line-clamp-1 w-full", children: member.name.split(" ")[0] }), member.role && member.role !== "member" && (_jsx(Badge, { variant: getRoleBadgeVariant(member.role), className: "mt-1 text-[10px] h-4 px-1.5 capitalize", children: member.role }))] }, member.userId))) }), (onViewAll || onAction) && (_jsxs(Button, { variant: "outline", size: "sm", onClick: handleViewAll, disabled: isLoading, className: "w-full mt-2 transition-all duration-smooth", children: [hasMore ? `View All ${totalCount} Members` : "View All Members", _jsx("svg", { className: "h-3.5 w-3.5 ml-1.5", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 4.5l7.5 7.5-7.5 7.5" }) })] }))] })) })] }));
});
SpaceMembersPanel.displayName = "SpaceMembersPanel";
export { SpaceMembersPanel };
//# sourceMappingURL=space-members-panel.js.map