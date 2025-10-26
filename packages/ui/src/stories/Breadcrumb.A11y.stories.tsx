// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "../index";

const meta: Meta = { title: "Molecules/Breadcrumb A11y" };
export default meta;
type Story = StoryObj;

export const AriaLabel: Story = {
  render: () => (
    <nav aria-label="Breadcrumb">
      <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Library", href: "#" }, { label: "Data" }]} />
    </nav>
  )
};

