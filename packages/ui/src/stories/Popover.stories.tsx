// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Popover, PopoverTrigger, PopoverContent } from "../index";

const meta: Meta = {
  title: "Molecules/Popover",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Hive glass popover with gold accent border and motion."
      }
    }
  }
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2 text-sm">
          <p className="font-medium">Popover title</p>
          <p className="text-muted-foreground">Use this surface for lightweight, contextual details.</p>
        </div>
      </PopoverContent>
    </Popover>
  )
};

export const WithActions: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">More options</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 space-y-3">
        <div className="text-sm font-medium">Quick actions</div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Add to Space</li>
          <li>Share invite link</li>
          <li>Report content</li>
        </ul>
      </PopoverContent>
    </Popover>
  )
};
