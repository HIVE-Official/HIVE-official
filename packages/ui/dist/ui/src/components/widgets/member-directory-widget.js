"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Crown, Shield, Star, Plus, Activity, TrendingUp, UserCog, Download, Eye } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Badge } from '../../atomic/atoms/badge.js';
import { MemberDirectoryTool } from '../tools/member-directory-tool.js';
export function MemberDirectoryWidget({ space, isLeader = false, currentUserRole = 'member', leaderMode, showCompact = false, maxMembers = 8, onMemberAction, authenticatedFetch, className }) {
    const [showFullDirectory, setShowFullDirectory] = useState(false);
    const [quickViewMode, setQuickViewMode] = useState('active');
    const [previewMembers, setPreviewMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Fetch preview members data
    useEffect(() => {
        async function fetchPreviewMembers() {
            try {
                const fetchFunction = authenticatedFetch || fetch;
                const response = await fetchFunction(`/api/spaces/${space.id}/members?limit=8&includeOffline=true`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch members: ${response.status}`);
                }
                const data = await response.json();
                const apiMembers = data.members || [];
                // Transform API data to match widget format
                const transformedMembers = apiMembers.map((member) => ({
                    id: member.id,
                    name: member.name || 'Unknown User',
                    username: member.username || 'user',
                    avatar: member.avatar,
                    role: member.role || 'member',
                    status: member.status || 'offline',
                    contributionScore: member.stats?.contributionScore || 0,
                    lastActive: new Date(member.lastActive || Date.now()),
                    isVerified: member.isVerified || false
                }));
                setPreviewMembers(transformedMembers);
            }
            catch (error) {
                console.error('Error fetching preview members:', error);
                // Fallback to empty array on error
                setPreviewMembers([]);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchPreviewMembers();
    }, [space.id, authenticatedFetch]);
    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'bg-green-400';
            case 'away': return 'bg-yellow-400';
            case 'busy': return 'bg-red-400';
            default: return 'bg-gray-400';
        }
    };
    const getRoleIcon = (role) => {
        switch (role) {
            case 'owner': return Crown;
            case 'admin': return Shield;
            case 'moderator': return Star;
            default: return Users;
        }
    };
    const getRoleColor = (role) => {
        switch (role) {
            case 'owner': return 'text-yellow-400';
            case 'admin': return 'text-purple-400';
            case 'moderator': return 'text-blue-400';
            default: return 'text-neutral-400';
        }
    };
    const filteredMembers = previewMembers
        .filter(member => {
        switch (quickViewMode) {
            case 'leaders':
                return ['owner', 'admin', 'moderator'].includes(member.role);
            case 'active':
                return member.status === 'online';
            case 'recent':
                return member.lastActive > new Date(Date.now() - 24 * 60 * 60 * 1000);
            default:
                return true;
        }
    })
        .slice(0, maxMembers);
    if (showCompact) {
        return (_jsxs("div", { className: cn("space-y-3", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4 text-[#FFD700]" }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-inverse)]", children: "Members" }), _jsx(Badge, { variant: "secondary", className: "text-xs", children: space.memberCount || 0 })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowFullDirectory(true), className: "text-xs text-neutral-400 hover:text-[var(--hive-text-inverse)]", children: "View All" })] }), _jsx("div", { className: "flex gap-1", children: ['active', 'leaders', 'recent'].map((mode) => (_jsx("button", { onClick: () => setQuickViewMode(mode), className: cn("px-2 py-1 text-xs rounded transition-colors capitalize", quickViewMode === mode
                            ? "bg-[#FFD700]/20 text-[#FFD700]"
                            : "text-neutral-400 hover:text-[var(--hive-text-inverse)] hover:bg-white/5"), children: mode }, mode))) }), _jsx("div", { className: "space-y-2", children: isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 3 }).map((_, i) => (_jsxs("div", { className: "flex items-center gap-3 p-2 bg-white/[0.02] rounded-lg animate-pulse", children: [_jsx("div", { className: "w-8 h-8 bg-white/10 rounded-full" }), _jsxs("div", { className: "flex-1 space-y-1", children: [_jsx("div", { className: "h-3 bg-white/10 rounded w-24" }), _jsx("div", { className: "h-2 bg-white/10 rounded w-16" })] })] }, i)))) : filteredMembers.map((member) => {
                        const RoleIcon = getRoleIcon(member.role);
                        return (_jsxs("div", { className: "flex items-center gap-3 p-2 bg-white/[0.02] rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer", onClick: () => setShowFullDirectory(true), children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center", children: member.avatar ? (_jsx("img", { src: member.avatar, alt: member.name, className: "w-7 h-7 rounded-full" })) : (_jsx("span", { className: "text-sm font-bold text-[var(--hive-text-inverse)]", children: member.name.charAt(0) })) }), _jsx("div", { className: cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-black", getStatusColor(member.status)) })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-inverse)] truncate", children: member.name }), _jsx(RoleIcon, { className: cn("h-3 w-3", getRoleColor(member.role)) })] }), _jsxs("div", { className: "text-xs text-neutral-400", children: [member.contributionScore, " points"] })] }), leaderMode === 'manage' && isLeader && (_jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                        e.stopPropagation();
                                        onMemberAction?.(member.id, 'manage');
                                    }, children: _jsx(UserCog, { className: "h-3 w-3" }) }))] }, member.id));
                    }) }), filteredMembers.length === 0 && (_jsxs("div", { className: "text-center py-4 text-neutral-400 text-sm", children: ["No ", quickViewMode, " members"] }))] }));
    }
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Users, { className: "h-5 w-5 text-[#FFD700]" }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-inverse)]", children: "Member Directory" }), _jsxs(Badge, { variant: "info", className: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30", children: [space.memberCount || 0, " members"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [isLeader && (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "secondary", size: "sm", className: "border-green-500/30 text-green-400 hover:bg-green-500/10", children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), "Invite"] }), _jsxs(Button, { variant: "secondary", size: "sm", className: "border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10", children: [_jsx(Download, { className: "h-4 w-4 mr-1" }), "Export"] })] })), _jsxs(Button, { variant: "secondary", size: "sm", onClick: () => setShowFullDirectory(true), className: "border-white/20 text-[var(--hive-text-inverse)] hover:bg-white/10", children: [_jsx(Eye, { className: "h-4 w-4 mr-1" }), "View All"] })] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-green-400", children: isLoading ? (_jsx("div", { className: "h-6 bg-white/10 rounded animate-pulse" })) : (previewMembers.filter(m => m.status === 'online').length) }), _jsx("div", { className: "text-xs text-neutral-400", children: "Online" })] }), _jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: isLoading ? (_jsx("div", { className: "h-6 bg-white/10 rounded animate-pulse" })) : (previewMembers.filter(m => ['owner', 'admin', 'moderator'].includes(m.role)).length) }), _jsx("div", { className: "text-xs text-neutral-400", children: "Leaders" })] }), _jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-purple-400", children: isLoading ? (_jsx("div", { className: "h-6 bg-white/10 rounded animate-pulse" })) : (previewMembers.filter(m => m.isVerified).length) }), _jsx("div", { className: "text-xs text-neutral-400", children: "Verified" })] }), _jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-yellow-400", children: isLoading ? (_jsx("div", { className: "h-6 bg-white/10 rounded animate-pulse" })) : previewMembers.length > 0 ? (Math.round(previewMembers.reduce((sum, m) => sum + m.contributionScore, 0) / previewMembers.length)) : (0) }), _jsx("div", { className: "text-xs text-neutral-400", children: "Avg Score" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-neutral-400", children: "Quick view:" }), ['active', 'leaders', 'recent'].map((mode) => (_jsxs(Button, { variant: quickViewMode === mode ? "primary" : "secondary", size: "sm", onClick: () => setQuickViewMode(mode), className: cn("text-xs capitalize", quickViewMode === mode && "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30"), children: [mode === 'leaders' && _jsx(Crown, { className: "h-3 w-3 mr-1" }), mode === 'active' && _jsx(Activity, { className: "h-3 w-3 mr-1" }), mode === 'recent' && _jsx(TrendingUp, { className: "h-3 w-3 mr-1" }), mode] }, mode)))] }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: isLoading ? (
                // Loading skeleton
                Array.from({ length: 8 }).map((_, i) => (_jsxs("div", { className: "p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg animate-pulse", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "w-10 h-10 bg-white/10 rounded-full" }), _jsx("div", { className: "w-4 h-4 bg-white/10 rounded" })] }), _jsxs("div", { className: "text-center space-y-1", children: [_jsx("div", { className: "h-4 bg-white/10 rounded" }), _jsx("div", { className: "h-3 bg-white/10 rounded w-16 mx-auto" }), _jsx("div", { className: "h-3 bg-white/10 rounded w-12 mx-auto" })] })] }, i)))) : filteredMembers.map((member) => {
                    const RoleIcon = getRoleIcon(member.role);
                    return (_jsxs(motion.div, { className: "p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-colors cursor-pointer", onClick: () => setShowFullDirectory(true), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center", children: member.avatar ? (_jsx("img", { src: member.avatar, alt: member.name, className: "w-8 h-8 rounded-full" })) : (_jsx("span", { className: "text-sm font-bold text-[var(--hive-text-inverse)]", children: member.name.charAt(0) })) }), _jsx("div", { className: cn("absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-black", getStatusColor(member.status)) })] }), _jsx(RoleIcon, { className: cn("h-4 w-4", getRoleColor(member.role)) })] }), _jsxs("div", { className: "text-center", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-inverse)] truncate", children: member.name.split(' ')[0] }), _jsxs("p", { className: "text-xs text-neutral-400 mb-1", children: ["@", member.username] }), _jsxs("div", { className: "text-xs", children: [_jsx("span", { className: "text-[#FFD700] font-medium", children: member.contributionScore }), _jsx("span", { className: "text-neutral-400", children: " pts" })] })] }), leaderMode === 'manage' && isLeader && (_jsx("div", { className: "mt-2 pt-2 border-t border-white/10", children: _jsxs(Button, { variant: "secondary", size: "sm", className: "w-full text-xs", onClick: (e) => {
                                        e.stopPropagation();
                                        onMemberAction?.(member.id, 'manage');
                                    }, children: [_jsx(UserCog, { className: "h-3 w-3 mr-1" }), "Manage"] }) }))] }, member.id));
                }) }), _jsx(AnimatePresence, { children: showFullDirectory && (_jsx(motion.div, { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setShowFullDirectory(false), children: _jsxs(motion.div, { className: "bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden", initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-white/[0.06]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Users, { className: "h-6 w-6 text-[#FFD700]" }), _jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-inverse)]", children: "Member Directory" }), _jsx(Badge, { variant: "info", className: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30", children: space.name })] }), _jsx(Button, { variant: "secondary", size: "sm", onClick: () => setShowFullDirectory(false), className: "border-white/20 text-[var(--hive-text-inverse)] hover:bg-white/10", children: "\u2715" })] }), _jsx("div", { className: "p-6 overflow-y-auto max-h-[calc(90vh-120px)]", children: _jsx(MemberDirectoryTool, { spaceId: space.id, spaceName: space.name, isLeader: isLeader, currentUserRole: currentUserRole, leaderMode: leaderMode, onMemberAction: onMemberAction }) })] }) })) })] }));
}
//# sourceMappingURL=member-directory-widget.js.map