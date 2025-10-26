// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "../index";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Portrait profile card primitive with Hive gold edge lighting. Use for member tiles, rosters, and anywhere a lightweight profile preview is needed."
      }
    }
  }
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400" alt="Student" />
      <AvatarFallback>ST</AvatarFallback>
    </Avatar>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Avatar size="sm">
        <AvatarImage src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400" alt="Member" />
        <AvatarFallback>MB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://images.unsplash.com/photo-1504595403659-9088ce801e29?q=80&w=400" alt="Leader" />
        <AvatarFallback>LD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400" alt="Moderator" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
    </div>
  )
};

export const Fallback: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarFallback delayMs={200}>HN</AvatarFallback>
    </Avatar>
  )
};
