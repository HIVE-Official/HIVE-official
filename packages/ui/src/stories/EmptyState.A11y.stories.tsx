// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState, Button } from "../index";

const meta: Meta = { title: "Molecules/EmptyState A11y" };
export default meta;
type Story = StoryObj;

export const RegionWithLabel: Story = {
  render: () => (
    <div>
      <EmptyState
        role="region"
        aria-labelledby="no-items-title"
        title="No items"
        description="Get started by creating a new one."
        action={<Button>Create</Button>}
      />
      {/* Title id is applied by passing id to the heading via wrapper attributes */}
      <style>{`#no-items-title{}`}</style>
    </div>
  )
};

