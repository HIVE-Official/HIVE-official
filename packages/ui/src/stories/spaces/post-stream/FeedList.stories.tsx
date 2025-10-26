import type { Meta, StoryObj } from "@storybook/react";
import { FeedList } from "@/organisms/spaces/feed-list";
import { PostDetail } from "@/organisms/spaces/post-detail";
import { roboticsPosts } from "@/fixtures/spaces/space-robotics";
import * as React from "react";

const meta: Meta<typeof FeedList> = {
  title: "Organisms/Spaces/FeedList",
  component: FeedList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof FeedList>;

const posts = roboticsPosts as any[];
const pinned = posts.filter((p) => p.isPinned).slice(0, 2);

export const WithPinnedAndMore: Story = {
  args: {
    posts,
    pinned,
    isLoadingMore: false,
    isEnd: false,
  },
};

export const EndReached: Story = {
  args: {
    posts,
    pinned,
    isLoadingMore: false,
    isEnd: true,
  },
};

export const InteractiveOpen: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState<any | null>(null);
    return (
      <>
        <FeedList {...args} onOpenPost={(p) => { setActive(p); setOpen(true); }} />
        {active && <PostDetail post={active as any} open={open} onOpenChange={setOpen} mode="sheet" />}
      </>
    );
  },
  args: {
    posts,
    pinned,
  },
};
