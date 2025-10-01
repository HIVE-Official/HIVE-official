import type { Meta, StoryObj } from '@storybook/react';
import { FeedFilters } from './feed-filters';

const meta = {
  title: '04-Feed/FeedFilters',
  component: FeedFilters,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Filter controls for feed (Following/All, spaces, content type). ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedFilters>;

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
        <FeedFilters />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <FeedFilters isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <FeedFilters error="Error message" />
      </div>
    </div>
  ),
};
