// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentedControl } from "../index";

const meta: Meta = { title: "Molecules/SegmentedControl" };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState("all");
    return (
      <div className="space-y-4">
        <SegmentedControl
          items={[
            { value: "all", label: "All" },
            { value: "active", label: "Active" },
            { value: "archived", label: "Archived" },
          ]}
          value={val}
          onValueChange={setVal}
        />
      </div>
    );
  }
};

