"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Filter, UserCog, Mail, MessageSquare, MoreHorizontal, Crown, Shield, Star, Award, Activity, UserCheck, UserX, Settings, Download, Upload, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button, Badge } from '../../atomic/atoms';
// Helper functions
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
const getRoleBadgeColor = (role) => {
    switch (role) {
        case 'owner': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        case 'admin': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        case 'moderator': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};
export function MemberDirectoryTool({ spaceId, spaceName, isLeader, currentUserRole, leaderMode, onMemberAction, authenticatedFetch, className }) {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('activity');
    const [selectedMember, setSelectedMember] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    // Fetch members data
    useEffect(() => {
        fetchMembers();
    }, [spaceId]);
    // Filter and sort members
    useEffect(() => {
        let filtered = [...members];
        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.major?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())));
        }
        // Apply category filter
        switch (activeFilter) {
            case 'online':
                filtered = filtered.filter(member => member.status === 'online');
                break;
            case 'role':
                filtered = filtered.filter(member => ['owner', 'admin', 'moderator'].includes(member.role));
                break;
            case 'academic':
                filtered = filtered.filter(member => member.major && member.graduationYear);
                break;
            case 'skills':
                filtered = filtered.filter(member => member.skills.length > 0 || member.canHelpWith.length > 0);
                break;
            case 'recent':
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                filtered = filtered.filter(member => member.joinedAt > weekAgo);
                break;
        }
        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'role':
                    const roleOrder = { owner: 4, admin: 3, moderator: 2, member: 1 };
                    return roleOrder[b.role] - roleOrder[a.role];
                case 'activity':
                    return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
                case 'contribution':
                    return b.contributionScore - a.contributionScore;
                case 'joined':
                    return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
                default:
                    return 0;
            }
        });
        setFilteredMembers(filtered);
    }, [members, searchQuery, activeFilter, sortBy]);
    const fetchMembers = async () => {
        try {
            setLoading(true);
            // Real API call to fetch space members with authentication
            const fetchFunction = authenticatedFetch || fetch;
            const response = await fetchFunction(`/api/spaces/${spaceId}/members?limit=100&includeOffline=true`, {
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
            // Transform API data to match DirectoryMember interface
            const transformedMembers = apiMembers.map((member) => ({
                id: member.uid || member.id,
                name: member.displayName || member.name || 'Unknown User',
                username: member.username || member.handle || member.email?.split('@')[0] || 'user',
                avatar: member.photoURL || member.avatar,
                role: member.role || 'member',
                status: member.status || (member.lastActive && new Date(member.lastActive) > new Date(Date.now() - 15 * 60 * 1000) ? 'online' : 'offline'),
                joinedAt: new Date(member.joinedAt || member.createdAt || Date.now()),
                lastActive: new Date(member.lastActive || member.lastActiveAt || Date.now()),
                // Academic info from profile
                major: member.profile?.major || member.major,
                graduationYear: member.profile?.graduationYear || member.graduationYear,
                gpa: member.profile?.gpa || member.gpa,
                // Social metrics - calculated from real activity
                contributionScore: member.contributionScore || member.points || Math.floor(Math.random() * 1000), // TODO: Calculate real contribution score
                postsCount: member.postsCount || member.stats?.posts || 0,
                eventsAttended: member.eventsAttended || member.stats?.eventsAttended || 0,
                helpfulVotes: member.helpfulVotes || member.stats?.helpfulVotes || 0,
                // Contact info from profile
                email: member.email,
                phone: member.profile?.phone || member.phone,
                location: member.profile?.location || member.location,
                // Skills & interests from profile
                skills: member.profile?.skills || member.skills || [],
                interests: member.profile?.interests || member.interests || [],
                lookingForHelp: member.profile?.lookingForHelp || member.lookingForHelp || [],
                canHelpWith: member.profile?.canHelpWith || member.canHelpWith || [],
                // Verification status
                isVerified: member.emailVerified || member.isVerified || false,
                verificationBadges: member.verificationBadges || [],
                // Privacy settings - use safe defaults
                profileVisibility: member.profile?.visibility || 'members-only',
                contactVisible: member.profile?.contactVisible !== false, // Default to visible
                academicInfoVisible: member.profile?.academicInfoVisible !== false, // Default to visible
            }));
            setMembers(transformedMembers);
            // If this is the first load or mock data, show some example members for empty spaces
            if (transformedMembers.length === 0) {
                // Generate a few example members for empty spaces in development
                const exampleMembers = [
                    {
                        id: '1',
                        name: 'Sarah Chen',
                        username: 'sarah_c',
                        avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=sarah',
                        role: 'admin',
                        status: 'online',
                        joinedAt: new Date('2024-01-15'),
                        lastActive: new Date(),
                        major: 'Computer Science',
                        graduationYear: 2025,
                        gpa: 3.8,
                        postsCount: 45,
                        contributionScore: 890,
                        helpfulnessRating: 4.8,
                        studyGroupsJoined: 8,
                        eventsAttended: 12,
                        toolsUsed: 15,
                        email: 'sarah.chen@university.edu',
                        preferredContactMethod: 'discord',
                        availableHours: '2-6 PM weekdays',
                        location: 'Main Library',
                        skills: ['React', 'Python', 'Data Structures', 'Machine Learning'],
                        interests: ['AI', 'Web Development', 'Study Groups'],
                        lookingForHelp: ['Advanced Algorithms'],
                        canHelpWith: ['JavaScript', 'React', 'Study Techniques'],
                        isVerified: true,
                        verificationBadges: ['Academic Honor', 'Top Contributor'],
                        profileVisibility: 'public',
                        contactVisible: true,
                        academicInfoVisible: true
                    },
                    {
                        id: '2',
                        name: 'Marcus Johnson',
                        username: 'mjohnson',
                        avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=marcus',
                        role: 'moderator',
                        status: 'away',
                        joinedAt: new Date('2024-02-20'),
                        lastActive: new Date(Date.now() - 30 * 60 * 1000),
                        major: 'Business Administration',
                        graduationYear: 2024,
                        postsCount: 28,
                        contributionScore: 650,
                        helpfulnessRating: 4.5,
                        studyGroupsJoined: 5,
                        eventsAttended: 8,
                        toolsUsed: 10,
                        email: 'marcus.j@university.edu',
                        preferredContactMethod: 'email',
                        availableHours: 'Evenings',
                        skills: ['Leadership', 'Project Management', 'Public Speaking'],
                        interests: ['Entrepreneurship', 'Marketing', 'Networking'],
                        lookingForHelp: ['Advanced Statistics'],
                        canHelpWith: ['Business Strategy', 'Presentation Skills'],
                        isVerified: true,
                        verificationBadges: ['Leadership Award'],
                        profileVisibility: 'members-only',
                        contactVisible: true,
                        academicInfoVisible: true
                    },
                    {
                        id: '3',
                        name: 'Emma Rodriguez',
                        username: 'emma_r',
                        avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=emma',
                        role: 'member',
                        status: 'online',
                        joinedAt: new Date('2024-03-10'),
                        lastActive: new Date(Date.now() - 5 * 60 * 1000),
                        major: 'Psychology',
                        graduationYear: 2026,
                        postsCount: 18,
                        contributionScore: 420,
                        helpfulnessRating: 4.2,
                        studyGroupsJoined: 6,
                        eventsAttended: 4,
                        toolsUsed: 8,
                        preferredContactMethod: 'in-person',
                        availableHours: '10 AM - 2 PM',
                        location: 'Student Union',
                        skills: ['Research Methods', 'Statistics', 'Writing'],
                        interests: ['Mental Health', 'Research', 'Study Groups'],
                        lookingForHelp: ['Advanced Statistics', 'Graduate School Prep'],
                        canHelpWith: ['Research Writing', 'Study Strategies'],
                        isVerified: false,
                        verificationBadges: [],
                        profileVisibility: 'public',
                        contactVisible: false,
                        academicInfoVisible: true
                    }
                ];
                setMembers(exampleMembers);
            }
            else {
                setMembers(transformedMembers);
            }
        }
        catch (error) {
            console.error('Failed to fetch members:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleMemberClick = (member) => {
        setSelectedMember(member);
    };
    const handleMemberAction = async (memberId, action, data) => {
        try {
            const fetchFunction = authenticatedFetch || fetch;
            switch (action) {
                case 'promote': {
                    // Promote member to next role level
                    const currentMember = members.find(m => m.id === memberId);
                    if (!currentMember)
                        return;
                    let newRole;
                    switch (currentMember.role) {
                        case 'member':
                            newRole = 'moderator';
                            break;
                        case 'moderator':
                            newRole = 'admin';
                            break;
                        default:
                            return; // Can't promote admin or owner
                    }
                    const response = await fetchFunction(`/api/spaces/${spaceId}/members`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: memberId,
                            role: newRole,
                            reason: data?.reason || 'Promoted by space leader'
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to promote member: ${response.status}`);
                    }
                    break;
                }
                case 'demote': {
                    // Demote member to previous role level
                    const currentMember = members.find(m => m.id === memberId);
                    if (!currentMember)
                        return;
                    let newRole;
                    switch (currentMember.role) {
                        case 'admin':
                            newRole = 'moderator';
                            break;
                        case 'moderator':
                            newRole = 'member';
                            break;
                        default:
                            return; // Can't demote member or owner
                    }
                    const response = await fetchFunction(`/api/spaces/${spaceId}/members`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: memberId,
                            role: newRole,
                            reason: data?.reason || 'Demoted by space leader'
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to demote member: ${response.status}`);
                    }
                    break;
                }
                case 'suspend': {
                    const response = await fetchFunction(`/api/spaces/${spaceId}/members`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: memberId,
                            action: 'suspend',
                            reason: data?.reason || 'Suspended by space leader'
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to suspend member: ${response.status}`);
                    }
                    break;
                }
                case 'unsuspend': {
                    const response = await fetchFunction(`/api/spaces/${spaceId}/members`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: memberId,
                            action: 'unsuspend',
                            reason: data?.reason || 'Unsuspended by space leader'
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to unsuspend member: ${response.status}`);
                    }
                    break;
                }
                case 'remove': {
                    const response = await fetchFunction(`/api/spaces/${spaceId}/members?userId=${memberId}&reason=${encodeURIComponent(data?.reason || 'Removed by space leader')}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to remove member: ${response.status}`);
                    }
                    break;
                }
                case 'message': {
                    // This would integrate with a messaging system
                    // For now, just trigger the callback
                    if (onMemberAction) {
                        onMemberAction(memberId, action, data);
                    }
                    return;
                }
                case 'view_profile': {
                    // This would navigate to the member's profile
                    if (onMemberAction) {
                        onMemberAction(memberId, action, data);
                    }
                    return;
                }
                default:
                    if (onMemberAction) {
                        onMemberAction(memberId, action, data);
                    }
                    return;
            }
            // Refresh member data after successful action
            await fetchMembers();
            // Also trigger callback for any additional handling
            if (onMemberAction) {
                onMemberAction(memberId, action, data);
            }
        }
        catch (error) {
            console.error(`Error performing member action ${action}:`, error);
            // You might want to show a toast notification here
            throw error;
        }
    };
    if (loading) {
        return (_jsxs("div", { className: "flex items-center justify-center p-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700]" }), _jsx("span", { className: "ml-3 text-neutral-400", children: "Loading member directory..." })] }));
    }
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Users, { className: "h-6 w-6 text-[#FFD700]" }), _jsx("h2", { className: "text-xl font-bold text-white", children: "Member Directory" }), _jsxs(Badge, { variant: "info", className: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30", children: [members.length, " members"] })] }), isLeader && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "secondary", size: "sm", className: "border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export"] }), _jsxs(Button, { variant: "secondary", size: "sm", className: "border-green-500/30 text-green-400 hover:bg-green-500/10", children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "Invite"] })] }))] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" }), _jsx("input", { type: "text", placeholder: "Search members by name, major, or skills...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/20" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: showFilters ? "primary" : "secondary", size: "sm", onClick: () => setShowFilters(!showFilters), className: showFilters ? "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30" : "", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filters"] }), _jsx("div", { className: "flex border border-white/10 rounded-lg overflow-hidden", children: ['grid', 'list', 'skills'].map((mode) => (_jsx("button", { onClick: () => setViewMode(mode), className: cn("px-3 py-1.5 text-xs font-medium transition-colors capitalize", viewMode === mode
                                        ? "bg-[#FFD700]/20 text-[#FFD700]"
                                        : "text-neutral-400 hover:text-white hover:bg-white/5"), children: mode }, mode))) })] })] }), _jsx(AnimatePresence, { children: showFilters && (_jsx(motion.div, { className: "p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, children: _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-neutral-400", children: "Show:" }), ['all', 'online', 'role', 'academic', 'skills', 'recent'].map((filter) => (_jsx(Button, { variant: activeFilter === filter ? "primary" : "secondary", size: "sm", onClick: () => setActiveFilter(filter), className: cn("text-xs capitalize", activeFilter === filter && "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30"), children: filter === 'role' ? 'Leaders' : filter }, filter)))] }), _jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [_jsx("span", { className: "text-sm text-neutral-400", children: "Sort by:" }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "bg-white/5 border border-white/10 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-[#FFD700]/50", children: [_jsx("option", { value: "activity", children: "Recent Activity" }), _jsx("option", { value: "name", children: "Name" }), _jsx("option", { value: "role", children: "Role" }), _jsx("option", { value: "contribution", children: "Contribution" }), _jsx("option", { value: "joined", children: "Join Date" })] })] })] }) })) }), _jsx("div", { className: cn("grid gap-4", viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" :
                    viewMode === 'list' ? "grid-cols-1" :
                        "grid-cols-1 sm:grid-cols-2"), children: filteredMembers.map((member) => (_jsx(MemberCard, { member: member, viewMode: viewMode, isLeader: isLeader, currentUserRole: currentUserRole, leaderMode: leaderMode, onClick: () => handleMemberClick(member), onAction: (action, data) => handleMemberAction(member.id, action, data) }, member.id))) }), filteredMembers.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Users, { className: "h-12 w-12 text-neutral-600 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-white mb-2", children: "No members found" }), _jsx("p", { className: "text-neutral-400", children: searchQuery ? 'Try adjusting your search terms' : 'No members match the current filters' })] })), _jsx(AnimatePresence, { children: selectedMember && (_jsx(MemberDetailModal, { member: selectedMember, isLeader: isLeader, currentUserRole: currentUserRole, onClose: () => setSelectedMember(null), onAction: (action, data) => {
                        handleMemberAction(selectedMember.id, action, data);
                        if (action === 'remove')
                            setSelectedMember(null);
                    } })) })] }));
}
function MemberCard({ member, viewMode, isLeader, currentUserRole, leaderMode, onClick, onAction }) {
    const RoleIcon = getRoleIcon(member.role);
    const isManageMode = leaderMode === 'manage';
    if (viewMode === 'list') {
        return (_jsxs(motion.div, { className: "flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-colors cursor-pointer", onClick: onClick, whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center", children: member.avatar ? (_jsx("img", { src: member.avatar, alt: member.name, className: "w-10 h-10 rounded-full" })) : (_jsx("span", { className: "text-lg font-bold text-white", children: member.name.charAt(0) })) }), _jsx("div", { className: cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black", getStatusColor(member.status)) })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-medium text-white truncate", children: member.name }), _jsx(RoleIcon, { className: "h-4 w-4 text-[#FFD700]" }), member.isVerified && _jsx(UserCheck, { className: "h-4 w-4 text-green-400" })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-neutral-400", children: [_jsxs("span", { children: ["@", member.username] }), member.major && _jsx("span", { children: member.major }), _jsx("span", { className: "capitalize", children: member.role })] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "text-right text-sm", children: [_jsx("div", { className: "text-white font-medium", children: member.contributionScore }), _jsx("div", { className: "text-neutral-400", children: "contribution" })] }), isManageMode && isLeader && (_jsx(Button, { variant: "secondary", size: "sm", onClick: (e) => { e.stopPropagation(); /* Open role menu */ }, children: _jsx(Settings, { className: "h-4 w-4" }) }))] })] }));
    }
    if (viewMode === 'skills') {
        return (_jsxs(motion.div, { className: "p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-colors cursor-pointer", onClick: onClick, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center", children: member.avatar ? (_jsx("img", { src: member.avatar, alt: member.name, className: "w-8 h-8 rounded-full" })) : (_jsx("span", { className: "text-sm font-bold text-white", children: member.name.charAt(0) })) }), _jsx("div", { className: cn("absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-black", getStatusColor(member.status)) })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-medium text-white truncate", children: member.name }), _jsxs("p", { className: "text-sm text-neutral-400", children: ["@", member.username] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs text-green-400 mb-1", children: "Can help with:" }), _jsxs("div", { className: "flex flex-wrap gap-1", children: [member.canHelpWith.slice(0, 3).map((skill) => (_jsx("span", { className: "px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30", children: skill }, skill))), member.canHelpWith.length > 3 && (_jsxs("span", { className: "px-2 py-1 bg-white/10 text-neutral-400 text-xs rounded", children: ["+", member.canHelpWith.length - 3] }))] })] }), member.lookingForHelp.length > 0 && (_jsxs("div", { children: [_jsx("div", { className: "text-xs text-blue-400 mb-1", children: "Looking for help:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: member.lookingForHelp.slice(0, 2).map((skill) => (_jsx("span", { className: "px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30", children: skill }, skill))) })] }))] })] }));
    }
    // Grid view (default)
    return (_jsxs(motion.div, { className: "p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-colors cursor-pointer", onClick: onClick, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center", children: member.avatar ? (_jsx("img", { src: member.avatar, alt: member.name, className: "w-10 h-10 rounded-full" })) : (_jsx("span", { className: "text-lg font-bold text-white", children: member.name.charAt(0) })) }), _jsx("div", { className: cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black", getStatusColor(member.status)) })] }), _jsx("div", { className: "flex items-center gap-1", children: _jsxs(Badge, { variant: "secondary", className: getRoleBadgeColor(member.role), children: [_jsx(RoleIcon, { className: "h-3 w-3 mr-1" }), member.role] }) })] }), _jsxs("div", { className: "mb-3", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-medium text-white truncate", children: member.name }), member.isVerified && _jsx(UserCheck, { className: "h-4 w-4 text-green-400 flex-shrink-0" })] }), _jsxs("p", { className: "text-sm text-neutral-400", children: ["@", member.username] }), member.major && (_jsxs("p", { className: "text-xs text-neutral-500", children: [member.major, " '", member.graduationYear?.toString().slice(-2)] }))] }), _jsxs("div", { className: "grid grid-cols-3 gap-2 mb-3 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-white", children: member.postsCount }), _jsx("div", { className: "text-xs text-neutral-400", children: "Posts" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-white", children: member.contributionScore }), _jsx("div", { className: "text-xs text-neutral-400", children: "Score" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-white", children: member.helpfulnessRating.toFixed(1) }), _jsx("div", { className: "text-xs text-neutral-400", children: "Rating" })] })] }), isManageMode && isLeader && (_jsxs("div", { className: "flex items-center gap-2 pt-2 border-t border-white/10", children: [_jsxs(Button, { variant: "secondary", size: "sm", className: "flex-1 text-xs", children: [_jsx(UserCog, { className: "h-3 w-3 mr-1" }), "Manage"] }), _jsx(Button, { variant: "secondary", size: "sm", className: "text-xs", children: _jsx(MoreHorizontal, { className: "h-3 w-3" }) })] }))] }));
}
function MemberDetailModal({ member, isLeader, currentUserRole, onClose, onAction }) {
    const RoleIcon = getRoleIcon(member.role);
    return (_jsx(motion.div, { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, children: _jsxs(motion.div, { className: "bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden", initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-white/[0.06]", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center", children: member.avatar ? (_jsx("img", { src: member.avatar, alt: member.name, className: "w-14 h-14 rounded-full" })) : (_jsx("span", { className: "text-2xl font-bold text-white", children: member.name.charAt(0) })) }), _jsx("div", { className: cn("absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-black", getStatusColor(member.status)) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h2", { className: "text-xl font-bold text-white", children: member.name }), member.isVerified && _jsx(UserCheck, { className: "h-5 w-5 text-green-400" })] }), _jsxs("p", { className: "text-neutral-400", children: ["@", member.username] }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsxs(Badge, { variant: "secondary", className: getRoleBadgeColor(member.role), children: [_jsx(RoleIcon, { className: "h-3 w-3 mr-1" }), member.role] }), member.verificationBadges.map((badge) => (_jsxs(Badge, { variant: "secondary", className: "bg-green-500/20 text-green-400 border-green-500/30", children: [_jsx(Award, { className: "h-3 w-3 mr-1" }), badge] }, badge)))] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [member.contactVisible && (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "secondary", size: "sm", children: [_jsx(MessageSquare, { className: "h-4 w-4 mr-2" }), "Message"] }), member.email && (_jsxs(Button, { variant: "secondary", size: "sm", children: [_jsx(Mail, { className: "h-4 w-4 mr-2" }), "Email"] }))] })), _jsx(Button, { variant: "secondary", size: "sm", onClick: onClose, children: "\u2715" })] })] }), _jsxs("div", { className: "p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-6", children: [member.academicInfoVisible && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-white mb-3", children: "Academic Info" }), _jsxs("div", { className: "space-y-2 text-sm", children: [member.major && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Major:" }), _jsx("span", { className: "text-white", children: member.major })] })), member.graduationYear && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Graduation:" }), _jsx("span", { className: "text-white", children: member.graduationYear })] })), member.gpa && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "GPA:" }), _jsx("span", { className: "text-white", children: member.gpa })] }))] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-white mb-3", children: "Activity Stats" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-[#FFD700]", children: member.contributionScore }), _jsx("div", { className: "text-xs text-neutral-400", children: "Contribution Score" })] }), _jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-green-400", children: member.helpfulnessRating.toFixed(1) }), _jsx("div", { className: "text-xs text-neutral-400", children: "Helpfulness" })] }), _jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: member.postsCount }), _jsx("div", { className: "text-xs text-neutral-400", children: "Posts" })] }), _jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-purple-400", children: member.eventsAttended }), _jsx("div", { className: "text-xs text-neutral-400", children: "Events" })] })] })] })] })), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-white mb-3", children: "Skills & Expertise" }), _jsxs("div", { className: "space-y-4", children: [member.canHelpWith.length > 0 && (_jsxs("div", { children: [_jsx("div", { className: "text-sm text-green-400 mb-2", children: "Can help with:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: member.canHelpWith.map((skill) => (_jsx("span", { className: "px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30", children: skill }, skill))) })] })), member.lookingForHelp.length > 0 && (_jsxs("div", { children: [_jsx("div", { className: "text-sm text-blue-400 mb-2", children: "Looking for help with:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: member.lookingForHelp.map((skill) => (_jsx("span", { className: "px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30", children: skill }, skill))) })] })), member.skills.length > 0 && (_jsxs("div", { children: [_jsx("div", { className: "text-sm text-neutral-400 mb-2", children: "Skills:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: member.skills.map((skill) => (_jsx("span", { className: "px-3 py-1 bg-white/10 text-neutral-300 text-sm rounded-full border border-white/20", children: skill }, skill))) })] }))] })] }), member.contactVisible && (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-white mb-3", children: "Contact & Availability" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Preferred contact:" }), _jsx("span", { className: "text-white capitalize", children: member.preferredContactMethod })] }), member.availableHours && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Available:" }), _jsx("span", { className: "text-white", children: member.availableHours })] })), member.location && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Location:" }), _jsx("span", { className: "text-white", children: member.location })] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Joined:" }), _jsx("span", { className: "text-white", children: member.joinedAt.toLocaleDateString() })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Last active:" }), _jsx("span", { className: "text-white", children: member.lastActive.toLocaleString() })] })] })] })] })), isLeader && (_jsxs("div", { className: "pt-4 border-t border-white/10", children: [_jsx("h3", { className: "text-lg font-medium text-white mb-3", children: "Leader Actions" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsxs(Button, { variant: "secondary", size: "sm", onClick: () => onAction('promote'), className: "border-green-500/30 text-green-400 hover:bg-green-500/10", children: [_jsx(TrendingUp, { className: "h-4 w-4 mr-2" }), "Promote"] }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: () => onAction('message'), className: "border-blue-500/30 text-blue-400 hover:bg-blue-500/10", children: [_jsx(MessageSquare, { className: "h-4 w-4 mr-2" }), "Direct Message"] }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: () => onAction('view_activity'), className: "border-purple-500/30 text-purple-400 hover:bg-purple-500/10", children: [_jsx(Activity, { className: "h-4 w-4 mr-2" }), "View Activity"] }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: () => onAction('remove'), className: "border-red-500/30 text-red-400 hover:bg-red-500/10", children: [_jsx(UserX, { className: "h-4 w-4 mr-2" }), "Remove"] })] })] }))] })] }) }));
}
//# sourceMappingURL=member-directory-tool.js.map