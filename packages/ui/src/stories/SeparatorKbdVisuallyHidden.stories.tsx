// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../index";

const meta: Meta = { title: "Atoms/Separator/KBD/VisuallyHidden" };
export default meta;
type Story = StoryObj;

export const Examples: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <div>
        <p className="text-body-sm font-body-sm text-muted-foreground">Inset</p>
        <Separator className="mx-4" />
      </div>
      <div>
        <p className="text-body-sm font-body-sm text-muted-foreground">Full / Dashed / Hairline</p>
        <Separator />
        <Separator className="border-dashed" />
        <Separator className="border-t-[0.5px]" />
      </div>
      <div className="text-body-sm font-body-sm text-muted-foreground">
        <p>KBD: Press <kbd className="mx-1">⌘K</kbd> to open command.</p>
        <p>
          Visually hidden label: <button className="relative underline">
            Info
            <span className="sr-only"> (opens help dialog)</span>
          </button>
        </p>
      </div>
    </div>
  )
};
