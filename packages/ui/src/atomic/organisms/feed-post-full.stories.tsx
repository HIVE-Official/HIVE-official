import type { Meta, StoryObj } from '@storybook/react';
import { FeedPostFull } from './feed-post-full';

const meta = {
  title: '04-Feed/FeedPostFull',
  component: FeedPostFull,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Complete post with expanded comments and interactions. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedPostFull>;

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
        <FeedPostFull />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <FeedPostFull isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <FeedPostFull error="Error message" />
      </div>
    </div>
  ),
};
