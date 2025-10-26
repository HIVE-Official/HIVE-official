// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { TextAnimate } from "../motion/text-animate";
import { Card } from "../atoms/card";

const meta: Meta<typeof TextAnimate> = {
  title: "Motion/TextAnimate",
  component: TextAnimate,
  args: {
    text: "Hive makes campus feel live",
    animation: "fadeUp"
  }
};

export default meta;
type Story = StoryObj<typeof TextAnimate>;

export const Characters: Story = {
  args: {
    text: "Students own the signal",
    splitBy: "characters",
    animation: "fadeUp",
    stagger: 0.05,
    duration: 0.3
  }
};

export const Words: Story = {
  args: {
    text: "Ritual launch · RSVP opens in 2h",
    splitBy: "words",
    animation: "blurUp",
    stagger: 0.08,
    duration: 0.35
  }
};

export const InCard: Story = {
  render: (args) => (
    <Card className="max-w-xl space-y-4 p-8">
      <TextAnimate {...args} text="Design Lab opens Friday" animation="fade" />
      <p className="text-sm text-muted-foreground">
        Staggers each glyph by 50ms with a 0.3s spring duration. Honors reduced-motion by rendering plain text.
      </p>
    </Card>
  )
};

export const OnView: Story = {
  args: {
    text: "Scroll to animate on view",
    animation: "fadeUp",
    startOnView: true,
    once: false
  }
};
