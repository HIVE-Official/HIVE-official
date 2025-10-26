// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TagInput } from "../index";

const meta: Meta = { title: "Molecules/TagInput States" };
export default meta;
type Story = StoryObj;

export const States: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(["design", "events"]);
    return (
      <div className="space-y-4">
        <TagInput value={tags} onChange={setTags} placeholder="Add tag" />
        <TagInput value={tags} onChange={setTags} placeholder="Disabled" disabled />
        <TagInput value={[]} onChange={setTags} placeholder="Empty state" />
      </div>
    );
  }
};

