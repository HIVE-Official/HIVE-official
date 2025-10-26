// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { FormField, FormFieldControl, Input, Textarea, Switch } from "../index";

const meta: Meta = {
  title: "Molecules/FormField",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Field wrapper that aligns labels, descriptions, and errors using Hive tokens."
      }
    }
  }
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="space-y-6">
      <FormField label="Email" description="Use your .edu address" required>
        <FormFieldControl>
          <Input placeholder="student@buffalo.edu" />
        </FormFieldControl>
      </FormField>

      <FormField label="About" description="Share a few sentences" error="Minimum 50 characters">
        <FormFieldControl>
          <Textarea minRows={4} autoResize placeholder="Tell us about your org" />
        </FormFieldControl>
      </FormField>

      <FormField label="Auto-join" inline description="Automatically add new freshmen" labelWidth="12rem">
        <FormFieldControl>
          <Switch aria-label="Auto join" />
        </FormFieldControl>
      </FormField>
    </div>
  )
};
