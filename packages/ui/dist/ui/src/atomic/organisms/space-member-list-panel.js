"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Users, Crown, Shield, User, UserPlus, MessageCircle, MoreVertical, Search, X, Clock, Settings, } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "../atoms/avatar.js";
import { Badge } from "../atoms/badge.js";
import { Button } from "../atoms/button.js";
import { Input } from "../atoms/input.js";
const ROLE_CONFIGS = {
    owner: {
        label: "Owner",
        icon: Crown,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
        priority: 1,
    },
    admin: {
        label: "Admin",
        icon: Shield,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        priority: 2,
    },
    moderator: {
        label: "Mod",
        icon: Settings,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        priority: 3,
    },
    member: {
        label: "Member",
        icon: User,
        color: "text-gray-400",
        bgColor: "bg-gray-500/10",
        priority: 4,
    },
};
const DEFAULT_COPY = {
    title: "Members",
    searchPlaceholder: "Search members...",
    emptyDefault: "No members in this category",
    emptySearch: "No members found",
    onlineTab: "Online",
    offlineTab: "Offline",
    allTab: "All",
    inviteTooltip: "Invite member",
    onlineLabel: "online",
    totalMembersLabel: "total members",
};
function normalizeDate(value) {
    if (!value)
        return null;
    if (value instanceof Date)
        return value;
    const timestamp = typeof value === "string" ? Date.parse(value) : value;
    if (Number.isNaN(timestamp))
        return null;
    return new Date(timestamp);
}
export function SpaceMemberListPanel({ members: rawMembers = [], currentUserMembership, isLoading = false, initialTab = "online", onClose, onInviteClick, onSearchChange, onMessageMember, onMemberAction, canManageMembers, copy, showCloseButton = true, }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState(initialTab);
    const mergedCopy = useMemo(() => ({
        ...DEFAULT_COPY,
        ...copy,
    }), [copy]);
    const normalizedMembers = useMemo(() => {
        return rawMembers
            .map((member) => ({
            ...member,
            lastSeen: normalizeDate(member.lastSeen),
        }))
            .sort((a, b) => {
            const roleA = ROLE_CONFIGS[a.role]?.priority ?? ROLE_CONFIGS.member.priority;
            const roleB = ROLE_CONFIGS[b.role]?.priority ?? ROLE_CONFIGS.member.priority;
            if (roleA !== roleB)
                return roleA - roleB;
            if (a.isOnline !== b.isOnline) {
                return a.isOnline ? -1 : 1;
            }
            return a.displayName.localeCompare(b.displayName);
        });
    }, [rawMembers]);
    const filteredMembers = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return normalizedMembers.filter((member) => {
            const matchesTab = activeTab === "all" ||
                (activeTab === "online" && member.isOnline) ||
                (activeTab === "offline" && !member.isOnline);
            if (!matchesTab)
                return false;
            if (!query)
                return true;
            const handle = member.handle ?? "";
            return (member.displayName.toLowerCase().includes(query) ||
                handle.toLowerCase().includes(query));
        });
    }, [normalizedMembers, activeTab, searchQuery]);
    const resolvedCanManageMembers = typeof canManageMembers === "boolean"
        ? canManageMembers
        : !!currentUserMembership &&
            (currentUserMembership.role === "admin" || currentUserMembership.role === "owner");
    const onlineCount = normalizedMembers.filter((member) => member.isOnline).length;
    const totalCount = normalizedMembers.length;
    const handleSearchChange = (value) => {
        setSearchQuery(value);
        onSearchChange?.(value);
    };
    return (_jsxs("div", { className: "h-full flex flex-col bg-gray-950", children: [_jsxs("div", { className: "p-4 border-b border-gray-800", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Users, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsx("h3", { className: "text-lg font-semibold text-white", children: mergedCopy.title }), _jsx(Badge, { variant: "secondary", className: "text-xs", children: totalCount })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [resolvedCanManageMembers && (_jsx(Button, { variant: "secondary", size: "sm", onClick: onInviteClick, "aria-label": mergedCopy.inviteTooltip, title: mergedCopy.inviteTooltip, children: _jsx(UserPlus, { className: "w-4 h-4" }) })), showCloseButton && onClose ? (_jsx("button", { onClick: onClose, className: "p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors lg:hidden", "aria-label": "Close members panel", children: _jsx(X, { className: "w-4 h-4" }) })) : null] })] }), _jsxs("div", { className: "relative mb-4", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx(Input, { value: searchQuery, onChange: (event) => handleSearchChange(event.target.value), placeholder: mergedCopy.searchPlaceholder, className: "pl-10 bg-gray-800 border-gray-700 text-white text-sm" })] }), _jsxs("div", { className: "flex space-x-1 bg-gray-800 rounded-lg p-1", children: [_jsxs("button", { onClick: () => setActiveTab("online"), className: `flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${activeTab === "online"
                                    ? "bg-green-500/20 text-green-400"
                                    : "text-gray-400 hover:text-white"}`, children: [mergedCopy.onlineTab, " \u2014 ", onlineCount] }), _jsxs("button", { onClick: () => setActiveTab("offline"), className: `flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${activeTab === "offline"
                                    ? "bg-gray-600/20 text-gray-300"
                                    : "text-gray-400 hover:text-white"}`, children: [mergedCopy.offlineTab, " \u2014 ", totalCount - onlineCount] }), _jsx("button", { onClick: () => setActiveTab("all"), className: `flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${activeTab === "all"
                                    ? "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]"
                                    : "text-gray-400 hover:text-white"}`, children: mergedCopy.allTab })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: isLoading ? (_jsx("div", { className: "p-4 space-y-3", children: Array.from({ length: 8 }).map((_, index) => (_jsxs("div", { className: "animate-pulse flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-gray-700 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "h-4 bg-gray-700 rounded w-3/4 mb-1" }), _jsx("div", { className: "h-3 bg-gray-800 rounded w-1/2" })] })] }, index))) })) : filteredMembers.length === 0 ? (_jsxs("div", { className: "p-4 text-center", children: [_jsx(Users, { className: "w-8 h-8 text-gray-500 mx-auto mb-2" }), _jsx("p", { className: "text-gray-400 text-sm", children: searchQuery ? mergedCopy.emptySearch : mergedCopy.emptyDefault })] })) : (_jsx("div", { className: "p-2", children: filteredMembers.map((member) => (_jsx(MemberItem, { member: member, currentUserMembership: currentUserMembership ?? null, onMessageMember: onMessageMember, onMemberAction: onMemberAction }, member.id))) })) }), _jsx("div", { className: "p-4 border-t border-gray-800 bg-gray-900/50", children: _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-400", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsxs("span", { children: [onlineCount, " ", mergedCopy.onlineLabel] })] }), _jsxs("span", { children: [totalCount, " ", mergedCopy.totalMembersLabel] })] }) })] }));
}
function MemberItem({ member, currentUserMembership, onMessageMember, onMemberAction, }) {
    const config = ROLE_CONFIGS[member.role] ?? ROLE_CONFIGS.member;
    const RoleIcon = config.icon;
    const isCurrentUser = currentUserMembership?.userId === member.userId;
    const lastSeenAt = member.lastSeen instanceof Date ? member.lastSeen : null;
    const canOpenActions = currentUserMembership &&
        (currentUserMembership.role === "owner" ||
            (currentUserMembership.role === "admin" && member.role === "member")) &&
        !isCurrentUser;
    return (_jsxs("div", { className: "group flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors", children: [_jsxs("div", { className: "relative", children: [_jsx(Avatar, { src: member.avatarUrl ?? undefined, fallback: member.displayName?.[0]?.toUpperCase(), className: "w-8 h-8" }), _jsx("div", { className: `absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-gray-950 rounded-full ${member.isOnline ? "bg-green-500" : "bg-gray-500"}` })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: "text-sm font-medium text-white truncate", children: [member.displayName, isCurrentUser ? (_jsx("span", { className: "text-xs text-gray-400 ml-1", children: "(you)" })) : null] }), _jsxs("div", { className: `flex items-center space-x-1 px-2 py-0.5 rounded text-xs ${config.bgColor}`, children: [_jsx(RoleIcon, { className: `w-3 h-3 ${config.color}` }), _jsx("span", { className: config.color, children: config.label })] })] }), _jsxs("div", { className: "flex items-center space-x-2 text-xs text-gray-400", children: [member.handle ? _jsxs("span", { children: ["@", member.handle] }) : null, !member.isOnline && lastSeenAt ? (_jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsxs("span", { children: ["Last seen ", formatDistanceToNow(lastSeenAt, { addSuffix: true })] })] })) : null] })] }), _jsxs("div", { className: "flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [_jsx("button", { type: "button", className: "p-1 text-gray-400 hover:text-[var(--hive-brand-primary)] hover:bg-gray-700 rounded transition-colors", onClick: () => onMessageMember?.(member), "aria-label": `Message ${member.displayName}`, children: _jsx(MessageCircle, { className: "w-4 h-4" }) }), canOpenActions ? (_jsx("button", { type: "button", className: "p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors", onClick: () => onMemberAction?.(member), "aria-label": `Manage ${member.displayName}`, children: _jsx(MoreVertical, { className: "w-4 h-4" }) })) : null] })] }));
}
//# sourceMappingURL=space-member-list-panel.js.map