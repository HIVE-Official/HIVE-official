// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { AvatarCard } from "../index";

const meta: Meta = { title: "Molecules/AvatarCard" };
export default meta;
type Story = StoryObj;

export const Portrait: Story = {
  render: () => (
    <div className="grid max-w-xl grid-cols-2 gap-4">
      <AvatarCard
        id="1"
        name="Ava Nguyen"
        handle="ava"
        avatarUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
        role="leader"
        metadata="Design Systems • 128 followers"
        variant="portrait"
      />
      <AvatarCard
        id="2"
        name="Jordan Lee"
        handle="jordan"
        avatarUrl="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1000&auto=format&fit=crop"
        role="member"
        metadata="Product Design"
        variant="portrait"
      />
    </div>
  )
};

export const Classic: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <AvatarCard id="3" name="Ava Nguyen" handle="ava" role="leader" metadata="Joined Aug 2024" variant="default" />
      <AvatarCard id="4" name="Jordan Lee" handle="jordan" role="member" variant="compact" />
      <AvatarCard id="5" name="Sam Chen" handle="sam" role="moderator" variant="detailed" />
    </div>
  )
};
