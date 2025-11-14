'use client';

import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FeedCardPost } from './organisms/feed-card-post';
import { FeedCardEvent } from './organisms/feed-card-event';
import { FeedCardTool } from './organisms/feed-card-tool';
import { FeedCardSystem } from './organisms/feed-card-system';
import { FeedVirtualizedList } from './organisms/feed-virtualized-list';
import { FeedPageLayout } from './templates/feed-page-layout';

const meta = {
  title: '02-Feed/Feed System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Campus discovery stream - Read-only aggregation from spaces. The core loop (< 3 seconds): Open app → See feed → Maybe engage → Come back.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ===== MOCK DATA =====

const mockAuthor = {
  id: 'user-1',
  name: 'Alex Chen',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  role: 'CS Junior',
  verified: true,
};

const mockSpace = {
  id: 'space-1',
  name: 'UB CS Department',
  color: '#FFD700',
  icon: '💻',
};

const mockPostData = {
  id: 'post-1',
  author: mockAuthor,
  space: mockSpace,
  content: {
    headline: 'Free pizza in Davis Hall 101! 🍕',
    body: 'The CS club is giving away free pizza to anyone who stops by. First come, first served. We also have some career advice from recent grads at Google and Microsoft.',
    tags: ['food', 'networking'],
  },
  stats: {
    upvotes: 47,
    comments: 12,
    isUpvoted: false,
    isBookmarked: false,
  },
  meta: {
    timeAgo: '15m ago',
    isPinned: false,
    isEdited: false,
  },
};

const mockEventData = {
  id: 'event-1',
  title: 'Campus Madness: Finals Bracket Tournament',
  description: 'Vote on the best study spots on campus. Winner gets featured in the UB app!',
  space: mockSpace,
  coverImage: {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    alt: 'UB North Campus',
    width: 800,
    height: 400,
  },
  meta: {
    scheduleLabel: 'Today at 6:00 PM',
    locationLabel: 'Student Union Ballroom',
    status: 'today' as const,
  },
  stats: {
    attendingCount: 127,
    capacity: 200,
    isAttending: false,
  },
};

const mockToolData = {
  id: 'tool-1',
  title: 'Room Finder - Davis Hall',
  description: 'Find available study rooms in real-time. Created by @jacob_smith',
  author: {
    id: 'user-2',
    name: 'Jacob Smith',
    handle: 'jacob_smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob',
  },
  space: mockSpace,
  stats: {
    usageCount: 342,
    rating: 4.8,
  },
  meta: {
    tags: ['productivity', 'campus-tools'],
    lastUpdated: '2 days ago',
  },
};

const mockSystemData = {
  id: 'system-1',
  type: 'ritual_announcement' as const,
  title: 'New Ritual: Founding 100',
  description: 'Be one of the first 100 UB students to join HIVE and get an exclusive founder badge on your profile.',
  actionLabel: 'Learn more',
  meta: {
    timeAgo: '1h ago',
  },
};

// ===== POST CARD STORIES =====

export const PostCard_Default: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardPost
        post={mockPostData}
        onUpvote={(id) => console.log('Upvoted:', id)}
        onComment={(id) => console.log('Commented:', id)}
        onBookmark={(id) => console.log('Bookmarked:', id)}
        onSpaceClick={(id) => console.log('Space clicked:', id)}
      />
    </div>
  ),
};

export const PostCard_WithMedia: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardPost
        post={{
          ...mockPostData,
          content: {
            ...mockPostData.content,
            media: [
              {
                url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600',
                alt: 'UB Campus',
                width: 600,
                height: 400,
              },
            ],
          },
        }}
        onUpvote={(id) => console.log('Upvoted:', id)}
      />
    </div>
  ),
};

export const PostCard_Pinned: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardPost
        post={{
          ...mockPostData,
          meta: {
            ...mockPostData.meta,
            isPinned: true,
          },
        }}
      />
    </div>
  ),
};

export const PostCard_Upvoted: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardPost
        post={{
          ...mockPostData,
          stats: {
            ...mockPostData.stats,
            isUpvoted: true,
            upvotes: 48,
          },
        }}
      />
    </div>
  ),
};

// ===== EVENT CARD STORIES =====

export const EventCard_Today: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardEvent
        event={mockEventData}
        onToggleRsvp={(id, attending) => console.log('RSVP toggled:', id, attending)}
        onViewDetails={(id) => console.log('View details:', id)}
      />
    </div>
  ),
};

export const EventCard_Upcoming: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardEvent
        event={{
          ...mockEventData,
          meta: {
            ...mockEventData.meta,
            scheduleLabel: 'Friday, Dec 15 at 7:00 PM',
            status: 'upcoming',
          },
        }}
      />
    </div>
  ),
};

export const EventCard_SoldOut: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardEvent
        event={{
          ...mockEventData,
          meta: {
            ...mockEventData.meta,
            status: 'sold_out',
          },
          stats: {
            attendingCount: 200,
            capacity: 200,
            isAttending: false,
          },
        }}
      />
    </div>
  ),
};

export const EventCard_Attending: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardEvent
        event={{
          ...mockEventData,
          stats: {
            ...mockEventData.stats,
            isAttending: true,
            attendingCount: 128,
          },
        }}
      />
    </div>
  ),
};

// ===== TOOL CARD STORIES =====

export const ToolCard_Default: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardTool
        tool={mockToolData}
        onLaunch={(id) => console.log('Launched tool:', id)}
        onSpaceClick={(id) => console.log('Space clicked:', id)}
      />
    </div>
  ),
};

