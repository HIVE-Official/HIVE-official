// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TagInput } from "../index";

const meta: Meta = { title: "Molecules/TagInput A11y" };
export default meta;
type Story = StoryObj;

export const KeyboardAndLive: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(["design"]);
    return (
      <div className="max-w-xl space-y-2">
        <p className="text-caption text-muted-foreground">Type and press Enter to add. Backspace removes the last tag when empty.</p>
        <TagInput
          value={tags}
          onChange={setTags}
          placeholder="Add tag"
          suggestions={[{ value: "events" }, { value: "clubs" }]}
        />
      </div>
    );
  }
};

