import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../../atomic/atoms/card';
import { Button } from '../../atomic/atoms/button';
import { Text } from '../../atomic/atoms/text';
import { Badge } from '../../atomic/atoms/badge';
import { Input } from '../../atomic/atoms/input';
import { Avatar } from '../../atomic/atoms/avatar';
import { Users, Crown, Shield, Star, UserPlus, MoreVertical, Search, Mail, MessageSquare, Settings, Activity, Ban } from 'lucide-react';
const meta = {
    title: '07-Spaces/Member Management',
    parameters: {
        docs: {
            description: {
                component: 'Comprehensive member management components for HIVE Spaces - Kitchen Sink approach with all variants and edge cases',
            },
        },
    },
};
export default meta;
// Mock data for kitchen sink approach
const mockMembers = [
    {
        id: '1',
        name: 'Sarah Chen',
        handle: '@sarahc',
        email: 'sarah.chen@university.edu',
        avatar: '/placeholder-avatar.jpg',
        role: 'owner',
        status: 'active',
        joinedAt: '2023-08-15',
        lastActive: '2 minutes ago',
        contributions: 45,
        reputation: 2840,
        isOnline: true,
        permissions: ['all']
    },
    {
        id: '2',
        name: 'Marcus Rodriguez',
        handle: '@marcusr',
        email: 'marcus.rodriguez@university.edu',
        avatar: '/placeholder-avatar-2.jpg',
        role: 'admin',
        status: 'active',
        joinedAt: '2023-09-01',
        lastActive: '1 hour ago',
        contributions: 32,
        reputation: 1950,
        isOnline: true,
        permissions: ['moderate', 'invite', 'manage_content']
    },
    {
        id: '3',
        name: 'Elena Vasquez',
        handle: '@elenav',
        email: 'elena.vasquez@university.edu',
        avatar: '/placeholder-avatar-3.jpg',
        role: 'moderator',
        status: 'active',
        joinedAt: '2023-09-15',
        lastActive: '30 minutes ago',
        contributions: 28,
        reputation: 1420,
        isOnline: false,
        permissions: ['moderate', 'manage_content']
    },
    {
        id: '4',
        name: 'David Park',
        handle: '@davidp',
        email: 'david.park@university.edu',
        avatar: '/placeholder-avatar-4.jpg',
        role: 'member',
        status: 'active',
        joinedAt: '2023-10-01',
        lastActive: '2 days ago',
        contributions: 12,
        reputation: 680,
        isOnline: false,
        permissions: ['post', 'comment']
    },
    {
        id: '5',
        name: 'Jessica Wong',
        handle: '@jessicaw',
        email: 'jessica.wong@university.edu',
        avatar: '/placeholder-avatar-5.jpg',
        role: 'member',
        status: 'pending',
        joinedAt: '2023-10-15',
        lastActive: 'Never',
        contributions: 0,
        reputation: 0,
        isOnline: false,
        permissions: []
    },
    {
        id: '6',
        name: 'Alex Thompson',
        handle: '@alext',
        email: 'alex.thompson@university.edu',
        avatar: '/placeholder-avatar-6.jpg',
        role: 'member',
        status: 'suspended',
        joinedAt: '2023-08-20',
        lastActive: '1 week ago',
        contributions: 8,
        reputation: 120,
        isOnline: false,
        permissions: []
    }
];
const mockInvitePending = [
    {
        id: 'inv1',
        email: 'john.doe@university.edu',
        invitedBy: 'Sarah Chen',
        invitedAt: '2023-10-20',
        status: 'pending',
        role: 'member'
    },
    {
        id: 'inv2',
        email: 'jane.smith@university.edu',
        invitedBy: 'Marcus Rodriguez',
        invitedAt: '2023-10-18',
        status: 'expired',
        role: 'member'
    }
];
// Role Configuration
const roleConfig = {
    owner: {
        label: 'Owner',
        icon: Crown,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        permissions: 'Full access'
    },
    admin: {
        label: 'Admin',
        icon: Shield,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        permissions: 'Manage members & content'
    },
    moderator: {
        label: 'Moderator',
        icon: Star,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        permissions: 'Moderate content'
    },
    member: {
        label: 'Member',
        icon: Users,
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/10',
        borderColor: 'border-gray-500/20',
        permissions: 'Basic access'
    }
};
const statusConfig = {
    active: { label: 'Active', color: 'text-green-400', bgColor: 'bg-green-500/10' },
    pending: { label: 'Pending', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
    suspended: { label: 'Suspended', color: 'text-red-400', bgColor: 'bg-red-500/10' },
    invited: { label: 'Invited', color: 'text-blue-400', bgColor: 'bg-blue-500/10' }
};
const MemberList = ({ members, variant = 'default', showActions = true, showStats = false, showOnlineStatus = true, currentUserRole = 'member' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.handle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || member.role === filterRole;
        const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });
    const canManageMembers = ['owner', 'admin'].includes(currentUserRole);
    const canModerate = ['owner', 'admin', 'moderator'].includes(currentUserRole);
    const getMemberActions = (member) => {
        const actions = [];
        if (canManageMembers && member.role !== 'owner') {
            actions.push(_jsx(Button, { size: "sm", variant: "ghost", className: "text-blue-400 hover:text-blue-300", children: _jsx(Settings, { className: "h-4 w-4" }) }, "edit"));
        }
        if (canModerate && member.status !== 'suspended') {
            actions.push(_jsx(Button, { size: "sm", variant: "ghost", className: "text-green-400 hover:text-green-300", children: _jsx(MessageSquare, { className: "h-4 w-4" }) }, "message"));
        }
        if (canManageMembers && member.role !== 'owner' && member.status !== 'suspended') {
            actions.push(_jsx(Button, { size: "sm", variant: "ghost", className: "text-red-400 hover:text-red-300", children: _jsx(Ban, { className: "h-4 w-4" }) }, "suspend"));
        }
        return actions;
    };
    if (variant === 'compact') {
        return (_jsxs(Card, { className: "p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs(Text, { variant: "heading-sm", className: "text-[var(--hive-text-primary)]", children: ["Members (", members.length, ")"] }), _jsxs(Button, { size: "sm", className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", children: [_jsx(UserPlus, { className: "h-4 w-4 mr-2" }), "Invite"] })] }), _jsxs("div", { className: "space-y-2", children: [members.slice(0, 5).map((member) => {
                            const roleData = roleConfig[member.role];
                            const RoleIcon = roleData.icon;
                            return (_jsxs("div", { className: "flex items-center gap-3 p-2 rounded-lg hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)]", children: [_jsxs("div", { className: "relative", children: [_jsx(Avatar, { src: member.avatar, fallback: member.name.charAt(0), size: "sm", className: "border-2 border-[var(--hive-interactive-active)]" }), showOnlineStatus && member.isOnline && (_jsx("div", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[var(--hive-background-primary)]" }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] truncate font-medium", children: member.name }), _jsx(RoleIcon, { className: `h-3 w-3 ${roleData.color}` })] }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)] truncate", children: member.handle })] }), showActions && canManageMembers && (_jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }))] }, member.id));
                        }), members.length > 5 && (_jsxs(Button, { variant: "ghost", className: "w-full text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]", children: ["View all ", members.length, " members"] }))] })] }));
    }
    return (_jsxs(Card, { className: "bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs("div", { className: "p-6 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-2", children: "Space Members" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: "Manage members, roles, and permissions for this space" })] }), canManageMembers && (_jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "Settings"] }), _jsxs(Button, { className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", children: [_jsx(UserPlus, { className: "h-4 w-4 mr-2" }), "Invite Members"] })] }))] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsx(Input, { placeholder: "Search members...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10 bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]" })] }), _jsxs("select", { value: filterRole, onChange: (e) => setFilterRole(e.target.value), className: "px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "all", children: "All Roles" }), _jsx("option", { value: "owner", children: "Owners" }), _jsx("option", { value: "admin", children: "Admins" }), _jsx("option", { value: "moderator", children: "Moderators" }), _jsx("option", { value: "member", children: "Members" })] }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "suspended", children: "Suspended" })] })] })] }), showStats && (_jsx("div", { className: "p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsxs("div", { className: "grid grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-lg", className: "text-[var(--hive-text-primary)] font-bold", children: members.filter(m => m.status === 'active').length }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Active" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-lg", className: "text-[var(--hive-text-primary)] font-bold", children: members.filter(m => m.isOnline).length }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Online" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-lg", className: "text-[var(--hive-text-primary)] font-bold", children: members.filter(m => m.role === 'admin' || m.role === 'owner').length }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Admins" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-lg", className: "text-[var(--hive-text-primary)] font-bold", children: members.filter(m => m.status === 'pending').length }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Pending" })] })] }) })), _jsx("div", { className: "divide-y divide-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: filteredMembers.map((member) => {
                    const roleData = roleConfig[member.role];
                    const statusData = statusConfig[member.status];
                    const RoleIcon = roleData.icon;
                    return (_jsx("div", { className: "p-4 hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] transition-colors", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx(Avatar, { src: member.avatar, fallback: member.name.charAt(0), size: variant === 'detailed' ? 'lg' : 'md', className: "border-2 border-[var(--hive-interactive-active)]" }), showOnlineStatus && member.isOnline && (_jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[var(--hive-background-primary)]" }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Text, { variant: "heading-sm", className: "text-[var(--hive-text-primary)] truncate", children: member.name }), _jsxs("div", { className: `px-2 py-1 rounded-full ${roleData.bgColor} ${roleData.borderColor} border flex items-center gap-1`, children: [_jsx(RoleIcon, { className: `h-3 w-3 ${roleData.color}` }), _jsx(Text, { variant: "body-xs", className: roleData.color, children: roleData.label })] }), _jsx("div", { className: `px-2 py-1 rounded-full ${statusData.bgColor}`, children: _jsx(Text, { variant: "body-xs", className: statusData.color, children: statusData.label }) })] }), _jsxs("div", { className: "flex items-center gap-4 text-[var(--hive-text-tertiary)] text-sm", children: [_jsx("span", { children: member.handle }), variant === 'detailed' && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { children: member.email }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: ["Joined ", new Date(member.joinedAt).toLocaleDateString()] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: ["Last active: ", member.lastActive] })] }))] }), variant === 'detailed' && showStats && (_jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-[var(--hive-text-tertiary)]", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Activity, { className: "h-3 w-3" }), member.contributions, " contributions"] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "h-3 w-3" }), member.reputation, " reputation"] })] }))] }), showActions && (_jsxs("div", { className: "flex items-center gap-1", children: [getMemberActions(member), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(MoreVertical, { className: "h-4 w-4" }) })] }))] }) }, member.id));
                }) }), filteredMembers.length === 0 && (_jsxs("div", { className: "p-12 text-center", children: [_jsx(Users, { className: "h-16 w-16 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-2", children: "No members found" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: "Try adjusting your search or filter criteria" })] }))] }));
};
const InviteMembers = ({ variant = 'modal', onInvite, pendingInvites = mockInvitePending }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('member');
    const [message, setMessage] = useState('');
    const [emails, setEmails] = useState([]);
    const handleAddEmail = () => {
        if (email && !emails.includes(email)) {
            setEmails([...emails, email]);
            setEmail('');
        }
    };
    const handleRemoveEmail = (emailToRemove) => {
        setEmails(emails.filter(e => e !== emailToRemove));
    };
    const handleInvite = () => {
        emails.forEach(email => onInvite?.(email, role));
        setEmails([]);
        setMessage('');
    };
    return (_jsx(Card, { className: "bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx(UserPlus, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)]", children: "Invite Members" })] }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] mb-2", children: "Email addresses" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { type: "email", placeholder: "Enter email address...", value: email, onChange: (e) => setEmail(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleAddEmail(), className: "flex-1 bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]" }), _jsx(Button, { onClick: handleAddEmail, variant: "outline", className: "border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]", children: "Add" })] })] }), emails.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: emails.map((email) => (_jsxs(Badge, { variant: "secondary", className: "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30", children: [email, _jsx("button", { onClick: () => handleRemoveEmail(email), className: "ml-2 hover:text-red-400", children: "\u00D7" })] }, email))) })), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] mb-2", children: "Role" }), _jsxs("select", { value: role, onChange: (e) => setRole(e.target.value), className: "w-full px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "member", children: "Member - Basic access" }), _jsx("option", { value: "moderator", children: "Moderator - Can moderate content" }), _jsx("option", { value: "admin", children: "Admin - Can manage members" })] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] mb-2", children: "Personal message (optional)" }), _jsx("textarea", { placeholder: "Add a personal note to your invitation...", value: message, onChange: (e) => setMessage(e.target.value), rows: 3, className: "w-full px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] resize-none" })] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(Button, { onClick: handleInvite, disabled: emails.length === 0, className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)] disabled:opacity-50", children: [_jsx(Mail, { className: "h-4 w-4 mr-2" }), "Send ", emails.length, " Invitation", emails.length !== 1 ? 's' : ''] }), _jsx(Button, { variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: "Cancel" })] }), pendingInvites.length > 0 && (_jsxs("div", { className: "mt-8 pt-6 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs(Text, { variant: "heading-sm", className: "text-[var(--hive-text-primary)] mb-4", children: ["Pending Invitations (", pendingInvites.length, ")"] }), _jsx("div", { className: "space-y-2", children: pendingInvites.map((invite) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: invite.email }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: ["Invited by ", invite.invitedBy, " \u2022 ", invite.invitedAt] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: invite.status === 'pending' ? 'secondary' : 'destructive', className: invite.status === 'pending' ? 'text-yellow-400' : 'text-red-400', children: invite.status }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(MoreVertical, { className: "h-4 w-4" }) })] })] }, invite.id))) })] }))] }) }));
};
const RoleManagement = ({ member, currentUserRole, onRoleChange, onPermissionChange }) => {
    const canEditRole = ['owner', 'admin'].includes(currentUserRole) && member.role !== 'owner';
    const canEditPermissions = ['owner', 'admin'].includes(currentUserRole);
    const permissionCategories = {
        content: [
            { id: 'post', label: 'Create posts', description: 'Can create new posts in the space' },
            { id: 'comment', label: 'Comment', description: 'Can comment on posts' },
            { id: 'edit_posts', label: 'Edit posts', description: 'Can edit their own posts' },
            { id: 'delete_posts', label: 'Delete posts', description: 'Can delete their own posts' },
        ],
        moderation: [
            { id: 'moderate', label: 'Moderate content', description: 'Can moderate posts and comments' },
            { id: 'ban_members', label: 'Ban members', description: 'Can ban/suspend members' },
            { id: 'manage_reports', label: 'Manage reports', description: 'Can handle reported content' },
        ],
        management: [
            { id: 'invite', label: 'Invite members', description: 'Can invite new members to the space' },
            { id: 'manage_members', label: 'Manage members', description: 'Can edit member roles and permissions' },
            { id: 'space_settings', label: 'Space settings', description: 'Can edit space settings and details' },
        ]
    };
    return (_jsx(Card, { className: "bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-4 mb-6", children: [_jsx(Avatar, { src: member.avatar, fallback: member.name.charAt(0), size: "lg", className: "border-2 border-[var(--hive-interactive-active)]" }), _jsxs("div", { className: "flex-1", children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)]", children: member.name }), _jsxs(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: [member.handle, " \u2022 ", member.email] })] }), _jsxs("div", { className: "text-right", children: [_jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: ["Member since ", new Date(member.joinedAt).toLocaleDateString()] }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: ["Last active: ", member.lastActive] })] })] }), _jsxs("div", { className: "mb-8", children: [_jsx(Text, { variant: "heading-sm", className: "text-[var(--hive-text-primary)] mb-4", children: "Role Assignment" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: Object.entries(roleConfig).map(([roleKey, roleData]) => {
                                const RoleIcon = roleData.icon;
                                const isSelected = member.role === roleKey;
                                const canSelect = canEditRole && (currentUserRole === 'owner' ||
                                    (currentUserRole === 'admin' && roleKey !== 'owner'));
                                return (_jsxs("button", { onClick: () => canSelect && onRoleChange?.(member.id, roleKey), disabled: !canSelect, className: `
                    p-4 rounded-lg border-2 transition-all text-left
                    ${isSelected
                                        ? `${roleData.borderColor} ${roleData.bgColor}`
                                        : 'border-[var(--hive-interactive-active)] hover:border-[var(--hive-border-hover)]'}
                    ${!canSelect ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `, children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(RoleIcon, { className: `h-5 w-5 ${isSelected ? roleData.color : 'text-[var(--hive-text-tertiary)]'}` }), _jsx(Text, { variant: "body-md", className: isSelected ? roleData.color : 'text-[var(--hive-text-primary)]', children: roleData.label })] }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: roleData.permissions })] }, roleKey));
                            }) })] }), canEditPermissions && (_jsxs("div", { children: [_jsx(Text, { variant: "heading-sm", className: "text-[var(--hive-text-primary)] mb-4", children: "Detailed Permissions" }), Object.entries(permissionCategories).map(([category, permissions]) => (_jsxs("div", { className: "mb-6", children: [_jsxs(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3 capitalize", children: [category, " Permissions"] }), _jsx("div", { className: "space-y-3", children: permissions.map((permission) => {
                                        const hasPermission = member.permissions.includes(permission.id);
                                        return (_jsxs("div", { className: "flex items-center justify-between p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: permission.label }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: permission.description })] }), _jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: hasPermission, onChange: (e) => onPermissionChange?.(member.id, permission.id, e.target.checked), className: "sr-only peer" }), _jsx("div", { className: "w-11 h-6 bg-[var(--hive-interactive-active)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-[var(--hive-text-primary)] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--hive-brand-secondary)]" })] })] }, permission.id));
                                    }) })] }, category)))] })), _jsxs("div", { className: "flex justify-between pt-6 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx("div", { className: "flex gap-2", children: _jsx(Button, { variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: "Reset to Defaults" }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: "Cancel" }), _jsx(Button, { className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", children: "Save Changes" })] })] })] }) }));
};
// ============================================================================
// STORYBOOK STORIES
// ============================================================================
export const DefaultMemberList = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(MemberList, { members: mockMembers, currentUserRole: "admin", showStats: true, showOnlineStatus: true }) })),
};
export const CompactMemberList = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(MemberList, { members: mockMembers, variant: "compact", currentUserRole: "member", showActions: false }) })),
};
export const DetailedMemberList = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(MemberList, { members: mockMembers, variant: "detailed", currentUserRole: "owner", showStats: true, showOnlineStatus: true }) })),
};
export const InviteMembersModal = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(InviteMembers, { onInvite: (email, role) => console.log('Invite:', email, role), pendingInvites: mockInvitePending }) })),
};
export const MemberRoleManagement = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(RoleManagement, { member: mockMembers[1], currentUserRole: "owner", onRoleChange: (id, role) => console.log('Role change:', id, role), onPermissionChange: (id, permission, enabled) => console.log('Permission change:', id, permission, enabled) }) })),
};
export const KitchenSinkMemberManagement = {
    render: () => (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: [_jsx(Text, { variant: "display-md", className: "text-[var(--hive-text-primary)] text-center", children: "Member Management - Kitchen Sink" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx(MemberList, { members: mockMembers.slice(0, 3), variant: "compact", currentUserRole: "member" }), _jsx(InviteMembers, { variant: "compact", pendingInvites: mockInvitePending.slice(0, 2) })] }), _jsx(MemberList, { members: mockMembers, variant: "detailed", currentUserRole: "admin", showStats: true, showOnlineStatus: true }), _jsx(RoleManagement, { member: mockMembers[2], currentUserRole: "owner" })] })),
};
export const EdgeCases = {
    render: () => (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: [_jsx(Text, { variant: "display-md", className: "text-[var(--hive-text-primary)] text-center", children: "Member Management - Edge Cases" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Empty Member List" }), _jsx(MemberList, { members: [], currentUserRole: "owner" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Single Member" }), _jsx(MemberList, { members: [mockMembers[0]], currentUserRole: "member" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Suspended Members" }), _jsx(MemberList, { members: mockMembers.filter(m => m.status === 'suspended'), currentUserRole: "admin" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Limited Permissions View" }), _jsx(MemberList, { members: mockMembers, currentUserRole: "member", showActions: false })] })] })),
};
//# sourceMappingURL=member-management.stories.js.map