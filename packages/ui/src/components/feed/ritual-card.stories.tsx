import type { Meta, StoryObj } from "@storybook/react";
import { RitualCard, RitualCardProps } from "./ritual-card";

const meta: Meta<typeof RitualCard> = {
  title: "Feed/RitualCard",
  component: RitualCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RitualCard>;

const mockParticipants = [
  { name: "Alex", avatarUrl: "https://i.pravatar.cc/150?u=alex" },
  { name: "Beth", avatarUrl: "https://i.pravatar.cc/150?u=beth" },
  { name: "Charlie", avatarUrl: "https://i.pravatar.cc/150?u=charlie" },
  { name: "Diana", avatarUrl: "https://i.pravatar.cc/150?u=diana" },
];

const defaultArgs: RitualCardProps = {
  name: "Sunrise Photo Walk",
  description:
    "Meet at the campus main gate to capture the sunrise together. All skill levels welcome, from phone cameras to DSLRs.",
  participantCount: 27,
  participants: mockParticipants,
};

export const Default: Story = {
  args: defaultArgs,
  render: (args) => (
    <div className="w-[580px]">
      <RitualCard {...args} />
    </div>
  ),
};

export const FewParticipants: Story = {
  args: {
    ...defaultArgs,
    name: "Late Night Study Group",
    description:
      "Grinding out the last of the semester projects in the 24/7 library section.",
    participantCount: 3,
    participants: mockParticipants.slice(0, 3),
  },
  render: (args) => (
    <div className="w-[580px]">
      <RitualCard {...args} />
    </div>
  ),
};

export const NoParticipants: Story = {
  args: {
    ...defaultArgs,
    name: "New Campus Chess Club",
    description:
      "Looking for founding members for a new chess club. Come join us for a few games!",
    participantCount: 0,
    participants: [],
  },
  render: (args) => (
    <div className="w-[580px]">
      <RitualCard {...args} />
    </div>
  ),
};
