import type { Meta, StoryObj } from '@storybook/react';
import { ActivityFeed } from '../../atomic/organisms/activity-feed';

const meta: Meta<typeof ActivityFeed> = {
  title: '06-Feed-Rituals/Activity Feed (v1)',
  component: ActivityFeed,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Activity Feed - v1 Campus Launch

The Activity Feed is the real-time social activity interface that activates when the semester begins, replacing the Rituals Hub from the summer preparation period.

## Business Logic

**Phase 2 Activation**: 
- Activates when semester starts and Rituals Hub deactivates
- Powered by all data seeded during summer ritual completion
- Aggregates content from Spaces, Tools, and Profile systems

**Content Sources**:
- **Space Events**: Activities and discussions from joined spaces
- **Tool Successes**: Achievements and milestones from HIVE tools
- **Community Posts**: User-generated content and discussions
- **Ritual Milestones**: Campus-wide achievements and celebrations
- **Collaborations**: Cross-space projects and partnerships

**Personalization**:
- Feed algorithm uses ritual-generated data for relevance
- Interest matching from Initialize ritual
- Space memberships from Discover ritual  
- Social connections from Connect ritual

## Features

- **Real-time Updates**: Live activity from across the platform
- **Smart Filtering**: Filter by post type, time range, and source
- **Engagement Mechanics**: Like, comment, share, and bookmark
- **Responsive Design**: Optimized for all device sizes
- **Infinite Scroll**: Seamless content loading

The Activity Feed solves the cold start problem - by launch day, every user has a personalized, populated feed based on their summer preparation.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    feedType: {
      control: { type: 'select' },
      options: ['personal', 'campus', 'trending'],
      description: 'Type of activity feed to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

export const PersonalFeed: Story = {
  args: {
    feedType: 'personal',
    userId: 'current_user'
  },
  parameters: {
    docs: {
      description: {
        story: 'Personal activity feed showing content relevant to the user based on their ritual-seeded preferences, joined spaces, and social connections.',
      },
    },
  },
};

export const CampusFeed: Story = {
  args: {
    feedType: 'campus',
    userId: 'current_user'
  },
  parameters: {
    docs: {
      description: {
        story: 'Campus-wide activity feed showing broader university content, including major events, cross-space collaborations, and community milestones.',
      },
    },
  },
};

export const TrendingFeed: Story = {
  args: {
    feedType: 'trending',
    userId: 'current_user'
  },
  parameters: {
    docs: {
      description: {
        story: 'Trending feed highlighting the most popular and engaging content across the platform, sorted by engagement velocity.',
      },
    },
  },
};

export const FilteredFeed: Story = {
  args: {
    feedType: 'personal',
    spaceFilter: ['cs_study_group', 'ub_hackers'],
    userId: 'current_user'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtered activity feed showing content only from specific spaces, useful for focused community engagement.',
      },
    },
  },
};

// Mobile view
export const MobileFeed: Story = {
  args: {
    feedType: 'personal',
    userId: 'current_user'
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Mobile-optimized activity feed with touch-friendly interactions and responsive layout adjustments.',
      },
    },
  },
};

// State variations
export const EmptyFeed: Story = {
  args: {
    feedType: 'personal',
    userId: 'new_user'
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty feed state for users who haven\'t completed rituals or joined spaces. Should rarely occur due to ritual system.',
      },
    },
  },
};

export const HighEngagementFeed: Story = {
  args: {
    feedType: 'trending',
    userId: 'active_user'
  },
  parameters: {
    docs: {
      description: {
        story: 'High engagement scenario showing popular content with lots of likes, comments, and shares.',
      },
    },
  },
};