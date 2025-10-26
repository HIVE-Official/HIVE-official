// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { CheckboxGroupProps } from "../index";
import { CheckboxGroup } from "../index";

const interestOptions = [
  { value: "climate", label: "Climate", description: "Sustainability & energy", group: "Impact" },
  { value: "ai", label: "AI", description: "Applied AI projects", group: "Technology" },
  { value: "community", label: "Community", description: "Events & rituals", group: "Impact" },
  { value: "consumer", label: "Consumer", description: "Consumer experiences", group: "Product" },
  { value: "tools", label: "Tools", description: "Developer tooling", group: "Technology" },
  { value: "health", label: "Health", description: "Healthcare & wellbeing", group: "Impact" }
] as const;

const meta: Meta<CheckboxGroupProps> = {
  title: "Molecules/CheckboxGroup",
  component: CheckboxGroup,
  args: {
    options: interestOptions,
    maxSelections: 4
  }
};

export default meta;
type Story = StoryObj<CheckboxGroupProps>;

export const Default: Story = {
  render: (args) => {
    const [values, setValues] = useState<string[]>(["ai", "community"]);
    return <CheckboxGroup {...args} values={values} onChange={setValues} />;
  }
};
