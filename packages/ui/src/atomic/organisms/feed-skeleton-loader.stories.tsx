import type { Meta, StoryObj } from '@storybook/react';
import { FeedSkeletonLoader } from './feed-skeleton-loader';

const meta = {
  title: '04-Feed/FeedSkeletonLoader',
  component: FeedSkeletonLoader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Loading skeleton for feed. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedSkeletonLoader>;

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
        <FeedSkeletonLoader />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <FeedSkeletonLoader isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <FeedSkeletonLoader error="Error message" />
      </div>
    </div>
  ),
};
