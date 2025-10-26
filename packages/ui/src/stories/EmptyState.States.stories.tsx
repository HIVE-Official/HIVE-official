// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState, Button } from "../index";

const meta: Meta = { title: "Molecules/EmptyState States" };
export default meta;
type Story = StoryObj;

export const Variants: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2">
      <EmptyState title="No items" description="Get started by creating a new one." action={<Button>Create</Button>} />
      <EmptyState title="Nothing found" description="Try adjusting your filters." />
    </div>
  )
};

