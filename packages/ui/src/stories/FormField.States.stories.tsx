// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { FormField, FormFieldControl, Input, Textarea, Switch } from "../index";

const meta: Meta = {
  title: "Molecules/FormField States",
};
export default meta;
type Story = StoryObj;

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <FormField label="Default" description="Typical field">
        <FormFieldControl>
          <Input placeholder="Type here" />
        </FormFieldControl>
      </FormField>

      <FormField label="Disabled" description="Non-interactive">
        <FormFieldControl>
          <Input disabled placeholder="Disabled" />
        </FormFieldControl>
      </FormField>

      <FormField label="Error" description="Shown with error" error="This field is required">
        <FormFieldControl>
          <Input placeholder="Missing value" />
        </FormFieldControl>
      </FormField>

      <FormField label="Textarea" description="Multi-line">
        <FormFieldControl>
          <Textarea rows={3} placeholder="Add more details" />
        </FormFieldControl>
      </FormField>

      <FormField label="Switch" description="Toggle option">
        <label className="flex items-center gap-2">
          <FormFieldControl>
            <Switch />
          </FormFieldControl>
          <span>Enable setting</span>
        </label>
      </FormField>
    </div>
  )
};

