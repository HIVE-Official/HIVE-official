'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Crown, Shield, Eye, UserPlus, UserMinus, MoreHorizontal, Search, MapPin, GraduationCap, TrendingUp, AlertTriangle, Clock, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
export const HiveMembersSurface = ({ space, members = [], maxMembers, isBuilder = false, leaderMode, canManageMembers = false, onChangeRole, onRemoveMember, onBlockMember, onInviteMember, onMessageMember }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showMemberActions, setShowMemberActions] = useState(null);
    // Debounce search term to improve performance
    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);
    const filteredMembers = useMemo(() => {
        let filtered = members.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                member.email?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                member.major?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            const matchesRole = roleFilter === 'all' || member.role === roleFilter;
            const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
        // Sort by role hierarchy, then by last active
        filtered.sort((a, b) => {
            const roleOrder = { owner: 0, admin: 1, moderator: 2, member: 3 };
            const roleComparison = roleOrder[a.role] - roleOrder[b.role];
            if (roleComparison !== 0)
                return roleComparison;
            const aActive = a.lastActive?.getTime() || 0;
            const bActive = b.lastActive?.getTime() || 0;
            return bActive - aActive;
        });
        if (maxMembers) {
            filtered = filtered.slice(0, maxMembers);
        }
        return filtered;
    }, [members, debouncedSearchTerm, roleFilter, statusFilter, maxMembers]);
    const getRoleIcon = (role) => {
        switch (role) {
            case 'owner': return _jsx(Crown, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" });
            case 'admin': return _jsx(Shield, { className: "h-4 w-4 text-purple-400" });
            case 'moderator': return _jsx(Eye, { className: "h-4 w-4 text-blue-400" });
            default: return _jsx(Users, { className: "h-4 w-4 text-neutral-400" });
        }
    };
    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'owner': return 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)]/30';
            case 'admin': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'moderator': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default: return 'bg-white/10 text-neutral-400 border-white/20';
        }
    };
    const getStatusColor = (status, lastActive) => {
        if (status === 'suspended')
            return 'text-red-400';
        if (status === 'inactive')
            return 'text-gray-400';
        if (!lastActive)
            return 'text-gray-400';
        const hoursAgo = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60);
        if (hoursAgo < 1)
            return 'text-green-400';
        if (hoursAgo < 24)
            return 'text-yellow-400';
        return 'text-gray-400';
    };
    const formatLastActive = (date) => {
        if (!date)
            return 'Never';
        const now = Date.now();
        const diff = now - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (minutes < 5)
            return 'Online';
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        if (days < 7)
            return `${days}d ago`;
        return date.toLocaleDateString();
    };
    const memberStats = useMemo(() => {
        return {
            total: members.length,
            active: members.filter(m => m.status === 'active').length,
            leaders: members.filter(m => ['owner', 'admin', 'moderator'].includes(m.role)).length,
            newThisWeek: members.filter(m => Date.now() - m.joinedAt.getTime() < 7 * 24 * 60 * 60 * 1000).length
        };
    }, [members]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-inverse)]", children: "Members" }), _jsxs("span", { className: "text-sm text-neutral-400", children: ["(", memberStats.total, ")"] })] }), leaderMode === 'insights' && (_jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-purple-400" }), _jsx("span", { className: "text-xs text-purple-400", children: "Analytics Active" })] }))] }), canManageMembers && (_jsx("div", { className: "flex items-center gap-2", children: _jsxs("button", { onClick: onInviteMember, className: "flex items-center gap-2 px-3 py-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors", children: [_jsx(UserPlus, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: "Invite" })] }) }))] }), leaderMode === 'insights' && (_jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [_jsxs("div", { className: "bg-purple-500/10 border border-purple-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-purple-400", children: memberStats.total }), _jsx("div", { className: "text-xs text-neutral-400", children: "Total Members" })] }), _jsxs("div", { className: "bg-green-500/10 border border-green-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-green-400", children: memberStats.active }), _jsx("div", { className: "text-xs text-neutral-400", children: "Active" })] }), _jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: memberStats.leaders }), _jsx("div", { className: "text-xs text-neutral-400", children: "Leaders" })] }), _jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-yellow-400", children: memberStats.newThisWeek }), _jsx("div", { className: "text-xs text-neutral-400", children: "New This Week" })] })] })), members.length > 5 && (_jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" }), _jsx("input", { type: "text", placeholder: "Search members...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[var(--hive-text-inverse)] placeholder:text-neutral-400 focus:border-[var(--hive-brand-secondary)]/30 focus:outline-none text-sm" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("select", { value: roleFilter, onChange: (e) => setRoleFilter(e.target.value), className: "bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30", children: [_jsx("option", { value: "all", children: "All Roles" }), _jsx("option", { value: "owner", children: "Owners" }), _jsx("option", { value: "admin", children: "Admins" }), _jsx("option", { value: "moderator", children: "Moderators" }), _jsx("option", { value: "member", children: "Members" })] }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" }), _jsx("option", { value: "suspended", children: "Suspended" })] })] })] })), _jsxs("div", { className: "space-y-3", children: [_jsx(AnimatePresence, { children: filteredMembers.map((member, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { delay: index * 0.05 }, className: cn("bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:bg-white/[0.05] transition-colors", leaderMode === 'insights' && "border-purple-500/20 bg-purple-500/5"), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0", children: member.avatar ? (_jsx("img", { src: member.avatar, alt: "", className: "w-full h-full rounded-lg object-cover" })) : (_jsx("span", { className: "text-sm font-semibold text-[var(--hive-text-inverse)]", children: member.name.split(' ').map(n => n[0]).join('') })) }), _jsx("div", { className: cn("absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[var(--hive-background-primary)]", getStatusColor(member.status, member.lastActive) === 'text-green-400' && "bg-green-400", getStatusColor(member.status, member.lastActive) === 'text-yellow-400' && "bg-yellow-400", getStatusColor(member.status, member.lastActive) === 'text-red-400' && "bg-red-400", getStatusColor(member.status, member.lastActive) === 'text-gray-400' && "bg-gray-400") })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-inverse)] truncate", children: member.name }), getRoleIcon(member.role), _jsx("span", { className: cn("px-2 py-0.5 text-xs font-medium rounded-full border capitalize", getRoleBadgeColor(member.role)), children: member.role }), member.status === 'suspended' && (_jsxs("div", { className: "flex items-center gap-1 text-red-400", children: [_jsx(AlertTriangle, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "Suspended" })] }))] }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-neutral-400", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: formatLastActive(member.lastActive) })] }), member.major && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(GraduationCap, { className: "h-3 w-3" }), _jsxs("span", { children: [member.major, " \u2022 ", member.year] })] })), member.dorm && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { children: member.dorm })] }))] }), leaderMode === 'insights' && (_jsxs("div", { className: "mt-2 flex items-center gap-4 text-xs", children: [_jsxs("span", { className: "text-blue-400", children: [member.postsCount, " posts"] }), _jsxs("span", { className: "text-green-400", children: [member.engagementScore, "% engagement"] }), _jsxs("span", { className: "text-purple-400", children: [member.coordinationParticipation, " coordinations"] })] }))] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => onMessageMember?.(member.id), className: "p-2 hover:bg-white/10 rounded-lg transition-colors", title: "Send message", children: _jsx(MessageCircle, { className: "h-4 w-4 text-neutral-400 hover:text-[var(--hive-text-inverse)]" }) }), canManageMembers && member.role !== 'owner' && (_jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowMemberActions(showMemberActions === member.id ? null : member.id), className: "p-2 hover:bg-white/10 rounded-lg transition-colors", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-neutral-400" }) }), _jsx(AnimatePresence, { children: showMemberActions === member.id && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, className: "absolute right-0 top-full mt-1 w-48 bg-[var(--hive-background-primary)] border border-white/10 rounded-lg shadow-lg z-10 p-1", children: [_jsx("div", { className: "px-3 py-1 text-xs font-medium text-neutral-400", children: "Change Role" }), ['admin', 'moderator', 'member'].map((role) => (_jsxs("button", { onClick: () => {
                                                                        onChangeRole?.(member.id, role);
                                                                        setShowMemberActions(null);
                                                                    }, disabled: member.role === role, className: cn("w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-white/5 rounded transition-colors capitalize", member.role === role && "opacity-50 cursor-not-allowed"), children: [getRoleIcon(role), role] }, role))), _jsx("hr", { className: "border-white/10 my-1" }), _jsxs("button", { onClick: () => {
                                                                        onBlockMember?.(member.id);
                                                                        setShowMemberActions(null);
                                                                    }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-white/5 rounded transition-colors text-yellow-400", children: [_jsx(Eye, { className: "h-4 w-4" }), member.status === 'suspended' ? 'Unsuspend' : 'Suspend'] }), _jsxs("button", { onClick: () => {
                                                                        onRemoveMember?.(member.id);
                                                                        setShowMemberActions(null);
                                                                    }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-red-500/10 rounded transition-colors text-red-400", children: [_jsx(UserMinus, { className: "h-4 w-4" }), "Remove Member"] })] })) })] }))] })] }) }, member.id))) }), filteredMembers.length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx(Users, { className: "h-12 w-12 mx-auto mb-3 text-neutral-400 opacity-50" }), _jsx("p", { className: "text-neutral-400", children: "No members found" }), _jsx("p", { className: "text-sm text-neutral-500 mt-1", children: "Try adjusting your search or filters" })] }))] }), maxMembers && members.length > maxMembers && (_jsx("div", { className: "text-center pt-4", children: _jsxs("button", { className: "text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors text-sm font-medium", children: ["View all ", members.length, " members"] }) }))] }));
};
export default HiveMembersSurface;
//# sourceMappingURL=hive-members-surface.js.map