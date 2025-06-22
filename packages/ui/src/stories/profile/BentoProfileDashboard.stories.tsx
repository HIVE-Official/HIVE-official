import type { Meta, StoryObj } from "@storybook/react";
import { BentoProfileDashboard } from "../../components/profile/bento-profile-dashboard";

const meta: Meta<typeof BentoProfileDashboard> = {
  title: "Profile/BentoProfileDashboard",
  component: BentoProfileDashboard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BentoProfileDashboard>;

const mockUser = {
  id: "user123",
  name: "Alex Chen",
  handle: "alexc",
  email: "alex.chen@university.edu",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
  isBuilder: true,
  major: "Computer Science",
  graduationYear: 2025,
  dormName: "West Hall",
  isOnCampus: true,
};

export const DefaultUser: Story = {
  args: {
    user: mockUser,
  },
};

export const NonBuilderUser: Story = {
  args: {
    user: { ...mockUser, isBuilder: false },
  },
};

export const BuilderUser: Story = {
  args: {
    user: { ...mockUser, isBuilder: true },
  },
};

export const OffCampusUser: Story = {
  args: {
    user: { ...mockUser, isOnCampus: false, dormName: undefined },
  },
};

export const NoAvatar: Story = {
  args: {
    user: { ...mockUser, avatar: undefined },
  },
};
