import type { Meta, StoryObj } from '@storybook/react';
import { SpacePostFeed } from './space-post-feed';

const meta = {
  title: '03-Spaces/SpacePostFeed',
  component: SpacePostFeed,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Post feed within a space. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpacePostFeed>;

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
        <SpacePostFeed />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpacePostFeed isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpacePostFeed error="Error message" />
      </div>
    </div>
  ),
};
