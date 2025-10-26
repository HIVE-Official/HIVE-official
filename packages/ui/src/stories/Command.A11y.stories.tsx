// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../index";

const meta: Meta = { title: "A11y/Command", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const KeyboardNav: Story = {
  render: () => (
    <div className="w-[360px] border rounded-card p-2">
      <Command>
        <CommandInput placeholder="Filter tools…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem>Invite to space</CommandItem>
            <CommandItem>Schedule announcement</CommandItem>
            <CommandItem>Open analytics</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <p className="mt-2 text-caption font-caption text-muted-foreground">Arrow keys navigate; Enter selects; Escape clears.</p>
    </div>
  )
};

