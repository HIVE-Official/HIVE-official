import type { Meta, StoryObj } from "@storybook/react";
import { BoardCardPoll } from "@/organisms/spaces/board-card-poll";
import { PostDetail } from "@/organisms/spaces/post-detail";
import type { PollPost } from "@/organisms/spaces/types";
import { subMinutes } from "date-fns";
import * as React from "react";

const now = new Date();
const poll: PollPost = {
  id: "poll-1",
  spaceId: "space-robotics",
  type: "poll",
  visibility: "members_only",
  authorId: "profile-nia",
  authorName: "Nia Brooks",
  authorHandle: "nia",
  authorRole: "leader",
  isPinned: false,
  isHidden: false,
  reportCount: 0,
  commentCount: 3,
  reactionCount: 11,
  createdAt: subMinutes(now, 25),
  updatedAt: subMinutes(now, 10),
  lastActivityAt: subMinutes(now, 5),
  options: [
    { id: "a", text: "Friday 5pm", voteCount: 8 },
    { id: "b", text: "Friday 6pm", voteCount: 12 },
    { id: "c", text: "Saturday 10am", voteCount: 4 },
  ],
  question: "When should we run the drivetrain teardown?",
  state: "open",
  allowMultiple: false,
  showResultsAfterVote: true,
};

const meta: Meta<typeof BoardCardPoll> = {
  title: "Organisms/Spaces/BoardCard/Poll",
  component: BoardCardPoll,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof BoardCardPoll>;

export const Open: Story = {
  args: {
    post: poll,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <BoardCardPoll {...args} onOpen={() => setOpen(true)} />
        <PostDetail post={args.post as any} open={open} onOpenChange={setOpen} mode="sheet" />
      </>
    );
  },
  args: { post: poll },
};
