import type { Meta, StoryObj } from '@storybook/react';
import { FeedSearchBar } from './feed-search-bar';

const meta = {
  title: '04-Feed/FeedSearchBar',
  component: FeedSearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Search bar with filters and suggestions. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedSearchBar>;

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
        <FeedSearchBar />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <FeedSearchBar isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <FeedSearchBar error="Error message" />
      </div>
    </div>
  ),
};
