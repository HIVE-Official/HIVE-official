import type { Meta, StoryObj } from '@storybook/react';
import { FeedCommentThread } from './feed-comment-thread';

const meta = {
  title: '04-Feed/FeedCommentThread',
  component: FeedCommentThread,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Nested comment thread with replies. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedCommentThread>;

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
        <FeedCommentThread />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <FeedCommentThread isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <FeedCommentThread error="Error message" />
      </div>
    </div>
  ),
};
