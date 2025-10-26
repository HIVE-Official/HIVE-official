// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../index";

const meta: Meta = {
  title: "States/Sheet",
  parameters: { layout: "centered" }
};

export default meta;

type Story = StoryObj;

export const RightOpen: Story = {
  render: () => (
    <Sheet open>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Right sheet</SheetTitle>
        </SheetHeader>
        <div className="mt-4 text-body-sm font-body-sm text-muted-foreground">Content in a frosted panel.</div>
      </SheetContent>
    </Sheet>
  )
};

export const LeftClosed: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open left sheet</Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Left sheet</SheetTitle>
        </SheetHeader>
        <div className="mt-4 text-body-sm font-body-sm text-muted-foreground">Content in a frosted panel.</div>
      </SheetContent>
    </Sheet>
  )
};
