import type { Meta, StoryObj } from '@storybook/react';
import { FeedComment } from './feed-comment';

const meta = {
  title: '04-Feed/FeedComment',
  component: FeedComment,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Single comment display with author, content, and actions. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedComment>;

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
        <FeedComment />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <FeedComment isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <FeedComment error="Error message" />
      </div>
    </div>
  ),
};
