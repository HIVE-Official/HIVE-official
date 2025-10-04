import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../atomic/atoms/hover-card";
import { Button } from "../../atomic/atoms/button";

const meta = {
  title: "11-Shared/HoverCard",
  component: HoverCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild><Button variant="link">@username</Button></HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">@username</h4>
          <p className="text-sm text-muted-foreground">Creating beautiful UIs with React and Tailwind CSS</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
