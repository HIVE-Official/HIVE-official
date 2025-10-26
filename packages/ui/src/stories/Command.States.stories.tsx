// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "../index";

const meta: Meta = {
  title: "States/Command",
  parameters: { layout: "centered" }
};

export default meta;

type Story = StoryObj;

export const Closed: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open command</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Recent">
              <CommandItem value="invite">Invite teammates</CommandItem>
              <CommandItem value="analytics">Open analytics</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  }
};

export const Open: Story = {
  render: () => (
    <CommandDialog open>
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Recent">
          <CommandItem value="invite">Invite teammates</CommandItem>
          <CommandItem value="analytics">Open analytics</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
};

