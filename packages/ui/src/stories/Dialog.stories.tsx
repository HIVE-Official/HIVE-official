// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../index";

const meta: Meta = {
  title: "Overlays/Dialog",
  parameters: {
    layout: "centered"
  }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Launch Campus Spotlight</DialogTitle>
            <DialogDescription>
              Publish a curated experience for the incoming class. Members can still join while the campaign runs.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-body-sm font-body-sm text-muted-foreground">
            <p>
              Launch windows last 48 hours. Community managers can edit copy, visuals, and perks while the spotlight is live.
            </p>
            <p>
              Hive will notify members who opted in to event alerts and surface the spotlight card on the homepage.
            </p>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button autoFocus>Start Spotlight</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};
