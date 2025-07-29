import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveChatSurface, HiveEventsSurface, HiveMembersSurface, HivePinnedSurface, HivePostsSurface, HiveToolsSurface } from '../../components';
import { MessageCircle, Calendar, Users, Pin, FileText, Wrench, Star } from 'lucide-react';
const meta = {
    title: '09-Surfaces/Surface Components',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
**HIVE 6-Surface Architecture Components**

The complete set of surface components that implement HIVE's revolutionary 6-surface architecture for Spaces. Each surface provides specialized functionality for different types of campus content and community interaction.

## The 6 Surfaces
1. **Pinned Surface** - Critical announcements and persistent information
2. **Posts Surface** - Community discussions and social interactions
3. **Events Surface** - Campus events and academic calendar management
4. **Tools Surface** - Student-built tools and utilities marketplace
5. **Chat Surface** - Real-time community communication
6. **Members Surface** - Community directory and member management

## Design Principles
- **Campus Infrastructure**: Feels like comprehensive university platform
- **Surface Clarity**: Each surface has distinct purpose and visual identity
- **Glass Morphism**: Consistent with HIVE's matte obsidian aesthetic
- **Liquid Metal Motion**: Smooth transitions with magnetic interactions
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
        `,
            },
        },
    },
};
export default meta;
// Mock data matching actual component interfaces
const mockMessages = [
    {
        id: '1',
        content: 'Just finished the new component library! 🎉',
        type: 'text',
        authorId: 'user1',
        authorName: 'Sarah Chen',
        authorAvatar: '/avatar1.jpg',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        status: 'read',
        isEdited: false,
        isPinned: false,
        reactions: [{ emoji: '🎉', count: 3, userIds: ['user2', 'user3', 'user4'] }],
    },
    {
        id: '2',
        content: 'The new dark theme looks incredible. Great work team!',
        type: 'text',
        authorId: 'user2',
        authorName: 'Alex Johnson',
        authorAvatar: '/avatar2.jpg',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        status: 'delivered',
        isEdited: false,
        isPinned: false,
        reactions: [{ emoji: '🔥', count: 5, userIds: ['user1', 'user3', 'user4', 'user5', 'user6'] }],
    },
    {
        id: '3',
        content: 'Can we review the user flow for the onboarding process tomorrow?',
        type: 'text',
        authorId: 'user3',
        authorName: 'Jordan Kim',
        authorAvatar: '/avatar3.jpg',
        timestamp: new Date(Date.now() - 12 * 60 * 1000),
        status: 'sent',
        isEdited: false,
        isPinned: false,
        reactions: [],
    },
];
const mockEvents = [
    {
        id: '1',
        title: 'Design System Review',
        description: 'Weekly review of component updates and new patterns',
        startDate: new Date('2024-01-15T14:00:00'),
        endDate: new Date('2024-01-15T15:00:00'),
        type: 'meeting',
        location: 'Virtual - Zoom Room A',
        organizerId: 'user1',
        organizerName: 'Sarah Chen',
        attendeeCount: 8,
        maxAttendees: 15,
        isRecurring: true,
        tags: ['design-system', 'review'],
        rsvpStatus: 'going',
    },
    {
        id: '2',
        title: 'Product Launch',
        description: 'Launch of the new HIVE collaboration tools',
        startDate: new Date('2024-01-20T10:00:00'),
        endDate: new Date('2024-01-20T12:00:00'),
        type: 'milestone',
        location: 'Main Conference Room',
        organizerId: 'user3',
        organizerName: 'Jordan Kim',
        attendeeCount: 25,
        maxAttendees: 30,
        isRecurring: false,
        tags: ['product', 'launch', 'milestone'],
        rsvpStatus: 'going',
    },
    {
        id: '3',
        title: 'Team Building',
        description: 'Virtual team building activities and games',
        startDate: new Date('2024-01-22T16:00:00'),
        endDate: new Date('2024-01-22T18:00:00'),
        type: 'social',
        location: 'Virtual - Games Platform',
        organizerId: 'user2',
        organizerName: 'Alex Johnson',
        attendeeCount: 12,
        maxAttendees: 20,
        isRecurring: false,
        tags: ['team-building', 'social'],
        rsvpStatus: 'maybe',
    },
];
const mockMembers = [
    {
        id: '1',
        username: 'jacobsmith',
        displayName: 'Jacob Smith',
        avatar: '/avatar-jacob.jpg',
        role: 'owner',
        status: 'online',
        joinedAt: new Date('2023-01-01'),
        lastActiveAt: new Date(),
        isVerified: true,
        badges: ['founder', 'verified'],
        contributionCount: 142,
        reputation: 2840,
    },
    {
        id: '2',
        username: 'sarahchen',
        displayName: 'Sarah Chen',
        avatar: '/avatar-sarah.jpg',
        role: 'admin',
        status: 'online',
        joinedAt: new Date('2023-01-15'),
        lastActiveAt: new Date(Date.now() - 2 * 60 * 1000),
        isVerified: true,
        badges: ['designer', 'verified'],
        contributionCount: 89,
        reputation: 1780,
    },
    {
        id: '3',
        username: 'alexjohnson',
        displayName: 'Alex Johnson',
        avatar: '/avatar-alex.jpg',
        role: 'member',
        status: 'away',
        joinedAt: new Date('2023-02-01'),
        lastActiveAt: new Date(Date.now() - 60 * 60 * 1000),
        isVerified: true,
        badges: ['developer'],
        contributionCount: 76,
        reputation: 1520,
    },
    {
        id: '4',
        username: 'jordankim',
        displayName: 'Jordan Kim',
        avatar: '/avatar-jordan.jpg',
        role: 'member',
        status: 'offline',
        joinedAt: new Date('2023-02-15'),
        lastActiveAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        isVerified: false,
        badges: ['product'],
        contributionCount: 54,
        reputation: 1080,
    },
];
const mockPosts = [
    {
        id: '1',
        type: 'discussion',
        title: 'New Design System Components Released',
        content: 'Excited to share our new design system components! The dark luxury theme really elevates the user experience.',
        authorId: 'user1',
        authorName: 'Sarah Chen',
        authorAvatar: '/avatar1.jpg',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isEdited: false,
        isPinned: false,
        likeCount: 24,
        commentCount: 8,
        shareCount: 3,
        viewCount: 156,
        tags: ['design-system', 'components', 'ui'],
    },
    {
        id: '2',
        type: 'announcement',
        title: 'Performance Optimization Update',
        content: 'Just deployed the new performance optimizations. Page load times improved by 40%! 🚀',
        authorId: 'user2',
        authorName: 'Alex Johnson',
        authorAvatar: '/avatar2.jpg',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isEdited: false,
        isPinned: false,
        likeCount: 18,
        commentCount: 5,
        shareCount: 2,
        viewCount: 89,
        tags: ['performance', 'optimization', 'development'],
    },
    {
        id: '3',
        type: 'announcement',
        title: 'Amazing User Feedback Milestone',
        content: 'User feedback has been amazing! Our NPS score increased to 85. Thanks everyone for the incredible work.',
        authorId: 'user3',
        authorName: 'Jordan Kim',
        authorAvatar: '/avatar3.jpg',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isEdited: false,
        isPinned: true,
        likeCount: 32,
        commentCount: 12,
        shareCount: 6,
        viewCount: 234,
        tags: ['metrics', 'user-feedback', 'milestone'],
    },
];
const mockTools = [
    {
        id: '1',
        name: 'Color Palette Generator',
        description: 'Generate HIVE-compliant color palettes for your designs',
        status: 'published',
        icon: '🎨',
        version: '1.2.0',
        creatorId: 'user1',
        creatorName: 'Sarah Chen',
        category: 'Design',
        tags: ['colors', 'design', 'palette'],
        addedAt: new Date('2023-12-01'),
        updatedAt: new Date('2024-01-15'),
        useCount: 1247,
        favoriteCount: 89,
        rating: 4.8,
        reviewCount: 34,
        isFeatured: true,
        isVerified: true,
    },
    {
        id: '2',
        name: 'Component Builder',
        description: 'Visual component builder with live preview and code generation',
        status: 'published',
        icon: '🔧',
        version: '2.0.1',
        creatorId: 'user2',
        creatorName: 'Alex Johnson',
        category: 'Development',
        tags: ['components', 'builder', 'code'],
        addedAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18'),
        useCount: 892,
        favoriteCount: 67,
        rating: 4.9,
        reviewCount: 23,
        isFeatured: false,
        isVerified: true,
    },
    {
        id: '3',
        name: 'User Flow Designer',
        description: 'Create and share user flows with team collaboration features',
        status: 'published',
        icon: '📊',
        version: '1.0.3',
        creatorId: 'user3',
        creatorName: 'Jordan Kim',
        category: 'Product',
        tags: ['user-flow', 'collaboration', 'design'],
        addedAt: new Date('2023-11-15'),
        updatedAt: new Date('2024-01-05'),
        useCount: 634,
        favoriteCount: 45,
        rating: 4.7,
        reviewCount: 18,
        isFeatured: false,
        isVerified: false,
    },
];
// Sample space for all surface components
const sampleSpace = {
    id: 'cs-stanford',
    name: 'Computer Science',
    university: 'Stanford University',
    description: 'The official Computer Science space for Stanford students.',
    memberCount: 2156,
    verified: true,
    cover: 'https://picsum.photos/1200/300?random=1',
};
// Chat Surface
export const ChatSurface = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "HIVE Chat Surface" }), _jsx("div", { className: "max-w-4xl", children: _jsx(HiveChatSurface, { space: sampleSpace, messages: mockMessages, currentUserId: "current-user", onSendMessage: (content) => console.log('Send:', content), onReactToMessage: (messageId, emoji) => console.log('React:', messageId, emoji), canSendMessages: true, enableFileSharing: true, enableVoiceMessages: false }) }), _jsxs("div", { className: "mt-12 bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Chat Features" }), _jsxs("ul", { className: "text-[var(--hive-text-secondary)] space-y-2", children: [_jsx("li", { children: "\u2022 Real-time messaging with typing indicators" }), _jsx("li", { children: "\u2022 Emoji reactions and message threading" }), _jsx("li", { children: "\u2022 File attachments and media sharing" }), _jsx("li", { children: "\u2022 User mentions and notifications" }), _jsx("li", { children: "\u2022 Message history and search" }), _jsx("li", { children: "\u2022 Dark luxury theme with glass morphism" })] })] })] })),
};
// Events Surface
export const EventsSurface = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "HIVE Events Surface" }), _jsx("div", { className: "max-w-4xl", children: _jsx(HiveEventsSurface, { space: sampleSpace, events: mockEvents, currentUserId: "current-user", onEventClick: (event) => console.log('Event clicked:', event), onCreateEvent: () => console.log('Create event'), canCreateEvents: true }) }), _jsxs("div", { className: "mt-12 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-4", children: "Calendar View" }), _jsx("div", { className: "bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-primary)] p-6", children: _jsx(HiveEventsSurface, { space: sampleSpace, events: mockEvents, currentUserId: "current-user", onEventClick: (event) => console.log('Event clicked:', event) }) })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Event Types" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-3 h-3 bg-[var(--hive-status-info)] rounded-full" }), _jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Meetings - Team discussions and reviews" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-3 h-3 bg-[var(--hive-brand-secondary)] rounded-full" }), _jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Milestones - Important project markers" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-3 h-3 bg-[var(--hive-status-success)] rounded-full" }), _jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Social - Team building and community" })] })] })] })] })] })),
};
// Members Surface
export const MembersSurface = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "HIVE Members Surface" }), _jsx("div", { className: "max-w-4xl", children: _jsx(HiveMembersSurface, { space: sampleSpace, members: mockMembers, currentUserId: "current-user", onMemberClick: (member) => console.log('Member clicked:', member), onInviteMember: () => console.log('Invite member'), canManageMembers: true }) }), _jsxs("div", { className: "mt-12 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-4", children: "List View" }), _jsx("div", { className: "bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-primary)] p-6", children: _jsx(HiveMembersSurface, { space: sampleSpace, members: mockMembers, currentUserId: "current-user", canManageMembers: false }) })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Member Features" }), _jsxs("ul", { className: "text-[var(--hive-text-secondary)] space-y-2", children: [_jsx("li", { children: "\u2022 Real-time online status indicators" }), _jsx("li", { children: "\u2022 Role-based permissions and access control" }), _jsx("li", { children: "\u2022 Contribution tracking and analytics" }), _jsx("li", { children: "\u2022 Member profiles with activity history" }), _jsx("li", { children: "\u2022 Invitation management and onboarding" }), _jsx("li", { children: "\u2022 Grid and list view modes" })] })] })] })] })),
};
// Posts Surface
export const PostsSurface = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "HIVE Posts Surface" }), _jsx("div", { className: "max-w-4xl", children: _jsx(HivePostsSurface, { space: sampleSpace, posts: mockPosts, currentUserId: "current-user", onLikePost: (postId) => console.log('Like:', postId), onCommentPost: (postId) => console.log('Comment:', postId), onSharePost: (postId) => console.log('Share:', postId), onCreatePost: () => console.log('Create post'), canCreatePosts: true }) }), _jsxs("div", { className: "mt-12 bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Post Features" }), _jsxs("ul", { className: "text-[var(--hive-text-secondary)] space-y-2", children: [_jsx("li", { children: "\u2022 Rich text editor with media attachments" }), _jsx("li", { children: "\u2022 Like, comment, and share interactions" }), _jsx("li", { children: "\u2022 Tag-based categorization and filtering" }), _jsx("li", { children: "\u2022 Pinned posts for important announcements" }), _jsx("li", { children: "\u2022 Real-time updates and notifications" }), _jsx("li", { children: "\u2022 Threaded comments and discussions" })] })] })] })),
};
// Tools Surface
export const ToolsSurface = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "HIVE Tools Surface" }), _jsx("div", { className: "max-w-6xl", children: _jsx(HiveToolsSurface, { space: sampleSpace, tools: mockTools, currentUserId: "current-user", onToolClick: (tool) => console.log('Tool clicked:', tool), onCreateTool: () => console.log('Create tool'), onUseTool: (toolId) => console.log('Use tool:', toolId), onFavoriteTool: (toolId) => console.log('Favorite:', toolId), canCreateTools: true }) }), _jsxs("div", { className: "mt-12 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-4", children: "List View" }), _jsx("div", { className: "bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-primary)] p-6", children: _jsx(HiveToolsSurface, { space: sampleSpace, tools: mockTools, currentUserId: "current-user", canCreateTools: false }) })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Tool Categories" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center mb-2 mx-auto", children: _jsx(Wrench, { className: "w-6 h-6 text-[var(--hive-brand-secondary)]" }) }), _jsx("span", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Design" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-status-info)]/20 rounded-lg flex items-center justify-center mb-2 mx-auto", children: _jsx(FileText, { className: "w-6 h-6 text-[var(--hive-status-info)]" }) }), _jsx("span", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Development" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-status-success)]/20 rounded-lg flex items-center justify-center mb-2 mx-auto", children: _jsx(Users, { className: "w-6 h-6 text-[var(--hive-status-success)]" }) }), _jsx("span", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Product" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-status-warning)]/20 rounded-lg flex items-center justify-center mb-2 mx-auto", children: _jsx(Star, { className: "w-6 h-6 text-[var(--hive-status-warning)]" }) }), _jsx("span", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Analytics" })] })] })] })] })] })),
};
// Pinned Surface
export const PinnedSurface = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "HIVE Pinned Surface" }), _jsx("div", { className: "max-w-4xl", children: _jsx(HivePinnedSurface, { space: sampleSpace, currentUserId: "current-user", onCreatePinned: () => console.log('Create pinned item'), canManagePinned: true }) }), _jsxs("div", { className: "mt-12 bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Pinned Content Types" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-[var(--hive-status-error)]/20 rounded flex items-center justify-center mt-0.5", children: _jsx(Pin, { className: "w-3 h-3 text-[var(--hive-status-error)]" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: "Announcements" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Important updates and news for the space" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-[var(--hive-status-info)]/20 rounded flex items-center justify-center mt-0.5", children: _jsx(FileText, { className: "w-3 h-3 text-[var(--hive-status-info)]" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: "Resources" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Documentation, guidelines, and reference materials" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-[var(--hive-brand-secondary)]/20 rounded flex items-center justify-center mt-0.5", children: _jsx(Star, { className: "w-3 h-3 text-[var(--hive-brand-secondary)]" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: "Achievements" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Milestones, celebrations, and team accomplishments" })] })] })] })] })] })),
};
// Combined Surface Demo
export const CombinedSurfaces = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-8", children: "HIVE Surface Components Overview" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(MessageCircle, { className: "w-6 h-6 text-[var(--hive-status-info)]" }), _jsx("h3", { className: "text-[var(--hive-text-primary)] font-semibold", children: "Chat Surface" })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm mb-4", children: "Real-time messaging with reactions, threading, and file sharing." }), _jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-muted)]", children: [_jsxs("span", { children: ["Messages: ", mockMessages.length] }), _jsx("span", { children: "Online: 8" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Calendar, { className: "w-6 h-6 text-[var(--hive-status-warning)]" }), _jsx("h3", { className: "text-[var(--hive-text-primary)] font-semibold", children: "Events Surface" })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm mb-4", children: "Calendar and event management with scheduling and reminders." }), _jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-muted)]", children: [_jsxs("span", { children: ["Events: ", mockEvents.length] }), _jsx("span", { children: "This Week: 2" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Users, { className: "w-6 h-6 text-[var(--hive-status-success)]" }), _jsx("h3", { className: "text-[var(--hive-text-primary)] font-semibold", children: "Members Surface" })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm mb-4", children: "Member management with roles, permissions, and activity tracking." }), _jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-muted)]", children: [_jsxs("span", { children: ["Members: ", mockMembers.length] }), _jsx("span", { children: "Online: 2" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(FileText, { className: "w-6 h-6 text-[#9333EA]" }), _jsx("h3", { className: "text-[var(--hive-text-primary)] font-semibold", children: "Posts Surface" })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm mb-4", children: "Social feed with posts, comments, likes, and rich media support." }), _jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-muted)]", children: [_jsxs("span", { children: ["Posts: ", mockPosts.length] }), _jsx("span", { children: "Engagement: 92%" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Wrench, { className: "w-6 h-6 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "text-[var(--hive-text-primary)] font-semibold", children: "Tools Surface" })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm mb-4", children: "Tool marketplace with ratings, categories, and usage analytics." }), _jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-muted)]", children: [_jsxs("span", { children: ["Tools: ", mockTools.length] }), _jsx("span", { children: "Avg Rating: 4.8" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Pin, { className: "w-6 h-6 text-[var(--hive-status-error)]" }), _jsx("h3", { className: "text-[var(--hive-text-primary)] font-semibold", children: "Pinned Surface" })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm mb-4", children: "Important content pinning with announcements and resources." }), _jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-muted)]", children: [_jsxs("span", { children: ["Pinned: ", mockPinnedItems.length] }), _jsx("span", { children: "Priority: High" })] })] })] })] })),
};
//# sourceMappingURL=surface-components.stories.js.map