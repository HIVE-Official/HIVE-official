import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "../../atomic/atoms/popover";
import { Button } from "../../atomic/atoms/button";
import { Label } from "../../atomic/atoms/label";
import { Input } from "../../atomic/atoms/input";

const meta = {
  title: "11-Shared/Popover",
  component: Popover,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Settings</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Quick Settings</h4>
            <p className="text-sm text-muted-foreground">Update your preferences</p>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>
            <Button className="w-full">Save changes</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      {["top", "right", "bottom", "left"].map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side as any}>
            <p className="text-sm">Popover on {side}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const ColorPicker: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          <div className="mr-2 h-4 w-4 rounded bg-primary" />
          Pick a color
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <div className="grid grid-cols-6 gap-2">
            {["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#A78BFA", "#F472B6"].map((color) => (
              <button
                key={color}
                className="h-8 w-full rounded transition-smooth ease-liquid hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <Input placeholder="#000000" />
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const ProductionShowcase: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Share</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Share this document</h4>
              <p className="text-sm text-muted-foreground">Anyone with the link can view</p>
            </div>
            <div className="flex gap-2">
              <Input value="https://example.com/doc/123" readOnly />
              <Button size="sm">Copy</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
