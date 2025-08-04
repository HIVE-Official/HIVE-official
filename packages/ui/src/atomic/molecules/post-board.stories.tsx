import type { Meta, StoryObj } from '@storybook/react';
import { PostBoard, SpacePost } from './post-board';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof PostBoard> = {
  title: 'HIVE/Spaces/Molecules/PostBoard',
  component: PostBoard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The PostBoard molecule handles the display and interaction of posts within a space. Supports text posts, events, polls, announcements, and tool-generated content with reactions, comments, and moderation features.',
      },
    },
  },
  argTypes: {
    showComments: { control: { type: 'boolean' } },
    enableInfiniteScroll: { control: { type: 'boolean' } },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostBoard>;

const samplePosts: SpacePost[] = [
  {
    id: '1',
    type: 'announcement',
    content: 'Welcome everyone to CS 101! This is our digital space for course coordination, discussions, and collaboration. Please review the syllabus and setup instructions in the pinned resources.',
    author: {
      id: 'prof1',
      name: 'Dr. Sarah Chen',
      role: 'leader',
      verified: true,
    },
    timestamp: '2024-01-20T14:30:00Z',
    reactions: [
      { emoji: '👍', count: 23, userReacted: true },
      { emoji: '❤️', count: 8, userReacted: false },
      { emoji: '🎉', count: 12, userReacted: false },
    ],
    commentCount: 5,
    shareCount: 3,
    viewCount: 47,
    isPinned: true,
    announcement: {
      priority: 'high',
      isPinned: true,
    },
  },
  {
    id: '2',
    type: 'event',
    content: 'Lab Session: Introduction to Python basics and development environment setup. Bring your laptops and make sure you\'ve completed the pre-lab checklist.',
    author: {
      id: 'ta1',
      name: 'Alex Rodriguez',
      role: 'co_leader',
    },
    timestamp: '2024-01-19T16:45:00Z',
    reactions: [
      { emoji: '👍', count: 15, userReacted: false },
      { emoji: '📚', count: 7, userReacted: true },
    ],
    commentCount: 8,
    viewCount: 31,
    event: {
      id: 'lab1',
      title: 'Lab 1: Python Setup & Basics',
      date: '2024-01-22T14:00:00Z',
      location: 'Computer Lab B, 2nd Floor',
      rsvpCount: 28,
      userRsvp: 'yes',
    },
  },
  {
    id: '3',
    type: 'poll',
    content: 'What time works best for our weekly study group sessions? We want to find a time that works for the majority of the class.',
    author: {
      id: 'student1',
      name: 'Maya Patel',
      role: 'member',
    },
    timestamp: '2024-01-19T11:20:00Z',
    reactions: [
      { emoji: '🤔', count: 9, userReacted: false },
      { emoji: '👍', count: 6, userReacted: false },
    ],
    commentCount: 12,
    viewCount: 38,
    poll: {
      id: 'poll1',
      question: 'Best time for study group?',
      options: [
        { id: 'opt1', text: 'Monday 6-8 PM', votes: 12, userVoted: false },
        { id: 'opt2', text: 'Wednesday 7-9 PM', votes: 18, userVoted: true },
        { id: 'opt3', text: 'Friday 4-6 PM', votes: 8, userVoted: false },
        { id: 'opt4', text: 'Saturday 2-4 PM', votes: 15, userVoted: false },
      ],
      totalVotes: 53,
      expiresAt: '2024-01-25T23:59:59Z',
      allowMultiple: false,
    },
  },
  {
    id: '4',
    type: 'text',
    content: 'Has anyone figured out the installation issue with PyCharm on Windows 11? I keep getting an error about Python interpreter not being found even though I installed it correctly.',
    author: {
      id: 'student2',
      name: 'James Wilson',
      role: 'member',
    },
    timestamp: '2024-01-18T20:15:00Z',
    reactions: [
      { emoji: '🆘', count: 4, userReacted: false },
      { emoji: '🤝', count: 2, userReacted: false },
    ],
    commentCount: 7,
    viewCount: 22,
  },
  {
    id: '5',
    type: 'tool_output',
    content: 'Assignment 1 has been posted with a due date of January 30th. The assignment covers variables, data types, and basic input/output operations.',
    author: {
      id: 'system',
      name: 'Assignment Tracker',
    },
    timestamp: '2024-01-18T10:00:00Z',
    reactions: [
      { emoji: '📝', count: 19, userReacted: true },
      { emoji: '⏰', count: 11, userReacted: false },
    ],
    commentCount: 3,
    viewCount: 45,
    toolSource: {
      toolId: 'assignment-tracker',
      toolName: 'Assignment Tracker',
      icon: '📝',
    },
  },
];

const sampleUser = {
  id: 'student1',
  role: 'member' as const,
};

const leaderUser = {
  id: 'prof1',
  role: 'leader' as const,
};

export const Default: Story = {
  args: {
    posts: samplePosts,
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share'),
    onEdit: action('edit'),
    onDelete: action('delete'),
    onPin: action('pin'),
    onReport: action('report'),
    onEventRsvp: action('event-rsvp'),
    onPollVote: action('poll-vote'),
  },
};

export const AsLeader: Story = {
  args: {
    posts: samplePosts,
    currentUser: leaderUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share'),
    onEdit: action('edit'),
    onDelete: action('delete'),
    onPin: action('pin'),
    onReport: action('report'),
    onEventRsvp: action('event-rsvp'),
    onPollVote: action('poll-vote'),
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard as viewed by a space leader with additional moderation capabilities like pinning and deleting posts.',
      },
    },
  },
};

