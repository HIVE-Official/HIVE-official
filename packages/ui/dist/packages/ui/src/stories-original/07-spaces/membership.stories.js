import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { HiveCard } from '../../components/hive-card';
import { motion, AnimatePresence } from 'framer-motion';
const meta = {
    title: '07-Spaces/Membership',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Space Membership & Roles

Member roles, permissions, and collaboration workflows within HIVE spaces. These stories demonstrate how different member types interact with spaces and each other.

## Member Roles

1. **Member** - Regular community member with basic permissions
2. **Builder** - Space administrator with management capabilities
3. **Requested Builder** - Member who has requested builder status

## Membership Features

- **Role-Based Permissions** - Different capabilities based on member role
- **Invitation System** - Invite new members to join spaces
- **Join Requests** - Handle requests to join private spaces
- **Role Promotion** - Promote members to builder status
- **Collaborative Features** - Member interactions and teamwork

## When to Use

- **Member Onboarding** - New member welcome and orientation
- **Permission Management** - Role-based access control
- **Community Building** - Member engagement and collaboration
- **Space Governance** - Member management and moderation
- **Invitation Workflows** - Growing space membership
        `,
            },
        },
    },
};
export default meta;
// Mock data for membership
const mockMembers = [
    {
        id: 'member1',
        name: 'Alex Chen',
        email: 'alex.chen@stanford.edu',
        avatar: '/api/placeholder/40/40',
        role: 'builder',
        joinedAt: new Date('2024-01-15'),
        lastActive: new Date('2024-01-20'),
        contributions: 24,
        status: 'active',
        bio: 'CS major interested in algorithms and machine learning',
        year: 'Junior',
        major: 'Computer Science',
        badges: ['founder', 'top-contributor'],
    },
    {
        id: 'member2',
        name: 'Sarah Miller',
        email: 'sarah.miller@stanford.edu',
        avatar: '/api/placeholder/40/40',
        role: 'builder',
        joinedAt: new Date('2024-01-16'),
        lastActive: new Date('2024-01-19'),
        contributions: 18,
        status: 'active',
        bio: 'TA for CS106B, love helping students learn',
        year: 'Senior',
        major: 'Computer Science',
        badges: ['ta', 'helpful'],
    },
    {
        id: 'member3',
        name: 'Mike Johnson',
        email: 'mike.johnson@stanford.edu',
        avatar: '/api/placeholder/40/40',
        role: 'member',
        joinedAt: new Date('2024-01-18'),
        lastActive: new Date('2024-01-20'),
        contributions: 12,
        status: 'active',
        bio: 'Sophomore studying CS and Math',
        year: 'Sophomore',
        major: 'Computer Science & Mathematics',
        badges: ['active-member'],
    },
    {
        id: 'member4',
        name: 'Emily Davis',
        email: 'emily.davis@stanford.edu',
        avatar: '/api/placeholder/40/40',
        role: 'member',
        joinedAt: new Date('2024-01-19'),
        lastActive: new Date('2024-01-19'),
        contributions: 8,
        status: 'active',
        bio: 'Pre-med student taking CS courses',
        year: 'Freshman',
        major: 'Biology',
        badges: ['newcomer'],
    },
    {
        id: 'member5',
        name: 'David Wilson',
        email: 'david.wilson@stanford.edu',
        avatar: '/api/placeholder/40/40',
        role: 'requested_builder',
        joinedAt: new Date('2024-01-20'),
        lastActive: new Date('2024-01-20'),
        contributions: 15,
        status: 'active',
        bio: 'Passionate about algorithms and competitive programming',
        year: 'Sophomore',
        major: 'Computer Science',
        badges: ['problem-solver'],
    },
];
const mockSpace = {
    id: 'space123',
    name: 'Stanford CS Study Group',
    memberCount: 156,
    settings: {
        privacy: 'public',
        allowInvites: true,
        requireApproval: false,
        maxMembers: 500,
    },
};
const mockInvitations = [
    {
        id: 'inv1',
        email: 'john.doe@stanford.edu',
        invitedBy: 'Alex Chen',
        invitedAt: new Date('2024-01-19'),
        status: 'pending',
        role: 'member',
    },
    {
        id: 'inv2',
        email: 'jane.smith@stanford.edu',
        invitedBy: 'Sarah Miller',
        invitedAt: new Date('2024-01-18'),
        status: 'pending',
        role: 'member',
    },
    {
        id: 'inv3',
        email: 'bob.wilson@stanford.edu',
        invitedBy: 'Alex Chen',
        invitedAt: new Date('2024-01-17'),
        status: 'accepted',
        role: 'member',
    },
];
// Member Card Component
const MemberCard = ({ member, canManage, onRoleChange, onRemove, onViewProfile }) => (_jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-sm font-medium", children: member.name.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-medium truncate", children: member.name }), _jsx(HiveBadge, { variant: member.role === 'builder' ? 'default' : 'outline', size: "sm", className: "capitalize", children: member.role.replace('_', ' ') })] }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: member.bio }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-500", children: [_jsxs("span", { children: [member.year, " \u2022 ", member.major] }), _jsxs("span", { children: [member.contributions, " contributions"] }), _jsxs("span", { children: ["Joined ", member.joinedAt.toLocaleDateString()] })] }), _jsx("div", { className: "flex items-center gap-1 mt-2", children: member.badges.map((badge) => (_jsx("span", { className: "text-xs bg-gray-100 px-2 py-1 rounded-full", children: badge }, badge))) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { size: "sm", variant: "outline", onClick: () => onViewProfile(member.id), children: "View Profile" }), canManage && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsxs("select", { value: member.role, onChange: (e) => onRoleChange(member.id, e.target.value), className: "text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-hive-gold", children: [_jsx("option", { value: "member", children: "Member" }), _jsx("option", { value: "builder", children: "Builder" })] }), _jsx("button", { onClick: () => onRemove(member.id), className: "text-xs text-red-600 hover:text-red-700 px-2 py-1", children: "Remove" })] }))] })] }) }));
// Role Comparison Component
const RoleComparison = () => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(HiveCard, { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { className: "text-lg", children: "\uD83D\uDC64" }), _jsx("h3", { className: "font-semibold", children: "Member" })] }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "View all content" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "Create posts and comments" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "React to posts" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "Join events" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "Use tools" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-red-500", children: "\u2717" }), _jsx("span", { children: "Moderate content" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-red-500", children: "\u2717" }), _jsx("span", { children: "Manage members" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-red-500", children: "\u2717" }), _jsx("span", { children: "Edit space settings" })] })] })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { className: "text-lg", children: "\uD83D\uDEE0\uFE0F" }), _jsx("h3", { className: "font-semibold", children: "Builder" })] }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "All member permissions" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "Pin and unpin posts" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "Delete inappropriate content" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "Invite new members" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "Manage member roles" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "Edit space settings" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "Deploy and manage tools" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2713" }), _jsx("span", { children: "Access analytics" })] })] })] })] }));
export const MemberRoleComparison = {
    render: () => {
        const [selectedRole, setSelectedRole] = useState('member');
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Member Role Comparison" }), _jsx("p", { className: "text-gray-600", children: "Understanding different member roles and their capabilities" })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6 mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Select Role to View" }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("button", { onClick: () => setSelectedRole('member'), className: `
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${selectedRole === 'member'
                                            ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `, children: [_jsx("span", { children: "\uD83D\uDC64" }), _jsx("span", { children: "Member" })] }), _jsxs("button", { onClick: () => setSelectedRole('builder'), className: `
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${selectedRole === 'builder'
                                            ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `, children: [_jsx("span", { children: "\uD83D\uDEE0\uFE0F" }), _jsx("span", { children: "Builder" })] })] })] }), _jsx("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6 mb-6", children: _jsxs(AnimatePresence, { mode: "wait", children: [selectedRole === 'member' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDC64" }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "Member" }), _jsx("p", { className: "text-gray-600", children: "Regular community member" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "What Members Can Do" }), _jsxs("ul", { className: "space-y-1 text-sm", children: [_jsx("li", { children: "\u2022 View all space content" }), _jsx("li", { children: "\u2022 Create posts and comments" }), _jsx("li", { children: "\u2022 React to posts with hearts and helpful votes" }), _jsx("li", { children: "\u2022 Join events and activities" }), _jsx("li", { children: "\u2022 Use deployed tools" }), _jsx("li", { children: "\u2022 Update their profile information" }), _jsx("li", { children: "\u2022 Leave the space if desired" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Member Experience" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "p-3 bg-gray-50 rounded-lg", children: [_jsx("h5", { className: "font-medium text-sm", children: "Typical Day" }), _jsx("p", { className: "text-xs text-gray-600", children: "Check posts, ask questions, join study sessions, use tools" })] }), _jsxs("div", { className: "p-3 bg-gray-50 rounded-lg", children: [_jsx("h5", { className: "font-medium text-sm", children: "Growth Path" }), _jsx("p", { className: "text-xs text-gray-600", children: "Active members can request builder status" })] })] })] })] })] }, "member")), selectedRole === 'builder' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDEE0\uFE0F" }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "Builder" }), _jsx("p", { className: "text-gray-600", children: "Space administrator and community leader" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Additional Builder Capabilities" }), _jsxs("ul", { className: "space-y-1 text-sm", children: [_jsx("li", { children: "\u2022 All member permissions" }), _jsx("li", { children: "\u2022 Pin and unpin important posts" }), _jsx("li", { children: "\u2022 Delete inappropriate content" }), _jsx("li", { children: "\u2022 Invite new members to the space" }), _jsx("li", { children: "\u2022 Promote members to builder status" }), _jsx("li", { children: "\u2022 Edit space settings and privacy" }), _jsx("li", { children: "\u2022 Deploy and manage tools" }), _jsx("li", { children: "\u2022 Access detailed analytics" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Builder Responsibilities" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "p-3 bg-[var(--hive-brand-secondary)]/10 rounded-lg", children: [_jsx("h5", { className: "font-medium text-sm", children: "Community Leadership" }), _jsx("p", { className: "text-xs text-gray-600", children: "Guide discussions, moderate content, foster growth" })] }), _jsxs("div", { className: "p-3 bg-[var(--hive-brand-secondary)]/10 rounded-lg", children: [_jsx("h5", { className: "font-medium text-sm", children: "Technical Management" }), _jsx("p", { className: "text-xs text-gray-600", children: "Configure space, deploy tools, manage permissions" })] })] })] })] })] }, "builder"))] }) }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Role Comparison" }), _jsx(RoleComparison, {})] })] }) }));
    },
};
export const InvitationFlow = {
    render: () => {
        const [invitations, setInvitations] = useState(mockInvitations);
        const [showInviteModal, setShowInviteModal] = useState(false);
        const [inviteForm, setInviteForm] = useState({
            email: '',
            role: 'member',
            message: '',
        });
        const handleSendInvitation = () => {
            if (inviteForm.email) {
                const newInvitation = {
                    id: `inv${invitations.length + 1}`,
                    email: inviteForm.email,
                    invitedBy: 'Alex Chen',
                    invitedAt: new Date(),
                    status: 'pending',
                    role: inviteForm.role,
                };
                setInvitations([newInvitation, ...invitations]);
                setInviteForm({ email: '', role: 'member', message: '' });
                setShowInviteModal(false);
            }
        };
        const handleResendInvitation = (invitationId) => {
            setInvitations(invitations.map(inv => inv.id === invitationId
                ? { ...inv, invitedAt: new Date() }
                : inv));
        };
        const handleCancelInvitation = (invitationId) => {
            setInvitations(invitations.filter(inv => inv.id !== invitationId));
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Invitation System" }), _jsx("p", { className: "text-gray-600", children: "Invite new members to join your space" })] }), _jsx(HiveButton, { onClick: () => setShowInviteModal(true), children: "Send Invitation" })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-secondary)]", children: invitations.filter(inv => inv.status === 'pending').length }), _jsx("div", { className: "text-sm text-gray-600", children: "Pending Invitations" })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: invitations.filter(inv => inv.status === 'accepted').length }), _jsx("div", { className: "text-sm text-gray-600", children: "Accepted" })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gray-600", children: invitations.length }), _jsx("div", { className: "text-sm text-gray-600", children: "Total Sent" })] }) })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border", children: [_jsx("div", { className: "p-6 border-b", children: _jsx("h2", { className: "text-xl font-semibold", children: "Recent Invitations" }) }), _jsx("div", { className: "divide-y", children: invitations.map((invitation) => (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-lg", children: "\uD83D\uDCE7" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: invitation.email }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Invited by ", invitation.invitedBy, " \u2022 ", invitation.invitedAt.toLocaleDateString()] }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(HiveBadge, { variant: "outline", size: "sm", className: "capitalize", children: invitation.role }), _jsx(HiveBadge, { variant: invitation.status === 'accepted' ? 'default' : 'outline', size: "sm", className: `
                              ${invitation.status === 'accepted' ? 'bg-green-500 text-[var(--hive-text-primary)]' :
                                                                            invitation.status === 'pending' ? 'bg-yellow-500 text-[var(--hive-text-primary)]' : ''}
                            `, children: invitation.status })] })] })] }), _jsx("div", { className: "flex items-center gap-2", children: invitation.status === 'pending' && (_jsxs(_Fragment, { children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => handleResendInvitation(invitation.id), children: "Resend" }), _jsx("button", { onClick: () => handleCancelInvitation(invitation.id), className: "text-red-600 hover:text-red-700 text-sm px-2 py-1", children: "Cancel" })] })) })] }) }, invitation.id))) })] }), showInviteModal && (_jsx("div", { className: "fixed inset-0 bg-[var(--hive-background-primary)] bg-opacity-50 flex items-center justify-center p-4 z-50", children: _jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "bg-[var(--hive-text-primary)] rounded-lg p-6 max-w-md w-full", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Invite New Member" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Email Address" }), _jsx("input", { type: "email", value: inviteForm.email, onChange: (e) => setInviteForm({ ...inviteForm, email: e.target.value }), placeholder: "Enter email address", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Role" }), _jsxs("select", { value: inviteForm.role, onChange: (e) => setInviteForm({ ...inviteForm, role: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", children: [_jsx("option", { value: "member", children: "Member" }), _jsx("option", { value: "builder", children: "Builder" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Personal Message (Optional)" }), _jsx("textarea", { value: inviteForm.message, onChange: (e) => setInviteForm({ ...inviteForm, message: e.target.value }), placeholder: "Add a personal message to the invitation...", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", rows: 3 })] }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3", children: [_jsx("h4", { className: "font-medium text-blue-900 mb-1", children: "Invitation Preview" }), _jsxs("p", { className: "text-sm text-blue-800", children: [inviteForm.email || 'user@stanford.edu', " will receive an email invitation to join", ' ', _jsx("strong", { children: mockSpace.name }), " as a ", _jsx("strong", { children: inviteForm.role }), "."] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx(HiveButton, { variant: "outline", onClick: () => setShowInviteModal(false), children: "Cancel" }), _jsx(HiveButton, { onClick: handleSendInvitation, disabled: !inviteForm.email, children: "Send Invitation" })] })] }) }))] }) }));
    },
};
export const JoinRequestFlow = {
    render: () => {
        const [joinRequests, setJoinRequests] = useState([
            {
                id: 'req1',
                name: 'John Smith',
                email: 'john.smith@stanford.edu',
                requestedAt: new Date('2024-01-20'),
                reason: 'I\'m a CS major interested in joining study groups and collaborating on projects.',
                year: 'Sophomore',
                major: 'Computer Science',
                status: 'pending',
            },
            {
                id: 'req2',
                name: 'Lisa Brown',
                email: 'lisa.brown@stanford.edu',
                requestedAt: new Date('2024-01-19'),
                reason: 'Looking for a supportive community to help with CS coursework and make new friends.',
                year: 'Freshman',
                major: 'Computer Science',
                status: 'pending',
            },
        ]);
        const handleApproveRequest = (requestId) => {
            setJoinRequests(joinRequests.map(req => req.id === requestId
                ? { ...req, status: 'approved' }
                : req));
        };
        const handleDeclineRequest = (requestId) => {
            setJoinRequests(joinRequests.map(req => req.id === requestId
                ? { ...req, status: 'declined' }
                : req));
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Join Request Management" }), _jsx("p", { className: "text-gray-600", children: "Review and approve requests to join your space" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-secondary)]", children: joinRequests.filter(req => req.status === 'pending').length }), _jsx("div", { className: "text-sm text-gray-600", children: "Pending Requests" })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: joinRequests.filter(req => req.status === 'approved').length }), _jsx("div", { className: "text-sm text-gray-600", children: "Approved" })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-red-600", children: joinRequests.filter(req => req.status === 'declined').length }), _jsx("div", { className: "text-sm text-gray-600", children: "Declined" })] }) })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border", children: [_jsx("div", { className: "p-6 border-b", children: _jsx("h2", { className: "text-xl font-semibold", children: "Join Requests" }) }), _jsx("div", { className: "divide-y", children: joinRequests.map((request) => (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-sm font-medium", children: request.name.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: request.name }), _jsx("div", { className: "text-sm text-gray-600", children: request.email }), _jsxs("div", { className: "text-sm text-gray-600 mt-1", children: [request.year, " \u2022 ", request.major] }), _jsxs("div", { className: "text-sm text-gray-600 mt-1", children: ["Requested ", request.requestedAt.toLocaleDateString()] }), _jsxs("div", { className: "mt-3 p-3 bg-gray-50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-sm mb-1", children: "Why they want to join:" }), _jsx("p", { className: "text-sm text-gray-700", children: request.reason })] })] })] }), _jsx("div", { className: "flex items-center gap-2", children: request.status === 'pending' ? (_jsxs(_Fragment, { children: [_jsx(HiveButton, { size: "sm", onClick: () => handleApproveRequest(request.id), children: "Approve" }), _jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => handleDeclineRequest(request.id), children: "Decline" })] })) : (_jsx(HiveBadge, { variant: request.status === 'approved' ? 'default' : 'outline', className: `
                            ${request.status === 'approved' ? 'bg-green-500 text-[var(--hive-text-primary)]' :
                                                        request.status === 'declined' ? 'bg-red-500 text-[var(--hive-text-primary)]' : ''}
                          `, children: request.status })) })] }) }, request.id))) })] }), _jsxs("div", { className: "mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "\uD83D\uDCA1 Join Request Guidelines" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Review each request carefully to ensure they're a good fit for the space" }), _jsx("li", { children: "\u2022 Consider their background, year, and stated interest in the community" }), _jsx("li", { children: "\u2022 Approve requests that align with the space's purpose and values" }), _jsx("li", { children: "\u2022 Provide feedback when declining requests to help them improve" })] })] })] }) }));
    },
};
export const PermissionMatrix = {
    render: () => {
        const permissions = [
            {
                action: 'View Content',
                member: true,
                builder: true,
                description: 'View posts, comments, and other space content',
            },
            {
                action: 'Create Posts',
                member: true,
                builder: true,
                description: 'Create new posts and discussions',
            },
            {
                action: 'Comment on Posts',
                member: true,
                builder: true,
                description: 'Reply to posts and engage in discussions',
            },
            {
                action: 'React to Posts',
                member: true,
                builder: true,
                description: 'Add heart and helpful reactions',
            },
            {
                action: 'Join Events',
                member: true,
                builder: true,
                description: 'RSVP to and attend space events',
            },
            {
                action: 'Use Tools',
                member: true,
                builder: true,
                description: 'Use deployed tools and resources',
            },
            {
                action: 'Pin Posts',
                member: false,
                builder: true,
                description: 'Pin important posts to the top',
            },
            {
                action: 'Delete Posts',
                member: false,
                builder: true,
                description: 'Remove inappropriate or spam content',
            },
            {
                action: 'Invite Members',
                member: false,
                builder: true,
                description: 'Send invitations to new members',
            },
            {
                action: 'Manage Members',
                member: false,
                builder: true,
                description: 'Promote, demote, or remove members',
            },
            {
                action: 'Edit Space Settings',
                member: false,
                builder: true,
                description: 'Modify space configuration and privacy',
            },
            {
                action: 'Deploy Tools',
                member: false,
                builder: true,
                description: 'Add and configure tools for the space',
            },
            {
                action: 'View Analytics',
                member: false,
                builder: true,
                description: 'Access detailed space analytics',
            },
        ];
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Permission Matrix" }), _jsx("p", { className: "text-gray-600", children: "Detailed breakdown of what each role can do" })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border overflow-hidden", children: [_jsx("div", { className: "p-6 border-b", children: _jsx("h2", { className: "text-xl font-semibold", children: "Role-Based Permissions" }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Action" }), _jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Member" }), _jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Builder" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" })] }) }), _jsx("tbody", { className: "bg-[var(--hive-text-primary)] divide-y divide-gray-200", children: permissions.map((permission, index) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("div", { className: "font-medium text-gray-900", children: permission.action }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-center", children: _jsx("span", { className: `
                          inline-flex items-center justify-center w-6 h-6 rounded-full
                          ${permission.member ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                        `, children: permission.member ? '✓' : '✗' }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-center", children: _jsx("span", { className: `
                          inline-flex items-center justify-center w-6 h-6 rounded-full
                          ${permission.builder ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                        `, children: permission.builder ? '✓' : '✗' }) }), _jsx("td", { className: "px-6 py-4", children: _jsx("div", { className: "text-sm text-gray-600", children: permission.description }) })] }, index))) })] }) })] }), _jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "\uD83D\uDC64 Member Notes" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 All members have full access to view and engage with content" }), _jsx("li", { children: "\u2022 Members can create and participate in discussions" }), _jsx("li", { children: "\u2022 Members can join events and use available tools" }), _jsx("li", { children: "\u2022 Members can request to become builders" })] })] }), _jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-yellow-900 mb-2", children: "\uD83D\uDEE0\uFE0F Builder Notes" }), _jsxs("ul", { className: "text-sm text-yellow-800 space-y-1", children: [_jsx("li", { children: "\u2022 Builders have all member permissions plus administrative access" }), _jsx("li", { children: "\u2022 Builders are responsible for community moderation" }), _jsx("li", { children: "\u2022 Builders can manage members and space settings" }), _jsx("li", { children: "\u2022 Builders have access to analytics and insights" })] })] })] })] }) }));
    },
};
export const CollaborativeExperience = {
    render: () => {
        const [members] = useState(mockMembers);
        const [activeCollaborations, setActiveCollaborations] = useState([
            {
                id: 'collab1',
                name: 'Algorithm Study Session',
                type: 'study-group',
                members: ['member1', 'member3', 'member4'],
                status: 'active',
                startedAt: new Date('2024-01-20T14:00:00'),
                description: 'Working through dynamic programming problems together',
            },
            {
                id: 'collab2',
                name: 'CS106B Project Review',
                type: 'project-review',
                members: ['member2', 'member5'],
                status: 'active',
                startedAt: new Date('2024-01-20T13:30:00'),
                description: 'Reviewing code for the maze solver project',
            },
        ]);
        const getCollaborationMembers = (collaboration) => {
            return members.filter(member => collaboration.members.includes(member.id));
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Collaborative Experience" }), _jsx("p", { className: "text-gray-600", children: "How members work together in the space" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Active Collaborations" }), _jsx("div", { className: "space-y-4", children: activeCollaborations.map((collaboration) => (_jsxs(HiveCard, { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: collaboration.name }), _jsx("p", { className: "text-sm text-gray-600", children: collaboration.description })] }), _jsx(HiveBadge, { variant: "default", size: "sm", children: collaboration.type.replace('-', ' ') })] }), _jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Participants:" }), _jsx("div", { className: "flex -space-x-2", children: getCollaborationMembers(collaboration).map((member) => (_jsx("div", { className: "w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white", title: member.name, children: member.name.split(' ').map(n => n[0]).join('') }, member.id))) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-sm text-gray-500", children: ["Started ", collaboration.startedAt.toLocaleTimeString()] }), _jsx(HiveButton, { size: "sm", variant: "outline", children: "Join" })] })] }, collaboration.id))) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Community Members" }), _jsx("div", { className: "space-y-3", children: members.map((member) => (_jsx(MemberCard, { member: member, canManage: false, onRoleChange: () => { }, onRemove: () => { }, onViewProfile: () => { } }, member.id))) })] })] }), _jsxs("div", { className: "mt-8 bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Collaboration Features" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [_jsx("h3", { className: "font-medium text-blue-900 mb-2", children: "\uD83D\uDCDA Study Groups" }), _jsx("p", { className: "text-sm text-blue-800", children: "Form study groups with classmates to work through problems together" })] }), _jsxs("div", { className: "p-4 bg-green-50 rounded-lg", children: [_jsx("h3", { className: "font-medium text-green-900 mb-2", children: "\uD83D\uDD27 Project Collaboration" }), _jsx("p", { className: "text-sm text-green-800", children: "Work together on coding projects and get feedback from peers" })] }), _jsxs("div", { className: "p-4 bg-purple-50 rounded-lg", children: [_jsx("h3", { className: "font-medium text-purple-900 mb-2", children: "\uD83D\uDCA1 Knowledge Sharing" }), _jsx("p", { className: "text-sm text-purple-800", children: "Share resources, tips, and insights with the community" })] })] })] })] }) }));
    },
};
//# sourceMappingURL=membership.stories.js.map