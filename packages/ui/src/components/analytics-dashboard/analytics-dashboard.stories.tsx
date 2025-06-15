import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnalyticsDashboard } from './analytics-dashboard';

const meta: Meta<typeof AnalyticsDashboard> = {
  title: 'Analytics/Dashboard',
  component: AnalyticsDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Real-time analytics dashboard showing system performance, user engagement, and health metrics.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnalyticsDashboard>;

export const Default: Story = {
  name: 'Analytics Dashboard',
  render: () => <AnalyticsDashboard />,
  parameters: {
    docs: {
      description: {
        story: 'The main analytics dashboard showing real-time metrics, performance charts, alerts, and system health status.',
      },
    },
  },
}; 
