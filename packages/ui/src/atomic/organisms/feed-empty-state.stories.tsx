import type { Meta, StoryObj } from '@storybook/react';
import { FeedEmptyState } from './feed-empty-state';

const meta = {
  title: '04-Feed/FeedEmptyState',
  component: FeedEmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Empty state when no posts available. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedEmptyState>;

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
        <FeedEmptyState />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <FeedEmptyState isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <FeedEmptyState error="Error message" />
      </div>
    </div>
  ),
};
