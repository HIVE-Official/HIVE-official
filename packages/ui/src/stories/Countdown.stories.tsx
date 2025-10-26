// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Countdown } from "../index";

const meta: Meta = { title: "Molecules/Countdown" };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Countdown targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24)} label="Event starts in" />
      <Countdown targetDate={new Date(Date.now() + 1000 * 60 * 30)} label="Break ends in" compact />
    </div>
  )
};

