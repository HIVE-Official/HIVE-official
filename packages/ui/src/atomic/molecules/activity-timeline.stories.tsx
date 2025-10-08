import type { Meta, StoryObj } from '@storybook/react';
import { ActivityTimeline, type Activity } from './activity-timeline';

const meta = {
  title: 'Atomic/Molecules/Activity Timeline',
  component: ActivityTimeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActivityTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'post',
    timestamp: '2h ago',
    title: 'Posted in CS Study Group',
    description: 'Shared notes from today\'s algorithms lecture',
    metadata: {
      spaceName: 'CS Study Group',
      postPreview: 'Here are my notes from today\'s dynamic programming lecture. Key takeaways: memoization vs tabulation...',
    },
  },
  {
    id: '2',
    type: 'comment',
    timestamp: '5h ago',
    title: 'Commented on "Best study spots on campus?"',
    description: 'Recommended Lockwood Library',
  },
  {
    id: '3',
    type: 'connection',
    timestamp: 'Yesterday',
    title: 'Connected with Alex Martinez',
    description: 'Met at the CS career fair',
    metadata: {
      connectionName: 'Alex Martinez',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
  },
  {
    id: '4',
    type: 'space_join',
    timestamp: '2 days ago',
    title: 'Joined UB Hackathon 2025',
    description: 'Registered for the spring hackathon',
    metadata: {
      spaceName: 'UB Hackathon 2025',
      badge: { label: 'New Member', variant: 'secondary' },
    },
  },
  {
    id: '5',
    type: 'ritual_complete',
    timestamp: '3 days ago',
    title: 'Completed "7 Day Study Streak"',
    description: 'Earned 50 points',
    metadata: {
      badge: { label: '+50 pts', variant: 'default' },
    },
  },
  {
    id: '6',
    type: 'tool_create',
    timestamp: '1 week ago',
    title: 'Created new poll: "Best dining hall?"',
    description: 'Used HiveLab to create a quick poll',
    metadata: {
      spaceName: 'UB Food Lovers',
    },
  },
  {
    id: '7',
    type: 'achievement',
    timestamp: '2 weeks ago',
    title: 'Unlocked "Social Butterfly" achievement',
    description: 'Connected with 50+ students',
    metadata: {
      badge: { label: 'Achievement', variant: 'default' },
    },
  },
];

export const Default: Story = {
  args: {
    activities: mockActivities,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    activities: mockActivities,
    variant: 'compact',
  },
};

export const Limited: Story = {
  args: {
    activities: mockActivities,
    variant: 'default',
    limit: 3,
    showViewAll: true,
    onViewAll: () => alert('View all clicked!'),
  },
};

export const Empty: Story = {
  args: {
    activities: [],
  },
};

export const SingleActivity: Story = {
  args: {
    activities: [mockActivities[0]],
    variant: 'default',
  },
};

export const WithInteraction: Story = {
  args: {
    activities: mockActivities.map(a => ({
      ...a,
      onClick: () => alert(`Clicked: ${a.title}`),
    })),
    variant: 'default',
  },
};
