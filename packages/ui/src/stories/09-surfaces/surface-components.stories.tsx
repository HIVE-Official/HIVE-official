import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveChatSurface,
  HiveEventsSurface,
  HiveMembersSurface,
  HivePinnedSurface,
  HivePostsSurface,
  HiveToolsSurface,
  type ChatMessage,
  type Event,
  type Member,
  type Post,
  type Tool
} from '../../components';
import { MessageCircle, Calendar, Users, Pin, FileText, Wrench, Star, Heart, Share } from 'lucide-react';

const meta: Meta = {
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
type Story = StoryObj;

// Mock data matching actual component interfaces
const mockMessages: ChatMessage[] = [
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

const mockEvents: Event[] = [
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

const mockMembers: Member[] = [
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

const mockPosts: Post[] = [
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

const mockTools: Tool[] = [
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
export const ChatSurface: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Chat Surface</h1>
      
      <div className="max-w-4xl">
        <HiveChatSurface 
          space={sampleSpace}
          messages={mockMessages}
          currentUserId="current-user"
          onSendMessage={(content) => console.log('Send:', content)}
          onReactToMessage={(messageId, emoji) => console.log('React:', messageId, emoji)}
          canSendMessages={true}
          enableFileSharing={true}
          enableVoiceMessages={false}
        />
      </div>
      
      <div className="mt-12 bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">Chat Features</h3>
        <ul className="text-[var(--hive-text-secondary)] space-y-2">
          <li>• Real-time messaging with typing indicators</li>
          <li>• Emoji reactions and message threading</li>
          <li>• File attachments and media sharing</li>
          <li>• User mentions and notifications</li>
          <li>• Message history and search</li>
          <li>• Dark luxury theme with glass morphism</li>
        </ul>
      </div>
    </div>
  ),
};

// Events Surface
export const EventsSurface: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Events Surface</h1>
      
      <div className="max-w-4xl">
        <HiveEventsSurface 
          space={sampleSpace}
          events={mockEvents}
          currentUserId="current-user"
          onEventClick={(event) => console.log('Event clicked:', event)}
          onCreateEvent={() => console.log('Create event')}
          canCreateEvents={true}
        />
      </div>
      
      <div className="mt-12 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-4">Calendar View</h3>
          <div className="bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-primary)] p-6">
            <HiveEventsSurface 
              space={sampleSpace}
              events={mockEvents}
              currentUserId="current-user"
              onEventClick={(event) => console.log('Event clicked:', event)}
            />
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
          <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">Event Types</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div>
              <span className="text-[var(--hive-text-secondary)]">Meetings - Team discussions and reviews</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#FFD700] rounded-full"></div>
              <span className="text-[var(--hive-text-secondary)]">Milestones - Important project markers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
              <span className="text-[var(--hive-text-secondary)]">Social - Team building and community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Members Surface
export const MembersSurface: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Members Surface</h1>
      
      <div className="max-w-4xl">
        <HiveMembersSurface 
          space={sampleSpace}
          members={mockMembers}
          currentUserId="current-user"
          onMemberClick={(member) => console.log('Member clicked:', member)}
          onInviteMember={() => console.log('Invite member')}
          canManageMembers={true}
        />
      </div>
      
      <div className="mt-12 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-4">List View</h3>
          <div className="bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-primary)] p-6">
            <HiveMembersSurface 
              space={sampleSpace}
              members={mockMembers}
              currentUserId="current-user"
              canManageMembers={false}
            />
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
          <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">Member Features</h3>
          <ul className="text-[var(--hive-text-secondary)] space-y-2">
            <li>• Real-time online status indicators</li>
            <li>• Role-based permissions and access control</li>
            <li>• Contribution tracking and analytics</li>
            <li>• Member profiles with activity history</li>
            <li>• Invitation management and onboarding</li>
            <li>• Grid and list view modes</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

// Posts Surface
export const PostsSurface: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Posts Surface</h1>
      
      <div className="max-w-4xl">
        <HivePostsSurface 
          space={sampleSpace}
          posts={mockPosts}
          currentUserId="current-user"
          onLikePost={(postId) => console.log('Like:', postId)}
          onCommentPost={(postId) => console.log('Comment:', postId)}
          onSharePost={(postId) => console.log('Share:', postId)}
          onCreatePost={() => console.log('Create post')}
          canCreatePosts={true}
        />
      </div>
      
      <div className="mt-12 bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">Post Features</h3>
        <ul className="text-[var(--hive-text-secondary)] space-y-2">
          <li>• Rich text editor with media attachments</li>
          <li>• Like, comment, and share interactions</li>
          <li>• Tag-based categorization and filtering</li>
          <li>• Pinned posts for important announcements</li>
          <li>• Real-time updates and notifications</li>
          <li>• Threaded comments and discussions</li>
        </ul>
      </div>
    </div>
  ),
};

// Tools Surface
export const ToolsSurface: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Tools Surface</h1>
      
      <div className="max-w-6xl">
        <HiveToolsSurface 
          space={sampleSpace}
          tools={mockTools}
          currentUserId="current-user"
          onToolClick={(tool) => console.log('Tool clicked:', tool)}
          onCreateTool={() => console.log('Create tool')}
          onUseTool={(toolId) => console.log('Use tool:', toolId)}
          onFavoriteTool={(toolId) => console.log('Favorite:', toolId)}
          canCreateTools={true}
        />
      </div>
      
      <div className="mt-12 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-4">List View</h3>
          <div className="bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-primary)] p-6">
            <HiveToolsSurface 
              space={sampleSpace}
              tools={mockTools}
              currentUserId="current-user"
              canCreateTools={false}
            />
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
          <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">Tool Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#FFD700]/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <Wrench className="w-6 h-6 text-[#FFD700]" />
              </div>
              <span className="text-[var(--hive-text-secondary)] text-sm">Design</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <FileText className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <span className="text-[var(--hive-text-secondary)] text-sm">Development</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#10B981]/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <Users className="w-6 h-6 text-[#10B981]" />
              </div>
              <span className="text-[var(--hive-text-secondary)] text-sm">Product</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <Star className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <span className="text-[var(--hive-text-secondary)] text-sm">Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Pinned Surface
export const PinnedSurface: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Pinned Surface</h1>
      
      <div className="max-w-4xl">
        <HivePinnedSurface 
          space={sampleSpace}
          currentUserId="current-user"
          onCreatePinned={() => console.log('Create pinned item')}
          canManagePinned={true}
        />
      </div>
      
      <div className="mt-12 bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">Pinned Content Types</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#EF4444]/20 rounded flex items-center justify-center mt-0.5">
              <Pin className="w-3 h-3 text-[#EF4444]" />
            </div>
            <div>
              <div className="text-[var(--hive-text-primary)] font-medium">Announcements</div>
              <div className="text-[var(--hive-text-secondary)] text-sm">Important updates and news for the space</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#3B82F6]/20 rounded flex items-center justify-center mt-0.5">
              <FileText className="w-3 h-3 text-[#3B82F6]" />
            </div>
            <div>
              <div className="text-[var(--hive-text-primary)] font-medium">Resources</div>
              <div className="text-[var(--hive-text-secondary)] text-sm">Documentation, guidelines, and reference materials</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#FFD700]/20 rounded flex items-center justify-center mt-0.5">
              <Star className="w-3 h-3 text-[#FFD700]" />
            </div>
            <div>
              <div className="text-[var(--hive-text-primary)] font-medium">Achievements</div>
              <div className="text-[var(--hive-text-secondary)] text-sm">Milestones, celebrations, and team accomplishments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Combined Surface Demo
export const CombinedSurfaces: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Surface Components Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-[#3B82F6]" />
            <h3 className="text-[var(--hive-text-primary)] font-semibold">Chat Surface</h3>
          </div>
          <p className="text-[var(--hive-text-secondary)] text-sm mb-4">
            Real-time messaging with reactions, threading, and file sharing.
          </p>
          <div className="flex items-center justify-between text-xs text-[var(--hive-text-muted)]">
            <span>Messages: {mockMessages.length}</span>
            <span>Online: 8</span>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-[#F59E0B]" />
            <h3 className="text-[var(--hive-text-primary)] font-semibold">Events Surface</h3>
          </div>
          <p className="text-[var(--hive-text-secondary)] text-sm mb-4">
            Calendar and event management with scheduling and reminders.
          </p>
          <div className="flex items-center justify-between text-xs text-[var(--hive-text-muted)]">
            <span>Events: {mockEvents.length}</span>
            <span>This Week: 2</span>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#10B981]" />
            <h3 className="text-[var(--hive-text-primary)] font-semibold">Members Surface</h3>
          </div>
          <p className="text-[var(--hive-text-secondary)] text-sm mb-4">
            Member management with roles, permissions, and activity tracking.
          </p>
          <div className="flex items-center justify-between text-xs text-[var(--hive-text-muted)]">
            <span>Members: {mockMembers.length}</span>
            <span>Online: 2</span>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-[#9333EA]" />
            <h3 className="text-[var(--hive-text-primary)] font-semibold">Posts Surface</h3>
          </div>
          <p className="text-[var(--hive-text-secondary)] text-sm mb-4">
            Social feed with posts, comments, likes, and rich media support.
          </p>
          <div className="flex items-center justify-between text-xs text-[var(--hive-text-muted)]">
            <span>Posts: {mockPosts.length}</span>
            <span>Engagement: 92%</span>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-6 h-6 text-[#FFD700]" />
            <h3 className="text-[var(--hive-text-primary)] font-semibold">Tools Surface</h3>
          </div>
          <p className="text-[var(--hive-text-secondary)] text-sm mb-4">
            Tool marketplace with ratings, categories, and usage analytics.
          </p>
          <div className="flex items-center justify-between text-xs text-[var(--hive-text-muted)]">
            <span>Tools: {mockTools.length}</span>
            <span>Avg Rating: 4.8</span>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-primary)]">
          <div className="flex items-center gap-3 mb-4">
            <Pin className="w-6 h-6 text-[#EF4444]" />
            <h3 className="text-[var(--hive-text-primary)] font-semibold">Pinned Surface</h3>
          </div>
          <p className="text-[var(--hive-text-secondary)] text-sm mb-4">
            Important content pinning with announcements and resources.
          </p>
          <div className="flex items-center justify-between text-xs text-[var(--hive-text-muted)]">
            <span>Pinned: {mockPinnedItems.length}</span>
            <span>Priority: High</span>
          </div>
        </div>
      </div>
    </div>
  ),
};