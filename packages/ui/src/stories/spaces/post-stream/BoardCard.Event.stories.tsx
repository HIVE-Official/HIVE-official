import type { Meta, StoryObj } from "@storybook/react";
import { BoardCardEvent } from "@/organisms/spaces/board-card-event";
import { PostDetail } from "@/organisms/spaces/post-detail";
import { roboticsPosts } from "@/fixtures/spaces/space-robotics";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

const meta: Meta<typeof BoardCardEvent> = {
  title: "Organisms/Spaces/BoardCard/Event",
  component: BoardCardEvent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof BoardCardEvent>;

export const Upcoming: Story = {
  args: {
    post: { ...(roboticsPosts.find((p) => p.type === "event") as any), coverImageUrl: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop" },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [post, setPost] = React.useState<any>(args.post);
    const { toast } = useToast();
    return (
      <>
        <BoardCardEvent
          {...args}
          post={post}
          onOpen={() => setOpen(true)}
          onRsvp={(status) => {
            setPost((p: any) => ({ ...p, userRsvp: status }));
            toast({ title: "RSVP updated", description: `Set to ${status}.`, duration: 2000 });
          }}
          onAddToCalendar={() => toast({ title: "Calendar", description: "Opened calendar in a new tab", duration: 2000 })}
          onCopyLocation={() => toast({ title: "Copied", description: "Location copied to clipboard", duration: 2000 })}
        />
        <PostDetail post={post as any} open={open} onOpenChange={setOpen} mode="sheet" />
      </>
    );
  },
  args: {
    post: roboticsPosts.find((p) => p.type === "event") as any,
  },
};

export const Live: Story = {
  args: {
    post: { ...(roboticsPosts.find((p) => p.type === 'event') as any), state: 'active', coverImageUrl: "https://images.unsplash.com/photo-1555617983-7b0f991b0e1b?q=80&w=1200&auto=format&fit=crop" },
  },
};

export const Ended: Story = {
  args: {
    post: { ...(roboticsPosts.find((p) => p.type === 'event') as any), state: 'ended', coverImageUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop" },
  },
};
