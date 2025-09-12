'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button-enhanced';
import { Avatar, AvatarImage, AvatarFallback } from '../atoms/avatar';
import { SearchInput } from '../atoms/input-enhanced';
import { Alert, AlertDescription } from '../atoms/alert';
import { Select } from '../atoms/select-enhanced';
const StudyGroupMatcher = React.forwardRef(({ currentUser, availableMembers = [], existingGroups = [], userCourses = [], onCreateGroup, onJoinGroup, onConnectMember, onSendMessage, showMatchScore = true, maxSuggestions = 6, loading = false, error, className, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState('discover');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCourse, setSelectedCourse] = React.useState('');
    const [studyTypeFilter, setStudyTypeFilter] = React.useState('');
    // Calculate compatibility score between current user and potential member
    const calculateMatchScore = (member) => {
        if (!currentUser)
            return 0;
        let score = 0;
        const maxScore = 100;
        // Shared courses (40% weight)
        const sharedCourses = member.sharedCourses?.filter(course => userCourses.includes(course)) || [];
        score += (sharedCourses.length / Math.max(userCourses.length, 1)) * 40;
        // Study preferences alignment (25% weight)
        const sharedPreferences = member.studyPreferences.filter(pref => currentUser.studyPreferences.includes(pref));
        score += (sharedPreferences.length / Math.max(currentUser.studyPreferences.length, 1)) * 25;
        // Availability overlap (20% weight)
        const sharedAvailability = member.availability.filter(time => currentUser.availability.includes(time));
        score += (sharedAvailability.length / Math.max(currentUser.availability.length, 1)) * 20;
        // Study style compatibility (15% weight)
        if (member.studyStyle === currentUser.studyStyle || member.studyStyle === 'mixed' || currentUser.studyStyle === 'mixed') {
            score += 15;
        }
        return Math.min(Math.round(score), maxScore);
    };
    // Filter and sort members by compatibility
    const filteredMembers = React.useMemo(() => {
        let filtered = availableMembers.filter(member => {
            const matchesSearch = !searchTerm ||
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.major.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCourse = !selectedCourse ||
                member.sharedCourses?.includes(selectedCourse);
            return matchesSearch && matchesCourse && member.id !== currentUser?.id;
        });
        // Sort by match score if enabled
        if (showMatchScore && currentUser) {
            filtered = filtered.sort((a, b) => calculateMatchScore(b) - calculateMatchScore(a));
        }
        return filtered.slice(0, maxSuggestions);
    }, [availableMembers, searchTerm, selectedCourse, currentUser, showMatchScore, maxSuggestions]);
    const filteredGroups = React.useMemo(() => {
        return existingGroups.filter(group => {
            const matchesSearch = !searchTerm ||
                group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                group.course.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCourse = !selectedCourse || group.course === selectedCourse;
            const matchesType = !studyTypeFilter || group.studyType === studyTypeFilter;
            return matchesSearch && matchesCourse && matchesType && group.members.length < group.maxMembers;
        });
    }, [existingGroups, searchTerm, selectedCourse, studyTypeFilter]);
    const getMatchColor = (score) => {
        if (score >= 80)
            return 'text-[var(--hive-status-success)]';
        if (score >= 60)
            return 'text-[var(--hive-status-warning)]';
        return 'text-[var(--hive-text-secondary)]';
    };
    return (_jsxs("div", { ref: ref, className: cn('bg-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] rounded-xl p-6 space-y-6', className), ...props, children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Study Group Matcher" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Find study partners and groups that match your academic needs and schedule" }), error && (_jsx(Alert, { variant: "error", children: _jsx(AlertDescription, { children: error }) }))] }), _jsx("div", { className: "flex border-b border-[var(--hive-border-primary)]", children: [
                    { id: 'discover', label: 'Discover Partners' },
                    { id: 'groups', label: 'Study Groups' },
                    { id: 'create', label: 'Create Group' }
                ].map(tab => (_jsx("button", { onClick: () => setActiveTab(tab.id), className: cn('px-4 py-2 text-sm font-medium transition-colors relative', activeTab === tab.id
                        ? 'text-[var(--hive-brand-primary)] border-b-2 border-[var(--hive-brand-primary)]'
                        : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'), children: tab.label }, tab.id))) }), _jsxs("div", { className: "space-y-4", children: [_jsx(SearchInput, { placeholder: "Search by name, major, or course...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), onClear: () => setSearchTerm('') }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Select, { options: [
                                    { value: '', label: 'All Courses' },
                                    ...userCourses.map(course => ({ value: course, label: course }))
                                ], value: selectedCourse, onChange: (e) => setSelectedCourse(e.target.value), placeholder: "Filter by course", className: "flex-1" }), activeTab === 'groups' && (_jsx(Select, { options: [
                                    { value: '', label: 'All Types' },
                                    { value: 'exam-prep', label: 'Exam Prep' },
                                    { value: 'homework', label: 'Homework' },
                                    { value: 'project', label: 'Project' },
                                    { value: 'ongoing', label: 'Ongoing Study' },
                                    { value: 'review', label: 'Review Session' }
                                ], value: studyTypeFilter, onChange: (e) => setStudyTypeFilter(e.target.value), placeholder: "Study type", className: "flex-1" }))] })] }), activeTab === 'discover' && (_jsx(DiscoverTab, { members: filteredMembers, currentUser: currentUser, calculateMatchScore: calculateMatchScore, showMatchScore: showMatchScore, onConnectMember: onConnectMember, onSendMessage: onSendMessage, loading: loading })), activeTab === 'groups' && (_jsx(GroupsTab, { groups: filteredGroups, onJoinGroup: onJoinGroup, loading: loading })), activeTab === 'create' && (_jsx(CreateGroupTab, { userCourses: userCourses, onCreateGroup: onCreateGroup }))] }));
});
StudyGroupMatcher.displayName = 'StudyGroupMatcher';
const DiscoverTab = ({ members, currentUser, calculateMatchScore, showMatchScore, onConnectMember, onSendMessage, loading }) => {
    if (loading) {
        return _jsx(LoadingSkeleton, {});
    }
    if (members.length === 0) {
        return (_jsx("div", { className: "text-center py-8 text-[var(--hive-text-secondary)]", children: "No study partners found. Try adjusting your search criteria." }));
    }
    return (_jsx("div", { className: "grid gap-4 md:grid-cols-2", children: members.map(member => {
            const matchScore = showMatchScore && currentUser ? calculateMatchScore(member) : 0;
            return (_jsx(MemberCard, { member: member, matchScore: matchScore, showMatchScore: showMatchScore, onConnect: () => onConnectMember?.(member.id), onMessage: () => onSendMessage?.(member.id, '') }, member.id));
        }) }));
};
const GroupsTab = ({ groups, onJoinGroup, loading }) => {
    if (loading) {
        return _jsx(LoadingSkeleton, {});
    }
    if (groups.length === 0) {
        return (_jsx("div", { className: "text-center py-8 text-[var(--hive-text-secondary)]", children: "No study groups found. Try creating one or adjusting your search criteria." }));
    }
    return (_jsx("div", { className: "grid gap-4", children: groups.map(group => (_jsx(GroupCard, { group: group, onJoin: () => onJoinGroup?.(group.id) }, group.id))) }));
};
const CreateGroupTab = ({ userCourses, onCreateGroup }) => {
    const [groupName, setGroupName] = React.useState('');
    const [selectedCourse, setSelectedCourse] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [studyType, setStudyType] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!groupName || !selectedCourse || !description || !studyType)
            return;
        onCreateGroup?.({
            name: groupName,
            course: selectedCourse,
            description,
            studyType: studyType,
            maxMembers: 6,
            isPublic: true,
            tags: [],
            schedule: [],
            location: '',
            difficulty: 'intermediate'
        });
        // Reset form
        setGroupName('');
        setSelectedCourse('');
        setDescription('');
        setStudyType('');
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Group Name *" }), _jsx("input", { type: "text", value: groupName, onChange: (e) => setGroupName(e.target.value), placeholder: "e.g., CSE 115 Study Squad", className: "w-full rounded-lg border border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Course *" }), _jsx(Select, { options: userCourses.map(course => ({ value: course, label: course })), value: selectedCourse, onChange: (e) => setSelectedCourse(e.target.value), placeholder: "Select course", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Study Type *" }), _jsx(Select, { options: [
                            { value: 'exam-prep', label: 'Exam Preparation' },
                            { value: 'homework', label: 'Homework Help' },
                            { value: 'project', label: 'Project Collaboration' },
                            { value: 'ongoing', label: 'Ongoing Study Sessions' },
                            { value: 'review', label: 'Review Sessions' }
                        ], value: studyType, onChange: (e) => setStudyType(e.target.value), placeholder: "Select study type", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Description *" }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Describe what your group will focus on...", className: "w-full rounded-lg border border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] min-h-24", required: true })] }), _jsx(Button, { type: "submit", className: "w-full", children: "Create Study Group" })] }));
};
const MemberCard = ({ member, matchScore, showMatchScore, onConnect, onMessage }) => (_jsx("div", { className: "border border-[var(--hive-border-primary)] rounded-lg p-4 bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: member.avatar, alt: member.name }), _jsx(AvatarFallback, { children: member.name.split(' ').map(n => n[0]).join('') })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] truncate", children: member.name }), showMatchScore && (_jsxs(Badge, { variant: "secondary", className: cn('text-xs', getMatchColor(matchScore)), children: [matchScore, "% match"] }))] }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: [member.major, " \u2022 ", member.year] }), member.sharedCourses && member.sharedCourses.length > 0 && (_jsxs("div", { className: "mt-2 flex flex-wrap gap-1", children: [member.sharedCourses.slice(0, 3).map(course => (_jsx(Badge, { size: "sm", variant: "secondary", children: course }, course))), member.sharedCourses.length > 3 && (_jsxs(Badge, { size: "sm", variant: "secondary", children: ["+", member.sharedCourses.length - 3] }))] })), _jsxs("div", { className: "mt-3 flex gap-2", children: [_jsx(Button, { size: "sm", onClick: onConnect, children: "Connect" }), _jsx(Button, { size: "sm", variant: "ghost", onClick: onMessage, children: "Message" })] })] })] }) }));
const GroupCard = ({ group, onJoin }) => (_jsx("div", { className: "border border-[var(--hive-border-primary)] rounded-lg p-4 bg-[var(--hive-background-secondary)]", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)]", children: group.name }), _jsx(Badge, { size: "sm", variant: "secondary", children: group.course }), _jsx(Badge, { size: "sm", variant: "secondary", children: group.studyType })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mt-1", children: group.description }), _jsxs("div", { className: "flex items-center gap-4 mt-3 text-xs text-[var(--hive-text-tertiary)]", children: [_jsxs("span", { children: [group.members.length, "/", group.maxMembers, " members"] }), _jsxs("span", { children: ["Created ", group.created.toLocaleDateString()] }), group.location && _jsx("span", { children: group.location })] })] }), _jsx(Button, { size: "sm", onClick: onJoin, children: "Join Group" })] }) }));
// Loading Skeleton
const LoadingSkeleton = () => (_jsx("div", { className: "space-y-4", children: [1, 2, 3].map(i => (_jsx("div", { className: "animate-pulse border border-[var(--hive-border-primary)] rounded-lg p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-background-tertiary)] rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "h-4 bg-[var(--hive-background-tertiary)] rounded w-3/4 mb-2" }), _jsx("div", { className: "h-3 bg-[var(--hive-background-tertiary)] rounded w-1/2" })] })] }) }, i))) }));
const getMatchColor = (score) => {
    if (score >= 80)
        return 'text-[var(--hive-status-success)]';
    if (score >= 60)
        return 'text-[var(--hive-status-warning)]';
    return 'text-[var(--hive-text-secondary)]';
};
export { StudyGroupMatcher };
//# sourceMappingURL=study-group-matcher.js.map