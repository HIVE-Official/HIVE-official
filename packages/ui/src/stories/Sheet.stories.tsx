// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../index";

const meta: Meta = {
  title: "Overlays/Sheet",
  parameters: {
    layout: "centered"
  }
};

export default meta;

type Story = StoryObj;

export const BuilderBrief: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Open Builder Brief</Button>
        </SheetTrigger>
        <SheetContent side="right" className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Builder onboarding brief</SheetTitle>
            <SheetDescription>
              Share launch context, key spaces, and timelines before granting full access.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 text-body-sm font-body-sm text-muted-foreground">
            <section>
              <h4 className="text-h4 font-h4 text-foreground">Persona</h4>
              <p>Orientation Crew lead — wants visibility into new member funnels without leaving the event queue.</p>
            </section>
            <section>
              <h4 className="text-h4 font-h4 text-foreground">Access Checklist</h4>
              <ul className="mt-2 space-y-1">
                <li>• Activate ritual templates</li>
                <li>• Grant “Launch Pop-Up” permission</li>
                <li>• Subscribe to moderation summaries</li>
              </ul>
            </section>
          </div>
          <SheetFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Dismiss
            </Button>
            <Button>Send brief</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
};
