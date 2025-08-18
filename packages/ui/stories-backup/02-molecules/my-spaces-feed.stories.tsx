import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MySpacesFeed } from '../../components/profile/my-spaces-feed';
import { Space, SpacePost } from '../../components/profile/types';

/**
 * # MySpacesFeed - Campus Social Communities
 * 
 * The MySpacesFeed molecule displays a student's active campus communities, blending social media
 * engagement with utility-focused spaces. It showcases recent activity, unread messages, and
 * community participation in a visually appealing feed format with premium aesthetics.
 * 
 * ## Social Media Features
 * - Community discovery and engagement tracking
 * - Recent posts and activity feeds from joined spaces
 * - Social indicators like favorites, pins, and member counts
 * - Real-time unread message counters
 * 
 * ## Utility Features  
 * - Academic space organization (course groups, study halls)
 * - Campus resource communities (housing, clubs, academics)
 * - Productivity-focused group interactions
 * - Quick access to community tools and resources
 * 
 * ## Campus Integration
 * Designed for molecule-level social + utility interactions that help students stay connected
 * to their most important campus communities while surfacing relevant academic and social content.
 */

// Sample space data for demonstration
const sampleSpaces: Space[] = [
  {
    id: 'cs-101',
    name: 'CS 101 - Intro to Programming',
    type: 'course',
    memberCount: 47,
    unreadCount: 3,
    lastActivity: '2h ago',
    isPinned: true,
    isFavorite: false,
    recentPosts: [
      {
        id: 'post-1',
        author: 'Prof. Johnson',
        content: 'Assignment 3 has been posted. Due next Friday at 11:59 PM.',
        timestamp: '2h ago',
        type: 'announcement',
        replies: 5,
        reactions: { likes: 12, helpful: 8 }
      },
      {
        id: 'post-2', 
        author: 'Sarah Chen',
        content: 'Anyone want to form a study group for the midterm?',
        timestamp: '4h ago',
        type: 'question',
        replies: 8,
        reactions: { likes: 6, helpful: 3 }
      }
    ]
  },
  {
    id: 'dorm-3b',
    name: 'Wilbur Hall - Floor 3B',
    type: 'housing',
    memberCount: 23,
    unreadCount: 1,
    lastActivity: '1h ago',
    isPinned: false,
    isFavorite: true,
    recentPosts: [
      {
        id: 'post-3',
        author: 'Alex Rodriguez',
        content: 'Pizza party tonight in the common room at 8 PM! 🍕',
        timestamp: '1h ago',
        type: 'announcement',
        replies: 12,
        reactions: { likes: 18, helpful: 2 }
      }
    ]
  },
  {
    id: 'tech-club',
    name: 'Stanford Tech Club',
    type: 'club',
    memberCount: 156,
    unreadCount: 0,
    lastActivity: '1d ago',
    isPinned: false,
    isFavorite: false,
    recentPosts: [
      {
        id: 'post-4',
        author: 'Emily Park',
        content: 'Workshop on React hooks this Thursday. Sign up link in comments!',
        timestamp: '1d ago',
        type: 'announcement',
        replies: 15,
        reactions: { likes: 23, helpful: 19 }
      },
      {
        id: 'post-5',
        author: 'Michael Zhang',
        content: 'Looking for a frontend partner for our hackathon project',
        timestamp: '1d ago',
        type: 'discussion',
        replies: 4,
        reactions: { likes: 7, helpful: 2 }
      }
    ]
  },
  {
    id: 'study-group',
    name: 'Physics 50 Study Group',
    type: 'academic',
    memberCount: 12,
    unreadCount: 5,
    lastActivity: '30m ago',
    isPinned: true,
    isFavorite: true,
    recentPosts: []
  },
  {
    id: 'international',
    name: 'International Students Community',
    type: 'community',
    memberCount: 89,
    unreadCount: 0,
    lastActivity: '3d ago',
    isPinned: false,
    isFavorite: false,
    recentPosts: [
      {
        id: 'post-6',
        author: 'Priya Sharma',
        content: 'Cultural festival planning meeting this weekend. All welcome!',
        timestamp: '3d ago',
        type: 'announcement',
        replies: 8,
        reactions: { likes: 15, helpful: 4 }
      }
    ]
  }
];

