// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Toolbar, ToolbarGroup, ToolbarSpacer, Button, Input, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../index";

const meta: Meta = { title: "Molecules/Toolbar" };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Toolbar>
      <ToolbarGroup>
        <Button size="sm" variant="outline">New</Button>
        <Button size="sm">Save</Button>
      </ToolbarGroup>
      <ToolbarSpacer />
      <ToolbarGroup>
        <Input placeholder="Filter" className="h-8 w-40" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">Sort</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuItem>Oldest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarGroup>
    </Toolbar>
  )
};

