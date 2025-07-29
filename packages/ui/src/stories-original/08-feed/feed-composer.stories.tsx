import type { Meta, StoryObj } from '@storybook/react';
import { FeedComposer } from '../../components/feed/feed-composer';

const meta: Meta<typeof FeedComposer> = {
  title: '08-Feed/Feed Composer',
  component: FeedComposer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Component for creating new posts and content in the feed.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "What's happening in your space?",
  },
};

export const WithAvatar: Story = {
  args: {
    placeholder: "Share your thoughts...",
    showAvatar: true,
    userAvatar: "https://github.com/vercel.png",
  },
};

export const WithAttachments: Story = {
  args: {
    placeholder: "What's on your mind?",
    allowAttachments: true,
    maxAttachments: 5,
  },
};

export const Expanded: Story = {
  args: {
    placeholder: "Write your post...",
    expanded: true,
    showFormatting: true,
  },
};