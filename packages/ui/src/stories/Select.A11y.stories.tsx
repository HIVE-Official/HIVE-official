// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../index";

const meta: Meta = { title: "A11y/Select", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const KeyboardAndSR: Story = {
  render: () => (
    <div className="grid gap-2 w-64">
      <Label htmlFor="cohort">Cohort</Label>
      <Select defaultValue="2026">
        <SelectTrigger id="cohort" aria-describedby="cohort-hint">
          <SelectValue placeholder="Select cohort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2025">Class of 2025</SelectItem>
          <SelectItem value="2026">Class of 2026</SelectItem>
          <SelectItem value="2027">Class of 2027</SelectItem>
        </SelectContent>
      </Select>
      <p id="cohort-hint" className="text-caption font-caption text-muted-foreground">Use Arrow keys to navigate, Enter to select, Escape to close.</p>
    </div>
  )
};

