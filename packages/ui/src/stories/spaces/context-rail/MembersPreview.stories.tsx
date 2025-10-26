import type { Meta, StoryObj } from "@storybook/react";
import { MembersPreview } from "@/organisms/spaces/context-rail";
import { roboticsOnlineMembers } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof MembersPreview> = {
  title: "Organisms/Spaces/Context Rail/Members Preview",
  component: MembersPreview,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    onViewAll: { action: "view-all-members" },
    onSearch: { action: "search" },
  },
};
export default meta;

type Story = StoryObj<typeof MembersPreview>;

// Extend the small online set with a few more to demo the grid
const demoMembers = [
  ...roboticsOnlineMembers,
  { userId: "p3", spaceId: "space-robotics", role: "member", joinedAt: new Date(), lastActiveAt: new Date(), fullName: "Nia Brooks", handle: "nia", avatarUrl: "https://i.pravatar.cc/80?img=32" },
  { userId: "p4", spaceId: "space-robotics", role: "member", joinedAt: new Date(), lastActiveAt: new Date(), fullName: "Omar Khan", handle: "omar", avatarUrl: "https://i.pravatar.cc/80?img=13" },
  { userId: "p5", spaceId: "space-robotics", role: "member", joinedAt: new Date(), lastActiveAt: new Date(), fullName: "Maya Chen", handle: "maya", avatarUrl: "https://i.pravatar.cc/80?img=5" },
  { userId: "p6", spaceId: "space-robotics", role: "member", joinedAt: new Date(), lastActiveAt: new Date(), fullName: "Leo Park", handle: "leo", avatarUrl: "https://i.pravatar.cc/80?img=56" },
];

export const Basic: Story = {
  args: {
    members: demoMembers,
    totalCount: 24,
  },
};

export const FewMembers: Story = {
  args: {
    members: roboticsOnlineMembers,
    totalCount: roboticsOnlineMembers.length,
  },
};

