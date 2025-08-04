import type { Meta, StoryObj } from '@storybook/react';
import { HiveCharts } from '../../components/hive-charts';

const meta: Meta<typeof HiveCharts> = {
  title: '04-Hive/Charts System',
  component: HiveCharts,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**HIVE Analytics & Data Visualization System**

Premium charts for campus analytics, tool performance, and community insights. Built with HIVE's foundation systems for accessibility and mobile-first experience.

## When to Use
- Tool usage analytics in HiveLAB
- Space engagement metrics dashboards  
- Campus activity and community insights
- Builder performance tracking and optimization

## Foundation Features
- **Mobile-First Responsive**: Optimized for all screen sizes
- **Accessibility Built-In**: WCAG 2.1 AA compliance with screen reader support
- **HIVE Motion System**: Liquid metal interactions and smooth transitions
- **Semantic Design Tokens**: Consistent with HIVE brand system

## Chart Types
- **Engagement**: Tool and space interaction metrics
- **Activity**: Time-based usage patterns
- **Performance**: Comparative tool analytics
- **Distribution**: Campus reach and demographic insights

## Campus Context
All charts are optimized for university-specific metrics and student/builder workflows.
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
      options: ['default', 'premium', 'minimal'],
      description: 'HIVE theme variant with semantic design tokens'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with HIVE motion system'
    },
    interactive: {
      control: 'boolean',
      description: 'Enable interactive hover and click behaviors'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Campus-specific sample data
const sampleEngagementData = [
  { name: 'Study Tools', value: 124, trend: '+18%', color: 'var(--hive-brand-primary)' },
  { name: 'Social Spaces', value: 89, trend: '+12%', color: 'var(--hive-text-primary)' },
  { name: 'Academic Resources', value: 156, trend: '+24%', color: 'var(--hive-status-success)' },
  { name: 'Campus Events', value: 67, trend: '+8%', color: 'var(--hive-status-info)' }
];

const sampleActivityData = [
  { time: '8AM', tools: 15, interactions: 34, mobile: 12 },
  { time: '10AM', tools: 28, interactions: 67, mobile: 45 },
  { time: '12PM', tools: 42, interactions: 108, mobile: 78 },
  { time: '2PM', tools: 38, interactions: 95, mobile: 62 },
  { time: '4PM', tools: 45, interactions: 132, mobile: 89 },
  { time: '6PM', tools: 52, interactions: 145, mobile: 98 },
  { time: '8PM', tools: 48, interactions: 125, mobile: 87 },
  { time: '10PM', tools: 35, interactions: 78, mobile: 54 }
];

const toolPerformanceData = [
  { name: 'Study Timer Pro', usage: 245, rating: 4.9, category: 'Productivity' },
  { name: 'Grade Calculator', usage: 189, rating: 4.7, category: 'Academic' },
  { name: 'Note Sync', usage: 167, rating: 4.8, category: 'Organization' },
  { name: 'Schedule Builder', usage: 134, rating: 4.5, category: 'Planning' },
  { name: 'Group Finder', usage: 98, rating: 4.6, category: 'Social' }
];

const campusDistributionData = [
  { name: 'Engineering', value: 38, students: 1247, color: 'var(--hive-brand-primary)' },
  { name: 'Business', value: 24, students: 892, color: 'var(--hive-status-info)' },
  { name: 'Arts & Sciences', value: 28, students: 1156, color: 'var(--hive-status-success)' },
  { name: 'Medicine', value: 10, students: 445, color: 'var(--hive-status-warning)' }
];

export const Default: Story = {
  args: {
    type: 'bar',
    data: toolPerformanceData,
    title: 'Popular Campus Tools',
    subtitle: 'Most used tools this week'
  }
};

export const Playground: Story = {
  args: {
    type: 'engagement',
    data: sampleEngagementData,
    title: 'Interactive Chart Playground',
    subtitle: 'Experiment with different chart configurations',
    interactive: true,
    theme: 'default'
  }
};

export const EngagementMetrics: Story = {
  args: {
    type: 'engagement',
    data: sampleEngagementData,
    title: 'Campus Engagement Overview',
    subtitle: 'Last 7 days • All Spaces',
    interactive: true
  }
};

export const ActivityPatterns: Story = {
  args: {
    type: 'activity',
    data: sampleActivityData,
    title: 'Daily Activity Patterns',
    subtitle: 'Tool usage throughout the day',
    interactive: true
  }
};

export const ToolPerformance: Story = {
  args: {
    type: 'bar',
    data: toolPerformanceData,
    title: 'Top Performing Tools',
    subtitle: 'This month across all spaces',
    interactive: true
  }
};

export const CampusDistribution: Story = {
  args: {
    type: 'pie',
    data: campusDistributionData,
    title: 'Tool Usage by School',
    subtitle: 'Distribution across campus demographics',
    interactive: true
  }
};

export const MobileOptimized: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  args: {
    type: 'line',
    data: sampleActivityData,
    title: 'Mobile Chart Experience',
    subtitle: 'Touch-optimized interactions',
    interactive: true
  }
};

export const LoadingState: Story = {
  args: {
    type: 'engagement',
    loading: true,
    title: 'Loading Analytics...',
    subtitle: 'Fetching your latest campus data'
  }
};

export const EmptyState: Story = {
  args: {
    type: 'bar',
    data: [],
    title: 'No Data Available',
    subtitle: 'Start using tools to see analytics here',
    emptyStateMessage: 'Your analytics will appear here once you start engaging with campus tools and spaces.'
  }
};

export const ErrorState: Story = {
  args: {
    type: 'line',
    error: 'Failed to load analytics data',
    title: 'Analytics Unavailable',
    subtitle: 'Unable to fetch data at this time',
    retryAction: () => console.log('Retry clicked')
  }
};

export const PremiumTheme: Story = {
  args: {
    type: 'engagement',
    data: sampleEngagementData,
    title: 'Premium Analytics Dashboard',
    subtitle: 'Enhanced visualization with gold accents',
    theme: 'premium',
    interactive: true
  }
};

export const MinimalTheme: Story = {
  args: {
    type: 'line',
    data: sampleActivityData,
    title: 'Minimal Analytics View',
    subtitle: 'Clean, distraction-free data presentation',
    theme: 'minimal',
    interactive: true
  }
};

export const AccessibilityDemo: Story = {
  args: {
    type: 'bar',
    data: toolPerformanceData,
    title: 'Accessibility-First Charts',
    subtitle: 'Full keyboard navigation and screen reader support',
    interactive: true,
    showDataLabels: true,
    highContrast: true
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HiveCharts
          type="engagement"
          data={sampleEngagementData}
          title="Engagement Metrics"
          subtitle="Interactive engagement display"
          interactive
        />
        <HiveCharts
          type="activity"
          data={sampleActivityData}
          title="Activity Flow"
          subtitle="Time-based patterns"
          interactive
        />
        <HiveCharts
          type="bar"
          data={toolPerformanceData}
          title="Tool Performance"
          subtitle="Usage comparison"
          interactive
        />
        <HiveCharts
          type="pie"
          data={campusDistributionData}
          title="Campus Distribution"
          subtitle="Demographic breakdown"
          interactive
        />
      </div>
    </div>
  )
};