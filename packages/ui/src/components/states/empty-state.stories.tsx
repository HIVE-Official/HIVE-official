import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";

const meta: Meta<typeof EmptyState> = {
  title: "Global/States/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No Items Found",
    description:
      "There are currently no items to display. Try adjusting your filters or check back later.",
  },
};

export const WithAction: Story = {
  args: {
    title: "No Posts Created",
    description:
      "You haven-t created any posts yet. Get started by creating your first one.",
    action: (
      <Button onClick={() => alert("Action clicked!")}>Create Post</Button>
    ),
  },
};

export const CustomIcon: Story = {
  args: {
    title: "Your Inbox is Empty",
    description: "Looks like you're all caught up. No new mail to see here.",
    icon: <Mail className="w-12 h-12 text-muted" />,
    action: <Button variant="outline">Refresh</Button>,
  },
};
