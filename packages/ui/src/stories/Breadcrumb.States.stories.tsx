// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "../index";

const meta: Meta = { title: "Molecules/Breadcrumb States" };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Library", href: "#" }, { label: "Data" }]} />
      <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Spaces", href: "#" }, { label: "Design", href: "#" }, { label: "Tokens" }]} />
    </div>
  )
};
