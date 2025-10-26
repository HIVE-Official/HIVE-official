// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { FormField, FormFieldControl, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Textarea, Checkbox } from "../index";

const meta: Meta = { title: "Molecules/FormField A11y" };
export default meta;
type Story = StoryObj;

export const DescribedByAndInvalid: Story = {
  render: () => (
    <div className="space-y-6">
      <FormField label="Email" labelFor="email" description="We'll never share your email." error="Enter a valid email">
        <FormFieldControl>
          <Input placeholder="you@hive.so" />
        </FormFieldControl>
      </FormField>

      <FormField label="Role" labelFor="role" description="Choose one" error="Role is required">
        <Select defaultValue="">
          <FormFieldControl>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
          </FormFieldControl>
          <SelectContent>
            <SelectItem value="founder">Founder</SelectItem>
            <SelectItem value="student">Student</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="About" labelFor="about" description="Short bio" error="Minimum 50 characters">
        <FormFieldControl>
          <Textarea rows={3} />
        </FormFieldControl>
      </FormField>

      <FormField label="Terms" labelFor="terms" description="Agree to continue" error="You must agree">
        <label className="flex items-center gap-2">
          <FormFieldControl>
            <Checkbox />
          </FormFieldControl>
          <span>I agree</span>
        </label>
      </FormField>
    </div>
  )
};
