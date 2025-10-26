// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { AvatarCard } from "../index";

const meta: Meta = { title: "Molecules/AvatarCard A11y" };
export default meta;
type Story = StoryObj;

export const FocusableCard: Story = {
  render: () => (
    <div className="max-w-sm">
      <AvatarCard
        id="1"
        name="Ava Nguyen"
        handle="ava"
        avatarUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
        role="leader"
        metadata="Design Systems"
        onClick={() => {}}
        variant="portrait"
      />
      <p className="text-caption text-muted-foreground mt-2">Card is tabbable and Enter/Space activate it.</p>
    </div>
  )
};

