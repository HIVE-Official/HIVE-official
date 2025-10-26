// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "../index";

const meta: Meta = { title: "Molecules/Breadcrumb" };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Library", href: "#" }, { label: "Data" }]} />
  )
};

export const Truncated: Story = {
  render: () => (
    <div className="max-w-sm">
      <Breadcrumb
        maxVisible={3}
        items={[
          { label: "Home", href: "#" },
          { label: "Campus", href: "#" },
          { label: "Spaces", href: "#" },
          { label: "Design", href: "#" },
          { label: "Tokens" },
        ]}
      />
    </div>
  )
};

export const LongLabels: Story = {
  render: () => (
    <div className="max-w-xs">
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: "Very long section name that should truncate", href: "#" },
          { label: "Deeply nested section with long name" },
        ]}
      />
    </div>
  )
};
