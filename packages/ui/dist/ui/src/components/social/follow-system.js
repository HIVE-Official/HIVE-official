import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE Follow System
 * Complete follow/unfollow functionality for users and spaces
 */
import { useState, useCallback, useMemo } from 'react';
import { Button } from '../../atomic/atoms/button';
import { Avatar } from '../index';
import { HiveBadge as Badge } from '../index';
import { UserPlus, Users, Bell, BellOff, Star, MapPin, Calendar, BookOpen, MoreHorizontal, Check, Search, Filter, UserCheck, Eye, EyeOff, ChevronDown, Heart, MessageCircle, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const FollowButton = ({ isFollowing, isLoading = false, onFollow, onUnfollow, variant = 'default', showNotificationToggle = false, hasNotifications = false, onToggleNotifications }) => {
    const [actionLoading, setActionLoading] = useState(false);
    const handleFollowAction = useCallback(async () => {
        if (actionLoading || isLoading)
            return;
        setActionLoading(true);
        try {
            if (isFollowing) {
                await onUnfollow();
            }
            else {
                await onFollow();
            }
        }
        finally {
            setActionLoading(false);
        }
    }, [isFollowing, onFollow, onUnfollow, actionLoading, isLoading]);
    const handleNotificationToggle = useCallback(async () => {
        if (!onToggleNotifications || actionLoading)
            return;
        setActionLoading(true);
        try {
            await onToggleNotifications();
        }
        finally {
            setActionLoading(false);
        }
    }, [onToggleNotifications, actionLoading]);
    if (variant === 'compact') {
        return (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { size: "xs", variant: isFollowing ? "outline" : "default", onClick: handleFollowAction, disabled: actionLoading || isLoading, className: `${isFollowing
                        ? 'border-[var(--hive-border-default)] text-[var(--hive-text-primary)] hover:border-red-500 hover:text-red-500 hover:bg-red-500/10'
                        : 'bg-[var(--hive-primary)] text-white hover:bg-[var(--hive-primary)]/90'}`, children: actionLoading ? (_jsx("div", { className: "w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" })) : isFollowing ? (_jsx(UserCheck, { className: "w-3 h-3" })) : (_jsx(UserPlus, { className: "w-3 h-3" })) }), showNotificationToggle && isFollowing && (_jsx(Button, { size: "xs", variant: "ghost", onClick: handleNotificationToggle, disabled: actionLoading, className: hasNotifications ? 'text-[var(--hive-primary)]' : 'text-[var(--hive-text-muted)]', children: hasNotifications ? _jsx(Bell, { className: "w-3 h-3" }) : _jsx(BellOff, { className: "w-3 h-3" }) }))] }));
    }
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: isFollowing ? "outline" : "default", onClick: handleFollowAction, disabled: actionLoading || isLoading, className: `flex items-center gap-2 ${isFollowing
                    ? 'border-[var(--hive-border-default)] text-[var(--hive-text-primary)] hover:border-red-500 hover:text-red-500 hover:bg-red-500/10'
                    : 'bg-[var(--hive-primary)] text-white hover:bg-[var(--hive-primary)]/90'}`, children: actionLoading ? (_jsx("div", { className: "w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" })) : isFollowing ? (_jsxs(_Fragment, { children: [_jsx(UserCheck, { className: "w-4 h-4" }), _jsx("span", { children: "Following" })] })) : (_jsxs(_Fragment, { children: [_jsx(UserPlus, { className: "w-4 h-4" }), _jsx("span", { children: "Follow" })] })) }), showNotificationToggle && isFollowing && (_jsxs(Button, { variant: "outline", onClick: handleNotificationToggle, disabled: actionLoading, className: `flex items-center gap-2 ${hasNotifications ? 'border-[var(--hive-primary)] text-[var(--hive-primary)]' : ''}`, children: [hasNotifications ? _jsx(Bell, { className: "w-4 h-4" }) : _jsx(BellOff, { className: "w-4 h-4" }), _jsx("span", { children: hasNotifications ? 'Notifications On' : 'Notifications Off' })] }))] }));
};
const UserCard = ({ user, currentUserId, onFollow, onUnfollow, onToggleNotifications, onViewProfile, isLoading = false }) => {
    const [showMenu, setShowMenu] = useState(false);
    const formatCount = (count) => {
        if (count >= 1000)
            return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };
    const formatLastActive = (timestamp) => {
        if (!timestamp)
            return 'Never';
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0)
            return 'Today';
        if (diffDays === 1)
            return 'Yesterday';
        if (diffDays < 7)
            return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };
    const isOwnProfile = user.id === currentUserId;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl hover:bg-[var(--hive-background-secondary)]/50 transition-colors group", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3 cursor-pointer flex-1", onClick: () => onViewProfile?.(user.id), children: [_jsx(Avatar, { src: user.avatar, initials: user.name.charAt(0), size: "lg" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] truncate hover:text-[var(--hive-primary)] transition-colors", children: user.name }), user.isVerified && (_jsx("div", { className: "w-4 h-4 bg-[var(--hive-primary)] text-white rounded-full flex items-center justify-center", children: _jsx(Check, { className: "w-2.5 h-2.5" }) }))] }), _jsxs("p", { className: "text-sm text-[var(--hive-text-muted)]", children: ["@", user.handle] }), user.location && (_jsxs("div", { className: "flex items-center space-x-1 text-xs text-[var(--hive-text-muted)] mt-1", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { children: user.location })] }))] })] }), !isOwnProfile && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FollowButton, { isFollowing: user.isFollowing || false, onFollow: () => onFollow(user.id), onUnfollow: () => onUnfollow(user.id), variant: "compact", showNotificationToggle: true, hasNotifications: user.hasNotifications, onToggleNotifications: onToggleNotifications ? () => onToggleNotifications(user.id) : undefined, isLoading: isLoading }), _jsxs("div", { className: "relative", children: [_jsx(Button, { variant: "ghost", size: "xs", onClick: () => setShowMenu(!showMenu), className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(MoreHorizontal, { className: "w-3 h-3" }) }), _jsx(AnimatePresence, { children: showMenu && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -10 }, className: "absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-20 min-w-[140px]", children: [_jsxs("button", { onClick: () => {
                                                        onViewProfile?.(user.id);
                                                        setShowMenu(false);
                                                    }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Eye, { className: "w-3 h-3" }), "View Profile"] }), _jsxs("button", { onClick: () => {
                                                        // Handle message action
                                                        setShowMenu(false);
                                                    }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(MessageCircle, { className: "w-3 h-3" }), "Message"] }), _jsx("button", { onClick: () => {
                                                        // Handle share action
                                                        navigator.clipboard.writeText(`${window.location.origin}/profile/${user.handle}`);
                                                        setShowMenu(false);
                                                    } }), ")} className=\"w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2\" >", _jsx(Share, { className: "w-3 h-3" }), "Share Profile"] })) }), ")}"] })] }))] }), ")}"] })) /* Bio */;
    { /* Bio */ }
    {
        user.bio && (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-3 leading-relaxed", children: user.bio }));
    }
    { /* Academic Info */ }
    {
        (user.school || user.major || user.year) && (_jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [user.school && (_jsxs(Badge, { size: "sm", variant: "secondary", className: "flex items-center gap-1", children: [_jsx(BookOpen, { className: "w-3 h-3" }), user.school] })), user.major && (_jsx(Badge, { size: "sm", variant: "secondary", children: user.major })), user.year && (_jsx(Badge, { size: "sm", variant: "secondary", children: user.year }))] }));
    }
    { /* Stats */ }
    _jsxs("div", { className: "flex items-center justify-between text-sm text-[var(--hive-text-muted)]", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { children: [formatCount(user.followersCount), " followers"] }), _jsxs("span", { children: [formatCount(user.followingCount), " following"] }), _jsxs("span", { children: [formatCount(user.spacesCount), " spaces"] })] }), _jsxs("span", { children: ["Active ", formatLastActive(user.lastActive)] })] });
    { /* Mutual Connections */ }
    {
        user.mutualFollowers && user.mutualFollowers.length > 0 && (_jsx("div", { className: "mt-3 pt-3 border-t border-[var(--hive-border-subtle)]", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "flex -space-x-1", children: user.mutualFollowers.slice(0, 3).map((mutual, index) => (_jsx(Avatar, { src: mutual.avatar, initials: mutual.name.charAt(0), size: "xs", className: "border border-[var(--hive-background-elevated)]" }, mutual.id))) }), _jsxs("span", { className: "text-xs text-[var(--hive-text-muted)]", children: ["Followed by ", user.mutualFollowers[0].name, user.mutualFollowers.length > 1 && ` and ${user.mutualFollowers.length - 1} others you follow`] })] }) }));
    }
};
motion.div >
;
;
const SpaceCard = ({ space, onFollow, onUnfollow, onToggleNotifications, onViewSpace, isLoading = false }) => {
    const [showMenu, setShowMenu] = useState(false);
    const formatCount = (count) => {
        if (count >= 1000)
            return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };
    const getTypeColor = (type) => {
        switch (type) {
            case 'academic': return 'bg-blue-500';
            case 'residential': return 'bg-green-500';
            case 'professional': return 'bg-purple-500';
            case 'recreational': return 'bg-orange-500';
            case 'project': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };
    const getTypeEmoji = (type) => {
        switch (type) {
            case 'academic': return '📚';
            case 'residential': return '🏠';
            case 'professional': return '💼';
            case 'recreational': return '🎮';
            case 'project': return '🛠️';
            default: return '📁';
        }
    };
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl hover:bg-[var(--hive-background-secondary)]/50 transition-colors group", children: _jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3 cursor-pointer flex-1", onClick: () => onViewSpace?.(space.id), children: [_jsxs("div", { className: "relative", children: [space.avatar ? (_jsx(Avatar, { src: space.avatar, initials: space.name.charAt(0), size: "lg" })) : (_jsx("div", { className: `w-12 h-12 ${getTypeColor(space.type)} rounded-xl flex items-center justify-center text-xl`, children: getTypeEmoji(space.type) })), _jsx("div", { className: `absolute -bottom-1 -right-1 w-4 h-4 ${getTypeColor(space.type)} rounded-full flex items-center justify-center text-xs`, children: getTypeEmoji(space.type) })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] truncate hover:text-[var(--hive-primary)] transition-colors", children: space.name }), space.visibility === 'private' && (_jsx("div", { className: "w-4 h-4 text-[var(--hive-text-muted)]", children: _jsx(EyeOff, { className: "w-3 h-3" }) }))] }), _jsx(Badge, { size: "sm", variant: "secondary", className: "capitalize mt-1", children: space.type })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FollowButton, { isFollowing: space.isFollowing || false, onFollow: () => onFollow(space.id), onUnfollow: () => onUnfollow(space.id), variant: "compact", showNotificationToggle: true, hasNotifications: space.hasNotifications, onToggleNotifications: onToggleNotifications ? () => onToggleNotifications(space.id) : undefined, isLoading: isLoading }), _jsxs("div", { className: "relative", children: [_jsx(Button, { variant: "ghost", size: "xs", onClick: () => setShowMenu(!showMenu), className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(MoreHorizontal, { className: "w-3 h-3" }) }), _jsx(AnimatePresence, { children: showMenu && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -10 }, className: "absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-20 min-w-[140px]", children: [_jsxs("button", { onClick: () => {
                                                    onViewSpace?.(space.id);
                                                    setShowMenu(false);
                                                }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Eye, { className: "w-3 h-3" }), "View Space"] }), _jsx("button", { onClick: () => {
                                                    // Handle share action
                                                    navigator.clipboard.writeText(`${window.location.origin}/spaces/${space.id}`);
                                                    setShowMenu(false);
                                                } }), ")} className=\"w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2\" >", _jsx(Share, { className: "w-3 h-3" }), "Share Space"] })) }), ")}"] })] })] }) })) /* Description */;
    { /* Description */ }
    _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-3 leading-relaxed", children: space.description });
    { /* Tags */ }
    {
        space.tags && space.tags.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1 mb-3", children: [space.tags.slice(0, 3).map((tag) => (_jsxs(Badge, { size: "xs", variant: "outline", children: ["#", tag] }, tag))), space.tags.length > 3 && (_jsxs(Badge, { size: "xs", variant: "outline", children: ["+", space.tags.length - 3, " more"] }))] }));
    }
    { /* Stats */ }
    _jsxs("div", { className: "flex items-center justify-between text-sm text-[var(--hive-text-muted)]", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { children: [formatCount(space.membersCount), " members"] }), _jsxs("span", { children: [formatCount(space.toolsCount), " tools"] })] }), _jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsx("span", { children: new Date(space.createdAt).toLocaleDateString() })] })] });
    { /* Recent Activity */ }
    {
        space.recentActivity && (_jsx("div", { className: "mt-3 pt-3 border-t border-[var(--hive-border-subtle)]", children: _jsxs("p", { className: "text-xs text-[var(--hive-text-muted)]", children: [_jsx(Heart, { className: "w-3 h-3 inline mr-1" }), space.recentActivity] }) }));
    }
};
motion.div >
;
;
export const FollowSystem = ({ currentUserId, users = [], spaces = [], onFollowUser, onUnfollowUser, onFollowSpace, onUnfollowSpace, onToggleUserNotifications, onToggleSpaceNotifications, onViewProfile, onViewSpace, isLoading = false, enableFeatureFlag = true }) => {
    const [activeTab, setActiveTab] = useState('users');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    // Feature flag check
    if (!enableFeatureFlag)
        return null;
    const filteredUsers = useMemo(() => {
        let filtered = users;
        // Apply search
        if (searchQuery) {
            filtered = filtered.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.major?.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Apply filter
        switch (filter) {
            case 'following':
                return filtered.filter(user => user.isFollowing);
            case 'suggested':
                return filtered.filter(user => !user.isFollowing && user.mutualFollowers && user.mutualFollowers.length > 0);
            default:
                return filtered;
        }
    }, [users, searchQuery, filter]);
    const filteredSpaces = useMemo(() => {
        let filtered = spaces;
        // Apply search
        if (searchQuery) {
            filtered = filtered.filter(space => space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
        }
        // Apply filter
        switch (filter) {
            case 'following':
                return filtered.filter(space => space.isFollowing);
            case 'suggested':
                return filtered.filter(space => !space.isFollowing && space.visibility === 'public');
            default:
                return filtered;
        }
    }, [spaces, searchQuery, filter]);
    const getTabCount = (tab) => {
        if (tab === 'users') {
            switch (filter) {
                case 'following': return users.filter(u => u.isFollowing).length;
                case 'suggested': return users.filter(u => !u.isFollowing && u.mutualFollowers && u.mutualFollowers.length > 0).length;
                default: return users.length;
            }
        }
        else {
            switch (filter) {
                case 'following': return spaces.filter(s => s.isFollowing).length;
                case 'suggested': return spaces.filter(s => !s.isFollowing && s.visibility === 'public').length;
                default: return spaces.length;
            }
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Discover & Follow" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mt-1", children: "Connect with people and spaces in your community" })] }) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", placeholder: `Search ${activeTab}...`, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]" })] }), _jsxs(Button, { variant: "outline", onClick: () => setShowFilters(!showFilters), className: "flex items-center gap-2", children: [_jsx(Filter, { className: "w-4 h-4" }), "Filter", _jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}` })] })] }), _jsx(AnimatePresence, { children: showFilters && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, className: "overflow-hidden", children: _jsxs("div", { className: "flex gap-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg", children: [[
                                { key: 'all', label: 'All' },
                                { key: 'following', label: 'Following' },
                                { key: 'suggested', label: 'Suggested' }
                            ].map(map), ") => (", _jsx(Button, { variant: filter === key ? 'default' : 'outline', size: "sm", onClick: () => setFilter(key), children: label }, key), "))}"] }) })) }), _jsxs("div", { className: "flex items-center bg-[var(--hive-background-secondary)] rounded-lg p-1", children: [_jsxs("button", { onClick: () => setActiveTab('users'), className: `flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${activeTab === 'users'
                            ? 'bg-[var(--hive-primary)] text-white'
                            : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'}`, children: [_jsx(Users, { className: "w-4 h-4" }), _jsx("span", { children: "People" }), _jsx(Badge, { size: "xs", className: activeTab === 'users' ? 'bg-white/20' : 'bg-[var(--hive-background-primary)]', children: getTabCount('users') })] }), _jsxs("button", { onClick: () => setActiveTab('spaces'), className: `flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${activeTab === 'spaces'
                            ? 'bg-[var(--hive-primary)] text-white'
                            : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'}`, children: [_jsx(Star, { className: "w-4 h-4" }), _jsx("span", { children: "Spaces" }), _jsx(Badge, { size: "xs", className: activeTab === 'spaces' ? 'bg-white/20' : 'bg-[var(--hive-background-primary)]', children: getTabCount('spaces') })] })] }), _jsx("div", { className: "space-y-4", children: activeTab === 'users' ? (filteredUsers.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Users, { className: "w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: searchQuery ? 'No users found' : 'No users to show' }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: searchQuery
                                ? 'Try adjusting your search or filters'
                                : 'Check back later for new people to connect with' })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: filteredUsers.map((user) => (_jsx(UserCard, { user: user, currentUserId: currentUserId, onFollow: onFollowUser || (() => Promise.resolve()), onUnfollow: onUnfollowUser || (() => Promise.resolve()), onToggleNotifications: onToggleUserNotifications, onViewProfile: onViewProfile, isLoading: isLoading }, user.id))) }))) : (filteredSpaces.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Star, { className: "w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: searchQuery ? 'No spaces found' : 'No spaces to show' }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: searchQuery
                                ? 'Try adjusting your search or filters'
                                : 'Check back later for new spaces to join' })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: filteredSpaces.map((space) => (_jsx(SpaceCard, { space: space, onFollow: onFollowSpace || (() => Promise.resolve()), onUnfollow: onUnfollowSpace || (() => Promise.resolve()), onToggleNotifications: onToggleSpaceNotifications, onViewSpace: onViewSpace, isLoading: isLoading }, space.id))) }))) })] }));
};
//# sourceMappingURL=follow-system.js.map