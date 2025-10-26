// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { Button, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../index";

const meta: Meta = {
  title: "Molecules/CommandPalette",
  parameters: {
    layout: "centered"
  }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const shortcuts = useMemo(
      () => [
        { label: "Open analytics", shortcut: "⌘A" },
        { label: "Jump to spaces", shortcut: "⌘S" },
        { label: "Invite teammates", shortcut: "⌘I" }
      ],
      []
    );

    return (
      <>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          Open palette
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Where do you want to go?" />
          <CommandList>
            <CommandEmpty>No results — try another keyword.</CommandEmpty>
            <CommandGroup heading="Recents">
              {shortcuts.map((item) => (
                <CommandItem key={item.label} value={item.label}>
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Campus Ops">
              <CommandItem value="review builders">Review builder queue</CommandItem>
              <CommandItem value="moderation">Moderation dashboard</CommandItem>
              <CommandItem value="playbooks">View playbooks</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  }
};
