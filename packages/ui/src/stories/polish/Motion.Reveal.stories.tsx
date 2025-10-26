import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Reveal } from "@/motion/reveal";

const meta: Meta = { title: "Polish/Motion Reveal" };
export default meta;

export const Directions: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <Reveal direction="up" className="rounded-xl border border-border bg-card p-6">Up</Reveal>
      <Reveal direction="down" className="rounded-xl border border-border bg-card p-6">Down</Reveal>
      <Reveal direction="left" className="rounded-xl border border-border bg-card p-6">Left</Reveal>
      <Reveal direction="right" className="rounded-xl border border-border bg-card p-6">Right</Reveal>
      <Reveal direction="fade" className="rounded-xl border border-border bg-card p-6">Fade</Reveal>
    </div>
  )
};

