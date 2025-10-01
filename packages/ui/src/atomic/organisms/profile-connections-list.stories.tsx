import type { Meta, StoryObj } from '@storybook/react';
import { ProfileConnectionsList } from './profile-connections-list';

const meta = {
  title: '02-Profile/ProfileConnectionsList',
  component: ProfileConnectionsList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - List of user connections. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileConnectionsList>;

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
        <ProfileConnectionsList />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ProfileConnectionsList isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ProfileConnectionsList error="Error message" />
      </div>
    </div>
  ),
};
