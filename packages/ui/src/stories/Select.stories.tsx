// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "../index";

const meta: Meta<typeof Select> = {
  title: "Molecules/Select",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Hive select with tech-sleek trigger, accent rail popover, and tuned scroll affordances."
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select defaultValue="member">
      <SelectTrigger>
        <SelectValue placeholder="Choose role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="member">Member</SelectItem>
        <SelectItem value="leader">Leader</SelectItem>
        <SelectItem value="advisor">Advisor</SelectItem>
      </SelectContent>
    </Select>
  )
};

export const WithSections: Story = {
  render: () => (
    <Select defaultValue="eng">
      <SelectTrigger>
        <SelectValue placeholder="Select major" />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>Popular</SelectLabel>
        <SelectItem value="eng">Engineering</SelectItem>
        <SelectItem value="cs">Computer Science</SelectItem>
        <SelectItem value="art">Art & Design</SelectItem>
        <SelectSeparator />
        <SelectLabel>Other</SelectLabel>
        <SelectItem value="undecided">Undecided</SelectItem>
        <SelectItem value="music" disabled>
          Music (invite only)
        </SelectItem>
      </SelectContent>
    </Select>
  )
};

export const LongList: Story = {
  render: () => (
    <Select defaultValue="item-3">
      <SelectTrigger>
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>Top Choices</SelectLabel>
        {Array.from({ length: 12 }).map((_, index) => (
          <SelectItem key={index} value={`item-${index + 1}`}>
            Option {index + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
};
