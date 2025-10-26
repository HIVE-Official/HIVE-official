import type { Meta, StoryObj } from "@storybook/react";
import { BoardCardAnnouncement } from "@/organisms/spaces/board-card-announcement";
import { PostDetail } from "@/organisms/spaces/post-detail";
import { roboticsPosts } from "@/fixtures/spaces/space-robotics";
import * as React from "react";

const meta: Meta<typeof BoardCardAnnouncement> = {
  title: "Organisms/Spaces/BoardCard/Announcement",
  component: BoardCardAnnouncement,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof BoardCardAnnouncement>;

export const Priority: Story = {
  args: {
    post: roboticsPosts.find((p) => p.type === "announcement") as any,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <BoardCardAnnouncement {...args} onOpen={() => setOpen(true)} />
        <PostDetail post={args.post as any} open={open} onOpenChange={setOpen} mode="sheet" />
      </>
    );
  },
  args: {
    post: roboticsPosts.find((p) => p.type === "announcement") as any,
  },
};
