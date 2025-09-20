import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  UBRitualFeedCard, 
  UBRitualsFeedIntegration,
  UBRitualFeedFilters,
  UBRitualFeedPost,
  UBRitual
} from './ub-rituals-feed-integration';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof UBRitualFeedCard> = {
  title: 'Feed System/UB Rituals Feed Integration',
  component: UBRitualFeedCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# UB Rituals Feed Integration

The UB Rituals Feed Integration seamlessly incorporates campus rituals into the main HIVE feed, creating a unified experience where ritual announcements, milestones, and completions appear alongside regular campus content.

## Key Features

- **Feed Integration**: Rituals appear naturally in the campus feed alongside posts, events, and tools
- **UB-Specific Rituals**: Orientation, Finals Week, Homecoming, Spring Fest, Graduation ceremonies
- **Campus Context**: Location-aware content with North/South campus distinctions
- **Social Engagement**: Like, comment, share ritual updates just like regular posts
- **Participation Tracking**: Join rituals directly from feed posts with progress tracking
- **Milestone Celebrations**: Automatic milestone posts when participation thresholds are reached

## Ritual Types

### Academic Rituals
- **Finals Week**: Campus-wide study support and stress relief activities
- **Graduation**: Celebration rituals for graduating classes
- **Orientation**: Welcome activities for new UB Bulls

### Social Rituals  
- **Homecoming**: Alumni weekend celebration activities
- **Spring Fest**: Annual spring celebration events
- **Club Rush**: Organization recruitment and community building

### Campus Life Rituals
- **Move-In Week**: New student residence hall integration
- **Dorm Competitions**: Building community within residence halls

## Usage in HIVE Platform

This integration allows the Feed system to:
1. Display ritual announcements when new campus experiences begin
2. Show milestone achievements as they happen
3. Remind students about ongoing rituals they haven't joined
4. Celebrate completions and build social proof
5. Create campus-wide shared experiences that build UB culture

The goal is making rituals feel like a natural part of campus social media rather than a separate system.
        `
      }
    }
  },
  argTypes: {
    onLike: { action: 'like-ritual-post' },
    onComment: { action: 'comment-ritual-post' },
    onShare: { action: 'share-ritual-post' },
    onJoinRitual: { action: 'join-ritual' },
    onViewRitual: { action: 'view-ritual' }
  }
};

export default meta;
type Story = StoryObj<typeof UBRitualFeedCard>;

// =============================================================================
// MOCK DATA FOR UB RITUALS
// =============================================================================

const mockUBRituals: UBRitual[] = [
  {
    id: 'ub-orientation-2024',
    name: 'ub_orientation_week',
    title: 'UB Orientation Week 2024',
    description: 'Welcome new Bulls to campus with interactive activities, campus tours, and community building',
    tagline: 'Welcome to the Herd!',
    type: 'orientation',
    status: 'active',
    startTime: '2024-08-20T08:00:00Z',
    endTime: '2024-08-27T23:59:59Z',
    duration: 7,
    participationType: 'individual',
    maxParticipants: 5000,
    campusLocation: 'Student Union & North Campus',
    ubSpecific: {
      buildings: ['Student Union', 'Capen Hall', 'Alumni Arena'],
      dorms: ['Ellicott Complex', 'Governors Complex'],
      departments: ['Student Life', 'Admissions', 'Academic Success'],
      campusAreas: ['north', 'south']
    },
    metrics: {
      participationRate: 78,
      completionRate: 65,
      engagementScore: 92,
      campusImpact: 88
    },
    rewards: {
      points: 100,
      badges: ['New Bull', 'Campus Explorer', 'Community Builder'],
      swag: ['UB T-shirt', 'Welcome Kit', 'Campus Map']
    }
  },
  {
    id: 'ub-finals-fall-2024',
    name: 'finals_week_survival',
    title: 'Finals Week Survival Challenge',
    description: 'Support each other through finals with study groups, stress relief activities, and academic resources',
    tagline: 'Bulls Support Bulls!',
    type: 'finals',
    status: 'upcoming',
    startTime: '2024-12-09T00:00:00Z',
    endTime: '2024-12-16T23:59:59Z',
    duration: 8,
    participationType: 'campus_wide',
    campusLocation: 'Lockwood Library & Study Spaces',
    ubSpecific: {
      buildings: ['Lockwood Library', 'Student Union', 'Academic buildings'],
      campusAreas: ['north', 'south']
    },
    metrics: {
      participationRate: 0,
      completionRate: 0,
      engagementScore: 0,
      campusImpact: 0
    },
    rewards: {
      points: 150,
      badges: ['Finals Survivor', 'Study Buddy', 'Academic Champion']
    }
  },
  {
    id: 'ub-homecoming-2024',
    name: 'homecoming_celebration',
    title: 'UB Homecoming 2024',
    description: 'Celebrate UB spirit with alumni, current students, and campus traditions',
    tagline: 'Go Bulls!',
    type: 'homecoming',
    status: 'completed',
    startTime: '2024-10-15T00:00:00Z',
    endTime: '2024-10-20T23:59:59Z',
    duration: 6,
    participationType: 'campus_wide',
    campusLocation: 'Alumni Arena & South Campus',
    ubSpecific: {
      buildings: ['Alumni Arena', 'Student Union'],
      campusAreas: ['south']
    },
    metrics: {
      participationRate: 84,
      completionRate: 91,
      engagementScore: 96,
      campusImpact: 94
    },
    rewards: {
      points: 200,
      badges: ['Bull Pride', 'Alumni Connection', 'Spirit Champion'],
      swag: ['Homecoming T-shirt', 'UB Flag', 'Alumni Sticker Pack']
    }
  }
];

const mockRitualPosts: UBRitualFeedPost[] = [
  {
    id: 'ritual-post-1',
    type: 'ritual_announcement',
    ritual: mockUBRituals[0],
    author: {
      id: 'ub-student-life',
      name: 'UB Student Life',
      handle: 'ubstudentlife',
      avatar: '',
      role: 'Campus Life'
    },
    content: 'New student orientation starts tomorrow! Join 2,847 fellow Bulls as we welcome you to campus with tours, activities, and community building. Your UB journey begins here! 🐂',
    timestamp: '2024-08-19T15:30:00Z',
    engagement: {
      likes: 234,
      comments: 56,
      shares: 89,
      participants: 2847
    },
    isParticipating: false,
    hasCompleted: false
  },
  {
    id: 'ritual-post-2',
    type: 'ritual_milestone',
    ritual: mockUBRituals[0],
    author: {
      id: 'ub-orientation-team',
      name: 'Orientation Team',
      handle: 'uborientation',
      avatar: '',
      role: 'Student Leader'
    },
    content: 'Amazing milestone! We\'ve reached 3,000 new Bulls participating in Orientation Week activities. The energy on campus is incredible! 🎉',
    timestamp: '2024-08-22T12:15:00Z',
    engagement: {
      likes: 445,
      comments: 78,
      shares: 123,
      participants: 3156
    },
    milestone: {
      achievement: '3,000 New Students Participating',
      participantCount: 3156,
      completionRate: 67
    },
    isParticipating: true,
    hasCompleted: false
  },
  {
    id: 'ritual-post-3',
    type: 'ritual_completion',
    ritual: mockUBRituals[2],
    author: {
      id: 'current-user',
      name: 'Sarah Chen',
      handle: 'schen24',
      avatar: '',
      role: 'Student'
    },
    content: 'Just completed my first UB Homecoming! What an amazing week of Bull pride, alumni connections, and campus traditions. Already looking forward to next year! 💙🏈',
    timestamp: '2024-10-20T19:45:00Z',
    engagement: {
      likes: 156,
      comments: 23,
      shares: 34,
      participants: 4521
    },
    isParticipating: true,
    hasCompleted: true
  },
  {
    id: 'ritual-post-4',
    type: 'ritual_reminder',
    ritual: mockUBRituals[1],
    author: {
      id: 'ub-academic-support',
      name: 'Academic Success Center',
      handle: 'ubacademics',
      avatar: '',
      role: 'Academic Support'
    },
    content: 'Finals Week is coming! Join the Finals Survival Challenge starting December 9th. We\'ll have study groups, stress relief activities, and academic resources to help you succeed. Sign up now! 📚',
    timestamp: '2024-12-01T10:00:00Z',
    engagement: {
      likes: 89,
      comments: 12,
      shares: 45,
      participants: 0
    },
    isParticipating: false,
    hasCompleted: false
  }
];

// =============================================================================
// INDIVIDUAL RITUAL FEED CARD STORIES
// =============================================================================

export const RitualAnnouncement: Story = {
  args: {
    post: mockRitualPosts[0],
    onLike: action('like-announcement'),
    onComment: action('comment-announcement'),
    onShare: action('share-announcement'),
    onJoinRitual: action('join-orientation'),
    onViewRitual: action('view-orientation')
  },
  parameters: {
    docs: {
      description: {
        story: 'Ritual announcement post for new UB Orientation Week with join button and engagement metrics.'
      }
    }
  }
};

export const RitualMilestone: Story = {
  args: {
    post: mockRitualPosts[1],
    onLike: action('like-milestone'),
    onComment: action('comment-milestone'),
    onShare: action('share-milestone'),
    onJoinRitual: action('join-ritual'),
    onViewRitual: action('view-ritual')
  },
  parameters: {
    docs: {
      description: {
        story: 'Milestone achievement post showing participation numbers and completion rates for ongoing ritual.'
      }
    }
  }
};

export const RitualCompletion: Story = {
  args: {
    post: mockRitualPosts[2],
    onLike: action('like-completion'),
    onComment: action('comment-completion'),
    onShare: action('share-completion'),
    onJoinRitual: action('join-ritual'),
    onViewRitual: action('view-ritual')
  },
  parameters: {
    docs: {
      description: {
        story: 'Personal completion post from student who finished Homecoming ritual with completed badge.'
      }
    }
  }
};

export const RitualReminder: Story = {
  args: {
    post: mockRitualPosts[3],
    onLike: action('like-reminder'),
    onComment: action('comment-reminder'),
    onShare: action('share-reminder'),
    onJoinRitual: action('join-finals-challenge'),
    onViewRitual: action('view-finals-challenge')
  },
  parameters: {
    docs: {
      description: {
        story: 'Reminder post for upcoming Finals Week ritual with call-to-action for early registration.'
      }
    }
  }
};

// =============================================================================
// FEED INTEGRATION STORIES
// =============================================================================

export const CompleteFeedIntegration: StoryObj<typeof UBRitualsFeedIntegration> = {
  render: () => (
    <UBRitualsFeedIntegration
      ritualPosts={mockRitualPosts}
      onLike={action('feed-like')}
      onComment={action('feed-comment')}
      onShare={action('feed-share')}
      onJoinRitual={action('feed-join-ritual')}
      onViewRitual={action('feed-view-ritual')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete ritual feed integration showing all ritual post types in a unified feed experience.'
      }
    }
  }
};

export const FeedIntegrationNoHeader: StoryObj<typeof UBRitualsFeedIntegration> = {
  render: () => (
    <UBRitualsFeedIntegration
      ritualPosts={mockRitualPosts}
      showHeader={false}
      onLike={action('no-header-like')}
      onComment={action('no-header-comment')}
      onShare={action('no-header-share')}
      onJoinRitual={action('no-header-join-ritual')}
      onViewRitual={action('no-header-view-ritual')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ritual feed integration without section header for seamless integration into main feed.'
      }
    }
  }
};

export const LimitedFeedIntegration: StoryObj<typeof UBRitualsFeedIntegration> = {
  render: () => (
    <UBRitualsFeedIntegration
      ritualPosts={mockRitualPosts}
      maxPosts={2}
      onLike={action('limited-like')}
      onComment={action('limited-comment')}
      onShare={action('limited-share')}
      onJoinRitual={action('limited-join-ritual')}
      onViewRitual={action('limited-view-ritual')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Limited ritual feed showing only recent posts with "view more" option for main feed integration.'
      }
    }
  }
};

// =============================================================================
// CAMPUS SCENARIO STORIES
// =============================================================================

export const FreshmanOrientationFeed: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Freshman Feed During Orientation 🎓
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Alex, new CSE student, seeing orientation activities in their feed
        </p>
      </div>
      
      <UBRitualsFeedIntegration
        ritualPosts={[mockRitualPosts[0], mockRitualPosts[1]]}
        onLike={action('freshman-like')}
        onComment={action('freshman-comment')}
        onShare={action('freshman-share')}
        onJoinRitual={action('freshman-join-ritual')}
        onViewRitual={action('freshman-view-ritual')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Freshman student seeing orientation ritual content in their personalized campus feed.'
      }
    }
  }
};

export const SeniorFinalsWeekFeed: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Senior During Finals Week 📚
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Marcus, senior engineering student, seeing finals support rituals
        </p>
      </div>
      
      <UBRitualsFeedIntegration
        ritualPosts={[mockRitualPosts[3]]}
        onLike={action('senior-like')}
        onComment={action('senior-comment')}
        onShare={action('senior-share')}
        onJoinRitual={action('senior-join-ritual')}
        onViewRitual={action('senior-view-ritual')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Senior student seeing finals week support ritual announcements and reminders.'
      }
    }
  }
};

export const AlumniHomecomingFeed: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Homecoming Weekend 🏈
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Campus feed during Homecoming with high engagement and school spirit
        </p>
      </div>
      
      <UBRitualsFeedIntegration
        ritualPosts={[mockRitualPosts[2]]}
        onLike={action('homecoming-like')}
        onComment={action('homecoming-comment')}
        onShare={action('homecoming-share')}
        onJoinRitual={action('homecoming-join-ritual')}
        onViewRitual={action('homecoming-view-ritual')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Homecoming weekend with completed ritual celebrations and high campus engagement.'
      }
    }
  }
};

// =============================================================================
// RITUAL FEED FILTERS STORIES
// =============================================================================

export const RitualFeedFilters: StoryObj<typeof UBRitualFeedFilters> = {
  render: () => {
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>(['orientation', 'homecoming']);
    const [selectedParticipation, setSelectedParticipation] = React.useState<string[]>(['campus_wide']);
    
    return (
      <UBRitualFeedFilters
        selectedTypes={selectedTypes}
        selectedParticipation={selectedParticipation}
        onTypeChange={setSelectedTypes}
        onParticipationChange={setSelectedParticipation}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive filters for ritual content in the feed, allowing students to customize their ritual experience.'
      }
    }
  }
};

export const EmptyRitualFilters: StoryObj<typeof UBRitualFeedFilters> = {
  render: () => {
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
    const [selectedParticipation, setSelectedParticipation] = React.useState<string[]>([]);
    
    return (
      <UBRitualFeedFilters
        selectedTypes={selectedTypes}
        selectedParticipation={selectedParticipation}
        onTypeChange={setSelectedTypes}
        onParticipationChange={setSelectedParticipation}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty filter state showing all available ritual type and participation options.'
      }
    }
  }
};

// =============================================================================
// MOBILE RESPONSIVE STORIES
// =============================================================================

export const MobileRitualFeedCard: Story = {
  args: {
    post: mockRitualPosts[1],
    onLike: action('mobile-like'),
    onComment: action('mobile-comment'),
    onShare: action('mobile-share'),
    onJoinRitual: action('mobile-join-ritual'),
    onViewRitual: action('mobile-view-ritual')
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized ritual feed card with touch-friendly interactions and compact layout.'
      }
    }
  }
};

export const MobileFeedIntegration: StoryObj<typeof UBRitualsFeedIntegration> = {
  render: () => (
    <UBRitualsFeedIntegration
      ritualPosts={mockRitualPosts.slice(0, 2)}
      onLike={action('mobile-feed-like')}
      onComment={action('mobile-feed-comment')}
      onShare={action('mobile-feed-share')}
      onJoinRitual={action('mobile-feed-join-ritual')}
      onViewRitual={action('mobile-feed-view-ritual')}
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile feed integration with stacked layout and thumb-friendly interaction zones.'
      }
    }
  }
};

// =============================================================================
// ACCESSIBILITY & EDGE CASES
// =============================================================================

export const EmptyRitualFeed: StoryObj<typeof UBRitualsFeedIntegration> = {
  render: () => (
    <UBRitualsFeedIntegration
      ritualPosts={[]}
      onLike={action('empty-like')}
      onComment={action('empty-comment')}
      onShare={action('empty-share')}
      onJoinRitual={action('empty-join-ritual')}
      onViewRitual={action('empty-view-ritual')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no ritual content is available for the feed.'
      }
    }
  }
};

export const HighEngagementRitual: Story = {
  args: {
    post: {
      ...mockRitualPosts[1],
      engagement: {
        likes: 1234,
        comments: 567,
        shares: 234,
        participants: 8901
      }
    },
    onLike: action('high-engagement-like'),
    onComment: action('high-engagement-comment'),
    onShare: action('high-engagement-share'),
    onJoinRitual: action('high-engagement-join-ritual'),
    onViewRitual: action('high-engagement-view-ritual')
  },
  parameters: {
    docs: {
      description: {
        story: 'High engagement ritual post with large participation numbers and social proof.'
      }
    }
  }
};

// =============================================================================
// INTERACTION TESTING
// =============================================================================

export const InteractiveRitualFeed: Story = {
  render: () => {
    const [posts, setPosts] = React.useState(mockRitualPosts);
    
    const handleLike = (postId: string) => {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? {
                ...post,
                engagement: {
                  ...post.engagement,
                  likes: post.engagement.likes + 1
                }
              }
            : post
        )
      );
      action('interactive-like')(postId)
    };
    
    const handleJoinRitual = (ritualId: string) => {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.ritual.id === ritualId 
            ? {
                ...post,
                isParticipating: true,
                engagement: {
                  ...post.engagement,
                  participants: post.engagement.participants + 1
                }
              }
            : post
        )
      );
      action('interactive-join-ritual')(ritualId)
    };
    
    return (
      <div className="space-y-6">
        <div className="text-center pb-6">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
            Interactive Ritual Feed
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Try liking posts and joining rituals to see real-time updates
          </p>
        </div>
        
        <UBRitualsFeedIntegration
          ritualPosts={posts}
          onLike={handleLike}
          onComment={action('interactive-comment')}
          onShare={action('interactive-share')}
          onJoinRitual={handleJoinRitual}
          onViewRitual={action('interactive-view-ritual')}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive ritual feed with real-time engagement updates and participation tracking.'
      }
    }
  }
};