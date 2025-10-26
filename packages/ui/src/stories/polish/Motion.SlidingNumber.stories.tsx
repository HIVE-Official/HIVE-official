import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SlidingNumber } from "@/components/animate-ui/primitives/texts/sliding-number";

const meta: Meta = { title: "Polish/Motion SlidingNumber" };
export default meta;

export const Basics: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6 md:grid-cols-3">
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="text-h2 font-h2">
          <SlidingNumber fromNumber={0} number={1280} thousandSeparator="," />
        </div>
        <p className="text-caption text-muted-foreground">Members</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="text-h2 font-h2">
          <SlidingNumber fromNumber={0} number={42} />
        </div>
        <p className="text-caption text-muted-foreground">Events this week</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="text-h2 font-h2">
          <SlidingNumber fromNumber={0} number={7} padStart />
        </div>
        <p className="text-caption text-muted-foreground">Streak days</p>
      </div>
    </div>
  ),
};

export const Decimals: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="text-h2 font-h2">
          <SlidingNumber fromNumber={0} number={3.14159} decimalPlaces={2} />
        </div>
        <p className="text-caption text-muted-foreground">Pi (2 decimals)</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="text-h2 font-h2">
          <SlidingNumber
            fromNumber={0}
            number={12345.67}
            decimalPlaces={2}
            thousandSeparator="," 
            delay={120}
          />
        </div>
        <p className="text-caption text-muted-foreground">Currency-style</p>
      </div>
    </div>
  ),
};

