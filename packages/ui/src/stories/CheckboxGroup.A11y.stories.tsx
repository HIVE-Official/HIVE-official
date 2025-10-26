// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckboxGroup } from "../index";

const meta: Meta = { title: "Molecules/CheckboxGroup A11y" };
export default meta;
type Story = StoryObj;

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

export const GroupLabel: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(["a"]);
    return (
      <div className="max-w-xl space-y-2">
        <h3 id="prefs" className="text-h4 font-h4">Preferences</h3>
        <CheckboxGroup options={options} values={values} onChange={setValues} ariaLabelledby="prefs" />
      </div>
    );
  }
};

