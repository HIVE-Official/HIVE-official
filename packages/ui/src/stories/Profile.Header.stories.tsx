// Bounded Context Owner: Identity & Access Management Guild
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileHeader } from "../organisms/profile/profile-header";

const meta: Meta<typeof ProfileHeader> = { title: "Organisms/Profile/Header", component: ProfileHeader };
export default meta;
type Story = StoryObj<typeof ProfileHeader>;

export const Default: Story = {
  args: {
    fullName: "Ava Nguyen",
    handle: "ava",
    pronouns: "she/her",
    bio: "Design systems lead focusing on neutral, crisp UIs with excellent a11y.",
    campus: "State U",
    userType: "Student",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    tags: ["Design", "Events", "Community"],
  }
};

export const GhostMode: Story = {
  args: {
    fullName: "Jordan Lee",
    handle: "jordan",
    campus: "State U",
    userType: "Faculty",
    ghostMode: true,
  }
};
