"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { Users, Crown, Shield, Eye, Globe, Github, Twitter, Instagram, Linkedin } from 'lucide-react';
// HIVE Members Surface - Community Member Management
// Member directory with profiles, roles, and social features
const hiveMembersSurfaceVariants = cva("relative w-full", {
    variants: {
        mode: {
            view: "",
            edit: "ring-2 ring-gray-500/30 ring-offset-2 ring-offset-black/20",
            builder: "ring-2 ring-gray-500/30 ring-offset-2 ring-offset-black/20",
        }
    },
    defaultVariants: {
        mode: "view",
    },
});
// Member roles with HIVE design patterns
const memberRoles = {
    builder: {
        icon: Crown,
        label: 'Builder',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/20',
        description: 'Space creator and admin'
    },
    moderator: {
        icon: Shield,
        label: 'Moderator',
        color: 'text-blue-400',
        bg: 'bg-blue-500/20',
        description: 'Community moderator'
    },
    member: {
        icon: Users,
        label: 'Member',
        color: 'text-green-400',
        bg: 'bg-green-500/20',
        description: 'Active community member'
    },
    guest: {
        icon: Eye,
        label: 'Guest',
        color: 'text-gray-400',
        bg: 'bg-gray-500/20',
        description: 'Limited access member'
    },
};
// Member status indicators
const memberStatuses = {
    online: {
        label: 'Online',
        color: 'bg-green-500',
        description: 'Currently active'
    },
    away: {
        label: 'Away',
        color: 'bg-yellow-500',
        description: 'Temporarily away'
    },
    busy: {
        label: 'Busy',
        color: 'bg-red-500',
        description: 'Do not disturb'
    },
    offline: {
        label: 'Offline',
        color: 'bg-gray-500',
        description: 'Not currently active'
    },
};
// Helper function to get auth token from session storage
const getAuthToken = () => {
    if (typeof window === 'undefined')
        return null;
    try {
        const sessionJson = localStorage.getItem('hive_session');
        if (sessionJson) {
            const session = JSON.parse(sessionJson);
            return process.env.NODE_ENV === 'development'
                ? `dev_token_${session.uid}`
                : session.token;
        }
    }
    catch (error) {
        console.error('Error getting session:', error);
    }
    return null;
};
// API function to fetch members
const fetchMembers = async (spaceId, limit = 50) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error('No authentication token available');
    }
    const response = await fetch(`/api/spaces/${spaceId}/members?limit=${limit}&includeOffline=true`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch members: ${response.statusText}`);
    }
    const data = await response.json();
    return {
        members: data.members || [],
        summary: data.summary || { totalMembers: 0, onlineMembers: 0, activeMembers: 0 }
    };
};
export const HiveMembersSurface = React.forwardRef(({ className, mode, space, members: propMembers, currentUserId, isBuilder = false, canModerate = false, leaderMode = null, onViewProfile, onMessageMember, onInviteMember, onRemoveMember, onChangeRole, onBlockMember, viewMode = 'grid', showOfflineMembers = true, showMemberStats = true, maxMembers = 20, autoFetch = true, authToken, ...props }, ref) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [currentViewMode, setCurrentViewMode] = useState(viewMode);
    const [hoveredMember, setHoveredMember] = useState(null);
    const [showMemberMenu, setShowMemberMenu] = useState(null);
    const [fetchedMembers, setFetchedMembers] = useState([]);
    const [membersSummary, setMembersSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(autoFetch);
    const [error, setError] = useState(null);
    // Fetch members from API if autoFetch is enabled
    useEffect(() => {
        if (!autoFetch || !space?.id)
            return;
        const loadMembers = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const { members, summary } = await fetchMembers(space.id, maxMembers);
                setFetchedMembers(members);
                setMembersSummary(summary);
            }
            catch (error) {
                console.error('Failed to fetch members:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch members');
            }
            finally {
                setIsLoading(false);
            }
        };
        loadMembers();
    }, [autoFetch, space?.id, maxMembers]);
    // Use either provided members or fetched members
    const members = propMembers || fetchedMembers;
    // Normalize member data and filter members
    const normalizedMembers = members.map(member => ({
        ...member,
        // Normalize date fields
        joinedAt: member.joinedAt && typeof member.joinedAt === 'object' && 'toDate' in member.joinedAt
            ? member.joinedAt.toDate()
            : member.joinedAt instanceof Date ? member.joinedAt : new Date(member.joinedAt),
        lastActive: member.lastActive && typeof member.lastActive === 'object' && 'toDate' in member.lastActive
            ? member.lastActive.toDate()
            : member.lastActive instanceof Date ? member.lastActive : new Date(member.lastActive),
        // Ensure required fields have defaults
        isVerified: member.isVerified || false,
        badges: member.badges || [],
        stats: member.stats || {
            postsCount: 0,
            likesReceived: 0,
            eventsAttended: 0,
            contributionScore: 0,
        },
        interests: member.interests || [],
        permissions: member.permissions || {
            canMessage: true,
            canViewProfile: true,
            canInviteOthers: false,
        },
        // Map role to match our role system - handle any string input
        role: (() => {
            const rawRole = member.role;
            if (rawRole === 'owner' || rawRole === 'admin')
                return 'builder';
            if (rawRole in memberRoles)
                return rawRole;
            return 'member';
        })
    }(),
    ));
});
const filteredMembers = normalizedMembers
    .filter(member => {
    // Role filter
    const roleMatch = selectedRole === 'all' || member.role === selectedRole;
    // Search filter
    const searchMatch = searchQuery === '' ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.interests?.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()));
    // Offline filter
    const statusMatch = showOfflineMembers || member.status !== 'offline';
    return roleMatch && searchMatch && statusMatch;
})
    .sort((a, b) => {
    // Builders first
    if (a.role === 'builder' && b.role !== 'builder')
        return -1;
    if (a.role !== 'builder' && b.role === 'builder')
        return 1;
    // Then by role hierarchy
    const roleOrder = { builder: 4, moderator: 3, member: 2, guest: 1 };
    if (roleOrder[a.role] !== roleOrder[b.role]) {
        return roleOrder[b.role] - roleOrder[a.role];
    }
    // Online members first
    if (a.status !== 'offline' && b.status === 'offline')
        return -1;
    if (a.status === 'offline' && b.status !== 'offline')
        return 1;
    // Finally by join date
    return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
});
slice(0, maxMembers);
// Member counts by role
const roleCounts = members.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
}, {});
// Online member count
const onlineCount = members.filter(m => m.status !== 'offline').length;
// Get social icon
const getSocialIcon = (platform) => {
    const iconMap = {
        github: Github,
        twitter: Twitter,
        instagram: Instagram,
        linkedin: Linkedin,
        website: Globe
    };
    return iconMap[platform] || Globe;
};
// Loading state
if (isLoading) {
    return (_jsx("div", { ref: ref, className: cn(hiveMembersSurfaceVariants({ mode, className })), ...props, children: _jsx("div", { className: "space-y-4", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 6 }).map((_, i) => (_jsxs("div", { className: "bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl p-4 animate-pulse", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-12 h-12 bg-gray-600 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "h-4 bg-gray-600 rounded mb-2 w-24" }), _jsx("div", { className: "h-3 bg-gray-700 rounded w-16" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-3 bg-gray-600 rounded w-full" }), _jsx("div", { className: "h-3 bg-gray-600 rounded w-3/4" })] })] }, i))) }) }) }));
}
// Error state
if (error) {
    return (_jsx("div", { ref: ref, className: cn(hiveMembersSurfaceVariants({ mode, className })), ...props, children: _jsxs(motion.div, { className: "text-center py-12", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: motionDurations.smooth }, children: [_jsx(motion.div, { className: "w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-2xl flex items-center justify-center", whileHover: { scale: 1.05, rotate: 5 }, transition: { duration: motionDurations.quick }, children: _jsx(Users, { className: "w-8 h-8 text-red-400" }) }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-3", children: "Unable to Load Members" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm max-w-md mx-auto mb-8 leading-relaxed", children: error }), _jsx(motion.button, { className: "inline-flex items-center gap-2 px-6 py-3 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-xl hover:bg-gray-500/30 transition-all duration-200 font-medium", onClick: () => {
                        setError(null);
                        setIsLoading(true);
                        // Retry fetching
                        if (autoFetch && space?.id) {
                            fetchMembers(space.id, maxMembers)
                                .then(({ members, summary }) => {
                                setFetchedMembers(members);
                                setMembersSummary(summary);
                            });
                        }
                    } }), ".catch(e => setError(e.message)) .finally(() => setIsLoading(false)) } })} whileHover=", { scale: 1.02 }, "whileTap=", { scale: 0.98 }, "> Try Again"] }) }));
    div >
    ;
}
// Empty state
if (members.length === 0) {
    return (_jsx("div", { ref: ref, className: cn(hiveMembersSurfaceVariants({ mode, className })), ...props, children: _jsxs(motion.div, { className: "text-center py-12", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: motionDurations.smooth }, children: [_jsx(motion.div, { className: "w-16 h-16 mx-auto mb-6 bg-gray-500/20 rounded-2xl flex items-center justify-center", whileHover: { scale: 1.05, rotate: 5 }, transition: { duration: motionDurations.quick }, children: _jsx(Users, { className: "w-8 h-8 text-gray-400" }) }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-3", children: "No Members Yet" }), _jsx("p", { className: "text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed", children: "Invite people to join your Space and build a thriving community together." }), canModerate && (_jsxs(motion.button, { className: "inline-flex items-center gap-2 px-6 py-3 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-xl hover:bg-gray-500/30 transition-all duration-200 font-medium", onClick: onInviteMember, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(UserPlus, { className: "w-4 h-4" }), "Invite Members"] }))] }) }));
}
return (_jsxs("div", { ref: ref, className: cn(hiveMembersSurfaceVariants({ mode, className })), ...props, children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Members" }), _jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-400", children: [_jsxs("span", { children: [members.length, " total"] }), _jsx("span", { children: "\u2022" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsxs("span", { children: [onlineCount, " online"] })] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex bg-[var(--hive-background-primary)]/20 rounded-xl border border-white/10 p-1", children: [[
                                    { key: 'grid', icon: Grid },
                                    { key: 'list', icon: List }
                                ].map(map), ") => (", _jsx(motion.button, { className: cn("p-2 rounded-lg transition-all duration-200", currentViewMode === key
                                        ? "bg-gray-500/20 text-gray-400"
                                        : "text-gray-400 hover:text-[var(--hive-text-primary)]"), onClick: () => setCurrentViewMode(key), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Icon, { className: "w-4 h-4" }) }, key), "))}"] }), canModerate && (_jsxs(motion.button, { className: "flex items-center gap-2 px-4 py-2 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-xl hover:bg-gray-500/30 transition-all duration-200 font-medium", onClick: onInviteMember, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(UserPlus, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "Invite" })] }))] })] }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Search members...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-12 pr-4 py-3 bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-white/10 rounded-xl text-[var(--hive-text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/30 transition-all duration-200" })] }), _jsxs("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: [[
                            { key: 'all', label: 'All Members', icon: Users, color: 'text-[var(--hive-text-primary)]', count: members.length },
                            ...Object.entries(memberRoles).map(([key, config]) => ({
                                key,
                                label: config.label,
                                icon: config.icon,
                                color: config.color,
                                count: roleCounts[key] || 0
                            }))
                        ], ") ].map((filter) => ", , "const Icon = filter.icon; const isActive = selectedRole === filter.key; return (", _jsxs(motion.button, { className: cn("flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-200 whitespace-nowrap", isActive
                                ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:border-white/20 hover:text-[var(--hive-text-primary)]"), onClick: () => setSelectedRole(filter.key), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Icon, { className: cn("w-4 h-4", isActive ? "text-gray-400" : filter.color) }), _jsx("span", { children: filter.label }), _jsx("span", { className: cn("px-1.5 py-0.5 rounded-full text-xs", isActive
                                        ? "bg-gray-500/30 text-gray-300"
                                        : "bg-[var(--hive-text-primary)]/10 text-gray-500"), children: filter.count })] }, filter.key), ") })}"] })] }), _jsx("div", { className: cn(currentViewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-3"), children: filteredMembers.map((member, index) => {
                const roleConfig = memberRoles[member.role];
                const statusConfig = memberStatuses[member.status];
                const RoleIcon = roleConfig.icon;
                const isHovered = hoveredMember === member.id;
                const isCurrentUser = member.id === currentUserId;
                return (_jsx(motion.article, { className: cn("relative group bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer", isHovered && "border-white/10", isCurrentUser && "ring-1 ring-blue-500/30 bg-blue-500/5", mode === 'edit' && "hover:ring-2 hover:ring-gray-500/30"), onMouseEnter: () => setHoveredMember(member.id), onMouseLeave: () => setHoveredMember(null), onClick: () => onViewProfile?.(member.id), initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.02 }, layout: true, children: _jsxs("div", { className: cn("p-4", currentViewMode === 'list' && "flex items-center gap-4"), children: [_jsxs("div", { className: "relative flex-shrink-0", children: [_jsx("div", { className: cn("rounded-full overflow-hidden bg-gray-600", currentViewMode === 'grid' ? "w-16 h-16 mx-auto mb-3" : "w-12 h-12"), children: member.avatar ? (_jsx("img", { src: member.avatar, alt: "", className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full bg-gradient-to-br from-gray-500/20 to-gray-700/20 flex items-center justify-center", children: _jsx("span", { className: cn("font-medium text-[var(--hive-text-primary)]", currentViewMode === 'grid' ? "text-lg" : "text-sm"), children: member.name.charAt(0).toUpperCase() }) })) }), _jsx("div", { className: cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black/20", statusConfig.color) }), member.role !== 'member' && (_jsx(motion.div, { className: cn("absolute -top-1 -left-1 p-1 rounded-full", roleConfig.bg), initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: index * 0.02 + 0.2 }, children: _jsx(RoleIcon, { className: cn("w-3 h-3", roleConfig.color) }) }))] }), _jsxs("div", { className: cn("flex-1 min-w-0", currentViewMode === 'grid' && "text-center"), children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: cn("font-medium text-[var(--hive-text-primary)] truncate", currentViewMode === 'grid' && "text-center w-full"), children: member.name }), member.isVerified && (_jsx(Star, { className: "w-4 h-4 text-yellow-400 flex-shrink-0" }))] }), _jsxs("div", { className: cn("text-xs text-gray-400 mb-2", currentViewMode === 'grid' && "text-center"), children: [_jsxs("span", { children: ["@", member.username] }), _jsx("span", { className: "mx-2", children: "\u2022" }), _jsx("span", { className: roleConfig.color, children: roleConfig.label })] }), currentViewMode === 'grid' && member.bio && (_jsx("p", { className: "text-sm text-gray-300 line-clamp-2 mb-3 leading-relaxed", children: member.bio })), showMemberStats && (_jsxs("div", { className: cn("flex gap-4 text-xs text-gray-500", currentViewMode === 'grid' ? "justify-center" : "justify-start"), children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MessageCircle, { className: "w-3 h-3" }), _jsx("span", { children: member.stats.postsCount })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Heart, { className: "w-3 h-3" }), _jsx("span", { children: member.stats.likesReceived })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsx("span", { children: member.stats.eventsAttended })] })] })), currentViewMode === 'list' && (member.interests?.length || 0) > 0 && (_jsxs("div", { className: "flex items-center gap-1 mt-2 flex-wrap", children: [(member.interests || []).slice(0, 3).map((interest, i) => (_jsx("span", { className: "px-2 py-0.5 bg-[var(--hive-text-primary)]/5 rounded text-xs text-gray-300", children: interest }, i))), (member.interests?.length || 0) > 3 && (_jsxs("span", { className: "text-xs text-gray-400", children: ["+", (member.interests?.length || 0) - 3, " more"] }))] }))] }), _jsxs("div", { className: cn("flex items-center gap-2", currentViewMode === 'grid' ? "justify-center mt-3" : "ml-3"), children: [!isCurrentUser && member.permissions.canMessage && (_jsx(motion.button, { className: "p-2 text-gray-400 hover:text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all duration-200", onClick: (e) => {
                                            e.stopPropagation();
                                            onMessageMember?.(member.id);
                                        }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(MessageCircle, { className: "w-4 h-4" }) })), (canModerate || leaderMode === 'manage') && !isCurrentUser && (_jsxs("div", { className: "relative", children: [leaderMode === 'manage' ? (_jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: "relative", children: [_jsxs(motion.button, { className: "flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs text-blue-400 hover:bg-blue-500/30 transition-all", onClick: (e) => {
                                                                e.stopPropagation();
                                                                setShowMemberMenu(showMemberMenu === member.id ? null : member.id);
                                                            }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(RoleIcon, { className: "w-3 h-3" }), _jsx("span", { className: "capitalize", children: member.role }), _jsx(Settings, { className: "w-3 h-3" })] }), _jsx(AnimatePresence, { children: showMemberMenu === member.id && (_jsxs(motion.div, { className: "absolute top-full right-0 mt-2 w-56 bg-[#0A0A0A] border border-blue-500/30 rounded-xl overflow-hidden z-20 shadow-xl", initial: { opacity: 0, y: -10, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.95 }, transition: { duration: 0.2 }, children: [_jsxs("div", { className: "p-3", children: [_jsxs("div", { className: "text-xs text-blue-400 font-medium mb-2 border-b border-blue-500/20 pb-2", children: ["Manage ", member.name] }), _jsxs("div", { className: "space-y-1 mb-3", children: [Object.entries(memberRoles).filter(([role]) => role !== 'owner').map(([role, config]) => {
                                                                                        const RoleOptionIcon = config.icon;
                                                                                        const isCurrentRole = member.role === role;
                                                                                        return (_jsx(motion.button, { className: cn("w-full flex items-center gap-3 p-2 text-left rounded-lg transition-all duration-200 text-sm", isCurrentRole
                                                                                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                                                                                : "hover:bg-blue-500/10 text-white hover:text-blue-400"), onClick: () => {
                                                                                                if (!isCurrentRole) {
                                                                                                    onChangeRole?.(member.id, role);
                                                                                                }
                                                                                                setShowMemberMenu(null);
                                                                                            } }, role));
                                                                                    }, disabled = { isCurrentRole }, whileHover = {}, isCurrentRole ? { x: 4 } : {}), ">", _jsx(RoleOptionIcon, { className: cn("w-4 h-4", isCurrentRole ? "text-blue-400" : config.color) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "capitalize font-medium", children: role }), _jsx("div", { className: "text-xs opacity-70", children: config.description })] }), isCurrentRole && (_jsx(UserCheck, { className: "w-3 h-3 text-blue-400" }))] }), ") })}"] }), _jsxs("div", { className: "border-t border-red-500/20 pt-2 space-y-1", children: [_jsxs(motion.button, { className: "w-full flex items-center gap-3 p-2 text-left rounded-lg hover:bg-red-500/10 transition-all duration-200 text-sm text-red-400", onClick: () => {
                                                                                    onRemoveMember?.(member.id);
                                                                                    setShowMemberMenu(null);
                                                                                }, whileHover: { x: 4 }, children: [_jsx(UserMinus, { className: "w-4 h-4" }), "Remove Member"] }), _jsxs(motion.button, { className: "w-full flex items-center gap-3 p-2 text-left rounded-lg hover:bg-red-500/10 transition-all duration-200 text-sm text-red-400", onClick: () => {
                                                                                    onBlockMember?.(member.id);
                                                                                    setShowMemberMenu(null);
                                                                                }, whileHover: { x: 4 }, children: [_jsx(UserX, { className: "w-4 h-4" }), "Suspend Member"] })] })] })) }), ")}"] }) })) /* Manage Mode Indicator */
                                                :
                                            , _jsx(motion.div, { className: "px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, children: "Manage" })] })), " : ( /* Standard Menu Button */", _jsxs(_Fragment, { children: [_jsx(motion.button, { className: "p-2 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200", onClick: (e) => {
                                                    e.stopPropagation();
                                                    setShowMemberMenu(showMemberMenu === member.id ? null : member.id);
                                                }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) }), _jsx(AnimatePresence, { children: showMemberMenu === member.id && (_jsx(motion.div, { className: "absolute top-full right-0 mt-2 w-48 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-20", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: motionDurations.quick }, children: _jsxs("div", { className: "p-2", children: [_jsxs(motion.button, { className: "w-full flex items-center gap-3 p-2 text-left rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200 text-sm text-[var(--hive-text-primary)]", onClick: () => onChangeRole?.(member.id, 'moderator'), whileHover: { x: 4 }, children: [_jsx(Shield, { className: "w-4 h-4 text-blue-400" }), "Make Moderator"] }), _jsxs(motion.button, { className: "w-full flex items-center gap-3 p-2 text-left rounded-lg hover:bg-red-500/10 transition-all duration-200 text-sm text-red-400", onClick: () => onRemoveMember?.(member.id), whileHover: { x: 4 }, children: [_jsx(UserMinus, { className: "w-4 h-4" }), "Remove Member"] }), _jsxs(motion.button, { className: "w-full flex items-center gap-3 p-2 text-left rounded-lg hover:bg-red-500/10 transition-all duration-200 text-sm text-red-400", onClick: () => onBlockMember?.(member.id), whileHover: { x: 4 }, children: [_jsx(UserX, { className: "w-4 h-4" }), "Block Member"] })] }) })) })] }), ")}"] }), ")}"] }) }, member.id));
            }) }), ") })}"] })) /* Builder Hint */;
{ /* Builder Hint */ }
{
    isBuilder && mode === 'edit' && (_jsx(motion.div, { className: "mt-6 p-4 bg-gray-500/10 border border-gray-500/30 rounded-xl", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, transition: { delay: 0.5 }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Crown, { className: "w-5 h-5 text-gray-400 flex-shrink-0" }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-gray-400 mb-1", children: "Builder Mode Active" }), _jsx("p", { className: "text-xs text-gray-300/80", children: "Members are the heart of your community. Foster connections and manage roles to create an inclusive environment." })] })] }) }));
}
div >
;
;
HiveMembersSurface.displayName = "HiveMembersSurface";
export { hiveMembersSurfaceVariants, memberRoles, memberStatuses };
//# sourceMappingURL=hive-members-surface.js.map