export const ToolCard_HighRated: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardTool
        tool={{
          ...mockToolData,
          stats: {
            usageCount: 1247,
            rating: 5.0,
          },
        }}
      />
    </div>
  ),
};

// ===== SYSTEM CARD STORIES =====

export const SystemCard_RitualAnnouncement: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardSystem
        announcement={mockSystemData}
        onAction={(id) => console.log('Action clicked:', id)}
      />
    </div>
  ),
};

export const SystemCard_FeatureDrop: Story = {
  render: () => (
    <div className="max-w-[600px] mx-auto p-6">
      <FeedCardSystem
        announcement={{
          ...mockSystemData,
          type: 'feature_announcement',
          title: 'New Feature: Anonymous Posting',
          description: 'You can now post anonymously in select spaces. Look for the 🎭 icon when creating a post.',
        }}
      />
    </div>
  ),
};

// ===== MIXED FEED =====

export const Feed_MixedContent: Story = {
  render: () => {
    const mixedItems = [
      { type: 'post', data: mockPostData },
      { type: 'event', data: mockEventData },
      {
        type: 'post',
        data: {
          ...mockPostData,
          id: 'post-2',
          content: {
            headline: 'Study group forming for CS241 final',
            body: 'Looking for 3-4 people to form a study group. We meet Tuesdays and Thursdays at 7pm in Lockwood Library.',
          },
          stats: { upvotes: 23, comments: 8, isUpvoted: false, isBookmarked: false },
          meta: { timeAgo: '2h ago', isPinned: false, isEdited: false },
        },
      },
      { type: 'tool', data: mockToolData },
      { type: 'system', data: mockSystemData },
      {
        type: 'post',
        data: {
          ...mockPostData,
          id: 'post-3',
          content: {
            headline: 'Lost: Blue backpack near Capen Hall',
            body: 'If you find it, please DM me. Has my laptop and textbooks inside. Reward offered! 🙏',
            tags: ['lost-and-found'],
          },
          stats: { upvotes: 156, comments: 34, isUpvoted: true, isBookmarked: true },
          meta: { timeAgo: '4h ago', isPinned: false, isEdited: true },
        },
      },
    ];

    return (
      <div className="max-w-[600px] mx-auto p-6 space-y-4">
        {mixedItems.map((item, index) => {
          if (item.type === 'post') {
            return (
              <FeedCardPost
                key={`${item.type}-${index}`}
                post={item.data as any}
              />
            );
          }
          if (item.type === 'event') {
            return (
              <FeedCardEvent
                key={`${item.type}-${index}`}
                event={item.data as any}
              />
            );
          }
          if (item.type === 'tool') {
            return (
              <FeedCardTool
                key={`${item.type}-${index}`}
                tool={item.data as any}
              />
            );
          }
          if (item.type === 'system') {
            return (
              <FeedCardSystem
                key={`${item.type}-${index}`}
                announcement={item.data as any}
              />
            );
          }
          return null;
        })}
      </div>
    );
  },
};

// ===== MOBILE VIEW =====

export const Feed_Mobile: Story = {
  render: () => (
    <div className="max-w-[375px] mx-auto">
      <div className="space-y-3 p-4">
        <FeedCardPost post={mockPostData} />
        <FeedCardEvent event={mockEventData} />
        <FeedCardTool tool={mockToolData} />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

// ===== INTERACTION STATES =====

export const Feed_InteractionDemo: Story = {
  render: () => {
    const [postStats, setPostStats] = React.useState(mockPostData.stats);

    const handleUpvote = () => {
      setPostStats((prev) => ({
        ...prev,
        isUpvoted: !prev.isUpvoted,
        upvotes: prev.isUpvoted ? prev.upvotes - 1 : prev.upvotes + 1,
      }));
    };

    const handleBookmark = () => {
      setPostStats((prev) => ({
        ...prev,
        isBookmarked: !prev.isBookmarked,
      }));
    };

    return (
      <div className="max-w-[600px] mx-auto p-6">
        <FeedCardPost
          post={{
            ...mockPostData,
            stats: postStats,
          }}
          onUpvote={handleUpvote}
          onBookmark={handleBookmark}
          onComment={(id) => {
            setPostStats((prev) => ({ ...prev, comments: prev.comments + 1 }));
            console.log('Comment on:', id);
          }}
        />
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Try it:</strong> Click upvote, bookmark, or comment to see optimistic updates
          </p>
        </div>
      </div>
    );
  },
};

// ===== PERFORMANCE TEST =====

export const Feed_VirtualizedPerformance: Story = {
  render: () => {
    // Generate 1000 mock posts for virtualization testing
    const posts = Array.from({ length: 1000 }, (_, i) => ({
      ...mockPostData,
      id: `post-${i}`,
      content: {
        ...mockPostData.content,
        headline: `Post #${i + 1}: ${mockPostData.content.headline}`,
      },
      stats: {
        ...mockPostData.stats,
        upvotes: Math.floor(Math.random() * 200),
        comments: Math.floor(Math.random() * 50),
      },
    }));

    return (
      <div className="h-screen">
        <FeedVirtualizedList
          items={posts}
          renderItem={(post) => <FeedCardPost key={post.id} post={post} />}
        />
        <div className="fixed bottom-4 right-4 p-4 bg-muted/90 rounded-lg backdrop-blur">
          <p className="text-sm font-mono">
            1,000 posts • Virtualized scroll • 60fps
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance test with 1,000 posts using virtualized scrolling. Should maintain 60fps.'
      }
    }
  },
};
