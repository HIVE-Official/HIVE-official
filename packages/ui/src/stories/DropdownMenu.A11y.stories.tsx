// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../index";

const meta: Meta = { title: "A11y/Dropdown Menu", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const RolesAndKeyboard: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="menu">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8} aria-label="Actions">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Invite to space</DropdownMenuItem>
        <DropdownMenuItem>Schedule announcement</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Open analytics</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

