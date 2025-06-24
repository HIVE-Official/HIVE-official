import type { Meta, StoryObj } from "@storybook/react";
import { PostCard, PostCardProps } from "./post-card";

const meta: Meta<typeof PostCard> = {
  title: "Feed/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof PostCard>;

const defaultArgs: PostCardProps = {
  author: {
    name: "Jane Doe",
    handle: "janedoe",
    avatarUrl: "https://i.pravatar.cc/150?u=janedoe",
  },
  timestamp: "2h ago",
  content:
    "Just discovered the most amazing study spot on the quiet floor of the library. The sun hits just right in the afternoon! ☀️",
  stats: {
    likes: 12,
    comments: 3,
  },
};

export const Default: Story = {
  args: defaultArgs,
  render: (args) => (
    <div className="w-[580px]">
      <PostCard {...args} />
    </div>
  ),
};

export const WithoutAvatar: Story = {
  args: {
    ...defaultArgs,
    author: {
      name: "John Smith",
      handle: "johnsmith",
      avatarUrl: undefined,
    },
  },
  render: (args) => (
    <div className="w-[580px]">
      <PostCard {...args} />
    </div>
  ),
};

export const ZeroStats: Story = {
  args: {
    ...defaultArgs,
    content: "This is a brand new post with no interactions yet.",
    stats: {
      likes: 0,
      comments: 0,
    },
  },
  render: (args) => (
    <div className="w-[580px]">
      <PostCard {...args} />
    </div>
  ),
};
