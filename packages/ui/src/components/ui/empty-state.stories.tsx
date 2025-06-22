import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";
import { Inbox } from "lucide-react";

const meta = {
  title: "Components/UI/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No Content Available",
    icon: Inbox,
  },
};

export const WithDescription: Story = {
  args: {
    title: "No posts found",
    description:
      "There are no posts matching your current filters. Try removing some.",
    icon: Inbox,
  },
};

export const WithAction: Story = {
  args: {
    title: "You haven't created any spaces yet",
    description:
      "Get started by creating your first space and inviting your friends.",
    icon: Inbox,
    action: {
      children: "Create a Space",
      onClick: () => alert("Action clicked!"),
    },
  },
};
