// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem, Label } from "../index";

const meta: Meta = { title: "Atoms/Radio.States" };
export default meta;
type Story = StoryObj;

export const States: Story = {
  render: () => (
    <div className="grid gap-6">
      <RadioGroup defaultValue="option-1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="r1" value="option-1" />
          <Label htmlFor="r1">Default (selected)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="r2" value="option-2" />
          <Label htmlFor="r2">Default</Label>
        </div>
      </RadioGroup>
      <fieldset disabled>
        <legend className="sr-only">Disabled</legend>
        <RadioGroup>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="r3" value="d1" />
            <Label htmlFor="r3">Disabled</Label>
          </div>
        </RadioGroup>
      </fieldset>
    </div>
  )
};

