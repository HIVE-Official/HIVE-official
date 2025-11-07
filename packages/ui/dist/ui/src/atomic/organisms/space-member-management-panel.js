"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Users, Crown, Shield, UserCheck, User, UserPlus, Search, AlertTriangle, CheckCircle, Ban, UserMinus, Eye, Settings, X, } from "lucide-react";
import { Badge } from "../atoms/badge.js";
import { Button } from "../atoms/button.js";
const roleHierarchy = {
    owner: 4,
    admin: 3,
    moderator: 2,
    member: 1,
};
const roleConfig = {
    owner: {
        label: "Owner",
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
        icon: Crown,
        description: "Full space control",
    },
    admin: {
        label: "Admin",
        color: "text-purple-400",
        bg: "bg-purple-500/20",
        icon: Shield,
        description: "Management permissions",
    },
    moderator: {
        label: "Moderator",
        color: "text-blue-400",
        bg: "bg-blue-500/20",
        icon: UserCheck,
        description: "Content moderation",
    },
    member: {
        label: "Member",
        color: "text-green-400",
        bg: "bg-green-500/20",
        icon: User,
        description: "Standard access",
    },
};
const defaultStats = {
    postsCount: 0,
    eventsAttended: 0,
    contributionScore: 0,
};
const defaultPermissions = {
    canPost: true,
    canCreateEvents: false,
    canInviteMembers: false,
    canModerate: false,
};
const defaultFlags = {
    isReported: false,
    warningCount: 0,
    isSuspended: false,
};
function toDate(value) {
    if (value instanceof Date)
        return value;
    if (typeof value === "number")
        return new Date(value);
    if (typeof value === "string") {
        const parsed = Date.parse(value);
        return Number.isNaN(parsed) ? new Date() : new Date(parsed);
    }
    return new Date();
}
function normalizeMembers(members) {
    return members.map((member) => ({
        ...member,
        joinedAt: toDate(member.joinedAt),
        lastActive: toDate(member.lastActive ?? member.joinedAt),
        stats: {
            ...defaultStats,
            ...member.stats,
        },
        permissions: {
            ...defaultPermissions,
            ...member.permissions,
        },
        flags: {
            ...defaultFlags,
            ...member.flags,
        },
    }));
}
export function SpaceMemberManagementPanel({ spaceName, members, currentUserRole, isLoading = false, open = true, onClose, onInviteClick, onChangeRole, onSuspendMember, onRemoveMember, onViewMember, canChangeRoles, canRemoveMembers, canSuspendMembers, canInviteMembers, }) {
    const [membersState, setMembersState] = useState(() => normalizeMembers(members));
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [showRoleChangeModal, setShowRoleChangeModal] = useState(false);
    useEffect(() => {
        setMembersState(normalizeMembers(members));
    }, [members]);
    useEffect(() => {
        if (!showRoleChangeModal) {
            setSelectedMemberId(null);
        }
    }, [showRoleChangeModal]);
    const effectiveCanChangeRoles = typeof canChangeRoles === "boolean"
        ? canChangeRoles
        : currentUserRole === "owner" || currentUserRole === "admin";
    const effectiveCanRemoveMembers = typeof canRemoveMembers === "boolean"
        ? canRemoveMembers
        : currentUserRole === "owner" || currentUserRole === "admin";
    const effectiveCanSuspendMembers = typeof canSuspendMembers === "boolean" ? canSuspendMembers : true;
    const effectiveCanInviteMembers = typeof canInviteMembers === "boolean" ? canInviteMembers : true;
    const filteredMembers = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return membersState
            .filter((member) => {
            if (query) {
                const baseMatch = member.name.toLowerCase().includes(query) ||
                    member.username.toLowerCase().includes(query) ||
                    member.email?.toLowerCase().includes(query);
                if (!baseMatch)
                    return false;
            }
            if (selectedRole !== "all" && member.role !== selectedRole) {
                return false;
            }
            if (selectedStatus !== "all" && member.status !== selectedStatus) {
                return false;
            }
            return true;
        })
            .sort((a, b) => {
            const roleA = roleHierarchy[a.role];
            const roleB = roleHierarchy[b.role];
            if (roleA !== roleB) {
                return roleB - roleA;
            }
            return a.joinedAt.getTime() - b.joinedAt.getTime();
        });
    }, [membersState, searchQuery, selectedRole, selectedStatus]);
    const ownersCount = membersState.filter((member) => member.role === "owner").length;
    const adminsCount = membersState.filter((member) => member.role === "admin").length;
    const suspendedCount = membersState.filter((member) => member.flags?.isSuspended).length;
    const selectedMember = selectedMemberId
        ? membersState.find((member) => member.id === selectedMemberId) ?? null
        : null;
    const handleRequestRoleChange = (memberId, role) => {
        setMembersState((prev) => prev.map((member) => member.id === memberId
            ? {
                ...member,
                role,
            }
            : member));
        onChangeRole?.(memberId, role);
        setShowRoleChangeModal(false);
        setSelectedMemberId(null);
    };
    const handleRequestSuspend = (memberId, suspend) => {
        if (!effectiveCanSuspendMembers)
            return;
        setMembersState((prev) => prev.map((member) => member.id === memberId
            ? {
                ...member,
                status: suspend ? "suspended" : "active",
                flags: {
                    ...member.flags,
                    isSuspended: suspend,
                },
            }
            : member));
        onSuspendMember?.(memberId, suspend);
    };
    const handleRequestRemove = (memberId) => {
        if (!effectiveCanRemoveMembers)
            return;
        setMembersState((prev) => prev.filter((member) => member.id !== memberId));
        onRemoveMember?.(memberId);
    };
    if (!open) {
        return null;
    }
    if (isLoading) {
        return (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsx("div", { className: "bg-hive-background-primary border border-hive-border-default rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden", children: _jsx("div", { className: "p-6", children: _jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "h-6 bg-gray-600 rounded w-48" }), Array.from({ length: 5 }).map((_, index) => (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-gray-600 rounded-full" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 bg-gray-600 rounded w-32" }), _jsx("div", { className: "h-3 bg-gray-700 rounded w-24" })] })] }, index)))] }) }) }) }));
    }
    return (_jsxs("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: [_jsxs(motion.div, { className: "bg-hive-background-primary border border-hive-border-default rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden", initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-white/[0.06]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Users, { className: "h-6 w-6 text-[var(--hive-brand-primary)]" }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-white", children: "Member Management" }), _jsxs("p", { className: "text-sm text-gray-400", children: [spaceName, " \u2022 ", membersState.length, " members"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [effectiveCanInviteMembers ? (_jsxs(Button, { size: "sm", className: "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/30 hover:bg-[var(--hive-brand-primary)]/30", onClick: onInviteClick, children: [_jsx(UserPlus, { className: "h-4 w-4 mr-2" }), "Invite Members"] })) : null, _jsx(Button, { variant: "secondary", size: "sm", className: "border-white/[0.2] text-white hover:bg-white/[0.1]", onClick: onClose, children: _jsx(X, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { className: "p-6 border-b border-white/[0.06]", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Search members...", value: searchQuery, onChange: (event) => setSearchQuery(event.target.value), className: "w-full pl-10 pr-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/50 focus:border-[var(--hive-brand-primary)]/30" })] }), _jsxs("select", { value: selectedRole, onChange: (event) => setSelectedRole(event.target.value), className: "px-3 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/50", children: [_jsx("option", { value: "all", children: "All Roles" }), _jsx("option", { value: "owner", children: "Owners" }), _jsx("option", { value: "admin", children: "Admins" }), _jsx("option", { value: "moderator", children: "Moderators" }), _jsx("option", { value: "member", children: "Members" })] }), _jsxs("select", { value: selectedStatus, onChange: (event) => setSelectedStatus(event.target.value), className: "px-3 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/50", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" }), _jsx("option", { value: "suspended", children: "Suspended" })] })] }), _jsxs("div", { className: "flex items-center gap-6 text-sm text-gray-400", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4" }), _jsxs("span", { children: [filteredMembers.length, " showing"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Crown, { className: "w-4 h-4 text-yellow-400" }), _jsxs("span", { children: [ownersCount, " owners"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "w-4 h-4 text-purple-400" }), _jsxs("span", { children: [adminsCount, " admins"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "w-4 h-4 text-red-400" }), _jsxs("span", { children: [suspendedCount, " suspended"] })] })] })] }), _jsx("div", { className: "p-6 overflow-y-auto max-h-[calc(90vh-300px)]", children: _jsx("div", { className: "space-y-3", children: filteredMembers.map((member) => {
                                const config = roleConfig[member.role];
                                const RoleIcon = config.icon;
                                const canManageMember = effectiveCanChangeRoles &&
                                    roleHierarchy[currentUserRole] > roleHierarchy[member.role];
                                return (_jsxs(motion.div, { className: "flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/[0.1] transition-all", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, layout: true, children: [_jsx("div", { className: "flex-shrink-0", children: member.avatar ? (_jsx("img", { src: member.avatar, alt: "", className: "w-12 h-12 rounded-full object-cover" })) : (_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-gray-500/20 to-gray-700/20 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-sm font-medium text-white", children: member.name.charAt(0).toUpperCase() }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-medium text-white truncate", children: member.name }), _jsxs("span", { className: "text-sm text-gray-400", children: ["@", member.username] }), _jsxs("div", { className: `flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.bg} ${config.color}`, children: [_jsx(RoleIcon, { className: "w-3 h-3" }), _jsx("span", { children: config.label })] }), member.flags?.isSuspended ? (_jsx(Badge, { variant: "freshman", className: "border-red-500/30 text-red-400", children: "Suspended" })) : null, member.flags?.isReported ? (_jsx(Badge, { variant: "freshman", className: "border-orange-500/30 text-orange-400", children: "Reported" })) : null] }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-400", children: [_jsxs("span", { children: ["Joined ", member.joinedAt.toLocaleDateString()] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: [member.stats.postsCount, " posts"] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: [member.stats.eventsAttended, " events"] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: ["Score: ", member.stats.contributionScore] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "secondary", size: "sm", className: "border-white/[0.2] text-white hover:bg-white/[0.1]", onClick: () => onViewMember?.(member), children: _jsx(Eye, { className: "h-4 w-4" }) }), canManageMember ? (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "secondary", size: "sm", className: "border-blue-500/30 text-blue-400 hover:bg-blue-500/10", onClick: () => {
                                                                setSelectedMemberId(member.id);
                                                                setShowRoleChangeModal(true);
                                                            }, children: _jsx(Settings, { className: "h-4 w-4" }) }), effectiveCanSuspendMembers ? (_jsx(Button, { variant: "secondary", size: "sm", className: member.flags?.isSuspended
                                                                ? "border-green-500/30 text-green-400 hover:bg-green-500/10"
                                                                : "border-orange-500/30 text-orange-400 hover:bg-orange-500/10", onClick: () => handleRequestSuspend(member.id, !member.flags?.isSuspended), children: member.flags?.isSuspended ? (_jsx(CheckCircle, { className: "h-4 w-4" })) : (_jsx(Ban, { className: "h-4 w-4" })) })) : null, effectiveCanRemoveMembers && member.role !== "owner" ? (_jsx(Button, { variant: "secondary", size: "sm", className: "border-red-500/30 text-red-400 hover:bg-red-500/10", onClick: () => handleRequestRemove(member.id), children: _jsx(UserMinus, { className: "h-4 w-4" }) })) : null] })) : null] })] }, member.id));
                            }) }) })] }), _jsx(AnimatePresence, { children: showRoleChangeModal && selectedMember ? (_jsx(motion.div, { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: _jsxs(motion.div, { className: "bg-hive-background-primary border border-hive-border-default rounded-2xl p-6 w-full max-w-md", initial: { scale: 0.9 }, animate: { scale: 1 }, exit: { scale: 0.9 }, children: [_jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Change Member Role" }), _jsxs("p", { className: "text-sm text-gray-400 mb-6", children: ["Change role for ", _jsx("strong", { children: selectedMember.name })] }), _jsx("div", { className: "space-y-3 mb-6", children: Object.entries(roleConfig).map(([role, config]) => {
                                    const Icon = config.icon;
                                    const canAssign = roleHierarchy[currentUserRole] > roleHierarchy[role] &&
                                        selectedMember.role !== role;
                                    return (_jsxs("button", { className: `w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${selectedMember.role === role
                                            ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                                            : canAssign
                                                ? "bg-white/[0.02] border-white/[0.06] text-white hover:border-white/[0.1]"
                                                : "bg-gray-500/10 border-gray-500/20 text-gray-500 cursor-not-allowed"}`, onClick: () => {
                                            if (!canAssign)
                                                return;
                                            handleRequestRoleChange(selectedMember.id, role);
                                        }, disabled: !canAssign, children: [_jsx(Icon, { className: "w-5 h-5" }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-medium", children: config.label }), _jsx("div", { className: "text-xs opacity-70", children: config.description })] })] }, role));
                                }) }), _jsx("div", { className: "flex gap-3", children: _jsx(Button, { variant: "secondary", className: "flex-1 border-white/[0.2] text-white hover:bg-white/[0.1]", onClick: () => {
                                        setShowRoleChangeModal(false);
                                        setSelectedMemberId(null);
                                    }, children: "Cancel" }) })] }) })) : null })] }));
}
//# sourceMappingURL=space-member-management-panel.js.map