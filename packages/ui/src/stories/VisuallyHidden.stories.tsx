// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { VisuallyHidden } from "../index";

const meta: Meta<typeof VisuallyHidden> = { title: "Atoms/VisuallyHidden", component: VisuallyHidden };
export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  render: () => (
    <button className="underline">
      Info
      <VisuallyHidden> (opens help dialog)</VisuallyHidden>
    </button>
  )
};

