import type { Meta, StoryObj } from '@storybook/react';
import { ProfileStatCard } from './profile-stat-card';

const meta = {
  title: '02-Profile/ProfileStatCard',
  component: ProfileStatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Single stat display card. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileStatCard>;

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
        <ProfileStatCard />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ProfileStatCard isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ProfileStatCard error="Error message" />
      </div>
    </div>
  ),
};