const meta: Meta<typeof MySpacesFeed> = {
  title: '02-Molecules/MySpacesFeed',
  component: MySpacesFeed,
  parameters: {
    docs: {
      description: {
        component: `
# MySpacesFeed - Campus Community Hub

This molecule component exemplifies HIVE's social media + utility platform approach for campus communities:

## Social Media Integration
- Community discovery and engagement
- Real-time activity feeds and updates
- Social indicators (favorites, pins, member counts)
- Interactive post discussions and reactions

## Campus Utility Features
- Academic space organization (courses, study groups)
- Campus resource communities (housing, clubs)
- Productivity-focused group management
- Quick access to community tools

## Student Engagement Patterns
- Recent activity surfacing from multiple communities
- Unread message tracking and prioritization
- Community type organization and filtering
- Social validation through participation metrics

The MySpacesFeed ensures students stay connected to their most important campus communities while surfacing relevant content.
        `
      }
    },
    layout: 'padded'
  },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Loading state for spaces data'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[400px]">
        <div className="max-w-2xl mx-auto">
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Active campus communities
export const Default: Story = {
  args: {
    spaces: sampleSpaces,
    isLoading: false,
    onSpaceClick: (spaceId) => console.log('Space clicked:', spaceId),
    onJoinSpace: () => console.log('Join space clicked')
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    spaces: sampleSpaces,
    isLoading: false,
    error: undefined,
    onSpaceClick: (spaceId) => console.log('Space clicked:', spaceId),
    onJoinSpace: () => console.log('Join space clicked')
  }
};

// 3. LOADING STATE STORY - Loading experience
export const LoadingState: Story = {
  args: {
    spaces: [],
    isLoading: true,
    onSpaceClick: (spaceId) => console.log('Space clicked:', spaceId),
    onJoinSpace: () => console.log('Join space clicked')
  }
};

// 4. ERROR STATE STORY - Error handling
export const ErrorState: Story = {
  args: {
    spaces: [],
    isLoading: false,
    error: 'Failed to connect to campus servers. Please check your internet connection.',
    onSpaceClick: (spaceId) => console.log('Space clicked:', spaceId),
    onJoinSpace: () => console.log('Join space clicked')
  }
};

// 5. EMPTY STATE STORY - New student experience
export const EmptyState: Story = {
  args: {
    spaces: [],
    isLoading: false,
    onSpaceClick: (spaceId) => console.log('Space clicked:', spaceId),
    onJoinSpace: () => console.log('Join space clicked')
  }
};

// 6. SPACE TYPES STORY - Different community categories
export const SpaceTypes: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Community Types
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different types of spaces students join for various campus needs
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Academic Spaces</h3>
          <MySpacesFeed 
            spaces={sampleSpaces.filter(space => ['course', 'academic'].includes(space.type))}
            onSpaceClick={(spaceId) => console.log('Academic space:', spaceId)}
            onJoinSpace={() => console.log('Join academic space')}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Social Spaces</h3>
          <MySpacesFeed 
            spaces={sampleSpaces.filter(space => ['housing', 'club', 'community'].includes(space.type))}
            onSpaceClick={(spaceId) => console.log('Social space:', spaceId)}
            onJoinSpace={() => console.log('Join social space')}
          />
        </div>
      </div>
    </div>
  )
};

// 7. ACTIVITY LEVELS STORY - Different engagement patterns
export const ActivityLevels: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Community Activity Levels
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How spaces appear with different levels of community engagement
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3 text-[var(--hive-brand-primary)]">High Activity</h3>
          <MySpacesFeed 
            spaces={sampleSpaces.slice(0, 2)}
            onSpaceClick={(spaceId) => console.log('High activity space:', spaceId)}
            onJoinSpace={() => console.log('Join space')}
          />
        </div>
        
        <div>
          <h3 className="font-medium mb-3 text-[var(--hive-brand-primary)]">Low Activity</h3>
          <MySpacesFeed 
            spaces={[{
              id: 'quiet-space',
              name: 'Study Hall - Library Level 2',
              type: 'academic',
              memberCount: 8,
              unreadCount: 0,
              lastActivity: '1w ago',
              isPinned: false,
              isFavorite: false,
              recentPosts: []
            }]}
            onSpaceClick={(spaceId) => console.log('Low activity space:', spaceId)}
            onJoinSpace={() => console.log('Join space')}
          />
        </div>
      </div>
    </div>
  )
};