export const EventFocused: Story = {
  args: {
    posts: samplePosts.filter(post => post.type === 'event' || post.type === 'announcement'),
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share'),
    onEventRsvp: action('event-rsvp'),
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard showing primarily event and announcement posts with RSVP functionality.',
      },
    },
  },
};

export const PollInteraction: Story = {
  args: {
    posts: samplePosts.filter(post => post.type === 'poll'),
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onPollVote: action('poll-vote'),
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard focusing on poll interactions with voting and results display.',
      },
    },
  },
};

export const ToolGenerated: Story = {
  args: {
    posts: samplePosts.filter(post => post.type === 'tool_output'),
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard showing tool-generated content with proper attribution and styling.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    posts: [],
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no posts exist in the space.',
      },
    },
  },
};

export const HighPriorityAnnouncements: Story = {
  args: {
    posts: [
      {
        ...samplePosts[0],
        announcement: {
          priority: 'urgent',
          isPinned: true,
        },
      },
      {
        id: 'urgent1',
        type: 'announcement',
        content: 'URGENT: Class cancelled today due to weather conditions. Please check your email for updates on rescheduling.',
        author: {
          id: 'prof1',
          name: 'Dr. Sarah Chen',
          role: 'leader',
          verified: true,
        },
        timestamp: '2024-01-20T08:00:00Z',
        reactions: [
          { emoji: '⚠️', count: 31, userReacted: true },
          { emoji: '👍', count: 15, userReacted: false },
        ],
        commentCount: 8,
        viewCount: 67,
        isPinned: true,
        announcement: {
          priority: 'urgent',
          isPinned: true,
        },
      },
    ],
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard with high-priority and urgent announcements showing visual priority indicators.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [posts, setPosts] = React.useState(samplePosts);
    const [currentUser] = React.useState(sampleUser);

    const handleReaction = (postId: string, emoji: string, add: boolean) => {
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id !== postId) return post;
          
          const reactions = post.reactions || [];
          const existingReaction = reactions.find(r => r.emoji === emoji);
          
          if (existingReaction) {
            return {
              ...post,
              reactions: reactions.map(r =>
                r.emoji === emoji
                  ? { 
                      ...r, 
                      count: add ? r.count + 1 : Math.max(0, r.count - 1),
                      userReacted: add
                    }
                  : r
              ).filter(r => r.count > 0),
            };
          } else if (add) {
            return {
              ...post,
              reactions: [...reactions, { emoji, count: 1, userReacted: true }],
            };
          }
          
          return post;
        })
      );
      
      action('reaction')(postId, emoji, add);
    };

    const handleEventRsvp = (eventId: string, response: 'yes' | 'no' | 'maybe') => {
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.event?.id === eventId) {
            return {
              ...post,
              event: {
                ...post.event,
                userRsvp: response,
                rsvpCount: post.event.rsvpCount ? post.event.rsvpCount + 1 : 1,
              },
            };
          }
          return post;
        })
      );
      
      action('event-rsvp')(eventId, response);
    };

    const handlePollVote = (pollId: string, optionId: string) => {
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.poll?.id === pollId) {
            return {
              ...post,
              poll: {
                ...post.poll,
                options: post.poll.options.map(option => ({
                  ...option,
                  votes: option.id === optionId ? option.votes + 1 : option.votes,
                  userVoted: option.id === optionId,
                })),
                totalVotes: post.poll.totalVotes + 1,
              },
            };
          }
          return post;
        })
      );
      
      action('poll-vote')(pollId, optionId);
    };

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-2xl mx-auto">
          <PostBoard
            posts={posts}
            currentUser={currentUser}
            onReaction={handleReaction}
            onComment={action('comment')}
            onShare={action('share')}
            onEdit={action('edit')}
            onDelete={action('delete')}
            onPin={action('pin')}
            onReport={action('report')}
            onEventRsvp={handleEventRsvp}
            onPollVote={handlePollVote}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive PostBoard demo with live state updates for reactions, RSVP, and poll voting.',
      },
    },
  },
};