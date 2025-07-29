import type { Meta, StoryObj } from '@storybook/react';
import { HiveCharts } from '../../components';

const meta: Meta<typeof HiveCharts> = {
  title: '04-Hive/Hive Charts',
  component: HiveCharts,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Analytics visualization components for the HIVE ecosystem**

Specialized charts for campus analytics, tool performance, and community insights. Follows HIVE's matte obsidian glass aesthetic with liquid metal motion.

## When to Use
- Displaying tool usage analytics in HiveLAB
- Showing space engagement metrics
- Campus activity dashboards
- Builder performance tracking

## Design Principles
- **Infrastructure Feel**: Dark glass aesthetic for trustworthy data presentation
- **Liquid Metal Interactions**: Smooth hover animations and transitions
- **Builder-Focused**: Optimized for tool creators analyzing their impact
- **Campus Context**: Charts designed for university-specific metrics

## Accessibility
- WCAG 2.1 AA compliant color contrasts
- Screen reader friendly data labels
- Keyboard navigation support
- Reduced motion preferences respected
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'bar', 'pie', 'area', 'engagement', 'activity'],
      description: 'Chart visualization type optimized for campus data'
    },
    theme: {
      control: 'select',
      options: ['obsidian', 'gold', 'platinum'],
      description: 'HIVE theme variant following matte obsidian glass aesthetic'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleEngagementData = [
  { name: 'Tools Created', value: 24, trend: '+12%' },
  { name: 'Spaces Activated', value: 8, trend: '+3%' },
  { name: 'Elements Used', value: 156, trend: '+28%' },
  { name: 'Campus Reach', value: 342, trend: '+15%' }
];

const sampleActivityData = [
  { time: '9AM', tools: 12, interactions: 45 },
  { time: '12PM', tools: 28, interactions: 89 },
  { time: '3PM', tools: 34, interactions: 102 },
  { time: '6PM', tools: 42, interactions: 128 },
  { time: '9PM', tools: 38, interactions: 95 }
];

export const EngagementMetrics: Story = {
  args: {
    type: 'engagement',
    data: sampleEngagementData,
    title: 'Space Engagement Overview',
    subtitle: 'Last 7 days • Computer Science Space'
  }
};

export const ActivityFlow: Story = {
  args: {
    type: 'activity',
    data: sampleActivityData,
    title: 'Daily Tool Activity',
    subtitle: 'Peak usage patterns for builders'
  }
};

export const ToolPerformance: Story = {
  args: {
    type: 'bar',
    data: [
      { name: 'Study Timer', usage: 89, rating: 4.8 },
      { name: 'Note Sync', usage: 76, rating: 4.6 },
      { name: 'Grade Calc', usage: 64, rating: 4.9 },
      { name: 'Schedule Maker', usage: 52, rating: 4.4 }
    ],
    title: 'Top Performing Tools',
    subtitle: 'This week in Engineering Space'
  }
};

export const CampusReach: Story = {
  args: {
    type: 'pie',
    data: [
      { name: 'Engineering', value: 35, color: 'var(--hive-brand-secondary)' },
      { name: 'Business', value: 28, color: '#C9A961' },
      { name: 'Arts & Sciences', value: 22, color: '#8B8680' },
      { name: 'Medicine', value: 15, color: '#5A5A5A' }
    ],
    title: 'Tool Distribution by School',
    subtitle: 'Cross-campus tool adoption'
  }
};

export const LoadingState: Story = {
  args: {
    type: 'line',
    loading: true,
    title: 'Loading Analytics...',
    subtitle: 'Fetching your latest tool data'
  }
};

export const EmptyState: Story = {
  args: {
    type: 'bar',
    data: [],
    title: 'No Data Available',
    subtitle: 'Start building tools to see analytics',
    emptyStateAction: 'Open HiveLAB'
  }
};

export const InteractiveDemo: Story = {
  args: {
    type: 'line',
    data: sampleActivityData,
    title: 'Interactive Chart',
    subtitle: 'Hover and click to explore data',
    interactive: true,
    onDataPointClick: (data: any) => console.log('Clicked:', data),
    onDataPointHover: (data: any) => console.log('Hovered:', data)
  }
};