// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "../index";

const meta: Meta = {
  title: "States/DropdownMenu",
  parameters: { layout: "centered" }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>New item</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Invite to…</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Design Squad</DropdownMenuItem>
            <DropdownMenuItem>Orientation Crew</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>Subscribe</DropdownMenuCheckboxItem>
        <DropdownMenuRadioGroup value="campus">
          <DropdownMenuRadioItem value="campus">Campus</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="stealth">Stealth</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

