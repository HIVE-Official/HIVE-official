import type { Meta, StoryObj } from '@storybook/react';
import { FeedComposer } from './feed-composer';

const meta = {
  title: '04-Feed/FeedComposer',
  component: FeedComposer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Feed Composer for creating new posts. ' +
          'Includes text input, media toolbar, space/privacy selectors. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSpace: Story = {
  args: {
    selectedSpace: 'UB Computer Science',
  },
};

export const Private: Story = {
  args: {
    isPrivate: true,
    selectedSpace: 'Study Group',
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
  },
};

export const Compact: Story = {
  args: {
    size: 'compact',
  },
};

export const FullWidth: Story = {
  args: {
    size: 'full',
  },
};

export const Interactive: Story = {
  render: () => {
    return (
      <FeedComposer
        onSubmit={(content) => alert(`Posting: ${content}`)}
        onCancel={() => alert('Cancelled')}
      />
    );
  },
};
