'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
import { Users, Search, Filter, UserPlus, MoreVertical, Crown, Shield, User, X, Check, Clock, UserMinus, Settings, Eye, Hash, Calendar, Activity, MessageCircle } from 'lucide-react';
const ROLE_CONFIG = {
    leader: {
        label: 'Leader',
        icon: _jsx(Crown, { className: "w-4 h-4" }),
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-400/10',
        borderColor: 'border-yellow-400/30',
    },
    co_leader: {
        label: 'Co-Leader',
        icon: _jsx(Shield, { className: "w-4 h-4" }),
        color: 'text-purple-400',
        bgColor: 'bg-purple-400/10',
        borderColor: 'border-purple-400/30',
    },
    member: {
        label: 'Member',
        icon: _jsx(User, { className: "w-4 h-4" }),
        color: 'text-[var(--hive-text-secondary)]',
        bgColor: 'bg-[var(--hive-background-tertiary)]/40',
        borderColor: 'border-[var(--hive-border-primary)]/20',
    },
    pending: {
        label: 'Pending',
        icon: _jsx(Clock, { className: "w-4 h-4" }),
        color: 'text-orange-400',
        bgColor: 'bg-orange-400/10',
        borderColor: 'border-orange-400/30',
    },
};
const FILTER_OPTIONS = [
    { value: 'all', label: 'All Members', icon: _jsx(Users, { className: "w-4 h-4" }) },
    { value: 'leaders', label: 'Leaders', icon: _jsx(Crown, { className: "w-4 h-4" }) },
    { value: 'members', label: 'Members', icon: _jsx(User, { className: "w-4 h-4" }) },
    { value: 'pending', label: 'Pending', icon: _jsx(Clock, { className: "w-4 h-4" }) },
    { value: 'online', label: 'Online', icon: _jsx(Activity, { className: "w-4 h-4" }) },
];
export const SpaceMemberDirectory = ({ members, currentUserRole, spaceType, onInviteMembers, onManageMember, onViewMemberProfile, onMessageMember, onApproveMember, onRejectMember, className }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const canManageMembers = currentUserRole === 'leader' || currentUserRole === 'co_leader';
    const filteredMembers = useMemo(() => {
        const filtered = members.filter(member => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesHandle = member.handle.toLowerCase().includes(query);
                const matchesName = member.displayName.toLowerCase().includes(query);
                const matchesMajor = member.major?.toLowerCase().includes(query);
                if (!matchesHandle && !matchesName && !matchesMajor)
                    return false;
            }
            // Role/status filter
            switch (selectedFilter) {
                case 'leaders':
                    return member.role === 'leader' || member.role === 'co_leader';
                case 'members':
                    return member.role === 'member';
                case 'pending':
                    return member.status === 'pending';
                case 'online':
                    return member.isOnline;
                default:
                    return true;
            }
        });
        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'role': {
                    const roleOrder = { leader: 0, co_leader: 1, member: 2, pending: 3 };
                    return roleOrder[a.role] - roleOrder[b.role];
                }
                case 'joined':
                    return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
                case 'activity': {
                    const aActivity = a.lastActive ? new Date(a.lastActive).getTime() : 0;
                    const bActivity = b.lastActive ? new Date(b.lastActive).getTime() : 0;
                    return bActivity - aActivity;
                }
                default:
                    return a.displayName.localeCompare(b.displayName);
            }
        });
        return filtered;
    }, [members, searchQuery, selectedFilter, sortBy]);
    const pendingMembers = members.filter(m => m.status === 'pending');
    const onlineMembers = members.filter(m => m.isOnline).length;
    const handleMemberAction = async (memberId, action) => {
        if (!onManageMember)
            return;
        try {
            await onManageMember(memberId, action);
            setSelectedMember(null);
        }
        catch (error) {
            console.error('Failed to manage member:', error);
        }
    };
    const MemberCard = ({ member }) => {
        const roleConfig = ROLE_CONFIG[member.role];
        const isSelected = selectedMember === member.id;
        return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: cn('p-4 rounded-2xl border transition-all duration-200', 'bg-gradient-to-br from-[var(--hive-background-secondary)]/60 via-[var(--hive-background-tertiary)]/40 to-[var(--hive-background-interactive)]/60', 'border-[var(--hive-border-primary)]/20', 'hover:border-[var(--hive-brand-primary)]/30 hover:bg-[var(--hive-brand-primary)]/5', member.status === 'pending' && 'border-orange-400/30 bg-orange-400/5', member.status === 'banned' && 'border-red-400/30 bg-red-400/5 opacity-60'), children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: cn('w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold', 'bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-secondary)]/20', 'border border-[var(--hive-border-primary)]/20'), children: member.avatar ? (_jsx("img", { src: member.avatar, alt: member.displayName, className: "w-full h-full rounded-2xl object-cover" })) : (_jsx("span", { className: "text-[var(--hive-text-primary)]", children: member.displayName.charAt(0).toUpperCase() })) }), member.isOnline && (_jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-[var(--hive-background-secondary)] rounded-full" }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] truncate", children: member.displayName }), _jsxs("div", { className: cn('px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1', roleConfig.bgColor, roleConfig.borderColor, roleConfig.color, 'border'), children: [roleConfig.icon, _jsx("span", { children: roleConfig.label })] })] }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-2", children: ["@", member.handle] }), member.major && (_jsxs("p", { className: "text-xs text-[var(--hive-text-muted)] mb-2", children: [member.major, " ", member.year && `• ${member.year}`] })), _jsxs("div", { className: "flex items-center gap-4 text-xs text-[var(--hive-text-muted)]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Hash, { className: "w-3 h-3" }), _jsxs("span", { children: [member.postsCount, " posts"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsxs("span", { children: [member.eventsAttended, " events"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Settings, { className: "w-3 h-3" }), _jsxs("span", { children: [member.toolsUsed, " tools"] })] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [member.status === 'pending' && canManageMembers && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => onApproveMember?.(member.id), className: "w-8 h-8 rounded-lg bg-green-400/10 text-green-400 hover:bg-green-400/20 transition-colors duration-200 flex items-center justify-center", children: _jsx(Check, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => onRejectMember?.(member.id), className: "w-8 h-8 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors duration-200 flex items-center justify-center", children: _jsx(X, { className: "w-4 h-4" }) })] })), member.status === 'active' && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => onViewMemberProfile?.(member.id), className: "w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-brand-primary)]/10 transition-all duration-200 flex items-center justify-center", children: _jsx(Eye, { className: "w-4 h-4" }) }), onMessageMember && (_jsx("button", { onClick: () => onMessageMember(member.id), className: "w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-brand-primary)]/10 transition-all duration-200 flex items-center justify-center", children: _jsx(MessageCircle, { className: "w-4 h-4" }) })), canManageMembers && member.role !== 'leader' && (_jsx("button", { onClick: () => setSelectedMember(isSelected ? null : member.id), className: "w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-brand-primary)]/10 transition-all duration-200 flex items-center justify-center", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }))] }))] })] }), _jsx(AnimatePresence, { children: isSelected && canManageMembers && member.status === 'active' && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mt-4 pt-4 border-t border-[var(--hive-border-primary)]/20", children: _jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [member.role === 'member' && (_jsxs("button", { onClick: () => handleMemberAction(member.id, 'promote'), className: "px-3 py-1.5 rounded-lg bg-blue-400/10 text-blue-400 border border-blue-400/30 hover:bg-blue-400/20 transition-all duration-200 text-sm flex items-center gap-1", children: [_jsx(Shield, { className: "w-3 h-3" }), _jsx("span", { children: "Promote to Co-Leader" })] })), member.role === 'co_leader' && (_jsxs("button", { onClick: () => handleMemberAction(member.id, 'demote'), className: "px-3 py-1.5 rounded-lg bg-orange-400/10 text-orange-400 border border-orange-400/30 hover:bg-orange-400/20 transition-all duration-200 text-sm flex items-center gap-1", children: [_jsx(User, { className: "w-3 h-3" }), _jsx("span", { children: "Demote to Member" })] })), _jsxs("button", { onClick: () => handleMemberAction(member.id, 'remove'), className: "px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20 transition-all duration-200 text-sm flex items-center gap-1", children: [_jsx(UserMinus, { className: "w-3 h-3" }), _jsx("span", { children: "Remove" })] })] }) })) })] }));
    };
    return (_jsxs("div", { className: cn('h-full flex flex-col', className), children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-2xl bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 flex items-center justify-center", children: _jsx(Users, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }) }), _jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: ["Members (", filteredMembers.length, ")"] }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: [onlineMembers, " online \u2022 ", pendingMembers.length, " pending"] })] })] }), canManageMembers && onInviteMembers && (_jsxs("button", { onClick: onInviteMembers, className: "px-4 py-2.5 rounded-2xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60 transition-all duration-300 font-semibold flex items-center gap-2", children: [_jsx(UserPlus, { className: "w-4 h-4" }), _jsx("span", { children: "Invite" })] }))] }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search members by name, handle, or major...", className: "w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200" })] }), _jsx("button", { onClick: () => setShowFilters(!showFilters), className: cn('w-12 h-12 rounded-2xl border transition-all duration-200 flex items-center justify-center', showFilters
                                    ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40'
                                    : 'bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/30 hover:text-[var(--hive-text-primary)]'), children: _jsx(Filter, { className: "w-5 h-5" }) })] }), _jsx(AnimatePresence, { children: showFilters && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "space-y-3", children: [_jsx("div", { className: "flex items-center gap-2 flex-wrap", children: FILTER_OPTIONS.map((option) => (_jsxs("button", { onClick: () => setSelectedFilter(option.value), className: cn('px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2', selectedFilter === option.value
                                            ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30'
                                            : 'bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30'), children: [option.icon, _jsx("span", { children: option.label })] }, option.value))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Sort by:" }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-1.5 rounded-lg border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200", children: [_jsx("option", { value: "name", children: "Name" }), _jsx("option", { value: "role", children: "Role" }), _jsx("option", { value: "joined", children: "Joined Date" }), _jsx("option", { value: "activity", children: "Last Active" })] })] })] })) })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredMembers.length > 0 ? (_jsx("div", { className: "space-y-3", children: filteredMembers.map((member) => (_jsx(MemberCard, { member: member }, member.id))) })) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-16", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-3xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/20 flex items-center justify-center", children: _jsx(Users, { className: "w-8 h-8 text-[var(--hive-text-muted)]" }) }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "No members found" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] max-w-sm mx-auto", children: searchQuery
                                    ? 'Try adjusting your search or filters to find members.'
                                    : 'There are no members matching the selected filters.' })] })) }) })] }));
};
export default SpaceMemberDirectory;
//# sourceMappingURL=space-member-directory.js.map