import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { NeutralRipple } from "@/motion/neutral-ripple";
import { Button } from "@/atoms/button";

const meta: Meta = { title: "Polish/Motion Ripple" };
export default meta;

export const NeutralRippleButtons: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6">
      <NeutralRipple className="inline-block">
        <Button variant="outline">Outline</Button>
      </NeutralRipple>
      <NeutralRipple className="inline-block">
        <Button>Default</Button>
      </NeutralRipple>
    </div>
  )
};

