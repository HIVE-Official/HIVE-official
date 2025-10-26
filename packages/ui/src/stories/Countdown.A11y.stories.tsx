// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Countdown } from "../index";

const meta: Meta = { title: "Molecules/Countdown A11y" };
export default meta;
type Story = StoryObj;

export const TimerRole: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-caption text-muted-foreground">Timer updates every second; screen readers can query the timer region.</p>
      <Countdown target={new Date(Date.now() + 1000 * 60 * 5)} label="Break ends in" />
    </div>
  )
};

