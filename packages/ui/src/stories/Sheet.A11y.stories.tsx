// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../index";

const meta: Meta = { title: "A11y/Sheet", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const FocusTrapAndSafeAreas: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button aria-haspopup="dialog">Open Panel</Button>
      </SheetTrigger>
      <SheetContent side="right" aria-labelledby="panel-title">
        <SheetHeader>
          <SheetTitle id="panel-title">Panel</SheetTitle>
        </SheetHeader>
        <div className="text-body-sm font-body-sm text-muted-foreground">Tab cycles within; Escape closes.</div>
      </SheetContent>
    </Sheet>
  )
};

