import type { Meta, StoryObj } from '@storybook/react';
import { StatsSection } from './stats-section';

const meta: Meta<typeof StatsSection> = {
  title: 'Landing/StatsSection',
  component: StatsSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Statistics section highlighting HIVE platform metrics and achievements.',
      },
    },
  },
  argTypes: {
    stats: { control: 'object' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof StatsSection>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <StatsSection {...args} />
    </div>
  ),
};

export const GrowthMetrics: Story = {
  args: {
    stats: [
      {
        value: "1K+",
        label: "Active Students",
        description: "Monthly active users across all campuses",
      },
      {
        value: "99%",
        label: "Uptime",
        description: "Platform reliability and availability",
      },
      {
        value: "15",
        label: "Universities",
        description: "Partner schools and growing",
      },
      {
        value: "500+",
        label: "Communities",
        description: "Student-led interest groups",
      },
    ],
  },
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <StatsSection {...args} />
    </div>
  ),
};

export const SimpleStats: Story = {
  args: {
    stats: [
      {
        value: "100%",
        label: "Student Built",
        description: "By students, for students",
      },
      {
        value: "0",
        label: "Ads",
        description: "No advertisements, ever",
      },
    ],
  },
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <StatsSection {...args} />
    </div>
  ),
};

export const Playground: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <StatsSection {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different stat configurations and layouts.',
      },
    },
  },
};