// 8. CAMPUS SCENARIOS STORY - Real student usage patterns
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How different types of students use their spaces feed
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">First-Year Student</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Emma focuses on course communities and dorm floor connections
          </p>
          <MySpacesFeed 
            spaces={[
              {
                id: 'math-101',
                name: 'Math 101 - Calculus I',
                type: 'course',
                memberCount: 89,
                unreadCount: 2,
                lastActivity: '1h ago',
                isPinned: true,
                isFavorite: false,
                recentPosts: [
                  {
                    id: 'math-post',
                    author: 'Prof. Williams',
                    content: 'Office hours moved to 3-5 PM this week.',
                    timestamp: '1h ago',
                    type: 'announcement',
                    replies: 3
                  }
                ]
              },
              {
                id: 'frosh-dorm',
                name: 'Freshman Dorm - East Wing',
                type: 'housing',
                memberCount: 45,
                unreadCount: 7,
                lastActivity: '30m ago',
                isPinned: true,
                isFavorite: true,
                recentPosts: [
                  {
                    id: 'dorm-post',
                    author: 'Maya Patel',
                    content: 'Movie night in the lounge tomorrow!',
                    timestamp: '30m ago',
                    type: 'announcement',
                    replies: 12
                  }
                ]
              }
            ]}
            onSpaceClick={(spaceId) => console.log('First-year space:', spaceId)}
            onJoinSpace={() => console.log('Join space')}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Senior Student</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Jake participates in advanced courses, clubs, and mentorship programs
          </p>
          <MySpacesFeed 
            spaces={[
              {
                id: 'senior-capstone',
                name: 'CS 294 - Senior Capstone',
                type: 'course',
                memberCount: 24,
                unreadCount: 1,
                lastActivity: '3h ago',
                isPinned: true,
                isFavorite: false,
                recentPosts: [
                  {
                    id: 'capstone-post',
                    author: 'Dr. Chen',
                    content: 'Final presentation schedule is now available.',
                    timestamp: '3h ago',
                    type: 'announcement',
                    replies: 8
                  }
                ]
              },
              {
                id: 'mentorship',
                name: 'CS Peer Mentoring Program',
                type: 'community',
                memberCount: 67,
                unreadCount: 0,
                lastActivity: '1d ago',
                isPinned: false,
                isFavorite: true,
                recentPosts: [
                  {
                    id: 'mentor-post',
                    author: 'Jessica Liu',
                    content: 'Mentor training workshop this Saturday at 10 AM.',
                    timestamp: '1d ago',
                    type: 'announcement',
                    replies: 5
                  }
                ]
              }
            ]}
            onSpaceClick={(spaceId) => console.log('Senior space:', spaceId)}
            onJoinSpace={() => console.log('Join space')}
          />
        </div>
      </div>
    </div>
  )
};

// 9. HIGH ENGAGEMENT STORY - Very active student
export const HighEngagement: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Highly Engaged Student
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          A student who participates in many communities with high activity levels
        </p>
      </div>
      
      <MySpacesFeed 
        spaces={sampleSpaces.map(space => ({
          ...space,
          unreadCount: Math.floor(Math.random() * 8) + 1,
          lastActivity: ['5m ago', '15m ago', '1h ago', '2h ago'][Math.floor(Math.random() * 4)],
          isPinned: Math.random() > 0.7,
          isFavorite: Math.random() > 0.6
        }))}
        onSpaceClick={(spaceId) => console.log('High engagement space:', spaceId)}
        onJoinSpace={() => console.log('Join space')}
      />
    </div>
  )
};

// 10. SOCIAL vs UTILITY STORY - Different usage patterns
export const SocialVsUtility: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social vs Utility Usage
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How the component serves both social engagement and academic utility
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Social-Focused Usage</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Emphasizes community building, events, and social connections
          </p>
          <MySpacesFeed 
            spaces={[
              {
                id: 'social-1',
                name: 'Campus Events Committee',
                type: 'club',
                memberCount: 78,
                unreadCount: 4,
                lastActivity: '1h ago',
                isPinned: true,
                isFavorite: true,
                recentPosts: [
                  {
                    id: 'social-post-1',
                    author: 'Event Coordinator',
                    content: 'Spring Carnival planning meeting tomorrow at 7 PM!',
                    timestamp: '1h ago',
                    type: 'announcement',
                    replies: 15
                  }
                ]
              },
              {
                id: 'social-2',
                name: 'International Food Club',
                type: 'community',
                memberCount: 92,
                unreadCount: 2,
                lastActivity: '3h ago',
                isPinned: false,
                isFavorite: true,
                recentPosts: [
                  {
                    id: 'social-post-2',
                    author: 'Chef Maria',
                    content: 'Cooking Italian cuisine this weekend! Who\'s joining?',
                    timestamp: '3h ago',
                    type: 'discussion',
                    replies: 23
                  }
                ]
              }
            ]}
            onSpaceClick={(spaceId) => console.log('Social space:', spaceId)}
            onJoinSpace={() => console.log('Join social space')}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Utility-Focused Usage</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Emphasizes academic progress, tool sharing, and productivity
          </p>
          <MySpacesFeed 
            spaces={[
              {
                id: 'utility-1',
                name: 'Algorithm Study Group',
                type: 'academic',
                memberCount: 16,
                unreadCount: 3,
                lastActivity: '30m ago',
                isPinned: true,
                isFavorite: false,
                recentPosts: [
                  {
                    id: 'utility-post-1',
                    author: 'Study Leader',
                    content: 'New practice problems uploaded. Focus on dynamic programming.',
                    timestamp: '30m ago',
                    type: 'update',
                    replies: 7
                  }
                ]
              },
              {
                id: 'utility-2',
                name: 'Research Tools Sharing',
                type: 'academic',
                memberCount: 34,
                unreadCount: 1,
                lastActivity: '2h ago',
                isPinned: false,
                isFavorite: false,
                recentPosts: [
                  {
                    id: 'utility-post-2',
                    author: 'Grad Student',
                    content: 'Created a new citation manager tool. Link in comments!',
                    timestamp: '2h ago',
                    type: 'update',
                    replies: 12
                  }
                ]
              }
            ]}
            onSpaceClick={(spaceId) => console.log('Utility space:', spaceId)}
            onJoinSpace={() => console.log('Join utility space')}
          />
        </div>
      </div>
    </div>
  )
};