import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CountUp } from "@/motion/count-up";

const meta: Meta = { title: "Polish/Motion CountUp" };
export default meta;

export const Numbers: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6 md:grid-cols-3">
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="text-h2 font-h2"><CountUp value={1280} /></div>
        <p className="text-caption text-muted-foreground">Members</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="text-h2 font-h2"><CountUp value={42} /></div>
        <p className="text-caption text-muted-foreground">Events this week</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="text-h2 font-h2"><CountUp value={7} /></div>
        <p className="text-caption text-muted-foreground">Streak days</p>
      </div>
    </div>
  )
};

