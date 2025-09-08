"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { cn } from '../../lib/utils.js';
import { HiveCard } from '../hive-card.js';
import { HiveButton } from '../hive-button.js';
import { Avatar as HiveAvatar } from '../../atomic/atoms/avatar.js';
import { HiveBadge } from '../hive-badge.js';
import { HiveInput } from '../hive-input.js';
import { Users, UserPlus, Crown, Shield, Star, MoreVertical, Mail, MessageCircle, UserMinus } from 'lucide-react';
// Role configuration
const roleConfig = {
    leader: {
        label: 'Leader',
        icon: Crown,
        color: 'bg-purple-100 text-purple-800 border-purple-300',
        priority: 0
    },
    admin: {
        label: 'Admin',
        icon: Shield,
        color: 'bg-red-100 text-red-800 border-red-300',
        priority: 1
    },
    moderator: {
        label: 'Moderator',
        icon: Star,
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        priority: 2
    },
    member: {
        label: 'Member',
        icon: Users,
        color: 'bg-gray-100 text-gray-700 border-gray-300',
        priority: 3
    }
};
// Individual Member Card Component
const MemberCard = ({ member, isLeader, currentUserId, variant = 'widget', onMessage, onRemove, onUpdateRole }) => {
    const [showActions, setShowActions] = useState(false);
    const roleInfo = roleConfig[member.role];
    const RoleIcon = roleInfo.icon;
    const isCurrentUser = member.id === currentUserId;
    return (_jsx("div", { className: cn("bg-[var(--hive-white)] rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-all", variant === 'compact' && "p-3"), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx(HiveAvatar, { src: member.avatar, alt: member.name, initials: member.name.slice(0, 2).toUpperCase(), size: variant === 'compact' ? 'sm' : 'md' }), member.isOnline && (_jsx("div", { className: "absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--hive-white)] rounded-full" }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsxs("h4", { className: "font-medium text-gray-900 truncate", children: [member.name, isCurrentUser && _jsx("span", { className: "text-gray-500 text-sm ml-1", children: "(You)" })] }), _jsxs(HiveBadge, { variant: "secondary", className: cn("text-xs flex items-center gap-1", roleInfo.color), children: [_jsx(RoleIcon, { className: "h-3 w-3" }), roleInfo.label] })] }), variant !== 'compact' && (_jsxs(_Fragment, { children: [member.bio && (_jsx("p", { className: "text-sm text-gray-600 mt-1 line-clamp-2", children: member.bio })), _jsxs("div", { className: "flex items-center gap-3 mt-2 text-xs text-gray-500", children: [member.major && _jsx("span", { children: member.major }), member.year && _jsxs("span", { children: ["Class of ", member.year] })] }), member.contributions && variant === 'full' && (_jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-gray-500", children: [_jsxs("span", { children: [member.contributions.posts, " posts"] }), _jsxs("span", { children: [member.contributions.events, " events"] }), _jsxs("span", { children: [member.contributions.tools, " tools"] })] }))] }))] })] }), _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowActions(!showActions), className: "p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }), showActions && (_jsxs("div", { className: "absolute right-0 top-8 w-48 bg-[var(--hive-white)] rounded-lg shadow-lg border border-gray-200 py-1 z-10", children: [!isCurrentUser && (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => {
                                                onMessage?.();
                                                setShowActions(false);
                                            }, className: "w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), "Send message"] }), member.email && (_jsxs("a", { href: `mailto:${member.email}`, className: "w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Mail, { className: "h-4 w-4" }), "Send email"] }))] })), isLeader && !isCurrentUser && member.role !== 'leader' && (_jsxs(_Fragment, { children: [_jsx("div", { className: "border-t border-gray-100 my-1" }), member.role !== 'admin' && (_jsxs("button", { onClick: () => {
                                                onUpdateRole?.('admin');
                                                setShowActions(false);
                                            }, className: "w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Shield, { className: "h-4 w-4" }), "Make admin"] })), member.role !== 'moderator' && (_jsxs("button", { onClick: () => {
                                                onUpdateRole?.('moderator');
                                                setShowActions(false);
                                            }, className: "w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Star, { className: "h-4 w-4" }), "Make moderator"] })), member.role !== 'member' && (_jsxs("button", { onClick: () => {
                                                onUpdateRole?.('member');
                                                setShowActions(false);
                                            }, className: "w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4" }), "Remove role"] })), _jsx("div", { className: "border-t border-gray-100 my-1" }), _jsxs("button", { onClick: () => {
                                                onRemove?.();
                                                setShowActions(false);
                                            }, className: "w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2", children: [_jsx(UserMinus, { className: "h-4 w-4" }), "Remove from space"] })] }))] }))] })] }) }));
};
// Main Surface Component
export const HiveMembersSurface = ({ spaceId, spaceName, isLeader = false, currentUserId, className, variant = 'widget', members: propMembers, loading = false, error = null, onInviteMember, onRemoveMember, onUpdateRole, onMessageMember, }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [filterRole, setFilterRole] = useState('all');
    // Mock data for development
    const mockMembers = useMemo(() => [
        {
            id: '1',
            name: 'Sarah Chen',
            email: 'sarah.chen@university.edu',
            role: 'leader',
            joinedAt: new Date('2024-01-15'),
            bio: 'Computer Science major passionate about building communities',
            major: 'Computer Science',
            year: '2025',
            isOnline: true,
            contributions: { posts: 45, events: 12, tools: 3 }
        },
        {
            id: '2',
            name: 'Marcus Johnson',
            email: 'marcus.j@university.edu',
            role: 'admin',
            joinedAt: new Date('2024-01-20'),
            bio: 'Business & Tech double major. Always looking to help!',
            major: 'Business',
            year: '2024',
            isOnline: true,
            contributions: { posts: 28, events: 8, tools: 2 }
        },
        {
            id: '3',
            name: 'Emily Rodriguez',
            role: 'moderator',
            joinedAt: new Date('2024-02-01'),
            bio: 'Design enthusiast and UX researcher',
            major: 'Design',
            year: '2025',
            isOnline: false,
            contributions: { posts: 34, events: 5, tools: 1 }
        },
        {
            id: '4',
            name: 'Alex Kim',
            role: 'member',
            joinedAt: new Date('2024-02-15'),
            major: 'Engineering',
            year: '2026',
            isOnline: false,
            contributions: { posts: 12, events: 3, tools: 0 }
        },
        {
            id: '5',
            name: 'Jordan Lee',
            role: 'member',
            joinedAt: new Date('2024-03-01'),
            bio: 'Freshman exploring tech and entrepreneurship',
            major: 'Undeclared',
            year: '2027',
            isOnline: true,
            contributions: { posts: 8, events: 2, tools: 0 }
        }
    ], []);
    const members = propMembers || mockMembers;
    // Filter and sort members
    const filteredMembers = useMemo(() => {
        let filtered = [...members];
        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.major?.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Filter by role
        if (filterRole !== 'all') {
            filtered = filtered.filter(member => member.role === filterRole);
        }
        // Sort by role priority, then by name
        filtered.sort((a, b) => {
            const roleDiff = roleConfig[a.role].priority - roleConfig[b.role].priority;
            if (roleDiff !== 0)
                return roleDiff;
            return a.name.localeCompare(b.name);
        });
        return filtered;
    }, [members, searchQuery, filterRole]);
    // Stats
    const stats = useMemo(() => {
        const roleCount = members.reduce((acc, member) => {
            acc[member.role] = (acc[member.role] || 0) + 1;
            return acc;
        }, {});
        const onlineCount = members.filter(m => m.isOnline).length;
        return { roleCount, onlineCount, total: members.length };
    }, [members]);
    if (loading) {
        return (_jsx("div", { className: cn("space-y-4", className), children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "bg-gray-200 rounded-lg h-20 mb-4" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2, 3, 4].map((i) => (_jsx("div", { className: "bg-gray-100 rounded-lg h-32" }, i))) })] }) }));
    }
    if (error) {
        return (_jsx(HiveCard, { className: cn("p-6", className), children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx("p", { className: "text-gray-600", children: "Unable to load members" }), _jsx("p", { className: "text-sm text-gray-500", children: error.message })] }) }));
    }
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: variant === 'full' && spaceName ? `${spaceName} Members` : 'Members' }), _jsxs("p", { className: "text-sm text-gray-500 mt-1", children: [stats.total, " members \u2022 ", stats.onlineCount, " online"] })] }), isLeader && variant === 'full' && (_jsxs(HiveButton, { variant: "primary", size: "sm", onClick: onInviteMember, className: "flex items-center gap-2", children: [_jsx(UserPlus, { className: "h-4 w-4" }), "Invite Members"] }))] }), variant === 'full' && (_jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsx("div", { className: "flex-1", children: _jsx(HiveInput, { type: "text", placeholder: "Search members...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }) }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("select", { value: filterRole, onChange: (e) => setFilterRole(e.target.value), className: "px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)]", children: [_jsx("option", { value: "all", children: "All Roles" }), _jsx("option", { value: "leader", children: "Leaders" }), _jsx("option", { value: "admin", children: "Admins" }), _jsx("option", { value: "moderator", children: "Moderators" }), _jsx("option", { value: "member", children: "Members" })] }), _jsxs("div", { className: "flex border border-gray-200 rounded-lg", children: [_jsx("button", { onClick: () => setViewMode('grid'), className: cn("px-3 py-2 text-sm", viewMode === 'grid' ? "bg-gray-100" : "hover:bg-gray-50"), children: "Grid" }), _jsx("button", { onClick: () => setViewMode('list'), className: cn("px-3 py-2 text-sm", viewMode === 'list' ? "bg-gray-100" : "hover:bg-gray-50"), children: "List" })] })] })] })), _jsx("div", { className: cn("grid gap-4", viewMode === 'grid' && variant === 'full'
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"), children: filteredMembers.length === 0 ? (_jsx(HiveCard, { className: "col-span-full p-8", children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx("p", { className: "text-gray-600", children: "No members found" }), _jsx("p", { className: "text-sm text-gray-500", children: searchQuery ? "Try adjusting your search" : "Be the first to join!" })] }) })) : (filteredMembers
                    .slice(0, variant === 'widget' ? 5 : undefined)
                    .map((member) => (_jsx(MemberCard, { member: member, isLeader: isLeader, currentUserId: currentUserId, variant: variant, onMessage: () => onMessageMember?.(member.id), onRemove: () => onRemoveMember?.(member.id), onUpdateRole: (newRole) => onUpdateRole?.(member.id, newRole) }, member.id)))) }), variant === 'widget' && filteredMembers.length > 5 && (_jsxs("button", { className: "w-full py-2 text-sm text-[var(--hive-gold-dark)] hover:text-orange-700 font-medium", children: ["View all ", filteredMembers.length, " members \u2192"] }))] }));
};
// Export display name for debugging
HiveMembersSurface.displayName = 'HiveMembersSurface';
//# sourceMappingURL=HiveMembersSurface.js.map