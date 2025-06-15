import { type Meta, type StoryObj } from '@storybook/react';
import { PostCard } from '../components/post-card';
import { type Post } from '@hive/core/src/domain/firestore/post';

const meta: Meta<typeof PostCard> = {
  title: 'Components/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'hive',
      values: [{ name: 'hive', value: '#0a0a0a' }],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostCard>;

const basePost: Post = {
  id: 'post1',
  authorId: 'user123',
  author: {
    id: 'user123',
    handle: 'janedoe',
    fullName: 'Jane Doe',
    photoURL: 'https://i.pravatar.cc/150?u=janedoe',
  },
  spaceId: 'space1',
  content: "Just attended the guest lecture on Quantum Computing, absolutely mind-blowing stuff! Anyone else catch it?",
  createdAt: new Date() as any,
  updatedAt: new Date() as any,
};

export const Default: Story = {
  args: {
    post: basePost,
    authorProfileUrl: `/u/${basePost.author?.fullName}`,
  },
};

export const AuthorView: Story = {
  args: {
    post: basePost,
    currentUserId: 'user123',
    authorProfileUrl: `/u/${basePost.author?.fullName}`,
  },
};

export const NoAvatar: Story = {
    args: {
        post: {
            ...basePost,
            author: {
                id: 'user456',
                handle: 'johnsmith',
                fullName: 'John Smith',
                photoURL: undefined,
            },
        },
        authorProfileUrl: '/u/John%20Smith',
    },
}; 
