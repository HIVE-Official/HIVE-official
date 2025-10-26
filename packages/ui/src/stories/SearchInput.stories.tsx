// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchInput } from "../index";

const meta: Meta = { title: "Molecules/SearchInput" };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [q, setQ] = useState("");
    return (
      <div className="max-w-md">
        <SearchInput
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onClear={() => setQ("")}
        />
      </div>
    );
  }
};

