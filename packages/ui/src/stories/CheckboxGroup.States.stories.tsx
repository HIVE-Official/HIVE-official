// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckboxGroup } from "../index";

const meta: Meta = { title: "Molecules/CheckboxGroup States" };
export default meta;
type Story = StoryObj;

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

export const States: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(["a"]);
    return (
      <div className="space-y-4">
        <CheckboxGroup options={options} values={values} onChange={setValues} />
        <CheckboxGroup options={options} values={values} onChange={setValues} disabled />
        <CheckboxGroup options={[]} values={[]} onChange={() => {}} emptyLabel="No options" />
      </div>
    );
  }
};

