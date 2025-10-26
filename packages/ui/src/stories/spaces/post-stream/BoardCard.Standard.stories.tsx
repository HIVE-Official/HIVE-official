import type { Meta, StoryObj } from "@storybook/react";
import { BoardCardStandard } from "@/organisms/spaces/board-card-standard";
import { PostDetail } from "@/organisms/spaces/post-detail";
import { roboticsPosts } from "@/fixtures/spaces/space-robotics";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

const meta: Meta<typeof BoardCardStandard> = {
  title: "Organisms/Spaces/BoardCard/Standard",
  component: BoardCardStandard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof BoardCardStandard>;

export const Basic: Story = {
  args: {
    post: roboticsPosts.find((p) => p.type === "standard") as any,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();
    return (
      <>
        <BoardCardStandard
          {...args}
          onOpen={() => setOpen(true)}
          isLeaderOrMod
          onConvertTo={(type) => toast({ title: "Convert", description: `Convert to ${type} (mock)`, duration: 2000 })}
        />
        <PostDetail post={args.post as any} open={open} onOpenChange={setOpen} mode="sheet" />
      </>
    );
  },
  args: {
    post: roboticsPosts.find((p) => p.type === "standard") as any,
  },
};
