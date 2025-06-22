import type { Meta, StoryObj } from "@storybook/react";
import { IdentityHero } from "../components/profile/tiles/identity-hero";

const meta: Meta<typeof IdentityHero> = {
  title: "Profile/Tiles/IdentityHero",
  component: IdentityHero,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0A0A0A" }],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isEditing: {
      control: "boolean",
      description: "Whether the tile is in edit mode",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock user data
const mockUser = {
  id: "user123",
  displayName: "Alex Rivera",
  handle: "alex.rivera",
  avatar: undefined,
  campusName: "Stanford University",
  major: "Computer Science",
  graduationYear: 2025,
  isBuilder: false,
  isVerified: true,
};

const mockBuilderUser = {
  ...mockUser,
  displayName: "Jordan Builder",
  handle: "jordan.build",
  isBuilder: true,
  isVerified: true,
};

const mockLayout = {
  id: "identity.hero",
  x: 0,
  y: 0,
  w: 4,
  h: 2,
};

export const Default: Story = {
  args: {
    user: mockUser,
    layout: mockLayout,
    isEditing: false,
  },
};

export const Builder: Story = {
  args: {
    user: mockBuilderUser,
    layout: mockLayout,
    isEditing: false,
  },
};

export const EditMode: Story = {
  args: {
    user: mockUser,
    layout: mockLayout,
    isEditing: true,
  },
};

export const NoAvatar: Story = {
  args: {
    user: {
      ...mockUser,
      displayName: "New User",
      handle: "newbie",
      avatar: undefined,
      major: undefined,
      graduationYear: undefined,
      isVerified: false,
    },
    layout: mockLayout,
    isEditing: false,
  },
};
