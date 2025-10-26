// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "../index";

const meta: Meta = { title: "Molecules/EmptyState", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-[360px]">
      <EmptyState
        title="Nothing here yet"
        description="When you add content, it will show up here."
      />
    </div>
  )
};

