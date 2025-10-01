import type { Meta, StoryObj } from '@storybook/react';
import { ProfileStatsDashboard } from './profile-stats-dashboard';

const meta = {
  title: '02-Profile/ProfileStatsDashboard',
  component: ProfileStatsDashboard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Detailed stats dashboard. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileStatsDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Failed to load component',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Default</h3>
        <ProfileStatsDashboard />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ProfileStatsDashboard isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ProfileStatsDashboard error="Error message" />
      </div>
    </div>
  ),
};
