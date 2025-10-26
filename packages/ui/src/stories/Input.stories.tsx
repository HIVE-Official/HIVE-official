// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "../index";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Text field styled with Hive gold/black/white tokens. Shows default, focus, error, and disabled states."
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: "student@buffalo.edu" } };

export const Focused: Story = {
  render: (args) => {
    const [value, setValue] = useState("robotics@hive.edu");
    return <Input {...args} value={value} onChange={(event) => setValue(event.target.value)} autoFocus />;
  }
};

export const Invalid: Story = {
  args: { placeholder: "Enter UB handle" },
  render: (args) => <Input {...args} aria-invalid="true" defaultValue="invalid@handle" />
};

export const Disabled: Story = { args: { disabled: true, placeholder: "Disabled" } };

export const WithIcon: Story = {
  render: (args) => (
    <div style={{ position: "relative", width: "320px" }}>
      <span style={{ position: "absolute", left: "var(--space-sm)", top: "50%", transform: "translateY(-50%)", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>@</span>
      <Input {...args} className="pl-8" placeholder="handle" />
    </div>
  )
};
