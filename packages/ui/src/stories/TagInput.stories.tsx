// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { TagInputProps } from "../index";
import { TagInput } from "../index";

const suggestions = [
  { value: "product", label: "Product" },
  { value: "design", label: "Design" },
  { value: "go-to-market", label: "Go To Market" },
  { value: "community", label: "Community" },
  { value: "growth", label: "Growth" },
  { value: "fundraising", label: "Fundraising" }
] as const;

const meta: Meta<TagInputProps> = {
  title: "Molecules/TagInput",
  component: TagInput,
  args: {
    placeholder: "Add interests",
    suggestions
  }
};

export default meta;
type Story = StoryObj<TagInputProps>;

export const Default: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>(["product", "design"]);
    return <TagInput {...args} value={tags} onChange={setTags} />;
  }
};

export const Limited: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);
    return <TagInput {...args} value={tags} onChange={setTags} maxTags={3} />;
  }
};
