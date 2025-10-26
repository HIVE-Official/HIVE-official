// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Textarea } from "../index";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Multi-line text field with Hive gold focus, hover, disabled, and invalid states."
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = { args: {
  rows: 4,
  placeholder: "Share a few sentences about what you’re building at HIVE…",
  minRows: 1
} };

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("We’re launching Panic Relief Night Owls!");
    return <Textarea {...args} value={value} onChange={(event) => setValue(event.target.value)} />;
  }
};

export const Invalid: Story = {
  args: { rows: 4 },
  render: (args) => <Textarea {...args} aria-invalid="true" defaultValue="Missing required details" />
};

export const Disabled: Story = {
  args: { rows: 3, placeholder: "Disabled" },
  render: (args) => <Textarea {...args} disabled />
};

export const WithFooter: Story = {
  render: (args) => (
    <div className="space-y-3">
      <Textarea {...args} rows={3} placeholder="Post update…" />
      <div className="flex items-center gap-2 text-caption font-caption text-muted-foreground">
        <button className="underline">Attach</button>
        <button className="underline">Emoji</button>
        <span className="ml-auto">0/280</span>
      </div>
    </div>
  )
};
