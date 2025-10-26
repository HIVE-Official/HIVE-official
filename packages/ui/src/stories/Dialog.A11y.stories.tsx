// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../index";

const meta: Meta = { title: "A11y/Dialog", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const FocusTrapAndLabels: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button aria-haspopup="dialog">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby="dialog-title" aria-describedby="dialog-desc">
          <DialogHeader>
            <DialogTitle id="dialog-title">Confirm action</DialogTitle>
            <DialogDescription id="dialog-desc">This action can be undone later in Settings.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button autoFocus>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

